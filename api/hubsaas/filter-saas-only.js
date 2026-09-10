// Keep only APIs available in SaaS: endpoints with no
// x-availability property, or with x-availability: "SaaS".

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
              metadata["x-availability"].toLowerCase() === "saas"
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

function filterSaaSOnly(specDir) {
  const yamlFiles = fs
    .readdirSync(specDir)
    .filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"))
    .map((file) => path.join(specDir, file));

  const specs = new Map();
  const headers = new Map();
  for (const filePath of yamlFiles) {
    const content = fs.readFileSync(filePath, "utf8");
    headers.set(filePath, extractHeaderComments(content));
    const spec = yaml.load(content);
    spec.paths = filterPaths(spec.paths);
    specs.set(filePath, spec);
  }

  for (const spec of specs.values()) {
    spec.paths = pruneDanglingRefs(spec.paths, specDir, specs);
  }

  for (const [filePath, spec] of specs) {
    fs.writeFileSync(filePath, headers.get(filePath) + yaml.dump(spec));
  }
}

exports.filterSaaSOnly = filterSaaSOnly;
