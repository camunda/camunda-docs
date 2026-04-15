---
id: error-handling
title: Error Handling
sidebar_label: Error Handling
sidebar_position: 12
mdx:
  format: md
---

# Error Handling

The SDK raises typed exceptions for API errors. Each HTTP error status code has a corresponding exception class (e.g. `BadRequestError` for 400, `NotFoundError` for 404). Every exception carries the `operation_id` of the method that raised it:

<!-- snippet-source: examples/readme.py | regions: ReadmeErrorHandling -->

```python
from camunda_orchestration_sdk import CamundaClient, ProcessCreationByKey, ProcessDefinitionKey
from camunda_orchestration_sdk.errors import BadRequestError

process_definition_key = ProcessDefinitionKey("2251799813685249")

with CamundaClient() as client:
    try:
        result = client.create_process_instance(
            data=ProcessCreationByKey(process_definition_key=process_definition_key)
        )
    except BadRequestError as e:
        print(f"Bad request ({e.operation_id}): {e}")
```
