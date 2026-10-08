---
id: cluster-variable-metadata
title: Metadata
sidebar_label: "Metadata"
description: "Attach searchable key-value metadata to cluster variables so consumers can discover and filter them without inspecting their values."
---

Attach searchable key-value metadata to cluster variables so consumers can discover and filter them without inspecting their values.

## About metadata

Each cluster variable can include optional metadata: a map of string keys to scalar values. Metadata is stored alongside the variable but kept separate from its `value`.

You can use metadata to annotate variables with information that helps you find them. For example, you could annotate a cluster variable containing a country’s VAT rate with `category=TAX_RATE`, `region=EU`, and `year=2026`. You can then query for all tax rates for a given region and year without knowing the variables’ actual content.

Camunda does not interpret metadata keys or values or assign meaning to missing metadata. You can provide empty metadata or omit it entirely.

## Structure and constraints

When you add metadata to a cluster variable, it must meet the following requirements:

- Keys must be strings.
- Values must be **scalars (strings or numbers only)**. You cannot use booleans, arrays, or objects.
- Metadata is limited to **100 entries** and and must not exceed the configurable maximum serialized size. By default, each key can contain up to 256 characters, and each value can contain up to 8,192 characters.

The API rejects requests that exceed these limits or contain unsupported value types.

## Metadata is not part of the runtime value

Metadata is never exposed as part of the FEEL-accessible value. When a process evaluates `camunda.vars.env.<name>` (or the `cluster`/`tenant` namespaces), the expression resolves only to the variable's `value` field.
Metadata keys are not included. See [how to use cluster variables](./usage-guide.md) for FEEL access patterns.

## Set metadata

You can set metadata when creating or updating a cluster variable through the [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/specifications/create-global-cluster-variable.api.mdx). For example:

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

Metadata is included in every get and search response.

## Filter by metadata

You can use the `metadata` filter to find cluster variables with specific metadata. For supported filters and request examples, see [search cluster variables](/apis-tools/orchestration-cluster-api-rest/specifications/search-cluster-variables.api.mdx) in the Orchestration Cluster API reference.
