---
id: what-is-camunda-platform-8
title: "What is Camunda Platform 8?"
---

Camunda Platform 8 helps orchestrate complex business processes that span people, systems, and devices. With Camunda, business users collaborate with developers to model and automate end-to-end processes using BPMN-powered flowcharts, along with DMN decision tables that run with the speed, scale, and resiliency.


## What use cases does it have?

### Orchestrate, Observe and Analyze Microservices & Human Tasks

An end-to-end, automated business process typically requires multiple microservices to achieve an outcome. Software developers and architects often struggle to effectively communicate across multiple microservices, monitor their performance, and identify and resolve problems when they occur. Camunda enables organizations to overcome these issues without compromising the paradigms of autonomy and loose coupling of microservices. Camunda offers speed, scale, security, and resiliency for microservices, without the overhead of building and maintaining infrastructure.

In addition to microservices, many organizations have mission-critical processes that require people to perform tasks manually. A complete, end-to-end business process often requires manual work to be combined with automated steps in a unified workflow.

It’s important that workflows are properly orchestrated; for example, if a customer on-boarding process is delayed because an employee doesn’t know they need to complete a task, the customer will have a poor experience. Camunda provides a lightweight, developer-friendly, easy-to-integrate solution to help them fix slow, inefficient, or broken human workflows.

Other use cases, see the[solutions](https://camunda.com/solutions/) page.

- Modernize Legacy IT Systems
- Orchestrate, Monitor and Analyze RPA Bots
- Replace Homegrown Workflow Automation Software
- Modernize Legacy Business Process Management Systems (BPMS)
- Build a Centralized Process Automation Platform


## What are the its core quality attributes?

Camunda Platform 8 is designed to operate on a very large scale. To achieve this, it provides:

- Horizontal scalability and no dependence on an external database; Zeebe (the workflow engine inside Camunda Platform 8) writes data directly to the filesystem on the same servers where it is deployed. Zeebe makes it simple to distribute processing across a cluster of machines to deliver high throughput.
- High availability and fault tolerance via a pre-configured replication mechanism, ensuring Camunda Platform 8 can recover from machine or software failure with no data loss and minimal downtime. This ensures the system as a whole remains available without requiring manual action.
- Audit trail as all process-relevant events are written to an append-only log, providing an audit trail and a history of the state of a process.
- Reactive publish-subscribe interaction model which enables microservices that connect to Camunda Platform 8 to maintain a high degree of control and autonomy, including control over processing rates. These properties make Camunda Platform 8 resilient, scalable, and reactive.
- Visual processes modeled in ISO-standard BPMN 2.0 and DMN so technical and non-technical stakeholders can collaborate on process design in a widely-used modeling language.
- Language-agnostic client model makes it possible to build a client in nearly any programming language an organization uses to build microservices.
- Operational ease-of-use as a SaaS provider we take care of all operational details.


## What are the Camunda platform 8 components?


### Modeler

Model & deploy business process diagrams with BPMN & DMN. By using industry-standard BPMN flowcharts to model and automate end-to-end processes, teams can collaborate and work on process diagrams and decision tables simultaneously, utilize the variety of collaboration features and use comments to discuss. Available via web and desktop app.

#### Connectors

Connectors help you communicate with any system or technology reducing the time it takes to automate and orchestrate business processes that span systems. Connectors are inserted into BPMN diagrams directly from within the familiar Camunda Modeler interface. Once added to your diagram, they are configured via an intuitive properties panel.

#### Forms

Drag & drop creation of forms that power workflows that require human interaction.

### Workflow Engine & Decision Engine

Powered byZeebe, Camunda’s cloud-native workflow engine, provides organizations with speed, scale, security and resiliency without the overhead of building and maintaining infrastructure. Zeebe can scale throughput linearly by adding cluster nodes, allowing for processing an unlimited amount of transactions at consistent low latencies. To ensure resilience, Zeebe comes with a new fail-over architecture that also supports geo-replication across data centers to provide enterprise grade availability.


### Tasklist

Tasklist enables process owners to automate long running processes that span both human and automated tasks.

With Tasklist, process owners can achieve end-to-end process automation by orchestrating human tasks.


### Operate

Operate provides transparency and real time visibility to monitor, analyze and resolve problems with processes running in Camunda Platform 8.


### Optimize

Optimize leverages process execution data to continuously provide actionable insights. It specializes in BPMN-based analysis and can show users exactly what to do to succeed.


### Console

With Console, teams can create, configure, manage and monitor clusters for all environments from development to production. In addition, Console offers control over organizational settings such as user management, roles and insights into usage metrics.


## How does it compare to other solutions?


### End-to-end Orchestration

Design, automate, and improve all components of the entire business process end-to-end – across different technologies, systems, infrastructures, people, and devices.


### Open Architecture

Fit into diverse and complex enterprise environments and technology stacks with Camunda’s open and scalable architecture. It provides a highly scalable platform based on open components that can be easily integrated with most common technical architectures or frameworks.


### Standards-based Business-IT Collaboration

Use BPMN and DMN standards as a common language, for developers and business stakeholders alike, throughout the entire process automation lifecycle.


### Developer-friendly Approach

The platform and tools are easy to get started and use in your environment right away, with full public access to all our docs, open APIs to integrate with, and a community of 100,000 developers.


## Next steps

To request information about Camunda Platform 8 performance and benchmarking, see our[Contact](https://c8.docs.camunda.io/contact/) page or try [Camunda platform 8.](https://camunda.com/get-started)
