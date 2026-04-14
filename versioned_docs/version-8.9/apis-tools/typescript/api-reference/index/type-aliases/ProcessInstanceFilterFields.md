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
optional processDefinitionId?: StringFilterProperty;
```

The process definition id.

### processDefinitionKey?

```ts
optional processDefinitionKey?: ProcessDefinitionKeyFilterProperty;
```

The process definition key.

### processDefinitionName?

```ts
optional processDefinitionName?: StringFilterProperty;
```

The process definition name.

### processDefinitionVersion?

```ts
optional processDefinitionVersion?: IntegerFilterProperty;
```

The process definition version.

### processDefinitionVersionTag?

```ts
optional processDefinitionVersionTag?: StringFilterProperty;
```

The process definition version tag.
