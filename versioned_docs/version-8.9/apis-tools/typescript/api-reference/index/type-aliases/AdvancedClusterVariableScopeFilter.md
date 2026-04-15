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
optional $eq?: ClusterVariableScopeEnum;
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
optional $in?: ClusterVariableScopeEnum[];
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
optional $neq?: ClusterVariableScopeEnum;
```

Checks for inequality with the provided value.
