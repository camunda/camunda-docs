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

User task filter request.

## Properties

### assignee?

```ts
optional assignee?: StringFilterProperty;
```

The assignee of the user task.

---

### candidateGroup?

```ts
optional candidateGroup?: StringFilterProperty;
```

The candidate group for this user task.

---

### candidateUser?

```ts
optional candidateUser?: StringFilterProperty;
```

The candidate user for this user task.

---

### completionDate?

```ts
optional completionDate?: DateTimeFilterProperty;
```

The user task completion date.

---

### creationDate?

```ts
optional creationDate?: DateTimeFilterProperty;
```

The user task creation date.

---

### dueDate?

```ts
optional dueDate?: DateTimeFilterProperty;
```

The user task due date.

---

### elementId?

```ts
optional elementId?: ElementId;
```

The element ID of the user task.

---

### elementInstanceKey?

```ts
optional elementInstanceKey?: ElementInstanceKey;
```

The key of the element instance.

---

### followUpDate?

```ts
optional followUpDate?: DateTimeFilterProperty;
```

The user task follow-up date.

---

### localVariables?

```ts
optional localVariables?: VariableValueFilterProperty[];
```

The local variables of the user task.

---

### name?

```ts
optional name?: StringFilterProperty;
```

The task name. This only works for data created with 8.8 and onwards. Instances from prior versions don't contain this data and cannot be found.

---

### priority?

```ts
optional priority?: IntegerFilterProperty;
```

The priority of the user task.

---

### processDefinitionId?

```ts
optional processDefinitionId?: ProcessDefinitionId;
```

The ID of the process definition.

---

### processDefinitionKey?

```ts
optional processDefinitionKey?: ProcessDefinitionKey;
```

The key of the process definition.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKey;
```

The key of the process instance.

---

### processInstanceVariables?

```ts
optional processInstanceVariables?: VariableValueFilterProperty[];
```

The variables of the process instance.

---

### state?

```ts
optional state?: UserTaskStateFilterProperty;
```

The user task state.

---

### tags?

```ts
optional tags?: TagSet;
```

---

### tenantId?

```ts
optional tenantId?: StringFilterProperty;
```

Tenant ID of this user task.

---

### userTaskKey?

```ts
optional userTaskKey?: UserTaskKey;
```

The key for this user task.
