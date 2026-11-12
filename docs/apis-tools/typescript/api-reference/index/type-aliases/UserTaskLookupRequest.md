---
title: "Type Alias: UserTaskLookupRequest"
sidebar_label: "UserTaskLookupRequest"
mdx:
  format: md
---

# Type Alias: UserTaskLookupRequest

```ts
type UserTaskLookupRequest = object;
```

## Properties

### fetchVariables?

```ts
fetchVariables?: string[];
```

The names of the variables to return. If absent or empty, all variables visible to the user task are returned. A name without a matching variable is left out of the response.
