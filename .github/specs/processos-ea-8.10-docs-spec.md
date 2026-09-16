# Documentation spec — ProcessOS EA 8.10

Tracking issue: [camunda/bai-solutions-internal#92](https://github.com/camunda/bai-solutions-internal/issues/92)

Sources:

- [`process-os-8-10-release-scope.md`](https://github.com/camunda/bai-solutions-internal/blob/main/issues/bai-102-process-os-8-10-release/process-os-8-10-release-scope.md)
- [Component overview diagram](https://github.com/camunda/bai-solutions-internal/blob/main/issues/bai-102-process-os-8-10-release/process-os-8-10-component-overview.excalidraw.svg)
- [Governance process overview diagram](https://github.com/camunda/process-os/blob/main/docs/assets/process-os-overview.excalidraw.svg)
- [ProcessOS V1.0 scoping deck](https://docs.google.com/presentation/d/12DWyIO1S43HKYMRRw9H_tGuC8WZbwXfDFLwHi9RgYn4/edit)
- [`camunda/process-os` README](https://github.com/camunda/process-os/tree/main#install-processos-for-claude-code-camunda-internal)

## Framing

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
- **Folder:** `docs/` (Next) only — unreleased.
- **Visibility:** public, clearly marked Early Access (trained customers and enabled partners).
- **Home:** TBD!
- **Unit of doc:** hybrid — journey-shaped pages (overview, get-started), with `concepts/` structured strictly along the ProcessOS component overview as the reference layer.

## Gaps to close

1. What ProcessOS is and what it can do (expectation management).
2. How to get started.
3.
4. Key concepts needed to validate results and ask the Coding Agent the right questions.
5. Best practice
   1. Data requirements for discovery — which data to use, how to make re-engineering successful. https://github.com/camunda/process-os/blob/main/docs/discovery-data-guide.md
6. System requirements (https://github.com/camunda/process-os/tree/main#system-requirements)

## Page-level content

```
processos/
├── overview.md                          Key principles: governance process, iterations and expert judgment, use cases
├── get-started.md                       Builder workspace and one-time ProcessOS install
├── project-setup.md                     Per-project setup, configuration, cost and time expectation
├── system-requirements.md               Builder client, AI platform, generated solution
└── concepts/
    ├── overview.md                      Component map: overarching vs. phase-specific
    ├── overarching/
    │   ├── camunda-solution-methodology.md
    │   ├── governance-process.md
    │   ├── review-cycle.md
    │   ├── process-viewer.md
    │   └── plugin-mechanism.md
    └── phase-specific/
        ├── discovery-specialists.md
        ├── process-transformation.md
        ├── solution-implementation.md
        └── artifact-generation/
            ├── bpmn-generation.md
            ├── dmn-generation.md
            ├── forms-generation.md
            └── worker-generation.md
```

All pages live under `docs/components/early-access/processos/`.

### `overview.md` — key principles

Three principles, in this order:

1. **Governance process.** The phase model from the [overview diagram](https://github.com/camunda/process-os/blob/main/docs/assets/process-os-overview.excalidraw.svg): **Discover → Transform → Implement**, with **Improve** and the **Re-engineer** loop shown as the wider lifecycle but explicitly outside V1 scope. Name the milestones as the units of progress — _process scope defined → AS-IS model finalized → TO-BE models finalized → solution ready for production_ — and the review gates on the path (Business SME feedback, Business SME review, Technical SME review). The governance process itself runs on Camunda: state in Camunda, files in Git, fully auditable.
2. **Iterations and expert judgment.** From the scoping deck: project maturity rises through **iterations** across Discovery → Transform → Implement, not through one deterministic pass. AI is not deterministic, so thinking iteratively is the core builder skill. The builder's expert judgment is what converts agent output into a working system — pair this with the rest of the builder skillset (technical depth in Camunda and software development, practical AI/agentic experience, enterprise production experience, stakeholder communication, comfort with ambiguity). This is also where we set the honest expectation: a working demo is not a working system.
3. **Use cases.** The two supported paths: **Legacy migration** (any legacy system → Camunda 8, no vendor-specific optimization) and **AI Transformation** (any process → automated AI-native process on Camunda 8). Both run all phases, but use different modes within them.

The overview also carries the hard boundaries, because they are the main source of wrong expectations: ProcessOS does **not** deploy to production, does not set up the Camunda platform, does not implement CI/CD, does not build apps or custom UIs (Camunda Forms only), does not do process mining or quantitative analysis, and manages isolated single projects with private memory, built locally.

### `get-started.md`

Centered on the **Builder workspace** — everything in one place:

- **IDE** (VS Code) with the project, the **AI Coding Agent**, a console, and **Git** version control.
- The **Camunda Governance Process** running alongside, providing the "Next" guidance.
- The **ProcessOS Process Viewer** for reviewing generated artifacts.
- The workspace contract: full flexibility for each iteration, `Next` when you want guidance, fully auditable — files in Git, state in Camunda.

Get-started ends once ProcessOS is installed and the journey can be started. Everything per-project moves to the next chapter.

The install flow comes from [Install ProcessOS for Claude Code](https://github.com/camunda/process-os/tree/main#install-processos-for-claude-code-camunda-internal) in the `process-os` README:

1. Install / update **c8ctl**: `npm install -g @camunda8/cli@latest`.
2. Load the ProcessOS plugin: `c8 load plugin --from https://github.com/camunda/c8ctl-plugin-process-os`.
3. Install ProcessOS for your agent: `c8 os install claudecode` (installed files are recorded in `.process-os.yaml` and gitignored — never committed).
4. Create a version-controlled project folder: `git init && git add . && git commit -m "ProcessOS Claude code setup"`.
5. Start the journey: launch the agent, select at least the Opus model via `/model`, then run `/process-os-governance-start`.

Also cover the maintenance operations (`c8 os update`, `c8 os install claudecode@1.2.3`, `c8 os switch`) and the manual install from the Releases page for users without c8ctl.

> ⚠️ **Blocker: this install path is Camunda-internal today.** The README section is explicitly titled "(Camunda internal)", and it depends on `camunda/process-os` and `camunda/c8ctl-plugin-process-os`. Public EA docs cannot link to or describe an internal-only flow. Before these docs ship, the install path — repositories, release bundles, and the plugin — must be made publicly accessible, and the README section retitled. **Owner needed.**

### `project-setup.md`

Separates the **one-time ProcessOS install** (get-started) from the steps repeated **for every Camunda project**, matching the onboarding journey in the scope doc: init project → setup project → discovery phase.

- **Initialize the project.** `/process-os-project-initialization` creates the two configuration files.
- **`process-scope.md`** — business identity and business prose: process name, description, organization, scope, success criteria, data sources, stakeholders, pain points, context.
- **`run.config.yaml`** — technical run configuration: discovery specialists and iteration limits, `mode` (`interactive` pauses at every review gate, `unattended` auto-accepts and chains phases), `camunda-version`, `target-sdk`, BPMN generation and transformation options.
- Both files can be edited at any time before running a skill.
- Note the V1 boundary here: **isolated projects with private memory, built locally.** No shared memory, no multi-project management.

**Cost and time expectation.** This chapter carries the budget note from the README, where a builder is about to commit to a project: **plan for roughly $300–600 in tokens and 6–8 hours for one discover-to-implement journey.** Frame it as a per-project planning input, alongside the `mode` choice and iteration limits that directly influence it.

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

- How and where do we train the Business Analyst, for the release where they become primary? Needs an owner.
- Which components are stable enough at EA to document as reference? Several components are still 🔵 (no customer validation) — transformation, solution implementation, worker generation.
- Product-side source of truth and reviewer for capability content?
- Does EA need an explicit feedback path back to the product team, and is in-agent the right surface for it?
- Is Camunda 7 migration tooling in or out? (Open comment in the scope doc.)
- Who owns making the install path public (`process-os`, `c8ctl-plugin-process-os`, release bundles), and by when?

## Next steps

1. Confirm this IA and the overview principles with product.
2. Confirm the component list is final, since `concepts/` is structured directly on it.
3. Draft in gap order (1 → 5); overview and get-started first, since they carry the expectation-management load.
4. Add sidebar entries in `sidebars.js`, then run a full build before opening the PR.
