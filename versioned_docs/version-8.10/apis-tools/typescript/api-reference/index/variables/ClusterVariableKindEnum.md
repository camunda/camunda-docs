---
title: "Variable: ClusterVariableKindEnum"
sidebar_label: "ClusterVariableKindEnum"
mdx:
  format: md
---

# Variable: ClusterVariableKindEnum

```ts
const ClusterVariableKindEnum: object;
```

The kind of a cluster variable. JSON is the default. SECRET_REFERENCE allows the value to contain camunda.secrets.X references that are resolved at job activation time.

## Type Declaration

### JSON

```ts
readonly JSON: "JSON" = 'JSON';
```

### SECRET_REFERENCE

```ts
readonly SECRET_REFERENCE: "SECRET_REFERENCE" = 'SECRET_REFERENCE';
```
