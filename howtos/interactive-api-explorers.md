# Interactive API Explorers

The docs include an interactive explorer for some of the Camunda APIs. These explorers are generated with [a Docusaurus plugin](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs/), based on an OpenAPI specification file.

Each explorer is configured in `docusaurus.config.js` as both [a docs instance](https://github.com/camunda/camunda-docs/blob/511cf0c26b93bb3076834d87a216609bd8f28548/docusaurus.config.js#L68-L84) and [configuration for the `docusaurus-plugin-openapi-docs` plugin](https://github.com/camunda/camunda-docs/blob/511cf0c26b93bb3076834d87a216609bd8f28548/docusaurus.config.js#L87-L101).

The source for each API's instance lives in an identifying folder within the `/api` folder. Example:

- `/api/operate/`: Home to the Operate API Explorer source.
- `/api/operate/operate-openapi.yaml`: OpenAPI spec for the Operate API.
- `/api/operate/operate_sidebars.js`: Sidebars for the Operate API interactive explorer.
- `/api/operate/docs/`: Generated interactive explorer for the Operate API.

## Updating an OpenAPI spec

When the OpenAPI spec for an API changes, the docs for the associated interactive explorer should be fully re-generated.

1. Replace the OpenAPI spec file.
2. Replace the hard-coded `servers[].url` in the spec file with something more generic, like `SERVER-URL`.
3. Regenerate the explorer with one of these commands:
   - `npm run api:generate:operate`: Generate docs for only the Operate API Explorer.
   - `npm run api:generate`: Generate docs for all API Explorers.

## Code languages

Code languages in the interactive API Explorers are configured [in the `docusaurus.config.js`](https://github.com/camunda/camunda-docs/blob/511cf0c26b93bb3076834d87a216609bd8f28548/docusaurus.config.js#L274).
