---
id: concepts-overview
title: "Introduction to Camunda 8"
description: "Learn how Camunda 8 components work together to orchestrate and automate business processes, including the platform architecture and storage roles."
---

import ArchDiagramImg from '../assets/c8-architecture-diagram.png';

Use [Camunda 8](https://camunda.io) to orchestrate and automate complex business processes that include people, AI agents, systems, and devices.

## About Camunda 8

You can deploy Camunda 8 in two ways:

- **Camunda 8 SaaS**: A fully managed cloud service for rapid deployment and minimal operational overhead.
- **Camunda 8 Self-Managed**: A self-hosted solution for organizations requiring full control over their infrastructure.

Camunda 8 combines powerful execution engines for BPMN processes and DMN decisions with tools for collaborative modeling, operations, and analytics. Camunda 8 [components](/components/components-overview.md) work together to form the complete Camunda 8 experience, allowing you to design, automate, and improve your business processes.

Camunda 8 separates runtime execution data from analytical and operational data by using distinct storage roles.

<img src={ArchDiagramImg} alt="Camunda 8 architecture diagram" class="img-noborder"/>

:::note Storage architecture

In the diagram above, storage systems appear in two distinct roles:

- **Primary storage** — The authoritative store for runtime execution state used by the Orchestration Cluster to execute, recover, and replicate workflows. This includes partition logs and snapshots and is tightly coupled to process execution. See [primary storage](/reference/glossary.md#primary-storage).
- **Secondary storage** — Systems used for indexing, search, analytics, operational views, and long-term retention. Data is populated from primary storage and optimized for querying rather than execution. See [secondary storage](/reference/glossary.md#secondary-storage).

### Secondary storage implementations

Camunda 8 supports multiple secondary storage backends, depending on the deployment model and configuration:

- **Embedded H2** — A bundled secondary storage option for local development and lightweight setups. See [H2](/reference/glossary.md#h2).
- **External RDBMS** — A user-managed relational database used as secondary storage in Self-Managed deployments. See [RDBMS](/reference/glossary.md#rdbms).
- **Elasticsearch / OpenSearch** — Search-optimized backends commonly used for analytics and operational visibility. See [Elasticsearch/OpenSearch](/reference/glossary.md#elasticsearchopensearch).

For deployment and configuration guidance, see the Self-Managed documentation:

- [About Self-Managed](/self-managed/about-self-managed.md)
- [Helm quick install](/self-managed/deployment/helm/install/quick-install.md)

:::

:::info

- Want to migrate your Camunda 7 process solutions to run on Camunda 8? See our [Camunda 7 migration guide](/guides/migrating-from-camunda-7/index.md).
- Deployment guides for Camunda 8 components are available in the [Self-Managed section](/self-managed/about-self-managed.md).

:::

## Camunda 8 use cases

With Camunda 8, you can model, execute, and operate end-to-end processes that span microservices, APIs, AI agents, human tasks, legacy systems, IoT devices, and more.

Most real-world automation is distributed. A single business outcome (for example, customer onboarding, claims handling, or order fulfillment) often requires many independently deployed services and external systems. That makes it hard to keep the overall process visible, understand where work is waiting, and recover cleanly when something fails.

Camunda provides a process orchestration layer that coordinates these endpoints without forcing you into a tightly-coupled architecture. You define process and decision logic using BPMN and DMN, then run it on a stateful, event-driven workflow engine designed for long-running, high-volume execution. This gives teams a consistent way to trigger work, correlate events, handle retries and compensation, and troubleshoot incidents across the full business process, not just within a single service.

Many processes also require human input, either as a normal step (for example, review or approval) or as a fallback when automation can't proceed. With Camunda, you can model human tasks alongside automated steps, then assign, track, and escalate work so the process keeps moving. For example, if customer onboarding is blocked waiting for a verification task, the process can route to the right person, enforce due dates, and make the delay visible in operations tooling.

Camunda also supports agentic orchestration. You can treat AI agents as process endpoints, just like a microservice or API call, and orchestrate them together with deterministic steps and human checkpoints. You can also build agents in Camunda by modeling agent behavior such as planning loops, tool use, and reflection, including short-term and long-term memory and retrieval-augmented generation (RAG). This makes agent actions observable and auditable, and it helps you combine dynamic agent decisions with the guardrails and policies your process requires.

Common use cases include orchestrating microservices across complex integrations, modernizing long-running processes that cross legacy systems, coordinating human work with automation, and running AI-assisted steps (for example, document interpretation or decision support) inside governed, end-to-end processes.

## What are the core quality attributes of Camunda 8?

Camunda 8 is designed to operate on a very large scale. To achieve this, it provides:

- **Horizontal scalability** and no dependence on an external database; [Zeebe](/components/zeebe/zeebe-overview.md) (the workflow engine inside Camunda 8) writes data directly to the file system on the same servers where it is deployed. Zeebe enables distribution processing across a cluster of machines to deliver high throughput.
- **High availability and fault tolerance** via a pre-configured replication mechanism, ensuring Camunda 8 can recover from machine or software failure with no data loss and minimal downtime. This ensures the system as a whole remains available without requiring manual action.
- **Audit trail** as all process-relevant events are written to an append-only log, providing an audit trail and a history of the state of a process.
- **Reactive publish-subscribe interaction model** which enables microservices that connect to Camunda 8 to maintain a high degree of control and autonomy, including control over processing rates. These properties make Camunda 8 resilient, scalable, and reactive.
- **Visual processes modeled in ISO-standard BPMN 2.0** so technical and business stakeholders can collaborate on process design in a widely-used modeling language.
- **Language-agnostic client model** makes it possible to build a client in nearly any programming language an organization uses to automate work.
- **Operational ease of use** because, as a SaaS provider, we take care of all operational details.

## What are the Camunda 8 components?

### Modeler

Design fully executable process and decision models that reduce misalignment and handoff friction while giving engineers the freedom they need to build the right solution. Camunda Modeler gives business users an intuitive way to model processes and decisions using the BPMN and DMN standards so their intent is clear, structured, and directly usable by developers. Developers can take the model as-is and build scalable, flexible solutions without worrying about losing alignment with business intent. Available via [web and desktop app](/components/modeler/about-modeler.md).

#### Connectors

Connectors communicate with any system or technology, reducing the time it takes to automate and orchestrate business processes. Use connectors to orchestrate across APIs, microservices, RPA bots, AI/ML tools, enterprise applications, legacy systems, and more. Browse connectors in [Camunda Marketplace](https://marketplace.camunda.com/).

#### AI agents

Build [enterprise-grade AI agents](/components/agentic-orchestration/ai-agents.md) with guardrails so they can solve complex problems with autonomy. Camunda implements agentic BPMN that enables teams to model deterministic process logic and dynamic agentic behavior, such as reasoning loops, memory, prompts, RAG, and human‑in‑the‑loop boundaries, in one unified, executable model.

#### Forms

Some automated processes require human contribution and interaction. [Create and implement custom forms](/components/modeler/forms/utilizing-forms.md) that give work instructions, collect information, and help people make decisions about the tasks they need to complete.

### Tasklist

[Tasklist](/components/tasklist/introduction-to-tasklist.md) offers a lightweight, user-friendly interface for human work, tightly integrated with custom forms. It provides an out-of-the-box user interface for tasks so teams can rapidly iterate on process development without having to build a custom front-end application.

### Workflow and decision engine

[Zeebe](/components/zeebe/zeebe-overview.md) is a distributed workflow and decision engine that replaces a traditional relational database with an event streaming, message-based architecture. This approach eliminates database bottlenecks, ensures horizontal scalability, and provides built-in resilience.

### Operate

[Operate](/components/operate/operate-introduction.md) enables teams to monitor running processes, troubleshoot and resolve incidents, and modify and migrate process instances. Trace process flows in real time, investigate failures, modify variables, and resume execution where needed, all within the context of the end-to-end business process.

### Optimize

[Optimize](/components/optimize/what-is-optimize.md) leverages process execution data to continuously [provide actionable insights](/components/optimize/improve-processes-with-optimize.md). Optimize specializes in BPMN-based analysis and can show users exactly what their process model needs for successful execution.

### Console

With [Console](/components/console/introduction-to-console.md), teams can create, configure, manage, and monitor clusters for all environments, from development to production. Console offers control over organizational settings such as user management, roles, as well as insights into usage metrics.

## How does Camunda 8 compare to other solutions?

### Composability

Camunda's Integrated yet flexible architecture facilitates best-of-breed technology and reuse. Combine Camunda task automation with other tools and custom code for maximum flexibility. Choose SaaS or Self-Managed and use your preferred cloud, Kubernetes, and identity provider.

### Open architecture

Integrate with a variety of applications, systems, and services to scale your architecture. Camunda works with your preferred source control, CI/CD pipelines, and programming languages; while well-documented APIs and SDKs, plus polyglot clients, enable easy integration and customization.

### IT and business collaboration

IT and business stakeholders build and test processes in a shared modeling environment, while reusable processes, decision tables, agents, forms, and connectors make onboarding new teams easy.

### Scalability

Event streaming avoids database bottlenecks and can scale process throughput infinitely. Camunda's distributed architecture ensures continuity in the case of hardware or network failure and supports replication across global data centers for high availability.

### Intelligence

Prepare for the autonomous enterprise by blending deterministic and non-deterministic process execution. Camunda enables teams to integrate AI/ML into business processes where it makes sense without sacrificing reliability or regulatory compliance.

## Next steps

- To request information about Camunda 8 performance and benchmarking, refer to our [Contact](/reference/contact.md) page.
- [Introduction to Camunda 8](/guides/introduction-to-camunda-8.md)
- [Create a Camunda 8 account](/components/console/manage-plan/create-account.md)
- [Migrate from Camunda 7 to Camunda 8](/guides/migrating-from-camunda-7/index.md)
- [Automate a process using BPMN](/components/modeler/bpmn/automating-a-process-using-bpmn.md)
- [Build your first AI agent](/guides/getting-started-agentic-orchestration.md)
