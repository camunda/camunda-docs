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

### Troubleshooting checklist

- Have you pulled latest from `main`?
- Have you run `npm install`? When we update dependencies in the project, they don't automatically update in your environment. You'll need to run `npm install` occasionally to acquire dependency updates locally.
- If running the docs locally results in core dumps, run the following:

```
export NODE_OPTIONS=--max-old-space-size=10248
npm run start
```

## Build

**You can now apply the `deploy` label to a pull request. This will trigger a GitHub action to preview your environment from GitHub upon a successful build.**

It's rare to build the docs locally -- running the dev server with `npm run start` meets most development needs.

Sometimes it can be helpful to see what docusaurus is generating, though. Use one of the following commands to generate static content of the full docs site in a `build` directory:

- `npm run build`
- `npm run build:docker`

The local build consumes a lot of local resources. You might find the `:docker` version to be less disruptive of your local environment.

Both commands generate static content into the `build` directory, and can be served using any static contents hosting service.

## Deployment

Deployments are handled by creating a new Release. See [release-procedure.md](/howtos/release-procedure.md) for details.
