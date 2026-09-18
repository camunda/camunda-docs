---
id: accessing-every-operation
title: "Accessing every operation"
sidebar_label: "Accessing every operation"
sidebar_position: 9
mdx:
  format: md
---

# Accessing every operation

:::caution Technical Preview
The PHP SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

Every one of the 243 API operations is exposed as a method directly on the client — the
flat facade — so you rarely need to reach for an API group:

```php
function readme_flat_facade(): void
{
    $client = CamundaClient::fromEnvironment();
    $instruction = new ProcessInstanceCreationInstructionById([
        'processDefinitionId' => 'order-process',
    ]);

    $topology = $client->getTopology();
    $result = $client->createProcessInstance($instruction);

    $async = CamundaAsyncClient::fromEnvironment();
    $async->getTopology()
        ->then(static function ($asyncTopology): void {
            // handle the asynchronous topology response
        })
        ->wait();
}
```

Beyond the ergonomic helpers and the flat facade, every API group is also reachable
through the typed `api()` accessor:

```php
function readme_api_accessor(): void
{
    $client = CamundaClient::fromEnvironment();
    $instruction = new ProcessInstanceCreationInstructionById([
        'processDefinitionId' => 'order-process',
    ]);

    $processInstances = $client->api(ProcessInstanceApi::class);
    $result = $processInstances->createProcessInstance($instruction);
}
```

See the [`examples/`](https://github.com/camunda/orchestration-cluster-api-php/tree/main/examples/) directory for compilable, static-analysed usage of every REST API operation.
