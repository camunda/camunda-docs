---
id: getting-started
title: "c8ctl CLI"
description: "Use the c8ctl CLI to inspect your Camunda 8 clusters, deploy resources, and manage process automation from the terminal."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

:::warning Alpha feature
`c8ctl` is in alpha and is not intended for production use. APIs, commands, and flags may change without notice between releases. See see [alpha features](/components/early-access/alpha/alpha-features.md) for more information. Report issues and request features in the [`c8ctl` GitHub repository](https://github.com/camunda/c8ctl).
:::

## About

`c8ctl` is a minimal-dependency CLI for Camunda 8. It is built on top of the [`@camunda8/orchestration-cluster-api`](https://www.npmjs.com/package/@camunda8/orchestration-cluster-api) TypeScript SDK and provides two equivalent bin aliases: `c8ctl` and `c8`.

`c8ctl` is designed for developers who need fast, scriptable access to a Camunda 8 cluster during development and testing. It supports both Camunda 8 SaaS and Self-Managed environments.

Use `c8ctl` to:

- Inspect running clusters — list process instances, user tasks, incidents, and jobs.
- Deploy BPMN, DMN, and form resources, optionally watching for file changes.
- Manage profiles for multiple clusters, including profiles imported from Camunda Modeler.
- Extend the CLI with custom plugins.

## Prerequisites

- **Node.js ≥ 22.18.0** (required for native TypeScript support)

## Install

Install `c8ctl` globally from npm:

```bash
npm install @camunda8/cli -g
```

After installation, both `c8ctl` and `c8` are available as commands in your terminal.

## Credential resolution

`c8ctl` resolves credentials in the following order:

1. **`--profile` flag** — one-off override for a single command.
2. **Active profile** — set with `c8 use profile <name>`.
3. **Environment variables** — standard `CAMUNDA_*` variables.
4. **Localhost fallback** — `http://localhost:8080/v2`.

### Use environment variables

```bash
export CAMUNDA_BASE_URL=https://camunda.example.com
export CAMUNDA_CLIENT_ID=your-client-id
export CAMUNDA_CLIENT_SECRET=your-client-secret
c8 list pi
```

### Use a profile

```bash
c8 add profile prod \
  --baseUrl=https://camunda.example.com \
  --clientId=your-client-id \
  --clientSecret=your-client-secret

c8 use profile prod
c8 list pi
```

### Override the profile for a single command

Pass `--profile` to any command to use a different profile without changing the active session:

```bash
c8 list pi --profile=staging
c8 deploy ./process.bpmn --profile=prod
c8 search ut --assignee=jane --profile=dev
```

The `--profile` flag works with both `c8ctl` profiles and Camunda Modeler profiles (prefixed with `modeler:`):

```bash
c8 list pi --profile=modeler:Cloud Cluster
c8 deploy ./process.bpmn --profile=modeler:Local Dev
```

## Tenant resolution

Tenants are resolved in the following order:

1. **Active tenant** — set with `c8 use tenant <id>`.
2. **Default tenant** from the active profile.
3. **`CAMUNDA_DEFAULT_TENANT_ID`** environment variable.
4. **`<default>`** tenant.

```bash
c8 use tenant my-tenant-id
c8 list pi   # uses my-tenant-id
```

## Profile management

`c8ctl` supports two types of profiles:

1. `c8ctl` profiles — managed directly with `c8ctl` commands.
2. Camunda Modeler profiles — automatically imported from Camunda Modeler (read-only, prefixed with `modeler:`).

### Add a profile

```bash
# Minimal local profile (defaults to http://localhost:8080/v2)
c8 add profile local

# OAuth-secured cluster
c8 add profile prod \
  --baseUrl=https://camunda.example.com \
  --clientId=your-client-id \
  --clientSecret=your-client-secret

# With explicit OAuth endpoint and audience
c8 add profile prod \
  --baseUrl=https://camunda.example.com \
  --clientId=your-client-id \
  --clientSecret=your-client-secret \
  --audience=camunda-api \
  --oAuthUrl=https://auth.example.com/oauth/token

# With a default tenant
c8 add profile dev \
  --baseUrl=https://dev.example.com \
  --clientId=dev-client \
  --clientSecret=dev-secret \
  --defaultTenantId=dev-tenant
```

### List profiles

```bash
c8 list profiles
```

Lists both `c8ctl` and Modeler profiles. Modeler profiles appear with a `modeler:` prefix.

### Switch the active profile

```bash
c8 use profile prod
c8 use profile "modeler:Local Dev"
```

All subsequent commands use the active profile until you switch again or pass `--profile`.

### Show the current profile

```bash
c8 which profile
```

### Remove a profile

```bash
c8 remove profile prod
c8 rm profile prod   # alias
```

:::note
Modeler profiles are read-only. They cannot be modified or removed through `c8ctl` — manage them in Camunda Modeler.
:::

### Camunda Modeler integration

`c8ctl` automatically reads profiles from Camunda Modeler's `profiles.json` file. These profiles are:

- **Read-only** — cannot be modified or deleted via `c8ctl`.
- **Prefixed** — always displayed with a `modeler:` prefix (for example, `modeler:Local Dev`).
- **Dynamic** — loaded fresh on each command execution.

Platform-specific locations:

| Platform | Path                                                          |
| :------- | :------------------------------------------------------------ |
| Linux    | `~/.config/camunda-modeler/profiles.json`                     |
| macOS    | `~/Library/Application Support/camunda-modeler/profiles.json` |
| Windows  | `%APPDATA%\camunda-modeler\profiles.json`                     |

```bash
# Use a Modeler profile as the active session profile
c8 use profile "modeler:Local Dev"

# Use a Modeler profile for a single command
c8 list pi --profile=modeler:Cloud Cluster
```

## Get help

```bash
c8ctl help                # general help
c8ctl help list           # help for the list command
c8ctl help deploy         # help for the deploy command
c8ctl help profiles       # help for profile management
c8ctl --version           # print version
```

Run any verb without a resource to see what resources are available:

```bash
c8 list                   # shows: pi, pd, ut, inc, jobs, profiles, plugins
c8 search                 # shows: pi, pd, ut, inc, jobs, variables
```

## Shell completion

`c8ctl` supports shell completion for bash, zsh, and fish.

<Tabs>
  <TabItem value="bash" label="Bash">

```bash
c8ctl completion bash > ~/.c8ctl-completion.bash
echo 'source ~/.c8ctl-completion.bash' >> ~/.bashrc
source ~/.bashrc
```

</TabItem>

<TabItem value="zsh" label="Zsh">

```bash
c8ctl completion zsh > ~/.c8ctl-completion.zsh
echo 'source ~/.c8ctl-completion.zsh' >> ~/.zshrc
source ~/.zshrc
```

</TabItem>

<TabItem value="fish" label="Fish">

```bash
c8ctl completion fish > ~/.config/fish/completions/c8ctl.fish
```

Fish loads the completion automatically on the next shell start.

</TabItem> 
</Tabs>

## Output modes

Switch between human-readable text and machine-readable JSON:

```bash
c8 output json    # all commands output JSON
c8 output text    # back to formatted tables (default)
```

## Environment variables

| Variable                    | Description          |
| :-------------------------- | :------------------- |
| `CAMUNDA_BASE_URL`          | Cluster base URL     |
| `CAMUNDA_CLIENT_ID`         | OAuth client ID      |
| `CAMUNDA_CLIENT_SECRET`     | OAuth client secret  |
| `CAMUNDA_TOKEN_AUDIENCE`    | OAuth token audience |
| `CAMUNDA_OAUTH_URL`         | OAuth token endpoint |
| `CAMUNDA_DEFAULT_TENANT_ID` | Default tenant ID    |

Environment variable conventions follow the [`@camunda8/orchestration-cluster-api`](https://www.npmjs.com/package/@camunda8/orchestration-cluster-api) module.

## Debug mode

Enable debug logging to see detailed internal information such as plugin loading and credential resolution:

```bash
DEBUG=1 c8 list pi
# or
C8CTL_DEBUG=true c8 list pi
```

Debug output is written to stderr and does not interfere with normal command output.

## Next steps

- [Cluster inspection and process management](cluster-inspection.md) — list, search, and manage process instances, user tasks, incidents, and jobs.
- [Development workflows](development-workflows.md) — deploy, run, watch, and configure profiles and MCP proxy.
- [Extend `c8ctl` with plugins](plugins.md) — scaffold, install, and manage custom CLI plugins.
