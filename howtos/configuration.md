# Configuration

This documentation is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

The framework is [well documented](https://v2.docusaurus.io/docs/) and is used by many (open source) Projects.

## `docusaurus.config.js`

The documentation can be customized by setting parameters in [docusaurus.config.js](../docusaurus.config.js). Parameters are described here: [https://v2.docusaurus.io/docs/docusaurus.config.js](https://v2.docusaurus.io/docs/docusaurus.config.js).

## Search by Algolia

- API-Key and Index name is configured in `./docusaurus.config.js`.

[Algolia DocSearch](https://docsearch.algolia.com/) configuration is **NOT** a part of this repository. Config can be found on a dedicated [Docsearch Configurations](https://github.com/algolia/docsearch-configs) repo owned by Algolia but maintained by the individual projects. You must prove you are associated with the project to modify the configuration in the [Camunda config](https://github.com/algolia/docsearch-configs/blob/master/configs/camunda.json).

If search experience degrades, check if the Camunda config may need to be updated and submit a PR.
