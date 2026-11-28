---
title: "Type Alias: ProbeId"
sidebar_label: "ProbeId"
mdx:
  format: md
---

# Type Alias: ProbeId

```ts
type ProbeId = CamundaKey<"ProbeId">;
```

The ID of a probe, as its worker registered it: 1 to 256 characters, without whitespace,
and not `*`. The engine matches it to the probe IDs of polling workers by exact equality.
