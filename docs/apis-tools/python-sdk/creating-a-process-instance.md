---
id: creating-a-process-instance
title: Creating a Process Instance
sidebar_label: Creating a Process Instance
sidebar_position: 10
mdx:
  format: md
---

# Creating a Process Instance

The recommended pattern is to obtain keys from a prior API response (e.g. a deployment) and pass them directly — no manual lifting needed:

<!-- snippet-source: examples/readme.py | regions: ReadmeCreateProcessInstance -->

```python
from camunda_orchestration_sdk import CamundaClient, ProcessCreationByKey

with CamundaClient() as client:
    # Deploy and capture the typed key
    deployment = client.deploy_resources_from_files(["process.bpmn"])
    process_key = deployment.processes[0].process_definition_key

    # Use it directly — the type flows through without conversion
    result = client.create_process_instance(
        data=ProcessCreationByKey(process_definition_key=process_key)
    )
    print(f"Process instance key: {result.process_instance_key}")
```

If you need to restore a key from external storage (database, message queue, config file), use the semantic type constructor. Validation runs automatically:

<!-- snippet-source: examples/readme.py | regions: ReadmeCreateFromStorage -->

```python
from camunda_orchestration_sdk import CamundaClient, ProcessCreationByKey, ProcessDefinitionKey

with CamundaClient() as client:
    stored_key = "2251799813685249"  # from a DB row or config
    result = client.create_process_instance(
        data=ProcessCreationByKey(process_definition_key=ProcessDefinitionKey(stored_key))
    )
    print(f"Process instance key: {result.process_instance_key}")
```

**Migrating from pre-release versions:** Early pre-release builds exported `lift_*` helper functions (e.g., `lift_process_definition_key`). These have been removed — use the type constructor directly instead: `ProcessDefinitionKey(value)`. The constructor performs the same validation and is the single API surface for semantic types.
