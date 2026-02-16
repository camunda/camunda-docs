---
title: "Type Alias: ElementInstanceResult"
sidebar_label: "ElementInstanceResult"
mdx:
  format: md
---

# Type Alias: ElementInstanceResult

```ts
type ElementInstanceResult = object;
```

Defined in: [gen/types.gen.ts:2498](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2498)

## Properties

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:2514](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2514)

The element ID for this element instance.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:2538](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2538)

The assigned key, which acts as a unique identifier for this element instance.

---

### elementName

```ts
elementName: string;
```

Defined in: [gen/types.gen.ts:2518](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2518)

The element name for this element instance.

---

### endDate?

```ts
optional endDate: string;
```

Defined in: [gen/types.gen.ts:2510](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2510)

Date when element instance finished.

---

### hasIncident

```ts
hasIncident: boolean;
```

Defined in: [gen/types.gen.ts:2530](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2530)

Shows whether this element instance has an incident. If true also an incidentKey is provided.

---

### incidentKey?

```ts
optional incidentKey: IncidentKey;
```

Defined in: [gen/types.gen.ts:2551](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2551)

Incident key associated with this element instance.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:2502](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2502)

The process definition ID associated to this element instance.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:2547](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2547)

The process definition key associated to this element instance.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:2542](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2542)

The process instance key associated to this element instance.

---

### rootProcessInstanceKey?

```ts
optional rootProcessInstanceKey: RootProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:2543](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2543)

---

### startDate

```ts
startDate: string;
```

Defined in: [gen/types.gen.ts:2506](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2506)

Date when element instance started.

---

### state

```ts
state: ElementInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:2526](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2526)

State of element instance as defined set of values.

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2534](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2534)

The tenant ID of the incident.

---

### type

```ts
type:
  | "UNSPECIFIED"
  | "PROCESS"
  | "SUB_PROCESS"
  | "EVENT_SUB_PROCESS"
  | "AD_HOC_SUB_PROCESS"
  | "AD_HOC_SUB_PROCESS_INNER_INSTANCE"
  | "START_EVENT"
  | "INTERMEDIATE_CATCH_EVENT"
  | "INTERMEDIATE_THROW_EVENT"
  | "BOUNDARY_EVENT"
  | "END_EVENT"
  | "SERVICE_TASK"
  | "RECEIVE_TASK"
  | "USER_TASK"
  | "MANUAL_TASK"
  | "TASK"
  | "EXCLUSIVE_GATEWAY"
  | "INCLUSIVE_GATEWAY"
  | "PARALLEL_GATEWAY"
  | "EVENT_BASED_GATEWAY"
  | "SEQUENCE_FLOW"
  | "MULTI_INSTANCE_BODY"
  | "CALL_ACTIVITY"
  | "BUSINESS_RULE_TASK"
  | "SCRIPT_TASK"
  | "SEND_TASK"
  | "UNKNOWN";
```

Defined in: [gen/types.gen.ts:2522](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2522)

Type of element as defined set of values.
