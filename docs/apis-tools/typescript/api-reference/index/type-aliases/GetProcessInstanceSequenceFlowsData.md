---
title: "Type Alias: GetProcessInstanceSequenceFlowsData"
sidebar_label: "GetProcessInstanceSequenceFlowsData"
mdx:
  format: md
---

# Type Alias: GetProcessInstanceSequenceFlowsData

```ts
type GetProcessInstanceSequenceFlowsData = object;
```

Defined in: [gen/types.gen.ts:14282](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14282)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:14283](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14283)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:14284](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14284)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The assigned key of the process instance, which acts as a unique identifier for this process instance.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:14290](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14290)

---

### url

```ts
url: "/process-instances/{processInstanceKey}/sequence-flows";
```

Defined in: [gen/types.gen.ts:14291](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14291)
