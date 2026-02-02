---
id: history
title: History migration (experimental)
sidebar_label: History migration
description: "Copy audit trail (history) data from Camunda 7 to Camunda 8. Experimental and not for production."
---

Use the History Data Migrator to copy process instance audit data to Camunda 8.

:::info
The history migration mode of the Data Migrator will **not be released before Camunda 8.9 (April 2026)**. You can check the current state and track progress in the [GitHub repository](https://github.com/camunda/camunda-7-to-8-migration-tooling/).
:::

## About history migration

Process instances leave traces, referred to as [History in Camunda 7](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/). These are audit logs of when a process instance was started, what path it took, and so on.

It is important to note that audit data can exist for ended processes from the past, but is also available for currently still running process instances, as those process instances also left traces up to the current wait state.

The History Data Migrator can copy this audit data to Camunda 8.

Audit data migration might need to look at a huge amount of data, which can take time to migrate. In early measurements, migrating 10,000 process instances took around 10 minutes, but the number varies greatly based on the amount of data attached to a process instance (for example, user task instances, variable instances, and so on).

You can run audit data migration alongside normal operations (for example, after the successful big bang migration of runtime process instances) so that it doesn't require downtime and as such, the performance might not be as critical as for runtime instance migration.

## Requirements and limitations

The following requirements and limitations apply:

- Camunda 8 is up and running and Camunda 7 has been stopped.
- The History Data Migrator must be able to access the Camunda 7 database.
- The History Data Migrator can migrate data to Camunda 8 only when a relational database (RDBMS) is used. This capability is planned for Camunda 8.9.
- The History Data Migrator must be able to access the Camunda 8 database. As a result, you can run this tool only in a self-managed environment.
- If you manipulate Camunda 7 data between History Data Migrator runs, data consistency might be affected. See [Auto-cancellation of active instances](#auto-cancellation-of-active-instances) for details.
- If you migrate runtime and history data for an active C7 process instance, two separate records will appear in Operate:
  1. **Fresh runtime instance**: The migrated active process instance running on Zeebe. This instance continues execution from the last wait state before migration and produces new history going forward. It does not include historical data from before the migration.
  2. **Auditable instance**: A canceled historic process instance that preserves the audit trail (history data) up to the last wait state pre-migration. This instance appears as canceled and serves only as an audit record of what happened in Camunda 7.

  These two instances are separate entities and are not automatically linked in the UI, although they share the same process variables from the migration point.

## Usage examples

```bash
# Run history migration (experimental)
./start.sh --history

# List all skipped history entities
./start.sh --history --list-skipped

# List skipped entities for specific types
./start.sh --history --list-skipped HISTORY_PROCESS_INSTANCE HISTORY_USER_TASK

# Retry skipped history entities
./start.sh --history --retry-skipped
```

## Entity types

| Entity type                   | Description          |
| :---------------------------- | :------------------- |
| `HISTORY_PROCESS_DEFINITION`  | Process definitions  |
| `HISTORY_PROCESS_INSTANCE`    | Process instances    |
| `HISTORY_INCIDENT`            | Process incidents    |
| `HISTORY_VARIABLE`            | Process variables    |
| `HISTORY_USER_TASK`           | User tasks           |
| `HISTORY_FLOW_NODE`           | Flow node instances  |
| `HISTORY_DECISION_INSTANCE`   | Decision instances   |
| `HISTORY_DECISION_DEFINITION` | Decision definitions |

## Cleanup behavior for completed instances

Instances that were already completed in Camunda 7 retain their original cleanup dates:

- If a `removalTime` exists in Camunda 7, it is migrated as-is.
- If no `removalTime` exists and the instance is completed, no cleanup date is set.
- Auto-cancel cleanup configuration **only applies to instances that were active or suspended** in Camunda 7.

## Auto-cancellation of active instances

When migrating history data, the Data Migrator automatically handles **active or suspended** process instances from Camunda 7 by marking them as **canceled** in Camunda 8. This applies to:

- Process instances.
- Flow nodes.
- User tasks.
- Incidents.

Auto-canceled entities are assigned the migration timestamp as their end date.

By default, auto-canceled entities receive a cleanup date calculated as:

```
cleanup_date = end_date + 6 months
```

This ensures auto-canceled instances are eligible for history cleanup after six months, preventing unbounded growth of history data.

See [configuration for history auto-cancellation](../data-migrator/config-properties.md#camundamigratorhistoryauto-cancelcleanup) for more details.

Please note that if any Camunda 7 process instances progress in their state in between multiple runs of the History Data Migrator, data consistency might be affected: for example, if a process instance is completed in Camunda 7 after the first run but before the second run, the History Data Migrator would migrate it as canceled in the first and as completed in the second run. As a result, in Operate you may see that a process instance was canceled in a Flow Node that chronologically precedes the end event in your model, where the instance will be marked as completed. To avoid such situations, ensure that Camunda 7 data remains unchanged between History Data Migrator runs.

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
| `ProcessInstanceTransformer`                | `HistoricProcessInstance`                | `ProcessInstanceDbModel`      |
| `ProcessDefinitionTransformer`              | `ProcessDefinition`                      | `ProcessDefinitionDbModel`    |
| `FlowNodeTransformer`                       | `HistoricActivityInstance`               | `FlowNodeInstanceDbModel`     |
| `UserTaskTransformer`                       | `HistoricTaskInstance`                   | `UserTaskDbModel`             |
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
  - Built-in transformers run first (Order: 1-15), followed by custom interceptors
- In a Spring Boot environment, you can register interceptors as beans and change their execution order with the `@Order` annotation (lower values run first)

### Error handling

When entity transformation fails:

1. The migrator skips the entity.
2. It logs a detailed error message with the entity type and error cause.
3. It marks the entity as skipped.
4. Use `--history --list-skipped` to view skipped entities.
5. After you fix the underlying issue, use `--history --retry-skipped` to retry the migration.

## Tenants

- Camunda 7's `null` tenant is migrated to Camunda 8's `<default>` tenant.
- All other `tenantId`s will be migrated as-is.
- For details, see [multi-tenancy](/components/concepts/multi-tenancy.md#tenant-identifier) in Camunda 8.
