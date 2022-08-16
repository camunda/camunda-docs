const visitPromise = import("unist-util-visit");
const expandVersionedUrl = require("./expandVersionedUrl");

const resolve = async () => {
  visit = (await visitPromise).visit;
};

resolve();

const versionedLinks = (options) => {
  const transformer = async (ast, vfile) => {
    await visit(ast, "link", (node) => {
      if (node.url.startsWith("$docs$") || node.url.startsWith("$optimize$")) {
        // vfile.cwd = '/Users/stevenhicks/sjh/dev/camunda/camunda-platform-docs'
        node.url = expandVersionedUrl(node.url, vfile.cwd);
      }
      return node;
    });
  };

  return transformer;
};

module.exports = versionedLinks;
