---
title: "Type Alias: AdvancedScopeKeyFilter"
sidebar_label: "AdvancedScopeKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedScopeKeyFilter

```ts
type AdvancedScopeKeyFilter = object;
```

Advanced filter

Advanced ScopeKey filter.

## Properties

### $eq?

```ts
$eq?: ScopeKey;
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
$in?: ScopeKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
$neq?: ScopeKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
$notIn?: ScopeKey[];
```

Checks if the property matches none of the provided values.
