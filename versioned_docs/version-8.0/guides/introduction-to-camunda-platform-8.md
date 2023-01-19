---
id: introduction-to-camunda
title: Introduction to Camunda Platform 8
sidebar_label: Introduction to Camunda Platform 8
slug: /guides/
description: "Step through an introduction to Camunda Platform 8, creating an account, modeling your first process, getting started with microservice orchestration, and more."
---

[Camunda Platform 8](https://camunda.io) delivers scalable, on-demand process automation as-a-service. Camunda Platform 8 is combined with powerful execution engines for BPMN processes and DMN decisions, and paired with tools for collaborative modeling, operations, and analytics.

Camunda Platform 8 consists of six [components](/components/components-overview.md):

- [Console](/components/console/introduction-to-console.md) - Configure and deploy clusters with Console.
- [Web Modeler](/components/modeler/about-modeler.md) - Collaborate, model processes, and deploy or start new instances. Note that Camunda Platform 8 can be used with both [Desktop Modeler](/components/modeler/desktop-modeler/install-the-modeler.md) and [Web Modeler](/components/modeler/web-modeler/new-web-modeler.md).
- [Zeebe](/components/zeebe/zeebe-overview.md) - The cloud-native process engine of Camunda Platform 8.
- [Tasklist](/components/tasklist/introduction-to-tasklist.md) - Complete tasks which require human input.
- [Operate](/components/operate/operate-introduction.md) - Manage, monitor, and troubleshoot your processes.
- [Optimize]($optimize$/components/what-is-optimize) - Improve your processes by identifying constraints in your system.

For more conceptual information about Camunda Platform 8, see [What is Camunda Platform 8](components/concepts/what-is-camunda-platform-8.md). For an on-demand demonstration of the product, visit [Camunda Academy](https://bit.ly/3CvooTX).

:::note
Interested in migrating process solutions developed for Camunda Platform 7 to run them on Camunda Platform 8? Visit our guide on [migrating from Camunda Platform 7](./migrating-from-camunda-platform-7.md)
:::

## Getting started

In this section of the Camunda Platform 8 documentation, you'll find guides to get started with Camunda Platform 8 before learning more about each individual [component](/components/components-overview.md). Our getting started guides walk you through the following steps:

1. [Create a Camunda Platform 8 account](./create-account.md) - Create a Camunda Platform 8 account to create clusters, deploy processes, and create a new instance.
2. [Model your first process](./model-your-first-process.md) - Design and deploy a process, and share the process with your teammates or other stakeholders to begin collaborating.
3. [Create a cluster](./create-cluster.md) - Create your first cluster to execute processes.
4. [Orchestrate human tasks](./getting-started-orchestrate-human-tasks.md) - Assign human tasks to users so they can enter the necessary data to drive the business process forward.
5. [Get started with API endpoints](./getting-started-orchestrate-api-endpoints.md) - Configure Connector tasks with domain-specific parameters.
6. [Orchestrate microservices](./getting-started-orchestrate-microservices.md) - Orchestrate the microservices necessary to achieve your end-to-end automated business process.

## Learn more

After getting started with Camunda Platform 8, dive deeper in our next steps section of the guides by learning about the following:

- [Set up your first development project](./setting-up-development-project.md) - Set up your first project to model, deploy, and start a process instance.
- [Set up client connection credentials](./setup-client-connection-credentials.md) - Create, name, and connect your client.
- [Automate a process using BPMN](./automating-a-process-using-bpmn.md) - Learn more about the mechanics and elements of BPMN, and build your first BPMN diagram.
- [Configuring an out-of-the-box Connector](./configuring-out-of-the-box-connector.md) - Automate complex business processes by inserting them into BPMN diagrams within Web Modeler.
- [Create decision tables with DMN](./create-decision-tables-using-dmn.md) - Learn more about Decision Model and Notation to model a set of rules within a table, and yield a decision to rapidly execute a process using a decision engine like Camunda.
- [Build forms with Modeler](./utilizing-forms.md) - Design and configure forms and connect them to a user task or start event to implement a task form in your application.
- [Improve processes with Optimize](./improve-processes-with-optimize.md) - Leverage data collected during process execution to access reports, share process intelligence, analyze bottlenecks, and examine areas in business processes for improvement.
- [Message correlation](./message-correlation.md) - Target a running workflow with a state update from an external system asynchronously.
