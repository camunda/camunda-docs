// Keep only APIs available for a given deployment type: endpoints with no
// x-availability property, or whose x-availability matches the requested value.

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

function isHTTPMethod(metadata) {
  const HTTP_METHODS = ["get", "post", "put", "patch", "delete"];
  return HTTP_METHODS.includes(metadata[0]);
}

function isAvailableInEnvironment(metadata, environment) {
  const available =
    !Object.hasOwn(metadata, "x-availability") ||
    metadata["x-availability"].toLowerCase() === environment.toLowerCase();
  return available;
}

function hasData(pathData) {
  return Object.keys(pathData).length > 0;
}

function filterPathDataForEnvironment(pathData, environment) {
  const methods = Object.entries(pathData).filter(isHTTPMethod);
  const methodsForEnvironment = methods.filter(([_, metadata]) =>
    isAvailableInEnvironment(metadata, environment)
  );
  const methodsChanged = methods.length != methodsForEnvironment.length;

  if (methodsForEnvironment.length == 0) {
    // when there are no available methods, drop all other metadata except $ref,
    // which will be cleaned up later
    const otherMetadata = Object.entries(pathData).filter(
      (d) => !isHTTPMethod(d)
    );
    const refsOnly = otherMetadata.filter((m) => m[0] === "$ref");
    const otherMetadataChanged = otherMetadata.length != refsOnly.length;

    return [
      Object.fromEntries(refsOnly),
      methodsChanged || otherMetadataChanged,
    ];
  }

  // when there are available methods, return all other metadata
  const otherMetadata = Object.fromEntries(
    Object.entries(pathData).filter((d) => !isHTTPMethod(d))
  );

  return [
    { ...Object.fromEntries(methodsForEnvironment), ...otherMetadata },
    methodsChanged,
  ];
}

// we need to escape routes to match spec refs
// https://swagger.io/docs/specification/v3_0/using-ref/#escape-characters
function escapeRoute(route) {
  return route.replace(/\~/g, "~0").replace(/\//g, "~1");
}

function filterPaths(paths, environment) {
  const filtered = {};
  let pathsChanged = false;
  const removedRoutes = [];

  if (paths) {
    for (const [route, metadata] of Object.entries(paths)) {
      const [filteredPathData, changed] = filterPathDataForEnvironment(
        metadata,
        environment
      );
      pathsChanged = pathsChanged || changed;

      if (hasData(filteredPathData)) {
        filtered[route] = filteredPathData;
      } else {
        removedRoutes.push(escapeRoute(route));
      }
    }
  }

  return [filtered, pathsChanged, removedRoutes];
}

function pruneRefs(spec, allRemovedRoutes) {
  const pruned = {};
  let changed = false;

  if (spec.paths) {
    for (const [route, pathData] of Object.entries(spec.paths)) {
      if (
        Object.hasOwn(pathData, "$ref") &&
        allRemovedRoutes.has(pathData["$ref"])
      ) {
        // Drop refs to removed routes
        changed = true;
        continue;
      } else {
        pruned[route] = pathData;
      }
    }
  } else {
    return [{}, false];
  }

  return [pruned, changed];
}

// js-yaml drops comments on load/dump, so we should capture the leading
// comment block separately and re-prepend.
function extractHeaderComments(content) {
  const lines = content.split("\n");
  let end = 0;
  while (
    end < lines.length &&
    (lines[end] === "" || lines[end].trimStart().startsWith("#"))
  ) {
    end++;
  }
  return end === 0 ? "" : lines.slice(0, end).join("\n") + "\n";
}

function loadSpecFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  return {
    path: filePath,
    header: extractHeaderComments(content),
    spec: yaml.load(content),
  };
}

function getYamlFiles(specDir) {
  return fs
    .readdirSync(specDir)
    .filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"))
    .map((file) => path.join(specDir, file));
}

function writeFile(filePath, fileData) {
  if (fileData.shouldWrite) {
    fs.writeFileSync(filePath, fileData.header + yaml.dump(fileData.spec));
  }
}

function filterByAvailability(specDir, environment) {
  const files = getYamlFiles(specDir).map((filePath) => loadSpecFile(filePath));

  const mapping = {};
  const allRemovedRoutes = new Set();
  for (const file of files) {
    // filter methods by x-availability
    const [filteredPaths, shouldWrite, removedRoutes] = filterPaths(
      file.spec.paths,
      environment
    );
    file.spec.paths = filteredPaths;

    // store removed routes for pruning refs later
    const fileName = file.path.split("/").at(-1);
    removedRoutes.forEach((e) =>
      allRemovedRoutes.add(`${fileName}#/paths/${e}`)
    );

    // store file, data mapping for tracking/writing file changes later
    mapping[file.path] = {
      spec: file.spec,
      header: file.header,
      shouldWrite,
    };
  }

  // prune dangling refs
  for (const [filePath, fileData] of Object.entries(mapping)) {
    const [prunedPaths, changed] = pruneRefs(fileData.spec, allRemovedRoutes);

    if (changed) {
      mapping[filePath].spec.paths = prunedPaths;
      fileData.shouldWrite = true;
    }
  }

  // write files with updates
  Object.entries(mapping).forEach(([filePath, fileData]) =>
    writeFile(filePath, fileData)
  );
}

module.exports = {
  isAvailableInEnvironment,
  filterByAvailability,
  filterPaths,
  filterPathDataForEnvironment,
  extractHeaderComments,
  escapeRoute,
  pruneRefs,
};
