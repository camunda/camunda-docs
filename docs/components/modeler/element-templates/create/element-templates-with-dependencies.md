---
id: element-templates-with-dependencies
title: Element templates with dependencies
description: "Learn how templates can depend on external resources such as processes, decisions, and forms, and how to manage those dependencies safely."
---

Element templates may depend on other resources—such as processes, forms, or decisions—when configuring tasks that call or reference external assets.

This page explains how dependencies work, how to define them safely, and how to manage versioning using binding types.

## When templates require dependencies

Some BPMN elements reference external resources, and templates for those elements must include the correct metadata. Common examples include:

- **Call activities** that invoke a sub-process or callable element.
- **Business rule tasks** that call DMN decisions.
- **User tasks** that reference form resources.
- **Script tasks** that depend on reusable expression logic.
- **Reusable sub-process patterns** that must bind to a specific version of a model.

In these cases, templates help ensure consistent configuration and prevent designers from accidentally breaking integrations.

## Specifying dependencies with bindings

Templates reference external resources using specific bindings. Each binding maps UI fields to BPMN or Zeebe extension properties.

### Example dependency bindings

| Resource type  | Binding type           |
| -------------- | ---------------------- |
| Called process | `zeebe:calledElement`  |
| Decision (DMN) | `zeebe:calledDecision` |
| Form           | `zeebe:formDefinition` |

Each binding requires its own set of properties, such as `processId`, `decisionId`, `formId`, or `versionTag`.

### Example: A call activity referencing a sub-process

```json
{
  "label": "Subprocess ID",
  "type": "String",
  "binding": {
    "type": "zeebe:calledElement",
    "property": "processId"
  },
  "value": "invoice-process"
},
{
  "type": "Hidden",
  "value": "versionTag",
  "binding": {
    "type": "zeebe:calledElement",
    "property": "bindingType"
  }
},
{
  "type": "Hidden",
  "value": "v1",
  "binding": {
    "type": "zeebe:calledElement",
    "property": "versionTag"
  }
}
```

Here, the template ensures the call activity always invokes the correct subprocess version.

## Why binding type matters

Resource binding determines **which version** of a dependent resource is used at runtime. Camunda recommends using:

- `versionTag` when stability and compatibility are important.
- `latest` only when you want the design to always use the newest deployable version—though this can break existing templates.

Binding types help prevent scenarios where:

- A process is updated but the template isn’t.
- Input/output mappings no longer match the updated resource.
- Designers unknowingly deploy incompatible versions.

### Supported binding types

- `"latest"` — always uses the newest deployed version
- `"version"` — pins an exact version number
- `"versionTag"` — uses a meaningful semantic tag such as `v1` or `stable`
- `"deployment"` — binds to resources deployed in the same deployment batch

`versionTag` is preferred for most template authors because it provides a predictable upgrade path without forcing users into accidental breaking changes.

## Versioning dependencies in templates

When templates reference external resources, authors should:

1. Assign a **template version** to track changes in dependency configuration.
2. Use **`versionTag`** for stable, tested resource references.
3. Create a **new template version** whenever a dependent resource changes.
4. Keep dependency metadata hidden unless users need to modify it.

This enables editors to offer upgrade suggestions when a newer template version is available.

### Example upgrade workflow

| Scenario                                | Recommended action                                       |
| --------------------------------------- | -------------------------------------------------------- |
| A DMN decision changes inputs/outputs   | Create a new template version with a new versionTag      |
| A form adds required fields             | Update template mappings, release a new version          |
| A subprocess changes expected variables | Update template bindings and mappings                    |
| A resource becomes deprecated           | Add template deprecation metadata and link a replacement |

## Hiding dependency configuration

Technical bindings usually should not be changed by users. Use hidden fields to reduce mistakes and keep templates focused on meaningful inputs.

```json
{
  "type": "Hidden",
  "value": "v2",
  "binding": {
    "type": "zeebe:calledDecision",
    "property": "versionTag"
  }
}
```

Hidden metadata prevents misconfiguration while preserving stability.

## Best practices for dependency management

- **Use hidden fields** for dependency configuration (`ids`, `versionTag`, `bindingType`).
- **Prefer `versionTag` over `latest`** to avoid unintentional breaking changes.
- **Document dependencies clearly** using the template `description` or `documentationRef`.
- **Validate dependent resources** before publishing a template.
- **Create new template versions** rather than mutating old versions.
- **Ensure input/output mappings** match the latest definitions for dependent resources (forms, DMN decisions, subprocesses).
- **Avoid exposing technical fields** unless users genuinely need to configure them.

## Example: Template depending on multiple resources

```json
{
  "id": "invoiceAutomation",
  "name": "Invoice Automation Task",
  "appliesTo": ["bpmn:ServiceTask"],
  "properties": [
    {
      "label": "Decision ID",
      "type": "String",
      "binding": {
        "type": "zeebe:calledDecision",
        "property": "decisionId"
      },
      "value": "invoice-decision"
    },
    {
      "type": "Hidden",
      "value": "v3",
      "binding": {
        "type": "zeebe:calledDecision",
        "property": "versionTag"
      }
    },
    {
      "type": "Hidden",
      "value": "http",
      "binding": {
        "type": "zeebe:taskDefinition",
        "property": "type"
      }
    }
  ]
}
```

This template:

- Calls a DMN decision.
- Locks usage to decision version tag `v3`.
- Sets the technical task type using a hidden field.

## Next steps

- Learn how [template metadata](./template-metadata.md) works.
- Explore [property configuration](./template-properties.md).
- See a complete [working example](./template-example.md).
- Return to the [main overview](./about-templates.md).
