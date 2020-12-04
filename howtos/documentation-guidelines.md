# Documentation Guidelines

## PRs for every change

All changes have to be done in a separate Branch. As soon as the changes are done please open a PR. A Github Action runs with every commit to a Branch and checks if the documentation can be build (including a broken links check).

## Structure

- Name Markdown files according to the title. This makes it easier to find a file. Example: **Introduction to Camunda Cloud** --> `introduction-to-camunda-cloud.md`. Use the file name as internal document id to reference in `sidebars.js`.
- Sub catagories have to be placed in their own sub directories. Example: Guides/Getting Started can be found in `docs/guides/getting-started`.

## Adding a new documentation page

1. Select the corresponding directory
2. Add the document id to [`sidebars.js`](./sidebars.js)

## Rights

`OWNERS` files in various folders define who needs to approve changes within this folder. Approvers can approve a PR by adding the comment `/lgtm`.
