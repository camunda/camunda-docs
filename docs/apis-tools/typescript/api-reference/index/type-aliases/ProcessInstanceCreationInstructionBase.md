---
title: "Type Alias: ProcessInstanceCreationInstructionBase"
sidebar_label: "ProcessInstanceCreationInstructionBase"
mdx:
  format: md
---

# Type Alias: ProcessInstanceCreationInstructionBase

```ts
type ProcessInstanceCreationInstructionBase = object;
```

Fields shared by all process instance creation instructions.

## Properties

### awaitCompletion?

```ts
awaitCompletion?: boolean;
```

Wait for the process instance to complete. If the process instance does not complete
within the request timeout limit, a 504 response status will be returned. The process
instance will continue to run in the background regardless of the timeout. Disabled by
default.

---

### businessId?

```ts
businessId?: BusinessId;
```

---

### fetchVariables?

```ts
fetchVariables?: string[];
```

List of variables by name to be included in the response when awaitCompletion is set to true.
If empty, all visible variables in the root scope will be returned.

---

### operationReference?

```ts
operationReference?: OperationReference;
```

---

### requestTimeout?

```ts
requestTimeout?: number;
```

Timeout (in ms) the request waits for the process to complete. By default or
when set to 0, the generic request timeout configured in the cluster is applied.

---

### runtimeInstructions?

```ts
runtimeInstructions?: ProcessInstanceCreationRuntimeInstruction[];
```

Runtime instructions (alpha). List of instructions that affect the runtime behavior of
the process instance. Refer to specific instruction types for more details.

This parameter is an alpha feature and may be subject to change
in future releases.

---

### startInstructions?

```ts
startInstructions?: ProcessInstanceCreationStartInstruction[];
```

List of start instructions. By default, the process instance will start at
the start event. If provided, the process instance will apply start instructions
after it has been created.

---

### tags?

```ts
tags?: TagSet;
```

---

### tenantId?

```ts
tenantId?: TenantId;
```

The tenant id of the process definition.
If multi-tenancy is enabled, provide the tenant id of the process definition to start a
process instance of. If multi-tenancy is disabled, don't provide this parameter.

---

### variables?

```ts
variables?: object;
```

JSON object that will instantiate the variables for the root variable scope
of the process instance.

#### Index Signature

```ts
[key: string]: unknown
```
