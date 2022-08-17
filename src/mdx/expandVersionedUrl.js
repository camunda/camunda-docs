const tokens = [
  {
    token: "$docs$",
    rules: [
      // these mappings are currently wrong because there are no optimize versions yet...but eventually, this is what we'll want.
      { match: "/optimize/", expandTo: "/docs/next" },
      { match: "/optimize_versioned_docs/version-3.8.0/", expandTo: "/docs" },
      {
        match: "/optimize_versioned_docs/version-3.7.0/",
        expandTo: "/docs/1.3",
      },
    ],
  },
  {
    token: "$optimize$",
    rules: [
      // these mappings are currently wrong because there are no optimize versions yet...but eventually, this is what we'll want.
      { match: "/docs/", expandTo: "/optimize/next" },
      { match: "/versioned_docs/version-8.0/", expandTo: "/optimize" },
      { match: "/versioned_docs/version-1.3/", expandTo: "/optimize/3.7.0" },
    ],
  },
];

function expandVersionedUrl(targetUrl, sourcePath) {
  let expandedUrl = targetUrl;

  const matchedToken = tokens.find((token) =>
    expandedUrl.includes(token.token)
  );
  if (matchedToken) {
    const { token, rules } = matchedToken;
    rules.forEach(({ match, expandTo }) => {
      if (sourcePath.includes(match)) {
        expandedUrl = targetUrl.replace(token, expandTo);
      }
    });
  }

  return expandedUrl;
}

module.exports = expandVersionedUrl;
