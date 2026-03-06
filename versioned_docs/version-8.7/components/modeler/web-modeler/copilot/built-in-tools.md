---
id: built-in-tools
title: Built-in tools
sidebar_label: Built-in tools
description: "Reference documentation for all built-in tools available to Camunda Copilot sub-agents."
---

Camunda Copilot uses specialized tools to interact with your BPMN diagrams, Forms, and other artifacts. This page documents all built-in tools available to the Copilot sub-agents.

## Permission model

Tools are categorized by their access requirements:

- **Read tools**: Available to all users, including those with read-only access (READ or COMMENT permissions).
- **Write tools**: Only available to users with write access. These tools are automatically hidden from users with read-only permissions.

## BPMN tools

These tools are used by the BPMN Sub-Agent to create, modify, and analyze BPMN process diagrams.

### Query tools

| Tool                                                        | Description                                                                                                                                                                                                   |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Get current BPMN XML (`get_current_bpmn_xml`)               | Retrieves the current BPMN XML from the conversation context. Use this to access, analyze, or modify the existing BPMN diagram.                                                                               |
| Get BPMN element by ID (`get_bpmn_element_by_id`)           | Gets a BPMN element by its ID from the current diagram. Returns detailed information including ID, type, name, description, input/output mappings, Zeebe properties, and task definition.                     |
| Find BPMN elements by type (`find_bpmn_elements_by_type`)   | Finds all BPMN elements of a specific type in the current diagram. Supported types include userTask, serviceTask, startEvent, endEvent, exclusiveGateway, parallelGateway, subProcess, sequenceFlow, etc.     |
| Get BPMN sequence flows (`get_bpmn_sequence_flows`)         | Gets all sequence flows from the current BPMN diagram. Returns an array of all connections between elements, including the flow ID, source element ID, target element ID, name, and condition expression.     |
| Get process summary (`get_process_summary`)                 | Gets a comprehensive summary of the current BPMN process including process ID, name, whether it's executable, counts of flow nodes/tasks/sequence flows, and a list of all flow nodes with their connections. |
| Get path between elements (`get_path_between_elements`)     | Finds a path between two elements in the BPMN diagram using breadth-first search. Returns the shortest path following sequence flows. Useful for understanding execution flow and element dependencies.       |
| Get element positions (`get_element_positions`)             | Gets the diagram positions (x, y, width, height) of BPMN elements. Use this to understand the spatial layout before inserting or moving elements.                                                             |
| Detect overlapping elements (`detect_overlapping_elements`) | Detects if a given element overlaps with any other elements in the BPMN diagram. Use this after adding or moving an element to verify no visual overlaps exist.                                               |

### Mutation tools (write)

| Tool                                                                | Description                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Convert BPMN JSON to XML (`convert_bpmn_json_to_xml`)               | Converts a BPMN process model from JSON format to BPMN 2.0 XML. Use this when you have constructed a process model in JSON format and need to convert it to XML.                                                                                                                  |
| Add BPMN element (`add_bpmn_element`)                               | Adds a new BPMN element to the current process. Supports adding tasks (userTask, serviceTask, etc.), events (startEvent, endEvent, etc.), and gateways (exclusiveGateway, parallelGateway, etc.). Use afterElementId/beforeElementId to connect the new element to existing ones. |
| Update BPMN element (`update_bpmn_element`)                         | Updates an existing BPMN element in the current process. Can change the element's name, type (e.g., userTask to serviceTask), or Zeebe attributes (task definition, input/output mappings).                                                                                       |
| Delete BPMN element (`delete_bpmn_element`)                         | Deletes a BPMN element from the current process. Automatically reconnects surrounding sequence flows to maintain process continuity.                                                                                                                                              |
| Move BPMN element (`move_bpmn_element`)                             | Moves a BPMN element by reconnecting its sequence flows. Specify newSourceId to change where the element receives flow from, and/or newTargetId to change where the element sends flow to.                                                                                        |
| Ensure correct Zeebe extensions (`ensure_correct_zeebe_extensions`) | Validates and normalizes Zeebe extensions in the current BPMN XML. Checks namespace declaration, taskDefinition structure, I/O mappings, and properties. Auto-fixes issues where possible.                                                                                        |

### Layout tools (write)

| Tool                                                            | Description                                                                                                                                                                                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Set element position (`set_element_position`)                   | Sets the diagram position of a BPMN element. Updates the BPMNShape bounds for the given element and any connected BPMNEdge waypoints.                                                                                           |
| Shift elements right (`shift_elements_right`)                   | Shifts all diagram elements at or beyond a given X coordinate to the right by a specified amount. Use this to make space when inserting an element between two close elements.                                                  |
| Auto-layout inserted element (`auto_layout_inserted_element`)   | Automatically positions a newly inserted BPMN element in the diagram. Calculates optimal position based on the afterElementId and/or beforeElementId. If there is insufficient space, automatically shifts downstream elements. |
| Remove element diagram shapes (`remove_element_diagram_shapes`) | Removes diagram shapes (BPMNShape and BPMNEdge) for a deleted element. Also creates new BPMNEdge entries for any reconnected sequence flows. Call this after delete_bpmn_element to clean up the diagram.                       |

### Validation tools

| Tool                                    | Description                                                                                                                                                                                                                                       |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Validate BPMN XML (`validate_bpmn_xml`) | Validates BPMN XML for structural correctness and Zeebe compatibility. Checks for valid XML syntax, start/end events, connected flow nodes, and supported element types. Returns validation result with errors, warnings, and repair suggestions. |

## Form tools

These tools are used by the Form Sub-Agent to create, modify, and validate Camunda Forms.

| Tool                                                      | Description                                                                                                                                                                                                                   | Access |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Validate Form JSON (`validate_form_json`)                 | Validates a Camunda Form JSON definition for structural correctness. Checks for required fields, valid field types, duplicate IDs, and proper structure.                                                                      | Read   |
| Update Form JSON (`update_form_json`)                     | Updates a Camunda Form JSON with the specified changes. Changes can include adding/updating/removing components and updating metadata. The updated form is validated and cached automatically.                                | Write  |
| Summarize Form JSON (`summarize_form_json`)               | Summarizes a Camunda Form JSON, providing an overview of fields, types, and requirements. Returns field counts, type breakdown, and details about each field.                                                                 | Read   |
| Get form binding from task (`get_form_binding_from_task`) | Gets the form binding configuration from a BPMN user task. Returns the formId/formKey, bindingType, and version from the zeebe:formDefinition.                                                                                | Read   |
| Bind form to task (`bind_form_to_task`)                   | Binds a form to a BPMN user task by setting the zeebe:formDefinition extension. Provide formId (for Camunda forms) or formKey (for external forms), bindingType (latest/deployment/versionTag), and version (for versionTag). | Write  |

## General tools

These tools are available to all sub-agents for general operations.

| Tool                                        | Description                                                                                                                                                                                                     | Access |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Sync artifact state (`sync_artifact_state`) | Synchronizes the current artifact state from the backend to the UI. Returns the current BPMN XML, Form JSON, and DMN XML from the conversation context. Use this to push backend changes to the UI for display. | Write  |

## Frontend tools

These tools execute in the Web Modeler UI and provide access to UI-specific functionality.

| Tool                                                            | Description                                                                                                                                                                                              | Access |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Layout BPMN XML (`layout_bpmn_xml`)                             | Applies automatic layout to BPMN XML to improve visual appearance. Takes BPMN XML and returns a laid-out version with better positioning of elements.                                                    | Write  |
| Sync artifact state UI (`sync_artifact_state_ui`)               | Reads the current state of BPMN/DMN/Form content from the UI to synchronize it with the agent's context. Use this to retrieve the latest visual artifact state from the UI.                              | Read   |
| Get file content from file ID (`get_file_content_from_file_id`) | Fetches the content of a file given its file ID. Returns the file content, name, and type.                                                                                                               | Read   |
| Create file in project (`create_file_in_project`)               | Creates a new file in the current project with given name, type, and content. Supported types: BPMN, DMN, FORM, CONNECTOR_TEMPLATE, MARKDOWN, TESTS.                                                     | Write  |
| List files in project (`list_files_in_project`)                 | Lists all files in the current project. Returns file metadata including id, name, type, and last modified date.                                                                                          | Read   |
| Search element templates (`search_element_templates`)           | Search for available Camunda connector/element templates in the workspace, including official Camunda connectors and custom organization templates.                                                      | Read   |
| Get element template details (`get_element_template_details`)   | Get detailed information about a specific element template including all configurable properties, their descriptions, types, and constraints.                                                            | Read   |
| Get diagram errors (`get_diagram_errors`)                       | Retrieves validation and deployment errors for the current BPMN diagram. Returns lint errors (validation issues) and deployment errors if any. Use this after modifying a diagram to check for problems. | Read   |
| Get form errors (`get_form_errors`)                             | Retrieves validation errors for the current Form. Returns lint errors (validation issues) for form fields. Use this after modifying a form to check for problems.                                        | Read   |

## Integration tools

These tools integrate with external services.

| Tool                              | Description                                                                                                                                                                                                                    | Access |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| Kapa AI search (`kapa_ai_search`) | Search the Camunda documentation and knowledge base for information. Use this to find specific information, documentation, best practices, or answers about Camunda products, BPMN, DMN, Forms, Connectors, or related topics. | Read   |

:::note
Kapa AI search is only available in SaaS deployments. Self-Managed users can configure their own LLM provider but do not have access to the Camunda documentation knowledge base.
:::
