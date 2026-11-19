---
id: development-workflows
title: "Development workflows"
sidebar_label: "Development workflows"
description: "Use c8ctl to deploy resources, auto-redeploy on file changes, manage profiles, and bridge MCP connections for AI assistants."
---

<!-- This page is maintained in the c8ctl repository (https://github.com/camunda/c8ctl, in docs/) and
     is synced to camunda-docs automatically. Do not edit it in camunda-docs — changes will be
     overwritten. Edit the source in the c8ctl repo instead. -->

`c8ctl` includes commands that support local development and deployment workflows. You can deploy resources, run processes, watch for changes, manage profiles and sessions, and bridge MCP connections for AI assistants.

:::tip
Use the `--profile` flag with any command to run it against a specific cluster without changing the active session.

```bash
c8 deploy ./process.bpmn --profile=staging
c8 run ./order.bpmn --profile=prod
c8 watch --profile=local
```

:::

## Install Camunda AI skills

Install the official Camunda skills from [`camunda/skills`](https://github.com/camunda/skills) into detected AI coding harnesses:

```bash
c8ctl skills install
c8ctl skills install --harness claude-code
c8ctl skills install --harness github-copilot
c8ctl skills install --harness cursor
```

Without `--harness`, c8ctl detects Claude Code (`claude` or `~/.claude`) and GitHub Copilot CLI (`copilot` or `~/.copilot`) and installs into each detected harness. Explicit harness values are GitHub CLI agent IDs; use `gh skill install --help` for the supported list. c8ctl passes the selected ID and user scope to GitHub CLI, which resolves the host-specific skill directory for the current OS.

GitHub CLI 2.90 or later is required; its skill commands are currently in preview. GitHub CLI resolves the latest tagged version of `camunda/skills`, or the default branch's current commit when the repository has no release tags. Re-running checks for upstream updates and updates the same skill directories without duplicates. If a skill is already up to date, c8ctl leaves it in place, so local edits are preserved. An upstream update may replace edited files.

To deliberately restore one skill to upstream content, first find its name and installed path with `gh skill list --scope user --agent <agent-id>`, then run:

```bash
gh skill update --force --dir <skills-root> <skill-name>
```

`<skills-root>` is the parent directory containing installed skill directories (for example, `~/.claude/skills`), not the individual skill directory reported by `gh skill list`. The `--force` option replaces edited skill files even when upstream has not changed; it does not remove extra local files.

The harness adapter contract is a GitHub CLI agent ID: c8ctl passes it to `gh skill install --agent` and uses user scope, while GitHub CLI resolves the OS-specific skill directory and records source metadata. Auto-detection currently covers Claude Code and GitHub Copilot CLI. To add automatic detection for another harness, add its executable and user config directory to the detector table in `skills-install-helpers.ts`; other agent IDs supported by GitHub CLI can already be selected explicitly with `--harness`.

To review installed skill paths or remove skills manually, use `gh skill list --scope user --agent <agent-id>` and remove only the Camunda skill directories from its output.

## Deploy

Deploy resources to the active cluster.

:::note
When more than one profile is configured and you don't pass `--profile`, `c8ctl` prompts you to confirm which cluster to deploy to — a safety check against deploying to the wrong environment. Pass `--yes` (or `-y`) to skip the prompt in scripts and CI.
:::

### Deploy a single file

```bash
c8 deploy ./process.bpmn
c8 deploy ./decision.dmn
c8 deploy ./form.form
```

### Deploy multiple files

```bash
c8 deploy ./process1.bpmn ./process2.bpmn ./decision.dmn
```

### Deploy a directory

```bash
# Deploy all resources in the current directory and subdirectories
c8 deploy

# Deploy all resources in a specific directory
c8 deploy ./my-project
```

When scanning directories, `c8ctl` includes files with the following extensions by default:

`.bpmn`, `.dmn`, `.form`

Use `--extensions` to add more types to the directory scan (merged with the defaults):

```bash
c8 deploy ./my-project --extensions=.md,.txt
```

Use `--all-extensions` to include every server-supported type (`.md`, `.txt`, `.xml`, `.rpa`, `.json`, `.config`, `.yml`, `.yaml`) without naming each one:

```bash
c8 deploy ./my-project --all-extensions
```

Explicitly named files are always deployed regardless of extension — the extension filter only applies when scanning directories:

```bash
c8 deploy ./custom-resource.unsupported
```

Use `--force` to disable extension filtering during directory discovery, deploying every file found regardless of extension:

```bash
c8 deploy ./my-project --force
```

When a project's `camunda.json` defines [`deployResources`](camunda-json.md#deployresources), the descriptor selects the project's files instead, and `--extensions`, `--all-extensions`, and `--force` are rejected with an error. Files named explicitly on the command line are always deployed. See [Select resources with `deployResources`](#select-resources-with-deployresources).

### Building blocks and projects

`c8ctl` recognizes two special folder conventions during deployment:

- Building blocks — folders containing `_bb-` in their name. These are deployed first.
- Projects — folders containing a `camunda.json` file (or, during the transition, the legacy `.process-application` marker file). See [camunda.json](camunda-json.md) and [migrate from process applications](/components/concepts/projects.md#migrate-from-process-applications).

```text
my-project/
├── _bb-shared/
│   ├── common.bpmn
│   └── nested/
│       └── util.bpmn
├── my-app/
│   ├── camunda.json
│   ├── process.bpmn
│   └── subfolder/
│       └── form.form
└── standalone.bpmn
```

```bash
c8 deploy ./my-project
```

```text
Deploying 5 resource(s)...
✓ Deployment successful [Key: 123456789]

File                            | Type    | ID         | Version | Key
--------------------------------|---------|------------|---------|-------------------
_bb-shared/common.bpmn          | Process | common     | 1       | 2251799813685249
_bb-shared/nested/util.bpmn     | Process | util       | 1       | 2251799813685250
 my-app/process.bpmn            | Process | my-proc    | 1       | 2251799813685251
 my-app/subfolder/form.form     | Form    | form-id    | 1       | 2251799813685252
 standalone.bpmn                | Process | standalone | 1       | 2251799813685253
```

Building block resources are listed first, followed by project resources, then standalone resources.

### Duplicate process ID detection

Camunda does not allow deploying multiple resources with the same process or decision ID in a single deployment. `c8ctl` detects duplicate IDs before sending the request and shows a clear error message indicating which files conflict.

If you have files that share the same ID, deploy them separately:

```bash
c8 deploy process-v1.bpmn
c8 deploy process-v2.bpmn
```

### Exclude files with `.c8ignore`

Create a `.c8ignore` file in your project directory to exclude files and directories from deployment and watch scanning. The format follows the same pattern syntax as `.gitignore`:

```text
# Exclude test resources
tests/

# Exclude work-in-progress files
wip-*.bpmn

# Exclude a specific file
old-process.bpmn
```

Place the `.c8ignore` file in the root of the directory you pass to `c8 deploy` or `c8 watch`. Patterns are matched against relative file paths within that directory.

`.c8ignore` keeps its `.gitignore` semantics: `node_modules/`, `target/` and `.git/` are always excluded, and because a negation can't re-include a file below an excluded folder, a pattern such as `!target/classes/x.bpmn` doesn't bring it back. To deploy files from a default-excluded folder, use [`deployResources`](#select-resources-with-deployresources), where a matching pattern overrides the defaults.

When the project defines [`deployResources`](#select-resources-with-deployresources), `.c8ignore` is ignored for that project. The descriptor alone selects which files deploy.

### Select resources with `deployResources`

Define [`deployResources`](camunda-json.md#deployresources) in `camunda.json` to choose the project's resources yourself. This lets you deploy generated resources, or non-diagram files such as agent task prompts, without picking up documentation or configuration:

```json
{
  "deployResources": [
    "resources/**",
    "target/classes/**",
    "!target/classes/drafts/**",
    "target/classes/drafts/keep.bpmn",
    "resources/.prompt.md"
  ]
}
```

This selects:

- Everything under `resources/`.
- The generated resources under `target/classes/`, except drafts. `keep.bpmn` is selected again by the later pattern.
- The hidden prompt file, because it is named explicitly.

It doesn't select `resources/.env`, `node_modules/`, `.git/`, or a `README.md` in the project root. Use `["**/*"]` to select all non-hidden project files, including `target/` and `node_modules/` contents, then add `!` patterns to narrow the set.

`deployResources` applies whenever a path you pass to `c8 deploy` belongs to the project, including a subdirectory. Preview the selected set with `--dry-run`:

```bash
c8 deploy ./my-project --dry-run
```

How the descriptor interacts with the rest of `c8 deploy`:

- `--extensions`, `--all-extensions`, and `--force` are rejected while the descriptor selects the resources. Change the patterns instead.
- Explicitly named files are always deployed, whether or not the patterns select them, for example `c8 deploy ./my-project/notes/standalone.md`. Naming a file this way doesn't add it to the project's selection.
- The selected set doesn't depend on the target cluster version. `c8ctl` doesn't check the server version or fall back to the default extensions on clusters older than 8.10. It submits the selected set unchanged, and the server rejects resource types it doesn't support.
- An invalid `deployResources` value or an empty selection fails before anything is deployed.

## Run

The `run` command deploys a file and immediately creates a process instance in a single step:

```bash
c8 run ./order-process.bpmn

# With variables
c8 run ./order-process.bpmn --variables='{"orderId":"12345","amount":100}'

# With a Business ID
c8 run ./order-process.bpmn --businessId=order-123

# Deploy a file with an unsupported extension
c8 run ./process.xml --force
```

## Watch

Watch a directory for file changes and auto-redeploy on save:

```bash
c8 watch

# Watch a specific directory
c8 watch ./my-project

# Monitor only specific file extensions
c8 watch --extensions=.bpmn,.dmn,.form

# continue watching current directory
# even when deployment fails
c8 watch --force
```

By default, `c8ctl` monitors the same extensions used by `deploy`. Use `--extensions` to override. Use `--force` to continue watching after deployment errors.

When watching inside a project (a folder tree containing a `camunda.json` marker file), use `--project` to watch and redeploy the entire project on each change. The legacy flags `--process-application` and `--pa` remain as deprecated aliases:

```bash
c8 watch ./my-app --project
```

When the project defines [`deployResources`](#select-resources-with-deployresources), `--project` watches the selected set instead of an extension list:

- Creating, changing, deleting, or renaming a selected file redeploys the re-resolved set.
- Editing `camunda.json` re-resolves the selection and redeploys only if the set changed. This includes editors that save by replacing the file. If `camunda.json` is briefly missing during a save, `c8ctl` waits for the new file instead of falling back to the default scan.
- An invalid `deployResources` value or an empty selection is reported and stops watching. With `--force`, `c8ctl` reports it and keeps watching, so you can fix the descriptor.
- `--extensions` and `--all-extensions` are rejected. `--force` keeps its usual meaning of continuing after errors.

### Continue watching after deployment errors

By default, `c8ctl` stops watching when a deployment fails with an error. Use `--force` to continue watching and redeploy on subsequent file changes, even after errors:

```bash
c8 watch --force
c8 watch ./my-project --force
```

This is useful during active development when your resources may temporarily be in an invalid state.

## Profile management

For full profile management documentation, including adding, listing, switching, and removing profiles, see [Getting started — Profile management](getting-started.md#profile-management).

### Quick reference

```bash
c8 add profile prod --baseUrl=https://camunda.example.com --clientId=xxx --clientSecret=yyy
c8 list profiles
c8 use profile prod
c8 which profile
c8 remove profile prod
```

### One-off profile override

Pass `--profile` to any command to use a different profile for that single invocation. The active session profile is not changed:

```bash
# Run a command against a different cluster
c8 list pi --profile=staging

# Deploy to production without switching context
c8 deploy ./release/ --profile=prod

# Use a Camunda Modeler profile for one command
c8 search ut --state=CREATED --profile=modeler:Cloud Cluster
```

This is useful when you are working against a local development cluster but need to quickly check or interact with another environment.

### Camunda Modeler integration

`c8ctl` automatically discovers and imports profiles from Camunda Modeler. These profiles are read-only, always prefixed with `modeler:`, and loaded dynamically on each command execution.

```bash
# Set a Modeler profile as the active session profile
c8 use profile "modeler:Local Dev"

# Use a Modeler profile for one command
c8 list pi --profile=modeler:Cloud Cluster

# Deploy using a Modeler profile
c8 deploy ./process.bpmn --profile=modeler:Local Dev
```

For Modeler profile file locations per platform, see [Getting started — Camunda Modeler integration](getting-started.md#camunda-modeler-integration).

## Session management

Session state persists between commands. Settings you change remain active until you change them again.

### Set the active profile

```bash
c8 use profile prod
```

### Set the active tenant

```bash
c8 use tenant my-tenant-id
```

### Set the output mode

```bash
c8 output json    # JSON output for scripting
c8 output text    # human-readable tables (default)
c8 output         # show current output mode
```

## Configure MCP connections

Install Camunda MCP connections into your AI tools without editing their configuration files:

```bash
c8ctl mcp install
c8ctl mcp install --docs
c8ctl mcp install claude-code cursor --docs --orchestration
c8ctl mcp install github-copilot --profile staging --alias camunda-staging
c8ctl mcp install vscode --docs --dry-run
c8ctl mcp uninstall claude-code --docs
```

With no target flag, `install` and `uninstall` select **orchestration**. `--docs` selects **only documentation**; combine `--docs --orchestration` to select both. The entries are independent: removing docs does not remove orchestration.

Without harness names, c8ctl targets every supported harness detected through its executable on `PATH` or its user configuration. Specify one or more names to target only those harnesses, even if they have no configuration file yet. `claude`, `copilot`, and `code` are aliases for `claude-code`, `github-copilot`, and `vscode`.

| Harness | User configuration | Server key |
| --- | --- | --- |
| `claude-code` | `~/.claude.json`; with `CLAUDE_CONFIG_DIR`, `<directory>/.claude.json` | `mcpServers` |
| `github-copilot` | `~/.copilot/mcp-config.json`; honors `COPILOT_HOME` | `mcpServers` |
| `cursor` | `~/.cursor/mcp.json` | `mcpServers` |
| `vscode` | `Code/User/mcp.json` under the OS application-data directory | `servers` |
| `claude-desktop` | `Claude/claude_desktop_config.json` under the OS application-data directory; macOS and Windows only | `mcpServers` |

The application-data directory is `~/Library/Application Support` on macOS, `%APPDATA%` on Windows, and `$XDG_CONFIG_HOME` (default `~/.config`) on Linux. `vscode` targets the editor-managed MCP configuration. For the newer VS Code Copilot harness, select `github-copilot`, which uses the native Copilot configuration shared with Copilot CLI.

### Orchestration

The `camunda` entry launches the existing `mcp-proxy` with the Node.js and c8ctl installation running the installer. It references the profile selected by `--profile`, then the active saved profile, then the default `local` profile. The profile name and data-directory path are recorded, **not the credentials**. Later profile switches do not retarget this connection; credential updates to the saved profile take effect when the proxy next starts.

If you connect using environment variables without a saved profile, save them with `c8ctl add profile <name> --from-env` and install with `--profile <name>`. Use `--alias <name>` to configure another cluster alongside an existing entry. `--alias` applies only to orchestration; `camunda-docs` is reserved for documentation.

The installer does not start or contact the cluster. The cluster must expose `/mcp/cluster` when the harness starts the proxy. If you move or remove the recorded Node.js or c8ctl installation, uninstall and reinstall the entry. Profile names and recorded paths must not contain `${...}` placeholders, which harnesses could expand and redirect to another connection.

### Documentation

The `camunda-docs` entry connects to the [Camunda Docs MCP server](/reference/mcp-docs/mcp-docs.md) at `https://camunda-docs.mcp.kapa.ai`. No cluster profile or credentials are required. Claude Desktop uses `npx -y mcp-remote` as an OAuth-capable STDIO bridge, which downloads the bridge package on first use; other supported harnesses use their native HTTP transport.

Restart or reload your harness after installation. Complete the docs server's Google or GitHub sign-in when prompted on first use. Configuration does not grant tool permissions or bypass the harness's approval prompts.

### Safe updates and removal

Existing unrelated entries and settings are preserved, including VS Code JSONC comments and client-added tool restrictions. Matching installations and removal of already-absent entries are no-ops. A cluster entry c8ctl installed earlier is updated in place when its connection drifted (for example after moving the install or switching Node versions), keeping any restrictions you added. A foreign entry under the same name or a malformed configuration produces an error instead of being overwritten. Uninstall removes only the selected recognized Camunda entry and does not require the profile to still exist.

`--dry-run` previews the selected entries without writing configuration or displaying unrelated configuration values. Writes use a private temporary file and atomic replacement per configuration file; a multi-harness operation is not a transaction across all files. If a write fails, earlier successful files are reported and remain updated.

## MCP proxy

The `mcp-proxy` command starts a local STDIO-to-HTTP proxy that bridges MCP clients (such as VS Code with GitHub Copilot, or Claude Code) to the [Orchestration Cluster MCP Server](/apis-tools/orchestration-cluster-api-mcp/orchestration-cluster-api-mcp-overview.md). It handles OAuth 2.0 authentication transparently, so MCP clients that do not support the client credentials flow can connect to authenticated clusters.

### Configure with VS Code

Add the following to your `.vscode/mcp.json`:

```json
{
  "servers": {
    "camunda-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@camunda8/cli", "mcp-proxy"],
      "env": {
        "CAMUNDA_BASE_URL": "https://<cluster-base-url>",
        "CAMUNDA_CLIENT_ID": "<client-id>",
        "CAMUNDA_CLIENT_SECRET": "<client-secret>",
        "CAMUNDA_OAUTH_URL": "https://<token-url>/oauth/token",
        "CAMUNDA_TOKEN_AUDIENCE": "<token-audience>"
      }
    }
  }
}
```

| Variable                 | Description                                                                  |
| :----------------------- | :--------------------------------------------------------------------------- |
| `CAMUNDA_BASE_URL`       | Base URL of your Orchestration Cluster, **without** the `/mcp/cluster` path. |
| `CAMUNDA_REST_ADDRESS`   | SDK-standard alias for `CAMUNDA_BASE_URL` (`CAMUNDA_BASE_URL` wins when both are set). |
| `CAMUNDA_AUTH_STRATEGY`  | Authentication strategy: `NONE`, `BASIC`, or `OAUTH` (default: derived from the credentials present). |
| `CAMUNDA_CLIENT_ID`      | OAuth client ID from your API client credentials.                            |
| `CAMUNDA_CLIENT_SECRET`  | OAuth client secret from your API client credentials.                        |
| `CAMUNDA_OAUTH_URL`      | OAuth token endpoint URL.                                                    |
| `CAMUNDA_TOKEN_AUDIENCE` | Token audience for the Orchestration Cluster API.                            |

The optional `[mcp-path]` positional selects the MCP endpoint: `/mcp/cluster` (cluster administration tools, the default) or `/mcp/processes` (process execution tools).

:::tip
When you [create API client credentials](/components/saas/clusters/manage-api-clients.md#create-a-client) in the Camunda Console, all required connection details are shown on the credentials page. You can also copy a ready-to-use `c8ctl` configuration snippet from the MCP tab.
:::

### Use a profile with MCP proxy

Instead of passing environment variables, use a `c8ctl` profile to supply credentials:

```json
{
  "servers": {
    "camunda-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@camunda8/cli", "mcp-proxy", "--profile=prod"]
    }
  }
}
```

This reads credentials from the named profile, including Modeler profiles (for example, `--profile=modeler:Cloud Cluster`).

### Local development without authentication

If your local cluster does not require authentication (for example, [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md)), you can connect MCP clients directly without the proxy:

```json
{
  "servers": {
    "camunda": {
      "type": "http",
      "url": "http://localhost:8080/mcp/cluster"
    }
  }
}
```

For full MCP server documentation, see [Orchestration Cluster MCP Server](/apis-tools/orchestration-cluster-api-mcp/orchestration-cluster-api-mcp-overview.md).

## Advanced example: iterative process testing

This example demonstrates an end-to-end development workflow — auto-deploying on save, starting a process instance with variables loaded from a file, monitoring execution in real time, and retrieving the result.

### 1. Start watch mode

In a terminal, start `c8ctl` in watch mode to auto-deploy resources whenever you save changes:

```bash
c8 watch
```

Now edit your `.bpmn`, `.dmn`, or `.form` files in your editor. Every time you save, `c8ctl` redeploys automatically.

### 2. Prepare process variables

In a different terminal, load variables from a JSON file into a shell variable:

```bash
export processVar=$(<order-data.json)
```

### 3. Switch to JSON output

JSON output makes it easy to extract keys from command results:

```bash
c8 output json
```

### 4. Start a process instance

Create a new process instance with the loaded variables:

```bash
c8 create pi --id=order-process --variables="{\"orderData\": $processVar}"
```

The JSON output returns the process instance key, for example `2251799813685260`.

### 5. Monitor execution

In a **separate terminal**, use `watch` (the Unix utility) to poll the process instance status every second:

```bash
watch -n 1 c8ctl search pi --key=2251799813685260
```

This continuously refreshes until the process instance reaches the `COMPLETED` state.

### 6. Retrieve the result

Once the process instance is complete, get the final state including all variables:

```bash
c8 get pi 2251799813685260 --variables
```

:::tip
You can combine steps 4 and 5 by using `c8 await pi` instead, which creates a process instance and waits for completion in a single command:

```bash
c8 await pi --id=order-process --variables="{\"orderData\": $processVar}" --fetchVariables
```

:::

## Open web applications

Open Camunda web applications in your default browser using the `open` command:

```bash
c8 open operate
c8 open tasklist
c8 open modeler
c8 open optimize
```

The URL is derived from the active profile's base URL. This works with self-managed clusters where the base URL ends with a version suffix (for example, `http://localhost:8080/v2`).

Use `--dry-run` to display the URL without opening the browser:

```bash
c8 open operate --dry-run
```

Use `--profile` to open an application for a specific cluster:

```bash
c8 open operate --profile=prod
```

## AI agents and scripting

c8ctl includes flags and output modes designed for AI agents and scripts. These also appear in their own labeled section in `c8ctl help`.

### Filter output with `--fields`

`--fields` limits output to the named fields (comma-separated). It applies to all `list`, `search`, and `get` commands, and matching is case-insensitive. This is useful for reducing the amount of output passed into an agent's context window.

```bash
# Only return the Key and State columns
c8 list pi --fields Key,State
c8 search pd --fields Key,processDefinitionId,name

# Works in both text and JSON output modes
c8 output json
c8 list pi --fields Key,State,processDefinitionId | jq .
```

### Preview requests with `--dry-run`

`--dry-run` prints the API request that would be sent without executing it. It works on every command — queries (`list`, `search`, `get`) and mutations (`create`, `cancel`, `deploy`, `complete`, `fail`, `activate`, `resolve`, `publish`, `correlate`). The command prints a JSON object to stdout and exits `0`:

```json
{
  "dryRun": true,
  "command": "create process-instance",
  "method": "POST",
  "url": "http://localhost:8080/v2/process-instances",
  "body": { "processDefinitionId": "my-process", "tenantId": "<default>" }
}
```

:::tip Recommended workflow for mutations

1. Run the command with `--dry-run` and show the would-be API call.
2. Wait for confirmation.
3. Re-run without `--dry-run` to execute.

:::

```bash
# Preview creating a process instance
c8 create pi --id=my-process --dry-run

# Preview a deployment
c8 deploy ./my-process.bpmn --dry-run

# Preview cancelling a process instance
c8 cancel pi 2251799813685249 --dry-run

# Inspect the filter body a search would send
c8 search pi --state ACTIVE --between 2024-01-01..2024-12-31 --dry-run
```

### Machine-readable help

In JSON output mode, `c8ctl help` emits structured JSON describing the full command tree, flags (with types), and agent flags:

```bash
c8 output json
c8 help          # JSON with commands[], globalFlags[], agentFlags[], and resourceAliases
c8 help list     # JSON for a specific command
```

## Verbose mode

Use the `--verbose` flag to see detailed information about credential resolution, plugin loading, and other internal operations:

```bash
c8 deploy ./process.bpmn --verbose
c8 list pi --verbose
```

## Debug mode

Enable debug logging with environment variables for even more detailed output:

```bash
DEBUG=1 c8 deploy ./process.bpmn
C8CTL_DEBUG=true c8 list pi
```

Debug output is written to stderr and does not interfere with normal command output.
