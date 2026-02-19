---
title: "Type Alias: GetIncidentResponses"
sidebar_label: "GetIncidentResponses"
mdx:
  format: md
---

# Type Alias: GetIncidentResponses

```ts
type GetIncidentResponses = object;
```

Defined in: [gen/types.gen.ts:11492](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11492)

## Properties

### 200

```ts
200: object;
```

Defined in: [gen/types.gen.ts:11496](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11496)

The incident is successfully returned.

#### creationTime?

```ts
optional creationTime: string;
```

#### elementId?

```ts
optional elementId: ElementId;
```

The element ID associated to this incident.

#### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKey;
```

The element instance key associated to this incident.

#### errorMessage?

```ts
optional errorMessage: string;
```

Error message which describes the error in more detail.

#### errorType?

```ts
optional errorType: IncidentErrorTypeEnum;
```

#### incidentKey?

```ts
optional incidentKey: IncidentKey;
```

The assigned key, which acts as a unique identifier for this incident.

#### jobKey?

```ts
optional jobKey: JobKey;
```

The job key, if exists, associated with this incident.

#### processDefinitionId?

```ts
optional processDefinitionId: ProcessDefinitionId;
```

The process definition ID associated to this incident.

#### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

The process definition key associated to this incident.

#### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

The process instance key associated to this incident.

#### rootProcessInstanceKey?

```ts
optional rootProcessInstanceKey: ProcessInstanceKey;
```

#### state?

```ts
optional state: IncidentStateEnum;
```

#### tenantId?

```ts
optional tenantId: TenantId;
```

The tenant ID of the incident.
