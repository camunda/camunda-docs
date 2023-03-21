module.exports = [
  { type: "doc", id: "api/operate/operate-public-api" },
  {
    type: "category",
    label: "ProcessInstance",
    link: {
      type: "generated-index",
      title: "ProcessInstance",
      slug: "/category/api/operate/process-instance",
    },
    items: [
      {
        type: "doc",
        id: "api/operate/search-1",
        label: "Search process instances",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "api/operate/by-key-1",
        label: "Get process instance by key",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "api/operate/delete",
        label: "Delete process instance and all dependant data by key",
        className: "api-method delete",
      },
    ],
  },
  {
    type: "category",
    label: "ProcessDefinition",
    link: {
      type: "generated-index",
      title: "ProcessDefinition",
      slug: "/category/api/operate/process-definition",
    },
    items: [
      {
        type: "doc",
        id: "api/operate/search-2",
        label: "Search process definitions",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "api/operate/by-key-2",
        label: "Get process definition by key",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "api/operate/xml-by-key",
        label: "Get process definition as XML by key",
        className: "api-method get",
      },
    ],
  },
  {
    type: "category",
    label: "Flownode-instance",
    link: {
      type: "generated-index",
      title: "Flownode-instance",
      slug: "/category/api/operate/flownode-instance",
    },
    items: [
      {
        type: "doc",
        id: "api/operate/search-4",
        label: "Search flownode-instances",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "api/operate/by-key-4",
        label: "Get flow node instance by key",
        className: "api-method get",
      },
    ],
  },
  {
    type: "category",
    label: "Variable",
    link: {
      type: "generated-index",
      title: "Variable",
      slug: "/category/api/operate/variable",
    },
    items: [
      {
        type: "doc",
        id: "api/operate/search",
        label: "Search variables for process instances",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "api/operate/by-key",
        label: "Get variable by key",
        className: "api-method get",
      },
    ],
  },
  {
    type: "category",
    label: "Incident",
    link: {
      type: "generated-index",
      title: "Incident",
      slug: "/category/api/operate/incident",
    },
    items: [
      {
        type: "doc",
        id: "api/operate/search-3",
        label: "Search incidents",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "api/operate/by-key-3",
        label: "Get incident by key",
        className: "api-method get",
      },
    ],
  },
  {
    type: "category",
    label: "Process",
    link: {
      type: "generated-index",
      title: "Process",
      slug: "/category/api/operate/process",
    },
    items: [
      {
        type: "doc",
        id: "api/operate/by-key-2",
        label: "Get process definition by key",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "api/operate/xml-by-key",
        label: "Get process definition as XML by key",
        className: "api-method get",
      },
    ],
  },
];
