---
id: oca-client
title: Getting started with the Camunda 8 Orchestration Cluster API TypeScript client
description: et started with the @camunda8/orchestration-cluster-api package.
---

## When to use the @camunda8/orchestration-cluster-api package

Use the @camunda8/orchestration-cluster-api package directly when:

1. You are starting a new project; and
2. You do not need the gRPC API; and
3. You are using Camunda 8.8 or later; or
4. You are developing an application for the web browser (and all of the above)

## Differences between the package and the SDK

### Configuration keys

One difference between using the package directly and using it via the SDK is in the environment variable configuration.

The SDK wraps the Orchestration Cluster API client package and allows you to use the legacy configuration keys. When using the package directly, you must use the environment variable configuration keys required by the package.

The main change is that keys that were prefixed with `ZEEBE_` in the SDK are now prefixed with `CAMUNDA_` in the Orchestration Cluster API client package configuration.

Refer to the [Configuration Reference](https://github.com/camunda/orchestration-cluster-api-js/blob/main/documentation/CONFIG_REFERENCE.md?plain=1) for a list of the configuration parameters.

### ESM

The Orchestration Cluster API client is a dual ESM/CJS package, allowing you to use ESM and tree shake the package as a dependency.

## Using the Orchestration Cluster API package

Install the package to your project:

```bash
npm i @camunda8/orchestration-cluster-api
```

Now import it in your application:

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

## Full API Documentation

Refer to the [README](https://camunda.github.io/orchestration-cluster-api-js/) and the [full API documentation](https://camunda.github.io/orchestration-cluster-api-js/classes/index.CamundaClient.html).
