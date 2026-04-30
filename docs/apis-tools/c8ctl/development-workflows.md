---
id: development-workflows
title: "Development workflows"
sidebar_label: "Development workflows"
description: "Use c8ctl to deploy resources, auto-redeploy on file changes, manage profiles, and bridge MCP connections for AI assistants."
---

:::warning Alpha feature
`c8ctl` is in alpha and is not intended for production use. Commands and flags may change between releases. For more information, see [Getting started](getting-started.md).
:::

`c8ctl` includes commands that support local development and deployment workflows. You can deploy resources, run processes, watch for changes, manage profiles and sessions, and bridge MCP connections for AI assistants.

:::tip
Use the `--profile` flag with any command to run it against a specific cluster without changing the active session.

```bash
c8 deploy ./process.bpmn --profile=staging
c8 run ./order.bpmn --profile=prod
c8 watch --profile=local
```

## Deploy

Deploy BPMN, DMN, and form resources to the active cluster.

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

`c8ctl` recursively traverses the directory for `.bpmn`, `.dmn`, and `.form` files.

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

## Run

The `run` command deploys a BPMN file and immediately creates a process instance in a single step:

```bash
c8 run ./order-process.bpmn

# With variables
c8 run ./order-process.bpmn --variables='{"orderId":"12345","amount":100}'
```

## Watch

Watch a directory for changes to `.bpmn`, `.dmn`, and `.form` files, and auto-redeploy on save:

```bash
c8 watch

# Watch a specific directory
c8 watch ./my-project
```

`c8ctl` applies a cooldown between redeploys to prevent rapid successive deployments while you are actively editing files.

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

## Debug mode

Enable debug logging to see detailed information about credential resolution, plugin loading, and other internal operations:

```bash
DEBUG=1 c8 deploy ./process.bpmn
C8CTL_DEBUG=true c8 list pi
```

Debug output is written to stderr and does not interfere with normal command output.
