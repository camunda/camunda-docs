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

Defined in: [gen/types.gen.ts:7632](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7632)

## Properties

### assignee

```ts
assignee: string | null;
```

Defined in: [gen/types.gen.ts:7641](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7641)

The assignee of the user task.

---

### candidateGroups

```ts
candidateGroups: string[];
```

Defined in: [gen/types.gen.ts:7649](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7649)

The candidate groups for this user task.

---

### candidateUsers

```ts
candidateUsers: string[];
```

Defined in: [gen/types.gen.ts:7653](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7653)

The candidate users for this user task.

---

### completionDate

```ts
completionDate: string | null;
```

Defined in: [gen/types.gen.ts:7665](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7665)

The completion date of a user task.

---

### creationDate

```ts
creationDate: string;
```

Defined in: [gen/types.gen.ts:7661](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7661)

The creation date of a user task.

---

### customHeaders

```ts
customHeaders: object;
```

Defined in: [gen/types.gen.ts:7686](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7686)

Custom headers for the user task.

#### Index Signature

```ts
[key: string]: string
```

---

### dueDate

```ts
dueDate: string | null;
```

Defined in: [gen/types.gen.ts:7673](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7673)

The due date of a user task.

---

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:7645](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7645)

The element ID of the user task.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:7700](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7700)

The key of the element instance.

---

### externalFormReference

```ts
externalFormReference: string | null;
```

Defined in: [gen/types.gen.ts:7678](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7678)

The external form reference.

---

### followUpDate

```ts
followUpDate: string | null;
```

Defined in: [gen/types.gen.ts:7669](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7669)

The follow date of a user task.

---

### formKey

```ts
formKey: FormKey | null;
```

Defined in: [gen/types.gen.ts:7725](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7725)

The key of the form.

---

### name

```ts
name: string | null;
```

Defined in: [gen/types.gen.ts:7636](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7636)

The name for this user task.

---

### priority

```ts
priority: number;
```

Defined in: [gen/types.gen.ts:7692](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7692)

The priority of a user task. The higher the value the higher the priority.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:7657](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7657)

The ID of the process definition.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:7710](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7710)

The key of the process definition.

---

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:7682](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7682)

The version of the process definition.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:7714](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7714)

The key of the process instance.

---

### processName

```ts
processName: string | null;
```

Defined in: [gen/types.gen.ts:7706](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7706)

The name of the process definition.
This is `null` if the process has no name defined.

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:7721](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7721)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### state

```ts
state: UserTaskStateEnum;
```

Defined in: [gen/types.gen.ts:7637](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7637)

---

### tags

```ts
tags: TagSet;
```

Defined in: [gen/types.gen.ts:7726](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7726)

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:7674](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7674)

---

### userTaskKey

```ts
userTaskKey: UserTaskKey;
```

Defined in: [gen/types.gen.ts:7696](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7696)

The key of the user task.
