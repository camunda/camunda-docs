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

### variables?

```ts
optional variables?:
  | {
[key: string]: unknown;
}
  | null;
```

JSON object that will instantiate the variables at the local scope of the error catch event that catches the thrown error.
