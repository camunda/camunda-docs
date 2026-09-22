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

## Choose a tier

A full run always includes the incremental tier, then asks whether to also run the radical and moonshot tiers. Results land in `transformation/` and `transformation-analysis/`, with optional BPMN in `transformation/bpmn/`.

| Tier          | What it proposes                                                                                    |
| ------------- | --------------------------------------------------------------------------------------------------- |
| `migration`   | Lift and shift. Carries the as-is process into executable form without changing it.                 |
| `incremental` | Safe automation. A deterministic optimization pass that always runs as part of a to-be exploration. |
| `radical`     | A redesign that challenges organizational boundaries.                                               |
| `moonshot`    | An agent-first design with almost no user tasks.                                                    |

## Next step

Continue with [implement the Camunda solution](3-implementation.md).
