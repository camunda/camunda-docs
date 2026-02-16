---
title: "Type Alias: SearchRolesForTenantData"
sidebar_label: "SearchRolesForTenantData"
mdx:
  format: md
---

# Type Alias: SearchRolesForTenantData

```ts
type SearchRolesForTenantData = object;
```

Defined in: [gen/types.gen.ts:16162](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16162)

## Properties

### body?

```ts
optional body: RoleSearchQueryRequest;
```

Defined in: [gen/types.gen.ts:16163](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16163)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:16164](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16164)

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

Defined in: [gen/types.gen.ts:16170](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16170)

---

### url

```ts
url: "/tenants/{tenantId}/roles/search";
```

Defined in: [gen/types.gen.ts:16171](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16171)
