---
title: "Type Alias: UserTaskUpdateRequest"
sidebar_label: "UserTaskUpdateRequest"
mdx:
  format: md
---

# Type Alias: UserTaskUpdateRequest

```ts
type UserTaskUpdateRequest = object;
```

Defined in: [gen/types.gen.ts:7760](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7760)

## Properties

### action?

```ts
optional action?: string | null;
```

Defined in: [gen/types.gen.ts:7766](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7766)

A custom action value that will be accessible from user task events resulting from this endpoint invocation. If not provided, it will default to "update".

---

### changeset?

```ts
optional changeset?: Changeset;
```

Defined in: [gen/types.gen.ts:7761](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7761)
