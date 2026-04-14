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
optional $eq?: GlobalTaskListenerEventTypeEnum;
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
optional $in?: GlobalTaskListenerEventTypeEnum[];
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
optional $neq?: GlobalTaskListenerEventTypeEnum;
```

Checks for inequality with the provided value.
