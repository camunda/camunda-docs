---
title: "Type Alias: ProcessInstanceFilter"
sidebar_label: "ProcessInstanceFilter"
mdx:
  format: md
---

# Type Alias: ProcessInstanceFilter

```ts
type ProcessInstanceFilter = ProcessInstanceFilterFields & object;
```

Process instance search filter.

## Type Declaration

### $or?

```ts
optional $or?: ProcessInstanceFilterFields[];
```

Defines a list of alternative filter groups combined using OR logic. Each object in the array is evaluated independently, and the filter matches if any one of them is satisfied.

Top-level fields and the `$or` clause are combined using AND logic — meaning: (top-level filters) AND (any of the `$or` filters) must match.

_Example:_

```json
{
  "state": "ACTIVE",
  "tenantId": 123,
  "$or": [
    { "processDefinitionId": "process_v1" },
    { "processDefinitionId": "process_v2", "hasIncident": true }
  ]
}
```

This matches process instances that:

- are in _ACTIVE_ state
- have tenant id equal to _123_
- and match either:

- `processDefinitionId` is _process_v1_, or
- `processDefinitionId` is _process_v2_ and `hasIncident` is _true_

Note: Using complex `$or` conditions may impact performance, use with caution in high-volume environments.
