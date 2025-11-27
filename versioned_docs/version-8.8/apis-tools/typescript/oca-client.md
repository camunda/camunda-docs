---
id: oca-client
title: Orchestration Cluster API TypeScript client
sidebar_label: Orchestration Cluster API TypeScript client
description: Use the @camunda8/orchestration-cluster-api package to connect to Camunda 8 and interact with the Orchestration Cluster REST API.
---

Use the Orchestration Cluster API TypeScript client to connect to Camunda 8, deploy process models, and interact with the Orchestration Cluster REST API.

## About this client

This lightweight package provides focused support for the Camunda 8.8 or later Orchestration Cluster REST API.

### When to use this package

Use the [`@camunda8/orchestration-cluster-api`](https://www.npmjs.com/package/@camunda8/orchestration-cluster-api) package if:

- You are starting a new project.
- You do not need the gRPC API.
- You are using Camunda 8.8 or later.
- You are developing an application for the web browser.

### Differences between the package and the SDK

| Difference         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Configuration keys | <p>Environment variable configuration is different when using the package directly or using it via the SDK.</p><ul><li>The SDK wraps the Orchestration Cluster API client package and allows you to use the previous configuration keys.</li><li><p>When using the package directly, you must use the environment variable configuration keys it requires. Keys that were prefixed with `ZEEBE_` in the SDK are now prefixed with `CAMUNDA_` in the Orchestration Cluster API client package configuration.</p></li><li><p>See the [Configuration Reference](https://github.com/camunda/orchestration-cluster-api-js/blob/main/documentation/CONFIG_REFERENCE.md?plain=1) for a list of configuration parameters.</p></li></ul> |
| ESM                | The Orchestration Cluster API client is a dual ESM/CJS package, allowing you to use ESM and tree shake the package as a dependency.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

## Use the Orchestration Cluster API package

The following example retrieves the cluster topology:

1. Install the package in your project:

   ```bash
   npm i @camunda8/orchestration-cluster-api
   ```

2. Import it into your application:

   ```typescript
   import { createCamundaClient } from "@camunda8/orchestration-cluster-api";

   const camunda = createCamundaClient();

   async function main() {
     const response = await camunda.getTopology();
     console.log(JSON.stringify(response, null, 2));
   }

   main();
   ```

   The `createCamundaClient` function returns a strongly typed client.

## Example project

See a [complete example project](https://github.com/camunda-community-hub/c8-sdk-demo) that demonstrates how to use the package.

## API documentation

See the [package README](https://camunda.github.io/orchestration-cluster-api-js/) and the [full API documentation](https://camunda.github.io/orchestration-cluster-api-js/classes/index.CamundaClient.html) for more details.
