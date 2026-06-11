---
title: "Type Alias: AdvancedFormKeyFilter"
sidebar_label: "AdvancedFormKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedFormKeyFilter

```ts
type AdvancedFormKeyFilter = object;
```

Advanced filter

Advanced FormKey filter.

## Properties

### $eq?

```ts
optional $eq?: FormKey;
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
optional $in?: FormKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: FormKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: FormKey[];
```

Checks if the property matches none of the provided values.
