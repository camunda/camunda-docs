---
title: "Type Alias: SetVariableRequest"
sidebar_label: "SetVariableRequest"
mdx:
  format: md
---

# Type Alias: SetVariableRequest

```ts
type SetVariableRequest = object;
```

Defined in: [gen/types.gen.ts:7372](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7372)

## Properties

### local?

```ts
optional local: boolean;
```

Defined in: [gen/types.gen.ts:7393](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7393)

If set to true, the variables are merged strictly into the local scope (as specified by the `elementInstanceKey`).
Otherwise, the variables are propagated to upper scopes and set at the outermost one.
Let’s consider the following example:
There are two scopes '1' and '2'.
Scope '1' is the parent scope of '2'. The effective variables of the scopes are:
1 => { "foo" : 2 }
2 => { "bar" : 1 }
An update request with elementInstanceKey as '2', variables { "foo" : 5 }, and local set
to true leaves scope '1' unchanged and adjusts scope '2' to { "bar" : 1, "foo" 5 }.
By default, with local set to false, scope '1' will be { "foo": 5 }
and scope '2' will be { "bar" : 1 }.

---

### operationReference?

```ts
optional operationReference: OperationReference;
```

Defined in: [gen/types.gen.ts:7394](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7394)

---

### variables

```ts
variables: object;
```

Defined in: [gen/types.gen.ts:7376](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7376)

JSON object representing the variables to set in the element’s scope.

#### Index Signature

```ts
[key: string]: unknown
```
