---
title: "Type Alias: TriggerClusterRebalanceData"
sidebar_label: "TriggerClusterRebalanceData"
mdx:
  format: md
---

# Type Alias: TriggerClusterRebalanceData

```ts
type TriggerClusterRebalanceData = object;
```

## Properties

### body?

```ts
body?: ClusterRebalanceRequest;
```

---

### path?

```ts
path?: never;
```

---

### query?

```ts
query?: object;
```

#### dryRun?

```ts
dryRun?: boolean;
```

If true, report the plan the rebalance would carry out without pausing any partition or transferring any leadership.

---

### url

```ts
url: "/cluster/v2/rebalance";
```
