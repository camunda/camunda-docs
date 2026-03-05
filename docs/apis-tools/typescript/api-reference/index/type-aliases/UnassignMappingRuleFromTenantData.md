---
title: "Type Alias: UnassignMappingRuleFromTenantData"
sidebar_label: "UnassignMappingRuleFromTenantData"
mdx:
  format: md
---

# Type Alias: UnassignMappingRuleFromTenantData

```ts
type UnassignMappingRuleFromTenantData = object;
```

Defined in: [gen/types.gen.ts:15134](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15134)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:15135](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15135)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15136](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15136)

#### mappingRuleId

```ts
mappingRuleId: string;
```

The unique identifier of the mapping rule.

#### tenantId

```ts
tenantId: TenantId;
```

The unique identifier of the tenant.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:15146](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15146)

***

### url

```ts
url: "/tenants/{tenantId}/mapping-rules/{mappingRuleId}";
```

Defined in: [gen/types.gen.ts:15147](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15147)
