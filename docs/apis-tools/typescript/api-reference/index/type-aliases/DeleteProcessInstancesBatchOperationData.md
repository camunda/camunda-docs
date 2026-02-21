---
title: "Type Alias: DeleteProcessInstancesBatchOperationData"
sidebar_label: "DeleteProcessInstancesBatchOperationData"
mdx:
  format: md
---

# Type Alias: DeleteProcessInstancesBatchOperationData

```ts
type DeleteProcessInstancesBatchOperationData = object;
```

Defined in: [gen/types.gen.ts:13428](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13428)

## Properties

### body

```ts
body: object;
```

Defined in: [gen/types.gen.ts:13432](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13432)

The process instance filter that defines which process instances should be deleted.

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

Defined in: [gen/types.gen.ts:13439](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13439)

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13440](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13440)

---

### url

```ts
url: "/process-instances/deletion";
```

Defined in: [gen/types.gen.ts:13441](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13441)
