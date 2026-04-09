---
title: "Type Alias: FormResult"
sidebar_label: "FormResult"
mdx:
  format: md
---

# Type Alias: FormResult

```ts
type FormResult = object;
```

## Properties

### formId

```ts
formId: FormId;
```

The user-provided identifier of the form.

---

### formKey

```ts
formKey: FormKey;
```

The assigned key, which acts as a unique identifier for this form.

---

### schema

```ts
schema: string;
```

The form schema as a JSON document serialized as a string.

---

### tenantId

```ts
tenantId: TenantId;
```

The tenant ID of the form.

---

### version

```ts
version: number;
```

The version of the the deployed form.
