# Configuration

This documentation is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

The framework is [well documented](https://v2.docusaurus.io/docs/) and is used by many (open source) Projects.

## `docusaurus.config.js`

The documentation can be customized by setting parameters in [docusaurus.config.js](../docusaurus.config.js). Parameters are described here: [https://v2.docusaurus.io/docs/docusaurus.config.js](https://v2.docusaurus.io/docs/docusaurus.config.js).

## Search by Algolia

Internal search is handled by an integration with [Algolia DocSearch](https://docsearch.algolia.com/).

### Configuration

Our Algolia API key, app ID, and index name are configured in `./docusaurus.config.js`.

Configuration of Algolia's index and crawler can be edited with the [Algolia Crawler](https://crawler.algolia.com/).

Currently, the only unique change to our configuration is that we specify multiple `pathsToMatch` to accommodate our multiple docs instances:

```
      pathsToMatch: [
        "https://docs.camunda.io/docs/**",
        "https://docs.camunda.io/optimize/**",
      ],
```

### Troubleshooting

Take a closer look at [Algolia's index of our documentation](https://dashboard.algolia.com/).

If search experience degrades, check if the Camunda config may need to be updated and submit a PR.

## Cookie consent by Osano

Osano handles cookie consent for Camunda web assets. If a user opts out of Osano on another Camunda web asset, they will automatically opt out of sending docs data.

**If a user opts out via Osano, no Mixpanel events are collected.**

Configuration can be found in the Footer via `src > theme > Footer > index.js`.

## Docs events by Mixpanel

Mixpanel is used to correlate product milestones with documentation page visits.

Configuration can be found in the Footer via `src > theme > Footer > index.js`.

## Google Analytics

Google Tag Manager anonymizes data after collection.

The container id sits in `./docusaurus.config.js`.

## CLA Assistant

The [CLA Assistant](https://cla-assistant.io/) is an SAP-maintained tool for OSS projects. It uses a gist to host the CLA. Gist are associated with personal or user accounts, so the Camunda CLA is hosted by @akeller via https://gist.github.com/akeller/14cb81f38748edb3f553bc447c218198.

Logging into the CLA Assistant UI via GitHub Auth appears to require re-authorization every time. In the CLA Assistant UI you can find the configuration for adding or updating the CLA, including a new gist (the list only shows your personal gists), excluding users, organizations, and bots, or updating the link to the Camunda Privacy Policy.

Updates to the CLA will cause a re-signing event. Only public users in Camunda owned orgs will be eligible for exemption from signing.
