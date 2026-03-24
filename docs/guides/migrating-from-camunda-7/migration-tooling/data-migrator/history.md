---
id: history
title: History
sidebar_label: History
description: "Copy audit trail (history) data from Camunda 7 to Camunda 8."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Use the History Data Migrator to copy process instance audit data to Camunda 8.

## About history migration

Process instances leave traces, referred to as [history in Camunda 7](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/). These are audit logs of when a process instance was started, what path it took, and so on.

It is important to note that audit data can exist for ended processes from the past, but is also available for currently still running process instances, as those process instances also left traces up to the current wait state.

The History Data Migrator can copy this audit data to Camunda 8. For process instances that were still active or suspended in Camunda 7, the migrated history data will be marked as canceled in Camunda 8. This ensures a clear audit trail while preventing confusion with actively running instances in Camunda 8.

Audit data migration might need to look at a huge amount of data, which can take time to migrate.
You can run audit data migration alongside normal operations (for example, after the successful big bang migration of runtime process instances) so that it doesn't require downtime and as such, the performance might not be as critical as for runtime instance migration.

During migration, the History Data Migrator sets a `legacyId` variable in the process instances to link them to their original Camunda 7 process instances.

## Requirements and limitations

The following requirements and limitations apply:

- Camunda 7 must be stopped, and the Camunda 8 database must be reachable. Zeebe can be stopped during history migration.
- The History Data Migrator must be able to access the Camunda 7 database.
- The History Data Migrator can migrate data to Camunda 8 only when a relational database (RDBMS) is used.
- The History Data Migrator must be able to access the Camunda 8 database. As a result, you can run this tool only in a self-managed environment.
- If you manipulate Camunda 7 data between History Data Migrator runs, data consistency might be affected. See [auto-cancellation of active instances](#auto-cancellation-of-active-instances) for details.
- **History cleanup during migration**: If you keep Camunda 8 running and history cleanup is enabled during history migration, and cleanup dates are due (for example, past removal times from Camunda 7 or negative auto-cancel TTL values), Camunda 8 history cleanup will run concurrently with migration. This may result in parent entities being cleaned up before their children are migrated, causing child entities to be skipped. See [history cleanup](#history-cleanup) for mitigation strategies.
- If you migrate runtime and history data for an active Camunda 7 process instance, two separate records will appear in Operate:
  1. **Fresh runtime instance**: The migrated active process instance running on Zeebe. This instance continues execution from the last wait state before migration and produces new history going forward. It does not include historical data from before the migration.
  2. **Auditable instance**: A canceled historic process instance that preserves the audit trail (history data) up to the last wait state pre-migration. This instance appears as canceled and serves only as an audit record of what happened in Camunda 7.

  These two instances are separate entities and are not automatically linked in the UI, although they share the same process variables from the migration point.

## Usage examples

<Tabs groupId="os" defaultValue="maclinux" values={[
{ label: 'Mac OS + Linux', value: 'maclinux' },
{ label: 'Windows', value: 'windows' }
]}>

<TabItem value="maclinux">

```bash
# Run history migration
./start.sh --history

# List all skipped history entities
./start.sh --history --list-skipped

# List skipped entities for specific types
./start.sh --history --list-skipped HISTORY_PROCESS_INSTANCE HISTORY_USER_TASK

# Retry skipped history entities
./start.sh --history --retry-skipped
```

</TabItem>

<TabItem value="windows">

```bash
# Run history migration
start.bat --history

# List all skipped history entities
start.bat --history --list-skipped

# List skipped entities for specific types
start.bat --history --list-skipped HISTORY_PROCESS_INSTANCE HISTORY_USER_TASK

# Retry skipped history entities
start.bat --history --retry-skipped
```

</TabItem>

</Tabs>

## Entity types

| Entity type                   | Description          |
| :---------------------------- | :------------------- |
| `HISTORY_FORM_DEFINITION`     | Form definitions     |
| `HISTORY_PROCESS_DEFINITION`  | Process definitions  |
| `HISTORY_PROCESS_INSTANCE`    | Process instances    |
| `HISTORY_JOB`                 | Jobs                 |
| `HISTORY_INCIDENT`            | Process incidents    |
| `HISTORY_VARIABLE`            | Process variables    |
| `HISTORY_USER_TASK`           | User tasks           |
| `HISTORY_FLOW_NODE`           | Flow node instances  |
| `HISTORY_DECISION_INSTANCE`   | Decision instances   |
| `HISTORY_DECISION_DEFINITION` | Decision definitions |

## Tenants

- Camunda 7's `null` tenant is migrated to Camunda 8's `<default>` tenant.
- All other `tenantId`s will be migrated as-is.
- For details, see [multi-tenancy](/components/concepts/multi-tenancy.md#tenant-identifier) in Camunda 8.

## Auto-cancellation of active instances

When migrating history data, the Data Migrator automatically handles **active or suspended** process instances from Camunda 7 by marking them as **canceled** in Camunda 8. This applies to:

- Process instances
- Flow nodes
- User tasks
- Incidents

Auto-canceled entities are assigned the migration timestamp as their end date.

By default, auto-canceled instances receive a cleanup date calculated as:

```text
cleanup_date = end_date + 6 months
```

This keeps auto-canceled instances eligible for history cleanup after six months and helps prevent unbounded history growth.

See [configuration for history auto-cancellation](../data-migrator/config-properties.md#camundamigratorhistoryauto-cancelcleanup) for more details.

:::warning Negative TTL values
If you configure a negative auto-cancel TTL value, calculated cleanup dates are in the past. If Camunda 8 is running during migration, history cleanup can immediately clean up these entities, potentially before their child entities are migrated. See [history cleanup](#history-cleanup) for mitigation strategies.
:::

## History Cleanup

Instances that were already completed in Camunda 7 retain their original cleanup dates:

- If a `removalTime` exists in Camunda 7, it is migrated as-is. Child entities (user tasks, variables, flow nodes) inherit the root instance's cleanup date.
- If no `removalTime` exists, no cleanup date is set.
- Auto-cancel cleanup configuration **only applies to instances that were active or suspended** in Camunda 7.

If Camunda 8 is running during migration with cleanup dates in the past, history cleanup may delete parent entities before their children are migrated, causing children to be skipped.

**Common scenarios:**

- Past `removalTime` values from Camunda 7
- Negative auto-cancel TTL (for example, `P-1D`)
- Long migrations where dates become due during execution

As a result, you will see skipped child entities with messages referencing the deleted parent. These cannot be recovered unless the parent is re-migrated.

Choose one approach to prevent cleanup interference:

<Tabs groupId="cleanup-mitigation" defaultValue="shutdown" values={[
{ label: 'Shut down Camunda 8', value: 'shutdown' },
{ label: 'Configure future dates', value: 'future-dates' },
{ label: 'Accept partial cleanup', value: 'accept' }
]}>

<TabItem value="shutdown">

**Stop Camunda 8 during migration**

- Stop Camunda 8 cluster before migration
- Run migration while offline
- Start Camunda 8 when complete

✅ Guarantees no cleanup interference

</TabItem>

<TabItem value="future-dates">

**Set cleanup dates in the future**

- Update Camunda 7 removal times before migration (if feasible)
- Configure positive TTL for auto-canceled instances (for example, `P6M`, `P1Y`)

✅ Prevents immediate cleanup

</TabItem>

<TabItem value="accept">

**Allow concurrent cleanup**

- Run Camunda 8 during migration
- Accept some entities may be cleaned up immediately
- Accept child entity skips

⚠️ Suitable only when historical data loss is acceptable

</TabItem>

</Tabs>

## Partition distribution

The History Data Migrator assigns migrated history data to Zeebe partitions. **Partition assignment is critical for history cleanup to work correctly.**

### How partitions are assigned

- **Root process instances** or **standalone decisions**: Randomly assigned to available partitions
- **Child entities** (sub-processes, call activities, flow nodes, variables, user tasks, incidents, decision instances, etc.): Inherit partition from root process instance
- **Audit logs**: Inherit the root process instance partition, or are randomly assigned when not related to a process instance

This ensures all entities in a process hierarchy share the same partition, enabling the RDBMS exporter on that partition to perform cleanup.

:::warning Partition configuration must match Zeebe topology
Camunda 7 migrated history data can **only be deleted via history cleanup**, which requires:

- The partition ID exists in your Camunda 8 Zeebe cluster
- That partition has an RDBMS exporter configured

If partition IDs assigned during migration don't exist or lack RDBMS exporters, **that data cannot be cleaned up** and will persist indefinitely.
:::

### Partition discovery

By default, the migrator queries Zeebe topology through the Camunda REST API at migration start to discover available partitions.

### Offline mode

To migrate without Camunda 8 REST API connectivity (no topology query), configure the partition count manually:

```yaml
camunda.migrator:
  history:
    partition-count: 3 # Must match your Camunda 8 cluster
```

When configured:

- Topology is not queried from REST API
- Partition IDs generated as sequence: 1, 2, 3, ...
- No Camunda 8 REST API connectivity is required at migration start (database connectivity is still required)

The configured value must exactly match your Camunda 8 Zeebe cluster's partition count.

If the configured value does not match the cluster, then:

- Data assigned to non-existent partitions cannot be cleaned up
- Data may persist indefinitely with no automatic cleanup path

Always verify cluster partition configuration before migration.

:::caution Don't change partitions after migration
Changing cluster partition count after migration can leave data on removed partitions that cannot be cleaned up. Complete history migration before scaling partitions.
:::

## Forms

The History Data Migrator automatically migrates [Camunda Forms](https://docs.camunda.org/manual/latest/user-guide/task-forms/#camunda-forms) from Camunda 7 to Camunda 8. This includes forms linked to process definitions (start forms) and user tasks.

The form schema (JSON definition) is extracted from the Camunda 7 deployment resources and migrated to Camunda 8. The form structure, fields, and validation rules are preserved during migration.

User tasks that reference non-existent forms will be migrated as well.

### Form linking

The migrator automatically detects and links forms configured using `camunda:formRef` with a `camunda:formKey`. This applies to both start events and user tasks.

For each form reference, the migrator:

1. Resolves the form definition based on the form key and binding (deployment, latest, or version).
2. Links the element (process definition or user task) to the migrated form in Camunda 8.

Example BPMN configurations that will be migrated:

```xml
<!-- Start form -->
<bpmn:startEvent id="StartEvent_1">
  <bpmn:extensionElements>
    <camunda:formData>
      <camunda:formRef formKey="myStartForm" binding="deployment" />
    </camunda:formData>
  </bpmn:extensionElements>
</bpmn:startEvent>

<!-- User task form -->
<bpmn:userTask id="UserTask_1" name="Review Document">
  <bpmn:extensionElements>
    <camunda:formData>
      <camunda:formRef formKey="reviewForm" binding="deployment" />
    </camunda:formData>
  </bpmn:extensionElements>
</bpmn:userTask>
```

## Atomicity

The History Data Migrator uses the configured Camunda 8 datasource for both the migration mapping schema and the migrated data. This ensures single-transaction atomicity for each entity migration.

### What is migrated atomically

Each entity migration writes multiple rows in a single transaction:

- Camunda 8 data: The migrated entity (for example, a user task, process instance, or variable)
- Child entities, when applicable (for example, decision instances and their related decisions, inputs, and outputs)
- Tracking information: A mapping from the Camunda 7 ID to the Camunda 8 key, used for resuming migrations and preventing duplicates

If an error occurs, the transaction is rolled back and no partial data is persisted. This prevents inconsistent states such as Camunda 8 data without tracking information (which can cause duplicates on retry) or orphaned child entities.

## Entity transformation

Entity transformations are handled by built-in interceptors that transform Camunda 7 historic entities
into Camunda 8 database models during migration. The History Data Migrator uses the
`EntityInterceptor` interface to allow customization of this conversion process.

### Built-in interceptors

The following built-in transformers convert Camunda 7 historic entities:

| Interceptor                                 | Camunda 7 entity type                    | Camunda 8 Model               |
| ------------------------------------------- | ---------------------------------------- | ----------------------------- |
| `AuditLogTransformer`                       | `UserOperationLogEntry`                  | `AuditLogDbModel`             |
| `FormTransformer`                           | `CamundaFormDefinitionEntity`            | `FormDbModel`                 |
| `ProcessInstanceTransformer`                | `HistoricProcessInstance`                | `ProcessInstanceDbModel`      |
| `ProcessDefinitionTransformer`              | `ProcessDefinition`                      | `ProcessDefinitionDbModel`    |
| `FlowNodeTransformer`                       | `HistoricActivityInstance`               | `FlowNodeInstanceDbModel`     |
| `UserTaskTransformer`                       | `HistoricTaskInstance`                   | `UserTaskDbModel`             |
| `JobTransformer`                            | `HistoricJobLog`                         | `JobDbModel`                  |
| `IncidentTransformer`                       | `HistoricIncident`                       | `IncidentDbModel`             |
| `VariableTransformer`                       | `HistoricVariableInstance`               | `VariableDbModel`             |
| `DecisionInstanceTransformer`               | `HistoricDecisionInstance`               | `DecisionInstanceDbModel`     |
| `DecisionDefinitionTransformer`             | `HistoricDecisionDefinition`             | `DecisionDefinitionDbModel`   |
| `DecisionRequirementsDefinitionTransformer` | `HistoricDecisionRequirementsDefinition` | `DecisionRequirementsDbModel` |

## Custom transformation

The `EntityInterceptor` interface allows you to define custom logic that executes when a Camunda 7 historic entity is being converted to a Camunda 8 database model during migration. This is useful for enriching, auditing, or customizing entity conversion.

Custom interceptors are enabled by default and can be restricted to specific entity types.

### Type-safe API

The `EntityInterceptor` interface uses Java generics to provide compile-time type safety:

```java
public interface EntityInterceptor<C7, C8> {
    void execute(C7 entity, C8 builder);
    // ...
}
```

### How to implement an `EntityInterceptor`

1. Create a new Maven project with the provided `pom.xml` structure
2. Add a dependency on `camunda-7-to-8-data-migrator-core` (scope: `provided`)
3. Implement the `EntityInterceptor` interface
4. Add setter methods for any configurable properties
5. Package as JAR and deploy to the `configuration/userlib` folder
6. Configure in `configuration/application.yml`

### Create a custom entity interceptor

Here's an example of a custom entity interceptor which is only called for process instances:

```java
public class ProcessInstanceEnricher
    implements EntityInterceptor<HistoricProcessInstance, ProcessInstanceDbModel.ProcessInstanceDbModelBuilder> {

    /**
     * Restrict this interceptor to only handle process instances.
     */
    @Override
    public Set<Class<?>> getTypes() {
        return Set.of(HistoricProcessInstance.class);
    }

    @Override
    public void execute(HistoricProcessInstance entity,
                        ProcessInstanceDbModel.ProcessInstanceDbModelBuilder builder) {
        // Custom conversion logic
        // For example, add custom metadata or modify the conversion
      builder.processDefinitionId(entity.getProcessDefinitionKey());
    }
}
```

#### Access Camunda 7 process engine

To retrieve information from Camunda 7 entities, use the `EntityConversionContext` parameter which provides access to the `processEngine`.

Use it to access services such as `RepositoryService` and `RuntimeService`. Fetch additional data as needed from other Camunda 7 entities.

```java
public class ProcessInstanceEnricher
    implements EntityInterceptor<HistoricProcessInstance, ProcessInstanceDbModel.ProcessInstanceDbModelBuilder> {

    @Override
    public Set<Class<?>> getTypes() {
        return Set.of(HistoricProcessInstance.class);
    }

    /**
     * Alternative execute signature with EntityConversionContext access.
     * This signature gives you access to the process engine and other context.
     */
    @Override
    public void execute(EntityConversionContext<HistoricProcessInstance,
                                                ProcessInstanceDbModel.ProcessInstanceDbModelBuilder> context) {
        // Access the entity and builder from context
        HistoricProcessInstance entity = context.getC7Entity();
        ProcessInstanceDbModel.ProcessInstanceDbModelBuilder builder = context.getC8DbModelBuilder();

        // Use ProcessEngine to retrieve deployment information from Camunda 7 process engine
        ProcessEngine processEngine = context.getProcessEngine();

        // Example: Retrieve the deployment ID from the process definition
        String deploymentId = processEngine.getRepositoryService()
            .createProcessDefinitionQuery()
            .processDefinitionKey(entity.getProcessDefinitionKey())
            .singleResult()
            .getDeploymentId();

        // Custom conversion logic using the retrieved data
        // ...
    }
}
```

**Note:** The `EntityInterceptor` interface provides two `execute` method signatures:

- `execute(C7 entity, C8 builder)` - Simple type-safe signature for basic transformations
- `execute(EntityConversionContext<C7, C8> context)` - Full signature with access to process engine and other context

### Limit interceptors by entity type

Entity interceptors can be restricted to specific entity types using the `getTypes()` method. Use Camunda 7 historic entity classes:

```java
// Example 1: Handle multiple specific types
public class MultiEntityInterceptor
    implements EntityInterceptor<Object, Object> {

    @Override
    public Set<Class<?>> getTypes() {
        // Handle only specific types
        return Set.of(
            ProcessDefinition.class,            // Process definitions
            HistoricProcessInstance.class,      // Process instances
            HistoricActivityInstance.class,     // Flow nodes/activities
            HistoricTaskInstance.class,         // User tasks
            HistoricVariableInstance.class,     // Variables
            HistoricIncident.class,             // Incidents
            HistoricDecisionInstance.class      // Decision instances
        );
    }

    @Override
    public void execute(Object entity, Object builder) {
        // Handle different entity types
        if (entity instanceof HistoricProcessInstance) {
            // Process instance logic
        } else if (entity instanceof HistoricActivityInstance) {
            // Flow node logic
        }
        // etc.
    }
}

// Example 2: Universal interceptor (handles all entity types)
public class EntityLogger
    implements EntityInterceptor<Object, Object> {

    @Override
    public Set<Class<?>> getTypes() {
        return Set.of(); // Empty set = handle all types
    }

    @Override
    public void execute(Object entity, Object builder) {
        // This will be called for all entity types
        System.out.println("Converting entity: " + entity.getClass().getSimpleName());
    }
}
```

### Configure custom interceptors

Configure your custom interceptors in `application.yml`:

```yaml
# Entity interceptor plugins configuration
# These plugins can be packaged in JARs and dropped in the userlib folder
camunda:
  migrator:
    interceptors:
      - class-name: com.example.migrator.ProcessInstanceEnricher
        enabled: true
        properties:
          customProperty: "value"
          enableAudit: true
```

### Deployment

1. Package your custom interceptor as a JAR file
2. Place the JAR in the `configuration/userlib/` folder
3. Configure the interceptor in `configuration/application.yml`
4. Restart the Data Migrator

The `enabled` property is supported for all interceptors (both built-in and custom) and defaults to `true`.

See [example interceptor](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/data-migrator/examples/entity-interceptor).

### Execution order

- Custom interceptors configured in the `application.yml` are executed in their order of appearance from top to bottom
- Built-in transformers run first, followed by custom interceptors

### Error handling

When an entity transformation fails:

1. The entity is marked as _skipped_ in the migration database.
2. After the initial migration completes, the migrator automatically retries all skipped entities.
3. Retries run in multiple passes until no further progress can be made (that is, no additional entities are successfully migrated).
4. Any entities that remain skipped after all automatic retries are logged as warnings, along with their skip reasons.
5. Use `--history --list-skipped` to view entities that remain skipped after automatic retries.
6. After resolving the underlying issue (for example, unsupported variable types), use `--history --retry-skipped` to manually retry the migration.

This automatic retry mechanism is particularly useful for resolving cross-entity dependencies, such as:

- Flow node instances that depend on their parent flow node (scope)
- Child process instances that depend on parent call activities
- Variables or user tasks that depend on their parent process instance
