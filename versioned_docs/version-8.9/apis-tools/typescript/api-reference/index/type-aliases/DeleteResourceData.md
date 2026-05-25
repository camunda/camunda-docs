---
title: "Type Alias: DeleteResourceData"
sidebar_label: "DeleteResourceData"
mdx:
  format: md
---

# Type Alias: DeleteResourceData

```ts
type DeleteResourceData = object;
```

## Properties

### body?

```ts
optional body?: DeleteResourceRequest;
```

---

### path

```ts
path: object;
```

#### resourceKey

```ts
resourceKey: ResourceKey;
```

The key of the resource to delete.
This can be the key of a process definition, the key of a decision requirements
definition or the key of a form definition

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/resources/{resourceKey}/deletion";
```
