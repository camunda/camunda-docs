---
id: migrating-from-v9-to-v10
title: Migrating from v9 to v10
sidebar_label: Migrating from v9 to v10
sidebar_position: 5
mdx:
  format: md
---

# Migrating from v9 to v10

v10 tracks Camunda 8.10. Identifier arguments moved from plain `str` to **semantic types**, `get_resource_content` now returns an object instead of a `str`, and 26 model classes were renamed (the old names still work, with a deprecation warning). No client method or model class was removed.

**→ See [MIGRATION.md](MIGRATION.md) for the full guide**, including the complete list of affected methods.

The common case is wrapping an identifier at the boundary:

<!-- snippet-source: examples/readme.py | regions: V9ToV10Migration -->

```python
from camunda_orchestration_sdk import CamundaClient, GroupId, RoleId

with CamundaClient() as client:
    # v9 — plain strings were accepted:
    # client.assign_role_to_group(role_id="developer", group_id="engineering")

    # v10 — wrap with the branded type constructor at the boundary
    client.assign_role_to_group(
        role_id=RoleId("developer"),
        group_id=GroupId("engineering"),
    )
```

The brand constructors are subclasses of `str`, so the wrapped values remain valid where a `str` is expected (f-strings, logging, JSON serialisation). The wrap exists to enforce the upstream pattern and length constraints once, at the boundary, so a malformed identifier fails fast with `ValueError` instead of producing an HTTP 400 from the cluster.

See [`semantic_types.py`](https://github.com/camunda/orchestration-cluster-api-python/blob/main/generated/camunda_orchestration_sdk/semantic_types.py) for the canonical list of brands and their constraints.
