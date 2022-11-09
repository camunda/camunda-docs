---
id: basic-operate-navigation
title: Getting familiar with Operate
description: "View a deployed workflow and inspect a workflow instance after deploying a workflow to Zeebe and creating at least one workflow instance."
---

This section "Getting familiar with Operate" and the next section “Variables and incidents” assumes that you’ve deployed a workflow to Zeebe and have created at least one workflow instance. 

If you’re not sure how to deploy workflows or create instances, we recommend going through the [Getting started tutorial](/guides/getting-started/model-your-first-process.md)

In the following sections, we’ll use the same `order-process.bpmn` workflow model from the Getting Started guide. 

## View a deployed workflow

In the **Instances by Workflow** panel in your dashboard, you should see a list of your deployed workflows and running instances. 

![operate-view-workflow](../img/operate-introduction_light.png)

When you click on the name of a deployed workflow in the **Instances by Workflow** panel, you’ll navigate to a view of that workflow model along with all running instances.

![operate-view-workflow](./img/operate-view-workflow_light.png)

From this **Running Instances** view, you have the ability to cancel a single running workflow instance. 

![operate-cancel-workflow-instance](./img/operate-view-workflow-cancel_light.png)

## Inspect a workflow instance

Running workflow instances appear in the **Instances** section below the workflow model. To inspect a specific instance, you can click on the instance id. 

![operate-inspect-instance](./img/operate-workflow-instance-id_light.png)

There, you’ll be able to see detail about the workflow instance, including the instance history and the variables attached to the instance. 

![operate-view-instance-detail](./img/operate-view-instance-detail_light.png)


