---
title: "Type Alias: AssignMappingRuleToTenantData"
sidebar_label: "AssignMappingRuleToTenantData"
mdx:
  format: md
---

# Type Alias: AssignMappingRuleToTenantData

```ts
type AssignMappingRuleToTenantData = object;
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
