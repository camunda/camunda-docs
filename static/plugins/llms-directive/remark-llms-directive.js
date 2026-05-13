const directive = {
  type: "blockquote",
  children: [
    {
      type: "paragraph",
      children: [
        {
          type: "text",
          value: "For the complete documentation index, see ",
        },
        {
          type: "link",
          url: "pathname:///llms.txt",
          children: [{ type: "text", value: "llms.txt" }],
        },
        {
          type: "text",
          value: ". This page is also available in ",
        },
        {
          type: "link",
          url: "#",
          data: {
            hProperties: { className: ["llms-md-link"] },
          },
          children: [{ type: "text", value: "Markdown format" }],
        },
        {
          type: "text",
          value: ".",
        },
      ],
    },
  ],
  data: {
    hProperties: {
      className: ["llms-directive"],
    },
  },
};

function remarkLlmsDirective() {
  return (tree) => {
    // Find the index after the last import/export statement so we don't break MDX import resolution
    let insertIndex = 0;
    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i];
      if (
        node.type === "mdxjsEsm" ||
        node.type === "import" ||
        node.type === "export"
      ) {
        insertIndex = i + 1;
      } else {
        break;
      }
    }
    tree.children.splice(insertIndex, 0, directive);
  };
}

module.exports = remarkLlmsDirective;
