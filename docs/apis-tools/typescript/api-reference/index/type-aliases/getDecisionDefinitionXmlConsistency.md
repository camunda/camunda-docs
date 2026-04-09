---
title: "Type Alias: getDecisionDefinitionXmlConsistency"
sidebar_label: "getDecisionDefinitionXmlConsistency"
mdx:
  format: md
---

# Type Alias: getDecisionDefinitionXmlConsistency

```ts
type getDecisionDefinitionXmlConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getDecisionDefinitionXml>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
