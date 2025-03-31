# Interactive API Explorers

The docs include an interactive explorer for some of the Camunda APIs. These explorers are generated with [a Docusaurus plugin](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs/), based on an OpenAPI specification file.

Each explorer is configured in `docusaurus.config.js` ([example](https://github.com/camunda/camunda-docs/blob/708bc4dbc6a8a2aeae324ab86ff4e59cc74c59fa/docusaurus.config.js#L193-L219)). All API explorers are generated directly into the main docs instance.

The configuration can include multiple versions. The Next version docs are generated based on the spec located in the root `api/[apiName]` folder. Each numbered version's documentation is generated based on a spec located in the corresponding `api/[apiName]/[version]` folder.

As minor versions are released, the docs for the Next version are copied into the new "current" version of the docs. The docs team will adjust the configuration to also support documentation generation for this new version.

## Source files

The source for each API's instance lives in an identifying folder within the `/api` folder. Following is a description of the contents of these folders.

- `/api/[apiName]/`: Home to the API Explorer source/configuration.
- `/api/[apiName]/[apiName]-openapi.yaml`: OpenAPI spec for vNext of the API.
- `/api/[apiName]/generation-strategy.js`: A JavaScript file that describes custom steps required to standardize this API's explorer.
  See `api/generate-api-docs` for details on how this file is used during the generation process.
- `/api/[apiName]/[version]/[apiName]-openapi.yaml`: OpenAPI spec for version `[version]` of the API.

## Updating an OpenAPI spec

### Automatic synchronization (applies only to the Next version of the C8 REST API)

[A workflow](https://github.com/camunda/camunda-docs/actions/workflows/sync-rest-api-docs.yaml) is configured to synchronize the "next" version of the REST API docs, scheduled on a weekly basis. The workflow pulls the specification from [the upstream camunda/camunda repo's `main` branch](https://github.com/camunda/camunda/blob/main/zeebe/gateway-protocol/src/main/proto/rest-api.yaml), and re-generates the documentation for the "next" version based on that spec.

If you've made changes to the upstream `main` branch but do not require urgent documentation updates, you should wait for that scheduled workflow to incorporate your changes.

If you've made changes to the upstream `main` branch and require urgent documentation updates, you should trigger [that workflow](https://github.com/camunda/camunda-docs/actions/workflows/sync-rest-api-docs.yaml) manually.

### Regenerate the docs for the Next version of any API

1. Replace the OpenAPI spec file at `/api/[apiName]/[apiName]-openapi.yaml`.
2. Regenerate the docs with this command:
   `npm run api:generate:[apiName]`
3. Commit the changes, and open a PR.

### Regenerate the docs for a numbered version of any API

1. Replace the OpenAPI spec file at `/api/[apiName]/[version]/[apiName]-openapi.yaml`.
2. Regenerate the docs with this command:
   `npm run api:generate:[apiName] [version]`
3. If changes affect the sidebars (for example, the name or method of an endpoint), manually move the changes from the generated `sidebar.ts` into the version's top-level `version-x-sidebars.json` file.
4. Commit the changes, and open a PR.

## Code languages

Code languages in the interactive API Explorers are configured [in the `docusaurus.config.js`](https://github.com/camunda/camunda-docs/blob/511cf0c26b93bb3076834d87a216609bd8f28548/docusaurus.config.js#L274).

The current languages have been chosen based on the popularity of existing clients. If you'd like to request a change to the currently included languages, please open an issue or reach out to the Developer Experience team.
