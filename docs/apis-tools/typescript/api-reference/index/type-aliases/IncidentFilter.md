---
title: "Type Alias: IncidentFilter"
sidebar_label: "IncidentFilter"
mdx:
  format: md
---

# Type Alias: IncidentFilter

```ts
type IncidentFilter = object;
```

Defined in: [gen/types.gen.ts:3013](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3013)

Incident search filter.

## Properties

### creationTime?

```ts
optional creationTime: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:3033](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3033)

Date of incident creation.

---

### elementId?

```ts
optional elementId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3029](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3029)

The element ID associated to this incident.

---

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:3057](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3057)

The element instance key associated to this incident.

---

### errorMessage?

```ts
optional errorMessage: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3025](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3025)

The error message of this incident.

---

### errorType?

```ts
optional errorType: IncidentErrorTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:3021](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3021)

Incident error type with a defined set of values.

---

### incidentKey?

```ts
optional incidentKey: BasicStringFilterProperty;
```

Defined in: [gen/types.gen.ts:3045](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3045)

The assigned key, which acts as a unique identifier for this incident.

---

### jobKey?

```ts
optional jobKey: JobKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:3061](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3061)

The job key, if exists, associated with this incident.

---

### processDefinitionId?

```ts
optional processDefinitionId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3017](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3017)

The process definition ID associated to this incident.

---

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:3049](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3049)

The process definition key associated to this incident.

---

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:3053](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3053)

The process instance key associated to this incident.

---

### state?

```ts
optional state: IncidentStateFilterProperty;
```

Defined in: [gen/types.gen.ts:3037](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3037)

State of this incident with a defined set of values.

---

### tenantId?

```ts
optional tenantId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3041](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3041)

The tenant ID of the incident.
