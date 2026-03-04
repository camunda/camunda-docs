---
title: "Type Alias: GetStartProcessFormResponses"
sidebar_label: "GetStartProcessFormResponses"
mdx:
  format: md
---

# Type Alias: GetStartProcessFormResponses

```ts
type GetStartProcessFormResponses = object;
```

Defined in: [gen/types.gen.ts:12916](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12916)

## Properties

### 200

```ts
200: object;
```

Defined in: [gen/types.gen.ts:12920](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12920)

The form is successfully returned.

#### formId?

```ts
optional formId: FormId;
```

The user-provided identifier of the form.

#### formKey?

```ts
optional formKey: FormKey;
```

The assigned key, which acts as a unique identifier for this form.

#### schema?

```ts
optional schema: object;
```

The form content.

##### Index Signature

```ts
[key: string]: unknown
```

#### tenantId?

```ts
optional tenantId: TenantId;
```

The tenant ID of the form.

#### version?

```ts
optional version: number;
```

The version of the the deployed form.

---

### 204

```ts
204: void;
```

Defined in: [gen/types.gen.ts:12947](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12947)

The process was found, but no form is associated with it.
