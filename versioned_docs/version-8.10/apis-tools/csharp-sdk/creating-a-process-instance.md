---
id: creating-a-process-instance
title: "Creating a Process Instance"
sidebar_label: "Creating a Process Instance"
sidebar_position: 12
mdx:
  format: md
---

# Creating a Process Instance

The recommended pattern is to obtain keys from a prior API response (e.g. a deployment) and pass them directly — no manual conversion needed:

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: UsingDirective+ReadmeCreateProcessInstance -->

```csharp
using Camunda.Orchestration.Sdk;

using var client = CamundaClient.Create();

var deployment = await client.DeployResourcesFromFilesAsync(["process.bpmn"]);
var processKey = deployment.Processes[0].ProcessDefinitionKey;

var result = await client.CreateProcessInstanceAsync(
    new ProcessInstanceCreationInstructionByKey
    {
        ProcessDefinitionKey = processKey,
    });

Console.WriteLine($"Process instance key: {result.ProcessInstanceKey}");
```

If you need to restore a key from external storage (database, message queue, config file), wrap the raw value with the domain key constructor:

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: UsingDirective+CreateProcessFromStorage -->

```csharp
using Camunda.Orchestration.Sdk;

using var client = CamundaClient.Create();

var storedKey = "2251799813685249"; // from a DB row or config
var result = await client.CreateProcessInstanceAsync(
    new ProcessInstanceCreationInstructionByKey
    {
        ProcessDefinitionKey = ProcessDefinitionKey.AssumeExists(storedKey),
    });

Console.WriteLine($"Process instance key: {result.ProcessInstanceKey}");
```

You can also start a process instance by BPMN process ID (which uses the latest deployed version):

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: CreateProcessById -->

```csharp
var result = await client.CreateProcessInstanceAsync(
    new ProcessInstanceCreationInstructionById
    {
        ProcessDefinitionId = ProcessDefinitionId.AssumeExists("my-process-id"),
    });
```
