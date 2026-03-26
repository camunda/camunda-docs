---
id: deploying-resources
title: "Deploying Resources"
sidebar_label: "Deploying Resources"
sidebar_position: 10
mdx:
  format: md
---

# Deploying Resources

:::caution Technical Preview
The C# SDK is a **technical preview** available from Camunda 8.9. It will become fully supported in Camunda 8.10. Its API surface may change in future releases without following semver.
:::

Deploy BPMN, DMN, or Form files from disk:

<!-- snippet:UsingDirective+DeployResources -->

```csharp
using Camunda.Orchestration.Sdk;

using var client = CamundaClient.Create();

var result = await client.DeployResourcesFromFilesAsync(["process.bpmn", "decision.dmn"]);

Console.WriteLine($"Deployment key: {result.DeploymentKey}");
foreach (var process in result.Processes)
{
    Console.WriteLine($"  Process: {process.ProcessDefinitionId} (key: {process.ProcessDefinitionKey})");
}
```
