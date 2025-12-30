---
id: eventual-consistency
title: Manage Orchestration Cluster API data consistency
sidebar_label: Manage data consistency
description: "Learn how to manage eventually consistent data when using the Orchestration Cluster API.Data in Camunda 8 is eventually consistent."
---

Learn how to manage eventually consistent data when using the Orchestration Cluster API.

## About eventual consistency

Data in Camunda 8 is [eventually consistent](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-data-fetching.md#data-consistency).

- To ensure that your applications behave explicitly and deterministically at runtime under different load scenarios, Orchestration Cluster API methods that access eventually consistent data take a required second parameter `consistency`.

- This parameter lets you either ignore eventual consistency or manage how your application interacts with it.

For example, if you search for a process instance immediately after you create it, the response may contain the new instance. If the data is not yet available, the search may return an empty result or a 404 error.

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

To ignore eventual consistency, set `waitUpToMs` to 0. The operation returns immediately with the current API response.

In this scenario, you are more likely to receive an empty set for a search operation or a 404 error for a get operation than to find the process instance you just created. Even though the system already created the process instance and returned its key, you might still receive a result such as:

```json
{
  "items": []
}
```

In some situations, you may want to wait for eventual consistency to settle. The SDK provides you with an ergonomic surface for this.

## Manage eventual consistency

If `waitUpToMs` is set to a value greater than `0` (for example, `10_000`), the SDK polls every 500 ms for up to that duration and returns a value as soon as one is available.

For search operations, this is when the result set has a length > 0. For get operations, it is when the API returns 200 rather than 404.

If no results appear within the specified time, the operation will throw an `EventualConsistencyTimeoutError`.

This means eventually consistent operations return either a value or an error:

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

Change the polling interval using the `pollIntervalMs` parameter.

For query operations, optionally provide a custom predicate via the `predicate` parameter. The predicate function receives the current result set, and returns a boolean: `false` to continue polling or `true` to accept and propagate the current results. You can use this for advanced client-side filtering or to build a subscription mechanism.

Eventually consistent operations return a cancelable promise. Calling `cancel` stops polling and cancels any in-flight network operation, then throws a `CancelSdkError`.
