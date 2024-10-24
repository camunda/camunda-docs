// Inspired by https://github.com/LukasGentele/docusaurus-gtm-plugin (the one we were using)
//   and https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-google-tag-manager
//   But modified to support a custom URL for the tag manager script.

module.exports = function pluginGoogleTagManager(_context, options) {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  const { containerId, tagManagerUrl = "https://www.googletagmanager.com" } =
    options;
  return {
    name: "docusaurus-plugin-google-tag-manager",

    injectHtmlTags() {
      return {
        headTags: [
          `<!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    '${tagManagerUrl}/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${containerId}');</script>
    <!-- End Google Tag Manager -->`,
        ],
        postBodyTags: [
          `<!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="${tagManagerUrl}/ns.html?id=${containerId}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->`,
        ],
      };
    },
  };
};
