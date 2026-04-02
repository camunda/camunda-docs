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

Defined in: [gen/types.gen.ts:2917](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2917)

## Properties

### formId

```ts
formId: FormId;
```

Defined in: [gen/types.gen.ts:2925](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2925)

The user-provided identifier of the form.

---

### formKey

```ts
formKey: FormKey;
```

Defined in: [gen/types.gen.ts:2937](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2937)

The assigned key, which acts as a unique identifier for this form.

---

### schema

```ts
schema: string;
```

Defined in: [gen/types.gen.ts:2929](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2929)

The form schema as a JSON document serialized as a string.

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2921](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2921)

The tenant ID of the form.

---

### version

```ts
version: number;
```

Defined in: [gen/types.gen.ts:2933](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2933)

The version of the the deployed form.
