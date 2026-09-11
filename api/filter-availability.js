// Keep only APIs available for a given deployment type: endpoints with no
// x-availability property, or whose x-availability matches the requested value.

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"];

function isHTTPMethod(metadata) {
  return HTTP_METHODS.includes(metadata[0]);
}

function isAvailableInEnvironment(metadata, environment) {
  const available =
    !Object.hasOwn(metadata, "x-availability") ||
    metadata["x-availability"].toLowerCase() === environment.toLowerCase();
  return available;
}

// a path is worth keeping only if it still has an operation or a $ref to one -
// other metadata (summary/description/parameters) shouldn't keep an
// operation-less path alive
function hasOperationOrRef(pathData) {
  return Object.keys(pathData).some(
    (key) => HTTP_METHODS.includes(key) || key === "$ref"
  );
}

function filterMethodsForEnvironment(pathData, environment) {
  return Object.fromEntries(
    Object.entries(pathData)
      .filter(isHTTPMethod)
      .filter(([_, metadata]) =>
        isAvailableInEnvironment(metadata, environment)
      )
  );
}

function otherMetadata(pathData) {
  return Object.fromEntries(
    Object.entries(pathData).filter((d) => !isHTTPMethod(d))
  );
}

function refsOnly(metadata) {
  return Object.fromEntries(
    Object.entries(metadata).filter(([key]) => key === "$ref")
  );
}

function filterPathDataForEnvironment(pathData, environment) {
  const methodsForEnvironment = filterMethodsForEnvironment(
    pathData,
    environment
  );

  if (Object.keys(methodsForEnvironment).length === 0) {
    // when there are no available methods, drop all other metadata except
    // $ref, which will be cleaned up later
    return refsOnly(otherMetadata(pathData));
  }

  // when there are available methods, return all other metadata too
  return { ...methodsForEnvironment, ...otherMetadata(pathData) };
}

// we need to escape routes to match spec refs
// https://swagger.io/docs/specification/v3_0/using-ref/#escape-characters
function escapeRoute(route) {
  return route.replace(/\~/g, "~0").replace(/\//g, "~1");
}

function filterPaths(paths, environment) {
  const filtered = {};
  const removedRoutes = [];

  if (paths) {
    for (const [route, pathData] of Object.entries(paths)) {
      const filteredPathData = filterPathDataForEnvironment(
        pathData,
        environment
      );

      if (hasOperationOrRef(filteredPathData)) {
        filtered[route] = filteredPathData;
      } else {
        removedRoutes.push(escapeRoute(route));
      }
    }
  }

  return [filtered, removedRoutes];
}

function isDanglingRef(pathData, allRemovedRoutes) {
  return (
    Object.hasOwn(pathData, "$ref") && allRemovedRoutes.has(pathData["$ref"])
  );
}

function pruneRefs(paths, allRemovedRoutes) {
  return Object.fromEntries(
    Object.entries(paths).filter(
      ([, pathData]) => !isDanglingRef(pathData, allRemovedRoutes)
    )
  );
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
  fs.writeFileSync(filePath, fileData.header + yaml.dump(fileData.spec));
}

// compare against the original paths to know whether a file needs rewriting,
// instead of threading a "changed" flag through every filtering step
function pathsChanged(before, after) {
  return JSON.stringify(before ?? {}) !== JSON.stringify(after);
}

function filterByAvailability(specDir, environment) {
  const files = getYamlFiles(specDir).map((filePath) => loadSpecFile(filePath));

  const mapping = {};
  const allRemovedRoutes = new Set();
  for (const file of files) {
    const originalPaths = file.spec.paths;

    // filter methods by x-availability
    const [filteredPaths, removedRoutes] = filterPaths(
      originalPaths,
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
      originalPaths,
    };
  }

  // prune dangling refs
  for (const fileData of Object.values(mapping)) {
    fileData.spec.paths = pruneRefs(fileData.spec.paths, allRemovedRoutes);
  }

  // write files whose paths actually changed
  Object.entries(mapping).forEach(([filePath, fileData]) => {
    if (pathsChanged(fileData.originalPaths, fileData.spec.paths)) {
      writeFile(filePath, fileData);
    }
  });
}

module.exports = {
  isAvailableInEnvironment,
  filterByAvailability,
  filterPaths,
  filterPathDataForEnvironment,
  extractHeaderComments,
  escapeRoute,
  pruneRefs,
  pathsChanged,
};
