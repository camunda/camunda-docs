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

Defined in: [gen/types.gen.ts:16111](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16111)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:16112](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16112)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:16113](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16113)

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
optional query: never;
```

Defined in: [gen/types.gen.ts:16123](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16123)

---

### url

```ts
url: "/tenants/{tenantId}/mapping-rules/{mappingRuleId}";
```

Defined in: [gen/types.gen.ts:16124](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16124)
