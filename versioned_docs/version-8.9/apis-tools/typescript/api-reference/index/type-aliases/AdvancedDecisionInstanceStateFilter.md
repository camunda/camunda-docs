---
title: "Type Alias: AdvancedDecisionInstanceStateFilter"
sidebar_label: "AdvancedDecisionInstanceStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedDecisionInstanceStateFilter

```ts
type AdvancedDecisionInstanceStateFilter = object;
```

Advanced filter

Advanced DecisionInstanceStateEnum filter.

## Properties

### $eq?

```ts
optional $eq?: DecisionInstanceStateEnum;
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
optional $in?: DecisionInstanceStateEnum[];
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
optional $neq?: DecisionInstanceStateEnum;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: DecisionInstanceStateEnum[];
```

Checks if the property matches none of the provided values.
