---
title: "Type Alias: ChangeClusterModeData"
sidebar_label: "ChangeClusterModeData"
mdx:
  format: md
---

# Type Alias: ChangeClusterModeData

```ts
type ChangeClusterModeData = object;
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

---

### url

```ts
url: "/mode";
```
