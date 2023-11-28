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

Simplify the development process by installing the pre-commit hook once, which will automatically lint and format your staged files before each commit.

```bash
npm run prepare
```

### Troubleshooting checklist

- Have you pulled latest from `main`?
- Have you run `npm install`? When we update dependencies in the project, they don't automatically update in your environment. You'll need to run `npm install` occasionally to acquire dependency updates locally.

## Build

It's rare to build the docs locally -- running the dev server with `npm run start` meets most development needs.

Sometimes it can be helpful to see what docusaurus is generating, though:

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Deployments are handled by creating a new Release. See [release-procedure.md](/howtos/release-procedure.md) for details.
