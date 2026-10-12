---
id: using-the-sdk
title: "Using the SDK"
sidebar_label: "Using the SDK"
sidebar_position: 4
mdx:
  format: md
---

# Using the SDK

:::caution Technical Preview
The PHP SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

The SDK provides two clients with matching surfaces:

- **`CamundaClient`** — synchronous. Every method blocks until the response arrives. Use it in scripts, CLI tools, and traditional request/response applications.
- **`CamundaAsyncClient`** — asynchronous. Every operation returns a Guzzle `PromiseInterface`. Use it when you want to issue concurrent requests.

```php
function readme_sync_client(): void
{
    $client = CamundaClient::fromEnvironment();

    $result = $client->deployResourcesFromFiles(__DIR__ . '/resources/order-process.bpmn');
    // ...
}
```

```php
function readme_async_client(): void
{
    $client = CamundaAsyncClient::fromEnvironment();

    $client->deployResourcesFromFilesAsync(__DIR__ . '/resources/order-process.bpmn')
        ->then(static function ($result): void {
            // handle the DeploymentResult once the request resolves
        })
        ->wait();
}
```

## Parallel async reads

```php
function parallel_async_reads(CamundaAsyncClient $client): void
{
    // Requests are issued before either promise is awaited.
    $topologyPromise = $client->getTopology();
    $definitionsPromise = $client->searchProcessDefinitions();

    $topology = $topologyPromise->wait();
    $definitions = $definitionsPromise->wait();

    if ($topology instanceof TopologyResponse) {
        printf("Connected to %d broker(s).\n", count($topology->getBrokers()));
    }
    if ($definitions instanceof ProcessDefinitionSearchQueryResult) {
        printf("Found %d process definitions.\n", count($definitions->getItems()));
    }
}
```
