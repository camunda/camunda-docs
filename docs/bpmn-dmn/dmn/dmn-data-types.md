---
id: dmn-data-types
title: Data types
description: On overview of the available data types in DMN.
---

The Camunda Platform supports the following data types for DMN:

| Type name         | Associated FEEL type                                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| number            | [Number](/bpmn-dmn/feel/language-guide/feel-data-types.md#number)                               |
| string            | [String](/bpmn-dmn/feel/language-guide/feel-data-types.md#string)                               |
| boolean           | [Boolean](/bpmn-dmn/feel/language-guide/feel-data-types.md#boolean)                             |
| time              | [Time](/bpmn-dmn/feel/language-guide/feel-data-types.md#time)                                   |
| date              | [Date](/bpmn-dmn/feel/language-guide/feel-data-types.md#date)                                   |
| dateTime          | [Date-Time](/bpmn-dmn/feel/language-guide/feel-data-types.md#date-time)                         |
| dayTimeDuration   | [Days-Time-Duration](/bpmn-dmn/feel/language-guide/feel-data-types.md#days-time-duration)       |
| yearMonthDuration | [Years-Months-Duration](/bpmn-dmn/feel/language-guide/feel-data-types.md#years-months-duration) |
| Any               | Wildcard for any type                                                                                     |

The data types can be used in the type definitions of DMN elements, for example:

- [Decision table input](decision-table-input.md#input-type-definition)
- [Decision table output](decision-table-output.md#output-type-definition)
- [Decision literal expression variable](decision-literal-expression.md#variable-type-definition)
