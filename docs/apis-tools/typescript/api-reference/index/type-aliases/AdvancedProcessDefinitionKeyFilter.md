---
title: "Type Alias: AdvancedProcessDefinitionKeyFilter"
sidebar_label: "AdvancedProcessDefinitionKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedProcessDefinitionKeyFilter

```ts
type AdvancedProcessDefinitionKeyFilter = object;
```

Advanced filter

Advanced ProcessDefinitionKey filter.

## Properties

### $eq?

```ts
$eq?: ProcessDefinitionKey;
```

Checks for equality with the provided value.

---

### $exists?

```ts
$exists?: boolean;
```

Checks if the current property exists.

---

### $in?

```ts
$in?: ProcessDefinitionKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
$neq?: ProcessDefinitionKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
$notIn?: ProcessDefinitionKey[];
```

Checks if the property matches none of the provided values.
