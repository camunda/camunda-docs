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
optional $eq?: ProcessDefinitionKey;
```

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Checks if the current property exists.

---

### $in?

```ts
optional $in?: ProcessDefinitionKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: ProcessDefinitionKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: ProcessDefinitionKey[];
```

Checks if the property matches none of the provided values.
