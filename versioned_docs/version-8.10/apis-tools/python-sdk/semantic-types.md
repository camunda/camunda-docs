---
id: semantic-types
title: Semantic Types
sidebar_label: Semantic Types
sidebar_position: 4
mdx:
  format: md
---

# Semantic Types

The SDK uses distinct types for identifiers like `ProcessDefinitionKey`, `ProcessInstanceKey`, `JobKey`, `TenantId`, etc., defined in `camunda_orchestration_sdk.semantic_types` and re-exported from the top-level package. These types inherit from `str`, so they serialize transparently to/from JSON and are compatible with any code expecting a string.

## Why they exist

Camunda's API has many operations that accept string keys — process definition keys, process instance keys, incident keys, job keys, and so on. Without semantic types, it is easy to accidentally pass a process instance key where a process definition key is expected, or mix up a job key with an incident key. The type checker cannot help you if everything is `str`.

Semantic types make these identifiers **distinct at the type level**. Pyright (and other type checkers) will flag an error if you pass a `ProcessInstanceKey` where a `ProcessDefinitionKey` is expected, catching bugs before runtime.

## How to use them

Treat semantic types as **opaque identifiers** — receive them from API responses and pass them to subsequent API calls without inspecting or transforming the underlying value:

<!-- snippet-source: examples/readme.py | regions: ReadmeSemanticTypes -->

```python
from camunda_orchestration_sdk import CamundaClient, ProcessCreationByKey

client = CamundaClient()

# Deploy → the response already carries typed keys
deployment = client.deploy_resources_from_files(["process.bpmn"])
process_key = deployment.processes[0].process_definition_key  # ProcessDefinitionKey

# Pass it directly to another call — no conversion needed
result = client.create_process_instance(
    data=ProcessCreationByKey(process_definition_key=process_key)
)

# The result also carries typed keys
instance_key = result.process_instance_key  # ProcessInstanceKey
client.cancel_process_instance(process_instance_key=instance_key)
```

## Serialising in and out of the type system

Semantic types inherit from `str` and validate on construction, so they work transparently:

<!-- snippet-exempt: uses hypothetical db.save/db.load pseudo-code -->

```python
from camunda_orchestration_sdk import ProcessDefinitionKey, ProcessInstanceKey

# --- Serialising out (to storage / JSON / message queue) ---
# A semantic type IS a str, so it works directly with any str API:
process_key: ProcessDefinitionKey = deployment.processes[0].process_definition_key
db.save("process_key", process_key)   # stores the raw string
json.dumps({"key": process_key})      # "2251799813685249"

# --- Deserialising in (from storage / external input) ---
# Wrap the raw string with the type constructor (validates automatically):
raw = db.load("process_key")           # returns a plain str
typed_key = ProcessDefinitionKey(raw)  # validates and wraps the value

result = client.create_process_instance(
    data=ProcessCreationByKey(process_definition_key=typed_key)
)
```

The available semantic types include: `ProcessDefinitionKey`, `ProcessDefinitionId`, `ProcessInstanceKey`, `JobKey`, `IncidentKey`, `DecisionDefinitionKey`, `DecisionDefinitionId`, `DeploymentKey`, `UserTaskKey`, `MessageKey`, `SignalKey`, `TenantId`, `ElementId`, `FormKey`, and others. All are importable from `camunda_orchestration_sdk` or `camunda_orchestration_sdk.semantic_types`.
