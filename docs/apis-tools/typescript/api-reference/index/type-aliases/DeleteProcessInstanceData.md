---
title: "Type Alias: DeleteProcessInstanceData"
sidebar_label: "DeleteProcessInstanceData"
mdx:
  format: md
---

# Type Alias: DeleteProcessInstanceData

```ts
type DeleteProcessInstanceData = object;
```

Defined in: [gen/types.gen.ts:13971](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13971)

## Properties

### body?

```ts
optional body:
  | {
  operationReference?: OperationReference;
}
  | null;
```

Defined in: [gen/types.gen.ts:13972](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13972)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13975](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13975)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance to delete.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13981](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13981)

---

### url

```ts
url: "/process-instances/{processInstanceKey}/deletion";
```

Defined in: [gen/types.gen.ts:13982](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13982)
