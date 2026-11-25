// Webpack 5 ships no Node core polyfills. The OpenAPI theme bundles
// postman-code-generators into the browser build, and its codegens call
// require("path"). Resolve it to path-browserify.
module.exports = function () {
  return {
    name: "webpack-node-polyfills",
    configureWebpack() {
      return {
        resolve: {
          fallback: {
            path: require.resolve("path-browserify"),
          },
        },
      };
    },
  };
};
