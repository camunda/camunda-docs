---
title: "Type Alias: AgentInstanceMessageContent"
sidebar_label: "AgentInstanceMessageContent"
mdx:
  format: md
---

# Type Alias: AgentInstanceMessageContent

```ts
type AgentInstanceMessageContent =
  | (object & AgentInstanceTextContent)
  | (object & AgentInstanceDocumentContent)
  | (object & AgentInstanceObjectContent);
```

A single content block within a history item. Discriminated by `contentType`.
