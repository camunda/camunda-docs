---
title: "Type Alias: AdvancedIncidentStateFilter"
sidebar_label: "AdvancedIncidentStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedIncidentStateFilter

```ts
type AdvancedIncidentStateFilter = object;
```

Advanced filter

Advanced IncidentStateEnum filter

## Properties

### $eq?

```ts
$eq?: IncidentStateEnum;
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
$in?: IncidentStateEnum[];
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
$neq?: IncidentStateEnum;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
$notIn?: IncidentStateEnum[];
```

Checks if the property does not match any of the provided values.
