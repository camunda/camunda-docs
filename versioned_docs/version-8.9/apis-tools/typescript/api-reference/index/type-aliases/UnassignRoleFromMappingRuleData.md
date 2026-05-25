---
title: "Type Alias: UnassignRoleFromMappingRuleData"
sidebar_label: "UnassignRoleFromMappingRuleData"
mdx:
  format: md
---

# Type Alias: UnassignRoleFromMappingRuleData

```ts
type UnassignRoleFromMappingRuleData = object;
```

## Properties

### body?

```ts
optional body?: never;
```

---

### path

```ts
path: object;
```

#### mappingRuleId

```ts
mappingRuleId: string;
```

The mapping rule ID.

#### roleId

```ts
roleId: string;
```

The role ID.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/roles/{roleId}/mapping-rules/{mappingRuleId}";
```
