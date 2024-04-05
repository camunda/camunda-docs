const removeDuplicateVersionBadge = require("../remove-duplicate-version-badge");

const outputDir = "docs/apis-tools/zeebe-api-rest/specifications";
const specFile = "api/zeebe/zeebe-openapi.yaml";

function preGenerateDocs() {
  hackChangesetDescription();
}

function postGenerateDocs() {
  removeDuplicateVersionBadge(`${outputDir}/zeebe-rest-api.info.mdx`);
}

module.exports = {
  outputDir,
  preGenerateDocs,
  postGenerateDocs,
};

function hackChangesetDescription() {
  // This is a temporary hack, until https://github.com/camunda/camunda-docs/issues/3568 is resolved.
  //   The OpenAPI generator plugin we're using does not use the correct `description` property
  //   for the `UserTaskUpdateRequest` object. Instead of picking up the actual property description,
  //   it picks up the description of the first merged schema in the `allOf` property (i.e. from the `Changeset` schema).
  // This adjustment replaces the description of the `Changeset` schema with the current description of
  //   the `UserTaskUpdateRequest.changeset` property.
  console.log("hacking changeset description...");
  replace.sync({
    files: `${specFile}`,
    from: /^      description: A map of changes.$/m,
    to: `      description: |
        JSON object with changed task attribute values.

        The following attributes can be adjusted with this endpoint, additional attributes
        will be ignored:

        * \`candidateGroups\` - reset by providing an empty list
        * \`candidateUsers\` - reset by providing an empty list
        * \`dueDate\` - reset by providing an empty String
        * \`followUpDate\` - reset by providing an empty String

        Providing any of those attributes with a \`null\` value or omitting it preserves
        the persisted attribute's value.

        The assignee cannot be adjusted with this endpoint, use the Assign task endpoint.
        This ensures correct event emission for assignee changes.`,
  });
}

function removeDuplicateVersionBadge() {
  // The generator adds a version badge to the Introduction file, but
  //   we already have a version badge from the main docs layout.
  console.log("removing duplicate version badge...");
  replace.sync({
    files:
      "docs/apis-tools/zeebe-api-rest/specifications/zeebe-rest-api.info.mdx",
    from: /^.*Version: .*$/m,
    to: "",
  });
}
