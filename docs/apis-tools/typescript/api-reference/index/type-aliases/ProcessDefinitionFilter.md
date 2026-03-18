---
title: "Type Alias: ProcessDefinitionFilter"
sidebar_label: "ProcessDefinitionFilter"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionFilter

```ts
type ProcessDefinitionFilter = object;
```

Defined in: [gen/types.gen.ts:5099](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5099)

Process definition search filter.

## Properties

### hasStartForm?

```ts
optional hasStartForm: boolean;
```

Defined in: [gen/types.gen.ts:5138](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5138)

Indicates whether the start event of the process has an associated Form Key.

---

### isLatestVersion?

```ts
optional isLatestVersion: boolean;
```

Defined in: [gen/types.gen.ts:5110](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5110)

Whether to only return the latest version of each process definition.
When using this filter, pagination functionality is limited, you can only paginate forward using `after` and `limit`.
The response contains no `startCursor` in the `page`, and requests ignore the `from` and `before` in the `page`.

---

### name?

```ts
optional name: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5103](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5103)

Name of this process definition.

---

### processDefinitionId?

```ts
optional processDefinitionId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5126](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5126)

Process definition ID of this process definition.

---

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:5134](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5134)

The key for this process definition.

---

### resourceName?

```ts
optional resourceName: string;
```

Defined in: [gen/types.gen.ts:5114](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5114)

Resource name of this process definition.

---

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5130](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5130)

Tenant ID of this process definition.

---

### version?

```ts
optional version: number;
```

Defined in: [gen/types.gen.ts:5118](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5118)

Version of this process definition.

---

### versionTag?

```ts
optional versionTag: string;
```

Defined in: [gen/types.gen.ts:5122](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5122)

Version tag of this process definition.
