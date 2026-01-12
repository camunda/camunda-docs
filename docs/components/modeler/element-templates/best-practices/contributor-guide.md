---
id: contributor-guide
title: Contributor guide for element templates
description: Learn how to create, review, and maintain high-quality element templates as an internal or external contributor.
---

Use this guide to create, review, and maintain high-quality element templates for Web Modeler and Desktop Modeler. It applies to contributors building reusable templates for connectors, subprocesses, user tasks, and any other BPMN element type.

## Who this guide is for

This guide is designed for:

- Template authors (internal and external)
- Connector developers
- Partner integrators
- Modeling experts maintaining shared libraries
- Community contributors

## Before you start

Before building or updating an element template:

- Understand the use case and the target users.
- Confirm which BPMN element types the template applies to.
- Check for existing templates that may overlap with your contribution.
- Review the best practices and UI guidance (link where appropriate).
- Verify compatibility requirements (Camunda version, engine constraints).

## Design principles

High-quality templates follow these principles:

- **Clarity:** Users should instantly understand what the template does.
- **Minimal configuration:** Ask for as little input as possible.
- **Convention over configuration:** Sensible defaults reduce user effort.
- **Predictability:** Applying or updating the template should never produce unexpected results.
- **Consistency:** Follow established naming, grouping, and behavior patterns.

## Steps to create a template

### 1. Define the scope

Clarify:

- What problem the template solves.
- Which BPMN element it targets.
- Whether the user needs to provide inputs or only reuse a preset configuration.
- Whether the template will be part of a connector, a reusable subprocess, or a domain-specific building block.

### 2. Gather dependencies

Identify all dependencies that the template requires, such as:

- DMN decisions
- Subprocesses
- Forms
- RPA scripts
- Job workers
- Secrets

Confirm that the necessary resources exist and are deployed (or will be deployed) where the template will run.

### 3. Start from a blank or generated template

Use one of the following:

- Web Modeler → **Element template generator**
- Web Modeler → **Save as template**
- Desktop workflow → Create JSON manually

For advanced templates, prefer starting from a minimal JSON skeleton to avoid unnecessary fields.

### 4. Add metadata

Include:

- Name (sentence case)
- Description (concise and value-focused)
- Version (start at 1; increment on changes)
- Category (optional but recommended)
- Keywords (recommended for search)
- Icon (8 KB max, SVG preferred)

### 5. Add properties

Apply best practices:

- Hide technical or static fields.
- Use dropdowns where appropriate.
- Add constraints for required fields.
- Use optional bindings for optional values.
- Follow consistent naming and grouping conventions.

### 6. Validate JSON structure

Check:

- JSON schema compliance
- Group ordering that matches UI ordering
- FEEL variable references appear after their definitions
- No unused or redundant properties

### 7. Test in Web Modeler

Verify:

- The template loads without errors.
- Applying the template configures the element correctly.
- Required fields show validation errors.
- Optional fields do not persist empty values.
- Hidden fields do not appear but produce correct BPMN XML.
- FEEL expressions resolve correctly.

### 8. Test in Desktop Modeler (if applicable)

For Desktop Modeler, ensure:

- Templates load from the correct folder.
- Updating templates behaves consistently.
- Multi-template JSON files load and update correctly.

## Contributor responsibilities

A contributor should:

- Follow naming, UI, and structural best practices.
- Ensure templates are maintainable long term.
- Use comments or documentationRef to explain non-obvious behaviors.
- Maintain backwards compatibility when updating existing templates.
- Increment version numbers when changes affect behavior.

## Reviewer checklist

When reviewing a template contribution, validate:

- Metadata correctness (ID, name, version, category)
- Proper grouping and ordering
- Correct bindings (input/output/task headers/properties)
- Required fields marked with constraints
- Optional fields using optional bindings
- Hidden fields used appropriately
- FEEL expressions validated
- Icons properly sized and licensed
- Dependencies clearly explained
- Upgrade behavior (versioning) implemented
- JSON structure readable and consistent

## Common pitfalls to avoid

Avoid:

- Requiring unnecessary user input.
- Exposing technical configuration fields.
- Hardcoding values that vary across environments.
- Storing secrets in plain text.
- Using ambiguous labels or placeholder text.
- Creating multiple templates that solve nearly the same problem.
- Forgetting to increment template versions.

## Contribution workflow

1. Fork the relevant repository or project.
2. Create or update the element template.
3. Validate with Web Modeler and Desktop Modeler (if applicable).
4. Add or update documentation and examples.
5. Include test scenarios or expected outcomes where useful.
6. Submit a pull request.
7. Respond to reviewer feedback.

## Maintaining templates over time

When evolving templates:

- Do not change existing versions—create a new version instead.
- Provide changelog details in the description field.
- Maintain compatibility unless a breaking change is unavoidable.
- Align naming, grouping, and UX patterns across all templates in a library.
- Periodically review templates for outdated fields, dependencies, or defaults.

## Summary

Following these guidelines helps contributors:

- Build templates that integrate smoothly with both Modelers.
- Reduce user confusion and support burden.
- Create reusable, maintainable, scalable building blocks.
- Improve consistency across the ecosystem.

High-quality element templates enable teams to model faster, avoid errors, and share standardized building blocks across projects and organizations.
