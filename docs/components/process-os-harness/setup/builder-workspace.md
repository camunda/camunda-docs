---
id: builder-workspace
title: Understand the builder workspace
sidebar_label: Builder workspace
description: "The builder workspace contains all required tools for a ProcessOS project: the AI coding agent, Git, the governance process, and a file viewer, ideally brought together in an IDE."
keywords: ["ProcessOS Harness", "builder workspace", "IDE"]
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## Parts of the builder workspace

| Part               | What you use it for                                                      | How to use                            |
| ------------------ | ------------------------------------------------------------------------ | ------------------------------------- |
| AI coding agent    | Does the work in each job, and helps you fix problems at any point.      | CLI in Terminal                       |
| Git                | Stores every project artifact, so changes are reviewable and reversible. | Terminal                              |
| Governance process | Runs on Camunda, and tells you what to do next.                          | Access Camunda Operate with a Browser |
| Modeler            | Opens generated BPMN, DMN, and form files for review.                    | Open with Camunda Modeler             |

Camunda recommends using an IDE, such as Visual Studio Code, because it brings most of these parts together in one place.

## Next steps

- Check the [system requirements](system-requirements.md).
- [Install ProcessOS Harness and configure a project](../installation.md).
