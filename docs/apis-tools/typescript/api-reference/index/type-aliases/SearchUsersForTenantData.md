---
title: "Type Alias: SearchUsersForTenantData"
sidebar_label: "SearchUsersForTenantData"
mdx:
  format: md
---

# Type Alias: SearchUsersForTenantData

```ts
type SearchUsersForTenantData = object;
```

Defined in: [gen/types.gen.ts:16285](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16285)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:16286](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16286)

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

Defined in: [gen/types.gen.ts:16298](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16298)

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

Defined in: [gen/types.gen.ts:16304](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16304)

---

### url

```ts
url: "/tenants/{tenantId}/users/search";
```

Defined in: [gen/types.gen.ts:16305](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16305)
