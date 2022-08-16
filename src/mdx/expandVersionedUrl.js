const versionMap = [
  {
    docs: "next",
    optimize: "next",
  },
  {
    docs: "8.0",
    optimize: "3.8.0",
  },
  {
    docs: "1.3",
    optimize: "3.7.0",
  },
];

function expandVersionedUrl(url, cwd) {
  return url.replace("$docs$", "/docs/next");
}

module.exports = expandVersionedUrl;
