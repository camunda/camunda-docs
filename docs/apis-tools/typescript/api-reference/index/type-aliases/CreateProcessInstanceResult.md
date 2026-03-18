---
title: "Type Alias: CreateProcessInstanceResult"
sidebar_label: "CreateProcessInstanceResult"
mdx:
  format: md
---

# Type Alias: CreateProcessInstanceResult

```ts
type CreateProcessInstanceResult = object;
```

Defined in: [gen/types.gen.ts:5563](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5563)

## Properties

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5569](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5569)

The BPMN process id of the process definition which was used to create the process.
instance

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:5589](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5589)

The key of the process definition which was used to create the process instance.

---

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:5574](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5574)

The version of the process definition which was used to create the process instance.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:5595](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5595)

The unique identifier of the created process instance; to be used wherever a request
needs a process instance key (e.g. CancelProcessInstanceRequest).

---

### tags?

```ts
optional tags: TagSet;
```

Defined in: [gen/types.gen.ts:5596](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5596)

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5578](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5578)

The tenant id of the created process instance.

---

### variables

```ts
variables: object;
```

Defined in: [gen/types.gen.ts:5582](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5582)

All the variables visible in the root scope.

#### Index Signature

```ts
[key: string]: unknown
```
