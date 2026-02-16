---
title: "Type Alias: GetProcessInstanceResponses"
sidebar_label: "GetProcessInstanceResponses"
mdx:
  format: md
---

# Type Alias: GetProcessInstanceResponses

```ts
type GetProcessInstanceResponses = object;
```

Defined in: [gen/types.gen.ts:13834](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13834)

## Properties

### 200

```ts
200: object;
```

Defined in: [gen/types.gen.ts:13838](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13838)

Process instance search response item.

#### endDate?

```ts
optional endDate: string;
```

#### hasIncident

```ts
hasIncident: boolean;
```

Whether this process instance has a related incident or not.

#### parentElementInstanceKey?

```ts
optional parentElementInstanceKey: ElementInstanceKey;
```

The parent element instance key.

#### parentProcessInstanceKey?

```ts
optional parentProcessInstanceKey: ProcessInstanceKey;
```

The parent process instance key.

#### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

#### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The process definition key.

#### processDefinitionName

```ts
processDefinitionName: string;
```

The process definition name.

#### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

#### processDefinitionVersionTag?

```ts
optional processDefinitionVersionTag: string;
```

The process definition version tag.

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of this process instance.

#### rootProcessInstanceKey?

```ts
optional rootProcessInstanceKey: ProcessInstanceKey;
```

#### startDate

```ts
startDate: string;
```

#### state

```ts
state: ProcessInstanceStateEnum;
```

#### tags?

```ts
optional tags: TagSet;
```

#### tenantId

```ts
tenantId: TenantId;
```
