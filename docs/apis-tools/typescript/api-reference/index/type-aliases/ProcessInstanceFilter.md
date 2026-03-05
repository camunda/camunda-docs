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

Defined in: [gen/types.gen.ts:6363](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6363)

Process instance search filter.

## Type Declaration

### $or?

```ts
optional $or: ProcessInstanceFilterFields[];
```

Defines a list of alternative filter groups combined using OR logic. Each object in the array is evaluated independently, and the filter matches if any one of them is satisfied.

Top-level fields and the `$or` clause are combined using AND logic — meaning: (top-level filters) AND (any of the `$or` filters) must match.


*Example:*

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


- are in *ACTIVE* state
- have tenant id equal to *123*
- and match either:

- `processDefinitionId` is *process_v1*, or
- `processDefinitionId` is *process_v2* and `hasIncident` is *true*






Note: Using complex `$or` conditions may impact performance, use with caution in high-volume environments.
