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

Defined in: [gen/types.gen.ts:2914](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2914)

## Properties

### formId

```ts
formId: FormId;
```

Defined in: [gen/types.gen.ts:2922](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2922)

The user-provided identifier of the form.

***

### formKey

```ts
formKey: FormKey;
```

Defined in: [gen/types.gen.ts:2934](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2934)

The assigned key, which acts as a unique identifier for this form.

***

### schema

```ts
schema: string;
```

Defined in: [gen/types.gen.ts:2926](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2926)

The form schema as a JSON document serialized as a string.

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2918](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2918)

The tenant ID of the form.

***

### version

```ts
version: number;
```

Defined in: [gen/types.gen.ts:2930](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2930)

The version of the the deployed form.
