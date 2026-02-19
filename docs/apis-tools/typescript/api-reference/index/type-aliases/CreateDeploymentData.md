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

Defined in: [gen/types.gen.ts:9939](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9939)

## Properties

### body

```ts
body: object;
```

Defined in: [gen/types.gen.ts:9940](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9940)

#### resources

```ts
resources: (Blob | File)[];
```

The binary data to create the deployment resources. It is possible to have more than one form part with different form part names for the binary data to create a deployment.

#### tenantId?

```ts
optional tenantId: TenantId;
```

---

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:9948](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9948)

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:9949](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9949)

---

### url

```ts
url: "/deployments";
```

Defined in: [gen/types.gen.ts:9950](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9950)
