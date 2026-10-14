---
title: "Type Alias: CreateProcessInstanceResult"
sidebar_label: "CreateProcessInstanceResult"
mdx:
  format: md
---

# Type Alias: CreateProcessInstanceResult

```ts
type CreateProcessInstanceResult = object;
```

## Properties

### businessId

```ts
businessId: BusinessId | null;
```

Business id as provided on creation.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

The BPMN process id of the process definition which was used to create the process.
instance

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The key of the process definition which was used to create the process instance.

---

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

The version of the process definition which was used to create the process instance.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The unique identifier of the created process instance; to be used wherever a request
needs a process instance key (e.g. CancelProcessInstanceRequest).

---

### tags

```ts
tags: TagSet;
```

---

### tenantId

```ts
tenantId: TenantId;
```

The tenant id of the created process instance.

---

### variables

```ts
variables: object;
```

All the variables visible in the root scope.

#### Index Signature

```ts
[key: string]: unknown
```
