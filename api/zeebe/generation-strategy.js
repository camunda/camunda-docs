const removeDuplicateVersionBadge = require("../remove-duplicate-version-badge");

function preGenerateDocs(config) {
  hackChangesetDescription(config.specPath);
}

function postGenerateDocs(config) {
  removeDuplicateVersionBadge(`${config.outputDir}/zeebe-rest-api.info.mdx`);
}

module.exports = {
  preGenerateDocs,
  postGenerateDocs,
};

function hackChangesetDescription(specPath) {
  // This is a temporary hack, until https://github.com/camunda/camunda-docs/issues/3568 is resolved.
  //   The OpenAPI generator plugin we're using does not use the correct `description` property
  //   for the `UserTaskUpdateRequest` object. Instead of picking up the actual property description,
  //   it picks up the description of the first merged schema in the `allOf` property (i.e. from the `Changeset` schema).
  // This adjustment replaces the description of the `Changeset` schema with the current description of
  //   the `UserTaskUpdateRequest.changeset` property.
  console.log("hacking changeset description...");
  (async () => {
    const { replaceInFileSync } = await import("replace-in-file");
    replaceInFileSync({
      files: `${specPath}`,
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
  })();
}
