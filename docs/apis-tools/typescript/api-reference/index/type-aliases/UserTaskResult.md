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

Defined in: [gen/types.gen.ts:6854](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6854)

## Properties

### assignee?

```ts
optional assignee: string;
```

Defined in: [gen/types.gen.ts:6863](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6863)

The assignee of the user task.

---

### candidateGroups?

```ts
optional candidateGroups: string[];
```

Defined in: [gen/types.gen.ts:6871](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6871)

The candidate groups for this user task.

---

### candidateUsers?

```ts
optional candidateUsers: string[];
```

Defined in: [gen/types.gen.ts:6875](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6875)

The candidate users for this user task.

---

### completionDate?

```ts
optional completionDate: string;
```

Defined in: [gen/types.gen.ts:6887](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6887)

The completion date of a user task.

---

### creationDate?

```ts
optional creationDate: string;
```

Defined in: [gen/types.gen.ts:6883](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6883)

The creation date of a user task.

---

### customHeaders?

```ts
optional customHeaders: object;
```

Defined in: [gen/types.gen.ts:6908](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6908)

Custom headers for the user task.

#### Index Signature

```ts
[key: string]: string
```

---

### dueDate?

```ts
optional dueDate: string;
```

Defined in: [gen/types.gen.ts:6895](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6895)

The due date of a user task.

---

### elementId?

```ts
optional elementId: ElementId;
```

Defined in: [gen/types.gen.ts:6867](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6867)

The element ID of the user task.

---

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:6922](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6922)

The key of the element instance.

---

### externalFormReference?

```ts
optional externalFormReference: string;
```

Defined in: [gen/types.gen.ts:6900](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6900)

The external form reference.

---

### followUpDate?

```ts
optional followUpDate: string;
```

Defined in: [gen/types.gen.ts:6891](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6891)

The follow date of a user task.

---

### formKey?

```ts
optional formKey: FormKey;
```

Defined in: [gen/types.gen.ts:6939](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6939)

The key of the form.

---

### name?

```ts
optional name: string;
```

Defined in: [gen/types.gen.ts:6858](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6858)

The name for this user task.

---

### priority?

```ts
optional priority: number;
```

Defined in: [gen/types.gen.ts:6914](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6914)

The priority of a user task. The higher the value the higher the priority.

---

### processDefinitionId?

```ts
optional processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:6879](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6879)

The ID of the process definition.

---

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:6930](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6930)

The key of the process definition.

---

### processDefinitionVersion?

```ts
optional processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:6904](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6904)

The version of the process definition.

---

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:6934](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6934)

The key of the process instance.

---

### processName?

```ts
optional processName: string;
```

Defined in: [gen/types.gen.ts:6926](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6926)

The name of the process definition.

---

### rootProcessInstanceKey?

```ts
optional rootProcessInstanceKey: RootProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:6935](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6935)

---

### state?

```ts
optional state: UserTaskStateEnum;
```

Defined in: [gen/types.gen.ts:6859](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6859)

---

### tags?

```ts
optional tags: TagSet;
```

Defined in: [gen/types.gen.ts:6940](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6940)

---

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:6896](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6896)

---

### userTaskKey?

```ts
optional userTaskKey: UserTaskKey;
```

Defined in: [gen/types.gen.ts:6918](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6918)

The key of the user task.
