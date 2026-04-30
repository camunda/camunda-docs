# AGENTS.md

Guidance for AI coding agents (Claude Code, Cursor, GitHub Copilot, Codex, Aider, and similar) working in the `camunda-docs` repository. This file follows the [agents.md](https://agents.md) convention and complements `.github/copilot-instructions.md` and `CONTRIBUTING.MD`.

Human contributors should start with `README.md` and `CONTRIBUTING.MD`.

## Project overview

This repository contains the public Camunda 8 documentation published at <https://docs.camunda.io>. It is a [Docusaurus 3](https://docusaurus.io/) site. Content is authored in Markdown and MDX by Camunda engineers and the wider community.

- **Build system**: Docusaurus 3 + React 19, Node-based toolchain, Prettier for formatting, Jest for unit tests, Playwright for regression tests.
- **Primary language**: Markdown / MDX. JavaScript and TypeScript are used for site infrastructure under `src/`, `hacks/`, `api/`, and `config-reference/`.
- **Versioning model**: "Next" (unreleased) docs live in `/docs/`. Released versions live in `/versioned_docs/version-*/` with matching sidebars in `/versioned_sidebars/`. See `howtos/versioning.md`.

## Repository layout

| Path                        | Purpose                                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------------------- |
| `docs/`                     | Next (unreleased) documentation.                                                                          |
| `versioned_docs/version-*/` | Frozen documentation for released versions.                                                               |
| `versioned_sidebars/`       | Sidebar JSON for each released version.                                                                   |
| `sidebars.js`               | Sidebar configuration for Next.                                                                           |
| `docusaurus.config.js`      | Site configuration.                                                                                       |
| `src/`                      | React components, theme overrides, and version metadata.                                                  |
| `static/`                   | Static assets. `static/img/` for images, `static/bpmn/` for BPMN files, `static/.htaccess` for redirects. |
| `api/`                      | OpenAPI ingestion and generation scripts.                                                                 |
| `config-reference/`         | Auto-generated configuration reference pages.                                                             |
| `howtos/`                   | Internal contributor guides — read these before non-trivial changes.                                      |
| `.github/instructions/`     | Condensed instructions for AI tooling. Always read before editing.                                        |
| `spec/`                     | Playwright regression specs.                                                                              |

## Where each Camunda component is documented

Camunda 8 is a suite of components. Use this map to find the right folder before editing. Paths are shown for the Next docs (`/docs/`); the same structure exists under each `versioned_docs/version-*/`.

### Top-level documentation areas

| Area                | Path                 | What lives here                                                                                                                    |
| ------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Components          | `docs/components/`   | User-facing docs for each Camunda component (Operate, Tasklist, Modeler, Connectors, etc.) and shared concepts.                    |
| Self-Managed        | `docs/self-managed/` | Installation, deployment, and operations for customers running Camunda 8 themselves (Helm, Docker, manual, upgrade, architecture). |
| APIs and tools      | `docs/apis-tools/`   | REST APIs, gRPC, SDKs, clients, CLIs, and developer tooling.                                                                       |
| Guides              | `docs/guides/`       | End-to-end getting-started and migration tutorials.                                                                                |
| Reference           | `docs/reference/`    | Release notes, supported environments, glossary, legal, announcements.                                                             |
| Versioned snapshots | `versioned_docs/`    | Frozen copies of all of the above per released minor version.                                                                      |

### Components area (`docs/components/`)

| Camunda component               | Path                                                       | Notes                                                                                                            |
| ------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Orchestration cluster (Zeebe)   | `components/zeebe/`, `components/orchestration-cluster.md` | Workflow engine internals, deployment concepts, exporters. Zeebe is the engine inside the orchestration cluster. |
| Operate                         | `components/operate/`                                      | Monitoring and troubleshooting running process instances.                                                        |
| Tasklist                        | `components/tasklist/`                                     | Human task list UI for end users.                                                                                |
| Optimize                        | `components/optimize/`                                     | Process analytics, dashboards, KPIs.                                                                             |
| Web Modeler and Desktop Modeler | `components/modeler/`                                      | BPMN, DMN, and Forms authoring. Includes element templates and Play.                                             |
| Connectors                      | `components/connectors/`                                   | Out-of-the-box connectors and custom connector authoring.                                                        |
| Console                         | `components/console/`                                      | SaaS and Self-Managed administration UI.                                                                         |
| Identity / Admin                | `components/admin/`                                        | User management, authorizations, tenants, identity federation.                                                   |
| Agentic orchestration           | `components/agentic-orchestration/`                        | AI agent orchestration features.                                                                                 |
| RPA                             | `components/rpa/`                                          | Robotic process automation.                                                                                      |
| Document handling               | `components/document-handling/`                            | Document store and document references in processes.                                                             |
| Audit log                       | `components/audit-log/`                                    | Audit trail features.                                                                                            |
| Hub                             | `components/hub/`                                          | Camunda Hub (shared assets, marketplace).                                                                        |
| Camunda integrations            | `components/camunda-integrations/`                         | First-party integrations (Slack, Microsoft 365, Salesforce, etc.).                                               |
| Concepts                        | `components/concepts/`                                     | Cross-component concepts: BPMN/DMN/FEEL, expressions, incidents, batch operations, access control.               |
| Best practices                  | `components/best-practices/`                               | Modeling and operational best practices.                                                                         |
| Early access                    | `components/early-access/`                                 | Alpha/beta features not yet GA.                                                                                  |
| SaaS specifics                  | `components/saas/`                                         | SaaS-only topics: regions, BYOK, IP addresses, auto-updates, monitoring, secure connectivity.                    |

### Self-Managed area (`docs/self-managed/`)

| Topic                        | Path                                                                                                                                                         | Notes                                                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Setup overview               | `self-managed/setup/`                                                                                                                                        | Pre-install planning and the deploy entry point.                                                       |
| Deployment                   | `self-managed/deployment/helm/`, `.../docker/`, `.../containers/`, `.../manual/`                                                                             | How to install Camunda 8 with each method.                                                             |
| Reference architecture       | `self-managed/reference-architecture/`                                                                                                                       | Sizing, topology, networking, storage recommendations.                                                 |
| Component-specific SM topics | `self-managed/components/orchestration-cluster/`, `.../management-identity/`, `.../console/`, `.../modeler/`, `.../connectors/`, `.../optimize/`, `.../hub/` | Self-Managed-only configuration, secrets, networking, exporters, and upgrade notes for each component. |
| Components upgrade           | `self-managed/components/components-upgrade/`                                                                                                                | Per-component upgrade guides (do not confuse with the top-level `upgrade/` area).                      |
| Operational guides           | `self-managed/operational-guides/`                                                                                                                           | Backups, monitoring, troubleshooting, license rotation.                                                |
| Upgrade                      | `self-managed/upgrade/`                                                                                                                                      | Cross-cutting upgrade procedures across versions.                                                      |
| Quickstart                   | `self-managed/quickstart/`                                                                                                                                   | Fastest local install path.                                                                            |

### APIs and tools area (`docs/apis-tools/`)

| API or tool                     | Path                                                                         | Notes                                                                    |
| ------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Orchestration Cluster REST API  | `apis-tools/orchestration-cluster-api-rest/`                                 | Primary unified REST API for the cluster. Largely OpenAPI-generated.     |
| Orchestration Cluster API (MCP) | `apis-tools/orchestration-cluster-api-mcp/`                                  | Model Context Protocol server for the cluster API.                       |
| Zeebe API (gRPC and REST)       | `apis-tools/zeebe-api/`, `apis-tools/zeebe-api-rest/`                        | Engine-level APIs (legacy gRPC and the REST surface).                    |
| Operate API                     | `apis-tools/operate-api/`                                                    | Operate REST API.                                                        |
| Tasklist API                    | `apis-tools/tasklist-api-rest/`                                              | Tasklist REST API.                                                       |
| Optimize API                    | `apis-tools/optimize-api/`                                                   | Optimize public API.                                                     |
| Administration APIs (SaaS / SM) | `apis-tools/administration-api/`, `apis-tools/administration-sm-api/`        | SaaS console API and Self-Managed administration API.                    |
| Web Modeler API                 | `apis-tools/web-modeler-api/`                                                | Web Modeler programmatic API.                                            |
| Java client                     | `apis-tools/java-client/`                                                    | Official Java client.                                                    |
| Spring Boot starter             | `apis-tools/camunda-spring-boot-starter/`                                    | Java/Spring integration. Reference is generated via `config-reference/`. |
| C# / Python / TypeScript SDKs   | `apis-tools/csharp-sdk/`, `apis-tools/python-sdk/`, `apis-tools/typescript/` | Official SDKs.                                                           |
| `c8ctl` CLI                     | `apis-tools/c8ctl/`                                                          | Camunda 8 CLI.                                                           |
| Community clients               | `apis-tools/community-clients/`                                              | Community-maintained clients.                                            |
| Migration manuals               | `apis-tools/migration-manuals/`                                              | API and SDK migration between versions.                                  |
| Frontend development            | `apis-tools/frontend-development/`                                           | Embedding and extending Camunda UIs.                                     |
| Testing                         | `apis-tools/testing/`                                                        | Process testing tooling.                                                 |

### Guides and reference

| Path              | Audience and content                                                                                                                   |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/guides/`    | Hello-world, getting-started flows (APIs, human tasks, agentic orchestration), Camunda 7 migration.                                    |
| `docs/reference/` | Release notes (`announcements-release-notes/`), `glossary.md`, `supported-environments.md`, legal, MCP docs index, public API summary. |

### Generated content (do not hand-edit)

- `api/` — OpenAPI specs and generation scripts. Edit specs here, not the generated pages.
- `config-reference/` — Spring Boot starter configuration metadata. Regenerate via the `config-reference:*` npm scripts.
- API reference pages under `docs/apis-tools/*-api*/` for the REST APIs are largely produced by the `api:generate:*` scripts.

## Required reading before changes

Read these in order before editing — they are authoritative:

1. `.github/copilot-instructions.md` — entry point for AI tooling.
2. `.github/instructions/repo.instructions.md` — file structure, PR workflow, commit conventions.
3. `.github/instructions/content.instructions.md` — language, formatting, links, terminology. Required for any Markdown change.
4. `howtos/technical-writing-styleguide.md` — full style guide. Consult for questions not covered above.
5. `howtos/documentation-guidelines.md` — broader contributor guidance.

## Setup and common commands

```bash
npm install                # install dependencies
npm run start              # local dev server with hot reload
npm run build              # full static build (resource intensive)
npm run build:docker       # containerized build, easier on local resources
npm run format             # Prettier write — run before committing
npm run format:check       # Prettier check
npm test                   # Jest unit tests
npm run test:regression    # Playwright regression tests
npm run docusaurus -- clear  # clear Docusaurus cache when hot reload misbehaves
```

If `npm run start` produces core dumps, raise the Node heap:

```bash
export NODE_OPTIONS=--max-old-space-size=10248
```

For large API or config regenerations, stop and restart the dev server rather than relying on hot reload.

## Style and content rules (summary)

The full rules live in `.github/instructions/content.instructions.md`. Highlights agents must follow:

- **American English**, second person, active voice, common contractions.
- **Sentence case** for all titles and headers. No trailing colons in headers.
- Use `>` to separate sequential UI navigation: `**File > New > BPMN Diagram**`.
- **Bold** UI elements and button labels. Never use quotation marks for them. Never use bold for emphasis.
- Internal links include the `.md` extension. Use **relative paths** within a subtree, **absolute paths** across subtrees. Do not prefix with `/docs/`.
- Use descriptive link text. Never "click here" or bare URLs.
- Use **process**, not "workflow" (with the documented exceptions). **Upgrade** for version changes; **update** for in-place changes.
- Admonitions: only `:::warning`, `:::note`, `:::tip`. Never stack. Never put required steps inside.
- Bulleted lists use `-`, not `*`.
- Write "Elasticsearch", "GitHub" — capitalization matters.

## Adding, moving, or removing pages

- **Add**: create the file in kebab-case, then add its document ID to the sidebar(s).
- **Move**: update sidebar(s) and add a redirect to the **top** of `static/.htaccess`.
- **Remove**: remove from sidebar(s) and add a redirect to `static/.htaccess`.
- When a change applies to the current released version and beyond, edit both the most recent `versioned_docs/version-*/` folder **and** `/docs/`.

## Pull request workflow

- Branch from `main`.
- Keep the PR in **draft** while working. Removing draft signals ready for review.
- Apply **labels** for component, version, and priority. Unlabeled PRs are triaged slowly.
- Add the **`deploy`** label to trigger a preview deployment (recommended for large or complex changes).
- Run `npm run format` before pushing. CI runs Prettier and will fail otherwise.
- Use the PR template at `.github/pull_request_template.md`.

## Commit message convention

Format: `{type}(scope): {description}`

- Valid types: `build`, `ci`, `deps`, `docs`, `feat`, `fix`, `perf`, `refactor`, `style`, `test`, `chore`.
- Header length: 72–120 characters.
- Description in present tense, imperative mood. Example: `docs(8.9): clarify update vs upgrade for license rotation`.

## Things agents should not do

- Do not invent or guess external URLs in content. Link to verified sources.
- Do not edit auto-generated content directly. Files under `docs/apis-tools/` API references and `config-reference/` outputs are regenerated — change the upstream source or the generator instead.
- Do not introduce GIFs or uncropped screenshots containing personal information.
- Do not change `versions.json` or release-related files unless following `howtos/release-procedure.md`.
- Do not skip Prettier or commit-hook checks with `--no-verify` flags.
- Do not bypass the broken-link check (`onBrokenLinks: "throw"`). Fix the link.
- Do not modify `LICENSE.txt`, `code-of-conduct.md`, or CLA-related materials.

## Verification checklist before opening a PR

- [ ] `npm run format` is clean.
- [ ] `npm test` passes if JS/TS was touched.
- [ ] Local `npm run start` renders the changed page without console errors.
- [ ] All internal links resolve (the build will throw on broken links).
- [ ] If pages were moved or removed, redirects exist in `static/.htaccess`.
- [ ] If a Next-and-versioned change, both folders are updated.
- [ ] PR has a meaningful title following the commit convention and appropriate labels.
