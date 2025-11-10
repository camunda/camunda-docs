---
id: typescript-sdk
title: TypeScript SDK
description: Get started with the Camunda 8 TypeScript SDK.
---

Camunda supports Camunda 8 application development using TypeScript.

You have two options:

- [`@camunda8/sdk`](https://www.npmjs.com/package/@camunda8/sdk) — a package that includes clients for all APIs, and can be used in Node.js.
- [`@camunda8/orchestration-cluster-api`](https://www.npmjs.com/package/@camunda8/orchestration-cluster-api) — a light-weight package with focused support for the Camunda 8.8+ Orchestration Cluster (REST) API, which can be used in Node.js or the browser.

## Which package should you use?

Use the `@camunda8/orchestration-cluster-api` package if:

- You are developing a green-field application; and
- Your server target is 8.8 or later; and
- You do not have a validated requirement to use the gRPC API; or
- You are developing an application that runs in the web browser.

Use the `@camunda8/sdk` package if:

- You (definitely) need the gRPC API to do job streaming; or
- Your server target is 8.7 or earlier; or
- You have an existing application using this package that you want to progressively migrate to use the 8.8 Orchestration Cluster API.

## Next steps

- For guidance on migrating existing applications to the Orchestration Cluster API, see [Migrating an application to the Orchestration Cluster API](./migrating-to-oca.md).
- For guidance on using the `@camunda8/sdk`, see [Getting started with the Camunda 8 TypeScript SDK](./camunda8-sdk.md).
- For guidance on using the `@camunda8/orchestration-cluster-api`, see [Getting started with the Camunda 8 Orchestration Cluster API TypeScript client](./oca-client.md).
