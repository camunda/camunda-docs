---
title: "Type Alias: SearchTenantsData"
sidebar_label: "SearchTenantsData"
mdx:
  format: md
---

# Type Alias: SearchTenantsData

```ts
type SearchTenantsData = object;
```

Defined in: [gen/types.gen.ts:15572](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15572)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:15576](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15576)

Tenant search request

#### Type Declaration

##### filter?

```ts
optional filter: TenantFilter;
```

The tenant search filters.

##### sort?

```ts
optional sort: object[];
```

Sort field criteria.

---

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:15592](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15592)

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:15593](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15593)

---

### url

```ts
url: "/tenants/search";
```

Defined in: [gen/types.gen.ts:15594](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15594)
