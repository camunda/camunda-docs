---
title: "Type Alias: SearchProcessDefinitionVariableNamesData"
sidebar_label: "SearchProcessDefinitionVariableNamesData"
mdx:
  format: md
---

# Type Alias: SearchProcessDefinitionVariableNamesData

```ts
type SearchProcessDefinitionVariableNamesData = object;
```

## Properties

### body?

```ts
optional body?: ProcessDefinitionVariableNameSearchQuery;
```

---

### path

```ts
path: object;
```

#### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKeyWritable;
```

The assigned key of the process definition, which acts as a unique identifier for this process definition.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/process-definitions/{processDefinitionKey}/variable-names/search";
```
