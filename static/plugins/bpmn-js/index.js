const path = require("path");
module.exports = function () {
  return {
    name: "bpmn-js-plugin",
    getClientModules() {
      return [path.resolve(__dirname, "./update")];
    },
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "script",
            attributes: {
              defer: true,
              src: "/js/bpmn-js-rendering.js",
            },
          },
          {
            tagName: "script",
            attributes: {
              src: "https://code.jquery.com/jquery-3.6.0.min.js",
              async: true,
            },
          },
          {
            tagName: "script",
            attributes: {
              src: "https://unpkg.com/bpmn-js/dist/bpmn-viewer.production.min.js",
              async: true,
            },
          },
          {
            tagName: "script",
            attributes: {
              src: "https://unpkg.com/dmn-js@11.0.2/dist/dmn-viewer.production.min.js",
              async: true,
            },
          },
        ],
      };
    },
  };
};
