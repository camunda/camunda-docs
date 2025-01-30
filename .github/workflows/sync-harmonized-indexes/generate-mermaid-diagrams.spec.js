// @ts-check
const { generateMermaidDiagrams } = require("./generate-mermaid-diagrams.js");

// /** @type {Array<import("./identify-missing-changes").VersionConfig>} */
// let versionConfig;
// /** @type {Array<string>} */
// let changedFiles;

describe("generateMermaidDiagrams", () => {
  describe("given a simple schema", () => {
    const schema = {
      schema: {
        "schema-name": {
          mappings: {
            properties: {
              "some-keyword": { type: "keyword" },
              "some-long": { type: "long" },
            },
          },
        },
      },
    };

    it("renders as an erDiagram", () => {
      const result = generateMermaidDiagrams(schema);

      expect(result).toEqual(`\`\`\`mermaid
erDiagram

    schema-name {
        keyword some-keyword
        long some-long
    }
\`\`\`
`);
    });
  });

  describe("given a schema with nested properties", () => {
    const schema = {
      schema: {
        "schema-name": {
          mappings: {
            properties: {
              parentKeyword: {
                type: "keyword",
              },
              nestedObject: {
                type: "object",
                properties: {
                  nestedKeyword: { type: "keyword" },
                },
              },
            },
          },
        },
      },
    };

    it("renders a relationship", () => {
      const result = generateMermaidDiagrams(schema);

      expect(result).toEqual(`\`\`\`mermaid
erDiagram

    schema-name {
        keyword parentKeyword
    }

    nestedObject {
        keyword nestedKeyword
    }
    schema-name ||--o{ nestedObject : has
\`\`\`
`);
    });
  });
});
