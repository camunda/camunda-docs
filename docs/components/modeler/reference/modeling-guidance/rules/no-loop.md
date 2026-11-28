---
id: no-loop
title: Infinite Loop
description: Reference for the `no-loop` rule.
---

import MarkerGuideline from "@site/src/mdx/MarkerGuideline";

This error occurs when a BPMN model contains an automated loop (without human interaction or external event triggers). It may cause an endless recursion.

This may result in:

- Endless execution
- [Excessive resource usage](../../../../saas/clusters/cluster-capacity.md)

To fix this problem, add a timer, user task, or external event (e.g., message catch) to break the straight-through loop and ensure controlled execution.

## <MarkerGuideline.Invalid /> Straight-through processing loop

![Straight-through processing loop](./img/no-loop/wrong.png)

## <MarkerGuideline.Valid /> Controlled Loop

![Controlled Loop](./img/no-loop/right.png)

## Review loops

A loop is fine when a person completes a task on every pass through it. For example, an author revises a document, a reviewer approves it or returns it, and the author revises it again.

```mermaid
flowchart LR
  A([Start]) --> B[Author revises document]
  B --> C[Reviewer reviews document]
  C --> D{Approved?}
  D -- Yes --> E([End])
  D -- No --> B
```

This loop passes the rule because it contains two user tasks. The return from the reviewer goes to the author's **Revise document** task, not back to the reviewer. The reviewer sees the document again only after the author submits the revision.

## References

- [Rule source](https://github.com/camunda/bpmnlint-plugin-camunda-compat/blob/main/rules/camunda-cloud/no-loop.js)
