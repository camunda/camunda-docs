---
id: validate-project
title: Validate your project
description: Validate your project in development before deploying it to your target environment.
---

Validate your project in development before deploying it to your target environment.

## Prerequisites

Before you begin:

- Make sure you've [set up a project](./create-a-project.md), including at least one cluster.
- If the target cluster has [authorizations](/components/admin/authorization.md) enabled, ensure deploying users have [`CREATE` permission to the `RESOURCE` resource type](/components/admin/authorization.md#create-an-authorization-in-admin).

## Validate your project

Use [Play mode](/components/hub/workspace/modeler/validation/play-your-process.md) to validate your project in development.

1. In your workspace, open the project you want to validate.
1. Open a BPMN diagram.
1. At the top left of the modeler canvas, click **Play** to play the project using your selected development cluster.
1. Select an environment, and click **Deploy**.
1. Validate your process as required. For example, debug your process logic and test the project.

:::info
To learn more about using Play for validation, see [Play mode for rapid validation](/components/hub/workspace/modeler/validation/play-your-process.md)
:::
