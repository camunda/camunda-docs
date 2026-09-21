---
id: transformation
title: Transform the process to a to-be design
sidebar_label: Transformation
description: "The transformation phase turns the signed-off as-is process into to-be proposals, using the incremental, radical, and moonshot tiers, or the exclusive migration tier for lift-and-shift."
keywords:
  ["ProcessOS Harness", "transformation", "to-be", "migration", "moonshot"]
---

Transformation turns the signed-off as-is process into a to-be design. ProcessOS Harness elicits your criteria, analyzes each phase of the process, and then challenges every system, data flow, and manual step it found.

You choose how far the challenge goes. The phase offers tiers that range from a safe optimization pass to an agent-first redesign, so you can compare options before committing to one.

## Run a transformation

```text
/process-os-process-transformation
```

A full run always includes the incremental tier, then asks whether to also run the radical and moonshot tiers. Results land in `transformation/` and `transformation-analysis/`, with optional BPMN in `transformation/bpmn/`.

## Choose a tier

| Tier          | What it proposes                                                                                    |
| ------------- | --------------------------------------------------------------------------------------------------- |
| `migration`   | Lift and shift. Carries the as-is process into executable form without changing it.                 |
| `incremental` | Safe automation. A deterministic optimization pass that always runs as part of a to-be exploration. |
| `radical`     | A redesign that challenges organizational boundaries.                                               |
| `moonshot`    | An agent-first design with almost no user tasks.                                                    |

The migration tier is exclusive. A run is either a migration or a to-be exploration, never both, because the analysis phases exist to propose exactly the changes migration forbids.

### Migrate without redesigning

Use the migration tier when the goal is to make what you have run, rather than to decide what you should have.

```bash
/process-os-process-transformation migration --bpmn
/process-os-artifact-generation --tier migration
```

Migration changes how a step is implemented, and never changes the process itself. No step is added, removed, merged, reordered, or parallelized. Process fidelity is guaranteed by construction, because the tier's phase documents are a byte-identical copy of the as-is documents.

### Explore to-be options

| Invocation                                            | What it does                                                                    |
| ----------------------------------------------------- | ------------------------------------------------------------------------------- |
| `/process-os-process-transformation`                  | Full run. Incremental always runs, and you're asked about radical and moonshot. |
| `/process-os-process-transformation incremental`      | Incremental only. Stops before the challenge phases.                            |
| `/process-os-process-transformation moonshot`         | Incremental and moonshot.                                                       |
| `/process-os-process-transformation radical moonshot` | Incremental and both challenge tiers.                                           |

Because the tiers produce comparable proposals, run more than one when you want a conversation with stakeholders about how far to go. A moonshot proposal is useful even when you choose the incremental tier, because it shows what you're deciding against.

## Control a run

| Option       | Effect                                                                                              |
| ------------ | --------------------------------------------------------------------------------------------------- |
| `--bpmn`     | Also generate BPMN for the selected tiers, skipping the BPMN prompt.                                |
| `unattended` | Run without confirmation gates.                                                                     |
| `regenerate` | Skip the analysis phases and re-run BPMN generation from existing `transformation-analysis/` files. |
| `feedback`   | Integrate reviewer feedback across tiers. Add a tier name to scope it.                              |

Options combine freely. For example, `/process-os-process-transformation unattended regenerate` regenerates without prompting, and `/process-os-process-transformation regenerate moonshot` regenerates a single tier.

## Review and iterate

1. Open the generated diagrams in Camunda Modeler. Add annotations, rename steps, or restructure flows.
1. Answer `transformation/review-questions.yaml`, either directly or in an exported Markdown or spreadsheet copy.
1. Run `/process-os-process-transformation feedback`.

The feedback run collects reviewer input, diffs your working tree, reconciles review answers with hand-edited diagrams, regenerates BPMN, and stages everything for your review. Check the diff before committing.

The phase ends when SMEs sign off on the to-be models, described in [review generated results with SMEs](../get-started/review-cycle.md).

## Next step

Continue with [implement the Camunda solution](3-implementation.md).
