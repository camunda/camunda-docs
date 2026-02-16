---
title: "Type Alias: GetUserTaskResponses"
sidebar_label: "GetUserTaskResponses"
mdx:
  format: md
---

# Type Alias: GetUserTaskResponses

```ts
type GetUserTaskResponses = object;
```

Defined in: [gen/types.gen.ts:16935](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16935)

## Properties

### 200

```ts
200: object;
```

Defined in: [gen/types.gen.ts:16939](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16939)

The user task is successfully returned.

#### assignee?

```ts
optional assignee: string;
```

The assignee of the user task.

#### candidateGroups?

```ts
optional candidateGroups: string[];
```

The candidate groups for this user task.

#### candidateUsers?

```ts
optional candidateUsers: string[];
```

The candidate users for this user task.

#### completionDate?

```ts
optional completionDate: string;
```

The completion date of a user task.

#### creationDate?

```ts
optional creationDate: string;
```

The creation date of a user task.

#### customHeaders?

```ts
optional customHeaders: object;
```

Custom headers for the user task.

##### Index Signature

```ts
[key: string]: string
```

#### dueDate?

```ts
optional dueDate: string;
```

The due date of a user task.

#### elementId?

```ts
optional elementId: ElementId;
```

The element ID of the user task.

#### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKey;
```

The key of the element instance.

#### externalFormReference?

```ts
optional externalFormReference: string;
```

The external form reference.

#### followUpDate?

```ts
optional followUpDate: string;
```

The follow date of a user task.

#### formKey?

```ts
optional formKey: FormKey;
```

The key of the form.

#### name?

```ts
optional name: string;
```

The name for this user task.

#### priority?

```ts
optional priority: number;
```

The priority of a user task. The higher the value the higher the priority.

#### processDefinitionId?

```ts
optional processDefinitionId: ProcessDefinitionId;
```

The ID of the process definition.

#### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

The key of the process definition.

#### processDefinitionVersion?

```ts
optional processDefinitionVersion: number;
```

The version of the process definition.

#### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

The key of the process instance.

#### processName?

```ts
optional processName: string;
```

The name of the process definition.

#### rootProcessInstanceKey?

```ts
optional rootProcessInstanceKey: ProcessInstanceKey;
```

#### state?

```ts
optional state: UserTaskStateEnum;
```

#### tags?

```ts
optional tags: TagSet;
```

#### tenantId?

```ts
optional tenantId: TenantId;
```

#### userTaskKey?

```ts
optional userTaskKey: UserTaskKey;
```

The key of the user task.
