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

Defined in: [gen/types.gen.ts:7531](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7531)

User task filter request.

## Properties

### assignee?

```ts
optional assignee: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7539](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7539)

The assignee of the user task.

***

### candidateGroup?

```ts
optional candidateGroup: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7556](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7556)

The candidate group for this user task.

***

### candidateUser?

```ts
optional candidateUser: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7560](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7560)

The candidate user for this user task.

***

### completionDate?

```ts
optional completionDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:7576](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7576)

The user task completion date.

***

### creationDate?

```ts
optional creationDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:7572](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7572)

The user task creation date.

***

### dueDate?

```ts
optional dueDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:7584](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7584)

The user task due date.

***

### elementId?

```ts
optional elementId: ElementId;
```

Defined in: [gen/types.gen.ts:7547](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7547)

The element ID of the user task.

***

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:7608](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7608)

The key of the element instance.

***

### followUpDate?

```ts
optional followUpDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:7580](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7580)

The user task follow-up date.

***

### localVariables?

```ts
optional localVariables: VariableValueFilterProperty[];
```

Defined in: [gen/types.gen.ts:7592](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7592)

The local variables of the user task.

***

### name?

```ts
optional name: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7552](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7552)

The task name. This only works for data created with 8.8 and onwards. Instances from prior versions don't contain this data and cannot be found.

***

### priority?

```ts
optional priority: IntegerFilterProperty;
```

Defined in: [gen/types.gen.ts:7543](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7543)

The priority of the user task.

***

### processDefinitionId?

```ts
optional processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:7568](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7568)

The ID of the process definition.

***

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:7600](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7600)

The key of the process definition.

***

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:7604](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7604)

The key of the process instance.

***

### processInstanceVariables?

```ts
optional processInstanceVariables: VariableValueFilterProperty[];
```

Defined in: [gen/types.gen.ts:7588](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7588)

The variables of the process instance.

***

### state?

```ts
optional state: UserTaskStateFilterProperty;
```

Defined in: [gen/types.gen.ts:7535](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7535)

The user task state.

***

### tags?

```ts
optional tags: TagSet;
```

Defined in: [gen/types.gen.ts:7609](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7609)

***

### tenantId?

```ts
optional tenantId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7564](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7564)

Tenant ID of this user task.

***

### userTaskKey?

```ts
optional userTaskKey: UserTaskKey;
```

Defined in: [gen/types.gen.ts:7596](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7596)

The key for this user task.
