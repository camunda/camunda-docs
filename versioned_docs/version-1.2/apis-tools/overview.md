---
# This page exists in apis-tools, instead of apis-tools, because the location needs to be consistent across all versions.
id: working-with-apis-tools
title: "Working with APIs & Tools"
sidebar_label: "Overview"
description: "Programmatically work with Camunda Cloud through APIs & clients"
---

This section steps through a variety of offered APIs and clients for integration.

## APIs and interacting with other components

The clients mentioned below interact with Zeebe, the workflow engine integrated into Camunda Cloud.

Other components in Camunda Cloud, such as [Tasklist API (GraphQL)](/apis-tools/tasklist-api/generated.md), provide language-agnostic APIs, but no clients to interact with them. GraphQL enables you to query, claim, and complete user tasks.

### Additional APIs

- [Public API](../apis-tools/public-api.md) - Camunda Cloud's provided public API.
- [Cloud Console API clients (REST)](../apis-tools/cloud-console-api-reference.md) - Enables you to programmatically create and manage clusters, and interact with Camunda Cloud programmatically without using the Camunda Cloud UI.
- [Zeebe API](../apis-tools/grpc.md) - Zeebe clients use gRPC to communicate with the cluster.

## Clients

Clients allow applications to do the following:

- Deploy processes.
- Start and cancel process instances.
- Activate jobs, work on those jobs, and subsequently complete or fail jobs.
- Publish messages.
- Update process instance variables and resolve incidents.

Clients connect to Camunda Cloud via [gRPC](https://grpc.io), a high-performance, open-source, and universal RPC protocol.

Camunda Cloud provides several offical clients based on this API. Official clients have been developed and tested by Camunda. They also add convenience functions (e.g. thread handling for job workers) on top of the core API.

Community clients supplement the official clients. These clients have not been tested by Camunda.

### Official clients

- [Java](../apis-tools/java-client/index.md)
- [Go](../apis-tools/go-client/get-started.md)
- [CLI](../apis-tools/cli-client/index.md)

### Community clients

- [C#](../apis-tools/community-clients/c-sharp.md)
- [JavaScript/NodeJS](../apis-tools/community-clients/javascript.md)
- [Python](../apis-tools/community-clients/python.md)
- [Ruby](../apis-tools/community-clients/ruby.md)
- [Rust](../apis-tools/community-clients/rust.md)
- [Spring](../apis-tools/community-clients/spring.md)

Finally, it is possible to [build your own client](../apis-tools/build-your-own-client.md) if none of the other options are suitable.