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

Defined in: [gen/types.gen.ts:6423](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6423)

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
