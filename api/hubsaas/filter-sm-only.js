// Filter out APIs that are only available in Self-Managed
// Self-Managed-only endpoints are marked with x-availability: SM
// All other endpoints, including x-availability: "SaaS" and those
// without an x-availability property, are availabe in SaaS.

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

function filterPaths(paths) {
  if (!paths) return {};

  return Object.fromEntries(
    Object.entries(paths)
      .map(([route, methods]) => {
        const filteredMethods = Object.fromEntries(
          Object.entries(methods).filter(
            ([, metadata]) =>
              !Object.hasOwn(metadata, "x-availability") ||
              metadata["x-availability"].toLowerCase() == "sm"
          )
        );
        return [route, filteredMethods];
      })
      .filter(([, methods]) => Object.keys(methods).length > 0)
  );
}

// A path item that is just `{ $ref: "otherfile.yaml#/paths/~1foo" }` points at a
// whole path item defined in another spec file. If filterPaths() removed that
// path entirely from the target file (all its methods were SM-only), the ref
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

function filterSelfManagedOnly(specDir) {
  const yamlFiles = fs
    .readdirSync(specDir)
    .filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"))
    .map((file) => path.join(specDir, file));

  const specs = new Map();
  for (const filePath of yamlFiles) {
    const content = fs.readFileSync(filePath, "utf8");
    const spec = yaml.load(content);
    spec.paths = filterPaths(spec.paths);
    specs.set(filePath, spec);
  }

  for (const spec of specs.values()) {
    spec.paths = pruneDanglingRefs(spec.paths, specDir, specs);
  }

  for (const [filePath, spec] of specs) {
    fs.writeFileSync(filePath, yaml.dump(spec));
  }
}

exports.filterSelfManagedOnly = filterSelfManagedOnly;
