---
title: "Type Alias: CancelProcessInstancesBatchOperationData"
sidebar_label: "CancelProcessInstancesBatchOperationData"
mdx:
  format: md
---

# Type Alias: CancelProcessInstancesBatchOperationData

```ts
type CancelProcessInstancesBatchOperationData = object;
```

Defined in: [gen/types.gen.ts:13381](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13381)

## Properties

### body

```ts
body: object;
```

Defined in: [gen/types.gen.ts:13385](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13385)

The process instance filter that defines which process instances should be canceled.

#### filter

```ts
filter: ProcessInstanceFilter;
```

The process instance filter.

#### operationReference?

```ts
optional operationReference: OperationReference;
```

---

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:13392](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13392)

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13393](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13393)

---

### url

```ts
url: "/process-instances/cancellation";
```

Defined in: [gen/types.gen.ts:13394](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13394)
