---
title: "Type Alias: ProcessDefinitionSuspensionVersionResult"
sidebar_label: "ProcessDefinitionSuspensionVersionResult"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionSuspensionVersionResult

```ts
type ProcessDefinitionSuspensionVersionResult = object;
```

## Properties

### outcome

```ts
outcome: "SUSPENDED" | "ALREADY_SUSPENDED" | "DRAINING";
```

`SUSPENDED` if the version was active and is now suspended. The suspension applies to
all partitions shortly after the response.
`ALREADY_SUSPENDED` if the version was already suspended, so its state is unchanged.
With `includeProcessInstances`, its process instances are still suspended by the
batch operation.
`DRAINING` if it is being deleted and is left unchanged. This only occurs when the
request selects by ID without a version; selecting a single draining version is rejected
with 409.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The key of the process definition version.

---

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

The version of the process definition.
