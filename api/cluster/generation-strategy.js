const fs = require("fs");
const yaml = require("js-yaml");

const METHODS = ["get", "post", "put", "patch", "delete"];
const MAX_SUMMARY_LENGTH = 120;

// A few operations in the upstream specs have a paragraph in `summary` instead
// of a short title plus a `description`, and the plugin can't generate a page
// for them. Until the upstream specs are fixed, these titles are applied before
// generation. Remove an entry once the upstream spec has a proper summary.
const SUMMARY_FALLBACKS = {
  "PATCH /routing-state": "Update the routing state",
  "PUT /partitioning": "Update the partition distribution configuration",
  "PUT /zones": "Migrate a zone to a zone-aware topology",
};

// Upstream exporter-api.yaml uses the placeholder title "API Title".
const TITLE_FALLBACKS = {
  "exporter-api.yaml": "Exporters API",
};

function preGenerateDocs(config) {
  const spec = yaml.load(fs.readFileSync(config.specPath, "utf8"));
  let changed = false;

  const titleFallback = TITLE_FALLBACKS[config.specPath.split("/").pop()];
  if (titleFallback && spec.info && spec.info.title === "API Title") {
    spec.info.title = titleFallback;
    changed = true;
  }

  for (const [route, pathItem] of Object.entries(spec.paths || {})) {
    for (const method of METHODS) {
      const operation = pathItem[method];
      if (!operation) continue;

      // Summary and description set on the path item apply to its operations.
      for (const key of ["summary", "description"]) {
        if (pathItem[key] && !operation[key]) {
          operation[key] = pathItem[key];
          changed = true;
        }
      }

      const fallback = SUMMARY_FALLBACKS[`${method.toUpperCase()} ${route}`];
      if (
        fallback &&
        typeof operation.summary === "string" &&
        operation.summary.length > MAX_SUMMARY_LENGTH
      ) {
        const text = operation.summary.replace(/\s+/g, " ").trim();
        operation.description = operation.description
          ? `${text}\n\n${operation.description}`
          : text;
        operation.summary = fallback;
        changed = true;
      }
    }
  }

  if (changed) {
    fs.writeFileSync(
      config.specPath,
      yaml.dump(spec, { lineWidth: -1, noRefs: true }),
      "utf8"
    );
  }
}

function postGenerateDocs() {}

module.exports = {
  preGenerateDocs,
  postGenerateDocs,
};
