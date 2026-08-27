---
title: "Type Alias: RestoreAsClusterAdminData"
sidebar_label: "RestoreAsClusterAdminData"
mdx:
  format: md
---

# Type Alias: RestoreAsClusterAdminData

```ts
type RestoreAsClusterAdminData = object;
```

## Properties

### body

```ts
body: ClusterRestoreRequest;
```

---

### path?

```ts
optional path?: never;
```

---

### query?

```ts
optional query?: object;
```

#### dryRun?

```ts
optional dryRun?: boolean;
```

If true, the requested change is only validated and the resulting plan is returned, without applying it to the cluster.

#### physicalTenantId?

```ts
optional physicalTenantId?: string;
```

The physical tenant to apply the change to. When omitted, or when passed with an empty value, the change is applied to every physical tenant of the cluster.

---

### url

```ts
url: "/cluster/v2/restore";
```
