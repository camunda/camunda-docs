---
id: command-reference
title: "Command reference"
sidebar_label: "Command reference"
description: "Complete reference of all c8ctl CLI commands, flags, resources, and aliases — auto-generated from the command registry."
---

<!-- Auto-generated from COMMAND_REGISTRY. Do not edit manually.
     Run: node --experimental-strip-types scripts/sync-readme-commands.ts --docs -->

:::warning Alpha feature
`c8ctl` is in alpha and is not intended for production use. Commands and flags may change without notice between releases. See [Getting started](getting-started.md) for details.
:::

## Global Flags

These flags are accepted by every command.

| Flag               | Type    | Required | Description                                                                     |
| ------------------ | ------- | -------- | ------------------------------------------------------------------------------- |
| `--help` / `-h`    | boolean |          | Show help                                                                       |
| `--version` / `-v` | string  |          | Show CLI version, or filter by process definition version on supported commands |
| `--profile`        | string  |          | Use a specific profile                                                          |
| `--dry-run`        | boolean |          | Preview the API request without executing                                       |
| `--verbose`        | boolean |          | Show verbose output                                                             |
| `--fields`         | string  |          | Comma-separated list of fields to display                                       |

## Resource Aliases

| Alias  | Resource             |
| ------ | -------------------- |
| `auth` | `authorization`      |
| `inc`  | `incident`           |
| `mr`   | `mapping-rule`       |
| `msg`  | `message`            |
| `pd`   | `process-definition` |
| `pi`   | `process-instance`   |
| `ut`   | `user-task`          |
| `vars` | `variable`           |
| `var`  | `variable`           |

## Search Flags

These flags are available on `list` and `search` commands.

| Flag          | Type    | Required | Description                                              |
| ------------- | ------- | -------- | -------------------------------------------------------- |
| `--sortBy`    | string  |          | Sort results by field                                    |
| `--asc`       | boolean |          | Sort ascending                                           |
| `--desc`      | boolean |          | Sort descending                                          |
| `--limit`     | string  |          | Maximum number of results                                |
| `--between`   | string  |          | Date range filter (e.g. 7d, 30d, 2024-01-01..2024-12-31) |
| `--dateField` | string  |          | Date field for --between filter                          |

## Commands

### `list`

List resources

**Resources:** pi (process-instance), pd (process-definition), ut (user-task), inc (incident), jobs, profiles (profile), plugins (plugin), users (user), roles (role), groups (group), tenants (tenant), auth (authorization), mapping-rules (mapping-rule)

**Verb-level flags:**

| Flag    | Type    | Required | Description                         |
| ------- | ------- | -------- | ----------------------------------- |
| `--all` | boolean |          | List all (disable pagination limit) |

**Resource-specific flags:**

<details>
<summary><code>process-definition</code></summary>

| Flag                    | Type   | Required | Description                                |
| ----------------------- | ------ | -------- | ------------------------------------------ |
| `--bpmnProcessId`       | string |          | Filter by BPMN process ID                  |
| `--id`                  | string |          | Filter by BPMN process ID (alias)          |
| `--processDefinitionId` | string |          | Filter by process definition ID            |
| `--name`                | string |          | Filter by name                             |
| `--key`                 | string |          | Filter by key                              |
| `--iid`                 | string |          | Case-insensitive filter by BPMN process ID |
| `--iname`               | string |          | Case-insensitive filter by name            |

</details>

<details>
<summary><code>process-instance</code></summary>

| Flag                         | Type   | Required | Description                                |
| ---------------------------- | ------ | -------- | ------------------------------------------ |
| `--bpmnProcessId`            | string |          | Filter by BPMN process ID                  |
| `--id`                       | string |          | Filter by BPMN process ID (alias)          |
| `--processDefinitionId`      | string |          | Filter by process definition ID            |
| `--processDefinitionKey`     | string |          | Filter by process definition key           |
| `--state`                    | string |          | Filter by state (ACTIVE, COMPLETED, etc)   |
| `--key`                      | string |          | Filter by key                              |
| `--parentProcessInstanceKey` | string |          | Filter by parent process instance key      |
| `--iid`                      | string |          | Case-insensitive filter by BPMN process ID |

</details>

<details>
<summary><code>user-task</code></summary>

| Flag                     | Type   | Required | Description                         |
| ------------------------ | ------ | -------- | ----------------------------------- |
| `--state`                | string |          | Filter by state                     |
| `--assignee`             | string |          | Filter by assignee                  |
| `--processInstanceKey`   | string |          | Filter by process instance key      |
| `--processDefinitionKey` | string |          | Filter by process definition key    |
| `--elementId`            | string |          | Filter by element ID                |
| `--iassignee`            | string |          | Case-insensitive filter by assignee |

</details>

<details>
<summary><code>incident</code></summary>

| Flag                     | Type   | Required | Description                                |
| ------------------------ | ------ | -------- | ------------------------------------------ |
| `--state`                | string |          | Filter by state                            |
| `--processInstanceKey`   | string |          | Filter by process instance key             |
| `--processDefinitionKey` | string |          | Filter by process definition key           |
| `--bpmnProcessId`        | string |          | Filter by BPMN process ID                  |
| `--id`                   | string |          | Filter by BPMN process ID (alias)          |
| `--processDefinitionId`  | string |          | Filter by process definition ID            |
| `--errorType`            | string |          | Filter by error type                       |
| `--errorMessage`         | string |          | Filter by error message                    |
| `--ierrorMessage`        | string |          | Case-insensitive filter by error message   |
| `--iid`                  | string |          | Case-insensitive filter by BPMN process ID |

</details>

<details>
<summary><code>jobs</code></summary>

| Flag                     | Type   | Required | Description                         |
| ------------------------ | ------ | -------- | ----------------------------------- |
| `--state`                | string |          | Filter by state                     |
| `--type`                 | string |          | Filter by job type                  |
| `--processInstanceKey`   | string |          | Filter by process instance key      |
| `--processDefinitionKey` | string |          | Filter by process definition key    |
| `--itype`                | string |          | Case-insensitive filter by job type |

</details>

<details>
<summary><code>user</code></summary>

| Flag         | Type   | Required | Description        |
| ------------ | ------ | -------- | ------------------ |
| `--username` | string |          | Filter by username |
| `--name`     | string |          | Filter by name     |
| `--email`    | string |          | Filter by email    |

</details>

<details>
<summary><code>role</code></summary>

| Flag       | Type   | Required | Description       |
| ---------- | ------ | -------- | ----------------- |
| `--roleId` | string |          | Filter by role ID |
| `--name`   | string |          | Filter by name    |

</details>

<details>
<summary><code>group</code></summary>

| Flag        | Type   | Required | Description        |
| ----------- | ------ | -------- | ------------------ |
| `--groupId` | string |          | Filter by group ID |
| `--name`    | string |          | Filter by name     |

</details>

<details>
<summary><code>tenant</code></summary>

| Flag         | Type   | Required | Description         |
| ------------ | ------ | -------- | ------------------- |
| `--tenantId` | string |          | Filter by tenant ID |
| `--name`     | string |          | Filter by name      |

</details>

<details>
<summary><code>authorization</code></summary>

| Flag             | Type   | Required | Description             |
| ---------------- | ------ | -------- | ----------------------- |
| `--ownerId`      | string |          | Filter by owner ID      |
| `--ownerType`    | string |          | Filter by owner type    |
| `--resourceType` | string |          | Filter by resource type |
| `--resourceId`   | string |          | Filter by resource ID   |

</details>

<details>
<summary><code>mapping-rule</code></summary>

| Flag              | Type   | Required | Description               |
| ----------------- | ------ | -------- | ------------------------- |
| `--mappingRuleId` | string |          | Filter by mapping rule ID |
| `--name`          | string |          | Filter by name            |
| `--claimName`     | string |          | Filter by claim name      |
| `--claimValue`    | string |          | Filter by claim value     |

</details>

**Examples:**

```bash
c8ctl list pi                                               # List process instances
c8ctl list pd                                               # List process definitions
c8ctl list users                                            # List users
```

---

### `search`

Search resources with filters (wildcards, date ranges, case-insensitive)

**Resources:** pi (process-instance), pd (process-definition), ut (user-task), inc (incident), jobs, vars (variable), users (user), roles (role), groups (group), tenants (tenant), auth (authorization), mapping-rules (mapping-rule)

**Resource-specific flags:**

<details>
<summary><code>process-definition</code></summary>

| Flag                    | Type   | Required | Description                                |
| ----------------------- | ------ | -------- | ------------------------------------------ |
| `--bpmnProcessId`       | string |          | Filter by BPMN process ID                  |
| `--id`                  | string |          | Filter by BPMN process ID (alias)          |
| `--processDefinitionId` | string |          | Filter by process definition ID            |
| `--name`                | string |          | Filter by name                             |
| `--key`                 | string |          | Filter by key                              |
| `--iid`                 | string |          | Case-insensitive filter by BPMN process ID |
| `--iname`               | string |          | Case-insensitive filter by name            |

</details>

<details>
<summary><code>process-instance</code></summary>

| Flag                         | Type   | Required | Description                                |
| ---------------------------- | ------ | -------- | ------------------------------------------ |
| `--bpmnProcessId`            | string |          | Filter by BPMN process ID                  |
| `--id`                       | string |          | Filter by BPMN process ID (alias)          |
| `--processDefinitionId`      | string |          | Filter by process definition ID            |
| `--processDefinitionKey`     | string |          | Filter by process definition key           |
| `--state`                    | string |          | Filter by state (ACTIVE, COMPLETED, etc)   |
| `--key`                      | string |          | Filter by key                              |
| `--parentProcessInstanceKey` | string |          | Filter by parent process instance key      |
| `--iid`                      | string |          | Case-insensitive filter by BPMN process ID |

</details>

<details>
<summary><code>user-task</code></summary>

| Flag                     | Type   | Required | Description                         |
| ------------------------ | ------ | -------- | ----------------------------------- |
| `--state`                | string |          | Filter by state                     |
| `--assignee`             | string |          | Filter by assignee                  |
| `--processInstanceKey`   | string |          | Filter by process instance key      |
| `--processDefinitionKey` | string |          | Filter by process definition key    |
| `--elementId`            | string |          | Filter by element ID                |
| `--iassignee`            | string |          | Case-insensitive filter by assignee |

</details>

<details>
<summary><code>incident</code></summary>

| Flag                     | Type   | Required | Description                                |
| ------------------------ | ------ | -------- | ------------------------------------------ |
| `--state`                | string |          | Filter by state                            |
| `--processInstanceKey`   | string |          | Filter by process instance key             |
| `--processDefinitionKey` | string |          | Filter by process definition key           |
| `--bpmnProcessId`        | string |          | Filter by BPMN process ID                  |
| `--id`                   | string |          | Filter by BPMN process ID (alias)          |
| `--processDefinitionId`  | string |          | Filter by process definition ID            |
| `--errorType`            | string |          | Filter by error type                       |
| `--errorMessage`         | string |          | Filter by error message                    |
| `--ierrorMessage`        | string |          | Case-insensitive filter by error message   |
| `--iid`                  | string |          | Case-insensitive filter by BPMN process ID |

</details>

<details>
<summary><code>jobs</code></summary>

| Flag                     | Type   | Required | Description                         |
| ------------------------ | ------ | -------- | ----------------------------------- |
| `--state`                | string |          | Filter by state                     |
| `--type`                 | string |          | Filter by job type                  |
| `--processInstanceKey`   | string |          | Filter by process instance key      |
| `--processDefinitionKey` | string |          | Filter by process definition key    |
| `--itype`                | string |          | Case-insensitive filter by job type |

</details>

<details>
<summary><code>variable</code></summary>

| Flag                   | Type    | Required | Description                                 |
| ---------------------- | ------- | -------- | ------------------------------------------- |
| `--name`               | string  |          | Filter by variable name                     |
| `--value`              | string  |          | Filter by value                             |
| `--processInstanceKey` | string  |          | Filter by process instance key              |
| `--scopeKey`           | string  |          | Filter by scope key                         |
| `--fullValue`          | boolean |          | Return full variable values (not truncated) |
| `--iname`              | string  |          | Case-insensitive filter by name             |
| `--ivalue`             | string  |          | Case-insensitive filter by value            |

</details>

<details>
<summary><code>user</code></summary>

| Flag         | Type   | Required | Description        |
| ------------ | ------ | -------- | ------------------ |
| `--username` | string |          | Filter by username |
| `--name`     | string |          | Filter by name     |
| `--email`    | string |          | Filter by email    |

</details>

<details>
<summary><code>role</code></summary>

| Flag       | Type   | Required | Description       |
| ---------- | ------ | -------- | ----------------- |
| `--roleId` | string |          | Filter by role ID |
| `--name`   | string |          | Filter by name    |

</details>

<details>
<summary><code>group</code></summary>

| Flag        | Type   | Required | Description        |
| ----------- | ------ | -------- | ------------------ |
| `--groupId` | string |          | Filter by group ID |
| `--name`    | string |          | Filter by name     |

</details>

<details>
<summary><code>tenant</code></summary>

| Flag         | Type   | Required | Description         |
| ------------ | ------ | -------- | ------------------- |
| `--tenantId` | string |          | Filter by tenant ID |
| `--name`     | string |          | Filter by name      |

</details>

<details>
<summary><code>authorization</code></summary>

| Flag             | Type   | Required | Description             |
| ---------------- | ------ | -------- | ----------------------- |
| `--ownerId`      | string |          | Filter by owner ID      |
| `--ownerType`    | string |          | Filter by owner type    |
| `--resourceType` | string |          | Filter by resource type |
| `--resourceId`   | string |          | Filter by resource ID   |

</details>

<details>
<summary><code>mapping-rule</code></summary>

| Flag              | Type   | Required | Description               |
| ----------------- | ------ | -------- | ------------------------- |
| `--mappingRuleId` | string |          | Filter by mapping rule ID |
| `--name`          | string |          | Filter by name            |
| `--claimName`     | string |          | Filter by claim name      |
| `--claimValue`    | string |          | Filter by claim value     |

</details>

**Examples:**

```bash
c8ctl search pi --state=ACTIVE                              # Search for active process instances
c8ctl search pd --bpmnProcessId=myProcess                   # Search process definitions by ID
c8ctl search pd --name='*main*'                             # Search process definitions with wildcard
c8ctl search ut --assignee=john                             # Search user tasks assigned to john
c8ctl search inc --state=ACTIVE                             # Search for active incidents
c8ctl search jobs --type=myJobType                          # Search jobs by type
c8ctl search jobs --type='*service*'                        # Search jobs with type containing "service"
c8ctl search variables --name=myVar                         # Search for variables by name
c8ctl search variables --value=foo                          # Search for variables by value
c8ctl search variables --processInstanceKey=123 --fullValue  # Search variables with full values
c8ctl search pd --iname='*order*'                           # Case-insensitive search by name
c8ctl search ut --iassignee=John                            # Case-insensitive search by assignee
```

---

### `get`

Get a resource by key

**Resources:** pi (process-instance), pd (process-definition), inc (incident), topology, form, user, role, group, tenant, auth (authorization), mapping-rule

**Positional arguments:**

- **process-definition:** `<key>` (required)
- **process-instance:** `<key>` (required)
- **incident:** `<key>` (required)
- **user:** `<username>` (required)
- **role:** `<roleId>` (required)
- **group:** `<groupId>` (required)
- **tenant:** `<tenantId>` (required)
- **authorization:** `<authorizationKey>` (required)
- **mapping-rule:** `<mappingRuleId>` (required)
- **form:** `<key>` (required)

**Resource-specific flags:**

<details>
<summary><code>process-definition</code></summary>

| Flag    | Type    | Required | Description                        |
| ------- | ------- | -------- | ---------------------------------- |
| `--xml` | boolean |          | Get BPMN XML (process definitions) |

</details>

<details>
<summary><code>form</code></summary>

| Flag                  | Type    | Required | Description                     |
| --------------------- | ------- | -------- | ------------------------------- |
| `--userTask`          | boolean |          | Get form for user task          |
| `--ut`                | boolean |          | Alias for --userTask            |
| `--processDefinition` | boolean |          | Get form for process definition |
| `--pd`                | boolean |          | Alias for --processDefinition   |

</details>

<details>
<summary><code>process-instance</code></summary>

| Flag          | Type    | Required | Description                 |
| ------------- | ------- | -------- | --------------------------- |
| `--variables` | boolean |          | Include variables in output |

</details>

**Examples:**

```bash
c8ctl get pi 123456                                         # Get process instance by key
c8ctl get pi 123456 --variables                             # Get process instance with variables
c8ctl get pd 123456                                         # Get process definition by key
c8ctl get pd 123456 --xml                                   # Get process definition XML
c8ctl get form 123456                                       # Get form (searches both user task and process definition)
c8ctl get form 123456 --ut                                  # Get form for user task only
c8ctl get form 123456 --pd                                  # Get start form for process definition only
c8ctl get user john                                         # Get user by username
```

---

### `create`

Create a resource (process instance, identity)

**Resources:** pi (process-instance), user, role, group, tenant, auth (authorization), mapping-rule

**Verb-level flags:**

| Flag                    | Type    | Required | Description                                             |
| ----------------------- | ------- | -------- | ------------------------------------------------------- |
| `--processDefinitionId` | string  |          | Process definition ID (BPMN process ID)                 |
| `--id`                  | string  |          | Process definition ID (alias for --processDefinitionId) |
| `--bpmnProcessId`       | string  |          | BPMN process ID (alias for --processDefinitionId)       |
| `--variables`           | string  |          | JSON variables                                          |
| `--awaitCompletion`     | boolean |          | Wait for process to complete                            |
| `--fetchVariables`      | boolean |          | Fetch result variables on completion                    |
| `--requestTimeout`      | string  |          | Await timeout in milliseconds                           |
| `--username`            | string  |          | Username                                                |
| `--name`                | string  |          | Display name                                            |
| `--email`               | string  |          | Email address                                           |
| `--password`            | string  |          | Password                                                |
| `--roleId`              | string  |          | Role ID                                                 |
| `--groupId`             | string  |          | Group ID                                                |
| `--tenantId`            | string  |          | Tenant ID                                               |
| `--mappingRuleId`       | string  |          | Mapping rule ID                                         |
| `--claimName`           | string  |          | Claim name                                              |
| `--claimValue`          | string  |          | Claim value                                             |

**Resource-specific flags:**

<details>
<summary><code>authorization</code></summary>

| Flag             | Type   | Required | Description                 |
| ---------------- | ------ | -------- | --------------------------- |
| `--ownerId`      | string | Yes      | Authorization owner ID      |
| `--ownerType`    | string | Yes      | Authorization owner type    |
| `--resourceType` | string | Yes      | Authorization resource type |
| `--resourceId`   | string | Yes      | Authorization resource ID   |
| `--permissions`  | string | Yes      | Comma-separated permissions |

</details>

**Examples:**

```bash
c8ctl create pi --id=myProcess                              # Create a process instance
c8ctl create pi --id=myProcess --awaitCompletion            # Create and await completion
c8ctl create user --username=john --name='John Doe' --email=john@example.com --password=secret  # Create a user
```

---

### `delete`

Delete a resource by key

**Usage:** `c8ctl delete <resource> <key>`

**Resources:** user, role, group, tenant, auth (authorization), mapping-rule

**Positional arguments:**

- **user:** `<username>` (required)
- **role:** `<roleId>` (required)
- **group:** `<groupId>` (required)
- **tenant:** `<tenantId>` (required)
- **authorization:** `<authorizationKey>` (required)
- **mapping-rule:** `<mappingRuleId>` (required)

**Examples:**

```bash
c8ctl delete user john                                      # Delete user
```

---

### `cancel`

Cancel a process instance

**Usage:** `c8ctl cancel <resource> <key>`

**Resources:** pi (process-instance)

**Positional arguments:**

- **process-instance:** `<key>` (required)

---

### `await`

Create and await process instance completion (server-side waiting)

**Usage:** `c8ctl await <resource>`

**Resources:** pi (process-instance)

**Flags:**

| Flag                    | Type    | Required | Description                                             |
| ----------------------- | ------- | -------- | ------------------------------------------------------- |
| `--processDefinitionId` | string  |          | Process definition ID (BPMN process ID)                 |
| `--id`                  | string  |          | Process definition ID (alias for --processDefinitionId) |
| `--bpmnProcessId`       | string  |          | BPMN process ID (alias for --processDefinitionId)       |
| `--variables`           | string  |          | JSON variables                                          |
| `--fetchVariables`      | boolean |          | Fetch result variables on completion                    |
| `--requestTimeout`      | string  |          | Await timeout in milliseconds                           |

**Examples:**

```bash
c8ctl await pi --id=myProcess                               # Create and wait for completion
```

---

### `complete`

Complete a user task or job

**Usage:** `c8ctl complete <resource> <key>`

**Resources:** ut (user-task), job

**Positional arguments:**

- **user-task:** `<key>` (required)
- **job:** `<key>` (required)

**Flags:**

| Flag          | Type   | Required | Description    |
| ------------- | ------ | -------- | -------------- |
| `--variables` | string |          | JSON variables |

---

### `fail`

Mark a job as failed with optional error message and retry count

**Resources:** job

**Positional arguments:**

- **job:** `<key>` (required)

**Flags:**

| Flag             | Type   | Required | Description       |
| ---------------- | ------ | -------- | ----------------- |
| `--retries`      | string |          | Remaining retries |
| `--errorMessage` | string |          | Error message     |

---

### `activate`

Activate jobs of a specific type for processing

**Resources:** jobs

**Positional arguments:**

- **jobs:** `<type>` (required)

**Flags:**

| Flag                  | Type   | Required | Description                        |
| --------------------- | ------ | -------- | ---------------------------------- |
| `--maxJobsToActivate` | string |          | Maximum number of jobs to activate |
| `--timeout`           | string |          | Job timeout in milliseconds        |
| `--worker`            | string |          | Worker name                        |

---

### `resolve`

Resolve an incident (marks resolved, allows process to continue)

**Resources:** inc (incident)

**Positional arguments:**

- **incident:** `<key>` (required)

---

### `publish`

Publish a message for message correlation

**Resources:** msg (message)

**Positional arguments:**

- **message:** `<name>` (required)

**Flags:**

| Flag               | Type   | Required | Description                  |
| ------------------ | ------ | -------- | ---------------------------- |
| `--correlationKey` | string |          | Correlation key              |
| `--variables`      | string |          | JSON variables               |
| `--timeToLive`     | string |          | Time to live in milliseconds |

---

### `correlate`

Correlate a message to a specific process instance

**Resources:** msg (message)

**Positional arguments:**

- **message:** `<name>` (required)

**Flags:**

| Flag               | Type   | Required | Description                  |
| ------------------ | ------ | -------- | ---------------------------- |
| `--correlationKey` | string | Yes      | Correlation key              |
| `--variables`      | string |          | JSON variables               |
| `--timeToLive`     | string |          | Time to live in milliseconds |

---

### `set`

Set variables on an element instance (process instance or flow element scope). Variables are propagated to the outermost scope by default; use --local to restrict to the specified scope.

**Usage:** `c8ctl set variable <key>`

**Resources:** variable

**Positional arguments:**

- **variable:** `<key>` (required)

**Flags:**

| Flag          | Type    | Required | Description                                                               |
| ------------- | ------- | -------- | ------------------------------------------------------------------------- |
| `--variables` | string  | Yes      | JSON object of variables to set (required)                                |
| `--local`     | boolean |          | Set variables in local scope only (default: propagate to outermost scope) |

**Examples:**

```bash
c8ctl set variable 2251799813685249 --variables='{"status":"approved"}'  # Set variables on a process instance
c8ctl set variable 2251799813685249 --variables='{"x":1}' --local  # Set variables in local scope only
```

---

### `deploy`

Deploy files to Camunda (auto-discovers deployable files in directories)

**Usage:** `c8ctl deploy [path...]`

**Flags:**

| Flag      | Type    | Required | Description                                                     |
| --------- | ------- | -------- | --------------------------------------------------------------- |
| `--force` | boolean |          | Deploy any file type, ignoring the default extension allow-list |

**Examples:**

```bash
c8ctl deploy ./my-process.bpmn                              # Deploy a BPMN file
```

---

### `run`

Deploy and start a process instance from a BPMN file

**Usage:** `c8ctl run <path>`

**Flags:**

| Flag          | Type    | Required | Description                                                     |
| ------------- | ------- | -------- | --------------------------------------------------------------- |
| `--variables` | string  |          | JSON variables                                                  |
| `--force`     | boolean |          | Deploy any file type, ignoring the default extension allow-list |

**Examples:**

```bash
c8ctl run ./my-process.bpmn                                 # Deploy and start process
```

---

### `assign`

Assign a resource to a target (--to-user, --to-group, etc.)

**Usage:** `c8ctl assign <resource> <id>`

**Resources:** role, user, group, mapping-rule

**Positional arguments:**

- **role:** `<roleId>` (required)
- **user:** `<username>` (required)
- **group:** `<groupId>` (required)
- **mapping-rule:** `<mappingRuleId>` (required)

**Flags:**

| Flag                | Type   | Required | Description            |
| ------------------- | ------ | -------- | ---------------------- |
| `--to-user`         | string |          | Target user ID         |
| `--to-group`        | string |          | Target group ID        |
| `--to-tenant`       | string |          | Target tenant ID       |
| `--to-mapping-rule` | string |          | Target mapping rule ID |

**Examples:**

```bash
c8ctl assign role admin --to-user=john                      # Assign role to user
```

---

### `unassign`

Unassign a resource from a target (--from-user, --from-group, etc.)

**Usage:** `c8ctl unassign <resource> <id>`

**Resources:** role, user, group, mapping-rule

**Positional arguments:**

- **role:** `<roleId>` (required)
- **user:** `<username>` (required)
- **group:** `<groupId>` (required)
- **mapping-rule:** `<mappingRuleId>` (required)

**Flags:**

| Flag                  | Type   | Required | Description            |
| --------------------- | ------ | -------- | ---------------------- |
| `--from-user`         | string |          | Source user ID         |
| `--from-group`        | string |          | Source group ID        |
| `--from-tenant`       | string |          | Source tenant ID       |
| `--from-mapping-rule` | string |          | Source mapping rule ID |

**Examples:**

```bash
c8ctl unassign role admin --from-user=john                  # Unassign role from user
```

---

### `watch`

Watch files for changes and auto-deploy

**Usage:** `c8ctl watch [path...]`

**Aliases:** `w`

**Flags:**

| Flag           | Type    | Required | Description                                                              |
| -------------- | ------- | -------- | ------------------------------------------------------------------------ |
| `--force`      | boolean |          | Continue watching after all deployment errors                            |
| `--extensions` | string  |          | Comma-separated list of file extensions to watch (e.g. .bpmn,.dmn,.form) |

**Examples:**

```bash
c8ctl watch ./src                                           # Watch directory for changes
```

---

### `open`

Open Camunda web app in browser

**Usage:** `c8ctl open <app>`

**Resources:** operate, tasklist, modeler, optimize

**Examples:**

```bash
c8ctl open operate                                          # Open Camunda Operate in browser
c8ctl open tasklist                                         # Open Camunda Tasklist in browser
c8ctl open operate --profile=prod                           # Open Operate using a specific profile
```

---

### `add`

Add a profile

**Resources:** profile

**Positional arguments:**

- **profile:** `<name>` (required)

**Flags:**

| Flag                | Type    | Required | Description                       |
| ------------------- | ------- | -------- | --------------------------------- |
| `--baseUrl`         | string  |          | Cluster base URL                  |
| `--clientId`        | string  |          | OAuth client ID                   |
| `--clientSecret`    | string  |          | OAuth client secret               |
| `--audience`        | string  |          | OAuth audience                    |
| `--oAuthUrl`        | string  |          | OAuth token URL                   |
| `--defaultTenantId` | string  |          | Default tenant ID                 |
| `--username`        | string  |          | Basic auth username               |
| `--password`        | string  |          | Basic auth password               |
| `--from-file`       | string  |          | Import from .env file             |
| `--from-env`        | boolean |          | Import from environment variables |

---

### `remove`

Remove a profile (alias: rm)

**Usage:** `c8ctl remove profile <name>`

**Aliases:** `rm`

**Resources:** profile, plugin

**Positional arguments:**

- **profile:** `<name>` (required)
- **plugin:** `<package>` (required)

**Flags:**

| Flag     | Type    | Required | Description          |
| -------- | ------- | -------- | -------------------- |
| `--none` | boolean |          | Clear active profile |

---

### `load`

Load a c8ctl plugin (npm registry or URL)

**Usage:** `c8ctl load plugin [name|--from url]`

**Resources:** plugin

**Positional arguments:**

- **plugin:** `<package>` (optional)

**Flags:**

| Flag     | Type   | Required | Description          |
| -------- | ------ | -------- | -------------------- |
| `--from` | string |          | Load plugin from URL |

**Examples:**

```bash
c8ctl load plugin my-plugin                                 # Load plugin from npm registry
c8ctl load plugin --from https://github.com/org/plugin      # Load plugin from URL
```

---

### `unload`

Unload a c8ctl plugin (npm uninstall wrapper)

**Usage:** `c8ctl unload plugin <name>`

**Aliases:** `rm`

**Resources:** plugin

**Positional arguments:**

- **plugin:** `<package>` (required)

**Flags:**

| Flag      | Type    | Required | Description                       |
| --------- | ------- | -------- | --------------------------------- |
| `--force` | boolean |          | Force unload without confirmation |

---

### `upgrade`

Upgrade a plugin (respects source type)

**Usage:** `c8ctl upgrade plugin <name> [version]`

**Resources:** plugin

**Positional arguments:**

- **plugin:** `<package>` (required), `<version>` (optional)

**Examples:**

```bash
c8ctl upgrade plugin my-plugin                              # Upgrade plugin to latest version
c8ctl upgrade plugin my-plugin 1.2.3                        # Upgrade plugin to a specific version (source-aware)
```

---

### `downgrade`

Downgrade a plugin to a specific version

**Usage:** `c8ctl downgrade plugin <name> <version>`

**Resources:** plugin

**Positional arguments:**

- **plugin:** `<package>` (required), `<version>` (required)

---

### `sync`

Synchronize plugins from registry (rebuild/reinstall)

**Resources:** plugin

**Examples:**

```bash
c8ctl sync plugin                                           # Synchronize plugins
```

---

### `init`

Create a new plugin from TypeScript template

**Resources:** plugin

**Positional arguments:**

- **plugin:** `<name>` (optional)

**Examples:**

```bash
c8ctl init plugin my-plugin                                 # Create new plugin from template (c8ctl-plugin-my-plugin)
```

---

### `use`

Set active profile or tenant

**Usage:** `c8ctl use profile|tenant`

**Resources:** profile, tenant

**Positional arguments:**

- **profile:** `<name>` (optional)
- **tenant:** `<tenantId>` (required)

**Flags:**

| Flag     | Type    | Required | Description                 |
| -------- | ------- | -------- | --------------------------- |
| `--none` | boolean |          | Clear active profile/tenant |

**Examples:**

```bash
c8ctl use profile prod                                      # Set active profile
```

---

### `output`

Show or set output format

**Usage:** `c8ctl output [json|text]`

**Resources:** json, text

**Examples:**

```bash
c8ctl output json                                           # Switch to JSON output
```

---

### `completion`

Generate shell completion script

**Usage:** `c8ctl completion bash|zsh|fish|install`

**Resources:** bash, zsh, fish, install

**Resource-specific flags:**

<details>
<summary><code>install</code></summary>

| Flag      | Type   | Required | Description                                        |
| --------- | ------ | -------- | -------------------------------------------------- |
| `--shell` | string |          | Shell to install completions for (bash, zsh, fish) |

</details>

**Examples:**

```bash
c8ctl completion bash                                       # Generate bash completion script
c8ctl completion install                                    # Auto-detect shell and install completions (auto-refreshes on upgrade)
c8ctl completion install --shell zsh                        # Install completions for a specific shell
```

---

### `mcp-proxy`

Start a STDIO MCP proxy (bridges local MCP clients to remote Camunda 8)

**Usage:** `c8ctl mcp-proxy [mcp-path]`

---

### `feedback`

Open the feedback page to report issues or request features

---

### `help`

Show help (run 'c8ctl help \<command>' for details)

**Usage:** `c8ctl help [command]`

**Aliases:** `menu`

---

### `which`

Show active profile

**Resources:** profile

**Examples:**

```bash
c8ctl which profile                                         # Show currently active profile
```
