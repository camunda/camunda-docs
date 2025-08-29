new Crawler({
  apiKey: "CHANGE_ME",
  appId: "CHANGE_ME",
  indexPrefix: "",
  rateLimit: 8,
  maxDepth: 10,
  maxUrls: null,
  schedule: null,
  startUrls: ["https://docs.camunda.io"],
  renderJavaScript: false,
  sitemaps: ["https://docs.camunda.io/sitemap.xml"],
  ignoreCanonicalTo: true,
  discoveryPatterns: ["https://docs.camunda.io/**"],
  actions: [
    {
      indexName: "camunda-v2",
      pathsToMatch: ["https://docs.camunda.io/**"],
      recordExtractor: ({ $, helpers, url }) => {
        // Extracting the breadcrumb titles for better accessibility.
        const navbarTitle = $(".navbar__item.navbar__link--active").text();
        const pageBreadcrumbTitles = $(".breadcrumbs__link")
          .toArray()
          .map((item) => $(item).text().trim())
          .filter(Boolean);
        const lvl0 =
          [navbarTitle, ...pageBreadcrumbTitles].join(" / ") || "Documentation";

        // Page rank.
        // Use the page rank from the Docusaurus frontmatter if available, if not
        // calculate it based on the URL depth.

        // Extracting the page rank from a meta tag (it's set by the Docusaurus pages frontmatter).
        const pageRank = $("meta[name='docsearch:page_rank']").attr("content");
        // Set default page rank based on the number of slashes (ignore trailing slash).
        // Set pageRank as inverse of depth, fewer slashes = higher rank.
        const path = new URL(url).pathname.replace(/\/$/, "");
        const depth = path.split("/").filter(Boolean).length;
        const maxDepth = 12; // Depth cap.
        const defaultPageRank = Math.max(0, maxDepth - depth);

        return helpers.docsearch({
          recordProps: {
            pageRank: pageRank || defaultPageRank,
            lvl0: {
              selectors: "",
              defaultValue: lvl0,
            },
            lvl1: ["header h1", "article h1"],
            lvl2: "article h2",
            lvl3: "article h3",
            lvl4: "article h4",
            lvl5: "article h5, article td:first-child",
            lvl6: "article h6",
            content: "article p, article li, article td:last-child",
          },
          aggregateContent: true,
          recordVersion: "v3",
        });
      },
    },
  ],
  safetyChecks: { beforeIndexPublishing: { maxLostRecordsPercentage: 30 } },
  initialIndexSettings: {
    "camunda-v2": {
      attributesForFaceting: [
        "type",
        "lang",
        "language",
        "version",
        "docusaurus_tag",
      ],
      attributesToRetrieve: [
        "hierarchy",
        "content",
        "anchor",
        "url",
        "url_without_anchor",
        "type",
      ],
      attributesToHighlight: ["hierarchy", "content"],
      attributesToSnippet: ["content:10"],
      camelCaseAttributes: ["hierarchy", "content"],
      searchableAttributes: [
        "unordered(hierarchy.lvl0)",
        "unordered(hierarchy.lvl1)",
        "unordered(hierarchy.lvl2)",
        "unordered(hierarchy.lvl3)",
        "unordered(hierarchy.lvl4)",
        "unordered(hierarchy.lvl5)",
        "unordered(hierarchy.lvl6)",
        "content",
      ],
      distinct: true,
      attributeForDistinct: "url",
      customRanking: ["desc(weight.level)", "asc(weight.position)"],
      ranking: [
        "words",
        "filters",
        "typo",
        "desc(weight.pageRank)",
        "attribute",
        "proximity",
        "exact",
        "custom",
      ],
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: "</span>",
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false,
      minProximity: 1,
      ignorePlurals: true,
      advancedSyntax: true,
      attributeCriteriaComputedByMinProximity: true,
      removeWordsIfNoResults: "allOptional",
    },
  },
});
