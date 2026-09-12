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

`CamundaClient` exposes **231** methods covering the full Orchestration Cluster REST API surface, with authentication, retries, and backpressure applied automatically.

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

| Method                                                                                                    | Description                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`ActivateAdHocSubProcessActivities`](#activateadhocsubprocessactivities)                                 | ActivateAdHocSubProcessActivities calls the ActivateAdHocSubProcessActivities operation.                                                                                  |
| [`ActivateJobs`](#activatejobs)                                                                           | ActivateJobs calls the ActivateJobs operation.                                                                                                                            |
| [`AssignClientToGroup`](#assignclienttogroup)                                                             | AssignClientToGroup calls the AssignClientToGroup operation.                                                                                                              |
| [`AssignClientToTenant`](#assignclienttotenant)                                                           | AssignClientToTenant calls the AssignClientToTenant operation.                                                                                                            |
| [`AssignGroupToTenant`](#assigngrouptotenant)                                                             | AssignGroupToTenant calls the AssignGroupToTenant operation.                                                                                                              |
| [`AssignMappingRuleToGroup`](#assignmappingruletogroup)                                                   | AssignMappingRuleToGroup calls the AssignMappingRuleToGroup operation.                                                                                                    |
| [`AssignMappingRuleToTenant`](#assignmappingruletotenant)                                                 | AssignMappingRuleToTenant calls the AssignMappingRuleToTenant operation.                                                                                                  |
| [`AssignProcessInstanceBusinessId`](#assignprocessinstancebusinessid)                                     | AssignProcessInstanceBusinessId calls the AssignProcessInstanceBusinessId operation.                                                                                      |
| [`AssignRoleToClient`](#assignroletoclient)                                                               | AssignRoleToClient calls the AssignRoleToClient operation.                                                                                                                |
| [`AssignRoleToGroup`](#assignroletogroup)                                                                 | AssignRoleToGroup calls the AssignRoleToGroup operation.                                                                                                                  |
| [`AssignRoleToMappingRule`](#assignroletomappingrule)                                                     | AssignRoleToMappingRule calls the AssignRoleToMappingRule operation.                                                                                                      |
| [`AssignRoleToTenant`](#assignroletotenant)                                                               | AssignRoleToTenant calls the AssignRoleToTenant operation.                                                                                                                |
| [`AssignRoleToUser`](#assignroletouser)                                                                   | AssignRoleToUser calls the AssignRoleToUser operation.                                                                                                                    |
| [`AssignUserTask`](#assignusertask)                                                                       | AssignUserTask calls the AssignUserTask operation.                                                                                                                        |
| [`AssignUserToGroup`](#assignusertogroup)                                                                 | AssignUserToGroup calls the AssignUserToGroup operation.                                                                                                                  |
| [`AssignUserToTenant`](#assignusertotenant)                                                               | AssignUserToTenant calls the AssignUserToTenant operation.                                                                                                                |
| [`BroadcastSignal`](#broadcastsignal)                                                                     | BroadcastSignal calls the BroadcastSignal operation.                                                                                                                      |
| [`CancelBatchOperation`](#cancelbatchoperation)                                                           | CancelBatchOperation calls the CancelBatchOperation operation.                                                                                                            |
| [`CancelProcessInstance`](#cancelprocessinstance)                                                         | CancelProcessInstance calls the CancelProcessInstance operation.                                                                                                          |
| [`CancelProcessInstancesBatchOperation`](#cancelprocessinstancesbatchoperation)                           | CancelProcessInstancesBatchOperation calls the CancelProcessInstancesBatchOperation operation.                                                                            |
| [`ChangeClusterMode`](#changeclustermode)                                                                 | ChangeClusterMode calls the ChangeClusterMode operation.                                                                                                                  |
| [`ChangeClusterModeAsClusterAdmin`](#changeclustermodeasclusteradmin)                                     | ChangeClusterModeAsClusterAdmin calls the ChangeClusterModeAsClusterAdmin operation.                                                                                      |
| [`CompleteJob`](#completejob)                                                                             | CompleteJob calls the CompleteJob operation.                                                                                                                              |
| [`CompleteUserTask`](#completeusertask)                                                                   | CompleteUserTask calls the CompleteUserTask operation.                                                                                                                    |
| [`Config`](#config)                                                                                       | Config returns the resolved configuration.                                                                                                                                |
| [`CorrelateMessage`](#correlatemessage)                                                                   | CorrelateMessage calls the CorrelateMessage operation.                                                                                                                    |
| [`CreateAdminUser`](#createadminuser)                                                                     | CreateAdminUser calls the CreateAdminUser operation.                                                                                                                      |
| [`CreateAgentInstance`](#createagentinstance)                                                             | CreateAgentInstance calls the CreateAgentInstance operation.                                                                                                              |
| [`CreateAgentInstanceHistoryItem`](#createagentinstancehistoryitem)                                       | CreateAgentInstanceHistoryItem calls the CreateAgentInstanceHistoryItem operation.                                                                                        |
| [`CreateAuthorization`](#createauthorization)                                                             | CreateAuthorization calls the CreateAuthorization operation.                                                                                                              |
| [`CreateDeployment`](#createdeployment)                                                                   | CreateDeployment calls the CreateDeployment operation.                                                                                                                    |
| [`CreateDocument`](#createdocument)                                                                       | CreateDocument calls the CreateDocument operation.                                                                                                                        |
| [`CreateDocumentLink`](#createdocumentlink)                                                               | CreateDocumentLink calls the CreateDocumentLink operation.                                                                                                                |
| [`CreateDocuments`](#createdocuments)                                                                     | CreateDocuments calls the CreateDocuments operation.                                                                                                                      |
| [`CreateElementInstanceVariables`](#createelementinstancevariables)                                       | CreateElementInstanceVariables calls the CreateElementInstanceVariables operation.                                                                                        |
| [`CreateGlobalClusterVariable`](#createglobalclustervariable)                                             | CreateGlobalClusterVariable calls the CreateGlobalClusterVariable operation.                                                                                              |
| [`CreateGlobalTaskListener`](#createglobaltasklistener)                                                   | CreateGlobalTaskListener calls the CreateGlobalTaskListener operation.                                                                                                    |
| [`CreateGroup`](#creategroup)                                                                             | CreateGroup calls the CreateGroup operation.                                                                                                                              |
| [`CreateMappingRule`](#createmappingrule)                                                                 | CreateMappingRule calls the CreateMappingRule operation.                                                                                                                  |
| [`CreateProcessInstance`](#createprocessinstance)                                                         | CreateProcessInstance creates (starts) a process instance.                                                                                                                |
| [`CreateRole`](#createrole)                                                                               | CreateRole calls the CreateRole operation.                                                                                                                                |
| [`CreateTenant`](#createtenant)                                                                           | CreateTenant calls the CreateTenant operation.                                                                                                                            |
| [`CreateTenantClusterVariable`](#createtenantclustervariable)                                             | CreateTenantClusterVariable calls the CreateTenantClusterVariable operation.                                                                                              |
| [`CreateUser`](#createuser)                                                                               | CreateUser calls the CreateUser operation.                                                                                                                                |
| [`DeleteAuthorization`](#deleteauthorization)                                                             | DeleteAuthorization calls the DeleteAuthorization operation.                                                                                                              |
| [`DeleteDecisionInstance`](#deletedecisioninstance)                                                       | DeleteDecisionInstance calls the DeleteDecisionInstance operation.                                                                                                        |
| [`DeleteDecisionInstancesBatchOperation`](#deletedecisioninstancesbatchoperation)                         | DeleteDecisionInstancesBatchOperation calls the DeleteDecisionInstancesBatchOperation operation.                                                                          |
| [`DeleteDocument`](#deletedocument)                                                                       | DeleteDocument calls the DeleteDocument operation.                                                                                                                        |
| [`DeleteGlobalClusterVariable`](#deleteglobalclustervariable)                                             | DeleteGlobalClusterVariable calls the DeleteGlobalClusterVariable operation.                                                                                              |
| [`DeleteGlobalTaskListener`](#deleteglobaltasklistener)                                                   | DeleteGlobalTaskListener calls the DeleteGlobalTaskListener operation.                                                                                                    |
| [`DeleteGroup`](#deletegroup)                                                                             | DeleteGroup calls the DeleteGroup operation.                                                                                                                              |
| [`DeleteHistoryBackup`](#deletehistorybackup)                                                             | DeleteHistoryBackup calls the DeleteHistoryBackup operation.                                                                                                              |
| [`DeleteMappingRule`](#deletemappingrule)                                                                 | DeleteMappingRule calls the DeleteMappingRule operation.                                                                                                                  |
| [`DeleteProcessInstance`](#deleteprocessinstance)                                                         | DeleteProcessInstance calls the DeleteProcessInstance operation.                                                                                                          |
| [`DeleteProcessInstancesBatchOperation`](#deleteprocessinstancesbatchoperation)                           | DeleteProcessInstancesBatchOperation calls the DeleteProcessInstancesBatchOperation operation.                                                                            |
| [`DeleteResource`](#deleteresource)                                                                       | DeleteResource calls the DeleteResource operation.                                                                                                                        |
| [`DeleteRole`](#deleterole)                                                                               | DeleteRole calls the DeleteRole operation.                                                                                                                                |
| [`DeleteRuntimeBackup`](#deleteruntimebackup)                                                             | DeleteRuntimeBackup calls the DeleteRuntimeBackup operation.                                                                                                              |
| [`DeleteRuntimeBackupState`](#deleteruntimebackupstate)                                                   | DeleteRuntimeBackupState calls the DeleteRuntimeBackupState operation.                                                                                                    |
| [`DeleteTenant`](#deletetenant)                                                                           | DeleteTenant calls the DeleteTenant operation.                                                                                                                            |
| [`DeleteTenantClusterVariable`](#deletetenantclustervariable)                                             | DeleteTenantClusterVariable calls the DeleteTenantClusterVariable operation.                                                                                              |
| [`DeleteUser`](#deleteuser)                                                                               | DeleteUser calls the DeleteUser operation.                                                                                                                                |
| [`EvaluateConditionals`](#evaluateconditionals)                                                           | EvaluateConditionals calls the EvaluateConditionals operation.                                                                                                            |
| [`EvaluateDecision`](#evaluatedecision)                                                                   | EvaluateDecision calls the EvaluateDecision operation.                                                                                                                    |
| [`EvaluateExpression`](#evaluateexpression)                                                               | EvaluateExpression calls the EvaluateExpression operation.                                                                                                                |
| [`FailJob`](#failjob)                                                                                     | FailJob calls the FailJob operation.                                                                                                                                      |
| [`GetAgentDefinition`](#getagentdefinition)                                                               | GetAgentDefinition calls the GetAgentDefinition operation.                                                                                                                |
| [`GetAgentInstance`](#getagentinstance)                                                                   | GetAgentInstance calls the GetAgentInstance operation.                                                                                                                    |
| [`GetAuditLog`](#getauditlog)                                                                             | GetAuditLog calls the GetAuditLog operation.                                                                                                                              |
| [`GetAuthentication`](#getauthentication)                                                                 | GetAuthentication calls the GetAuthentication operation.                                                                                                                  |
| [`GetAuthorization`](#getauthorization)                                                                   | GetAuthorization calls the GetAuthorization operation.                                                                                                                    |
| [`GetBatchOperation`](#getbatchoperation)                                                                 | GetBatchOperation calls the GetBatchOperation operation.                                                                                                                  |
| [`GetClusterStatus`](#getclusterstatus)                                                                   | GetClusterStatus calls the GetClusterStatus operation.                                                                                                                    |
| [`GetClusterTopology`](#getclustertopology)                                                               | GetClusterTopology calls the GetClusterTopology operation.                                                                                                                |
| [`GetDecisionDefinition`](#getdecisiondefinition)                                                         | GetDecisionDefinition calls the GetDecisionDefinition operation.                                                                                                          |
| [`GetDecisionDefinitionXML`](#getdecisiondefinitionxml)                                                   | GetDecisionDefinitionXML calls the GetDecisionDefinitionXML operation.                                                                                                    |
| [`GetDecisionInstance`](#getdecisioninstance)                                                             | GetDecisionInstance calls the GetDecisionInstance operation.                                                                                                              |
| [`GetDecisionRequirements`](#getdecisionrequirements)                                                     | GetDecisionRequirements calls the GetDecisionRequirements operation.                                                                                                      |
| [`GetDecisionRequirementsXML`](#getdecisionrequirementsxml)                                               | GetDecisionRequirementsXML calls the GetDecisionRequirementsXML operation.                                                                                                |
| [`GetDocument`](#getdocument)                                                                             | GetDocument calls the GetDocument operation.                                                                                                                              |
| [`GetElementInstance`](#getelementinstance)                                                               | GetElementInstance calls the GetElementInstance operation.                                                                                                                |
| [`GetExportingStatus`](#getexportingstatus)                                                               | GetExportingStatus calls the GetExportingStatus operation.                                                                                                                |
| [`GetFormByKey`](#getformbykey)                                                                           | GetFormByKey calls the GetFormByKey operation.                                                                                                                            |
| [`GetGlobalClusterVariable`](#getglobalclustervariable)                                                   | GetGlobalClusterVariable calls the GetGlobalClusterVariable operation.                                                                                                    |
| [`GetGlobalJobStatistics`](#getglobaljobstatistics)                                                       | GetGlobalJobStatistics calls the GetGlobalJobStatistics operation.                                                                                                        |
| [`GetGlobalTaskListener`](#getglobaltasklistener)                                                         | GetGlobalTaskListener calls the GetGlobalTaskListener operation.                                                                                                          |
| [`GetGroup`](#getgroup)                                                                                   | GetGroup calls the GetGroup operation.                                                                                                                                    |
| [`GetHistoryBackup`](#gethistorybackup)                                                                   | GetHistoryBackup calls the GetHistoryBackup operation.                                                                                                                    |
| [`GetIncident`](#getincident)                                                                             | GetIncident calls the GetIncident operation.                                                                                                                              |
| [`GetJobErrorStatistics`](#getjoberrorstatistics)                                                         | GetJobErrorStatistics calls the GetJobErrorStatistics operation.                                                                                                          |
| [`GetJobTimeSeriesStatistics`](#getjobtimeseriesstatistics)                                               | GetJobTimeSeriesStatistics calls the GetJobTimeSeriesStatistics operation.                                                                                                |
| [`GetJobTypeStatistics`](#getjobtypestatistics)                                                           | GetJobTypeStatistics calls the GetJobTypeStatistics operation.                                                                                                            |
| [`GetJobWorkerStatistics`](#getjobworkerstatistics)                                                       | GetJobWorkerStatistics calls the GetJobWorkerStatistics operation.                                                                                                        |
| [`GetLicense`](#getlicense)                                                                               | GetLicense calls the GetLicense operation.                                                                                                                                |
| [`GetMappingRule`](#getmappingrule)                                                                       | GetMappingRule calls the GetMappingRule operation.                                                                                                                        |
| [`GetProcessDefinition`](#getprocessdefinition)                                                           | GetProcessDefinition calls the GetProcessDefinition operation.                                                                                                            |
| [`GetProcessDefinitionInstanceStatistics`](#getprocessdefinitioninstancestatistics)                       | GetProcessDefinitionInstanceStatistics calls the GetProcessDefinitionInstanceStatistics operation.                                                                        |
| [`GetProcessDefinitionInstanceVersionStatistics`](#getprocessdefinitioninstanceversionstatistics)         | GetProcessDefinitionInstanceVersionStatistics calls the GetProcessDefinitionInstanceVersionStatistics operation.                                                          |
| [`GetProcessDefinitionMessageSubscriptionStatistics`](#getprocessdefinitionmessagesubscriptionstatistics) | GetProcessDefinitionMessageSubscriptionStatistics calls the GetProcessDefinitionMessageSubscriptionStatistics operation.                                                  |
| [`GetProcessDefinitionStatistics`](#getprocessdefinitionstatistics)                                       | GetProcessDefinitionStatistics calls the GetProcessDefinitionStatistics operation.                                                                                        |
| [`GetProcessDefinitionXML`](#getprocessdefinitionxml)                                                     | GetProcessDefinitionXML calls the GetProcessDefinitionXML operation.                                                                                                      |
| [`GetProcessInstance`](#getprocessinstance)                                                               | GetProcessInstance calls the GetProcessInstance operation.                                                                                                                |
| [`GetProcessInstanceCallHierarchy`](#getprocessinstancecallhierarchy)                                     | GetProcessInstanceCallHierarchy calls the GetProcessInstanceCallHierarchy operation.                                                                                      |
| [`GetProcessInstanceSequenceFlows`](#getprocessinstancesequenceflows)                                     | GetProcessInstanceSequenceFlows calls the GetProcessInstanceSequenceFlows operation.                                                                                      |
| [`GetProcessInstanceStatistics`](#getprocessinstancestatistics)                                           | GetProcessInstanceStatistics calls the GetProcessInstanceStatistics operation.                                                                                            |
| [`GetProcessInstanceStatisticsByDefinition`](#getprocessinstancestatisticsbydefinition)                   | GetProcessInstanceStatisticsByDefinition calls the GetProcessInstanceStatisticsByDefinition operation.                                                                    |
| [`GetProcessInstanceStatisticsByError`](#getprocessinstancestatisticsbyerror)                             | GetProcessInstanceStatisticsByError calls the GetProcessInstanceStatisticsByError operation.                                                                              |
| [`GetProcessInstanceWaitStateStatistics`](#getprocessinstancewaitstatestatistics)                         | GetProcessInstanceWaitStateStatistics calls the GetProcessInstanceWaitStateStatistics operation.                                                                          |
| [`GetResource`](#getresource)                                                                             | GetResource calls the GetResource operation.                                                                                                                              |
| [`GetResourceContent`](#getresourcecontent)                                                               | GetResourceContent calls the GetResourceContent operation.                                                                                                                |
| [`GetResourceContentBinary`](#getresourcecontentbinary)                                                   | GetResourceContentBinary calls the GetResourceContentBinary operation.                                                                                                    |
| [`GetRestoreStatus`](#getrestorestatus)                                                                   | GetRestoreStatus calls the GetRestoreStatus operation.                                                                                                                    |
| [`GetRole`](#getrole)                                                                                     | GetRole calls the GetRole operation.                                                                                                                                      |
| [`GetRuntimeBackup`](#getruntimebackup)                                                                   | GetRuntimeBackup calls the GetRuntimeBackup operation.                                                                                                                    |
| [`GetRuntimeBackupState`](#getruntimebackupstate)                                                         | GetRuntimeBackupState calls the GetRuntimeBackupState operation.                                                                                                          |
| [`GetStartProcessForm`](#getstartprocessform)                                                             | GetStartProcessForm calls the GetStartProcessForm operation.                                                                                                              |
| [`GetStatus`](#getstatus)                                                                                 | GetStatus calls the GetStatus operation.                                                                                                                                  |
| [`GetSystemConfiguration`](#getsystemconfiguration)                                                       | GetSystemConfiguration calls the GetSystemConfiguration operation.                                                                                                        |
| [`GetTenant`](#gettenant)                                                                                 | GetTenant calls the GetTenant operation.                                                                                                                                  |
| [`GetTenantClusterVariable`](#gettenantclustervariable)                                                   | GetTenantClusterVariable calls the GetTenantClusterVariable operation.                                                                                                    |
| [`GetTopology`](#gettopology)                                                                             | GetTopology calls the GetTopology operation.                                                                                                                              |
| [`GetUsageMetrics`](#getusagemetrics)                                                                     | GetUsageMetrics calls the GetUsageMetrics operation.                                                                                                                      |
| [`GetUser`](#getuser)                                                                                     | GetUser calls the GetUser operation.                                                                                                                                      |
| [`GetUserTask`](#getusertask)                                                                             | GetUserTask calls the GetUserTask operation.                                                                                                                              |
| [`GetUserTaskForm`](#getusertaskform)                                                                     | GetUserTaskForm calls the GetUserTaskForm operation.                                                                                                                      |
| [`GetVariable`](#getvariable)                                                                             | GetVariable calls the GetVariable operation.                                                                                                                              |
| [`ListHistoryBackups`](#listhistorybackups)                                                               | ListHistoryBackups calls the ListHistoryBackups operation.                                                                                                                |
| [`ListRuntimeBackups`](#listruntimebackups)                                                               | ListRuntimeBackups calls the ListRuntimeBackups operation.                                                                                                                |
| [`ListSecrets`](#listsecrets)                                                                             | ListSecrets calls the ListSecrets operation.                                                                                                                              |
| [`MigrateProcessInstance`](#migrateprocessinstance)                                                       | MigrateProcessInstance calls the MigrateProcessInstance operation.                                                                                                        |
| [`MigrateProcessInstancesBatchOperation`](#migrateprocessinstancesbatchoperation)                         | MigrateProcessInstancesBatchOperation calls the MigrateProcessInstancesBatchOperation operation.                                                                          |
| [`ModifyProcessInstance`](#modifyprocessinstance)                                                         | ModifyProcessInstance calls the ModifyProcessInstance operation.                                                                                                          |
| [`ModifyProcessInstancesBatchOperation`](#modifyprocessinstancesbatchoperation)                           | ModifyProcessInstancesBatchOperation calls the ModifyProcessInstancesBatchOperation operation.                                                                            |
| [`NewJobWorker`](#newjobworker)                                                                           | NewJobWorker creates a worker for jobType. Defaults are seeded from the client's CAMUNDA*WORKER*\* configuration and can be overridden with options.                      |
| [`NewStreamJobWorker`](#newstreamjobworker)                                                               | NewStreamJobWorker creates a gRPC streaming worker for jobType. Defaults are seeded from the client's CAMUNDA*WORKER*\* configuration and can be overridden with options. |
| [`PauseExporting`](#pauseexporting)                                                                       | PauseExporting calls the PauseExporting operation.                                                                                                                        |
| [`PinClock`](#pinclock)                                                                                   | PinClock calls the PinClock operation.                                                                                                                                    |
| [`PublishMessage`](#publishmessage)                                                                       | PublishMessage calls the PublishMessage operation.                                                                                                                        |
| [`Raw`](#raw)                                                                                             | Raw returns the underlying generated client for operations or options not yet surfaced on the ergonomic facade.                                                           |
| [`ResetClock`](#resetclock)                                                                               | ResetClock calls the ResetClock operation.                                                                                                                                |
| [`ResolveIncident`](#resolveincident)                                                                     | ResolveIncident calls the ResolveIncident operation.                                                                                                                      |
| [`ResolveIncidentsBatchOperation`](#resolveincidentsbatchoperation)                                       | ResolveIncidentsBatchOperation calls the ResolveIncidentsBatchOperation operation.                                                                                        |
| [`ResolveProcessInstanceIncidents`](#resolveprocessinstanceincidents)                                     | ResolveProcessInstanceIncidents calls the ResolveProcessInstanceIncidents operation.                                                                                      |
| [`ResolveSecrets`](#resolvesecrets)                                                                       | ResolveSecrets calls the ResolveSecrets operation.                                                                                                                        |
| [`Restore`](#restore)                                                                                     | Restore calls the Restore operation.                                                                                                                                      |
| [`RestoreAsClusterAdmin`](#restoreasclusteradmin)                                                         | RestoreAsClusterAdmin calls the RestoreAsClusterAdmin operation.                                                                                                          |
| [`ResumeBatchOperation`](#resumebatchoperation)                                                           | ResumeBatchOperation calls the ResumeBatchOperation operation.                                                                                                            |
| [`ResumeExporting`](#resumeexporting)                                                                     | ResumeExporting calls the ResumeExporting operation.                                                                                                                      |
| [`ResumeProcessInstance`](#resumeprocessinstance)                                                         | ResumeProcessInstance calls the ResumeProcessInstance operation.                                                                                                          |
| [`ResumeProcessInstancesBatchOperation`](#resumeprocessinstancesbatchoperation)                           | ResumeProcessInstancesBatchOperation calls the ResumeProcessInstancesBatchOperation operation.                                                                            |
| [`SearchAgentDefinitions`](#searchagentdefinitions)                                                       | SearchAgentDefinitions calls the SearchAgentDefinitions operation.                                                                                                        |
| [`SearchAgentInstanceHistory`](#searchagentinstancehistory)                                               | SearchAgentInstanceHistory calls the SearchAgentInstanceHistory operation.                                                                                                |
| [`SearchAgentInstances`](#searchagentinstances)                                                           | SearchAgentInstances calls the SearchAgentInstances operation.                                                                                                            |
| [`SearchAuditLogs`](#searchauditlogs)                                                                     | SearchAuditLogs calls the SearchAuditLogs operation.                                                                                                                      |
| [`SearchAuthorizations`](#searchauthorizations)                                                           | SearchAuthorizations calls the SearchAuthorizations operation.                                                                                                            |
| [`SearchBatchOperationItems`](#searchbatchoperationitems)                                                 | SearchBatchOperationItems calls the SearchBatchOperationItems operation.                                                                                                  |
| [`SearchBatchOperations`](#searchbatchoperations)                                                         | SearchBatchOperations calls the SearchBatchOperations operation.                                                                                                          |
| [`SearchClientsForGroup`](#searchclientsforgroup)                                                         | SearchClientsForGroup calls the SearchClientsForGroup operation.                                                                                                          |
| [`SearchClientsForRole`](#searchclientsforrole)                                                           | SearchClientsForRole calls the SearchClientsForRole operation.                                                                                                            |
| [`SearchClientsForTenant`](#searchclientsfortenant)                                                       | SearchClientsForTenant calls the SearchClientsForTenant operation.                                                                                                        |
| [`SearchClusterVariables`](#searchclustervariables)                                                       | SearchClusterVariables calls the SearchClusterVariables operation.                                                                                                        |
| [`SearchCorrelatedMessageSubscriptions`](#searchcorrelatedmessagesubscriptions)                           | SearchCorrelatedMessageSubscriptions calls the SearchCorrelatedMessageSubscriptions operation.                                                                            |
| [`SearchDecisionDefinitions`](#searchdecisiondefinitions)                                                 | SearchDecisionDefinitions calls the SearchDecisionDefinitions operation.                                                                                                  |
| [`SearchDecisionInstances`](#searchdecisioninstances)                                                     | SearchDecisionInstances calls the SearchDecisionInstances operation.                                                                                                      |
| [`SearchDecisionRequirements`](#searchdecisionrequirements)                                               | SearchDecisionRequirements calls the SearchDecisionRequirements operation.                                                                                                |
| [`SearchElementInstanceIncidents`](#searchelementinstanceincidents)                                       | SearchElementInstanceIncidents calls the SearchElementInstanceIncidents operation.                                                                                        |
| [`SearchElementInstanceWaitStates`](#searchelementinstancewaitstates)                                     | SearchElementInstanceWaitStates calls the SearchElementInstanceWaitStates operation.                                                                                      |
| [`SearchElementInstances`](#searchelementinstances)                                                       | SearchElementInstances calls the SearchElementInstances operation.                                                                                                        |
| [`SearchGlobalTaskListeners`](#searchglobaltasklisteners)                                                 | SearchGlobalTaskListeners calls the SearchGlobalTaskListeners operation.                                                                                                  |
| [`SearchGroupIdsForTenant`](#searchgroupidsfortenant)                                                     | SearchGroupIdsForTenant calls the SearchGroupIdsForTenant operation.                                                                                                      |
| [`SearchGroups`](#searchgroups)                                                                           | SearchGroups calls the SearchGroups operation.                                                                                                                            |
| [`SearchGroupsForRole`](#searchgroupsforrole)                                                             | SearchGroupsForRole calls the SearchGroupsForRole operation.                                                                                                              |
| [`SearchIncidents`](#searchincidents)                                                                     | SearchIncidents calls the SearchIncidents operation.                                                                                                                      |
| [`SearchJobs`](#searchjobs)                                                                               | SearchJobs calls the SearchJobs operation.                                                                                                                                |
| [`SearchMappingRule`](#searchmappingrule)                                                                 | SearchMappingRule calls the SearchMappingRule operation.                                                                                                                  |
| [`SearchMappingRulesForGroup`](#searchmappingrulesforgroup)                                               | SearchMappingRulesForGroup calls the SearchMappingRulesForGroup operation.                                                                                                |
| [`SearchMappingRulesForRole`](#searchmappingrulesforrole)                                                 | SearchMappingRulesForRole calls the SearchMappingRulesForRole operation.                                                                                                  |
| [`SearchMappingRulesForTenant`](#searchmappingrulesfortenant)                                             | SearchMappingRulesForTenant calls the SearchMappingRulesForTenant operation.                                                                                              |
| [`SearchMessageSubscriptions`](#searchmessagesubscriptions)                                               | SearchMessageSubscriptions calls the SearchMessageSubscriptions operation.                                                                                                |
| [`SearchOwnAuthorizations`](#searchownauthorizations)                                                     | SearchOwnAuthorizations calls the SearchOwnAuthorizations operation.                                                                                                      |
| [`SearchProcessDefinitionVariableNames`](#searchprocessdefinitionvariablenames)                           | SearchProcessDefinitionVariableNames calls the SearchProcessDefinitionVariableNames operation.                                                                            |
| [`SearchProcessDefinitions`](#searchprocessdefinitions)                                                   | SearchProcessDefinitions calls the SearchProcessDefinitions operation.                                                                                                    |
| [`SearchProcessInstanceIncidents`](#searchprocessinstanceincidents)                                       | SearchProcessInstanceIncidents calls the SearchProcessInstanceIncidents operation.                                                                                        |
| [`SearchProcessInstances`](#searchprocessinstances)                                                       | SearchProcessInstances calls the SearchProcessInstances operation.                                                                                                        |
| [`SearchResources`](#searchresources)                                                                     | SearchResources calls the SearchResources operation.                                                                                                                      |
| [`SearchRoles`](#searchroles)                                                                             | SearchRoles calls the SearchRoles operation.                                                                                                                              |
| [`SearchRolesForGroup`](#searchrolesforgroup)                                                             | SearchRolesForGroup calls the SearchRolesForGroup operation.                                                                                                              |
| [`SearchRolesForTenant`](#searchrolesfortenant)                                                           | SearchRolesForTenant calls the SearchRolesForTenant operation.                                                                                                            |
| [`SearchTenants`](#searchtenants)                                                                         | SearchTenants calls the SearchTenants operation.                                                                                                                          |
| [`SearchUserTaskAuditLogs`](#searchusertaskauditlogs)                                                     | SearchUserTaskAuditLogs calls the SearchUserTaskAuditLogs operation.                                                                                                      |
| [`SearchUserTaskEffectiveVariables`](#searchusertaskeffectivevariables)                                   | SearchUserTaskEffectiveVariables calls the SearchUserTaskEffectiveVariables operation.                                                                                    |
| [`SearchUserTaskVariables`](#searchusertaskvariables)                                                     | SearchUserTaskVariables calls the SearchUserTaskVariables operation.                                                                                                      |
| [`SearchUserTasks`](#searchusertasks)                                                                     | SearchUserTasks calls the SearchUserTasks operation.                                                                                                                      |
| [`SearchUsers`](#searchusers)                                                                             | SearchUsers calls the SearchUsers operation.                                                                                                                              |
| [`SearchUsersForGroup`](#searchusersforgroup)                                                             | SearchUsersForGroup calls the SearchUsersForGroup operation.                                                                                                              |
| [`SearchUsersForRole`](#searchusersforrole)                                                               | SearchUsersForRole calls the SearchUsersForRole operation.                                                                                                                |
| [`SearchUsersForTenant`](#searchusersfortenant)                                                           | SearchUsersForTenant calls the SearchUsersForTenant operation.                                                                                                            |
| [`SearchVariables`](#searchvariables)                                                                     | SearchVariables calls the SearchVariables operation.                                                                                                                      |
| [`SuspendBatchOperation`](#suspendbatchoperation)                                                         | SuspendBatchOperation calls the SuspendBatchOperation operation.                                                                                                          |
| [`SuspendProcessInstance`](#suspendprocessinstance)                                                       | SuspendProcessInstance calls the SuspendProcessInstance operation.                                                                                                        |
| [`SuspendProcessInstancesBatchOperation`](#suspendprocessinstancesbatchoperation)                         | SuspendProcessInstancesBatchOperation calls the SuspendProcessInstancesBatchOperation operation.                                                                          |
| [`SyncRuntimeBackupState`](#syncruntimebackupstate)                                                       | SyncRuntimeBackupState calls the SyncRuntimeBackupState operation.                                                                                                        |
| [`TakeHistoryBackup`](#takehistorybackup)                                                                 | TakeHistoryBackup calls the TakeHistoryBackup operation.                                                                                                                  |
| [`TakeRuntimeBackup`](#takeruntimebackup)                                                                 | TakeRuntimeBackup calls the TakeRuntimeBackup operation.                                                                                                                  |
| [`ThrowJobError`](#throwjoberror)                                                                         | ThrowJobError calls the ThrowJobError operation.                                                                                                                          |
| [`UnassignClientFromGroup`](#unassignclientfromgroup)                                                     | UnassignClientFromGroup calls the UnassignClientFromGroup operation.                                                                                                      |
| [`UnassignClientFromTenant`](#unassignclientfromtenant)                                                   | UnassignClientFromTenant calls the UnassignClientFromTenant operation.                                                                                                    |
| [`UnassignGroupFromTenant`](#unassigngroupfromtenant)                                                     | UnassignGroupFromTenant calls the UnassignGroupFromTenant operation.                                                                                                      |
| [`UnassignMappingRuleFromGroup`](#unassignmappingrulefromgroup)                                           | UnassignMappingRuleFromGroup calls the UnassignMappingRuleFromGroup operation.                                                                                            |
| [`UnassignMappingRuleFromTenant`](#unassignmappingrulefromtenant)                                         | UnassignMappingRuleFromTenant calls the UnassignMappingRuleFromTenant operation.                                                                                          |
| [`UnassignRoleFromClient`](#unassignrolefromclient)                                                       | UnassignRoleFromClient calls the UnassignRoleFromClient operation.                                                                                                        |
| [`UnassignRoleFromGroup`](#unassignrolefromgroup)                                                         | UnassignRoleFromGroup calls the UnassignRoleFromGroup operation.                                                                                                          |
| [`UnassignRoleFromMappingRule`](#unassignrolefrommappingrule)                                             | UnassignRoleFromMappingRule calls the UnassignRoleFromMappingRule operation.                                                                                              |
| [`UnassignRoleFromTenant`](#unassignrolefromtenant)                                                       | UnassignRoleFromTenant calls the UnassignRoleFromTenant operation.                                                                                                        |
| [`UnassignRoleFromUser`](#unassignrolefromuser)                                                           | UnassignRoleFromUser calls the UnassignRoleFromUser operation.                                                                                                            |
| [`UnassignUserFromGroup`](#unassignuserfromgroup)                                                         | UnassignUserFromGroup calls the UnassignUserFromGroup operation.                                                                                                          |
| [`UnassignUserFromTenant`](#unassignuserfromtenant)                                                       | UnassignUserFromTenant calls the UnassignUserFromTenant operation.                                                                                                        |
| [`UnassignUserTask`](#unassignusertask)                                                                   | UnassignUserTask calls the UnassignUserTask operation.                                                                                                                    |
| [`UpdateAgentInstance`](#updateagentinstance)                                                             | UpdateAgentInstance calls the UpdateAgentInstance operation.                                                                                                              |
| [`UpdateAuthorization`](#updateauthorization)                                                             | UpdateAuthorization calls the UpdateAuthorization operation.                                                                                                              |
| [`UpdateGlobalClusterVariable`](#updateglobalclustervariable)                                             | UpdateGlobalClusterVariable calls the UpdateGlobalClusterVariable operation.                                                                                              |
| [`UpdateGlobalTaskListener`](#updateglobaltasklistener)                                                   | UpdateGlobalTaskListener calls the UpdateGlobalTaskListener operation.                                                                                                    |
| [`UpdateGroup`](#updategroup)                                                                             | UpdateGroup calls the UpdateGroup operation.                                                                                                                              |
| [`UpdateJob`](#updatejob)                                                                                 | UpdateJob calls the UpdateJob operation.                                                                                                                                  |
| [`UpdateJobsBatchOperation`](#updatejobsbatchoperation)                                                   | UpdateJobsBatchOperation calls the UpdateJobsBatchOperation operation.                                                                                                    |
| [`UpdateMappingRule`](#updatemappingrule)                                                                 | UpdateMappingRule calls the UpdateMappingRule operation.                                                                                                                  |
| [`UpdateRole`](#updaterole)                                                                               | UpdateRole calls the UpdateRole operation.                                                                                                                                |
| [`UpdateTenant`](#updatetenant)                                                                           | UpdateTenant calls the UpdateTenant operation.                                                                                                                            |
| [`UpdateTenantClusterVariable`](#updatetenantclustervariable)                                             | UpdateTenantClusterVariable calls the UpdateTenantClusterVariable operation.                                                                                              |
| [`UpdateUser`](#updateuser)                                                                               | UpdateUser calls the UpdateUser operation.                                                                                                                                |
| [`UpdateUserTask`](#updateusertask)                                                                       | UpdateUserTask calls the UpdateUserTask operation.                                                                                                                        |

## Method details

### ActivateAdHocSubProcessActivities

```go
func (c *CamundaClient) ActivateAdHocSubProcessActivities(ctx context.Context, adHocSubProcessInstanceKey openapi.ElementInstanceKey, body openapi.AdHocSubProcessActivateActivitiesInstruction, opts ...func(openapi.ApiActivateAdHocSubProcessActivitiesRequest) openapi.ApiActivateAdHocSubProcessActivitiesRequest) error
```

ActivateAdHocSubProcessActivities calls the ActivateAdHocSubProcessActivities operation.

Example:

```go
instruction := openapi.NewAdHocSubProcessActivateActivitiesInstruction(
	[]openapi.AdHocSubProcessActivateActivityReference{
		*openapi.NewAdHocSubProcessActivateActivityReference("review-task"),
	})

return client.ActivateAdHocSubProcessActivities(ctx,
	openapi.MustElementInstanceKey("2251799813685360"), *instruction)
```

### ActivateJobs

```go
func (c *CamundaClient) ActivateJobs(ctx context.Context, body openapi.JobActivationRequest, opts ...func(openapi.ApiActivateJobsRequest) openapi.ApiActivateJobsRequest) (*openapi.JobActivationResult, error)
```

ActivateJobs calls the ActivateJobs operation.

Example:

```go
// Activate up to 10 "greet" jobs with a 60s activation timeout.
req := openapi.NewJobActivationRequest("greet", 60_000, 10)
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
func (c *CamundaClient) AssignClientToGroup(ctx context.Context, groupId string, clientId string, opts ...func(openapi.ApiAssignClientToGroupRequest) openapi.ApiAssignClientToGroupRequest) error
```

AssignClientToGroup calls the AssignClientToGroup operation.

Example:

```go
return client.AssignClientToGroup(ctx, "finance", "reporting-service")
```

### AssignClientToTenant

```go
func (c *CamundaClient) AssignClientToTenant(ctx context.Context, tenantId string, clientId string, opts ...func(openapi.ApiAssignClientToTenantRequest) openapi.ApiAssignClientToTenantRequest) error
```

AssignClientToTenant calls the AssignClientToTenant operation.

Example:

```go
return client.AssignClientToTenant(ctx, "tenant-a", "reporting-service")
```

### AssignGroupToTenant

```go
func (c *CamundaClient) AssignGroupToTenant(ctx context.Context, tenantId string, groupId string, opts ...func(openapi.ApiAssignGroupToTenantRequest) openapi.ApiAssignGroupToTenantRequest) error
```

AssignGroupToTenant calls the AssignGroupToTenant operation.

Example:

```go
return client.AssignGroupToTenant(ctx, "tenant-a", "finance")
```

### AssignMappingRuleToGroup

```go
func (c *CamundaClient) AssignMappingRuleToGroup(ctx context.Context, groupId string, mappingRuleId string, opts ...func(openapi.ApiAssignMappingRuleToGroupRequest) openapi.ApiAssignMappingRuleToGroupRequest) error
```

AssignMappingRuleToGroup calls the AssignMappingRuleToGroup operation.

Example:

```go
return client.AssignMappingRuleToGroup(ctx, "finance", "sso-auditors")
```

### AssignMappingRuleToTenant

```go
func (c *CamundaClient) AssignMappingRuleToTenant(ctx context.Context, tenantId string, mappingRuleId string, opts ...func(openapi.ApiAssignMappingRuleToTenantRequest) openapi.ApiAssignMappingRuleToTenantRequest) error
```

AssignMappingRuleToTenant calls the AssignMappingRuleToTenant operation.

Example:

```go
return client.AssignMappingRuleToTenant(ctx, "tenant-a", "sso-auditors")
```

### AssignProcessInstanceBusinessId

```go
func (c *CamundaClient) AssignProcessInstanceBusinessId(ctx context.Context, processInstanceKey openapi.ProcessInstanceKey, body openapi.ProcessInstanceBusinessIdAssignmentInstruction, opts ...func(openapi.ApiAssignProcessInstanceBusinessIdRequest) openapi.ApiAssignProcessInstanceBusinessIdRequest) error
```

AssignProcessInstanceBusinessId calls the AssignProcessInstanceBusinessId operation.

Example:

```go
return client.AssignProcessInstanceBusinessId(ctx,
	openapi.MustProcessInstanceKey("2251799813685340"),
	*openapi.NewProcessInstanceBusinessIdAssignmentInstruction("order-42"))
```

### AssignRoleToClient

```go
func (c *CamundaClient) AssignRoleToClient(ctx context.Context, roleId string, clientId string, opts ...func(openapi.ApiAssignRoleToClientRequest) openapi.ApiAssignRoleToClientRequest) error
```

AssignRoleToClient calls the AssignRoleToClient operation.

Example:

```go
return client.AssignRoleToClient(ctx, "auditor", "reporting-service")
```

### AssignRoleToGroup

```go
func (c *CamundaClient) AssignRoleToGroup(ctx context.Context, roleId string, groupId string, opts ...func(openapi.ApiAssignRoleToGroupRequest) openapi.ApiAssignRoleToGroupRequest) error
```

AssignRoleToGroup calls the AssignRoleToGroup operation.

Example:

```go
return client.AssignRoleToGroup(ctx, "auditor", "finance")
```

### AssignRoleToMappingRule

```go
func (c *CamundaClient) AssignRoleToMappingRule(ctx context.Context, roleId string, mappingRuleId string, opts ...func(openapi.ApiAssignRoleToMappingRuleRequest) openapi.ApiAssignRoleToMappingRuleRequest) error
```

AssignRoleToMappingRule calls the AssignRoleToMappingRule operation.

Example:

```go
return client.AssignRoleToMappingRule(ctx, "auditor", "sso-auditors")
```

### AssignRoleToTenant

```go
func (c *CamundaClient) AssignRoleToTenant(ctx context.Context, tenantId string, roleId string, opts ...func(openapi.ApiAssignRoleToTenantRequest) openapi.ApiAssignRoleToTenantRequest) error
```

AssignRoleToTenant calls the AssignRoleToTenant operation.

Example:

```go
return client.AssignRoleToTenant(ctx, "tenant-a", "auditor")
```

### AssignRoleToUser

```go
func (c *CamundaClient) AssignRoleToUser(ctx context.Context, roleId string, username string, opts ...func(openapi.ApiAssignRoleToUserRequest) openapi.ApiAssignRoleToUserRequest) error
```

AssignRoleToUser calls the AssignRoleToUser operation.

Example:

```go
return client.AssignRoleToUser(ctx, "auditor", "alice")
```

### AssignUserTask

```go
func (c *CamundaClient) AssignUserTask(ctx context.Context, userTaskKey openapi.UserTaskKey, body openapi.UserTaskAssignmentRequest, opts ...func(openapi.ApiAssignUserTaskRequest) openapi.ApiAssignUserTaskRequest) error
```

AssignUserTask calls the AssignUserTask operation.

Example:

```go
req := openapi.NewUserTaskAssignmentRequest()
req.SetAssignee("alice")

return client.AssignUserTask(ctx, openapi.MustUserTaskKey("2251799813685380"), *req)
```

### AssignUserToGroup

```go
func (c *CamundaClient) AssignUserToGroup(ctx context.Context, groupId string, username string, opts ...func(openapi.ApiAssignUserToGroupRequest) openapi.ApiAssignUserToGroupRequest) error
```

AssignUserToGroup calls the AssignUserToGroup operation.

Example:

```go
return client.AssignUserToGroup(ctx, "finance", "alice")
```

### AssignUserToTenant

```go
func (c *CamundaClient) AssignUserToTenant(ctx context.Context, tenantId string, username string, opts ...func(openapi.ApiAssignUserToTenantRequest) openapi.ApiAssignUserToTenantRequest) error
```

AssignUserToTenant calls the AssignUserToTenant operation.

Example:

```go
return client.AssignUserToTenant(ctx, "tenant-a", "alice")
```

### BroadcastSignal

```go
func (c *CamundaClient) BroadcastSignal(ctx context.Context, body openapi.SignalBroadcastRequest, opts ...func(openapi.ApiBroadcastSignalRequest) openapi.ApiBroadcastSignalRequest) (*openapi.SignalBroadcastResult, error)
```

BroadcastSignal calls the BroadcastSignal operation.

Example:

```go
req := openapi.NewSignalBroadcastRequest("cancel-all-orders")
req.SetVariables(map[string]any{"reason": "maintenance"})

result, err := client.BroadcastSignal(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CancelBatchOperation

```go
func (c *CamundaClient) CancelBatchOperation(ctx context.Context, batchOperationKey string, opts ...func(openapi.ApiCancelBatchOperationRequest) openapi.ApiCancelBatchOperationRequest) error
```

CancelBatchOperation calls the CancelBatchOperation operation.

Example:

```go
return client.CancelBatchOperation(ctx, "2251799813685290")
```

### CancelProcessInstance

```go
func (c *CamundaClient) CancelProcessInstance(ctx context.Context, processInstanceKey openapi.ProcessInstanceKey, body openapi.CancelProcessInstanceRequest, opts ...func(openapi.ApiCancelProcessInstanceRequest) openapi.ApiCancelProcessInstanceRequest) error
```

CancelProcessInstance calls the CancelProcessInstance operation.

Example:

```go
return client.CancelProcessInstance(ctx,
	openapi.MustProcessInstanceKey("2251799813685340"),
	*openapi.NewCancelProcessInstanceRequest())
```

### CancelProcessInstancesBatchOperation

```go
func (c *CamundaClient) CancelProcessInstancesBatchOperation(ctx context.Context, body openapi.ProcessInstanceCancellationBatchOperationRequest, opts ...func(openapi.ApiCancelProcessInstancesBatchOperationRequest) openapi.ApiCancelProcessInstancesBatchOperationRequest) (*openapi.BatchOperationCreatedResult, error)
```

CancelProcessInstancesBatchOperation calls the CancelProcessInstancesBatchOperation operation.

Example:

```go
// Cancel every instance matching a filter in a single batch operation.
req := openapi.NewProcessInstanceCancellationBatchOperationRequest(*openapi.NewProcessInstanceFilter())

result, err := client.CancelProcessInstancesBatchOperation(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
```

### ChangeClusterMode

```go
func (c *CamundaClient) ChangeClusterMode(ctx context.Context, opts ...func(openapi.ApiChangeClusterModeRequest) openapi.ApiChangeClusterModeRequest) (*openapi.ClusterModeChangeResponse, error)
```

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
func (c *CamundaClient) ChangeClusterModeAsClusterAdmin(ctx context.Context, opts ...func(openapi.ApiChangeClusterModeAsClusterAdminRequest) openapi.ApiChangeClusterModeAsClusterAdminRequest) (*openapi.ClusterModeChangeResponse, error)
```

ChangeClusterModeAsClusterAdmin calls the ChangeClusterModeAsClusterAdmin operation.

Example:

```go
// Changes the cluster mode as a cluster-level admin (cross-tenant authority).
result, err := client.ChangeClusterModeAsClusterAdmin(ctx, func(r openapi.ApiChangeClusterModeAsClusterAdminRequest) openapi.ApiChangeClusterModeAsClusterAdminRequest {
	return r.Mode(openapi.MODE_RECOVERING)
})
if err != nil {
	return err
}
fmt.Printf("change %s: %d planned operation group(s)\n", result.GetChangeId(), len(result.GetPlannedChanges()))
```

### CompleteJob

```go
func (c *CamundaClient) CompleteJob(ctx context.Context, jobKey openapi.JobKey, body openapi.JobCompletionRequest, opts ...func(openapi.ApiCompleteJobRequest) openapi.ApiCompleteJobRequest) error
```

CompleteJob calls the CompleteJob operation.

Example:

```go
req := openapi.NewJobCompletionRequest()
req.SetVariables(map[string]any{"greeting": "Hello!"})

return client.CompleteJob(ctx, openapi.MustJobKey("2251799813685424"), *req)
```

### CompleteUserTask

```go
func (c *CamundaClient) CompleteUserTask(ctx context.Context, userTaskKey openapi.UserTaskKey, body openapi.UserTaskCompletionRequest, opts ...func(openapi.ApiCompleteUserTaskRequest) openapi.ApiCompleteUserTaskRequest) error
```

CompleteUserTask calls the CompleteUserTask operation.

Example:

```go
req := openapi.NewUserTaskCompletionRequest()
req.SetVariables(map[string]any{"approved": true})

return client.CompleteUserTask(ctx, openapi.MustUserTaskKey("2251799813685380"), *req)
```

### Config

```go
func (c *CamundaClient) Config() *Config
```

Config returns the resolved configuration.

### CorrelateMessage

```go
func (c *CamundaClient) CorrelateMessage(ctx context.Context, body openapi.MessageCorrelationRequest, opts ...func(openapi.ApiCorrelateMessageRequest) openapi.ApiCorrelateMessageRequest) (*openapi.MessageCorrelationResult, error)
```

CorrelateMessage calls the CorrelateMessage operation.

Example:

```go
req := openapi.NewMessageCorrelationRequest("order-confirmed")
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
func (c *CamundaClient) CreateAdminUser(ctx context.Context, body openapi.UserRequest, opts ...func(openapi.ApiCreateAdminUserRequest) openapi.ApiCreateAdminUserRequest) (*openapi.UserCreateResult, error)
```

CreateAdminUser calls the CreateAdminUser operation.

Example:

```go
// One-time setup: create the initial administrator on a fresh cluster.
result, err := client.CreateAdminUser(ctx, *openapi.NewUserRequest("ChangeMe123!", "admin"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CreateAgentInstance

```go
func (c *CamundaClient) CreateAgentInstance(ctx context.Context, body openapi.AgentInstanceCreationRequest, opts ...func(openapi.ApiCreateAgentInstanceRequest) openapi.ApiCreateAgentInstanceRequest) (*openapi.AgentInstanceCreationResult, error)
```

CreateAgentInstance calls the CreateAgentInstance operation.

Example:

```go
definition := openapi.NewAgentInstanceDefinition("gpt-4o", "openai", "You are a helpful assistant.")
req := openapi.NewAgentInstanceCreationRequest(openapi.ModelString("2251799813685360"), *definition)

result, err := client.CreateAgentInstance(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CreateAgentInstanceHistoryItem

```go
func (c *CamundaClient) CreateAgentInstanceHistoryItem(ctx context.Context, agentInstanceKey openapi.AgentInstanceKey, body openapi.AgentInstanceHistoryItemRequest, opts ...func(openapi.ApiCreateAgentInstanceHistoryItemRequest) openapi.ApiCreateAgentInstanceHistoryItemRequest) (*openapi.AgentInstanceHistoryItemCreationResult, error)
```

CreateAgentInstanceHistoryItem calls the CreateAgentInstanceHistoryItem operation.

Example:

```go
req := openapi.NewAgentInstanceHistoryItemRequest(
	openapi.ModelString("2251799813685360"), // elementInstanceKey
	openapi.ModelString("2251799813685424"), // jobKey
	"lease-token",
	openapi.AGENTINSTANCEHISTORYROLEENUM_USER,
	nil, // message content
	time.Now(),
)

result, err := client.CreateAgentInstanceHistoryItem(ctx,
	openapi.MustAgentInstanceKey("2251799813685370"), *req)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CreateAuthorization

```go
func (c *CamundaClient) CreateAuthorization(ctx context.Context, body openapi.AuthorizationRequest, opts ...func(openapi.ApiCreateAuthorizationRequest) openapi.ApiCreateAuthorizationRequest) (*openapi.AuthorizationCreateResult, error)
```

CreateAuthorization calls the CreateAuthorization operation.

Example:

```go
// AuthorizationRequest is a union; grant an id-based authorization here.
grant := openapi.NewAuthorizationIdBasedRequest(
	"user@example.com",
	openapi.OWNERTYPEENUM_USER,
	"order-process",
	openapi.RESOURCETYPEENUM_PROCESS_DEFINITION,
	[]openapi.PermissionTypeEnum{
		openapi.PERMISSIONTYPEENUM_READ_PROCESS_DEFINITION,
		openapi.PERMISSIONTYPEENUM_CREATE_PROCESS_INSTANCE,
	},
)

result, err := client.CreateAuthorization(ctx,
	openapi.AuthorizationIdBasedRequestAsAuthorizationRequest(grant))
if err != nil {
	return err
}
fmt.Printf("created authorization %v\n", result.GetAuthorizationKey())
```

### CreateDeployment

```go
func (c *CamundaClient) CreateDeployment(ctx context.Context, opts ...func(openapi.ApiCreateDeploymentRequest) openapi.ApiCreateDeploymentRequest) (*openapi.DeploymentResult, error)
```

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
func (c *CamundaClient) CreateDocument(ctx context.Context, opts ...func(openapi.ApiCreateDocumentRequest) openapi.ApiCreateDocumentRequest) (*openapi.DocumentReference, error)
```

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
func (c *CamundaClient) CreateDocumentLink(ctx context.Context, documentId string, body openapi.DocumentLinkRequest, opts ...func(openapi.ApiCreateDocumentLinkRequest) openapi.ApiCreateDocumentLinkRequest) (*openapi.DocumentLink, error)
```

CreateDocumentLink calls the CreateDocumentLink operation.

Example:

```go
// Create a short-lived, shareable download link for a stored document.
link, err := client.CreateDocumentLink(ctx, "doc-123", *openapi.NewDocumentLinkRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", link)
```

### CreateDocuments

```go
func (c *CamundaClient) CreateDocuments(ctx context.Context, opts ...func(openapi.ApiCreateDocumentsRequest) openapi.ApiCreateDocumentsRequest) (*openapi.DocumentCreationBatchResponse, error)
```

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
func (c *CamundaClient) CreateElementInstanceVariables(ctx context.Context, elementInstanceKey openapi.ElementInstanceKey, body openapi.SetVariableRequest, opts ...func(openapi.ApiCreateElementInstanceVariablesRequest) openapi.ApiCreateElementInstanceVariablesRequest) error
```

CreateElementInstanceVariables calls the CreateElementInstanceVariables operation.

Example:

```go
// Set local variables on a specific element instance scope.
req := openapi.NewSetVariableRequest(map[string]any{"approved": true})

return client.CreateElementInstanceVariables(ctx, openapi.MustElementInstanceKey("2251799813685360"), *req)
```

### CreateGlobalClusterVariable

```go
func (c *CamundaClient) CreateGlobalClusterVariable(ctx context.Context, body openapi.CreateClusterVariableRequest, opts ...func(openapi.ApiCreateGlobalClusterVariableRequest) openapi.ApiCreateGlobalClusterVariableRequest) (*openapi.ClusterVariableResult, error)
```

CreateGlobalClusterVariable calls the CreateGlobalClusterVariable operation.

Example:

```go
result, err := client.CreateGlobalClusterVariable(ctx,
	*openapi.NewCreateClusterVariableRequest("region", map[string]any{"value": "eu-1"}))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CreateGlobalTaskListener

```go
func (c *CamundaClient) CreateGlobalTaskListener(ctx context.Context, body openapi.CreateGlobalTaskListenerRequest, opts ...func(openapi.ApiCreateGlobalTaskListenerRequest) openapi.ApiCreateGlobalTaskListenerRequest) (*openapi.GlobalTaskListenerResult, error)
```

CreateGlobalTaskListener calls the CreateGlobalTaskListener operation.

Example:

```go
result, err := client.CreateGlobalTaskListener(ctx,
	*openapi.NewCreateGlobalTaskListenerRequest("audit-listener"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CreateGroup

```go
func (c *CamundaClient) CreateGroup(ctx context.Context, body openapi.GroupCreateRequest, opts ...func(openapi.ApiCreateGroupRequest) openapi.ApiCreateGroupRequest) (*openapi.GroupCreateResult, error)
```

CreateGroup calls the CreateGroup operation.

Example:

```go
result, err := client.CreateGroup(ctx, *openapi.NewGroupCreateRequest("finance", "Finance"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CreateMappingRule

```go
func (c *CamundaClient) CreateMappingRule(ctx context.Context, body openapi.MappingRuleCreateRequest, opts ...func(openapi.ApiCreateMappingRuleRequest) openapi.ApiCreateMappingRuleRequest) (*openapi.MappingRuleCreateResult, error)
```

CreateMappingRule calls the CreateMappingRule operation.

Example:

```go
// Map the IdP claim `groups=auditors` to a Camunda mapping-rule identity.
result, err := client.CreateMappingRule(ctx,
	*openapi.NewMappingRuleCreateRequest("groups", "auditors", "SSO Auditors", "sso-auditors"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CreateProcessInstance

```go
func (c *CamundaClient) CreateProcessInstance(ctx context.Context, body openapi.ProcessInstanceCreationInstruction, opts ...func(openapi.ApiCreateProcessInstanceRequest) openapi.ApiCreateProcessInstanceRequest) (*openapi.CreateProcessInstanceResult, error)
```

CreateProcessInstance creates (starts) a process instance.

When the gateway advertises the FALCON command stream (a nanobpmn gateway) and
FALCON is enabled, the create is routed over the credit-metered WebSocket
command stream: a flood of creates queues on the client's submission-credit
window instead of being shed with 503s. Against stock Camunda — or if the
stream cannot be established — it falls back transparently to the REST endpoint.

The variadic request-builder options apply only on the REST path.

Example:

```go
instruction := openapi.ProcessInstanceCreationInstructionByIdAsProcessInstanceCreationInstruction(
	openapi.NewProcessInstanceCreationInstructionById("order-process"))
result, err := client.CreateProcessInstance(ctx, instruction)
```

### CreateRole

```go
func (c *CamundaClient) CreateRole(ctx context.Context, body openapi.RoleCreateRequest, opts ...func(openapi.ApiCreateRoleRequest) openapi.ApiCreateRoleRequest) (*openapi.RoleCreateResult, error)
```

CreateRole calls the CreateRole operation.

Example:

```go
result, err := client.CreateRole(ctx, *openapi.NewRoleCreateRequest("auditor", "Auditor"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CreateTenant

```go
func (c *CamundaClient) CreateTenant(ctx context.Context, body openapi.TenantCreateRequest, opts ...func(openapi.ApiCreateTenantRequest) openapi.ApiCreateTenantRequest) (*openapi.TenantCreateResult, error)
```

CreateTenant calls the CreateTenant operation.

Example:

```go
result, err := client.CreateTenant(ctx, *openapi.NewTenantCreateRequest("tenant-a", "Tenant A"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CreateTenantClusterVariable

```go
func (c *CamundaClient) CreateTenantClusterVariable(ctx context.Context, tenantId string, body openapi.CreateClusterVariableRequest, opts ...func(openapi.ApiCreateTenantClusterVariableRequest) openapi.ApiCreateTenantClusterVariableRequest) (*openapi.ClusterVariableResult, error)
```

CreateTenantClusterVariable calls the CreateTenantClusterVariable operation.

Example:

```go
result, err := client.CreateTenantClusterVariable(ctx, "tenant-a",
	*openapi.NewCreateClusterVariableRequest("region", map[string]any{"value": "eu-1"}))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### CreateUser

```go
func (c *CamundaClient) CreateUser(ctx context.Context, body openapi.UserRequest, opts ...func(openapi.ApiCreateUserRequest) openapi.ApiCreateUserRequest) (*openapi.UserCreateResult, error)
```

CreateUser calls the CreateUser operation.

Example:

```go
req := openapi.NewUserRequest("s3cret!", "alice")
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
func (c *CamundaClient) DeleteAuthorization(ctx context.Context, authorizationKey openapi.AuthorizationKey, opts ...func(openapi.ApiDeleteAuthorizationRequest) openapi.ApiDeleteAuthorizationRequest) error
```

DeleteAuthorization calls the DeleteAuthorization operation.

Example:

```go
return client.DeleteAuthorization(ctx, openapi.MustAuthorizationKey("2251799813685280"))
```

### DeleteDecisionInstance

```go
func (c *CamundaClient) DeleteDecisionInstance(ctx context.Context, decisionEvaluationKey openapi.DecisionEvaluationKey, body openapi.DeleteDecisionInstanceRequest, opts ...func(openapi.ApiDeleteDecisionInstanceRequest) openapi.ApiDeleteDecisionInstanceRequest) error
```

DeleteDecisionInstance calls the DeleteDecisionInstance operation.

Example:

```go
return client.DeleteDecisionInstance(ctx,
	openapi.MustDecisionEvaluationKey("2251799813685310"),
	*openapi.NewDeleteDecisionInstanceRequest())
```

### DeleteDecisionInstancesBatchOperation

```go
func (c *CamundaClient) DeleteDecisionInstancesBatchOperation(ctx context.Context, body openapi.DecisionInstanceDeletionBatchOperationRequest, opts ...func(openapi.ApiDeleteDecisionInstancesBatchOperationRequest) openapi.ApiDeleteDecisionInstancesBatchOperationRequest) (*openapi.BatchOperationCreatedResult, error)
```

DeleteDecisionInstancesBatchOperation calls the DeleteDecisionInstancesBatchOperation operation.

Example:

```go
req := openapi.NewDecisionInstanceDeletionBatchOperationRequest(*openapi.NewDecisionInstanceFilter())

result, err := client.DeleteDecisionInstancesBatchOperation(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
```

### DeleteDocument

```go
func (c *CamundaClient) DeleteDocument(ctx context.Context, documentId string, opts ...func(openapi.ApiDeleteDocumentRequest) openapi.ApiDeleteDocumentRequest) error
```

DeleteDocument calls the DeleteDocument operation.

Example:

```go
return client.DeleteDocument(ctx, "doc-123")
```

### DeleteGlobalClusterVariable

```go
func (c *CamundaClient) DeleteGlobalClusterVariable(ctx context.Context, name string, opts ...func(openapi.ApiDeleteGlobalClusterVariableRequest) openapi.ApiDeleteGlobalClusterVariableRequest) error
```

DeleteGlobalClusterVariable calls the DeleteGlobalClusterVariable operation.

Example:

```go
return client.DeleteGlobalClusterVariable(ctx, "region")
```

### DeleteGlobalTaskListener

```go
func (c *CamundaClient) DeleteGlobalTaskListener(ctx context.Context, id string, opts ...func(openapi.ApiDeleteGlobalTaskListenerRequest) openapi.ApiDeleteGlobalTaskListenerRequest) error
```

DeleteGlobalTaskListener calls the DeleteGlobalTaskListener operation.

Example:

```go
return client.DeleteGlobalTaskListener(ctx, "audit-listener")
```

### DeleteGroup

```go
func (c *CamundaClient) DeleteGroup(ctx context.Context, groupId string, opts ...func(openapi.ApiDeleteGroupRequest) openapi.ApiDeleteGroupRequest) error
```

DeleteGroup calls the DeleteGroup operation.

Example:

```go
return client.DeleteGroup(ctx, "finance")
```

### DeleteHistoryBackup

```go
func (c *CamundaClient) DeleteHistoryBackup(ctx context.Context, backupId int64, opts ...func(openapi.ApiDeleteHistoryBackupRequest) openapi.ApiDeleteHistoryBackupRequest) error
```

DeleteHistoryBackup calls the DeleteHistoryBackup operation.

Example:

```go
if err := client.DeleteHistoryBackup(ctx, 42); err != nil {
	return err
}
```

### DeleteMappingRule

```go
func (c *CamundaClient) DeleteMappingRule(ctx context.Context, mappingRuleId string, opts ...func(openapi.ApiDeleteMappingRuleRequest) openapi.ApiDeleteMappingRuleRequest) error
```

DeleteMappingRule calls the DeleteMappingRule operation.

Example:

```go
return client.DeleteMappingRule(ctx, "sso-auditors")
```

### DeleteProcessInstance

```go
func (c *CamundaClient) DeleteProcessInstance(ctx context.Context, processInstanceKey openapi.ProcessInstanceKey, body openapi.DeleteProcessInstanceRequest, opts ...func(openapi.ApiDeleteProcessInstanceRequest) openapi.ApiDeleteProcessInstanceRequest) error
```

DeleteProcessInstance calls the DeleteProcessInstance operation.

Example:

```go
return client.DeleteProcessInstance(ctx,
	openapi.MustProcessInstanceKey("2251799813685340"),
	*openapi.NewDeleteProcessInstanceRequest())
```

### DeleteProcessInstancesBatchOperation

```go
func (c *CamundaClient) DeleteProcessInstancesBatchOperation(ctx context.Context, body openapi.ProcessInstanceDeletionBatchOperationRequest, opts ...func(openapi.ApiDeleteProcessInstancesBatchOperationRequest) openapi.ApiDeleteProcessInstancesBatchOperationRequest) (*openapi.BatchOperationCreatedResult, error)
```

DeleteProcessInstancesBatchOperation calls the DeleteProcessInstancesBatchOperation operation.

Example:

```go
req := openapi.NewProcessInstanceDeletionBatchOperationRequest(*openapi.NewProcessInstanceFilter())

result, err := client.DeleteProcessInstancesBatchOperation(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
```

### DeleteResource

```go
func (c *CamundaClient) DeleteResource(ctx context.Context, resourceKey openapi.ResourceKey, body openapi.DeleteResourceRequest, opts ...func(openapi.ApiDeleteResourceRequest) openapi.ApiDeleteResourceRequest) (*openapi.DeleteResourceResponse, error)
```

DeleteResource calls the DeleteResource operation.

Example:

```go
result, err := client.DeleteResource(ctx,
	openapi.MustResourceKey("2251799813685350"),
	*openapi.NewDeleteResourceRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### DeleteRole

```go
func (c *CamundaClient) DeleteRole(ctx context.Context, roleId string, opts ...func(openapi.ApiDeleteRoleRequest) openapi.ApiDeleteRoleRequest) error
```

DeleteRole calls the DeleteRole operation.

Example:

```go
return client.DeleteRole(ctx, "auditor")
```

### DeleteRuntimeBackup

```go
func (c *CamundaClient) DeleteRuntimeBackup(ctx context.Context, backupId int64, opts ...func(openapi.ApiDeleteRuntimeBackupRequest) openapi.ApiDeleteRuntimeBackupRequest) error
```

DeleteRuntimeBackup calls the DeleteRuntimeBackup operation.

Example:

```go
if err := client.DeleteRuntimeBackup(ctx, 42); err != nil {
	return err
}
```

### DeleteRuntimeBackupState

```go
func (c *CamundaClient) DeleteRuntimeBackupState(ctx context.Context, opts ...func(openapi.ApiDeleteRuntimeBackupStateRequest) openapi.ApiDeleteRuntimeBackupStateRequest) error
```

DeleteRuntimeBackupState calls the DeleteRuntimeBackupState operation.

Example:

```go
if err := client.DeleteRuntimeBackupState(ctx); err != nil {
	return err
}
```

### DeleteTenant

```go
func (c *CamundaClient) DeleteTenant(ctx context.Context, tenantId string, opts ...func(openapi.ApiDeleteTenantRequest) openapi.ApiDeleteTenantRequest) error
```

DeleteTenant calls the DeleteTenant operation.

Example:

```go
return client.DeleteTenant(ctx, "tenant-a")
```

### DeleteTenantClusterVariable

```go
func (c *CamundaClient) DeleteTenantClusterVariable(ctx context.Context, tenantId string, name string, opts ...func(openapi.ApiDeleteTenantClusterVariableRequest) openapi.ApiDeleteTenantClusterVariableRequest) error
```

DeleteTenantClusterVariable calls the DeleteTenantClusterVariable operation.

Example:

```go
return client.DeleteTenantClusterVariable(ctx, "tenant-a", "region")
```

### DeleteUser

```go
func (c *CamundaClient) DeleteUser(ctx context.Context, username string, opts ...func(openapi.ApiDeleteUserRequest) openapi.ApiDeleteUserRequest) error
```

DeleteUser calls the DeleteUser operation.

Example:

```go
return client.DeleteUser(ctx, "alice")
```

### EvaluateConditionals

```go
func (c *CamundaClient) EvaluateConditionals(ctx context.Context, body openapi.ConditionalEvaluationInstruction, opts ...func(openapi.ApiEvaluateConditionalsRequest) openapi.ApiEvaluateConditionalsRequest) (*openapi.EvaluateConditionalResult, error)
```

EvaluateConditionals calls the EvaluateConditionals operation.

Example:

```go
// Evaluate which conditional start events match the given variables.
req := openapi.NewConditionalEvaluationInstruction(map[string]any{"temperature": 42})

result, err := client.EvaluateConditionals(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### EvaluateDecision

```go
func (c *CamundaClient) EvaluateDecision(ctx context.Context, body openapi.DecisionEvaluationInstruction, opts ...func(openapi.ApiEvaluateDecisionRequest) openapi.ApiEvaluateDecisionRequest) (*openapi.EvaluateDecisionResult, error)
```

EvaluateDecision calls the EvaluateDecision operation.

Example:

```go
// DecisionEvaluationInstruction is a union; evaluate by decision id here.
byID := openapi.NewDecisionEvaluationById("dish-decision")
byID.SetVariables(map[string]any{"season": "Winter", "guestCount": 4})

result, err := client.EvaluateDecision(ctx,
	openapi.DecisionEvaluationByIdAsDecisionEvaluationInstruction(byID))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### EvaluateExpression

```go
func (c *CamundaClient) EvaluateExpression(ctx context.Context, body openapi.ExpressionEvaluationRequest, opts ...func(openapi.ApiEvaluateExpressionRequest) openapi.ApiEvaluateExpressionRequest) (*openapi.ExpressionEvaluationResult, error)
```

EvaluateExpression calls the EvaluateExpression operation.

Example:

```go
// Evaluate a FEEL expression against a set of variables.
req := openapi.NewExpressionEvaluationRequest("a + b")
req.SetVariables(map[string]any{"a": 2, "b": 3})

result, err := client.EvaluateExpression(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("result: %v\n", result.GetResult())
```

### FailJob

```go
func (c *CamundaClient) FailJob(ctx context.Context, jobKey openapi.JobKey, body openapi.JobFailRequest, opts ...func(openapi.ApiFailJobRequest) openapi.ApiFailJobRequest) error
```

FailJob calls the FailJob operation.

Example:

```go
req := openapi.NewJobFailRequest()
req.SetRetries(2)
req.SetErrorMessage("inventory service unavailable")

return client.FailJob(ctx, openapi.MustJobKey("2251799813685424"), *req)
```

### GetAgentDefinition

```go
func (c *CamundaClient) GetAgentDefinition(ctx context.Context, agentDefinitionKey openapi.AgentDefinitionKey, opts ...func(openapi.ApiGetAgentDefinitionRequest) openapi.ApiGetAgentDefinitionRequest) (*openapi.AgentDefinitionResult, error)
```

GetAgentDefinition calls the GetAgentDefinition operation.

Example:

```go
definition, err := client.GetAgentDefinition(ctx, openapi.MustAgentDefinitionKey("2251799813691958"))
if err != nil {
	return err
}
fmt.Printf("%v\n", definition)
```

### GetAgentInstance

```go
func (c *CamundaClient) GetAgentInstance(ctx context.Context, agentInstanceKey openapi.AgentInstanceKey, opts ...func(openapi.ApiGetAgentInstanceRequest) openapi.ApiGetAgentInstanceRequest) (*openapi.AgentInstanceResult, error)
```

GetAgentInstance calls the GetAgentInstance operation.

Example:

```go
agent, err := client.GetAgentInstance(ctx, openapi.MustAgentInstanceKey("2251799813685370"))
if err != nil {
	return err
}
fmt.Printf("%v\n", agent)
```

### GetAuditLog

```go
func (c *CamundaClient) GetAuditLog(ctx context.Context, auditLogKey openapi.AuditLogKey, opts ...func(openapi.ApiGetAuditLogRequest) openapi.ApiGetAuditLogRequest) (*openapi.AuditLogResult, error)
```

GetAuditLog calls the GetAuditLog operation.

Example:

```go
entry, err := client.GetAuditLog(ctx, openapi.MustAuditLogKey("2251799813685270"))
if err != nil {
	return err
}
fmt.Printf("%v\n", entry)
```

### GetAuthentication

```go
func (c *CamundaClient) GetAuthentication(ctx context.Context, opts ...func(openapi.ApiGetAuthenticationRequest) openapi.ApiGetAuthenticationRequest) (*openapi.CamundaUserResult, error)
```

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
func (c *CamundaClient) GetAuthorization(ctx context.Context, authorizationKey openapi.AuthorizationKey, opts ...func(openapi.ApiGetAuthorizationRequest) openapi.ApiGetAuthorizationRequest) (*openapi.AuthorizationResult, error)
```

GetAuthorization calls the GetAuthorization operation.

Example:

```go
auth, err := client.GetAuthorization(ctx, openapi.MustAuthorizationKey("2251799813685280"))
if err != nil {
	return err
}
fmt.Printf("%v\n", auth)
```

### GetBatchOperation

```go
func (c *CamundaClient) GetBatchOperation(ctx context.Context, batchOperationKey string, opts ...func(openapi.ApiGetBatchOperationRequest) openapi.ApiGetBatchOperationRequest) (*openapi.BatchOperationResponse, error)
```

GetBatchOperation calls the GetBatchOperation operation.

Example:

```go
op, err := client.GetBatchOperation(ctx, "2251799813685290")
if err != nil {
	return err
}
fmt.Printf("%v\n", op)
```

### GetClusterStatus

```go
func (c *CamundaClient) GetClusterStatus(ctx context.Context, opts ...func(openapi.ApiGetClusterStatusRequest) openapi.ApiGetClusterStatusRequest) (*openapi.ClusterStatusResponse, error)
```

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
func (c *CamundaClient) GetClusterTopology(ctx context.Context, opts ...func(openapi.ApiGetClusterTopologyRequest) openapi.ApiGetClusterTopologyRequest) (*openapi.ClusterTopologyResponse, error)
```

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

### GetDecisionDefinition

```go
func (c *CamundaClient) GetDecisionDefinition(ctx context.Context, decisionDefinitionKey openapi.DecisionDefinitionKey, opts ...func(openapi.ApiGetDecisionDefinitionRequest) openapi.ApiGetDecisionDefinitionRequest) (*openapi.DecisionDefinitionResult, error)
```

GetDecisionDefinition calls the GetDecisionDefinition operation.

Example:

```go
def, err := client.GetDecisionDefinition(ctx, openapi.MustDecisionDefinitionKey("2251799813685310"))
if err != nil {
	return err
}
fmt.Printf("%v\n", def)
```

### GetDecisionDefinitionXML

```go
func (c *CamundaClient) GetDecisionDefinitionXML(ctx context.Context, decisionDefinitionKey openapi.DecisionDefinitionKey, opts ...func(openapi.ApiGetDecisionDefinitionXMLRequest) openapi.ApiGetDecisionDefinitionXMLRequest) (string, error)
```

GetDecisionDefinitionXML calls the GetDecisionDefinitionXML operation.

Example:

```go
xml, err := client.GetDecisionDefinitionXML(ctx, openapi.MustDecisionDefinitionKey("2251799813685310"))
if err != nil {
	return err
}
fmt.Println(xml)
```

### GetDecisionInstance

```go
func (c *CamundaClient) GetDecisionInstance(ctx context.Context, decisionEvaluationInstanceKey string, opts ...func(openapi.ApiGetDecisionInstanceRequest) openapi.ApiGetDecisionInstanceRequest) (*openapi.DecisionInstanceGetQueryResult, error)
```

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
func (c *CamundaClient) GetDecisionRequirements(ctx context.Context, decisionRequirementsKey openapi.DecisionRequirementsKey, opts ...func(openapi.ApiGetDecisionRequirementsRequest) openapi.ApiGetDecisionRequirementsRequest) (*openapi.DecisionRequirementsResult, error)
```

GetDecisionRequirements calls the GetDecisionRequirements operation.

Example:

```go
drd, err := client.GetDecisionRequirements(ctx, openapi.MustDecisionRequirementsKey("2251799813685320"))
if err != nil {
	return err
}
fmt.Printf("%v\n", drd)
```

### GetDecisionRequirementsXML

```go
func (c *CamundaClient) GetDecisionRequirementsXML(ctx context.Context, decisionRequirementsKey openapi.DecisionRequirementsKey, opts ...func(openapi.ApiGetDecisionRequirementsXMLRequest) openapi.ApiGetDecisionRequirementsXMLRequest) (string, error)
```

GetDecisionRequirementsXML calls the GetDecisionRequirementsXML operation.

Example:

```go
xml, err := client.GetDecisionRequirementsXML(ctx, openapi.MustDecisionRequirementsKey("2251799813685320"))
if err != nil {
	return err
}
fmt.Println(xml)
```

### GetDocument

```go
func (c *CamundaClient) GetDocument(ctx context.Context, documentId string, opts ...func(openapi.ApiGetDocumentRequest) openapi.ApiGetDocumentRequest) (*os.File, error)
```

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
func (c *CamundaClient) GetElementInstance(ctx context.Context, elementInstanceKey openapi.ElementInstanceKey, opts ...func(openapi.ApiGetElementInstanceRequest) openapi.ApiGetElementInstanceRequest) (*openapi.ElementInstanceResult, error)
```

GetElementInstance calls the GetElementInstance operation.

Example:

```go
element, err := client.GetElementInstance(ctx, openapi.MustElementInstanceKey("2251799813685360"))
if err != nil {
	return err
}
fmt.Printf("%v\n", element)
```

### GetExportingStatus

```go
func (c *CamundaClient) GetExportingStatus(ctx context.Context, opts ...func(openapi.ApiGetExportingStatusRequest) openapi.ApiGetExportingStatusRequest) (*openapi.ExportingStatusResponse, error)
```

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
func (c *CamundaClient) GetFormByKey(ctx context.Context, formKey openapi.FormKey, opts ...func(openapi.ApiGetFormByKeyRequest) openapi.ApiGetFormByKeyRequest) (*openapi.FormResult, error)
```

GetFormByKey calls the GetFormByKey operation.

Example:

```go
form, err := client.GetFormByKey(ctx, openapi.MustFormKey("2251799813685260"))
if err != nil {
	return err
}
fmt.Printf("form %v version %d\n", form.GetFormId(), form.GetVersion())
```

### GetGlobalClusterVariable

```go
func (c *CamundaClient) GetGlobalClusterVariable(ctx context.Context, name string, opts ...func(openapi.ApiGetGlobalClusterVariableRequest) openapi.ApiGetGlobalClusterVariableRequest) (*openapi.ClusterVariableResult, error)
```

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
func (c *CamundaClient) GetGlobalJobStatistics(ctx context.Context, opts ...func(openapi.ApiGetGlobalJobStatisticsRequest) openapi.ApiGetGlobalJobStatisticsRequest) (*openapi.GlobalJobStatisticsQueryResult, error)
```

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
func (c *CamundaClient) GetGlobalTaskListener(ctx context.Context, id string, opts ...func(openapi.ApiGetGlobalTaskListenerRequest) openapi.ApiGetGlobalTaskListenerRequest) (*openapi.GlobalTaskListenerResult, error)
```

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
func (c *CamundaClient) GetGroup(ctx context.Context, groupId string, opts ...func(openapi.ApiGetGroupRequest) openapi.ApiGetGroupRequest) (*openapi.GroupResult, error)
```

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
func (c *CamundaClient) GetHistoryBackup(ctx context.Context, backupId int64, opts ...func(openapi.ApiGetHistoryBackupRequest) openapi.ApiGetHistoryBackupRequest) (*openapi.HistoryBackupInfo, error)
```

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

### GetIncident

```go
func (c *CamundaClient) GetIncident(ctx context.Context, incidentKey openapi.IncidentKey, opts ...func(openapi.ApiGetIncidentRequest) openapi.ApiGetIncidentRequest) (*openapi.IncidentResult, error)
```

GetIncident calls the GetIncident operation.

Example:

```go
incident, err := client.GetIncident(ctx, openapi.MustIncidentKey("2251799813685300"))
if err != nil {
	return err
}
fmt.Printf("%v\n", incident)
```

### GetJobErrorStatistics

```go
func (c *CamundaClient) GetJobErrorStatistics(ctx context.Context, body openapi.JobErrorStatisticsQuery, opts ...func(openapi.ApiGetJobErrorStatisticsRequest) openapi.ApiGetJobErrorStatisticsRequest) (*openapi.JobErrorStatisticsQueryResult, error)
```

GetJobErrorStatistics calls the GetJobErrorStatistics operation.

Example:

```go
from, to := time.Now().Add(-24*time.Hour), time.Now()
query := openapi.NewJobErrorStatisticsQuery(*openapi.NewJobErrorStatisticsFilter(from, to, "greet"))

result, err := client.GetJobErrorStatistics(ctx, *query)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetJobTimeSeriesStatistics

```go
func (c *CamundaClient) GetJobTimeSeriesStatistics(ctx context.Context, body openapi.JobTimeSeriesStatisticsQuery, opts ...func(openapi.ApiGetJobTimeSeriesStatisticsRequest) openapi.ApiGetJobTimeSeriesStatisticsRequest) (*openapi.JobTimeSeriesStatisticsQueryResult, error)
```

GetJobTimeSeriesStatistics calls the GetJobTimeSeriesStatistics operation.

Example:

```go
from, to := time.Now().Add(-24*time.Hour), time.Now()
query := openapi.NewJobTimeSeriesStatisticsQuery(*openapi.NewJobTimeSeriesStatisticsFilter(from, to, "greet"))

result, err := client.GetJobTimeSeriesStatistics(ctx, *query)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetJobTypeStatistics

```go
func (c *CamundaClient) GetJobTypeStatistics(ctx context.Context, body openapi.JobTypeStatisticsQuery, opts ...func(openapi.ApiGetJobTypeStatisticsRequest) openapi.ApiGetJobTypeStatisticsRequest) (*openapi.JobTypeStatisticsQueryResult, error)
```

GetJobTypeStatistics calls the GetJobTypeStatistics operation.

Example:

```go
result, err := client.GetJobTypeStatistics(ctx, *openapi.NewJobTypeStatisticsQuery())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetJobWorkerStatistics

```go
func (c *CamundaClient) GetJobWorkerStatistics(ctx context.Context, body openapi.JobWorkerStatisticsQuery, opts ...func(openapi.ApiGetJobWorkerStatisticsRequest) openapi.ApiGetJobWorkerStatisticsRequest) (*openapi.JobWorkerStatisticsQueryResult, error)
```

GetJobWorkerStatistics calls the GetJobWorkerStatistics operation.

Example:

```go
from, to := time.Now().Add(-24*time.Hour), time.Now()
query := openapi.NewJobWorkerStatisticsQuery(*openapi.NewJobWorkerStatisticsFilter(from, to, "greet"))

result, err := client.GetJobWorkerStatistics(ctx, *query)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetLicense

```go
func (c *CamundaClient) GetLicense(ctx context.Context, opts ...func(openapi.ApiGetLicenseRequest) openapi.ApiGetLicenseRequest) (*openapi.LicenseResponse, error)
```

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
func (c *CamundaClient) GetMappingRule(ctx context.Context, mappingRuleId string, opts ...func(openapi.ApiGetMappingRuleRequest) openapi.ApiGetMappingRuleRequest) (*openapi.MappingRuleResult, error)
```

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
func (c *CamundaClient) GetProcessDefinition(ctx context.Context, processDefinitionKey openapi.ProcessDefinitionKey, opts ...func(openapi.ApiGetProcessDefinitionRequest) openapi.ApiGetProcessDefinitionRequest) (*openapi.ProcessDefinitionResult, error)
```

GetProcessDefinition calls the GetProcessDefinition operation.

Example:

```go
def, err := client.GetProcessDefinition(ctx, openapi.MustProcessDefinitionKey("2251799813685330"))
if err != nil {
	return err
}
fmt.Printf("%v\n", def)
```

### GetProcessDefinitionInstanceStatistics

```go
func (c *CamundaClient) GetProcessDefinitionInstanceStatistics(ctx context.Context, body openapi.ProcessDefinitionInstanceStatisticsQuery, opts ...func(openapi.ApiGetProcessDefinitionInstanceStatisticsRequest) openapi.ApiGetProcessDefinitionInstanceStatisticsRequest) (*openapi.ProcessDefinitionInstanceStatisticsQueryResult, error)
```

GetProcessDefinitionInstanceStatistics calls the GetProcessDefinitionInstanceStatistics operation.

Example:

```go
result, err := client.GetProcessDefinitionInstanceStatistics(ctx,
	*openapi.NewProcessDefinitionInstanceStatisticsQuery())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetProcessDefinitionInstanceVersionStatistics

```go
func (c *CamundaClient) GetProcessDefinitionInstanceVersionStatistics(ctx context.Context, body openapi.ProcessDefinitionInstanceVersionStatisticsQuery, opts ...func(openapi.ApiGetProcessDefinitionInstanceVersionStatisticsRequest) openapi.ApiGetProcessDefinitionInstanceVersionStatisticsRequest) (*openapi.ProcessDefinitionInstanceVersionStatisticsQueryResult, error)
```

GetProcessDefinitionInstanceVersionStatistics calls the GetProcessDefinitionInstanceVersionStatistics operation.

Example:

```go
query := openapi.NewProcessDefinitionInstanceVersionStatisticsQuery(
	*openapi.NewProcessDefinitionInstanceVersionStatisticsFilter("order-process"))

result, err := client.GetProcessDefinitionInstanceVersionStatistics(ctx, *query)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetProcessDefinitionMessageSubscriptionStatistics

```go
func (c *CamundaClient) GetProcessDefinitionMessageSubscriptionStatistics(ctx context.Context, body openapi.ProcessDefinitionMessageSubscriptionStatisticsQuery, opts ...func(openapi.ApiGetProcessDefinitionMessageSubscriptionStatisticsRequest) openapi.ApiGetProcessDefinitionMessageSubscriptionStatisticsRequest) (*openapi.ProcessDefinitionMessageSubscriptionStatisticsQueryResult, error)
```

GetProcessDefinitionMessageSubscriptionStatistics calls the GetProcessDefinitionMessageSubscriptionStatistics operation.

Example:

```go
result, err := client.GetProcessDefinitionMessageSubscriptionStatistics(ctx,
	*openapi.NewProcessDefinitionMessageSubscriptionStatisticsQuery())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetProcessDefinitionStatistics

```go
func (c *CamundaClient) GetProcessDefinitionStatistics(ctx context.Context, processDefinitionKey openapi.ProcessDefinitionKey, body openapi.ProcessDefinitionElementStatisticsQuery, opts ...func(openapi.ApiGetProcessDefinitionStatisticsRequest) openapi.ApiGetProcessDefinitionStatisticsRequest) (*openapi.ProcessDefinitionElementStatisticsQueryResult, error)
```

GetProcessDefinitionStatistics calls the GetProcessDefinitionStatistics operation.

Example:

```go
result, err := client.GetProcessDefinitionStatistics(ctx,
	openapi.MustProcessDefinitionKey("2251799813685330"),
	*openapi.NewProcessDefinitionElementStatisticsQuery())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetProcessDefinitionXML

```go
func (c *CamundaClient) GetProcessDefinitionXML(ctx context.Context, processDefinitionKey openapi.ProcessDefinitionKey, opts ...func(openapi.ApiGetProcessDefinitionXMLRequest) openapi.ApiGetProcessDefinitionXMLRequest) (string, error)
```

GetProcessDefinitionXML calls the GetProcessDefinitionXML operation.

Example:

```go
xml, err := client.GetProcessDefinitionXML(ctx, openapi.MustProcessDefinitionKey("2251799813685330"))
if err != nil {
	return err
}
fmt.Println(xml)
```

### GetProcessInstance

```go
func (c *CamundaClient) GetProcessInstance(ctx context.Context, processInstanceKey openapi.ProcessInstanceKey, opts ...func(openapi.ApiGetProcessInstanceRequest) openapi.ApiGetProcessInstanceRequest) (*openapi.ProcessInstanceResult, error)
```

GetProcessInstance calls the GetProcessInstance operation.

Example:

```go
instance, err := client.GetProcessInstance(ctx, openapi.MustProcessInstanceKey("2251799813685340"))
if err != nil {
	return err
}
fmt.Printf("state=%v definition=%q\n", instance.GetState(), instance.GetProcessDefinitionId())
```

### GetProcessInstanceCallHierarchy

```go
func (c *CamundaClient) GetProcessInstanceCallHierarchy(ctx context.Context, processInstanceKey openapi.ProcessInstanceKey, opts ...func(openapi.ApiGetProcessInstanceCallHierarchyRequest) openapi.ApiGetProcessInstanceCallHierarchyRequest) ([]openapi.ProcessInstanceCallHierarchyEntry, error)
```

GetProcessInstanceCallHierarchy calls the GetProcessInstanceCallHierarchy operation.

Example:

```go
hierarchy, err := client.GetProcessInstanceCallHierarchy(ctx, openapi.MustProcessInstanceKey("2251799813685340"))
if err != nil {
	return err
}
for _, entry := range hierarchy {
	fmt.Printf("%v\n", entry)
}
```

### GetProcessInstanceSequenceFlows

```go
func (c *CamundaClient) GetProcessInstanceSequenceFlows(ctx context.Context, processInstanceKey openapi.ProcessInstanceKey, opts ...func(openapi.ApiGetProcessInstanceSequenceFlowsRequest) openapi.ApiGetProcessInstanceSequenceFlowsRequest) (*openapi.ProcessInstanceSequenceFlowsQueryResult, error)
```

GetProcessInstanceSequenceFlows calls the GetProcessInstanceSequenceFlows operation.

Example:

```go
result, err := client.GetProcessInstanceSequenceFlows(ctx, openapi.MustProcessInstanceKey("2251799813685340"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetProcessInstanceStatistics

```go
func (c *CamundaClient) GetProcessInstanceStatistics(ctx context.Context, processInstanceKey openapi.ProcessInstanceKey, opts ...func(openapi.ApiGetProcessInstanceStatisticsRequest) openapi.ApiGetProcessInstanceStatisticsRequest) (*openapi.ProcessInstanceElementStatisticsQueryResult, error)
```

GetProcessInstanceStatistics calls the GetProcessInstanceStatistics operation.

Example:

```go
result, err := client.GetProcessInstanceStatistics(ctx, openapi.MustProcessInstanceKey("2251799813685340"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetProcessInstanceStatisticsByDefinition

```go
func (c *CamundaClient) GetProcessInstanceStatisticsByDefinition(ctx context.Context, body openapi.IncidentProcessInstanceStatisticsByDefinitionQuery, opts ...func(openapi.ApiGetProcessInstanceStatisticsByDefinitionRequest) openapi.ApiGetProcessInstanceStatisticsByDefinitionRequest) (*openapi.IncidentProcessInstanceStatisticsByDefinitionQueryResult, error)
```

GetProcessInstanceStatisticsByDefinition calls the GetProcessInstanceStatisticsByDefinition operation.

Example:

```go
query := openapi.NewIncidentProcessInstanceStatisticsByDefinitionQuery(
	*openapi.NewIncidentProcessInstanceStatisticsByDefinitionFilter(0))

result, err := client.GetProcessInstanceStatisticsByDefinition(ctx, *query)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetProcessInstanceStatisticsByError

```go
func (c *CamundaClient) GetProcessInstanceStatisticsByError(ctx context.Context, body openapi.IncidentProcessInstanceStatisticsByErrorQuery, opts ...func(openapi.ApiGetProcessInstanceStatisticsByErrorRequest) openapi.ApiGetProcessInstanceStatisticsByErrorRequest) (*openapi.IncidentProcessInstanceStatisticsByErrorQueryResult, error)
```

GetProcessInstanceStatisticsByError calls the GetProcessInstanceStatisticsByError operation.

Example:

```go
result, err := client.GetProcessInstanceStatisticsByError(ctx,
	*openapi.NewIncidentProcessInstanceStatisticsByErrorQuery())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetProcessInstanceWaitStateStatistics

```go
func (c *CamundaClient) GetProcessInstanceWaitStateStatistics(ctx context.Context, processInstanceKey openapi.ProcessInstanceKey, opts ...func(openapi.ApiGetProcessInstanceWaitStateStatisticsRequest) openapi.ApiGetProcessInstanceWaitStateStatisticsRequest) (*openapi.ProcessInstanceWaitStateStatisticsQueryResult, error)
```

GetProcessInstanceWaitStateStatistics calls the GetProcessInstanceWaitStateStatistics operation.

Example:

```go
result, err := client.GetProcessInstanceWaitStateStatistics(ctx, openapi.MustProcessInstanceKey("2251799813685340"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### GetResource

```go
func (c *CamundaClient) GetResource(ctx context.Context, resourceKey openapi.ResourceKey, opts ...func(openapi.ApiGetResourceRequest) openapi.ApiGetResourceRequest) (*openapi.ResourceResult, error)
```

GetResource calls the GetResource operation.

Example:

```go
resource, err := client.GetResource(ctx, openapi.MustResourceKey("2251799813685350"))
if err != nil {
	return err
}
fmt.Printf("%v\n", resource)
```

### GetResourceContent

```go
func (c *CamundaClient) GetResourceContent(ctx context.Context, resourceKey openapi.ResourceKey, opts ...func(openapi.ApiGetResourceContentRequest) openapi.ApiGetResourceContentRequest) (map[string]interface{}, error)
```

GetResourceContent calls the GetResourceContent operation.

Example:

```go
content, err := client.GetResourceContent(ctx, openapi.MustResourceKey("2251799813685350"))
if err != nil {
	return err
}
fmt.Printf("%v\n", content)
```

### GetResourceContentBinary

```go
func (c *CamundaClient) GetResourceContentBinary(ctx context.Context, resourceKey openapi.ResourceKey, opts ...func(openapi.ApiGetResourceContentBinaryRequest) openapi.ApiGetResourceContentBinaryRequest) (*os.File, error)
```

GetResourceContentBinary calls the GetResourceContentBinary operation.

Example:

```go
file, err := client.GetResourceContentBinary(ctx, openapi.MustResourceKey("2251799813685350"))
if err != nil {
	return err
}
fmt.Printf("downloaded to %s\n", file.Name())
```

### GetRestoreStatus

```go
func (c *CamundaClient) GetRestoreStatus(ctx context.Context, opts ...func(openapi.ApiGetRestoreStatusRequest) openapi.ApiGetRestoreStatusRequest) (*openapi.RestoreStatusResponse, error)
```

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
func (c *CamundaClient) GetRole(ctx context.Context, roleId string, opts ...func(openapi.ApiGetRoleRequest) openapi.ApiGetRoleRequest) (*openapi.RoleResult, error)
```

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
func (c *CamundaClient) GetRuntimeBackup(ctx context.Context, backupId int64, opts ...func(openapi.ApiGetRuntimeBackupRequest) openapi.ApiGetRuntimeBackupRequest) (*openapi.BackupInfo, error)
```

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

### GetRuntimeBackupState

```go
func (c *CamundaClient) GetRuntimeBackupState(ctx context.Context, opts ...func(openapi.ApiGetRuntimeBackupStateRequest) openapi.ApiGetRuntimeBackupStateRequest) (*openapi.RuntimeBackupState, error)
```

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

### GetStartProcessForm

```go
func (c *CamundaClient) GetStartProcessForm(ctx context.Context, processDefinitionKey openapi.ProcessDefinitionKey, opts ...func(openapi.ApiGetStartProcessFormRequest) openapi.ApiGetStartProcessFormRequest) (*openapi.FormResult, error)
```

GetStartProcessForm calls the GetStartProcessForm operation.

Example:

```go
form, err := client.GetStartProcessForm(ctx, openapi.MustProcessDefinitionKey("2251799813685330"))
if err != nil {
	return err
}
fmt.Printf("%v\n", form)
```

### GetStatus

```go
func (c *CamundaClient) GetStatus(ctx context.Context, opts ...func(openapi.ApiGetStatusRequest) openapi.ApiGetStatusRequest) error
```

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
func (c *CamundaClient) GetSystemConfiguration(ctx context.Context, opts ...func(openapi.ApiGetSystemConfigurationRequest) openapi.ApiGetSystemConfigurationRequest) (*openapi.SystemConfigurationResponse, error)
```

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
func (c *CamundaClient) GetTenant(ctx context.Context, tenantId string, opts ...func(openapi.ApiGetTenantRequest) openapi.ApiGetTenantRequest) (*openapi.TenantResult, error)
```

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
func (c *CamundaClient) GetTenantClusterVariable(ctx context.Context, tenantId string, name string, opts ...func(openapi.ApiGetTenantClusterVariableRequest) openapi.ApiGetTenantClusterVariableRequest) (*openapi.ClusterVariableResult, error)
```

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
func (c *CamundaClient) GetTopology(ctx context.Context, opts ...func(openapi.ApiGetTopologyRequest) openapi.ApiGetTopologyRequest) (*openapi.TopologyResponse, error)
```

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
func (c *CamundaClient) GetUsageMetrics(ctx context.Context, opts ...func(openapi.ApiGetUsageMetricsRequest) openapi.ApiGetUsageMetricsRequest) (*openapi.UsageMetricsResponse, error)
```

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
func (c *CamundaClient) GetUser(ctx context.Context, username string, opts ...func(openapi.ApiGetUserRequest) openapi.ApiGetUserRequest) (*openapi.UserResult, error)
```

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
func (c *CamundaClient) GetUserTask(ctx context.Context, userTaskKey openapi.UserTaskKey, opts ...func(openapi.ApiGetUserTaskRequest) openapi.ApiGetUserTaskRequest) (*openapi.UserTaskResult, error)
```

GetUserTask calls the GetUserTask operation.

Example:

```go
task, err := client.GetUserTask(ctx, openapi.MustUserTaskKey("2251799813685380"))
if err != nil {
	return err
}
fmt.Printf("%v\n", task)
```

### GetUserTaskForm

```go
func (c *CamundaClient) GetUserTaskForm(ctx context.Context, userTaskKey openapi.UserTaskKey, opts ...func(openapi.ApiGetUserTaskFormRequest) openapi.ApiGetUserTaskFormRequest) (*openapi.FormResult, error)
```

GetUserTaskForm calls the GetUserTaskForm operation.

Example:

```go
form, err := client.GetUserTaskForm(ctx, openapi.MustUserTaskKey("2251799813685380"))
if err != nil {
	return err
}
fmt.Printf("%v\n", form)
```

### GetVariable

```go
func (c *CamundaClient) GetVariable(ctx context.Context, variableKey openapi.VariableKey, opts ...func(openapi.ApiGetVariableRequest) openapi.ApiGetVariableRequest) (*openapi.VariableResult, error)
```

GetVariable calls the GetVariable operation.

Example:

```go
variable, err := client.GetVariable(ctx, openapi.MustVariableKey("2251799813685390"))
if err != nil {
	return err
}
fmt.Printf("%v\n", variable)
```

### ListHistoryBackups

```go
func (c *CamundaClient) ListHistoryBackups(ctx context.Context, opts ...func(openapi.ApiListHistoryBackupsRequest) openapi.ApiListHistoryBackupsRequest) ([]openapi.HistoryBackupInfo, error)
```

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

### ListRuntimeBackups

```go
func (c *CamundaClient) ListRuntimeBackups(ctx context.Context, opts ...func(openapi.ApiListRuntimeBackupsRequest) openapi.ApiListRuntimeBackupsRequest) ([]openapi.BackupInfo, error)
```

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

### ListSecrets

```go
func (c *CamundaClient) ListSecrets(ctx context.Context, opts ...func(openapi.ApiListSecretsRequest) openapi.ApiListSecretsRequest) (*openapi.SecretListResult, error)
```

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
func (c *CamundaClient) MigrateProcessInstance(ctx context.Context, processInstanceKey openapi.ProcessInstanceKey, body openapi.ProcessInstanceMigrationInstruction, opts ...func(openapi.ApiMigrateProcessInstanceRequest) openapi.ApiMigrateProcessInstanceRequest) error
```

MigrateProcessInstance calls the MigrateProcessInstance operation.

Example:

```go
instruction := openapi.NewProcessInstanceMigrationInstruction(
	openapi.ModelString("2251799813685399"),
	[]openapi.MigrateProcessInstanceMappingInstruction{
		*openapi.NewMigrateProcessInstanceMappingInstruction("review", "review-v2"),
	})

return client.MigrateProcessInstance(ctx, openapi.MustProcessInstanceKey("2251799813685340"), *instruction)
```

### MigrateProcessInstancesBatchOperation

```go
func (c *CamundaClient) MigrateProcessInstancesBatchOperation(ctx context.Context, body openapi.ProcessInstanceMigrationBatchOperationRequest, opts ...func(openapi.ApiMigrateProcessInstancesBatchOperationRequest) openapi.ApiMigrateProcessInstancesBatchOperationRequest) (*openapi.BatchOperationCreatedResult, error)
```

MigrateProcessInstancesBatchOperation calls the MigrateProcessInstancesBatchOperation operation.

Example:

```go
plan := openapi.NewProcessInstanceMigrationBatchOperationPlan(
	openapi.ModelString("2251799813685399"),
	[]openapi.MigrateProcessInstanceMappingInstruction{
		*openapi.NewMigrateProcessInstanceMappingInstruction("review", "review-v2"),
	})
req := openapi.NewProcessInstanceMigrationBatchOperationRequest(*openapi.NewProcessInstanceFilter(), *plan)

result, err := client.MigrateProcessInstancesBatchOperation(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
```

### ModifyProcessInstance

```go
func (c *CamundaClient) ModifyProcessInstance(ctx context.Context, processInstanceKey openapi.ProcessInstanceKey, body openapi.ProcessInstanceModificationInstruction, opts ...func(openapi.ApiModifyProcessInstanceRequest) openapi.ApiModifyProcessInstanceRequest) error
```

ModifyProcessInstance calls the ModifyProcessInstance operation.

Example:

```go
return client.ModifyProcessInstance(ctx,
	openapi.MustProcessInstanceKey("2251799813685340"),
	*openapi.NewProcessInstanceModificationInstruction())
```

### ModifyProcessInstancesBatchOperation

```go
func (c *CamundaClient) ModifyProcessInstancesBatchOperation(ctx context.Context, body openapi.ProcessInstanceModificationBatchOperationRequest, opts ...func(openapi.ApiModifyProcessInstancesBatchOperationRequest) openapi.ApiModifyProcessInstancesBatchOperationRequest) (*openapi.BatchOperationCreatedResult, error)
```

ModifyProcessInstancesBatchOperation calls the ModifyProcessInstancesBatchOperation operation.

Example:

```go
req := openapi.NewProcessInstanceModificationBatchOperationRequest(
	*openapi.NewProcessInstanceFilter(),
	[]openapi.ProcessInstanceModificationMoveBatchOperationInstruction{
		*openapi.NewProcessInstanceModificationMoveBatchOperationInstruction("review", "approve"),
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
client's CAMUNDA*WORKER*\* configuration and can be overridden with options.

### NewStreamJobWorker

```go
func (c *CamundaClient) NewStreamJobWorker(jobType string, handler JobHandler, opts ...StreamWorkerOption) *StreamJobWorker
```

NewStreamJobWorker creates a gRPC streaming worker for jobType. Defaults are
seeded from the client's CAMUNDA*WORKER*\* configuration and can be overridden
with options.

### PauseExporting

```go
func (c *CamundaClient) PauseExporting(ctx context.Context, opts ...func(openapi.ApiPauseExportingRequest) openapi.ApiPauseExportingRequest) error
```

PauseExporting calls the PauseExporting operation.

Example:

```go
// While exporting is paused, reads from secondary storage stop advancing.
if err := client.PauseExporting(ctx); err != nil {
	return err
}
```

### PinClock

```go
func (c *CamundaClient) PinClock(ctx context.Context, body openapi.ClockPinRequest, opts ...func(openapi.ApiPinClockRequest) openapi.ApiPinClockRequest) error
```

PinClock calls the PinClock operation.

Example:

```go
// Pin the cluster clock to a fixed instant (epoch milliseconds).
pinned := time.Date(2025, time.January, 1, 0, 0, 0, 0, time.UTC)
return client.PinClock(ctx, *openapi.NewClockPinRequest(pinned.UnixMilli()))
```

### PublishMessage

```go
func (c *CamundaClient) PublishMessage(ctx context.Context, body openapi.MessagePublicationRequest, opts ...func(openapi.ApiPublishMessageRequest) openapi.ApiPublishMessageRequest) (*openapi.MessagePublicationResult, error)
```

PublishMessage calls the PublishMessage operation.

Example:

```go
req := openapi.NewMessagePublicationRequest("order-confirmed")
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
func (c *CamundaClient) Raw() *openapi.APIClient
```

Raw returns the underlying generated client for operations or options not yet
surfaced on the ergonomic facade.

### ResetClock

```go
func (c *CamundaClient) ResetClock(ctx context.Context, opts ...func(openapi.ApiResetClockRequest) openapi.ApiResetClockRequest) error
```

ResetClock calls the ResetClock operation.

Example:

```go
// Release a previously pinned clock back to system time.
return client.ResetClock(ctx)
```

### ResolveIncident

```go
func (c *CamundaClient) ResolveIncident(ctx context.Context, incidentKey openapi.IncidentKey, body openapi.IncidentResolutionRequest, opts ...func(openapi.ApiResolveIncidentRequest) openapi.ApiResolveIncidentRequest) error
```

ResolveIncident calls the ResolveIncident operation.

Example:

```go
// After fixing the root cause (e.g. correcting a variable), resolve the
// incident so the engine retries the failed element.
return client.ResolveIncident(ctx,
	openapi.MustIncidentKey("2251799813685300"),
	*openapi.NewIncidentResolutionRequest())
```

### ResolveIncidentsBatchOperation

```go
func (c *CamundaClient) ResolveIncidentsBatchOperation(ctx context.Context, body openapi.ProcessInstanceIncidentResolutionBatchOperationRequest, opts ...func(openapi.ApiResolveIncidentsBatchOperationRequest) openapi.ApiResolveIncidentsBatchOperationRequest) (*openapi.BatchOperationCreatedResult, error)
```

ResolveIncidentsBatchOperation calls the ResolveIncidentsBatchOperation operation.

Example:

```go
req := openapi.NewProcessInstanceIncidentResolutionBatchOperationRequest(*openapi.NewProcessInstanceFilter())

result, err := client.ResolveIncidentsBatchOperation(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
```

### ResolveProcessInstanceIncidents

```go
func (c *CamundaClient) ResolveProcessInstanceIncidents(ctx context.Context, processInstanceKey openapi.ProcessInstanceKey, opts ...func(openapi.ApiResolveProcessInstanceIncidentsRequest) openapi.ApiResolveProcessInstanceIncidentsRequest) (*openapi.BatchOperationCreatedResult, error)
```

ResolveProcessInstanceIncidents calls the ResolveProcessInstanceIncidents operation.

Example:

```go
result, err := client.ResolveProcessInstanceIncidents(ctx, openapi.MustProcessInstanceKey("2251799813685340"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### ResolveSecrets

```go
func (c *CamundaClient) ResolveSecrets(ctx context.Context, body openapi.SecretResolveRequest, opts ...func(openapi.ApiResolveSecretsRequest) openapi.ApiResolveSecretsRequest) (*openapi.SecretResolveResult, error)
```

ResolveSecrets calls the ResolveSecrets operation.

Example:

```go
// References take the form `camunda.secrets.<name>`.
req := openapi.NewSecretResolveRequest([]string{"camunda.secrets.MY_API_KEY", "camunda.secrets.MY_TOKEN"})

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
func (c *CamundaClient) Restore(ctx context.Context, body openapi.RestoreRequest, opts ...func(openapi.ApiRestoreRequest) openapi.ApiRestoreRequest) (*openapi.ClusterRestoreResponse, error)
```

Restore calls the Restore operation.

Example:

```go
result, err := client.Restore(ctx, *openapi.NewRestoreRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### RestoreAsClusterAdmin

```go
func (c *CamundaClient) RestoreAsClusterAdmin(ctx context.Context, body openapi.ClusterRestoreRequest, opts ...func(openapi.ApiRestoreAsClusterAdminRequest) openapi.ApiRestoreAsClusterAdminRequest) (*openapi.ClusterRestoreResponse, error)
```

RestoreAsClusterAdmin calls the RestoreAsClusterAdmin operation.

Example:

```go
// Triggers a cluster-level restore (cluster-admin authority), restoring from the given backup IDs.
// backupIds are one per partition, so the placeholder slice below must be extended to
// match the actual partition count of the target cluster (shown here for a 2-partition cluster).
restoreRequest := openapi.NewClusterRestoreRequestWithDefaults()
restoreRequest.SetBackupIds([]int64{1, 2})
result, err := client.RestoreAsClusterAdmin(ctx, *restoreRequest)
if err != nil {
	return err
}
fmt.Printf("restore change id: %s\n", result.GetChangeId())
```

### ResumeBatchOperation

```go
func (c *CamundaClient) ResumeBatchOperation(ctx context.Context, batchOperationKey string, opts ...func(openapi.ApiResumeBatchOperationRequest) openapi.ApiResumeBatchOperationRequest) error
```

ResumeBatchOperation calls the ResumeBatchOperation operation.

Example:

```go
return client.ResumeBatchOperation(ctx, "2251799813685290")
```

### ResumeExporting

```go
func (c *CamundaClient) ResumeExporting(ctx context.Context, opts ...func(openapi.ApiResumeExportingRequest) openapi.ApiResumeExportingRequest) error
```

ResumeExporting calls the ResumeExporting operation.

Example:

```go
if err := client.ResumeExporting(ctx); err != nil {
	return err
}
```

### ResumeProcessInstance

```go
func (c *CamundaClient) ResumeProcessInstance(ctx context.Context, processInstanceKey openapi.ProcessInstanceKey, body openapi.ResumeProcessInstanceRequest, opts ...func(openapi.ApiResumeProcessInstanceRequest) openapi.ApiResumeProcessInstanceRequest) error
```

ResumeProcessInstance calls the ResumeProcessInstance operation.

Example:

```go
return client.ResumeProcessInstance(ctx,
	openapi.MustProcessInstanceKey("2251799813685340"),
	*openapi.NewResumeProcessInstanceRequest())
```

### ResumeProcessInstancesBatchOperation

```go
func (c *CamundaClient) ResumeProcessInstancesBatchOperation(ctx context.Context, body openapi.ProcessInstanceResumptionBatchOperationRequest, opts ...func(openapi.ApiResumeProcessInstancesBatchOperationRequest) openapi.ApiResumeProcessInstancesBatchOperationRequest) (*openapi.BatchOperationCreatedResult, error)
```

ResumeProcessInstancesBatchOperation calls the ResumeProcessInstancesBatchOperation operation.

Example:

```go
// Resume every previously-suspended instance matching a filter.
req := openapi.NewProcessInstanceResumptionBatchOperationRequest(*openapi.NewProcessInstanceFilter())

result, err := client.ResumeProcessInstancesBatchOperation(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
```

### SearchAgentDefinitions

```go
func (c *CamundaClient) SearchAgentDefinitions(ctx context.Context, body openapi.AgentDefinitionSearchQuery, opts ...func(openapi.ApiSearchAgentDefinitionsRequest) openapi.ApiSearchAgentDefinitionsRequest) (*openapi.AgentDefinitionSearchQueryResult, error)
```

SearchAgentDefinitions calls the SearchAgentDefinitions operation.

Example:

```go
result, err := client.SearchAgentDefinitions(ctx, *openapi.NewAgentDefinitionSearchQuery())
if err != nil {
	return err
}
for _, d := range result.GetItems() {
	fmt.Printf("%v\n", d)
}
```

### SearchAgentInstanceHistory

```go
func (c *CamundaClient) SearchAgentInstanceHistory(ctx context.Context, agentInstanceKey openapi.AgentInstanceKey, body openapi.AgentInstanceHistorySearchQuery, opts ...func(openapi.ApiSearchAgentInstanceHistoryRequest) openapi.ApiSearchAgentInstanceHistoryRequest) (*openapi.AgentInstanceHistorySearchQueryResult, error)
```

SearchAgentInstanceHistory calls the SearchAgentInstanceHistory operation.

Example:

```go
result, err := client.SearchAgentInstanceHistory(ctx,
	openapi.MustAgentInstanceKey("2251799813685370"),
	*openapi.NewAgentInstanceHistorySearchQuery())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchAgentInstances

```go
func (c *CamundaClient) SearchAgentInstances(ctx context.Context, body openapi.AgentInstanceSearchQuery, opts ...func(openapi.ApiSearchAgentInstancesRequest) openapi.ApiSearchAgentInstancesRequest) (*openapi.AgentInstanceSearchQueryResult, error)
```

SearchAgentInstances calls the SearchAgentInstances operation.

Example:

```go
result, err := client.SearchAgentInstances(ctx, *openapi.NewAgentInstanceSearchQuery())
if err != nil {
	return err
}
for _, a := range result.GetItems() {
	fmt.Printf("%v\n", a)
}
```

### SearchAuditLogs

```go
func (c *CamundaClient) SearchAuditLogs(ctx context.Context, body openapi.AuditLogSearchQueryRequest, opts ...func(openapi.ApiSearchAuditLogsRequest) openapi.ApiSearchAuditLogsRequest) (*openapi.AuditLogSearchQueryResult, error)
```

SearchAuditLogs calls the SearchAuditLogs operation.

Example:

```go
result, err := client.SearchAuditLogs(ctx, *openapi.NewAuditLogSearchQueryRequest())
if err != nil {
	return err
}
for _, entry := range result.GetItems() {
	fmt.Printf("%v\n", entry)
}
```

### SearchAuthorizations

```go
func (c *CamundaClient) SearchAuthorizations(ctx context.Context, body openapi.AuthorizationSearchQuery, opts ...func(openapi.ApiSearchAuthorizationsRequest) openapi.ApiSearchAuthorizationsRequest) (*openapi.AuthorizationSearchResult, error)
```

SearchAuthorizations calls the SearchAuthorizations operation.

Example:

```go
result, err := client.SearchAuthorizations(ctx, *openapi.NewAuthorizationSearchQuery())
if err != nil {
	return err
}
for _, a := range result.GetItems() {
	fmt.Printf("%v\n", a)
}
```

### SearchBatchOperationItems

```go
func (c *CamundaClient) SearchBatchOperationItems(ctx context.Context, body openapi.BatchOperationItemSearchQuery, opts ...func(openapi.ApiSearchBatchOperationItemsRequest) openapi.ApiSearchBatchOperationItemsRequest) (*openapi.BatchOperationItemSearchQueryResult, error)
```

SearchBatchOperationItems calls the SearchBatchOperationItems operation.

Example:

```go
result, err := client.SearchBatchOperationItems(ctx, *openapi.NewBatchOperationItemSearchQuery())
if err != nil {
	return err
}
for _, item := range result.GetItems() {
	fmt.Printf("%v\n", item)
}
```

### SearchBatchOperations

```go
func (c *CamundaClient) SearchBatchOperations(ctx context.Context, body openapi.BatchOperationSearchQuery, opts ...func(openapi.ApiSearchBatchOperationsRequest) openapi.ApiSearchBatchOperationsRequest) (*openapi.BatchOperationSearchQueryResult, error)
```

SearchBatchOperations calls the SearchBatchOperations operation.

Example:

```go
result, err := client.SearchBatchOperations(ctx, *openapi.NewBatchOperationSearchQuery())
if err != nil {
	return err
}
for _, op := range result.GetItems() {
	fmt.Printf("%v\n", op)
}
```

### SearchClientsForGroup

```go
func (c *CamundaClient) SearchClientsForGroup(ctx context.Context, groupId string, body openapi.GroupClientSearchQueryRequest, opts ...func(openapi.ApiSearchClientsForGroupRequest) openapi.ApiSearchClientsForGroupRequest) (*openapi.GroupClientSearchResult, error)
```

SearchClientsForGroup calls the SearchClientsForGroup operation.

Example:

```go
result, err := client.SearchClientsForGroup(ctx, "finance", *openapi.NewGroupClientSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchClientsForRole

```go
func (c *CamundaClient) SearchClientsForRole(ctx context.Context, roleId string, body openapi.RoleClientSearchQueryRequest, opts ...func(openapi.ApiSearchClientsForRoleRequest) openapi.ApiSearchClientsForRoleRequest) (*openapi.RoleClientSearchResult, error)
```

SearchClientsForRole calls the SearchClientsForRole operation.

Example:

```go
result, err := client.SearchClientsForRole(ctx, "auditor", *openapi.NewRoleClientSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchClientsForTenant

```go
func (c *CamundaClient) SearchClientsForTenant(ctx context.Context, tenantId string, body openapi.TenantClientSearchQueryRequest, opts ...func(openapi.ApiSearchClientsForTenantRequest) openapi.ApiSearchClientsForTenantRequest) (*openapi.TenantClientSearchResult, error)
```

SearchClientsForTenant calls the SearchClientsForTenant operation.

Example:

```go
result, err := client.SearchClientsForTenant(ctx, "tenant-a", *openapi.NewTenantClientSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchClusterVariables

```go
func (c *CamundaClient) SearchClusterVariables(ctx context.Context, body openapi.ClusterVariableSearchQueryRequest, opts ...func(openapi.ApiSearchClusterVariablesRequest) openapi.ApiSearchClusterVariablesRequest) (*openapi.ClusterVariableSearchQueryResult, error)
```

SearchClusterVariables calls the SearchClusterVariables operation.

Example:

```go
result, err := client.SearchClusterVariables(ctx, *openapi.NewClusterVariableSearchQueryRequest())
if err != nil {
	return err
}
for _, v := range result.GetItems() {
	fmt.Printf("%v\n", v)
}
```

### SearchCorrelatedMessageSubscriptions

```go
func (c *CamundaClient) SearchCorrelatedMessageSubscriptions(ctx context.Context, body openapi.CorrelatedMessageSubscriptionSearchQuery, opts ...func(openapi.ApiSearchCorrelatedMessageSubscriptionsRequest) openapi.ApiSearchCorrelatedMessageSubscriptionsRequest) (*openapi.CorrelatedMessageSubscriptionSearchQueryResult, error)
```

SearchCorrelatedMessageSubscriptions calls the SearchCorrelatedMessageSubscriptions operation.

Example:

```go
result, err := client.SearchCorrelatedMessageSubscriptions(ctx,
	*openapi.NewCorrelatedMessageSubscriptionSearchQuery())
if err != nil {
	return err
}
for _, s := range result.GetItems() {
	fmt.Printf("%v\n", s)
}
```

### SearchDecisionDefinitions

```go
func (c *CamundaClient) SearchDecisionDefinitions(ctx context.Context, body openapi.DecisionDefinitionSearchQuery, opts ...func(openapi.ApiSearchDecisionDefinitionsRequest) openapi.ApiSearchDecisionDefinitionsRequest) (*openapi.DecisionDefinitionSearchQueryResult, error)
```

SearchDecisionDefinitions calls the SearchDecisionDefinitions operation.

Example:

```go
result, err := client.SearchDecisionDefinitions(ctx, *openapi.NewDecisionDefinitionSearchQuery())
if err != nil {
	return err
}
for _, d := range result.GetItems() {
	fmt.Printf("%v\n", d)
}
```

### SearchDecisionInstances

```go
func (c *CamundaClient) SearchDecisionInstances(ctx context.Context, body openapi.DecisionInstanceSearchQuery, opts ...func(openapi.ApiSearchDecisionInstancesRequest) openapi.ApiSearchDecisionInstancesRequest) (*openapi.DecisionInstanceSearchQueryResult, error)
```

SearchDecisionInstances calls the SearchDecisionInstances operation.

Example:

```go
result, err := client.SearchDecisionInstances(ctx, *openapi.NewDecisionInstanceSearchQuery())
if err != nil {
	return err
}
for _, d := range result.GetItems() {
	fmt.Printf("%v\n", d)
}
```

### SearchDecisionRequirements

```go
func (c *CamundaClient) SearchDecisionRequirements(ctx context.Context, body openapi.DecisionRequirementsSearchQuery, opts ...func(openapi.ApiSearchDecisionRequirementsRequest) openapi.ApiSearchDecisionRequirementsRequest) (*openapi.DecisionRequirementsSearchQueryResult, error)
```

SearchDecisionRequirements calls the SearchDecisionRequirements operation.

Example:

```go
result, err := client.SearchDecisionRequirements(ctx, *openapi.NewDecisionRequirementsSearchQuery())
if err != nil {
	return err
}
for _, d := range result.GetItems() {
	fmt.Printf("%v\n", d)
}
```

### SearchElementInstanceIncidents

```go
func (c *CamundaClient) SearchElementInstanceIncidents(ctx context.Context, elementInstanceKey openapi.ElementInstanceKey, body openapi.IncidentSearchQuery, opts ...func(openapi.ApiSearchElementInstanceIncidentsRequest) openapi.ApiSearchElementInstanceIncidentsRequest) (*openapi.IncidentSearchQueryResult, error)
```

SearchElementInstanceIncidents calls the SearchElementInstanceIncidents operation.

Example:

```go
result, err := client.SearchElementInstanceIncidents(ctx,
	openapi.MustElementInstanceKey("2251799813685360"),
	*openapi.NewIncidentSearchQuery())
if err != nil {
	return err
}
for _, inc := range result.GetItems() {
	fmt.Printf("%v\n", inc)
}
```

### SearchElementInstanceWaitStates

```go
func (c *CamundaClient) SearchElementInstanceWaitStates(ctx context.Context, body openapi.ElementInstanceWaitStateQuery, opts ...func(openapi.ApiSearchElementInstanceWaitStatesRequest) openapi.ApiSearchElementInstanceWaitStatesRequest) (*openapi.ElementInstanceWaitStateQueryResult, error)
```

SearchElementInstanceWaitStates calls the SearchElementInstanceWaitStates operation.

Example:

```go
result, err := client.SearchElementInstanceWaitStates(ctx, *openapi.NewElementInstanceWaitStateQuery())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchElementInstances

```go
func (c *CamundaClient) SearchElementInstances(ctx context.Context, body openapi.ElementInstanceSearchQuery, opts ...func(openapi.ApiSearchElementInstancesRequest) openapi.ApiSearchElementInstancesRequest) (*openapi.ElementInstanceSearchQueryResult, error)
```

SearchElementInstances calls the SearchElementInstances operation.

Example:

```go
result, err := client.SearchElementInstances(ctx, *openapi.NewElementInstanceSearchQuery())
if err != nil {
	return err
}
for _, e := range result.GetItems() {
	fmt.Printf("%v\n", e)
}
```

### SearchGlobalTaskListeners

```go
func (c *CamundaClient) SearchGlobalTaskListeners(ctx context.Context, body openapi.GlobalTaskListenerSearchQueryRequest, opts ...func(openapi.ApiSearchGlobalTaskListenersRequest) openapi.ApiSearchGlobalTaskListenersRequest) (*openapi.GlobalTaskListenerSearchQueryResult, error)
```

SearchGlobalTaskListeners calls the SearchGlobalTaskListeners operation.

Example:

```go
result, err := client.SearchGlobalTaskListeners(ctx, *openapi.NewGlobalTaskListenerSearchQueryRequest())
if err != nil {
	return err
}
for _, l := range result.GetItems() {
	fmt.Printf("%v\n", l)
}
```

### SearchGroupIdsForTenant

```go
func (c *CamundaClient) SearchGroupIdsForTenant(ctx context.Context, tenantId string, body openapi.TenantGroupSearchQueryRequest, opts ...func(openapi.ApiSearchGroupIdsForTenantRequest) openapi.ApiSearchGroupIdsForTenantRequest) (*openapi.TenantGroupSearchResult, error)
```

SearchGroupIdsForTenant calls the SearchGroupIdsForTenant operation.

Example:

```go
result, err := client.SearchGroupIdsForTenant(ctx, "tenant-a", *openapi.NewTenantGroupSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchGroups

```go
func (c *CamundaClient) SearchGroups(ctx context.Context, body openapi.GroupSearchQueryRequest, opts ...func(openapi.ApiSearchGroupsRequest) openapi.ApiSearchGroupsRequest) (*openapi.GroupSearchQueryResult, error)
```

SearchGroups calls the SearchGroups operation.

Example:

```go
result, err := client.SearchGroups(ctx, *openapi.NewGroupSearchQueryRequest())
if err != nil {
	return err
}
for _, g := range result.GetItems() {
	fmt.Printf("%v\n", g)
}
```

### SearchGroupsForRole

```go
func (c *CamundaClient) SearchGroupsForRole(ctx context.Context, roleId string, body openapi.RoleGroupSearchQueryRequest, opts ...func(openapi.ApiSearchGroupsForRoleRequest) openapi.ApiSearchGroupsForRoleRequest) (*openapi.RoleGroupSearchResult, error)
```

SearchGroupsForRole calls the SearchGroupsForRole operation.

Example:

```go
result, err := client.SearchGroupsForRole(ctx, "auditor", *openapi.NewRoleGroupSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchIncidents

```go
func (c *CamundaClient) SearchIncidents(ctx context.Context, body openapi.IncidentSearchQuery, opts ...func(openapi.ApiSearchIncidentsRequest) openapi.ApiSearchIncidentsRequest) (*openapi.IncidentSearchQueryResult, error)
```

SearchIncidents calls the SearchIncidents operation.

Example:

```go
result, err := client.SearchIncidents(ctx, *openapi.NewIncidentSearchQuery())
if err != nil {
	return err
}
for _, inc := range result.GetItems() {
	fmt.Printf("incident %v: %s\n", inc.GetIncidentKey(), inc.GetErrorType())
}
```

### SearchJobs

```go
func (c *CamundaClient) SearchJobs(ctx context.Context, body openapi.JobSearchQuery, opts ...func(openapi.ApiSearchJobsRequest) openapi.ApiSearchJobsRequest) (*openapi.JobSearchQueryResult, error)
```

SearchJobs calls the SearchJobs operation.

Example:

```go
result, err := client.SearchJobs(ctx, *openapi.NewJobSearchQuery())
if err != nil {
	return err
}
for _, job := range result.GetItems() {
	fmt.Printf("%v\n", job)
}
```

### SearchMappingRule

```go
func (c *CamundaClient) SearchMappingRule(ctx context.Context, body openapi.MappingRuleSearchQueryRequest, opts ...func(openapi.ApiSearchMappingRuleRequest) openapi.ApiSearchMappingRuleRequest) (*openapi.MappingRuleSearchQueryResult, error)
```

SearchMappingRule calls the SearchMappingRule operation.

Example:

```go
result, err := client.SearchMappingRule(ctx, *openapi.NewMappingRuleSearchQueryRequest())
if err != nil {
	return err
}
for _, r := range result.GetItems() {
	fmt.Printf("%v\n", r)
}
```

### SearchMappingRulesForGroup

```go
func (c *CamundaClient) SearchMappingRulesForGroup(ctx context.Context, groupId string, body openapi.MappingRuleSearchQueryRequest, opts ...func(openapi.ApiSearchMappingRulesForGroupRequest) openapi.ApiSearchMappingRulesForGroupRequest) (*openapi.GroupMappingRuleSearchResult, error)
```

SearchMappingRulesForGroup calls the SearchMappingRulesForGroup operation.

Example:

```go
result, err := client.SearchMappingRulesForGroup(ctx, "finance", *openapi.NewMappingRuleSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchMappingRulesForRole

```go
func (c *CamundaClient) SearchMappingRulesForRole(ctx context.Context, roleId string, body openapi.MappingRuleSearchQueryRequest, opts ...func(openapi.ApiSearchMappingRulesForRoleRequest) openapi.ApiSearchMappingRulesForRoleRequest) (*openapi.RoleMappingRuleSearchResult, error)
```

SearchMappingRulesForRole calls the SearchMappingRulesForRole operation.

Example:

```go
result, err := client.SearchMappingRulesForRole(ctx, "auditor", *openapi.NewMappingRuleSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchMappingRulesForTenant

```go
func (c *CamundaClient) SearchMappingRulesForTenant(ctx context.Context, tenantId string, body openapi.MappingRuleSearchQueryRequest, opts ...func(openapi.ApiSearchMappingRulesForTenantRequest) openapi.ApiSearchMappingRulesForTenantRequest) (*openapi.TenantMappingRuleSearchResult, error)
```

SearchMappingRulesForTenant calls the SearchMappingRulesForTenant operation.

Example:

```go
result, err := client.SearchMappingRulesForTenant(ctx, "tenant-a", *openapi.NewMappingRuleSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchMessageSubscriptions

```go
func (c *CamundaClient) SearchMessageSubscriptions(ctx context.Context, body openapi.MessageSubscriptionSearchQuery, opts ...func(openapi.ApiSearchMessageSubscriptionsRequest) openapi.ApiSearchMessageSubscriptionsRequest) (*openapi.MessageSubscriptionSearchQueryResult, error)
```

SearchMessageSubscriptions calls the SearchMessageSubscriptions operation.

Example:

```go
result, err := client.SearchMessageSubscriptions(ctx, *openapi.NewMessageSubscriptionSearchQuery())
if err != nil {
	return err
}
for _, s := range result.GetItems() {
	fmt.Printf("%v\n", s)
}
```

### SearchOwnAuthorizations

```go
func (c *CamundaClient) SearchOwnAuthorizations(ctx context.Context, body openapi.AuthorizationSearchQuery, opts ...func(openapi.ApiSearchOwnAuthorizationsRequest) openapi.ApiSearchOwnAuthorizationsRequest) (*openapi.AuthorizationSearchResult, error)
```

SearchOwnAuthorizations calls the SearchOwnAuthorizations operation.

Example:

```go
// Scoped to the authenticated principal: direct grants plus those inherited
// from a group, role, or mapping rule.
result, err := client.SearchOwnAuthorizations(ctx, *openapi.NewAuthorizationSearchQuery())
if err != nil {
	return err
}
for _, a := range result.GetItems() {
	fmt.Printf("%v\n", a)
}
```

### SearchProcessDefinitionVariableNames

```go
func (c *CamundaClient) SearchProcessDefinitionVariableNames(ctx context.Context, processDefinitionKey openapi.ProcessDefinitionKey, body openapi.ProcessDefinitionVariableNameSearchQuery, opts ...func(openapi.ApiSearchProcessDefinitionVariableNamesRequest) openapi.ApiSearchProcessDefinitionVariableNamesRequest) (*openapi.ProcessDefinitionVariableNameSearchQueryResult, error)
```

SearchProcessDefinitionVariableNames calls the SearchProcessDefinitionVariableNames operation.

Example:

```go
result, err := client.SearchProcessDefinitionVariableNames(ctx,
	openapi.MustProcessDefinitionKey("2251799813685330"),
	*openapi.NewProcessDefinitionVariableNameSearchQuery())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchProcessDefinitions

```go
func (c *CamundaClient) SearchProcessDefinitions(ctx context.Context, body openapi.ProcessDefinitionSearchQuery, opts ...func(openapi.ApiSearchProcessDefinitionsRequest) openapi.ApiSearchProcessDefinitionsRequest) (*openapi.ProcessDefinitionSearchQueryResult, error)
```

SearchProcessDefinitions calls the SearchProcessDefinitions operation.

Example:

```go
result, err := client.SearchProcessDefinitions(ctx, *openapi.NewProcessDefinitionSearchQuery())
if err != nil {
	return err
}
for _, d := range result.GetItems() {
	fmt.Printf("%v\n", d)
}
```

### SearchProcessInstanceIncidents

```go
func (c *CamundaClient) SearchProcessInstanceIncidents(ctx context.Context, processInstanceKey openapi.ProcessInstanceKey, body openapi.IncidentSearchQuery, opts ...func(openapi.ApiSearchProcessInstanceIncidentsRequest) openapi.ApiSearchProcessInstanceIncidentsRequest) (*openapi.IncidentSearchQueryResult, error)
```

SearchProcessInstanceIncidents calls the SearchProcessInstanceIncidents operation.

Example:

```go
result, err := client.SearchProcessInstanceIncidents(ctx,
	openapi.MustProcessInstanceKey("2251799813685340"),
	*openapi.NewIncidentSearchQuery())
if err != nil {
	return err
}
for _, inc := range result.GetItems() {
	fmt.Printf("%v\n", inc)
}
```

### SearchProcessInstances

```go
func (c *CamundaClient) SearchProcessInstances(ctx context.Context, body openapi.ProcessInstanceSearchQuery, opts ...func(openapi.ApiSearchProcessInstancesRequest) openapi.ApiSearchProcessInstancesRequest) (*openapi.ProcessInstanceSearchQueryResult, error)
```

SearchProcessInstances calls the SearchProcessInstances operation.

Example:

```go
result, err := client.SearchProcessInstances(ctx, *openapi.NewProcessInstanceSearchQuery())
if err != nil {
	return err
}
for _, pi := range result.GetItems() {
	fmt.Printf("%v: %v\n", pi.GetProcessInstanceKey(), pi.GetState())
}
```

### SearchResources

```go
func (c *CamundaClient) SearchResources(ctx context.Context, body openapi.ResourceSearchQuery, opts ...func(openapi.ApiSearchResourcesRequest) openapi.ApiSearchResourcesRequest) (*openapi.ResourceSearchQueryResult, error)
```

SearchResources calls the SearchResources operation.

Example:

```go
result, err := client.SearchResources(ctx, *openapi.NewResourceSearchQuery())
if err != nil {
	return err
}
for _, r := range result.GetItems() {
	fmt.Printf("%v\n", r)
}
```

### SearchRoles

```go
func (c *CamundaClient) SearchRoles(ctx context.Context, body openapi.RoleSearchQueryRequest, opts ...func(openapi.ApiSearchRolesRequest) openapi.ApiSearchRolesRequest) (*openapi.RoleSearchQueryResult, error)
```

SearchRoles calls the SearchRoles operation.

Example:

```go
result, err := client.SearchRoles(ctx, *openapi.NewRoleSearchQueryRequest())
if err != nil {
	return err
}
for _, r := range result.GetItems() {
	fmt.Printf("%v\n", r)
}
```

### SearchRolesForGroup

```go
func (c *CamundaClient) SearchRolesForGroup(ctx context.Context, groupId string, body openapi.RoleSearchQueryRequest, opts ...func(openapi.ApiSearchRolesForGroupRequest) openapi.ApiSearchRolesForGroupRequest) (*openapi.GroupRoleSearchResult, error)
```

SearchRolesForGroup calls the SearchRolesForGroup operation.

Example:

```go
result, err := client.SearchRolesForGroup(ctx, "finance", *openapi.NewRoleSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchRolesForTenant

```go
func (c *CamundaClient) SearchRolesForTenant(ctx context.Context, tenantId string, body openapi.RoleSearchQueryRequest, opts ...func(openapi.ApiSearchRolesForTenantRequest) openapi.ApiSearchRolesForTenantRequest) (*openapi.TenantRoleSearchResult, error)
```

SearchRolesForTenant calls the SearchRolesForTenant operation.

Example:

```go
result, err := client.SearchRolesForTenant(ctx, "tenant-a", *openapi.NewRoleSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchTenants

```go
func (c *CamundaClient) SearchTenants(ctx context.Context, body openapi.TenantSearchQueryRequest, opts ...func(openapi.ApiSearchTenantsRequest) openapi.ApiSearchTenantsRequest) (*openapi.TenantSearchQueryResult, error)
```

SearchTenants calls the SearchTenants operation.

Example:

```go
result, err := client.SearchTenants(ctx, *openapi.NewTenantSearchQueryRequest())
if err != nil {
	return err
}
for _, t := range result.GetItems() {
	fmt.Printf("%v\n", t)
}
```

### SearchUserTaskAuditLogs

```go
func (c *CamundaClient) SearchUserTaskAuditLogs(ctx context.Context, userTaskKey openapi.UserTaskKey, body openapi.UserTaskAuditLogSearchQueryRequest, opts ...func(openapi.ApiSearchUserTaskAuditLogsRequest) openapi.ApiSearchUserTaskAuditLogsRequest) (*openapi.AuditLogSearchQueryResult, error)
```

SearchUserTaskAuditLogs calls the SearchUserTaskAuditLogs operation.

Example:

```go
result, err := client.SearchUserTaskAuditLogs(ctx,
	openapi.MustUserTaskKey("2251799813685380"),
	*openapi.NewUserTaskAuditLogSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchUserTaskEffectiveVariables

```go
func (c *CamundaClient) SearchUserTaskEffectiveVariables(ctx context.Context, userTaskKey openapi.UserTaskKey, body openapi.UserTaskEffectiveVariableSearchQueryRequest, opts ...func(openapi.ApiSearchUserTaskEffectiveVariablesRequest) openapi.ApiSearchUserTaskEffectiveVariablesRequest) (*openapi.VariableSearchQueryResult, error)
```

SearchUserTaskEffectiveVariables calls the SearchUserTaskEffectiveVariables operation.

Example:

```go
result, err := client.SearchUserTaskEffectiveVariables(ctx,
	openapi.MustUserTaskKey("2251799813685380"),
	*openapi.NewUserTaskEffectiveVariableSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchUserTaskVariables

```go
func (c *CamundaClient) SearchUserTaskVariables(ctx context.Context, userTaskKey openapi.UserTaskKey, body openapi.UserTaskVariableSearchQueryRequest, opts ...func(openapi.ApiSearchUserTaskVariablesRequest) openapi.ApiSearchUserTaskVariablesRequest) (*openapi.VariableSearchQueryResult, error)
```

SearchUserTaskVariables calls the SearchUserTaskVariables operation.

Example:

```go
result, err := client.SearchUserTaskVariables(ctx,
	openapi.MustUserTaskKey("2251799813685380"),
	*openapi.NewUserTaskVariableSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchUserTasks

```go
func (c *CamundaClient) SearchUserTasks(ctx context.Context, body openapi.UserTaskSearchQuery, opts ...func(openapi.ApiSearchUserTasksRequest) openapi.ApiSearchUserTasksRequest) (*openapi.UserTaskSearchQueryResult, error)
```

SearchUserTasks calls the SearchUserTasks operation.

Example:

```go
result, err := client.SearchUserTasks(ctx, *openapi.NewUserTaskSearchQuery())
if err != nil {
	return err
}
for _, t := range result.GetItems() {
	fmt.Printf("%v\n", t)
}
```

### SearchUsers

```go
func (c *CamundaClient) SearchUsers(ctx context.Context, body openapi.UserSearchQueryRequest, opts ...func(openapi.ApiSearchUsersRequest) openapi.ApiSearchUsersRequest) (*openapi.UserSearchResult, error)
```

SearchUsers calls the SearchUsers operation.

Example:

```go
result, err := client.SearchUsers(ctx, *openapi.NewUserSearchQueryRequest())
if err != nil {
	return err
}
for _, u := range result.GetItems() {
	fmt.Printf("%v\n", u)
}
```

### SearchUsersForGroup

```go
func (c *CamundaClient) SearchUsersForGroup(ctx context.Context, groupId string, body openapi.GroupUserSearchQueryRequest, opts ...func(openapi.ApiSearchUsersForGroupRequest) openapi.ApiSearchUsersForGroupRequest) (*openapi.GroupUserSearchResult, error)
```

SearchUsersForGroup calls the SearchUsersForGroup operation.

Example:

```go
result, err := client.SearchUsersForGroup(ctx, "finance", *openapi.NewGroupUserSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchUsersForRole

```go
func (c *CamundaClient) SearchUsersForRole(ctx context.Context, roleId string, body openapi.RoleUserSearchQueryRequest, opts ...func(openapi.ApiSearchUsersForRoleRequest) openapi.ApiSearchUsersForRoleRequest) (*openapi.RoleUserSearchResult, error)
```

SearchUsersForRole calls the SearchUsersForRole operation.

Example:

```go
result, err := client.SearchUsersForRole(ctx, "auditor", *openapi.NewRoleUserSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchUsersForTenant

```go
func (c *CamundaClient) SearchUsersForTenant(ctx context.Context, tenantId string, body openapi.TenantUserSearchQueryRequest, opts ...func(openapi.ApiSearchUsersForTenantRequest) openapi.ApiSearchUsersForTenantRequest) (*openapi.TenantUserSearchResult, error)
```

SearchUsersForTenant calls the SearchUsersForTenant operation.

Example:

```go
result, err := client.SearchUsersForTenant(ctx, "tenant-a", *openapi.NewTenantUserSearchQueryRequest())
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### SearchVariables

```go
func (c *CamundaClient) SearchVariables(ctx context.Context, body openapi.VariableSearchQuery, opts ...func(openapi.ApiSearchVariablesRequest) openapi.ApiSearchVariablesRequest) (*openapi.VariableSearchQueryResult, error)
```

SearchVariables calls the SearchVariables operation.

Example:

```go
result, err := client.SearchVariables(ctx, *openapi.NewVariableSearchQuery())
if err != nil {
	return err
}
for _, v := range result.GetItems() {
	fmt.Printf("%v\n", v)
}
```

### SuspendBatchOperation

```go
func (c *CamundaClient) SuspendBatchOperation(ctx context.Context, batchOperationKey string, opts ...func(openapi.ApiSuspendBatchOperationRequest) openapi.ApiSuspendBatchOperationRequest) error
```

SuspendBatchOperation calls the SuspendBatchOperation operation.

Example:

```go
return client.SuspendBatchOperation(ctx, "2251799813685290")
```

### SuspendProcessInstance

```go
func (c *CamundaClient) SuspendProcessInstance(ctx context.Context, processInstanceKey openapi.ProcessInstanceKey, body openapi.SuspendProcessInstanceRequest, opts ...func(openapi.ApiSuspendProcessInstanceRequest) openapi.ApiSuspendProcessInstanceRequest) error
```

SuspendProcessInstance calls the SuspendProcessInstance operation.

Example:

```go
return client.SuspendProcessInstance(ctx,
	openapi.MustProcessInstanceKey("2251799813685340"),
	*openapi.NewSuspendProcessInstanceRequest())
```

### SuspendProcessInstancesBatchOperation

```go
func (c *CamundaClient) SuspendProcessInstancesBatchOperation(ctx context.Context, body openapi.ProcessInstanceSuspensionBatchOperationRequest, opts ...func(openapi.ApiSuspendProcessInstancesBatchOperationRequest) openapi.ApiSuspendProcessInstancesBatchOperationRequest) (*openapi.BatchOperationCreatedResult, error)
```

SuspendProcessInstancesBatchOperation calls the SuspendProcessInstancesBatchOperation operation.

Example:

```go
// Suspend every instance matching a filter in a single batch operation.
req := openapi.NewProcessInstanceSuspensionBatchOperationRequest(*openapi.NewProcessInstanceFilter())

result, err := client.SuspendProcessInstancesBatchOperation(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
```

### SyncRuntimeBackupState

```go
func (c *CamundaClient) SyncRuntimeBackupState(ctx context.Context, opts ...func(openapi.ApiSyncRuntimeBackupStateRequest) openapi.ApiSyncRuntimeBackupStateRequest) (*openapi.RuntimeBackupState, error)
```

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

### TakeHistoryBackup

```go
func (c *CamundaClient) TakeHistoryBackup(ctx context.Context, body openapi.TakeHistoryBackupRequest, opts ...func(openapi.ApiTakeHistoryBackupRequest) openapi.ApiTakeHistoryBackupRequest) (*openapi.TakeHistoryBackupResponse, error)
```

TakeHistoryBackup calls the TakeHistoryBackup operation.

Example:

```go
result, err := client.TakeHistoryBackup(ctx, *openapi.NewTakeHistoryBackupRequest(42))
if err != nil {
	return err
}
fmt.Printf("backup %d scheduled %d snapshot(s)\n", result.GetBackupId(), len(result.GetScheduledSnapshots()))
```

### TakeRuntimeBackup

```go
func (c *CamundaClient) TakeRuntimeBackup(ctx context.Context, body openapi.TakeRuntimeBackupRequest, opts ...func(openapi.ApiTakeRuntimeBackupRequest) openapi.ApiTakeRuntimeBackupRequest) (*openapi.TakeRuntimeBackupResponse, error)
```

TakeRuntimeBackup calls the TakeRuntimeBackup operation.

Example:

```go
req := openapi.NewTakeRuntimeBackupRequest()
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

### ThrowJobError

```go
func (c *CamundaClient) ThrowJobError(ctx context.Context, jobKey openapi.JobKey, body openapi.JobErrorRequest, opts ...func(openapi.ApiThrowJobErrorRequest) openapi.ApiThrowJobErrorRequest) error
```

ThrowJobError calls the ThrowJobError operation.

Example:

```go
req := openapi.NewJobErrorRequest("OUT_OF_STOCK")
req.SetErrorMessage("item is out of stock")

return client.ThrowJobError(ctx, openapi.MustJobKey("2251799813685424"), *req)
```

### UnassignClientFromGroup

```go
func (c *CamundaClient) UnassignClientFromGroup(ctx context.Context, groupId string, clientId string, opts ...func(openapi.ApiUnassignClientFromGroupRequest) openapi.ApiUnassignClientFromGroupRequest) error
```

UnassignClientFromGroup calls the UnassignClientFromGroup operation.

Example:

```go
return client.UnassignClientFromGroup(ctx, "finance", "reporting-service")
```

### UnassignClientFromTenant

```go
func (c *CamundaClient) UnassignClientFromTenant(ctx context.Context, tenantId string, clientId string, opts ...func(openapi.ApiUnassignClientFromTenantRequest) openapi.ApiUnassignClientFromTenantRequest) error
```

UnassignClientFromTenant calls the UnassignClientFromTenant operation.

Example:

```go
return client.UnassignClientFromTenant(ctx, "tenant-a", "reporting-service")
```

### UnassignGroupFromTenant

```go
func (c *CamundaClient) UnassignGroupFromTenant(ctx context.Context, tenantId string, groupId string, opts ...func(openapi.ApiUnassignGroupFromTenantRequest) openapi.ApiUnassignGroupFromTenantRequest) error
```

UnassignGroupFromTenant calls the UnassignGroupFromTenant operation.

Example:

```go
return client.UnassignGroupFromTenant(ctx, "tenant-a", "finance")
```

### UnassignMappingRuleFromGroup

```go
func (c *CamundaClient) UnassignMappingRuleFromGroup(ctx context.Context, groupId string, mappingRuleId string, opts ...func(openapi.ApiUnassignMappingRuleFromGroupRequest) openapi.ApiUnassignMappingRuleFromGroupRequest) error
```

UnassignMappingRuleFromGroup calls the UnassignMappingRuleFromGroup operation.

Example:

```go
return client.UnassignMappingRuleFromGroup(ctx, "finance", "sso-auditors")
```

### UnassignMappingRuleFromTenant

```go
func (c *CamundaClient) UnassignMappingRuleFromTenant(ctx context.Context, tenantId string, mappingRuleId string, opts ...func(openapi.ApiUnassignMappingRuleFromTenantRequest) openapi.ApiUnassignMappingRuleFromTenantRequest) error
```

UnassignMappingRuleFromTenant calls the UnassignMappingRuleFromTenant operation.

Example:

```go
return client.UnassignMappingRuleFromTenant(ctx, "tenant-a", "sso-auditors")
```

### UnassignRoleFromClient

```go
func (c *CamundaClient) UnassignRoleFromClient(ctx context.Context, roleId string, clientId string, opts ...func(openapi.ApiUnassignRoleFromClientRequest) openapi.ApiUnassignRoleFromClientRequest) error
```

UnassignRoleFromClient calls the UnassignRoleFromClient operation.

Example:

```go
return client.UnassignRoleFromClient(ctx, "auditor", "reporting-service")
```

### UnassignRoleFromGroup

```go
func (c *CamundaClient) UnassignRoleFromGroup(ctx context.Context, roleId string, groupId string, opts ...func(openapi.ApiUnassignRoleFromGroupRequest) openapi.ApiUnassignRoleFromGroupRequest) error
```

UnassignRoleFromGroup calls the UnassignRoleFromGroup operation.

Example:

```go
return client.UnassignRoleFromGroup(ctx, "auditor", "finance")
```

### UnassignRoleFromMappingRule

```go
func (c *CamundaClient) UnassignRoleFromMappingRule(ctx context.Context, roleId string, mappingRuleId string, opts ...func(openapi.ApiUnassignRoleFromMappingRuleRequest) openapi.ApiUnassignRoleFromMappingRuleRequest) error
```

UnassignRoleFromMappingRule calls the UnassignRoleFromMappingRule operation.

Example:

```go
return client.UnassignRoleFromMappingRule(ctx, "auditor", "sso-auditors")
```

### UnassignRoleFromTenant

```go
func (c *CamundaClient) UnassignRoleFromTenant(ctx context.Context, tenantId string, roleId string, opts ...func(openapi.ApiUnassignRoleFromTenantRequest) openapi.ApiUnassignRoleFromTenantRequest) error
```

UnassignRoleFromTenant calls the UnassignRoleFromTenant operation.

Example:

```go
return client.UnassignRoleFromTenant(ctx, "tenant-a", "auditor")
```

### UnassignRoleFromUser

```go
func (c *CamundaClient) UnassignRoleFromUser(ctx context.Context, roleId string, username string, opts ...func(openapi.ApiUnassignRoleFromUserRequest) openapi.ApiUnassignRoleFromUserRequest) error
```

UnassignRoleFromUser calls the UnassignRoleFromUser operation.

Example:

```go
return client.UnassignRoleFromUser(ctx, "auditor", "alice")
```

### UnassignUserFromGroup

```go
func (c *CamundaClient) UnassignUserFromGroup(ctx context.Context, groupId string, username string, opts ...func(openapi.ApiUnassignUserFromGroupRequest) openapi.ApiUnassignUserFromGroupRequest) error
```

UnassignUserFromGroup calls the UnassignUserFromGroup operation.

Example:

```go
return client.UnassignUserFromGroup(ctx, "finance", "alice")
```

### UnassignUserFromTenant

```go
func (c *CamundaClient) UnassignUserFromTenant(ctx context.Context, tenantId string, username string, opts ...func(openapi.ApiUnassignUserFromTenantRequest) openapi.ApiUnassignUserFromTenantRequest) error
```

UnassignUserFromTenant calls the UnassignUserFromTenant operation.

Example:

```go
return client.UnassignUserFromTenant(ctx, "tenant-a", "alice")
```

### UnassignUserTask

```go
func (c *CamundaClient) UnassignUserTask(ctx context.Context, userTaskKey openapi.UserTaskKey, opts ...func(openapi.ApiUnassignUserTaskRequest) openapi.ApiUnassignUserTaskRequest) error
```

UnassignUserTask calls the UnassignUserTask operation.

Example:

```go
return client.UnassignUserTask(ctx, openapi.MustUserTaskKey("2251799813685380"))
```

### UpdateAgentInstance

```go
func (c *CamundaClient) UpdateAgentInstance(ctx context.Context, agentInstanceKey openapi.AgentInstanceKey, body openapi.AgentInstanceUpdateRequest, opts ...func(openapi.ApiUpdateAgentInstanceRequest) openapi.ApiUpdateAgentInstanceRequest) (*openapi.AgentInstanceUpdateResult, error)
```

UpdateAgentInstance calls the UpdateAgentInstance operation.

Example:

```go
req := openapi.NewAgentInstanceUpdateRequest(openapi.ModelString("2251799813685360"))

result, err := client.UpdateAgentInstance(ctx, openapi.MustAgentInstanceKey("2251799813685370"), *req)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### UpdateAuthorization

```go
func (c *CamundaClient) UpdateAuthorization(ctx context.Context, authorizationKey openapi.AuthorizationKey, body openapi.AuthorizationRequest, opts ...func(openapi.ApiUpdateAuthorizationRequest) openapi.ApiUpdateAuthorizationRequest) error
```

UpdateAuthorization calls the UpdateAuthorization operation.

Example:

```go
updated := openapi.NewAuthorizationIdBasedRequest(
	"user@example.com",
	openapi.OWNERTYPEENUM_USER,
	"order-process",
	openapi.RESOURCETYPEENUM_PROCESS_DEFINITION,
	[]openapi.PermissionTypeEnum{openapi.PERMISSIONTYPEENUM_READ_PROCESS_DEFINITION},
)

return client.UpdateAuthorization(ctx,
	openapi.MustAuthorizationKey("2251799813685280"),
	openapi.AuthorizationIdBasedRequestAsAuthorizationRequest(updated))
```

### UpdateGlobalClusterVariable

```go
func (c *CamundaClient) UpdateGlobalClusterVariable(ctx context.Context, name string, body openapi.UpdateClusterVariableRequest, opts ...func(openapi.ApiUpdateGlobalClusterVariableRequest) openapi.ApiUpdateGlobalClusterVariableRequest) (*openapi.ClusterVariableResult, error)
```

UpdateGlobalClusterVariable calls the UpdateGlobalClusterVariable operation.

Example:

```go
result, err := client.UpdateGlobalClusterVariable(ctx, "region",
	*openapi.NewUpdateClusterVariableRequest(map[string]any{"value": "eu-2"}))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### UpdateGlobalTaskListener

```go
func (c *CamundaClient) UpdateGlobalTaskListener(ctx context.Context, id string, body openapi.UpdateGlobalTaskListenerRequest, opts ...func(openapi.ApiUpdateGlobalTaskListenerRequest) openapi.ApiUpdateGlobalTaskListenerRequest) (*openapi.GlobalTaskListenerResult, error)
```

UpdateGlobalTaskListener calls the UpdateGlobalTaskListener operation.

Example:

```go
result, err := client.UpdateGlobalTaskListener(ctx, "audit-listener",
	*openapi.NewUpdateGlobalTaskListenerRequest(
		"audit-worker",
		[]openapi.GlobalTaskListenerEventTypeEnum{openapi.GLOBALTASKLISTENEREVENTTYPEENUM_ALL},
	))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### UpdateGroup

```go
func (c *CamundaClient) UpdateGroup(ctx context.Context, groupId string, body openapi.GroupUpdateRequest, opts ...func(openapi.ApiUpdateGroupRequest) openapi.ApiUpdateGroupRequest) (*openapi.GroupUpdateResult, error)
```

UpdateGroup calls the UpdateGroup operation.

Example:

```go
result, err := client.UpdateGroup(ctx, "finance", *openapi.NewGroupUpdateRequest("Finance & Accounting"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### UpdateJob

```go
func (c *CamundaClient) UpdateJob(ctx context.Context, jobKey openapi.JobKey, body openapi.JobUpdateRequest, opts ...func(openapi.ApiUpdateJobRequest) openapi.ApiUpdateJobRequest) error
```

UpdateJob calls the UpdateJob operation.

Example:

```go
changeset := openapi.NewJobChangeset()
changeset.SetRetries(3)

return client.UpdateJob(ctx, openapi.MustJobKey("2251799813685424"), *openapi.NewJobUpdateRequest(*changeset))
```

### UpdateJobsBatchOperation

```go
func (c *CamundaClient) UpdateJobsBatchOperation(ctx context.Context, body openapi.JobBatchUpdateRequest, opts ...func(openapi.ApiUpdateJobsBatchOperationRequest) openapi.ApiUpdateJobsBatchOperationRequest) (*openapi.BatchOperationCreatedResult, error)
```

UpdateJobsBatchOperation calls the UpdateJobsBatchOperation operation.

Example:

```go
changeset := openapi.NewJobChangeset()
changeset.SetRetries(3)
req := openapi.NewJobBatchUpdateRequest(*openapi.NewJobFilter(), *changeset)

result, err := client.UpdateJobsBatchOperation(ctx, *req)
if err != nil {
	return err
}
fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
```

### UpdateMappingRule

```go
func (c *CamundaClient) UpdateMappingRule(ctx context.Context, mappingRuleId string, body openapi.MappingRuleUpdateRequest, opts ...func(openapi.ApiUpdateMappingRuleRequest) openapi.ApiUpdateMappingRuleRequest) (*openapi.MappingRuleUpdateResult, error)
```

UpdateMappingRule calls the UpdateMappingRule operation.

Example:

```go
result, err := client.UpdateMappingRule(ctx, "sso-auditors",
	*openapi.NewMappingRuleUpdateRequest("groups", "senior-auditors", "SSO Senior Auditors"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### UpdateRole

```go
func (c *CamundaClient) UpdateRole(ctx context.Context, roleId string, body openapi.RoleUpdateRequest, opts ...func(openapi.ApiUpdateRoleRequest) openapi.ApiUpdateRoleRequest) (*openapi.RoleUpdateResult, error)
```

UpdateRole calls the UpdateRole operation.

Example:

```go
result, err := client.UpdateRole(ctx, "auditor", *openapi.NewRoleUpdateRequest("Senior Auditor"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### UpdateTenant

```go
func (c *CamundaClient) UpdateTenant(ctx context.Context, tenantId string, body openapi.TenantUpdateRequest, opts ...func(openapi.ApiUpdateTenantRequest) openapi.ApiUpdateTenantRequest) (*openapi.TenantUpdateResult, error)
```

UpdateTenant calls the UpdateTenant operation.

Example:

```go
result, err := client.UpdateTenant(ctx, "tenant-a", *openapi.NewTenantUpdateRequest("Tenant A (renamed)"))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### UpdateTenantClusterVariable

```go
func (c *CamundaClient) UpdateTenantClusterVariable(ctx context.Context, tenantId string, name string, body openapi.UpdateClusterVariableRequest, opts ...func(openapi.ApiUpdateTenantClusterVariableRequest) openapi.ApiUpdateTenantClusterVariableRequest) (*openapi.ClusterVariableResult, error)
```

UpdateTenantClusterVariable calls the UpdateTenantClusterVariable operation.

Example:

```go
result, err := client.UpdateTenantClusterVariable(ctx, "tenant-a", "region",
	*openapi.NewUpdateClusterVariableRequest(map[string]any{"value": "eu-2"}))
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### UpdateUser

```go
func (c *CamundaClient) UpdateUser(ctx context.Context, username string, body openapi.UserUpdateRequest, opts ...func(openapi.ApiUpdateUserRequest) openapi.ApiUpdateUserRequest) (*openapi.UserUpdateResult, error)
```

UpdateUser calls the UpdateUser operation.

Example:

```go
req := openapi.NewUserUpdateRequest()
req.SetName("Alice Updated")

result, err := client.UpdateUser(ctx, "alice", *req)
if err != nil {
	return err
}
fmt.Printf("%v\n", result)
```

### UpdateUserTask

```go
func (c *CamundaClient) UpdateUserTask(ctx context.Context, userTaskKey openapi.UserTaskKey, body openapi.UserTaskUpdateRequest, opts ...func(openapi.ApiUpdateUserTaskRequest) openapi.ApiUpdateUserTaskRequest) error
```

UpdateUserTask calls the UpdateUserTask operation.

Example:

```go
// Update fields (priority, due/follow-up dates, ...) via the request's
// changeset. An empty request is a no-op.
req := openapi.NewUserTaskUpdateRequest()

return client.UpdateUserTask(ctx, openapi.MustUserTaskKey("2251799813685380"), *req)
```
