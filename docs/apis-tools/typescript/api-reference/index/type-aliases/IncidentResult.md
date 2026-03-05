---
title: "Type Alias: IncidentResult"
sidebar_label: "IncidentResult"
mdx:
  format: md
---

# Type Alias: IncidentResult

```ts
type IncidentResult = object;
```

Defined in: [gen/types.gen.ts:3157](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3157)

## Properties

### creationTime?

```ts
optional creationTime: string;
```

Defined in: [gen/types.gen.ts:3171](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3171)

---

### elementId?

```ts
optional elementId: ElementId;
```

Defined in: [gen/types.gen.ts:3170](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3170)

The element ID associated to this incident.

---

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:3193](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3193)

The element instance key associated to this incident.

---

### errorMessage?

```ts
optional errorMessage: string;
```

Defined in: [gen/types.gen.ts:3166](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3166)

Error message which describes the error in more detail.

---

### errorType?

```ts
optional errorType: IncidentErrorTypeEnum;
```

Defined in: [gen/types.gen.ts:3162](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3162)

---

### incidentKey?

```ts
optional incidentKey: IncidentKey;
```

Defined in: [gen/types.gen.ts:3180](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3180)

The assigned key, which acts as a unique identifier for this incident.

---

### jobKey?

```ts
optional jobKey: JobKey;
```

Defined in: [gen/types.gen.ts:3197](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3197)

The job key, if exists, associated with this incident.

---

### processDefinitionId?

```ts
optional processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:3161](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3161)

The process definition ID associated to this incident.

---

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:3184](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3184)

The process definition key associated to this incident.

---

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:3188](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3188)

The process instance key associated to this incident.

---

### rootProcessInstanceKey?

```ts
optional rootProcessInstanceKey: RootProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:3189](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3189)

---

### state?

```ts
optional state: IncidentStateEnum;
```

Defined in: [gen/types.gen.ts:3172](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3172)

---

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:3176](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3176)

The tenant ID of the incident.
