---
id: runtime
title: Runtime
sidebar_label: Runtime
description: "Migrate running Camunda 7 process instances to Camunda 8 while preserving state."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Migrate currently running process instances.

## About runtime migration

Running refers to process instances in Camunda 7 that are not yet ended and are currently waiting in a [wait-state](https://docs.camunda.org/manual/latest/user-guide/process-engine/transactions-in-processes/#wait-states). This state is persisted in the database, and a corresponding data entry must be created in Camunda 8 so the process instance can continue from that state in the new solution.

## Requirements and limitations

The following requirements and limitations apply:

<!-- TODO this is an important deep link - we need to create a headline here -->

- The Runtime Data Migrator needs to access the Camunda 7 database.
- The Runtime Data Migrator needs to access Orchestration Cluster APIs (which means you can also use it when running SaaS).
- You must be familiar with the Data Migrator [limitations](limitations.md).

If you need to adjust your process models before migration, you can use [process version migration](https://docs.camunda.org/manual/latest/user-guide/process-engine/process-instance-migration/) in the Camunda 7 environment to migrate process instances to versions that are migratable to Camunda 8. One useful strategy is to define dedicated migration states where your process instances can accumulate. Another common strategy is to use [process instance modification](https://docs.camunda.org/manual/latest/user-guide/process-engine/process-instance-modification/) in the Camunda 7 environment to move out of states that are not migratable (for example, process instances within a multiple instance task).

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

### 1. Preparation

- Stop Camunda 7 process execution to avoid starting new instances during migration.
- Migrate BPMN models using the [Diagram Converter](/guides/migrating-from-camunda-7/migration-tooling/diagram-converter.md). The Diagram Converter automatically adds the required `migrator` execution listener to None Start Events when the **Add Data Migration Execution Listener** option is enabled.
- Adjust Camunda 8 models to comply with migration limitations.
- Test migrated models in a Camunda 8 environment.
- Back up your Camunda 7 database before migration.

### 2. Migration

- Deploy Camunda 8 process models and resources to the target environment.
- **Do not start new Camunda 8 process instances** on models that still have the `migrator` execution listener. See [Externally Started Process Instances](#externally-started-process-instances) for details.
- Configure the migrator with proper database connections and settings.
- Start the migrator and monitor progress through logs.
- Verify results in Camunda 8 Operate.
- Handle skipped instances by reviewing and addressing validation failures.
- After successful migration, clean up models:
  - Remove `migrator` execution listeners from Camunda 8 models.
  - Revert temporary model changes.
  - Redeploy the updated models.
  - Migrate instances to the latest version of Camunda 8 models if appropriate.

### 3. Validation

- Check migrated instances in Camunda 8 Operate.
- Verify variable data and migrated state.
- Test process continuation by completing some migrated instances.
- Monitor system performance and resource usage.
- Validate business logic continues to work as expected.

## Validation and skip reasons

The migrator validates each process instance before migration and will skip instances that fail validation for the following reasons:

| Skip reason                           | Condition (why it is skipped)                                                                                    |
| :------------------------------------ | :--------------------------------------------------------------------------------------------------------------- |
| Missing Camunda 8 process definition  | No corresponding Camunda 8 process definition is found for the Camunda 7 process ID.                             |
| Multi-instance activities             | The process instance has active multi-instance activities.                                                       |
| Missing flow node elements            | The Camunda 7 instance is at a flow node that does not exist in the deployed Camunda 8 model.                    |
| Missing None Start Event              | The Camunda 8 process definition does not have a process-level None Start Event.                                 |
| Missing `migrator` execution listener | The Camunda 8 process definition does not have an execution listener of type `migrator` on the None Start Event. |
| Multi-tenancy                         | The tenant ids are not configured in the Data Migrator.                                                          |

When a process instance is skipped:

- The skipped process instance is logged.
- The instance is marked as skipped in the migration database.
- You can list skipped instances.
- You can retry migration of skipped instances after fixing the underlying issues.

### Common resolution steps

1. Deploy the missing Camunda 8 process definition
1. Wait for multi-instance activities to complete
1. Ensure all active flow nodes in the Camunda 7 process have corresponding elements in the Camunda 8 process
1. Modify process instance to a supported state

## Usage examples

<Tabs groupId="os" defaultValue="maclinux" values={[
{ label: 'Mac OS + Linux', value: 'maclinux' },
{ label: 'Windows', value: 'windows' }
]}>

<TabItem value="maclinux">

```bash
# Run runtime migration
./start.sh --runtime

# List all skipped process instances
./start.sh --runtime --list-skipped

# List the Camunda 7 ID and Camunda 8 key for each migrated entity
./start.sh --runtime --list-migrated

# Retry skipped process instances
./start.sh --runtime --retry-skipped
```

</TabItem>

<TabItem value="windows">

```bash
# Run runtime migration
start.bat --runtime

# List all skipped process instances
start.bat --runtime --list-skipped

# List the Camunda 7 ID and Camunda 8 key for each migrated entity
start.bat --runtime --list-migrated

# Retry skipped process instances
start.bat --runtime --retry-skipped
```

</TabItem>

</Tabs>

## Job type configuration

By default, the job type is configured as `migrator`. The Diagram Converter adds an execution listener with this type to None Start Events, and the Data Migrator activates jobs matching this type. This works out of the box, and no additional configuration is needed.

The job type is relevant because during migration, the Data Migrator creates new Camunda 8 process instances with a `legacyId` variable linking them to their original Camunda 7 instances. It then activates all jobs with the execution listener type `migrator`. These jobs are only processed if `legacyId` is present. Process instances started directly on Camunda 8 are skipped. See [Externally Started Process Instances](#externally-started-process-instances) for details.

The migrator supports two job type configurations with fallback behavior:

- **`job-type`**: Used for actual job activation (default: `migrator`).
  - It is used for activating jobs in Camunda 8 and is required for the migrator to function correctly.
  - It must match the execution listener type defined on the start event in the BPMN model. If the BPMN execution listener is an expression that resolves to a type, then `validation-job-type` needs to be configured as well.

- **`validation-job-type`**: Used for validation purposes (optional).
  - Before starting a process instance in Camunda 8, the Data Migrator verifies that the job type is present in the BPMN. This ensures the process instance execution waits for the Data Migrator at the start event.
  - When `validation-job-type` is not defined, `job-type` is used for both validation and activation.
  - You can define a FEEL expression that provides different job types based on the process instance context.
  - It must match the execution listener type defined on the start event in the BPMN model.
  - Set to `DISABLED` to disable job type validation entirely. This is not recommended.

**Basic Configuration (default):**

```yaml
camunda.migrator:
  job-type: migrator # Used for both validation and activation
```

**Advanced: Separate Validation and Activation:**

If you need to use a FEEL expression for the execution listener type (for example, to differentiate between migrated and externally started instances), you can configure `validation-job-type` separately:

```yaml
camunda.migrator:
  job-type: migrator # Used for activation
  validation-job-type: '=if legacyId != null then "migrator" else "noop"' # Used for validation with FEEL expression
```

When using a FEEL expression in `validation-job-type`, you must also specify the same expression in the execution listener of your BPMN process start events:

```xml
<bpmn:startEvent id="StartEvent_1">
  <bpmn:extensionElements>
    <zeebe:executionListeners>
      <zeebe:executionListener eventType="end" type="=if legacyId != null then &quot;migrator&quot; else &quot;noop&quot;" />
    </zeebe:executionListeners>
  </bpmn:extensionElements>
</bpmn:startEvent>
```

:::note
Use FEEL expressions only for validation, not for job activation, since during job activation, the FEEL expression is already evaluated to a static value.
:::

### Externally Started Process Instances

New Camunda 8 process instances should not be started on models that still have the `migrator` execution listener. Follow the recommended [choreography](#choreography): complete the migration first, then remove the execution listener and redeploy before starting new process instances.

If a process instance is started externally (not by the Data Migrator) on a model with the `migrator` execution listener, the Data Migrator will activate the job but skip it because the `legacyId` variable is not present. The process instance will remain at the start event. After the job lock times out, the job becomes available for activation again. This does not cause errors or data corruption, but an externally started process instance will not progress until the execution listener is removed and the model is redeployed.

When using the advanced FEEL expression configuration `=if legacyId != null then "migrator" else "noop"`, externally started process instances will generate jobs with the type `noop` instead of `migrator`, so the Data Migrator will not activate them at all. However, to allow these process instances to proceed past the start event, you must implement a **noop job worker** that completes these jobs:

```java
@JobWorker(type = "noop")
public void handleNoopJobs(ActivatedJob job) {
    // Simply complete the job without any processing
    // This allows externally started process instances to continue normally
}
```

This approach ensures that:

- Process instances started by the Data Migrator are handled by the `migrator` job worker.
- Externally started process instances continue their normal execution flow through the `noop` job worker.
- Both types of instances can coexist in the same Camunda 8 environment.

## Tenants

- Camunda 7 process instances assigned to no tenant (`tenantId=null`) are migrated to Camunda 8 with `<default>` tenant.
- The default behavior is to migrate only process instances without assigned tenant.
- When migrating process instances, the migrator can be configured to handle specific tenants
  throughout the migration process. Defining tenant IDs ensures that only process instances
  associated with those tenants are migrated.
  - Make sure to create the tenants in Camunda 8 before starting the migration.
  - Add `Authentication configuration for the client` and assign the user to the all of the tenants

### How Multi-Tenancy Works

1. **Validation**: Pre-migration validation ensures target tenant deployments exist in Camunda 8
2. **Tenant Preservation**: Process instances maintain their original tenant association during
   migration
3. **Job Activation**: The migrator fetches jobs only for the configured tenants and the default
   tenant when activating jobs

### Example

Use the `camunda.migrator.tenant-ids` [property](/guides/migrating-from-camunda-7/migration-tooling/data-migrator/config-properties.md#camundamigrator) to specify which tenants should be included in the migration process. This property accepts a comma-separated list of tenant identifiers.

```yaml
camunda:
  migrator:
    tenant-ids: tenant-1, tenant-2, tenant-3
```

With this configuration, only process instances associated with `tenant-1`, `tenant-2`, `tenant-3`,
and the default tenant will be created and migrated. Instances associated with other tenants will be skipped.
