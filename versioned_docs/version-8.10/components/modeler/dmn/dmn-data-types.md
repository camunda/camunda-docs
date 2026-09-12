---
id: dmn-data-types
title: Data types
description: On overview of the available data types in DMN.
---

Camunda supports the following data types for DMN:

| Type name         | Associated FEEL type                                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| number            | [Number](/components/modeler/feel/language-guide/feel-data-types.md#number)                               |
| string            | [String](/components/modeler/feel/language-guide/feel-data-types.md#string)                               |
| boolean           | [Boolean](/components/modeler/feel/language-guide/feel-data-types.md#boolean)                             |
| time              | [Time](/components/modeler/feel/language-guide/feel-data-types.md#time)                                   |
| date              | [Date](/components/modeler/feel/language-guide/feel-data-types.md#date)                                   |
| dateTime          | [Date-Time](/components/modeler/feel/language-guide/feel-data-types.md#date-time)                         |
| dayTimeDuration   | [Days-Time-Duration](/components/modeler/feel/language-guide/feel-data-types.md#days-time-duration)       |
| yearMonthDuration | [Years-Months-Duration](/components/modeler/feel/language-guide/feel-data-types.md#years-months-duration) |
| Any               | Wildcard for any type                                                                                     |

The data types can be used in the type definitions of DMN elements, for example:

- [Decision table input](decision-table-input.md#input-type-definition)
- [Decision table output](decision-table-output.md#output-type-definition)
- [Decision literal expression variable](decision-literal-expression.md#variable-type-definition)
