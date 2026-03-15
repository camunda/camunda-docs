---
title: "Type Alias: GlobalTaskListenerSearchQueryFilterRequest"
sidebar_label: "GlobalTaskListenerSearchQueryFilterRequest"
mdx:
  format: md
---

# Type Alias: GlobalTaskListenerSearchQueryFilterRequest

```ts
type GlobalTaskListenerSearchQueryFilterRequest = object;
```

Defined in: [gen/types.gen.ts:3013](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3013)

Global listener filter request.

## Properties

### afterNonGlobal?

```ts
optional afterNonGlobal: boolean;
```

Defined in: [gen/types.gen.ts:3033](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3033)

Whether the listener runs after model-level listeners.

***

### eventTypes?

```ts
optional eventTypes: GlobalTaskListenerEventTypeFilterProperty[];
```

Defined in: [gen/types.gen.ts:3029](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3029)

Event types of the global listener.

***

### id?

```ts
optional id: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3017](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3017)

Id of the global listener.

***

### priority?

```ts
optional priority: IntegerFilterProperty;
```

Defined in: [gen/types.gen.ts:3037](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3037)

Priority of the global listener.

***

### retries?

```ts
optional retries: IntegerFilterProperty;
```

Defined in: [gen/types.gen.ts:3025](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3025)

Number of retries of the global listener.

***

### source?

```ts
optional source: GlobalListenerSourceFilterProperty;
```

Defined in: [gen/types.gen.ts:3041](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3041)

How the global listener was defined.

***

### type?

```ts
optional type: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3021](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3021)

Job type of the global listener.
