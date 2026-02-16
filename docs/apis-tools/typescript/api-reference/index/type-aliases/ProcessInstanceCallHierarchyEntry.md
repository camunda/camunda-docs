---
title: "Type Alias: ProcessInstanceCallHierarchyEntry"
sidebar_label: "ProcessInstanceCallHierarchyEntry"
mdx:
  format: md
---

# Type Alias: ProcessInstanceCallHierarchyEntry

```ts
type ProcessInstanceCallHierarchyEntry = object;
```

Defined in: [gen/types.gen.ts:5858](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5858)

## Properties

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:5866](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5866)

The key of the process definition.

---

### processDefinitionName

```ts
processDefinitionName: string;
```

Defined in: [gen/types.gen.ts:5870](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5870)

The name of the process definition (fall backs to the process definition id if not available).

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:5862](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5862)

The key of the process instance.
