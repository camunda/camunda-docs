---
title: "Type Alias: AdvancedUserTaskStateFilter"
sidebar_label: "AdvancedUserTaskStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedUserTaskStateFilter

```ts
type AdvancedUserTaskStateFilter = object;
```

Advanced filter

Advanced UserTaskStateEnum filter.

## Properties

### $eq?

```ts
optional $eq?: UserTaskStateEnum;
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
optional $in?: UserTaskStateEnum[];
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
optional $neq?: UserTaskStateEnum;
```

Checks for inequality with the provided value.
