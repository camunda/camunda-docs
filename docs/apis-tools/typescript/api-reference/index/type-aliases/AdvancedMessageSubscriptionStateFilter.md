---
title: "Type Alias: AdvancedMessageSubscriptionStateFilter"
sidebar_label: "AdvancedMessageSubscriptionStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedMessageSubscriptionStateFilter

```ts
type AdvancedMessageSubscriptionStateFilter = object;
```

Advanced filter

Advanced MessageSubscriptionStateEnum filter

## Properties

### $eq?

```ts
$eq?: MessageSubscriptionStateEnum;
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
$in?: MessageSubscriptionStateEnum[];
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
$neq?: MessageSubscriptionStateEnum;
```

Checks for inequality with the provided value.
