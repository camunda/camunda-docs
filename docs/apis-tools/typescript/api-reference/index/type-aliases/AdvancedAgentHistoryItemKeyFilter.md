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
optional $eq?: AgentHistoryItemKey;
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
optional $in?: AgentHistoryItemKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: AgentHistoryItemKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: AgentHistoryItemKey[];
```

Checks if the property matches none of the provided values.
