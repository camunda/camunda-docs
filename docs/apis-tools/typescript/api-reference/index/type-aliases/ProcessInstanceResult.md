---
title: "Type Alias: ProcessInstanceResult"
sidebar_label: "ProcessInstanceResult"
mdx:
  format: md
---

# Type Alias: ProcessInstanceResult

```ts
type ProcessInstanceResult = object;
```

Defined in: [gen/types.gen.ts:5811](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5811)

Process instance search response item.

## Properties

### endDate?

```ts
optional endDate: string;
```

Defined in: [gen/types.gen.ts:5823](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5823)

---

### hasIncident

```ts
hasIncident: boolean;
```

Defined in: [gen/types.gen.ts:5828](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5828)

Whether this process instance has a related incident or not.

---

### parentElementInstanceKey?

```ts
optional parentElementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:5845](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5845)

The parent element instance key.

---

### parentProcessInstanceKey?

```ts
optional parentProcessInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:5841](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5841)

The parent process instance key.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5812](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5812)

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:5837](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5837)

The process definition key.

---

### processDefinitionName

```ts
processDefinitionName: string;
```

Defined in: [gen/types.gen.ts:5816](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5816)

The process definition name.

---

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:5817](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5817)

---

### processDefinitionVersionTag?

```ts
optional processDefinitionVersionTag: string;
```

Defined in: [gen/types.gen.ts:5821](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5821)

The process definition version tag.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:5833](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5833)

The key of this process instance.

---

### rootProcessInstanceKey?

```ts
optional rootProcessInstanceKey: RootProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:5846](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5846)

---

### startDate

```ts
startDate: string;
```

Defined in: [gen/types.gen.ts:5822](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5822)

---

### state

```ts
state: ProcessInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:5824](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5824)

---

### tags?

```ts
optional tags: TagSet;
```

Defined in: [gen/types.gen.ts:5847](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5847)

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5829](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5829)
