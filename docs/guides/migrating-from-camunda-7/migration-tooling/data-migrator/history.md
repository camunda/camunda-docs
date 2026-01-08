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

- The History Data Migrator must be able to access the Camunda 7 database.
- The History Data Migrator can migrate data to Camunda 8 only when a relational database (RDBMS) is used. This capability is planned for Camunda 8.9.
- The History Data Migrator must be able to access the Camunda 8 database. As a result, you can run this tool only in a self-managed environment.
- If you migrate runtime and history data at the same time, Camunda 8 will contain two process instances:
  - A canceled historic process instance.
  - An active runtime process instance.

  These instances are linked by process variables.

### Unsupported entities and properties

The History Data Migrator does not support the following Camunda 8 entities or properties:

- Sequence flow: Sequence flows cannot be highlighted in Operate.
- User task migration metadata: Information for user tasks migrated via process instance migration is not available in Camunda 7.
- Message subscription and correlated message subscription: These entities are not available in Camunda 7.
- Batch operation entity and batch operation item: Camunda 7 does not retain sufficient information about processed instances.
- User metrics: Not available in Camunda 7.
- Exporter position: This entity does not exist in Camunda 7.
- Process instance and user task tags: These properties do not exist in Camunda 7.
- Audit log: Not supported. See the related tracking issue.

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

## Camunda 8 history migration coverage

The following table shows which Camunda 8 entities and properties are migrated by the History Data Migrator.

### Audit log

| Property                | Migrated |
| ----------------------- | -------- |
| auditLogKey             | No       |
| entityKey               | No       |
| entityType              | No       |
| operationType           | No       |
| entityVersion           | No       |
| entityValueType         | No       |
| entityOperationIntent   | No       |
| batchOperationKey       | No       |
| batchOperationType      | No       |
| timestamp               | No       |
| actorType               | No       |
| actorId                 | No       |
| tenantId                | No       |
| tenantScope             | No       |
| result                  | No       |
| annotation              | No       |
| category                | No       |
| processDefinitionId     | No       |
| decisionRequirementsId  | No       |
| decisionDefinitionId    | No       |
| processDefinitionKey    | No       |
| processInstanceKey      | No       |
| elementInstanceKey      | No       |
| jobKey                  | No       |
| userTaskKey             | No       |
| decisionRequirementsKey | No       |
| decisionDefinitionKey   | No       |
| decisionEvaluationKey   | No       |
| deploymentKey           | No       |
| formKey                 | No       |
| resourceKey             | No       |

### Batch operation

| Property                 | Migrated |
| ------------------------ | -------- |
| batchOperationKey        | No       |
| state                    | No       |
| operationType            | No       |
| startDate                | No       |
| endDate                  | No       |
| actorType                | No       |
| actorId                  | No       |
| operationsTotalCount     | No       |
| operationsFailedCount    | No       |
| operationsCompletedCount | No       |
| errors                   | No       |

### Batch operation item

| Property           | Migrated |
| ------------------ | -------- |
| batchOperationKey  | No       |
| itemKey            | No       |
| processInstanceKey | No       |
| state              | No       |
| processedDate      | No       |
| errorMessage       | No       |

### Cluster variable

| Property    | Migrated |
| ----------- | -------- |
| id          | No       |
| name        | No       |
| type        | No       |
| doubleValue | No       |
| longValue   | No       |
| value       | No       |
| fullValue   | No       |
| isPreview   | No       |
| tenantId    | No       |
| scope       | No       |

### Correlated message subscription

| Property               | Migrated |
| ---------------------- | -------- |
| correlationKey         | No       |
| correlationTime        | No       |
| flowNodeId             | No       |
| flowNodeInstanceKey    | No       |
| historyCleanupDate     | No       |
| messageKey             | No       |
| messageName            | No       |
| partitionId            | No       |
| processDefinitionId    | No       |
| processDefinitionKey   | No       |
| processInstanceKey     | No       |
| rootProcessInstanceKey | No       |
| subscriptionKey        | No       |
| subscriptionType       | No       |
| tenantId               | No       |

### Decision definition

| Property                    | Migrated |
| --------------------------- | -------- |
| decisionDefinitionKey       | Yes      |
| name                        | Yes      |
| decisionDefinitionId        | Yes      |
| tenantId                    | Yes      |
| version                     | Yes      |
| decisionRequirementsId      | Yes      |
| decisionRequirementsKey     | No       |
| decisionRequirementsName    | No       |
| decisionRequirementsVersion | No       |

### Decision instance

| Property                  | Migrated |
| ------------------------- | -------- |
| decisionInstanceId        | No       |
| decisionInstanceKey       | No       |
| state                     | Yes      |
| evaluationDate            | Yes      |
| evaluationFailure         | No       |
| evaluationFailureMessage  | No       |
| result                    | Yes      |
| flowNodeInstanceKey       | Yes      |
| flowNodeId                | Yes      |
| processInstanceKey        | Yes      |
| processDefinitionKey      | Yes      |
| processDefinitionId       | Yes      |
| decisionDefinitionKey     | Yes      |
| decisionDefinitionId      | Yes      |
| decisionRequirementsKey   | Yes      |
| decisionRequirementsId    | Yes      |
| rootDecisionDefinitionKey | Yes      |
| decisionType              | Yes      |
| tenantId                  | Yes      |
| partitionId               | Yes      |
| evaluatedInputs           | Yes      |
| evaluatedOutputs          | Yes      |
| historyCleanupDate        | Yes      |

### Decision requirements

| Property                | Migrated |
| ----------------------- | -------- |
| decisionRequirementsKey | Yes      |
| decisionRequirementsId  | Yes      |
| name                    | Yes      |
| resourceName            | Yes      |
| version                 | Yes      |
| xml                     | Yes      |
| tenantId                | Yes      |

### Exporter position

| Property             | Migrated |
| -------------------- | -------- |
| partitionId          | No       |
| exporter             | No       |
| lastExportedPosition | No       |
| created              | No       |
| lastUpdated          | No       |

### Flow node instance

| Property               | Migrated |
| ---------------------- | -------- |
| flowNodeInstanceKey    | No       |
| processInstanceKey     | Yes      |
| processDefinitionKey   | Yes      |
| processDefinitionId    | Yes      |
| flowNodeScopeKey       | Yes      |
| startDate              | Yes      |
| endDate                | Yes      |
| flowNodeId             | Yes      |
| flowNodeName           | No       |
| treePath               | Yes      |
| type                   | Yes      |
| state                  | Yes      |
| incidentKey            | No       |
| numSubprocessIncidents | No       |
| hasIncident            | No       |
| tenantId               | Yes      |
| partitionId            | No       |
| rootProcessInstanceKey | No       |
| historyCleanupDate     | No       |

### Form

| Property  | Migrated |
| --------- | -------- |
| formKey   | No       |
| tenantId  | No       |
| formId    | No       |
| schema    | No       |
| version   | No       |
| isDeleted | No       |

### History deletion

| Property          | Migrated |
| ----------------- | -------- |
| resourceKey       | No       |
| resourceType      | No       |
| batchOperationKey | No       |
| partitionId       | No       |

### Incident

| Property               | Migrated |
| ---------------------- | -------- |
| incidentKey            | Yes      |
| processDefinitionKey   | Yes      |
| processDefinitionId    | Yes      |
| processInstanceKey     | Yes      |
| rootProcessInstanceKey | No       |
| flowNodeInstanceKey    | Yes      |
| flowNodeId             | Yes      |
| jobKey                 | Yes      |
| errorType              | No       |
| errorMessage           | Yes      |
| errorMessageHash       | No       |
| creationDate           | Yes      |
| state                  | Yes      |
| treePath               | No       |
| tenantId               | Yes      |
| partitionId            | No       |
| historyCleanupDate     | No       |

### Job

| Property                 | Migrated |
| ------------------------ | -------- |
| jobKey                   | No       |
| type                     | No       |
| worker                   | No       |
| state                    | No       |
| kind                     | No       |
| listenerEventType        | No       |
| retries                  | No       |
| isDenied                 | No       |
| deniedReason             | No       |
| hasFailedWithRetriesLeft | No       |
| errorCode                | No       |
| errorMessage             | No       |
| serializedCustomHeaders  | No       |
| customHeaders            | No       |
| deadline                 | No       |
| endTime                  | No       |
| processDefinitionId      | No       |
| processDefinitionKey     | No       |
| processInstanceKey       | No       |
| rootProcessInstanceKey   | No       |
| elementId                | No       |
| elementInstanceKey       | No       |
| tenantId                 | No       |
| partitionId              | No       |
| historyCleanupDate       | No       |
| creationTime             | No       |
| lastUpdateTime           | No       |

### Message subscription

| Property                 | Migrated |
| ------------------------ | -------- |
| messageSubscriptionKey   | No       |
| processDefinitionId      | No       |
| processDefinitionKey     | No       |
| processInstanceKey       | No       |
| rootProcessInstanceKey   | No       |
| flowNodeId               | No       |
| flowNodeInstanceKey      | No       |
| messageSubscriptionState | No       |
| dateTime                 | No       |
| messageName              | No       |
| correlationKey           | No       |
| tenantId                 | No       |
| partitionId              | No       |
| historyCleanupDate       | No       |

### Process definition

| Property             | Migrated |
| -------------------- | -------- |
| processDefinitionKey | Yes      |
| processDefinitionId  | Yes      |
| resourceName         | Yes      |
| name                 | Yes      |
| tenantId             | Yes      |
| versionTag           | Yes      |
| version              | Yes      |
| bpmnXml              | Yes      |
| formId               | No       |

### Process instance

| Property                 | Migrated |
| ------------------------ | -------- |
| processInstanceKey       | Yes      |
| rootProcessInstanceKey   | No       |
| processDefinitionId      | Yes      |
| processDefinitionKey     | No       |
| state                    | Yes      |
| startDate                | Yes      |
| endDate                  | Yes      |
| tenantId                 | Yes      |
| parentProcessInstanceKey | Yes      |
| parentElementInstanceKey | No       |
| numIncidents             | No       |
| version                  | Yes      |
| partitionId              | Yes      |
| treePath                 | No       |
| historyCleanupDate       | Yes      |
| tags                     | No       |

### Sequence flow

| Property             | Migrated |
| -------------------- | -------- |
| flowNodeId           | No       |
| processInstanceKey   | No       |
| processDefinitionKey | No       |
| processDefinitionId  | No       |
| tenantId             | No       |
| partitionId          | No       |
| historyCleanupDate   | No       |

### Usage metric

| Property    | Migrated |
| ----------- | -------- |
| key         | No       |
| startTime   | No       |
| endTime     | No       |
| tenantId    | No       |
| eventType   | No       |
| value       | No       |
| partitionId | No       |

### Usage metric (TU)

| Property     | Migrated |
| ------------ | -------- |
| key          | No       |
| startTime    | No       |
| endTime      | No       |
| tenantId     | No       |
| assigneeHash | No       |
| partitionId  | No       |

### User task

| Property                 | Migrated |
| ------------------------ | -------- |
| userTaskKey              | Yes      |
| elementId                | Yes      |
| name                     | Yes      |
| processDefinitionId      | Yes      |
| creationDate             | Yes      |
| completionDate           | Yes      |
| assignee                 | Yes      |
| state                    | Yes      |
| formKey                  | No       |
| processDefinitionKey     | Yes      |
| processInstanceKey       | Yes      |
| rootProcessInstanceKey   | No       |
| elementInstanceKey       | Yes      |
| tenantId                 | Yes      |
| dueDate                  | Yes      |
| followUpDate             | Yes      |
| candidateGroups          | No       |
| candidateUsers           | No       |
| externalFormReference    | No       |
| processDefinitionVersion | Yes      |
| serializedCustomHeaders  | No       |
| customHeaders            | No       |
| priority                 | Yes      |
| tags                     | No       |
| partitionId              | Yes      |
| historyCleanupDate       | Yes      |

### User task migration

| Property                 | Migrated |
| ------------------------ | -------- |
| userTaskKey              | No       |
| processDefinitionKey     | No       |
| processDefinitionId      | No       |
| elementId                | No       |
| name                     | No       |
| processDefinitionVersion | No       |

### Variable

| Property               | Migrated |
| ---------------------- | -------- |
| variableKey            | Yes      |
| name                   | Yes      |
| type                   | No       |
| doubleValue            | No       |
| longValue              | No       |
| value                  | Yes      |
| fullValue              | No       |
| isPreview              | No       |
| scopeKey               | Yes      |
| processInstanceKey     | Yes      |
| rootProcessInstanceKey | No       |
| processDefinitionId    | Yes      |
| tenantId               | Yes      |
| partitionId            | Yes      |
| historyCleanupDate     | Yes      |
