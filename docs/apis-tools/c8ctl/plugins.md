---
id: plugins
title: "Extend c8ctl with plugins"
sidebar_label: "Plugins"
description: "Scaffold, install, and manage c8ctl plugins to add custom commands to the Camunda 8 CLI."
---

<!-- This page is maintained in the c8ctl repository (https://github.com/camunda/c8ctl, in docs/) and
     is synced to camunda-docs automatically. Do not edit it in camunda-docs — changes will be
     overwritten. Edit the source in the c8ctl repo instead. -->

`c8ctl` supports a global plugin system that lets you add custom commands. Plugins are installed globally to a user-specific directory and tracked in a registry file (`plugins.json`).

## Plugin storage locations

| Platform | Plugins directory                                          | Registry file                                      |
| :------- | :--------------------------------------------------------- | :------------------------------------------------- |
| Linux    | `~/.config/c8ctl/plugins/node_modules`                     | `~/.config/c8ctl/plugins.json`                     |
| macOS    | `~/Library/Application Support/c8ctl/plugins/node_modules` | `~/Library/Application Support/c8ctl/plugins.json` |
| Windows  | `%APPDATA%\c8ctl\plugins\node_modules`                     | `%APPDATA%\c8ctl\plugins.json`                     |

You can override the data directory with the `C8CTL_DATA_DIR` environment variable.

## Scaffold a new plugin

Generate a new plugin project from a TypeScript template:

```bash
c8ctl init plugin my-plugin
```

This creates a project directory with all necessary files, build configuration, and an `AGENTS.md` guide for autonomous plugin implementation.

## Install a plugin

### From the npm registry

```bash
c8 load plugin my-custom-plugin
```

### From a URL

```bash
c8 load plugin --from https://github.com/user/my-plugin
c8 load plugin --from file:///path/to/local/plugin
c8 load plugin --from git://github.com/user/plugin.git
```

After loading, plugin commands are immediately available.

## Manage plugins

### List installed plugins

```bash
c8 list plugins
```

Output shows version and sync status for each plugin:

- `✓ Installed` — plugin is in the registry and installed.
- `⚠ Not installed` — plugin is in the registry but missing from disk (run `sync`).
- `⚠ Not in registry` — plugin is installed but not tracked in the registry.

### Upgrade a plugin

```bash
# Upgrade to latest
c8 upgrade plugin my-custom-plugin

# Upgrade to a specific version
c8 upgrade plugin my-custom-plugin 1.2.3
```

### Downgrade a plugin

```bash
c8 downgrade plugin my-custom-plugin 1.0.0
```

Upgrade and downgrade behavior depends on the plugin source:

| Source      | Behavior                                                                                                    |
| :---------- | :---------------------------------------------------------------------------------------------------------- |
| npm package | Installs `<name>@<version>`.                                                                                |
| URL/git     | Installs `<source>#<version>`.                                                                              |
| `file://`   | Version-based upgrade/downgrade is not supported. Use `load plugin --from` with the desired local checkout. |

### Unload a plugin

```bash
c8 unload plugin my-custom-plugin
```

### Synchronize plugins

Synchronize all plugins from the registry. Rebuilds installed plugins and reinstalls any that are missing:

```bash
c8 sync plugins
```

### Diagnose plugin issues

Use `doctor plugin` to inspect the plugin loading state and surface any command collisions (for example, when two plugins register the same command) or version incompatibilities. The report always exits `0` — it describes state rather than failing.

```bash
# Human-readable summary of loaded plugins, their requirements, and any problems
c8 doctor plugin

# Machine-readable output for scripts and agents
c8 doctor plugin --json
```

Built-in commands always take precedence over plugin commands, and the first plugin to register a given command wins — with one exception: a plugin disabled by its declared `engines.c8ctl` (see below) yields the command name to a compatible plugin regardless of load order, because its own copy could only ever refuse to run. `doctor plugin` shows which registrations were kept and which were shadowed, plus each plugin's declared requirement and whether this c8ctl satisfies it.

## The c8ctl version a plugin needs

The plugin runtime grows over time — `c8ctl.npm()`, for instance, does not exist in every published c8ctl. A plugin that uses a newer runtime API declares the floor it needs in its own `package.json`:

```json
{
  "name": "c8ctl-plugin-example",
  "engines": {
    "c8ctl": ">=4.0.0-alpha.1"
  }
}
```

The field is optional — a plugin that declares nothing is treated exactly as it was before. When it *is* declared and this c8ctl does not satisfy it:

- `c8 load plugin`, `c8 upgrade plugin`, and `c8 downgrade plugin` **fail** instead of reporting success. The plugin is still installed; what you don't get is a green exit code on an install that cannot work. (Pinning an older release is the likeliest way to land on one built for an older c8ctl, so `downgrade` matters most here.)
- The plugin still loads and still appears in `c8 help`, but every one of its commands refuses to run and prints which c8ctl it needs. A visible command that explains itself beats a missing one that reads as a typo.
- `c8 doctor plugin` lists it under incompatible plugins, in text and in `--json`.

Range evaluation is npm's own `semver` — the same library `npm install` uses for `engines` fields — so the full range grammar is supported: comparators (`>=`, `>`, `<=`, `<`, `^`, `~`, an exact version, `*`), set unions (`"^3 || ^4"`), hyphen ranges (`"3.3.0 - 4.0.0"`), and partial or wildcard versions (`"4"`, `"4.x"`). Prereleases order as semver specifies, so `>=4.0.0` is *not* satisfied by `4.0.0-alpha.1` — declare `>=4.0.0-alpha.1` when an alpha is enough — and `^`/`~` exclude prereleases of the version they bound (`^4.1.0` does not admit `5.0.0-alpha.1`).

**Prereleases count.** Unlike `npm install`, which excludes prerelease versions from a range unless you opt in, this check treats them as ordinary versions: a host on `4.1.0-alpha.3` satisfies `>=4.0.0-alpha.1`. That is deliberate — c8ctl publishes alphas, and refusing to run a plugin on the very channel its requirement was written for would disable working setups. One consequence to know: `^`/`~` still desugar the way npm does, to an upper bound that excludes prereleases (`^4.1.0` means `>=4.1.0 <5.0.0-0`), while a hand-written `<5.0.0` means exactly what it says and does admit `5.0.0-alpha.1`. Spell the bound explicitly if that distinction matters to your plugin.

Two cases deliberately disable nothing, because c8ctl could not evaluate the requirement rather than having found it unmet:

- c8ctl running from an unpublished development build, whose version says nothing about its API surface.
- A range c8ctl cannot parse (`"latest"`, `">=four"`), which is reported as a warning pointing at npm's semver range syntax.

To resolve a genuine incompatibility, either upgrade c8ctl (`npm install -g @camunda8/cli@latest`) or install a plugin release that supports the c8ctl you have.

## Plugin structure

A plugin is a regular Node.js module with a `c8ctl-plugin.js` (or `c8ctl-plugin.ts`) file in the root directory. The file must export a `commands` object and optionally a `metadata` object.

### Minimal example

```typescript
// c8ctl-plugin.ts
export const metadata = {
  name: "my-plugin",
  description: "My custom c8ctl plugin",
  commands: {
    analyze: {
      description: "Analyze BPMN processes for best practices",
    },
    optimize: {
      description: "Optimize process definitions",
    },
  },
};

export const commands = {
  analyze: async (args: string[]) => {
    console.log("Analyzing...", args);
  },
  optimize: async (args: string[]) => {
    console.log("Optimizing...");
  },
};
```

## Plugin runtime API

At runtime, `c8ctl` injects a global object via `globalThis.c8ctl` that plugins can use to interact with the Camunda cluster and the `c8ctl` environment.

| Method/field                         | Description                                                                              |
| :----------------------------------- | :--------------------------------------------------------------------------------------- |
| `createClient(profile?, sdkConfig?)` | Create a Camunda SDK client. Optionally pass a profile name to use specific credentials. |
| `resolveTenantId(profile?)`          | Resolve the active tenant ID using the same fallback logic as built-in commands.         |
| `getLogger()`                        | Get the `c8ctl` logger instance (respects the current output mode).                      |
| `getUserDataDir()`                   | Absolute path of the `c8ctl` user data directory (honours `C8CTL_DATA_DIR`).             |
| `npm({ args, stdout?, stdio? })`     | Run npm the way `c8ctl` does, portably. See [Running npm from a plugin](#running-npm-from-a-plugin). |
| `version`                            | `c8ctl` version string.                                                                  |
| `nodeVersion`                        | Node.js version.                                                                         |
| `platform`                           | Operating system (`linux`, `darwin`, `win32`).                                           |
| `arch`                               | CPU architecture.                                                                        |
| `cwd`                                | Current working directory.                                                               |
| `outputMode`                         | Current output mode (`text` or `json`).                                                  |
| `activeProfile`                      | Name of the active profile.                                                              |
| `activeTenant`                       | Active tenant ID.                                                                        |

### Running npm from a plugin

Spawning npm directly is not portable. On Windows npm is a `npm.cmd` shim: a bare `npm` spawn fails with `ENOENT`, and `npm.cmd` alone fails with `EINVAL` under the CVE-2024-27980 hardening in Node 18.20.2 / 20.12.2 / 21.7.3 and later. `c8ctl.npm()` is the same helper the CLI uses for its own plugin installs — it routes the call through `cmd.exe` with every argument quoted (plugin paths routinely contain spaces) and rejects arguments that cannot be passed safely: an embedded `"`, a line break, or a `%VAR%` reference.

```typescript
import type { C8ctlPluginRuntime } from "@camunda8/cli/runtime";

const c8ctl: C8ctlPluginRuntime | undefined = globalThis.c8ctl;
if (!c8ctl) throw new Error("c8ctl runtime is not available");
// Capture stdout
const { stdout } = c8ctl.npm({ args: ["view", "c8ctl-plugin-foo", "version"], stdout: true });

// Stream to the terminal instead
c8ctl.npm({ args: ["install", "c8ctl-plugin-foo"], stdio: "inherit" });
```

`stdout: true` returns `{ stdout: string }`; omitting it returns `undefined`. A non-zero npm exit throws.

#### Installing into a directory with `--prefix`

`npm install --prefix <dir>` with no package spec misbehaves on Windows: npm applies the CLI `--prefix` to the global prefix too, and because the Windows global install root is `<prefix>\node_modules` (rather than `<prefix>/lib/node_modules` as on POSIX) npm decides the install is global, rewrites the empty argument list to `.`, and resolves that against the process cwd — so it reads the wrong `package.json` ([#526](https://github.com/camunda/c8ctl/issues/526)). `c8ctl.npm()` detects this exact shape on Windows and instead runs npm with its cwd set to the prefix directory, which is equivalent and correct. Plugins do not need to change their cwd or use an npm-specific option form, and POSIX invocations are untouched. The re-scope is bounded (`--workspaces=false`) so npm resolves exactly that directory rather than promoting the install to a workspace root above it, and a prefix that is itself a workspace root is left untouched.

```typescript
// Works the same on Linux, macOS and Windows
c8ctl.npm({ args: ["install", "--prefix", projectDir], stdout: true });
```

### TypeScript autocomplete

For TypeScript autocomplete in your plugin, import the runtime type:

```typescript
import type { C8ctlPluginRuntime } from "@camunda8/cli/runtime";

const c8ctl = globalThis.c8ctl as C8ctlPluginRuntime;
const tenantId = c8ctl.resolveTenantId();
const logger = c8ctl.getLogger();
logger.info(`Tenant: ${tenantId}`);
```

### Use the SDK client from a plugin

```typescript
import type { C8ctlPluginRuntime } from "@camunda8/cli/runtime";

const c8ctl = globalThis.c8ctl as C8ctlPluginRuntime;

export const commands = {
  "list-active": async (args: string[]) => {
    const client = c8ctl.createClient();
    const logger = c8ctl.getLogger();
    // Use the client to query the Orchestration Cluster API
    logger.info("Client ready");
  },
};
```

## Help integration

When plugins export a `metadata.commands` object with descriptions, those commands appear in the `c8ctl help` output under a **Plugin Commands** section:

```text
c8ctl - Camunda 8 CLI v2.2.0

Commands:
  list      <resource>       List resources (pi, ut, inc, jobs, profiles)
  get       <resource> <key> Get resource by key (pi, topology)
  ...

Plugin Commands:
  analyze                 Analyze BPMN processes for best practices
  optimize                Optimize process definitions
```

Plugins without a `metadata` export still work — their commands appear in the help output without descriptions.

## Command precedence

Built-in commands take precedence over plugin commands. If a plugin exports a command with the same name as a built-in command (for example, `list` or `deploy`), the built-in command runs.

Use descriptive and unique names for plugin commands.

Recommended:

- `analyze-process`
- `export-data`
- `sync-resources`

Avoid:

- `list`
- `get`
- `create`
- `deploy`

## Find plugins

Plugins are distributed as regular npm packages. There are two main ways to discover available plugins:

### Search the Camunda GitHub organization

Browse the [Camunda GitHub organization](https://github.com/camunda) and search for repositories with `c8ctl` in the name. By convention, plugin repositories are named `c8ctl-plugin-<name>` (for example, `c8ctl-plugin-analyze`), but this is not a hard requirement — any npm package with a `c8ctl-plugin.js` entry point works as a plugin.

### Search the npm registry

Search for `c8ctl` or `c8ctl-plugin` on [npmjs.com](https://www.npmjs.com/search?q=c8ctl-plugin):

```bash
npm search c8ctl-plugin
```

Once you find a plugin, install it with:

```bash
c8 load plugin <package-name>
```

## Best practices

- Use unique command names to avoid conflicts with built-in commands.
- Provide descriptions in `metadata.commands` so users discover your commands in `c8ctl help`.
- Keep descriptions concise and aim for a single line under 60 characters, starting with an imperative verb.
- Transpile TypeScript to JavaScript before publishing. The `c8ctl-plugin.js` entry point in `node_modules` must be JavaScript, because Node.js does not support type stripping in `node_modules`.
- Use `createClient()` from the runtime API to create SDK clients rather than importing the SDK directly. This ensures credentials and tenant resolution follow `c8ctl` conventions.
