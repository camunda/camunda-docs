---
title: "Type Alias: AdvancedResourceKeyFilter"
sidebar_label: "AdvancedResourceKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedResourceKeyFilter

```ts
type AdvancedResourceKeyFilter = object;
```

Advanced filter

Advanced ResourceKey filter.

## Properties

### $eq?

```ts
$eq?: ResourceKey;
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
$in?: ResourceKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
$neq?: ResourceKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
$notIn?: ResourceKey[];
```

Checks if the property matches none of the provided values.
