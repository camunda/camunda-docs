// This is implemented as a plugin because script order is important.
module.exports = function () {
  return {
    name: "osano-plugin",
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "script",
            innerHTML: `
              // Required prior to loading osano.js script.
              window.dataLayer = window.dataLayer || []
              function gtag() {
                dataLayer.push(arguments)
              }
              gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500,
              })
              gtag('set', 'ads_data_redaction', true)
            `,
            attributes: {},
          },
          {
            tagName: "script",
            attributes: {
              src: "https://cmp.osano.com/16CVvwSNKHi9t1grQ/2ce963c0-31c9-4b54-b052-d66a2a948ccc/osano.js",
            },
          },
        ],
      };
    },
  };
};
