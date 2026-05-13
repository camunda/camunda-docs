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
    tree.children.unshift(directive);
  };
}

module.exports = remarkLlmsDirective;
