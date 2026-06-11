---
title: "Type Alias: DecisionEvaluationInstanceKey"
sidebar_label: "DecisionEvaluationInstanceKey"
mdx:
  format: md
---

# Type Alias: DecisionEvaluationInstanceKey

```ts
type DecisionEvaluationInstanceKey =
  CamundaKey<"DecisionEvaluationInstanceKey">;
```

System-generated identifier for a decision evaluation instance. It is composed of the
parent decision evaluation key and the 1-based index of the evaluated decision within
that evaluation, joined by a hyphen (format: `<decisionEvaluationKey>-<index>`).
