---
title: "Type Alias: AgentInstanceDefinition"
sidebar_label: "AgentInstanceDefinition"
mdx:
  format: md
---

# Type Alias: AgentInstanceDefinition

```ts
type AgentInstanceDefinition = object;
```

The static definition of an agent instance, set once at creation.

## Properties

### model

```ts
model: string;
```

The LLM model identifier (for example, gpt-4o).

---

### provider

```ts
provider: string;
```

The LLM provider (for example, openai or anthropic).

---

### systemPrompt

```ts
systemPrompt: string;
```

The system prompt configured for this agent instance.
