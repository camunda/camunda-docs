const root_dir = "components/modeler/forms/";
const lib_dir = root_dir + "form-element-library/";
const config_dir = root_dir + "configuration/";

module.exports = {
  "Camunda Forms": [
    root_dir + "camunda-forms-reference",
    {
      "Form Element Library": [
        lib_dir + "forms-element-library",
        lib_dir + "forms-element-library-text",
        lib_dir + "forms-element-library-html",
        lib_dir + "forms-element-library-textfield",
        lib_dir + "forms-element-library-textarea",
        lib_dir + "forms-element-library-number",
        lib_dir + "forms-element-library-datetime",
        lib_dir + "forms-element-library-checkbox",
        lib_dir + "forms-element-library-radio",
        lib_dir + "forms-element-library-select",
        lib_dir + "forms-element-library-checkbox-group",
        lib_dir + "forms-element-library-taglist",
        lib_dir + "forms-element-library-group",
        lib_dir + "forms-element-library-dynamiclist",
        lib_dir + "forms-element-library-iframe",
        lib_dir + "forms-element-library-table",
        lib_dir + "forms-element-library-expression",
        lib_dir + "forms-element-library-filepicker",
        lib_dir + "forms-element-library-document-preview",
        lib_dir + "forms-element-library-image",
        lib_dir + "forms-element-library-spacer",
        lib_dir + "forms-element-library-separator",
        lib_dir + "forms-element-library-button",
      ],
    },
    {
      Configuration: [
        config_dir + "forms-config-data-binding",
        config_dir + "forms-config-options",
        config_dir + "forms-config-table-data-binding",
        config_dir + "forms-config-templating-syntax",
      ],
    },
  ],
};
