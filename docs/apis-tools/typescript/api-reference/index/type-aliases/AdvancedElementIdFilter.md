---
title: "Type Alias: AdvancedElementIdFilter"
sidebar_label: "AdvancedElementIdFilter"
mdx:
  format: md
---

# Type Alias: AdvancedElementIdFilter

```ts
type AdvancedElementIdFilter = object;
```

Advanced filter

Advanced ElementId filter.

## Properties

### $eq?

```ts
$eq?: ElementId;
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
$in?: ElementId[];
```

Checks if the property matches any of the provided values.

---

### $like?

```ts
$like?: LikeFilter;
```

---

### $neq?

```ts
$neq?: ElementId;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
$notIn?: ElementId[];
```

Checks if the property matches none of the provided values.
