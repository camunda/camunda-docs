# Setup

## Installation

```bash
npm install
```

## Local Development

```bash
npm run start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

Note: if you are updating API documentation or a similar task that modifies a lot of files at the same time, you'll want to stop the server and restart it after regeneration because the hot reload of many file changes explodes memory usage.

### Troubleshooting checklist

- Have you pulled latest from `main`?
- Have you run `npm install`? When we update dependencies in the project, they don't automatically update in your environment. You'll need to run `npm install` occasionally to acquire dependency updates locally.
- If running the docs locally results in core dumps, run the following:

```
export NODE_OPTIONS=--max-old-space-size=10248
npm run start
```

### Clear Docusaurus cache

To clear the Docusaurus cache, run the following command:

```
npm run docusaurus -- clear
```

:::tip
When renaming a file or changing its `id`, the continuous development server started with `npm run start` can fail due to cached content. To resolve this issue, clear the cache and then restart the server.
:::

## Build

**You can now apply the `deploy` label to a pull request. This will trigger a GitHub action to preview your environment from GitHub upon a successful build.**

It's rare to build the docs locally -- running the dev server with `npm run start` meets most development needs.

Sometimes it can be helpful to see what docusaurus is generating, though. Use one of the following commands to generate static content of the full docs site in a `build` directory:

- `npm run build`
- `npm run build:docker`

The local build consumes a lot of local resources. You might find the `:docker` version to be less disruptive of your local environment.

Both commands generate static content into the `build` directory, and can be served using any static contents hosting service.

### Scoped builds

A full build needs more memory than typical developer machines have. For local validation, scope the build to the versions your change touches:

```bash
DOCS_BUILD_VERSIONS=next,current DOCS_SKIP_GENERATED_REFERENCES=true DOCS_SKIP_LLMS_TXT=true DOCUSAURUS_NO_PERSISTENT_CACHE=true DOCUSAURUS_SSG_WORKER_THREAD_COUNT=4 npm run build
```

- `DOCS_BUILD_VERSIONS`: Comma-separated versions to build. Use `next` for unreleased documentation, `current` for the current release, or maintained release versions such as `8.8,8.9` for backport validation. The command fails with the supported versions when you specify an archived or unknown version. Unset builds all versions, as required for CI and releases.
- `DOCS_SKIP_GENERATED_REFERENCES=true`: Skips generated API references. The TypeScript API reference is excluded. OpenAPI specification pages (`apis-tools/*/specifications/`) become placeholders, so sidebars and links to them still resolve. Typically set this for local documentation-only builds.
- `DOCS_SKIP_LLMS_TXT=true`: Skips generated LLM output. Set this only for local builds. Builds generate LLM output by default.
- `DOCUSAURUS_NO_PERSISTENT_CACHE=true` and `DOCUSAURUS_SSG_WORKER_THREAD_COUNT=4`: Built-in Docusaurus settings that lower peak memory. Writing the Rspack persistent cache and running one static site generation worker per CPU core each raise peak memory considerably. For measurements, see [#10207](https://github.com/camunda/camunda-docs/issues/10207).

Scoped builds fail for invalid Markdown and broken relative Markdown links in the selected documentation. They bypass root-relative `/docs/` links because their target can be in another version. With `DOCS_SKIP_GENERATED_REFERENCES=true`, links into the TypeScript API reference are bypassed, too. Docusaurus reports rendered-link failures as warnings in scoped builds because generated navigation can reference excluded versions. CI validates all links and generated output in the full build.

## Deployment

Deployments are handled by creating a new Release. See [release-procedure.md](/howtos/release-procedure.md) for details.
