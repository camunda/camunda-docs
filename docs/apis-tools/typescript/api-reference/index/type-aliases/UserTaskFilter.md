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

Defined in: [gen/types.gen.ts:6769](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6769)

User task filter request.

## Properties

### assignee?

```ts
optional assignee: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:6777](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6777)

The assignee of the user task.

---

### candidateGroup?

```ts
optional candidateGroup: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:6794](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6794)

The candidate group for this user task.

---

### candidateUser?

```ts
optional candidateUser: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:6798](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6798)

The candidate user for this user task.

---

### completionDate?

```ts
optional completionDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:6814](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6814)

The user task completion date.

---

### creationDate?

```ts
optional creationDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:6810](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6810)

The user task creation date.

---

### dueDate?

```ts
optional dueDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:6822](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6822)

The user task due date.

---

### elementId?

```ts
optional elementId: ElementId;
```

Defined in: [gen/types.gen.ts:6785](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6785)

The element ID of the user task.

---

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:6840](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6840)

The key of the element instance.

---

### followUpDate?

```ts
optional followUpDate: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:6818](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6818)

The user task follow-up date.

---

### localVariables?

```ts
optional localVariables: VariableValueFilterProperty[];
```

Defined in: [gen/types.gen.ts:6824](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6824)

---

### name?

```ts
optional name: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:6790](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6790)

The task name. This only works for data created with 8.8 and onwards. Instances from prior versions don't contain this data and cannot be found.

---

### priority?

```ts
optional priority: IntegerFilterProperty;
```

Defined in: [gen/types.gen.ts:6781](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6781)

The priority of the user task.

---

### processDefinitionId?

```ts
optional processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:6806](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6806)

The ID of the process definition.

---

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:6832](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6832)

The key of the process definition.

---

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:6836](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6836)

The key of the process instance.

---

### processInstanceVariables?

```ts
optional processInstanceVariables: VariableValueFilterProperty[];
```

Defined in: [gen/types.gen.ts:6823](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6823)

---

### state?

```ts
optional state: UserTaskStateFilterProperty;
```

Defined in: [gen/types.gen.ts:6773](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6773)

The user task state.

---

### tags?

```ts
optional tags: TagSet;
```

Defined in: [gen/types.gen.ts:6841](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6841)

---

### tenantId?

```ts
optional tenantId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:6802](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6802)

Tenant ID of this user task.

---

### userTaskKey?

```ts
optional userTaskKey: UserTaskKey;
```

Defined in: [gen/types.gen.ts:6828](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6828)

The key for this user task.
