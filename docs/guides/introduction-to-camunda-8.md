---
id: introduction-to-camunda
title: Introduction to Camunda 8
sidebar_label: Introduction to Camunda 8
slug: /guides/
description: "Step through an introduction to Camunda 8, creating an account, modeling your first process, getting started with microservice orchestration, and more."
---

import DocCardList from '@theme/DocCardList';

[Camunda 8](https://camunda.io) delivers scalable, on-demand process automation as-a-service. Camunda 8 is combined with powerful execution engines for BPMN processes and DMN decisions, and paired with tools for collaborative modeling, operations, and analytics.

Camunda 8 consists of six [components](/components/components-overview.md). Together, these components form the complete Camunda 8 SaaS experience to manage, model, execute, and analyze business processes:

<DocCardList items={[{type:"link", href:"/docs/next/components/console/introduction-to-console/", label: "Console", docId:"components/console/introduction-to-console"},
{
type:"link", href:"/docs/next/components/modeler/about-modeler/", label: "Modeler", docId:"components/modeler/about-modeler",
},
{
type:"link", href:"/docs/next/components/zeebe/zeebe-overview/", label: "Zeebe", docId:"components/zeebe/zeebe-overview",
},
{
type:"link", href:"/docs/next/components/tasklist/introduction-to-tasklist/", label: "Tasklist", docId:"components/tasklist/introduction-to-tasklist",
},
{
type:"link", href:"/docs/next/components/operate/operate-introduction/", label: "Operate", docId:"components/operate/operate-introduction",
},
{
type:"link", href:"/optimize/next/components/what-is-optimize/", label: "Optimize", description: "Improve your processes by leveraging process data and analyzing areas for improvement."
}
]}/>

In the architecture diagram below, take a closer look at how these components work together. Don't worry if you're not sure about all the terminology yet, as this is merely a visual overview of how the components work together. Step through the [getting started section](#getting-started) below for step-by-step guidance through Camunda, or find additional details in [What is Camunda 8](components/concepts/what-is-camunda-8.md), and an on-demand demonstration of the product in [Camunda Academy](https://bit.ly/3CvooTX).

![Architecture diagram for Camunda including all the components for SaaS](./img/ComponentsAndArchitecture_SaaS.png)

Additionally, Camunda hosts a section of [Best Practices](/components/best-practices/best-practices-overview.md). A mix of conceptual and practical implementation information, this section hosts our condensed experience using BPMN and DMN on the Camunda tool stack collected by consulting engagement with our customers and feedback from the community.

:::note Looking for deployment guides?

Deployment guides for Camunda 8 components are available in the [Self-Managed section]/self-managed/about-self-managed.md.

:::

:::note Interested in migrating from Camunda 7 to Camunda 8?
Interested in migrating process solutions developed for Camunda 7 to run them on Camunda 8? Visit our guide on [migrating from Camunda 7](/guides/migrating-from-camunda-7/index.md).
:::

## Getting started

In this section of the Camunda 8 documentation, you'll find guides to get started with Camunda 8 before learning more about each individual [component](/components/components-overview.md). Our getting started guides walk you through the following steps:

<DocCardList items={[{type:"link", href:"/docs/next/guides/create-account/", label: "Step 1: Create a Camunda 8 account", docId:"guides/create-account"},
{
type:"link", href:"/docs/next/guides/model-your-first-process/", label: "Step 2: Model your first process", docId:"guides/model-your-first-process",
},
{
type:"link", href:"/docs/next/guides/create-cluster/", label: "Step 3: Create a cluster", docId:"guides/create-cluster",
},
{
type:"link", href:"/docs/next/guides/getting-started-orchestrate-human-tasks/", label: "Step 4: Orchestrate human tasks", docId:"guides/orchestrate-human-tasks",
},
{
type:"link", href:"/docs/next/guides/getting-started-orchestrate-apis/", label: "Step 5: Orchestrate APIs", docId:"guides/orchestrate-apis",
},
{
type:"link", href:"/docs/next/guides/getting-started-orchestrate-microservices/", label: "Step 6: Orchestrate microservices", docId:"guides/orchestrate-microservices",
}
]}/>

## Learn more

After getting started with Camunda 8, dive deeper in our next steps section of the guides by learning about the following:

- [Set up your first development project](./setting-up-development-project.md) - Set up your first project to model, deploy, and start a process instance.
- [Set up client connection credentials](./setup-client-connection-credentials.md) - Create, name, and connect your client.
- [Automate a process using BPMN](./automating-a-process-using-bpmn.md) - Learn more about the mechanics and elements of BPMN, and build your first BPMN diagram.
- [Configuring an out-of-the-box Connector](./configuring-out-of-the-box-connector.md) - Automate complex business processes by inserting them into BPMN diagrams within Web Modeler.
- [Create decision tables with DMN](./create-decision-tables-using-dmn.md) - Learn more about Decision Model and Notation to model a set of rules within a table, and yield a decision to rapidly execute a process using a decision engine like Camunda.
- [Build forms with Modeler](./utilizing-forms.md) - Design and configure forms and connect them to a user task or start event to implement a task form in your application.
- [Improve processes with Optimize](./improve-processes-with-optimize.md) - Leverage data collected during process execution to access reports, share process intelligence, analyze bottlenecks, and examine areas in business processes for improvement.
- [Message correlation](./message-correlation.md) - Target a running workflow with a state update from an external system asynchronously.
