// @ts-check
const { generateMermaidDiagrams } = require("./generate-mermaid-diagrams.js");

// /** @type {Array<import("./identify-missing-changes").VersionConfig>} */
// let versionConfig;
// /** @type {Array<string>} */
// let changedFiles;

describe("generateMermaidDiagrams", () => {
  describe("given a simple schema", () => {
    it("renders as an erDiagram", () => {
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
});
