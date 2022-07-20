---
id: orchestrate-api-endpoints
title: Getting started with API Endpoints
sidebar_label: Getting started with API Endpoints
description: "Use Connectors to build low code process automation solutions"
keywords:
  [api endpoints, orchestration, getting started, user guide, connectors]
---

A connector is a reusable building block that works out of the box. Each connector task can be configured with domain-specific parameters without implementing custom business logic.

The concept of a connector consists of two parts: the business logic is implemented as a job worker, and the user interface during modeling is provided using an element template.

This guide will walk you through working with a REST connector task as a first time Camunda Platform 8 user.

## Create a REST connector task

To use a **REST connector** in your process, follow the steps below:

1. Create a BPMN diagram. To do this, navigate to Web Modeler via the **Modeler** tab, and click **New project**.
2. Name your project and select **New > BPMN Diagram > + Create blank**.
3. Give your model a descriptive name and id. On the right side of the page, expand the **General** section of the properties panel to find the name and id fields. For this guide, we'll use **API Endpoint Tutorial** for the name and **api-endpoint-tutorial** for the id.
4. Use Web Modeler to design a BPMN flow with a connector task. Create a connector task by dragging the rectangular task element from the palette, or click the existing start event and the displayed task element to the right of the start event.
5. Change the task type by clicking the wrench icon and select **REST Connector (No Auth)** in the **Connectors** section.

![create sendgrid connector wrench](img/connectors-rest-create-task-wrench.png)

Alternatively, you can directly create a **REST connector** by using the append menu:

![create rest connector append](img/connectors-create-task-append.png)

## Make your REST connector executable

![rest connector red properties](img/connectors-rest-red-properties.png)

To make the **REST connector** executable, fill out the mandatory **URL** field in the HTTP Endpoint section (highlighted in red) in the properties panel with `https://catfact.ninja/fact` so we can get a random cat fact from the [Cat Fact API](https://catfact.ninja/) for this example.

## Handle your response

The HTTP response will be available in a temporary local response variable. This variable can be mapped to the process by specifying **Result Variable**.

In the **Response Mapping** section, use `={"body" : body}` as the **Result Expression** so you can see the entire JSON object returned if it's successful.

## Create a cluster

import CreateCluster from './assets/react-components/create-cluster.md'

<CreateCluster/>

## Deploy your process

To deploy your process, take the following steps:

1. Drag the bolded circular end event element from the palette and onto the canvas, or by clicking on the final service task, and then the end event element alongside it. Ensure there is an arrow connecting the service task to the end event.
2. In the top right corner click the blue **Deploy diagram** button. Your diagram is now deployed to your cluster.
3. Start a new process instance by clicking on the blue **Start instance** button.
4. To the right of the **Start instance** button, click the honeycomb-shaped **Applications** icon. Navigate to Operate to see your process instance with a token waiting at the service task by clicking **View process instances**.

## Additional resources and next steps

- Dive deeper into [connectors](/components/modeler/web-modeler/connectors/index.md).
