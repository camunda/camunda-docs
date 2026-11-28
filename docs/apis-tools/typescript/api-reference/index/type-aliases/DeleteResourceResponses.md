---
title: "Type Alias: DeleteResourceResponses"
sidebar_label: "DeleteResourceResponses"
mdx:
  format: md
---

# Type Alias: DeleteResourceResponses

```ts
type DeleteResourceResponses = object;
```

## Properties

### 200

```ts
200: DeleteResourceResponse;
```

The resource is deleted. For a process definition that is already draining, the repeated deletion is accepted without effect and the definition stays `DRAINING`.
