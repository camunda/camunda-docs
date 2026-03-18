---
title: "Type Alias: SearchGroupIdsForTenantData"
sidebar_label: "SearchGroupIdsForTenantData"
mdx:
  format: md
---

# Type Alias: SearchGroupIdsForTenantData

```ts
type SearchGroupIdsForTenantData = object;
```

Defined in: [gen/types.gen.ts:15905](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15905)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:15906](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15906)

#### Type Declaration

##### sort?

```ts
optional sort: object[];
```

Sort field criteria.

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15918](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15918)

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

Defined in: [gen/types.gen.ts:15924](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15924)

---

### url

```ts
url: "/tenants/{tenantId}/groups/search";
```

Defined in: [gen/types.gen.ts:15925](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15925)
