---
title: "Type Alias: BatchOperationError"
sidebar_label: "BatchOperationError"
mdx:
  format: md
---

# Type Alias: BatchOperationError

```ts
type BatchOperationError = object;
```

Defined in: [gen/types.gen.ts:818](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L818)

## Properties

### message?

```ts
optional message: string;
```

Defined in: [gen/types.gen.ts:830](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L830)

The error message that occurred during the batch operation.

***

### partitionId?

```ts
optional partitionId: number;
```

Defined in: [gen/types.gen.ts:822](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L822)

The partition ID where the error occurred.

***

### type?

```ts
optional type: "QUERY_FAILED" | "RESULT_BUFFER_SIZE_EXCEEDED";
```

Defined in: [gen/types.gen.ts:826](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L826)

The type of the error that occurred during the batch operation.
