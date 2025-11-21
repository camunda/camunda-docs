---
id: oca-client
title: Get started with the Orchestration Cluster API TypeScript client
sidebar_label: "Get started with the Orchestration Cluster client"
description: Get started with the @camunda8/orchestration-cluster-api package.
---

Get started using the Orchestration Cluster API TypeScript client to build Camunda 8 applications.

## About the Orchestration Cluster API TypeScript client

This is a lightweight package with focused support for the Camunda 8.8+ Orchestration Cluster REST API. It can be used in Node.js or the browser.

### When to use this package

Use the [`@camunda8/orchestration-cluster-api`](https://www.npmjs.com/package/@camunda8/orchestration-cluster-api) package if:

- You are starting a new project; and
- You do not need the gRPC API; and
- You are using Camunda 8.8 or later; or
- You are developing an application for the web browser (and all of the above)

### Differences between the package and the SDK

| Difference         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Configuration keys | <p>One difference between using the package directly and using it via the SDK is in the environment variable configuration.</p><p>The SDK wraps the Orchestration Cluster API client package and allows you to use the legacy configuration keys. When using the package directly, you must use the environment variable configuration keys required by the package.</p><p>The main change is that keys that were prefixed with `ZEEBE_` in the SDK are now prefixed with `CAMUNDA_` in the Orchestration Cluster API client package configuration.</p><p>Refer to the [Configuration Reference](https://github.com/camunda/orchestration-cluster-api-js/blob/main/documentation/CONFIG_REFERENCE.md?plain=1) for a list of the configuration parameters.</p> |
| ESM                | The Orchestration Cluster API client is a dual ESM/CJS package, allowing you to use ESM and tree shake the package as a dependency.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

## Using the Orchestration Cluster API package

1. Install the package to your project:

   ```bash
   npm i @camunda8/orchestration-cluster-api
   ```

1. Import it in your application:

   ```typescript
   import { createCamundaClient } from "@camunda8/orchestration-cluster-api";

   const camunda = createCamundaClient();

   async function main() {
     const response = await camunda.getTopology();
     console.log(JSON.stringify(response, null, 2));
   }

   main();
   ```

   The call to `createCamundaClient` returns a strongly typed client.

## Example project

See a complete working example of a [quick start project on GitHub](https://github.com/camunda-community-hub/c8-sdk-demo).

## API Documentation

Refer to the [README](https://camunda.github.io/orchestration-cluster-api-js/) and the [full API documentation](https://camunda.github.io/orchestration-cluster-api-js/classes/index.CamundaClient.html).
