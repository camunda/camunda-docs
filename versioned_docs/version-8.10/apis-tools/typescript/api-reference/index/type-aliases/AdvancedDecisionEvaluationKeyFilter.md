---
title: "Type Alias: AdvancedDecisionEvaluationKeyFilter"
sidebar_label: "AdvancedDecisionEvaluationKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedDecisionEvaluationKeyFilter

```ts
type AdvancedDecisionEvaluationKeyFilter = object;
```

Advanced filter

Advanced DecisionEvaluationKey filter.

## Properties

### $eq?

```ts
optional $eq?: DecisionEvaluationKey;
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
optional $in?: DecisionEvaluationKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: DecisionEvaluationKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: DecisionEvaluationKey[];
```

Checks if the property matches none of the provided values.
