const visitPromise = import("unist-util-visit");

const resolve = async () => {
  visit = (await visitPromise).visit;
};

resolve();

const versionedLinks = (options) => {
  const transformer = async (ast, vfile) => {
    await visit(ast, "link", (node) => {
      if (node.url.startsWith("$docs$") || node.url.startsWith("$optimize$")) {
        node.url = node.url.replace("$docs$", "/docs/next");
        console.log("sjh", node.url);
      }
      return node;
    });
  };

  return transformer;
};

module.exports = versionedLinks;
