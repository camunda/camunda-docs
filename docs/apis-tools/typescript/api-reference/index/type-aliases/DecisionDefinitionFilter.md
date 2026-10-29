---
title: "Type Alias: DecisionDefinitionFilter"
sidebar_label: "DecisionDefinitionFilter"
mdx:
  format: md
---

# Type Alias: DecisionDefinitionFilter

```ts
type DecisionDefinitionFilter = object;
```

Decision definition search filter.

## Properties

### decisionDefinitionId?

```ts
decisionDefinitionId?: DecisionDefinitionId;
```

The DMN ID of the decision definition.

---

### decisionDefinitionKey?

```ts
decisionDefinitionKey?: DecisionDefinitionKey;
```

The assigned key, which acts as a unique identifier for this decision definition.

---

### decisionRequirementsId?

```ts
decisionRequirementsId?: string;
```

the DMN ID of the decision requirements graph that the decision definition is part of.

---

### decisionRequirementsKey?

```ts
decisionRequirementsKey?: DecisionRequirementsKey;
```

The assigned key of the decision requirements graph that the decision definition is part of.

---

### decisionRequirementsName?

```ts
decisionRequirementsName?: string;
```

The DMN name of the decision requirements that the decision definition is part of.

---

### decisionRequirementsVersion?

```ts
decisionRequirementsVersion?: number;
```

The assigned version of the decision requirements that the decision definition is part of.

---

### isLatestVersion?

```ts
isLatestVersion?: boolean;
```

Whether to only return the latest version of each decision definition.
When using this filter, pagination functionality is limited, you can only paginate forward using `after` and `limit`.
The response contains no `startCursor` in the `page`, and requests ignore the `from` and `before` in the `page`.

---

### name?

```ts
name?: string;
```

The DMN name of the decision definition.

---

### tenantId?

```ts
tenantId?: TenantId;
```

The tenant ID of the decision definition.

---

### version?

```ts
version?: number;
```

The assigned version of the decision definition.
