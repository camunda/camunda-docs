---
title: "Class: VariableCollector"
sidebar_label: "VariableCollector"
mdx:
  format: md
---

# Class: VariableCollector

Incrementally collapses paged variable items into a parsed name-to-value map.

Memory stays bounded by the DTO shape rather than the total number of paged items: only the
first value seen per requested name is retained, alongside the set of scope keys observed for
that name (used for collision detection). Items for undeclared variables are dropped, so large
values for variables outside the DTO are never accumulated.

## Constructors

### Constructor

```ts
new VariableCollector(queryNames): VariableCollector;
```

#### Parameters

##### queryNames

`Iterable`\<`string`\>

#### Returns

`VariableCollector`

## Methods

### build()

```ts
build(): Record<string, unknown>;
```

Parse retained values, raising on scope collisions or malformed JSON.

#### Returns

`Record`\<`string`, `unknown`\>

#### Throws

when a name was observed at more than one scope.

#### Throws

when a retained value is not valid JSON.

---

### ingest()

```ts
ingest(items): void;
```

Fold one page of results into the retained per-name state.

#### Parameters

##### items

`Iterable`\<[`TypedVariableItem`](../interfaces/TypedVariableItem.md)\>

#### Returns

`void`
