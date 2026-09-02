---
id: fix-problems-in-your-diagram
title: Fix problems in your diagram
description: This feature assists you in debugging and fixing errors in your processes.
---

The **Problems** panel is at the bottom of the modeling interface. Use it to debug and fix errors in your processes.

## Design time errors

Based on a set of lint rules, Camunda Hub continuously validates implementation properties for a process diagram while the user is modeling. The validation errors are added to the panel at the bottom of Camunda Hub. Expand the panel to view the errors by clicking the **Problems** header. The panel is collapsed by default and the latest state (expanded or collapsed) is remembered for the next time you open Camunda Hub.

:::note
An error is shown if any process ID, decision ID, or form ID exceeds the supported length for the target environment. To avoid backend-specific deployment problems, keep those IDs short and consistent with the limits of the cluster you plan to deploy to.
:::

## Camunda version selection

The version selector at the top right of the **Problems** panel can be used to choose the Camunda version the diagram is validated against. The chosen version should match the version of the cluster where the diagram will be deployed so that the correct set of errors is shown.

:::tip
If you don't know the version click **Deploy & run** at the top right of the modeling interface. In the deployment dialog, next to the cluster name, you'll see the Camunda version of the target cluster.
:::

The version selector also provides information about the number of clusters available for each Camunda version within the current organization.

## Interactivity

Errors in the **Problems** panel are interactive. Clicking on the row highlights the corresponding element in the canvas and points to the specific property in the properties panel where you can resolve the issue.

## Deploy time errors

If errors are thrown by the engine when deploying a diagram (whether they were caught by design time errors or not), they will be displayed in the deployment modal.
