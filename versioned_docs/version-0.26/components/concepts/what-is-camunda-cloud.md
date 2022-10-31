---
id: what-is-camunda-cloud
title: "What is Camunda Cloud?"
description: "Camunda Cloud is a SaaS offering for microservice orchestration. Camunda Cloud ensures that flows are always carried out fully, retrying steps in case of failure."
---

Camunda Cloud is a software-as-a-service (SaaS) offering for microservice orchestration. Camunda Cloud ensures that, once started, flows are always carried out fully, retrying steps in case of failures. Along the way, Camunda Cloud maintains a complete audit log so that the progress of flows can be traced.

Camunda Cloud is a turn-key solution that will accelerate your project implementation. It is particularly suited for integrating heterogeneous systems and orchestrating dispersed services implemented in different programming languages.

Behind the scenes, resources inside Camunda Cloud are highly available and fault tolerant to give you peace of mind. Finally, Camunda Cloud offers clusters of different sizes, so you can pick the offering that best fits your business needs.

## What problem does it solve?

A company’s end-to-end workflows almost always span more than one microservice. In an e-commerce company, for example, a “customer order” workflow might involve a payments microservice, an inventory microservice, a shipping microservice, and more:

![order-process](assets/order-process.png)

These end-to-end workflows are mission critical, yet the workflows themselves are rarely modeled and monitored. Often, the flow of events through different microservices is opaque.

Camunda Cloud addresses these challenges and provides:

1. **Visibility** into the state of a company’s end-to-end workflows, including the number of in-flight workflows, average workflow duration, current errors within a workflow, and more.
2. **Workflow orchestration** based on the current state of a workflow; Camunda Cloud publishes “jobs” that can be exexcuted by one or more microservices, ensuring that workflows progress according to their definition.
3. **Monitoring for timeouts** or other workflow errors with the ability to configure error-handling steps such as stateful retries or escalation to teams that can resolve an issue manually.

## What are its core quality attributes?

Camunda Cloud was designed to operate at very large scale, and to achieve this, it provides:

- **Horizontal scalability** and no dependence on an external database; Zeebe (the workflow engine inside Camunda Cloud) writes data directly to the filesystem on the same servers where it is deployed. Zeebe makes it simple to distribute processing across a cluster of machines to deliver high throughput.
- **High availability and fault tolerance** via a pre-configured replication mechanism, ensuring that Camunda Cloud can recover from machine or software failure with no data loss and minimal downtime. This ensures that the system as a whole remains available without requiring manual action.
- **Audit trail** - all workflow-relevant events are written to an append-only log, providing an audit trail and a history of the state of a workflow.
- **Reactive publish-subscribe interaction model**, which enables microservices that connect to Camunda Cloud to maintain a high degree of control and autonomy, including control over processing rates. These properties make Camunda Cloud resilient, scalable, and reactive.
- **Visual workflows modeled in ISO-standard BPMN 2.0** so that technical and non-technical stakeholders can collaborate on workflow design in a widely-used modeling language.
- **Language-agnostic client model** makes it possible to build a client in just about any programming language that an organization uses to build microservices.
- **Operational ease-of-use** as a SaaS provider we take care of all operational details.

## How does it compare to other solutions?

Most existing workflow engines offer a vast amount of features. While having access to lots of features is generally a good thing, it can come at a cost of increased complexity and degraded performance.

Camunda Cloud is 100% focused on providing a compact, robust, and scalable solution for orchestration of workflows. Rather than supporting a broad spectrum of features, its goal is to excel within this scope.
