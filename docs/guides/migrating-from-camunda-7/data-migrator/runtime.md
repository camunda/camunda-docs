---
id: runtime
title: Runtime
sidebar_label: Runtime
description: "Migrate running Camunda 7 process instances to Camunda 8 while preserving state."
---

Migrate currently running process instances. Running means that these process instances in Camunda 7 are not yet ended and currently wait in some [wait-state](https://docs.camunda.org/manual/latest/user-guide/process-engine/transactions-in-processes/#wait-states). This state is persisted in the database and a corresponding data entry needs to be created in Camunda 8, so that the process instance can continue from that state in the new solution.

:::info
Camunda is developing the Data Migrator with a first release of the runtime instance migration mode planned for **Camunda 8.8 (October 2025)**. You can already use existing alpha releases. Iterative improvements will follow. You can check the current state and track progress in the [GitHub repository](https://github.com/camunda/c7-data-migrator/).
:::

## Requirements and limitations

<!-- TODO this is an important deep link - we need to create a headline here -->

- The Runtime Data Migrator needs to access the Camunda 7 database.
- The Runtime Data Migrator needs to access Orchestration Cluster APIs (which means you can also use this tool when you run on SaaS).
- Make yourself familiar with [limitations](limitations.md) of the Data Migrator.

If you need to adjust your process models before migration, you can use [process version migration](https://docs.camunda.org/manual/7.22/user-guide/process-engine/process-instance-migration/) in the Camunda 7 environment to migrate process instances to versions that are migratable to Camunda 8. An interesting strategy can be to define dedicated migration states you want your process instances to pile up in. Another common strategy is to use [process instance modification](https://docs.camunda.org/manual/7.22/user-guide/process-engine/process-instance-modification/) in the Camunda 7 environment to move out of states that are not migratable (for example, process instances within a multiple instance task).

<!-- TODO pile up: mention the job pause feature in Camunda 7 -->

To use the Runtime Data Migrator, every Camunda 8 process model must have:

- A process-level **None Start Event**, and
- An execution listener on that **None Start Event** with the type `migrator` (or a validated job type, see below).

Example:

```xml
<bpmn:startEvent id="StartEvent_1">
  <bpmn:extensionElements>
    <zeebe:executionListeners>
      <zeebe:executionListener eventType="end" type="migrator" />
    </zeebe:executionListeners>
  </bpmn:extensionElements>
</bpmn:startEvent>
```

## Choreography

The runtime migration typically follows these phases:

### 1. Preparation phase

- Stop C7 process execution to avoid starting new instances during migration.
- Migrate BPMN models using the [Migration Analyzer & Diagram Converter](/guides/migrating-from-camunda-7/migration-tooling.md#migration-analyzer--diagram-converter).
- Add required `migrator` execution listeners to None Start Events in C8 models.
- Adjust C8 models to comply with migration limitations.
- Test migrated models in a C8 environment.
- Back up your C7 database before migration.

### 2. Migration phase

- Deploy C8 process models and resources to the target environment.
- Configure the migrator with proper database connections and settings.
- Start the migrator and monitor progress through logs.
- Verify results in Camunda 8 Operate.
- Handle skipped instances by reviewing and addressing validation failures.
- After successful migration, clean up models if needed:
  - Remove `migrator` execution listeners from C8 models.
  - Revert temporary model changes.
  - Migrate instances to the latest version of C8 models if appropriate.

### 3. Validation phase

- Check migrated instances in Camunda 8 Operate.
- Verify variable data and migrated state.
- Test process continuation by completing some migrated instances.
- Monitor system performance and resource usage.
- Validate business logic continues to work as expected.

## Validation and skip reasons

The migrator validates each process instance before migration and will skip instances that fail validation for the following reasons:

- Missing C8 Process Definition
  - If no corresponding C8 process definition is found for the C7 process ID
- Multi-Instance Activities
  - If the process instance has active multi-instance activities
- Missing Flow Node Elements
  - If a C7 process instance is currently at a flow node that doesn't exist in the deployed C8 model
- Missing None Start Event
  - If a C8 process definition does not have a process level None Start Event, the migrator will skip the instance.
- Missing `migrator` Execution Listener on None Start Event
  - If a C8 process definition does not have an execution listener of type `migrator` on the None Start Event, the migrator will skip the instance.
- Multi-tenancy
  - Runtime migration is currently not supported for tenant-associated instances.

When a process instance is skipped:

- The skipped process instance is logged
- The instance is marked as skipped in the migration database
- You can list skipped instances
- You can retry migration of skipped instances after fixing the underlying issues

### Common Resolution Steps

- Deploy the missing C8 process definition
- Wait for multi-instance activities to complete
- Ensure all active flow nodes in the C7 process have corresponding elements in the C8 process
- Modify process instance to a supported state

## Usage examples

```bash
# Run runtime migration
./start.sh --runtime

# List all skipped process instances
./start.sh --runtime --list-skipped

# Retry skipped process instances
./start.sh --runtime --retry-skipped
```

## Job Type Configuration

During migration, the Data Migrator starts new C8 process instances and sets a special `legacyId` variable to link them to their original C7 process instances. The migrator uses execution listeners on start events for its internal migration logic.

However, if users manually start new C8 process instances on models that still have these migration execution listeners, those instances won't have the `legacyId` variable. This creates a problem:

- The migrator would try to migrate process instances that don't need migration
- This could cause errors or unexpected behavior

The `validation-job-type` feature solves this by allowing you to use a FEEL expression creating different job types for externally started process instances versus process instances started by the migrator, ensuring only instances that truly need migration are processed by the migrator.

The migrator supports two job type configurations with fallback behavior:

1. **`job-type`**: Used for actual job activation
   - This is the primary job type used when activating jobs in Camunda 8.
   - It is required for the migrator to function correctly.
2. **`validation-job-type`**: Used for validation purposes (optional)
   - You can define a FEEL expression that provides different job types based on the process instance context.
   - The BPMN process will be validated to contain a start event execution listener with the respectively defined FEEL expression.

**Default Behavior:**
When `validation-job-type` is not defined, `job-type` is used for both validation and activation.

**Basic Configuration:**

```yaml
camunda.migrator:
  job-type: migrator # Used for both validation and activation
```

**Separate Validation and Activation:**

```yaml
camunda.migrator:
  job-type: migrator # Used for activation
  validation-job-type: '=if legacyId != null then "migrator" else "noop"' # Used for validation with FEEL expression
```

**Important Notes:**

- When `validation-job-type` is not defined, `job-type` is used for both purposes
- The `job-type` is always used for job activation
- The `validation-job-type` can be a FEEL expression (starts with `=`)
- Set `validation-job-type` to `DISABLED` to disable job type validation entirely
- Use FEEL expressions only for validation, not for job activation since on job activation, the FEEL expression is already evaluated to a static value
- You can use variables like the special variable `legacyId` in FEEL expression

**FEEL Expression Requirements:**
When using FEEL expressions in the `validation-job-type` property, you must also specify the same expression in the execution listener of your BPMN process start events. The migrator configuration alone is not sufficient.

Example BPMN configuration for FEEL expression validation:

```xml
<bpmn:startEvent id="StartEvent_1">
  <bpmn:extensionElements>
    <zeebe:executionListeners>
      <zeebe:executionListener eventType="end" type="=if legacyId != null then &quot;migrator&quot; else &quot;noop&quot;" />
    </zeebe:executionListeners>
  </bpmn:extensionElements>
</bpmn:startEvent>
```

### Externally Started Process Instances

Migrator jobs for externally started process instances (process instances not started by the Data Migrator) are activated but not further processed by the Data Migrator since these process instances do not contain the `legacyId` variable that the migrator uses to identify instances that need migration. After the default lock timeout the jobs will be available again for activation.

When using FEEL expressions like `=if legacyId != null then "migrator" else "noop"` in the execution listener, externally started process instances will generate jobs with the type `noop` instead of `migrator`. To handle these jobs properly, you need to implement a **noop job worker** that simply activates and completes these jobs without performing any migration logic.

Example noop job worker implementation:

```java
@JobWorker(type = "noop")
public void handleNoopJobs(ActivatedJob job) {
    // Simply complete the job without any processing
    // This allows externally started process instances to continue normally
}
```

This approach ensures that:

- Process instances started by the Data Migrator are handled by the `migrator` job worker
- Externally started process instances continue their normal execution flow through the `noop` job worker
- Both types of instances can coexist in the same Camunda 8 environment
