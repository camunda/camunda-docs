---
id: builder-workspace
title: Understand the builder workspace
sidebar_label: Builder workspace
description: "The builder workspace is the recommended setup for a ProcessOS project: your terminal, the AI coding agent, Git, the governance process, and a file viewer."
keywords: ["ProcessOS Harness", "builder workspace", "terminal"]
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## Parts of the builder workspace

| Part               | What you use it for                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Terminal           | Runs the AI coding agent and the c8ctl commands. An IDE, such as Visual Studio Code, is optional and can display the project folder. |
| AI coding agent    | Does the work in each job, and helps you fix problems at any point.                                                                  |
| Git                | Stores every project artifact, so changes are reviewable and reversible.                                                             |
| Governance process | Runs on Camunda alongside your terminal, and tells you what to do next.                                                              |
| File viewer        | Opens generated BPMN, DMN, and form files for review. Use [Desktop Modeler](../../modeler/desktop-modeler/index.md).                 |

## Next steps

- Check the [system requirements](system-requirements.md).
- [Install ProcessOS Harness and configure a project](../installation.md).
