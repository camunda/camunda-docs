const docs = [
  // these mappings are currently wrong because there are no optimize versions yet...but eventually, this is what we'll want.
  { match: "/optimize/", expandTo: "/docs/next" },
  { match: "/optimize_versioned_docs/version-3.8.0/", expandTo: "/docs" },
  { match: "/optimize_versioned_docs/version-3.7.0/", expandTo: "/docs/1.3" },
];

function expandVersionedUrl(targetUrl, sourcePath) {
  let expandedUrl = targetUrl;

  docs.forEach((rule) => {
    if (sourcePath.includes(rule.match)) {
      expandedUrl = targetUrl.replace("$docs$", rule.expandTo);
    }
  });

  return expandedUrl;
}

module.exports = expandVersionedUrl;
