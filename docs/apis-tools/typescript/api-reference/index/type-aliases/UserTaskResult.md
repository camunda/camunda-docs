---
title: "Type Alias: UserTaskResult"
sidebar_label: "UserTaskResult"
mdx:
  format: md
---

# Type Alias: UserTaskResult

```ts
type UserTaskResult = object;
```

Defined in: [gen/types.gen.ts:7508](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7508)

## Properties

### assignee

```ts
assignee: string | null;
```

Defined in: [gen/types.gen.ts:7517](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7517)

The assignee of the user task.

***

### candidateGroups

```ts
candidateGroups: string[];
```

Defined in: [gen/types.gen.ts:7525](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7525)

The candidate groups for this user task.

***

### candidateUsers

```ts
candidateUsers: string[];
```

Defined in: [gen/types.gen.ts:7529](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7529)

The candidate users for this user task.

***

### completionDate

```ts
completionDate: string | null;
```

Defined in: [gen/types.gen.ts:7541](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7541)

The completion date of a user task.

***

### creationDate?

```ts
optional creationDate: string;
```

Defined in: [gen/types.gen.ts:7537](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7537)

The creation date of a user task.

***

### customHeaders

```ts
customHeaders: object;
```

Defined in: [gen/types.gen.ts:7562](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7562)

Custom headers for the user task.

#### Index Signature

```ts
[key: string]: string
```

***

### dueDate

```ts
dueDate: string | null;
```

Defined in: [gen/types.gen.ts:7549](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7549)

The due date of a user task.

***

### elementId?

```ts
optional elementId: ElementId;
```

Defined in: [gen/types.gen.ts:7521](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7521)

The element ID of the user task.

***

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:7576](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7576)

The key of the element instance.

***

### externalFormReference

```ts
externalFormReference: string | null;
```

Defined in: [gen/types.gen.ts:7554](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7554)

The external form reference.

***

### followUpDate

```ts
followUpDate: string | null;
```

Defined in: [gen/types.gen.ts:7545](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7545)

The follow date of a user task.

***

### formKey

```ts
formKey: FormKey | null;
```

Defined in: [gen/types.gen.ts:7601](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7601)

The key of the form.

***

### name?

```ts
optional name: string;
```

Defined in: [gen/types.gen.ts:7512](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7512)

The name for this user task.

***

### priority?

```ts
optional priority: number;
```

Defined in: [gen/types.gen.ts:7568](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7568)

The priority of a user task. The higher the value the higher the priority.

***

### processDefinitionId?

```ts
optional processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:7533](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7533)

The ID of the process definition.

***

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:7586](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7586)

The key of the process definition.

***

### processDefinitionVersion?

```ts
optional processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:7558](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7558)

The version of the process definition.

***

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:7590](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7590)

The key of the process instance.

***

### processName?

```ts
optional processName: string | null;
```

Defined in: [gen/types.gen.ts:7582](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7582)

The name of the process definition.
This is `null` if the process has no name defined.

***

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:7597](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7597)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

***

### state?

```ts
optional state: UserTaskStateEnum;
```

Defined in: [gen/types.gen.ts:7513](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7513)

***

### tags

```ts
tags: TagSet;
```

Defined in: [gen/types.gen.ts:7602](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7602)

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:7550](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7550)

***

### userTaskKey?

```ts
optional userTaskKey: UserTaskKey;
```

Defined in: [gen/types.gen.ts:7572](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7572)

The key of the user task.
