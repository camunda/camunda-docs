---
title: "Type Alias: AdvancedDecisionEvaluationInstanceKeyFilter"
sidebar_label: "AdvancedDecisionEvaluationInstanceKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedDecisionEvaluationInstanceKeyFilter

```ts
type AdvancedDecisionEvaluationInstanceKeyFilter = object;
```

Advanced filter

Advanced DecisionEvaluationInstanceKey filter.

## Properties

### $eq?

```ts
optional $eq?: DecisionEvaluationInstanceKey;
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
optional $in?: DecisionEvaluationInstanceKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: DecisionEvaluationInstanceKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: DecisionEvaluationInstanceKey[];
```

Checks if the property matches none of the provided values.
