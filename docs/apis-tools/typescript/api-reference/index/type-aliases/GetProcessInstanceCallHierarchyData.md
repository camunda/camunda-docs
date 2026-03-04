---
title: "Type Alias: GetProcessInstanceCallHierarchyData"
sidebar_label: "GetProcessInstanceCallHierarchyData"
mdx:
  format: md
---

# Type Alias: GetProcessInstanceCallHierarchyData

```ts
type GetProcessInstanceCallHierarchyData = object;
```

Defined in: [gen/types.gen.ts:13880](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13880)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:13881](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13881)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13882](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13882)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance to fetch the hierarchy for.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13888](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13888)

---

### url

```ts
url: "/process-instances/{processInstanceKey}/call-hierarchy";
```

Defined in: [gen/types.gen.ts:13889](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13889)
