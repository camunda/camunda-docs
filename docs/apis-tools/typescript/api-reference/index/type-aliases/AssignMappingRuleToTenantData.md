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
body?: never;
```

---

### path

```ts
path: object;
```

#### mappingRuleId

```ts
mappingRuleId: MappingRuleId;
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
query?: never;
```

---

### url

```ts
url: "/tenants/{tenantId}/mapping-rules/{mappingRuleId}";
```
