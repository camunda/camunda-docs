---
title: "Type Alias: ChangeClusterModeAsClusterAdminData"
sidebar_label: "ChangeClusterModeAsClusterAdminData"
mdx:
  format: md
---

# Type Alias: ChangeClusterModeAsClusterAdminData

```ts
type ChangeClusterModeAsClusterAdminData = object;
```

## Properties

### body?

```ts
optional body?: never;
```

---

### path?

```ts
optional path?: never;
```

---

### query

```ts
query: object;
```

#### dryRun?

```ts
optional dryRun?: boolean;
```

If true, the requested change is only validated and the resulting plan is returned, without applying it to the cluster.

#### mode

```ts
mode: Mode;
```

The target cluster mode.

#### physicalTenantId?

```ts
optional physicalTenantId?: string;
```

The physical tenant to apply the change to. When omitted, or when passed with an empty value, the change is applied to every physical tenant of the cluster.

---

### url

```ts
url: "/cluster/v2/mode";
```
