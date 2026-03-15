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

Defined in: [gen/types.gen.ts:2197](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2197)

A deployed form.

## Properties

### formId

```ts
formId: FormId;
```

Defined in: [gen/types.gen.ts:2203](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2203)

The form ID, as parsed during deployment, together with the version forms a
unique identifier for a specific form.

***

### formKey

```ts
formKey: FormKey;
```

Defined in: [gen/types.gen.ts:2216](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2216)

The assigned key, which acts as a unique identifier for this form.

***

### resourceName

```ts
resourceName: string;
```

Defined in: [gen/types.gen.ts:2211](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2211)

The name of the resource.

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2212](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2212)

***

### version

```ts
version: number;
```

Defined in: [gen/types.gen.ts:2207](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2207)

The version of the deployed form.
