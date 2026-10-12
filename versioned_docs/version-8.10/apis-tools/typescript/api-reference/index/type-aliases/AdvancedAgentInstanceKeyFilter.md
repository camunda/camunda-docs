---
title: "Type Alias: AdvancedAgentInstanceKeyFilter"
sidebar_label: "AdvancedAgentInstanceKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedAgentInstanceKeyFilter

```ts
type AdvancedAgentInstanceKeyFilter = object;
```

Advanced filter

Advanced AgentInstanceKey filter.

## Properties

### $eq?

```ts
optional $eq?: AgentInstanceKey;
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
optional $in?: AgentInstanceKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: AgentInstanceKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: AgentInstanceKey[];
```

Checks if the property matches none of the provided values.
