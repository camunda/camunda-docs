---
title: "Type Alias: MappingRuleFilter"
sidebar_label: "MappingRuleFilter"
mdx:
  format: md
---

# Type Alias: MappingRuleFilter

```ts
type MappingRuleFilter = MappingRuleFilterFields & object;
```

Mapping rule search filter.

## Type Declaration

### $or?

```ts
optional $or?: MappingRuleFilterFields[];
```

Defines a list of alternative filter groups combined using OR logic. Each object in the array is evaluated independently, and the filter matches if any one of them is satisfied.

Top-level fields and the `$or` clause are combined using AND logic — meaning: (top-level filters) AND (any of the `$or` filters) must match.

_Example:_

```json
{
  "$or": [{ "mappingRuleId": "rule-1" }, { "mappingRuleId": "rule-2" }]
}
```

This matches mapping rules whose `mappingRuleId` is _rule-1_ or _rule-2_.

Note: Using complex `$or` conditions may impact performance, use with caution in high-volume environments.
