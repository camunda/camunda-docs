---
id: deploying-resources
title: "Deploying Resources"
sidebar_label: "Deploying Resources"
sidebar_position: 11
mdx:
  format: md
---

# Deploying Resources

Deploy BPMN, DMN, or Form files from disk:

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: UsingDirective+DeployResources -->

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
