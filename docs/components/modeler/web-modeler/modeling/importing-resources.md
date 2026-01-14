# Importing resources into Web Modeler

This page explains how to import resources into Web Modeler, whether you are using a single file URL, a link from Camunda Marketplace, or a URL to a `.zip` file that contains a full process application.

---

## Overview

Web Modeler can import different **resource types** into a project or process application, for example:

- BPMN process models
- Forms
- DMN decision tables
- Element/connector templates
- Markdown files such as `README.md`
- Any other resource type supported by Web Modeler

You can import resources by opening a URL hosted on your Web Modeler instance. See [this page](./preparing-resources-for-import.md) for more information on how to create this URL.

---

### Process application vs. importing “just files”

- If the imported resources include at least **one BPMN**, Web Modeler treats them as a **process application** and groups them accordingly.
- If no BPMN file is present, the resources are imported as **independent files** into the chosen project or folder.

---

## Element templates and conflicts

Element templates (including connector templates) have an ID. The ID is used to look up the template when a BPMN process references it.

When importing templates, Web Modeler checks for potential **conflicts** with existing templates already available to your project or organization.

A conflict can happen when an imported template has the same **ID** as an existing template, but the imported template isn't available to your project.

Web Modeler offers two options to resolve template conflicts:

1. Save as copy
2. Replace resource (template)

### Save as copy

This option creates a new file with a new, auto-generated ID.

This option is not available when importing process applications.

### Replacing a template

An existing template can be replaced when:

- The existing template belongs to the project being imported into
- The imported template has a higher version than the existing one

If an imported template **replaces** an existing template:

- The **file contents** of the existing template are overwritten by the imported template.
- Due to Web Modeler safeguards, you will only be able to publish **higher versions** of that template in the future:
  - Older or equal versions will be blocked from publication to avoid accidentally overwriting already published versions.

This behavior ensures consistency for processes that already use the template, but you should be aware that historical versions cannot be republished under the same ID and version.

### Ignored

Templates can be **ignored** when Web Modeler detects a **functionally equivalent** template is already available to your project or organization. In other words, using the existing template should not break the imported process application.

A template is considered functionally equivalent when, after minifying the JSON, the following fields are equal:

- `id`
- `version`
- `appliesTo`
- `elementType`
- `groups`
- `properties`

In this case:

- The imported template is not added as a new resource.
- The process application will use the existing template definition instead.
- There may be small differences in:
  - Display name,
  - Documentation URL,
  - Icon,

  but the template should **work as expected** from a functional point of view.

### Resources that cannot be imported

These resources fail validation or cannot be processed. Common reasons include:

- **Unrecognized file**  
  The file type is not supported by this version of Web Modeler.

- **Too large**  
  The file exceeds Web Modeler’s per‑file size limit.

- **Invalid file**  
  The file does not conform to the expected schema (for example, malformed element template JSON).

- **Network error**  
  Web Modeler could not download the file from the given URL.

- **Existing template**
  A newer or equal version of the same template ID already exists and its contents are not available to the project

- **Unknown error**  
  A generic error for unexpected failures.

- **Only one README file allowed**  
  Additional README files conflict with the project’s or process application’s single‑README rule.

---

## Troubleshooting

### Process fields are missing or show “template not found”

Symptoms:

- A user task or connector task in BPMN shows a warning such as “template not found”.
- Some fields you expect to see in the properties panel are missing.
- Some templates could not be imported

Likely causes:

- The process expects a **template version** that was not imported:
  - A higher version already exists and the imported version was ignored.
  - An intermediate version (for example, version 2) does not exist, while version 1 and 3 do.
- An existing template with the same **ID and version** has different contents.

What you can do:

- Consider manually upgrading the template to match the process (see the manual upgrade steps below).
- If a higher version already exists, you may need to:
  - Unlink the older template version in the BPMN editor, and
  - Link the task to the newer template.

### Manually upgrading a conflicting template

If a process application depends on a template that is being ignored or differs from your existing template, you can:

1. **Copy the desired template contents**
   - Open the template JSON used by the process application (for example, from the process app repository).
   - Copy the entire template definition.

2. **Navigate to the conflicting template**
   - In Web Modeler, open the existing template that shares the same ID and version.
   - If you do not have access, ask your organization admin or project admin to open it.

3. **Paste the new contents**
   - Replace the contents of the existing template with the copied JSON.

4. **Increase the version**
   - Change the `version` field to a number **higher than the highest published version**.

5. **Republish**
   - Publish the updated template to the relevant project and/or organization.
   - Reopen the BPMN process; the properties panel should now reflect the updated template.

### Many resources are ignored or not importable

If you see many resources that cannot be imported, check the following:

- Confirm that the URLs (for single-file imports) or the `.zip` URL are:
  - Publicly reachable,
  - Pointing to the correct files.
- For `.zip` imports:
  - Check that the archive size is at most **10 MB**.
  - Ensure there are no more than **100** meaningful entries; extra files might be ignored.
- For templates:
  - Verify that IDs and versions are what you expect.
  - Consider whether equal or higher versions already exist.

If the problems persist, try importing a small subset of files or a simpler `.zip` to isolate problematic resources.
