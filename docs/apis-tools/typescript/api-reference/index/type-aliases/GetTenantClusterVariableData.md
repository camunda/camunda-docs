---
title: "Type Alias: GetTenantClusterVariableData"
sidebar_label: "GetTenantClusterVariableData"
mdx:
  format: md
---

# Type Alias: GetTenantClusterVariableData

```ts
type GetTenantClusterVariableData = object;
```

Defined in: [gen/types.gen.ts:8959](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8959)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:8960](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8960)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:8961](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8961)

#### name

```ts
name: string;
```

The name of the cluster variable

#### tenantId

```ts
tenantId: TenantId;
```

The tenant ID

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:8971](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8971)

---

### url

```ts
url: "/cluster-variables/tenants/{tenantId}/{name}";
```

Defined in: [gen/types.gen.ts:8972](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8972)
