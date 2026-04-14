---
title: "Type Alias: AdvancedElementInstanceKeyFilter"
sidebar_label: "AdvancedElementInstanceKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedElementInstanceKeyFilter

```ts
type AdvancedElementInstanceKeyFilter = object;
```

Advanced filter

Advanced ElementInstanceKey filter.

## Properties

### $eq?

```ts
optional $eq?: ElementInstanceKey;
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
optional $in?: ElementInstanceKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: ElementInstanceKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: ElementInstanceKey[];
```

Checks if the property matches none of the provided values.
