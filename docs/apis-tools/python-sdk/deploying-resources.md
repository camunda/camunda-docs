---
id: deploying-resources
title: Deploying Resources
sidebar_label: Deploying Resources
sidebar_position: 5
mdx:
  format: md
---

# Deploying Resources

Deploy BPMN, DMN, or Form files from disk:

```python
from camunda_orchestration_sdk import CamundaClient

with CamundaClient() as client:
    result = client.deploy_resources_from_files(["process.bpmn", "decision.dmn"])

    print(f"Deployment key: {result.deployment_key}")
    for process in result.processes:
        print(f"  Process: {process.process_definition_id} (key: {process.process_definition_key})")
```
