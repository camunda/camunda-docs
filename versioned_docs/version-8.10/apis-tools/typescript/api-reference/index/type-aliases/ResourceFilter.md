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
optional deploymentKey?: DeploymentKeyFilterProperty;
```

Deployment key of this resource.

---

### resourceId?

```ts
optional resourceId?: StringFilterProperty;
```

Resource ID of this resource.

---

### resourceKey?

```ts
optional resourceKey?: ResourceKeyFilterProperty;
```

The key for this resource.

---

### resourceName?

```ts
optional resourceName?: StringFilterProperty;
```

Resource name of this resource.

---

### tenantId?

```ts
optional tenantId?: TenantId;
```

Tenant ID of this resource.

---

### version?

```ts
optional version?: IntegerFilterProperty;
```

Version of this resource.

---

### versionTag?

```ts
optional versionTag?: StringFilterProperty;
```

Version tag of this resource.
