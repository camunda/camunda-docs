---
title: "Type Alias: ResolveIncidentsBatchOperationData"
sidebar_label: "ResolveIncidentsBatchOperationData"
mdx:
  format: md
---

# Type Alias: ResolveIncidentsBatchOperationData

```ts
type ResolveIncidentsBatchOperationData = object;
```

Defined in: [gen/types.gen.ts:13475](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13475)

## Properties

### body?

```ts
optional body: object;
```

Defined in: [gen/types.gen.ts:13479](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13479)

The process instance filter that defines which process instances should have their incidents resolved.

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

Defined in: [gen/types.gen.ts:13486](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13486)

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13487](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13487)

---

### url

```ts
url: "/process-instances/incident-resolution";
```

Defined in: [gen/types.gen.ts:13488](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13488)
