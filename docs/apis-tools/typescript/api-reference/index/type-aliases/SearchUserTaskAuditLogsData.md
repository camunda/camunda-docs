---
title: "Type Alias: SearchUserTaskAuditLogsData"
sidebar_label: "SearchUserTaskAuditLogsData"
mdx:
  format: md
---

# Type Alias: SearchUserTaskAuditLogsData

```ts
type SearchUserTaskAuditLogsData = object;
```

Defined in: [gen/types.gen.ts:17175](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17175)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:17179](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17179)

User task search query request.

#### Type Declaration

##### filter?

```ts
optional filter: UserTaskAuditLogFilter;
```

##### sort?

```ts
optional sort: AuditLogSearchQuerySortRequest[];
```

Sort field criteria.

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:17186](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17186)

#### userTaskKey

```ts
userTaskKey: UserTaskKey;
```

The key of the user task.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:17192](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17192)

---

### url

```ts
url: "/user-tasks/{userTaskKey}/audit-logs/search";
```

Defined in: [gen/types.gen.ts:17193](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17193)
