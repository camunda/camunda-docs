export default {
  components: [
    {
      text: "### Loan application",
      label: "Text view",
      type: "text",
      layout: {
        row: "Row_0lpyctf",
        columns: null,
      },
      id: "Field_1l31cr4",
    },
    {
      components: [
        {
          label: "First name",
          type: "textfield",
          layout: {
            row: "Row_0j82iwy",
            columns: null,
          },
          id: "Field_0ywcv0d",
          key: "firstName",
        },
        {
          label: "Last name",
          type: "textfield",
          layout: {
            row: "Row_0j82iwy",
            columns: null,
          },
          id: "Field_1d0bdti",
          key: "lastName",
        },
        {
          label: "Email",
          type: "textfield",
          layout: {
            row: "Row_16qq7g8",
            columns: 8,
          },
          id: "Field_17b9s67",
          key: "email",
          validate: {
            validationType: "email",
          },
          appearance: {
            prefixAdorner: "@",
          },
        },
      ],
      showOutline: true,
      label: "Personal details",
      type: "group",
      layout: {
        row: "Row_0nc0v8z",
        columns: null,
      },
      id: "Field_1beqiec",
    },
    {
      label: "Salary",
      type: "number",
      layout: {
        row: "Row_16fdav3",
        columns: 8,
      },
      id: "Field_1vm4isw",
      key: "salary",
      appearance: {
        prefixAdorner: "USD",
      },
    },
  ],
  type: "default",
  id: "Form_1jusilq",
  executionPlatform: "Camunda Cloud",
  executionPlatformVersion: "8.3.0",
  exporter: {
    name: "Camunda Modeler",
    version: "5.17.0",
  },
  schemaVersion: 12,
};
