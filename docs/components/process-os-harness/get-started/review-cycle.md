---
id: review-cycle
title: Review generated results with SMEs
sidebar_label: Review cycles
description: "Review cycles bring subject matter experts into each ProcessOS Harness phase to answer open questions and review generated artifacts until they sign off."
keywords: ["ProcessOS Harness", "review cycle", "SME", "sign-off"]
---

A review cycle is how ProcessOS Harness keeps a human in the loop. In each cycle, SMEs answer open questions and review generated artifacts, and the cycle repeats until they sign off on the result.

Every phase contains one or more review cycles. The sign-off at the end of a cycle is what allows the project to move to the next phase, which makes review the main quality gate in a ProcessOS Harness engagement.

## How a cycle runs

1. ProcessOS Harness generates artifacts and collects the questions it can't answer from the sources it has.
1. SMEs answer the open questions and comment on the generated artifacts.
1. You feed the answers and comments back into the project, and ProcessOS Harness regenerates the affected results.
1. SMEs either request another cycle or sign off.

Because the interaction model is iterative, plan for more than one cycle per phase. A first-pass result that needs correction is the expected outcome, not a failure.

## Answer review questions

ProcessOS Harness stores review questions in structured YAML files, such as `transformation/review-questions.yaml`. SMEs rarely want to edit YAML, so you can export the questions into a more familiar format and import the answers afterwards.

| Type             | Command                                 | What it produces                                                                                                   |
| ---------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Skill            | `/process-os-questions-md-export`       | A Markdown copy of the questions, for answering in a text editor.                                                  |
| Skill            | `/process-os-questions-xlsx-export`     | A spreadsheet copy, for answering in Excel.                                                                        |
| Camunda Tasklist | Camunda Tasklist                        | SMEs can also answer questions in Camunda Tasklist, because the governance process presents them as Camunda Forms. |
| Skill            | `/process-os-review-answer-application` | Applies answered questions back into the discovery documents.                                                      |

## Review artifacts directly

Diagrams are often easier to review than prose. Open generated BPMN, DMN, and form files, then annotate them in place.

| Command                          | What it does                                                                                         |
| -------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `/process-os-file-viewer [file]` | Open BPMN, DMN, or form files in a browser-based viewer.                                             |
| `/process-os-sme-review-package` | Create a static review package from a selected BPMN comparison, for sharing with reviewers.          |
| `/process-os-web-modeler-sync`   | Sync diagrams with a governed Web Modeler project to create, upload, version, compare, and download. |

Reviewers can add annotations, rename steps, and restructure flows directly in Camunda Modeler. ProcessOS Harness reconciles those hand edits when you run the feedback cycle for the phase.

## Feed answers back

Each phase has a feedback mode that collects reviewer input, reconciles it with the generated artifacts, and regenerates what changed.

| Command                                       | Phase                                                                                                         |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `/process-os-sme-feedback`                    | Collect SME feedback on a discovery result into the workspace as uncommitted changes.                         |
| `/process-os-process-discovery --feedback`    | Collect and integrate feedback into the discovery documents and BPMN.                                         |
| `/process-os-process-transformation feedback` | Integrate feedback across transformation tiers. Add a tier name to scope it, for example `feedback moonshot`. |

Feedback lands in your working tree as uncommitted changes. Review the diff before you commit, because this is the point where you decide which agent changes become part of the project record.
