---
title: "Type Alias: getDecisionRequirementsXmlConsistency"
sidebar_label: "getDecisionRequirementsXmlConsistency"
mdx:
  format: md
---

# Type Alias: getDecisionRequirementsXmlConsistency

```ts
type getDecisionRequirementsXmlConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getDecisionRequirementsXml>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
