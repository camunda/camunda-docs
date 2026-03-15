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

Defined in: [gen/types.gen.ts:6412](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6412)

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
