---
title: "Type Alias: UserTaskFilter"
sidebar_label: "UserTaskFilter"
mdx:
  format: md
---

# Type Alias: UserTaskFilter

```ts
type UserTaskFilter = object;
```

Defined in: [gen/types.gen.ts:7417](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7417)

User task filter request.

## Properties

### assignee?

```ts
optional assignee: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7425](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7425)

The assignee of the user task.

***

### candidateGroup?

```ts
optional candidateGroup: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7442](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7442)

The candidate group for this user task.

***

### candidateUser?

```ts
optional candidateUser: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7446](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7446)

The candidate user for this user task.

***

### completionDate?

```ts
optional completionDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:7462](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7462)

The user task completion date.

***

### creationDate?

```ts
optional creationDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:7458](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7458)

The user task creation date.

***

### dueDate?

```ts
optional dueDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:7470](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7470)

The user task due date.

***

### elementId?

```ts
optional elementId: ElementId;
```

Defined in: [gen/types.gen.ts:7433](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7433)

The element ID of the user task.

***

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:7494](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7494)

The key of the element instance.

***

### followUpDate?

```ts
optional followUpDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:7466](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7466)

The user task follow-up date.

***

### localVariables?

```ts
optional localVariables: VariableValueFilterProperty[];
```

Defined in: [gen/types.gen.ts:7478](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7478)

The local variables of the user task.

***

### name?

```ts
optional name: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7438](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7438)

The task name. This only works for data created with 8.8 and onwards. Instances from prior versions don't contain this data and cannot be found.

***

### priority?

```ts
optional priority: IntegerFilterProperty;
```

Defined in: [gen/types.gen.ts:7429](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7429)

The priority of the user task.

***

### processDefinitionId?

```ts
optional processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:7454](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7454)

The ID of the process definition.

***

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:7486](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7486)

The key of the process definition.

***

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:7490](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7490)

The key of the process instance.

***

### processInstanceVariables?

```ts
optional processInstanceVariables: VariableValueFilterProperty[];
```

Defined in: [gen/types.gen.ts:7474](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7474)

The variables of the process instance.

***

### state?

```ts
optional state: UserTaskStateFilterProperty;
```

Defined in: [gen/types.gen.ts:7421](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7421)

The user task state.

***

### tags?

```ts
optional tags: TagSet;
```

Defined in: [gen/types.gen.ts:7495](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7495)

***

### tenantId?

```ts
optional tenantId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7450](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7450)

Tenant ID of this user task.

***

### userTaskKey?

```ts
optional userTaskKey: UserTaskKey;
```

Defined in: [gen/types.gen.ts:7482](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7482)

The key for this user task.
