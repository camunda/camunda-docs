---
title: "Type Alias: AdvancedProcessInstanceKeyFilter"
sidebar_label: "AdvancedProcessInstanceKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedProcessInstanceKeyFilter

```ts
type AdvancedProcessInstanceKeyFilter = object;
```

Advanced filter

Advanced ProcessInstanceKey filter.

## Properties

### $eq?

```ts
optional $eq?: ProcessInstanceKey;
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
optional $in?: ProcessInstanceKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: ProcessInstanceKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: ProcessInstanceKey[];
```

Checks if the property matches none of the provided values.
