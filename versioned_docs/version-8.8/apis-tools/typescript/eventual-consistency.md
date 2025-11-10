---
id: eventual-consistency
title: Managing eventual consistency over the Orchestration Cluster API
description: How to manage the eventually consistent data characteristic with the Orchestration Cluster API
---

Data in Camunda 8 is eventually consistent. Read more about this characteristic of the system [here](/docs/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-data-fetching/#data-consistency).

To ensure that your applications have explicit and deterministic behaviour at runtime under different load scenarios, Orchestration Cluster API methods that access eventually consistent data take a required second parameter `consistency`. This parameter allows you to explicitly ignore eventual consistency, or to manage your application's interaction with it.

For example, searching for a process instance directly after creating may return the newly created process instance, or — if the data is not yet available — may return nothing:

```typescript
import { Camunda8 } from "@camunda8/sdk";

const camunda = new Camunda8().getOrchestrationClusterApiClient();

async function main() {
  const deploymentResponse = await camunda.deployResourcesFromFile([
    "./process.bpmn",
  ]);
  const { processDefinitionKey } = deploymentResponse.processes[0];

  const { processInstanceKey } = await camunda.createProcessInstance({
    processDefinitionKey,
  });

  // May return the process instance, but more likely will return an empty set
  const runningProcessInstance = await camunda.searchProcessInstances(
    {
      filter: {
        processInstanceKey,
      },
    },
    { consistencyManagement: { waitUpToMs: 0 } }
  );
  console.log(JSON.stringify(runningProcessInstance, null, 2));
}

main();
```

To ignore eventual consistency, set `waitUpToMs` to 0. This will return immediately with the response from the API.

In this case, you are likely to receive an empty set — for a search operation, or a 404 exception for a get operation — than to find the process instance that you just created, even though it has definitely been created and you searched for it specifically using the process instance key returned by the `createProcessInstance` response. You are likely to get a response like:

```json
{
  "items": []
}
```

In some situations, you may want to wait for some time for eventual consistency to settle. In this situation, the SDK provides you with an ergonomic surface to do this.

## Managing eventual consistency

If `waitUpToMs` is set to a value greater than `0` — for example: `10_000` — then the SDK will poll every 500ms for _up to_ that time (in the case of our example 10 seconds), and will return a value as soon as one is available.

For search operations, this is when the result set has a length > 0. For get operations, it is when the operation returns 200 (rather than 404).

If no results appear within the specified time, the operation will throw an `EventualConsistencyTimeoutError`.

This means that the surface for eventually consistent operations is `value` or exception:

```typescript
// get, 0: Value or 'NOT_FOUND' exception
await camunda.getProcessInstance(
  {
    processInstanceKey,
  },
  { consistency: { waitForMs: 0 } }
);

// get, > 0: Value or EventualConsistencyTimeoutError
await camunda.getProcessInstance(
  {
    processInstanceKey,
  },
  { consistency: { waitForMs: 1_000 } }
);

// search, 0: Value, including empty set
await camunda.searchProcessInstances(
  {
    processInstanceKey,
  },
  { consistency: { waitForMs: 0 } }
);

// search, >0: Expected value or EventualConsistencyTimeoutError
await camunda.searchProcessInstances(
  {
    processInstanceKey,
  },
  { consistency: { waitForMs: 1_000 } }
);
```

Change the polling interval with the parameter `pollIntervalMs`.

For query operations, optionally provide a custom predicate via the `predicate` parameter. The predicate function receives the current result set, and returns a boolean: `false` to continue polling or `true` to accept and propagate the current results. This can be used for sophisticated filtering on the client, or even for building a subscription mechanism (by setting `waitUpToMs` to `Infinity`).

Eventually consistent operations return a cancelable promise. Calling `cancel` will cancel the polling as well as any inflight network operation, and throw a `CancelSdkError`.
