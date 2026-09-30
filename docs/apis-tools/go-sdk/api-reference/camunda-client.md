---
title: "CamundaClient"
sidebar_label: "CamundaClient"
mdx:
  format: md
---

# CamundaClient

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

CamundaClient is the ergonomic entry point to the Camunda 8 Orchestration
Cluster API. It wraps the generated REST client with configuration,
authentication, adaptive backpressure, and transient retry. Its per-operation
methods are generated in facade_generated.go.

`CamundaClient` exposes **251** methods covering the full Orchestration Cluster REST API surface, with authentication, retries, and backpressure applied automatically.

```go
import camunda "github.com/camunda/orchestration-cluster-api-go"
```

## Constructors

### New

```go
func New(opts ...Option) (*CamundaClient, error)
```

New resolves configuration from environment variables and options, then builds
a ready-to-use client. Options take precedence over the environment.

## Methods

| Method                                                                                                    | Description                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`ActivateAdHocSubProcessActivities`](#activateadhocsubprocessactivities)                                 | ActivateAdHocSubProcessActivities calls the ActivateAdHocSubProcessActivities operation.                                                                                 |
| [`ActivateJobs`](#activatejobs)                                                                           | ActivateJobs calls the ActivateJobs operation.                                                                                                                           |
| [`AssignClientToGroup`](#assignclienttogroup)                                                             | AssignClientToGroup calls the AssignClientToGroup operation.                                                                                                             |
| [`AssignClientToTenant`](#assignclienttotenant)                                                           | AssignClientToTenant calls the AssignClientToTenant operation.                                                                                                           |
| [`AssignGroupToTenant`](#assigngrouptotenant)                                                             | AssignGroupToTenant calls the AssignGroupToTenant operation.                                                                                                             |
| [`AssignMappingRuleToGroup`](#assignmappingruletogroup)                                                   | AssignMappingRuleToGroup calls the AssignMappingRuleToGroup operation.                                                                                                   |
| [`AssignMappingRuleToTenant`](#assignmappingruletotenant)                                                 | AssignMappingRuleToTenant calls the AssignMappingRuleToTenant operation.                                                                                                 |
| [`AssignProcessInstanceBusinessId`](#assignprocessinstancebusinessid)                                     | AssignProcessInstanceBusinessId calls the AssignProcessInstanceBusinessId operation.                                                                                     |
| [`AssignRoleToClient`](#assignroletoclient)                                                               | AssignRoleToClient calls the AssignRoleToClient operation.                                                                                                               |
| [`AssignRoleToGroup`](#assignroletogroup)                                                                 | AssignRoleToGroup calls the AssignRoleToGroup operation.                                                                                                                 |
| [`AssignRoleToMappingRule`](#assignroletomappingrule)                                                     | AssignRoleToMappingRule calls the AssignRoleToMappingRule operation.                                                                                                     |
| [`AssignRoleToTenant`](#assignroletotenant)                                                               | AssignRoleToTenant calls the AssignRoleToTenant operation.                                                                                                               |
| [`AssignRoleToUser`](#assignroletouser)                                                                   | AssignRoleToUser calls the AssignRoleToUser operation.                                                                                                                   |
| [`AssignUserTask`](#assignusertask)                                                                       | AssignUserTask calls the AssignUserTask operation.                                                                                                                       |
| [`AssignUserToGroup`](#assignusertogroup)                                                                 | AssignUserToGroup calls the AssignUserToGroup operation.                                                                                                                 |
| [`AssignUserToTenant`](#assignusertotenant)                                                               | AssignUserToTenant calls the AssignUserToTenant operation.                                                                                                               |
| [`BroadcastSignal`](#broadcastsignal)                                                                     | BroadcastSignal calls the BroadcastSignal operation.                                                                                                                     |
| [`CancelBatchOperation`](#cancelbatchoperation)                                                           | CancelBatchOperation calls the CancelBatchOperation operation.                                                                                                           |
| [`CancelClusterRebalance`](#cancelclusterrebalance)                                                       | CancelClusterRebalance calls the CancelClusterRebalance operation.                                                                                                       |
| [`CancelProcessInstance`](#cancelprocessinstance)                                                         | CancelProcessInstance calls the CancelProcessInstance operation.                                                                                                         |
| [`CancelProcessInstancesBatchOperation`](#cancelprocessinstancesbatchoperation)                           | CancelProcessInstancesBatchOperation calls the CancelProcessInstancesBatchOperation operation.                                                                           |
| [`ChangeClusterMode`](#changeclustermode)                                                                 | ChangeClusterMode calls the ChangeClusterMode operation.                                                                                                                 |
| [`ChangeClusterModeAsClusterAdmin`](#changeclustermodeasclusteradmin)                                     | ChangeClusterModeAsClusterAdmin calls the ChangeClusterModeAsClusterAdmin operation.                                                                                     |
| [`Clock`](#clock)                                                                                         | Clock returns the clock this client resolves cadence through.                                                                                                            |
| [`CompleteJob`](#completejob)                                                                             | CompleteJob calls the CompleteJob operation.                                                                                                                             |
| [`CompleteUserTask`](#completeusertask)                                                                   | CompleteUserTask calls the CompleteUserTask operation.                                                                                                                   |
| [`Config`](#config)                                                                                       | Config returns the resolved configuration.                                                                                                                               |
| [`CorrelateMessage`](#correlatemessage)                                                                   | CorrelateMessage calls the CorrelateMessage operation.                                                                                                                   |
| [`CreateAdminUser`](#createadminuser)                                                                     | CreateAdminUser calls the CreateAdminUser operation.                                                                                                                     |
| [`CreateAgentInstance`](#createagentinstance)                                                             | CreateAgentInstance calls the CreateAgentInstance operation.                                                                                                             |
| [`CreateAuthorization`](#createauthorization)                                                             | CreateAuthorization calls the CreateAuthorization operation.                                                                                                             |
| [`CreateDeployment`](#createdeployment)                                                                   | CreateDeployment calls the CreateDeployment operation.                                                                                                                   |
| [`CreateDocument`](#createdocument)                                                                       | CreateDocument calls the CreateDocument operation.                                                                                                                       |
| [`CreateDocumentLink`](#createdocumentlink)                                                               | CreateDocumentLink calls the CreateDocumentLink operation.                                                                                                               |
| [`CreateDocuments`](#createdocuments)                                                                     | CreateDocuments calls the CreateDocuments operation.                                                                                                                     |
| [`CreateElementInstanceVariables`](#createelementinstancevariables)                                       | CreateElementInstanceVariables calls the CreateElementInstanceVariables operation.                                                                                       |
| [`CreateGlobalClusterVariable`](#createglobalclustervariable)                                             | CreateGlobalClusterVariable calls the CreateGlobalClusterVariable operation.                                                                                             |
| [`CreateGlobalTaskListener`](#createglobaltasklistener)                                                   | CreateGlobalTaskListener calls the CreateGlobalTaskListener operation.                                                                                                   |
| [`CreateGroup`](#creategroup)                                                                             | CreateGroup calls the CreateGroup operation.                                                                                                                             |
| [`CreateMappingRule`](#createmappingrule)                                                                 | CreateMappingRule calls the CreateMappingRule operation.                                                                                                                 |
| [`CreateProcessInstance`](#createprocessinstance)                                                         | CreateProcessInstance creates (starts) a process instance.                                                                                                               |
| [`CreateRole`](#createrole)                                                                               | CreateRole calls the CreateRole operation.                                                                                                                               |
| [`CreateTenant`](#createtenant)                                                                           | CreateTenant calls the CreateTenant operation.                                                                                                                           |
| [`CreateTenantClusterVariable`](#createtenantclustervariable)                                             | CreateTenantClusterVariable calls the CreateTenantClusterVariable operation.                                                                                             |
| [`CreateUser`](#createuser)                                                                               | CreateUser calls the CreateUser operation.                                                                                                                               |
| [`DeleteAuthorization`](#deleteauthorization)                                                             | DeleteAuthorization calls the DeleteAuthorization operation.                                                                                                             |
| [`DeleteDecisionInstance`](#deletedecisioninstance)                                                       | DeleteDecisionInstance calls the DeleteDecisionInstance operation.                                                                                                       |
| [`DeleteDecisionInstancesBatchOperation`](#deletedecisioninstancesbatchoperation)                         | DeleteDecisionInstancesBatchOperation calls the DeleteDecisionInstancesBatchOperation operation.                                                                         |
| [`DeleteDocument`](#deletedocument)                                                                       | DeleteDocument calls the DeleteDocument operation.                                                                                                                       |
| [`DeleteGlobalClusterVariable`](#deleteglobalclustervariable)                                             | DeleteGlobalClusterVariable calls the DeleteGlobalClusterVariable operation.                                                                                             |
| [`DeleteGlobalTaskListener`](#deleteglobaltasklistener)                                                   | DeleteGlobalTaskListener calls the DeleteGlobalTaskListener operation.                                                                                                   |
| [`DeleteGroup`](#deletegroup)                                                                             | DeleteGroup calls the DeleteGroup operation.                                                                                                                             |
| [`DeleteHistoryBackup`](#deletehistorybackup)                                                             | DeleteHistoryBackup calls the DeleteHistoryBackup operation.                                                                                                             |
| [`DeleteHistoryBackupAsClusterAdmin`](#deletehistorybackupasclusteradmin)                                 | DeleteHistoryBackupAsClusterAdmin calls the DeleteHistoryBackupAsClusterAdmin operation.                                                                                 |
| [`DeleteMappingRule`](#deletemappingrule)                                                                 | DeleteMappingRule calls the DeleteMappingRule operation.                                                                                                                 |
| [`DeleteProcessInstance`](#deleteprocessinstance)                                                         | DeleteProcessInstance calls the DeleteProcessInstance operation.                                                                                                         |
| [`DeleteProcessInstancesBatchOperation`](#deleteprocessinstancesbatchoperation)                           | DeleteProcessInstancesBatchOperation calls the DeleteProcessInstancesBatchOperation operation.                                                                           |
| [`DeleteResource`](#deleteresource)                                                                       | DeleteResource calls the DeleteResource operation.                                                                                                                       |
| [`DeleteRole`](#deleterole)                                                                               | DeleteRole calls the DeleteRole operation.                                                                                                                               |
| [`DeleteRuntimeBackup`](#deleteruntimebackup)                                                             | DeleteRuntimeBackup calls the DeleteRuntimeBackup operation.                                                                                                             |
| [`DeleteRuntimeBackupAsClusterAdmin`](#deleteruntimebackupasclusteradmin)                                 | DeleteRuntimeBackupAsClusterAdmin calls the DeleteRuntimeBackupAsClusterAdmin operation.                                                                                 |
| [`DeleteRuntimeBackupState`](#deleteruntimebackupstate)                                                   | DeleteRuntimeBackupState calls the DeleteRuntimeBackupState operation.                                                                                                   |
| [`DeleteRuntimeBackupStateAsClusterAdmin`](#deleteruntimebackupstateasclusteradmin)                       | DeleteRuntimeBackupStateAsClusterAdmin calls the DeleteRuntimeBackupStateAsClusterAdmin operation.                                                                       |
| [`DeleteTenant`](#deletetenant)                                                                           | DeleteTenant calls the DeleteTenant operation.                                                                                                                           |
| [`DeleteTenantClusterVariable`](#deletetenantclustervariable)                                             | DeleteTenantClusterVariable calls the DeleteTenantClusterVariable operation.                                                                                             |
| [`DeleteUser`](#deleteuser)                                                                               | DeleteUser calls the DeleteUser operation.                                                                                                                               |
| [`EvaluateConditionals`](#evaluateconditionals)                                                           | EvaluateConditionals calls the EvaluateConditionals operation.                                                                                                           |
| [`EvaluateDecision`](#evaluatedecision)                                                                   | EvaluateDecision calls the EvaluateDecision operation.                                                                                                                   |
| [`EvaluateExpression`](#evaluateexpression)                                                               | EvaluateExpression calls the EvaluateExpression operation.                                                                                                               |
| [`FailJob`](#failjob)                                                                                     | FailJob calls the FailJob operation.                                                                                                                                     |
| [`GetAgentDefinition`](#getagentdefinition)                                                               | GetAgentDefinition calls the GetAgentDefinition operation.                                                                                                               |
| [`GetAgentInstance`](#getagentinstance)                                                                   | GetAgentInstance calls the GetAgentInstance operation.                                                                                                                   |
| [`GetAuditLog`](#getauditlog)                                                                             | GetAuditLog calls the GetAuditLog operation.                                                                                                                             |
| [`GetAuthentication`](#getauthentication)                                                                 | GetAuthentication calls the GetAuthentication operation.                                                                                                                 |
| [`GetAuthorization`](#getauthorization)                                                                   | GetAuthorization calls the GetAuthorization operation.                                                                                                                   |
| [`GetBatchOperation`](#getbatchoperation)                                                                 | GetBatchOperation calls the GetBatchOperation operation.                                                                                                                 |
| [`GetClusterExportingStatus`](#getclusterexportingstatus)                                                 | GetClusterExportingStatus calls the GetClusterExportingStatus operation.                                                                                                 |
| [`GetClusterRebalance`](#getclusterrebalance)                                                             | GetClusterRebalance calls the GetClusterRebalance operation.                                                                                                             |
| [`GetClusterStatus`](#getclusterstatus)                                                                   | GetClusterStatus calls the GetClusterStatus operation.                                                                                                                   |
| [`GetClusterTopology`](#getclustertopology)                                                               | GetClusterTopology calls the GetClusterTopology operation.                                                                                                               |
| [`GetClusterUpgradeStatus`](#getclusterupgradestatus)                                                     | GetClusterUpgradeStatus calls the GetClusterUpgradeStatus operation.                                                                                                     |
| [`GetDecisionDefinition`](#getdecisiondefinition)                                                         | GetDecisionDefinition calls the GetDecisionDefinition operation.                                                                                                         |
| [`GetDecisionDefinitionXML`](#getdecisiondefinitionxml)                                                   | GetDecisionDefinitionXML calls the GetDecisionDefinitionXML operation.                                                                                                   |
| [`GetDecisionInstance`](#getdecisioninstance)                                                             | GetDecisionInstance calls the GetDecisionInstance operation.                                                                                                             |
| [`GetDecisionRequirements`](#getdecisionrequirements)                                                     | GetDecisionRequirements calls the GetDecisionRequirements operation.                                                                                                     |
| [`GetDecisionRequirementsXML`](#getdecisionrequirementsxml)                                               | GetDecisionRequirementsXML calls the GetDecisionRequirementsXML operation.                                                                                               |
| [`GetDocument`](#getdocument)                                                                             | GetDocument calls the GetDocument operation.                                                                                                                             |
| [`GetElementInstance`](#getelementinstance)                                                               | GetElementInstance calls the GetElementInstance operation.                                                                                                               |
| [`GetExportingStatus`](#getexportingstatus)                                                               | GetExportingStatus calls the GetExportingStatus operation.                                                                                                               |
| [`GetFormByKey`](#getformbykey)                                                                           | GetFormByKey calls the GetFormByKey operation.                                                                                                                           |
| [`GetGlobalClusterVariable`](#getglobalclustervariable)                                                   | GetGlobalClusterVariable calls the GetGlobalClusterVariable operation.                                                                                                   |
| [`GetGlobalJobStatistics`](#getglobaljobstatistics)                                                       | GetGlobalJobStatistics calls the GetGlobalJobStatistics operation.                                                                                                       |
| [`GetGlobalTaskListener`](#getglobaltasklistener)                                                         | GetGlobalTaskListener calls the GetGlobalTaskListener operation.                                                                                                         |
| [`GetGroup`](#getgroup)                                                                                   | GetGroup calls the GetGroup operation.                                                                                                                                   |
| [`GetHistoryBackup`](#gethistorybackup)                                                                   | GetHistoryBackup calls the GetHistoryBackup operation.                                                                                                                   |
| [`GetHistoryBackupAsClusterAdmin`](#gethistorybackupasclusteradmin)                                       | GetHistoryBackupAsClusterAdmin calls the GetHistoryBackupAsClusterAdmin operation.                                                                                       |
| [`GetIncident`](#getincident)                                                                             | GetIncident calls the GetIncident operation.                                                                                                                             |
| [`GetJobErrorStatistics`](#getjoberrorstatistics)                                                         | GetJobErrorStatistics calls the GetJobErrorStatistics operation.                                                                                                         |
| [`GetJobTimeSeriesStatistics`](#getjobtimeseriesstatistics)                                               | GetJobTimeSeriesStatistics calls the GetJobTimeSeriesStatistics operation.                                                                                               |
| [`GetJobTypeStatistics`](#getjobtypestatistics)                                                           | GetJobTypeStatistics calls the GetJobTypeStatistics operation.                                                                                                           |
| [`GetJobWorkerStatistics`](#getjobworkerstatistics)                                                       | GetJobWorkerStatistics calls the GetJobWorkerStatistics operation.                                                                                                       |
| [`GetLicense`](#getlicense)                                                                               | GetLicense calls the GetLicense operation.                                                                                                                               |
| [`GetMappingRule`](#getmappingrule)                                                                       | GetMappingRule calls the GetMappingRule operation.                                                                                                                       |
| [`GetProcessDefinition`](#getprocessdefinition)                                                           | GetProcessDefinition calls the GetProcessDefinition operation.                                                                                                           |
| [`GetProcessDefinitionInstanceStatistics`](#getprocessdefinitioninstancestatistics)                       | GetProcessDefinitionInstanceStatistics calls the GetProcessDefinitionInstanceStatistics operation.                                                                       |
| [`GetProcessDefinitionInstanceVersionStatistics`](#getprocessdefinitioninstanceversionstatistics)         | GetProcessDefinitionInstanceVersionStatistics calls the GetProcessDefinitionInstanceVersionStatistics operation.                                                         |
| [`GetProcessDefinitionMessageSubscriptionStatistics`](#getprocessdefinitionmessagesubscriptionstatistics) | GetProcessDefinitionMessageSubscriptionStatistics calls the GetProcessDefinitionMessageSubscriptionStatistics operation.                                                 |
| [`GetProcessDefinitionStatistics`](#getprocessdefinitionstatistics)                                       | GetProcessDefinitionStatistics calls the GetProcessDefinitionStatistics operation.                                                                                       |
| [`GetProcessDefinitionXML`](#getprocessdefinitionxml)                                                     | GetProcessDefinitionXML calls the GetProcessDefinitionXML operation.                                                                                                     |
| [`GetProcessInstance`](#getprocessinstance)                                                               | GetProcessInstance calls the GetProcessInstance operation.                                                                                                               |
| [`GetProcessInstanceCallHierarchy`](#getprocessinstancecallhierarchy)                                     | GetProcessInstanceCallHierarchy calls the GetProcessInstanceCallHierarchy operation.                                                                                     |
| [`GetProcessInstanceSequenceFlows`](#getprocessinstancesequenceflows)                                     | GetProcessInstanceSequenceFlows calls the GetProcessInstanceSequenceFlows operation.                                                                                     |
| [`GetProcessInstanceStatistics`](#getprocessinstancestatistics)                                           | GetProcessInstanceStatistics calls the GetProcessInstanceStatistics operation.                                                                                           |
| [`GetProcessInstanceStatisticsByDefinition`](#getprocessinstancestatisticsbydefinition)                   | GetProcessInstanceStatisticsByDefinition calls the GetProcessInstanceStatisticsByDefinition operation.                                                                   |
| [`GetProcessInstanceStatisticsByError`](#getprocessinstancestatisticsbyerror)                             | GetProcessInstanceStatisticsByError calls the GetProcessInstanceStatisticsByError operation.                                                                             |
| [`GetProcessInstanceWaitStateStatistics`](#getprocessinstancewaitstatestatistics)                         | GetProcessInstanceWaitStateStatistics calls the GetProcessInstanceWaitStateStatistics operation.                                                                         |
| [`GetResource`](#getresource)                                                                             | GetResource calls the GetResource operation.                                                                                                                             |
| [`GetResourceContent`](#getresourcecontent)                                                               | GetResourceContent calls the GetResourceContent operation.                                                                                                               |
| [`GetResourceContentBinary`](#getresourcecontentbinary)                                                   | GetResourceContentBinary calls the GetResourceContentBinary operation.                                                                                                   |
| [`GetRestoreStatus`](#getrestorestatus)                                                                   | GetRestoreStatus calls the GetRestoreStatus operation.                                                                                                                   |
| [`GetRole`](#getrole)                                                                                     | GetRole calls the GetRole operation.                                                                                                                                     |
| [`GetRuntimeBackup`](#getruntimebackup)                                                                   | GetRuntimeBackup calls the GetRuntimeBackup operation.                                                                                                                   |
| [`GetRuntimeBackupAsClusterAdmin`](#getruntimebackupasclusteradmin)                                       | GetRuntimeBackupAsClusterAdmin calls the GetRuntimeBackupAsClusterAdmin operation.                                                                                       |
| [`GetRuntimeBackupState`](#getruntimebackupstate)                                                         | GetRuntimeBackupState calls the GetRuntimeBackupState operation.                                                                                                         |
| [`GetRuntimeBackupStateAsClusterAdmin`](#getruntimebackupstateasclusteradmin)                             | GetRuntimeBackupStateAsClusterAdmin calls the GetRuntimeBackupStateAsClusterAdmin operation.                                                                             |
| [`GetStartProcessForm`](#getstartprocessform)                                                             | GetStartProcessForm calls the GetStartProcessForm operation.                                                                                                             |
| [`GetStatus`](#getstatus)                                                                                 | GetStatus calls the GetStatus operation.                                                                                                                                 |
| [`GetSystemConfiguration`](#getsystemconfiguration)                                                       | GetSystemConfiguration calls the GetSystemConfiguration operation.                                                                                                       |
| [`GetTenant`](#gettenant)                                                                                 | GetTenant calls the GetTenant operation.                                                                                                                                 |
| [`GetTenantClusterVariable`](#gettenantclustervariable)                                                   | GetTenantClusterVariable calls the GetTenantClusterVariable operation.                                                                                                   |
| [`GetTopology`](#gettopology)                                                                             | GetTopology calls the GetTopology operation.                                                                                                                             |
| [`GetUsageMetrics`](#getusagemetrics)                                                                     | GetUsageMetrics calls the GetUsageMetrics operation.                                                                                                                     |
| [`GetUser`](#getuser)                                                                                     | GetUser calls the GetUser operation.                                                                                                                                     |
| [`GetUserTask`](#getusertask)                                                                             | GetUserTask calls the GetUserTask operation.                                                                                                                             |
| [`GetUserTaskForm`](#getusertaskform)                                                                     | GetUserTaskForm calls the GetUserTaskForm operation.                                                                                                                     |
| [`GetVariable`](#getvariable)                                                                             | GetVariable calls the GetVariable operation.                                                                                                                             |
| [`ListHistoryBackups`](#listhistorybackups)                                                               | ListHistoryBackups calls the ListHistoryBackups operation.                                                                                                               |
| [`ListHistoryBackupsAsClusterAdmin`](#listhistorybackupsasclusteradmin)                                   | ListHistoryBackupsAsClusterAdmin calls the ListHistoryBackupsAsClusterAdmin operation.                                                                                   |
| [`ListRuntimeBackups`](#listruntimebackups)                                                               | ListRuntimeBackups calls the ListRuntimeBackups operation.                                                                                                               |
| [`ListRuntimeBackupsAsClusterAdmin`](#listruntimebackupsasclusteradmin)                                   | ListRuntimeBackupsAsClusterAdmin calls the ListRuntimeBackupsAsClusterAdmin operation.                                                                                   |
| [`ListSecrets`](#listsecrets)                                                                             | ListSecrets calls the ListSecrets operation.                                                                                                                             |
| [`MigrateProcessInstance`](#migrateprocessinstance)                                                       | MigrateProcessInstance calls the MigrateProcessInstance operation.                                                                                                       |
| [`MigrateProcessInstancesBatchOperation`](#migrateprocessinstancesbatchoperation)                         | MigrateProcessInstancesBatchOperation calls the MigrateProcessInstancesBatchOperation operation.                                                                         |
| [`ModifyProcessInstance`](#modifyprocessinstance)                                                         | ModifyProcessInstance calls the ModifyProcessInstance operation.                                                                                                         |
| [`ModifyProcessInstancesBatchOperation`](#modifyprocessinstancesbatchoperation)                           | ModifyProcessInstancesBatchOperation calls the ModifyProcessInstancesBatchOperation operation.                                                                           |
| [`NewJobWorker`](#newjobworker)                                                                           | NewJobWorker creates a worker for jobType. Defaults are seeded from the client's CAMUNDA_WORKER_* configuration and can be overridden with options.                      |
| [`NewStreamJobWorker`](#newstreamjobworker)                                                               | NewStreamJobWorker creates a gRPC streaming worker for jobType. Defaults are seeded from the client's CAMUNDA_WORKER_* configuration and can be overridden with options. |
| [`PauseClusterExporting`](#pauseclusterexporting)                                                         | PauseClusterExporting calls the PauseClusterExporting operation.                                                                                                         |
| [`PauseExporting`](#pauseexporting)                                                                       | PauseExporting calls the PauseExporting operation.                                                                                                                       |
| [`PinAt`](#pinat)                                                                                         | PinAt moves the engine clock to t.                                                                                                                                       |
| [`PinClock`](#pinclock)                                                                                   | PinClock calls the PinClock operation.                                                                                                                                   |
| [`PublishMessage`](#publishmessage)                                                                       | PublishMessage calls the PublishMessage operation.                                                                                                                       |
| [`Raw`](#raw)                                                                                             | Raw returns the underlying generated client for operations or options not yet surfaced on the ergonomic facade.                                                          |
| [`ResetClock`](#resetclock)                                                                               | ResetClock calls the ResetClock operation.                                                                                                                               |
| [`ResetToLive`](#resettolive)                                                                             | ResetToLive returns the engine clock to real time.                                                                                                                       |
| [`ResolveIncident`](#resolveincident)                                                                     | ResolveIncident calls the ResolveIncident operation.                                                                                                                     |
| [`ResolveIncidentsBatchOperation`](#resolveincidentsbatchoperation)                                       | ResolveIncidentsBatchOperation calls the ResolveIncidentsBatchOperation operation.                                                                                       |
| [`ResolveProcessInstanceIncidents`](#resolveprocessinstanceincidents)                                     | ResolveProcessInstanceIncidents calls the ResolveProcessInstanceIncidents operation.                                                                                     |
| [`ResolveSecrets`](#resolvesecrets)                                                                       | ResolveSecrets calls the ResolveSecrets operation.                                                                                                                       |
| [`Restore`](#restore)                                                                                     | Restore calls the Restore operation.                                                                                                                                     |
| [`RestoreAsClusterAdmin`](#restoreasclusteradmin)                                                         | RestoreAsClusterAdmin calls the RestoreAsClusterAdmin operation.                                                                                                         |
| [`ResumeBatchOperation`](#resumebatchoperation)                                                           | ResumeBatchOperation calls the ResumeBatchOperation operation.                                                                                                           |
| [`ResumeClusterExporting`](#resumeclusterexporting)                                                       | ResumeClusterExporting calls the ResumeClusterExporting operation.                                                                                                       |
| [`ResumeExporting`](#resumeexporting)                                                                     | ResumeExporting calls the ResumeExporting operation.                                                                                                                     |
| [`ResumeProcessInstance`](#resumeprocessinstance)                                                         | ResumeProcessInstance calls the ResumeProcessInstance operation.                                                                                                         |
| [`ResumeProcessInstancesBatchOperation`](#resumeprocessinstancesbatchoperation)                           | ResumeProcessInstancesBatchOperation calls the ResumeProcessInstancesBatchOperation operation.                                                                           |
| [`SearchAgentDefinitions`](#searchagentdefinitions)                                                       | SearchAgentDefinitions calls the SearchAgentDefinitions operation.                                                                                                       |
| [`SearchAgentInstanceHistory`](#searchagentinstancehistory)                                               | SearchAgentInstanceHistory calls the SearchAgentInstanceHistory operation.                                                                                               |
| [`SearchAgentInstances`](#searchagentinstances)                                                           | SearchAgentInstances calls the SearchAgentInstances operation.                                                                                                           |
| [`SearchAuditLogs`](#searchauditlogs)                                                                     | SearchAuditLogs calls the SearchAuditLogs operation.                                                                                                                     |
| [`SearchAuthorizations`](#searchauthorizations)                                                           | SearchAuthorizations calls the SearchAuthorizations operation.                                                                                                           |
| [`SearchBatchOperationItems`](#searchbatchoperationitems)                                                 | SearchBatchOperationItems calls the SearchBatchOperationItems operation.                                                                                                 |
| [`SearchBatchOperations`](#searchbatchoperations)                                                         | SearchBatchOperations calls the SearchBatchOperations operation.                                                                                                         |
| [`SearchClientsForGroup`](#searchclientsforgroup)                                                         | SearchClientsForGroup calls the SearchClientsForGroup operation.                                                                                                         |
| [`SearchClientsForRole`](#searchclientsforrole)                                                           | SearchClientsForRole calls the SearchClientsForRole operation.                                                                                                           |
| [`SearchClientsForTenant`](#searchclientsfortenant)                                                       | SearchClientsForTenant calls the SearchClientsForTenant operation.                                                                                                       |
| [`SearchClusterVariables`](#searchclustervariables)                                                       | SearchClusterVariables calls the SearchClusterVariables operation.                                                                                                       |
| [`SearchCorrelatedMessageSubscriptions`](#searchcorrelatedmessagesubscriptions)                           | SearchCorrelatedMessageSubscriptions calls the SearchCorrelatedMessageSubscriptions operation.                                                                           |
| [`SearchDecisionDefinitions`](#searchdecisiondefinitions)                                                 | SearchDecisionDefinitions calls the SearchDecisionDefinitions operation.                                                                                                 |
| [`SearchDecisionInstances`](#searchdecisioninstances)                                                     | SearchDecisionInstances calls the SearchDecisionInstances operation.                                                                                                     |
| [`SearchDecisionRequirements`](#searchdecisionrequirements)                                               | SearchDecisionRequirements calls the SearchDecisionRequirements operation.                                                                                               |
| [`SearchElementInstanceIncidents`](#searchelementinstanceincidents)                                       | SearchElementInstanceIncidents calls the SearchElementInstanceIncidents operation.                                                                                       |
| [`SearchElementInstanceWaitStates`](#searchelementinstancewaitstates)                                     | SearchElementInstanceWaitStates calls the SearchElementInstanceWaitStates operation.                                                                                     |
| [`SearchElementInstances`](#searchelementinstances)                                                       | SearchElementInstances calls the SearchElementInstances operation.                                                                                                       |
| [`SearchGlobalTaskListeners`](#searchglobaltasklisteners)                                                 | SearchGlobalTaskListeners calls the SearchGlobalTaskListeners operation.                                                                                                 |
| [`SearchGroupIdsForTenant`](#searchgroupidsfortenant)                                                     | SearchGroupIdsForTenant calls the SearchGroupIdsForTenant operation.                                                                                                     |
| [`SearchGroups`](#searchgroups)                                                                           | SearchGroups calls the SearchGroups operation.                                                                                                                           |
| [`SearchGroupsForRole`](#searchgroupsforrole)                                                             | SearchGroupsForRole calls the SearchGroupsForRole operation.                                                                                                             |
| [`SearchIncidents`](#searchincidents)                                                                     | SearchIncidents calls the SearchIncidents operation.                                                                                                                     |
| [`SearchJobs`](#searchjobs)                                                                               | SearchJobs calls the SearchJobs operation.                                                                                                                               |
| [`SearchMappingRule`](#searchmappingrule)                                                                 | SearchMappingRule calls the SearchMappingRule operation.                                                                                                                 |
| [`SearchMappingRulesForGroup`](#searchmappingrulesforgroup)                                               | SearchMappingRulesForGroup calls the SearchMappingRulesForGroup operation.                                                                                               |
| [`SearchMappingRulesForRole`](#searchmappingrulesforrole)                                                 | SearchMappingRulesForRole calls the SearchMappingRulesForRole operation.                                                                                                 |
| [`SearchMappingRulesForTenant`](#searchmappingrulesfortenant)                                             | SearchMappingRulesForTenant calls the SearchMappingRulesForTenant operation.                                                                                             |
| [`SearchMessageSubscriptions`](#searchmessagesubscriptions)                                               | SearchMessageSubscriptions calls the SearchMessageSubscriptions operation.                                                                                               |
| [`SearchOwnAuthorizations`](#searchownauthorizations)                                                     | SearchOwnAuthorizations calls the SearchOwnAuthorizations operation.                                                                                                     |
| [`SearchProcessDefinitionVariableNames`](#searchprocessdefinitionvariablenames)                           | SearchProcessDefinitionVariableNames calls the SearchProcessDefinitionVariableNames operation.                                                                           |
| [`SearchProcessDefinitions`](#searchprocessdefinitions)                                                   | SearchProcessDefinitions calls the SearchProcessDefinitions operation.                                                                                                   |
| [`SearchProcessInstanceIncidents`](#searchprocessinstanceincidents)                                       | SearchProcessInstanceIncidents calls the SearchProcessInstanceIncidents operation.                                                                                       |
| [`SearchProcessInstances`](#searchprocessinstances)                                                       | SearchProcessInstances calls the SearchProcessInstances operation.                                                                                                       |
| [`SearchResources`](#searchresources)                                                                     | SearchResources calls the SearchResources operation.                                                                                                                     |
| [`SearchRoles`](#searchroles)                                                                             | SearchRoles calls the SearchRoles operation.                                                                                                                             |
| [`SearchRolesForGroup`](#searchrolesforgroup)                                                             | SearchRolesForGroup calls the SearchRolesForGroup operation.                                                                                                             |
| [`SearchRolesForTenant`](#searchrolesfortenant)                                                           | SearchRolesForTenant calls the SearchRolesForTenant operation.                                                                                                           |
| [`SearchTenants`](#searchtenants)                                                                         | SearchTenants calls the SearchTenants operation.                                                                                                                         |
| [`SearchUserTaskAuditLogs`](#searchusertaskauditlogs)                                                     | SearchUserTaskAuditLogs calls the SearchUserTaskAuditLogs operation.                                                                                                     |
| [`SearchUserTaskEffectiveVariables`](#searchusertaskeffectivevariables)                                   | SearchUserTaskEffectiveVariables calls the SearchUserTaskEffectiveVariables operation.                                                                                   |
| [`SearchUserTaskVariables`](#searchusertaskvariables)                                                     | SearchUserTaskVariables calls the SearchUserTaskVariables operation.                                                                                                     |
| [`SearchUserTasks`](#searchusertasks)                                                                     | SearchUserTasks calls the SearchUserTasks operation.                                                                                                                     |
| [`SearchUsers`](#searchusers)                                                                             | SearchUsers calls the SearchUsers operation.                                                                                                                             |
| [`SearchUsersForGroup`](#searchusersforgroup)                                                             | SearchUsersForGroup calls the SearchUsersForGroup operation.                                                                                                             |
| [`SearchUsersForRole`](#searchusersforrole)                                                               | SearchUsersForRole calls the SearchUsersForRole operation.                                                                                                               |
| [`SearchUsersForTenant`](#searchusersfortenant)                                                           | SearchUsersForTenant calls the SearchUsersForTenant operation.                                                                                                           |
| [`SearchVariables`](#searchvariables)                                                                     | SearchVariables calls the SearchVariables operation.                                                                                                                     |
| [`SuspendBatchOperation`](#suspendbatchoperation)                                                         | SuspendBatchOperation calls the SuspendBatchOperation operation.                                                                                                         |
| [`SuspendProcessInstance`](#suspendprocessinstance)                                                       | SuspendProcessInstance calls the SuspendProcessInstance operation.                                                                                                       |
| [`SuspendProcessInstancesBatchOperation`](#suspendprocessinstancesbatchoperation)                         | SuspendProcessInstancesBatchOperation calls the SuspendProcessInstancesBatchOperation operation.                                                                         |
| [`SyncRuntimeBackupState`](#syncruntimebackupstate)                                                       | SyncRuntimeBackupState calls the SyncRuntimeBackupState operation.                                                                                                       |
| [`SyncRuntimeBackupStateAsClusterAdmin`](#syncruntimebackupstateasclusteradmin)                           | SyncRuntimeBackupStateAsClusterAdmin calls the SyncRuntimeBackupStateAsClusterAdmin operation.                                                                           |
| [`TakeHistoryBackup`](#takehistorybackup)                                                                 | TakeHistoryBackup calls the TakeHistoryBackup operation.                                                                                                                 |
| [`TakeHistoryBackupAsClusterAdmin`](#takehistorybackupasclusteradmin)                                     | TakeHistoryBackupAsClusterAdmin calls the TakeHistoryBackupAsClusterAdmin operation.                                                                                     |
| [`TakeRuntimeBackup`](#takeruntimebackup)                                                                 | TakeRuntimeBackup calls the TakeRuntimeBackup operation.                                                                                                                 |
| [`TakeRuntimeBackupAsClusterAdmin`](#takeruntimebackupasclusteradmin)                                     | TakeRuntimeBackupAsClusterAdmin calls the TakeRuntimeBackupAsClusterAdmin operation.                                                                                     |
| [`ThrowJobError`](#throwjoberror)                                                                         | ThrowJobError calls the ThrowJobError operation.                                                                                                                         |
| [`TriggerClusterRebalance`](#triggerclusterrebalance)                                                     | TriggerClusterRebalance calls the TriggerClusterRebalance operation.                                                                                                     |
| [`UnassignClientFromGroup`](#unassignclientfromgroup)                                                     | UnassignClientFromGroup calls the UnassignClientFromGroup operation.                                                                                                     |
| [`UnassignClientFromTenant`](#unassignclientfromtenant)                                                   | UnassignClientFromTenant calls the UnassignClientFromTenant operation.                                                                                                   |
| [`UnassignGroupFromTenant`](#unassigngroupfromtenant)                                                     | UnassignGroupFromTenant calls the UnassignGroupFromTenant operation.                                                                                                     |
| [`UnassignMappingRuleFromGroup`](#unassignmappingrulefromgroup)                                           | UnassignMappingRuleFromGroup calls the UnassignMappingRuleFromGroup operation.                                                                                           |
| [`UnassignMappingRuleFromTenant`](#unassignmappingrulefromtenant)                                         | UnassignMappingRuleFromTenant calls the UnassignMappingRuleFromTenant operation.                                                                                         |
| [`UnassignRoleFromClient`](#unassignrolefromclient)                                                       | UnassignRoleFromClient calls the UnassignRoleFromClient operation.                                                                                                       |
| [`UnassignRoleFromGroup`](#unassignrolefromgroup)                                                         | UnassignRoleFromGroup calls the UnassignRoleFromGroup operation.                                                                                                         |
| [`UnassignRoleFromMappingRule`](#unassignrolefrommappingrule)                                             | UnassignRoleFromMappingRule calls the UnassignRoleFromMappingRule operation.                                                                                             |
| [`UnassignRoleFromTenant`](#unassignrolefromtenant)                                                       | UnassignRoleFromTenant calls the UnassignRoleFromTenant operation.                                                                                                       |
| [`UnassignRoleFromUser`](#unassignrolefromuser)                                                           | UnassignRoleFromUser calls the UnassignRoleFromUser operation.                                                                                                           |
| [`UnassignUserFromGroup`](#unassignuserfromgroup)                                                         | UnassignUserFromGroup calls the UnassignUserFromGroup operation.                                                                                                         |
| [`UnassignUserFromTenant`](#unassignuserfromtenant)                                                       | UnassignUserFromTenant calls the UnassignUserFromTenant operation.                                                                                                       |
| [`UnassignUserTask`](#unassignusertask)                                                                   | UnassignUserTask calls the UnassignUserTask operation.                                                                                                                   |
| [`UpdateAgentInstance`](#updateagentinstance)                                                             | UpdateAgentInstance calls the UpdateAgentInstance operation.                                                                                                             |
| [`UpdateAuthorization`](#updateauthorization)                                                             | UpdateAuthorization calls the UpdateAuthorization operation.                                                                                                             |
| [`UpdateGlobalClusterVariable`](#updateglobalclustervariable)                                             | UpdateGlobalClusterVariable calls the UpdateGlobalClusterVariable operation.                                                                                             |
| [`UpdateGlobalTaskListener`](#updateglobaltasklistener)                                                   | UpdateGlobalTaskListener calls the UpdateGlobalTaskListener operation.                                                                                                   |
| [`UpdateGroup`](#updategroup)                                                                             | UpdateGroup calls the UpdateGroup operation.                                                                                                                             |
| [`UpdateJob`](#updatejob)                                                                                 | UpdateJob calls the UpdateJob operation.                                                                                                                                 |
| [`UpdateJobsBatchOperation`](#updatejobsbatchoperation)                                                   | UpdateJobsBatchOperation calls the UpdateJobsBatchOperation operation.                                                                                                   |
| [`UpdateMappingRule`](#updatemappingrule)                                                                 | UpdateMappingRule calls the UpdateMappingRule operation.                                                                                                                 |
| [`UpdateRole`](#updaterole)                                                                               | UpdateRole calls the UpdateRole operation.                                                                                                                               |
| [`UpdateTenant`](#updatetenant)                                                                           | UpdateTenant calls the UpdateTenant operation.                                                                                                                           |
| [`UpdateTenantClusterVariable`](#updatetenantclustervariable)                                             | UpdateTenantClusterVariable calls the UpdateTenantClusterVariable operation.                                                                                             |
| [`UpdateUser`](#updateuser)                                                                               | UpdateUser calls the UpdateUser operation.                                                                                                                               |
| [`UpdateUserTask`](#updateusertask)                                                                       | UpdateUserTask calls the UpdateUserTask operation.                                                                                                                       |

## Method details

### ActivateAdHocSubProcessActivities

```go
func (c *CamundaClient) ActivateAdHocSubProcessActivities(ctx context.Context, adHocSubProcessInstanceKey ElementInstanceKey, body AdHocSubProcessActivateActivitiesInstruction, opts ...func(ApiActivateAdHocSubProcessActivitiesRequest) ApiActivateAdHocSubProcessActivitiesRequest) error
```

**Types:** [`ElementInstanceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ElementInstanceKey), [`AdHocSubProcessActivateActivitiesInstruction`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AdHocSubProcessActivateActivitiesInstruction), [`ApiActivateAdHocSubProcessActivitiesRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiActivateAdHocSubProcessActivitiesRequest)

ActivateAdHocSubProcessActivities calls the ActivateAdHocSubProcessActivities operation.

Example:

```go
instruction := camunda.NewAdHocSubProcessActivateActivitiesInstruction(
	[]camunda.AdHocSubProcessActivateActivityReference{
		*camunda.NewAdHocSubProcessActivateActivityReference("review-task"),
	})

return client.ActivateAdHocSubProcessActivities(ctx,
	camunda.MustElementInstanceKey("2251799813685360"), *instruction)
```

### ActivateJobs

```go
func (c *CamundaClient) ActivateJobs(ctx context.Context, body JobActivationRequest, opts ...func(ApiActivateJobsRequest) ApiActivateJobsRequest) (*JobActivationResult, error)
```

**Types:** [`JobActivationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#JobActivationRequest), [`ApiActivateJobsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiActivateJobsRequest), [`JobActivationResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#JobActivationResult)

ActivateJobs calls the ActivateJobs operation.

Example:

```go
// Activate up to 10 "greet" jobs with a 60s activation timeout.
req := camunda.NewJobActivationRequest("greet", 60_000, 10)
req.SetWorker("greet-worker")

result, err := client.ActivateJobs(ctx, *req)
if err != nil {
	return err
}
for _, job := range result.GetJobs() {
	fmt.Printf("activated job %v\n", job.GetJobKey())
}
```

### AssignClientToGroup

```go
func (c *CamundaClient) AssignClientToGroup(ctx context.Context, groupId string, clientId string, opts ...func(ApiAssignClientToGroupRequest) ApiAssignClientToGroupRequest) error
```

**Types:** [`ApiAssignClientToGroupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiAssignClientToGroupRequest)

AssignClientToGroup calls the AssignClientToGroup operation.

Example:

```go
return client.AssignClientToGroup(ctx, "finance", "reporting-service")
```

### AssignClientToTenant

```go
func (c *CamundaClient) AssignClientToTenant(ctx context.Context, tenantId string, clientId string, opts ...func(ApiAssignClientToTenantRequest) ApiAssignClientToTenantRequest) error
```

**Types:** [`ApiAssignClientToTenantRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiAssignClientToTenantRequest)

AssignClientToTenant calls the AssignClientToTenant operation.

Example:

```go
return client.AssignClientToTenant(ctx, "tenant-a", "reporting-service")
```

### AssignGroupToTenant

```go
func (c *CamundaClient) AssignGroupToTenant(ctx context.Context, tenantId string, groupId string, opts ...func(ApiAssignGroupToTenantRequest) ApiAssignGroupToTenantRequest) error
```

**Types:** [`ApiAssignGroupToTenantRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiAssignGroupToTenantRequest)

AssignGroupToTenant calls the AssignGroupToTenant operation.

Example:

```go
return client.AssignGroupToTenant(ctx, "tenant-a", "finance")
```

### AssignMappingRuleToGroup

```go
func (c *CamundaClient) AssignMappingRuleToGroup(ctx context.Context, groupId string, mappingRuleId string, opts ...func(ApiAssignMappingRuleToGroupRequest) ApiAssignMappingRuleToGroupRequest) error
```

**Types:** [`ApiAssignMappingRuleToGroupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiAssignMappingRuleToGroupRequest)

AssignMappingRuleToGroup calls the AssignMappingRuleToGroup operation.

Example:

```go
return client.AssignMappingRuleToGroup(ctx, "finance", "sso-auditors")
```

### AssignMappingRuleToTenant

```go
func (c *CamundaClient) AssignMappingRuleToTenant(ctx context.Context, tenantId string, mappingRuleId string, opts ...func(ApiAssignMappingRuleToTenantRequest) ApiAssignMappingRuleToTenantRequest) error
```

**Types:** [`ApiAssignMappingRuleToTenantRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiAssignMappingRuleToTenantRequest)

AssignMappingRuleToTenant calls the AssignMappingRuleToTenant operation.

Example:

```go
return client.AssignMappingRuleToTenant(ctx, "tenant-a", "sso-auditors")
```

### AssignProcessInstanceBusinessId

```go
func (c *CamundaClient) AssignProcessInstanceBusinessId(ctx context.Context, processInstanceKey ProcessInstanceKey, body ProcessInstanceBusinessIdAssignmentInstruction, opts ...func(ApiAssignProcessInstanceBusinessIdRequest) ApiAssignProcessInstanceBusinessIdRequest) error
```

**Types:** [`ProcessInstanceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceKey), [`ProcessInstanceBusinessIdAssignmentInstruction`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceBusinessIdAssignmentInstruction), [`ApiAssignProcessInstanceBusinessIdRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiAssignProcessInstanceBusinessIdRequest)

AssignProcessInstanceBusinessId calls the AssignProcessInstanceBusinessId operation.

Example:

```go
return client.AssignProcessInstanceBusinessId(ctx,
	camunda.MustProcessInstanceKey("2251799813685340"),
	*camunda.NewProcessInstanceBusinessIdAssignmentInstruction("order-42"))
```

### AssignRoleToClient

```go
func (c *CamundaClient) AssignRoleToClient(ctx context.Context, roleId string, clientId string, opts ...func(ApiAssignRoleToClientRequest) ApiAssignRoleToClientRequest) error
```

**Types:** [`ApiAssignRoleToClientRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiAssignRoleToClientRequest)

AssignRoleToClient calls the AssignRoleToClient operation.

Example:

```go
return client.AssignRoleToClient(ctx, "auditor", "reporting-service")
```

### AssignRoleToGroup

```go
func (c *CamundaClient) AssignRoleToGroup(ctx context.Context, roleId string, groupId string, opts ...func(ApiAssignRoleToGroupRequest) ApiAssignRoleToGroupRequest) error
```

**Types:** [`ApiAssignRoleToGroupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiAssignRoleToGroupRequest)

AssignRoleToGroup calls the AssignRoleToGroup operation.

Example:

```go
return client.AssignRoleToGroup(ctx, "auditor", "finance")
```

### AssignRoleToMappingRule

```go
func (c *CamundaClient) AssignRoleToMappingRule(ctx context.Context, roleId string, mappingRuleId string, opts ...func(ApiAssignRoleToMappingRuleRequest) ApiAssignRoleToMappingRuleRequest) error
```

**Types:** [`ApiAssignRoleToMappingRuleRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiAssignRoleToMappingRuleRequest)

AssignRoleToMappingRule calls the AssignRoleToMappingRule operation.

Example:

```go
return client.AssignRoleToMappingRule(ctx, "auditor", "sso-auditors")
```

### AssignRoleToTenant

```go
func (c *CamundaClient) AssignRoleToTenant(ctx context.Context, tenantId string, roleId string, opts ...func(ApiAssignRoleToTenantRequest) ApiAssignRoleToTenantRequest) error
```

**Types:** [`ApiAssignRoleToTenantRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiAssignRoleToTenantRequest)

AssignRoleToTenant calls the AssignRoleToTenant operation.

Example:

```go
return client.AssignRoleToTenant(ctx, "tenant-a", "auditor")
```

### AssignRoleToUser

```go
func (c *CamundaClient) AssignRoleToUser(ctx context.Context, roleId string, username string, opts ...func(ApiAssignRoleToUserRequest) ApiAssignRoleToUserRequest) error
```

**Types:** [`ApiAssignRoleToUserRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiAssignRoleToUserRequest)

AssignRoleToUser calls the AssignRoleToUser operation.

Example:

```go
return client.AssignRoleToUser(ctx, "auditor", "alice")
```

### AssignUserTask

```go
func (c *CamundaClient) AssignUserTask(ctx context.Context, userTaskKey UserTaskKey, body UserTaskAssignmentRequest, opts ...func(ApiAssignUserTaskRequest) ApiAssignUserTaskRequest) error
```

**Types:** [`UserTaskKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserTaskKey), [`UserTaskAssignmentRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserTaskAssignmentRequest), [`ApiAssignUserTaskRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiAssignUserTaskRequest)

AssignUserTask calls the AssignUserTask operation.

Example:

```go
req := camunda.NewUserTaskAssignmentRequest()
req.SetAssignee("alice")

return client.AssignUserTask(ctx, camunda.MustUserTaskKey("2251799813685380"), *req)
```

### AssignUserToGroup

```go
func (c *CamundaClient) AssignUserToGroup(ctx context.Context, groupId string, username string, opts ...func(ApiAssignUserToGroupRequest) ApiAssignUserToGroupRequest) error
```

**Types:** [`ApiAssignUserToGroupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiAssignUserToGroupRequest)

AssignUserToGroup calls the AssignUserToGroup operation.

Example:

```go
return client.AssignUserToGroup(ctx, "finance", "alice")
```

### AssignUserToTenant

```go
func (c *CamundaClient) AssignUserToTenant(ctx context.Context, tenantId string, username string, opts ...func(ApiAssignUserToTenantRequest) ApiAssignUserToTenantRequest) error
```

**Types:** [`ApiAssignUserToTenantRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiAssignUserToTenantRequest)

AssignUserToTenant calls the AssignUserToTenant operation.

Example:

```go
return client.AssignUserToTenant(ctx, "tenant-a", "alice")
```

### BroadcastSignal

```go
func (c *CamundaClient) BroadcastSignal(ctx context.Context, body SignalBroadcastRequest, opts ...func(ApiBroadcastSignalRequest) ApiBroadcastSignalRequest) (*SignalBroadcastResult, error)
```

**Types:** [`SignalBroadcastRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#SignalBroadcastRequest), [`ApiBroadcastSignalRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiBroadcastSignalRequest), [`SignalBroadcastResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#SignalBroadcastResult)

BroadcastSignal calls the BroadcastSignal operation.

Example:

```go
req := camunda.NewSignalBroadcastRequest("cancel-all-orders")
req.SetVariables(map[string]any{"reason": "maintenance"})

result, err := client.BroadcastSignal(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CancelBatchOperation

```go
func (c *CamundaClient) CancelBatchOperation(ctx context.Context, batchOperationKey string, opts ...func(ApiCancelBatchOperationRequest) ApiCancelBatchOperationRequest) error
```

**Types:** [`ApiCancelBatchOperationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCancelBatchOperationRequest)

CancelBatchOperation calls the CancelBatchOperation operation.

Example:

```go
return client.CancelBatchOperation(ctx, "2251799813685290")
```

### CancelClusterRebalance

```go
func (c *CamundaClient) CancelClusterRebalance(ctx context.Context, opts ...func(ApiCancelClusterRebalanceRequest) ApiCancelClusterRebalanceRequest) (*RebalanceCancellationResponse, error)
```

**Types:** [`ApiCancelClusterRebalanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCancelClusterRebalanceRequest), [`RebalanceCancellationResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#RebalanceCancellationResponse)

CancelClusterRebalance calls the CancelClusterRebalance operation.

Example:

```go
// Requires cluster-admin credentials (a separate cluster-admin security chain) —
// calling this with standard Orchestration credentials will fail authorization.
resp, err := client.CancelClusterRebalance(ctx)
if err != nil {
	return err
}
if resp.GetWasRunning() {
	fmt.Println("rebalance cancelled")
} else {
	fmt.Println("no rebalance was running")
}
```

### CancelProcessInstance

```go
func (c *CamundaClient) CancelProcessInstance(ctx context.Context, processInstanceKey ProcessInstanceKey, body CancelProcessInstanceRequest, opts ...func(ApiCancelProcessInstanceRequest) ApiCancelProcessInstanceRequest) error
```

**Types:** [`ProcessInstanceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceKey), [`CancelProcessInstanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#CancelProcessInstanceRequest), [`ApiCancelProcessInstanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCancelProcessInstanceRequest)

CancelProcessInstance calls the CancelProcessInstance operation.

Example:

```go
return client.CancelProcessInstance(ctx,
	camunda.MustProcessInstanceKey("2251799813685340"),
	*camunda.NewCancelProcessInstanceRequest())
```

### CancelProcessInstancesBatchOperation

```go
func (c *CamundaClient) CancelProcessInstancesBatchOperation(ctx context.Context, body ProcessInstanceCancellationBatchOperationRequest, opts ...func(ApiCancelProcessInstancesBatchOperationRequest) ApiCancelProcessInstancesBatchOperationRequest) (*BatchOperationCreatedResult, error)
```

**Types:** [`ProcessInstanceCancellationBatchOperationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceCancellationBatchOperationRequest), [`ApiCancelProcessInstancesBatchOperationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCancelProcessInstancesBatchOperationRequest), [`BatchOperationCreatedResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#BatchOperationCreatedResult)

CancelProcessInstancesBatchOperation calls the CancelProcessInstancesBatchOperation operation.

Example:

```go
// Cancel every instance matching a filter in a single batch operation.
req := camunda.NewProcessInstanceCancellationBatchOperationRequest(*camunda.NewProcessInstanceFilter())

result, err := client.CancelProcessInstancesBatchOperation(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
```

### ChangeClusterMode

```go
func (c *CamundaClient) ChangeClusterMode(ctx context.Context, opts ...func(ApiChangeClusterModeRequest) ApiChangeClusterModeRequest) (*ClusterModeChangeResponse, error)
```

**Types:** [`ApiChangeClusterModeRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiChangeClusterModeRequest), [`ClusterModeChangeResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterModeChangeResponse)

ChangeClusterMode calls the ChangeClusterMode operation.

Example:

```go
result, err := client.ChangeClusterMode(ctx)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### ChangeClusterModeAsClusterAdmin

```go
func (c *CamundaClient) ChangeClusterModeAsClusterAdmin(ctx context.Context, opts ...func(ApiChangeClusterModeAsClusterAdminRequest) ApiChangeClusterModeAsClusterAdminRequest) (*ClusterModeChangeResponse, error)
```

**Types:** [`ApiChangeClusterModeAsClusterAdminRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiChangeClusterModeAsClusterAdminRequest), [`ClusterModeChangeResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterModeChangeResponse)

ChangeClusterModeAsClusterAdmin calls the ChangeClusterModeAsClusterAdmin operation.

Example:

```go
// Changes the cluster mode as a cluster-level admin (cross-tenant authority).
result, err := client.ChangeClusterModeAsClusterAdmin(ctx, func(r camunda.ApiChangeClusterModeAsClusterAdminRequest) camunda.ApiChangeClusterModeAsClusterAdminRequest {
	return r.Mode(camunda.MODE_RECOVERING)
})
if err != nil {
	return err
}
fmt.Printf("change %s: %d planned operation group(s)\n", result.GetChangeId(), len(result.GetPlannedChanges()))
```

### Clock

```go
func (c *CamundaClient) Clock() Clock
```

Clock returns the clock this client resolves cadence through.

### CompleteJob

```go
func (c *CamundaClient) CompleteJob(ctx context.Context, jobKey JobKey, body JobCompletionRequest, opts ...func(ApiCompleteJobRequest) ApiCompleteJobRequest) error
```

**Types:** [`JobKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#JobKey), [`JobCompletionRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#JobCompletionRequest), [`ApiCompleteJobRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCompleteJobRequest)

CompleteJob calls the CompleteJob operation.

Example:

```go
req := camunda.NewJobCompletionRequest()
req.SetVariables(map[string]any{"greeting": "Hello!"})

return client.CompleteJob(ctx, camunda.MustJobKey("2251799813685424"), *req)
```

### CompleteUserTask

```go
func (c *CamundaClient) CompleteUserTask(ctx context.Context, userTaskKey UserTaskKey, body UserTaskCompletionRequest, opts ...func(ApiCompleteUserTaskRequest) ApiCompleteUserTaskRequest) error
```

**Types:** [`UserTaskKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserTaskKey), [`UserTaskCompletionRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserTaskCompletionRequest), [`ApiCompleteUserTaskRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCompleteUserTaskRequest)

CompleteUserTask calls the CompleteUserTask operation.

Example:

```go
req := camunda.NewUserTaskCompletionRequest()
req.SetVariables(map[string]any{"approved": true})

return client.CompleteUserTask(ctx, camunda.MustUserTaskKey("2251799813685380"), *req)
```

### Config

```go
func (c *CamundaClient) Config() *Config
```

Config returns the resolved configuration.

### CorrelateMessage

```go
func (c *CamundaClient) CorrelateMessage(ctx context.Context, body MessageCorrelationRequest, opts ...func(ApiCorrelateMessageRequest) ApiCorrelateMessageRequest) (*MessageCorrelationResult, error)
```

**Types:** [`MessageCorrelationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#MessageCorrelationRequest), [`ApiCorrelateMessageRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCorrelateMessageRequest), [`MessageCorrelationResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#MessageCorrelationResult)

CorrelateMessage calls the CorrelateMessage operation.

Example:

```go
req := camunda.NewMessageCorrelationRequest("order-confirmed")
req.SetCorrelationKey("order-42")
req.SetVariables(map[string]any{"confirmedBy": "payment-service"})

result, err := client.CorrelateMessage(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CreateAdminUser

```go
func (c *CamundaClient) CreateAdminUser(ctx context.Context, body UserRequest, opts ...func(ApiCreateAdminUserRequest) ApiCreateAdminUserRequest) (*UserCreateResult, error)
```

**Types:** [`UserRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserRequest), [`ApiCreateAdminUserRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCreateAdminUserRequest), [`UserCreateResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserCreateResult)

CreateAdminUser calls the CreateAdminUser operation.

Example:

```go
// One-time setup: create the initial administrator on a fresh cluster.
// "admin-password-123" is a placeholder — don't hardcode passwords in production.
result, err := client.CreateAdminUser(ctx, *camunda.NewUserRequest("admin-password-123", "admin"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CreateAgentInstance

```go
func (c *CamundaClient) CreateAgentInstance(ctx context.Context, body AgentInstanceCreationRequest, opts ...func(ApiCreateAgentInstanceRequest) ApiCreateAgentInstanceRequest) (*AgentInstanceCreationResult, error)
```

**Types:** [`AgentInstanceCreationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AgentInstanceCreationRequest), [`ApiCreateAgentInstanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCreateAgentInstanceRequest), [`AgentInstanceCreationResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AgentInstanceCreationResult)

CreateAgentInstance calls the CreateAgentInstance operation.

Example:

```go
systemPrompt := []camunda.AgentInstanceMessageContent{
	camunda.AgentInstanceTextContentAsAgentInstanceMessageContent(
		camunda.NewAgentInstanceTextContent("TEXT", "You are a helpful assistant.")),
}
configItem := camunda.NewAgentInstanceHistoryItem(
	"config-1", camunda.MustLoopIterationId(1), camunda.AGENTINSTANCEHISTORYROLEENUM_CONFIGURATION, nil, time.Now())
configItem.SetModel("gpt-4o")
configItem.SetProvider("openai")
configItem.SetSystemPrompt(systemPrompt)

req := camunda.NewAgentInstanceCreationRequest(
	camunda.ElementInstanceKey("2251799813685360"), // elementInstanceKey
	camunda.JobKey("2251799813685424"),             // jobKey
	"lease-token",
	[]camunda.AgentInstanceHistoryItem{*configItem}, // history
)

result, err := client.CreateAgentInstance(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CreateAuthorization

```go
func (c *CamundaClient) CreateAuthorization(ctx context.Context, body AuthorizationRequest, opts ...func(ApiCreateAuthorizationRequest) ApiCreateAuthorizationRequest) (*AuthorizationCreateResult, error)
```

**Types:** [`AuthorizationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AuthorizationRequest), [`ApiCreateAuthorizationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCreateAuthorizationRequest), [`AuthorizationCreateResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AuthorizationCreateResult)

CreateAuthorization calls the CreateAuthorization operation.

Example:

```go
// AuthorizationRequest is a union; grant an id-based authorization here.
grant := camunda.NewAuthorizationIdBasedRequest(
	"user@example.com",
	camunda.OWNERTYPEENUM_USER,
	"order-process",
	camunda.RESOURCETYPEENUM_PROCESS_DEFINITION,
	[]camunda.PermissionTypeEnum{
		camunda.PERMISSIONTYPEENUM_READ_PROCESS_DEFINITION,
		camunda.PERMISSIONTYPEENUM_CREATE_PROCESS_INSTANCE,
	},
)

result, err := client.CreateAuthorization(ctx,
	camunda.AuthorizationIdBasedRequestAsAuthorizationRequest(grant))
if err != nil {
	return err
}
fmt.Printf("created authorization %v\n", result.GetAuthorizationKey())
```

### CreateDeployment

```go
func (c *CamundaClient) CreateDeployment(ctx context.Context, opts ...func(ApiCreateDeploymentRequest) ApiCreateDeploymentRequest) (*DeploymentResult, error)
```

**Types:** [`ApiCreateDeploymentRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCreateDeploymentRequest), [`DeploymentResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DeploymentResult)

CreateDeployment calls the CreateDeployment operation.

Example:

```go
// Multipart resource upload is done through the Raw() generated client.
f, err := os.Open("order-process.bpmn")
if err != nil {
	return err
}
defer func() { _ = f.Close() }()

deployment, _, err := client.Raw().ResourceAPI.CreateDeployment(ctx).
	Resources([]*os.File{f}).
	Execute()
if err != nil {
	return err
}
fmt.Printf("deployment key %v\n", deployment.GetDeploymentKey())
```

### CreateDocument

```go
func (c *CamundaClient) CreateDocument(ctx context.Context, opts ...func(ApiCreateDocumentRequest) ApiCreateDocumentRequest) (*DocumentReference, error)
```

**Types:** [`ApiCreateDocumentRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCreateDocumentRequest), [`DocumentReference`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DocumentReference)

CreateDocument calls the CreateDocument operation.

Example:

```go
// The document payload is attached via request options (functional opts) or
// the Raw() client; here we call the ergonomic facade method.
ref, err := client.CreateDocument(ctx)
if err != nil {
	return err
}
fmt.Printf("%v\n", ref)
```

### CreateDocumentLink

```go
func (c *CamundaClient) CreateDocumentLink(ctx context.Context, documentId string, body DocumentLinkRequest, opts ...func(ApiCreateDocumentLinkRequest) ApiCreateDocumentLinkRequest) (*DocumentLink, error)
```

**Types:** [`DocumentLinkRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DocumentLinkRequest), [`ApiCreateDocumentLinkRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCreateDocumentLinkRequest), [`DocumentLink`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DocumentLink)

CreateDocumentLink calls the CreateDocumentLink operation.

Example:

```go
// Create a short-lived, shareable download link for a stored document.
link, err := client.CreateDocumentLink(ctx, "doc-123", *camunda.NewDocumentLinkRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", link)
```

### CreateDocuments

```go
func (c *CamundaClient) CreateDocuments(ctx context.Context, opts ...func(ApiCreateDocumentsRequest) ApiCreateDocumentsRequest) (*DocumentCreationBatchResponse, error)
```

**Types:** [`ApiCreateDocumentsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCreateDocumentsRequest), [`DocumentCreationBatchResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DocumentCreationBatchResponse)

CreateDocuments calls the CreateDocuments operation.

Example:

```go
// Batch upload multiple documents in a single multipart request.
result, err := client.CreateDocuments(ctx)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CreateElementInstanceVariables

```go
func (c *CamundaClient) CreateElementInstanceVariables(ctx context.Context, elementInstanceKey ElementInstanceKey, body SetVariableRequest, opts ...func(ApiCreateElementInstanceVariablesRequest) ApiCreateElementInstanceVariablesRequest) error
```

**Types:** [`ElementInstanceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ElementInstanceKey), [`SetVariableRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#SetVariableRequest), [`ApiCreateElementInstanceVariablesRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCreateElementInstanceVariablesRequest)

CreateElementInstanceVariables calls the CreateElementInstanceVariables operation.

Example:

```go
// Set local variables on a specific element instance scope.
req := camunda.NewSetVariableRequest(map[string]any{"approved": true})

return client.CreateElementInstanceVariables(ctx, camunda.MustElementInstanceKey("2251799813685360"), *req)
```

### CreateGlobalClusterVariable

```go
func (c *CamundaClient) CreateGlobalClusterVariable(ctx context.Context, body CreateClusterVariableRequest, opts ...func(ApiCreateGlobalClusterVariableRequest) ApiCreateGlobalClusterVariableRequest) (*ClusterVariableResult, error)
```

**Types:** [`CreateClusterVariableRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#CreateClusterVariableRequest), [`ApiCreateGlobalClusterVariableRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCreateGlobalClusterVariableRequest), [`ClusterVariableResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterVariableResult)

CreateGlobalClusterVariable calls the CreateGlobalClusterVariable operation.

Example:

```go
result, err := client.CreateGlobalClusterVariable(ctx,
	*camunda.NewCreateClusterVariableRequest("region", map[string]any{"value": "eu-1"}))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CreateGlobalTaskListener

```go
func (c *CamundaClient) CreateGlobalTaskListener(ctx context.Context, body CreateGlobalTaskListenerRequest, opts ...func(ApiCreateGlobalTaskListenerRequest) ApiCreateGlobalTaskListenerRequest) (*GlobalTaskListenerResult, error)
```

**Types:** [`CreateGlobalTaskListenerRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#CreateGlobalTaskListenerRequest), [`ApiCreateGlobalTaskListenerRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCreateGlobalTaskListenerRequest), [`GlobalTaskListenerResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#GlobalTaskListenerResult)

CreateGlobalTaskListener calls the CreateGlobalTaskListener operation.

Example:

```go
result, err := client.CreateGlobalTaskListener(ctx,
	*camunda.NewCreateGlobalTaskListenerRequest("audit-listener"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CreateGroup

```go
func (c *CamundaClient) CreateGroup(ctx context.Context, body GroupCreateRequest, opts ...func(ApiCreateGroupRequest) ApiCreateGroupRequest) (*GroupCreateResult, error)
```

**Types:** [`GroupCreateRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#GroupCreateRequest), [`ApiCreateGroupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCreateGroupRequest), [`GroupCreateResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#GroupCreateResult)

CreateGroup calls the CreateGroup operation.

Example:

```go
result, err := client.CreateGroup(ctx, *camunda.NewGroupCreateRequest("finance", "Finance"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CreateMappingRule

```go
func (c *CamundaClient) CreateMappingRule(ctx context.Context, body MappingRuleCreateRequest, opts ...func(ApiCreateMappingRuleRequest) ApiCreateMappingRuleRequest) (*MappingRuleCreateResult, error)
```

**Types:** [`MappingRuleCreateRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#MappingRuleCreateRequest), [`ApiCreateMappingRuleRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCreateMappingRuleRequest), [`MappingRuleCreateResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#MappingRuleCreateResult)

CreateMappingRule calls the CreateMappingRule operation.

Example:

```go
// Map the IdP claim `groups=auditors` to a Camunda mapping-rule identity.
result, err := client.CreateMappingRule(ctx,
	*camunda.NewMappingRuleCreateRequest("groups", "auditors", "SSO Auditors", "sso-auditors"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CreateProcessInstance

```go
func (c *CamundaClient) CreateProcessInstance(ctx context.Context, body ProcessInstanceCreationInstruction, opts ...func(ApiCreateProcessInstanceRequest) ApiCreateProcessInstanceRequest) (*CreateProcessInstanceResult, error)
```

**Types:** [`ProcessInstanceCreationInstruction`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceCreationInstruction), [`ApiCreateProcessInstanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCreateProcessInstanceRequest), [`CreateProcessInstanceResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#CreateProcessInstanceResult)

CreateProcessInstance creates (starts) a process instance.

When the gateway advertises the FALCON command stream (a nanobpmn gateway) and
FALCON is enabled, the create is routed over the credit-metered WebSocket
command stream: a flood of creates queues on the client's submission-credit
window instead of being shed with 503s. Against stock Camunda — or if the
stream cannot be established — it falls back transparently to the REST endpoint.

The variadic request-builder options apply only on the REST path.

Example:

```go
instruction := camunda.ProcessInstanceCreationInstructionByIdAsProcessInstanceCreationInstruction(
	camunda.NewProcessInstanceCreationInstructionById("order-process"))
result, err := client.CreateProcessInstance(ctx, instruction)
```

### CreateRole

```go
func (c *CamundaClient) CreateRole(ctx context.Context, body RoleCreateRequest, opts ...func(ApiCreateRoleRequest) ApiCreateRoleRequest) (*RoleCreateResult, error)
```

**Types:** [`RoleCreateRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#RoleCreateRequest), [`ApiCreateRoleRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCreateRoleRequest), [`RoleCreateResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#RoleCreateResult)

CreateRole calls the CreateRole operation.

Example:

```go
result, err := client.CreateRole(ctx, *camunda.NewRoleCreateRequest("auditor", "Auditor"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CreateTenant

```go
func (c *CamundaClient) CreateTenant(ctx context.Context, body TenantCreateRequest, opts ...func(ApiCreateTenantRequest) ApiCreateTenantRequest) (*TenantCreateResult, error)
```

**Types:** [`TenantCreateRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#TenantCreateRequest), [`ApiCreateTenantRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCreateTenantRequest), [`TenantCreateResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#TenantCreateResult)

CreateTenant calls the CreateTenant operation.

Example:

```go
result, err := client.CreateTenant(ctx, *camunda.NewTenantCreateRequest("tenant-a", "Tenant A"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CreateTenantClusterVariable

```go
func (c *CamundaClient) CreateTenantClusterVariable(ctx context.Context, tenantId string, body CreateClusterVariableRequest, opts ...func(ApiCreateTenantClusterVariableRequest) ApiCreateTenantClusterVariableRequest) (*ClusterVariableResult, error)
```

**Types:** [`CreateClusterVariableRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#CreateClusterVariableRequest), [`ApiCreateTenantClusterVariableRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCreateTenantClusterVariableRequest), [`ClusterVariableResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterVariableResult)

CreateTenantClusterVariable calls the CreateTenantClusterVariable operation.

Example:

```go
result, err := client.CreateTenantClusterVariable(ctx, "tenant-a",
	*camunda.NewCreateClusterVariableRequest("region", map[string]any{"value": "eu-1"}))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CreateUser

```go
func (c *CamundaClient) CreateUser(ctx context.Context, body UserRequest, opts ...func(ApiCreateUserRequest) ApiCreateUserRequest) (*UserCreateResult, error)
```

**Types:** [`UserRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserRequest), [`ApiCreateUserRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiCreateUserRequest), [`UserCreateResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserCreateResult)

CreateUser calls the CreateUser operation.

Example:

```go
// "secure-password-123" is a placeholder — don't hardcode passwords in production.
req := camunda.NewUserRequest("secure-password-123", "alice")
req.SetName("Alice Example")
req.SetEmail("alice@example.com")

result, err := client.CreateUser(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### DeleteAuthorization

```go
func (c *CamundaClient) DeleteAuthorization(ctx context.Context, authorizationKey AuthorizationKey, opts ...func(ApiDeleteAuthorizationRequest) ApiDeleteAuthorizationRequest) error
```

**Types:** [`AuthorizationKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AuthorizationKey), [`ApiDeleteAuthorizationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiDeleteAuthorizationRequest)

DeleteAuthorization calls the DeleteAuthorization operation.

Example:

```go
return client.DeleteAuthorization(ctx, camunda.MustAuthorizationKey("2251799813685280"))
```

### DeleteDecisionInstance

```go
func (c *CamundaClient) DeleteDecisionInstance(ctx context.Context, decisionEvaluationKey DecisionEvaluationKey, body DeleteDecisionInstanceRequest, opts ...func(ApiDeleteDecisionInstanceRequest) ApiDeleteDecisionInstanceRequest) error
```

**Types:** [`DecisionEvaluationKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DecisionEvaluationKey), [`DeleteDecisionInstanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DeleteDecisionInstanceRequest), [`ApiDeleteDecisionInstanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiDeleteDecisionInstanceRequest)

DeleteDecisionInstance calls the DeleteDecisionInstance operation.

Example:

```go
return client.DeleteDecisionInstance(ctx,
	camunda.MustDecisionEvaluationKey("2251799813685310"),
	*camunda.NewDeleteDecisionInstanceRequest())
```

### DeleteDecisionInstancesBatchOperation

```go
func (c *CamundaClient) DeleteDecisionInstancesBatchOperation(ctx context.Context, body DecisionInstanceDeletionBatchOperationRequest, opts ...func(ApiDeleteDecisionInstancesBatchOperationRequest) ApiDeleteDecisionInstancesBatchOperationRequest) (*BatchOperationCreatedResult, error)
```

**Types:** [`DecisionInstanceDeletionBatchOperationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DecisionInstanceDeletionBatchOperationRequest), [`ApiDeleteDecisionInstancesBatchOperationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiDeleteDecisionInstancesBatchOperationRequest), [`BatchOperationCreatedResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#BatchOperationCreatedResult)

DeleteDecisionInstancesBatchOperation calls the DeleteDecisionInstancesBatchOperation operation.

Example:

```go
req := camunda.NewDecisionInstanceDeletionBatchOperationRequest(*camunda.NewDecisionInstanceFilter())

result, err := client.DeleteDecisionInstancesBatchOperation(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
```

### DeleteDocument

```go
func (c *CamundaClient) DeleteDocument(ctx context.Context, documentId string, opts ...func(ApiDeleteDocumentRequest) ApiDeleteDocumentRequest) error
```

**Types:** [`ApiDeleteDocumentRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiDeleteDocumentRequest)

DeleteDocument calls the DeleteDocument operation.

Example:

```go
return client.DeleteDocument(ctx, "doc-123")
```

### DeleteGlobalClusterVariable

```go
func (c *CamundaClient) DeleteGlobalClusterVariable(ctx context.Context, name string, opts ...func(ApiDeleteGlobalClusterVariableRequest) ApiDeleteGlobalClusterVariableRequest) error
```

**Types:** [`ApiDeleteGlobalClusterVariableRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiDeleteGlobalClusterVariableRequest)

DeleteGlobalClusterVariable calls the DeleteGlobalClusterVariable operation.

Example:

```go
return client.DeleteGlobalClusterVariable(ctx, "region")
```

### DeleteGlobalTaskListener

```go
func (c *CamundaClient) DeleteGlobalTaskListener(ctx context.Context, id string, opts ...func(ApiDeleteGlobalTaskListenerRequest) ApiDeleteGlobalTaskListenerRequest) error
```

**Types:** [`ApiDeleteGlobalTaskListenerRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiDeleteGlobalTaskListenerRequest)

DeleteGlobalTaskListener calls the DeleteGlobalTaskListener operation.

Example:

```go
return client.DeleteGlobalTaskListener(ctx, "audit-listener")
```

### DeleteGroup

```go
func (c *CamundaClient) DeleteGroup(ctx context.Context, groupId string, opts ...func(ApiDeleteGroupRequest) ApiDeleteGroupRequest) error
```

**Types:** [`ApiDeleteGroupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiDeleteGroupRequest)

DeleteGroup calls the DeleteGroup operation.

Example:

```go
return client.DeleteGroup(ctx, "finance")
```

### DeleteHistoryBackup

```go
func (c *CamundaClient) DeleteHistoryBackup(ctx context.Context, backupId int64, opts ...func(ApiDeleteHistoryBackupRequest) ApiDeleteHistoryBackupRequest) error
```

**Types:** [`ApiDeleteHistoryBackupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiDeleteHistoryBackupRequest)

DeleteHistoryBackup calls the DeleteHistoryBackup operation.

Example:

```go
if err := client.DeleteHistoryBackup(ctx, 42); err != nil {
	return err
}
```

### DeleteHistoryBackupAsClusterAdmin

```go
func (c *CamundaClient) DeleteHistoryBackupAsClusterAdmin(ctx context.Context, backupId int64, opts ...func(ApiDeleteHistoryBackupAsClusterAdminRequest) ApiDeleteHistoryBackupAsClusterAdminRequest) error
```

**Types:** [`ApiDeleteHistoryBackupAsClusterAdminRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiDeleteHistoryBackupAsClusterAdminRequest)

DeleteHistoryBackupAsClusterAdmin calls the DeleteHistoryBackupAsClusterAdmin operation.

Example:

```go
if err := client.DeleteHistoryBackupAsClusterAdmin(ctx, 42); err != nil {
	return err
}
```

### DeleteMappingRule

```go
func (c *CamundaClient) DeleteMappingRule(ctx context.Context, mappingRuleId string, opts ...func(ApiDeleteMappingRuleRequest) ApiDeleteMappingRuleRequest) error
```

**Types:** [`ApiDeleteMappingRuleRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiDeleteMappingRuleRequest)

DeleteMappingRule calls the DeleteMappingRule operation.

Example:

```go
return client.DeleteMappingRule(ctx, "sso-auditors")
```

### DeleteProcessInstance

```go
func (c *CamundaClient) DeleteProcessInstance(ctx context.Context, processInstanceKey ProcessInstanceKey, body DeleteProcessInstanceRequest, opts ...func(ApiDeleteProcessInstanceRequest) ApiDeleteProcessInstanceRequest) error
```

**Types:** [`ProcessInstanceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceKey), [`DeleteProcessInstanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DeleteProcessInstanceRequest), [`ApiDeleteProcessInstanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiDeleteProcessInstanceRequest)

DeleteProcessInstance calls the DeleteProcessInstance operation.

Example:

```go
return client.DeleteProcessInstance(ctx,
	camunda.MustProcessInstanceKey("2251799813685340"),
	*camunda.NewDeleteProcessInstanceRequest())
```

### DeleteProcessInstancesBatchOperation

```go
func (c *CamundaClient) DeleteProcessInstancesBatchOperation(ctx context.Context, body ProcessInstanceDeletionBatchOperationRequest, opts ...func(ApiDeleteProcessInstancesBatchOperationRequest) ApiDeleteProcessInstancesBatchOperationRequest) (*BatchOperationCreatedResult, error)
```

**Types:** [`ProcessInstanceDeletionBatchOperationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceDeletionBatchOperationRequest), [`ApiDeleteProcessInstancesBatchOperationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiDeleteProcessInstancesBatchOperationRequest), [`BatchOperationCreatedResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#BatchOperationCreatedResult)

DeleteProcessInstancesBatchOperation calls the DeleteProcessInstancesBatchOperation operation.

Example:

```go
req := camunda.NewProcessInstanceDeletionBatchOperationRequest(*camunda.NewProcessInstanceFilter())

result, err := client.DeleteProcessInstancesBatchOperation(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
```

### DeleteResource

```go
func (c *CamundaClient) DeleteResource(ctx context.Context, resourceKey ResourceKey, body DeleteResourceRequest, opts ...func(ApiDeleteResourceRequest) ApiDeleteResourceRequest) (*DeleteResourceResponse, error)
```

**Types:** [`ResourceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ResourceKey), [`DeleteResourceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DeleteResourceRequest), [`ApiDeleteResourceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiDeleteResourceRequest), [`DeleteResourceResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DeleteResourceResponse)

DeleteResource calls the DeleteResource operation.

Example:

```go
result, err := client.DeleteResource(ctx,
	camunda.MustResourceKey("2251799813685350"),
	*camunda.NewDeleteResourceRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### DeleteRole

```go
func (c *CamundaClient) DeleteRole(ctx context.Context, roleId string, opts ...func(ApiDeleteRoleRequest) ApiDeleteRoleRequest) error
```

**Types:** [`ApiDeleteRoleRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiDeleteRoleRequest)

DeleteRole calls the DeleteRole operation.

Example:

```go
return client.DeleteRole(ctx, "auditor")
```

### DeleteRuntimeBackup

```go
func (c *CamundaClient) DeleteRuntimeBackup(ctx context.Context, backupId int64, opts ...func(ApiDeleteRuntimeBackupRequest) ApiDeleteRuntimeBackupRequest) error
```

**Types:** [`ApiDeleteRuntimeBackupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiDeleteRuntimeBackupRequest)

DeleteRuntimeBackup calls the DeleteRuntimeBackup operation.

Example:

```go
if err := client.DeleteRuntimeBackup(ctx, 42); err != nil {
	return err
}
```

### DeleteRuntimeBackupAsClusterAdmin

```go
func (c *CamundaClient) DeleteRuntimeBackupAsClusterAdmin(ctx context.Context, backupId int64, opts ...func(ApiDeleteRuntimeBackupAsClusterAdminRequest) ApiDeleteRuntimeBackupAsClusterAdminRequest) error
```

**Types:** [`ApiDeleteRuntimeBackupAsClusterAdminRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiDeleteRuntimeBackupAsClusterAdminRequest)

DeleteRuntimeBackupAsClusterAdmin calls the DeleteRuntimeBackupAsClusterAdmin operation.

Example:

```go
// Deletes the runtime backup with the given id from all physical tenants.
if err := client.DeleteRuntimeBackupAsClusterAdmin(ctx, 42); err != nil {
	return err
}
```

### DeleteRuntimeBackupState

```go
func (c *CamundaClient) DeleteRuntimeBackupState(ctx context.Context, opts ...func(ApiDeleteRuntimeBackupStateRequest) ApiDeleteRuntimeBackupStateRequest) error
```

**Types:** [`ApiDeleteRuntimeBackupStateRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiDeleteRuntimeBackupStateRequest)

DeleteRuntimeBackupState calls the DeleteRuntimeBackupState operation.

Example:

```go
if err := client.DeleteRuntimeBackupState(ctx); err != nil {
	return err
}
```

### DeleteRuntimeBackupStateAsClusterAdmin

```go
func (c *CamundaClient) DeleteRuntimeBackupStateAsClusterAdmin(ctx context.Context, opts ...func(ApiDeleteRuntimeBackupStateAsClusterAdminRequest) ApiDeleteRuntimeBackupStateAsClusterAdminRequest) error
```

**Types:** [`ApiDeleteRuntimeBackupStateAsClusterAdminRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiDeleteRuntimeBackupStateAsClusterAdminRequest)

DeleteRuntimeBackupStateAsClusterAdmin calls the DeleteRuntimeBackupStateAsClusterAdmin operation.

Example:

```go
// Clears the persisted runtime backup state across all physical tenants.
if err := client.DeleteRuntimeBackupStateAsClusterAdmin(ctx); err != nil {
	return err
}
```

### DeleteTenant

```go
func (c *CamundaClient) DeleteTenant(ctx context.Context, tenantId string, opts ...func(ApiDeleteTenantRequest) ApiDeleteTenantRequest) error
```

**Types:** [`ApiDeleteTenantRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiDeleteTenantRequest)

DeleteTenant calls the DeleteTenant operation.

Example:

```go
return client.DeleteTenant(ctx, "tenant-a")
```

### DeleteTenantClusterVariable

```go
func (c *CamundaClient) DeleteTenantClusterVariable(ctx context.Context, tenantId string, name string, opts ...func(ApiDeleteTenantClusterVariableRequest) ApiDeleteTenantClusterVariableRequest) error
```

**Types:** [`ApiDeleteTenantClusterVariableRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiDeleteTenantClusterVariableRequest)

DeleteTenantClusterVariable calls the DeleteTenantClusterVariable operation.

Example:

```go
return client.DeleteTenantClusterVariable(ctx, "tenant-a", "region")
```

### DeleteUser

```go
func (c *CamundaClient) DeleteUser(ctx context.Context, username string, opts ...func(ApiDeleteUserRequest) ApiDeleteUserRequest) error
```

**Types:** [`ApiDeleteUserRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiDeleteUserRequest)

DeleteUser calls the DeleteUser operation.

Example:

```go
return client.DeleteUser(ctx, "alice")
```

### EvaluateConditionals

```go
func (c *CamundaClient) EvaluateConditionals(ctx context.Context, body ConditionalEvaluationInstruction, opts ...func(ApiEvaluateConditionalsRequest) ApiEvaluateConditionalsRequest) (*EvaluateConditionalResult, error)
```

**Types:** [`ConditionalEvaluationInstruction`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ConditionalEvaluationInstruction), [`ApiEvaluateConditionalsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiEvaluateConditionalsRequest), [`EvaluateConditionalResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#EvaluateConditionalResult)

EvaluateConditionals calls the EvaluateConditionals operation.

Example:

```go
// Evaluate which conditional start events match the given variables.
req := camunda.NewConditionalEvaluationInstruction(map[string]any{"temperature": 42})

result, err := client.EvaluateConditionals(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### EvaluateDecision

```go
func (c *CamundaClient) EvaluateDecision(ctx context.Context, body DecisionEvaluationInstruction, opts ...func(ApiEvaluateDecisionRequest) ApiEvaluateDecisionRequest) (*EvaluateDecisionResult, error)
```

**Types:** [`DecisionEvaluationInstruction`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DecisionEvaluationInstruction), [`ApiEvaluateDecisionRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiEvaluateDecisionRequest), [`EvaluateDecisionResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#EvaluateDecisionResult)

EvaluateDecision calls the EvaluateDecision operation.

Example:

```go
// DecisionEvaluationInstruction is a union; evaluate by decision id here.
byID := camunda.NewDecisionEvaluationById("dish-decision")
byID.SetVariables(map[string]any{"season": "Winter", "guestCount": 4})

result, err := client.EvaluateDecision(ctx,
	camunda.DecisionEvaluationByIdAsDecisionEvaluationInstruction(byID))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### EvaluateExpression

```go
func (c *CamundaClient) EvaluateExpression(ctx context.Context, body ExpressionEvaluationRequest, opts ...func(ApiEvaluateExpressionRequest) ApiEvaluateExpressionRequest) (*ExpressionEvaluationResult, error)
```

**Types:** [`ExpressionEvaluationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ExpressionEvaluationRequest), [`ApiEvaluateExpressionRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiEvaluateExpressionRequest), [`ExpressionEvaluationResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ExpressionEvaluationResult)

EvaluateExpression calls the EvaluateExpression operation.

Example:

```go
// Evaluate a FEEL expression against a set of variables.
req := camunda.NewExpressionEvaluationRequest("a + b")
req.SetVariables(map[string]any{"a": 2, "b": 3})

result, err := client.EvaluateExpression(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("result: %v\n", result.GetResult())
```

### FailJob

```go
func (c *CamundaClient) FailJob(ctx context.Context, jobKey JobKey, body JobFailRequest, opts ...func(ApiFailJobRequest) ApiFailJobRequest) error
```

**Types:** [`JobKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#JobKey), [`JobFailRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#JobFailRequest), [`ApiFailJobRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiFailJobRequest)

FailJob calls the FailJob operation.

Example:

```go
req := camunda.NewJobFailRequest()
req.SetRetries(2)
req.SetErrorMessage("inventory service unavailable")

return client.FailJob(ctx, camunda.MustJobKey("2251799813685424"), *req)
```

### GetAgentDefinition

```go
func (c *CamundaClient) GetAgentDefinition(ctx context.Context, agentDefinitionKey AgentDefinitionKey, opts ...func(ApiGetAgentDefinitionRequest) ApiGetAgentDefinitionRequest) (*AgentDefinitionResult, error)
```

**Types:** [`AgentDefinitionKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AgentDefinitionKey), [`ApiGetAgentDefinitionRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetAgentDefinitionRequest), [`AgentDefinitionResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AgentDefinitionResult)

GetAgentDefinition calls the GetAgentDefinition operation.

Example:

```go
definition, err := client.GetAgentDefinition(ctx, camunda.MustAgentDefinitionKey("2251799813691958"))
if err != nil {
	return err
}
fmt.Printf("%v\n", definition)
```

### GetAgentInstance

```go
func (c *CamundaClient) GetAgentInstance(ctx context.Context, agentInstanceKey AgentInstanceKey, opts ...func(ApiGetAgentInstanceRequest) ApiGetAgentInstanceRequest) (*AgentInstanceResult, error)
```

**Types:** [`AgentInstanceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AgentInstanceKey), [`ApiGetAgentInstanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetAgentInstanceRequest), [`AgentInstanceResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AgentInstanceResult)

GetAgentInstance calls the GetAgentInstance operation.

Example:

```go
agent, err := client.GetAgentInstance(ctx, camunda.MustAgentInstanceKey("2251799813685370"))
if err != nil {
	return err
}
fmt.Printf("%v\n", agent)
```

### GetAuditLog

```go
func (c *CamundaClient) GetAuditLog(ctx context.Context, auditLogKey AuditLogKey, opts ...func(ApiGetAuditLogRequest) ApiGetAuditLogRequest) (*AuditLogResult, error)
```

**Types:** [`AuditLogKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AuditLogKey), [`ApiGetAuditLogRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetAuditLogRequest), [`AuditLogResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AuditLogResult)

GetAuditLog calls the GetAuditLog operation.

Example:

```go
entry, err := client.GetAuditLog(ctx, camunda.MustAuditLogKey("2251799813685270"))
if err != nil {
	return err
}
fmt.Printf("%v\n", entry)
```

### GetAuthentication

```go
func (c *CamundaClient) GetAuthentication(ctx context.Context, opts ...func(ApiGetAuthenticationRequest) ApiGetAuthenticationRequest) (*CamundaUserResult, error)
```

**Types:** [`ApiGetAuthenticationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetAuthenticationRequest), [`CamundaUserResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#CamundaUserResult)

GetAuthentication calls the GetAuthentication operation.

Example:

```go
// Return the authenticated user derived from the current credentials.
me, err := client.GetAuthentication(ctx)
if err != nil {
	return err
}
fmt.Printf("authenticated as %s\n", me.GetUsername())
```

### GetAuthorization

```go
func (c *CamundaClient) GetAuthorization(ctx context.Context, authorizationKey AuthorizationKey, opts ...func(ApiGetAuthorizationRequest) ApiGetAuthorizationRequest) (*AuthorizationResult, error)
```

**Types:** [`AuthorizationKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AuthorizationKey), [`ApiGetAuthorizationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetAuthorizationRequest), [`AuthorizationResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AuthorizationResult)

GetAuthorization calls the GetAuthorization operation.

Example:

```go
auth, err := client.GetAuthorization(ctx, camunda.MustAuthorizationKey("2251799813685280"))
if err != nil {
	return err
}
fmt.Printf("%v\n", auth)
```

### GetBatchOperation

```go
func (c *CamundaClient) GetBatchOperation(ctx context.Context, batchOperationKey string, opts ...func(ApiGetBatchOperationRequest) ApiGetBatchOperationRequest) (*BatchOperationResponse, error)
```

**Types:** [`ApiGetBatchOperationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetBatchOperationRequest), [`BatchOperationResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#BatchOperationResponse)

GetBatchOperation calls the GetBatchOperation operation.

Example:

```go
op, err := client.GetBatchOperation(ctx, "2251799813685290")
if err != nil {
	return err
}
fmt.Printf("%v\n", op)
```

### GetClusterExportingStatus

```go
func (c *CamundaClient) GetClusterExportingStatus(ctx context.Context, opts ...func(ApiGetClusterExportingStatusRequest) ApiGetClusterExportingStatusRequest) (*ExportingStatusResponse, error)
```

**Types:** [`ApiGetClusterExportingStatusRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetClusterExportingStatusRequest), [`ExportingStatusResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ExportingStatusResponse)

GetClusterExportingStatus calls the GetClusterExportingStatus operation.

Example:

```go
// Retrieves the exporting status aggregated across all physical tenants in the cluster.
status, err := client.GetClusterExportingStatus(ctx)
if err != nil {
	return err
}
fmt.Printf("cluster exporting status: %s\n", status.GetStatus())
```

### GetClusterRebalance

```go
func (c *CamundaClient) GetClusterRebalance(ctx context.Context, opts ...func(ApiGetClusterRebalanceRequest) ApiGetClusterRebalanceRequest) (*ClusterBalanceResponse, error)
```

**Types:** [`ApiGetClusterRebalanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetClusterRebalanceRequest), [`ClusterBalanceResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterBalanceResponse)

GetClusterRebalance calls the GetClusterRebalance operation.

Example:

```go
// Requires cluster-admin credentials (a separate cluster-admin security chain) —
// calling this with standard Orchestration credentials will fail authorization.
balance, err := client.GetClusterRebalance(ctx)
if err != nil {
	return err
}
fmt.Printf("cluster balance state: %s, %d partition(s)\n", balance.GetState(), len(balance.GetPartitions()))
if running, ok := balance.GetRunningRebalanceOk(); ok && running != nil {
	fmt.Printf("rebalance in progress: %v\n", running)
}
```

### GetClusterStatus

```go
func (c *CamundaClient) GetClusterStatus(ctx context.Context, opts ...func(ApiGetClusterStatusRequest) ApiGetClusterStatusRequest) (*ClusterStatusResponse, error)
```

**Types:** [`ApiGetClusterStatusRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetClusterStatusRequest), [`ClusterStatusResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterStatusResponse)

GetClusterStatus calls the GetClusterStatus operation.

Example:

```go
// Aggregated over every physical tenant: HEALTHY, DEGRADED, or DOWN.
status, err := client.GetClusterStatus(ctx)
if err != nil {
	return err
}
fmt.Printf("cluster status: %s\n", status.GetStatus())
```

### GetClusterTopology

```go
func (c *CamundaClient) GetClusterTopology(ctx context.Context, opts ...func(ApiGetClusterTopologyRequest) ApiGetClusterTopologyRequest) (*ClusterTopologyResponse, error)
```

**Types:** [`ApiGetClusterTopologyRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetClusterTopologyRequest), [`ClusterTopologyResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterTopologyResponse)

GetClusterTopology calls the GetClusterTopology operation.

Example:

```go
// Returns the topology of all brokers across every physical tenant.
// Requires cluster-admin credentials (a separate cluster-admin security chain) —
// calling this with standard Orchestration credentials will fail authorization.
topology, err := client.GetClusterTopology(ctx)
if err != nil {
	return err
}
fmt.Printf("cluster %s — %d broker(s), %d physical tenant(s)\n",
	topology.GetClusterId(), len(topology.GetBrokers()), len(topology.GetPhysicalTenants()))
```

### GetClusterUpgradeStatus

```go
func (c *CamundaClient) GetClusterUpgradeStatus(ctx context.Context, opts ...func(ApiGetClusterUpgradeStatusRequest) ApiGetClusterUpgradeStatusRequest) (*ClusterUpgradeStatusResponse, error)
```

**Types:** [`ApiGetClusterUpgradeStatusRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetClusterUpgradeStatusRequest), [`ClusterUpgradeStatusResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterUpgradeStatusResponse)

GetClusterUpgradeStatus calls the GetClusterUpgradeStatus operation.

Example:

```go
// One overall status folded over every physical tenant and condition:
// MIGRATED, MIGRATION_IN_PROGRESS, or UNKNOWN before anything has been reported yet.
status, err := client.GetClusterUpgradeStatus(ctx)
if err != nil {
	return err
}
fmt.Printf("cluster upgrade status: %s\n", status.GetStatus())
```

### GetDecisionDefinition

```go
func (c *CamundaClient) GetDecisionDefinition(ctx context.Context, decisionDefinitionKey DecisionDefinitionKey, opts ...func(ApiGetDecisionDefinitionRequest) ApiGetDecisionDefinitionRequest) (*DecisionDefinitionResult, error)
```

**Types:** [`DecisionDefinitionKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DecisionDefinitionKey), [`ApiGetDecisionDefinitionRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetDecisionDefinitionRequest), [`DecisionDefinitionResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DecisionDefinitionResult)

GetDecisionDefinition calls the GetDecisionDefinition operation.

Example:

```go
def, err := client.GetDecisionDefinition(ctx, camunda.MustDecisionDefinitionKey("2251799813685310"))
if err != nil {
	return err
}
fmt.Printf("%v\n", def)
```

### GetDecisionDefinitionXML

```go
func (c *CamundaClient) GetDecisionDefinitionXML(ctx context.Context, decisionDefinitionKey DecisionDefinitionKey, opts ...func(ApiGetDecisionDefinitionXMLRequest) ApiGetDecisionDefinitionXMLRequest) (string, error)
```

**Types:** [`DecisionDefinitionKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DecisionDefinitionKey), [`ApiGetDecisionDefinitionXMLRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetDecisionDefinitionXMLRequest)

GetDecisionDefinitionXML calls the GetDecisionDefinitionXML operation.

Example:

```go
xml, err := client.GetDecisionDefinitionXML(ctx, camunda.MustDecisionDefinitionKey("2251799813685310"))
if err != nil {
	return err
}
fmt.Println(xml)
```

### GetDecisionInstance

```go
func (c *CamundaClient) GetDecisionInstance(ctx context.Context, decisionEvaluationInstanceKey string, opts ...func(ApiGetDecisionInstanceRequest) ApiGetDecisionInstanceRequest) (*DecisionInstanceGetQueryResult, error)
```

**Types:** [`ApiGetDecisionInstanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetDecisionInstanceRequest), [`DecisionInstanceGetQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DecisionInstanceGetQueryResult)

GetDecisionInstance calls the GetDecisionInstance operation.

Example:

```go
instance, err := client.GetDecisionInstance(ctx, "2251799813685310-1")
if err != nil {
	return err
}
fmt.Printf("%v\n", instance)
```

### GetDecisionRequirements

```go
func (c *CamundaClient) GetDecisionRequirements(ctx context.Context, decisionRequirementsKey DecisionRequirementsKey, opts ...func(ApiGetDecisionRequirementsRequest) ApiGetDecisionRequirementsRequest) (*DecisionRequirementsResult, error)
```

**Types:** [`DecisionRequirementsKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DecisionRequirementsKey), [`ApiGetDecisionRequirementsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetDecisionRequirementsRequest), [`DecisionRequirementsResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DecisionRequirementsResult)

GetDecisionRequirements calls the GetDecisionRequirements operation.

Example:

```go
drd, err := client.GetDecisionRequirements(ctx, camunda.MustDecisionRequirementsKey("2251799813685320"))
if err != nil {
	return err
}
fmt.Printf("%v\n", drd)
```

### GetDecisionRequirementsXML

```go
func (c *CamundaClient) GetDecisionRequirementsXML(ctx context.Context, decisionRequirementsKey DecisionRequirementsKey, opts ...func(ApiGetDecisionRequirementsXMLRequest) ApiGetDecisionRequirementsXMLRequest) (string, error)
```

**Types:** [`DecisionRequirementsKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DecisionRequirementsKey), [`ApiGetDecisionRequirementsXMLRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetDecisionRequirementsXMLRequest)

GetDecisionRequirementsXML calls the GetDecisionRequirementsXML operation.

Example:

```go
xml, err := client.GetDecisionRequirementsXML(ctx, camunda.MustDecisionRequirementsKey("2251799813685320"))
if err != nil {
	return err
}
fmt.Println(xml)
```

### GetDocument

```go
func (c *CamundaClient) GetDocument(ctx context.Context, documentId string, opts ...func(ApiGetDocumentRequest) ApiGetDocumentRequest) (*os.File, error)
```

**Types:** [`ApiGetDocumentRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetDocumentRequest)

GetDocument calls the GetDocument operation.

Example:

```go
file, err := client.GetDocument(ctx, "doc-123")
if err != nil {
	return err
}
fmt.Printf("downloaded to %s\n", file.Name())
```

### GetElementInstance

```go
func (c *CamundaClient) GetElementInstance(ctx context.Context, elementInstanceKey ElementInstanceKey, opts ...func(ApiGetElementInstanceRequest) ApiGetElementInstanceRequest) (*ElementInstanceResult, error)
```

**Types:** [`ElementInstanceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ElementInstanceKey), [`ApiGetElementInstanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetElementInstanceRequest), [`ElementInstanceResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ElementInstanceResult)

GetElementInstance calls the GetElementInstance operation.

Example:

```go
element, err := client.GetElementInstance(ctx, camunda.MustElementInstanceKey("2251799813685360"))
if err != nil {
	return err
}
fmt.Printf("%v\n", element)
```

### GetExportingStatus

```go
func (c *CamundaClient) GetExportingStatus(ctx context.Context, opts ...func(ApiGetExportingStatusRequest) ApiGetExportingStatusRequest) (*ExportingStatusResponse, error)
```

**Types:** [`ApiGetExportingStatusRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetExportingStatusRequest), [`ExportingStatusResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ExportingStatusResponse)

GetExportingStatus calls the GetExportingStatus operation.

Example:

```go
// Aggregated over every replica of the physical tenant.
status, err := client.GetExportingStatus(ctx)
if err != nil {
	return err
}
fmt.Printf("exporting status: %s\n", status.GetStatus())
```

### GetFormByKey

```go
func (c *CamundaClient) GetFormByKey(ctx context.Context, formKey FormKey, opts ...func(ApiGetFormByKeyRequest) ApiGetFormByKeyRequest) (*FormResult, error)
```

**Types:** [`FormKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#FormKey), [`ApiGetFormByKeyRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetFormByKeyRequest), [`FormResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#FormResult)

GetFormByKey calls the GetFormByKey operation.

Example:

```go
form, err := client.GetFormByKey(ctx, camunda.MustFormKey("2251799813685260"))
if err != nil {
	return err
}
fmt.Printf("form %v version %d\n", form.GetFormId(), form.GetVersion())
```

### GetGlobalClusterVariable

```go
func (c *CamundaClient) GetGlobalClusterVariable(ctx context.Context, name string, opts ...func(ApiGetGlobalClusterVariableRequest) ApiGetGlobalClusterVariableRequest) (*ClusterVariableResult, error)
```

**Types:** [`ApiGetGlobalClusterVariableRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetGlobalClusterVariableRequest), [`ClusterVariableResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterVariableResult)

GetGlobalClusterVariable calls the GetGlobalClusterVariable operation.

Example:

```go
result, err := client.GetGlobalClusterVariable(ctx, "region")
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetGlobalJobStatistics

```go
func (c *CamundaClient) GetGlobalJobStatistics(ctx context.Context, opts ...func(ApiGetGlobalJobStatisticsRequest) ApiGetGlobalJobStatisticsRequest) (*GlobalJobStatisticsQueryResult, error)
```

**Types:** [`ApiGetGlobalJobStatisticsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetGlobalJobStatisticsRequest), [`GlobalJobStatisticsQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#GlobalJobStatisticsQueryResult)

GetGlobalJobStatistics calls the GetGlobalJobStatistics operation.

Example:

```go
result, err := client.GetGlobalJobStatistics(ctx)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetGlobalTaskListener

```go
func (c *CamundaClient) GetGlobalTaskListener(ctx context.Context, id string, opts ...func(ApiGetGlobalTaskListenerRequest) ApiGetGlobalTaskListenerRequest) (*GlobalTaskListenerResult, error)
```

**Types:** [`ApiGetGlobalTaskListenerRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetGlobalTaskListenerRequest), [`GlobalTaskListenerResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#GlobalTaskListenerResult)

GetGlobalTaskListener calls the GetGlobalTaskListener operation.

Example:

```go
result, err := client.GetGlobalTaskListener(ctx, "audit-listener")
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetGroup

```go
func (c *CamundaClient) GetGroup(ctx context.Context, groupId string, opts ...func(ApiGetGroupRequest) ApiGetGroupRequest) (*GroupResult, error)
```

**Types:** [`ApiGetGroupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetGroupRequest), [`GroupResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#GroupResult)

GetGroup calls the GetGroup operation.

Example:

```go
group, err := client.GetGroup(ctx, "finance")
if err != nil {
	return err
}
fmt.Printf("%v\n", group)
```

### GetHistoryBackup

```go
func (c *CamundaClient) GetHistoryBackup(ctx context.Context, backupId int64, opts ...func(ApiGetHistoryBackupRequest) ApiGetHistoryBackupRequest) (*HistoryBackupInfo, error)
```

**Types:** [`ApiGetHistoryBackupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetHistoryBackupRequest), [`HistoryBackupInfo`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#HistoryBackupInfo)

GetHistoryBackup calls the GetHistoryBackup operation.

Example:

```go
backup, err := client.GetHistoryBackup(ctx, 42)
if err != nil {
	return err
}
fmt.Printf("history backup %d state=%v\n", backup.GetBackupId(), backup.GetState())
for _, snapshot := range backup.GetDetails() {
	fmt.Printf("  snapshot %v\n", snapshot)
}
```

### GetHistoryBackupAsClusterAdmin

```go
func (c *CamundaClient) GetHistoryBackupAsClusterAdmin(ctx context.Context, backupId int64, opts ...func(ApiGetHistoryBackupAsClusterAdminRequest) ApiGetHistoryBackupAsClusterAdminRequest) (*ClusterHistoryBackupInfo, error)
```

**Types:** [`ApiGetHistoryBackupAsClusterAdminRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetHistoryBackupAsClusterAdminRequest), [`ClusterHistoryBackupInfo`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterHistoryBackupInfo)

GetHistoryBackupAsClusterAdmin calls the GetHistoryBackupAsClusterAdmin operation.

Example:

```go
backup, err := client.GetHistoryBackupAsClusterAdmin(ctx, 42)
if err != nil {
	return err
}
for _, tenant := range backup.GetPhysicalTenants() {
	fmt.Printf("tenant %s: state=%v\n", tenant.GetPhysicalTenantId(), tenant.GetState())
}
```

### GetIncident

```go
func (c *CamundaClient) GetIncident(ctx context.Context, incidentKey IncidentKey, opts ...func(ApiGetIncidentRequest) ApiGetIncidentRequest) (*IncidentResult, error)
```

**Types:** [`IncidentKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#IncidentKey), [`ApiGetIncidentRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetIncidentRequest), [`IncidentResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#IncidentResult)

GetIncident calls the GetIncident operation.

Example:

```go
incident, err := client.GetIncident(ctx, camunda.MustIncidentKey("2251799813685300"))
if err != nil {
	return err
}
fmt.Printf("%v\n", incident)
```

### GetJobErrorStatistics

```go
func (c *CamundaClient) GetJobErrorStatistics(ctx context.Context, body JobErrorStatisticsQuery, opts ...func(ApiGetJobErrorStatisticsRequest) ApiGetJobErrorStatisticsRequest) (*JobErrorStatisticsQueryResult, error)
```

**Types:** [`JobErrorStatisticsQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#JobErrorStatisticsQuery), [`ApiGetJobErrorStatisticsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetJobErrorStatisticsRequest), [`JobErrorStatisticsQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#JobErrorStatisticsQueryResult)

GetJobErrorStatistics calls the GetJobErrorStatistics operation.

Example:

```go
from, to := time.Now().Add(-24*time.Hour), time.Now()
query := camunda.NewJobErrorStatisticsQuery(*camunda.NewJobErrorStatisticsFilter(from, to, "greet"))

result, err := client.GetJobErrorStatistics(ctx, *query)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetJobTimeSeriesStatistics

```go
func (c *CamundaClient) GetJobTimeSeriesStatistics(ctx context.Context, body JobTimeSeriesStatisticsQuery, opts ...func(ApiGetJobTimeSeriesStatisticsRequest) ApiGetJobTimeSeriesStatisticsRequest) (*JobTimeSeriesStatisticsQueryResult, error)
```

**Types:** [`JobTimeSeriesStatisticsQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#JobTimeSeriesStatisticsQuery), [`ApiGetJobTimeSeriesStatisticsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetJobTimeSeriesStatisticsRequest), [`JobTimeSeriesStatisticsQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#JobTimeSeriesStatisticsQueryResult)

GetJobTimeSeriesStatistics calls the GetJobTimeSeriesStatistics operation.

Example:

```go
from, to := time.Now().Add(-24*time.Hour), time.Now()
query := camunda.NewJobTimeSeriesStatisticsQuery(*camunda.NewJobTimeSeriesStatisticsFilter(from, to, "greet"))

result, err := client.GetJobTimeSeriesStatistics(ctx, *query)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetJobTypeStatistics

```go
func (c *CamundaClient) GetJobTypeStatistics(ctx context.Context, body JobTypeStatisticsQuery, opts ...func(ApiGetJobTypeStatisticsRequest) ApiGetJobTypeStatisticsRequest) (*JobTypeStatisticsQueryResult, error)
```

**Types:** [`JobTypeStatisticsQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#JobTypeStatisticsQuery), [`ApiGetJobTypeStatisticsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetJobTypeStatisticsRequest), [`JobTypeStatisticsQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#JobTypeStatisticsQueryResult)

GetJobTypeStatistics calls the GetJobTypeStatistics operation.

Example:

```go
result, err := client.GetJobTypeStatistics(ctx, *camunda.NewJobTypeStatisticsQuery())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetJobWorkerStatistics

```go
func (c *CamundaClient) GetJobWorkerStatistics(ctx context.Context, body JobWorkerStatisticsQuery, opts ...func(ApiGetJobWorkerStatisticsRequest) ApiGetJobWorkerStatisticsRequest) (*JobWorkerStatisticsQueryResult, error)
```

**Types:** [`JobWorkerStatisticsQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#JobWorkerStatisticsQuery), [`ApiGetJobWorkerStatisticsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetJobWorkerStatisticsRequest), [`JobWorkerStatisticsQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#JobWorkerStatisticsQueryResult)

GetJobWorkerStatistics calls the GetJobWorkerStatistics operation.

Example:

```go
from, to := time.Now().Add(-24*time.Hour), time.Now()
query := camunda.NewJobWorkerStatisticsQuery(*camunda.NewJobWorkerStatisticsFilter(from, to, "greet"))

result, err := client.GetJobWorkerStatistics(ctx, *query)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetLicense

```go
func (c *CamundaClient) GetLicense(ctx context.Context, opts ...func(ApiGetLicenseRequest) ApiGetLicenseRequest) (*LicenseResponse, error)
```

**Types:** [`ApiGetLicenseRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetLicenseRequest), [`LicenseResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#LicenseResponse)

GetLicense calls the GetLicense operation.

Example:

```go
license, err := client.GetLicense(ctx)
if err != nil {
	return err
}
fmt.Printf("license type=%s valid=%v\n", license.GetLicenseType(), license.GetValidLicense())
```

### GetMappingRule

```go
func (c *CamundaClient) GetMappingRule(ctx context.Context, mappingRuleId string, opts ...func(ApiGetMappingRuleRequest) ApiGetMappingRuleRequest) (*MappingRuleResult, error)
```

**Types:** [`ApiGetMappingRuleRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetMappingRuleRequest), [`MappingRuleResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#MappingRuleResult)

GetMappingRule calls the GetMappingRule operation.

Example:

```go
rule, err := client.GetMappingRule(ctx, "sso-auditors")
if err != nil {
	return err
}
fmt.Printf("%v\n", rule)
```

### GetProcessDefinition

```go
func (c *CamundaClient) GetProcessDefinition(ctx context.Context, processDefinitionKey ProcessDefinitionKey, opts ...func(ApiGetProcessDefinitionRequest) ApiGetProcessDefinitionRequest) (*ProcessDefinitionResult, error)
```

**Types:** [`ProcessDefinitionKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessDefinitionKey), [`ApiGetProcessDefinitionRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetProcessDefinitionRequest), [`ProcessDefinitionResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessDefinitionResult)

GetProcessDefinition calls the GetProcessDefinition operation.

Example:

```go
def, err := client.GetProcessDefinition(ctx, camunda.MustProcessDefinitionKey("2251799813685330"))
if err != nil {
	return err
}
fmt.Printf("%v\n", def)
```

### GetProcessDefinitionInstanceStatistics

```go
func (c *CamundaClient) GetProcessDefinitionInstanceStatistics(ctx context.Context, body ProcessDefinitionInstanceStatisticsQuery, opts ...func(ApiGetProcessDefinitionInstanceStatisticsRequest) ApiGetProcessDefinitionInstanceStatisticsRequest) (*ProcessDefinitionInstanceStatisticsQueryResult, error)
```

**Types:** [`ProcessDefinitionInstanceStatisticsQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessDefinitionInstanceStatisticsQuery), [`ApiGetProcessDefinitionInstanceStatisticsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetProcessDefinitionInstanceStatisticsRequest), [`ProcessDefinitionInstanceStatisticsQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessDefinitionInstanceStatisticsQueryResult)

GetProcessDefinitionInstanceStatistics calls the GetProcessDefinitionInstanceStatistics operation.

Example:

```go
result, err := client.GetProcessDefinitionInstanceStatistics(ctx,
	*camunda.NewProcessDefinitionInstanceStatisticsQuery())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetProcessDefinitionInstanceVersionStatistics

```go
func (c *CamundaClient) GetProcessDefinitionInstanceVersionStatistics(ctx context.Context, body ProcessDefinitionInstanceVersionStatisticsQuery, opts ...func(ApiGetProcessDefinitionInstanceVersionStatisticsRequest) ApiGetProcessDefinitionInstanceVersionStatisticsRequest) (*ProcessDefinitionInstanceVersionStatisticsQueryResult, error)
```

**Types:** [`ProcessDefinitionInstanceVersionStatisticsQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessDefinitionInstanceVersionStatisticsQuery), [`ApiGetProcessDefinitionInstanceVersionStatisticsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetProcessDefinitionInstanceVersionStatisticsRequest), [`ProcessDefinitionInstanceVersionStatisticsQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessDefinitionInstanceVersionStatisticsQueryResult)

GetProcessDefinitionInstanceVersionStatistics calls the GetProcessDefinitionInstanceVersionStatistics operation.

Example:

```go
query := camunda.NewProcessDefinitionInstanceVersionStatisticsQuery(
	*camunda.NewProcessDefinitionInstanceVersionStatisticsFilter("order-process"))

result, err := client.GetProcessDefinitionInstanceVersionStatistics(ctx, *query)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetProcessDefinitionMessageSubscriptionStatistics

```go
func (c *CamundaClient) GetProcessDefinitionMessageSubscriptionStatistics(ctx context.Context, body ProcessDefinitionMessageSubscriptionStatisticsQuery, opts ...func(ApiGetProcessDefinitionMessageSubscriptionStatisticsRequest) ApiGetProcessDefinitionMessageSubscriptionStatisticsRequest) (*ProcessDefinitionMessageSubscriptionStatisticsQueryResult, error)
```

**Types:** [`ProcessDefinitionMessageSubscriptionStatisticsQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessDefinitionMessageSubscriptionStatisticsQuery), [`ApiGetProcessDefinitionMessageSubscriptionStatisticsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetProcessDefinitionMessageSubscriptionStatisticsRequest), [`ProcessDefinitionMessageSubscriptionStatisticsQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessDefinitionMessageSubscriptionStatisticsQueryResult)

GetProcessDefinitionMessageSubscriptionStatistics calls the GetProcessDefinitionMessageSubscriptionStatistics operation.

Example:

```go
result, err := client.GetProcessDefinitionMessageSubscriptionStatistics(ctx,
	*camunda.NewProcessDefinitionMessageSubscriptionStatisticsQuery())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetProcessDefinitionStatistics

```go
func (c *CamundaClient) GetProcessDefinitionStatistics(ctx context.Context, processDefinitionKey ProcessDefinitionKey, body ProcessDefinitionElementStatisticsQuery, opts ...func(ApiGetProcessDefinitionStatisticsRequest) ApiGetProcessDefinitionStatisticsRequest) (*ProcessDefinitionElementStatisticsQueryResult, error)
```

**Types:** [`ProcessDefinitionKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessDefinitionKey), [`ProcessDefinitionElementStatisticsQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessDefinitionElementStatisticsQuery), [`ApiGetProcessDefinitionStatisticsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetProcessDefinitionStatisticsRequest), [`ProcessDefinitionElementStatisticsQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessDefinitionElementStatisticsQueryResult)

GetProcessDefinitionStatistics calls the GetProcessDefinitionStatistics operation.

Example:

```go
result, err := client.GetProcessDefinitionStatistics(ctx,
	camunda.MustProcessDefinitionKey("2251799813685330"),
	*camunda.NewProcessDefinitionElementStatisticsQuery())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetProcessDefinitionXML

```go
func (c *CamundaClient) GetProcessDefinitionXML(ctx context.Context, processDefinitionKey ProcessDefinitionKey, opts ...func(ApiGetProcessDefinitionXMLRequest) ApiGetProcessDefinitionXMLRequest) (string, error)
```

**Types:** [`ProcessDefinitionKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessDefinitionKey), [`ApiGetProcessDefinitionXMLRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetProcessDefinitionXMLRequest)

GetProcessDefinitionXML calls the GetProcessDefinitionXML operation.

Example:

```go
xml, err := client.GetProcessDefinitionXML(ctx, camunda.MustProcessDefinitionKey("2251799813685330"))
if err != nil {
	return err
}
fmt.Println(xml)
```

### GetProcessInstance

```go
func (c *CamundaClient) GetProcessInstance(ctx context.Context, processInstanceKey ProcessInstanceKey, opts ...func(ApiGetProcessInstanceRequest) ApiGetProcessInstanceRequest) (*ProcessInstanceResult, error)
```

**Types:** [`ProcessInstanceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceKey), [`ApiGetProcessInstanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetProcessInstanceRequest), [`ProcessInstanceResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceResult)

GetProcessInstance calls the GetProcessInstance operation.

Example:

```go
instance, err := client.GetProcessInstance(ctx, camunda.MustProcessInstanceKey("2251799813685340"))
if err != nil {
	return err
}
fmt.Printf("state=%v definition=%q\n", instance.GetState(), instance.GetProcessDefinitionId())
```

### GetProcessInstanceCallHierarchy

```go
func (c *CamundaClient) GetProcessInstanceCallHierarchy(ctx context.Context, processInstanceKey ProcessInstanceKey, opts ...func(ApiGetProcessInstanceCallHierarchyRequest) ApiGetProcessInstanceCallHierarchyRequest) ([]ProcessInstanceCallHierarchyEntry, error)
```

**Types:** [`ProcessInstanceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceKey), [`ApiGetProcessInstanceCallHierarchyRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetProcessInstanceCallHierarchyRequest), [`ProcessInstanceCallHierarchyEntry`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceCallHierarchyEntry)

GetProcessInstanceCallHierarchy calls the GetProcessInstanceCallHierarchy operation.

Example:

```go
hierarchy, err := client.GetProcessInstanceCallHierarchy(ctx, camunda.MustProcessInstanceKey("2251799813685340"))
if err != nil {
	return err
}
for _, entry := range hierarchy {
	fmt.Printf("%v\n", entry)
}
```

### GetProcessInstanceSequenceFlows

```go
func (c *CamundaClient) GetProcessInstanceSequenceFlows(ctx context.Context, processInstanceKey ProcessInstanceKey, opts ...func(ApiGetProcessInstanceSequenceFlowsRequest) ApiGetProcessInstanceSequenceFlowsRequest) (*ProcessInstanceSequenceFlowsQueryResult, error)
```

**Types:** [`ProcessInstanceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceKey), [`ApiGetProcessInstanceSequenceFlowsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetProcessInstanceSequenceFlowsRequest), [`ProcessInstanceSequenceFlowsQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceSequenceFlowsQueryResult)

GetProcessInstanceSequenceFlows calls the GetProcessInstanceSequenceFlows operation.

Example:

```go
result, err := client.GetProcessInstanceSequenceFlows(ctx, camunda.MustProcessInstanceKey("2251799813685340"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetProcessInstanceStatistics

```go
func (c *CamundaClient) GetProcessInstanceStatistics(ctx context.Context, processInstanceKey ProcessInstanceKey, opts ...func(ApiGetProcessInstanceStatisticsRequest) ApiGetProcessInstanceStatisticsRequest) (*ProcessInstanceElementStatisticsQueryResult, error)
```

**Types:** [`ProcessInstanceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceKey), [`ApiGetProcessInstanceStatisticsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetProcessInstanceStatisticsRequest), [`ProcessInstanceElementStatisticsQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceElementStatisticsQueryResult)

GetProcessInstanceStatistics calls the GetProcessInstanceStatistics operation.

Example:

```go
result, err := client.GetProcessInstanceStatistics(ctx, camunda.MustProcessInstanceKey("2251799813685340"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetProcessInstanceStatisticsByDefinition

```go
func (c *CamundaClient) GetProcessInstanceStatisticsByDefinition(ctx context.Context, body IncidentProcessInstanceStatisticsByDefinitionQuery, opts ...func(ApiGetProcessInstanceStatisticsByDefinitionRequest) ApiGetProcessInstanceStatisticsByDefinitionRequest) (*IncidentProcessInstanceStatisticsByDefinitionQueryResult, error)
```

**Types:** [`IncidentProcessInstanceStatisticsByDefinitionQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#IncidentProcessInstanceStatisticsByDefinitionQuery), [`ApiGetProcessInstanceStatisticsByDefinitionRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetProcessInstanceStatisticsByDefinitionRequest), [`IncidentProcessInstanceStatisticsByDefinitionQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#IncidentProcessInstanceStatisticsByDefinitionQueryResult)

GetProcessInstanceStatisticsByDefinition calls the GetProcessInstanceStatisticsByDefinition operation.

Example:

```go
query := camunda.NewIncidentProcessInstanceStatisticsByDefinitionQuery(
	*camunda.NewIncidentProcessInstanceStatisticsByDefinitionFilter(0))

result, err := client.GetProcessInstanceStatisticsByDefinition(ctx, *query)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetProcessInstanceStatisticsByError

```go
func (c *CamundaClient) GetProcessInstanceStatisticsByError(ctx context.Context, body IncidentProcessInstanceStatisticsByErrorQuery, opts ...func(ApiGetProcessInstanceStatisticsByErrorRequest) ApiGetProcessInstanceStatisticsByErrorRequest) (*IncidentProcessInstanceStatisticsByErrorQueryResult, error)
```

**Types:** [`IncidentProcessInstanceStatisticsByErrorQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#IncidentProcessInstanceStatisticsByErrorQuery), [`ApiGetProcessInstanceStatisticsByErrorRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetProcessInstanceStatisticsByErrorRequest), [`IncidentProcessInstanceStatisticsByErrorQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#IncidentProcessInstanceStatisticsByErrorQueryResult)

GetProcessInstanceStatisticsByError calls the GetProcessInstanceStatisticsByError operation.

Example:

```go
result, err := client.GetProcessInstanceStatisticsByError(ctx,
	*camunda.NewIncidentProcessInstanceStatisticsByErrorQuery())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetProcessInstanceWaitStateStatistics

```go
func (c *CamundaClient) GetProcessInstanceWaitStateStatistics(ctx context.Context, processInstanceKey ProcessInstanceKey, opts ...func(ApiGetProcessInstanceWaitStateStatisticsRequest) ApiGetProcessInstanceWaitStateStatisticsRequest) (*ProcessInstanceWaitStateStatisticsQueryResult, error)
```

**Types:** [`ProcessInstanceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceKey), [`ApiGetProcessInstanceWaitStateStatisticsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetProcessInstanceWaitStateStatisticsRequest), [`ProcessInstanceWaitStateStatisticsQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceWaitStateStatisticsQueryResult)

GetProcessInstanceWaitStateStatistics calls the GetProcessInstanceWaitStateStatistics operation.

Example:

```go
result, err := client.GetProcessInstanceWaitStateStatistics(ctx, camunda.MustProcessInstanceKey("2251799813685340"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetResource

```go
func (c *CamundaClient) GetResource(ctx context.Context, resourceKey ResourceKey, opts ...func(ApiGetResourceRequest) ApiGetResourceRequest) (*ResourceResult, error)
```

**Types:** [`ResourceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ResourceKey), [`ApiGetResourceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetResourceRequest), [`ResourceResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ResourceResult)

GetResource calls the GetResource operation.

Example:

```go
resource, err := client.GetResource(ctx, camunda.MustResourceKey("2251799813685350"))
if err != nil {
	return err
}
fmt.Printf("%v\n", resource)
```

### GetResourceContent

```go
func (c *CamundaClient) GetResourceContent(ctx context.Context, resourceKey ResourceKey, opts ...func(ApiGetResourceContentRequest) ApiGetResourceContentRequest) (map[string]interface{}, error)
```

**Types:** [`ResourceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ResourceKey), [`ApiGetResourceContentRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetResourceContentRequest)

GetResourceContent calls the GetResourceContent operation.

Example:

```go
content, err := client.GetResourceContent(ctx, camunda.MustResourceKey("2251799813685350"))
if err != nil {
	return err
}
fmt.Printf("%v\n", content)
```

### GetResourceContentBinary

```go
func (c *CamundaClient) GetResourceContentBinary(ctx context.Context, resourceKey ResourceKey, opts ...func(ApiGetResourceContentBinaryRequest) ApiGetResourceContentBinaryRequest) (*os.File, error)
```

**Types:** [`ResourceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ResourceKey), [`ApiGetResourceContentBinaryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetResourceContentBinaryRequest)

GetResourceContentBinary calls the GetResourceContentBinary operation.

Example:

```go
file, err := client.GetResourceContentBinary(ctx, camunda.MustResourceKey("2251799813685350"))
if err != nil {
	return err
}
fmt.Printf("downloaded to %s\n", file.Name())
```

### GetRestoreStatus

```go
func (c *CamundaClient) GetRestoreStatus(ctx context.Context, opts ...func(ApiGetRestoreStatusRequest) ApiGetRestoreStatusRequest) (*RestoreStatusResponse, error)
```

**Types:** [`ApiGetRestoreStatusRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetRestoreStatusRequest), [`RestoreStatusResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#RestoreStatusResponse)

GetRestoreStatus calls the GetRestoreStatus operation.

Example:

```go
// Reports the in-flight restore only — 404 once it has finished.
status, err := client.GetRestoreStatus(ctx)
if err != nil {
	return err
}
fmt.Printf("restore %s: %s\n", status.GetChangeId(), status.GetStatus())
for _, broker := range status.GetBrokers() {
	fmt.Printf("%v\n", broker)
}
```

### GetRole

```go
func (c *CamundaClient) GetRole(ctx context.Context, roleId string, opts ...func(ApiGetRoleRequest) ApiGetRoleRequest) (*RoleResult, error)
```

**Types:** [`ApiGetRoleRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetRoleRequest), [`RoleResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#RoleResult)

GetRole calls the GetRole operation.

Example:

```go
role, err := client.GetRole(ctx, "auditor")
if err != nil {
	return err
}
fmt.Printf("%v\n", role)
```

### GetRuntimeBackup

```go
func (c *CamundaClient) GetRuntimeBackup(ctx context.Context, backupId int64, opts ...func(ApiGetRuntimeBackupRequest) ApiGetRuntimeBackupRequest) (*BackupInfo, error)
```

**Types:** [`ApiGetRuntimeBackupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetRuntimeBackupRequest), [`BackupInfo`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#BackupInfo)

GetRuntimeBackup calls the GetRuntimeBackup operation.

Example:

```go
backup, err := client.GetRuntimeBackup(ctx, 42)
if err != nil {
	return err
}
// Details cover every partition of the physical tenant.
for _, partition := range backup.GetDetails() {
	fmt.Printf("%v\n", partition)
}
```

### GetRuntimeBackupAsClusterAdmin

```go
func (c *CamundaClient) GetRuntimeBackupAsClusterAdmin(ctx context.Context, backupId int64, opts ...func(ApiGetRuntimeBackupAsClusterAdminRequest) ApiGetRuntimeBackupAsClusterAdminRequest) (*ClusterRuntimeBackupInfo, error)
```

**Types:** [`ApiGetRuntimeBackupAsClusterAdminRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetRuntimeBackupAsClusterAdminRequest), [`ClusterRuntimeBackupInfo`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterRuntimeBackupInfo)

GetRuntimeBackupAsClusterAdmin calls the GetRuntimeBackupAsClusterAdmin operation.

Example:

```go
backup, err := client.GetRuntimeBackupAsClusterAdmin(ctx, 42)
if err != nil {
	return err
}
fmt.Printf("cluster runtime backup %d: state=%v\n", backup.GetBackupId(), backup.GetState())
for _, tenant := range backup.GetPhysicalTenants() {
	fmt.Printf("  tenant %v\n", tenant)
}
```

### GetRuntimeBackupState

```go
func (c *CamundaClient) GetRuntimeBackupState(ctx context.Context, opts ...func(ApiGetRuntimeBackupStateRequest) ApiGetRuntimeBackupStateRequest) (*RuntimeBackupState, error)
```

**Types:** [`ApiGetRuntimeBackupStateRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetRuntimeBackupStateRequest), [`RuntimeBackupState`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#RuntimeBackupState)

GetRuntimeBackupState calls the GetRuntimeBackupState operation.

Example:

```go
state, err := client.GetRuntimeBackupState(ctx)
if err != nil {
	return err
}
for _, checkpoint := range state.GetCheckpointStates() {
	fmt.Printf("%v\n", checkpoint)
}
```

### GetRuntimeBackupStateAsClusterAdmin

```go
func (c *CamundaClient) GetRuntimeBackupStateAsClusterAdmin(ctx context.Context, opts ...func(ApiGetRuntimeBackupStateAsClusterAdminRequest) ApiGetRuntimeBackupStateAsClusterAdminRequest) (*ClusterRuntimeBackupState, error)
```

**Types:** [`ApiGetRuntimeBackupStateAsClusterAdminRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetRuntimeBackupStateAsClusterAdminRequest), [`ClusterRuntimeBackupState`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterRuntimeBackupState)

GetRuntimeBackupStateAsClusterAdmin calls the GetRuntimeBackupStateAsClusterAdmin operation.

Example:

```go
// Returns the runtime backup state for every physical tenant in the cluster.
state, err := client.GetRuntimeBackupStateAsClusterAdmin(ctx)
if err != nil {
	return err
}
for _, tenant := range state.GetPhysicalTenants() {
	fmt.Printf("%v\n", tenant)
}
```

### GetStartProcessForm

```go
func (c *CamundaClient) GetStartProcessForm(ctx context.Context, processDefinitionKey ProcessDefinitionKey, opts ...func(ApiGetStartProcessFormRequest) ApiGetStartProcessFormRequest) (*FormResult, error)
```

**Types:** [`ProcessDefinitionKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessDefinitionKey), [`ApiGetStartProcessFormRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetStartProcessFormRequest), [`FormResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#FormResult)

GetStartProcessForm calls the GetStartProcessForm operation.

Example:

```go
form, err := client.GetStartProcessForm(ctx, camunda.MustProcessDefinitionKey("2251799813685330"))
if err != nil {
	return err
}
fmt.Printf("%v\n", form)
```

### GetStatus

```go
func (c *CamundaClient) GetStatus(ctx context.Context, opts ...func(ApiGetStatusRequest) ApiGetStatusRequest) error
```

**Types:** [`ApiGetStatusRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetStatusRequest)

GetStatus calls the GetStatus operation.

Example:

```go
// Readiness probe: returns a non-nil error when the cluster is not ready.
if err := client.GetStatus(ctx); err != nil {
	return err
}
fmt.Println("cluster is ready")
```

### GetSystemConfiguration

```go
func (c *CamundaClient) GetSystemConfiguration(ctx context.Context, opts ...func(ApiGetSystemConfigurationRequest) ApiGetSystemConfigurationRequest) (*SystemConfigurationResponse, error)
```

**Types:** [`ApiGetSystemConfigurationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetSystemConfigurationRequest), [`SystemConfigurationResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#SystemConfigurationResponse)

GetSystemConfiguration calls the GetSystemConfiguration operation.

Example:

```go
config, err := client.GetSystemConfiguration(ctx)
if err != nil {
	return err
}
fmt.Printf("%v\n", config)
```

### GetTenant

```go
func (c *CamundaClient) GetTenant(ctx context.Context, tenantId string, opts ...func(ApiGetTenantRequest) ApiGetTenantRequest) (*TenantResult, error)
```

**Types:** [`ApiGetTenantRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetTenantRequest), [`TenantResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#TenantResult)

GetTenant calls the GetTenant operation.

Example:

```go
tenant, err := client.GetTenant(ctx, "tenant-a")
if err != nil {
	return err
}
fmt.Printf("%v\n", tenant)
```

### GetTenantClusterVariable

```go
func (c *CamundaClient) GetTenantClusterVariable(ctx context.Context, tenantId string, name string, opts ...func(ApiGetTenantClusterVariableRequest) ApiGetTenantClusterVariableRequest) (*ClusterVariableResult, error)
```

**Types:** [`ApiGetTenantClusterVariableRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetTenantClusterVariableRequest), [`ClusterVariableResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterVariableResult)

GetTenantClusterVariable calls the GetTenantClusterVariable operation.

Example:

```go
result, err := client.GetTenantClusterVariable(ctx, "tenant-a", "region")
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetTopology

```go
func (c *CamundaClient) GetTopology(ctx context.Context, opts ...func(ApiGetTopologyRequest) ApiGetTopologyRequest) (*TopologyResponse, error)
```

**Types:** [`ApiGetTopologyRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetTopologyRequest), [`TopologyResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#TopologyResponse)

GetTopology calls the GetTopology operation.

Example:

```go
topology, err := client.GetTopology(ctx)
if err != nil {
	return err
}
fmt.Printf("gateway %s — %d broker(s), %d partition(s)\n",
	topology.GetGatewayVersion(), len(topology.GetBrokers()), topology.GetPartitionsCount())
```

### GetUsageMetrics

```go
func (c *CamundaClient) GetUsageMetrics(ctx context.Context, opts ...func(ApiGetUsageMetricsRequest) ApiGetUsageMetricsRequest) (*UsageMetricsResponse, error)
```

**Types:** [`ApiGetUsageMetricsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetUsageMetricsRequest), [`UsageMetricsResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UsageMetricsResponse)

GetUsageMetrics calls the GetUsageMetrics operation.

Example:

```go
metrics, err := client.GetUsageMetrics(ctx)
if err != nil {
	return err
}
fmt.Printf("%v\n", metrics)
```

### GetUser

```go
func (c *CamundaClient) GetUser(ctx context.Context, username string, opts ...func(ApiGetUserRequest) ApiGetUserRequest) (*UserResult, error)
```

**Types:** [`ApiGetUserRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetUserRequest), [`UserResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserResult)

GetUser calls the GetUser operation.

Example:

```go
user, err := client.GetUser(ctx, "alice")
if err != nil {
	return err
}
fmt.Printf("%v\n", user)
```

### GetUserTask

```go
func (c *CamundaClient) GetUserTask(ctx context.Context, userTaskKey UserTaskKey, opts ...func(ApiGetUserTaskRequest) ApiGetUserTaskRequest) (*UserTaskResult, error)
```

**Types:** [`UserTaskKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserTaskKey), [`ApiGetUserTaskRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetUserTaskRequest), [`UserTaskResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserTaskResult)

GetUserTask calls the GetUserTask operation.

Example:

```go
task, err := client.GetUserTask(ctx, camunda.MustUserTaskKey("2251799813685380"))
if err != nil {
	return err
}
fmt.Printf("%v\n", task)
```

### GetUserTaskForm

```go
func (c *CamundaClient) GetUserTaskForm(ctx context.Context, userTaskKey UserTaskKey, opts ...func(ApiGetUserTaskFormRequest) ApiGetUserTaskFormRequest) (*FormResult, error)
```

**Types:** [`UserTaskKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserTaskKey), [`ApiGetUserTaskFormRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetUserTaskFormRequest), [`FormResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#FormResult)

GetUserTaskForm calls the GetUserTaskForm operation.

Example:

```go
form, err := client.GetUserTaskForm(ctx, camunda.MustUserTaskKey("2251799813685380"))
if err != nil {
	return err
}
fmt.Printf("%v\n", form)
```

### GetVariable

```go
func (c *CamundaClient) GetVariable(ctx context.Context, variableKey VariableKey, opts ...func(ApiGetVariableRequest) ApiGetVariableRequest) (*VariableResult, error)
```

**Types:** [`VariableKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#VariableKey), [`ApiGetVariableRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiGetVariableRequest), [`VariableResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#VariableResult)

GetVariable calls the GetVariable operation.

Example:

```go
variable, err := client.GetVariable(ctx, camunda.MustVariableKey("2251799813685390"))
if err != nil {
	return err
}
fmt.Printf("%v\n", variable)
```

### ListHistoryBackups

```go
func (c *CamundaClient) ListHistoryBackups(ctx context.Context, opts ...func(ApiListHistoryBackupsRequest) ApiListHistoryBackupsRequest) ([]HistoryBackupInfo, error)
```

**Types:** [`ApiListHistoryBackupsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiListHistoryBackupsRequest), [`HistoryBackupInfo`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#HistoryBackupInfo)

ListHistoryBackups calls the ListHistoryBackups operation.

Example:

```go
backups, err := client.ListHistoryBackups(ctx)
if err != nil {
	return err
}
for _, backup := range backups {
	fmt.Printf("history backup %d is %v\n", backup.GetBackupId(), backup.GetState())
}
```

### ListHistoryBackupsAsClusterAdmin

```go
func (c *CamundaClient) ListHistoryBackupsAsClusterAdmin(ctx context.Context, opts ...func(ApiListHistoryBackupsAsClusterAdminRequest) ApiListHistoryBackupsAsClusterAdminRequest) ([]ClusterHistoryBackupInfo, error)
```

**Types:** [`ApiListHistoryBackupsAsClusterAdminRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiListHistoryBackupsAsClusterAdminRequest), [`ClusterHistoryBackupInfo`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterHistoryBackupInfo)

ListHistoryBackupsAsClusterAdmin calls the ListHistoryBackupsAsClusterAdmin operation.

Example:

```go
// Lists history backups across all physical tenants in the cluster.
backups, err := client.ListHistoryBackupsAsClusterAdmin(ctx)
if err != nil {
	return err
}
for _, backup := range backups {
	fmt.Printf("cluster history backup %d: %d tenant(s)\n", backup.GetBackupId(), len(backup.GetPhysicalTenants()))
}
```

### ListRuntimeBackups

```go
func (c *CamundaClient) ListRuntimeBackups(ctx context.Context, opts ...func(ApiListRuntimeBackupsRequest) ApiListRuntimeBackupsRequest) ([]BackupInfo, error)
```

**Types:** [`ApiListRuntimeBackupsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiListRuntimeBackupsRequest), [`BackupInfo`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#BackupInfo)

ListRuntimeBackups calls the ListRuntimeBackups operation.

Example:

```go
backups, err := client.ListRuntimeBackups(ctx)
if err != nil {
	return err
}
for _, backup := range backups {
	fmt.Printf("backup %v is %v\n", backup.GetBackupId(), backup.GetState())
}
```

### ListRuntimeBackupsAsClusterAdmin

```go
func (c *CamundaClient) ListRuntimeBackupsAsClusterAdmin(ctx context.Context, opts ...func(ApiListRuntimeBackupsAsClusterAdminRequest) ApiListRuntimeBackupsAsClusterAdminRequest) ([]ClusterRuntimeBackupInfo, error)
```

**Types:** [`ApiListRuntimeBackupsAsClusterAdminRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiListRuntimeBackupsAsClusterAdminRequest), [`ClusterRuntimeBackupInfo`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterRuntimeBackupInfo)

ListRuntimeBackupsAsClusterAdmin calls the ListRuntimeBackupsAsClusterAdmin operation.

Example:

```go
// Lists runtime backups across all physical tenants in the cluster.
backups, err := client.ListRuntimeBackupsAsClusterAdmin(ctx)
if err != nil {
	return err
}
for _, backup := range backups {
	fmt.Printf("cluster runtime backup %d: state=%v, %d tenant(s)\n",
		backup.GetBackupId(), backup.GetState(), len(backup.GetPhysicalTenants()))
}
```

### ListSecrets

```go
func (c *CamundaClient) ListSecrets(ctx context.Context, opts ...func(ApiListSecretsRequest) ApiListSecretsRequest) (*SecretListResult, error)
```

**Types:** [`ApiListSecretsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiListSecretsRequest), [`SecretListResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#SecretListResult)

ListSecrets calls the ListSecrets operation.

Example:

```go
// Returns only the references the caller is authorized to see — never values.
result, err := client.ListSecrets(ctx)
if err != nil {
	return err
}
for _, reference := range result.GetReferences() {
	fmt.Printf("%v\n", reference)
}
```

### MigrateProcessInstance

```go
func (c *CamundaClient) MigrateProcessInstance(ctx context.Context, processInstanceKey ProcessInstanceKey, body ProcessInstanceMigrationInstruction, opts ...func(ApiMigrateProcessInstanceRequest) ApiMigrateProcessInstanceRequest) error
```

**Types:** [`ProcessInstanceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceKey), [`ProcessInstanceMigrationInstruction`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceMigrationInstruction), [`ApiMigrateProcessInstanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiMigrateProcessInstanceRequest)

MigrateProcessInstance calls the MigrateProcessInstance operation.

Example:

```go
instruction := camunda.NewProcessInstanceMigrationInstruction(
	camunda.ProcessDefinitionKey("2251799813685399"),
	[]camunda.MigrateProcessInstanceMappingInstruction{
		*camunda.NewMigrateProcessInstanceMappingInstruction("review", "review-v2"),
	})

return client.MigrateProcessInstance(ctx, camunda.MustProcessInstanceKey("2251799813685340"), *instruction)
```

### MigrateProcessInstancesBatchOperation

```go
func (c *CamundaClient) MigrateProcessInstancesBatchOperation(ctx context.Context, body ProcessInstanceMigrationBatchOperationRequest, opts ...func(ApiMigrateProcessInstancesBatchOperationRequest) ApiMigrateProcessInstancesBatchOperationRequest) (*BatchOperationCreatedResult, error)
```

**Types:** [`ProcessInstanceMigrationBatchOperationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceMigrationBatchOperationRequest), [`ApiMigrateProcessInstancesBatchOperationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiMigrateProcessInstancesBatchOperationRequest), [`BatchOperationCreatedResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#BatchOperationCreatedResult)

MigrateProcessInstancesBatchOperation calls the MigrateProcessInstancesBatchOperation operation.

Example:

```go
plan := camunda.NewProcessInstanceMigrationBatchOperationPlan(
	camunda.ProcessDefinitionKey("2251799813685399"),
	[]camunda.MigrateProcessInstanceMappingInstruction{
		*camunda.NewMigrateProcessInstanceMappingInstruction("review", "review-v2"),
	})
req := camunda.NewProcessInstanceMigrationBatchOperationRequest(*camunda.NewProcessInstanceFilter(), *plan)

result, err := client.MigrateProcessInstancesBatchOperation(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
```

### ModifyProcessInstance

```go
func (c *CamundaClient) ModifyProcessInstance(ctx context.Context, processInstanceKey ProcessInstanceKey, body ProcessInstanceModificationInstruction, opts ...func(ApiModifyProcessInstanceRequest) ApiModifyProcessInstanceRequest) error
```

**Types:** [`ProcessInstanceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceKey), [`ProcessInstanceModificationInstruction`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceModificationInstruction), [`ApiModifyProcessInstanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiModifyProcessInstanceRequest)

ModifyProcessInstance calls the ModifyProcessInstance operation.

Example:

```go
return client.ModifyProcessInstance(ctx,
	camunda.MustProcessInstanceKey("2251799813685340"),
	*camunda.NewProcessInstanceModificationInstruction())
```

### ModifyProcessInstancesBatchOperation

```go
func (c *CamundaClient) ModifyProcessInstancesBatchOperation(ctx context.Context, body ProcessInstanceModificationBatchOperationRequest, opts ...func(ApiModifyProcessInstancesBatchOperationRequest) ApiModifyProcessInstancesBatchOperationRequest) (*BatchOperationCreatedResult, error)
```

**Types:** [`ProcessInstanceModificationBatchOperationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceModificationBatchOperationRequest), [`ApiModifyProcessInstancesBatchOperationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiModifyProcessInstancesBatchOperationRequest), [`BatchOperationCreatedResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#BatchOperationCreatedResult)

ModifyProcessInstancesBatchOperation calls the ModifyProcessInstancesBatchOperation operation.

Example:

```go
req := camunda.NewProcessInstanceModificationBatchOperationRequest(
	*camunda.NewProcessInstanceFilter(),
	[]camunda.ProcessInstanceModificationMoveBatchOperationInstruction{
		*camunda.NewProcessInstanceModificationMoveBatchOperationInstruction("review", "approve"),
	})

result, err := client.ModifyProcessInstancesBatchOperation(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
```

### NewJobWorker

```go
func (c *CamundaClient) NewJobWorker(jobType string, handler JobHandler, opts ...WorkerOption) *JobWorker
```

NewJobWorker creates a worker for jobType. Defaults are seeded from the
client's CAMUNDA_WORKER_* configuration and can be overridden with options.

### NewStreamJobWorker

```go
func (c *CamundaClient) NewStreamJobWorker(jobType string, handler JobHandler, opts ...StreamWorkerOption) *StreamJobWorker
```

NewStreamJobWorker creates a gRPC streaming worker for jobType. Defaults are
seeded from the client's CAMUNDA_WORKER_* configuration and can be overridden
with options.

### PauseClusterExporting

```go
func (c *CamundaClient) PauseClusterExporting(ctx context.Context, opts ...func(ApiPauseClusterExportingRequest) ApiPauseClusterExportingRequest) error
```

**Types:** [`ApiPauseClusterExportingRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiPauseClusterExportingRequest)

PauseClusterExporting calls the PauseClusterExporting operation.

Example:

```go
// Pauses exporting across all physical tenants in the cluster.
// While paused, reads from secondary storage stop advancing for every tenant.
if err := client.PauseClusterExporting(ctx); err != nil {
	return err
}
```

### PauseExporting

```go
func (c *CamundaClient) PauseExporting(ctx context.Context, opts ...func(ApiPauseExportingRequest) ApiPauseExportingRequest) error
```

**Types:** [`ApiPauseExportingRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiPauseExportingRequest)

PauseExporting calls the PauseExporting operation.

Example:

```go
// While exporting is paused, reads from secondary storage stop advancing.
if err := client.PauseExporting(ctx); err != nil {
	return err
}
```

### PinAt

```go
func (c *CamundaClient) PinAt(ctx context.Context, t time.Time) error
```

PinAt moves the engine clock to t.

### PinClock

```go
func (c *CamundaClient) PinClock(ctx context.Context, body ClockPinRequest, opts ...func(ApiPinClockRequest) ApiPinClockRequest) error
```

**Types:** [`ClockPinRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClockPinRequest), [`ApiPinClockRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiPinClockRequest)

PinClock calls the PinClock operation.

Example:

```go
// Pin the cluster clock to a fixed instant (epoch milliseconds).
pinned := time.Date(2025, time.January, 1, 0, 0, 0, 0, time.UTC)
return client.PinClock(ctx, *camunda.NewClockPinRequest(pinned.UnixMilli()))
```

### PublishMessage

```go
func (c *CamundaClient) PublishMessage(ctx context.Context, body MessagePublicationRequest, opts ...func(ApiPublishMessageRequest) ApiPublishMessageRequest) (*MessagePublicationResult, error)
```

**Types:** [`MessagePublicationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#MessagePublicationRequest), [`ApiPublishMessageRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiPublishMessageRequest), [`MessagePublicationResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#MessagePublicationResult)

PublishMessage calls the PublishMessage operation.

Example:

```go
req := camunda.NewMessagePublicationRequest("order-confirmed")
req.SetCorrelationKey("order-42")
req.SetVariables(map[string]any{"confirmedBy": "payment-service"})

result, err := client.PublishMessage(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### Raw

```go
func (c *CamundaClient) Raw() *camundaapi.APIClient
```

Raw returns the underlying generated client for operations or options not yet
surfaced on the ergonomic facade.

### ResetClock

```go
func (c *CamundaClient) ResetClock(ctx context.Context, opts ...func(ApiResetClockRequest) ApiResetClockRequest) error
```

**Types:** [`ApiResetClockRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiResetClockRequest)

ResetClock calls the ResetClock operation.

Example:

```go
// Release a previously pinned clock back to system time.
return client.ResetClock(ctx)
```

### ResetToLive

```go
func (c *CamundaClient) ResetToLive(ctx context.Context) error
```

ResetToLive returns the engine clock to real time.

### ResolveIncident

```go
func (c *CamundaClient) ResolveIncident(ctx context.Context, incidentKey IncidentKey, body IncidentResolutionRequest, opts ...func(ApiResolveIncidentRequest) ApiResolveIncidentRequest) error
```

**Types:** [`IncidentKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#IncidentKey), [`IncidentResolutionRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#IncidentResolutionRequest), [`ApiResolveIncidentRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiResolveIncidentRequest)

ResolveIncident calls the ResolveIncident operation.

Example:

```go
// After fixing the root cause (e.g. correcting a variable), resolve the
// incident so the engine retries the failed element.
return client.ResolveIncident(ctx,
	camunda.MustIncidentKey("2251799813685300"),
	*camunda.NewIncidentResolutionRequest())
```

### ResolveIncidentsBatchOperation

```go
func (c *CamundaClient) ResolveIncidentsBatchOperation(ctx context.Context, body ProcessInstanceIncidentResolutionBatchOperationRequest, opts ...func(ApiResolveIncidentsBatchOperationRequest) ApiResolveIncidentsBatchOperationRequest) (*BatchOperationCreatedResult, error)
```

**Types:** [`ProcessInstanceIncidentResolutionBatchOperationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceIncidentResolutionBatchOperationRequest), [`ApiResolveIncidentsBatchOperationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiResolveIncidentsBatchOperationRequest), [`BatchOperationCreatedResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#BatchOperationCreatedResult)

ResolveIncidentsBatchOperation calls the ResolveIncidentsBatchOperation operation.

Example:

```go
req := camunda.NewProcessInstanceIncidentResolutionBatchOperationRequest(*camunda.NewProcessInstanceFilter())

result, err := client.ResolveIncidentsBatchOperation(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
```

### ResolveProcessInstanceIncidents

```go
func (c *CamundaClient) ResolveProcessInstanceIncidents(ctx context.Context, processInstanceKey ProcessInstanceKey, opts ...func(ApiResolveProcessInstanceIncidentsRequest) ApiResolveProcessInstanceIncidentsRequest) (*BatchOperationCreatedResult, error)
```

**Types:** [`ProcessInstanceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceKey), [`ApiResolveProcessInstanceIncidentsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiResolveProcessInstanceIncidentsRequest), [`BatchOperationCreatedResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#BatchOperationCreatedResult)

ResolveProcessInstanceIncidents calls the ResolveProcessInstanceIncidents operation.

Example:

```go
result, err := client.ResolveProcessInstanceIncidents(ctx, camunda.MustProcessInstanceKey("2251799813685340"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### ResolveSecrets

```go
func (c *CamundaClient) ResolveSecrets(ctx context.Context, body SecretResolveRequest, opts ...func(ApiResolveSecretsRequest) ApiResolveSecretsRequest) (*SecretResolveResult, error)
```

**Types:** [`SecretResolveRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#SecretResolveRequest), [`ApiResolveSecretsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiResolveSecretsRequest), [`SecretResolveResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#SecretResolveResult)

ResolveSecrets calls the ResolveSecrets operation.

Example:

```go
// References take the form `camunda.secrets.<name>`.
req := camunda.NewSecretResolveRequest([]string{"camunda.secrets.MY_API_KEY", "camunda.secrets.MY_TOKEN"})

result, err := client.ResolveSecrets(ctx, *req)
if err != nil {
	return err
}
for _, secret := range result.GetResolved() {
	fmt.Printf("%v = %v\n", secret.GetReference(), secret.GetValue())
}
```

### Restore

```go
func (c *CamundaClient) Restore(ctx context.Context, body RestoreRequest, opts ...func(ApiRestoreRequest) ApiRestoreRequest) (*ClusterRestoreResponse, error)
```

**Types:** [`RestoreRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#RestoreRequest), [`ApiRestoreRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiRestoreRequest), [`ClusterRestoreResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterRestoreResponse)

Restore calls the Restore operation.

Example:

```go
result, err := client.Restore(ctx, *camunda.NewRestoreRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### RestoreAsClusterAdmin

```go
func (c *CamundaClient) RestoreAsClusterAdmin(ctx context.Context, body ClusterRestoreRequest, opts ...func(ApiRestoreAsClusterAdminRequest) ApiRestoreAsClusterAdminRequest) (*ClusterRestoreResponse, error)
```

**Types:** [`ClusterRestoreRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterRestoreRequest), [`ApiRestoreAsClusterAdminRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiRestoreAsClusterAdminRequest), [`ClusterRestoreResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterRestoreResponse)

RestoreAsClusterAdmin calls the RestoreAsClusterAdmin operation.

Example:

```go
// Triggers a cluster-level restore (cluster-admin authority), restoring from the given backup IDs.
// backupIds are one per partition, so the placeholder slice below must be extended to
// match the actual partition count of the target cluster (shown here for a 2-partition cluster).
restoreRequest := camunda.NewClusterRestoreRequestWithDefaults()
restoreRequest.SetBackupIds([]int64{1, 2})
result, err := client.RestoreAsClusterAdmin(ctx, *restoreRequest)
if err != nil {
	return err
}
fmt.Printf("restore change id: %s\n", result.GetChangeId())
```

### ResumeBatchOperation

```go
func (c *CamundaClient) ResumeBatchOperation(ctx context.Context, batchOperationKey string, opts ...func(ApiResumeBatchOperationRequest) ApiResumeBatchOperationRequest) error
```

**Types:** [`ApiResumeBatchOperationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiResumeBatchOperationRequest)

ResumeBatchOperation calls the ResumeBatchOperation operation.

Example:

```go
return client.ResumeBatchOperation(ctx, "2251799813685290")
```

### ResumeClusterExporting

```go
func (c *CamundaClient) ResumeClusterExporting(ctx context.Context, opts ...func(ApiResumeClusterExportingRequest) ApiResumeClusterExportingRequest) error
```

**Types:** [`ApiResumeClusterExportingRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiResumeClusterExportingRequest)

ResumeClusterExporting calls the ResumeClusterExporting operation.

Example:

```go
// Resumes exporting across all physical tenants in the cluster.
if err := client.ResumeClusterExporting(ctx); err != nil {
	return err
}
```

### ResumeExporting

```go
func (c *CamundaClient) ResumeExporting(ctx context.Context, opts ...func(ApiResumeExportingRequest) ApiResumeExportingRequest) error
```

**Types:** [`ApiResumeExportingRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiResumeExportingRequest)

ResumeExporting calls the ResumeExporting operation.

Example:

```go
if err := client.ResumeExporting(ctx); err != nil {
	return err
}
```

### ResumeProcessInstance

```go
func (c *CamundaClient) ResumeProcessInstance(ctx context.Context, processInstanceKey ProcessInstanceKey, body ResumeProcessInstanceRequest, opts ...func(ApiResumeProcessInstanceRequest) ApiResumeProcessInstanceRequest) error
```

**Types:** [`ProcessInstanceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceKey), [`ResumeProcessInstanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ResumeProcessInstanceRequest), [`ApiResumeProcessInstanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiResumeProcessInstanceRequest)

ResumeProcessInstance calls the ResumeProcessInstance operation.

Example:

```go
return client.ResumeProcessInstance(ctx,
	camunda.MustProcessInstanceKey("2251799813685340"),
	*camunda.NewResumeProcessInstanceRequest())
```

### ResumeProcessInstancesBatchOperation

```go
func (c *CamundaClient) ResumeProcessInstancesBatchOperation(ctx context.Context, body ProcessInstanceResumptionBatchOperationRequest, opts ...func(ApiResumeProcessInstancesBatchOperationRequest) ApiResumeProcessInstancesBatchOperationRequest) (*BatchOperationCreatedResult, error)
```

**Types:** [`ProcessInstanceResumptionBatchOperationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceResumptionBatchOperationRequest), [`ApiResumeProcessInstancesBatchOperationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiResumeProcessInstancesBatchOperationRequest), [`BatchOperationCreatedResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#BatchOperationCreatedResult)

ResumeProcessInstancesBatchOperation calls the ResumeProcessInstancesBatchOperation operation.

Example:

```go
// Resume every previously-suspended instance matching a filter.
req := camunda.NewProcessInstanceResumptionBatchOperationRequest(*camunda.NewProcessInstanceFilter())

result, err := client.ResumeProcessInstancesBatchOperation(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
```

### SearchAgentDefinitions

```go
func (c *CamundaClient) SearchAgentDefinitions(ctx context.Context, body AgentDefinitionSearchQuery, opts ...func(ApiSearchAgentDefinitionsRequest) ApiSearchAgentDefinitionsRequest) (*AgentDefinitionSearchQueryResult, error)
```

**Types:** [`AgentDefinitionSearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AgentDefinitionSearchQuery), [`ApiSearchAgentDefinitionsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchAgentDefinitionsRequest), [`AgentDefinitionSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AgentDefinitionSearchQueryResult)

SearchAgentDefinitions calls the SearchAgentDefinitions operation.

Example:

```go
result, err := client.SearchAgentDefinitions(ctx, *camunda.NewAgentDefinitionSearchQuery())
if err != nil {
	return err
}
for _, d := range result.GetItems() {
	fmt.Printf("%v\n", d)
}
```

### SearchAgentInstanceHistory

```go
func (c *CamundaClient) SearchAgentInstanceHistory(ctx context.Context, agentInstanceKey AgentInstanceKey, body AgentInstanceHistorySearchQuery, opts ...func(ApiSearchAgentInstanceHistoryRequest) ApiSearchAgentInstanceHistoryRequest) (*AgentInstanceHistorySearchQueryResult, error)
```

**Types:** [`AgentInstanceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AgentInstanceKey), [`AgentInstanceHistorySearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AgentInstanceHistorySearchQuery), [`ApiSearchAgentInstanceHistoryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchAgentInstanceHistoryRequest), [`AgentInstanceHistorySearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AgentInstanceHistorySearchQueryResult)

SearchAgentInstanceHistory calls the SearchAgentInstanceHistory operation.

Example:

```go
result, err := client.SearchAgentInstanceHistory(ctx,
	camunda.MustAgentInstanceKey("2251799813685370"),
	*camunda.NewAgentInstanceHistorySearchQuery())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchAgentInstances

```go
func (c *CamundaClient) SearchAgentInstances(ctx context.Context, body AgentInstanceSearchQuery, opts ...func(ApiSearchAgentInstancesRequest) ApiSearchAgentInstancesRequest) (*AgentInstanceSearchQueryResult, error)
```

**Types:** [`AgentInstanceSearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AgentInstanceSearchQuery), [`ApiSearchAgentInstancesRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchAgentInstancesRequest), [`AgentInstanceSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AgentInstanceSearchQueryResult)

SearchAgentInstances calls the SearchAgentInstances operation.

Example:

```go
result, err := client.SearchAgentInstances(ctx, *camunda.NewAgentInstanceSearchQuery())
if err != nil {
	return err
}
for _, a := range result.GetItems() {
	fmt.Printf("%v\n", a)
}
```

### SearchAuditLogs

```go
func (c *CamundaClient) SearchAuditLogs(ctx context.Context, body AuditLogSearchQueryRequest, opts ...func(ApiSearchAuditLogsRequest) ApiSearchAuditLogsRequest) (*AuditLogSearchQueryResult, error)
```

**Types:** [`AuditLogSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AuditLogSearchQueryRequest), [`ApiSearchAuditLogsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchAuditLogsRequest), [`AuditLogSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AuditLogSearchQueryResult)

SearchAuditLogs calls the SearchAuditLogs operation.

Example:

```go
result, err := client.SearchAuditLogs(ctx, *camunda.NewAuditLogSearchQueryRequest())
if err != nil {
	return err
}
for _, entry := range result.GetItems() {
	fmt.Printf("%v\n", entry)
}
```

### SearchAuthorizations

```go
func (c *CamundaClient) SearchAuthorizations(ctx context.Context, body AuthorizationSearchQuery, opts ...func(ApiSearchAuthorizationsRequest) ApiSearchAuthorizationsRequest) (*AuthorizationSearchResult, error)
```

**Types:** [`AuthorizationSearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AuthorizationSearchQuery), [`ApiSearchAuthorizationsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchAuthorizationsRequest), [`AuthorizationSearchResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AuthorizationSearchResult)

SearchAuthorizations calls the SearchAuthorizations operation.

Example:

```go
result, err := client.SearchAuthorizations(ctx, *camunda.NewAuthorizationSearchQuery())
if err != nil {
	return err
}
for _, a := range result.GetItems() {
	fmt.Printf("%v\n", a)
}
```

### SearchBatchOperationItems

```go
func (c *CamundaClient) SearchBatchOperationItems(ctx context.Context, body BatchOperationItemSearchQuery, opts ...func(ApiSearchBatchOperationItemsRequest) ApiSearchBatchOperationItemsRequest) (*BatchOperationItemSearchQueryResult, error)
```

**Types:** [`BatchOperationItemSearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#BatchOperationItemSearchQuery), [`ApiSearchBatchOperationItemsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchBatchOperationItemsRequest), [`BatchOperationItemSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#BatchOperationItemSearchQueryResult)

SearchBatchOperationItems calls the SearchBatchOperationItems operation.

Example:

```go
result, err := client.SearchBatchOperationItems(ctx, *camunda.NewBatchOperationItemSearchQuery())
if err != nil {
	return err
}
for _, item := range result.GetItems() {
	fmt.Printf("%v\n", item)
}
```

### SearchBatchOperations

```go
func (c *CamundaClient) SearchBatchOperations(ctx context.Context, body BatchOperationSearchQuery, opts ...func(ApiSearchBatchOperationsRequest) ApiSearchBatchOperationsRequest) (*BatchOperationSearchQueryResult, error)
```

**Types:** [`BatchOperationSearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#BatchOperationSearchQuery), [`ApiSearchBatchOperationsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchBatchOperationsRequest), [`BatchOperationSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#BatchOperationSearchQueryResult)

SearchBatchOperations calls the SearchBatchOperations operation.

Example:

```go
result, err := client.SearchBatchOperations(ctx, *camunda.NewBatchOperationSearchQuery())
if err != nil {
	return err
}
for _, op := range result.GetItems() {
	fmt.Printf("%v\n", op)
}
```

### SearchClientsForGroup

```go
func (c *CamundaClient) SearchClientsForGroup(ctx context.Context, groupId string, body GroupClientSearchQueryRequest, opts ...func(ApiSearchClientsForGroupRequest) ApiSearchClientsForGroupRequest) (*GroupClientSearchResult, error)
```

**Types:** [`GroupClientSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#GroupClientSearchQueryRequest), [`ApiSearchClientsForGroupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchClientsForGroupRequest), [`GroupClientSearchResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#GroupClientSearchResult)

SearchClientsForGroup calls the SearchClientsForGroup operation.

Example:

```go
result, err := client.SearchClientsForGroup(ctx, "finance", *camunda.NewGroupClientSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchClientsForRole

```go
func (c *CamundaClient) SearchClientsForRole(ctx context.Context, roleId string, body RoleClientSearchQueryRequest, opts ...func(ApiSearchClientsForRoleRequest) ApiSearchClientsForRoleRequest) (*RoleClientSearchResult, error)
```

**Types:** [`RoleClientSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#RoleClientSearchQueryRequest), [`ApiSearchClientsForRoleRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchClientsForRoleRequest), [`RoleClientSearchResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#RoleClientSearchResult)

SearchClientsForRole calls the SearchClientsForRole operation.

Example:

```go
result, err := client.SearchClientsForRole(ctx, "auditor", *camunda.NewRoleClientSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchClientsForTenant

```go
func (c *CamundaClient) SearchClientsForTenant(ctx context.Context, tenantId string, body TenantClientSearchQueryRequest, opts ...func(ApiSearchClientsForTenantRequest) ApiSearchClientsForTenantRequest) (*TenantClientSearchResult, error)
```

**Types:** [`TenantClientSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#TenantClientSearchQueryRequest), [`ApiSearchClientsForTenantRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchClientsForTenantRequest), [`TenantClientSearchResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#TenantClientSearchResult)

SearchClientsForTenant calls the SearchClientsForTenant operation.

Example:

```go
result, err := client.SearchClientsForTenant(ctx, "tenant-a", *camunda.NewTenantClientSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchClusterVariables

```go
func (c *CamundaClient) SearchClusterVariables(ctx context.Context, body ClusterVariableSearchQueryRequest, opts ...func(ApiSearchClusterVariablesRequest) ApiSearchClusterVariablesRequest) (*ClusterVariableSearchQueryResult, error)
```

**Types:** [`ClusterVariableSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterVariableSearchQueryRequest), [`ApiSearchClusterVariablesRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchClusterVariablesRequest), [`ClusterVariableSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterVariableSearchQueryResult)

SearchClusterVariables calls the SearchClusterVariables operation.

Example:

```go
result, err := client.SearchClusterVariables(ctx, *camunda.NewClusterVariableSearchQueryRequest())
if err != nil {
	return err
}
for _, v := range result.GetItems() {
	fmt.Printf("%v\n", v)
}
```

### SearchCorrelatedMessageSubscriptions

```go
func (c *CamundaClient) SearchCorrelatedMessageSubscriptions(ctx context.Context, body CorrelatedMessageSubscriptionSearchQuery, opts ...func(ApiSearchCorrelatedMessageSubscriptionsRequest) ApiSearchCorrelatedMessageSubscriptionsRequest) (*CorrelatedMessageSubscriptionSearchQueryResult, error)
```

**Types:** [`CorrelatedMessageSubscriptionSearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#CorrelatedMessageSubscriptionSearchQuery), [`ApiSearchCorrelatedMessageSubscriptionsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchCorrelatedMessageSubscriptionsRequest), [`CorrelatedMessageSubscriptionSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#CorrelatedMessageSubscriptionSearchQueryResult)

SearchCorrelatedMessageSubscriptions calls the SearchCorrelatedMessageSubscriptions operation.

Example:

```go
result, err := client.SearchCorrelatedMessageSubscriptions(ctx,
	*camunda.NewCorrelatedMessageSubscriptionSearchQuery())
if err != nil {
	return err
}
for _, s := range result.GetItems() {
	fmt.Printf("%v\n", s)
}
```

### SearchDecisionDefinitions

```go
func (c *CamundaClient) SearchDecisionDefinitions(ctx context.Context, body DecisionDefinitionSearchQuery, opts ...func(ApiSearchDecisionDefinitionsRequest) ApiSearchDecisionDefinitionsRequest) (*DecisionDefinitionSearchQueryResult, error)
```

**Types:** [`DecisionDefinitionSearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DecisionDefinitionSearchQuery), [`ApiSearchDecisionDefinitionsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchDecisionDefinitionsRequest), [`DecisionDefinitionSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DecisionDefinitionSearchQueryResult)

SearchDecisionDefinitions calls the SearchDecisionDefinitions operation.

Example:

```go
result, err := client.SearchDecisionDefinitions(ctx, *camunda.NewDecisionDefinitionSearchQuery())
if err != nil {
	return err
}
for _, d := range result.GetItems() {
	fmt.Printf("%v\n", d)
}
```

### SearchDecisionInstances

```go
func (c *CamundaClient) SearchDecisionInstances(ctx context.Context, body DecisionInstanceSearchQuery, opts ...func(ApiSearchDecisionInstancesRequest) ApiSearchDecisionInstancesRequest) (*DecisionInstanceSearchQueryResult, error)
```

**Types:** [`DecisionInstanceSearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DecisionInstanceSearchQuery), [`ApiSearchDecisionInstancesRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchDecisionInstancesRequest), [`DecisionInstanceSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DecisionInstanceSearchQueryResult)

SearchDecisionInstances calls the SearchDecisionInstances operation.

Example:

```go
result, err := client.SearchDecisionInstances(ctx, *camunda.NewDecisionInstanceSearchQuery())
if err != nil {
	return err
}
for _, d := range result.GetItems() {
	fmt.Printf("%v\n", d)
}
```

### SearchDecisionRequirements

```go
func (c *CamundaClient) SearchDecisionRequirements(ctx context.Context, body DecisionRequirementsSearchQuery, opts ...func(ApiSearchDecisionRequirementsRequest) ApiSearchDecisionRequirementsRequest) (*DecisionRequirementsSearchQueryResult, error)
```

**Types:** [`DecisionRequirementsSearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DecisionRequirementsSearchQuery), [`ApiSearchDecisionRequirementsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchDecisionRequirementsRequest), [`DecisionRequirementsSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#DecisionRequirementsSearchQueryResult)

SearchDecisionRequirements calls the SearchDecisionRequirements operation.

Example:

```go
result, err := client.SearchDecisionRequirements(ctx, *camunda.NewDecisionRequirementsSearchQuery())
if err != nil {
	return err
}
for _, d := range result.GetItems() {
	fmt.Printf("%v\n", d)
}
```

### SearchElementInstanceIncidents

```go
func (c *CamundaClient) SearchElementInstanceIncidents(ctx context.Context, elementInstanceKey ElementInstanceKey, body IncidentSearchQuery, opts ...func(ApiSearchElementInstanceIncidentsRequest) ApiSearchElementInstanceIncidentsRequest) (*IncidentSearchQueryResult, error)
```

**Types:** [`ElementInstanceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ElementInstanceKey), [`IncidentSearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#IncidentSearchQuery), [`ApiSearchElementInstanceIncidentsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchElementInstanceIncidentsRequest), [`IncidentSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#IncidentSearchQueryResult)

SearchElementInstanceIncidents calls the SearchElementInstanceIncidents operation.

Example:

```go
result, err := client.SearchElementInstanceIncidents(ctx,
	camunda.MustElementInstanceKey("2251799813685360"),
	*camunda.NewIncidentSearchQuery())
if err != nil {
	return err
}
for _, inc := range result.GetItems() {
	fmt.Printf("%v\n", inc)
}
```

### SearchElementInstanceWaitStates

```go
func (c *CamundaClient) SearchElementInstanceWaitStates(ctx context.Context, body ElementInstanceWaitStateQuery, opts ...func(ApiSearchElementInstanceWaitStatesRequest) ApiSearchElementInstanceWaitStatesRequest) (*ElementInstanceWaitStateQueryResult, error)
```

**Types:** [`ElementInstanceWaitStateQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ElementInstanceWaitStateQuery), [`ApiSearchElementInstanceWaitStatesRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchElementInstanceWaitStatesRequest), [`ElementInstanceWaitStateQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ElementInstanceWaitStateQueryResult)

SearchElementInstanceWaitStates calls the SearchElementInstanceWaitStates operation.

Example:

```go
result, err := client.SearchElementInstanceWaitStates(ctx, *camunda.NewElementInstanceWaitStateQuery())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchElementInstances

```go
func (c *CamundaClient) SearchElementInstances(ctx context.Context, body ElementInstanceSearchQuery, opts ...func(ApiSearchElementInstancesRequest) ApiSearchElementInstancesRequest) (*ElementInstanceSearchQueryResult, error)
```

**Types:** [`ElementInstanceSearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ElementInstanceSearchQuery), [`ApiSearchElementInstancesRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchElementInstancesRequest), [`ElementInstanceSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ElementInstanceSearchQueryResult)

SearchElementInstances calls the SearchElementInstances operation.

Example:

```go
result, err := client.SearchElementInstances(ctx, *camunda.NewElementInstanceSearchQuery())
if err != nil {
	return err
}
for _, e := range result.GetItems() {
	fmt.Printf("%v\n", e)
}
```

### SearchGlobalTaskListeners

```go
func (c *CamundaClient) SearchGlobalTaskListeners(ctx context.Context, body GlobalTaskListenerSearchQueryRequest, opts ...func(ApiSearchGlobalTaskListenersRequest) ApiSearchGlobalTaskListenersRequest) (*GlobalTaskListenerSearchQueryResult, error)
```

**Types:** [`GlobalTaskListenerSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#GlobalTaskListenerSearchQueryRequest), [`ApiSearchGlobalTaskListenersRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchGlobalTaskListenersRequest), [`GlobalTaskListenerSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#GlobalTaskListenerSearchQueryResult)

SearchGlobalTaskListeners calls the SearchGlobalTaskListeners operation.

Example:

```go
result, err := client.SearchGlobalTaskListeners(ctx, *camunda.NewGlobalTaskListenerSearchQueryRequest())
if err != nil {
	return err
}
for _, l := range result.GetItems() {
	fmt.Printf("%v\n", l)
}
```

### SearchGroupIdsForTenant

```go
func (c *CamundaClient) SearchGroupIdsForTenant(ctx context.Context, tenantId string, body TenantGroupSearchQueryRequest, opts ...func(ApiSearchGroupIdsForTenantRequest) ApiSearchGroupIdsForTenantRequest) (*TenantGroupSearchResult, error)
```

**Types:** [`TenantGroupSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#TenantGroupSearchQueryRequest), [`ApiSearchGroupIdsForTenantRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchGroupIdsForTenantRequest), [`TenantGroupSearchResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#TenantGroupSearchResult)

SearchGroupIdsForTenant calls the SearchGroupIdsForTenant operation.

Example:

```go
result, err := client.SearchGroupIdsForTenant(ctx, "tenant-a", *camunda.NewTenantGroupSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchGroups

```go
func (c *CamundaClient) SearchGroups(ctx context.Context, body GroupSearchQueryRequest, opts ...func(ApiSearchGroupsRequest) ApiSearchGroupsRequest) (*GroupSearchQueryResult, error)
```

**Types:** [`GroupSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#GroupSearchQueryRequest), [`ApiSearchGroupsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchGroupsRequest), [`GroupSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#GroupSearchQueryResult)

SearchGroups calls the SearchGroups operation.

Example:

```go
result, err := client.SearchGroups(ctx, *camunda.NewGroupSearchQueryRequest())
if err != nil {
	return err
}
for _, g := range result.GetItems() {
	fmt.Printf("%v\n", g)
}
```

### SearchGroupsForRole

```go
func (c *CamundaClient) SearchGroupsForRole(ctx context.Context, roleId string, body RoleGroupSearchQueryRequest, opts ...func(ApiSearchGroupsForRoleRequest) ApiSearchGroupsForRoleRequest) (*RoleGroupSearchResult, error)
```

**Types:** [`RoleGroupSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#RoleGroupSearchQueryRequest), [`ApiSearchGroupsForRoleRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchGroupsForRoleRequest), [`RoleGroupSearchResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#RoleGroupSearchResult)

SearchGroupsForRole calls the SearchGroupsForRole operation.

Example:

```go
result, err := client.SearchGroupsForRole(ctx, "auditor", *camunda.NewRoleGroupSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchIncidents

```go
func (c *CamundaClient) SearchIncidents(ctx context.Context, body IncidentSearchQuery, opts ...func(ApiSearchIncidentsRequest) ApiSearchIncidentsRequest) (*IncidentSearchQueryResult, error)
```

**Types:** [`IncidentSearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#IncidentSearchQuery), [`ApiSearchIncidentsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchIncidentsRequest), [`IncidentSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#IncidentSearchQueryResult)

SearchIncidents calls the SearchIncidents operation.

Example:

```go
result, err := client.SearchIncidents(ctx, *camunda.NewIncidentSearchQuery())
if err != nil {
	return err
}
for _, inc := range result.GetItems() {
	fmt.Printf("incident %v: %s\n", inc.GetIncidentKey(), inc.GetErrorType())
}
```

### SearchJobs

```go
func (c *CamundaClient) SearchJobs(ctx context.Context, body JobSearchQuery, opts ...func(ApiSearchJobsRequest) ApiSearchJobsRequest) (*JobSearchQueryResult, error)
```

**Types:** [`JobSearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#JobSearchQuery), [`ApiSearchJobsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchJobsRequest), [`JobSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#JobSearchQueryResult)

SearchJobs calls the SearchJobs operation.

Example:

```go
result, err := client.SearchJobs(ctx, *camunda.NewJobSearchQuery())
if err != nil {
	return err
}
for _, job := range result.GetItems() {
	fmt.Printf("%v\n", job)
}
```

### SearchMappingRule

```go
func (c *CamundaClient) SearchMappingRule(ctx context.Context, body MappingRuleSearchQueryRequest, opts ...func(ApiSearchMappingRuleRequest) ApiSearchMappingRuleRequest) (*MappingRuleSearchQueryResult, error)
```

**Types:** [`MappingRuleSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#MappingRuleSearchQueryRequest), [`ApiSearchMappingRuleRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchMappingRuleRequest), [`MappingRuleSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#MappingRuleSearchQueryResult)

SearchMappingRule calls the SearchMappingRule operation.

Example:

```go
result, err := client.SearchMappingRule(ctx, *camunda.NewMappingRuleSearchQueryRequest())
if err != nil {
	return err
}
for _, r := range result.GetItems() {
	fmt.Printf("%v\n", r)
}
```

### SearchMappingRulesForGroup

```go
func (c *CamundaClient) SearchMappingRulesForGroup(ctx context.Context, groupId string, body MappingRuleSearchQueryRequest, opts ...func(ApiSearchMappingRulesForGroupRequest) ApiSearchMappingRulesForGroupRequest) (*GroupMappingRuleSearchResult, error)
```

**Types:** [`MappingRuleSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#MappingRuleSearchQueryRequest), [`ApiSearchMappingRulesForGroupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchMappingRulesForGroupRequest), [`GroupMappingRuleSearchResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#GroupMappingRuleSearchResult)

SearchMappingRulesForGroup calls the SearchMappingRulesForGroup operation.

Example:

```go
result, err := client.SearchMappingRulesForGroup(ctx, "finance", *camunda.NewMappingRuleSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchMappingRulesForRole

```go
func (c *CamundaClient) SearchMappingRulesForRole(ctx context.Context, roleId string, body MappingRuleSearchQueryRequest, opts ...func(ApiSearchMappingRulesForRoleRequest) ApiSearchMappingRulesForRoleRequest) (*RoleMappingRuleSearchResult, error)
```

**Types:** [`MappingRuleSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#MappingRuleSearchQueryRequest), [`ApiSearchMappingRulesForRoleRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchMappingRulesForRoleRequest), [`RoleMappingRuleSearchResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#RoleMappingRuleSearchResult)

SearchMappingRulesForRole calls the SearchMappingRulesForRole operation.

Example:

```go
result, err := client.SearchMappingRulesForRole(ctx, "auditor", *camunda.NewMappingRuleSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchMappingRulesForTenant

```go
func (c *CamundaClient) SearchMappingRulesForTenant(ctx context.Context, tenantId string, body MappingRuleSearchQueryRequest, opts ...func(ApiSearchMappingRulesForTenantRequest) ApiSearchMappingRulesForTenantRequest) (*TenantMappingRuleSearchResult, error)
```

**Types:** [`MappingRuleSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#MappingRuleSearchQueryRequest), [`ApiSearchMappingRulesForTenantRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchMappingRulesForTenantRequest), [`TenantMappingRuleSearchResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#TenantMappingRuleSearchResult)

SearchMappingRulesForTenant calls the SearchMappingRulesForTenant operation.

Example:

```go
result, err := client.SearchMappingRulesForTenant(ctx, "tenant-a", *camunda.NewMappingRuleSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchMessageSubscriptions

```go
func (c *CamundaClient) SearchMessageSubscriptions(ctx context.Context, body MessageSubscriptionSearchQuery, opts ...func(ApiSearchMessageSubscriptionsRequest) ApiSearchMessageSubscriptionsRequest) (*MessageSubscriptionSearchQueryResult, error)
```

**Types:** [`MessageSubscriptionSearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#MessageSubscriptionSearchQuery), [`ApiSearchMessageSubscriptionsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchMessageSubscriptionsRequest), [`MessageSubscriptionSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#MessageSubscriptionSearchQueryResult)

SearchMessageSubscriptions calls the SearchMessageSubscriptions operation.

Example:

```go
result, err := client.SearchMessageSubscriptions(ctx, *camunda.NewMessageSubscriptionSearchQuery())
if err != nil {
	return err
}
for _, s := range result.GetItems() {
	fmt.Printf("%v\n", s)
}
```

### SearchOwnAuthorizations

```go
func (c *CamundaClient) SearchOwnAuthorizations(ctx context.Context, body AuthorizationSearchQuery, opts ...func(ApiSearchOwnAuthorizationsRequest) ApiSearchOwnAuthorizationsRequest) (*OwnAuthorizationSearchResult, error)
```

**Types:** [`AuthorizationSearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AuthorizationSearchQuery), [`ApiSearchOwnAuthorizationsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchOwnAuthorizationsRequest), [`OwnAuthorizationSearchResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#OwnAuthorizationSearchResult)

SearchOwnAuthorizations calls the SearchOwnAuthorizations operation.

Example:

```go
// Scoped to the authenticated principal: direct grants plus those inherited
// from a group, role, or mapping rule.
result, err := client.SearchOwnAuthorizations(ctx, *camunda.NewAuthorizationSearchQuery())
if err != nil {
	return err
}
for _, a := range result.GetItems() {
	fmt.Printf("%v\n", a)
}
```

### SearchProcessDefinitionVariableNames

```go
func (c *CamundaClient) SearchProcessDefinitionVariableNames(ctx context.Context, processDefinitionKey ProcessDefinitionKey, body ProcessDefinitionVariableNameSearchQuery, opts ...func(ApiSearchProcessDefinitionVariableNamesRequest) ApiSearchProcessDefinitionVariableNamesRequest) (*ProcessDefinitionVariableNameSearchQueryResult, error)
```

**Types:** [`ProcessDefinitionKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessDefinitionKey), [`ProcessDefinitionVariableNameSearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessDefinitionVariableNameSearchQuery), [`ApiSearchProcessDefinitionVariableNamesRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchProcessDefinitionVariableNamesRequest), [`ProcessDefinitionVariableNameSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessDefinitionVariableNameSearchQueryResult)

SearchProcessDefinitionVariableNames calls the SearchProcessDefinitionVariableNames operation.

Example:

```go
result, err := client.SearchProcessDefinitionVariableNames(ctx,
	camunda.MustProcessDefinitionKey("2251799813685330"),
	*camunda.NewProcessDefinitionVariableNameSearchQuery())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchProcessDefinitions

```go
func (c *CamundaClient) SearchProcessDefinitions(ctx context.Context, body ProcessDefinitionSearchQuery, opts ...func(ApiSearchProcessDefinitionsRequest) ApiSearchProcessDefinitionsRequest) (*ProcessDefinitionSearchQueryResult, error)
```

**Types:** [`ProcessDefinitionSearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessDefinitionSearchQuery), [`ApiSearchProcessDefinitionsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchProcessDefinitionsRequest), [`ProcessDefinitionSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessDefinitionSearchQueryResult)

SearchProcessDefinitions calls the SearchProcessDefinitions operation.

Example:

```go
result, err := client.SearchProcessDefinitions(ctx, *camunda.NewProcessDefinitionSearchQuery())
if err != nil {
	return err
}
for _, d := range result.GetItems() {
	fmt.Printf("%v\n", d)
}
```

### SearchProcessInstanceIncidents

```go
func (c *CamundaClient) SearchProcessInstanceIncidents(ctx context.Context, processInstanceKey ProcessInstanceKey, body IncidentSearchQuery, opts ...func(ApiSearchProcessInstanceIncidentsRequest) ApiSearchProcessInstanceIncidentsRequest) (*IncidentSearchQueryResult, error)
```

**Types:** [`ProcessInstanceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceKey), [`IncidentSearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#IncidentSearchQuery), [`ApiSearchProcessInstanceIncidentsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchProcessInstanceIncidentsRequest), [`IncidentSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#IncidentSearchQueryResult)

SearchProcessInstanceIncidents calls the SearchProcessInstanceIncidents operation.

Example:

```go
result, err := client.SearchProcessInstanceIncidents(ctx,
	camunda.MustProcessInstanceKey("2251799813685340"),
	*camunda.NewIncidentSearchQuery())
if err != nil {
	return err
}
for _, inc := range result.GetItems() {
	fmt.Printf("%v\n", inc)
}
```

### SearchProcessInstances

```go
func (c *CamundaClient) SearchProcessInstances(ctx context.Context, body ProcessInstanceSearchQuery, opts ...func(ApiSearchProcessInstancesRequest) ApiSearchProcessInstancesRequest) (*ProcessInstanceSearchQueryResult, error)
```

**Types:** [`ProcessInstanceSearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceSearchQuery), [`ApiSearchProcessInstancesRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchProcessInstancesRequest), [`ProcessInstanceSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceSearchQueryResult)

SearchProcessInstances calls the SearchProcessInstances operation.

Example:

```go
result, err := client.SearchProcessInstances(ctx, *camunda.NewProcessInstanceSearchQuery())
if err != nil {
	return err
}
for _, pi := range result.GetItems() {
	fmt.Printf("%v: %v\n", pi.GetProcessInstanceKey(), pi.GetState())
}
```

### SearchResources

```go
func (c *CamundaClient) SearchResources(ctx context.Context, body ResourceSearchQuery, opts ...func(ApiSearchResourcesRequest) ApiSearchResourcesRequest) (*ResourceSearchQueryResult, error)
```

**Types:** [`ResourceSearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ResourceSearchQuery), [`ApiSearchResourcesRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchResourcesRequest), [`ResourceSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ResourceSearchQueryResult)

SearchResources calls the SearchResources operation.

Example:

```go
result, err := client.SearchResources(ctx, *camunda.NewResourceSearchQuery())
if err != nil {
	return err
}
for _, r := range result.GetItems() {
	fmt.Printf("%v\n", r)
}
```

### SearchRoles

```go
func (c *CamundaClient) SearchRoles(ctx context.Context, body RoleSearchQueryRequest, opts ...func(ApiSearchRolesRequest) ApiSearchRolesRequest) (*RoleSearchQueryResult, error)
```

**Types:** [`RoleSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#RoleSearchQueryRequest), [`ApiSearchRolesRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchRolesRequest), [`RoleSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#RoleSearchQueryResult)

SearchRoles calls the SearchRoles operation.

Example:

```go
result, err := client.SearchRoles(ctx, *camunda.NewRoleSearchQueryRequest())
if err != nil {
	return err
}
for _, r := range result.GetItems() {
	fmt.Printf("%v\n", r)
}
```

### SearchRolesForGroup

```go
func (c *CamundaClient) SearchRolesForGroup(ctx context.Context, groupId string, body RoleSearchQueryRequest, opts ...func(ApiSearchRolesForGroupRequest) ApiSearchRolesForGroupRequest) (*GroupRoleSearchResult, error)
```

**Types:** [`RoleSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#RoleSearchQueryRequest), [`ApiSearchRolesForGroupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchRolesForGroupRequest), [`GroupRoleSearchResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#GroupRoleSearchResult)

SearchRolesForGroup calls the SearchRolesForGroup operation.

Example:

```go
result, err := client.SearchRolesForGroup(ctx, "finance", *camunda.NewRoleSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchRolesForTenant

```go
func (c *CamundaClient) SearchRolesForTenant(ctx context.Context, tenantId string, body RoleSearchQueryRequest, opts ...func(ApiSearchRolesForTenantRequest) ApiSearchRolesForTenantRequest) (*TenantRoleSearchResult, error)
```

**Types:** [`RoleSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#RoleSearchQueryRequest), [`ApiSearchRolesForTenantRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchRolesForTenantRequest), [`TenantRoleSearchResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#TenantRoleSearchResult)

SearchRolesForTenant calls the SearchRolesForTenant operation.

Example:

```go
result, err := client.SearchRolesForTenant(ctx, "tenant-a", *camunda.NewRoleSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchTenants

```go
func (c *CamundaClient) SearchTenants(ctx context.Context, body TenantSearchQueryRequest, opts ...func(ApiSearchTenantsRequest) ApiSearchTenantsRequest) (*TenantSearchQueryResult, error)
```

**Types:** [`TenantSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#TenantSearchQueryRequest), [`ApiSearchTenantsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchTenantsRequest), [`TenantSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#TenantSearchQueryResult)

SearchTenants calls the SearchTenants operation.

Example:

```go
result, err := client.SearchTenants(ctx, *camunda.NewTenantSearchQueryRequest())
if err != nil {
	return err
}
for _, t := range result.GetItems() {
	fmt.Printf("%v\n", t)
}
```

### SearchUserTaskAuditLogs

```go
func (c *CamundaClient) SearchUserTaskAuditLogs(ctx context.Context, userTaskKey UserTaskKey, body UserTaskAuditLogSearchQueryRequest, opts ...func(ApiSearchUserTaskAuditLogsRequest) ApiSearchUserTaskAuditLogsRequest) (*AuditLogSearchQueryResult, error)
```

**Types:** [`UserTaskKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserTaskKey), [`UserTaskAuditLogSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserTaskAuditLogSearchQueryRequest), [`ApiSearchUserTaskAuditLogsRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchUserTaskAuditLogsRequest), [`AuditLogSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AuditLogSearchQueryResult)

SearchUserTaskAuditLogs calls the SearchUserTaskAuditLogs operation.

Example:

```go
result, err := client.SearchUserTaskAuditLogs(ctx,
	camunda.MustUserTaskKey("2251799813685380"),
	*camunda.NewUserTaskAuditLogSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchUserTaskEffectiveVariables

```go
func (c *CamundaClient) SearchUserTaskEffectiveVariables(ctx context.Context, userTaskKey UserTaskKey, body UserTaskEffectiveVariableSearchQueryRequest, opts ...func(ApiSearchUserTaskEffectiveVariablesRequest) ApiSearchUserTaskEffectiveVariablesRequest) (*VariableSearchQueryResult, error)
```

**Types:** [`UserTaskKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserTaskKey), [`UserTaskEffectiveVariableSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserTaskEffectiveVariableSearchQueryRequest), [`ApiSearchUserTaskEffectiveVariablesRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchUserTaskEffectiveVariablesRequest), [`VariableSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#VariableSearchQueryResult)

SearchUserTaskEffectiveVariables calls the SearchUserTaskEffectiveVariables operation.

Example:

```go
result, err := client.SearchUserTaskEffectiveVariables(ctx,
	camunda.MustUserTaskKey("2251799813685380"),
	*camunda.NewUserTaskEffectiveVariableSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchUserTaskVariables

```go
func (c *CamundaClient) SearchUserTaskVariables(ctx context.Context, userTaskKey UserTaskKey, body UserTaskVariableSearchQueryRequest, opts ...func(ApiSearchUserTaskVariablesRequest) ApiSearchUserTaskVariablesRequest) (*VariableSearchQueryResult, error)
```

**Types:** [`UserTaskKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserTaskKey), [`UserTaskVariableSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserTaskVariableSearchQueryRequest), [`ApiSearchUserTaskVariablesRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchUserTaskVariablesRequest), [`VariableSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#VariableSearchQueryResult)

SearchUserTaskVariables calls the SearchUserTaskVariables operation.

Example:

```go
result, err := client.SearchUserTaskVariables(ctx,
	camunda.MustUserTaskKey("2251799813685380"),
	*camunda.NewUserTaskVariableSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchUserTasks

```go
func (c *CamundaClient) SearchUserTasks(ctx context.Context, body UserTaskSearchQuery, opts ...func(ApiSearchUserTasksRequest) ApiSearchUserTasksRequest) (*UserTaskSearchQueryResult, error)
```

**Types:** [`UserTaskSearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserTaskSearchQuery), [`ApiSearchUserTasksRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchUserTasksRequest), [`UserTaskSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserTaskSearchQueryResult)

SearchUserTasks calls the SearchUserTasks operation.

Example:

```go
result, err := client.SearchUserTasks(ctx, *camunda.NewUserTaskSearchQuery())
if err != nil {
	return err
}
for _, t := range result.GetItems() {
	fmt.Printf("%v\n", t)
}
```

### SearchUsers

```go
func (c *CamundaClient) SearchUsers(ctx context.Context, body UserSearchQueryRequest, opts ...func(ApiSearchUsersRequest) ApiSearchUsersRequest) (*UserSearchResult, error)
```

**Types:** [`UserSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserSearchQueryRequest), [`ApiSearchUsersRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchUsersRequest), [`UserSearchResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserSearchResult)

SearchUsers calls the SearchUsers operation.

Example:

```go
result, err := client.SearchUsers(ctx, *camunda.NewUserSearchQueryRequest())
if err != nil {
	return err
}
for _, u := range result.GetItems() {
	fmt.Printf("%v\n", u)
}
```

### SearchUsersForGroup

```go
func (c *CamundaClient) SearchUsersForGroup(ctx context.Context, groupId string, body GroupUserSearchQueryRequest, opts ...func(ApiSearchUsersForGroupRequest) ApiSearchUsersForGroupRequest) (*GroupUserSearchResult, error)
```

**Types:** [`GroupUserSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#GroupUserSearchQueryRequest), [`ApiSearchUsersForGroupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchUsersForGroupRequest), [`GroupUserSearchResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#GroupUserSearchResult)

SearchUsersForGroup calls the SearchUsersForGroup operation.

Example:

```go
result, err := client.SearchUsersForGroup(ctx, "finance", *camunda.NewGroupUserSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchUsersForRole

```go
func (c *CamundaClient) SearchUsersForRole(ctx context.Context, roleId string, body RoleUserSearchQueryRequest, opts ...func(ApiSearchUsersForRoleRequest) ApiSearchUsersForRoleRequest) (*RoleUserSearchResult, error)
```

**Types:** [`RoleUserSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#RoleUserSearchQueryRequest), [`ApiSearchUsersForRoleRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchUsersForRoleRequest), [`RoleUserSearchResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#RoleUserSearchResult)

SearchUsersForRole calls the SearchUsersForRole operation.

Example:

```go
result, err := client.SearchUsersForRole(ctx, "auditor", *camunda.NewRoleUserSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchUsersForTenant

```go
func (c *CamundaClient) SearchUsersForTenant(ctx context.Context, tenantId string, body TenantUserSearchQueryRequest, opts ...func(ApiSearchUsersForTenantRequest) ApiSearchUsersForTenantRequest) (*TenantUserSearchResult, error)
```

**Types:** [`TenantUserSearchQueryRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#TenantUserSearchQueryRequest), [`ApiSearchUsersForTenantRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchUsersForTenantRequest), [`TenantUserSearchResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#TenantUserSearchResult)

SearchUsersForTenant calls the SearchUsersForTenant operation.

Example:

```go
result, err := client.SearchUsersForTenant(ctx, "tenant-a", *camunda.NewTenantUserSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchVariables

```go
func (c *CamundaClient) SearchVariables(ctx context.Context, body VariableSearchQuery, opts ...func(ApiSearchVariablesRequest) ApiSearchVariablesRequest) (*VariableSearchQueryResult, error)
```

**Types:** [`VariableSearchQuery`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#VariableSearchQuery), [`ApiSearchVariablesRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSearchVariablesRequest), [`VariableSearchQueryResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#VariableSearchQueryResult)

SearchVariables calls the SearchVariables operation.

Example:

```go
result, err := client.SearchVariables(ctx, *camunda.NewVariableSearchQuery())
if err != nil {
	return err
}
for _, v := range result.GetItems() {
	fmt.Printf("%v\n", v)
}
```

### SuspendBatchOperation

```go
func (c *CamundaClient) SuspendBatchOperation(ctx context.Context, batchOperationKey string, opts ...func(ApiSuspendBatchOperationRequest) ApiSuspendBatchOperationRequest) error
```

**Types:** [`ApiSuspendBatchOperationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSuspendBatchOperationRequest)

SuspendBatchOperation calls the SuspendBatchOperation operation.

Example:

```go
return client.SuspendBatchOperation(ctx, "2251799813685290")
```

### SuspendProcessInstance

```go
func (c *CamundaClient) SuspendProcessInstance(ctx context.Context, processInstanceKey ProcessInstanceKey, body SuspendProcessInstanceRequest, opts ...func(ApiSuspendProcessInstanceRequest) ApiSuspendProcessInstanceRequest) error
```

**Types:** [`ProcessInstanceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceKey), [`SuspendProcessInstanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#SuspendProcessInstanceRequest), [`ApiSuspendProcessInstanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSuspendProcessInstanceRequest)

SuspendProcessInstance calls the SuspendProcessInstance operation.

Example:

```go
return client.SuspendProcessInstance(ctx,
	camunda.MustProcessInstanceKey("2251799813685340"),
	*camunda.NewSuspendProcessInstanceRequest())
```

### SuspendProcessInstancesBatchOperation

```go
func (c *CamundaClient) SuspendProcessInstancesBatchOperation(ctx context.Context, body ProcessInstanceSuspensionBatchOperationRequest, opts ...func(ApiSuspendProcessInstancesBatchOperationRequest) ApiSuspendProcessInstancesBatchOperationRequest) (*BatchOperationCreatedResult, error)
```

**Types:** [`ProcessInstanceSuspensionBatchOperationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ProcessInstanceSuspensionBatchOperationRequest), [`ApiSuspendProcessInstancesBatchOperationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSuspendProcessInstancesBatchOperationRequest), [`BatchOperationCreatedResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#BatchOperationCreatedResult)

SuspendProcessInstancesBatchOperation calls the SuspendProcessInstancesBatchOperation operation.

Example:

```go
// Suspend every instance matching a filter in a single batch operation.
req := camunda.NewProcessInstanceSuspensionBatchOperationRequest(*camunda.NewProcessInstanceFilter())

result, err := client.SuspendProcessInstancesBatchOperation(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
```

### SyncRuntimeBackupState

```go
func (c *CamundaClient) SyncRuntimeBackupState(ctx context.Context, opts ...func(ApiSyncRuntimeBackupStateRequest) ApiSyncRuntimeBackupStateRequest) (*RuntimeBackupState, error)
```

**Types:** [`ApiSyncRuntimeBackupStateRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSyncRuntimeBackupStateRequest), [`RuntimeBackupState`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#RuntimeBackupState)

SyncRuntimeBackupState calls the SyncRuntimeBackupState operation.

Example:

```go
// Re-reads the backup store so the reported state matches what is stored.
state, err := client.SyncRuntimeBackupState(ctx)
if err != nil {
	return err
}
for _, backup := range state.GetBackupStates() {
	fmt.Printf("%v\n", backup)
}
```

### SyncRuntimeBackupStateAsClusterAdmin

```go
func (c *CamundaClient) SyncRuntimeBackupStateAsClusterAdmin(ctx context.Context, opts ...func(ApiSyncRuntimeBackupStateAsClusterAdminRequest) ApiSyncRuntimeBackupStateAsClusterAdminRequest) (*ClusterRuntimeBackupState, error)
```

**Types:** [`ApiSyncRuntimeBackupStateAsClusterAdminRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiSyncRuntimeBackupStateAsClusterAdminRequest), [`ClusterRuntimeBackupState`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterRuntimeBackupState)

SyncRuntimeBackupStateAsClusterAdmin calls the SyncRuntimeBackupStateAsClusterAdmin operation.

Example:

```go
// Force-writes the current checkpoint/backup metadata to each physical tenant's
// backup store and returns the updated state. Use this to repair stale or missing
// state entries without triggering a new backup.
state, err := client.SyncRuntimeBackupStateAsClusterAdmin(ctx)
if err != nil {
	return err
}
for _, tenant := range state.GetPhysicalTenants() {
	fmt.Printf("%v\n", tenant)
}
```

### TakeHistoryBackup

```go
func (c *CamundaClient) TakeHistoryBackup(ctx context.Context, body TakeHistoryBackupRequest, opts ...func(ApiTakeHistoryBackupRequest) ApiTakeHistoryBackupRequest) (*TakeHistoryBackupResponse, error)
```

**Types:** [`TakeHistoryBackupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#TakeHistoryBackupRequest), [`ApiTakeHistoryBackupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiTakeHistoryBackupRequest), [`TakeHistoryBackupResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#TakeHistoryBackupResponse)

TakeHistoryBackup calls the TakeHistoryBackup operation.

Example:

```go
result, err := client.TakeHistoryBackup(ctx, *camunda.NewTakeHistoryBackupRequest(42))
if err != nil {
	return err
}
fmt.Printf("backup %d scheduled %d snapshot(s)\n", result.GetBackupId(), len(result.GetScheduledSnapshots()))
```

### TakeHistoryBackupAsClusterAdmin

```go
func (c *CamundaClient) TakeHistoryBackupAsClusterAdmin(ctx context.Context, body TakeHistoryBackupRequest, opts ...func(ApiTakeHistoryBackupAsClusterAdminRequest) ApiTakeHistoryBackupAsClusterAdminRequest) (*ClusterTakeHistoryBackupResponse, error)
```

**Types:** [`TakeHistoryBackupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#TakeHistoryBackupRequest), [`ApiTakeHistoryBackupAsClusterAdminRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiTakeHistoryBackupAsClusterAdminRequest), [`ClusterTakeHistoryBackupResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterTakeHistoryBackupResponse)

TakeHistoryBackupAsClusterAdmin calls the TakeHistoryBackupAsClusterAdmin operation.

Example:

```go
// Takes a history backup for every physical tenant in the cluster simultaneously.
result, err := client.TakeHistoryBackupAsClusterAdmin(ctx, *camunda.NewTakeHistoryBackupRequest(42))
if err != nil {
	return err
}
fmt.Printf("cluster history backup %d across %d tenant(s)\n", result.GetBackupId(), len(result.GetPhysicalTenants()))
```

### TakeRuntimeBackup

```go
func (c *CamundaClient) TakeRuntimeBackup(ctx context.Context, body TakeRuntimeBackupRequest, opts ...func(ApiTakeRuntimeBackupRequest) ApiTakeRuntimeBackupRequest) (*TakeRuntimeBackupResponse, error)
```

**Types:** [`TakeRuntimeBackupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#TakeRuntimeBackupRequest), [`ApiTakeRuntimeBackupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiTakeRuntimeBackupRequest), [`TakeRuntimeBackupResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#TakeRuntimeBackupResponse)

TakeRuntimeBackup calls the TakeRuntimeBackup operation.

Example:

```go
req := camunda.NewTakeRuntimeBackupRequest()
// The id is required here, and must be omitted instead when continuous backups
// or a backup/checkpoint schedule is enabled for the tenant — the server
// generates it in that case.
req.SetBackupId(42)

result, err := client.TakeRuntimeBackup(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### TakeRuntimeBackupAsClusterAdmin

```go
func (c *CamundaClient) TakeRuntimeBackupAsClusterAdmin(ctx context.Context, body TakeRuntimeBackupRequest, opts ...func(ApiTakeRuntimeBackupAsClusterAdminRequest) ApiTakeRuntimeBackupAsClusterAdminRequest) (*ClusterTakeRuntimeBackupResponse, error)
```

**Types:** [`TakeRuntimeBackupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#TakeRuntimeBackupRequest), [`ApiTakeRuntimeBackupAsClusterAdminRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiTakeRuntimeBackupAsClusterAdminRequest), [`ClusterTakeRuntimeBackupResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterTakeRuntimeBackupResponse)

TakeRuntimeBackupAsClusterAdmin calls the TakeRuntimeBackupAsClusterAdmin operation.

Example:

```go
// Takes a runtime backup across every physical tenant in the cluster simultaneously.
// Pass SetBackupId to use an explicit backup ID; omit it to let the cluster
// generate one automatically (generated-id mode). Do not mix modes: sending a
// backup ID when the cluster is configured for generated IDs will be rejected.
req := camunda.NewTakeRuntimeBackupRequest()
req.SetBackupId(42)

result, err := client.TakeRuntimeBackupAsClusterAdmin(ctx, *req)
if err != nil {
	return err
}
for _, tenant := range result.GetPhysicalTenants() {
	fmt.Printf("%v\n", tenant)
}
```

### ThrowJobError

```go
func (c *CamundaClient) ThrowJobError(ctx context.Context, jobKey JobKey, body JobErrorRequest, opts ...func(ApiThrowJobErrorRequest) ApiThrowJobErrorRequest) error
```

**Types:** [`JobKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#JobKey), [`JobErrorRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#JobErrorRequest), [`ApiThrowJobErrorRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiThrowJobErrorRequest)

ThrowJobError calls the ThrowJobError operation.

Example:

```go
req := camunda.NewJobErrorRequest("OUT_OF_STOCK")
req.SetErrorMessage("item is out of stock")

return client.ThrowJobError(ctx, camunda.MustJobKey("2251799813685424"), *req)
```

### TriggerClusterRebalance

```go
func (c *CamundaClient) TriggerClusterRebalance(ctx context.Context, body ClusterRebalanceRequest, opts ...func(ApiTriggerClusterRebalanceRequest) ApiTriggerClusterRebalanceRequest) (*ClusterBalanceResponse, error)
```

**Types:** [`ClusterRebalanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterRebalanceRequest), [`ApiTriggerClusterRebalanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiTriggerClusterRebalanceRequest), [`ClusterBalanceResponse`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterBalanceResponse)

TriggerClusterRebalance calls the TriggerClusterRebalance operation.

Example:

```go
// Starts a cluster rebalance, redistributing partition leadership to the preferred nodes.
// Requires cluster-admin credentials (a separate cluster-admin security chain) —
// calling this with standard Orchestration credentials will fail authorization.
req := camunda.NewClusterRebalanceRequest()
req.SetReplicationLagThreshold(1024 * 1024) // 1 MiB max lag for leader transfer

balance, err := client.TriggerClusterRebalance(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("cluster balance state: %s, %d partition(s)\n", balance.GetState(), len(balance.GetPartitions()))
```

### UnassignClientFromGroup

```go
func (c *CamundaClient) UnassignClientFromGroup(ctx context.Context, groupId string, clientId string, opts ...func(ApiUnassignClientFromGroupRequest) ApiUnassignClientFromGroupRequest) error
```

**Types:** [`ApiUnassignClientFromGroupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUnassignClientFromGroupRequest)

UnassignClientFromGroup calls the UnassignClientFromGroup operation.

Example:

```go
return client.UnassignClientFromGroup(ctx, "finance", "reporting-service")
```

### UnassignClientFromTenant

```go
func (c *CamundaClient) UnassignClientFromTenant(ctx context.Context, tenantId string, clientId string, opts ...func(ApiUnassignClientFromTenantRequest) ApiUnassignClientFromTenantRequest) error
```

**Types:** [`ApiUnassignClientFromTenantRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUnassignClientFromTenantRequest)

UnassignClientFromTenant calls the UnassignClientFromTenant operation.

Example:

```go
return client.UnassignClientFromTenant(ctx, "tenant-a", "reporting-service")
```

### UnassignGroupFromTenant

```go
func (c *CamundaClient) UnassignGroupFromTenant(ctx context.Context, tenantId string, groupId string, opts ...func(ApiUnassignGroupFromTenantRequest) ApiUnassignGroupFromTenantRequest) error
```

**Types:** [`ApiUnassignGroupFromTenantRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUnassignGroupFromTenantRequest)

UnassignGroupFromTenant calls the UnassignGroupFromTenant operation.

Example:

```go
return client.UnassignGroupFromTenant(ctx, "tenant-a", "finance")
```

### UnassignMappingRuleFromGroup

```go
func (c *CamundaClient) UnassignMappingRuleFromGroup(ctx context.Context, groupId string, mappingRuleId string, opts ...func(ApiUnassignMappingRuleFromGroupRequest) ApiUnassignMappingRuleFromGroupRequest) error
```

**Types:** [`ApiUnassignMappingRuleFromGroupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUnassignMappingRuleFromGroupRequest)

UnassignMappingRuleFromGroup calls the UnassignMappingRuleFromGroup operation.

Example:

```go
return client.UnassignMappingRuleFromGroup(ctx, "finance", "sso-auditors")
```

### UnassignMappingRuleFromTenant

```go
func (c *CamundaClient) UnassignMappingRuleFromTenant(ctx context.Context, tenantId string, mappingRuleId string, opts ...func(ApiUnassignMappingRuleFromTenantRequest) ApiUnassignMappingRuleFromTenantRequest) error
```

**Types:** [`ApiUnassignMappingRuleFromTenantRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUnassignMappingRuleFromTenantRequest)

UnassignMappingRuleFromTenant calls the UnassignMappingRuleFromTenant operation.

Example:

```go
return client.UnassignMappingRuleFromTenant(ctx, "tenant-a", "sso-auditors")
```

### UnassignRoleFromClient

```go
func (c *CamundaClient) UnassignRoleFromClient(ctx context.Context, roleId string, clientId string, opts ...func(ApiUnassignRoleFromClientRequest) ApiUnassignRoleFromClientRequest) error
```

**Types:** [`ApiUnassignRoleFromClientRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUnassignRoleFromClientRequest)

UnassignRoleFromClient calls the UnassignRoleFromClient operation.

Example:

```go
return client.UnassignRoleFromClient(ctx, "auditor", "reporting-service")
```

### UnassignRoleFromGroup

```go
func (c *CamundaClient) UnassignRoleFromGroup(ctx context.Context, roleId string, groupId string, opts ...func(ApiUnassignRoleFromGroupRequest) ApiUnassignRoleFromGroupRequest) error
```

**Types:** [`ApiUnassignRoleFromGroupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUnassignRoleFromGroupRequest)

UnassignRoleFromGroup calls the UnassignRoleFromGroup operation.

Example:

```go
return client.UnassignRoleFromGroup(ctx, "auditor", "finance")
```

### UnassignRoleFromMappingRule

```go
func (c *CamundaClient) UnassignRoleFromMappingRule(ctx context.Context, roleId string, mappingRuleId string, opts ...func(ApiUnassignRoleFromMappingRuleRequest) ApiUnassignRoleFromMappingRuleRequest) error
```

**Types:** [`ApiUnassignRoleFromMappingRuleRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUnassignRoleFromMappingRuleRequest)

UnassignRoleFromMappingRule calls the UnassignRoleFromMappingRule operation.

Example:

```go
return client.UnassignRoleFromMappingRule(ctx, "auditor", "sso-auditors")
```

### UnassignRoleFromTenant

```go
func (c *CamundaClient) UnassignRoleFromTenant(ctx context.Context, tenantId string, roleId string, opts ...func(ApiUnassignRoleFromTenantRequest) ApiUnassignRoleFromTenantRequest) error
```

**Types:** [`ApiUnassignRoleFromTenantRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUnassignRoleFromTenantRequest)

UnassignRoleFromTenant calls the UnassignRoleFromTenant operation.

Example:

```go
return client.UnassignRoleFromTenant(ctx, "tenant-a", "auditor")
```

### UnassignRoleFromUser

```go
func (c *CamundaClient) UnassignRoleFromUser(ctx context.Context, roleId string, username string, opts ...func(ApiUnassignRoleFromUserRequest) ApiUnassignRoleFromUserRequest) error
```

**Types:** [`ApiUnassignRoleFromUserRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUnassignRoleFromUserRequest)

UnassignRoleFromUser calls the UnassignRoleFromUser operation.

Example:

```go
return client.UnassignRoleFromUser(ctx, "auditor", "alice")
```

### UnassignUserFromGroup

```go
func (c *CamundaClient) UnassignUserFromGroup(ctx context.Context, groupId string, username string, opts ...func(ApiUnassignUserFromGroupRequest) ApiUnassignUserFromGroupRequest) error
```

**Types:** [`ApiUnassignUserFromGroupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUnassignUserFromGroupRequest)

UnassignUserFromGroup calls the UnassignUserFromGroup operation.

Example:

```go
return client.UnassignUserFromGroup(ctx, "finance", "alice")
```

### UnassignUserFromTenant

```go
func (c *CamundaClient) UnassignUserFromTenant(ctx context.Context, tenantId string, username string, opts ...func(ApiUnassignUserFromTenantRequest) ApiUnassignUserFromTenantRequest) error
```

**Types:** [`ApiUnassignUserFromTenantRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUnassignUserFromTenantRequest)

UnassignUserFromTenant calls the UnassignUserFromTenant operation.

Example:

```go
return client.UnassignUserFromTenant(ctx, "tenant-a", "alice")
```

### UnassignUserTask

```go
func (c *CamundaClient) UnassignUserTask(ctx context.Context, userTaskKey UserTaskKey, opts ...func(ApiUnassignUserTaskRequest) ApiUnassignUserTaskRequest) error
```

**Types:** [`UserTaskKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserTaskKey), [`ApiUnassignUserTaskRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUnassignUserTaskRequest)

UnassignUserTask calls the UnassignUserTask operation.

Example:

```go
return client.UnassignUserTask(ctx, camunda.MustUserTaskKey("2251799813685380"))
```

### UpdateAgentInstance

```go
func (c *CamundaClient) UpdateAgentInstance(ctx context.Context, agentInstanceKey AgentInstanceKey, body AgentInstanceUpdateRequest, opts ...func(ApiUpdateAgentInstanceRequest) ApiUpdateAgentInstanceRequest) (*AgentInstanceUpdateResult, error)
```

**Types:** [`AgentInstanceKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AgentInstanceKey), [`AgentInstanceUpdateRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AgentInstanceUpdateRequest), [`ApiUpdateAgentInstanceRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUpdateAgentInstanceRequest), [`AgentInstanceUpdateResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AgentInstanceUpdateResult)

UpdateAgentInstance calls the UpdateAgentInstance operation.

Example:

```go
req := camunda.NewAgentInstanceUpdateRequest(
	camunda.ElementInstanceKey("2251799813685360"), // elementInstanceKey
	camunda.JobKey("2251799813685424"),             // jobKey
	"lease-token",
)

result, err := client.UpdateAgentInstance(ctx, camunda.MustAgentInstanceKey("2251799813685370"), *req)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### UpdateAuthorization

```go
func (c *CamundaClient) UpdateAuthorization(ctx context.Context, authorizationKey AuthorizationKey, body AuthorizationRequest, opts ...func(ApiUpdateAuthorizationRequest) ApiUpdateAuthorizationRequest) error
```

**Types:** [`AuthorizationKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AuthorizationKey), [`AuthorizationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#AuthorizationRequest), [`ApiUpdateAuthorizationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUpdateAuthorizationRequest)

UpdateAuthorization calls the UpdateAuthorization operation.

Example:

```go
updated := camunda.NewAuthorizationIdBasedRequest(
	"user@example.com",
	camunda.OWNERTYPEENUM_USER,
	"order-process",
	camunda.RESOURCETYPEENUM_PROCESS_DEFINITION,
	[]camunda.PermissionTypeEnum{camunda.PERMISSIONTYPEENUM_READ_PROCESS_DEFINITION},
)

return client.UpdateAuthorization(ctx,
	camunda.MustAuthorizationKey("2251799813685280"),
	camunda.AuthorizationIdBasedRequestAsAuthorizationRequest(updated))
```

### UpdateGlobalClusterVariable

```go
func (c *CamundaClient) UpdateGlobalClusterVariable(ctx context.Context, name string, body UpdateClusterVariableRequest, opts ...func(ApiUpdateGlobalClusterVariableRequest) ApiUpdateGlobalClusterVariableRequest) (*ClusterVariableResult, error)
```

**Types:** [`UpdateClusterVariableRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UpdateClusterVariableRequest), [`ApiUpdateGlobalClusterVariableRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUpdateGlobalClusterVariableRequest), [`ClusterVariableResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterVariableResult)

UpdateGlobalClusterVariable calls the UpdateGlobalClusterVariable operation.

Example:

```go
result, err := client.UpdateGlobalClusterVariable(ctx, "region",
	*camunda.NewUpdateClusterVariableRequest(map[string]any{"value": "eu-2"}))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### UpdateGlobalTaskListener

```go
func (c *CamundaClient) UpdateGlobalTaskListener(ctx context.Context, id string, body UpdateGlobalTaskListenerRequest, opts ...func(ApiUpdateGlobalTaskListenerRequest) ApiUpdateGlobalTaskListenerRequest) (*GlobalTaskListenerResult, error)
```

**Types:** [`UpdateGlobalTaskListenerRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UpdateGlobalTaskListenerRequest), [`ApiUpdateGlobalTaskListenerRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUpdateGlobalTaskListenerRequest), [`GlobalTaskListenerResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#GlobalTaskListenerResult)

UpdateGlobalTaskListener calls the UpdateGlobalTaskListener operation.

Example:

```go
result, err := client.UpdateGlobalTaskListener(ctx, "audit-listener",
	*camunda.NewUpdateGlobalTaskListenerRequest(
		"audit-worker",
		[]camunda.GlobalTaskListenerEventTypeEnum{camunda.GLOBALTASKLISTENEREVENTTYPEENUM_ALL},
	))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### UpdateGroup

```go
func (c *CamundaClient) UpdateGroup(ctx context.Context, groupId string, body GroupUpdateRequest, opts ...func(ApiUpdateGroupRequest) ApiUpdateGroupRequest) (*GroupUpdateResult, error)
```

**Types:** [`GroupUpdateRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#GroupUpdateRequest), [`ApiUpdateGroupRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUpdateGroupRequest), [`GroupUpdateResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#GroupUpdateResult)

UpdateGroup calls the UpdateGroup operation.

Example:

```go
result, err := client.UpdateGroup(ctx, "finance", *camunda.NewGroupUpdateRequest("Finance & Accounting"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### UpdateJob

```go
func (c *CamundaClient) UpdateJob(ctx context.Context, jobKey JobKey, body JobUpdateRequest, opts ...func(ApiUpdateJobRequest) ApiUpdateJobRequest) error
```

**Types:** [`JobKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#JobKey), [`JobUpdateRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#JobUpdateRequest), [`ApiUpdateJobRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUpdateJobRequest)

UpdateJob calls the UpdateJob operation.

Example:

```go
changeset := camunda.NewJobChangeset()
changeset.SetRetries(3)

return client.UpdateJob(ctx, camunda.MustJobKey("2251799813685424"), *camunda.NewJobUpdateRequest(*changeset))
```

### UpdateJobsBatchOperation

```go
func (c *CamundaClient) UpdateJobsBatchOperation(ctx context.Context, body JobBatchUpdateRequest, opts ...func(ApiUpdateJobsBatchOperationRequest) ApiUpdateJobsBatchOperationRequest) (*BatchOperationCreatedResult, error)
```

**Types:** [`JobBatchUpdateRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#JobBatchUpdateRequest), [`ApiUpdateJobsBatchOperationRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUpdateJobsBatchOperationRequest), [`BatchOperationCreatedResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#BatchOperationCreatedResult)

UpdateJobsBatchOperation calls the UpdateJobsBatchOperation operation.

Example:

```go
changeset := camunda.NewJobChangeset()
changeset.SetRetries(3)
req := camunda.NewJobBatchUpdateRequest(*camunda.NewJobFilter(), *changeset)

result, err := client.UpdateJobsBatchOperation(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
```

### UpdateMappingRule

```go
func (c *CamundaClient) UpdateMappingRule(ctx context.Context, mappingRuleId string, body MappingRuleUpdateRequest, opts ...func(ApiUpdateMappingRuleRequest) ApiUpdateMappingRuleRequest) (*MappingRuleUpdateResult, error)
```

**Types:** [`MappingRuleUpdateRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#MappingRuleUpdateRequest), [`ApiUpdateMappingRuleRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUpdateMappingRuleRequest), [`MappingRuleUpdateResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#MappingRuleUpdateResult)

UpdateMappingRule calls the UpdateMappingRule operation.

Example:

```go
result, err := client.UpdateMappingRule(ctx, "sso-auditors",
	*camunda.NewMappingRuleUpdateRequest("groups", "senior-auditors", "SSO Senior Auditors"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### UpdateRole

```go
func (c *CamundaClient) UpdateRole(ctx context.Context, roleId string, body RoleUpdateRequest, opts ...func(ApiUpdateRoleRequest) ApiUpdateRoleRequest) (*RoleUpdateResult, error)
```

**Types:** [`RoleUpdateRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#RoleUpdateRequest), [`ApiUpdateRoleRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUpdateRoleRequest), [`RoleUpdateResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#RoleUpdateResult)

UpdateRole calls the UpdateRole operation.

Example:

```go
result, err := client.UpdateRole(ctx, "auditor", *camunda.NewRoleUpdateRequest("Senior Auditor"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### UpdateTenant

```go
func (c *CamundaClient) UpdateTenant(ctx context.Context, tenantId string, body TenantUpdateRequest, opts ...func(ApiUpdateTenantRequest) ApiUpdateTenantRequest) (*TenantUpdateResult, error)
```

**Types:** [`TenantUpdateRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#TenantUpdateRequest), [`ApiUpdateTenantRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUpdateTenantRequest), [`TenantUpdateResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#TenantUpdateResult)

UpdateTenant calls the UpdateTenant operation.

Example:

```go
result, err := client.UpdateTenant(ctx, "tenant-a", *camunda.NewTenantUpdateRequest("Tenant A (renamed)"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### UpdateTenantClusterVariable

```go
func (c *CamundaClient) UpdateTenantClusterVariable(ctx context.Context, tenantId string, name string, body UpdateClusterVariableRequest, opts ...func(ApiUpdateTenantClusterVariableRequest) ApiUpdateTenantClusterVariableRequest) (*ClusterVariableResult, error)
```

**Types:** [`UpdateClusterVariableRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UpdateClusterVariableRequest), [`ApiUpdateTenantClusterVariableRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUpdateTenantClusterVariableRequest), [`ClusterVariableResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ClusterVariableResult)

UpdateTenantClusterVariable calls the UpdateTenantClusterVariable operation.

Example:

```go
result, err := client.UpdateTenantClusterVariable(ctx, "tenant-a", "region",
	*camunda.NewUpdateClusterVariableRequest(map[string]any{"value": "eu-2"}))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### UpdateUser

```go
func (c *CamundaClient) UpdateUser(ctx context.Context, username string, body UserUpdateRequest, opts ...func(ApiUpdateUserRequest) ApiUpdateUserRequest) (*UserUpdateResult, error)
```

**Types:** [`UserUpdateRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserUpdateRequest), [`ApiUpdateUserRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUpdateUserRequest), [`UserUpdateResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserUpdateResult)

UpdateUser calls the UpdateUser operation.

Example:

```go
req := camunda.NewUserUpdateRequest()
req.SetName("Alice Updated")

result, err := client.UpdateUser(ctx, "alice", *req)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### UpdateUserTask

```go
func (c *CamundaClient) UpdateUserTask(ctx context.Context, userTaskKey UserTaskKey, body UserTaskUpdateRequest, opts ...func(ApiUpdateUserTaskRequest) ApiUpdateUserTaskRequest) error
```

**Types:** [`UserTaskKey`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserTaskKey), [`UserTaskUpdateRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#UserTaskUpdateRequest), [`ApiUpdateUserTaskRequest`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client#ApiUpdateUserTaskRequest)

UpdateUserTask calls the UpdateUserTask operation.

Example:

```go
// Update fields (priority, due/follow-up dates, ...) via the request's
// changeset. An empty request is a no-op.
req := camunda.NewUserTaskUpdateRequest()

return client.UpdateUserTask(ctx, camunda.MustUserTaskKey("2251799813685380"), *req)
```
