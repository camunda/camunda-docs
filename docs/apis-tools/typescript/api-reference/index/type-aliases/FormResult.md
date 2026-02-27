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

Defined in: [gen/types.gen.ts:2759](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2759)

## Properties

### formId?

```ts
optional formId: FormId;
```

Defined in: [gen/types.gen.ts:2767](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2767)

The user-provided identifier of the form.

---

### formKey?

```ts
optional formKey: FormKey;
```

Defined in: [gen/types.gen.ts:2781](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2781)

The assigned key, which acts as a unique identifier for this form.

---

### schema?

```ts
optional schema: object;
```

Defined in: [gen/types.gen.ts:2771](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2771)

The form content.

#### Index Signature

```ts
[key: string]: unknown
```

---

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2763](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2763)

The tenant ID of the form.

---

### version?

```ts
optional version: number;
```

Defined in: [gen/types.gen.ts:2777](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2777)

The version of the the deployed form.
