---
id: migrating-to-oca
title: Migrating an application to the Orchestration Cluster API
description: How to progressively adopt the Orchestration Cluster API in an existing application
---

Understand these factors to migrate an existing Camunda 8 TypeScript application to use the new Orchestration Cluster API.

## Using the SDK bundled client versus the @camunda8/orchestration-cluster-api package

The `@camunda8/sdk` from version 8.8.0 includes a dedicated Orchestration Cluster API client. This is accomplished by depending on the `@camunda8/orchestration-cluster-api` and then normalising the client configuration to ensure forward-compatibility of your existing application with no configuration change.

Here is how to choose whether to use the SDK-bundled client, or depend directly on the focused `@camunda8/orchestration-cluster-api` package.

Use the bundled client if:

- You depend on APIs that are not supported by the focused client, for example: gRPC.
- Your application must use APIs that are not supported on 8.8, such as the earlier Operate query API.
- You do not care about application size, and do not want to modify your application environment configuration.

Import the focused client directly alongside the SDK if:

- You do not use the gRPC API; and
- Your application targets 8.8 or later; and
- Your intention is to migrate completely to the Orchestration Cluster API, removing all other API usage in your application; and
- You do not mind changing or extending your application configuration.

The key differences:

Using the bundled client in `@camunda8/sdk`:

- Will always pull in as dependencies all the other API clients and their dependencies.
- Uses the same configuration variables across the various clients (the SDK normalises configuration).

```typescript
import { Camunda8 } from "@camunda8/sdk";

const clientFactory = new Camunda8();
// Get a strongly-typed CamundaClient
const camunda = clientFactory.getOrchestrationClusterApiClient();

// Get a loosely-typed CamundaClient
const camundaLoose = clientFactory.getOrchestrationClusterApiClient();
```

Using the focused client in `@camunda8/orchestration-cluster-api`

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

As a middle ground, you might use the bundled client initially, then switch the dependency to the focused client and address the configuration.

## Choosing between strongly- or loosely-typed

A feature of the Orchestration Cluster API is strong domain types. Request and response fields such as `ProcessDefinitionKey` and `ProcessDefinitionId` are distinct types, leading to better static analysis, enhanced IDE completion, more powerful refactoring, and early detection of runtime bugs.

This is accomplished using [nominal typing](https://en.wikipedia.org/wiki/Nominal_type_system). This means that you can pass a `ProcessDefinitionId` wherever a string is expected, but cannot pass a free string or a `ProcessDefinitionKey` where a `ProcessDefinitionId` is expected — even though structurally they are all type `string`.

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

This makes output from the Orchestration Cluster API client compatible with input fields of the earlier clients, but the reverse is not true. The earlier clients accept the structural types of the new client, and do not examine the nominal types at all.

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

## Integrating the strongly-typed client

You have two options to deal with this. Managing the type system boundary, or erasing nominal typing.

The new client provides lifters to deal with interoperability:

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

This is the preferred method. This allows you to move the type and constraint validation boundary from the server API to the boundaries of your application. See [this presentation](https://www.camundacon.com/event-session/camundacon-new-york-2025/patterns-to-use-today-to-make-camunda-8-apps-even-more-reliable?on_demand=true) for more details (it is the third demo).

## Integrating the loosely-typed client

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

You could use the loosely-typed in the first instance, then progressively migrate to the strongly typed variant.

## Configuration

The Orchestration Cluster API uses the configuration value `ZEEBE_REST_ADDRESS` to connect to the server.

## Refactoring API calls

The Orchestration Cluster API has command and query operations. All operations searching data using the v1 component APIs can be refactored to use the equivalent Orchestration Cluster API method.

Some method signatures have changed - mostly in terms of the names of fields. Your IDE intellisense will guide you in refactoring to the new signatures.

## Data access methods and eventual consistency

Search query and get methods take a required second parameter to deal with eventual consistency. See [Managing eventual consistency over the Orchestration Cluster API](./camunda8-sdk.md) for more details.

## Backpressure management

The new client has enhanced backpressure management. See [Managing backpressure using the SDK](./backpressure.md) for more details.
