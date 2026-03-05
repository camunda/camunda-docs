---
id: cluster-inspection
title: "Cluster inspection and process management"
sidebar_label: "Cluster inspection"
description: "Use c8ctl to list, search, and manage process instances, user tasks, incidents, jobs, messages, and forms in a Camunda 8 cluster."
---

# Cluster inspection and process management

`c8ctl` follows a `<verb> <resource>` command structure. Most resources have short aliases to reduce typing:

| Resource                | Alias |
| :---------------------- | :---- |
| `process-instance(s)`   | `pi`  |
| `process-definition(s)` | `pd`  |
| `user-task(s)`          | `ut`  |
| `incident(s)`           | `inc` |
| `message`               | `msg` |

Available verbs: `list`, `search`, `get`, `create`, `cancel`, `complete`, `fail`, `activate`, `resolve`, `publish`, `correlate`.

:::tip
All commands respect the active profile and tenant. Pass `--profile` to override the profile for a single command:

```bash
c8 list pi --profile=prod
c8 search ut --assignee=jane --profile=staging
```

:::

## Topology

Retrieve cluster topology information:

```bash
c8 get topology
```

## Process instances

### List process instances

```bash
c8 list pi
c8 list process-instances

# Filter by BPMN process ID
c8 list pi --id=order-process

# Filter by state
c8 list pi --state=ACTIVE
```

### Get a process instance

```bash
c8 get pi 2251799813685249

# Include variables in the output
c8 get pi 2251799813685249 --variables
```

### Create a process instance

```bash
c8 create pi --id=order-process

# With a specific version
c8 create pi --id=order-process --version=2

# With variables
c8 create pi --id=order-process --variables='{"orderId":"12345","amount":100}'

# Create and wait for completion
c8 create pi --id=order-process --awaitCompletion

# With a custom timeout (30 seconds)
c8 create pi --id=order-process --awaitCompletion --requestTimeout=30000
```

### Await process instance completion

The `await` command is a shorthand for `create` with `--awaitCompletion`. It uses the Orchestration Cluster API's built-in server-side waiting:

```bash
c8 await pi --id=order-process
c8 await pi --id=order-process --variables='{"orderId":"12345"}'
c8 await pi --id=order-process --requestTimeout=60000
```

The `--requestTimeout` option sets the maximum wait time in milliseconds. When omitted or set to `0`, the cluster's default request timeout applies.

### Cancel a process instance

```bash
c8 cancel pi 2251799813685249
```

## User tasks

### List user tasks

```bash
c8 list ut
c8 list user-tasks

# Filter by state
c8 list ut --state=CREATED

# Filter by assignee
c8 list ut --assignee=john.doe
```

### Complete a user task

```bash
c8 complete ut 2251799813685250

# With variables
c8 complete ut 2251799813685250 --variables='{"approved":true,"notes":"Looks good"}'
```

## Incidents

### List incidents

```bash
c8 list inc
c8 list incidents

# Filter by state
c8 list inc --state=ACTIVE

# Filter by process instance
c8 list inc --processInstanceKey=2251799813685249
```

### Get an incident

```bash
c8 get inc 2251799813685251
```

### Resolve an incident

```bash
c8 resolve inc 2251799813685251
```

## Jobs

### List jobs

```bash
c8 list jobs

# Filter by type
c8 list jobs --type=email-service

# Filter by state
c8 list jobs --state=ACTIVATABLE
```

### Activate jobs

```bash
c8 activate jobs email-service

# With options
c8 activate jobs email-service --maxJobsToActivate=20 --timeout=120000 --worker=my-worker
```

### Complete a job

```bash
c8 complete job 2251799813685252

# With variables
c8 complete job 2251799813685252 --variables='{"emailSent":true}'
```

### Fail a job

```bash
c8 fail job 2251799813685252

# With retries and error message
c8 fail job 2251799813685252 --retries=3 --errorMessage="Email service unavailable"
```

## Search

The `search` command provides powerful filtering across all major resource types. Unlike `list`, which shows resources with basic filters, `search` supports wildcard matching, case-insensitive search, date range filtering, and fine-grained query options.

### Date range filtering

Use `--between` to filter results by a date range. Dates can be short (`YYYY-MM-DD`) or full ISO 8601 datetimes. Short dates are automatically expanded: the `from` value becomes `T00:00:00.000Z` and the `to` value becomes `T23:59:59.999Z`.

```bash
# Process instances started today
c8 search pi --between=2025-03-05..2025-03-05

# Process instances within a date range
c8 search pi --between=2025-01-01..2025-03-31

# With full ISO 8601 datetimes
c8 search pi --between=2025-01-01T00:00:00Z..2025-06-30T23:59:59Z
```

You can also use open-ended ranges by omitting one side of the `..` separator:

```bash
# Everything up to (and including) a date
c8 search pi --between=..2025-03-05

# Everything from a date onwards
c8 search pi --between=2025-01-01..

# Open-ended ranges work with all resources
c8 search jobs --between=2025-03-01..
c8 search inc --between=..2025-02-28
```

`--between` is supported on process instances, user tasks, incidents, and jobs. Use `--dateField` to specify which date field to filter on. Each resource has a different default:

| Resource          | Default `dateField` | Available date fields                                       |
| :---------------- | :------------------ | :---------------------------------------------------------- |
| Process instances | `startDate`         | `startDate`, `endDate`                                      |
| User tasks        | `creationDate`      | `creationDate`, `completionDate`, `followUpDate`, `dueDate` |
| Incidents         | `creationTime`      | `creationTime`                                              |
| Jobs              | `creationTime`      | `creationTime`, `lastUpdateTime`                            |

```bash
# Process instances that ended in January
c8 search pi --between=2025-01-01..2025-01-31 --dateField=endDate

# User tasks due this week
c8 search ut --between=2025-03-03..2025-03-07 --dateField=dueDate

# Incidents created today
c8 search inc --between=2025-03-05..2025-03-05

# Jobs created in a date range
c8 search jobs --between=2025-01-01..2025-12-31
```

`--between` also works with the `list` command:

```bash
c8 list pi --between=2025-01-01..2025-03-31
c8 list ut --between=2025-03-01..2025-03-31
c8 list inc --between=2025-03-05..2025-03-05
c8 list jobs --between=2025-01-01..2025-12-31
```

### Wildcard search

String filters support wildcard matching:

- `*` — matches zero or more characters.
- `?` — matches exactly one character.

```bash
c8 search pd --name='*order*'
c8 search pd --id='process-v?'
c8 search jobs --type='*-service'
c8 search variables --name='order*'
```

Wildcard-capable fields per resource:

| Resource            | Fields                   |
| :------------------ | :----------------------- |
| Process definitions | `--name`, `--id`         |
| Process instances   | `--id`                   |
| User tasks          | `--assignee`             |
| Incidents           | `--errorMessage`, `--id` |
| Jobs                | `--type`                 |
| Variables           | `--name`, `--value`      |

### Case-insensitive search

Prefix a flag name with `i` to make the filter case-insensitive. Case-insensitive filtering is performed client-side after fetching results.

```bash
c8 search pd --iname='*ORDER*'
c8 search ut --iassignee=John
c8 search jobs --itype='*Service*'
c8 search inc --ierrorMessage='*timeout*'
c8 search variables --iname='OrderId'
```

Case-insensitive flags per resource:

| Resource            | Flags                      |
| :------------------ | :------------------------- |
| Process definitions | `--iname`, `--iid`         |
| Process instances   | `--iid`                    |
| User tasks          | `--iassignee`              |
| Incidents           | `--ierrorMessage`, `--iid` |
| Jobs                | `--itype`                  |
| Variables           | `--iname`, `--ivalue`      |

:::note
Case-insensitive filtering fetches up to 1000 results from the server and filters client-side. For large result sets, combine with case-sensitive filters to narrow results first.
:::

### Search process definitions

```bash
c8 search pd --id=order-process
c8 search pd --name=Order
c8 search pd --key=2251799813685249
c8 search pd --id=order-process --name=Order

# Using a specific profile for this search
c8 search pd --id=order-process --profile=prod
```

### Search process instances

```bash
c8 search pi --state=ACTIVE
c8 search pi --id=order-process
c8 search pi --processDefinitionKey=2251799813685249
c8 search pi --parentProcessInstanceKey=2251799813685250
c8 search pi --id=order-process --state=ACTIVE

# Filter by date range
c8 search pi --between=2025-01-01..2025-03-31
c8 search pi --between=2025-01-01..2025-06-30 --dateField=endDate
```

### Search user tasks

```bash
c8 search ut --state=CREATED
c8 search ut --assignee=john.doe
c8 search ut --processInstanceKey=2251799813685249
c8 search ut --elementId=UserTask_Approve
c8 search ut --state=CREATED --assignee=john.doe

# Filter by date range
c8 search ut --between=2025-03-01..2025-03-31
c8 search ut --between=2025-03-01..2025-03-31 --dateField=dueDate
```

### Search incidents

```bash
c8 search inc --state=ACTIVE
c8 search inc --processInstanceKey=2251799813685249
c8 search inc --errorType=JOB_NO_RETRIES
c8 search inc --errorMessage='*timeout*'
c8 search inc --state=ACTIVE --errorType=JOB_NO_RETRIES

# Filter by creation time
c8 search inc --between=2025-03-01..2025-03-05
```

### Search jobs

```bash
c8 search jobs --type=email-service
c8 search jobs --state=CREATED
c8 search jobs --processInstanceKey=2251799813685249
c8 search jobs --type=email-service --state=CREATED

# Filter by date range
c8 search jobs --between=2025-01-01..2025-12-31
c8 search jobs --between=2025-01-01..2025-12-31 --dateField=lastUpdateTime
```

### Search variables

```bash
c8 search variables --name=orderId
c8 search variables --value=12345
c8 search variables --processInstanceKey=2251799813685249
c8 search variables --scopeKey=2251799813685260

# Show full (non-truncated) variable values
c8 search variables --name=orderPayload --fullValue
```

By default, long variable values are truncated. Truncated values show a `✓` in the "Truncated" column. Use `--fullValue` to see complete values.

## Messages

### Publish a message

```bash
c8 publish msg order-placed
c8 publish msg order-placed --correlationKey=order-12345
c8 publish msg order-placed --correlationKey=order-12345 --variables='{"orderId":"12345","total":250.00}'
c8 publish msg order-placed --correlationKey=order-12345 --timeToLive=3600000
```

### Correlate a message

`correlate` is an alias for `publish`:

```bash
c8 correlate msg payment-received --correlationKey=order-12345 --variables='{"amount":250.00}'
```

## Forms

Retrieve the form linked to a user task or process definition:

```bash
# Search both user tasks and process definitions
c8 get form 2251799813685251

# User task form only
c8 get form 2251799813685251 --ut

# Start form for a process definition only
c8 get form 2251799813685252 --pd

# Using a specific profile
c8 get form 2251799813685251 --profile=prod
```

When no flag is specified, `c8ctl` searches both types and reports where the form was found.

## Sorting and limiting results

Use `--sortBy`, `--asc`, and `--desc` to control result ordering, and `--limit` to cap the number of results:

```bash
# Sort process instances ascending by key
c8 list pi --sortBy=key --asc

# Sort user tasks descending by creation time
c8 search ut --state=CREATED --sortBy=creationDate --desc

# Limit results
c8 list pi --limit=10
```

## Output

Search and list results display as tables in text mode:

```text
Key              | Process ID     | State  | Version | Tenant ID
2251799813685260 | order-process  | ACTIVE | 3       | <default>
2251799813685270 | order-process  | ACTIVE | 3       | <default>
Found 2 process instance(s)
```

Switch to JSON for scripting and automation:

```bash
c8 output json
c8 search pi --state=ACTIVE
# [{"processInstanceKey":"2251799813685260",...}, ...]
```
