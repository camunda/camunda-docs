---
title: "Type Alias: MigrateProcessInstanceData"
sidebar_label: "MigrateProcessInstanceData"
mdx:
  format: md
---

# Type Alias: MigrateProcessInstanceData

```ts
type MigrateProcessInstanceData = object;
```

## Properties

### body

```ts
body: ProcessInstanceMigrationInstruction;
```

---

### path

```ts
path: object;
```

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance that should be migrated.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/process-instances/{processInstanceKey}/migration";
```
