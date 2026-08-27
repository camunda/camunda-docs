---
id: orchestrate-apis
title: Get started with API orchestration
sidebar_label: Orchestrate APIs using connectors
description: "For low-code developers using Camunda 8 Saas, use connectors to build process automation solutions."
keywords:
  [api endpoints, orchestration, getting started, user guide, connectors]
---

<span class="badge badge--beginner">Beginner</span>
<span class="badge badge--cloud">Camunda 8 SaaS only</span>
<span class="badge badge--medium">Time estimate: 15 minutes</span>

import clsx from "clsx";
import SaasPrereqs from './react-components/\_saas-prerequisites.md'

This guide is designed for users who prefer a low-code approach to process automation. You can follow this tutorial using either a local, Self-Managed lightweight setup, or Camunda 8 SaaS.

This guide will walk you through working with a REST connector task as a first time Camunda 8 SaaS user.

The REST connector is a [protocol connector](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md#protocol-connectors), where you can make a request to a REST API and use the response in the next steps of your process.

:::note
New to connectors? Review our [introduction to connectors](/components/connectors/introduction.md) to get familiar with their capabilities, and have a closer look at all of the available [out-of-the-box connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md).
:::

<details>
   <summary>Have you signed up for Camunda yet?</summary>
   <SaasPrereqs/>
</details>

The concept of a [connector](/reference/glossary.md#connector) consists of two parts: the business logic is implemented as a [job worker](/reference/glossary.md#job-worker), and the user interface during modeling is provided using an element template. In this guide, you will create a REST connector task in your process, handle the HTTP response, and deploy your process. New to creating a process? Get started by [modeling your first diagram](/components/hub/workspace/modeler/collaboration/design-your-process.md).

## Create a REST connector task

To use a REST connector in your process, follow the steps below:

1. In Camunda Hub, open a [workspace](../components/hub/workspace/index.md).
2. Create a new project.
3. In the project, click **Create new > BPMN diagram**.
4. With your new diagram open, make sure you're in [**Implement** mode](/components/hub/workspace/modeler/collaboration/implement-your-process.md).
5. With no diagram elements selected, open the **Details** panel on the right side of the modeling interface.
6. Under **Properties > General**, configure the following properties:
   - **Name:** `API Orchestration Tutorial`
   - **ID:** `api-orchestration-tutorial`
7. Click the existing start event, then select the **Append task** icon.
8. Click the new task, then select the **Change element** icon.
9. Search for and select the **REST Outbound Connector**.
10. With the **REST Outbound Connector** selected, under **Properties > General**, name the task `Make a request`.

## Make your REST connector executable

Set up your REST connector to get a random cat fact from the [Cat Fact API](https://catfact.ninja/):

1. Select the **REST Outbound Connector**.
2. Under **Properties > HTTP endpoint**, set the **URL** to `https://catfact.ninja/fact`.

## Handle your response

The HTTP response will be available in a temporary local response variable. This variable can be mapped to the process by specifying **Result Variable**.
In the **Response Mapping** section use `={"body" : body}` as the **Result Expression** so you can see the entire JSON object returned if it's successful.

## Deploy your process

To deploy your process, take the following steps:

1. Drag the bolded circular end event element from the palette and onto the canvas, or by clicking on the final service task, and then the end event element alongside it. Ensure there is an arrow connecting the service task to the end event.
2. In the top right corner click the blue **Deploy** button. Your diagram is now deployed to your cluster.
   :::note
   If you have not yet created a cluster, clicking **Deploy** will take you to the console to create a cluster. Once you make your cluster creation request, you will automatically be redirected back to Modeler. The creation of a cluster can take 1 to 5 minutes. To read more about creating clusters, visit our documentation on [creating a cluster](create-cluster.md).
   :::
3. Start a new [process instance](/reference/glossary.md#process-instance) by clicking on the blue **Run** button.
4. In the top left corner of the screen, click the square-shaped **Camunda components** button. Navigate to Operate to see your process instance with a token waiting at the service task by clicking **View process instances**.

## Wrap up

Congratulations! You successfully built your first API orchestration solution with Camunda 8.

Camunda 8 empowers users to automate processes faster. With connectors, you can access APIs without writing code.

Connector tasks are also how you give an [AI agent](/reference/glossary.md#ai-agent) something to do. An agent can call the same connectors you used here as its tools, and the process still defines which tools the agent is allowed to use.

Don't want to build the process yourself? Click this button to create it from a template in Camunda 8 SaaS, or sign up first.

<div style={{display: "flex", gap: 8}}>
   <a
      className={clsx(
         "button button--outline button--secondary button--lg"
      )}
      href="https://marketplace.camunda.com/en-US/apps/437126/api-orchestration-quick-start">
      Open model in Camunda 8
   </a>
   <a
      className={clsx(
         "button button--outline button--secondary button--lg"
      )}
      href="https://signup.camunda.com/accounts?utm_source=docs.camunda.io&utm_medium=referral">
      Sign up
   </a>
</div><br />

## Additional resources and next steps

- Learn more about Camunda 8 and what it can do by reading [What is Camunda 8](/components/components-overview.md) or watching our [Overview video](https://bit.ly/3TjNEm7) in Camunda Academy.
- [Build your first AI agent](./getting-started-agentic-orchestration.md)
- [Learn about types of connectors](/components/connectors/connector-types.md)
- [Use connectors in your BPMN process](/components/connectors/use-connectors/index.md)
- [Camunda Academy: Generate a Connector Template from an API Specification](https://academy.camunda.com/c8-h2-generate-connector-from-api/)
