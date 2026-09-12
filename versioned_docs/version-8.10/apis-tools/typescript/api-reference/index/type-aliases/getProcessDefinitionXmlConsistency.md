---
title: "Type Alias: getProcessDefinitionXmlConsistency"
sidebar_label: "getProcessDefinitionXmlConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionXmlConsistency

```ts
type getProcessDefinitionXmlConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getProcessDefinitionXml>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
