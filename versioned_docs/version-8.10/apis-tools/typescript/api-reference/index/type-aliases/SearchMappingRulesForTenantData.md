---
title: "Type Alias: SearchMappingRulesForTenantData"
sidebar_label: "SearchMappingRulesForTenantData"
mdx:
  format: md
---

# Type Alias: SearchMappingRulesForTenantData

```ts
type SearchMappingRulesForTenantData = object;
```

## Properties

### body?

```ts
optional body?: MappingRuleSearchQueryRequest;
```

---

### path

```ts
path: object;
```

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
url: "/tenants/{tenantId}/mapping-rules/search";
```
