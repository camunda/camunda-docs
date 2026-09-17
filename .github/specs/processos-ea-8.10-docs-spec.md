# Documentation spec — ProcessOS EA 8.10

Tracking issue: [camunda/bai-solutions-internal#92](https://github.com/camunda/bai-solutions-internal/issues/92)

Sources:

- [`process-os-8-10-release-scope.md`](https://github.com/camunda/bai-solutions-internal/blob/main/issues/bai-102-process-os-8-10-release/process-os-8-10-release-scope.md)
- [Component overview diagram](https://github.com/camunda/bai-solutions-internal/blob/main/issues/bai-102-process-os-8-10-release/process-os-8-10-component-overview.excalidraw.svg)
- [Governance process overview diagram](https://github.com/camunda/process-os/blob/main/docs/assets/process-os-overview.excalidraw.svg)
- [ProcessOS V1.0 scoping deck](https://docs.google.com/presentation/d/12DWyIO1S43HKYMRRw9H_tGuC8WZbwXfDFLwHi9RgYn4/edit)
- [`camunda/process-os` README](https://github.com/camunda/process-os/tree/main#install-processos-for-claude-code-camunda-internal)

## Authoring rules

- **Naming: always "ProcessOS Harness", never bare "ProcessOS".** Use the full product name in all prose, titles, descriptions, and keywords. Lowercase `process-os` stays untouched in commands (`/process-os-*`), repository names, file paths, and URLs. Note the drift: the product README calls the governance backbone the "Camunda Solution Harness" and reserves "ProcessOS" for the intelligence layer. Docs use "ProcessOS Harness" for both; flag this to product so the naming converges.
- **Validate every description against [`camunda/process-os`](https://github.com/camunda/process-os).** Product source of truth. Cross-check terminology, commands, component names, and behavior before writing. Flag drift.
- **Follow the user flow.** Page order and sidebar sequence mirror the builder journey — overview, organizational setup, get-started, phases, other features, best practices, system requirements. Do not sort alphabetically or by component taxonomy; a builder reads top-to-bottom.
- **Location: versioned docs.** ProcessOS pages live in the versioned part of the docs (not `docs/next` unversioned), starting at 8.10.
- **Entry point: Build with AI.** Link ProcessOS from the "Build with AI" landing page — sidebar entry plus a CTA next to "Set up your AI development environment" (see screenshot in tracking issue).
- **Diagrams: one house style, authored in Excalidraw.** Every ProcessOS diagram follows the [multi-region overview](https://docs.camunda.io/assets/images/multi-region-overview-52529b8c624e375acb611e2c994a69d3.png) reference format and ships as `.excalidraw.svg`. See [Diagram standards](#diagram-standards).

## Diagram standards

Applies to ProcessOS pages only, not to `camunda-docs` generally.

Reference format: the [multi-region overview diagram](https://docs.camunda.io/assets/images/multi-region-overview-52529b8c624e375acb611e2c994a69d3.png) (source in-repo at `docs/self-managed/concepts/multi-region/img/multi-region-overview.png`).

**Format: `.excalidraw.svg`, not PNG.** An `.excalidraw.svg` is a valid SVG that also embeds the editable Excalidraw scene as a payload, so the same file renders in the docs and reopens for editing. This keeps diagrams adjustable as ProcessOS changes during EA, which matters because several components are still unvalidated and will move. This is how [`camunda/process-os`](https://github.com/camunda/process-os/blob/main/docs/assets/process-os-overview.excalidraw.svg) already ships its diagrams, so product and docs can share sources instead of forking them.

Visual rules, taken from the reference:

| Element                        | Rule                                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Line style                     | Clean straight vector lines. Set Excalidraw sloppiness to **Architect**, never the hand-drawn default.       |
| Font                           | Normal (Helvetica/Nunito), never the sketchy Virgil default.                                                 |
| Camunda components             | Orange border, white fill.                                                                                   |
| Grouping containers            | Green border. Solid for standard, dotted for a repeated or optional unit.                                    |
| Inactive or secondary elements | Grey border.                                                                                                 |
| Relationships                  | Solid blue arrow for active data flow; dashed grey/black arrow for conditional, scheduled, or indirect flow. |
| Labels                         | Bold title line, optional lighter descriptive line beneath it. Sentence case.                                |
| Background                     | White, flat. No gradients, drop shadows, or 3D effects.                                                      |

Two practical constraints:

- **Never encode a value only in a diagram.** Per the content style guide, any field name, command, or value the reader must act on appears in the surrounding text as well. Diagrams illustrate; they don't carry unique information.
- **Every diagram needs descriptive alt text.**

**Scope: this plan only.** These rules apply to ProcessOS pages. They are not a repo-wide convention and propose no change to how other docs handle diagrams, which stay PNG. Since `camunda-docs` has no `.excalidraw.svg` files today, verify Docusaurus serves the embedded-payload SVG correctly with the first diagram, before producing the rest.

## Docs Framing

ProcessOS is an AI-agent-based product, not classical deterministic software. The docs job is therefore **expectation management + validation literacy**, not exhaustive feature reference.

| Surface  | Job                                                                                             | Timing        |
| -------- | ----------------------------------------------------------------------------------------------- | ------------- |
| Academy  | Become capable — the mindset shift. The hard part, because the interaction model is unfamiliar. | Front-load    |
| Docs     | Stay unblocked — the reference the capable user returns to.                                     | On demand     |
| In-agent | Unblock right now.                                                                              | In the moment |

**This plan covers public docs only.** Academy and in-agent copy are tracked separately, and docs should not try to do their job.

Two things guide the user along the journey and are first-class doc subjects:

- **AI Coding Agent** — can help the builder at any point to fix problems, even work around bugs.
- **Governance Process** — guides the builder along the Camunda Solution Methodology built into ProcessOS.

## Scope for EA 8.10

- **Audience:** the **Builder** (per scope doc: primary user in V1, well trained in ProcessOS, developer/implementer skillset). **SME** is the secondary persona — reviewer and approver.
- **Folder:** versioned docs, starting at 8.10 (not `docs/next` unversioned).
- **Visibility:** public, clearly marked Early Access (trained customers and enabled partners).
- **Home:** under **Build with AI** — new sidebar entry "ProcessOS" and a CTA on the Build with AI landing page next to "Set up your AI development environment".
- **Unit of doc:** journey-shaped — pages ordered along the builder flow (overview → project-setup → get-started → phases → other-features → best-practices → system-requirements). Phase and feature pages are the reference layer inside that flow, not a separate component taxonomy.

## Page-level content

```
processos/
├── overview.md                           Key principles: governance process, iterations and expert judgment, use cases
├── project-setup.md                      Organizational setup: partner/FDE support, Academy enablement
├── get-started.md                        Builder workspace, ProcessOS install, project configuration
│   ├── governance-process.md             Governance BPMN
│   └── review-cycle.md                   Phases
├── phases/
│   ├── discovery-specialists.md
│   │   ├── Phase overview
│   │   └── Skills
│   ├── process-transformation.md
│   │   ├── Phase overview
│   │   └── Skills
│   └── solution-implementation.md
│       ├── Phase overview
│       └── Skills
├── other-features/
│   ├── builder-task.md
│   └── artifact-generation.md
├── best-practices/
│   └── data-handling.md
└── system-requirements.md                Builder client, AI platform, generated solution
```

The parent path is **Build with AI** (see **Home** above).

### `overview.md` — key principles

Three principles, in this order:

1. **Governance process.** The phase model from the [overview diagram](https://github.com/camunda/process-os/blob/main/docs/assets/process-os-overview.excalidraw.svg): **Discover → Transform → Implement**, with **Improve** and the **Re-engineer** loop shown as the wider lifecycle but explicitly outside V1 scope. Name the milestones as the units of progress — _process scope defined → AS-IS model finalized → TO-BE models finalized → solution ready for production_ — and the review gates on the path (Business SME feedback, Business SME review, Technical SME review). The governance process itself runs on Camunda: state in Camunda, files in Git, fully auditable.
2. **Iterations and expert judgment.** From the scoping deck: project maturity rises through **iterations** across Discovery → Transform → Implement, not through one deterministic pass. AI is not deterministic, so thinking iteratively is the core builder skill. The builder's expert judgment is what converts agent output into a working system — pair this with the rest of the builder skillset (technical depth in Camunda and software development, practical AI/agentic experience, enterprise production experience, stakeholder communication, comfort with ambiguity). This is also where we set the honest expectation: a working demo is not a working system.
3. **Use cases.** The two supported paths: **Legacy migration** (any legacy system → Camunda 8, no vendor-specific optimization) and **AI Transformation** (any process → automated AI-native process on Camunda 8). Both run all phases, but use different modes within them.

The overview also carries the hard boundaries, because they are the main source of wrong expectations: ProcessOS does **not** deploy to production, does not set up the Camunda platform, does not implement CI/CD, does not build apps or custom UIs (Camunda Forms only), does not do process mining or quantitative analysis, and manages isolated single projects with private memory, built locally.

### `get-started.md` — workspace, install, and project configuration

Centered on the **Builder workspace** — everything in one place:

- **IDE** (VS Code) with the project, the **AI Coding Agent**, a console, and **Git** version control.
- The **Camunda Governance Process** running alongside, providing the "Next" guidance.
- The **ProcessOS Process Viewer** for reviewing generated artifacts.
- The workspace contract: full flexibility for each iteration, `Next` when you want guidance, fully auditable — files in Git, state in Camunda.

Get-started takes the builder from nothing to a configured project with the journey running.

The install flow comes from [Install ProcessOS for Claude Code](https://github.com/camunda/process-os/tree/main#install-processos-for-claude-code-camunda-internal) in the `process-os` README:

1. Install / update **c8ctl**: `npm install -g @camunda8/cli@latest`.
2. Load the ProcessOS plugin: `c8 load plugin --from https://github.com/camunda/c8ctl-plugin-process-os`.
3. Install ProcessOS for your agent: `c8 os install claudecode` (installed files are recorded in `.process-os.yaml` and gitignored — never committed).
4. Create a version-controlled project folder: `git init && git add . && git commit -m "ProcessOS Claude code setup"`.
5. Start the journey: launch the agent, select at least the Opus model via `/model`, then run `/process-os-governance-start`.

Also cover the maintenance operations (`c8 os update`, `c8 os install claudecode@1.2.3`, `c8 os switch`) and the manual install from the Releases page for users without c8ctl.

> ⚠️ **Blocker: this install path is Camunda-internal today.** The README section is explicitly titled "(Camunda internal)", and it depends on `camunda/process-os` and `camunda/c8ctl-plugin-process-os`. Public EA docs cannot link to or describe an internal-only flow. Before these docs ship, the install path — repositories, release bundles, and the plugin — must be made publicly accessible, and the README section retitled. **Owner needed.**

**Configure the project.** Once installed, `/process-os-project-initialization` creates the two configuration files, editable at any time before running a skill:

- **`process-scope.md`** — business identity and business prose: process name, description, organization, scope, success criteria, data sources, stakeholders, pain points, context.
- **`run.config.yaml`** — technical run configuration: discovery specialists and iteration limits, `mode` (`interactive` pauses at every review gate, `unattended` auto-accepts and chains phases), `camunda-version`, `target-sdk`, BPMN generation and transformation options.

Note the V1 boundary here: **isolated projects with private memory, built locally.** No shared memory, no multi-project management.

**Cost and time expectation.** Carry the budget note from the README, at the point where a builder is about to commit to a project: **plan for roughly $300–600 in tokens and 6–8 hours for one discover-to-implement journey.** Frame it as a planning input alongside the `mode` choice and iteration limits that directly influence it.

### `project-setup.md`

**Organizational setup, not technical setup.** This page answers "how do I set my organization up to succeed with ProcessOS". It belongs early in the journey, because the EA release is deliberately limited to trained customers and enabled partners.

- **Do your first project with a partner or a Camunda FDE.** ProcessOS is a novel way of running projects, and the first journey is where the unfamiliar interaction model costs the most. Recommend running project one together with an enabled partner or a Camunda Field Delivery Engineer rather than solo.
- **Participate in Camunda Academy.** Academy is where the builder becomes capable; docs only keep an already-capable builder unblocked. Point at the ProcessOS learning path as a prerequisite, not as optional further reading.

State plainly that these are the intended path for EA, not nice-to-haves — the product assumes a trained builder.

### `best-practices/data-handling.md`

How to handle customer data across the journey: which sources are appropriate to point discovery specialists at, what stays local (isolated project, private memory, files in Git), and what the coding agent sends to the AI platform. Practical guidance for making discovery and re-engineering succeed without over-sharing sensitive material.

### `concepts/` — structured along the component overview

Mirrors [`process-os-8-10-component-overview.excalidraw.svg`](https://github.com/camunda/bai-solutions-internal/blob/main/issues/bai-102-process-os-8-10-release/process-os-8-10-component-overview.excalidraw.svg) exactly, so the docs, the scope doc, and the product all use one vocabulary. **Concepts contains component pages only** — no invented groupings.

**Overarching components** apply across the whole journey:

- **Camunda Solution Methodology** — the phases and jobs, each with defined inputs, outputs, and owning role.
- **Governance Process** — the methodology, implemented and automated in Camunda. Covers the phase model in depth plus the **Builder task**, the atomic unit of the process: activate job _(pulled by the agent)_ → execute skill → **builder action** → VCS commit → complete job _(pushed by the agent)_. This loop delivers the three promises: **guidance** (the process tells you what's next), **auditability** (jobs tracked in Camunda, artifacts committed to Git), **full flexibility** (act freely inside a job, or call any skill manually at any time).
- **Review Cycle** — the human-in-the-loop. SMEs answer open questions and review artifacts, iterating until sign-off. Review questions as YAML, transformable to Markdown, Excel, or Camunda Forms; artifacts commented in place.
- **Process Viewer** — reviewing and comparing generated Camunda artifacts, commenting per element.
- **Plugin Mechanism** — extending phases with custom or third-party plugins; today, custom discovery specialists.

**Phase-specific components** map one-to-one onto Discover → Transform → Implement:

- **Discovery Specialists** — parallel research across internal and public sources. **This page also carries the discovery data requirements** (gap 5): which sources, what data quality, what makes re-engineering succeed.
- **Process Transformation** — AS-IS → TO-BE, with the four modes: migration, incremental, radical, moonshot.
- **Solution Implementation** — execution-ready, deployable solutions. **This page also carries validation literacy** (gap 4) via the generated test layers: **process tests** (BPMN orchestration, service tasks mocked), **integration tests** (single element / segment / end-to-end), and **worker unit tests**.
- **Artifact Generation** — BPMN, DMN, Forms, and Worker generation, used across phases.

There is no standalone **AI Coding Agent** page: it is the execution engine rather than a component, so it is introduced in the overview, set up in get-started, and referenced from the governance process and system requirements.

### `system-requirements.md`

Straight from the scope doc: builder client (Windows/macOS/Unix, an AI Coding Agent such as Claude Code or Microsoft Copilot, a Git-compatible VCS), AI platform as supported by the coding agent, a supported Camunda 8 release. For generated solutions: Spring Boot with Java 25, latest Camunda 8 release.

## Deliberate non-goals

- **No builder-mindset training in docs.** Capability-building is Academy's job.
- **No Business Analyst enablement.** The scope doc puts BA / Process Owner in the _future_ column; V1's primary user is the Builder. Do not document a persona the product does not yet serve.

## Open questions

- Where is the home for this content?

  Resolved: **Build with AI** (versioned, from 8.10).

- How to align ensure visuales meet defined standards

  Resolved: follow the [Diagram standards](#diagram-standards) — multi-region overview reference format, authored and shipped as `.excalidraw.svg`.

- Who does QA (Typo, language, ...)?

  Resolved: assign the docs reviewer group on the GitHub PR — docs team picks it up.
