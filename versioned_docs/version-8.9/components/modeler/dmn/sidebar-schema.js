module.exports = {
  DMN: [
    "components/modeler/dmn/desktop-modeler-dmn",
    "components/modeler/dmn/decision-requirements-graph",
    {
      "Decision table": [
        "components/modeler/dmn/decision-table",
        "components/modeler/dmn/decision-table-input",
        "components/modeler/dmn/decision-table-output",
        "components/modeler/dmn/decision-table-rule",
        "components/modeler/dmn/decision-table-hit-policy",
      ],
    },
    "components/modeler/dmn/decision-literal-expression",
    "components/modeler/dmn/dmn-data-types",
  ],
};
