---
title: "Type Alias: CreateElementInstanceVariablesData"
sidebar_label: "CreateElementInstanceVariablesData"
mdx:
  format: md
---

# Type Alias: CreateElementInstanceVariablesData

```ts
type CreateElementInstanceVariablesData = object;
```

## Properties

### body

```ts
body: SetVariableRequest;
```

---

### path

```ts
path: object;
```

#### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

The key of the element instance to update the variables for.
This can be the process instance key (as obtained during instance creation), or a given
element, such as a service task (see the `elementInstanceKey` on the job message).

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/element-instances/{elementInstanceKey}/variables";
```
