---
id: getting-started
title: "c8ctl CLI"
description: "Use the c8ctl CLI to inspect your Camunda 8 clusters, deploy resources, and manage process automation from the terminal."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import PageDescription from '@site/src/components/PageDescription';

<!-- This page is maintained in the c8ctl repository (https://github.com/camunda/c8ctl, in docs/) and
     is synced to camunda-docs automatically. Do not edit it in camunda-docs — changes will be
     overwritten. Edit the source in the c8ctl repo instead. -->

<PageDescription />

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

## Quick start with a local cluster

`c8ctl` includes a built-in `cluster` command that downloads and manages a local [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md) instance. This is the fastest way to get a cluster running for development.

### Start a cluster

```bash
# Start with the latest stable version (default)
c8 cluster start

# Start with a specific version
c8 cluster start 8.9.0-alpha5

# Start using a version alias
c8 cluster start stable
c8 cluster start alpha

# Start with a major.minor version (rolling release)
c8 cluster start 8.8
```

`c8ctl` automatically downloads the correct binary for your platform, caches it locally, launches the cluster in the background, and waits for it to become healthy.

### Stop the cluster

```bash
c8 cluster stop
```

### Check cluster status

```bash
c8 cluster status
```

Reports whether a cluster is running, including connection details.

If `cluster start` exits nonzero while Camunda or connector processes survive,
status reports **`running after failed startup`**. Review the startup error or
c8run logs, then run `c8 cluster stop` before retrying. A responding shared health
endpoint does not mean every physical tenant is ready. The original startup exit
code is preserved; stopping clears the failure record, and a successful restart
replaces any stale failure state.
This includes readiness timeouts after c8run itself exits successfully, which
make `cluster start` exit 1. A retry while processes survive without an active
marker also exits 1; stop those processes before starting again.

**`running (untracked)`** means processes are alive without an active c8ctl
marker and the startup outcome is unknown. Use `c8 cluster stop` to recover,
including when an installation directory was replaced or deleted while running.
JSON status (`c8 cluster status --json`) includes the same `status` and `recovery`
guidance.

### View cluster logs

```bash
c8 cluster logs
```

Streams log output from the running cluster.

### Manage cached versions

```bash
# List locally cached versions and available aliases
c8 cluster list

# List all versions available on the remote download server
c8 cluster list-remote

# Download a version without starting it
c8 cluster install 8.8

# Remove a locally cached version
c8 cluster delete 8.8

# Delete a version's runtime data but keep the binary (the next start is fresh)
c8 cluster purge 8.8

# Or stop the running cluster and purge its runtime data in one step
c8 cluster stop --purge
```

### Manage secrets

`c8 cluster secrets` forwards to the `secrets` command of the c8run binary c8ctl already downloads and manages. c8ctl adds no storage of its own and never sees a secret value: `set` prompts for the value without echoing it (or reads exactly one value from stdin with `--stdin`), and the store is c8run's, shared across versions and projects for the current OS user.

```bash
# Store a secret — prompts, no-echo
c8 cluster secrets set OPENAI_API_KEY

# List secret names (values are never shown)
c8 cluster secrets list

# Import multiple secrets from a dotenv file
c8 cluster secrets import .env.secrets

# Delete a secret without an interactive prompt
c8 cluster secrets delete OPENAI_API_KEY --yes

# Target a specific installed version instead of the running/highest one
c8 cluster secrets --c8-version 8.10 list
```

Everything after `secrets` is passed to c8run unchanged, so any verb or flag c8run supports works here too, including ones added after this was written — run `c8 cluster secrets help` for c8run's own help (`--help` on the `c8ctl` command itself belongs to c8ctl). This requires a c8run build that includes the `secrets` command; older cached versions print a hint if it is missing. Until then, or as an ephemeral alternative for a single run, pass secrets as environment variables when starting instead:

```bash
SECRET_OPENAI_API_KEY=sk-... c8 cluster start
```

### Local physical tenants

Physical tenants are isolated engines inside one local Camunda process, each with its own data, users, secrets, and Connectors runtime. They require **Camunda 8.10 or newer and a c8run build that includes the physical-tenant CLI**. Older cached 8.10 builds can predate this feature. `cluster start` reuses cached installations, so upgrading c8ctl alone does not upgrade the cached c8run; `cluster install 8.10` checks for an updated distribution. Run `c8 cluster tenants help` to confirm support.

```bash
# Install a supporting distribution, then save tenants without starting Java
c8 cluster install 8.10
c8 cluster tenants --c8-version 8.10 add sales
c8 cluster tenants --c8-version 8.10 add hr --username alice
# c8run prompts for alice's password; automation can use --password-stdin

# Start default plus all saved tenants
c8 cluster start 8.10
c8 cluster tenants list

# One start only: overrides the saved tenant selection without changing it
c8 cluster stop
c8 cluster start 8.10 --physical-tenants sales,hr

# Manage a physical tenant's own secrets
c8 cluster secrets --tenant sales set OPENAI_API_KEY
c8 cluster secrets --tenant sales import .env.secrets
c8 cluster secrets --tenant sales delete OPENAI_API_KEY --yes

# Removing a tenant keeps its data; restart to apply the change
c8 cluster tenants remove sales --yes
c8 cluster tenants path
c8 cluster tenants help

# Stop default and all tenants
c8 cluster stop
```

`cluster tenants` delegates to c8run, which owns tenant validation, password prompting, persistence, configuration, and readiness checks. It also supports `reset --yes` and `add <id> --no-connectors`. `remove` and `reset` ask for confirmation; non-interactive use requires `--yes`. `--physical-tenants` is start-only, accepts comma-separated IDs, and can be repeated. The startup output includes per-tenant endpoints and readiness. A failed tenant can leave healthy engines running; the command returns a failure and `c8 cluster stop` stops the surviving processes.

Management commands select an explicit leading `--c8-version`, otherwise the running cluster's version, otherwise the highest locally installed version. They never download a distribution automatically. Keep the same version selected when configuring and starting a cluster. Both secrets and tenant commands preserve c8run's output and exit status; `--json` does not convert that output to JSON. Use the `help` subcommand for c8run help, because `--help` belongs to c8ctl. `--dry-run` previews these delegated calls and cluster starts without launching c8run or reading stdin.

`C8RUN_TENANTS_FILE` selects the saved tenant file; `C8RUN_SECRETS_DIR` selects the default secrets directory. Relative values and secret import filenames are resolved against the caller's working directory, including on startup. Without overrides, c8run's per-OS-user defaults apply. Each tenant's secret directory is a sibling under `tenant-secrets/<id>`. c8ctl adds no tenant or secret store of its own.

Tenant IDs contain lowercase letters and digits. With the bundled H2 or other RDBMS storage, IDs are limited to eight characters. Removing and re-adding an ID restores its data, including its existing users. Each enabled tenant Connectors runtime uses another JVM and port. See the [physical-tenant documentation](https://docs.camunda.io/docs/next/self-managed/concepts/physical-tenants/) for prerequisites and limitations.

#### Inspect a physical tenant with a profile

Physical tenants use a distinct REST base path. For a tenant using the default `demo` login:

```bash
c8 add profile local-sales \
  --baseUrl=http://localhost:8080/physical-tenants/sales/v2 \
  --username=demo --password=demo \
  --exactBaseUrl
c8 --profile local-sales list process-definitions
```

Configure the profile's authentication to match a dedicated tenant login when used. Existing `create tenant`, `list tenants`, and `use tenant` commands manage or select **logical tenants inside an engine**; they do not create or select physical engines. Profiles select the physical tenant's API endpoint. No profiles are created or switched automatically by `cluster tenants`.

### Version aliases

The `stable` and `alpha` aliases are resolved dynamically from the [Camunda Download Center](https://downloads.camunda.cloud/release/camunda/c8run/):

| Alias    | Resolves to                                              |
| :------- | :------------------------------------------------------- |
| `stable` | Highest minor release that is GA (for example, 8.9)      |
| `alpha`  | Highest minor release overall (for example, 8.10-alpha0) |

When no version is specified, `c8 cluster start` defaults to `stable`.

A `<major>.<minor>` version like `8.8` is treated as a rolling release — the download server directory is updated in-place with new patch releases. `c8 cluster start` uses the local version if available, while `c8 cluster install` always checks for a newer version.

### Debug output

Stream raw c8run logs during startup:

```bash
c8 cluster start --debug
```

### Supported platforms

- macOS (x86_64, aarch64)
- Linux (x86_64, aarch64)
- Windows (x86_64)

Cache locations:

| Platform | Path                          |
| :------- | :---------------------------- |
| macOS    | `~/Library/Caches/c8run/`     |
| Linux    | `~/.cache/c8run/`             |
| Windows  | `%LOCALAPPDATA%\c8run\cache\` |

Override the cache directory with the `C8RUN_CACHE_DIR` environment variable.

### Download interruptions

The c8run archive is several hundred MB. If the connection drops, `c8 cluster start` and `c8 cluster install` retry up to three times and resume from where the download stopped when the server supports it. An attempt that receives no data for 60 seconds is aborted and retried. If the download still fails, the error names the cause and suggests what to try:

- Behind a proxy, set `HTTPS_PROXY` together with `NODE_USE_ENV_PROXY=1` (Node.js 22.21+ or 24.5+).
- Set `C8CTL_C8RUN_DOWNLOAD_URL` to download from a mirror with the same layout as the Camunda Download Center.
- Add `--verbose` to print HTTP details for each download attempt: request and response headers, timing, throughput, and the full error cause chain.

## Credential resolution

`c8ctl` resolves credentials in the following order:

1. **`--profile` flag** — one-off override for a single command.
2. **Active profile** — set with `c8 use profile <name>`.
3. **Environment variables** — standard `CAMUNDA_*` variables (take precedence over the default profile).
4. **Default `local` profile** — `http://localhost:8080/v2`.

When no profile has been explicitly set, `c8ctl` defaults to a built-in `local` profile that points to `http://localhost:8080/v2`. This means you can start a local cluster with `c8 cluster start` and immediately run commands without any configuration. If the connection fails, `c8ctl` shows a hint with the URL it tried to connect to.

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

# With explicit OAuth endpoint, audience, and scope
c8 add profile prod \
  --baseUrl=https://camunda.example.com \
  --clientId=your-client-id \
  --clientSecret=your-client-secret \
  --audience=camunda-api \
  --oAuthUrl=https://auth.example.com/oauth/token \
  --scope="my-oauth-scope"

# With a default tenant
c8 add profile dev \
  --baseUrl=https://dev.example.com \
  --clientId=dev-client \
  --clientSecret=dev-secret \
  --defaultTenantId=dev-tenant

# Import settings from a .env file
c8 add profile staging --from-file .env.staging

# Import settings from the current CAMUNDA_* environment variables
source .env.prod
c8 add profile prod --from-env
```

### Gateway-fronted clusters

For a cluster reached through an API gateway or reverse proxy, a profile can attach a custom header to every request and target `--baseUrl` exactly, without `c8ctl`'s automatic `/v2` suffixing:

```bash
# Attach a header (e.g. an API key) to every REST request made under this profile.
# Repeat --header to attach more than one.
c8 add profile gateway \
  --baseUrl=https://gateway.example.com/camunda-api \
  --header "X-Api-Key: your-api-key" \
  --header "X-Correlation-Id: your-correlation-id"

# --exactBaseUrl: use --baseUrl as the exact request path instead of
# appending /v2 (the default for self-managed profiles).
c8 add profile gateway-exact \
  --baseUrl=https://gateway.example.com/camunda-api \
  --exactBaseUrl
```

Both flags are optional and independent of each other. A profile that sets neither behaves exactly as before.

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
c8 list                   # shows: pi, pd, ut, inc, jobs, profiles, plugins, users, roles, groups, tenants, auth, mr
c8 search                 # shows: pi, pd, ut, inc, jobs, variables, users, roles, groups, tenants, auth, mr
```

## Send feedback

```bash
c8 feedback
```

Opens the GitHub issues page in your browser to report bugs or request features.

## Update notifications

`c8ctl` checks for newer versions at most once an hour, in a detached background process, so an unreachable or blocked npm registry never delays a command. When that check finds an update, the next command displays a one-time notification. The check is suppressed in CI environments and development versions; the notification is also suppressed in JSON output mode.

## Shell completion

The recommended way to set up shell completion is with the `install` subcommand:

```bash
c8 completion install
```

This auto-detects your shell, writes the completion file, and wires it into your shell configuration. To specify a shell explicitly:

```bash
c8 completion install --shell zsh
```

Completions auto-refresh when the CLI is upgraded.

Alternatively, generate the completion script manually:

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

These commands save the output preference. Use `--json` to select JSON for one invocation without changing the saved preference.

For scripts that invoke multiple commands, set `C8CTL_OUTPUT_MODE=json` in their environment rather than adding `--json` to every invocation. `C8CTL_OUTPUT_MODE=text` also allows a temporary text override when the saved preference is JSON, without changing session state. An explicit `--json` flag takes precedence over the environment override, which takes precedence over the saved preference.

### Version output

`c8ctl --version` (or `c8ctl -v`) always writes its result to stdout and exits `0`:

| Effective output mode | stdout |
| :-------------------- | :----- |
| Text | `c8ctl v<version>` |
| JSON | `{"status":"info","message":"c8ctl v<version>"}` |

This applies whether JSON mode comes from `--json`, `C8CTL_OUTPUT_MODE`, or the saved preference. The version is primary command output, not a diagnostic, despite the JSON envelope's `status: "info"`. Diagnostics remain on stderr in JSON mode. The version payload is not filtered by `--fields`, and requesting the version does not change the saved preference.

## Environment variables

| Variable                    | Description          |
| :-------------------------- | :------------------- |
| `CAMUNDA_BASE_URL`          | Cluster base URL     |
| `CAMUNDA_CLIENT_ID`         | OAuth client ID      |
| `CAMUNDA_CLIENT_SECRET`     | OAuth client secret  |
| `CAMUNDA_TOKEN_AUDIENCE`    | OAuth token audience |
| `CAMUNDA_OAUTH_URL`         | OAuth token endpoint |
| `CAMUNDA_OAUTH_SCOPE`       | OAuth scope (space-separated) |
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
