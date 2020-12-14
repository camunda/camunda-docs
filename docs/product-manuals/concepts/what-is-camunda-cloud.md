---
id: what-is-camunda-cloud
title: "What is Camunda Cloud?"
---

Camunda Cloud is a workflow engine for microservices orchestration. Camunda Cloud ensures that, once started, flows are always carried out fully, retrying steps in case of failures. Along the way, Camunda Cloud maintains a complete audit log so that the progress of flows can be monitored. Camunda Cloud is fault tolerant and scales seamlessly to handle growing transaction volumes.

Below, we'll provide a brief overview of Camunda Cloud. For more detail, we recommend the ["What is Camunda Cloud?" writeup](https://Camunda Cloud.io/what-is-Camunda Cloud) on the main Camunda Cloud site.

## What problem does Camunda Cloud solve, and how?

A company’s end-to-end workflows almost always span more than one microservice. In an e-commerce company, for example, a “customer order” workflow might involve a payments microservice, an inventory microservice, a shipping microservice, and more:

![order-process](assets/order-process.png)

These cross-microservice workflows are mission critical, yet the workflows themselves are rarely modeled and monitored. Often, the flow of events through different microservices is expressed only implicitly in code.

If that’s the case, how can we ensure visibility of workflows and provide status and error monitoring? How do we guarantee that flows always complete, even if single microservices fail?

Camunda Cloud gives you:

1. **Visibility** into the state of a company’s end-to-end workflows, including the number of in-flight workflows, average workflow duration, current errors within a workflow, and more.
2. **Workflow orchestration** based on the current state of a workflow; Camunda Cloud publishes “commands” as events that can be consumed by one or more microservices, ensuring that workflows progress according to their definition.
3. **Monitoring for timeouts** or other workflow errors with the ability to configure error-handling paths such as stateful retries or escalation to teams that can resolve an issue manually.

Camunda Cloud was designed to operate at very large scale, and to achieve this, it provides:

- **Horizontal scalability** and no dependence on an external database; Camunda Cloud writes data directly to the filesystem on the same servers where it’s deployed. Camunda Cloud makes it simple to distribute processing across a cluster of machines to deliver high throughput.
- **Fault tolerance** via an easy-to-configure replication mechanism, ensuring that Camunda Cloud can recover from machine or software failure with no data loss and minimal downtime. This ensures that the system as a whole remains available without requiring manual action.
- **A message-driven architecture** where all workflow-relevant events are written to an append-only log, providing an audit trail and a history of the state of a workflow.
- **A publish-subscribe interaction model**, which enables microservices that connect to Camunda Cloud to maintain a high degree of control and autonomy, including control over processing rates. These properties make Camunda Cloud resilient, scalable, and reactive.
- **Visual workflows modeled in ISO-standard BPMN 2.0** so that technical and non-technical stakeholders can collaborate on workflow design in a widely-used modeling language.
- **A language-agnostic client model**, making it possible to build a client in just about any programming language that an organization uses to build microservices.
- **Operational ease-of-use** as a self-contained and self-sufficient system. Camunda Cloud does **not** require a cluster coordinator such as ZooKeeper. Because all nodes in a Camunda Cloud cluster are equal, it's relatively easy to scale, and it plays nicely with modern resource managers and container orchestrators such as [Docker](https://www.docker.com/), [Kubernetes](https://kubernetes.io/), and [DC/OS](https://dcos.io/). Zeebe CLI (Command Line Interface) allows you to script and automate management and operations tasks.

You can learn more about these technical concepts [in the "Basics" section of the documentation](../zeebe/basics/index.md).

## Camunda Cloud is simple and lightweight

Most existing workflow engines offer more features than Camunda Cloud. While having access to lots of features is generally a good thing, it can come at a cost of increased complexity and degraded performance.

Camunda Cloud is 100% focused on providing a compact, robust, and scalable solution for orchestration of workflows. Rather than supporting a broad spectrum of features, its goal is to excel within this scope.

In addition, Camunda Cloud works well with other systems. For example, Camunda Cloud provides a simple event stream API that makes it easy to stream all internal data into another system such as [Elastic Search](https://www.elastic.co/) for indexing and querying.
