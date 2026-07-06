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
optional $eq?: ElementId;
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
optional $in?: ElementId[];
```

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like?: LikeFilter;
```

---

### $neq?

```ts
optional $neq?: ElementId;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: ElementId[];
```

Checks if the property matches none of the provided values.
