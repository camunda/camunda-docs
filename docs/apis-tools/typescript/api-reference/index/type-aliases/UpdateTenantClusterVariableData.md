---
title: "Type Alias: UpdateTenantClusterVariableData"
sidebar_label: "UpdateTenantClusterVariableData"
mdx:
  format: md
---

# Type Alias: UpdateTenantClusterVariableData

```ts
type UpdateTenantClusterVariableData = object;
```

Defined in: [gen/types.gen.ts:9009](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9009)

## Properties

### body

```ts
body: UpdateClusterVariableRequest;
```

Defined in: [gen/types.gen.ts:9010](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9010)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:9011](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9011)

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

Defined in: [gen/types.gen.ts:9021](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9021)

---

### url

```ts
url: "/cluster-variables/tenants/{tenantId}/{name}";
```

Defined in: [gen/types.gen.ts:9022](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9022)
