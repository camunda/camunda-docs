---
title: "Type Alias: UpdateUserTaskData"
sidebar_label: "UpdateUserTaskData"
mdx:
  format: md
---

# Type Alias: UpdateUserTaskData

```ts
type UpdateUserTaskData = object;
```

Defined in: [gen/types.gen.ts:17031](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17031)

## Properties

### body?

```ts
optional body: UserTaskUpdateRequest;
```

Defined in: [gen/types.gen.ts:17032](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17032)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:17033](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17033)

#### userTaskKey

```ts
userTaskKey: UserTaskKey;
```

The key of the user task to update.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:17039](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17039)

---

### url

```ts
url: "/user-tasks/{userTaskKey}";
```

Defined in: [gen/types.gen.ts:17040](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17040)
