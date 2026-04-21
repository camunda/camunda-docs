---
id: about-templates
title: Element templates
description: Learn how element templates standardize BPMN elements in both Web Modeler and Desktop Modeler, enable reusable building blocks, and support consistent modeling.
---

Element templates let you define reusable configurations for BPMN elements so modelers can apply consistent properties, behavior, and UI patterns across diagrams in both Web Modeler and Desktop Modeler.

## What element templates are

Element templates are JSON descriptors that standardize how a BPMN element behaves and appears in the properties panel. They define:

- Which BPMN element types the template applies to
- Which fields appear in the properties panel and how they are validated
- How user inputs map to BPMN 2.0 XML and Camunda extension elements
- Default values, constraints, FEEL support, and optional fields
- Icons, descriptions, versioning, and compatibility information

Templates are stored and discovered differently in Web vs Desktop Modeler, but the JSON structure and behavior remain consistent.

## Element templates and connector templates

A _connector template_ is a specific type of element template tailored for outbound or inbound connectors. Connector templates follow the same schema as element templates but typically bundle:

- Authentication fields
- Input/output mappings
- Required headers or task definitions
- Predefined runtime behaviors through the connector SDK

Connector templates are discoverable as first-class resources in Web Modeler. In Desktop Modeler, they appear as regular element templates shipped with or added to the local installation.

| Topic               | Element template                                  | Connector template                                      |
| ------------------- | ------------------------------------------------- | ------------------------------------------------------- |
| Definition          | Reusable configuration for any BPMN element       | Element template specifically for an outbound connector |
| Used in             | Web & Desktop Modeler                             | Web & Desktop Modeler                                   |
| Runtime dependency  | Optional                                          | Always backed by a job worker or connector runtime      |
| Behavior configured | Inputs, outputs, headers, properties, constraints | Inputs, outputs, authentication, connector operations   |
| File form           | JSON template                                     | JSON template                                           |
| Is subset?          | Parent concept                                    | Subset of element templates                             |

## Where templates can be used

Element templates are supported anywhere BPMN is modeled:

- **Web Modeler**: Templates are managed, imported, published, and applied directly in the browser. Users can also create templates from existing properties.
- **Desktop Modeler**: Templates are read from local file system search paths and loaded at startup.

Templates apply to BPMN elements such as tasks, events, subprocesses, gateways, call activities, and more. They cannot be used in non-BPMN diagrams.

## Why use element templates

Templates help you:

- Improve modeling consistency across teams
- Reduce user error through validation and UI guidance
- Abstract complex technical mappings behind simple inputs
- Standardize connector usage, user task forms, decisions, or subprocess patterns
- Version configurations safely and support migration paths
- Reuse building blocks across diagrams and projects

## How element templates fit into modeling

When a user applies a template to a BPMN element:

1. The template's metadata determines whether the element is eligible.
2. The properties panel switches to show only the fields defined in the template.
3. User inputs are validated and written to BPMN XML using template bindings.
4. The element is marked as using a specific template (and version, if defined).
5. If updated templates become available, Modeler can suggest upgrades.

Templates do not execute anything themselves—they configure the BPMN model so the engine and connector runtimes behave correctly.

## What’s next

Use the navigation on the left to learn how to:

- Apply templates in Web and Desktop Modeler
- Create, edit, and version template JSON
- Follow best practices for UI, naming, and field design
- Manage advanced use cases such as dependencies, resource binding, and CI/CD workflows
