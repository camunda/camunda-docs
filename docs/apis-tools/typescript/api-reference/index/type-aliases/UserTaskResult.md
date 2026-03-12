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

Defined in: [gen/types.gen.ts:7622](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7622)

## Properties

### assignee

```ts
assignee: string | null;
```

Defined in: [gen/types.gen.ts:7631](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7631)

The assignee of the user task.

***

### candidateGroups

```ts
candidateGroups: string[];
```

Defined in: [gen/types.gen.ts:7639](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7639)

The candidate groups for this user task.

***

### candidateUsers

```ts
candidateUsers: string[];
```

Defined in: [gen/types.gen.ts:7643](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7643)

The candidate users for this user task.

***

### completionDate

```ts
completionDate: string | null;
```

Defined in: [gen/types.gen.ts:7655](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7655)

The completion date of a user task.

***

### creationDate

```ts
creationDate: string;
```

Defined in: [gen/types.gen.ts:7651](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7651)

The creation date of a user task.

***

### customHeaders

```ts
customHeaders: object;
```

Defined in: [gen/types.gen.ts:7676](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7676)

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

Defined in: [gen/types.gen.ts:7663](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7663)

The due date of a user task.

***

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:7635](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7635)

The element ID of the user task.

***

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:7690](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7690)

The key of the element instance.

***

### externalFormReference

```ts
externalFormReference: string | null;
```

Defined in: [gen/types.gen.ts:7668](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7668)

The external form reference.

***

### followUpDate

```ts
followUpDate: string | null;
```

Defined in: [gen/types.gen.ts:7659](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7659)

The follow date of a user task.

***

### formKey

```ts
formKey: FormKey | null;
```

Defined in: [gen/types.gen.ts:7715](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7715)

The key of the form.

***

### name

```ts
name: string | null;
```

Defined in: [gen/types.gen.ts:7626](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7626)

The name for this user task.

***

### priority

```ts
priority: number;
```

Defined in: [gen/types.gen.ts:7682](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7682)

The priority of a user task. The higher the value the higher the priority.

***

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:7647](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7647)

The ID of the process definition.

***

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:7700](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7700)

The key of the process definition.

***

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:7672](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7672)

The version of the process definition.

***

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:7704](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7704)

The key of the process instance.

***

### processName

```ts
processName: string | null;
```

Defined in: [gen/types.gen.ts:7696](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7696)

The name of the process definition.
This is `null` if the process has no name defined.

***

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:7711](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7711)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

***

### state

```ts
state: UserTaskStateEnum;
```

Defined in: [gen/types.gen.ts:7627](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7627)

***

### tags

```ts
tags: TagSet;
```

Defined in: [gen/types.gen.ts:7716](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7716)

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:7664](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7664)

***

### userTaskKey

```ts
userTaskKey: UserTaskKey;
```

Defined in: [gen/types.gen.ts:7686](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7686)

The key of the user task.
