export default {
  components: [
    {
      label: "First name",
      type: "textfield",
      layout: {
        row: "Row_0hqc9xn",
        columns: null,
      },
      id: "Field_05l2s7c",
      key: "firstName",
    },
    {
      label: "Last name",
      type: "textfield",
      layout: {
        row: "Row_0hqc9xn",
        columns: null,
      },
      id: "Field_0nw7e1c",
      key: "lastName",
    },
    {
      label: "Income",
      type: "number",
      layout: {
        row: "Row_1ggwq2d",
        columns: 8,
      },
      id: "Field_12yshuy",
      key: "monthlyNetIncome",
      description: "Monthly net income",
      appearance: {
        prefixAdorner: "USD",
      },
      increment: "100",
      validate: {
        required: true,
        min: 0,
      },
    },
  ],
  type: "default",
  id: "ExampleForm",
  executionPlatform: "Camunda Cloud",
  executionPlatformVersion: "8.4.0",
  exporter: {
    name: "Camunda Modeler",
    version: "5.18.0",
  },
  schemaVersion: 12,
};
