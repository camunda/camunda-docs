---
title: "Type Alias: AgentInstanceDefinitionResult"
sidebar_label: "AgentInstanceDefinitionResult"
mdx:
  format: md
---

# Type Alias: AgentInstanceDefinitionResult

```ts
type AgentInstanceDefinitionResult = object;
```

The definition of an agent instance. Set at creation, but can change later via a
CONFIGURATION history item.

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
systemPrompt: AgentInstanceMessageContent[];
```

The system prompt configured for this agent instance, as content blocks.
