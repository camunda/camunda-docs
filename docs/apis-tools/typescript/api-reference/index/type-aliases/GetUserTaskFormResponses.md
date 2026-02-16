---
title: "Type Alias: GetUserTaskFormResponses"
sidebar_label: "GetUserTaskFormResponses"
mdx:
  format: md
---

# Type Alias: GetUserTaskFormResponses

```ts
type GetUserTaskFormResponses = object;
```

Defined in: [gen/types.gen.ts:17418](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17418)

## Properties

### 200

```ts
200: object;
```

Defined in: [gen/types.gen.ts:17422](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17422)

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

Defined in: [gen/types.gen.ts:17449](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17449)

The user task was found, but no form is associated with it.
