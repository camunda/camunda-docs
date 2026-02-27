---
title: "Type Alias: SearchClientsForRoleData"
sidebar_label: "SearchClientsForRoleData"
mdx:
  format: md
---

# Type Alias: SearchClientsForRoleData

```ts
type SearchClientsForRoleData = object;
```

Defined in: [gen/types.gen.ts:14732](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14732)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:14733](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14733)

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

Defined in: [gen/types.gen.ts:14745](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14745)

#### roleId

```ts
roleId: string;
```

The role ID.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:14751](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14751)

---

### url

```ts
url: "/roles/{roleId}/clients/search";
```

Defined in: [gen/types.gen.ts:14752](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14752)
