---
title: "Type Alias: GlobalListenerBase"
sidebar_label: "GlobalListenerBase"
mdx:
  format: md
---

# Type Alias: GlobalListenerBase

```ts
type GlobalListenerBase = object;
```

## Properties

### afterNonGlobal?

```ts
optional afterNonGlobal?: boolean;
```

Whether the listener should run after model-level listeners.

---

### priority?

```ts
optional priority?: number;
```

The priority of the listener. Higher priority listeners are executed before lower priority ones.

---

### retries?

```ts
optional retries?: number;
```

Number of retries for the listener job.

---

### type?

```ts
optional type?: string;
```

The name of the job type, used as a reference to specify which job workers request the respective listener job.
