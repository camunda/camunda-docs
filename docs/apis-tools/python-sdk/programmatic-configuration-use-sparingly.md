---
id: programmatic-configuration-use-sparingly
title: Programmatic configuration (use sparingly)
sidebar_label: Programmatic configuration (use sparingly)
sidebar_position: 6
mdx:
  format: md
---

# Programmatic configuration (use sparingly)

Only use `configuration={...}` when you must supply or mutate configuration dynamically (e.g. tests, multi-tenant routing, or ephemeral preview environments). Keys mirror their `CAMUNDA_*` environment names.

```python
from camunda_orchestration_sdk import CamundaClient

client = CamundaClient(
    configuration={
        "CAMUNDA_REST_ADDRESS": "http://localhost:8080/v2",
        "CAMUNDA_AUTH_STRATEGY": "NONE",
    }
)
```
