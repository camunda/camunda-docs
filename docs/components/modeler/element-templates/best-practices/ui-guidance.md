---
id: ui-guidance
title: UI guidance for element templates
description: Learn UI-focused best practices to design clear, consistent, and intuitive element templates across Web Modeler and Desktop Modeler.
---

Use these guidelines to design clear, consistent, and intuitive element templates in Modeler.

## Provide a predictable user experience

Users should always understand:

- What each field does.
- Which fields are required.
- Which fields can be safely ignored.
- How updates affect existing configurations.

Design templates so that applying or editing them feels consistent and intuitive.

## Group fields into clear sections

Group related fields into meaningful sections, such as:

- **Authentication**
- **Request**
- **Response**
- **Error handling**
- **Advanced**

Follow these guidelines:

- Keep group names short and descriptive.
- Avoid placing more than five or six fields in one group where possible.
- Avoid unnecessary groups; only group when it improves clarity.

## Use visible fields for user input only

Use visible fields only when user input is required.

Hide static or system-managed values, such as:

- HTTP method.
- Fixed endpoint paths.
- Static headers.
- Runtime worker type.
- Fixed version tags.
- Internal or technical configuration values.

Visible fields should contain user-facing information, not implementation details.

## Choose appropriate input types

### Dropdowns

Use dropdowns when values are predictable or limited to a known list, such as:

- Priority: Low, Normal, or High.
- Format: JSON or XML.
- Environment: Sandbox or production.

### Free-text input

Use free-text inputs when values must be flexible.

Follow these rules:

- Provide meaningful placeholders that indicate format or example input.
- Do not repeat the label as a placeholder.
- Use descriptions or tooltips if users need additional context.

### FEEL input

Require FEEL only when necessary, for example:

- Dynamic or computed values.
- Expressions based on variables.

Avoid FEEL for simple static inputs where a plain value is clearer.

## Validate input and surface errors clearly

### Required fields

Use the **Not empty** constraint for required fields. Required inputs must:

- Show clear validation errors.
- Include tooltips when needed.
- Explain why the field is required and how to fix the issue.

### Optional fields

Use **optional bindings** so empty values:

- Are not persisted in BPMN XML.
- Do not clutter the properties panel.
- Do not confuse users with “empty but present” configuration.

### Error messages

Write actionable error messages:

- ✅ “API key is required. Enter the secret name where the key is stored.”
- ❌ “Invalid value.”

## Handle template application and updates carefully

### Applying a template

When a user applies a template:

- Default values should populate automatically where helpful.
- Grouping should match the JSON structure.
- Hidden fields should not appear in the properties panel.

### Updating to a new version

When updating to a new version, ensure the UI behavior is predictable:

- Preserve user-modified values wherever possible.
- Apply new defaults only to fields the user has not changed.
- Remove obsolete fields automatically.
- Clearly indicate when an update is available and what it changes.

## Use icons consistently

Follow these icon guidelines:

- Prefer **SVG** icons.
- Keep file size under **8 KB**.
- Use minimum dimensions of **512 × 512 pixels**.
- Choose simple, recognizable symbols.
- Ensure licensing permits use of any brand or product logos.

If no meaningful icon exists, use a neutral or generic glyph.

## Improve accessibility and clarity

To keep templates accessible and easy to understand:

- Use sentence case for labels, group names, and descriptions.
- Keep labels short, descriptive, and jargon-free.
- Provide tooltips for fields that need additional explanation.
- Avoid relying on color alone to communicate meaning.
- Maintain consistent naming across templates (for example, “Result variable” vs. “ResultVariable”).

## Example layout for a connector-style template

A well-structured template might appear as:

### Authentication

- API key (required).
- API key header name.

### Request

- Endpoint URL.
- HTTP method (hidden with a fixed value).
- Custom headers (optional).

### Response

- Result variable.
- Error mapping (optional).

### Advanced

- Timeout (optional).
- Retry policy (optional).

This structure separates essential configuration from advanced or technical options, reducing noise for most users.

## Summary

Following these UI guidelines helps element templates:

- Provide a consistent modeling experience.
- Reduce user confusion and configuration errors.
- Remain maintainable as they evolve.
- Work well across Web Modeler and Desktop Modeler.

Good UI design turns templates into reliable, reusable building blocks across the Camunda ecosystem.
