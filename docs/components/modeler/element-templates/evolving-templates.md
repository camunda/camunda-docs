---
id: evolving-templates
title: Evolve element templates
description: "Learn how to change element templates over time, without breaking the elements that use them."
---

Element templates change over time. Evolve your templates so that users can adopt changes safely.

## Choose upgrade or migration

You can roll out a change to a template in one of two ways:

|                  | Upgrade                              | Migration                                    |
| ---------------- | ------------------------------------ | -------------------------------------------- |
| What you publish | A new `version` of the same template | A different template, with a new `id`        |
| User input       | Kept, or moved along update paths    | Moved along a migration path, if declared    |
| Update paths     | Required where bindings change       | Optional                                     |
| Use for          | Compatible changes                   | Breaking changes                             |
| What users see   | _Update available_                   | _Migration available_, or a deprecation hint |

## Publish compatible changes as an upgrade

When you publish a new [`version`](./template-metadata.md#identification-id-and-version) of a template, users can update their elements in a single step. Make sure that the update keeps what users configured working: every value a user provided keeps its technical binding, or moves along an update path, and keeps its meaning and validity.

Adding properties, and changing defaults, `Hidden` values, or presentation, keeps user input intact. Removing or renaming bindings, changing what a value means, or invalidating values that work today does not.

:::note
If you rename a binding or a choice, declare an [update path](./template-metadata.md#guiding-updates-and-migrations-updatepaths) that moves user input to its new binding. This keeps the change compatible.
:::

## Publish breaking changes as a different template

To ship a breaking change, migrate users to a different template:

1. Publish the changed template with a new `id`, for example `io.example.rest.v2`.
2. [Deprecate](./template-metadata.md#deprecating-a-template-deprecated) the previous template. Use `message` and `documentationRef` to tell users what changed and what they need to do.
3. To carry user input over, declare a [migration path](./template-metadata.md#guiding-updates-and-migrations-updatepaths) from the previous template in the new one.

Users then [migrate](/components/modeler/desktop-modeler/element-templates/using-templates.md#migrating-templates) their elements to the new template, or [replace](/components/modeler/desktop-modeler/element-templates/using-templates.md#replacing-templates) the template if it declares no migration path. Users may need to re-enter or adjust values that are not carried over.

## Keep templates available

Elements reference the template version they use. Camunda Hub keeps published template versions available for you. If you distribute templates yourself, for example to Desktop Modeler, keep previous versions and deprecated templates available. Otherwise, elements show their template as [missing](/components/modeler/desktop-modeler/element-templates/using-templates.md#missing-templates), and users can no longer upgrade or migrate them.

## Understand how values are carried over

When an element changes its template, through an update, a migration, or a replacement, values are matched by their technical binding:

- Values that users changed are kept. Other values take the new template's value.
- Values that [update paths](./template-metadata.md#guiding-updates-and-migrations-updatepaths) move take their new binding.
- Static `Hidden` values always take the new template's value. Generated values are kept.
- `Dropdown` values are kept as long as they are a valid choice.
- Values of properties that are inactive, or that the new template does not define, are removed.

Review the [upstream documentation](https://github.com/bpmn-io/element-templates/blob/main/docs/LIFE_CYCLE.md) to learn more about the template lifecycle.
