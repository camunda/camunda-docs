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

### Building blocks and process applications

`c8ctl` recognizes two special folder conventions during deployment:

- Building blocks — folders containing `_bb-` in their name. These are deployed first.
- Process applications — folders containing a `.process-application` marker file.

```text
my-project/
├── _bb-shared/
│   ├── common.bpmn
│   └── nested/
│       └── util.bpmn
├── my-app/
│   ├── .process-application
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

Building block resources are listed first, followed by process application resources, then standalone resources.

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

## Run

The `run` command deploys a file and immediately creates a process instance in a single step:

```bash
c8 run ./order-process.bpmn

# With variables
c8 run ./order-process.bpmn --variables='{"orderId":"12345","amount":100}'

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

When watching inside a process application (a folder tree containing a `.process-application` marker file), use `--process-application` (or its alias `--pa`) to watch and redeploy the entire application on each change:

```bash
c8 watch ./my-app --pa
```

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
| `CAMUNDA_CLIENT_ID`      | OAuth client ID from your API client credentials.                            |
| `CAMUNDA_CLIENT_SECRET`  | OAuth client secret from your API client credentials.                        |
| `CAMUNDA_OAUTH_URL`      | OAuth token endpoint URL.                                                    |
| `CAMUNDA_TOKEN_AUDIENCE` | Token audience for the Orchestration Cluster API.                            |

:::tip
When you [create API client credentials](/components/hub/organization/manage-clusters/manage-api-clients.md#create-a-client) in the Camunda Console, all required connection details are shown on the credentials page. You can also copy a ready-to-use `c8ctl` configuration snippet from the MCP tab.
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

If your local cluster does not require authentication (for example, [Camunda 8 Run](/self-managed/quickstart/developer/c8run/index.md)), you can connect MCP clients directly without the proxy:

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
