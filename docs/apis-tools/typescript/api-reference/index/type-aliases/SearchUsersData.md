---
title: "Type Alias: SearchUsersData"
sidebar_label: "SearchUsersData"
mdx:
  format: md
---

# Type Alias: SearchUsersData

```ts
type SearchUsersData = object;
```

Defined in: [gen/types.gen.ts:16494](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16494)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:16495](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16495)

#### Type Declaration

##### filter?

```ts
optional filter: UserFilter;
```

The user search filters.

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

Defined in: [gen/types.gen.ts:16511](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16511)

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:16512](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16512)

---

### url

```ts
url: "/users/search";
```

Defined in: [gen/types.gen.ts:16513](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16513)
