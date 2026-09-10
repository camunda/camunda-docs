// Keep only APIs available for a given deployment type: endpoints with no
// x-availability property, or whose x-availability matches the requested value.

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"];

function filterPaths(paths, availability) {
  if (!paths) return {};

  return Object.fromEntries(
    Object.entries(paths)
      .map(([route, methods]) => {
        // A path item that's just `{ $ref: ... }` points at a whole path item
        // defined elsewhere; there's no per-method metadata here to filter on.
        // Leave it as-is — pruneDanglingRefs() drops it later if its target
        // ends up empty.
        if (Object.hasOwn(methods, "$ref")) return [route, methods];

        const filteredMethods = Object.fromEntries(
          Object.entries(methods).filter(
            ([, metadata]) =>
              !Object.hasOwn(metadata, "x-availability") ||
              metadata["x-availability"].toLowerCase() === availability
          )
        );
        return [route, filteredMethods];
      })
      .filter(
        ([, methods]) =>
          Object.hasOwn(methods, "$ref") ||
          Object.keys(methods).filter((key) => HTTP_METHODS.includes(key))
            .length > 0
      )
  );
}

// A path item that is just `{ $ref: "otherfile.yaml#/paths/~1foo" }` points at a
// whole path item defined in another spec file. If filterPaths() removed that
// path entirely from the target file (all its methods didn't match), the ref
// here now points at nothing, so drop it too.
function resolveRef(ref) {
  const [file, pointer] = ref.split("#");
  return { file, pointer };
}

function pointerToSegments(pointer) {
  return pointer
    .split("/")
    .slice(1)
    .map((segment) => segment.replace(/~1/g, "/").replace(/~0/g, "~"));
}

function pruneDanglingRefs(paths, specDir, specs) {
  if (!paths) return {};

  return Object.fromEntries(
    Object.entries(paths).filter(([, methods]) => {
      if (!methods || !Object.hasOwn(methods, "$ref")) return true;

      const { file, pointer } = resolveRef(methods["$ref"]);
      if (!file || !pointer) return true;

      const targetSpec = specs.get(path.join(specDir, file));
      if (!targetSpec) return true; // target outside this dir, can't verify

      const target = pointerToSegments(pointer).reduce(
        (acc, segment) => (acc == null ? undefined : acc[segment]),
        targetSpec
      );
      return target !== undefined;
    })
  );
}

// js-yaml drops comments on load/dump, so the leading comment block (e.g. the
// license header) has to be captured separately and re-prepended after dumping.
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

function filterByAvailability(specDir, availability) {
  const yamlFiles = fs
    .readdirSync(specDir)
    .filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"))
    .map((file) => path.join(specDir, file));

  const specs = new Map();
  const headers = new Map();
  const originalPaths = new Map();
  for (const filePath of yamlFiles) {
    const content = fs.readFileSync(filePath, "utf8");
    headers.set(filePath, extractHeaderComments(content));
    const spec = yaml.load(content);
    originalPaths.set(filePath, JSON.stringify(spec.paths ?? {}));
    spec.paths = filterPaths(spec.paths, availability);
    specs.set(filePath, spec);
  }

  for (const spec of specs.values()) {
    spec.paths = pruneDanglingRefs(spec.paths, specDir, specs);
  }

  for (const [filePath, spec] of specs) {
    if (JSON.stringify(spec.paths ?? {}) === originalPaths.get(filePath)) {
      continue; // no endpoints were filtered out, leave file untouched
    }
    fs.writeFileSync(filePath, headers.get(filePath) + yaml.dump(spec));
  }
}

exports.filterByAvailability = filterByAvailability;
