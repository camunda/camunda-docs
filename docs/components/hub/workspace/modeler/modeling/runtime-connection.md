---
id: runtime-connection
title: Connect to an environment
description: "Connect the modeler to an environment to model against real connector credentials, test tasks, and see the runtime status of your diagram."
---

Connect the modeler to an [environment](/components/concepts/environments.md) to model against a real runtime. The connection powers connector credential suggestions, task testing, and the Webhook tab of inbound connectors.

## About the runtime connection

The runtime connection shows which environment the modeler is connected to while you edit a diagram. It's separate from the environment you deploy to. Connecting to an environment doesn't change your deploy target.

The following features follow the connected environment:

| Feature                        | What the connection does                                                                                                                                                  |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Connector credentials          | Suggests the connector credential names of the environment in your FEEL expressions, and lists its credentials in the properties panel.                                   |
| Task testing                   | Runs the task in the connected environment. See [task testing](../validation/task-testing.md).                                                                            |
| Webhook tab                    | Shows the status of a webhook-triggered start event in the connected environment, and updates when you switch environments, without a redeploy.                           |
| Camunda version of the diagram | The **Follow runtime cluster** option of the [Problems panel](./fix-problems-in-your-diagram.md#camunda-version-selection) uses the version of the connected environment. |

Two Physical Tenants of the same cluster are separate environments, so they're separate connections.

## Prerequisites

To connect to an environment, an organization admin must [assign an environment to your workspace](/components/hub/organization/manage-environments/assign-environments.md). You see only the environments assigned to the workspace of the project.

## Connect to an environment

1. In your workspace, open a project, and open a diagram in **Implement** mode.
1. In the bottom bar of the modeling interface, click the **Runtime** indicator. The **Connect to an environment** popover opens.
1. Select the environment to connect to.
1. If the environment has more than one Logical Tenant, choose one with the **Logical tenant** chip of the environment.
1. If the environment shows **Needs credentials**, enter the credentials for the cluster when Camunda Hub asks for them.

To disconnect, select **Work offline** in the popover. A diagram that was never connected starts in **Work offline**.

### Connection status

The popover and the indicator show the status of each environment. Hover over or focus an environment to see its status in a tooltip. The [environment statuses](../../../organization/manage-environments/index.md#environment-statuses) are the same as on the **Environments** page.

A connected environment can also show the following badges:

| Badge                      | Meaning                                                                                                                            |
| :------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| **Needs credentials**      | The cluster of the environment requires credentials that you haven't entered, or that were rejected. Enter them again to continue. |
| **Needs a logical tenant** | The environment has several Logical Tenants and none is selected. Choose one with the **Logical tenant** chip.                     |

## How the connection is set

You choose the connection yourself in the popover.

In Self-Managed, a diagram has no connection until you select an environment or deploy to one. After you deploy to an environment from the deploy dialog, the modeler shows that environment as the connection for the rest of your session.

## Permissions

Camunda Hub doesn't check your permissions before it reads from the connected environment. If you can't access something in the environment, the feature shows less information, such as no credential suggestions. It doesn't block you from modeling.

## Next steps

- [Test a task](../validation/task-testing.md).
- [Test your process](../validation/test-your-process.md).
- [Deploy your project](../../manage-projects/deploy-project.md).
