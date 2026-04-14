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

## Properties

### body

```ts
body: object;
```

#### resources

```ts
resources: (Blob | File)[];
```

The binary data to create the deployment resources. It is possible to have more than one form part with different form part names for the binary data to create a deployment.

#### tenantId?

```ts
optional tenantId?: TenantId;
```

---

### path?

```ts
optional path?: never;
```

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/deployments";
```
