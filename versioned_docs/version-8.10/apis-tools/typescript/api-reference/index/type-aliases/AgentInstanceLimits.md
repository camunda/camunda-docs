---
title: "Type Alias: AgentInstanceLimits"
sidebar_label: "AgentInstanceLimits"
mdx:
  format: md
---

# Type Alias: AgentInstanceLimits

```ts
type AgentInstanceLimits = object;
```

The configured limits for an agent instance, set once at creation.

## Properties

### maxModelCalls

```ts
maxModelCalls: number;
```

Maximum LLM calls allowed. -1 if no limit is configured.

---

### maxTokens

```ts
maxTokens: number;
```

Maximum total tokens allowed. -1 if no limit is configured.

---

### maxToolCalls

```ts
maxToolCalls: number;
```

Maximum tool calls allowed. -1 if no limit is configured.
