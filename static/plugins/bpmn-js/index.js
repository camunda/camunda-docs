const path = require("path");

// Pin versions to ensure stability
const BPMN_JS_VERSION = "18.9.1";
const DMN_JS_VERSION = "17.4.0";

module.exports = function () {
  return {
    name: "bpmn-js-plugin",
    getClientModules() {
      return [path.resolve(__dirname, "./client")];
    },
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "script",
            attributes: {
              src: `https://unpkg.com/bpmn-js@${BPMN_JS_VERSION}/dist/bpmn-viewer.production.min.js`,
              defer: true,
            },
          },
          {
            tagName: "script",
            attributes: {
              src: `https://unpkg.com/dmn-js@${DMN_JS_VERSION}/dist/dmn-viewer.production.min.js`,
              defer: true,
            },
          },
          {
            tagName: "script",
            attributes: {
              src: "/js/render-diagrams.js",
              defer: true,
            },
          },
          {
            tagName: "link",
            attributes: {
              rel: "stylesheet",
              href: `https://unpkg.com/bpmn-js@${BPMN_JS_VERSION}/dist/assets/diagram-js.css`,
            },
          },
          {
            tagName: "link",
            attributes: {
              rel: "stylesheet",
              href: `https://unpkg.com/bpmn-js@${BPMN_JS_VERSION}/dist/assets/bpmn-js.css`,
            },
          },
          {
            tagName: "link",
            attributes: {
              rel: "stylesheet",
              href: `https://unpkg.com/bpmn-js@${BPMN_JS_VERSION}/dist/assets/bpmn-font/css/bpmn-embedded.css`,
            },
          },
          {
            tagName: "link",
            attributes: {
              rel: "stylesheet",
              href: `https://unpkg.com/dmn-js@${DMN_JS_VERSION}/dist/assets/dmn-js-shared.css`,
            },
          },
          {
            tagName: "link",
            attributes: {
              rel: "stylesheet",
              href: `https://unpkg.com/dmn-js@${DMN_JS_VERSION}/dist/assets/dmn-js-decision-table.css`,
            },
          },
          {
            tagName: "link",
            attributes: {
              rel: "stylesheet",
              href: `https://unpkg.com/dmn-js@${DMN_JS_VERSION}/dist/assets/dmn-font/css/dmn.css`,
            },
          },
        ],
      };
    },
  };
};
