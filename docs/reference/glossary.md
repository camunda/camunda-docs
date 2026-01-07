---
id: glossary
title: "Glossary"
description: "Definitions for common Camunda 8 terms and abbreviations used across the docs, including Orchestration Cluster concepts, storage roles, and key deployment terms."
toc_min_heading_level: 2
toc_max_heading_level: 2
---

Explore and understand definitions for key Camunda 8 terms and abbreviations.

<div class="alphabet-rows">
  <div class="alphabet-navigation">
    <div class="letter-link"><a href="#a">A</a></div>
    <div class="letter-link"><a href="#b">B</a></div>
    <div class="letter-link"><a href="#c">C</a></div>
    <div class="letter-link"><a href="#d">D</a></div>
    <div class="letter-link"><a href="#e">E</a></div>
    <div class="letter-link"><a href="#f">F</a></div>
    <div class="letter-link"><a href="#g">G</a></div>
    <div class="letter-link"><a href="#h">H</a></div>
    <div class="letter-link"><a href="#i">I</a></div>
    <div class="letter-link"><a href="#j">J</a></div>
    <div class="letter-link">K</div>
    <div class="letter-link"><a href="#l">L</a></div>
    <div class="letter-link"><a href="#m">M</a></div>
  </div>
  <div class="alphabet-navigation">
    <div class="letter-link">N</div>
    <div class="letter-link"><a href="#o">O</a></div>
    <div class="letter-link"><a href="#p">P</a></div>
    <div class="letter-link">Q</div>
    <div class="letter-link"><a href="#r">R</a></div>
    <div class="letter-link"><a href="#s">S</a></div>
    <div class="letter-link"><a href="#t">T</a></div>
    <div class="letter-link"><a href="#u">U</a></div>
    <div class="letter-link">V</div>
    <div class="letter-link"><a href="#w">W</a></div>
    <div class="letter-link">X</div>
    <div class="letter-link">Y</div>
    <div class="letter-link"><a href="#z">Z</a></div>
  </div>
</div>

## A

### Agentic orchestration

The governed coordination and management of AI agents, humans, and systems in a blended deterministic and dynamic process workflow to achieve defined goals.

For example, orchestrate when and how AI agents act within a process, what tools they can use, and how results are validated, with guardrails for reliability, auditability, and human-in-the-loop. You can build AI agents with Camunda using BPMN.

- [Agentic orchestration](/components/agentic-orchestration/agentic-orchestration-overview.md)

### Artificial intelligence (AI)

A broad field of computer science focused on creating machines that can perform tasks requiring human-like intelligence. In practice, AI involves programming computers to learn, reason, and self-correct when solving problems. For example, AI applications include language understanding, image recognition, decision-making, and automation of complex tasks.

### AI agent

An autonomous system, typically powered by an [LLM](#large-language-model-llm), that perceives its environment, makes decisions, and acts to achieve goals. AI agents can perform tasks, interact with other agents or systems, and operate with varying degrees of independence.
For example, build an invoice-processing AI agent in Camunda with BPMN, using an ad-hoc subprocess and an AI Agent connector to provide LLM reasoning, tool calling, and short-term memory in a governed feedback loop.

- [AI agents](/components/agentic-orchestration/ai-agents.md)
- [Build your first AI Agent](/guides/getting-started-agentic-orchestration.md)

## B

### Broker

See [Zeebe Broker](#zeebe-broker).

### BPMN model

See [Process](#process).

### BTP

BTP stands for [SAP](#sap) Business Technology Platform, which is a cloud-based platform that provides tools and services for data management, analytics, application development, and integration within the SAP ecosystem.

Camunda can integrate with SAP BTP to orchestrate business processes across SAP and non-SAP systems. By doing so, it enables automation and visibility of workflows that span multiple services and applications hosted on BTP, enhancing agility and process control in enterprise environments.

- [BTP plugin](/components/camunda-integrations/sap/btp-plugin.md)

## C

### Client

See [Zeebe Client](#zeebe-client).

### Cluster

See [Zeebe cluster](#zeebe-cluster).

### Cluster variable

A cluster [variable](../../components/concepts/variables/) is a centrally managed configuration value available across a Camunda cluster. It can be defined globally or at the tenant level and is used to provide environment-specific settings, such as API endpoints, feature flags, and shared configuration.

### Camunda 8

Camunda 8 is a universal process orchestrator that allows you to orchestrate and automate complex business processes that span people, systems, and devices. Camunda 8 consists of the following key components:

| Component                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :--------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Orchestration Cluster](#orchestration-cluster)      | Powers the automation and orchestration of [processes](#process).                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| [Connectors](#connector)                             | Out-of-the-box integration with external systems.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| [Optimize](/components/optimize/what-is-optimize.md) | Business intelligence tooling, allowing you to analyze bottlenecks and examine improvements in [processes](#process) automated with Camunda.                                                                                                                                                                                                                                                                                                                                                                                          |
| Console                                              | Manage your [Orchestration Cluster](#orchestration-cluster) deployments, as follows:<p><ul><li><p>[Console SaaS](/components/console/introduction-to-console.md): Configure, deploy, and manage your [Orchestration cluster](#orchestration-cluster), as well as your [connectors](#connector) and Optimize deployments.</p></li><li><p>[Console Self-Managed](/self-managed/components/console/overview.md): Monitor your [orchestration cluster](#orchestration-cluster) and [connector](#connector) deployments.</p></li></ul></p> |
| Modelers                                             | Allows business users and developers to design and implement [processes](#process), decisions, and [user task](#user-task) forms:<p><ul><li><p>Use [Desktop Modeler](/components/modeler/desktop-modeler/index.md) locally on Mac, Windows, and Linux.</p></li><li><p>Use the browser-based [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md) for process application management.</p></li></ul></p>                                                                                                                |
| [Management Identity](#management-identity)          | Authentication and authorization for the components outside the [Orchestration Cluster](#orchestration-cluster) (Optimize, Console, and Web Modeler).                                                                                                                                                                                                                                                                                                                                                                                 |

### Command

A command represents an action to be taken or executed. Example commands include: deploy a process, execute a process, etc.

- [Internal processing](/components/zeebe/technical-concepts/internal-processing.md#events-and-commands)

### Connector

[Connectors](/components/connectors/introduction.md) are reusable building blocks you can use to easily connect [processes](#process) to external systems, applications, and data.

Connector types:

- [Outbound](#outbound-connector)
- [Inbound](#inbound-connector)
- [Protocol](#protocol-connector)

### Context window

The amount of text (in [tokens](#token-ai)) a model can consider at once when generating a response. A larger context window allows the model to handle longer inputs.

### Correlation

Correlation refers to the act of matching a [message](#message) with an inflight [process instance](#process-instance).

- [Message correlation](/components/concepts/messages.md)

### Correlation key

A correlation is an attribute within a [message](#message) that is used to match the message against a certain [variable](#process-variable) within an inflight message. If the value of the correlation key matches the value of the variable within the [process instance](#process-instance), the message is matched.

- [Message correlation](/components/concepts/messages.md)

### CSAP CLI

CSAP CLI stands for Camunda SAP Integration Command-Line Interface. It's a standalone tool (`csap`) that simplifies configuring and building Camunda’s SAP integration modules—like the RFC connector, OData connector, and BTP plugin—for deployment.

Camunda uses `csap` to automate setup steps: it interactively or via scripted flags configures connectors and plugins, resolves dependencies, and produces deployment-ready artifacts. This makes deploying SAP integrations (including BTP plugins) straightforward and repeatable in environments like Camunda SaaS.

- [CSAP CLI](/components/camunda-integrations/sap/csap-cli.md)

## D

### Deployment

A process cannot execute unless it is known by the [broker](#zeebe-broker). Deployment is the process of pushing or deploying processes to the [broker](#zeebe-broker).

- [Zeebe Deployment](/apis-tools/zeebe-api/gateway-service.md#deployresource-rpc)

## E

### Elasticsearch/OpenSearch

Elasticsearch and OpenSearch are search and analytics engines commonly used as secondary storage backends for indexing and querying exported runtime data. They are populated with process orchestration data and consumed by components such as Operate and Optimize.

- [Elasticsearch and OpenSearch](/self-managed/components/orchestration-cluster/core-settings/concepts/elasticsearch-and-opensearch.md)

See also: [Secondary storage](#secondary-storage)

### Element

A BPMN element is part of a [process](#process), defining one part of its BPMN model. Elements are the building blocks of a process and comprise [flow nodes](#flow-node), sequence flows, participants, data objects, and more.

- [BPMN elements](/components/modeler/bpmn/bpmn-primer.md#bpmn-elements)

### Element template

Use an element template to extend [Modeler](/components/modeler/about-modeler.md) with domain-specific diagram [elements](#element). The user edits such elements through a UI defined by the element template, and in the process configures standard technical bindings understood by the engine in simple and predictable ways. Element templates are used by [connectors](#connector) to create the connector-specific [element](#element) configuration.

- [Element templates](/components/modeler/element-templates/about-templates.md)

### Embedding (vector embedding)

A vector representation of data, including words, sentences, images, in a numerical space, where similar items are positioned near each other. Embeddings allow AI systems to compare meaning and perform tasks like semantic search.

- [Vector database connector](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md)

### Event

An event represents a state change associated with an aspect of an executing [process instance](#process-instance). Events capture [variable](#process-variable) changes, state transition in process elements, and so on. An event is represented by a timestamp, the variable name, and variable value. Events are stored in an append-only log.

- [Internal processing](/components/zeebe/technical-concepts/internal-processing.md#events-and-commands)

### Execution listener

An execution listener is a mechanism that allows users to execute custom logic at specific points during [workflow](#workflow) execution. Execution listeners can be attached to [BPMN elements](#element) to react to lifecycle events, such as when an element starts or ends. This feature facilitates pre-processing and post-processing tasks without cluttering the BPMN model, functioning similarly to [job workers](#job-worker) by leveraging the same infrastructure.

- [Execution listeners](/components/concepts/execution-listeners.md)

### Exporter

See [Zeebe Exporter](#zeebe-exporter).

## F

### Fine-tuning

The process of adapting a pre-trained AI model to a specific task or dataset, allowing it to specialize while leveraging prior knowledge.

### Flow node

Flow nodes refer to a specific subset of BPMN [elements](#element). They comprise events, activities, and gateways. Other elements, such as sequence flows, participants, and data objects, are not considered flow nodes.

### Follower

In a clustered environment, a [broker](#zeebe-broker) which is not a [leader](#leader) is a follower of a given partition. A follower can become the new leader when the old leader is no longer reachable.

- [Clustering](/components/zeebe/technical-concepts/clustering.md#raft-consensus-and-replication-protocol)

## G

### Gateway

See [Zeebe Gateway](#zeebe-gateway).

### Generative AI

Any AI system that can produce new content, such as text, images, or audio, in response to prompts. Generative AI doesn’t just analyze existing data; it creates original output that is often contextually relevant to the input.

## H

### Hallucination

When an AI confidently produces incorrect or fabricated information that seems plausible. It reflects the model’s tendency to produce patterns that appear coherent but lack factual accuracy.

### H2

H2 is a lightweight relational database engine used as a secondary storage backend for local development and evaluation in Camunda.

H2 can run in two modes:

- **In-memory**: Data is stored only in memory and lost when the application stops. Useful for temporary testing.
- **File-based (embedded)**: Database files are persisted to disk on the same host as the component using them. Suitable for local development where data persistence across restarts is needed.

H2 is not intended for production usage.

- [Secondary storage](/self-managed/concepts/secondary-storage/index.md)

See also: [Secondary storage](#secondary-storage)

### Human task

Camunda 8 allows you to orchestrate processes with human tasks, which may be [user tasks](#user-task) or [manual tasks](#manual-task).

- [Human task orchestration](/guides/getting-started-orchestrate-human-tasks.md)

### Hybrid mode

Hybrid mode, or a hybrid Self-Managed distribution, allows you to run a separate instance of the [connectors](#connector) runtime in a Self-Managed or local fashion. This instance can be attached to either a SaaS cluster, or another Self-Managed cluster with its own connector runtime.

For example, this is useful when working with services that must be isolated within a private network and cannot be exposed to the public internet, or if infrastructure amendments need to be applied to the connector runtime, such as SSL certificates or mounted volumes.

- [Use connectors in hybrid mode](/components/connectors/use-connectors-in-hybrid-mode.md)

## I

### Identity

Use Identity in the [Orchestration Cluster](#orchestration-cluster) to administer the integrated authentication and authorization.

### Inbound connector

Inbound [Connectors](#connector) in Camunda 8 enable workflows to receive data or messages from external systems or services, making it possible to integrate workflows into a wider business process or system architecture.

Inbound connectors include three subtypes - [webhooks](#webhook), [subscriptions](#subscription), and polling.

Unlike [outbound connectors](#outbound-connector), inbound connectors are **stateful**. The Java code of the inbound connector has a lifecycle suitable for long-running operations, such as listening for messages on a queue or waiting for a webhook to be called.
Each element referencing an inbound connector will lead to the creation of one inbound connector instance. A process definition with one webhook start event and two additional webhooks as intermediate catch events would therefore lead to the creation of three inbound connector instances.

### Incident

An incident represents an error condition which prevents [Zeebe](#zeebe) from advancing an executing [process instance](#process-instance). Zeebe will create an incident if there was an uncaught exception thrown in your code and the number of retries of the given step is exceeded.

- [Incident](/components/concepts/incidents.md)

### Ingress

An Ingress is a Kubernetes object that manages external access to the services within a Kubernetes cluster. An **Ingress controller** is required to route traffic to your services according to the rules defined on the Ingress.

- [Ingress setup](/self-managed/deployment/helm/configure/ingress/ingress-setup.md)

## J

### Job

A job represents a distinct unit of work within a [business process](#process). Service tasks represent such
jobs in your process and are identified by a unique id. A job has a type to allow specific job
workers to find jobs that they can work on.

- [Job workers](/components/concepts/job-workers.md)

### Job activation timeout

This is the amount of time the broker will wait for a complete or fail response from the job worker. This comes after a job has been submitted to the job worker for processing and before it marks the job as available again for other job workers.

- [Job workers](/components/concepts/job-workers.md#requesting-jobs)

### Job worker

A [Zeebe Client](#zeebe-client) that polls for and executes available [jobs](#job). An uncompleted job prevents [Zeebe](#zeebe) from advancing process execution to the next step.

- [Job workers](/components/concepts/job-workers.md)

## L

### Large language model (LLM)

A large language model (LLM) is a type of AI program specifically designed to understand and generate human-like text. These models are trained on massive amounts of text data, enabling them to learn the structure of language and perform a variety of tasks, such as conversation, summarization, and code generation.

### Leader

In a clustered environment, one [broker](#zeebe-broker) (the [leader](#leader)) is responsible for process execution and housekeeping of data within a [partition](#partition). Housekeeping includes taking [snapshots](#snapshot), [replication](#replication), and running [exports](#zeebe-exporter).

- [Clustering](/components/zeebe/technical-concepts/clustering.md#raft-consensus-and-replication-protocol)

### Log

The log is comprised of an ordered sequence of records written to persistent storage. The log is appended-only and is stored on disk within the broker.

- [Partitions](/components/zeebe/technical-concepts/partitions.md#partition-data-layout)

## M

### Management Identity

The Management Identity component provides authentication and authorization for the [Camunda 8](#camunda-8) components outside the [Orchestration Cluster](#orchestration-cluster): Console, Web Modeler, and Optimize.

### Manual task

A manual task defines a task that requires human interaction but no external tooling or UI interface. For example, a user reviewing a document or completing a physical task.

Manual tasks are part of [human task orchestration](/guides/getting-started-orchestrate-human-tasks.md), but differ from [user tasks](#user-task) which define an actionable task assisted by a workflow engine or software application.

- [Manual tasks](/components/modeler/bpmn/manual-tasks/manual-tasks.md)

### Message

A message contains information to be delivered to interested parties during execution of a [process instance](#process-instance). Messages can be published via Kafka or [Zeebe](#zeebe)’s internal messaging system. Messages are associated with timestamp and other constraints such as time-to-live (TTL).

- [Messages](/components/concepts/messages.md)

## O

### Orchestration Cluster

The Orchestration Cluster is the core component of [Camunda 8](#camunda-8), powering the automation and orchestration of [processes](#process). An Orchestration Cluster includes:

- [Zeebe](#zeebe) as the [workflow engine](#workflow-engine)
- Operate for monitoring and troubleshooting [process instances](#process-instance) running in [Zeebe](#zeebe)
- Tasklist for interacting with [user tasks](#user-task) (assigning, completing, and so on)
- [Identity](#identity) for managing the integrated authentication and authorization
- APIs for interacting with the Orchestration Cluster programmatically

### Outbound connector

Outbound [Connectors](#connector) in Camunda 8 allow workflows to trigger with external systems or services, making it possible to integrate workflows with other parts of a business process or system architecture.

## P

### Partition

A partition represents a logical grouping of data in a [Zeebe Broker](#zeebe-broker). This data includes [process variables](#process-variable) stored in RocksDB, [commands](#command), and [events](#event) generated by [Zeebe](#zeebe) stored in the [log](#log). The number of partitions is defined by configuration.

- [Partitions](/components/zeebe/technical-concepts/partitions.md)

### Polling connector

An inbound polling [connector](#connector) that periodically polls an external system or service for new data using HTTP polling.

A [Camunda workflow](#workflow) uses this type of connector to retrieve data from a remote system that does not support real-time notifications or webhooks, but instead requires the client to periodically request updates.

### Primary storage

Primary storage is the authoritative store for workflow execution state managed by the Orchestration Cluster. In Self-Managed deployments, Zeebe brokers persist partition logs and snapshots on local disk. This data is required to execute workflows, recover after failures, and replicate state across brokers.

Primary storage is not a search or analytics backend, and it is not configured as an external database (such as Elasticsearch/OpenSearch, H2, or an external RDBMS).

See also: [Orchestration Cluster](#orchestration-cluster), [Log](#log), [Partition](#partition), [Snapshot](#snapshot), [Secondary storage](#secondary-storage)

### Process

The general business construct — what you want to automate.  
In Camunda, a process is [modeled using BPMN](#process-model), then [deployed as a process definition](#process-definition), and finally [executed as a process instance](#process-instance).

In runtime discussions, [_executing a process_](/components/concepts/processes.md) may be used as shorthand for deploying a process definition and starting an instance.

### Process definition

A [process model](#process-model) that has been deployed to the engine and versioned.  
Identified by:

- **processDefinitionKey**: Unique identifier generated by the engine
- **process ID**: Identifier assigned in the process model
- **version**: Version number assigned by the engine

The engine uses process definitions to start [process instances](#process-instance).

### Process instance

A [process instance](/components/concepts/process-instance-creation.md) is an execution of a [process definition](#process-definition), uniquely identified by its **processInstanceKey**.  
Each instance represents one run of the process and carries metadata from its originating process definition (process ID, version, and processDefinitionKey).

A process instance can be active (currently running), completed, or terminated.

In runtime discussions, [_executing a process_](/components/concepts/processes.md) may be used as shorthand for deploying a process definition and starting an instance.

### Process instance tag

An optional, immutable, lightweight label attached when a process instance is created. Tags provide fast, structured metadata for routing, correlation, prioritization, and analytics segmentation without inspecting large variable payloads.

- Tags on process instance creation: [Process instance creation – Tags](/components/concepts/process-instance-creation.md#tags)
- Tags on jobs: [Job workers](/components/concepts/job-workers.md#tags)

### Process model

The BPMN representation of a [process](/components/concepts/processes.md), created in a BPMN file (for example, in Modeler).

Identified by its **process ID** (`bpmn:process id` attribute).

A single BPMN file can contain multiple process models.

### Process variable

A process variable represents the execution state (i.e data) of a process instance. These variables capture business process parameters which are the input and output of various stages of the process instance and which also influence process flow execution.

- [Variables](/components/concepts/variables.md)
- [Data flow](/components/modeler/bpmn/data-flow.md)

### Prompt

A prompt is the input provided to a [generative AI model](#generative-ai). Prompt engineering refers to the practice of crafting effective instructions to achieve desired results from the AI.

### Protocol connector

Protocol connectors are a type of [Connector](#connector) in Camunda that can serve as either [inbound](#inbound-connector) or [outbound](#outbound-connector) connectors, supporting a variety of technical protocols. These connectors are highly generic, designed to provide a flexible and customizable means of integrating with external systems and services.

Protocol connectors can be customized to meet the needs of specific use cases using [element templates](#element-template), with no additional coding or deployment required. Examples of protocol connectors include HTTP REST, SOAP, GraphQL, as well as message queue connectors.

### Public API

The public API represents the official set of interfaces in Camunda 8 that are covered by [Semantic Versioning (SemVer)](https://semver.org/) stability guarantees. APIs included in the public API contract will not introduce breaking changes in minor or patch releases, ensuring backwards compatibility for your integrations. The public API is a subset of all available Camunda 8 APIs - many APIs are available for external use but are not included in the formal stability commitment.

- [Public API](/reference/public-api.md)

## R

### RDBMS

RDBMS (Relational Database Management System) refers to a user-managed relational database used as a secondary storage backend in Camunda 8 Self-Managed deployments, depending on the component and configuration. An external RDBMS is used for query and retention use cases, not for core workflow execution state.

- [Helm database configuration (RDBMS)](/self-managed/deployment/helm/configure/database/rdbms.md)

See also: [Secondary storage](#secondary-storage)

### Record

A record represents a command or an event. For example, a command to create a new [process instance](#process-instance), or a state transition of an executing [process instance](#process-instance) representing an [event](#event) at a given point in time would result to generation of a record. During the execution lifecycle of a process instance, numerous records are generated to capture various commands and events generated. Records are stored in the log.

- [Internal processing](/components/zeebe/technical-concepts/internal-processing.md#events-and-commands)

### Reference architecture

Reference architectures provide comprehensive blueprints for designing and implementing scalable, robust, and adaptable Camunda 8 self-managed installations. Reference architectures serve as starting points that should be adapted to fit the specific needs and constraints of your organization and infrastructure.

- [Reference architectures](/self-managed/reference-architecture/reference-architecture.md)

### Replication

Replication is the act of copying data in a [partition](#partition) from a [leader](#leader) to its [followers](#follower) within a clustered [Zeebe](#zeebe) deployment. After replication, the leader and followers of a partition will have the exact same data. Replication allows the system to be resilient to [brokers](#zeebe-broker) going down.

- [Clustering](/components/zeebe/technical-concepts/clustering.md#raft-consensus-and-replication-protocol)

### Replication factor

This is the number of times data in a [partition](#partition) is copied. This depends on the number of [brokers](#zeebe-broker) in a [cluster](#zeebe-cluster). A cluster with one [leader](#leader) and two [followers](#follower) has a replication factor of three, as data in each partition needs to have three copies.

We recommend running an odd replication factor.

- [Partitions](/components/zeebe/technical-concepts/partitions.md#replication)

### Request timeout

How long a [client](#zeebe-client) waits for a response from the [broker](#zeebe-broker) after the client submits a request. If a response is not received within the client request timeout, the client considers the broker unreachable.

- [Orchestration Cluster REST API](/apis-tools/zeebe-api-rest/zeebe-api-rest-overview.md)
- [Zeebe API (gRPC)](/apis-tools/zeebe-api/grpc.md)

### RFC

RFC stands for Remote Function Call, a protocol used by SAP to enable communication and data exchange between SAP systems or between SAP and external systems.

Camunda can use RFC to call SAP functions directly as part of a business process. This allows Camunda to trigger SAP transactions, retrieve data, or update records within an SAP system, integrating SAP functionality seamlessly into broader automated workflows.

- [RFC](/components/camunda-integrations/sap/csap-cli.md)

### Robotic process automation (RPA)

The use of software robots to automate repetitive, rule-based business tasks. RPA bots emulate human actions in digital systems, enhancing speed and accuracy.

## S

### SAP

SAP stands for Systems, Applications, and Products in Data Processing; it's an enterprise software platform used to manage business operations such as finance, supply chain, and HR. Camunda integrates with SAP to automate and orchestrate workflows that involve SAP systems, allowing for greater flexibility, transparency, and control over complex business processes.

- [SAP](/components/camunda-integrations/overview.md)

### Secondary storage

Secondary storage is used for indexing, search, analytics, and long-term retention. Data in secondary storage is typically exported from [primary storage](#primary-storage) and consumed by tools for observability and analytics.

Examples of secondary storage backends include:

- [Elasticsearch/OpenSearch](#elasticsearchopensearch)
- [RDBMS](#rdbms)

- [Secondary storage concepts](/self-managed/concepts/secondary-storage/index.md)
- [Managing secondary storage](/self-managed/concepts/secondary-storage/managing-secondary-storage.md)

### Segment

The [log](#log) consists of one or more segments. Each segment is a file containing an ordered sequence records. Segments are deleted when the log is compacted.

- [Resource planning](/self-managed/components/orchestration-cluster/zeebe/operations/resource-planning.md#event-log)

### Snapshot

The state of all active [process instances](#process-instance), (these are also known as inflight process instances) are stored as records in an in-memory database called RocksDB. A snapshot represents a copy of all data within the in-memory database at any given point in time. Snapshots are binary images stored on disk and can be used to restore execution state of a [process](#process). The size of a snapshot is affected by the size of the data. Size of the data depends on several factors, including complexity of the [model](#bpmn-model), the size and quantity of variables in each process instance, and the total number of executing [process instances](#process-instance) in a [broker](#zeebe-broker).

- [Resource planning](/self-managed/components/orchestration-cluster/zeebe/operations/resource-planning.md#snapshots)

### Soft pause exporting

Soft pause exporting is a feature that allows you to continue exporting records from [Zeebe](#zeebe), but without deleting those [records](#record) ([log](#log) compaction) from Zeebe. This is particularly useful during hot backups.

- [Exporting API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md)
- [Backup and restore](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md)

### Subscription inbound connector

An [inbound connector](#inbound-connector) that subscribes to a message queue.

This way, a [Camunda workflow](#workflow) can receive messages from an external system or service (like Kafka or RabbitMQ) using message queuing technology. This type of inbound connector is commonly used in distributed systems where different components of the system need to communicate with each other asynchronously.

## T

### Temperature

A parameter that regulates the randomness or creativity of AI-generated text. Lower values result in more focused and predictable responses, while higher values lead to more creative and varied outputs.

### Token (AI)

The smallest unit of text such as a word, subword, or character, that a language model processes. Models read and generate text as a sequence of tokens. Often, pricing for AI models is based on the number of input/output tokens.

### Token (process instance)

In the context of a running process instance in Camunda, a token represents the current point of execution within the BPMN process model. You can think of it as a marker that moves through the process diagram, following the sequence flows as tasks and events are completed.

When a process starts, a token is created at the start event and advances with each completed step. Once the token reaches the end event, it is consumed and the process instance ends. Tokens are not data themselves, but they determine which elements of the process are currently active.

## U

### User task

A user task is used to model work that needs to be done by a human and is assisted by a workflow engine or software application. This differs from [manual tasks](#manual-task), which are not assisted by external tooling.

With 8.7, Camunda offers job worker-based user tasks managed by Camunda, also known as Camunda user tasks (and formerly known as Zeebe user tasks). Note that you may still see references of **Zeebe user tasks** in your XML, but this is the same thing as Camunda user tasks.

Camunda recommends using Camunda user tasks in your process definitions. With 8.7, **job-worker** user tasks are available for querying, but Camunda Modeler automatically applies the **Camunda user task** and shows a warning message for each job worker user task.

- [User tasks](/components/modeler/bpmn/user-tasks/user-tasks.md)
- [Migrate to Camunda user tasks](/apis-tools/migration-manuals/migrate-to-camunda-user-tasks.md)

### User task listener

A user task listener allows users to execute custom logic in response to specific user task lifecycle events, such as assigning or completing a task. User task listeners are attached to BPMN user tasks and facilitate validation, custom task assignment, and other operations during user task execution. They operate similarly to [job workers](#job-worker), leveraging the same infrastructure for processing external logic.

- [User task listeners](/components/concepts/user-task-listeners.md)

## W

### Webhook connector

Webhooks are a subtype of [inbound connector](#inbound-connector).

A webhook is a way for web applications to send real-time notifications or data to other applications or services when certain events occur. When a webhook is set up, the application sends a POST request containing data to a pre-configured URL, which triggers a workflow.

### Worker

See [Job worker](#job-worker).

### Workflow

See [process](#process).

### Workflow engine

A workflow engine is an essential part of any process automation tool. We call it an “engine” because it drives business processes from start to finish, no matter how complex the process and decision logic need to be. [Zeebe](#zeebe) is the workflow engine powering Camunda 8.

### Workflow instance

See [process instance](#process-instance).

### Workflow instance variable

See [process variable](#process-variable).

## Z

### Zeebe

Zeebe is a highly scalable, cloud-native workflow engine used to automate business processes. It acts as the core component of Camunda 8.

Zeebe is part of the [Orchestration Cluster](#orchestration-cluster) in Camunda 8.

The main components of Zeebe are:

- [Clients](#zeebe-client)
- [Gateways](#zeebe-gateway)
- [Brokers](#zeebe-broker)
- [Exporters](#zeebe-exporter)

A Zeebe deployment typically consists of multiple brokers and gateways, forming a [Zeebe cluster](#zeebe-cluster).

### Zeebe Broker

The Zeebe Broker is the distributed [workflow engine](#workflow-engine) that tracks the state of active [process instances](#process-instance). The Zeebe Broker is the main part of the [Zeebe cluster](#zeebe-cluster), which does all the heavy work like processing, replicating, exporting, and everything based on [partitions](#partition). A Zeebe deployment often consists of more than one broker. Brokers can be partitioned for horizontal scalability and replicated for fault tolerance.

- [Zeebe Broker](/components/zeebe/technical-concepts/architecture.md#brokers)

### Zeebe Client

A Zeebe Client interacts with the [Zeebe Broker](#zeebe-broker) on behalf of the business application. Clients retrieve work from the [Zeebe cluster](#zeebe-cluster) via polling or job push.

- [Zeebe Client](/components/zeebe/technical-concepts/architecture.md#clients)

### Zeebe cluster

A Zeebe cluster represents a configuration of one or more [brokers](#zeebe-broker) collaborating to execute [processes](#process). Each [broker](#zeebe-broker) in a cluster acts as a [leader](#leader) or a [follower](#follower).

- [Clustering](/components/zeebe/technical-concepts/clustering.md)

### Zeebe Exporter

The Zeebe Exporter system provides an event stream of state changes within Zeebe. It represents a sink to which Zeebe will submit all [records](#record) within the [log](#log). This gives users of Zeebe an opportunity to persist [records](#record) with the log for future use as this data will not be available after log compaction.

- [Zeebe Exporter](/components/zeebe/technical-concepts/architecture.md#exporters)

### Zeebe Gateway

The Zeebe Gateway is a component of the [Zeebe cluster](#zeebe-cluster); it can be considered the contact point for the Zeebe cluster that allows [Zeebe clients](#zeebe-client) to communicate with [Zeebe brokers](#zeebe-broker) inside a Zeebe cluster.

- [Zeebe Gateway](self-managed/components/orchestration-cluster/zeebe/zeebe-gateway/zeebe-gateway-overview.md)
