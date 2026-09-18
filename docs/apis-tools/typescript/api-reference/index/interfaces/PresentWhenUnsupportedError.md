---
title: "Interface: PresentWhenUnsupportedError"
sidebar_label: "PresentWhenUnsupportedError"
mdx:
  format: md
---

# Interface: PresentWhenUnsupportedError

Raised by a generated dependent-presence (`x-present-when`) guard when the
server returns a response shape that predates the feature — e.g. a lease
token was requested but the payload cannot support the derived presence
contract. It is **terminal, not transient**: retrying the same request
against the same server can never satisfy the contract, so it is marked
`nonRetryable` and a job worker stops rather than looping on backoff.

## Extends

- `Error`

## Properties

### cause?

```ts
optional cause?: unknown;
```

#### Overrides

```ts
Error.cause;
```

---

### name

```ts
name: "PresentWhenUnsupportedError";
```

#### Overrides

```ts
Error.name;
```

---

### nonRetryable

```ts
nonRetryable: true;
```

Always `true` — retrying cannot change an unsupported server response shape.

---

### operationId?

```ts
optional operationId?: string;
```
