---
title: "Type Alias: AgentTool"
sidebar_label: "AgentTool"
mdx:
  format: md
---

# Type Alias: AgentTool

```ts
type AgentTool = object;
```

A tool available to the agent.

## Properties

### description

```ts
description: string | null;
```

A human-readable description of the tool.

---

### elementId

```ts
elementId: string | null;
```

The BPMN element ID of the tool element within the ad-hoc sub-process.

---

### name

```ts
name: string;
```

The tool name as visible to the LLM.
