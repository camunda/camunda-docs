---
id: deploying-and-starting-processes
title: "Deploying and starting processes"
sidebar_label: "Deploying and starting processes"
sidebar_position: 10
mdx:
  format: md
---

# Deploying and starting processes

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

The facade exposes request bodies as first-class parameters; the `Raw()` escape
hatch covers anything the facade doesn't (such as multipart resource upload):

```go
// Deploy a BPMN process. Multipart resource upload goes through the Raw()
// generated client (the escape hatch for anything the facade doesn't cover).
f, err := os.Open("greet.bpmn")
if err != nil {
	return err
}
defer func() { _ = f.Close() }()

if _, _, err := client.Raw().ResourceAPI.CreateDeployment(ctx).
	Resources([]*os.File{f}).
	Execute(); err != nil {
	return err
}

// Start an instance by process id. The request body is a first-class facade
// parameter — no Raw() needed.
byID := openapi.NewProcessInstanceCreationInstructionById("demo-process")
byID.SetVariables(map[string]any{"name": "Camunda"})
instruction := openapi.ProcessInstanceCreationInstructionByIdAsProcessInstanceCreationInstruction(byID)

instance, err := client.CreateProcessInstance(ctx, instruction)
if err != nil {
	return err
}
fmt.Printf("started process instance %v\n", instance.GetProcessInstanceKey())
```
