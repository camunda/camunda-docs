---
title: "Type Alias: GetProcessDefinitionXmlData"
sidebar_label: "GetProcessDefinitionXmlData"
mdx:
  format: md
---

# Type Alias: GetProcessDefinitionXmlData

```ts
type GetProcessDefinitionXmlData = object;
```

## Properties

### body?

```ts
optional body?: never;
```

---

### path

```ts
path: object;
```

#### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
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
url: "/process-definitions/{processDefinitionKey}/xml";
```
