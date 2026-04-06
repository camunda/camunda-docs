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

Defined in: [gen/types.gen.ts:7541](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7541)

User task filter request.

## Properties

### assignee?

```ts
optional assignee?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7549](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7549)

The assignee of the user task.

---

### candidateGroup?

```ts
optional candidateGroup?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7566](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7566)

The candidate group for this user task.

---

### candidateUser?

```ts
optional candidateUser?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7570](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7570)

The candidate user for this user task.

---

### completionDate?

```ts
optional completionDate?: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:7586](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7586)

The user task completion date.

---

### creationDate?

```ts
optional creationDate?: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:7582](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7582)

The user task creation date.

---

### dueDate?

```ts
optional dueDate?: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:7594](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7594)

The user task due date.

---

### elementId?

```ts
optional elementId?: ElementId;
```

Defined in: [gen/types.gen.ts:7557](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7557)

The element ID of the user task.

---

### elementInstanceKey?

```ts
optional elementInstanceKey?: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:7618](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7618)

The key of the element instance.

---

### followUpDate?

```ts
optional followUpDate?: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:7590](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7590)

The user task follow-up date.

---

### localVariables?

```ts
optional localVariables?: VariableValueFilterProperty[];
```

Defined in: [gen/types.gen.ts:7602](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7602)

The local variables of the user task.

---

### name?

```ts
optional name?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7562](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7562)

The task name. This only works for data created with 8.8 and onwards. Instances from prior versions don't contain this data and cannot be found.

---

### priority?

```ts
optional priority?: IntegerFilterProperty;
```

Defined in: [gen/types.gen.ts:7553](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7553)

The priority of the user task.

---

### processDefinitionId?

```ts
optional processDefinitionId?: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:7578](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7578)

The ID of the process definition.

---

### processDefinitionKey?

```ts
optional processDefinitionKey?: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:7610](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7610)

The key of the process definition.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:7614](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7614)

The key of the process instance.

---

### processInstanceVariables?

```ts
optional processInstanceVariables?: VariableValueFilterProperty[];
```

Defined in: [gen/types.gen.ts:7598](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7598)

The variables of the process instance.

---

### state?

```ts
optional state?: UserTaskStateFilterProperty;
```

Defined in: [gen/types.gen.ts:7545](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7545)

The user task state.

---

### tags?

```ts
optional tags?: TagSet;
```

Defined in: [gen/types.gen.ts:7619](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7619)

---

### tenantId?

```ts
optional tenantId?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7574](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7574)

Tenant ID of this user task.

---

### userTaskKey?

```ts
optional userTaskKey?: UserTaskKey;
```

Defined in: [gen/types.gen.ts:7606](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7606)

The key for this user task.
