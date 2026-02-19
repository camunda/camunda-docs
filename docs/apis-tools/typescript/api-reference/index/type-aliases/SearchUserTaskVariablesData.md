---
title: "Type Alias: SearchUserTaskVariablesData"
sidebar_label: "SearchUserTaskVariablesData"
mdx:
  format: md
---

# Type Alias: SearchUserTaskVariablesData

```ts
type SearchUserTaskVariablesData = object;
```

Defined in: [gen/types.gen.ts:17454](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17454)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:17458](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17458)

User task search query request.

#### Type Declaration

##### filter?

```ts
optional filter: object;
```

The user task variable search filters.

###### filter.name?

```ts
optional name: StringFilterProperty;
```

Name of the variable.

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

Defined in: [gen/types.gen.ts:17479](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17479)

#### userTaskKey

```ts
userTaskKey: UserTaskKey;
```

The key of the user task.

---

### query?

```ts
optional query: object;
```

Defined in: [gen/types.gen.ts:17485](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17485)

#### truncateValues?

```ts
optional truncateValues: boolean;
```

When true (default), long variable values in the response are truncated. When false, full variable values are returned.

---

### url

```ts
url: "/user-tasks/{userTaskKey}/variables/search";
```

Defined in: [gen/types.gen.ts:17491](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17491)
