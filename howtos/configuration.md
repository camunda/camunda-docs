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

## CLA assistant

The [CLA assistant](https://cla-assistant.io/) is a SAP-maintained tool for OSS projects. It uses a Gist file to host the CLA. A Gist file is associated with a personal or user account, so the Camunda CLA is hosted by @camundait via cla_camunda.md (as referenced by other Camunda org projects).

Logging into the CLA assistant UI via GitHub Auth appears to require re-authorization every time. In the CLA assistant UI, you can find the configuration for adding or updating the CLA, including a new Gist (the list only shows your personal Gists), excluding users, organizations, and bots, or updating the link to the Camunda Privacy Policy.

Updates to the CLA will cause a re-signing event. Only public users in Camunda-owned organizations will be eligible for exemption from signing.
