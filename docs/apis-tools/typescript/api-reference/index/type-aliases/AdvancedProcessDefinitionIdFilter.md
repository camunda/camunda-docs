---
title: "Type Alias: AdvancedProcessDefinitionIdFilter"
sidebar_label: "AdvancedProcessDefinitionIdFilter"
mdx:
  format: md
---

# Type Alias: AdvancedProcessDefinitionIdFilter

```ts
type AdvancedProcessDefinitionIdFilter = object;
```

Advanced filter

Advanced ProcessDefinitionId filter.

## Properties

### $eq?

```ts
$eq?: ProcessDefinitionId;
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
$in?: ProcessDefinitionId[];
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
$neq?: ProcessDefinitionId;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
$notIn?: ProcessDefinitionId[];
```

Checks if the property matches none of the provided values.
