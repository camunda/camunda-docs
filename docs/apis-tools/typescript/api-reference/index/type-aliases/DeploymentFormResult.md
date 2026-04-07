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

Defined in: [gen/types.gen.ts:2193](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2193)

A deployed form.

## Properties

### formId

```ts
formId: FormId;
```

Defined in: [gen/types.gen.ts:2199](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2199)

The form ID, as parsed during deployment, together with the version forms a
unique identifier for a specific form.

---

### formKey

```ts
formKey: FormKey;
```

Defined in: [gen/types.gen.ts:2212](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2212)

The assigned key, which acts as a unique identifier for this form.

---

### resourceName

```ts
resourceName: string;
```

Defined in: [gen/types.gen.ts:2207](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2207)

The name of the resource.

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2208](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2208)

---

### version

```ts
version: number;
```

Defined in: [gen/types.gen.ts:2203](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2203)

The version of the deployed form.
