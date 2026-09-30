---
id: runtime-connection
title: Connect to an Environment
description: "Connect the modeler to an Environment to model against real connector credentials, test tasks, and see the runtime status of your diagram."
---

Connect the modeler to an [Environment](/components/concepts/environments.md) to model against a real runtime. The connection powers connector credential suggestions, task testing, and the Webhook tab of inbound connectors.

## About the runtime connection

The runtime connection shows which Environment the modeler is connected to while you edit a diagram. It's separate from the Environment you deploy to. Connecting to an Environment doesn't change your deploy target.

The following features follow the connected Environment:

| Feature                        | What the connection does                                                                                                                                                  |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Connector credentials          | Suggests the connector credential names of the Environment in your FEEL expressions, and lists its credentials in the properties panel.                                   |
| Task testing                   | Runs the task in the connected Environment. See [task testing](../validation/task-testing.md).                                                                            |
| Webhook tab                    | Shows the status of a webhook-triggered start event in the connected Environment, and updates when you switch Environments, without a redeploy.                           |
| Camunda version of the diagram | The **Follow runtime cluster** option of the [Problems panel](./fix-problems-in-your-diagram.md#camunda-version-selection) uses the version of the connected Environment. |

Two Physical Tenants of the same cluster are separate Environments, so they're separate connections.

## Prerequisites

To connect to an Environment, an organization admin must [assign an Environment to your workspace](/components/hub/organization/manage-environments/assign-environments.md). You see only the Environments assigned to the workspace of the project.

## Connect to an Environment

1. In your workspace, open a project, and open a diagram in **Implement** mode.
1. In the bottom bar of the modeling interface, click the **Runtime** indicator. The **Connect to an environment** popover opens.
1. Select the Environment to connect to.
1. If the Environment has more than one Logical Tenant, choose one with the **Logical tenant** chip of the Environment.
1. If the Environment shows **Needs credentials**, enter the credentials for the cluster when Camunda Hub asks for them.

To disconnect, select **Work offline** in the popover. A diagram that was never connected starts in **Work offline**.

### Connection status

The popover and the indicator show the status of each Environment. Hover over or focus an Environment to see its status in a tooltip. The [Environment statuses](../../../organization/manage-environments/index.md#environment-statuses) are the same as on the **Environments** page.

A connected Environment can also show the following badges:

| Badge                      | Meaning                                                                                                                            |
| :------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| **Needs credentials**      | The cluster of the Environment requires credentials that you haven't entered, or that were rejected. Enter them again to continue. |
| **Needs a logical tenant** | The Environment has several Logical Tenants and none is selected. Choose one with the **Logical tenant** chip.                     |

## How the connection is set

You choose the connection yourself in the popover.

In Self-Managed, a diagram has no connection until you select an Environment or deploy to one. After you deploy to an Environment from the deploy dialog, the modeler shows that Environment as the connection for the rest of your session.

## Permissions

Camunda Hub doesn't check your permissions before it reads from the connected Environment. If you can't access something in the Environment, the feature shows less information, such as no credential suggestions. It doesn't block you from modeling.

## Next steps

- [Test a task](../validation/task-testing.md).
- [Test your process](../validation/test-your-process.md).
- [Deploy your project](../../manage-projects/deploy-project.md).
