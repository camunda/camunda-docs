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
- Unsupported Camunda 8 entities and properties
  - Sequence Flow - in Operate Sequence Flow can’t be highlighted
  - User Task migration - information not available in C7
  - Message subscription and correlated message subscription - information not available in Camunda 7
  - Batch operation entity and item - Camunda 7 doesn’t keep much evidence for processed instances
  - User metrics
  - Exporter position - doesn’t exist in Camunda 7
  - Process instance/Task tag - doesn’t exist in Camunda 7
  - Audit log - [ticket](https://github.com/camunda/camunda-7-to-8-migration-tooling/issues/517)

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

## Entity transformation

Entity transformations are handled by built-in converters that transform Camunda 7 historic entities
into Camunda 8 database models during migration. The History Data Migrator uses the
`EntityInterceptor` interface to allow customization of this conversion process.

### Built-in converters

The following built-in transformers convert Camunda 7 historic entities:

| Converter                                   | Camunda 7 entity type                    | Camunda 8 Model               |
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

### Disable built-in transformers

You can disable any built-in transformer using the `enabled` configuration property.

This is useful when your migration use case is more complex and does not work out of the box. In this case, you can migrate entities entirely through custom interceptors:

```yaml
camunda:
  migrator:
    # Entity interceptor configuration
    interceptors:
      - class-name: io.camunda.migration.data.impl.interceptor.history.entity.ProcessInstanceTransformer
        enabled: false
```

## Custom transformation

The `EntityInterceptor` interface allows you to define custom logic that executes when a Camunda 7 historic entity is being converted to a Camunda 8 database model during migration. This is useful for enriching, auditing, or customizing entity conversion.

Custom interceptors are enabled by default and can be restricted to specific entity types.

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

#### Access Camunda 7 process engine

To retrieve information from Camunda 7 entities, use the `processEngine` available in the `EntityConversionContext`.

Use it to access services such as `RepositoryService` and `RuntimeService`. Fetch additional data as needed from other Camunda 7 entities.

```java
@Override
public void execute(EntityConversionContext<?, ?> context) {
  // Use ProcessEngine to retrieve deployment information from Camunda 7 process engine
  ProcessEngine processEngine = context.getProcessEngine();

// Example: Retrieve the deployment ID from the process definition
  String deploymentId = processEngine.getRepositoryService()
      .createProcessDefinitionQuery()
      .processDefinitionKey(processInstance.getProcessDefinitionKey())
      .singleResult()
      .getDeploymentId();
  // Custom conversion logic
  // ...
}
```

### Limit interceptors by entity type

Entity interceptors can be restricted to specific entity types using the `getTypes()` method. Use Camunda 7 historic entity classes:

```java
@Override
public Set<Class<?>> getTypes() {
    // Handle only specific types
    return Set.of(
        ProcessDefinition.class,            // Process definitions
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

## History cleanup

The history cleanup date is migrated if the Camunda 7 instance has a removal time.

## Tenants

- Camunda 7's `null` tenant is migrated to Camunda 8's `<default>` tenant.
- All other `tenantId`s will be migrated as-is.
- For details, see [multi-tenancy](/components/concepts/multi-tenancy.md#tenant-identifier) in Camunda 8.

## Camunda 8 history migration coverage table

The following table shows which Camunda 8 entities and properties are covered by the History Data Migrator.

| Camunda 8 Entity                    | Property                    | Migrated with History migrator |
| ----------------------------------- | --------------------------- | ------------------------------ |
| **Audit log**                       |                             |                                |
|                                     | auditLogKey                 |                                |
|                                     | entityKey                   |                                |
|                                     | entityType                  |                                |
|                                     | operationType               |                                |
|                                     | entityVersion               |                                |
|                                     | entityValueType             |                                |
|                                     | entityOperationIntent       |                                |
|                                     | batchOperationKey           |                                |
|                                     | batchOperationType          |                                |
|                                     | timestamp                   |                                |
|                                     | actorType                   |                                |
|                                     | actorId                     |                                |
|                                     | tenantId                    |                                |
|                                     | tenantScope                 |                                |
|                                     | result                      |                                |
|                                     | annotation                  |                                |
|                                     | category                    |                                |
|                                     | processDefinitionId         |                                |
|                                     | decisionRequirementsId      |                                |
|                                     | decisionDefinitionId        |                                |
|                                     | processDefinitionKey        |                                |
|                                     | processInstanceKey          |                                |
|                                     | elementInstanceKey          |                                |
|                                     | jobKey                      |                                |
|                                     | userTaskKey                 |                                |
|                                     | decisionRequirementsKey     |                                |
|                                     | decisionDefinitionKey       |                                |
|                                     | decisionEvaluationKey       |                                |
|                                     | deploymentKey               |                                |
|                                     | formKey                     |                                |
|                                     | resourceKey                 |                                |
| **Authorization**                   |                             |                                |
|                                     | authorizationKey            |                                |
|                                     | ownerId                     |                                |
|                                     | ownerType                   |                                |
|                                     | resourceType                |                                |
|                                     | resourceMatcher             |                                |
|                                     | resourceId                  |                                |
|                                     | resourcePropertyName        |                                |
|                                     | permissionTypes             |                                |
| **Batch operation**                 |                             |                                |
|                                     | batchOperationKey           |                                |
|                                     | state                       |                                |
|                                     | operationType               |                                |
|                                     | startDate                   |                                |
|                                     | endDate                     |                                |
|                                     | actorType                   |                                |
|                                     | actorId                     |                                |
|                                     | operationsTotalCount        |                                |
|                                     | operationsFailedCount       |                                |
|                                     | operationsCompletedCount    |                                |
|                                     | errors                      |                                |
| **Batch operation item**            |                             |                                |
|                                     | batchOperationKey           |                                |
|                                     | itemKey                     |                                |
|                                     | processInstanceKey          |                                |
|                                     | state                       |                                |
|                                     | processedDate               |                                |
|                                     | errorMessage                |                                |
| **Cluster variable**                |                             |                                |
|                                     | id                          |                                |
|                                     | name                        |                                |
|                                     | type                        |                                |
|                                     | doubleValue                 |                                |
|                                     | longValue                   |                                |
|                                     | value                       |                                |
|                                     | fullValue                   |                                |
|                                     | isPreview                   |                                |
|                                     | tenantId                    |                                |
|                                     | scope                       |                                |
| **Correlated message subscription** |                             |                                |
|                                     | correlationKey              |                                |
|                                     | correlationTime             |                                |
|                                     | flowNodeId                  |                                |
|                                     | flowNodeInstanceKey         |                                |
|                                     | historyCleanupDate          |                                |
|                                     | messageKey                  |                                |
|                                     | messageName                 |                                |
|                                     | partitionId                 |                                |
|                                     | processDefinitionId         |                                |
|                                     | processDefinitionKey        |                                |
|                                     | processInstanceKey          |                                |
|                                     | rootProcessInstanceKey      |                                |
|                                     | subscriptionKey             |                                |
|                                     | subscriptionType            |                                |
|                                     | tenantId                    |                                |
| **Decision definition**             |                             |                                |
|                                     | decisionDefinitionKey       | Yes                            |
|                                     | name                        | Yes                            |
|                                     | decisionDefinitionId        | Yes                            |
|                                     | tenantId                    | Yes                            |
|                                     | version                     | Yes                            |
|                                     | decisionRequirementsId      | Yes                            |
|                                     | decisionRequirementsKey     |                                |
|                                     | decisionRequirementsName    |                                |
|                                     | decisionRequirementsVersion |                                |
| **Decision instance**               |                             |                                |
|                                     | decisionInstanceId          |                                |
|                                     | decisionInstanceKey         |                                |
|                                     | state                       | Yes                            |
|                                     | evaluationDate              | Yes                            |
|                                     | evaluationFailure           |                                |
|                                     | evaluationFailureMessage    |                                |
|                                     | result                      | Yes                            |
|                                     | flowNodeInstanceKey         | Yes                            |
|                                     | flowNodeId                  | Yes                            |
|                                     | processInstanceKey          | Yes                            |
|                                     | processDefinitionKey        | Yes                            |
|                                     | processDefinitionId         | Yes                            |
|                                     | decisionDefinitionKey       | Yes                            |
|                                     | decisionDefinitionId        | Yes                            |
|                                     | decisionRequirementsKey     | Yes                            |
|                                     | decisionRequirementsId      | Yes                            |
|                                     | rootDecisionDefinitionKey   | Yes                            |
|                                     | decisionType                | Yes                            |
|                                     | tenantId                    | Yes                            |
|                                     | partitionId                 | Yes                            |
|                                     | evaluatedInputs             | Yes                            |
|                                     | evaluatedOutputs            | Yes                            |
|                                     | historyCleanupDate          | Yes                            |
| **Decision requirements**           |                             |                                |
|                                     | decisionRequirementsKey     | Yes                            |
|                                     | decisionRequirementsId      | Yes                            |
|                                     | name                        | Yes                            |
|                                     | resourceName                | Yes                            |
|                                     | version                     | Yes                            |
|                                     | xml                         | Yes                            |
|                                     | tenantId                    | Yes                            |
| **Exporter position**               |                             |                                |
|                                     | partitionId                 |                                |
|                                     | exporter                    |                                |
|                                     | lastExportedPosition        |                                |
|                                     | created                     |                                |
|                                     | lastUpdated                 |                                |
| **Flow node instance**              |                             |                                |
|                                     | flowNodeInstanceKey         |                                |
|                                     | processInstanceKey          | Yes                            |
|                                     | processDefinitionKey        | Yes                            |
|                                     | processDefinitionId         | Yes                            |
|                                     | flowNodeScopeKey            |                                |
|                                     | startDate                   | Yes                            |
|                                     | endDate                     | Yes                            |
|                                     | flowNodeId                  | Yes                            |
|                                     | flowNodeName                |                                |
|                                     | treePath                    | Yes                            |
|                                     | type                        | Yes                            |
|                                     | state                       |                                |
|                                     | incidentKey                 |                                |
|                                     | numSubprocessIncidents      |                                |
|                                     | hasIncident                 |                                |
|                                     | tenantId                    | Yes                            |
|                                     | partitionId                 |                                |
|                                     | rootProcessInstanceKey      |                                |
|                                     | historyCleanupDate          |                                |
| **Form**                            |                             |                                |
|                                     | formKey                     |                                |
|                                     | tenantId                    |                                |
|                                     | formId                      |                                |
|                                     | schema                      |                                |
|                                     | version                     |                                |
|                                     | isDeleted                   |                                |
| **Group**                           |                             |                                |
|                                     | groupKey                    |                                |
|                                     | groupId                     |                                |
|                                     | name                        |                                |
|                                     | description                 |                                |
|                                     | members                     |                                |
| **History deletion**                |                             |                                |
|                                     | resourceKey                 |                                |
|                                     | resourceType                |                                |
|                                     | batchOperationKey           |                                |
|                                     | partitionId                 |                                |
| **Incident**                        |                             |                                |
|                                     | incidentKey                 | Yes                            |
|                                     | processDefinitionKey        | Yes                            |
|                                     | processDefinitionId         | Yes                            |
|                                     | processInstanceKey          | Yes                            |
|                                     | rootProcessInstanceKey      |                                |
|                                     | flowNodeInstanceKey         | Yes                            |
|                                     | flowNodeId                  | Yes                            |
|                                     | jobKey                      | Yes                            |
|                                     | errorType                   |                                |
|                                     | errorMessage                | Yes                            |
|                                     | errorMessageHash            |                                |
|                                     | creationDate                | Yes                            |
|                                     | state                       | Yes                            |
|                                     | treePath                    |                                |
|                                     | tenantId                    | Yes                            |
|                                     | partitionId                 |                                |
|                                     | historyCleanupDate          |                                |
| **Job**                             |                             |                                |
|                                     | jobKey                      |                                |
|                                     | type                        |                                |
|                                     | worker                      |                                |
|                                     | state                       |                                |
|                                     | kind                        |                                |
|                                     | listenerEventType           |                                |
|                                     | retries                     |                                |
|                                     | isDenied                    |                                |
|                                     | deniedReason                |                                |
|                                     | hasFailedWithRetriesLeft    |                                |
|                                     | errorCode                   |                                |
|                                     | errorMessage                |                                |
|                                     | serializedCustomHeaders     |                                |
|                                     | customHeaders               |                                |
|                                     | deadline                    |                                |
|                                     | endTime                     |                                |
|                                     | processDefinitionId         |                                |
|                                     | processDefinitionKey        |                                |
|                                     | processInstanceKey          |                                |
|                                     | rootProcessInstanceKey      |                                |
|                                     | elementId                   |                                |
|                                     | elementInstanceKey          |                                |
|                                     | tenantId                    |                                |
|                                     | partitionId                 |                                |
|                                     | historyCleanupDate          |                                |
|                                     | creationTime                |                                |
|                                     | lastUpdateTime              |                                |
| **Mapping rule**                    |                             |                                |
|                                     | mappingRuleId               |                                |
|                                     | mappingRuleKey              |                                |
|                                     | claimName                   |                                |
|                                     | claimValue                  |                                |
|                                     | name                        |                                |
| **Message subscription**            |                             |                                |
|                                     | messageSubscriptionKey      |                                |
|                                     | processDefinitionId         |                                |
|                                     | processDefinitionKey        |                                |
|                                     | processInstanceKey          |                                |
|                                     | rootProcessInstanceKey      |                                |
|                                     | flowNodeId                  |                                |
|                                     | flowNodeInstanceKey         |                                |
|                                     | messageSubscriptionState    |                                |
|                                     | dateTime                    |                                |
|                                     | messageName                 |                                |
|                                     | correlationKey              |                                |
|                                     | tenantId                    |                                |
|                                     | partitionId                 |                                |
|                                     | historyCleanupDate          |                                |
| **Process definition**              |                             |                                |
|                                     | processDefinitionKey        | Yes                            |
|                                     | processDefinitionId         | Yes                            |
|                                     | resourceName                | Yes                            |
|                                     | name                        | Yes                            |
|                                     | tenantId                    | Yes                            |
|                                     | versionTag                  | Yes                            |
|                                     | version                     | Yes                            |
|                                     | bpmnXml                     | Yes                            |
|                                     | formId                      |                                |
| **Process instance**                |                             |                                |
|                                     | processInstanceKey          | Yes                            |
|                                     | rootProcessInstanceKey      |                                |
|                                     | processDefinitionId         | Yes                            |
|                                     | processDefinitionKey        |                                |
|                                     | state                       | Yes                            |
|                                     | startDate                   | Yes                            |
|                                     | endDate                     | Yes                            |
|                                     | tenantId                    | Yes                            |
|                                     | parentProcessInstanceKey    | Yes                            |
|                                     | parentElementInstanceKey    |                                |
|                                     | numIncidents                |                                |
|                                     | version                     | Yes                            |
|                                     | partitionId                 | Yes                            |
|                                     | treePath                    |                                |
|                                     | historyCleanupDate          | Yes                            |
|                                     | tags                        |                                |
| **Role**                            |                             |                                |
|                                     | roleKey                     |                                |
|                                     | roleId                      |                                |
|                                     | name                        |                                |
|                                     | description                 |                                |
|                                     | members                     |                                |
| **Sequence flow**                   |                             |                                |
|                                     | flowNodeId                  |                                |
|                                     | processInstanceKey          |                                |
|                                     | processDefinitionKey        |                                |
|                                     | processDefinitionId         |                                |
|                                     | tenantId                    |                                |
|                                     | partitionId                 |                                |
|                                     | historyCleanupDate          |                                |
| **Tenant**                          |                             |                                |
|                                     | tenantKey                   |                                |
|                                     | tenantId                    |                                |
|                                     | name                        |                                |
|                                     | description                 |                                |
|                                     | members                     |                                |
| **Usage metric**                    |                             |                                |
|                                     | key                         |                                |
|                                     | startTime                   |                                |
|                                     | endTime                     |                                |
|                                     | tenantId                    |                                |
|                                     | eventType                   |                                |
|                                     | value                       |                                |
|                                     | partitionId                 |                                |
| **Usage metric TU**                 |                             |                                |
|                                     | key                         |                                |
|                                     | startTime                   |                                |
|                                     | endTime                     |                                |
|                                     | tenantId                    |                                |
|                                     | assigneeHash                |                                |
|                                     | partitionId                 |                                |
| **User**                            |                             |                                |
|                                     | userKey                     |                                |
|                                     | username                    |                                |
|                                     | name                        |                                |
|                                     | email                       |                                |
|                                     | password                    |                                |
| **User task**                       |                             |                                |
|                                     | userTaskKey                 | Yes                            |
|                                     | elementId                   | Yes                            |
|                                     | name                        | Yes                            |
|                                     | processDefinitionId         | Yes                            |
|                                     | creationDate                | Yes                            |
|                                     | completionDate              | Yes                            |
|                                     | assignee                    | Yes                            |
|                                     | state                       | Yes                            |
|                                     | formKey                     |                                |
|                                     | processDefinitionKey        | Yes                            |
|                                     | processInstanceKey          | Yes                            |
|                                     | rootProcessInstanceKey      |                                |
|                                     | elementInstanceKey          | Yes                            |
|                                     | tenantId                    | Yes                            |
|                                     | dueDate                     | Yes                            |
|                                     | followUpDate                | Yes                            |
|                                     | candidateGroups             |                                |
|                                     | candidateUsers              |                                |
|                                     | externalFormReference       |                                |
|                                     | processDefinitionVersion    | Yes                            |
|                                     | serializedCustomHeaders     |                                |
|                                     | customHeaders               |                                |
|                                     | priority                    | Yes                            |
|                                     | tags                        |                                |
|                                     | partitionId                 | Yes                            |
|                                     | historyCleanupDate          | Yes                            |
| **User task migration**             |                             |                                |
|                                     | userTaskKey                 |                                |
|                                     | processDefinitionKey        |                                |
|                                     | processDefinitionId         |                                |
|                                     | elementId                   |                                |
|                                     | name                        |                                |
|                                     | processDefinitionVersion    |                                |
| **Variable**                        |                             |                                |
|                                     | variableKey                 | Yes                            |
|                                     | name                        | Yes                            |
|                                     | type                        |                                |
|                                     | doubleValue                 |                                |
|                                     | longValue                   |                                |
|                                     | value                       | Yes                            |
|                                     | fullValue                   |                                |
|                                     | isPreview                   |                                |
|                                     | scopeKey                    | Yes                            |
|                                     | processInstanceKey          | Yes                            |
|                                     | rootProcessInstanceKey      |                                |
|                                     | processDefinitionId         | Yes                            |
|                                     | tenantId                    | Yes                            |
|                                     | partitionId                 | Yes                            |
|                                     | historyCleanupDate          | Yes                            |
