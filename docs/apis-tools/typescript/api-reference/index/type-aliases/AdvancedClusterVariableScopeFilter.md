---
title: "Type Alias: AdvancedClusterVariableScopeFilter"
sidebar_label: "AdvancedClusterVariableScopeFilter"
mdx:
  format: md
---

# Type Alias: AdvancedClusterVariableScopeFilter

```ts
type AdvancedClusterVariableScopeFilter = object;
```

Advanced filter

Advanced ClusterVariableScopeEnum filter.

## Properties

### $eq?

```ts
$eq?: ClusterVariableScopeEnum;
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
$in?: ClusterVariableScopeEnum[];
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
$neq?: ClusterVariableScopeEnum;
```

Checks for inequality with the provided value.
