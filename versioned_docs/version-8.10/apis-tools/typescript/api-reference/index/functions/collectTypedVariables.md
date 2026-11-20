---
title: "Function: collectTypedVariables()"
sidebar_label: "collectTypedVariables()"
mdx:
  format: md
---

# Function: collectTypedVariables()

```ts
function collectTypedVariables<TSchema>(params): Promise<VariableMap<TSchema>>;
```

Page through variable search results until every declared variable is found or the result set
is exhausted, then collapse them into a [VariableMap](../classes/VariableMap.md).

Eventual-consistency waiting (when `consistency.waitUpToMs > 0`) is applied here, at the
collection level — not on the underlying search calls. A freshly-written instance indexes its
declared variables independently, so an early read can return only a subset (e.g. `orderId`
before `amount`). Waiting on the first _search_ alone is too weak: that search's success
condition is "at least one matching variable", so it settles on a partial result. Instead we
re-run the whole collection until every declared name is visible or the budget expires. On
expiry we return the best snapshot gathered so far rather than throwing: a genuinely-absent
variable is indistinguishable from a late one, and [VariableMap.validate](../classes/VariableMap.md#validate) is the right
place to surface a missing required variable. This also keeps pagination correct — a paging
read that legitimately returns zero items never blocks, because the inner search never waits.

The `fetchPage` callback isolates the HTTP call so the paging and collapse logic is
unit-testable in isolation; `clock` isolates time so the consistency loop is too.

## Type Parameters

### TSchema

`TSchema` _extends_ [`AnyVariableSchema`](../type-aliases/AnyVariableSchema.md)

## Parameters

### params

#### clock?

`CollectClock`

Injectable clock for deterministic tests; defaults to real time.

#### consistency?

`VariableConsistencyOptions`

Eventual-consistency tolerance. Omitted or `waitUpToMs: 0` reads exactly once.

#### fetchPage

(`after`) => `Promise`\<[`TypedVariablePage`](../interfaces/TypedVariablePage.md)\>

#### schema

`TSchema`

#### singleScope

`boolean`

Whether the query is scoped to a single scope (collisions impossible, early-stop safe).

## Returns

`Promise`\<[`VariableMap`](../classes/VariableMap.md)\<`TSchema`\>\>
