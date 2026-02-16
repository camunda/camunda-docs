---
title: "Type Alias: CompleteUserTaskData"
sidebar_label: "CompleteUserTaskData"
mdx:
  format: md
---

# Type Alias: CompleteUserTaskData

```ts
type CompleteUserTaskData = object;
```

Defined in: [gen/types.gen.ts:17333](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17333)

## Properties

### body?

```ts
optional body: UserTaskCompletionRequest;
```

Defined in: [gen/types.gen.ts:17334](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17334)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:17335](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17335)

#### userTaskKey

```ts
userTaskKey: UserTaskKey;
```

The key of the user task to complete.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:17341](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17341)

---

### url

```ts
url: "/user-tasks/{userTaskKey}/completion";
```

Defined in: [gen/types.gen.ts:17342](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17342)
