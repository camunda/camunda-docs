---
title: "Enums"
sidebar_label: "Enums"
mdx:
  format: md
---

# Enums

:::caution Technical Preview
The C# SDK is a **technical preview** available from Camunda 8.9. It will become fully supported in Camunda 8.10. Its API surface may change in future releases without following semver.
:::

Enumeration types (86 enums).

## AgentInstanceHistoryCommitStatusEnum

The commit status of a history item.
COMMITTED: the producing job completed successfully.
PENDING: the producing job is still active (in-flight).
DISCARDED: the producing job failed; this item was superseded by a later activation.

| Value       | Description |
| ----------- | ----------- |
| `COMMITTED` |             |
| `PENDING`   |             |
| `DISCARDED` |             |

## AgentInstanceHistoryRoleEnum

The role of a history item in the agent conversation.

| Value        | Description |
| ------------ | ----------- |
| `USER`       |             |
| `ASSISTANT`  |             |
| `TOOLRESULT` |             |

## AgentInstanceHistorySearchQuerySortRequestField

The field to sort by.

| Value            | Description |
| ---------------- | ----------- |
| `ProducedAt`     |             |
| `HistoryItemKey` |             |
| `LoopIteration`  |             |

## AgentInstanceMessageContentTypeEnum

The content type discriminator for a history item content block.

| Value      | Description |
| ---------- | ----------- |
| `TEXT`     |             |
| `DOCUMENT` |             |
| `OBJECT`   |             |

## AgentInstanceSearchQuerySortRequestField

The field to sort by.

| Value                    | Description |
| ------------------------ | ----------- |
| `AgentInstanceKey`       |             |
| `Status`                 |             |
| `ElementId`              |             |
| `ProcessInstanceKey`     |             |
| `RootProcessInstanceKey` |             |
| `ProcessDefinitionKey`   |             |
| `TenantId`               |             |
| `CreationDate`           |             |
| `LastUpdatedDate`        |             |
| `CompletionDate`         |             |

## AgentInstanceStatusEnum

The current status of an agent instance.

| Value           | Description |
| --------------- | ----------- |
| `UNKNOWN`       |             |
| `COMPLETED`     |             |
| `IDLE`          |             |
| `INITIALIZING`  |             |
| `THINKING`      |             |
| `TOOLCALLING`   |             |
| `TOOLDISCOVERY` |             |

## AgentInstanceUpdateStatusEnum

The status values that can be set on an agent instance via an update request.

| Value           | Description |
| --------------- | ----------- |
| `IDLE`          |             |
| `THINKING`      |             |
| `TOOLCALLING`   |             |
| `TOOLDISCOVERY` |             |

## AuditLogActorTypeEnum

The type of actor who performed the operation.

| Value       | Description |
| ----------- | ----------- |
| `ANONYMOUS` |             |
| `CLIENT`    |             |
| `UNKNOWN`   |             |
| `USER`      |             |

## AuditLogCategoryEnum

The category of the audit log operation.

| Value               | Description |
| ------------------- | ----------- |
| `ADMIN`             |             |
| `DEPLOYEDRESOURCES` |             |
| `USERTASKS`         |             |

## AuditLogEntityTypeEnum

The type of entity affected by the operation.

| Value             | Description |
| ----------------- | ----------- |
| `AUTHORIZATION`   |             |
| `BATCH`           |             |
| `DECISION`        |             |
| `GROUP`           |             |
| `INCIDENT`        |             |
| `JOB`             |             |
| `MAPPINGRULE`     |             |
| `PROCESSINSTANCE` |             |
| `RESOURCE`        |             |
| `ROLE`            |             |
| `TENANT`          |             |
| `USER`            |             |
| `USERTASK`        |             |
| `VARIABLE`        |             |
| `CLIENT`          |             |

## AuditLogOperationTypeEnum

The type of operation performed.

| Value      | Description |
| ---------- | ----------- |
| `ASSIGN`   |             |
| `CANCEL`   |             |
| `COMPLETE` |             |
| `CREATE`   |             |
| `DELETE`   |             |
| `EVALUATE` |             |
| `MIGRATE`  |             |
| `MODIFY`   |             |
| `RESOLVE`  |             |
| `RESUME`   |             |
| `SUSPEND`  |             |
| `UNASSIGN` |             |
| `UNKNOWN`  |             |
| `UPDATE`   |             |

## AuditLogResultEnum

The result status of the operation.

| Value     | Description |
| --------- | ----------- |
| `FAIL`    |             |
| `SUCCESS` |             |

## AuditLogSearchQuerySortRequestField

The field to sort by.

| Value                     | Description |
| ------------------------- | ----------- |
| `ActorId`                 |             |
| `ActorType`               |             |
| `AuditLogKey`             |             |
| `BatchOperationKey`       |             |
| `BatchOperationType`      |             |
| `Category`                |             |
| `DecisionDefinitionId`    |             |
| `DecisionDefinitionKey`   |             |
| `DecisionEvaluationKey`   |             |
| `DecisionRequirementsId`  |             |
| `DecisionRequirementsKey` |             |
| `ElementInstanceKey`      |             |
| `EntityKey`               |             |
| `EntityType`              |             |
| `JobKey`                  |             |
| `OperationType`           |             |
| `ProcessDefinitionId`     |             |
| `ProcessDefinitionKey`    |             |
| `ProcessInstanceKey`      |             |
| `InboundChannelType`      |             |
| `InboundChannelToolName`  |             |
| `Result`                  |             |
| `TenantId`                |             |
| `Timestamp`               |             |
| `UserTaskKey`             |             |

## AuthorizationSearchQuerySortRequestField

The field to sort by.

| Value                  | Description |
| ---------------------- | ----------- |
| `OwnerId`              |             |
| `OwnerType`            |             |
| `ResourceId`           |             |
| `ResourcePropertyName` |             |
| `ResourceType`         |             |

## BatchOperationErrorType

The type of the error that occurred during the batch operation.

| Value                      | Description |
| -------------------------- | ----------- |
| `QUERYFAILED`              |             |
| `RESULTBUFFERSIZEEXCEEDED` |             |

## BatchOperationItemResponseState

State of the item.

| Value       | Description |
| ----------- | ----------- |
| `ACTIVE`    |             |
| `COMPLETED` |             |
| `SKIPPED`   |             |
| `CANCELED`  |             |
| `FAILED`    |             |

## BatchOperationItemSearchQuerySortRequestField

The field to sort by.

| Value                | Description |
| -------------------- | ----------- |
| `BatchOperationKey`  |             |
| `ItemKey`            |             |
| `ProcessInstanceKey` |             |
| `ProcessedDate`      |             |
| `State`              |             |

## BatchOperationItemStateEnum

The batch operation item state.

| Value       | Description |
| ----------- | ----------- |
| `ACTIVE`    |             |
| `COMPLETED` |             |
| `CANCELED`  |             |
| `FAILED`    |             |

## BatchOperationSearchQuerySortRequestField

The field to sort by.

| Value               | Description |
| ------------------- | ----------- |
| `BatchOperationKey` |             |
| `OperationType`     |             |
| `State`             |             |
| `StartDate`         |             |
| `EndDate`           |             |
| `ActorType`         |             |
| `ActorId`           |             |

## BatchOperationStateEnum

The batch operation state.

| Value                | Description |
| -------------------- | ----------- |
| `ACTIVE`             |             |
| `CANCELED`           |             |
| `COMPLETED`          |             |
| `CREATED`            |             |
| `FAILED`             |             |
| `PARTIALLYCOMPLETED` |             |
| `SUSPENDED`          |             |

## BatchOperationTypeEnum

The type of the batch operation.

| Value                      | Description |
| -------------------------- | ----------- |
| `ADDVARIABLE`              |             |
| `CANCELPROCESSINSTANCE`    |             |
| `DELETEDECISIONDEFINITION` |             |
| `DELETEDECISIONINSTANCE`   |             |
| `DELETEPROCESSDEFINITION`  |             |
| `DELETEPROCESSINSTANCE`    |             |
| `MIGRATEPROCESSINSTANCE`   |             |
| `MODIFYPROCESSINSTANCE`    |             |
| `RESOLVEINCIDENT`          |             |
| `UPDATEJOB`                |             |
| `UPDATEVARIABLE`           |             |

## CamundaAuthErrorCode

Auth error codes matching the JS SDK.

| Value                     | Description |
| ------------------------- | ----------- |
| `TokenFetchFailed`        |             |
| `TokenParseFailed`        |             |
| `TokenExpired`            |             |
| `OAuthConfigMissing`      |             |
| `BasicCredentialsMissing` |             |

## CloudStage

The cloud deployment stage.

| Value  | Description |
| ------ | ----------- |
| `Dev`  |             |
| `Int`  |             |
| `Prod` |             |

## ClusterVariableScopeEnum

The scope of a cluster variable.

| Value    | Description |
| -------- | ----------- |
| `GLOBAL` |             |
| `TENANT` |             |

## ClusterVariableSearchQuerySortRequestField

The field to sort by.

| Value      | Description |
| ---------- | ----------- |
| `Name`     |             |
| `Value`    |             |
| `TenantId` |             |
| `Scope`    |             |

## CorrelatedMessageSubscriptionSearchQuerySortRequestField

The field to sort by.

| Value                  | Description |
| ---------------------- | ----------- |
| `BusinessId`           |             |
| `CorrelationKey`       |             |
| `CorrelationTime`      |             |
| `ElementId`            |             |
| `ElementInstanceKey`   |             |
| `MessageKey`           |             |
| `MessageName`          |             |
| `PartitionId`          |             |
| `ProcessDefinitionId`  |             |
| `ProcessDefinitionKey` |             |
| `ProcessInstanceKey`   |             |
| `SubscriptionKey`      |             |
| `TenantId`             |             |

## DecisionDefinitionSearchQuerySortRequestField

The field to sort by.

| Value                         | Description |
| ----------------------------- | ----------- |
| `DecisionDefinitionKey`       |             |
| `DecisionDefinitionId`        |             |
| `Name`                        |             |
| `Version`                     |             |
| `DecisionRequirementsId`      |             |
| `DecisionRequirementsKey`     |             |
| `DecisionRequirementsName`    |             |
| `DecisionRequirementsVersion` |             |
| `TenantId`                    |             |

## DecisionDefinitionTypeEnum

The type of the decision. UNSPECIFIED is deprecated and should not be used anymore, for removal in 8.10

| Value               | Description |
| ------------------- | ----------- |
| `DECISIONTABLE`     |             |
| `LITERALEXPRESSION` |             |
| `UNSPECIFIED`       |             |
| `UNKNOWN`           |             |

## DecisionInstanceSearchQuerySortRequestField

The field to sort by.

| Value                           | Description |
| ------------------------------- | ----------- |
| `BusinessId`                    |             |
| `DecisionDefinitionId`          |             |
| `DecisionDefinitionKey`         |             |
| `DecisionDefinitionName`        |             |
| `DecisionDefinitionType`        |             |
| `DecisionDefinitionVersion`     |             |
| `DecisionEvaluationInstanceKey` |             |
| `DecisionEvaluationKey`         |             |
| `ElementInstanceKey`            |             |
| `EvaluationDate`                |             |
| `EvaluationFailure`             |             |
| `ProcessDefinitionKey`          |             |
| `ProcessInstanceKey`            |             |
| `RootDecisionDefinitionKey`     |             |
| `State`                         |             |
| `TenantId`                      |             |

## DecisionInstanceStateEnum

The state of the decision instance. UNSPECIFIED and UNKNOWN are deprecated and should not be used anymore, for removal in 8.10

| Value         | Description |
| ------------- | ----------- |
| `EVALUATED`   |             |
| `FAILED`      |             |
| `UNSPECIFIED` |             |
| `UNKNOWN`     |             |

## DecisionRequirementsSearchQuerySortRequestField

The field to sort by.

| Value                      | Description |
| -------------------------- | ----------- |
| `DecisionRequirementsKey`  |             |
| `DecisionRequirementsName` |             |
| `Version`                  |             |
| `DecisionRequirementsId`   |             |
| `TenantId`                 |             |

## DocumentReferenceCamundaDocumentType

Document discriminator. Always set to "camunda".

| Value     | Description |
| --------- | ----------- |
| `Camunda` |             |

## ElementInstanceFilterFieldsType

Type of element as defined set of values.

| Value                          | Description |
| ------------------------------ | ----------- |
| `UNSPECIFIED`                  |             |
| `PROCESS`                      |             |
| `SUBPROCESS`                   |             |
| `EVENTSUBPROCESS`              |             |
| `ADHOCSUBPROCESS`              |             |
| `ADHOCSUBPROCESSINNERINSTANCE` |             |
| `STARTEVENT`                   |             |
| `INTERMEDIATECATCHEVENT`       |             |
| `INTERMEDIATETHROWEVENT`       |             |
| `BOUNDARYEVENT`                |             |
| `ENDEVENT`                     |             |
| `SERVICETASK`                  |             |
| `RECEIVETASK`                  |             |
| `USERTASK`                     |             |
| `MANUALTASK`                   |             |
| `TASK`                         |             |
| `EXCLUSIVEGATEWAY`             |             |
| `INCLUSIVEGATEWAY`             |             |
| `PARALLELGATEWAY`              |             |
| `EVENTBASEDGATEWAY`            |             |
| `SEQUENCEFLOW`                 |             |
| `MULTIINSTANCEBODY`            |             |
| `CALLACTIVITY`                 |             |
| `BUSINESSRULETASK`             |             |
| `SCRIPTTASK`                   |             |
| `SENDTASK`                     |             |
| `UNKNOWN`                      |             |

## ElementInstanceFilterType

Type of element as defined set of values.

| Value                          | Description |
| ------------------------------ | ----------- |
| `UNSPECIFIED`                  |             |
| `PROCESS`                      |             |
| `SUBPROCESS`                   |             |
| `EVENTSUBPROCESS`              |             |
| `ADHOCSUBPROCESS`              |             |
| `ADHOCSUBPROCESSINNERINSTANCE` |             |
| `STARTEVENT`                   |             |
| `INTERMEDIATECATCHEVENT`       |             |
| `INTERMEDIATETHROWEVENT`       |             |
| `BOUNDARYEVENT`                |             |
| `ENDEVENT`                     |             |
| `SERVICETASK`                  |             |
| `RECEIVETASK`                  |             |
| `USERTASK`                     |             |
| `MANUALTASK`                   |             |
| `TASK`                         |             |
| `EXCLUSIVEGATEWAY`             |             |
| `INCLUSIVEGATEWAY`             |             |
| `PARALLELGATEWAY`              |             |
| `EVENTBASEDGATEWAY`            |             |
| `SEQUENCEFLOW`                 |             |
| `MULTIINSTANCEBODY`            |             |
| `CALLACTIVITY`                 |             |
| `BUSINESSRULETASK`             |             |
| `SCRIPTTASK`                   |             |
| `SENDTASK`                     |             |
| `UNKNOWN`                      |             |

## ElementInstanceResultType

Type of element as defined set of values.

| Value                          | Description |
| ------------------------------ | ----------- |
| `UNSPECIFIED`                  |             |
| `PROCESS`                      |             |
| `SUBPROCESS`                   |             |
| `EVENTSUBPROCESS`              |             |
| `ADHOCSUBPROCESS`              |             |
| `ADHOCSUBPROCESSINNERINSTANCE` |             |
| `STARTEVENT`                   |             |
| `INTERMEDIATECATCHEVENT`       |             |
| `INTERMEDIATETHROWEVENT`       |             |
| `BOUNDARYEVENT`                |             |
| `ENDEVENT`                     |             |
| `SERVICETASK`                  |             |
| `RECEIVETASK`                  |             |
| `USERTASK`                     |             |
| `MANUALTASK`                   |             |
| `TASK`                         |             |
| `EXCLUSIVEGATEWAY`             |             |
| `INCLUSIVEGATEWAY`             |             |
| `PARALLELGATEWAY`              |             |
| `EVENTBASEDGATEWAY`            |             |
| `SEQUENCEFLOW`                 |             |
| `MULTIINSTANCEBODY`            |             |
| `CALLACTIVITY`                 |             |
| `BUSINESSRULETASK`             |             |
| `SCRIPTTASK`                   |             |
| `SENDTASK`                     |             |
| `UNKNOWN`                      |             |

## ElementInstanceSearchQuerySortRequestField

The field to sort by.

| Value                  | Description |
| ---------------------- | ----------- |
| `ElementInstanceKey`   |             |
| `ProcessInstanceKey`   |             |
| `ProcessDefinitionKey` |             |
| `ProcessDefinitionId`  |             |
| `StartDate`            |             |
| `EndDate`              |             |
| `ElementId`            |             |
| `ElementName`          |             |
| `Type`                 |             |
| `State`                |             |
| `IncidentKey`          |             |
| `TenantId`             |             |

## ElementInstanceStateEnum

Element states

| Value        | Description |
| ------------ | ----------- |
| `ACTIVE`     |             |
| `COMPLETED`  |             |
| `TERMINATED` |             |

## ElementInstanceWaitStateQuerySortRequestField

The field to sort by.

| Value                    | Description |
| ------------------------ | ----------- |
| `ElementInstanceKey`     |             |
| `ProcessInstanceKey`     |             |
| `RootProcessInstanceKey` |             |
| `ElementId`              |             |

## GlobalListenerSourceEnum

How the global listener was defined.

| Value           | Description |
| --------------- | ----------- |
| `CONFIGURATION` |             |
| `API`           |             |

## GlobalTaskListenerEventTypeEnum

The event type that triggers the user task listener.

| Value        | Description |
| ------------ | ----------- |
| `All`        |             |
| `Creating`   |             |
| `Assigning`  |             |
| `Updating`   |             |
| `Completing` |             |
| `Canceling`  |             |

## GlobalTaskListenerSearchQuerySortRequestField

The field to sort by.

| Value            | Description |
| ---------------- | ----------- |
| `Id`             |             |
| `Type`           |             |
| `AfterNonGlobal` |             |
| `Priority`       |             |
| `Source`         |             |

## GroupClientSearchQuerySortRequestField

The field to sort by.

| Value      | Description |
| ---------- | ----------- |
| `ClientId` |             |

## GroupSearchQuerySortRequestField

The field to sort by.

| Value     | Description |
| --------- | ----------- |
| `Name`    |             |
| `GroupId` |             |

## GroupUserSearchQuerySortRequestField

The field to sort by.

| Value      | Description |
| ---------- | ----------- |
| `Username` |             |

## IncidentErrorTypeEnum

Incident error type with a defined set of values.

| Value                        | Description |
| ---------------------------- | ----------- |
| `ADHOCSUBPROCESSNORETRIES`   |             |
| `CALLEDDECISIONERROR`        |             |
| `CALLEDELEMENTERROR`         |             |
| `CONDITIONERROR`             |             |
| `DECISIONEVALUATIONERROR`    |             |
| `EXECUTIONLISTENERNORETRIES` |             |
| `EXTRACTVALUEERROR`          |             |
| `FORMNOTFOUND`               |             |
| `IOMAPPINGERROR`             |             |
| `JOBNORETRIES`               |             |
| `MESSAGESIZEEXCEEDED`        |             |
| `RESOURCENOTFOUND`           |             |
| `TASKLISTENERNORETRIES`      |             |
| `UNHANDLEDERROREVENT`        |             |
| `UNKNOWN`                    |             |
| `UNSPECIFIED`                |             |

## IncidentProcessInstanceStatisticsByDefinitionQuerySortRequestField

The aggregated field by which the process instance statistics are sorted.

| Value                           | Description |
| ------------------------------- | ----------- |
| `ActiveInstancesWithErrorCount` |             |
| `ProcessDefinitionKey`          |             |
| `TenantId`                      |             |

## IncidentProcessInstanceStatisticsByErrorQuerySortRequestField

The field to sort the incident error statistics by.

| Value                           | Description |
| ------------------------------- | ----------- |
| `ErrorMessage`                  |             |
| `ActiveInstancesWithErrorCount` |             |

## IncidentSearchQuerySortRequestField

The field to sort by.

| Value                  | Description |
| ---------------------- | ----------- |
| `IncidentKey`          |             |
| `ProcessDefinitionKey` |             |
| `ProcessDefinitionId`  |             |
| `ProcessInstanceKey`   |             |
| `ErrorType`            |             |
| `ElementId`            |             |
| `ElementInstanceKey`   |             |
| `CreationTime`         |             |
| `State`                |             |
| `JobKey`               |             |
| `TenantId`             |             |

## IncidentStateEnum

Incident states with a defined set of values.

| Value      | Description |
| ---------- | ----------- |
| `ACTIVE`   |             |
| `MIGRATED` |             |
| `PENDING`  |             |
| `RESOLVED` |             |
| `UNKNOWN`  |             |

## JobKindEnum

The job kind.

| Value               | Description |
| ------------------- | ----------- |
| `BPMNELEMENT`       |             |
| `EXECUTIONLISTENER` |             |
| `TASKLISTENER`      |             |
| `ADHOCSUBPROCESS`   |             |

## JobListenerEventTypeEnum

The listener event type of the job.

| Value         | Description |
| ------------- | ----------- |
| `ASSIGNING`   |             |
| `BEFOREALL`   |             |
| `CANCEL`      |             |
| `CANCELING`   |             |
| `COMPLETING`  |             |
| `CREATING`    |             |
| `END`         |             |
| `START`       |             |
| `UNSPECIFIED` |             |
| `UPDATING`    |             |

## JobSearchQuerySortRequestField

The field to sort by.

| Value                      | Description |
| -------------------------- | ----------- |
| `Deadline`                 |             |
| `DeniedReason`             |             |
| `ElementId`                |             |
| `ElementInstanceKey`       |             |
| `EndTime`                  |             |
| `ErrorCode`                |             |
| `ErrorMessage`             |             |
| `HasFailedWithRetriesLeft` |             |
| `IsDenied`                 |             |
| `JobKey`                   |             |
| `Kind`                     |             |
| `ListenerEventType`        |             |
| `Priority`                 |             |
| `ProcessDefinitionId`      |             |
| `ProcessDefinitionKey`     |             |
| `ProcessInstanceKey`       |             |
| `Retries`                  |             |
| `State`                    |             |
| `TenantId`                 |             |
| `Type`                     |             |
| `Worker`                   |             |

## JobStateEnum

The state of the job.

| Value             | Description |
| ----------------- | ----------- |
| `CANCELED`        |             |
| `COMPLETED`       |             |
| `CREATED`         |             |
| `ERRORTHROWN`     |             |
| `FAILED`          |             |
| `MIGRATED`        |             |
| `PRIORITYUPDATED` |             |
| `RETRIESUPDATED`  |             |
| `TIMEOUTUPDATED`  |             |
| `TIMEDOUT`        |             |

## MappingRuleSearchQuerySortRequestField

The field to sort by.

| Value           | Description |
| --------------- | ----------- |
| `MappingRuleId` |             |
| `ClaimName`     |             |
| `ClaimValue`    |             |
| `Name`          |             |

## MessageSubscriptionSearchQuerySortRequestField

The field to sort by.

| Value                      | Description |
| -------------------------- | ----------- |
| `MessageSubscriptionKey`   |             |
| `ProcessDefinitionId`      |             |
| `ProcessDefinitionName`    |             |
| `ProcessDefinitionVersion` |             |
| `ProcessInstanceKey`       |             |
| `ElementId`                |             |
| `ElementInstanceKey`       |             |
| `MessageSubscriptionState` |             |
| `MessageSubscriptionType`  |             |
| `LastUpdatedDate`          |             |
| `MessageName`              |             |
| `CorrelationKey`           |             |
| `TenantId`                 |             |
| `ToolName`                 |             |
| `InboundConnectorType`     |             |

## MessageSubscriptionStateEnum

The state of message subscription.

**Note for `START_EVENT` subscriptions:** The `CORRELATED` and `MIGRATED` states are not
tracked for these subscriptions. To query correlation history for process start events,
use the `/correlated-message-subscriptions/search` endpoint.

| Value        | Description |
| ------------ | ----------- |
| `CORRELATED` |             |
| `CREATED`    |             |
| `DELETED`    |             |
| `MIGRATED`   |             |

## MessageSubscriptionTypeEnum

The type of message subscription.
`START_EVENT` is definition-scoped (process start events). Always has a value; only
captured from Camunda 8.10 onwards.
`PROCESS_EVENT` is instance-scoped (intermediate catch events). Pre-8.10 entries have
no value stored; the API returns `PROCESS_EVENT` as a default for those entries.

| Value          | Description |
| -------------- | ----------- |
| `STARTEVENT`   |             |
| `PROCESSEVENT` |             |

## OwnerTypeEnum

The type of the owner of permissions.

| Value         | Description |
| ------------- | ----------- |
| `USER`        |             |
| `CLIENT`      |             |
| `ROLE`        |             |
| `GROUP`       |             |
| `MAPPINGRULE` |             |
| `UNSPECIFIED` |             |

## PartitionHealth

Describes the current health of the partition.

| Value       | Description |
| ----------- | ----------- |
| `Healthy`   |             |
| `Unhealthy` |             |
| `Dead`      |             |

## PartitionRole

Describes the Raft role of the broker for a given partition.

| Value      | Description |
| ---------- | ----------- |
| `Leader`   |             |
| `Follower` |             |
| `Inactive` |             |

## PermissionTypeEnum

Specifies the type of permissions.

| Value                                          | Description |
| ---------------------------------------------- | ----------- |
| `ACCESS`                                       |             |
| `CANCELPROCESSINSTANCE`                        |             |
| `CLAIM`                                        |             |
| `CLAIMUSERTASK`                                |             |
| `COMPLETE`                                     |             |
| `COMPLETEUSERTASK`                             |             |
| `CREATE`                                       |             |
| `CREATEBATCHOPERATIONCANCELPROCESSINSTANCE`    |             |
| `CREATEBATCHOPERATIONDELETEDECISIONDEFINITION` |             |
| `CREATEBATCHOPERATIONDELETEDECISIONINSTANCE`   |             |
| `CREATEBATCHOPERATIONDELETEPROCESSDEFINITION`  |             |
| `CREATEBATCHOPERATIONDELETEPROCESSINSTANCE`    |             |
| `CREATEBATCHOPERATIONMIGRATEPROCESSINSTANCE`   |             |
| `CREATEBATCHOPERATIONMODIFYPROCESSINSTANCE`    |             |
| `CREATEBATCHOPERATIONRESOLVEINCIDENT`          |             |
| `CREATEBATCHOPERATIONUPDATEJOB`                |             |
| `CREATEDECISIONINSTANCE`                       |             |
| `CREATEPROCESSINSTANCE`                        |             |
| `CREATETASKLISTENER`                           |             |
| `DELETE`                                       |             |
| `DELETEDECISIONINSTANCE`                       |             |
| `DELETEDRD`                                    |             |
| `DELETEFORM`                                   |             |
| `DELETEPROCESS`                                |             |
| `DELETEPROCESSINSTANCE`                        |             |
| `DELETERESOURCE`                               |             |
| `DELETETASKLISTENER`                           |             |
| `EVALUATE`                                     |             |
| `MODIFYPROCESSINSTANCE`                        |             |
| `READ`                                         |             |
| `READDECISIONDEFINITION`                       |             |
| `READDECISIONINSTANCE`                         |             |
| `READJOBMETRIC`                                |             |
| `READPROCESSDEFINITION`                        |             |
| `READPROCESSINSTANCE`                          |             |
| `READUSAGEMETRIC`                              |             |
| `READUSERTASK`                                 |             |
| `READTASKLISTENER`                             |             |
| `UPDATE`                                       |             |
| `UPDATEPROCESSINSTANCE`                        |             |
| `UPDATEUSERTASK`                               |             |
| `UPDATETASKLISTENER`                           |             |

## ProcessDefinitionInstanceStatisticsQuerySortRequestField

The field to sort by.

| Value                                 | Description |
| ------------------------------------- | ----------- |
| `ProcessDefinitionId`                 |             |
| `ActiveInstancesWithIncidentCount`    |             |
| `ActiveInstancesWithoutIncidentCount` |             |

## ProcessDefinitionInstanceVersionStatisticsQuerySortRequestField

The field to sort by.

| Value                                 | Description |
| ------------------------------------- | ----------- |
| `ProcessDefinitionId`                 |             |
| `ProcessDefinitionKey`                |             |
| `ProcessDefinitionName`               |             |
| `ProcessDefinitionVersion`            |             |
| `ActiveInstancesWithIncidentCount`    |             |
| `ActiveInstancesWithoutIncidentCount` |             |

## ProcessDefinitionSearchQuerySortRequestField

The field to sort by.

| Value                  | Description |
| ---------------------- | ----------- |
| `ProcessDefinitionKey` |             |
| `Name`                 |             |
| `ResourceName`         |             |
| `Version`              |             |
| `VersionTag`           |             |
| `ProcessDefinitionId`  |             |
| `TenantId`             |             |

## ProcessInstanceSearchQuerySortRequestField

The field to sort by.

| Value                         | Description |
| ----------------------------- | ----------- |
| `ProcessInstanceKey`          |             |
| `ProcessDefinitionId`         |             |
| `ProcessDefinitionName`       |             |
| `ProcessDefinitionVersion`    |             |
| `ProcessDefinitionVersionTag` |             |
| `ProcessDefinitionKey`        |             |
| `ParentProcessInstanceKey`    |             |
| `ParentElementInstanceKey`    |             |
| `StartDate`                   |             |
| `EndDate`                     |             |
| `State`                       |             |
| `HasIncident`                 |             |
| `TenantId`                    |             |
| `BusinessId`                  |             |

## ProcessInstanceStateEnum

Process instance states

| Value        | Description |
| ------------ | ----------- |
| `ACTIVE`     |             |
| `COMPLETED`  |             |
| `TERMINATED` |             |

## ResourceSearchQuerySortRequestField

The field to sort by.

| Value           | Description |
| --------------- | ----------- |
| `ResourceKey`   |             |
| `ResourceName`  |             |
| `ResourceId`    |             |
| `Version`       |             |
| `VersionTag`    |             |
| `DeploymentKey` |             |
| `TenantId`      |             |

## ResourceTypeEnum

The type of resource to add/remove permissions to/from.

| Value                            | Description |
| -------------------------------- | ----------- |
| `AUDITLOG`                       |             |
| `AUTHORIZATION`                  |             |
| `BATCH`                          |             |
| `CLUSTERVARIABLE`                |             |
| `COMPONENT`                      |             |
| `DECISIONDEFINITION`             |             |
| `DECISIONREQUIREMENTSDEFINITION` |             |
| `DOCUMENT`                       |             |
| `EXPRESSION`                     |             |
| `GLOBALLISTENER`                 |             |
| `GROUP`                          |             |
| `MAPPINGRULE`                    |             |
| `MESSAGE`                        |             |
| `PROCESSDEFINITION`              |             |
| `RESOURCE`                       |             |
| `ROLE`                           |             |
| `SYSTEM`                         |             |
| `TENANT`                         |             |
| `USER`                           |             |
| `USERTASK`                       |             |

## RoleClientSearchQuerySortRequestField

The field to sort by.

| Value      | Description |
| ---------- | ----------- |
| `ClientId` |             |

## RoleGroupSearchQuerySortRequestField

The field to sort by.

| Value     | Description |
| --------- | ----------- |
| `GroupId` |             |

## RoleSearchQuerySortRequestField

The field to sort by.

| Value    | Description |
| -------- | ----------- |
| `Name`   |             |
| `RoleId` |             |

## RoleUserSearchQuerySortRequestField

The field to sort by.

| Value      | Description |
| ---------- | ----------- |
| `Username` |             |

## SortOrderEnum

The order in which to sort the related field.

| Value  | Description |
| ------ | ----------- |
| `ASC`  |             |
| `DESC` |             |

## TenantClientSearchQuerySortRequestField

The field to sort by.

| Value      | Description |
| ---------- | ----------- |
| `ClientId` |             |

## TenantFilterEnum

The tenant filtering strategy for job activation. Determines whether to use tenant IDs provided in the request or tenant IDs assigned to the authenticated principal.

| Value      | Description |
| ---------- | ----------- |
| `PROVIDED` |             |
| `ASSIGNED` |             |

## TenantGroupSearchQuerySortRequestField

The field to sort by.

| Value     | Description |
| --------- | ----------- |
| `GroupId` |             |

## TenantSearchQuerySortRequestField

The field to sort by.

| Value      | Description |
| ---------- | ----------- |
| `Key`      |             |
| `Name`     |             |
| `TenantId` |             |

## TenantUserSearchQuerySortRequestField

The field to sort by.

| Value      | Description |
| ---------- | ----------- |
| `Username` |             |

## UserSearchQuerySortRequestField

The field to sort by.

| Value      | Description |
| ---------- | ----------- |
| `Username` |             |
| `Name`     |             |
| `Email`    |             |

## UserTaskSearchQuerySortRequestField

The field to sort by.

| Value            | Description |
| ---------------- | ----------- |
| `CreationDate`   |             |
| `CompletionDate` |             |
| `FollowUpDate`   |             |
| `DueDate`        |             |
| `Priority`       |             |
| `Name`           |             |
| `BusinessId`     |             |

## UserTaskStateEnum

The state of the user task.
Note: FAILED state is only for legacy job-worker-based tasks.

| Value        | Description |
| ------------ | ----------- |
| `CREATING`   |             |
| `CREATED`    |             |
| `ASSIGNING`  |             |
| `UPDATING`   |             |
| `COMPLETING` |             |
| `COMPLETED`  |             |
| `CANCELING`  |             |
| `CANCELED`   |             |
| `FAILED`     |             |

## UserTaskVariableSearchQuerySortRequestField

The field to sort by.

| Value                | Description |
| -------------------- | ----------- |
| `Value`              |             |
| `Name`               |             |
| `TenantId`           |             |
| `VariableKey`        |             |
| `ScopeKey`           |             |
| `ProcessInstanceKey` |             |

## VariableSearchQuerySortRequestField

The field to sort by.

| Value                | Description |
| -------------------- | ----------- |
| `Value`              |             |
| `Name`               |             |
| `TenantId`           |             |
| `VariableKey`        |             |
| `ScopeKey`           |             |
| `ProcessInstanceKey` |             |

## WaitStateElementTypeEnum

The BPMN element type of a waiting element instance.

| Value                          | Description |
| ------------------------------ | ----------- |
| `ADHOCSUBPROCESS`              |             |
| `ADHOCSUBPROCESSINNERINSTANCE` |             |
| `BOUNDARYEVENT`                |             |
| `BUSINESSRULETASK`             |             |
| `CALLACTIVITY`                 |             |
| `ENDEVENT`                     |             |
| `EVENTBASEDGATEWAY`            |             |
| `EVENTSUBPROCESS`              |             |
| `EXCLUSIVEGATEWAY`             |             |
| `INCLUSIVEGATEWAY`             |             |
| `INTERMEDIATECATCHEVENT`       |             |
| `INTERMEDIATETHROWEVENT`       |             |
| `MANUALTASK`                   |             |
| `MULTIINSTANCEBODY`            |             |
| `PARALLELGATEWAY`              |             |
| `PROCESS`                      |             |
| `RECEIVETASK`                  |             |
| `SCRIPTTASK`                   |             |
| `SENDTASK`                     |             |
| `SEQUENCEFLOW`                 |             |
| `SERVICETASK`                  |             |
| `STARTEVENT`                   |             |
| `SUBPROCESS`                   |             |
| `TASK`                         |             |
| `UNKNOWN`                      |             |
| `UNSPECIFIED`                  |             |
| `USERTASK`                     |             |

## WaitStateTypeEnum

The type of waiting state an element instance is in.

| Value       | Description |
| ----------- | ----------- |
| `JOB`       |             |
| `MESSAGE`   |             |
| `USERTASK`  |             |
| `TIMER`     |             |
| `SIGNAL`    |             |
| `CONDITION` |             |

## WebappComponent

A Camunda webapp component name.

| Value      | Description |
| ---------- | ----------- |
| `Operate`  |             |
| `Tasklist` |             |
| `Admin`    |             |
