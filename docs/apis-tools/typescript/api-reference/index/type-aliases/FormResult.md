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

Defined in: [gen/types.gen.ts:2912](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2912)

## Properties

### formId?

```ts
optional formId: FormId;
```

Defined in: [gen/types.gen.ts:2920](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2920)

The user-provided identifier of the form.

***

### formKey?

```ts
optional formKey: FormKey;
```

Defined in: [gen/types.gen.ts:2934](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2934)

The assigned key, which acts as a unique identifier for this form.

***

### schema?

```ts
optional schema: object;
```

Defined in: [gen/types.gen.ts:2924](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2924)

The form content.

#### Index Signature

```ts
[key: string]: unknown
```

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2916](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2916)

The tenant ID of the form.

***

### version?

```ts
optional version: number;
```

Defined in: [gen/types.gen.ts:2930](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2930)

The version of the the deployed form.
