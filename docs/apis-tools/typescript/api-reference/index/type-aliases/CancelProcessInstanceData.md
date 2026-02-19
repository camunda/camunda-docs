---
title: "Type Alias: CancelProcessInstanceData"
sidebar_label: "CancelProcessInstanceData"
mdx:
  format: md
---

# Type Alias: CancelProcessInstanceData

```ts
type CancelProcessInstanceData = object;
```

Defined in: [gen/types.gen.ts:13926](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13926)

## Properties

### body?

```ts
optional body:
  | {
  operationReference?: OperationReference;
}
  | null;
```

Defined in: [gen/types.gen.ts:13927](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13927)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13930](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13930)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance to cancel.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13936](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13936)

---

### url

```ts
url: "/process-instances/{processInstanceKey}/cancellation";
```

Defined in: [gen/types.gen.ts:13937](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13937)
