---
id: migrating-to-oca
title: Migrate to the Orchestration Cluster API
sidebar_label: Migrate to the Orchestration Cluster API
description: "Migrate an existing Camunda 8 TypeScript application to use the Orchestration Cluster API. The SDK includes the Orchestration Cluster API client by depending..."
---

Migrate an existing Camunda 8 TypeScript application to use the Orchestration Cluster API.

## Choose a client option

The SDK includes the Orchestration Cluster API client by depending on the `@camunda8/orchestration-cluster-api` package and normalizing configuration to ensure forward compatibility without requiring configuration changes. Use the following guidance to choose between the SDK-bundled client and the focused `@camunda8/orchestration-cluster-api` package.

Use the bundled client if:

- You depend on APIs not supported by the focused client, such as gRPC.
- Your application must use APIs that are not supported in 8.9, such as the earlier Operate query API.
- You do not care about application size and do not want to modify your environment configuration.

Import the focused client directly alongside the SDK if:

- You do not use the gRPC API.
- Your application targets Camunda 8.9 or later.
- You intend to migrate completely to the Orchestration Cluster API and remove all other API usage in your application.
- You do not mind changing or extending your application configuration.

### Key differences

Using the bundled client in `@camunda8/sdk`:

- Will always pull in as dependencies all the other API clients and their dependencies.
- Uses the same configuration variables across the various clients (the SDK normalizes configuration).

```typescript
import { Camunda8 } from "@camunda8/sdk";

const clientFactory = new Camunda8();
// Get a strongly typed CamundaClient
const camunda = clientFactory.getOrchestrationClusterApiClient();

// Get a loosely typed CamundaClient
const camundaLoose = clientFactory.getOrchestrationClusterApiClient();
```

Using the focused client in `@camunda8/orchestration-cluster-api`:

- Allows you to reduce the application dependency to the Orchestration Cluster API client only.
- Requires you to change the environment configuration (the focused client uses distinct configuration).

```typescript
import {
  createCamundaClient,
  createCamundaClientLoose,
} from "@camunda8/orchestration-cluster-api";

// Get a strongly-typed CamundaClient
const camunda = createCamundaClient();

// Get a loosely-typed CamundaClient
const camundaLoose = createCamundaClientLoose();
```

As a middle ground, you can use the bundled client initially and then switch to the focused client when you are ready to update the configuration.

## Strong vs. loose typing

A feature of the Orchestration Cluster API is strong domain types. Request and response fields such as `ProcessDefinitionKey` and `ProcessDefinitionId` are distinct types, leading to better static analysis, enhanced IDE completion, more powerful refactoring, and early detection of runtime bugs.

The client implements this using [nominal typing](https://en.wikipedia.org/wiki/Nominal_type_system). You can pass a `ProcessDefinitionId` wherever a string is expected, but cannot pass a free string or a `ProcessDefinitionKey` where a `ProcessDefinitionId` is expected — even though structurally they are all type `string`.

```typescript
import { Camunda8 } from "@camunda8/sdk";

const camunda = new Camunda8().getOrchestrationClusterApiClient();

async function main() {
  const deploymentResponse = await camunda.deployResourcesFromFile([
    "./process.bpmn",
  ]);
  const { processDefinitionKey } = deploymentResponse.processes[0]; // nominal type is ProcessDefinitionKey
  console.log(typeof processDefinitionKey); // works — structural type is 'string'
  await camunda.createProcessInstance({
    processDefinitionId: processDefinitionKey,
  }); // error — incompatible types
}

main();
```

This approach makes output from the Orchestration Cluster API client compatible with input fields of earlier clients, but the reverse is not true. The earlier clients accept the structural types of the new client, and do not examine the nominal types at all.

```typescript
import { Camunda8 } from "@camunda8/sdk";

const factory = new Camunda8();
const camunda = new factory.getOrchestrationClusterApiClient();
const camundaLegacy = new factory.getCamundaRestClient();

async function main() {
  const deploymentResponse = await camunda.deployResourcesFromFile([
    "./process.bpmn",
  ]);
  const { processDefinitionKey } = deploymentResponse.processes[0]; // nominal type is ProcessDefinitionKey
  console.log(typeof processDefinitionKey); // structural type is 'string'

  const { processInstanceKey } = await camundaLegacy.createProcessInstance({
    processDefinitionKey,
  }); // works — structural type is string

  const runningProcessInstance = await camunda.searchProcessInstances(
    {
      filter: {
        processInstanceKey, // fails — legacy type is `string`, client requires `ProcessInstanceKey`
      },
    },
    { consistencyManagement: { waitUpToMs: 10_000 } }
  );
}

main();
```

## Integrate the strongly typed client

To handle this, you can either manage the type system boundary or erase nominal typing.

The new client provides lifters to deal with interoperability. For example:

```typescript
import { Camunda8, OrchestrationLifters } from '@camunda8/sdk'

const factory = new Camunda8()
const camunda = new factory.getOrchestrationClusterApiClient()
const legacyCamunda = new factory.getCamundaRestClient()

async function main() {
    const deploymentResponse = await legacyCamunda.deployResourcesFromFile(['./process.bpmn'])
    const { processDefinitionKey } = deploymentResponse.processes[0]
    console.log(typeof processDefinitionKey) // structural type is 'string'

    const {processInstanceKey} = await legacyCamunda.createProcessInstance({ processDefinitionKey }) // works — structural type is string

    const
    const runningProcessInstance = await camunda.searchProcessInstances({
        filter: {
            processInstanceKey: processInstanceKey as OrchestrationLifters.ProcessInstanceKey // cast to `ProcessInstanceKey`
        }
    }, { consistencyManagement: { waitUpToMs: 10_000 } })
}

main()
```

Rather than casting in multiple places, you can do it once via assignment with the `assumeExists` lifter. The lifter will cast the type and also apply runtime constraint validation.

```typescript
import { Camunda8, OrchestrationLifters } from "@camunda8/sdk";

const camunda = new Camunda8().getOrchestrationClusterApi();

async function cancelRunningProcessInstances(processDefinitionKey: string) {
  // lift to nominal type `ProcessInstanceKey`. Will throw if passed invalid format.
  const _processDefinitionKey =
    OrchestrationLifters.ProcessDefinitionKey.assumeExists(
      processDefinitionKey
    );

  const processes = await camunda.searchProcessInstances(
    {
      filter: {
        processDefinitionKey: _processDefinitionKey,
      },
    },
    { consistencyManagement: { waitUpToMs: 10_000 } }
  );
  for (const process in processes.items) {
    await camunda.cancelProcess(process.processInstanceKey);
  }
}
```

:::info
This approach is the preferred method. This allows you to move the type and constraint validation boundary from the server API to the boundaries of your application. See [the presentation on patterns](https://www.camundacon.com/event-session/camundacon-new-york-2025/patterns-to-use-today-to-make-camunda-8-apps-even-more-reliable?on_demand=true) for more information (refer to the third demo).
:::

## Integrate the loosely-typed client

The SDK provides a legacy-compatible loosely-typed client. This erases the domain typing (all fields remain type `string`). This enables you to use the new client without managing type interaction with your existing code.

```typescript
import { Camunda8, OrchestrationLifters } from '@camunda8/sdk'

const factory = new Camunda8()
const camunda = new factory.getOrchestrationClusterApiClientLoose()
const legacyCamunda = new factory.getCamundaRestClient()

async function main() {
    const deploymentResponse = await legacyCamunda.deployResourcesFromFile(['./process.bpmn'])
    const { processDefinitionKey } = deploymentResponse.processes[0]

    const {processInstanceKey} = await legacyCamunda.createProcessInstance({ processDefinitionKey }) // string

    const
    const runningProcessInstance = await camunda.searchProcessInstances({
        filter: {
            processInstanceKey // accepts string type
        }
    }, { consistencyManagement: { waitUpToMs: 10_000 } })
}

main()
```

You can use loosely-typed in the first instance, then progressively migrate to the strongly typed variant.

## Configuration

The Orchestration Cluster API client uses the `ZEEBE_REST_ADDRESS` configuration value to connect to the server.

## Refactor API calls

The Orchestration Cluster API has command and query operations. All operations searching data using the v1 component APIs can be refactored to use the equivalent Orchestration Cluster API method.

Some method signatures have changed, mostly in the names of fields. Your IDE intellisense will guide you in refactoring to the new signatures.

## Data access and consistency

Search and get operations require a second parameter to manage eventual consistency.

:::info
See the examples in the [TypeScript SDK guide](./camunda8-sdk.md) and the [manage Orchestration Cluster API data consistency](./eventual-consistency.md) overview.
:::

## Manage backpressure

The new client has enhanced backpressure management.

:::info
See [manage backpressure using the TypeScript SDK](./backpressure.md).
:::
