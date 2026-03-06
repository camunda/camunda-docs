---
title: "Type Alias: BaseProcessInstanceFilterFields"
sidebar_label: "BaseProcessInstanceFilterFields"
mdx:
  format: md
---

# Type Alias: BaseProcessInstanceFilterFields

```ts
type BaseProcessInstanceFilterFields = object;
```

Defined in: [gen/types.gen.ts:6226](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6226)

Base process instance search filter.

## Properties

### batchOperationId?

```ts
optional batchOperationId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:6266](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6266)

The batch operation id.

***

### elementId?

```ts
optional elementId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:6282](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6282)

The element id associated with the process instance.

***

### elementInstanceState?

```ts
optional elementInstanceState: ElementInstanceStateFilterProperty;
```

Defined in: [gen/types.gen.ts:6278](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6278)

The state of the element instances associated with the process instance.

***

### endDate?

```ts
optional endDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:6234](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6234)

The end date.

***

### errorMessage?

```ts
optional errorMessage: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:6270](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6270)

The error message related to the process.

***

### hasElementInstanceIncident?

```ts
optional hasElementInstanceIncident: boolean;
```

Defined in: [gen/types.gen.ts:6286](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6286)

Whether the element instance has an incident or not.

***

### hasIncident?

```ts
optional hasIncident: boolean;
```

Defined in: [gen/types.gen.ts:6242](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6242)

Whether this process instance has a related incident or not.

***

### hasRetriesLeft?

```ts
optional hasRetriesLeft: boolean;
```

Defined in: [gen/types.gen.ts:6274](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6274)

Whether the process has failed jobs with retries left.

***

### incidentErrorHashCode?

```ts
optional incidentErrorHashCode: IntegerFilterProperty;
```

Defined in: [gen/types.gen.ts:6290](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6290)

The incident error hash code, associated with this process.

***

### parentElementInstanceKey?

```ts
optional parentElementInstanceKey: ElementInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:6262](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6262)

The parent element instance key.

***

### parentProcessInstanceKey?

```ts
optional parentProcessInstanceKey: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:6258](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6258)

The parent process instance key.

***

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:6254](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6254)

The key of this process instance.

***

### startDate?

```ts
optional startDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:6230](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6230)

The start date.

***

### state?

```ts
optional state: ProcessInstanceStateFilterProperty;
```

Defined in: [gen/types.gen.ts:6238](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6238)

The process instance state.

***

### tags?

```ts
optional tags: TagSet;
```

Defined in: [gen/types.gen.ts:6291](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6291)

***

### tenantId?

```ts
optional tenantId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:6246](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6246)

The tenant id.

***

### variables?

```ts
optional variables: VariableValueFilterProperty[];
```

Defined in: [gen/types.gen.ts:6250](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6250)

The process instance variables.
