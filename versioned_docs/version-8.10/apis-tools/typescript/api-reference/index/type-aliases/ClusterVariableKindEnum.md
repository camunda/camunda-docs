---
title: "Type Alias: ClusterVariableKindEnum"
sidebar_label: "ClusterVariableKindEnum"
mdx:
  format: md
---

# Type Alias: ClusterVariableKindEnum

```ts
type ClusterVariableKindEnum =
  (typeof ClusterVariableKindEnum)[keyof typeof ClusterVariableKindEnum];
```

The kind of a cluster variable. JSON is the default. SECRET_REFERENCE allows the value to contain camunda.secrets.X references that are resolved at job activation time.
