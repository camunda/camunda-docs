# Configuration

This documentation is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

The framework is [well documented](https://v2.docusaurus.io/docs/) and is used by many (open source) Projects.

## `docusaurus.config.js`

The documentation can be customized by setting parameters in [docusaurus.config.js](../docusaurus.config.js). Parameters are described here: [https://v2.docusaurus.io/docs/docusaurus.config.js](https://v2.docusaurus.io/docs/docusaurus.config.js).

## Search by Algolia

- API-Key and Index name is configured in `./docusaurus.config.js`.

[Algolia DocSearch](https://docsearch.algolia.com/) configuration is **NOT** a part of this repository. Config can be found on a dedicated [Docsearch Configurations](https://github.com/algolia/docsearch-configs) repo owned by Algolia but maintained by the individual projects. You must prove you are associated with the project to modify the configuration in the [Camunda config](https://github.com/algolia/docsearch-configs/blob/master/configs/camunda.json).

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
