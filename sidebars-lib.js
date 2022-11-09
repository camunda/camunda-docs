function optimizeLink(label, href) {
  return {
    type: "link",
    label: label,
    href: `/optimize/next/${href}`,
  };
}

module.exports = {
  optimizeLink,
};
