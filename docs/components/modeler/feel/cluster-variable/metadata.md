---
id: cluster-variable-metadata
title: Metadata
sidebar_label: "Metadata"
description: "Attach and filter searchable key-value metadata on cluster variables."
---

Attach a searchable key-value metadata bag to a cluster variable so consumers can discover and filter variables by semantic metadata without inspecting the variable's value.

## About metadata

Each cluster variable can carry an optional `metadata` bag: a map of string keys to scalar values. Metadata is stored alongside the variable but kept separate from its `value`.

Use metadata to annotate variables with information that helps consumers find them. For example, a cluster variable holding a country's VAT rate could be annotated with `category=TAX_RATE`, `region=EU`, and `year=2026`, so a client can query for all tax rates for a given region and year without knowing the variable's actual content.

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
  "name": "DE_VAT_RATE",
  "scope": "GLOBAL",
  "value": { "rate": 0.19 },
  "metadata": {
    "category": "TAX_RATE",
    "region": "EU",
    "year": 2026
  }
}
```

Metadata is returned on every get and search response.

## Filter by metadata

The [search cluster variables](/apis-tools/orchestration-cluster-api-rest/specifications/search-cluster-variables.api.mdx) endpoint accepts a `metadata` filter. See the API reference for supported metadata filters and examples.
