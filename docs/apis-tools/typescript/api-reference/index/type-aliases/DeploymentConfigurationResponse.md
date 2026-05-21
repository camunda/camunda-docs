---
title: "Type Alias: DeploymentConfigurationResponse"
sidebar_label: "DeploymentConfigurationResponse"
mdx:
  format: md
---

# Type Alias: DeploymentConfigurationResponse

```ts
type DeploymentConfigurationResponse = object;
```

Configuration for deployment characteristics.

## Properties

### contextPath

```ts
contextPath: string;
```

The servlet context path for the deployment.

---

### isEnterprise

```ts
isEnterprise: boolean;
```

Whether this is an enterprise deployment.

---

### isMultiTenancyEnabled

```ts
isMultiTenancyEnabled: boolean;
```

Whether multi-tenancy is enabled.

---

### maxRequestSize

```ts
maxRequestSize: number;
```

The maximum HTTP request size in bytes.
