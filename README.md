# Camunda Cloud Documentation

This documentation is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

## Setup

### Installation

```bash
npm i
```

### Local Development

```bash
npm run start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```bash
$ GIT_USER=<Your GitHub username> USE_SSH=true npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Publish documentaton

Publishing the documentation works by adding a new semver tag (`x.y.z`). [This Github Workflow](./.github/workflows/publish.yaml) will be triggered to build and deploy the docs.

Github Page available under [https://camunda-cloud.github.io/camunda-cloud-documentation/](https://camunda-cloud.github.io/camunda-cloud-documentation/).

## Documentation Guidelines

### Structure

- Name Markdown files according to the title. This makes it easier to find a file. Example: **Introduction to Camunda Cloud** --> `introduction-to-camunda-cloud.md`. Use the file name as internal document id to reference in `sidebars.js`.
- Sub catagories have to be placed in their own sub directories. Example: Guides/Getting Started can be found in `docs/guides/getting-started`.

### Adding a new documentation page

1. Select the corresponding directory
2. Add the document id to [`sidebars.js`](./sidebars.js)

### Images

- Static images can be placed into [`static/img/`](./static/img/).
- Images that will change with a new version have to be placed into `docs`. Best practice: add an `img` directory to each directory where it is needed.
