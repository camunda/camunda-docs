---
title: "Type Alias: UnassignMappingRuleFromTenantData"
sidebar_label: "UnassignMappingRuleFromTenantData"
mdx:
  format: md
---

# Type Alias: UnassignMappingRuleFromTenantData

```ts
type UnassignMappingRuleFromTenantData = object;
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

The unique identifier of the mapping rule.

#### tenantId

```ts
tenantId: TenantId;
```

The unique identifier of the tenant.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/tenants/{tenantId}/mapping-rules/{mappingRuleId}";
```
