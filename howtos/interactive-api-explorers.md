# Interactive API Explorers

The docs include an interactive explorer for some of the Camunda APIs. These explorers are generated with [a Docusaurus plugin](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs/), based on an OpenAPI specification file.

Each explorer is configured in `docusaurus.config.js` ([example](https://github.com/camunda/camunda-docs/blob/f71d68e0fa6681d334e4fd1bf86a077f456f35f0/docusaurus.config.js#L151-L169)). The docs for these APIs are generated directly into the main docs instance, in the Next version only. As minor versions are released, the docs for the Next version are copied to the current version of the docs. In this way, these APIs have versioned documentation.

## Source files

The source for each API's instance lives in an identifying folder within the `/api` folder. Following is a description of the contents of these folders.

- `/api/[apiName]/`: Home to the API Explorer source/configuration.
- `/api/[apiName]/[apiName]-openapi.yaml`: OpenAPI spec for the API.
- `/api/[apiName]/generation-strategy.js`: A JavaScript file that describes custom steps required to standardize this API's explorer.
  See `api/generate-api-docs` for details on how this file is used during the generation process.

## Updating an OpenAPI spec

The OpenAPI spec is only used to generate the API Explorer for the Next version of versioned explorers. This can be done in synchrony with alpha releases, to give users a preview of the new API features.

For non-Next versions, the previously-generated documentation is copied into the versioned doc folder, and changes can and should be made directly to the markdown files.

To re-generate the Next version:

1. Replace the OpenAPI spec file at `/api/[apiName]/[apiName]-openapi.yaml`.
2. Regenerate the explorer with this command:
   `npm run api:generate:[apiName]`.
3. Commit changes, and open a PR.

## Code languages

Code languages in the interactive API Explorers are configured [in the `docusaurus.config.js`](https://github.com/camunda/camunda-docs/blob/511cf0c26b93bb3076834d87a216609bd8f28548/docusaurus.config.js#L274).

The current languages have been chosen based on the popularity of existing clients. If you'd like to request a change to the currently included languages, please open an issue or reach out to the Developer Experience team.
