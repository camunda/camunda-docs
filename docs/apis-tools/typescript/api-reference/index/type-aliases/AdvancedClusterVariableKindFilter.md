---
title: "Type Alias: AdvancedClusterVariableKindFilter"
sidebar_label: "AdvancedClusterVariableKindFilter"
mdx:
  format: md
---

# Type Alias: AdvancedClusterVariableKindFilter

```ts
type AdvancedClusterVariableKindFilter = object;
```

Advanced filter

Advanced ClusterVariableKindEnum filter.

## Properties

### $eq?

```ts
optional $eq?: ClusterVariableKindEnum;
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
optional $in?: ClusterVariableKindEnum[];
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
optional $neq?: ClusterVariableKindEnum;
```

Checks for inequality with the provided value.
