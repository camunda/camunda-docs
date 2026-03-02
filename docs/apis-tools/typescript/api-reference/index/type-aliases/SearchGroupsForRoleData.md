---
title: "Type Alias: SearchGroupsForRoleData"
sidebar_label: "SearchGroupsForRoleData"
mdx:
  format: md
---

# Type Alias: SearchGroupsForRoleData

```ts
type SearchGroupsForRoleData = object;
```

Defined in: [gen/types.gen.ts:14895](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14895)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:14896](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14896)

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

Defined in: [gen/types.gen.ts:14908](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14908)

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

Defined in: [gen/types.gen.ts:14914](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14914)

---

### url

```ts
url: "/roles/{roleId}/groups/search";
```

Defined in: [gen/types.gen.ts:14915](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14915)
