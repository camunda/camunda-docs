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

Defined in: [gen/types.gen.ts:6337](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6337)

Process instance search filter.

## Type Declaration

### processDefinitionId?

```ts
optional processDefinitionId: StringFilterProperty;
```

The process definition id.

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKeyFilterProperty;
```

The process definition key.

### processDefinitionName?

```ts
optional processDefinitionName: StringFilterProperty;
```

The process definition name.

### processDefinitionVersion?

```ts
optional processDefinitionVersion: IntegerFilterProperty;
```

The process definition version.

### processDefinitionVersionTag?

```ts
optional processDefinitionVersionTag: StringFilterProperty;
```

The process definition version tag.
