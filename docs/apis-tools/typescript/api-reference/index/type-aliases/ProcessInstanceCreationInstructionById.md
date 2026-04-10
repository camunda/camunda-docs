---
title: "Type Alias: ProcessInstanceCreationInstructionById"
sidebar_label: "ProcessInstanceCreationInstructionById"
mdx:
  format: md
---

# Type Alias: ProcessInstanceCreationInstructionById

```ts
type ProcessInstanceCreationInstructionById = object;
```

Process creation by id

## Properties

### awaitCompletion?

```ts
optional awaitCompletion?: boolean;
```

Wait for the process instance to complete. If the process instance does not complete
within the request timeout limit, a 504 response status will be returned. The process
instance will continue to run in the background regardless of the timeout. Disabled by
default.

---

### businessId?

```ts
optional businessId?: BusinessId;
```

---

### fetchVariables?

```ts
optional fetchVariables?: string[];
```

List of variables by name to be included in the response when awaitCompletion is set to true.
If empty, all visible variables in the root scope will be returned.

---

### operationReference?

```ts
optional operationReference?: OperationReference;
```

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

The BPMN process id of the process definition to start an instance of.

---

### processDefinitionVersion?

```ts
optional processDefinitionVersion?: number;
```

The version of the process. By default, the latest version of the process is used.

---

### requestTimeout?

```ts
optional requestTimeout?: number;
```

Timeout (in ms) the request waits for the process to complete. By default or
when set to 0, the generic request timeout configured in the cluster is applied.

---

### runtimeInstructions?

```ts
optional runtimeInstructions?: ProcessInstanceCreationRuntimeInstruction[];
```

Runtime instructions (alpha). List of instructions that affect the runtime behavior of
the process instance. Refer to specific instruction types for more details.

This parameter is an alpha feature and may be subject to change
in future releases.

---

### startInstructions?

```ts
optional startInstructions?: ProcessInstanceCreationStartInstruction[];
```

List of start instructions. By default, the process instance will start at
the start event. If provided, the process instance will apply start instructions
after it has been created.

---

### tags?

```ts
optional tags?: TagSet;
```

---

### tenantId?

```ts
optional tenantId?: TenantId;
```

The tenant id of the process definition.
If multi-tenancy is enabled, provide the tenant id of the process definition to start a
process instance of. If multi-tenancy is disabled, don't provide this parameter.

---

### variables?

```ts
optional variables?: object;
```

JSON object that will instantiate the variables for the root variable scope
of the process instance.

#### Index Signature

```ts
[key: string]: unknown
```
