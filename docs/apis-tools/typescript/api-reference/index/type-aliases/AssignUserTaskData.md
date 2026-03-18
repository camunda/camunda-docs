---
title: "Type Alias: AssignUserTaskData"
sidebar_label: "AssignUserTaskData"
mdx:
  format: md
---

# Type Alias: AssignUserTaskData

```ts
type AssignUserTaskData = object;
```

Defined in: [gen/types.gen.ts:17127](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17127)

## Properties

### body

```ts
body: UserTaskAssignmentRequest;
```

Defined in: [gen/types.gen.ts:17128](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17128)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:17129](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17129)

#### userTaskKey

```ts
userTaskKey: UserTaskKey;
```

The key of the user task to assign.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:17135](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17135)

---

### url

```ts
url: "/user-tasks/{userTaskKey}/assignment";
```

Defined in: [gen/types.gen.ts:17136](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17136)
