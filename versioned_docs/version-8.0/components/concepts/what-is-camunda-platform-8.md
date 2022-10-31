---
id: what-is-camunda-platform-8
title: "What is Camunda Platform 8?"
description: "Camunda Platform 8 orchestrates complex business processes that span people, systems, and devices."
---

[Camunda Platform 8](https://camunda.io) orchestrates complex business processes that span people, systems, and devices. With Camunda, business users collaborate with developers to model and [automate end-to-end processes using BPMN-powered flowcharts](../../guides/automating-a-process-using-bpmn.md), alongside DMN decision tables that promote speed, scale, and decision logic.

## What use cases does Camunda Platform 8 have?

### Orchestrate, observe, and analyze microservices & human tasks

An end-to-end, automated business process typically requires multiple microservices to achieve an outcome. Software developers and architects often struggle to effectively communicate across multiple microservices, monitor their performance, and identify and resolve problems when they occur. Camunda enables organizations to overcome these issues without compromising autonomy and the coupling of microservices. Camunda offers speed, scale, and security when paired with [microservices](../../guides/getting-started-orchestrate-microservices.md), without the overhead of building and maintaining a daunting infrastructure.

In addition to microservices, many organizations have mission-critical processes that require people to perform tasks manually. An end-to-end business process often requires the combination of manual work with automated steps in a unified workflow.

It’s important that workflows are properly orchestrated to achieve a desired outcome. For example, if a customer onboarding process is delayed because an employee doesn’t know they need to complete a task, the customer will have a poor experience. Camunda provides a lightweight, developer-friendly, easy-to-integrate solution with the [human task orchestration](../../guides/getting-started-orchestrate-human-tasks.md) feature of Camunda Platform 8 to help individuals and groups fix slow, inefficient, or broken human workflows.

For a closer look at other use cases, see the [solutions](https://camunda.com/solutions/) page which outlines the following:

- Modernize Legacy IT Systems
- Orchestrate, Monitor and Analyze RPA Bots
- Replace Homegrown Workflow Automation Software
- Modernize Legacy Business Process Management Systems (BPMS)
- Build a Centralized Process Automation Platform

## What are the core quality attributes of Camunda Platform 8?

Camunda Platform 8 is designed to operate on a very large scale. To achieve this, it provides:

- **Horizontal scalability** and no dependence on an external database; [Zeebe](../zeebe/zeebe-overview.md) (the workflow engine inside Camunda Platform 8) writes data directly to the filesystem on the same servers where it is deployed. Zeebe makes it simple to distribute processing across a cluster of machines to deliver high throughput.
- **High availability and fault tolerance** via a pre-configured replication mechanism, ensuring Camunda Platform 8 can recover from machine or software failure with no data loss and minimal downtime. This ensures the system as a whole remains available without requiring manual action.
- **Audit trail** as all process-relevant events are written to an append-only log, providing an audit trail and a history of the state of a process.
- **Reactive publish-subscribe interaction model** which enables microservices that connect to Camunda Platform 8 to maintain a high degree of control and autonomy, including control over processing rates. These properties make Camunda Platform 8 resilient, scalable, and reactive.
- **Visual processes modeled in ISO-standard BPMN 2.0** so technical and non-technical stakeholders can collaborate on process design in a widely-used modeling language.
- **Language-agnostic client model** makes it possible to build a client in nearly any programming language an organization uses to build microservices.
- **Operational ease-of-use** as a SaaS provider we take care of all operational details.

## What are the Camunda Platform 8 components?

### Modeler

Model and deploy business process diagrams with BPMN and DMN. By using industry-standard BPMN flowcharts to model and automate end-to-end processes, both developers and business stakeholders can collaborate and work on process diagrams and decision tables simultaneously, and use collaborative features such as comments to discuss. Available via [web and desktop app](../modeler/about-modeler.md).

#### Connectors

Connectors help you communicate with systems and technology, reducing the time required to automate and orchestrate business processes that span multiple systems. Connectors are inserted into BPMN diagrams directly from within the Camunda Modeler interface. Once added to your diagram, they are configured via an intuitive properties panel.

#### Forms

[Create and implement custom forms](../../guides/utilizing-forms.md) that power workflows requiring human interaction.

### Workflow engine & decision engine

Powered by Zeebe, Camunda’s cloud-native workflow engine provides organizations with speed, scale, and security without the overhead of building and maintaining a complex infrastructure. Zeebe can scale throughput linearly by adding cluster nodes, allowing the processing of an unlimited amount of transactions at consistently low latencies. Zeebe also comes with a new fail-over architecture that also supports geo-replication across data centers to provide enterprise grade availability.

### Tasklist

With [Tasklist](../tasklist/introduction-to-tasklist.md), process owners can achieve end-to-end process automation by [orchestrating human tasks](../../guides/getting-started-orchestrate-human-tasks.md). When a user needs to work on a task, they’ll see it appear in Tasklist.

### Operate

[Operate](../operate/operate-introduction.md) provides transparency and real-time visibility to monitor, analyze, and resolve problems with processes running in Camunda Platform 8.

### Optimize

[Optimize]($optimize$/components/what-is-optimize) leverages process execution data to continuously [provide actionable insights](../../guides/improve-processes-with-optimize.md). Optimize specializes in BPMN-based analysis and can show users exactly what their process model needs for successful execution.

### Console

With [Console](../console/introduction-to-console.md), teams can create, configure, manage, and monitor clusters for all environments from development to production. Additionally, Console offers control over organizational settings such as user management, roles, and insights into usage metrics.

## How does Camunda Platform 8 compare to other solutions?

### End-to-end orchestration

Design, automate, and improve all components of the business process across different technologies, systems, infrastructures, people, and devices.

### Open architecture

Fit into diverse and complex enterprise environments and technology stacks with Camunda’s open and scalable architecture. It provides a highly scalable platform based on open components that can be easily integrated with most common technical architectures and frameworks.

### Standards-based business & IT collaboration

Use BPMN and DMN standards as a common language for developers and business stakeholders alike throughout the entire process automation lifecycle.

### Developer-friendly approach

The platform and tools are easy to get started with and simple to use in your environment right away, with full public access to all of Camunda's documentation, [open APIs for integration](../../apis-clients/working-with-apis-clients.md), and a [community](https://camunda.com/developers/) comprised of around 100,000 developers.

## Next steps

- To request information about Camunda Platform 8 performance and benchmarking, see our [Contact](/contact/) page.
- [Introduction to Camunda Platform 8](../../guides/introduction-to-camunda-platform-8.md)
- [Create a Camunda Platform 8 account](../../guides/create-account.md)
- [Migrate from Camunda Platform 7 to Camunda Platform 8](../../guides/migrating-from-camunda-platform-7.md)
- [Automate a process using BPMN](../../guides/automating-a-process-using-bpmn.md)
