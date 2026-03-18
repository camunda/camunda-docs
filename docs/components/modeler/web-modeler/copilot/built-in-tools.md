---
id: built-in-tools
title: Built-in tools
sidebar_label: Built-in tools
description: "Reference documentation for all built-in tools available to Camunda Copilot sub-agents."
---

Camunda Copilot uses specialized tools to interact with your BPMN diagrams, forms, and other artifacts. This page documents all built-in tools available to the Copilot sub-agents.

For a high-level overview, see [Copilot overview](copilot-overview.md).

## Permission model

Tools are categorized by access requirements:

- **Read**: Available to all users, including users with read-only access (`READ` or `COMMENT` permissions).
- **Write**: Available only to users with write access. These tools are hidden from read-only users.

## BPMN tools

### Query tools

<table>
	<colgroup>
		<col style={{width: "35%"}} />
		<col style={{width: "57%"}} />
		<col style={{width: "8%"}} />
	</colgroup>
	<thead>
		<tr>
			<th style={{textAlign: "left"}}>Tool</th>
			<th style={{textAlign: "left"}}>Description</th>
			<th style={{textAlign: "left"}}>Access</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>Get current BPMN XML</td><td>Returns the current BPMN XML from the conversation context.</td><td>Read</td></tr>
		<tr><td>Get BPMN element by ID</td><td>Returns one BPMN element by ID, including core metadata and Zeebe properties.</td><td>Read</td></tr>
		<tr><td>Find BPMN elements by type</td><td>Lists BPMN elements by type (for example `userTask`, `serviceTask`, `exclusiveGateway`, or `sequenceFlow`).</td><td>Read</td></tr>
		<tr><td>Get BPMN sequence flows</td><td>Returns all sequence flows with IDs, source/target IDs, names, and conditions.</td><td>Read</td></tr>
		<tr><td>Get process summary</td><td>Returns process metadata, node/flow counts, and connection summaries.</td><td>Read</td></tr>
		<tr><td>Get path between elements</td><td>Finds the shortest sequence-flow path between two BPMN elements.</td><td>Read</td></tr>
		<tr><td>Get element positions</td><td>Returns diagram bounds (`x`, `y`, `width`, `height`) for BPMN elements.</td><td>Read</td></tr>
		<tr><td>Detect overlapping elements</td><td>Checks whether an element overlaps other elements in the diagram.</td><td>Read</td></tr>
	</tbody>
</table>

### Mutation tools (write)

<table>
	<colgroup>
		<col style={{width: "35%"}} />
		<col style={{width: "57%"}} />
		<col style={{width: "8%"}} />
	</colgroup>
	<thead>
		<tr>
			<th style={{textAlign: "left"}}>Tool</th>
			<th style={{textAlign: "left"}}>Description</th>
			<th style={{textAlign: "left"}}>Access</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>Convert BPMN JSON to XML</td><td>Converts a BPMN model from JSON to BPMN 2.0 XML.</td><td>Write</td></tr>
		<tr><td>Add BPMN element</td><td>Adds a BPMN element and optionally connects it with `afterElementId` and/or `beforeElementId`.</td><td>Write</td></tr>
		<tr><td>Update BPMN element</td><td>Updates element name, type, or Zeebe attributes (for example task definition or I/O mappings).</td><td>Write</td></tr>
		<tr><td>Delete BPMN element</td><td>Deletes an element and reconnects surrounding sequence flows.</td><td>Write</td></tr>
		<tr><td>Move BPMN element</td><td>Reconnects an element to new source and/or target flow nodes.</td><td>Write</td></tr>
		<tr><td>Ensure correct Zeebe extensions</td><td>Validates and normalizes Zeebe extensions in BPMN XML, with auto-fixes where possible.</td><td>Write</td></tr>
	</tbody>
</table>

### Layout tools (write)

<table>
	<colgroup>
		<col style={{width: "35%"}} />
		<col style={{width: "57%"}} />
		<col style={{width: "8%"}} />
	</colgroup>
	<thead>
		<tr>
			<th style={{textAlign: "left"}}>Tool</th>
			<th style={{textAlign: "left"}}>Description</th>
			<th style={{textAlign: "left"}}>Access</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>Set element position</td><td>Sets an element position and updates related BPMN edge waypoints.</td><td>Write</td></tr>
		<tr><td>Shift elements right </td><td>Shifts elements right from a given X coordinate to create space in the diagram.</td><td>Write</td></tr>
		<tr><td>Auto-layout inserted element</td><td>Auto-positions an inserted element based on neighboring elements and shifts downstream elements if needed.</td><td>Write</td></tr>
		<tr><td>Remove element diagram shapes</td><td>Removes BPMN shapes/edges for deleted elements and creates edges for reconnected flows.</td><td>Write</td></tr>
	</tbody>
</table>

### Validation tools

<table>
	<colgroup>
		<col style={{width: "35%"}} />
		<col style={{width: "57%"}} />
		<col style={{width: "8%"}} />
	</colgroup>
	<thead>
		<tr>
			<th style={{textAlign: "left"}}>Tool</th>
			<th style={{textAlign: "left"}}>Description</th>
			<th style={{textAlign: "left"}}>Access</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>Validate BPMN XML</td><td>Validates BPMN XML structure and Zeebe compatibility, and returns errors, warnings, and repair suggestions.</td><td>Read</td></tr>
	</tbody>
</table>

## Form tools

<table>
	<colgroup>
		<col style={{width: "35%"}} />
		<col style={{width: "57%"}} />
		<col style={{width: "8%"}} />
	</colgroup>
	<thead>
		<tr>
			<th style={{textAlign: "left"}}>Tool</th>
			<th style={{textAlign: "left"}}>Description</th>
			<th style={{textAlign: "left"}}>Access</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>Validate Form JSON</td><td>Validates Form JSON structure, required fields, field types, and duplicate IDs.</td><td>Read</td></tr>
		<tr><td>Update Form JSON</td><td>Applies changes to Form JSON (add, update, remove components, or update metadata) and then validates the result.</td><td>Write</td></tr>
		<tr><td>Summarize Form JSON</td><td>Returns a summary of form fields, types, and requirements.</td><td>Read</td></tr>
		<tr><td>Get form binding from task</td><td>Returns `formId`/`formKey`, binding type, and version from a user task form binding.</td><td>Read</td></tr>
		<tr><td>Bind form to task</td><td>Sets `zeebe:formDefinition` on a user task using `formId` or `formKey` and binding settings.</td><td>Write</td></tr>
	</tbody>
</table>

## Frontend tools

These tools execute in the Web Modeler UI and provide access to UI-specific functionality.

Use this group when you need user-visible project/file operations, UI validation feedback, or UI-side synchronization required to apply changes correctly.

<table>
	<colgroup>
		<col style={{width: "35%"}} />
		<col style={{width: "57%"}} />
		<col style={{width: "8%"}} />
	</colgroup>
	<thead>
		<tr>
			<th style={{textAlign: "left"}}>Tool</th>
			<th style={{textAlign: "left"}}>Description</th>
			<th style={{textAlign: "left"}}>Access</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>Sync artifact state</td><td>Synchronizes BPMN/Form/DMN state from backend context to the UI.</td><td>Write</td></tr>
		<tr><td>Layout BPMN XML</td><td>Applies automatic layout to BPMN XML and returns updated element positioning.</td><td>Write</td></tr>
		<tr><td>Sync artifact state UI</td><td>Reads current BPMN/DMN/Form content from the UI into agent context.</td><td>Read</td></tr>
		<tr><td>Get file content from file ID</td><td>Returns file content, name, and type for a given file ID.</td><td>Read</td></tr>
		<tr><td>Create file in project</td><td>Creates a project file with name, type, and content (for example BPMN, DMN, FORM, or MARKDOWN).</td><td>Write</td></tr>
		<tr><td>List files in project</td><td>Lists project files with ID, name, type, and last modified date.</td><td>Read</td></tr>
		<tr><td>Search element templates</td><td>Searches available connector/element templates in the workspace.</td><td>Read</td></tr>
		<tr><td>Get element template details</td><td>Returns configurable properties, descriptions, types, and constraints for an element template.</td><td>Read</td></tr>
		<tr><td>Get diagram errors</td><td>Returns BPMN lint and deployment errors for the current diagram.</td><td>Read</td></tr>
		<tr><td>Get form errors</td><td>Returns validation errors for the current form.</td><td>Read</td></tr>
	</tbody>
</table>

## Integration tools

These tools integrate with external services.

Use this group to retrieve product and modeling guidance from connected knowledge services.

<table>
	<colgroup>
		<col style={{width: "35%"}} />
		<col style={{width: "57%"}} />
		<col style={{width: "8%"}} />
	</colgroup>
	<thead>
		<tr>
			<th style={{textAlign: "left"}}>Tool</th>
			<th style={{textAlign: "left"}}>Description</th>
			<th style={{textAlign: "left"}}>Access</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>Kapa AI search</td><td>Searches Camunda documentation and knowledge base for product, modeling, and best-practice guidance.</td><td>Read</td></tr>
	</tbody>
</table>

:::note

- Kapa AI search is only available in SaaS deployments.
- Self-Managed users can configure their own LLM provider but do not have access to the Camunda documentation knowledge base.
  :::
