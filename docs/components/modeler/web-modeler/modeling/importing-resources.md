---
id: import-resources
title: Import resources into Web Modeler
sidebar_label: Import resources
description: "Import process models, decision tables, forms, templates, and other supported resources into Camunda Web Modeler."
---

Import resources into Web Modeler, whether you are using a single file URL, a link from Camunda Marketplace, or a URL to a `.zip` file that contains a full process application.

## About

Using Web Modeler, you can import the following **resource types** into a project or process application:

- BPMN process models.
- Forms.
- DMN decision tables.
- Element/connector templates.
- Markdown files such as `README.md`.
- Any other resource type supported by Web Modeler.

To do so, open a URL hosted on your Web Modeler instance. See [Prepare resources](./preparing-resources-for-import.md) for more information on how to create this URL.

:::important

- If the imported resources include at least **one BPMN**, Web Modeler treats them as a **process application** and groups them accordingly.
- If no BPMN file is present, the resources are imported as **independent files** into the chosen project or folder.
  :::

## Template conflicts

Element templates, including connector templates, have an associated ID, which is used to find the template when a BPMN process references it.

When importing templates, Web Modeler checks for potential conflicts with existing templates already available in your project or organization. A conflict occurs when an imported template has the same ID as an existing one.

You can resolve template conflicts using one of these two options:

1. Save as copy: It creates a new file with a new, auto-generated ID.

:::note
This option is not available when importing process applications.
:::

2. [Replace an existing template](#replacing-a-template).

### Replace a template

You can replace an existing template when:

- The template belongs to the project you are importing into.
- The imported template has a higher version than the existing one.

If an imported template **replaces** an existing template:

- The **file contents** of the existing template are overwritten by the imported template.
- Due to Web Modeler safeguards, you can only publish **higher versions** of that template in the future. Older or equal versions are blocked from publication to prevent accidentally overwriting already published versions.

This behavior ensures consistency for processes that already use the template, but note that historical versions cannot be republished under the same ID and version.

## Ignore templates

Web Modeler ignores a template if it detects a **functionally equivalent** template already exists in your project or organization. This ensures that importing the process application doesn’t break your existing setup.

A template is considered functionally equivalent when, after minifying the JSON, the following fields are equal:

- `id`
- `version`
- `appliesTo`
- `elementType`
- `groups`
- `properties`

When a template is ignored:

- The imported template is not added as a new resource.
- The process application uses the existing template definition instead.
- There may be small differences in:
  - Display name.
  - Documentation URL.
  - Icon.

## Troubleshoot

### Why your resources might fail to import

You might not be able to import certain resources because they fail validation or cannot be processed.
These are common reasons:

- **Existing template**: A newer or equal version of the same template ID already exists and its contents are not available in your project.
- **Invalid file**: The file does not conform to the expected schema. For example, malformed element template JSON.
- **Network error**: Web Modeler could not download the file from the given URL.
- **Only one README file allowed**: You cannot add additional README files because each project or process application allows only a single README.
- **Too large**: The file exceeds Web Modeler’s per‑file size limit.
- **Unknown error**: A generic error for unexpected failures.
- **Unrecognized file**: The file type is not supported by this version of Web Modeler.

### Manually upgrade a conflicting template

If a process application depends on a template that is being ignored or differs from your existing template, you can manually upgrade it following these steps:

1. Copy the desired template contents:
   - Open the template JSON used by the process application (for example, from the process app repository).
   - Copy the entire template definition.
2. Navigate to the conflicting template:
   - In Web Modeler, open the existing template that shares the same ID and version.
   - If you do not have access, ask your organization or project admin to open it.
3. Replace the contents of the existing template with the copied JSON.
4. Increase the `version` field to a number higher than the highest published version.
5. Republish:
   - Publish the updated template to the relevant project and/or organization.
   - Reopen the BPMN process; the properties panel should now reflect the updated template.

### Many resources are ignored or not imported

If you see many resources that cannot be imported, check the following:

- Confirm that the URLs (for single-file imports) or the `.zip` URL are:
  - Publicly reachable.
  - Pointing to the correct files.
- For `.zip` imports:
  - Check that the archive size is at most **10 MB**.
  - Ensure there are no more than **100** meaningful entries; extra files might be ignored.
- For templates:
  - Verify that IDs and versions are what you expect.
  - Consider whether equal or higher versions already exist.

If the issue persists, try importing a small subset of files or a simpler `.zip` to isolate problematic resources.

### Process fields are missing or show “template not found”

You may experience this issue when:

- A user task or connector task in BPMN shows a warning such as “template not found”.
- Some fields you expect to see in the properties panel are missing.
- Some templates could not be imported.

#### Why this happens

- The process expects a **template version** that was not imported:
  - A higher version already exists and the imported version was ignored.
  - An intermediate version (for example, version 2) does not exist, while version 1 and 3 do.
- An existing template with the **same ID and version** has different contents.

#### How you can solve it

- Manually upgrade the template to match the process. See the [manual upgrade steps](#manually-upgrade-a-conflicting-template) section for more details.
- If a higher version already exists, you may need to:
  1. Unlink the older template version in the BPMN editor.
  2. Link the task to the newer template.
