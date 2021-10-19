---
id: overview
title: "Working with APIs & Clients"
sidebar_label: "Overview"
description: "Programmatically work with Camunda Cloud through APIs & clients"
---

Clients allow applications to do the following:

- Deploy processes.
- Start and cancel process instances.
- Activate jobs, work on those jobs, and subsequently complete or fail jobs.
- Publish messages.
- Update process instance variables and resolve incidents.

Clients connect to Camunda Cloud via [gRPC](https://grpc.io), a high-performance, open-source, and universal RPC protocol.

Camunda Cloud provides several offical clients based on this API. Official clients have been developed and tested by Camunda. They also add convenience functions (e.g. thread handling for job workers) on top of the core API.

Community clients supplement the official clients. These clients have not been tested by Camunda.

## Official clients

- [Java](java-client/index.md)
- [Go](go-client/get-started.md)
- [CLI](cli-client/index.md)

## Community clients

- [C#](community-clients/c-sharp.md)
- [JavaScript/NodeJS](community-clients/javascript.md)
- [Python](community-clients/python.md)
- [Ruby](community-clients/ruby.md)
- [Rust](community-clients/rust.md)
- [Spring](community-clients/spring.md)

Finally, it is possible to [build your own client](build-your-own-client.md) if none of the other options are suitable.

## Interacting with other components

The clients mentioned above interact with Zeebe, the workflow engine integrated into Camunda Cloud.

Other components in Camunda Cloud provide language-agnostic APIs, but no clients to interact with them:

- [Console API (REST)](cloud-console-api-reference.md) - enables you to create and manage clusters programmatically.
- [Tasklist API (GraphQL)](/apis-clients/tasklist-api/generated.md) - enables you to query, claim, and complete user tasks.