---
id: working-with-apis-clients
title: "Working with APIs & tools"
sidebar_label: "Working with APIs & tools"
description: "Interact programmatically with Camunda Platform 8 using official Zeebe client libraries and APIs."
---

This section steps through two concepts for integration:

- [Deploy processes](/components/modeler/web-modeler/save-and-deploy.md), [start process instances](/components/modeler/web-modeler/start-instance.md), [activate jobs](/components/concepts/job-workers.md), and more using supplemental and community-maintained **Zeebe client libraries**.
- Learn about Camunda [Components](/components/components-overview.md) and their APIs to communicate with your cluster, search, get and, and change data, create Cloud API clients, and more.

:::note
You're permitted to use these web apps and APIs for free with the Free Edition in non-production environments. To use the software in production, [purchase the Camunda Platform Enterprise Edition](https://camunda.com/products/cloud/camunda-cloud-enterprise-contact/). Read more in our [licensing](../reference/licenses.md) documentation.
:::

## Deploy processes, start process instances, and more using Zeebe client libraries

Clients allow applications to do the following:

- Deploy processes.
- Start and cancel process instances.
- Activate jobs, work on those jobs, and subsequently complete or fail jobs.
- Publish messages.
- Update process instance variables and resolve incidents.

The official clients mentioned below interact with [Zeebe](/components/zeebe/zeebe-overview.md), the workflow engine integrated into Camunda Platform 8. Clients connect to Camunda Platform 8 via [gRPC](https://grpc.io), a high-performance, open source, and universal RPC protocol.

Camunda Platform 8 provides several official clients based on this API. Official clients have been developed and tested by Camunda. They also add convenience functions (e.g. thread handling for job workers) on top of the core API.

### Official Zeebe clients

Official clients have been developed and tested by Camunda. They also add convenience functions (e.g. thread handling for job workers) on top of the core API.

#### Java

- The [Java client](java-client/index.md) provides a job worker that handles polling for available jobs and uses SLF4J for logging useful notes.
- [Zeebe Process Test](https://github.com/camunda-cloud/zeebe-process-test) allows you to unit test your Camunda Platform 8 [BPMN](/components/modeler/bpmn/bpmn.md) processes.
- If you build a Spring or Spring Boot application, you might want to use [Spring Zeebe](community-clients/spring.md) instead.

Other components in Camunda Platform 8, such as [Tasklist API (GraphQL)](tasklist-api/generated.md), provide language-agnostic APIs, but no clients to interact with them. GraphQL enables you to query, claim, and complete user tasks.

#### Go

Use the [Go client](go-client/go-get-started.md) in a Go application to interact with Camunda Platform 8.

#### CLI

Use the [CLI client](cli-client/index.md) zbctl to interact with Camunda Platform 8.

### Community clients

Community clients supplement the official SDKs. These clients have not been tested by Camunda.

- [C#](community-clients/c-sharp.md)
- [JavaScript/NodeJS](community-clients/javascript.md)
- [Micronaut](community-clients/micronaut.md)
- [Python](community-clients/python.md)
- [Ruby](community-clients/ruby.md)
- [Rust](community-clients/rust.md)
- [Spring](community-clients/spring.md)
- [Quarkus](community-clients/quarkus.md)

It is also possible to [build your own client](build-your-own-client.md) You can browse other community extensions and the most up-to-date list of community clients [here](https://github.com/orgs/camunda-community-hub/repositories).

## Learn about Camunda Components and their APIs

![Architecture diagram for Camunda Platform including all the components for SaaS](./img/ComponentsAndArchitecture_SaaS.png)

### Tasklist API (GraphQL)

- Tasklist provides a [GraphQL API](tasklist-api/tasklist-api-overview.md) at endpoint `/graphql`.
- Tasklist provides language-agnostic APIs, but no clients to interact with them. GraphQL enables you to query, claim, and complete user tasks.

### Public API

Camunda Platform 8 provides a public API. Visit [the documentation](public-api.md) for more information on backwards compatibility for version updates.

### Operate API (REST)

- [Operate API](operate-api/index.md) is a REST API and provides searching, getting, and changing Operate data.
- Requests and responses are in JSON notation.

### Console API clients (REST)

- Create and manage clusters, and interact with Camunda Platform 8 programmatically without using the Camunda Platform 8 UI.
- Create [Cloud API clients](console-api-reference.md) in the organization settings under the **Cloud Management API** tab.

### Web Modeler

- Web Modeler API allows you to access and manage BPMN diagrams, DMN diagrams, and forms.
- Web Modeler API is currently offered as a beta release.

### Optimize API (REST)

Get dashboard IDs, enable or disable sharing, export report result data, and more using the [Optimize API]($optimize$/apis-clients/optimize-api/optimize-api-authorization).

### Zeebe API (gRPC)

- [Zeebe](/components/zeebe/zeebe-overview.md) clients use [gRPC](grpc.md) to communicate with the cluster.
- The Zeebe client gRPC API is exposed through a single gateway service. The current version of the protocol buffer file can be found in the Zeebe repository.

:::note
Additionally, visit our documentation on [Operate](../self-managed/operate-deployment/usage-metrics.md) and [Tasklist](../self-managed/tasklist-deployment/usage-metrics.md) usage metric APIs.
:::
