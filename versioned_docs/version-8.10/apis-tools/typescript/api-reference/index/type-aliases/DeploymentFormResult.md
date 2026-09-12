---
title: "Type Alias: DeploymentFormResult"
sidebar_label: "DeploymentFormResult"
mdx:
  format: md
---

# Type Alias: DeploymentFormResult

```ts
type DeploymentFormResult = object;
```

A deployed form.

## Properties

### formId

```ts
formId: FormId;
```

The form ID, as parsed during deployment, together with the version forms a
unique identifier for a specific form.

---

### formKey

```ts
formKey: FormKey;
```

The assigned key, which acts as a unique identifier for this form.

---

### resourceName

```ts
resourceName: string;
```

The name of the resource.

---

### tenantId

```ts
tenantId: TenantId;
```

---

### version

```ts
version: number;
```

The version of the deployed form.
