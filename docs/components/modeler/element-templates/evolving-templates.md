---
id: evolving-templates
title: Evolve element templates
description: "Learn how to change element templates over time, without breaking the elements that use them."
---

Element templates change over time. Evolve your templates so that users can adopt changes safely.

## Choose upgrade or migration

You can roll out a change to a template in one of two ways:

|                  | Upgrade                                       | Migration                                             |
| ---------------- | --------------------------------------------- | ----------------------------------------------------- |
| What you publish | A new `version` of the same template          | A different template, with a new `id`                 |
| User input       | Kept, with its bindings                       | May change bindings and drop user input               |
| Use for          | Compatible changes                            | Breaking changes                                      |
| What users see   | An update hint on elements using the template | A deprecation hint on elements using the old template |

## Publish compatible changes as an upgrade

When you publish a new [`version`](./template-metadata.md#identification-id-and-version) of a template, users can update their elements in a single step. Make sure that the update keeps what users configured working: every value a user provided keeps its technical binding, its meaning, and its validity.

Adding properties, and changing defaults, `Hidden` values, or presentation, keeps user input intact. Removing or renaming bindings, changing what a value means, or invalidating values that work today does not.

## Publish breaking changes as a different template

To ship a breaking change, migrate users to a different template:

1. Publish the changed template with a new `id`, for example `io.example.rest.v2`.
2. [Deprecate](./template-metadata.md#deprecating-a-template-deprecated) the previous template. Use `message` and `documentationRef` to tell users what changed and what they need to do.

Users then [replace](/components/modeler/desktop-modeler/element-templates/using-templates.md#replacing-templates) the deprecated template on their elements with the new one. Replacing keeps the values of compatible properties on a best effort basis. Users may need to re-enter or adjust other values.

## Keep templates available

Elements reference the template version they use. Camunda Hub keeps published template versions available for you. If you distribute templates yourself, for example to Desktop Modeler, keep previous versions and deprecated templates available. Otherwise, elements show their template as [missing](/components/modeler/desktop-modeler/element-templates/using-templates.md#missing-templates), and users can no longer upgrade or migrate them.

## Understand how values are carried over

When an element changes its template, through an update or a replacement, values are matched by their technical binding:

- Values that users changed are kept. Other values take the new template's value.
- Static `Hidden` values always take the new template's value. Generated values are kept.
- `Dropdown` values are kept as long as they are a valid choice.
- Values of properties that are inactive, or that the new template does not define, are removed.

Review the [upstream documentation](https://github.com/bpmn-io/element-templates/blob/main/docs/LIFE_CYCLE.md) to learn more about the template lifecycle.
