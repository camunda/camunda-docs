export default {
  components: [
    {
      text: "## Life Insurance Policy Review Checklist",
      label: "Text view",
      type: "text",
      layout: {
        row: "Row_0e2bq35",
        columns: null,
      },
      id: "Field_1pv5p2k",
    },
    {
      text: "**Please complete all applicable sections of this checklist.**",
      label: "Text view",
      type: "text",
      layout: {
        row: "Row_1519a5l",
        columns: null,
      },
      id: "Field_0ykusvv",
    },
    {
      label: "Name",
      type: "textfield",
      layout: {
        row: "Row_0hqc9xn",
        columns: null,
      },
      id: "Field_05l2s7c",
      key: "name",
    },
    {
      label: "Phone",
      type: "textfield",
      layout: {
        row: "Row_0hqc9xn",
        columns: null,
      },
      id: "Field_0nw7e1c",
      key: "phone",
      validate: {
        validationType: "phone",
      },
      appearance: {
        prefixAdorner: "📞",
      },
    },
    {
      label: "Address",
      type: "textarea",
      layout: {
        row: "Row_16jgpnt",
        columns: null,
      },
      id: "Field_0c9oub7",
      key: "address",
    },
    {
      label: "Email",
      type: "textfield",
      layout: {
        row: "Row_16jgpnt",
        columns: null,
      },
      id: "Field_0wihkt2",
      key: "mail",
      appearance: {
        prefixAdorner: "@",
      },
      validate: {
        validationType: "email",
      },
    },
    {
      text: "**Life changes that have occured since I purchased my policy:**",
      label: "Text view",
      type: "text",
      layout: {
        row: "Row_0d69za8",
        columns: null,
      },
      id: "Field_0e5rxxt",
    },
    {
      values: [
        {
          label: "New home",
          value: "newHome",
        },
        {
          label: "New child or grandchild",
          value: "newChild",
        },
        {
          label: "Change in marital status",
          value: "maritalStatus",
        },
        {
          label: "New employment or promotion",
          value: "newEmployment",
        },
      ],
      label: "",
      type: "checklist",
      layout: {
        row: "Row_02dre9n",
        columns: null,
      },
      id: "Field_1lxsifl",
      key: "lifeChanges1",
    },
    {
      values: [
        {
          label: "Change in health",
          value: "healthChange",
        },
        {
          label: "Retirement",
          value: "retirement",
        },
      ],
      label: "",
      type: "checklist",
      layout: {
        row: "Row_02dre9n",
        columns: null,
      },
      id: "Field_1ihczi1",
      key: "lifeChanges2",
    },
  ],
  type: "default",
  id: "Form_PolicyReview",
  executionPlatform: "Camunda Cloud",
  executionPlatformVersion: "8.3.0",
  exporter: {
    name: "Camunda Modeler",
    version: "5.17.0",
  },
  schemaVersion: 12,
};
