---
title: "Class: VariableMap<TSchema>"
sidebar_label: "VariableMap<TSchema>"
mdx:
  format: md
---

# Class: VariableMap\<TSchema\>

Result of a DTO-driven variable search.

Holds the parsed variable values keyed by their declared name. Provides lenient, defensive
access via [has](#has) / [get](#get), and a strict [validate](#validate) that parses the values
against the schema — returning a fully-typed object or throwing a `ZodError` when a required
variable is missing or malformed.

## Type Parameters

### TSchema

`TSchema` _extends_ [`AnyVariableSchema`](../type-aliases/AnyVariableSchema.md)

## Constructors

### Constructor

```ts
new VariableMap<TSchema>(_raw, _schema): VariableMap<TSchema>;
```

#### Parameters

##### \_raw

`Readonly`\<`Record`\<`string`, `unknown`\>\>

##### \_schema

`TSchema`

#### Returns

`VariableMap`\<`TSchema`\>

## Accessors

### raw

#### Get Signature

```ts
get raw(): Readonly<Record<string, unknown>>;
```

The parsed variable values, keyed by variable name.

##### Returns

`Readonly`\<`Record`\<`string`, `unknown`\>\>

## Methods

### get()

```ts
get<K>(variableName): K extends keyof input<TSchema> ? input<TSchema>[K] | undefined : undefined;
```

Lenient access. Returns the JSON-parsed wire value, or `undefined` when the variable is absent.

The value is _not_ run through the schema, so a declared key is narrowed to that field's schema
_input_ type (`z.input`) unioned with `undefined` — not the post-validation output type. This
keeps the type honest for schemas with transforms or effects, where the parsed wire value can
differ from `validate()`'s output. Any other key resolves to `undefined`: the result only ever
holds the declared variable names, so an undeclared key can never carry a value.

#### Type Parameters

##### K

`K` _extends_ `string`

#### Parameters

##### variableName

`K`

#### Returns

`K` _extends_ keyof `input`\<`TSchema`\> ? `input`\<`TSchema`\>\[`K`\] \| `undefined` : `undefined`

---

### has()

#### Call Signature

```ts
has(variableName): boolean;
```

Whether a variable with the given name is present in the result.

##### Parameters

###### variableName

keyof `input`\<`TSchema`\> & `string`

##### Returns

`boolean`

#### Call Signature

```ts
has(variableName): boolean;
```

Whether a variable with the given name is present in the result.

##### Parameters

###### variableName

`string`

##### Returns

`boolean`

---

### validate()

```ts
validate(): output<TSchema>;
```

Strict access. Parses the collected values against the schema and returns the typed object.
Required variables must be present and well-formed, otherwise a `ZodError` is thrown.

#### Returns

`output`\<`TSchema`\>
