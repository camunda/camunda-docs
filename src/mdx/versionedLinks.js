const visitPromise = import("unist-util-visit");
const expandVersionedUrl = require("./expandVersionedUrl");

const resolve = async () => {
  visit = (await visitPromise).visit;
};

resolve();

const versionedLinks = (options) => {
  const transformer = async (ast, vfile) => {
    await visit(ast, "link", (node) => {
      node.url = expandVersionedUrl(node.url, vfile.path);

      return node;
    });
  };

  return transformer;
};

module.exports = versionedLinks;
