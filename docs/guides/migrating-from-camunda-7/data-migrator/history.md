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

- The History Data Migrator needs to access the Camunda 7 database.
- The History Data Migrator can only migrate to Camunda 8 **if a relational database (RDBMS) is used**, a feature planned for **Camunda 8.9**.
- The History Data Migrator needs to access the Camunda 8 database (which means you can only run this tool in a **self-managed environment**).
- If runtime and history data are migrated at the same time, you will end up with two instances in Camunda 8: a canceled historic process instance and an active new one in the runtime. They are linked by process variables.

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

## Entity Transformation

Entity transformations are handled by built-in converters that transform Camunda 7 historic entities
into Camunda 8 database models during migration. The History Data Migrator uses the
`EntityInterceptor` interface to allow customization of this conversion process.

## Custom Transformation

The `EntityInterceptor` interface allows you to define custom logic that executes when a Camunda 7 historic entity is being converted to a Camunda 8 database model during migration. This is useful for enriching, auditing, or customizing entity conversion.

Custom interceptors are enabled by default and can be restricted to specific entity types.

### How to Implement an `EntityInterceptor`

1. Create a new Maven project with the provided `pom.xml` structure
2. Add a dependency on `camunda-7-to-8-data-migrator-core` (scope: `provided`)
3. Implement the `EntityInterceptor` interface
4. Add setter methods for any configurable properties
5. Package as JAR and deploy to the `configuration/userlib` folder
6. Configure in `configuration/application.yml`

### Creating a Custom Entity Interceptor

Here's an example of a custom entity interceptor which is only called for process instances:

```java
public class ProcessInstanceEnricher implements EntityInterceptor {

    /**
     * Restrict this interceptor to only handle process instances.
     */
    @Override
    public Set<Class<?>> getTypes() {
        return Set.of(HistoricProcessInstance.class);
    }

    @Override
    public void execute(EntityConversionContext<?, ?> context) {
        HistoricProcessInstance c7Instance =
            (HistoricProcessInstance) context.getC7Entity();
        ProcessInstanceDbModel.Builder c8Builder =
            (ProcessInstanceDbModel.Builder) context.getC8DbModelBuilder();

        // Custom conversion logic
        // For example, add custom metadata or modify the conversion
    }
}
```

### Type Restrictions

Entity interceptors can be restricted to specific entity types using the `getTypes()` method. Use Camunda 7 historic entity classes:

```java
@Override
public Set<Class<?>> getTypes() {
    // Handle only specific types
    return Set.of(
        HistoricProcessInstance.class,      // Process instances
        HistoricActivityInstance.class,     // Flow nodes/activities
        HistoricTaskInstance.class,         // User tasks
        HistoricVariableInstance.class,     // Variables
        HistoricIncident.class              // Incidents
    );
}
```

```java
// Or handle all entity types (default behavior)
@Override
public Set<Class<?>> getTypes() {
    return Set.of(); // Empty set = handle all types
}
```

### Execution Order

- Custom interceptors configured in the `application.yml` are executed in their order of appearance from top to bottom
  - Built-in converters run first, followed by custom interceptors
- In a Spring Boot environment, you can register interceptors as beans and change their execution order with the `@Order` annotation (lower values run first)

### Error Handling

When entity transformation fails:

- The entire entity is skipped
- Detailed error messages are logged with the specific entity type and error cause
- The entity is marked for potential retry after fixing the underlying issue
- You can use `--history --list-skipped` and `--history --retry-skipped` commands to manage failed migrations

### Configuring Custom Interceptors

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

## History cleanup

The history cleanup date is migrated if the Camunda 7 instance has a removal time.

## Tenants

- Camunda 7's `null` tenant is migrated to Camunda 8's `<default>` tenant.
- All other `tenantId`s will be migrated as-is.
- For details, see [multi-tenancy](/components/concepts/multi-tenancy.md#tenant-identifier) in Camunda 8.
