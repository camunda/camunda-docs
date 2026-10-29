---
title: "Type Alias: ResourceFilter"
sidebar_label: "ResourceFilter"
mdx:
  format: md
---

# Type Alias: ResourceFilter

```ts
type ResourceFilter = object;
```

Resource search filter.

## Properties

### deploymentKey?

```ts
deploymentKey?: DeploymentKeyFilterProperty;
```

Deployment key of this resource.

---

### resourceId?

```ts
resourceId?: StringFilterProperty;
```

Resource ID of this resource.

---

### resourceKey?

```ts
resourceKey?: ResourceKeyFilterProperty;
```

The key for this resource.

---

### resourceName?

```ts
resourceName?: StringFilterProperty;
```

Resource name of this resource.

---

### tenantId?

```ts
tenantId?: TenantId;
```

Tenant ID of this resource.

---

### version?

```ts
version?: IntegerFilterProperty;
```

Version of this resource.

---

### versionTag?

```ts
versionTag?: StringFilterProperty;
```

Version tag of this resource.
