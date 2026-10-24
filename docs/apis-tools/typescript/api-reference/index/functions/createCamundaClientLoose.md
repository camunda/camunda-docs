---
title: "Function: createCamundaClientLoose()"
sidebar_label: "createCamundaClientLoose()"
mdx:
  format: md
---

# Function: createCamundaClientLoose()

```ts
function createCamundaClientLoose(...args): WithSearchPagination<{
  clock: {
     deadline(...a): {
        dispose: (...a) => void;
        signal: {
        };
     };
     now(...a): number;
     sleep(...a): Promise<void>;
  };
  config: {
     __raw: {
      [key: string]: string | undefined;
     };
     auth: {
        basic?: {
           password?: string;
           username?: string;
        };
        strategy: AuthStrategy;
     };
     backpressure: {
        decayQuietMs: number;
        enabled: boolean;
        floor: number;
        healthyRecoveryMultiplier: number;
        initialMax: number;
        maxWaiters: number;
        observeOnly: boolean;
        profile: string;
        recoveryIntervalMs: number;
        recoveryStep: number;
        severeFactor: number;
        severeThreshold: number;
        softFactor: number;
        unlimitedAfterHealthyMs: number;
     };
     defaultTenantId: string;
     eventual?: {
        pollDefaultMs: number;
     };
     httpRetry: {
        baseDelayMs: number;
        maxAttempts: number;
        maxDelayMs: number;
     };
     logLevel: "trace" | "error" | "silent" | "warn" | "info" | "debug";
     mtls?: {
        ca?: string;
        caPath?: string;
        cert?: string;
        certPath?: string;
        key?: string;
        keyPassphrase?: string;
        keyPath?: string;
     };
     oauth: {
        cacheDir?: string;
        clientId?: string;
        clientSecret?: string;
        grantType: string;
        oauthUrl: string;
        retry: {
           baseDelayMs: number;
           max: number;
        };
        scope?: string;
        timeoutMs: number;
     };
     restAddress: string;
     supportLog?: {
        enabled: boolean;
        filePath: string;
     };
     telemetry?: {
        correlation: boolean;
        log: boolean;
     };
     tokenAudience: string;
     validation: {
        raw: string;
        req: ValidationMode;
        res: ValidationMode;
     };
     workerDefaults?: {
        jobTimeoutMs?: number;
        maxParallelJobs?: number;
        pollTimeoutMs?: number;
        startupJitterMaxSeconds?: number;
        workerName?: string;
     };
  };
  random: {
     next(...a): number;
  };
  _getSupportLogger(...a): {
     log(...a): void;
  };
  _invokeWithRetry(...a): Promise<unknown>;
  activateAdHocSubProcessActivities(...a): CancelablePromise<void>;
  activateJobs(...a): CancelablePromise<{
     jobs: object[];
  }>;
  assignClientToGroup(...a): CancelablePromise<void>;
  assignClientToTenant(...a): CancelablePromise<void>;
  assignGroupToTenant(...a): CancelablePromise<void>;
  assignMappingRuleToGroup(...a): CancelablePromise<void>;
  assignMappingRuleToTenant(...a): CancelablePromise<void>;
  assignProcessInstanceBusinessId(...a): CancelablePromise<void>;
  assignRoleToClient(...a): CancelablePromise<void>;
  assignRoleToGroup(...a): CancelablePromise<void>;
  assignRoleToMappingRule(...a): CancelablePromise<void>;
  assignRoleToTenant(...a): CancelablePromise<void>;
  assignRoleToUser(...a): CancelablePromise<void>;
  assignUserTask(...a): CancelablePromise<void>;
  assignUserToGroup(...a): CancelablePromise<void>;
  assignUserToTenant(...a): CancelablePromise<void>;
  broadcastSignal(...a): CancelablePromise<{
     signalKey: string;
     tenantId: string;
  }>;
  cancelBatchOperation(...a): CancelablePromise<void>;
  cancelClusterRebalance(...a): CancelablePromise<{
     wasRunning: boolean;
  }>;
  cancelProcessInstance(...a): CancelablePromise<void>;
  cancelProcessInstancesBatchOperation(...a): CancelablePromise<{
     batchOperationKey: string;
     batchOperationType: BatchOperationTypeEnum;
  }>;
  changeClusterMode(...a): CancelablePromise<{
     changeId: string;
     plannedChanges: object[];
  }>;
  changeClusterModeAsClusterAdmin(...a): CancelablePromise<{
     changeId: string;
     plannedChanges: object[];
  }>;
  clearAuthCache(...a): void;
  completeJob(...a): CancelablePromise<void>;
  completeUserTask(...a): CancelablePromise<void>;
  configure(...a): void;
  correlateMessage(...a): CancelablePromise<{
     messageKey: string;
     processInstanceKey: string;
     tenantId: string;
  }>;
  createAdminUser(...a): CancelablePromise<{
     email: string | null;
     name: string | null;
     username: string;
  }>;
  createAgentInstance(...a): CancelablePromise<{
     agentInstanceKey: string;
     createdHistory: object[];
  }>;
  createAuthorization(...a): CancelablePromise<{
     authorizationKey: string;
  }>;
  createDeployment(...a): CancelablePromise<{
     decisionRequirements: object[];
     decisions: object[];
     deploymentKey: string;
     deployments: object[];
     forms: object[];
     processes: object[];
     resources: object[];
     tenantId: string;
  }>;
  createDocument(...a): CancelablePromise<{
     camunda.document.type: "camunda";
     contentHash: string | null;
     documentId: string;
     metadata: {
        contentType: string;
        customProperties: {
         [key: string]: unknown;
        };
        expiresAt: string | null;
        fileName: string;
        processDefinitionId:   | {
         [key: number]: string;
           __brand: "ProcessDefinitionId";
         }
           | null;
        processInstanceKey:   | {
         [key: number]: string;
           __brand: "ProcessInstanceKey";
         }
           | null;
        size: number;
     };
     storeId: string;
  }>;
  createDocumentLink(...a): CancelablePromise<{
     expiresAt: string;
     url: string;
  }>;
  createDocuments(...a): CancelablePromise<{
     createdDocuments: object[];
     failedDocuments: object[];
  }>;
  createElementInstanceVariables(...a): CancelablePromise<void>;
  createGlobalClusterVariable(...a): CancelablePromise<{
     kind: ClusterVariableKindEnum;
     metadata: {
      [key: string]: string | number;
     };
     name: string;
     scope: ClusterVariableScopeEnum;
     tenantId: string | null;
     value: string;
  }>;
  createGlobalTaskListener(...a): CancelablePromise<{
     afterNonGlobal?: boolean;
     eventTypes: GlobalTaskListenerEventTypeEnum[];
     id: string;
     priority?: number;
     retries?: number;
     source: GlobalListenerSourceEnum;
     type?: string;
  }>;
  createGroup(...a): CancelablePromise<{
     description: string | null;
     groupId: string;
     name: string;
  }>;
  createJobWorker(...a): {
     activeJobs: number;
     name: string;
     stopped: boolean;
     start(...a): void;
     stop(...a): void;
     stopGracefully(...a): Promise<{
        remainingJobs: number;
        timedOut: boolean;
     }>;
  };
  createMappingRule(...a): CancelablePromise<{
     claimName: string;
     claimValue: string;
     mappingRuleId: string;
     name: string;
  }>;
  createProcessInstance(...a): CancelablePromise<{
     businessId:   | {
      [key: number]: string;
        __brand: "BusinessId";
      }
        | null;
     processDefinitionId: string;
     processDefinitionKey: string;
     processDefinitionVersion: number;
     processInstanceKey: string;
     tags: string[];
     tenantId: string;
     variables: {
      [key: string]: unknown;
     };
  }>;
  createRole(...a): CancelablePromise<{
     description: string | null;
     name: string;
     roleId: string;
  }>;
  createTenant(...a): CancelablePromise<{
     description: string | null;
     name: string;
     tenantId: string;
  }>;
  createTenantClusterVariable(...a): CancelablePromise<{
     kind: ClusterVariableKindEnum;
     metadata: {
      [key: string]: string | number;
     };
     name: string;
     scope: ClusterVariableScopeEnum;
     tenantId: string | null;
     value: string;
  }>;
  createThreadedJobWorker(...a): {
     activeJobs: number;
     busyThreads: number;
     name: string;
     poolSize: number;
     ready: Promise<void>;
     stopped: boolean;
     start(...a): void;
     stop(...a): void;
     stopGracefully(...a): Promise<{
        remainingJobs: number;
        timedOut: boolean;
     }>;
  };
  createUser(...a): CancelablePromise<{
     email: string | null;
     name: string | null;
     username: string;
  }>;
  deleteAuthorization(...a): CancelablePromise<void>;
  deleteDecisionInstance(...a): CancelablePromise<void>;
  deleteDecisionInstancesBatchOperation(...a): CancelablePromise<{
     batchOperationKey: string;
     batchOperationType: BatchOperationTypeEnum;
  }>;
  deleteDocument(...a): CancelablePromise<void>;
  deleteGlobalClusterVariable(...a): CancelablePromise<void>;
  deleteGlobalTaskListener(...a): CancelablePromise<void>;
  deleteGroup(...a): CancelablePromise<void>;
  deleteHistoryBackup(...a): CancelablePromise<void>;
  deleteHistoryBackupAsClusterAdmin(...a): CancelablePromise<void>;
  deleteMappingRule(...a): CancelablePromise<void>;
  deleteProcessInstance(...a): CancelablePromise<void>;
  deleteProcessInstancesBatchOperation(...a): CancelablePromise<{
     batchOperationKey: string;
     batchOperationType: BatchOperationTypeEnum;
  }>;
  deleteResource(...a): CancelablePromise<{
     batchOperation:   | {
        batchOperationKey: string;
        batchOperationType: BatchOperationTypeEnum;
      }
        | null;
     resourceKey: string;
  }>;
  deleteRole(...a): CancelablePromise<void>;
  deleteRuntimeBackup(...a): CancelablePromise<void>;
  deleteRuntimeBackupAsClusterAdmin(...a): CancelablePromise<void>;
  deleteRuntimeBackupState(...a): CancelablePromise<void>;
  deleteRuntimeBackupStateAsClusterAdmin(...a): CancelablePromise<void>;
  deleteTenant(...a): CancelablePromise<void>;
  deleteTenantClusterVariable(...a): CancelablePromise<void>;
  deleteUser(...a): CancelablePromise<void>;
  deployResourcesFromFiles(...a): CancelablePromise<{
     decisionRequirements: object[];
     decisions: object[];
     deploymentKey: string;
     deployments: object[];
     forms: object[];
     processes: object[];
     resources: object[];
     tenantId: string;
  }>;
  emitSupportLogPreamble(...a): void;
  evaluateConditionals(...a): CancelablePromise<{
     conditionalEvaluationKey: string;
     processInstances: object[];
     tenantId: string;
  }>;
  evaluateDecision(...a): CancelablePromise<{
     decisionDefinitionId: string;
     decisionDefinitionKey: string;
     decisionDefinitionName: string;
     decisionDefinitionVersion: number;
     decisionEvaluationKey: string;
     decisionInstanceKey: string;
     decisionRequirementsId: string;
     decisionRequirementsKey: string;
     evaluatedDecisions: object[];
     failedDecisionDefinitionId:   | {
      [key: number]: string;
        __brand: "DecisionDefinitionId";
      }
        | null;
     failureMessage: string | null;
     output: string;
     tenantId: string;
  }>;
  evaluateExpression(...a): CancelablePromise<{
     expression: string;
     referencedSecrets: object[];
     result: unknown;
     warnings: object[];
  }>;
  failJob(...a): CancelablePromise<void>;
  forceAuthRefresh(...a): Promise<string | undefined>;
  getAgentDefinition(...a): CancelablePromise<{
     agentDefinitionKey: string;
     agentType: AgentDefinitionTypeEnum;
     elementId: string;
     name: string;
     processDefinitionId: string;
     processDefinitionKey: string;
     processDefinitionVersion: number;
     processDefinitionVersionTag: string | null;
     tenantId: string;
  }>;
  getAgentInstance(...a): CancelablePromise<{
     agentDefinitionKey: string;
     agentInstanceKey: string;
     completionDate: string | null;
     creationDate: string;
     definition: {
        model: string;
        provider: string;
        systemPrompt: (
           | {
           contentType: "TEXT";
           text: string;
         }
           | {
           contentType: "DOCUMENT";
           documentReference: {
              camunda.document.type: "camunda";
              contentHash: string | null;
              documentId: string;
              metadata: {
                 contentType: string;
                 customProperties: {
                  [key: ...]: ...;
                 };
                 expiresAt: ... | ...;
                 fileName: string;
                 processDefinitionId: ... | ...;
                 processInstanceKey: ... | ...;
                 size: number;
              };
              storeId: string;
           };
         }
           | {
           contentType: "OBJECT";
           object: unknown;
        })[];
     };
     elementId: string;
     elementInstanceKeys: string[];
     lastUpdatedDate: string;
     limits: {
        maxModelCalls: number;
        maxTokens: number;
        maxToolCalls: number;
     };
     metrics: {
        cacheCreationTokenCount: number;
        cacheReadTokenCount: number;
        inputTokens: number;
        modelCalls: number;
        outputTokens: number;
        reasoningTokenCount: number;
        toolCalls: number;
     };
     processDefinitionId: string;
     processDefinitionKey: string;
     processDefinitionVersion: number;
     processDefinitionVersionTag: string | null;
     processInstanceKey: string;
     rootProcessInstanceKey: string;
     status: AgentInstanceStatusEnum;
     tenantId: string;
     tools: object[];
  }>;
  getAuditLog(...a): CancelablePromise<{
     actorId: string | null;
     actorType:   | AuditLogActorTypeEnum
        | null;
     agentElementId: string | null;
     auditLogKey: string;
     batchOperationKey:   | {
      [key: number]: string;
        __brand: "BatchOperationKey";
      }
        | null;
     batchOperationType:   | BatchOperationTypeEnum
        | null;
     category: AuditLogCategoryEnum;
     decisionDefinitionId:   | {
      [key: number]: string;
        __brand: "DecisionDefinitionId";
      }
        | null;
     decisionDefinitionKey:   | {
      [key: number]: string;
        __brand: "DecisionDefinitionKey";
      }
        | null;
     decisionEvaluationKey:   | {
      [key: number]: string;
        __brand: "DecisionEvaluationKey";
      }
        | null;
     decisionRequirementsId: string | null;
     decisionRequirementsKey:   | {
      [key: number]: string;
        __brand: "DecisionRequirementsKey";
      }
        | null;
     deploymentKey:   | {
      [key: number]: string;
        __brand: "DeploymentKey";
      }
        | null;
     elementInstanceKey:   | {
      [key: number]: string;
        __brand: "ElementInstanceKey";
      }
        | null;
     entityDescription: string | null;
     entityKey: string;
     entityType: AuditLogEntityTypeEnum;
     formKey:   | {
      [key: number]: string;
        __brand: "FormKey";
      }
        | null;
     inboundChannelToolName: string | null;
     inboundChannelType: string | null;
     jobKey:   | {
      [key: number]: string;
        __brand: "JobKey";
      }
        | null;
     operationType: AuditLogOperationTypeEnum;
     processDefinitionId:   | {
      [key: number]: string;
        __brand: "ProcessDefinitionId";
      }
        | null;
     processDefinitionKey:   | {
      [key: number]: string;
        __brand: "ProcessDefinitionKey";
      }
        | null;
     processInstanceKey:   | {
      [key: number]: string;
        __brand: "ProcessInstanceKey";
      }
        | null;
     relatedEntityKey:   | {
      [key: number]: string;
        __brand: "AuditLogEntityKey";
      }
        | null;
     relatedEntityType:   | AuditLogEntityTypeEnum
        | null;
     resourceKey:   | {
      [key: number]: string;
        __brand: "ProcessDefinitionKey";
      }
        | {
      [key: number]: string;
        __brand: "DecisionRequirementsKey";
      }
        | {
      [key: number]: string;
        __brand: "DecisionDefinitionKey";
      }
        | {
      [key: number]: string;
        __brand: "FormKey";
      }
        | null;
     result: AuditLogResultEnum;
     rootProcessInstanceKey:   | {
      [key: number]: string;
        __brand: "ProcessInstanceKey";
      }
        | null;
     tenantId:   | {
      [key: number]: string;
        __brand: "TenantId";
      }
        | null;
     timestamp: string;
     userTaskKey:   | {
      [key: number]: string;
        __brand: "UserTaskKey";
      }
        | null;
  }>;
  getAuthentication(...a): CancelablePromise<{
     authorizedComponents: string[];
     c8Links: {
      [key: string]: string;
     };
     canLogout: boolean;
     displayName: string | null;
     email: string | null;
     groups: string[];
     roles: string[];
     salesPlanType: string | null;
     tenants: object[];
     username: string;
  }>;
  getAuthHeaders(...a): Promise<{
   [key: string]: string;
  }>;
  getAuthorization(...a): CancelablePromise<{
     authorizationKey: string;
     ownerId: string;
     ownerType: OwnerTypeEnum;
     permissionTypes: PermissionTypeEnum[];
     resourceId: string | null;
     resourcePropertyName: string | null;
     resourceType: ResourceTypeEnum;
  }>;
  getBackpressureState(...a):
     | {
     backoffMs: number;
     consecutive: number;
     permitsCurrent: number;
     permitsMax: number | null;
     severity: BackpressureSeverity;
     waiters: number;
   }
     | {
     consecutive: number;
     permitsCurrent: number;
     permitsMax: null;
     severity: string;
     waiters: number;
  };
  getBatchOperation(...a): CancelablePromise<{
     actorId: string | null;
     actorType:   | AuditLogActorTypeEnum
        | null;
     batchOperationKey: string;
     batchOperationType:   | BatchOperationTypeEnum
        | null;
     endDate: string | null;
     errors: object[];
     operationsCompletedCount: number;
     operationsFailedCount: number;
     operationsTotalCount: number;
     startDate: string | null;
     state: BatchOperationStateEnum;
  }>;
  getClusterExportingStatus(...a): CancelablePromise<{
     status: ExportingStatusCode;
  }>;
  getClusterRebalance(...a): CancelablePromise<{
     lastCompletedRebalance:   | {
        finishedAt: string;
        partitions: object[];
        rebalanceId: number;
        result: "COMPLETED" | "FAILED" | "CANCELLED";
        startedAt: string;
      }
        | null;
     partitions: object[];
     runningRebalance:   | {
        cancelRequested: boolean;
        dryRun: boolean;
        partitions: object[];
        rebalanceId: number;
        startedAt: string;
      }
        | null;
     state: "BALANCED" | "BALANCING" | "UNBALANCED";
  }>;
  getClusterStatus(...a): CancelablePromise<{
     status: "HEALTHY" | "DEGRADED" | "DOWN";
  }>;
  getClusterTopology(...a): CancelablePromise<{
     brokers: object[];
     clusterId: string | null;
     clusterSize: number;
     gatewayVersion: string | null;
     physicalTenants: object[];
  }>;
  getClusterUpgradeStatus(...a): CancelablePromise<{
     status: "UNKNOWN" | "MIGRATED" | "MIGRATION_IN_PROGRESS";
  }>;
  getConfig(...a): {
     __raw: {
      [key: string]: string | undefined;
     };
     auth: {
        basic?: {
           password?: string;
           username?: string;
        };
        strategy: AuthStrategy;
     };
     backpressure: {
        decayQuietMs: number;
        enabled: boolean;
        floor: number;
        healthyRecoveryMultiplier: number;
        initialMax: number;
        maxWaiters: number;
        observeOnly: boolean;
        profile: string;
        recoveryIntervalMs: number;
        recoveryStep: number;
        severeFactor: number;
        severeThreshold: number;
        softFactor: number;
        unlimitedAfterHealthyMs: number;
     };
     defaultTenantId: string;
     eventual?: {
        pollDefaultMs: number;
     };
     httpRetry: {
        baseDelayMs: number;
        maxAttempts: number;
        maxDelayMs: number;
     };
     logLevel: "trace" | "error" | "silent" | "warn" | "info" | "debug";
     mtls?: {
        ca?: string;
        caPath?: string;
        cert?: string;
        certPath?: string;
        key?: string;
        keyPassphrase?: string;
        keyPath?: string;
     };
     oauth: {
        cacheDir?: string;
        clientId?: string;
        clientSecret?: string;
        grantType: string;
        oauthUrl: string;
        retry: {
           baseDelayMs: number;
           max: number;
        };
        scope?: string;
        timeoutMs: number;
     };
     restAddress: string;
     supportLog?: {
        enabled: boolean;
        filePath: string;
     };
     telemetry?: {
        correlation: boolean;
        log: boolean;
     };
     tokenAudience: string;
     validation: {
        raw: string;
        req: ValidationMode;
        res: ValidationMode;
     };
     workerDefaults?: {
        jobTimeoutMs?: number;
        maxParallelJobs?: number;
        pollTimeoutMs?: number;
        startupJitterMaxSeconds?: number;
        workerName?: string;
     };
  };
  getDecisionDefinition(...a): CancelablePromise<{
     decisionDefinitionId: string;
     decisionDefinitionKey: string;
     decisionRequirementsId: string;
     decisionRequirementsKey: string;
     decisionRequirementsName: string;
     decisionRequirementsVersion: number;
     name: string;
     tenantId: string;
     version: number;
  }>;
  getDecisionDefinitionXml(...a): CancelablePromise<string>;
  getDecisionInstance(...a): CancelablePromise<{
     businessId:   | {
      [key: number]: string;
        __brand: "BusinessId";
      }
        | null;
     decisionDefinitionId: string;
     decisionDefinitionKey: string;
     decisionDefinitionName: string;
     decisionDefinitionType: DecisionDefinitionTypeEnum;
     decisionDefinitionVersion: number;
     decisionEvaluationInstanceKey: string;
     decisionEvaluationKey: string;
     elementInstanceKey:   | {
      [key: number]: string;
        __brand: "ElementInstanceKey";
      }
        | null;
     evaluatedInputs: object[];
     evaluationDate: string;
     evaluationFailure: string | null;
     matchedRules: object[];
     processDefinitionKey:   | {
      [key: number]: string;
        __brand: "ProcessDefinitionKey";
      }
        | null;
     processInstanceKey:   | {
      [key: number]: string;
        __brand: "ProcessInstanceKey";
      }
        | null;
     result: string;
     rootDecisionDefinitionKey: string;
     rootProcessInstanceKey:   | {
      [key: number]: string;
        __brand: "ProcessInstanceKey";
      }
        | null;
     state: DecisionInstanceStateEnum;
     tenantId: string;
  }>;
  getDecisionRequirements(...a): CancelablePromise<{
     decisionRequirementsId: string;
     decisionRequirementsKey: string;
     decisionRequirementsName: string;
     resourceName: string;
     tenantId: string;
     version: number;
  }>;
  getDecisionRequirementsXml(...a): CancelablePromise<string>;
  getDocument(...a): CancelablePromise<{
  }>;
  getElementInstance(...a): CancelablePromise<{
     elementId: string;
     elementInstanceKey: string;
     elementName: string;
     endDate: string | null;
     hasIncident: boolean;
     incidentKey:   | {
      [key: number]: string;
        __brand: "IncidentKey";
      }
        | null;
     processDefinitionId:   | {
      [key: number]: string;
        __brand: "ProcessDefinitionId";
      }
        | null;
     processDefinitionKey:   | {
      [key: number]: string;
        __brand: "ProcessDefinitionKey";
      }
        | null;
     processInstanceKey: string;
     rootProcessInstanceKey:   | {
      [key: number]: string;
        __brand: "ProcessInstanceKey";
      }
        | null;
     startDate: string;
     state: ElementInstanceStateEnum;
     tenantId: string;
     type:   | "UNKNOWN"
        | "USER_TASK"
        | "UNSPECIFIED"
        | "PROCESS"
        | "SUB_PROCESS"
        | "EVENT_SUB_PROCESS"
        | "AD_HOC_SUB_PROCESS"
        | "AD_HOC_SUB_PROCESS_INNER_INSTANCE"
        | "START_EVENT"
        | "INTERMEDIATE_CATCH_EVENT"
        | "INTERMEDIATE_THROW_EVENT"
        | "BOUNDARY_EVENT"
        | "END_EVENT"
        | "SERVICE_TASK"
        | "RECEIVE_TASK"
        | "MANUAL_TASK"
        | "TASK"
        | "EXCLUSIVE_GATEWAY"
        | "INCLUSIVE_GATEWAY"
        | "PARALLEL_GATEWAY"
        | "EVENT_BASED_GATEWAY"
        | "SEQUENCE_FLOW"
        | "MULTI_INSTANCE_BODY"
        | "CALL_ACTIVITY"
        | "BUSINESS_RULE_TASK"
        | "SCRIPT_TASK"
        | "SEND_TASK";
  }>;
  getErrorMode(...a): "throw" | "result";
  getExportingStatus(...a): CancelablePromise<{
     status: ExportingStatusCode;
  }>;
  getFormByKey(...a): CancelablePromise<{
     formId: string;
     formKey: string;
     schema: string;
     tenantId: string;
     version: number;
  }>;
  getGlobalClusterVariable(...a): CancelablePromise<{
     kind: ClusterVariableKindEnum;
     metadata: {
      [key: string]: string | number;
     };
     name: string;
     scope: ClusterVariableScopeEnum;
     tenantId: string | null;
     value: string;
  }>;
  getGlobalJobStatistics(...a): CancelablePromise<{
     completed: {
        count: number;
        lastUpdatedAt: string | null;
     };
     created: {
        count: number;
        lastUpdatedAt: string | null;
     };
     failed: {
        count: number;
        lastUpdatedAt: string | null;
     };
     isIncomplete: boolean;
  }>;
  getGlobalTaskListener(...a): CancelablePromise<{
     afterNonGlobal?: boolean;
     eventTypes: GlobalTaskListenerEventTypeEnum[];
     id: string;
     priority?: number;
     retries?: number;
     source: GlobalListenerSourceEnum;
     type?: string;
  }>;
  getGroup(...a): CancelablePromise<{
     description: string | null;
     groupId: string;
     name: string;
  }>;
  getHistoryBackup(...a): CancelablePromise<{
     backupId: number;
     details: object[];
     failureReason: string | null;
     state: HistoryBackupStateCode;
  }>;
  getHistoryBackupAsClusterAdmin(...a): CancelablePromise<{
     backupId: number;
     physicalTenants: object[];
  }>;
  getIncident(...a): CancelablePromise<{
     creationTime: string;
     elementId: string;
     elementInstanceKey: string;
     errorMessage: string;
     errorType: IncidentErrorTypeEnum;
     incidentKey: string;
     jobKey:   | {
      [key: number]: string;
        __brand: "JobKey";
      }
        | null;
     processDefinitionId: string;
     processDefinitionKey: string;
     processInstanceKey: string;
     rootProcessInstanceKey:   | {
      [key: number]: string;
        __brand: "ProcessInstanceKey";
      }
        | null;
     state: IncidentStateEnum;
     tenantId: string;
  }>;
  getJobErrorStatistics(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  getJobTimeSeriesStatistics(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  getJobTypeStatistics(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  getJobWorkerStatistics(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  getLicense(...a): CancelablePromise<{
     expiresAt: string | null;
     isCommercial: boolean;
     licenseType: string;
     validLicense: boolean;
  }>;
  getMappingRule(...a): CancelablePromise<{
     claimName: string;
     claimValue: string;
     mappingRuleId: string;
     name: string;
  }>;
  getProcessDefinition(...a): CancelablePromise<{
     hasStartForm: boolean;
     name: string | null;
     processDefinitionId: string;
     processDefinitionKey: string;
     resourceName: string;
     state: "ACTIVE" | "DRAINING" | "DELETED";
     tenantId: string;
     version: number;
     versionTag: string | null;
  }>;
  getProcessDefinitionInstanceStatistics(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  getProcessDefinitionInstanceVersionStatistics(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  getProcessDefinitionMessageSubscriptionStatistics(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  getProcessDefinitionStatistics(...a): CancelablePromise<{
     items: object[];
  }>;
  getProcessDefinitionXml(...a): CancelablePromise<string>;
  getProcessInstance(...a): CancelablePromise<{
     businessId:   | {
      [key: number]: string;
        __brand: "BusinessId";
      }
        | null;
     endDate: string | null;
     hasIncident: boolean;
     parentElementInstanceKey:   | {
      [key: number]: string;
        __brand: "ElementInstanceKey";
      }
        | null;
     parentProcessInstanceKey:   | {
      [key: number]: string;
        __brand: "ProcessInstanceKey";
      }
        | null;
     processDefinitionId: string;
     processDefinitionKey: string;
     processDefinitionName: string | null;
     processDefinitionVersion: number;
     processDefinitionVersionTag: string | null;
     processInstanceKey: string;
     rootProcessInstanceKey:   | {
      [key: number]: string;
        __brand: "ProcessInstanceKey";
      }
        | null;
     startDate: string;
     state: ProcessInstanceStateEnum;
     suspendedDate: string | null;
     tags: string[];
     tenantId: string;
  }>;
  getProcessInstanceCallHierarchy(...a): CancelablePromise<object[]>;
  getProcessInstanceSequenceFlows(...a): CancelablePromise<{
     items: object[];
  }>;
  getProcessInstanceStatistics(...a): CancelablePromise<{
     items: object[];
  }>;
  getProcessInstanceStatisticsByDefinition(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  getProcessInstanceStatisticsByError(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  getProcessInstanceWaitStateStatistics(...a): CancelablePromise<{
     items: object[];
  }>;
  getResource(...a): CancelablePromise<{
     resourceId: string;
     resourceKey: string;
     resourceName: string;
     tenantId: string;
     version: number;
     versionTag: string | null;
  }>;
  getResourceContent(...a): CancelablePromise<{
   [key: string]: unknown;
  }>;
  getResourceContentBinary(...a): CancelablePromise<{
  }>;
  getRestoreStatus(...a): CancelablePromise<{
     brokers: object[];
     changeId: string;
     startedAt: string | null;
     status: "COMPLETED" | "FAILED" | "IN_PROGRESS" | "CANCELLED";
  }>;
  getRole(...a): CancelablePromise<{
     description: string | null;
     name: string;
     roleId: string;
  }>;
  getRuntimeBackup(...a): CancelablePromise<{
     backupId: number;
     details: object[];
     failureReason: string | null;
     state: StateCode;
  }>;
  getRuntimeBackupAsClusterAdmin(...a): CancelablePromise<{
     backupId: number;
     failureReason: string | null;
     physicalTenants: object[];
     state: StateCode;
  }>;
  getRuntimeBackupState(...a): CancelablePromise<{
     backupStates: object[];
     checkpointStates: object[];
     ranges: object[];
  }>;
  getRuntimeBackupStateAsClusterAdmin(...a): CancelablePromise<{
     physicalTenants: object[];
  }>;
  getStartProcessForm(...a): CancelablePromise<
     | void
     | {
     formId: string;
     formKey: string;
     schema: string;
     tenantId: string;
     version: number;
  }>;
  getStatus(...a): CancelablePromise<void>;
  getSystemConfiguration(...a): CancelablePromise<{
     authentication: {
        canLogout: boolean;
        isCamundaGroupsEnabled: boolean;
        isLoginDelegated: boolean;
     };
     cloud: {
        stage: CloudStage | null;
     };
     components: {
        active: WebappComponent[];
     };
     deployment: {
        isMultiTenancyEnabled: boolean;
        isTenantsApiEnabled: boolean;
        maxRequestSize: number;
     };
     jobMetrics: {
        enabled: boolean;
        exportInterval: string;
        maxJobTypeLength: number;
        maxTenantIdLength: number;
        maxUniqueKeys: number;
        maxWorkerNameLength: number;
     };
  }>;
  getTenant(...a): CancelablePromise<{
     description: string | null;
     name: string;
     tenantId: string;
  }>;
  getTenantClusterVariable(...a): CancelablePromise<{
     kind: ClusterVariableKindEnum;
     metadata: {
      [key: string]: string | number;
     };
     name: string;
     scope: ClusterVariableScopeEnum;
     tenantId: string | null;
     value: string;
  }>;
  getTopology(...a): CancelablePromise<{
     brokers: object[];
     clusterId: string | null;
     clusterSize: number;
     gatewayVersion: string;
     lastCompletedChangeId: string;
     partitionsCount: number;
     replicationFactor: number;
  }>;
  getUsageMetrics(...a): CancelablePromise<{
     activeTenants: number;
     assignees: number;
     decisionInstances: number;
     processInstances: number;
     tenants: {
      [key: string]: object;
     };
  }>;
  getUser(...a): CancelablePromise<{
     email: string | null;
     name: string | null;
     username: string;
  }>;
  getUserTask(...a): CancelablePromise<{
     assignee: string | null;
     businessId:   | {
      [key: number]: string;
        __brand: "BusinessId";
      }
        | null;
     candidateGroups: string[];
     candidateUsers: string[];
     completionDate: string | null;
     creationDate: string;
     customHeaders: {
      [key: string]: string;
     };
     dueDate: string | null;
     elementId: string;
     elementInstanceKey: string;
     externalFormReference: string | null;
     followUpDate: string | null;
     formKey:   | {
      [key: number]: string;
        __brand: "FormKey";
      }
        | null;
     isSuspended: boolean;
     name: string | null;
     priority: number;
     processDefinitionId: string;
     processDefinitionKey: string;
     processDefinitionVersion: number;
     processInstanceKey: string;
     processName: string | null;
     rootProcessInstanceKey:   | {
      [key: number]: string;
        __brand: "ProcessInstanceKey";
      }
        | null;
     state: UserTaskStateEnum;
     tags: string[];
     tenantId: string;
     userTaskKey: string;
  }>;
  getUserTaskForm(...a): CancelablePromise<
     | void
     | {
     formId: string;
     formKey: string;
     schema: string;
     tenantId: string;
     version: number;
  }>;
  getVariable(...a): CancelablePromise<{
     name: string;
     processInstanceKey: string;
     rootProcessInstanceKey:   | {
      [key: number]: string;
        __brand: "ProcessInstanceKey";
      }
        | null;
     scopeKey: string;
     tenantId: string;
     value: string;
     variableKey: string;
  }>;
  getWorkers(...a): any[];
  listHistoryBackups(...a): CancelablePromise<object[]>;
  listHistoryBackupsAsClusterAdmin(...a): CancelablePromise<object[]>;
  listRuntimeBackups(...a): CancelablePromise<object[]>;
  listRuntimeBackupsAsClusterAdmin(...a): CancelablePromise<object[]>;
  listSecrets(...a): CancelablePromise<{
     references: string[];
  }>;
  logger(...a): {
     code(...a): void;
     debug(...a): void;
     error(...a): void;
     info(...a): void;
     level(...a): LogLevel;
     scope(...a): { level: () => LogLevel; setLevel: (level: LogLevel) => void; setTransport: (t?: ((e: { level: LogLevel; scope: string; ts: number; args: any[]; code?: string | undefined; data?: any; }) => void) | undefined) => void; ... 7 more ...; code: (level: LogLevel, code: string, msg: string, data?: any) => void; };
     setLevel(...a): void;
     setTransport(...a): void;
     silly(...a): void;
     trace(...a): void;
     warn(...a): void;
  };
  migrateProcessInstance(...a): CancelablePromise<void>;
  migrateProcessInstancesBatchOperation(...a): CancelablePromise<{
     batchOperationKey: string;
     batchOperationType: BatchOperationTypeEnum;
  }>;
  modifyProcessInstance(...a): CancelablePromise<void>;
  modifyProcessInstancesBatchOperation(...a): CancelablePromise<{
     batchOperationKey: string;
     batchOperationType: BatchOperationTypeEnum;
  }>;
  onAuthHeaders(...a): void;
  pauseClusterExporting(...a): CancelablePromise<void>;
  pauseExporting(...a): CancelablePromise<void>;
  pinClock(...a): CancelablePromise<void>;
  publishMessage(...a): CancelablePromise<{
     messageKey: string;
     tenantId: string;
  }>;
  resetClock(...a): CancelablePromise<void>;
  resolveIncident(...a): CancelablePromise<void>;
  resolveIncidentsBatchOperation(...a): CancelablePromise<{
     batchOperationKey: string;
     batchOperationType: BatchOperationTypeEnum;
  }>;
  resolveProcessInstanceIncidents(...a): CancelablePromise<{
     batchOperationKey: string;
     batchOperationType: BatchOperationTypeEnum;
  }>;
  resolveSecrets(...a): CancelablePromise<{
     errors: object[];
     resolved: object[];
  }>;
  restore(...a): CancelablePromise<{
     changeId: string;
     plannedChanges: object[];
  }>;
  restoreAsClusterAdmin(...a): CancelablePromise<{
     changeId: string;
     plannedChanges: object[];
  }>;
  resumeBatchOperation(...a): CancelablePromise<void>;
  resumeClusterExporting(...a): CancelablePromise<void>;
  resumeExporting(...a): CancelablePromise<void>;
  resumeProcessInstance(...a): CancelablePromise<void>;
  resumeProcessInstancesBatchOperation(...a): CancelablePromise<{
     batchOperationKey: string;
     batchOperationType: BatchOperationTypeEnum;
  }>;
  searchAgentDefinitions(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchAgentInstanceHistory(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchAgentInstances(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchAuditLogs(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchAuthorizations(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchBatchOperationItems(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchBatchOperations(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchClientsForGroup(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchClientsForRole(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchClientsForTenant(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchClusterVariables(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchCorrelatedMessageSubscriptions(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchDecisionDefinitions(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchDecisionInstances(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchDecisionRequirements(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchElementInstanceIncidents(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchElementInstances(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchElementInstanceWaitStates(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchGlobalTaskListeners(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchGroupIdsForTenant(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchGroups(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchGroupsForRole(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchIncidents(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchJobs(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchMappingRule(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchMappingRulesForGroup(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchMappingRulesForRole(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchMappingRulesForTenant(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchMessageSubscriptions(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchOwnAuthorizations(...a): CancelablePromise<{
     authorizationsEnabled: boolean;
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchProcessDefinitions(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchProcessDefinitionVariableNames(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchProcessInstanceIncidents(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchProcessInstances(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchResources(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchRoles(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchRolesForGroup(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchRolesForTenant(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchTenants(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchUsers(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchUsersForGroup(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchUsersForRole(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchUsersForTenant(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchUserTaskAuditLogs(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchUserTaskEffectiveVariables(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchUserTasks(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchUserTaskVariables(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchVariables(...a): CancelablePromise<{
     items: object[];
     page: {
        endCursor:   | {
         [key: number]: string;
           __brand: "EndCursor";
         }
           | null;
        hasMoreTotalItems: boolean;
        startCursor:   | {
         [key: number]: string;
           __brand: "StartCursor";
         }
           | null;
        totalItems: number;
     };
  }>;
  searchVariablesAsDto(...a): CancelablePromise<{
     raw: {
      [key: string]: unknown;
     };
     get(...a): unknown;
     has(...a): boolean;
     validate(...a): {
      [key: string]: unknown;
     };
  }>;
  stopAllWorkers(...a): void;
  suspendBatchOperation(...a): CancelablePromise<void>;
  suspendProcessInstance(...a): CancelablePromise<void>;
  suspendProcessInstancesBatchOperation(...a): CancelablePromise<{
     batchOperationKey: string;
     batchOperationType: BatchOperationTypeEnum;
  }>;
  syncRuntimeBackupState(...a): CancelablePromise<{
     backupStates: object[];
     checkpointStates: object[];
     ranges: object[];
  }>;
  syncRuntimeBackupStateAsClusterAdmin(...a): CancelablePromise<{
     physicalTenants: object[];
  }>;
  takeHistoryBackup(...a): CancelablePromise<{
     backupId: number;
     scheduledSnapshots: string[];
  }>;
  takeHistoryBackupAsClusterAdmin(...a): CancelablePromise<{
     backupId: number;
     physicalTenants: object[];
  }>;
  takeRuntimeBackup(...a): CancelablePromise<{
     backupId: number;
  }>;
  takeRuntimeBackupAsClusterAdmin(...a): CancelablePromise<{
     physicalTenants: object[];
  }>;
  throwJobError(...a): CancelablePromise<void>;
  triggerClusterRebalance(...a): CancelablePromise<{
     lastCompletedRebalance:   | {
        finishedAt: string;
        partitions: object[];
        rebalanceId: number;
        result: "COMPLETED" | "FAILED" | "CANCELLED";
        startedAt: string;
      }
        | null;
     partitions: object[];
     runningRebalance:   | {
        cancelRequested: boolean;
        dryRun: boolean;
        partitions: object[];
        rebalanceId: number;
        startedAt: string;
      }
        | null;
     state: "BALANCED" | "BALANCING" | "UNBALANCED";
  }>;
  unassignClientFromGroup(...a): CancelablePromise<void>;
  unassignClientFromTenant(...a): CancelablePromise<void>;
  unassignGroupFromTenant(...a): CancelablePromise<void>;
  unassignMappingRuleFromGroup(...a): CancelablePromise<void>;
  unassignMappingRuleFromTenant(...a): CancelablePromise<void>;
  unassignRoleFromClient(...a): CancelablePromise<void>;
  unassignRoleFromGroup(...a): CancelablePromise<void>;
  unassignRoleFromMappingRule(...a): CancelablePromise<void>;
  unassignRoleFromTenant(...a): CancelablePromise<void>;
  unassignRoleFromUser(...a): CancelablePromise<void>;
  unassignUserFromGroup(...a): CancelablePromise<void>;
  unassignUserFromTenant(...a): CancelablePromise<void>;
  unassignUserTask(...a): CancelablePromise<void>;
  updateAgentInstance(...a): CancelablePromise<{
     createdHistory: object[];
  }>;
  updateAuthorization(...a): CancelablePromise<void>;
  updateGlobalClusterVariable(...a): CancelablePromise<{
     kind: ClusterVariableKindEnum;
     metadata: {
      [key: string]: string | number;
     };
     name: string;
     scope: ClusterVariableScopeEnum;
     tenantId: string | null;
     value: string;
  }>;
  updateGlobalTaskListener(...a): CancelablePromise<{
     afterNonGlobal?: boolean;
     eventTypes: GlobalTaskListenerEventTypeEnum[];
     id: string;
     priority?: number;
     retries?: number;
     source: GlobalListenerSourceEnum;
     type?: string;
  }>;
  updateGroup(...a): CancelablePromise<{
     description: string | null;
     groupId: string;
     name: string;
  }>;
  updateJob(...a): CancelablePromise<void>;
  updateJobsBatchOperation(...a): CancelablePromise<{
     batchOperationKey: string;
     batchOperationType: BatchOperationTypeEnum;
  }>;
  updateMappingRule(...a): CancelablePromise<{
     claimName: string;
     claimValue: string;
     mappingRuleId: string;
     name: string;
  }>;
  updateRole(...a): CancelablePromise<{
     description: string | null;
     name: string;
     roleId: string;
  }>;
  updateTenant(...a): CancelablePromise<{
     description: string | null;
     name: string;
     tenantId: string;
  }>;
  updateTenantClusterVariable(...a): CancelablePromise<{
     kind: ClusterVariableKindEnum;
     metadata: {
      [key: string]: string | number;
     };
     name: string;
     scope: ClusterVariableScopeEnum;
     tenantId: string | null;
     value: string;
  }>;
  updateUser(...a): CancelablePromise<{
     email: string | null;
     name: string | null;
     username: string;
  }>;
  updateUserTask(...a): CancelablePromise<void>;
  withCorrelation(...a): Promise<unknown>;
}>;
```

Create a client where all branded key types are widened to string.
Use when integrating with external systems or when dynamic string keys are common and brand friction is unwanted.
For maximum type safety prefer the strict createCamundaClient.

`Loose<T>` rebuilds callable types and drops properties attached to them, which
would strip the `.paginate` methods installed on every `search*` operation. We
re-apply `WithSearchPagination` on top of the loosened client so loose clients
keep `.paginate` in their static type (recomputed from the loosened search
signatures), matching the runtime wrappers the constructor installs.

## Parameters

### args

...\[`options?`: [`CamundaOptions`](../interfaces/CamundaOptions.md)\]

## Returns

[`WithSearchPagination`](../type-aliases/WithSearchPagination.md)\<\{
`clock`: \{
`deadline`(...`a`): \{
`dispose`: (...`a`) => `void`;
`signal`: \{
\};
\};
`now`(...`a`): `number`;
`sleep`(...`a`): `Promise`\<`void`\>;
\};
`config`: \{
`__raw`: \{
\[`key`: `string`\]: `string` \| `undefined`;
\};
`auth`: \{
`basic?`: \{
`password?`: `string`;
`username?`: `string`;
\};
`strategy`: [`AuthStrategy`](../type-aliases/AuthStrategy.md);
\};
`backpressure`: \{
`decayQuietMs`: `number`;
`enabled`: `boolean`;
`floor`: `number`;
`healthyRecoveryMultiplier`: `number`;
`initialMax`: `number`;
`maxWaiters`: `number`;
`observeOnly`: `boolean`;
`profile`: `string`;
`recoveryIntervalMs`: `number`;
`recoveryStep`: `number`;
`severeFactor`: `number`;
`severeThreshold`: `number`;
`softFactor`: `number`;
`unlimitedAfterHealthyMs`: `number`;
\};
`defaultTenantId`: `string`;
`eventual?`: \{
`pollDefaultMs`: `number`;
\};
`httpRetry`: \{
`baseDelayMs`: `number`;
`maxAttempts`: `number`;
`maxDelayMs`: `number`;
\};
`logLevel`: `"trace"` \| `"error"` \| `"silent"` \| `"warn"` \| `"info"` \| `"debug"`;
`mtls?`: \{
`ca?`: `string`;
`caPath?`: `string`;
`cert?`: `string`;
`certPath?`: `string`;
`key?`: `string`;
`keyPassphrase?`: `string`;
`keyPath?`: `string`;
\};
`oauth`: \{
`cacheDir?`: `string`;
`clientId?`: `string`;
`clientSecret?`: `string`;
`grantType`: `string`;
`oauthUrl`: `string`;
`retry`: \{
`baseDelayMs`: `number`;
`max`: `number`;
\};
`scope?`: `string`;
`timeoutMs`: `number`;
\};
`restAddress`: `string`;
`supportLog?`: \{
`enabled`: `boolean`;
`filePath`: `string`;
\};
`telemetry?`: \{
`correlation`: `boolean`;
`log`: `boolean`;
\};
`tokenAudience`: `string`;
`validation`: \{
`raw`: `string`;
`req`: [`ValidationMode`](../type-aliases/ValidationMode.md);
`res`: [`ValidationMode`](../type-aliases/ValidationMode.md);
\};
`workerDefaults?`: \{
`jobTimeoutMs?`: `number`;
`maxParallelJobs?`: `number`;
`pollTimeoutMs?`: `number`;
`startupJitterMaxSeconds?`: `number`;
`workerName?`: `string`;
\};
\};
`random`: \{
`next`(...`a`): `number`;
\};
`_getSupportLogger`(...`a`): \{
`log`(...`a`): `void`;
\};
`_invokeWithRetry`(...`a`): `Promise`\<`unknown`\>;
`activateAdHocSubProcessActivities`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`activateJobs`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`jobs`: `object`[];
\}\>;
`assignClientToGroup`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignClientToTenant`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignGroupToTenant`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignMappingRuleToGroup`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignMappingRuleToTenant`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignProcessInstanceBusinessId`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignRoleToClient`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignRoleToGroup`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignRoleToMappingRule`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignRoleToTenant`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignRoleToUser`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignUserTask`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignUserToGroup`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignUserToTenant`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`broadcastSignal`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`signalKey`: `string`;
`tenantId`: `string`;
\}\>;
`cancelBatchOperation`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`cancelClusterRebalance`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`wasRunning`: `boolean`;
\}\>;
`cancelProcessInstance`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`cancelProcessInstancesBatchOperation`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>;
`changeClusterMode`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`changeId`: `string`;
`plannedChanges`: `object`[];
\}\>;
`changeClusterModeAsClusterAdmin`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`changeId`: `string`;
`plannedChanges`: `object`[];
\}\>;
`clearAuthCache`(...`a`): `void`;
`completeJob`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`completeUserTask`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`configure`(...`a`): `void`;
`correlateMessage`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`messageKey`: `string`;
`processInstanceKey`: `string`;
`tenantId`: `string`;
\}\>;
`createAdminUser`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`email`: `string` \| `null`;
`name`: `string` \| `null`;
`username`: `string`;
\}\>;
`createAgentInstance`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`agentInstanceKey`: `string`;
`createdHistory`: `object`[];
\}\>;
`createAuthorization`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`authorizationKey`: `string`;
\}\>;
`createDeployment`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`decisionRequirements`: `object`[];
`decisions`: `object`[];
`deploymentKey`: `string`;
`deployments`: `object`[];
`forms`: `object`[];
`processes`: `object`[];
`resources`: `object`[];
`tenantId`: `string`;
\}\>;
`createDocument`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`camunda.document.type`: `"camunda"`;
`contentHash`: `string` \| `null`;
`documentId`: `string`;
`metadata`: \{
`contentType`: `string`;
`customProperties`: \{
\[`key`: `string`\]: `unknown`;
\};
`expiresAt`: `string` \| `null`;
`fileName`: `string`;
`processDefinitionId`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessDefinitionId"`;
\}
\| `null`;
`processInstanceKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\}
\| `null`;
`size`: `number`;
\};
`storeId`: `string`;
\}\>;
`createDocumentLink`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`expiresAt`: `string`;
`url`: `string`;
\}\>;
`createDocuments`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`createdDocuments`: `object`[];
`failedDocuments`: `object`[];
\}\>;
`createElementInstanceVariables`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`createGlobalClusterVariable`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`kind`: [`ClusterVariableKindEnum`](../type-aliases/ClusterVariableKindEnum.md);
`metadata`: \{
\[`key`: `string`\]: `string` \| `number`;
\};
`name`: `string`;
`scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
`tenantId`: `string` \| `null`;
`value`: `string`;
\}\>;
`createGlobalTaskListener`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`afterNonGlobal?`: `boolean`;
`eventTypes`: [`GlobalTaskListenerEventTypeEnum`](../type-aliases/GlobalTaskListenerEventTypeEnum.md)[];
`id`: `string`;
`priority?`: `number`;
`retries?`: `number`;
`source`: [`GlobalListenerSourceEnum`](../type-aliases/GlobalListenerSourceEnum.md);
`type?`: `string`;
\}\>;
`createGroup`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description`: `string` \| `null`;
`groupId`: `string`;
`name`: `string`;
\}\>;
`createJobWorker`(...`a`): \{
`activeJobs`: `number`;
`name`: `string`;
`stopped`: `boolean`;
`start`(...`a`): `void`;
`stop`(...`a`): `void`;
`stopGracefully`(...`a`): `Promise`\<\{
`remainingJobs`: `number`;
`timedOut`: `boolean`;
\}\>;
\};
`createMappingRule`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`claimName`: `string`;
`claimValue`: `string`;
`mappingRuleId`: `string`;
`name`: `string`;
\}\>;
`createProcessInstance`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`businessId`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"BusinessId"`;
\}
\| `null`;
`processDefinitionId`: `string`;
`processDefinitionKey`: `string`;
`processDefinitionVersion`: `number`;
`processInstanceKey`: `string`;
`tags`: `string`[];
`tenantId`: `string`;
`variables`: \{
\[`key`: `string`\]: `unknown`;
\};
\}\>;
`createRole`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description`: `string` \| `null`;
`name`: `string`;
`roleId`: `string`;
\}\>;
`createTenant`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description`: `string` \| `null`;
`name`: `string`;
`tenantId`: `string`;
\}\>;
`createTenantClusterVariable`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`kind`: [`ClusterVariableKindEnum`](../type-aliases/ClusterVariableKindEnum.md);
`metadata`: \{
\[`key`: `string`\]: `string` \| `number`;
\};
`name`: `string`;
`scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
`tenantId`: `string` \| `null`;
`value`: `string`;
\}\>;
`createThreadedJobWorker`(...`a`): \{
`activeJobs`: `number`;
`busyThreads`: `number`;
`name`: `string`;
`poolSize`: `number`;
`ready`: `Promise`\<`void`\>;
`stopped`: `boolean`;
`start`(...`a`): `void`;
`stop`(...`a`): `void`;
`stopGracefully`(...`a`): `Promise`\<\{
`remainingJobs`: `number`;
`timedOut`: `boolean`;
\}\>;
\};
`createUser`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`email`: `string` \| `null`;
`name`: `string` \| `null`;
`username`: `string`;
\}\>;
`deleteAuthorization`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteDecisionInstance`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteDecisionInstancesBatchOperation`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>;
`deleteDocument`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteGlobalClusterVariable`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteGlobalTaskListener`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteGroup`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteHistoryBackup`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteHistoryBackupAsClusterAdmin`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteMappingRule`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteProcessInstance`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteProcessInstancesBatchOperation`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>;
`deleteResource`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperation`: \| \{
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}
\| `null`;
`resourceKey`: `string`;
\}\>;
`deleteRole`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteRuntimeBackup`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteRuntimeBackupAsClusterAdmin`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteRuntimeBackupState`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteRuntimeBackupStateAsClusterAdmin`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteTenant`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteTenantClusterVariable`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteUser`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deployResourcesFromFiles`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`decisionRequirements`: `object`[];
`decisions`: `object`[];
`deploymentKey`: `string`;
`deployments`: `object`[];
`forms`: `object`[];
`processes`: `object`[];
`resources`: `object`[];
`tenantId`: `string`;
\}\>;
`emitSupportLogPreamble`(...`a`): `void`;
`evaluateConditionals`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`conditionalEvaluationKey`: `string`;
`processInstances`: `object`[];
`tenantId`: `string`;
\}\>;
`evaluateDecision`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`decisionDefinitionId`: `string`;
`decisionDefinitionKey`: `string`;
`decisionDefinitionName`: `string`;
`decisionDefinitionVersion`: `number`;
`decisionEvaluationKey`: `string`;
`decisionInstanceKey`: `string`;
`decisionRequirementsId`: `string`;
`decisionRequirementsKey`: `string`;
`evaluatedDecisions`: `object`[];
`failedDecisionDefinitionId`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"DecisionDefinitionId"`;
\}
\| `null`;
`failureMessage`: `string` \| `null`;
`output`: `string`;
`tenantId`: `string`;
\}\>;
`evaluateExpression`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`expression`: `string`;
`referencedSecrets`: `object`[];
`result`: `unknown`;
`warnings`: `object`[];
\}\>;
`failJob`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`forceAuthRefresh`(...`a`): `Promise`\<`string` \| `undefined`\>;
`getAgentDefinition`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`agentDefinitionKey`: `string`;
`agentType`: [`AgentDefinitionTypeEnum`](../type-aliases/AgentDefinitionTypeEnum.md);
`elementId`: `string`;
`name`: `string`;
`processDefinitionId`: `string`;
`processDefinitionKey`: `string`;
`processDefinitionVersion`: `number`;
`processDefinitionVersionTag`: `string` \| `null`;
`tenantId`: `string`;
\}\>;
`getAgentInstance`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`agentDefinitionKey`: `string`;
`agentInstanceKey`: `string`;
`completionDate`: `string` \| `null`;
`creationDate`: `string`;
`definition`: \{
`model`: `string`;
`provider`: `string`;
`systemPrompt`: (
\| \{
`contentType`: `"TEXT"`;
`text`: `string`;
\}
\| \{
`contentType`: `"DOCUMENT"`;
`documentReference`: \{
`camunda.document.type`: `"camunda"`;
`contentHash`: `string` \| `null`;
`documentId`: `string`;
`metadata`: \{
`contentType`: `string`;
`customProperties`: \{
\[`key`: ...\]: ...;
\};
`expiresAt`: ... \| ...;
`fileName`: `string`;
`processDefinitionId`: ... \| ...;
`processInstanceKey`: ... \| ...;
`size`: `number`;
\};
`storeId`: `string`;
\};
\}
\| \{
`contentType`: `"OBJECT"`;
`object`: `unknown`;
\})[];
\};
`elementId`: `string`;
`elementInstanceKeys`: `string`[];
`lastUpdatedDate`: `string`;
`limits`: \{
`maxModelCalls`: `number`;
`maxTokens`: `number`;
`maxToolCalls`: `number`;
\};
`metrics`: \{
`cacheCreationTokenCount`: `number`;
`cacheReadTokenCount`: `number`;
`inputTokens`: `number`;
`modelCalls`: `number`;
`outputTokens`: `number`;
`reasoningTokenCount`: `number`;
`toolCalls`: `number`;
\};
`processDefinitionId`: `string`;
`processDefinitionKey`: `string`;
`processDefinitionVersion`: `number`;
`processDefinitionVersionTag`: `string` \| `null`;
`processInstanceKey`: `string`;
`rootProcessInstanceKey`: `string`;
`status`: [`AgentInstanceStatusEnum`](../type-aliases/AgentInstanceStatusEnum.md);
`tenantId`: `string`;
`tools`: `object`[];
\}\>;
`getAuditLog`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`actorId`: `string` \| `null`;
`actorType`: \| [`AuditLogActorTypeEnum`](../type-aliases/AuditLogActorTypeEnum.md)
\| `null`;
`agentElementId`: `string` \| `null`;
`auditLogKey`: `string`;
`batchOperationKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"BatchOperationKey"`;
\}
\| `null`;
`batchOperationType`: \| [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md)
\| `null`;
`category`: [`AuditLogCategoryEnum`](../type-aliases/AuditLogCategoryEnum.md);
`decisionDefinitionId`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"DecisionDefinitionId"`;
\}
\| `null`;
`decisionDefinitionKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"DecisionDefinitionKey"`;
\}
\| `null`;
`decisionEvaluationKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"DecisionEvaluationKey"`;
\}
\| `null`;
`decisionRequirementsId`: `string` \| `null`;
`decisionRequirementsKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"DecisionRequirementsKey"`;
\}
\| `null`;
`deploymentKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"DeploymentKey"`;
\}
\| `null`;
`elementInstanceKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"ElementInstanceKey"`;
\}
\| `null`;
`entityDescription`: `string` \| `null`;
`entityKey`: `string`;
`entityType`: [`AuditLogEntityTypeEnum`](../type-aliases/AuditLogEntityTypeEnum.md);
`formKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"FormKey"`;
\}
\| `null`;
`inboundChannelToolName`: `string` \| `null`;
`inboundChannelType`: `string` \| `null`;
`jobKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"JobKey"`;
\}
\| `null`;
`operationType`: [`AuditLogOperationTypeEnum`](../type-aliases/AuditLogOperationTypeEnum.md);
`processDefinitionId`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessDefinitionId"`;
\}
\| `null`;
`processDefinitionKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessDefinitionKey"`;
\}
\| `null`;
`processInstanceKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\}
\| `null`;
`relatedEntityKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"AuditLogEntityKey"`;
\}
\| `null`;
`relatedEntityType`: \| [`AuditLogEntityTypeEnum`](../type-aliases/AuditLogEntityTypeEnum.md)
\| `null`;
`resourceKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessDefinitionKey"`;
\}
\| \{
\[`key`: `number`\]: `string`;
`__brand`: `"DecisionRequirementsKey"`;
\}
\| \{
\[`key`: `number`\]: `string`;
`__brand`: `"DecisionDefinitionKey"`;
\}
\| \{
\[`key`: `number`\]: `string`;
`__brand`: `"FormKey"`;
\}
\| `null`;
`result`: [`AuditLogResultEnum`](../type-aliases/AuditLogResultEnum.md);
`rootProcessInstanceKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\}
\| `null`;
`tenantId`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"TenantId"`;
\}
\| `null`;
`timestamp`: `string`;
`userTaskKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"UserTaskKey"`;
\}
\| `null`;
\}\>;
`getAuthentication`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`authorizedComponents`: `string`[];
`c8Links`: \{
\[`key`: `string`\]: `string`;
\};
`canLogout`: `boolean`;
`displayName`: `string` \| `null`;
`email`: `string` \| `null`;
`groups`: `string`[];
`roles`: `string`[];
`salesPlanType`: `string` \| `null`;
`tenants`: `object`[];
`username`: `string`;
\}\>;
`getAuthHeaders`(...`a`): `Promise`\<\{
\[`key`: `string`\]: `string`;
\}\>;
`getAuthorization`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`authorizationKey`: `string`;
`ownerId`: `string`;
`ownerType`: [`OwnerTypeEnum`](../type-aliases/OwnerTypeEnum.md);
`permissionTypes`: [`PermissionTypeEnum`](../type-aliases/PermissionTypeEnum.md)[];
`resourceId`: `string` \| `null`;
`resourcePropertyName`: `string` \| `null`;
`resourceType`: [`ResourceTypeEnum`](../type-aliases/ResourceTypeEnum.md);
\}\>;
`getBackpressureState`(...`a`):
\| \{
`backoffMs`: `number`;
`consecutive`: `number`;
`permitsCurrent`: `number`;
`permitsMax`: `number` \| `null`;
`severity`: [`BackpressureSeverity`](../type-aliases/BackpressureSeverity.md);
`waiters`: `number`;
\}
\| \{
`consecutive`: `number`;
`permitsCurrent`: `number`;
`permitsMax`: `null`;
`severity`: `string`;
`waiters`: `number`;
\};
`getBatchOperation`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`actorId`: `string` \| `null`;
`actorType`: \| [`AuditLogActorTypeEnum`](../type-aliases/AuditLogActorTypeEnum.md)
\| `null`;
`batchOperationKey`: `string`;
`batchOperationType`: \| [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md)
\| `null`;
`endDate`: `string` \| `null`;
`errors`: `object`[];
`operationsCompletedCount`: `number`;
`operationsFailedCount`: `number`;
`operationsTotalCount`: `number`;
`startDate`: `string` \| `null`;
`state`: [`BatchOperationStateEnum`](../type-aliases/BatchOperationStateEnum.md);
\}\>;
`getClusterExportingStatus`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`status`: [`ExportingStatusCode`](../type-aliases/ExportingStatusCode.md);
\}\>;
`getClusterRebalance`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`lastCompletedRebalance`: \| \{
`finishedAt`: `string`;
`partitions`: `object`[];
`rebalanceId`: `number`;
`result`: `"COMPLETED"` \| `"FAILED"` \| `"CANCELLED"`;
`startedAt`: `string`;
\}
\| `null`;
`partitions`: `object`[];
`runningRebalance`: \| \{
`cancelRequested`: `boolean`;
`dryRun`: `boolean`;
`partitions`: `object`[];
`rebalanceId`: `number`;
`startedAt`: `string`;
\}
\| `null`;
`state`: `"BALANCED"` \| `"BALANCING"` \| `"UNBALANCED"`;
\}\>;
`getClusterStatus`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`status`: `"HEALTHY"` \| `"DEGRADED"` \| `"DOWN"`;
\}\>;
`getClusterTopology`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`brokers`: `object`[];
`clusterId`: `string` \| `null`;
`clusterSize`: `number`;
`gatewayVersion`: `string` \| `null`;
`physicalTenants`: `object`[];
\}\>;
`getClusterUpgradeStatus`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`status`: `"UNKNOWN"` \| `"MIGRATED"` \| `"MIGRATION_IN_PROGRESS"`;
\}\>;
`getConfig`(...`a`): \{
`__raw`: \{
\[`key`: `string`\]: `string` \| `undefined`;
\};
`auth`: \{
`basic?`: \{
`password?`: `string`;
`username?`: `string`;
\};
`strategy`: [`AuthStrategy`](../type-aliases/AuthStrategy.md);
\};
`backpressure`: \{
`decayQuietMs`: `number`;
`enabled`: `boolean`;
`floor`: `number`;
`healthyRecoveryMultiplier`: `number`;
`initialMax`: `number`;
`maxWaiters`: `number`;
`observeOnly`: `boolean`;
`profile`: `string`;
`recoveryIntervalMs`: `number`;
`recoveryStep`: `number`;
`severeFactor`: `number`;
`severeThreshold`: `number`;
`softFactor`: `number`;
`unlimitedAfterHealthyMs`: `number`;
\};
`defaultTenantId`: `string`;
`eventual?`: \{
`pollDefaultMs`: `number`;
\};
`httpRetry`: \{
`baseDelayMs`: `number`;
`maxAttempts`: `number`;
`maxDelayMs`: `number`;
\};
`logLevel`: `"trace"` \| `"error"` \| `"silent"` \| `"warn"` \| `"info"` \| `"debug"`;
`mtls?`: \{
`ca?`: `string`;
`caPath?`: `string`;
`cert?`: `string`;
`certPath?`: `string`;
`key?`: `string`;
`keyPassphrase?`: `string`;
`keyPath?`: `string`;
\};
`oauth`: \{
`cacheDir?`: `string`;
`clientId?`: `string`;
`clientSecret?`: `string`;
`grantType`: `string`;
`oauthUrl`: `string`;
`retry`: \{
`baseDelayMs`: `number`;
`max`: `number`;
\};
`scope?`: `string`;
`timeoutMs`: `number`;
\};
`restAddress`: `string`;
`supportLog?`: \{
`enabled`: `boolean`;
`filePath`: `string`;
\};
`telemetry?`: \{
`correlation`: `boolean`;
`log`: `boolean`;
\};
`tokenAudience`: `string`;
`validation`: \{
`raw`: `string`;
`req`: [`ValidationMode`](../type-aliases/ValidationMode.md);
`res`: [`ValidationMode`](../type-aliases/ValidationMode.md);
\};
`workerDefaults?`: \{
`jobTimeoutMs?`: `number`;
`maxParallelJobs?`: `number`;
`pollTimeoutMs?`: `number`;
`startupJitterMaxSeconds?`: `number`;
`workerName?`: `string`;
\};
\};
`getDecisionDefinition`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`decisionDefinitionId`: `string`;
`decisionDefinitionKey`: `string`;
`decisionRequirementsId`: `string`;
`decisionRequirementsKey`: `string`;
`decisionRequirementsName`: `string`;
`decisionRequirementsVersion`: `number`;
`name`: `string`;
`tenantId`: `string`;
`version`: `number`;
\}\>;
`getDecisionDefinitionXml`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`string`\>;
`getDecisionInstance`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`businessId`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"BusinessId"`;
\}
\| `null`;
`decisionDefinitionId`: `string`;
`decisionDefinitionKey`: `string`;
`decisionDefinitionName`: `string`;
`decisionDefinitionType`: [`DecisionDefinitionTypeEnum`](../type-aliases/DecisionDefinitionTypeEnum.md);
`decisionDefinitionVersion`: `number`;
`decisionEvaluationInstanceKey`: `string`;
`decisionEvaluationKey`: `string`;
`elementInstanceKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"ElementInstanceKey"`;
\}
\| `null`;
`evaluatedInputs`: `object`[];
`evaluationDate`: `string`;
`evaluationFailure`: `string` \| `null`;
`matchedRules`: `object`[];
`processDefinitionKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessDefinitionKey"`;
\}
\| `null`;
`processInstanceKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\}
\| `null`;
`result`: `string`;
`rootDecisionDefinitionKey`: `string`;
`rootProcessInstanceKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\}
\| `null`;
`state`: [`DecisionInstanceStateEnum`](../type-aliases/DecisionInstanceStateEnum.md);
`tenantId`: `string`;
\}\>;
`getDecisionRequirements`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`decisionRequirementsId`: `string`;
`decisionRequirementsKey`: `string`;
`decisionRequirementsName`: `string`;
`resourceName`: `string`;
`tenantId`: `string`;
`version`: `number`;
\}\>;
`getDecisionRequirementsXml`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`string`\>;
`getDocument`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
\}\>;
`getElementInstance`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`elementId`: `string`;
`elementInstanceKey`: `string`;
`elementName`: `string`;
`endDate`: `string` \| `null`;
`hasIncident`: `boolean`;
`incidentKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"IncidentKey"`;
\}
\| `null`;
`processDefinitionId`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessDefinitionId"`;
\}
\| `null`;
`processDefinitionKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessDefinitionKey"`;
\}
\| `null`;
`processInstanceKey`: `string`;
`rootProcessInstanceKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\}
\| `null`;
`startDate`: `string`;
`state`: [`ElementInstanceStateEnum`](../type-aliases/ElementInstanceStateEnum.md);
`tenantId`: `string`;
`type`: \| `"UNKNOWN"`
\| `"USER_TASK"`
\| `"UNSPECIFIED"`
\| `"PROCESS"`
\| `"SUB_PROCESS"`
\| `"EVENT_SUB_PROCESS"`
\| `"AD_HOC_SUB_PROCESS"`
\| `"AD_HOC_SUB_PROCESS_INNER_INSTANCE"`
\| `"START_EVENT"`
\| `"INTERMEDIATE_CATCH_EVENT"`
\| `"INTERMEDIATE_THROW_EVENT"`
\| `"BOUNDARY_EVENT"`
\| `"END_EVENT"`
\| `"SERVICE_TASK"`
\| `"RECEIVE_TASK"`
\| `"MANUAL_TASK"`
\| `"TASK"`
\| `"EXCLUSIVE_GATEWAY"`
\| `"INCLUSIVE_GATEWAY"`
\| `"PARALLEL_GATEWAY"`
\| `"EVENT_BASED_GATEWAY"`
\| `"SEQUENCE_FLOW"`
\| `"MULTI_INSTANCE_BODY"`
\| `"CALL_ACTIVITY"`
\| `"BUSINESS_RULE_TASK"`
\| `"SCRIPT_TASK"`
\| `"SEND_TASK"`;
\}\>;
`getErrorMode`(...`a`): `"throw"` \| `"result"`;
`getExportingStatus`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`status`: [`ExportingStatusCode`](../type-aliases/ExportingStatusCode.md);
\}\>;
`getFormByKey`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`formId`: `string`;
`formKey`: `string`;
`schema`: `string`;
`tenantId`: `string`;
`version`: `number`;
\}\>;
`getGlobalClusterVariable`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`kind`: [`ClusterVariableKindEnum`](../type-aliases/ClusterVariableKindEnum.md);
`metadata`: \{
\[`key`: `string`\]: `string` \| `number`;
\};
`name`: `string`;
`scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
`tenantId`: `string` \| `null`;
`value`: `string`;
\}\>;
`getGlobalJobStatistics`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`completed`: \{
`count`: `number`;
`lastUpdatedAt`: `string` \| `null`;
\};
`created`: \{
`count`: `number`;
`lastUpdatedAt`: `string` \| `null`;
\};
`failed`: \{
`count`: `number`;
`lastUpdatedAt`: `string` \| `null`;
\};
`isIncomplete`: `boolean`;
\}\>;
`getGlobalTaskListener`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`afterNonGlobal?`: `boolean`;
`eventTypes`: [`GlobalTaskListenerEventTypeEnum`](../type-aliases/GlobalTaskListenerEventTypeEnum.md)[];
`id`: `string`;
`priority?`: `number`;
`retries?`: `number`;
`source`: [`GlobalListenerSourceEnum`](../type-aliases/GlobalListenerSourceEnum.md);
`type?`: `string`;
\}\>;
`getGroup`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description`: `string` \| `null`;
`groupId`: `string`;
`name`: `string`;
\}\>;
`getHistoryBackup`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`backupId`: `number`;
`details`: `object`[];
`failureReason`: `string` \| `null`;
`state`: [`HistoryBackupStateCode`](../type-aliases/HistoryBackupStateCode.md);
\}\>;
`getHistoryBackupAsClusterAdmin`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`backupId`: `number`;
`physicalTenants`: `object`[];
\}\>;
`getIncident`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`creationTime`: `string`;
`elementId`: `string`;
`elementInstanceKey`: `string`;
`errorMessage`: `string`;
`errorType`: [`IncidentErrorTypeEnum`](../type-aliases/IncidentErrorTypeEnum.md);
`incidentKey`: `string`;
`jobKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"JobKey"`;
\}
\| `null`;
`processDefinitionId`: `string`;
`processDefinitionKey`: `string`;
`processInstanceKey`: `string`;
`rootProcessInstanceKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\}
\| `null`;
`state`: [`IncidentStateEnum`](../type-aliases/IncidentStateEnum.md);
`tenantId`: `string`;
\}\>;
`getJobErrorStatistics`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`getJobTimeSeriesStatistics`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`getJobTypeStatistics`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`getJobWorkerStatistics`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`getLicense`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`expiresAt`: `string` \| `null`;
`isCommercial`: `boolean`;
`licenseType`: `string`;
`validLicense`: `boolean`;
\}\>;
`getMappingRule`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`claimName`: `string`;
`claimValue`: `string`;
`mappingRuleId`: `string`;
`name`: `string`;
\}\>;
`getProcessDefinition`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`hasStartForm`: `boolean`;
`name`: `string` \| `null`;
`processDefinitionId`: `string`;
`processDefinitionKey`: `string`;
`resourceName`: `string`;
`state`: `"ACTIVE"` \| `"DRAINING"` \| `"DELETED"`;
`tenantId`: `string`;
`version`: `number`;
`versionTag`: `string` \| `null`;
\}\>;
`getProcessDefinitionInstanceStatistics`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`getProcessDefinitionInstanceVersionStatistics`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`getProcessDefinitionMessageSubscriptionStatistics`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`getProcessDefinitionStatistics`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
\}\>;
`getProcessDefinitionXml`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`string`\>;
`getProcessInstance`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`businessId`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"BusinessId"`;
\}
\| `null`;
`endDate`: `string` \| `null`;
`hasIncident`: `boolean`;
`parentElementInstanceKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"ElementInstanceKey"`;
\}
\| `null`;
`parentProcessInstanceKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\}
\| `null`;
`processDefinitionId`: `string`;
`processDefinitionKey`: `string`;
`processDefinitionName`: `string` \| `null`;
`processDefinitionVersion`: `number`;
`processDefinitionVersionTag`: `string` \| `null`;
`processInstanceKey`: `string`;
`rootProcessInstanceKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\}
\| `null`;
`startDate`: `string`;
`state`: [`ProcessInstanceStateEnum`](../type-aliases/ProcessInstanceStateEnum.md);
`suspendedDate`: `string` \| `null`;
`tags`: `string`[];
`tenantId`: `string`;
\}\>;
`getProcessInstanceCallHierarchy`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`object`[]\>;
`getProcessInstanceSequenceFlows`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
\}\>;
`getProcessInstanceStatistics`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
\}\>;
`getProcessInstanceStatisticsByDefinition`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`getProcessInstanceStatisticsByError`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`getProcessInstanceWaitStateStatistics`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
\}\>;
`getResource`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`resourceId`: `string`;
`resourceKey`: `string`;
`resourceName`: `string`;
`tenantId`: `string`;
`version`: `number`;
`versionTag`: `string` \| `null`;
\}\>;
`getResourceContent`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
\[`key`: `string`\]: `unknown`;
\}\>;
`getResourceContentBinary`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
\}\>;
`getRestoreStatus`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`brokers`: `object`[];
`changeId`: `string`;
`startedAt`: `string` \| `null`;
`status`: `"COMPLETED"` \| `"FAILED"` \| `"IN_PROGRESS"` \| `"CANCELLED"`;
\}\>;
`getRole`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description`: `string` \| `null`;
`name`: `string`;
`roleId`: `string`;
\}\>;
`getRuntimeBackup`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`backupId`: `number`;
`details`: `object`[];
`failureReason`: `string` \| `null`;
`state`: [`StateCode`](../type-aliases/StateCode.md);
\}\>;
`getRuntimeBackupAsClusterAdmin`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`backupId`: `number`;
`failureReason`: `string` \| `null`;
`physicalTenants`: `object`[];
`state`: [`StateCode`](../type-aliases/StateCode.md);
\}\>;
`getRuntimeBackupState`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`backupStates`: `object`[];
`checkpointStates`: `object`[];
`ranges`: `object`[];
\}\>;
`getRuntimeBackupStateAsClusterAdmin`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`physicalTenants`: `object`[];
\}\>;
`getStartProcessForm`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<
\| `void`
\| \{
`formId`: `string`;
`formKey`: `string`;
`schema`: `string`;
`tenantId`: `string`;
`version`: `number`;
\}\>;
`getStatus`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`getSystemConfiguration`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`authentication`: \{
`canLogout`: `boolean`;
`isCamundaGroupsEnabled`: `boolean`;
`isLoginDelegated`: `boolean`;
\};
`cloud`: \{
`stage`: [`CloudStage`](../type-aliases/CloudStage.md) \| `null`;
\};
`components`: \{
`active`: [`WebappComponent`](../type-aliases/WebappComponent.md)[];
\};
`deployment`: \{
`isMultiTenancyEnabled`: `boolean`;
`isTenantsApiEnabled`: `boolean`;
`maxRequestSize`: `number`;
\};
`jobMetrics`: \{
`enabled`: `boolean`;
`exportInterval`: `string`;
`maxJobTypeLength`: `number`;
`maxTenantIdLength`: `number`;
`maxUniqueKeys`: `number`;
`maxWorkerNameLength`: `number`;
\};
\}\>;
`getTenant`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description`: `string` \| `null`;
`name`: `string`;
`tenantId`: `string`;
\}\>;
`getTenantClusterVariable`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`kind`: [`ClusterVariableKindEnum`](../type-aliases/ClusterVariableKindEnum.md);
`metadata`: \{
\[`key`: `string`\]: `string` \| `number`;
\};
`name`: `string`;
`scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
`tenantId`: `string` \| `null`;
`value`: `string`;
\}\>;
`getTopology`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`brokers`: `object`[];
`clusterId`: `string` \| `null`;
`clusterSize`: `number`;
`gatewayVersion`: `string`;
`lastCompletedChangeId`: `string`;
`partitionsCount`: `number`;
`replicationFactor`: `number`;
\}\>;
`getUsageMetrics`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`activeTenants`: `number`;
`assignees`: `number`;
`decisionInstances`: `number`;
`processInstances`: `number`;
`tenants`: \{
\[`key`: `string`\]: `object`;
\};
\}\>;
`getUser`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`email`: `string` \| `null`;
`name`: `string` \| `null`;
`username`: `string`;
\}\>;
`getUserTask`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`assignee`: `string` \| `null`;
`businessId`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"BusinessId"`;
\}
\| `null`;
`candidateGroups`: `string`[];
`candidateUsers`: `string`[];
`completionDate`: `string` \| `null`;
`creationDate`: `string`;
`customHeaders`: \{
\[`key`: `string`\]: `string`;
\};
`dueDate`: `string` \| `null`;
`elementId`: `string`;
`elementInstanceKey`: `string`;
`externalFormReference`: `string` \| `null`;
`followUpDate`: `string` \| `null`;
`formKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"FormKey"`;
\}
\| `null`;
`isSuspended`: `boolean`;
`name`: `string` \| `null`;
`priority`: `number`;
`processDefinitionId`: `string`;
`processDefinitionKey`: `string`;
`processDefinitionVersion`: `number`;
`processInstanceKey`: `string`;
`processName`: `string` \| `null`;
`rootProcessInstanceKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\}
\| `null`;
`state`: [`UserTaskStateEnum`](../type-aliases/UserTaskStateEnum.md);
`tags`: `string`[];
`tenantId`: `string`;
`userTaskKey`: `string`;
\}\>;
`getUserTaskForm`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<
\| `void`
\| \{
`formId`: `string`;
`formKey`: `string`;
`schema`: `string`;
`tenantId`: `string`;
`version`: `number`;
\}\>;
`getVariable`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`name`: `string`;
`processInstanceKey`: `string`;
`rootProcessInstanceKey`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"ProcessInstanceKey"`;
\}
\| `null`;
`scopeKey`: `string`;
`tenantId`: `string`;
`value`: `string`;
`variableKey`: `string`;
\}\>;
`getWorkers`(...`a`): `any`[];
`listHistoryBackups`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`object`[]\>;
`listHistoryBackupsAsClusterAdmin`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`object`[]\>;
`listRuntimeBackups`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`object`[]\>;
`listRuntimeBackupsAsClusterAdmin`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`object`[]\>;
`listSecrets`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`references`: `string`[];
\}\>;
`logger`(...`a`): \{
`code`(...`a`): `void`;
`debug`(...`a`): `void`;
`error`(...`a`): `void`;
`info`(...`a`): `void`;
`level`(...`a`): [`LogLevel`](../../logger/type-aliases/LogLevel.md);
`scope`(...`a`): \{ level: () =\> LogLevel; setLevel: (level: LogLevel) =\> void; setTransport: (t?: ((e: \{ level: LogLevel; scope: string; ts: number; args: any\[\]; code?: string \| undefined; data?: any; \}) =\> void) \| undefined) =\> void; ... 7 more ...; code: (level: LogLevel, code: string, msg: string, data?: any) =\> void; \};
`setLevel`(...`a`): `void`;
`setTransport`(...`a`): `void`;
`silly`(...`a`): `void`;
`trace`(...`a`): `void`;
`warn`(...`a`): `void`;
\};
`migrateProcessInstance`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`migrateProcessInstancesBatchOperation`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>;
`modifyProcessInstance`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`modifyProcessInstancesBatchOperation`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>;
`onAuthHeaders`(...`a`): `void`;
`pauseClusterExporting`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`pauseExporting`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`pinClock`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`publishMessage`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`messageKey`: `string`;
`tenantId`: `string`;
\}\>;
`resetClock`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`resolveIncident`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`resolveIncidentsBatchOperation`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>;
`resolveProcessInstanceIncidents`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>;
`resolveSecrets`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`errors`: `object`[];
`resolved`: `object`[];
\}\>;
`restore`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`changeId`: `string`;
`plannedChanges`: `object`[];
\}\>;
`restoreAsClusterAdmin`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`changeId`: `string`;
`plannedChanges`: `object`[];
\}\>;
`resumeBatchOperation`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`resumeClusterExporting`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`resumeExporting`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`resumeProcessInstance`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`resumeProcessInstancesBatchOperation`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>;
`searchAgentDefinitions`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchAgentInstanceHistory`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchAgentInstances`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchAuditLogs`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchAuthorizations`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchBatchOperationItems`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchBatchOperations`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchClientsForGroup`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchClientsForRole`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchClientsForTenant`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchClusterVariables`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchCorrelatedMessageSubscriptions`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchDecisionDefinitions`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchDecisionInstances`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchDecisionRequirements`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchElementInstanceIncidents`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchElementInstances`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchElementInstanceWaitStates`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchGlobalTaskListeners`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchGroupIdsForTenant`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchGroups`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchGroupsForRole`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchIncidents`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchJobs`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchMappingRule`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchMappingRulesForGroup`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchMappingRulesForRole`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchMappingRulesForTenant`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchMessageSubscriptions`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchOwnAuthorizations`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`authorizationsEnabled`: `boolean`;
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchProcessDefinitions`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchProcessDefinitionVariableNames`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchProcessInstanceIncidents`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchProcessInstances`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchResources`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchRoles`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchRolesForGroup`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchRolesForTenant`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchTenants`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchUsers`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchUsersForGroup`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchUsersForRole`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchUsersForTenant`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchUserTaskAuditLogs`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchUserTaskEffectiveVariables`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchUserTasks`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchUserTaskVariables`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchVariables`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
`page`: \{
`endCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"EndCursor"`;
\}
\| `null`;
`hasMoreTotalItems`: `boolean`;
`startCursor`: \| \{
\[`key`: `number`\]: `string`;
`__brand`: `"StartCursor"`;
\}
\| `null`;
`totalItems`: `number`;
\};
\}\>;
`searchVariablesAsDto`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`raw`: \{
\[`key`: `string`\]: `unknown`;
\};
`get`(...`a`): `unknown`;
`has`(...`a`): `boolean`;
`validate`(...`a`): \{
\[`key`: `string`\]: `unknown`;
\};
\}\>;
`stopAllWorkers`(...`a`): `void`;
`suspendBatchOperation`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`suspendProcessInstance`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`suspendProcessInstancesBatchOperation`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>;
`syncRuntimeBackupState`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`backupStates`: `object`[];
`checkpointStates`: `object`[];
`ranges`: `object`[];
\}\>;
`syncRuntimeBackupStateAsClusterAdmin`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`physicalTenants`: `object`[];
\}\>;
`takeHistoryBackup`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`backupId`: `number`;
`scheduledSnapshots`: `string`[];
\}\>;
`takeHistoryBackupAsClusterAdmin`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`backupId`: `number`;
`physicalTenants`: `object`[];
\}\>;
`takeRuntimeBackup`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`backupId`: `number`;
\}\>;
`takeRuntimeBackupAsClusterAdmin`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`physicalTenants`: `object`[];
\}\>;
`throwJobError`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`triggerClusterRebalance`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`lastCompletedRebalance`: \| \{
`finishedAt`: `string`;
`partitions`: `object`[];
`rebalanceId`: `number`;
`result`: `"COMPLETED"` \| `"FAILED"` \| `"CANCELLED"`;
`startedAt`: `string`;
\}
\| `null`;
`partitions`: `object`[];
`runningRebalance`: \| \{
`cancelRequested`: `boolean`;
`dryRun`: `boolean`;
`partitions`: `object`[];
`rebalanceId`: `number`;
`startedAt`: `string`;
\}
\| `null`;
`state`: `"BALANCED"` \| `"BALANCING"` \| `"UNBALANCED"`;
\}\>;
`unassignClientFromGroup`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignClientFromTenant`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignGroupFromTenant`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignMappingRuleFromGroup`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignMappingRuleFromTenant`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignRoleFromClient`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignRoleFromGroup`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignRoleFromMappingRule`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignRoleFromTenant`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignRoleFromUser`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignUserFromGroup`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignUserFromTenant`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignUserTask`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`updateAgentInstance`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`createdHistory`: `object`[];
\}\>;
`updateAuthorization`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`updateGlobalClusterVariable`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`kind`: [`ClusterVariableKindEnum`](../type-aliases/ClusterVariableKindEnum.md);
`metadata`: \{
\[`key`: `string`\]: `string` \| `number`;
\};
`name`: `string`;
`scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
`tenantId`: `string` \| `null`;
`value`: `string`;
\}\>;
`updateGlobalTaskListener`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`afterNonGlobal?`: `boolean`;
`eventTypes`: [`GlobalTaskListenerEventTypeEnum`](../type-aliases/GlobalTaskListenerEventTypeEnum.md)[];
`id`: `string`;
`priority?`: `number`;
`retries?`: `number`;
`source`: [`GlobalListenerSourceEnum`](../type-aliases/GlobalListenerSourceEnum.md);
`type?`: `string`;
\}\>;
`updateGroup`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description`: `string` \| `null`;
`groupId`: `string`;
`name`: `string`;
\}\>;
`updateJob`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`updateJobsBatchOperation`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>;
`updateMappingRule`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`claimName`: `string`;
`claimValue`: `string`;
`mappingRuleId`: `string`;
`name`: `string`;
\}\>;
`updateRole`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description`: `string` \| `null`;
`name`: `string`;
`roleId`: `string`;
\}\>;
`updateTenant`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description`: `string` \| `null`;
`name`: `string`;
`tenantId`: `string`;
\}\>;
`updateTenantClusterVariable`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`kind`: [`ClusterVariableKindEnum`](../type-aliases/ClusterVariableKindEnum.md);
`metadata`: \{
\[`key`: `string`\]: `string` \| `number`;
\};
`name`: `string`;
`scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
`tenantId`: `string` \| `null`;
`value`: `string`;
\}\>;
`updateUser`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`email`: `string` \| `null`;
`name`: `string` \| `null`;
`username`: `string`;
\}\>;
`updateUserTask`(...`a`): [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`withCorrelation`(...`a`): `Promise`\<`unknown`\>;
\}\>
