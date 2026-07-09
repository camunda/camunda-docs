---
title: "Type Alias: AgentInstanceResult"
sidebar_label: "AgentInstanceResult"
mdx:
  format: md
---

# Type Alias: AgentInstanceResult

```ts
type AgentInstanceResult = object;
```

## Properties

### agentInstanceKey

```ts
agentInstanceKey: AgentInstanceKey;
```

The unique key for this agent instance.

---

### completionDate

```ts
completionDate: string | null;
```

The date when this agent instance completed. Null while the agent is still running.

---

### creationDate

```ts
creationDate: string;
```

The date when this agent instance was created.

---

### definition

```ts
definition: AgentInstanceDefinition;
```

The static definition of the agent, including model, provider, and system prompt.

---

### elementId

```ts
elementId: ElementId;
```

The BPMN element ID of the ad-hoc sub-process or AI agent task that owns this agent instance.

---

### elementInstanceKeys

```ts
elementInstanceKeys: ElementInstanceKey[];
```

The keys of all element instances associated with this agent instance.

---

### lastUpdatedDate

```ts
lastUpdatedDate: string;
```

The date when this agent instance was last updated.

---

### limits

```ts
limits: AgentInstanceLimits;
```

The configured limits for this agent instance, set once at creation.

---

### metrics

```ts
metrics: AgentInstanceMetrics;
```

Aggregated metrics across all iterations of this agent instance.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

The BPMN process ID of the process definition associated with this agent instance.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The key of the process definition associated with this agent instance.

---

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

The version of the process definition associated with this agent instance.

---

### processDefinitionVersionTag

```ts
processDefinitionVersionTag: string | null;
```

The version tag of the process definition associated with this agent instance.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance that owns this agent instance.

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey;
```

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy.

---

### status

```ts
status: AgentInstanceStatusEnum;
```

---

### tenantId

```ts
tenantId: TenantId;
```

The tenant ID of this agent instance.

---

### tools

```ts
tools: AgentTool[];
```

The tools available to the agent.
