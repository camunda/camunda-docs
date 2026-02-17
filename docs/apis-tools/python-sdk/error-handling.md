---
id: error-handling
title: Error Handling
sidebar_label: Error Handling
sidebar_position: 9
mdx:
  format: md
---

# Error Handling

The SDK raises typed exceptions for API errors. Each operation has specific exception classes for each HTTP error status code:

```python
from camunda_orchestration_sdk import CamundaClient
from camunda_orchestration_sdk.models.process_creation_by_key import ProcessCreationByKey
from camunda_orchestration_sdk.errors import CreateProcessInstanceBadRequest

with CamundaClient() as client:
    try:
        result = client.create_process_instance(
            data=ProcessCreationByKey(process_definition_key=99999)
        )
    except CreateProcessInstanceBadRequest as e:
        print(f"Bad request: {e}")
```
