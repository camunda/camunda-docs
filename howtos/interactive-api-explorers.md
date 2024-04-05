# Interactive API Explorers

The docs include an interactive explorer for some of the Camunda APIs. These explorers are generated with [a Docusaurus plugin](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs/), based on an OpenAPI specification file.

Each explorer is configured in `docusaurus.config.js`.

Some API Explorers are configured for both the `docusaurus-plugin-openapi-docs` generator plugin ([example](https://github.com/camunda/camunda-docs/blob/511cf0c26b93bb3076834d87a216609bd8f28548/docusaurus.config.js#L87-L101)) and a standalone docs instance ([example](https://github.com/camunda/camunda-docs/blob/511cf0c26b93bb3076834d87a216609bd8f28548/docusaurus.config.js#L68-L84). The docs for these APIs are generated into a subfolder of the `api` folder. These explorers only emit docs for one version for the API.

Other APIs are configured only for the generator ([example](https://github.com/camunda/camunda-docs/blob/f71d68e0fa6681d334e4fd1bf86a077f456f35f0/docusaurus.config.js#L151-L169)). The docs for these APIs are generated directly in the main docs instance, in the Next version. As minor versions are released, the docs for the Next version are copied to the current version of the docs. In this way, these APIs have versioned documentation.

## Explorers with standalone docs instances

### Source files

The source for each API's instance lives in an identifying folder within the `/api` folder. Following is a description of the contents of these folders.

- `/api/[apiName]/`: Home to the API Explorer source/configuration.
- `/api/[apiName]/[apiName]-openapi.yaml`: OpenAPI spec for the API.
- `/api/[apiName]/[apiName]_sidebars.js`: Sidebars for the API's interactive explorer.
- `/api/[apiName]/docs/`: Generated interactive explorer for the API.

### Updating an OpenAPI spec

When the OpenAPI spec for a standalone API explorer changes, the docs for the associated interactive explorer should be fully re-generated.

1. Replace the OpenAPI spec file.
2. Replace the hard-coded `servers[].url` in the spec file with something more generic, like `SERVER-URL`.
3. Regenerate the explorer with this command:
   `npm run api:generate:[apiName]`: Generate docs for the API Explorer.

## Explorers without standalone docs instances (which are generated into the main docs)

### Source files

The source for each API's instance lives in an identifying folder within the `/api` folder. Following is a description of the contents of these folders.

- `/api/[apiName]/`: Home to the API Explorer source/configuration.
- `/api/[apiName]/[apiName]-openapi.yaml`: OpenAPI spec for the API.
- `/api/[apiName]/generation-strategy.js`: A JavaScript file that describes custom steps required to generate this API's explorer.
  See `api/generate-api-docs` for details on how this file is used during the generation process.

### Updating an OpenAPI spec

The OpenAPI spec is only used to generate the API Explorer for the Next version of versioned explorers. For non-Next versions, the previously-generated documentation is copied into the versioned doc folder, and changes should be made directly to the markdown files.

To re-generate the Next version:

1. Replace the OpenAPI spec file.
2. Regenerate the explorer with this command:
   `npm run api:generate [apiName]`: Generate docs for the API Explorer.
   Note the space between `generate` and `[apiName]`. This differs from the command for standalone docs instances, intentionally.

## Code languages

Code languages in the interactive API Explorers are configured [in the `docusaurus.config.js`](https://github.com/camunda/camunda-docs/blob/511cf0c26b93bb3076834d87a216609bd8f28548/docusaurus.config.js#L274).

The current languages have been chosen based on the popularity of existing clients. If you'd like to request a change to the currently included languages, please open an issue or reach out to the Developer Experience team.
