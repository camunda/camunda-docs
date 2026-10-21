---
title: "Type Alias: TriggerClusterRebalanceErrors"
sidebar_label: "TriggerClusterRebalanceErrors"
mdx:
  format: md
---

# Type Alias: TriggerClusterRebalanceErrors

```ts
type TriggerClusterRebalanceErrors = object;
```

## Properties

### 400

```ts
400: ProblemDetail;
```

The provided data is not valid.

---

### 401

```ts
401: ProblemDetail;
```

The request lacks valid authentication credentials.

---

### 409

```ts
409: ProblemDetail;
```

A rebalance or cluster configuration change is already in progress, so there is no settled configuration to plan a rebalance against.

---

### 500

```ts
500: ProblemDetail;
```

An internal error occurred while processing the request.

---

### 502

```ts
502: ProblemDetail;
```

The coordinator was reached, but its response was absent or unusable.

---

### 503

```ts
503: ProblemDetail;
```

No coordinator is currently available or reachable.

---

### 504

```ts
504: ProblemDetail;
```

The coordinator did not answer before the request timeout.
