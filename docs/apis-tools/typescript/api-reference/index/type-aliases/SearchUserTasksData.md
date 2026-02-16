---
title: "Type Alias: SearchUserTasksData"
sidebar_label: "SearchUserTasksData"
mdx:
  format: md
---

# Type Alias: SearchUserTasksData

```ts
type SearchUserTasksData = object;
```

Defined in: [gen/types.gen.ts:16678](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16678)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:16682](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16682)

User task search query request.

#### Type Declaration

##### filter?

```ts
optional filter: object;
```

User task filter request.

###### filter.assignee?

```ts
optional assignee: StringFilterProperty;
```

The assignee of the user task.

###### filter.candidateGroup?

```ts
optional candidateGroup: StringFilterProperty;
```

The candidate group for this user task.

###### filter.candidateUser?

```ts
optional candidateUser: StringFilterProperty;
```

The candidate user for this user task.

###### filter.completionDate?

```ts
optional completionDate: DateTimeFilterProperty;
```

The user task completion date.

###### filter.creationDate?

```ts
optional creationDate: DateTimeFilterProperty;
```

The user task creation date.

###### filter.dueDate?

```ts
optional dueDate: DateTimeFilterProperty;
```

The user task due date.

###### filter.elementId?

```ts
optional elementId: ElementId;
```

The element ID of the user task.

###### filter.elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKey;
```

The key of the element instance.

###### filter.followUpDate?

```ts
optional followUpDate: DateTimeFilterProperty;
```

The user task follow-up date.

###### filter.localVariables?

```ts
optional localVariables: VariableValueFilterProperty[];
```

###### filter.name?

```ts
optional name: StringFilterProperty;
```

The task name. This only works for data created with 8.8 and onwards. Instances from prior versions don't contain this data and cannot be found.

###### filter.priority?

```ts
optional priority: IntegerFilterProperty;
```

The priority of the user task.

###### filter.processDefinitionId?

```ts
optional processDefinitionId: ProcessDefinitionId;
```

The ID of the process definition.

###### filter.processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

The key of the process definition.

###### filter.processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

The key of the process instance.

###### filter.processInstanceVariables?

```ts
optional processInstanceVariables: VariableValueFilterProperty[];
```

###### filter.state?

```ts
optional state: UserTaskStateFilterProperty;
```

The user task state.

###### filter.tags?

```ts
optional tags: TagSet;
```

###### filter.tenantId?

```ts
optional tenantId: StringFilterProperty;
```

Tenant ID of this user task.

###### filter.userTaskKey?

```ts
optional userTaskKey: UserTaskKey;
```

The key for this user task.

##### sort?

```ts
optional sort: object[];
```

Sort field criteria.

---

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:16771](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16771)

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:16772](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16772)

---

### url

```ts
url: "/user-tasks/search";
```

Defined in: [gen/types.gen.ts:16773](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16773)
