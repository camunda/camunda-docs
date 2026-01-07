# Preparing resources for import into Web Modeler

This page is for repository maintainers, blueprint authors, and solution builders who prepare resources that other users will import into Web Modeler.

It covers both:

- Preparing **individual resources** that can be imported one by one.
- Preparing a **`.zip` archive** that can import a full process application from a single URL.

---

## Overview of approaches

You can prepare resources for import into Web Modeler in two main ways:

1. **Single resources (one by one)**
   - Each resource (BPMN, DMN, form, template, README, etc.) is accessible via its own public URL.
   - End users import them individually or through lists of URLs (for example, internal documentation pages linking to each resource).

2. **Packaged resources in a `.zip`**
   - You bundle all relevant files (for example, an entire process application) into a single `.zip`.
   - End users provide a single URL to this `.zip` in Web Modeler’s import UI.

You can mix these approaches if needed (for example, a Marketplace listing that exposes both a one‑by‑one link and a full process application `.zip`).

---

## Preparing single resources (one by one)

### When to use this approach

The one‑by‑one approach is a good fit when:

- You have a **small set of resources**.
- You want consumers to **pick and choose** individual files.
- You maintain an **internal catalog** (for example, a Confluence page or internal portal) with separate links.

### Requirements for each resource

Each file should:

- Be hosted at a **publicly accessible URL**.
  - No authentication, VPN, or non‑public network dependency.
- Be of a **supported type**:
  - BPMN, DMN, forms, element templates, Markdown, and other types recognized by Web Modeler.
- Be **valid** according to its format:
  - Valid BPMN XML.
  - Valid DMN.
  - Valid form JSON.
  - Valid element template JSON.

### Practical tips

#### Using GitHub or similar hosts

For single files on GitHub:

1. Open the file in your public GitHub repository.
2. Click **Raw**.
3. Copy the URL from your browser’s address bar.
4. Use this URL in Web Modeler’s import dialog.

This URL usually points directly to the raw file content and can be used in Web Modeler.

#### Naming conventions

- Use meaningful filenames:
  - For BPMN, choose names that hint at the role of the process (for example, `order-fulfillment.bpmn`).
  - For templates, choose filenames that match the main connector or purpose.
- Align filenames with how you describe the resource in documentation or Marketplace listings.

#### Template IDs and versions

- Use **stable `id` values** for templates so BPMN files can consistently reference them.
- Bump the `version` number whenever you introduce changes that could affect existing processes.

---

## Preparing a `.zip` with multiple resources

### When to use this approach

Use a `.zip` when:

- You want to distribute a **complete process application** in one step.
- Your solution includes **many resources** (for example, multiple BPMN models, forms, DMNs, element templates, documentation).
- You want to minimize the chance of missing dependencies during import.

### File and archive limits

When preparing the `.zip`:

- Keep the **total archive size** at or below **10 MB**.
- Include at most **100** meaningful files that you expect Web Modeler to import.
- Remove:
  - Large, unnecessary artifacts (for example, big binaries or logs).
  - Any files that are not needed by the consumer’s environment.

### Structuring the archive

You can choose a structure that best suits your project. Some guidelines:

- Use **logical folder groupings** (for example, `bpmn/`, `forms/`, `dmn/`, `templates/`, `docs/`) if this helps maintainers.
- Avoid deeply nested, complex folder hierarchies if they don’t add value.
- To control which BPMN Web Modeler treats as the **main process**:
  - Name the BPMN file you want to be the main process to match the **`.zip` filename** (for example, `support-agent.zip` and `support-agent.bpmn`), or
  - Be aware that if there is no BPMN matching the archive name, the BPMN file whose filename is **first alphabetically** will be chosen as the main process.

### Content and security rules

To minimize issues when importing:

- Avoid paths or names that might trigger safety checks:
  - Do not include entries with `..` in their path.
  - Avoid absolute paths or leading slashes.
  - Remove hidden files (`.gitignore`, `.DS_Store`) and macOS metadata folders like `__MACOSX/`.
- Exclude **executables or scripts** that Web Modeler does not import.
- Ensure each resource file is within Web Modeler’s **per‑file size** limit.
- Favor clear, stable naming for files, especially for templates and BPMN.

### Including element templates

If your `.zip` includes templates:

- Keep `id` and `version` consistent across environments.
- Bump `version` when introducing changes that may break existing usage.
- Remember that, during import:
  - Templates that are **functionally equal** to existing ones can be ignored.
  - Templates with lower or equal versions than an existing template may be ignored or not importable, depending on the environment and safeguards.

---

## Creating importable URLs from GitHub

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
