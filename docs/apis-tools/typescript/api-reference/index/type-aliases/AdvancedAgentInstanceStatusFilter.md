---
title: "Type Alias: AdvancedAgentInstanceStatusFilter"
sidebar_label: "AdvancedAgentInstanceStatusFilter"
mdx:
  format: md
---

# Type Alias: AdvancedAgentInstanceStatusFilter

```ts
type AdvancedAgentInstanceStatusFilter = object;
```

Advanced filter

Advanced AgentInstanceStatusEnum filter.

## Properties

### $eq?

```ts
optional $eq?: AgentInstanceStatusEnum;
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
optional $in?: AgentInstanceStatusEnum[];
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
optional $neq?: AgentInstanceStatusEnum;
```

Checks for inequality with the provided value.
