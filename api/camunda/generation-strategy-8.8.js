/**
 * This file is an enhanced version of camunda/camunda-docs/api/camunda/generation-strategy.js
 * It supports the the transform of the new spec for docs.
 * It strips out the constraint metadata for the CamundaKey types, adds eventually consistent admonitions, and removes vendor extensions.
 */

const removeDuplicateVersionBadge = require("../remove-duplicate-version-badge");
const fs = require("fs");
const yaml = require("js-yaml");

function preGenerateDocs(config) {
  const originalSpec = fs.readFileSync(config.specPath, "utf8");

  console.log("adjusting C8 spec file...");

  // Apply transforms cumulatively in order, passing the current spec to each.
  // Previously, each helper received the original spec and produced a full-document
  // replacement, causing later steps to overwrite earlier ones (e.g., flattening).
  let updatedSpec = originalSpec;

  for (const update of addDisclaimer(updatedSpec)) {
    updatedSpec = updatedSpec.replace(update.from, update.to);
  }
  for (const update of addAlphaAdmonition()) {
    updatedSpec = updatedSpec.replace(update.from, update.to);
  }
  for (const update of addFrequentlyLinkedDocs(config.version)) {
    updatedSpec = updatedSpec.replace(update.from, update.to);
  }
  for (const update of flattenPathParams(updatedSpec)) {
    updatedSpec = updatedSpec.replace(update.from, update.to);
  }
  for (const update of stripCamundaKeyConstraintsForDocs(updatedSpec)) {
    updatedSpec = updatedSpec.replace(update.from, update.to);
  }

  fs.writeFileSync(config.specPath, updatedSpec);

  // Add eventual consistency admonitions based on vendor extension `x-eventually-consistent: true`
  addEventualConsistencyAdmonition(config.specPath);

  // This must happen after eventual consistency admonitions (and any other transforms that need vendor extensions)
  // Remove all vendor extensions. Docusaurus does not like them. See: https://github.com/PaloAltoNetworks/docusaurus-openapi-docs/issues/891
  removeVendorExtensions(config.specPath);
}

// This will break if the specification title is changed
function postGenerateDocs(config) {
  removeDuplicateVersionBadge(
    `${config.outputDir}/orchestration-cluster-api.info.mdx`
  );
  // Replace consistency marker tokens with MDX components and add imports
  replaceConsistencyMarkersWithComponents(config.outputDir);
  console.log(`✅ Added eventual consistency admonitions`);
}

function addDisclaimer(originalSpec) {
  // Make this a repeatable task by checking if it's run already.
  if (
    originalSpec.includes(
      "Disclaimer: This is a modified version of the Camunda REST API specification, optimized for the documentation."
    )
  ) {
    console.log("skipping addDisclaimer...");
    return [];
  }

  // Adds a disclaimer to the very beginning of the file, so that people know this isn't the true spec.
  return [
    {
      from: /^/,
      to: `# Disclaimer: This is a modified version of the Camunda REST API specification, optimized for the documentation.

`,
    },
  ];
}

function addAlphaAdmonition() {
  // This task is inherently repeatable, because the `match` is replaced by something that won't match again.

  return [
    {
      // Matches an empty line, followed by an alpha warning, with these capture groups:
      //  $1: the blank line before the warning
      //  $2: the indentation before the warning
      //  $3: the warning text
      from: /^([^\S\n]*\n)([^\S\n]*)(This endpoint is an alpha feature and may be subject to change\n[\s]*in future releases.\n)/gm,

      // Surrounds the warning with `:::note` and `:::`, creating an admonition.
      to: "$1$2:::note\n$2$3$2:::\n",
    },
  ];
}

function addFrequentlyLinkedDocs(version) {
  // This task is inherently repeatable, because the `match` is replaced by something that won't match again.

  // The path to the alpha doc varies by version.
  const otherAlphaPaths = {
    8.6: "/reference/alpha-features.md",
    8.5: "/reference/alpha-features.md",
    8.4: "/reference/alpha-features.md",
    8.3: "/reference/alpha-features.md",
  };
  const alphaPath =
    otherAlphaPaths[version] ||
    "/components/early-access/alpha/alpha-features.md";

  // Adds links to the Camunda Alpha REST API documentation, so that they don't have to live in the upstream spec.
  return [
    {
      from: /The Orchestration cluster API Overview page/g,
      to: "The [Orchestration cluster API Overview page](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-overview.md#query-api)",
    },
    {
      from: /endpoint is an alpha feature/g,
      to: `endpoint is an [alpha feature](${alphaPath})`,
    },
  ];
}

// Make path parameters more readable by flattening them into inline primitive types, so they display as `string<ProcessInstanceKey>` instead of `object`.
// Flattens $ref-based path parameter schemas into inline primitive types
// by resolving one level of allOf inheritance. Preserves format, pattern, and description.
// This is necessary because the Camunda REST API uses schema inheritance to express domain types for
// Camunda keys, which results in a complex schema structure
//   e.g. { $ref: "#/components/schemas/ProcessInstanceKey" },
//          allOf: [ { $ref: "#/components/schemas/CamundaKey
// If we don't flatten this, the docs say it is a complex object, which is not true.
// We also modify the format to include the schema name, so that it is clear what domain type it is.
//   e.g. format: "string<ProcessInstanceKey>"
// Otherwise Docusaurus will not render the type correctly, and it will be displayed as the generic `Camunda Key`
function flattenPathParams(originalSpec) {
  const doc = yaml.load(originalSpec);

  const schemas = doc.components?.schemas || {};

  // Traverse all paths and operations
  for (const path of Object.values(doc.paths || {})) {
    for (const operation of Object.values(path)) {
      const parameters = operation.parameters;
      if (!Array.isArray(parameters)) continue;

      for (const param of parameters) {
        if (!param.schema) continue;

        // Helper to resolve a chain of allOf/$ref to a primitive base schema
        function resolveChain(firstSchemaName) {
          let currentName = firstSchemaName;
          let safety = 0;
          let example;
          while (currentName && safety < 10) {
            safety++;
            const current = schemas[currentName];
            if (!current) break;
            if (current.example && example === undefined)
              example = current.example;
            if (current.type) {
              return { base: current, example };
            }
            // Descend one more level if there is an allOf with a $ref
            const nextRef = current.allOf && current.allOf.find((e) => e.$ref);
            if (!nextRef) break;
            const m = nextRef.$ref.match(/^#\/components\/schemas\/(.+)$/);
            if (!m) break;
            currentName = m[1];
          }
          return null;
        }

        // Case 1: Direct $ref (previous behaviour)
        if (param.schema.$ref) {
          const ref = param.schema.$ref;
          const match = ref.match(/^#\/components\/schemas\/(.+)$/);
          if (match) {
            const schemaName = match[1];
            const schema = schemas[schemaName];
            if (schema && schema.allOf) {
              const refSchema = schema.allOf.find((e) => e.$ref);
              const extraProps = schema.allOf.find(
                (e) => e.description || e.type || e.example
              );
              const baseMatch = refSchema?.$ref?.match(
                /^#\/components\/schemas\/(.+)$/
              );
              if (baseMatch) {
                const resolution = resolveChain(baseMatch[1]);
                if (resolution && resolution.base.type) {
                  const { base, example } = resolution;
                  // Avoid double-wrapping formats like string<string<...>>
                  const existingFormat = base.format || "";
                  const wrappedFormat = existingFormat.includes("<")
                    ? existingFormat
                    : `string<${schemaName}>`;
                  param.schema = {
                    type: base.type,
                    format: wrappedFormat,
                    // Intentionally omit pattern/minLength/maxLength so they don't surface in docs
                    example: extraProps?.example || base.example || example,
                    description: extraProps?.description || base.description,
                  };
                }
              }
            }
          }
          continue;
        }

        // Case 2: Parameter schema itself is an allOf wrapper pointing (possibly indirectly) to a primitive string
        if (param.schema.allOf) {
          // Find first $ref inside this allOf
          const firstRefEntry = param.schema.allOf.find((e) => e.$ref);
          if (!firstRefEntry) continue;
          const refMatch = firstRefEntry.$ref.match(
            /^#\/components\/schemas\/(.+)$/
          );
          if (!refMatch) continue;
          const topSchemaName = refMatch[1];
          const resolution = resolveChain(topSchemaName);
          if (!resolution) continue;
          const { base } = resolution;
          // Collect description/example from any non-$ref entries
          const metaEntry = param.schema.allOf.find((e) => !e.$ref) || {};
          const existingFormat = base.format || "";
          const wrappedFormat = existingFormat.includes("<")
            ? existingFormat
            : `string<${topSchemaName}>`;
          param.schema = {
            type: base.type || "string",
            format: wrappedFormat,
            description: metaEntry.description || base.description,
            example: metaEntry.example || base.example,
            // Omit constraints
          };
        }
      }
    }
  }

  return [
    {
      from: /[\s\S]*/, // match entire document
      to: yaml.dump(doc, { lineWidth: -1 }), // prevent line wrapping
    },
  ];
}

/**
 * Get rid of the constraints on CamundaKey schemas. We don't want to clutter the docs with these constraints,
 * but we do want them to be present in the schema for validation purposes.
 */
function stripCamundaKeyConstraintsForDocs(originalSpec) {
  const doc = yaml.load(originalSpec);
  const schemas = doc.components?.schemas || {};

  const TARGET_PROP_NAMES = ["pattern", "minLength", "maxLength"]; // could add format constraints later

  function stripProps(obj) {
    if (!obj || typeof obj !== "object") return;
    for (const p of TARGET_PROP_NAMES) {
      if (p in obj) delete obj[p];
    }
  }

  function referencesCamundaKey(schema) {
    if (!schema) return false;
    if (schema.$ref === "#/components/schemas/CamundaKey") return true;
    if (Array.isArray(schema.allOf)) {
      return schema.allOf.some(
        (e) => e.$ref === "#/components/schemas/CamundaKey"
      );
    }
    return false;
  }

  for (const [name, schema] of Object.entries(schemas)) {
    // Identify candidate domain identifier schemas by:
    // 1. Naming convention (ends with Key or Id)
    // 2. Having an x-semantic-type (still present at this stage)
    // 3. Referencing CamundaKey via $ref or allOf
    const nameMatches = /(?:Key|Id)$/.test(name);
    const hasSemantic =
      schema && Object.keys(schema).some((k) => k === "x-semantic-type");
    const refChain = referencesCamundaKey(schema);
    if (!(nameMatches || hasSemantic || refChain)) continue;

    // Strip on root
    stripProps(schema);

    // Strip inside allOf non-$ref parts
    if (Array.isArray(schema.allOf)) {
      for (const part of schema.allOf) {
        if (part && typeof part === "object") {
          // Also strip constraints from entries that both $ref and override metadata (pattern/min/max) live on.
          stripProps(part);
        }
      }
    }
  }

  // Also strip constraints from already-flattened inline parameter schemas (e.g., path params)
  if (doc.paths) {
    for (const pathItem of Object.values(doc.paths)) {
      if (!pathItem || typeof pathItem !== "object") continue;
      for (const op of Object.values(pathItem)) {
        if (!op || typeof op !== "object") continue;
        const params = op.parameters;
        if (!Array.isArray(params)) continue;
        for (const p of params) {
          const s = p && p.schema;
          if (!s || typeof s !== "object") continue;
          // Detect flattened domain identifier by format: string<SchemaName>
          const fmt = s.format;
          if (fmt && /^string<[^>]+>$/.test(fmt)) {
            stripProps(s);
          } else if (s.$ref === "#/components/schemas/CamundaKey") {
            stripProps(s);
          } else if (
            Array.isArray(s.allOf) &&
            s.allOf.some((e) => e.$ref === "#/components/schemas/CamundaKey")
          ) {
            stripProps(s);
            s.allOf.forEach((part) => {
              if (part) stripProps(part);
            });
          }
        }
      }
    }
  }

  return [
    {
      from: /[\s\S]*/, // match entire document
      to: yaml.dump(doc, { lineWidth: -1 }),
    },
  ];
}

/**
 * Add a documentation note for eventual consistency to all endpoints that need it.
 */
function addEventualConsistencyAdmonition(specFilePath) {
  const EVENTUAL_CONSISTENCY_VENDOR_EXTENSION = "x-eventually-consistent";
  try {
    // Read and parse the YAML file
    const fileContents = fs.readFileSync(specFilePath, "utf8");
    const spec = yaml.load(fileContents);
    let admonitionsAdded = 0;
    // Process each path and operation for eventual consistency
    if (spec.paths) {
      Object.keys(spec.paths).forEach((pathKey) => {
        const pathItem = spec.paths[pathKey];

        Object.keys(pathItem).forEach((method) => {
          const operation = pathItem[method];

          // Skip non-operation properties (like x-eventually-consistent, parameters, etc.)
          if (
            !operation ||
            typeof operation !== "object" ||
            ![
              "get",
              "post",
              "put",
              "patch",
              "delete",
              "options",
              "head",
              "trace",
            ].includes(method)
          ) {
            return;
          }

          // Check if this operation has the eventual consistency marker (either on the operation or inherited from path)
          const operationHasEventualConsistency =
            operation[EVENTUAL_CONSISTENCY_VENDOR_EXTENSION] === true;

          const operationHasStrongConsistency =
            operation[EVENTUAL_CONSISTENCY_VENDOR_EXTENSION] === false;

          const token = operationHasEventualConsistency
            ? "\n\n[[CONSISTENCY:EVENTUAL]]\n\n"
            : operationHasStrongConsistency
              ? "\n\n[[CONSISTENCY:STRONG]]\n\n"
              : "";
          if (operation.description) {
            operation.description = token + operation.description;
          } else {
            operation.description = token.trim();
          }
          admonitionsAdded++;
        });
      });
    }

    // Write the updated spec back to the file
    const updatedYaml = yaml.dump(spec, {
      lineWidth: -1,
      noRefs: true,
      sortKeys: false,
    });
    fs.writeFileSync(specFilePath, updatedYaml, "utf8");

    console.log(
      `✅ Added ${admonitionsAdded} eventual consistency admonitions`
    );
  } catch (error) {
    console.error("❌ Error processing eventual consistency:", error);
  }
}

// Remove all vendor extensions recursively (x-eventually-consistent, x-semantic-type, etc.)
function removeVendorExtensions(specFilePath) {
  function recursivelyRemoveVendorExtension(obj) {
    if (obj && typeof obj === "object") {
      if (Array.isArray(obj)) {
        obj.forEach((item) => recursivelyRemoveVendorExtension(item));
      } else {
        Object.keys(obj).forEach((key) => {
          if (key.startsWith("x-")) {
            delete obj[key];
          } else {
            recursivelyRemoveVendorExtension(obj[key]);
          }
        });
      }
    }
  }

  try {
    // Read and parse the YAML file
    const fileContents = fs.readFileSync(specFilePath, "utf8");
    const spec = yaml.load(fileContents);

    recursivelyRemoveVendorExtension(spec);

    // Write the updated spec back to the file
    const updatedYaml = yaml.dump(spec, {
      lineWidth: -1,
      noRefs: true,
      sortKeys: false,
    });
    fs.writeFileSync(specFilePath, updatedYaml, "utf8");

    console.log("✅ Removed all vendor extensions");
  } catch (error) {
    console.error("❌ Error removing vendor extensions:", error);
  }
}

module.exports = {
  preGenerateDocs,
  postGenerateDocs,
};

// ---- Helpers to replace placeholder tokens with MDX components in generated files ----
function replaceConsistencyMarkersWithComponents(outputDir) {
  try {
    const fs = require("fs");

    const files = listFilesRecursive(outputDir).filter((f) =>
      f.endsWith(".mdx")
    );
    for (const file of files) {
      let content = fs.readFileSync(file, "utf8");
      const hasEC = content.includes("[[CONSISTENCY:EVENTUAL]]");
      const hasSC = content.includes("[[CONSISTENCY:STRONG]]");
      if (!hasEC && !hasSC) continue;

      let updated = content;
      // Ensure imports exist (insert after frontmatter if present)
      const importEC =
        "import MarkerEventuallyConsistentExtension from '@site/src/mdx/MarkerEventuallyConsistentExtension';";
      const importSC =
        "import MarkerStronglyConsistentExtension from '@site/src/mdx/MarkerStronglyConsistentExtension';";

      const lines = updated.split("\n");
      let insertIdx = 0;
      if (lines[0] && lines[0].startsWith("---")) {
        // Skip frontmatter
        const endIdx = lines.indexOf("---", 1);
        insertIdx = endIdx >= 0 ? endIdx + 1 : 0;
      }
      const alreadyHasEC = updated.includes(importEC);
      const alreadyHasSC = updated.includes(importSC);
      const importsToAdd = [];
      if (hasEC && !alreadyHasEC) importsToAdd.push(importEC);
      if (hasSC && !alreadyHasSC) importsToAdd.push(importSC);
      if (importsToAdd.length) {
        lines.splice(insertIdx, 0, ...importsToAdd, "");
        updated = lines.join("\n");
      }

      // Replace tokens with components
      if (hasEC) {
        updated = updated.replaceAll(
          "[[CONSISTENCY:EVENTUAL]]",
          "<MarkerEventuallyConsistentExtension />"
        );
      }
      if (hasSC) {
        updated = updated.replaceAll(
          "[[CONSISTENCY:STRONG]]",
          "<MarkerStronglyConsistentExtension />"
        );
      }
      if (updated !== content) fs.writeFileSync(file, updated, "utf8");
    }
  } catch (err) {
    console.error("❌ Error replacing consistency markers in output MDX:", err);
  }
}

function listFilesRecursive(dir) {
  const fs = require("fs");
  const path = require("path");
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) out.push(...listFilesRecursive(p));
    else out.push(p);
  }
  return out;
}
