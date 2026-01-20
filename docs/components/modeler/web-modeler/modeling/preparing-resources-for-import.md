---
id: prepare-resources
title: Prepare resources for importing into Web Modeler
sidebar_label: Prepare import resources
description: "Learn how to import resources into Web Modeler, how automatic handling works for template conflicts and ignored templates, and how to troubleshoot common import errors."
---

# Preparing resources for importing into Web Modeler

This page is for repository maintainers, blueprint authors, and solution builders who prepare resources that other users will import into Web Modeler.

It covers both:

- Preparing **individual resources** that can be imported one by one.
- Preparing a **`.zip` archive** that can import a full process application from a single URL.

---

## Overview of approaches

You can prepare resources for import into Web Modeler in two main ways:

1. **Single resources (one by one)**
   - Each resource (BPMN, DMN, form, template, README, etc.) is accessible via its own public URL.

2. **Packaged resources in a `.zip`**
   - You bundle all relevant files (for example, an entire process application) into a single `.zip`.

---

## Resource guidelines

If the imported resources include a BPMN file, then the resources will be imported together as a new [process application](../../../concepts/process-applications.md).

Each file should:

- Be hosted at a **publicly accessible URL** that **does not redirect to another page**:
  - No authentication, VPN, or non‑public network dependency.
  - See below for instructions on getting each URL from GitHub.
- Be within Web Modeler’s **per‑file size** limit (3 MB)

Also:

- Only include at most one README file
- Element template ID's must be unique within the set of imported files.
- BPMN process ID's must be unique within the set of imported files.

### Template IDs and versions

- Use **stable, distinct `id` values** for templates so BPMN files can consistently reference them, and the ID doesn't conflict with other templates the user might download.
- Bump the `version` number whenever you introduce changes that could affect existing processes.

---

## Preparing single resources (one by one)

### When to use this approach

The one‑by‑one approach is a good fit when:

- You have a **small set of resources**.
- You don't expect to add or remove files often.

### Main process selection

Web Modeler will treat the first BPMN file in the source list as the **main process**:

---

## Preparing a `.zip` with multiple resources

### When to use this approach

Use a `.zip` when:

- Your solution includes **many (up to 100) resources** (for example, multiple BPMN models, forms, DMNs, element templates, documentation).
- You want to minimize the chance of missing dependencies during import.

### File and archive limits

When preparing the `.zip`:

- Keep the **total archive size** at or below **10 MB**.
- Include at most **100** files that Web Modeler can support.
- Note that the folder structure **will not** be imported into Web Modeler.

### Main process selection

- To control which BPMN Web Modeler treats as the **main process**:
  - Name the BPMN file you want to be the main process to match the **`.zip` filename** (for example, `support-agent.zip` and `support-agent.bpmn`), or
  - Be aware that if there is no BPMN matching the archive name, the BPMN file whose filename is **first alphabetically** will be chosen as the main process.

### Content and security rules

To minimize issues when importing:

- Do not include files with `..` or leading slashes in their name
- Exclude executables, scripts, and any other file that Web Modeler does not support.
- Ensure each resource file is within Web Modeler’s **per‑file size** limit.
- Favor clear, stable naming for each file

---

### Building the Web Modeler import URL

1. Get the public URL to the file. For GitHub-hosted files, see below for instructions.
2. Form the Web Modeler URL like this:
   ```
   <Web Modeler host>/import/resources?source=<raw file URL>
   ```
3. To add more files, add a comma after the URL from step 4 and paste the next raw file URL.

```
<Web Modeler host>/import/resources?source=<raw file URL 1>,<raw file URL 2>
```

4. (Optional) You can add a title. This is used when the files are considered to be a process application.

```
<Web Modeler host>/import/resources?title=<process application title>&source=<raw file URL 1>,<raw file URL 2>
```

---

## Creating importable URLs from GitHub

You can host your files on any public-facing website that does tno

### Single file URLs

To create an importable URL for a single file:

1. Open the file in your public GitHub repository.
2. Click **Raw**.
3. Copy the URL from your browser’s address bar.
4. Use this URL in Web Modeler’s import dialog.

### `.zip` file URLs

If you store a `.zip` in a public GitHub repository, you can create a URL compatible with Web Modeler:

1. Open the `.zip` file in your publicly accessible GitHub repository.
2. In the file view, right‑click the **Raw** button in the top right.
3. Click **Copy link**.
4. In a text editor:
   - Replace `github.com` with `raw.githubusercontent.com`.
   - Remove the single `/raw` part that appears once in the path after the repository name.
   - Leave everything else unchanged.

For example, you can automate this transformation with a small shell snippet:

```bash
GITHUB_RAW_ZIP_URL=your_original_url

echo "$GITHUB_RAW_ZIP_URL" \
  | sed -E 's#https://github.com/([^/]+)/([^/]+)/raw/(.+)#https://raw.githubusercontent.com/\1/\2/\3#'
```
