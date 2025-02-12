import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "version-8.6/apis-tools/camunda-api-rest/specifications/camunda-8-rest-api",
    },
    {
      type: "category",
      label: "Job",
      items: [
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/activate-jobs",
          label: "Activate jobs",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Decision definition",
      items: [
        {
          type: "doc",
          id: "version-8.6/apis-tools/camunda-api-rest/specifications/evaluate-decision",
          label: "Evaluate decision",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
