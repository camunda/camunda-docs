---
title: "Type Alias: getTenantClusterVariableConsistency"
sidebar_label: "getTenantClusterVariableConsistency"
mdx:
  format: md
---

# Type Alias: getTenantClusterVariableConsistency

```ts
type getTenantClusterVariableConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getTenantClusterVariable>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
