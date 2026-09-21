---
id: deploying-resources
title: "Deploying resources"
sidebar_label: "Deploying resources"
sidebar_position: 7
mdx:
  format: md
---

# Deploying resources

:::caution Technical Preview
The PHP SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

```php
function readme_deploy_resources(): void
{
    $client = CamundaClient::fromEnvironment();

    $result = $client->deployResourcesFromFiles('order-process.bpmn', 'pricing.dmn');
    // $result is a DeploymentResult (or ProblemDetail on a handled error).
}
```
