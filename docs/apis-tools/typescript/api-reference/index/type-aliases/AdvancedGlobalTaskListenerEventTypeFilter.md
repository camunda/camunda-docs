---
title: "Type Alias: AdvancedGlobalTaskListenerEventTypeFilter"
sidebar_label: "AdvancedGlobalTaskListenerEventTypeFilter"
mdx:
  format: md
---

# Type Alias: AdvancedGlobalTaskListenerEventTypeFilter

```ts
type AdvancedGlobalTaskListenerEventTypeFilter = object;
```

Advanced filter

Advanced global listener event type filter.

## Properties

### $eq?

```ts
$eq?: GlobalTaskListenerEventTypeEnum;
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
$in?: GlobalTaskListenerEventTypeEnum[];
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
$neq?: GlobalTaskListenerEventTypeEnum;
```

Checks for inequality with the provided value.
