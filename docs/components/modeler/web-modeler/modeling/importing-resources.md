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
- Other supported file types used by Camunda solutions

Resources can be imported from:

- **Camunda Marketplace links** (including “For SaaS”)
- **Direct resource URLs** (one file at a time)
- **URLs to a `.zip` archive** that packages multiple resources together

All URLs must be **publicly accessible** to Web Modeler. Any URL that requires VPN, authentication, or is blocked by corporate networking rules cannot be imported.

---

## Importing single resources (one by one)

You can import files individually by providing a direct URL:

- From Marketplace, by using links that reference a single resource.
- From your own hosting (for example, GitHub raw URLs, other public servers).

### What happens when you import a single file

Depending on the file type:

- **BPMN**: Imported as a process. If the import flow groups it with other simultaneously imported resources, it may become part of a process application.
- **Forms** (`.form`), **DMN** (`.dmn`), **element templates** (`.json`), **Markdown** (`.md`), and other supported types: Imported as individual resource files into the selected project or process application.
- **Unsupported types**: Marked as _Unrecognized file_ and not imported.

### Limits and validation

Even for single-file imports:

- Resources must be of a **supported type**.
- Files must not exceed the **per‑file upload limit** enforced by Web Modeler.
- Files must be **valid** according to their schema:
  - Valid BPMN XML.
  - Valid DMN.
  - Valid form JSON.
  - Valid element template JSON.
- If a file is not valid or cannot be fetched, you may see errors such as:
  - _Invalid file_
  - _Unrecognized file_
  - _Too large_
  - _Network error_
  - _Unknown error_

---

## Importing multiple resources from a `.zip` archive

Instead of importing resources one by one, you can provide a **single URL to a `.zip` file** that contains all the resources of a process application. Web Modeler will download the archive and import the supported files it contains.

### Requirements for `.zip` imports

- The `.zip` file must be hosted at a **publicly accessible URI**.
- The **maximum size** of the `.zip` is **10 MB**.
- Web Modeler will process at most **100 files** from a single `.zip`. Any remaining entries are ignored after that limit is reached.
- Only **supported file types** are imported; other files are ignored or shown as _Unrecognized file_.

### How Web Modeler processes `.zip` contents

When importing from a `.zip`:

1. Web Modeler downloads the archive from the given URL.
2. It inspects the entries and applies a series of safety and validation rules, for example:
   - Ignore or reject entries that:
     - Contain `..` (parent directory references).
     - Use **absolute paths** (for example, starting with `/` or drive letters like `C:`).
     - Start with a leading `/`.
     - Are **hidden files** (name starts with `.`) or macOS metadata (`__MACOSX/`, `.DS_Store`).
     - Represent directories instead of files.
   - Reject filenames with **null bytes** or control characters.
   - Reject clearly unsafe or unsupported extensions (for example, executables or shell scripts).
   - Do not process files that exceed Web Modeler’s **per‑file size limit**.
3. For all remaining files:
   - Supported types are imported.
   - Unsupported or invalid files are reported in the UI with an appropriate status such as _Unrecognized file_, _Invalid file_, or _Too large_.

### How the main process is selected

When a `.zip` contains multiple BPMN files, Web Modeler chooses a **main process** as follows:

1. If any BPMN file’s **base name** (filename without extension) is the same as the `.zip` file’s base name, that BPMN file becomes the **main process**.
2. Otherwise, the BPMN file whose name is **first in alphabetical order** becomes the main process.

This main process is what users will typically see highlighted as the entry point of the imported process application.

### Process application vs. importing “just files”

- If the imported resources include at least **one BPMN**, Web Modeler treats them as a **process application** and groups them accordingly.
- If no BPMN file is present, the resources are imported as **independent files** into the chosen project or folder.

---

## README behavior and limitations

Web Modeler only allows **one README file** per project or process application:

- When importing:
  - If there is **no existing README**, the first imported README may become the project or process application README.
  - If there is already a README present, additional README files may be:
    - Ignored, or
    - Flagged with a status such as _Only one README file allowed_.
- To avoid confusion, it is best to include at most **one** README for the target project or process application.

---

## Element templates and conflicts

Element templates (including connector templates) can be imported both one by one and as part of `.zip` process applications. When an imported template has the same **ID** as an existing template, Web Modeler must decide whether to:

- Reuse the existing template,
- Replace it, or
- Ignore the imported one.

### Consequences of replacing a template

If an imported template **replaces** an existing template:

- The **file contents** of the existing template are overwritten by the imported template.
- Due to Web Modeler safeguards, you will only be able to publish **higher versions** of that template in the future:
  - Older or equal versions will be blocked from publication to avoid accidentally overwriting already published versions.

This behavior ensures consistency for processes that already use the template, but you should be aware that historical versions cannot be republished under the same ID and version.

### When imported templates are ignored

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

### Edge case: existing template with same ID and version but different content

If an existing template has the **same ID and version** as an imported template, but with slightly different internals (for example, changed variable bindings), Web Modeler will still treat them as the “same” template and may ignore the imported version.

Potential consequences:

- The imported process might behave slightly differently than its original environment expected, especially if:
  - Certain fields in the BPMN expect bindings that only exist in the imported version but not in the existing version.
- In extreme cases, some fields may not appear in the properties panel because the existing template does not define them.

If such a situation is suspected, see the **manual upgrade** steps in the troubleshooting section.

---

## Ignored vs. not importable resources

When you import resources, Web Modeler can show different statuses:

### Ignored resources

These are resources that **could be imported**, but are intentionally not added because:

- A **functionally equivalent template** is already present (see equality fields above).
- A README would conflict with the “only one README” rule and is therefore ignored.

The import is still considered successful overall; specific resources are simply **not added** because they would not change the effective behavior.

### Not importable resources

These resources fail validation or cannot be processed. Common reasons include:

- **Unrecognized file**  
  The file type is not supported by this version of Web Modeler.

- **Too large**  
  The file exceeds Web Modeler’s per‑file size limit.

- **Invalid file**  
  The file does not conform to the expected schema (for example, invalid BPMN XML or malformed JSON for templates).

- **Network error**  
  Web Modeler could not download the file from the given URL.

- **Conflicting version exists**  
  A newer or equal version of the same template ID already exists, and Web Modeler will not replace it with the imported version.

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

If you see many ignored or “not importable” statuses:

- Confirm that the URLs (for single-file imports) or the `.zip` URL are:
  - Publicly reachable,
  - Pointing to the correct files.
- For `.zip` imports:
  - Check that the archive size is at most **10 MB**.
  - Ensure there are no more than **100** meaningful entries; extra files might be ignored.
  - Remove hidden files, OS metadata, or unsupported file types from the archive.
- For templates:
  - Verify that IDs and versions are what you expect.
  - Consider whether equal or higher versions already exist.

If the problems persist, try importing a small subset of files or a simpler `.zip` to isolate problematic resources.
