---
title: "Type Alias: AdvancedScopeKeyFilter"
sidebar_label: "AdvancedScopeKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedScopeKeyFilter

```ts
type AdvancedScopeKeyFilter = object;
```

Advanced filter

Advanced ScopeKey filter.

## Properties

### $eq?

```ts
optional $eq?: ScopeKey;
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
optional $in?: ScopeKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: ScopeKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: ScopeKey[];
```

Checks if the property matches none of the provided values.
