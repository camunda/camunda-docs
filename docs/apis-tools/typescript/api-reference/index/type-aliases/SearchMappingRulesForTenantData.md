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

Defined in: [gen/types.gen.ts:16039](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16039)

## Properties

### body?

```ts
optional body: MappingRuleSearchQueryRequest;
```

Defined in: [gen/types.gen.ts:16040](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16040)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:16041](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16041)

#### tenantId

```ts
tenantId: TenantId;
```

The unique identifier of the tenant.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:16047](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16047)

---

### url

```ts
url: "/tenants/{tenantId}/mapping-rules/search";
```

Defined in: [gen/types.gen.ts:16048](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16048)
