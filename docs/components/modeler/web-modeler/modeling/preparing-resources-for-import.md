---
id: prepare-resources
title: Prepare resources for import into Web Modeler
sidebar_label: Prepare resources
description: "Learn how to import resources into Web Modeler, how automatic handling works for template conflicts and ignored templates, and how to troubleshoot common import errors."
---

Learn how to prepare resources for import into Web Modeler

:::note
This guide is intended for repository maintainers, blueprint authors, and solution builders who prepare resources for others to import into Web Modeler.
:::

## Supported methods

Prepare resources for import into Web Modeler in two main ways:

1. [**Individual resources**](#prepare-individual-resources): Each resource, such us a BPMN or DMN file, a template, or a README, is accessible via its own public URL and can be imported one by one.
2. [**Packaged resources**](#prepare-packaged-resources): Bundle all resources, such as an entire process application, into a single `.zip` file. This allows importing the full package from a single URL.

## Guidelines for importing

### Hosting requirements

Each individual resource (or `.zip` file package) must:

- Be hosted at a **publicly accessible URL** that does not redirect to another page.
- Not require authentication, VPN, or non‑public network dependencies.

### Template naming

- Use stable, distinct template IDs to ensure BPMN files can reference them consistently and to avoid conflicts with other templates users might download.
- Increment the version number whenever you introduce changes that could affect existing processes.
- Element template IDs must be unique within the set of imported files.
- BPMN process IDs must be unique within the set of imported files.

:::important

- If the imported resources include at least one BPMN, Web Modeler treats them as a **process application** and groups them accordingly.
- If no BPMN file is present, the resources are imported as **independent files** into the chosen project or folder.
  :::

## Prepare import resources

### Prepare individual resources

Use this approach when:

- You have a small set of resources.
- You don't expect to add or remove files often.

Keep each file within Web Modeler’s per‑resource size limit of **three MB**.

:::info
Web Modeler will treat the first BPMN file in the source list as the main process.
:::

### Prepare packaged resources

Use this approach when:

- Your solution includes many resources (up to 100), such as multiple BPMN and DMN models, forms, element templates, and documentation.
- You want to minimize the risk of missing dependencies during import.

#### File and archive limits

When preparing the packaged resources into a `.zip` file:

- Keep the total `.zip` file size at or below **10 MB**.
- Include **at most 100 files** that Web Modeler can support.
- Keep each packaged file within Web Modeler’s per‑resource size limit of **three MB**.
- Include at most one README file.
- Note that the folder structure **will not** be imported into Web Modeler.

#### Main process selection

To control which BPMN file Web Modeler treats as the main process:

- Name the BPMN file you want to be the main process to match the `.zip` filename. For example, `support-agent.bpmn` and `support-agent.zip`.
- If no BPMN file matches the archive name, Web Modeler will choose the BPMN file whose filename comes first alphabetically as the main process.

#### Content and security rules

To minimize issues during import:

- Do not include files with `..` or leading slashes in their name.
- Exclude executables, scripts, and any other files not supported by Web Modeler.
- Ensure each resource file is within Web Modeler’s per‑resource size limit.
- Use clear, stable file names.

## Create an import URL

1. Get the public URL to the resource.

For GitHub-hosted resources, see first [Get public URLs from GitHub](#get-public-urls-from-github).

2. Form the Web Modeler URL like this:

```
<Web Modeler host>/import/resources?source=<raw file URL>
```

3. To add more resources, add a comma after the last URL and paste the next URL:

```
<Web Modeler host>/import/resources?source=<raw file URL 1>,<raw file URL 2>
```

4. (Optional) Add a title. When the resources are treated as a process application, this will be the process application's name.

```
<Web Modeler host>/import/resources?title=<process application name>&source=<raw file URL 1>,<raw file URL 2>
```

### Get public URLs from GitHub

You can host your resources on any public-facing website that allows direct access. See [Hosting requirements](#hosting-requirements) for more details.

### Individual resource URL

To get a public URL for a single resource:

1. Open the resource in your public GitHub repository.
2. Click **Raw**.
3. Copy the URL from your browser’s address bar.

:::important

The URL from step 3 is a direct link that Web Modeler can access without redirects.
:::

### Packaged resources URL

To get a public URL for packaged resources into a `.zip` file:

1. Open the `.zip` file in your publicly accessible GitHub repository.
2. In the file view, right‑click the **Raw** button in the top right.
3. Click **Copy link**.
4. In a text editor:
   - Replace `github.com` with `raw.githubusercontent.com`.
   - Remove the `/raw` segment that appears once in the URL after the repository name.
   - Leave everything else unchanged.

You can automate this transformation as follows:

```bash
GITHUB_RAW_ZIP_URL=your_original_url

echo "$GITHUB_RAW_ZIP_URL" \
  | sed -E 's#https://github.com/([^/]+)/([^/]+)/raw/(.+)#https://raw.githubusercontent.com/\1/\2/\3#'
```
