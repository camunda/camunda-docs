/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

module.exports = {
  "Tasklist API (REST)": [
    "apis-tools/tasklist-api-rest/tasklist-api-rest-overview",
    {
      type: "link",
      href: "/api/tasklist/docs/tasklist-rest-api/",
      label: "Tasklist API (REST) Explorer",
      className: "internalLink",
    },
    "apis-tools/tasklist-api-rest/tasklist-api-rest-authentication",
    "apis-tools/tasklist-api-rest/migrate-to-zeebe-user-tasks",
    "apis-tools/tasklist-api-rest/tasklist-api-rest-tutorial",
  ],
};
