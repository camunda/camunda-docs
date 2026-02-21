---
title: "Type Alias: DeleteResourceData"
sidebar_label: "DeleteResourceData"
mdx:
  format: md
---

# Type Alias: DeleteResourceData

```ts
type DeleteResourceData = object;
```

Defined in: [gen/types.gen.ts:14462](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14462)

## Properties

### body?

```ts
optional body:
  | {
  deleteHistory?: boolean;
  operationReference?: OperationReference;
}
  | null;
```

Defined in: [gen/types.gen.ts:14463](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14463)

#### Type Declaration

```ts
{
  deleteHistory?: boolean;
  operationReference?: OperationReference;
}
```

#### deleteHistory?

```ts
optional deleteHistory: boolean;
```

Indicates if the historic data of a process resource should be deleted via a
batch operation asynchronously.

This flag is only effective for process resources. For other resource types
(decisions, forms, generic resources), this flag is ignored and no history
will be deleted. In those cases, the `batchOperation` field in the response
will not be populated.

#### operationReference?

```ts
optional operationReference: OperationReference;
```

`null`

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:14477](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14477)

#### resourceKey

```ts
resourceKey: ResourceKey;
```

The key of the resource to delete.
This can be the key of a process definition, the key of a decision requirements
definition or the key of a form definition

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:14486](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14486)

---

### url

```ts
url: "/resources/{resourceKey}/deletion";
```

Defined in: [gen/types.gen.ts:14487](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14487)
