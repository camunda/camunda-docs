---
title: "Type Alias: GetElementInstanceResponses"
sidebar_label: "GetElementInstanceResponses"
mdx:
  format: md
---

# Type Alias: GetElementInstanceResponses

```ts
type GetElementInstanceResponses = object;
```

Defined in: [gen/types.gen.ts:10415](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10415)

## Properties

### 200

```ts
200: object;
```

Defined in: [gen/types.gen.ts:10419](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10419)

The element instance is successfully returned.

#### elementId

```ts
elementId: ElementId;
```

The element ID for this element instance.

#### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

The assigned key, which acts as a unique identifier for this element instance.

#### elementName

```ts
elementName: string;
```

The element name for this element instance.

#### endDate?

```ts
optional endDate: string;
```

Date when element instance finished.

#### hasIncident

```ts
hasIncident: boolean;
```

Shows whether this element instance has an incident. If true also an incidentKey is provided.

#### incidentKey?

```ts
optional incidentKey: IncidentKey;
```

Incident key associated with this element instance.

#### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

The process definition ID associated to this element instance.

#### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The process definition key associated to this element instance.

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The process instance key associated to this element instance.

#### rootProcessInstanceKey?

```ts
optional rootProcessInstanceKey: ProcessInstanceKey;
```

#### startDate

```ts
startDate: string;
```

Date when element instance started.

#### state

```ts
state: ElementInstanceStateEnum;
```

State of element instance as defined set of values.

#### tenantId

```ts
tenantId: TenantId;
```

The tenant ID of the incident.

#### type

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

Type of element as defined set of values.
