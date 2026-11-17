---
title: "Type Alias: AdvancedVariableKeyFilter"
sidebar_label: "AdvancedVariableKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedVariableKeyFilter

```ts
type AdvancedVariableKeyFilter = object;
```

Advanced filter

Advanced VariableKey filter.

## Properties

### $eq?

```ts
optional $eq?: VariableKey;
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
optional $in?: VariableKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: VariableKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: VariableKey[];
```

Checks if the property matches none of the provided values.
