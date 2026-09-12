---
title: "Type Alias: UnassignMappingRuleFromGroupData"
sidebar_label: "UnassignMappingRuleFromGroupData"
mdx:
  format: md
---

# Type Alias: UnassignMappingRuleFromGroupData

```ts
type UnassignMappingRuleFromGroupData = object;
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

#### groupId

```ts
groupId: GroupId;
```

The group ID.

#### mappingRuleId

```ts
mappingRuleId: MappingRuleId;
```

The mapping rule ID.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/groups/{groupId}/mapping-rules/{mappingRuleId}";
```
