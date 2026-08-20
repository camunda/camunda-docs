---
title: "Type Alias: AdvancedAgentDefinitionKeyFilter"
sidebar_label: "AdvancedAgentDefinitionKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedAgentDefinitionKeyFilter

```ts
type AdvancedAgentDefinitionKeyFilter = object;
```

Advanced filter

Advanced AgentDefinitionKey filter.

## Properties

### $eq?

```ts
optional $eq?: AgentDefinitionKey;
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
optional $in?: AgentDefinitionKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: AgentDefinitionKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: AgentDefinitionKey[];
```

Checks if the property matches none of the provided values.
