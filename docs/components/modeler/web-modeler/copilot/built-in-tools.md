---
id: built-in-tools
title: Built-in tools
sidebar_label: Built-in tools
description: "Reference documentation for all built-in tools available to Camunda Copilot sub-agents."
---

Camunda Copilot uses specialized tools to interact with your BPMN diagrams, Forms, and other artifacts. This page documents all built-in tools available to the Copilot sub-agents.

For a high-level overview, see [Copilot overview](copilot-overview.md).

## How to use this page

- Start with the tool group that matches your task (BPMN, Form, Frontend, and so on).
- Check access requirements before using a tool.
- Use the tool description to decide whether to query, mutate, lay out, or validate.

## Permission model

Tools are categorized by access requirements:

<table>
	<colgroup>
		<col style={{width: "35%"}} />
		<col style={{width: "65%"}} />
	</colgroup>
	<thead>
		<tr>
			<th style={{textAlign: "left"}}>Access</th>
			<th style={{textAlign: "left"}}>Availability</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Read</td>
			<td>Available to all users, including users with read-only access (`READ` or `COMMENT` permissions).</td>
		</tr>
		<tr>
			<td>Write</td>
			<td>Available only to users with write access. These tools are hidden from read-only users.</td>
		</tr>
	</tbody>
</table>

## Common tasks

- [Inspect or analyze a BPMN diagram](#bpmn-tools)
- [Create or modify BPMN structure](#mutation-tools-write)
- [Fix diagram layout issues](#layout-tools-write)
- [Validate BPMN or form artifacts](#validation-tools)
- [Create, update, or bind forms](#form-tools)
- [Work with project files and UI state](#frontend-tools)

## BPMN tools

These tools are used by the BPMN Sub-Agent to create, modify, and analyze BPMN process diagrams.

### Query tools

<table>
	<colgroup>
		<col style={{width: "40%"}} />
		<col style={{width: "50%"}} />
		<col style={{width: "10%"}} />
	</colgroup>
	<thead>
		<tr>
			<th style={{textAlign: "left"}}>Tool</th>
			<th style={{textAlign: "left"}}>Description</th>
			<th style={{textAlign: "left"}}>Access</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>Get current BPMN XML </td><td>Returns the current BPMN XML from the conversation context.</td><td>Read</td></tr>
		<tr><td>Get BPMN element by ID (`get_bpmn_element_by_id`)</td><td>Returns one BPMN element by ID, including core metadata and Zeebe properties.</td><td>Read</td></tr>
		<tr><td>Find BPMN elements by type (`find_bpmn_elements_by_type`)</td><td>Lists BPMN elements by type (for example `userTask`, `serviceTask`, `exclusiveGateway`, or `sequenceFlow`).</td><td>Read</td></tr>
		<tr><td>Get BPMN sequence flows (`get_bpmn_sequence_flows`)</td><td>Returns all sequence flows with IDs, source/target IDs, names, and conditions.</td><td>Read</td></tr>
		<tr><td>Get process summary (`get_process_summary`)</td><td>Returns process metadata, node/flow counts, and connection summaries.</td><td>Read</td></tr>
		<tr><td>Get path between elements (`get_path_between_elements`)</td><td>Finds the shortest sequence-flow path between two BPMN elements.</td><td>Read</td></tr>
		<tr><td>Get element positions (`get_element_positions`)</td><td>Returns diagram bounds (`x`, `y`, `width`, `height`) for BPMN elements.</td><td>Read</td></tr>
		<tr><td>Detect overlapping elements (`detect_overlapping_elements`)</td><td>Checks whether an element overlaps other elements in the diagram.</td><td>Read</td></tr>
	</tbody>
</table>

### Mutation tools (write)

<table>
	<colgroup>
		<col style={{width: "40%"}} />
		<col style={{width: "50%"}} />
		<col style={{width: "10%"}} />
	</colgroup>
	<thead>
		<tr>
			<th style={{textAlign: "left"}}>Tool</th>
			<th style={{textAlign: "left"}}>Description</th>
			<th style={{textAlign: "left"}}>Access</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>Convert BPMN JSON to XML (`convert_bpmn_json_to_xml`)</td><td>Converts a BPMN model from JSON to BPMN 2.0 XML.</td><td>Write</td></tr>
		<tr><td>Add BPMN element (`add_bpmn_element`)</td><td>Adds a BPMN element and optionally connects it with `afterElementId` and/or `beforeElementId`.</td><td>Write</td></tr>
		<tr><td>Update BPMN element (`update_bpmn_element`)</td><td>Updates element name, type, or Zeebe attributes (for example task definition or I/O mappings).</td><td>Write</td></tr>
		<tr><td>Delete BPMN element (`delete_bpmn_element`)</td><td>Deletes an element and reconnects surrounding sequence flows.</td><td>Write</td></tr>
		<tr><td>Move BPMN element (`move_bpmn_element`)</td><td>Reconnects an element to new source and/or target flow nodes.</td><td>Write</td></tr>
		<tr><td>Ensure correct Zeebe extensions (`ensure_correct_zeebe_extensions`)</td><td>Validates and normalizes Zeebe extensions in BPMN XML, with auto-fixes where possible.</td><td>Write</td></tr>
	</tbody>
</table>

### Layout tools (write)

<table>
	<colgroup>
		<col style={{width: "40%"}} />
		<col style={{width: "50%"}} />
		<col style={{width: "10%"}} />
	</colgroup>
	<thead>
		<tr>
			<th style={{textAlign: "left"}}>Tool</th>
			<th style={{textAlign: "left"}}>Description</th>
			<th style={{textAlign: "left"}}>Access</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>Set element position (`set_element_position`)</td><td>Sets an element position and updates related BPMN edge waypoints.</td><td>Write</td></tr>
		<tr><td>Shift elements right (`shift_elements_right`)</td><td>Shifts elements right from a given X coordinate to create space in the diagram.</td><td>Write</td></tr>
		<tr><td>Auto-layout inserted element (`auto_layout_inserted_element`)</td><td>Auto-positions an inserted element based on neighboring elements and shifts downstream elements if needed.</td><td>Write</td></tr>
		<tr><td>Remove element diagram shapes (`remove_element_diagram_shapes`)</td><td>Removes BPMN shapes/edges for deleted elements and creates edges for reconnected flows.</td><td>Write</td></tr>
	</tbody>
</table>

### Validation tools

<table>
	<colgroup>
		<col style={{width: "40%"}} />
		<col style={{width: "50%"}} />
		<col style={{width: "10%"}} />
	</colgroup>
	<thead>
		<tr>
			<th style={{textAlign: "left"}}>Tool</th>
			<th style={{textAlign: "left"}}>Description</th>
			<th style={{textAlign: "left"}}>Access</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>Validate BPMN XML (`validate_bpmn_xml`)</td><td>Validates BPMN XML structure and Zeebe compatibility, and returns errors, warnings, and repair suggestions.</td><td>Read</td></tr>
	</tbody>
</table>

## Form tools

These tools are used by the Form Sub-Agent to create, modify, and validate Camunda Forms.

Use this group when you need to validate form schema, update components, summarize form structure, or bind forms to BPMN user tasks.

<table>
	<colgroup>
		<col style={{width: "40%"}} />
		<col style={{width: "50%"}} />
		<col style={{width: "10%"}} />
	</colgroup>
	<thead>
		<tr>
			<th style={{textAlign: "left"}}>Tool</th>
			<th style={{textAlign: "left"}}>Description</th>
			<th style={{textAlign: "left"}}>Access</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>Validate Form JSON (`validate_form_json`)</td><td>Validates Form JSON structure, required fields, field types, and duplicate IDs.</td><td>Read</td></tr>
		<tr><td>Update Form JSON (`update_form_json`)</td><td>Applies changes to Form JSON (add, update, remove components, or update metadata) and then validates the result.</td><td>Write</td></tr>
		<tr><td>Summarize Form JSON (`summarize_form_json`)</td><td>Returns a summary of form fields, types, and requirements.</td><td>Read</td></tr>
		<tr><td>Get form binding from task (`get_form_binding_from_task`)</td><td>Returns `formId`/`formKey`, binding type, and version from a user task form binding.</td><td>Read</td></tr>
		<tr><td>Bind form to task (`bind_form_to_task`)</td><td>Sets `zeebe:formDefinition` on a user task using `formId` or `formKey` and binding settings.</td><td>Write</td></tr>
	</tbody>
</table>

## General tools

These tools are available to all sub-agents for general operations.

Use this group to synchronize artifact state between backend and UI context.

<table>
	<colgroup>
		<col style={{width: "40%"}} />
		<col style={{width: "50%"}} />
		<col style={{width: "10%"}} />
	</colgroup>
	<thead>
		<tr>
			<th style={{textAlign: "left"}}>Tool</th>
			<th style={{textAlign: "left"}}>Description</th>
			<th style={{textAlign: "left"}}>Access</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>Sync artifact state (`sync_artifact_state`)</td><td>Synchronizes BPMN/Form/DMN state from backend context to the UI.</td><td>Write</td></tr>
	</tbody>
</table>

## Frontend tools

These tools execute in the Web Modeler UI and provide access to UI-specific functionality.

Use this group when you need project-level file operations, UI state synchronization, template discovery, or editor validation feedback.

<table>
	<colgroup>
		<col style={{width: "40%"}} />
		<col style={{width: "50%"}} />
		<col style={{width: "10%"}} />
	</colgroup>
	<thead>
		<tr>
			<th style={{textAlign: "left"}}>Tool</th>
			<th style={{textAlign: "left"}}>Description</th>
			<th style={{textAlign: "left"}}>Access</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>Layout BPMN XML (`layout_bpmn_xml`)</td><td>Applies automatic layout to BPMN XML and returns updated element positioning.</td><td>Write</td></tr>
		<tr><td>Sync artifact state UI (`sync_artifact_state_ui`)</td><td>Reads current BPMN/DMN/Form content from the UI into agent context.</td><td>Read</td></tr>
		<tr><td>Get file content from file ID (`get_file_content_from_file_id`)</td><td>Returns file content, name, and type for a given file ID.</td><td>Read</td></tr>
		<tr><td>Create file in project (`create_file_in_project`)</td><td>Creates a project file with name, type, and content (for example BPMN, DMN, FORM, or MARKDOWN).</td><td>Write</td></tr>
		<tr><td>List files in project (`list_files_in_project`)</td><td>Lists project files with ID, name, type, and last modified date.</td><td>Read</td></tr>
		<tr><td>Search element templates (`search_element_templates`)</td><td>Searches available connector/element templates in the workspace.</td><td>Read</td></tr>
		<tr><td>Get element template details (`get_element_template_details`)</td><td>Returns configurable properties, descriptions, types, and constraints for an element template.</td><td>Read</td></tr>
		<tr><td>Get diagram errors (`get_diagram_errors`)</td><td>Returns BPMN lint and deployment errors for the current diagram.</td><td>Read</td></tr>
		<tr><td>Get form errors (`get_form_errors`)</td><td>Returns validation errors for the current form.</td><td>Read</td></tr>
	</tbody>
</table>

## Integration tools

These tools integrate with external services.

Use this group to retrieve product and modeling guidance from connected knowledge services.

<table>
	<colgroup>
		<col style={{width: "40%"}} />
		<col style={{width: "50%"}} />
		<col style={{width: "10%"}} />
	</colgroup>
	<thead>
		<tr>
			<th style={{textAlign: "left"}}>Tool</th>
			<th style={{textAlign: "left"}}>Description</th>
			<th style={{textAlign: "left"}}>Access</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>Kapa AI search (`kapa_ai_search`)</td><td>Searches Camunda documentation and knowledge base for product, modeling, and best-practice guidance.</td><td>Read</td></tr>
	</tbody>
</table>

:::note

- Kapa AI search is only available in SaaS deployments.
- Self-Managed users can configure their own LLM provider but do not have access to the Camunda documentation knowledge base.
  :::
