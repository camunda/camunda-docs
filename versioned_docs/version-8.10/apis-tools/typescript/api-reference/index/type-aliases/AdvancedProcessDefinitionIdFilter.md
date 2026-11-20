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
optional $eq?: ProcessDefinitionId;
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
optional $in?: ProcessDefinitionId[];
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
optional $neq?: ProcessDefinitionId;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: ProcessDefinitionId[];
```

Checks if the property matches none of the provided values.
