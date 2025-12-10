---
id: qa-checklist
title: QA checklist for element templates
description: Validate correctness, usability, and compatibility of element templates before publishing.
---

Use this checklist to verify that an element template behaves correctly in both Web Modeler and Desktop Modeler. This list ensures template quality, reliability, and a consistent modeling experience.

## Functional validation

Confirm that the template:

- Loads without errors in Web Modeler.
- Loads without errors in Desktop Modeler (if applicable).
- Applies to the correct BPMN element types defined under `appliesTo`.
- Correctly applies default values.
- Correctly replaces element types when `elementType` is used.
- Produces valid BPMN XML and Zeebe extension elements.

## Binding verification

Ensure that bindings:

- Use the correct binding types (`zeebe:input`, `zeebe:output`, `zeebe:taskHeader`, etc.).
- Correctly map values to BPMN XML.
- Do not conflict with each other.
- Are not duplicated (duplicate bindings lead to undefined behavior).
- Respect required vs optional configuration (for example, `optional: true` removes empty values).

Validate each binding type:

- Inputs create `<zeebe:input />` elements.
- Outputs create `<zeebe:output />` elements.
- Headers produce correct `<zeebe:header />` entries.
- Properties map to the correct extension elements.
- Runtime configurations (`taskDefinition`, `userTask`, `formDefinition`, etc.) appear only when appropriate.

## Field validation and behavior

Check that:

- Required fields use constraints such as `notEmpty`.
- Optional fields do not persist empty values.
- Dropdowns include valid `name/value` pairs.
- FEEL fields behave correctly (required vs optional vs static).
- Hidden fields do not appear in the UI but serialize correctly.
- Conditional fields appear or disappear based on referenced inputs.

## UI and usability checks

Confirm:

- Fields appear in a logical order.
- Groups (if used) are clear, labeled, and expand correctly.
- Tooltips and descriptions are accurate.
- No technical fields are exposed accidentally.
- Placeholders are meaningful and match expected formats.
- Default values are sensible and domain-appropriate.
- The template icon loads correctly and is distinguishable in the selection modal.

## Versioning and upgrade behavior

Validate:

- Template includes a `version` number.
- Upgrading from a previous version retains user-entered values when possible.
- New defaults apply only to fields the user has not modified.
- Deprecated or removed fields behave correctly and do not break existing diagrams.
- `id` + `version` match expected upgrade paths.

## Dependency verification

If the template relies on external resources:

- Confirm DMN decisions exist and are deployed.
- Confirm subprocesses exist and match version tags.
- Confirm forms referenced by form definitions are available.
- Verify that worker types, secrets, or task types exist in the runtime environment.
- Ensure the binding type (`versionTag`, `latest`) is correct and intentional.

## Metadata validation

Check that template metadata:

- Uses correct `$schema`.
- Defines `name`, `id`, and `version`.
- Includes a clear description.
- Uses keywords for better searchability.
- Uses a valid icon (small, optimized, supported format).
- Includes category, if applicable.

## Error handling and resilience

Validate that:

- Invalid user input produces meaningful error messages.
- FEEL validation errors appear correctly in the Modeler.
- No hidden errors appear in the console.
- Templates with invalid fields fail gracefully and show warnings.

## Cross-modeler compatibility

If the template is expected to work in both Web and Desktop Modeler:

- Confirm Web Modeler accepts the template schema without warnings.
- Confirm Desktop Modeler ignores unsupported schema fields gracefully.
- Validate differences in features (such as multi-template files vs Web Modeler’s one-template-per-file requirement).

## Documentation and maintainability

Verify:

- Description is clear and helpful to end users.
- `documentationRef` is accurate if provided.
- JSON is formatted and structured consistently.
- Hidden fields are grouped logically.
- Comments (if included) are helpful and minimal.
- Template aligns with naming and UI conventions.

## Final publishing checklist

Before submitting or publishing:

- [ ] Template schema validated successfully.
- [ ] Template loads and applies in Web Modeler.
- [ ] Template loads and applies in Desktop Modeler (if applicable).
- [ ] All bindings verified.
- [ ] All required fields validated.
- [ ] All FEEL editors behave correctly.
- [ ] Dependency resources confirmed.
- [ ] Versioning and upgrade path tested.
- [ ] Metadata correct and complete.
- [ ] Icon verified.
- [ ] Documentation or description updated.
- [ ] Peer review completed.

## Summary

Use this checklist to ensure that element templates:

- Are stable and predictable.
- Provide a positive modeling experience.
- Interact correctly with BPMN and runtime components.
- Can be safely reused, upgraded, and scaled across teams.

High-quality templates reduce modeling errors and support consistent process design across the Camunda ecosystem.
