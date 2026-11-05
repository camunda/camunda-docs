---
title: "Type Alias: ProcessInstanceFilterFields"
sidebar_label: "ProcessInstanceFilterFields"
mdx:
  format: md
---

# Type Alias: ProcessInstanceFilterFields

```ts
type ProcessInstanceFilterFields = BaseProcessInstanceFilterFields & object;
```

Process instance search filter.

## Type Declaration

### processDefinitionId?

```ts
processDefinitionId?: StringFilterProperty;
```

The process definition id.

### processDefinitionKey?

```ts
processDefinitionKey?: ProcessDefinitionKeyFilterProperty;
```

The process definition key.

### processDefinitionName?

```ts
processDefinitionName?: StringFilterProperty;
```

The process definition name.

### processDefinitionVersion?

```ts
processDefinitionVersion?: IntegerFilterProperty;
```

The process definition version.

### processDefinitionVersionTag?

```ts
processDefinitionVersionTag?: StringFilterProperty;
```

The process definition version tag.
