import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-tools/operate-api/specifications/operate-public-api",
    },
    {
      type: "category",
      label: "ProcessDefinition",
      items: [
        {
          type: "doc",
          id: "apis-tools/operate-api/specifications/search-2",
          label: "Search process definitions",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/operate-api/specifications/by-key-2",
          label: "Get process definition by key",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/operate-api/specifications/xml-by-key",
          label: "Get process definition as XML by key",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "DecisionDefinition",
      items: [
        {
          type: "doc",
          id: "apis-tools/operate-api/specifications/search-7",
          label: "Search decision definitions",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/operate-api/specifications/by-key-6",
          label: "Get decision definition by key",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "DecisionInstance",
      items: [
        {
          type: "doc",
          id: "apis-tools/operate-api/specifications/search-6",
          label: "Search decision instances",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/operate-api/specifications/by-id",
          label: "Get decision instance by id",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "FlownodeInstance",
      items: [
        {
          type: "doc",
          id: "apis-tools/operate-api/specifications/search-4",
          label: "Search flownode-instances",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/operate-api/specifications/by-key-4",
          label: "Get flow node instance by key",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Variable",
      items: [
        {
          type: "doc",
          id: "apis-tools/operate-api/specifications/search",
          label: "Search variables for process instances",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/operate-api/specifications/by-key",
          label: "Get variable by key",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "ProcessInstance",
      items: [
        {
          type: "doc",
          id: "apis-tools/operate-api/specifications/search-1",
          label: "Search process instances",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/operate-api/specifications/by-key-1",
          label: "Get process instance by key",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/operate-api/specifications/delete",
          label: "Delete process instance and all dependant data by key",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/operate-api/specifications/get-statistics",
          label: "Get flow node statistic by process instance id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/operate-api/specifications/sequence-flows-by-key",
          label: "Get sequence flows of process instance by key",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "DecisionRequirements",
      items: [
        {
          type: "doc",
          id: "apis-tools/operate-api/specifications/search-5",
          label: "Search decision requirements",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/operate-api/specifications/by-key-5",
          label: "Get decision requirements by key",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/operate-api/specifications/xml-by-key-1",
          label: "Get decision requirements as XML by key",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Incident",
      items: [
        {
          type: "doc",
          id: "apis-tools/operate-api/specifications/search-3",
          label: "Search incidents",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/operate-api/specifications/by-key-3",
          label: "Get incident by key",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
