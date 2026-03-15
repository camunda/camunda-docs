---
title: "Type Alias: CreateDeploymentData"
sidebar_label: "CreateDeploymentData"
mdx:
  format: md
---

# Type Alias: CreateDeploymentData

```ts
type CreateDeploymentData = object;
```

Defined in: [gen/types.gen.ts:10040](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10040)

## Properties

### body

```ts
body: object;
```

Defined in: [gen/types.gen.ts:10041](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10041)

#### resources

```ts
resources: (Blob | File)[];
```

The binary data to create the deployment resources. It is possible to have more than one form part with different form part names for the binary data to create a deployment.

#### tenantId?

```ts
optional tenantId: TenantId;
```

***

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:10049](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10049)

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:10050](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10050)

***

### url

```ts
url: "/deployments";
```

Defined in: [gen/types.gen.ts:10051](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10051)
