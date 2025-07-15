const path = require("path");

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
              src: "https://unpkg.com/bpmn-js/dist/bpmn-viewer.production.min.js",
              defer: true,
            },
          },
          {
            tagName: "script",
            attributes: {
              src: "https://unpkg.com/dmn-js/dist/dmn-viewer.production.min.js",
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
              href: "https://unpkg.com/bpmn-js/dist/assets/diagram-js.css",
            },
          },
          {
            tagName: "link",
            attributes: {
              rel: "stylesheet",
              href: "https://unpkg.com/bpmn-js/dist/assets/bpmn-js.css",
            },
          },
          {
            tagName: "link",
            attributes: {
              rel: "stylesheet",
              href: "https://unpkg.com/bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css",
            },
          },
          {
            tagName: "link",
            attributes: {
              rel: "stylesheet",
              href: "https://unpkg.com/dmn-js/dist/assets/dmn-js-shared.css",
            },
          },
          {
            tagName: "link",
            attributes: {
              rel: "stylesheet",
              href: "https://unpkg.com/dmn-js/dist/assets/dmn-js-decision-table.css",
            },
          },
          {
            tagName: "link",
            attributes: {
              rel: "stylesheet",
              href: "https://unpkg.com/dmn-js/dist/assets/dmn-font/css/dmn.css",
            },
          },
        ],
      };
    },
  };
};
