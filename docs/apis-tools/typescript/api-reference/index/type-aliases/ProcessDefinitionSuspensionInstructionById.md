---
title: "Type Alias: ProcessDefinitionSuspensionInstructionById"
sidebar_label: "ProcessDefinitionSuspensionInstructionById"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionSuspensionInstructionById

```ts
type ProcessDefinitionSuspensionInstructionById = object;
```

Process definition suspension by ID

## Properties

### includeProcessInstances?

```ts
includeProcessInstances?: boolean;
```

Whether to also suspend the process instances of the affected
process definition versions. The instances are changed by a batch operation.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

The BPMN process ID of the process definition.

---

### processDefinitionVersion?

```ts
processDefinitionVersion?: number;
```

The version of the process definition. Must be 1 or greater; `-1` is not accepted.
If omitted, all versions are affected.

---

### tenantId?

```ts
tenantId?: TenantId;
```

The tenant of the process definition. Required when multi-tenancy is enabled;
if multi-tenancy is disabled, it can be omitted and the default tenant is used.
