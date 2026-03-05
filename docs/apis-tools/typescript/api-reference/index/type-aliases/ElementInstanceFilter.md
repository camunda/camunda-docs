---
title: "Type Alias: ElementInstanceFilter"
sidebar_label: "ElementInstanceFilter"
mdx:
  format: md
---

# Type Alias: ElementInstanceFilter

```ts
type ElementInstanceFilter = object;
```

Defined in: [gen/types.gen.ts:2544](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2544)

Element instance filter.

## Properties

### elementId?

```ts
optional elementId: ElementId;
```

Defined in: [gen/types.gen.ts:2560](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2560)

The element ID for this element instance.

***

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:2574](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2574)

The assigned key, which acts as a unique identifier for this element instance.

***

### elementInstanceScopeKey?

```ts
optional elementInstanceScopeKey: 
  | ElementInstanceKey
  | ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:2599](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2599)

The scope key of this element instance. If provided with a process instance key it will return element instances that are immediate children of the process instance. If provided with an element instance key it will return element instances that are immediate children of the element instance.

***

### elementName?

```ts
optional elementName: string;
```

Defined in: [gen/types.gen.ts:2565](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2565)

The element name. This only works for data created with 8.8 and onwards. Instances from prior versions don't contain this data and cannot be found.

***

### endDate?

```ts
optional endDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:2594](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2594)

The end date of this element instance.

***

### hasIncident?

```ts
optional hasIncident: boolean;
```

Defined in: [gen/types.gen.ts:2569](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2569)

Shows whether this element instance has an incident related to.

***

### incidentKey?

```ts
optional incidentKey: IncidentKey;
```

Defined in: [gen/types.gen.ts:2586](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2586)

The key of incident if field incident is true.

***

### processDefinitionId?

```ts
optional processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:2548](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2548)

The process definition ID associated to this element instance.

***

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:2582](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2582)

The process definition key associated to this element instance.

***

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:2578](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2578)

The process instance key associated to this element instance.

***

### startDate?

```ts
optional startDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:2590](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2590)

The start date of this element instance.

***

### state?

```ts
optional state: ElementInstanceStateFilterProperty;
```

Defined in: [gen/types.gen.ts:2552](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2552)

State of element instance as defined set of values.

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2570](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2570)

***

### type?

```ts
optional type: 
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

Defined in: [gen/types.gen.ts:2556](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2556)

Type of element as defined set of values.
