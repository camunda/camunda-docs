---
id: cluster-variable-metadata
title: Metadata
sidebar_label: "Metadata"
description: "Attach and filter searchable key-value metadata on cluster variables."
---

Attach a searchable key-value metadata bag to a cluster variable so consumers can discover and filter variables by semantic metadata without inspecting the variable's value.

## About metadata

Each cluster variable can carry an optional `metadata` bag: a map of string keys to scalar values. Metadata is stored alongside the variable but kept separate from its `value`.

Use metadata to annotate variables with information that helps consumers find them. For example, a credential stored as a cluster variable can be annotated with `kind=CREDENTIAL`, `schemaRef=io.camunda.connector.slack:1`, and `schemaVersion=2`, so a client can query for all variables that match those attributes without knowing the variable's actual content.

Metadata is opaque to Camunda: the engine does not interpret key names or values, and assigns no meaning to the absence of a metadata bag. A variable can have an empty or absent bag.

## Structure and constraints

- Keys are strings.
- Values must be **scalars — strings or numbers only**. Booleans, arrays, and objects are rejected when creating or updating a variable.
- A bag is limited to **100 entries** and a configurable maximum serialized size. By default this allows up to 100 entries, each with a key up to 256 characters and a value up to 8192 characters.

Requests that exceed these limits, or that use an unsupported value type, are rejected at the API boundary.

## Metadata is not part of the runtime value

The metadata bag is never exposed in the FEEL-accessible value. When a process evaluates `camunda.vars.env.<name>` (or the `cluster`/`tenant` namespaces), it resolves to the variable's `value` field only — metadata keys never appear. See [how to use cluster variables](./usage-guide.md) for FEEL access patterns.

## Set metadata

Set metadata when creating or updating a cluster variable through the [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/specifications/create-global-cluster-variable.api.mdx). For example:

```json
{
  "name": "SLACK_CREDENTIAL",
  "scope": "GLOBAL",
  "value": { "token": "xoxb-..." },
  "metadata": {
    "kind": "CREDENTIAL",
    "schemaRef": "io.camunda.connector.slack:1",
    "schemaVersion": 2
  }
}
```

Metadata is returned on every get and search response.

## Filter by metadata

The [search cluster variables](/apis-tools/orchestration-cluster-api-rest/specifications/search-cluster-variables.api.mdx) endpoint accepts a `metadata` filter: a map of metadata key to an advanced filter on that key's value. Each key supports the following operators:

| Operator                     | Description                               |
| ---------------------------- | ----------------------------------------- |
| `$eq`                        | Equal to the provided value.              |
| `$neq`                       | Not equal to the provided value.          |
| `$exists`                    | Whether the metadata key is present.      |
| `$gt`, `$gte`, `$lt`, `$lte` | Numeric range comparisons (numbers only). |
| `$in`                        | Matches any of the provided values.       |
| `$like`                      | Matches a wildcard pattern (strings).     |

A bare value is shorthand for `$eq` (exact match); use the operator form only when you need one of the operators above. Multiple metadata keys are combined with `AND`, and metadata filters can be combined with other filters such as `scope` and `name`. For example, to find all variables of kind `CREDENTIAL` for a given schema at version `2` or higher:

```json
{
  "filter": {
    "scope": "GLOBAL",
    "metadata": {
      "kind": "CREDENTIAL",
      "schemaRef": "io.camunda.connector.slack:1",
      "schemaVersion": { "$gte": 2 }
    }
  }
}
```
