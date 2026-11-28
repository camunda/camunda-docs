---
title: "Type Alias: ProcessDefinitionResumptionVersionResult"
sidebar_label: "ProcessDefinitionResumptionVersionResult"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionResumptionVersionResult

```ts
type ProcessDefinitionResumptionVersionResult = object;
```

## Properties

### outcome

```ts
outcome: "RESUMED" | "ALREADY_RESUMED" | "DRAINING";
```

`RESUMED` if the version was suspended and is now active again. The resumption applies
to all partitions shortly after the response.
`ALREADY_RESUMED` if the version was already active, so its state is unchanged.
With `includeProcessInstances`, its suspended process instances are still resumed by
the batch operation.
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
