---
title: "Type Alias: AdvancedDecisionDefinitionKeyFilter"
sidebar_label: "AdvancedDecisionDefinitionKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedDecisionDefinitionKeyFilter

```ts
type AdvancedDecisionDefinitionKeyFilter = object;
```

Advanced filter

Advanced DecisionDefinitionKey filter.

## Properties

### $eq?

```ts
optional $eq?: DecisionDefinitionKey;
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
optional $in?: DecisionDefinitionKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: DecisionDefinitionKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: DecisionDefinitionKey[];
```

Checks if the property matches none of the provided values.
