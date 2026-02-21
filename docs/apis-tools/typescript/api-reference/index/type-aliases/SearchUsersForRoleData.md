---
title: "Type Alias: SearchUsersForRoleData"
sidebar_label: "SearchUsersForRoleData"
mdx:
  format: md
---

# Type Alias: SearchUsersForRoleData

```ts
type SearchUsersForRoleData = object;
```

Defined in: [gen/types.gen.ts:15210](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15210)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:15211](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15211)

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

Defined in: [gen/types.gen.ts:15223](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15223)

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

Defined in: [gen/types.gen.ts:15229](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15229)

---

### url

```ts
url: "/roles/{roleId}/users/search";
```

Defined in: [gen/types.gen.ts:15230](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15230)
