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

Enumeration types (24 enums).

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

## BatchOperationItemStateEnum

The batch operation item state.

| Value       | Description |
| ----------- | ----------- |
| `ACTIVE`    |             |
| `COMPLETED` |             |
| `CANCELED`  |             |
| `FAILED`    |             |

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

## ClusterVariableScopeEnum

The scope of a cluster variable.

| Value    | Description |
| -------- | ----------- |
| `GLOBAL` |             |
| `TENANT` |             |

## DecisionDefinitionTypeEnum

The type of the decision.

| Value               | Description |
| ------------------- | ----------- |
| `DECISIONTABLE`     |             |
| `LITERALEXPRESSION` |             |
| `UNKNOWN`           |             |

## DecisionInstanceStateEnum

The state of the decision instance.

| Value         | Description |
| ------------- | ----------- |
| `EVALUATED`   |             |
| `FAILED`      |             |
| `UNSPECIFIED` |             |

## ElementInstanceStateEnum

Element states

| Value        | Description |
| ------------ | ----------- |
| `ACTIVE`     |             |
| `COMPLETED`  |             |
| `TERMINATED` |             |

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
| `CANCELING`   |             |
| `COMPLETING`  |             |
| `CREATING`    |             |
| `END`         |             |
| `START`       |             |
| `UNSPECIFIED` |             |
| `UPDATING`    |             |

## JobStateEnum

The state of the job.

| Value            | Description |
| ---------------- | ----------- |
| `CANCELED`       |             |
| `COMPLETED`      |             |
| `CREATED`        |             |
| `ERRORTHROWN`    |             |
| `FAILED`         |             |
| `MIGRATED`       |             |
| `RETRIESUPDATED` |             |
| `TIMEDOUT`       |             |

## MessageSubscriptionStateEnum

The state of message subscription.

| Value        | Description |
| ------------ | ----------- |
| `CORRELATED` |             |
| `CREATED`    |             |
| `DELETED`    |             |
| `MIGRATED`   |             |

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

## PermissionTypeEnum

Specifies the type of permissions.

| Value                                          | Description |
| ---------------------------------------------- | ----------- |
| `ACCESS`                                       |             |
| `CANCELPROCESSINSTANCE`                        |             |
| `CLAIM`                                        |             |
| `COMPLETE`                                     |             |
| `CREATE`                                       |             |
| `CREATEBATCHOPERATIONCANCELPROCESSINSTANCE`    |             |
| `CREATEBATCHOPERATIONDELETEDECISIONDEFINITION` |             |
| `CREATEBATCHOPERATIONDELETEDECISIONINSTANCE`   |             |
| `CREATEBATCHOPERATIONDELETEPROCESSDEFINITION`  |             |
| `CREATEBATCHOPERATIONDELETEPROCESSINSTANCE`    |             |
| `CREATEBATCHOPERATIONMIGRATEPROCESSINSTANCE`   |             |
| `CREATEBATCHOPERATIONMODIFYPROCESSINSTANCE`    |             |
| `CREATEBATCHOPERATIONRESOLVEINCIDENT`          |             |
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

## ProcessInstanceStateEnum

Process instance states

| Value        | Description |
| ------------ | ----------- |
| `ACTIVE`     |             |
| `COMPLETED`  |             |
| `TERMINATED` |             |

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

## SortOrderEnum

The order in which to sort the related field.

| Value  | Description |
| ------ | ----------- |
| `ASC`  |             |
| `DESC` |             |

## TenantFilterEnum

The tenant filtering strategy for job activation. Determines whether to use tenant IDs provided in the request or tenant IDs assigned to the authenticated principal.

| Value      | Description |
| ---------- | ----------- |
| `PROVIDED` |             |
| `ASSIGNED` |             |

## UserTaskStateEnum

The state of the user task.

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
