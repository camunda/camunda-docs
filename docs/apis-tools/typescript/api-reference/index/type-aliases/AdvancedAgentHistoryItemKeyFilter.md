---
title: "Type Alias: AdvancedAgentHistoryItemKeyFilter"
sidebar_label: "AdvancedAgentHistoryItemKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedAgentHistoryItemKeyFilter

```ts
type AdvancedAgentHistoryItemKeyFilter = object;
```

Advanced filter

Advanced AgentHistoryItemKey filter.

## Properties

### $eq?

```ts
$eq?: AgentHistoryItemKey;
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
$in?: AgentHistoryItemKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
$neq?: AgentHistoryItemKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
$notIn?: AgentHistoryItemKey[];
```

Checks if the property matches none of the provided values.
