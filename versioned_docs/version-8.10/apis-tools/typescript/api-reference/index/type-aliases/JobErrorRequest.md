---
title: "Type Alias: JobErrorRequest"
sidebar_label: "JobErrorRequest"
mdx:
  format: md
---

# Type Alias: JobErrorRequest

```ts
type JobErrorRequest = object;
```

## Properties

### errorCode

```ts
errorCode: string;
```

The error code that will be matched with an error catch event.

---

### errorMessage?

```ts
optional errorMessage?: string | null;
```

An error message that provides additional context.

---

### leaseToken?

```ts
optional leaseToken?: string | null;
```

The token identifying a leased job's activation, obtained from `ActivatedJobResult.leaseToken`.
For a leased job, the matching token must be supplied to prove the command comes from the worker that holds the current lease; a command with no token is rejected. A command carrying a stale token is likewise rejected, fencing the job against a superseded activation (for example, after the job timed out or failed and was re-activated by another worker).
A job that was activated without a lease requires no token.

---

### variables?

```ts
optional variables?:
  | {
[key: string]: unknown;
}
  | null;
```

JSON object that will instantiate the variables at the local scope of the error catch event that catches the thrown error.
