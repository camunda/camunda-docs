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
     deadline: {
        dispose: (...a) => void;
        signal: {
        };
     };
     now: number;
     sleep: Promise<void>;
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
  _getSupportLogger: {
     log: void;
  };
  _invokeWithRetry: Promise<unknown>;
  activateAdHocSubProcessActivities: CancelablePromise<void>;
  activateJobs: CancelablePromise<{
     jobs: object[];
  }>;
  assignClientToGroup: CancelablePromise<void>;
  assignClientToTenant: CancelablePromise<void>;
  assignGroupToTenant: CancelablePromise<void>;
  assignMappingRuleToGroup: CancelablePromise<void>;
  assignMappingRuleToTenant: CancelablePromise<void>;
  assignProcessInstanceBusinessId: CancelablePromise<void>;
  assignRoleToClient: CancelablePromise<void>;
  assignRoleToGroup: CancelablePromise<void>;
  assignRoleToMappingRule: CancelablePromise<void>;
  assignRoleToTenant: CancelablePromise<void>;
  assignRoleToUser: CancelablePromise<void>;
  assignUserTask: CancelablePromise<void>;
  assignUserToGroup: CancelablePromise<void>;
  assignUserToTenant: CancelablePromise<void>;
  broadcastSignal: CancelablePromise<{
     signalKey: string;
     tenantId: string;
  }>;
  cancelBatchOperation: CancelablePromise<void>;
  cancelClusterRebalance: CancelablePromise<{
     wasRunning: boolean;
  }>;
  cancelProcessInstance: CancelablePromise<void>;
  cancelProcessInstancesBatchOperation: CancelablePromise<{
     batchOperationKey: string;
     batchOperationType: BatchOperationTypeEnum;
  }>;
  changeClusterMode: CancelablePromise<{
     changeId: string;
     plannedChanges: object[];
  }>;
  changeClusterModeAsClusterAdmin: CancelablePromise<{
     changeId: string;
     plannedChanges: object[];
  }>;
  clearAuthCache: void;
  completeJob: CancelablePromise<void>;
  completeUserTask: CancelablePromise<void>;
  configure: void;
  correlateMessage: CancelablePromise<{
     messageKey: string;
     processInstanceKey: string;
     tenantId: string;
  }>;
  createAdminUser: CancelablePromise<{
     email: string | null;
     name: string | null;
     username: string;
  }>;
  createAgentInstance: CancelablePromise<{
     agentInstanceKey: string;
     createdHistory: object[];
  }>;
  createAuthorization: CancelablePromise<{
     authorizationKey: string;
  }>;
  createDeployment: CancelablePromise<{
     decisionRequirements: object[];
     decisions: object[];
     deploymentKey: string;
     deployments: object[];
     forms: object[];
     processes: object[];
     resources: object[];
     tenantId: string;
  }>;
  createDocument: CancelablePromise<{
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
  createDocumentLink: CancelablePromise<{
     expiresAt: string;
     url: string;
  }>;
  createDocuments: CancelablePromise<{
     createdDocuments: object[];
     failedDocuments: object[];
  }>;
  createElementInstanceVariables: CancelablePromise<void>;
  createGlobalClusterVariable: CancelablePromise<{
     kind: ClusterVariableKindEnum;
     metadata: {
      [key: string]: string | number;
     };
     name: string;
     scope: ClusterVariableScopeEnum;
     tenantId: string | null;
     value: string;
  }>;
  createGlobalTaskListener: CancelablePromise<{
     afterNonGlobal?: boolean;
     eventTypes: GlobalTaskListenerEventTypeEnum[];
     id: string;
     priority?: number;
     retries?: number;
     source: GlobalListenerSourceEnum;
     type?: string;
  }>;
  createGroup: CancelablePromise<{
     description: string | null;
     groupId: string;
     name: string;
  }>;
  createJobWorker: {
     activeJobs: number;
     name: string;
     stopped: boolean;
     start: void;
     stop: void;
     stopGracefully: Promise<{
        remainingJobs: number;
        timedOut: boolean;
     }>;
  };
  createMappingRule: CancelablePromise<{
     claimName: string;
     claimValue: string;
     mappingRuleId: string;
     name: string;
  }>;
  createProcessInstance: CancelablePromise<{
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
  createRole: CancelablePromise<{
     description: string | null;
     name: string;
     roleId: string;
  }>;
  createTenant: CancelablePromise<{
     description: string | null;
     name: string;
     tenantId: string;
  }>;
  createTenantClusterVariable: CancelablePromise<{
     kind: ClusterVariableKindEnum;
     metadata: {
      [key: string]: string | number;
     };
     name: string;
     scope: ClusterVariableScopeEnum;
     tenantId: string | null;
     value: string;
  }>;
  createThreadedJobWorker: {
     activeJobs: number;
     busyThreads: number;
     name: string;
     poolSize: number;
     ready: Promise<void>;
     stopped: boolean;
     start: void;
     stop: void;
     stopGracefully: Promise<{
        remainingJobs: number;
        timedOut: boolean;
     }>;
  };
  createUser: CancelablePromise<{
     email: string | null;
     name: string | null;
     username: string;
  }>;
  deleteAuthorization: CancelablePromise<void>;
  deleteDecisionInstance: CancelablePromise<void>;
  deleteDecisionInstancesBatchOperation: CancelablePromise<{
     batchOperationKey: string;
     batchOperationType: BatchOperationTypeEnum;
  }>;
  deleteDocument: CancelablePromise<void>;
  deleteGlobalClusterVariable: CancelablePromise<void>;
  deleteGlobalTaskListener: CancelablePromise<void>;
  deleteGroup: CancelablePromise<void>;
  deleteHistoryBackup: CancelablePromise<void>;
  deleteHistoryBackupAsClusterAdmin: CancelablePromise<void>;
  deleteMappingRule: CancelablePromise<void>;
  deleteProcessInstance: CancelablePromise<void>;
  deleteProcessInstancesBatchOperation: CancelablePromise<{
     batchOperationKey: string;
     batchOperationType: BatchOperationTypeEnum;
  }>;
  deleteResource: CancelablePromise<{
     batchOperation:   | {
        batchOperationKey: string;
        batchOperationType: BatchOperationTypeEnum;
      }
        | null;
     resourceKey: string;
  }>;
  deleteRole: CancelablePromise<void>;
  deleteRuntimeBackup: CancelablePromise<void>;
  deleteRuntimeBackupAsClusterAdmin: CancelablePromise<void>;
  deleteRuntimeBackupState: CancelablePromise<void>;
  deleteRuntimeBackupStateAsClusterAdmin: CancelablePromise<void>;
  deleteTenant: CancelablePromise<void>;
  deleteTenantClusterVariable: CancelablePromise<void>;
  deleteUser: CancelablePromise<void>;
  deployResourcesFromFiles: CancelablePromise<{
     decisionRequirements: object[];
     decisions: object[];
     deploymentKey: string;
     deployments: object[];
     forms: object[];
     processes: object[];
     resources: object[];
     tenantId: string;
  }>;
  emitSupportLogPreamble: void;
  evaluateConditionals: CancelablePromise<{
     conditionalEvaluationKey: string;
     processInstances: object[];
     tenantId: string;
  }>;
  evaluateDecision: CancelablePromise<{
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
  evaluateExpression: CancelablePromise<{
     expression: string;
     referencedSecrets: object[];
     result: unknown;
     warnings: object[];
  }>;
  failJob: CancelablePromise<void>;
  forceAuthRefresh: Promise<string | undefined>;
  getAgentDefinition: CancelablePromise<{
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
  getAgentInstance: CancelablePromise<{
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
        inputTokens: number;
        modelCalls: number;
        outputTokens: number;
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
  getAuditLog: CancelablePromise<{
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
  getAuthentication: CancelablePromise<{
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
  getAuthHeaders: Promise<{
   [key: string]: string;
  }>;
  getAuthorization: CancelablePromise<{
     authorizationKey: string;
     ownerId: string;
     ownerType: OwnerTypeEnum;
     permissionTypes: PermissionTypeEnum[];
     resourceId: string | null;
     resourcePropertyName: string | null;
     resourceType: ResourceTypeEnum;
  }>;
  getBackpressureState:   | {
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
  getBatchOperation: CancelablePromise<{
     actorId: string | null;
     actorType:   | AuditLogActorTypeEnum
        | null;
     batchOperationKey: string;
     batchOperationType: BatchOperationTypeEnum;
     endDate: string | null;
     errors: object[];
     operationsCompletedCount: number;
     operationsFailedCount: number;
     operationsTotalCount: number;
     startDate: string | null;
     state: BatchOperationStateEnum;
  }>;
  getClusterExportingStatus: CancelablePromise<{
     status: ExportingStatusCode;
  }>;
  getClusterRebalance: CancelablePromise<{
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
  getClusterStatus: CancelablePromise<{
     status: "HEALTHY" | "DEGRADED" | "DOWN";
  }>;
  getClusterTopology: CancelablePromise<{
     brokers: object[];
     clusterId: string | null;
     clusterSize: number;
     gatewayVersion: string | null;
     physicalTenants: object[];
  }>;
  getConfig: {
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
  getDecisionDefinition: CancelablePromise<{
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
  getDecisionDefinitionXml: CancelablePromise<string>;
  getDecisionInstance: CancelablePromise<{
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
  getDecisionRequirements: CancelablePromise<{
     decisionRequirementsId: string;
     decisionRequirementsKey: string;
     decisionRequirementsName: string;
     resourceName: string;
     tenantId: string;
     version: number;
  }>;
  getDecisionRequirementsXml: CancelablePromise<string>;
  getDocument: CancelablePromise<{
  }>;
  getElementInstance: CancelablePromise<{
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
     processDefinitionId: string;
     processDefinitionKey: string;
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
  getErrorMode: "result" | "throw";
  getExportingStatus: CancelablePromise<{
     status: ExportingStatusCode;
  }>;
  getFormByKey: CancelablePromise<{
     formId: string;
     formKey: string;
     schema: string;
     tenantId: string;
     version: number;
  }>;
  getGlobalClusterVariable: CancelablePromise<{
     kind: ClusterVariableKindEnum;
     metadata: {
      [key: string]: string | number;
     };
     name: string;
     scope: ClusterVariableScopeEnum;
     tenantId: string | null;
     value: string;
  }>;
  getGlobalJobStatistics: CancelablePromise<{
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
  getGlobalTaskListener: CancelablePromise<{
     afterNonGlobal?: boolean;
     eventTypes: GlobalTaskListenerEventTypeEnum[];
     id: string;
     priority?: number;
     retries?: number;
     source: GlobalListenerSourceEnum;
     type?: string;
  }>;
  getGroup: CancelablePromise<{
     description: string | null;
     groupId: string;
     name: string;
  }>;
  getHistoryBackup: CancelablePromise<{
     backupId: number;
     details: object[];
     failureReason: string | null;
     state: HistoryBackupStateCode;
  }>;
  getHistoryBackupAsClusterAdmin: CancelablePromise<{
     backupId: number;
     physicalTenants: object[];
  }>;
  getIncident: CancelablePromise<{
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
  getJobErrorStatistics: CancelablePromise<{
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
  getJobTimeSeriesStatistics: CancelablePromise<{
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
  getJobTypeStatistics: CancelablePromise<{
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
  getJobWorkerStatistics: CancelablePromise<{
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
  getLicense: CancelablePromise<{
     expiresAt: string | null;
     isCommercial: boolean;
     licenseType: string;
     validLicense: boolean;
  }>;
  getMappingRule: CancelablePromise<{
     claimName: string;
     claimValue: string;
     mappingRuleId: string;
     name: string;
  }>;
  getProcessDefinition: CancelablePromise<{
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
  getProcessDefinitionInstanceStatistics: CancelablePromise<{
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
  getProcessDefinitionInstanceVersionStatistics: CancelablePromise<{
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
  getProcessDefinitionMessageSubscriptionStatistics: CancelablePromise<{
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
  getProcessDefinitionStatistics: CancelablePromise<{
     items: object[];
  }>;
  getProcessDefinitionXml: CancelablePromise<string>;
  getProcessInstance: CancelablePromise<{
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
  getProcessInstanceCallHierarchy: CancelablePromise<object[]>;
  getProcessInstanceSequenceFlows: CancelablePromise<{
     items: object[];
  }>;
  getProcessInstanceStatistics: CancelablePromise<{
     items: object[];
  }>;
  getProcessInstanceStatisticsByDefinition: CancelablePromise<{
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
  getProcessInstanceStatisticsByError: CancelablePromise<{
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
  getProcessInstanceWaitStateStatistics: CancelablePromise<{
     items: object[];
  }>;
  getResource: CancelablePromise<{
     resourceId: string;
     resourceKey: string;
     resourceName: string;
     tenantId: string;
     version: number;
     versionTag: string | null;
  }>;
  getResourceContent: CancelablePromise<{
   [key: string]: unknown;
  }>;
  getResourceContentBinary: CancelablePromise<{
  }>;
  getRestoreStatus: CancelablePromise<{
     brokers: object[];
     changeId: string;
     startedAt: string | null;
     status: "COMPLETED" | "FAILED" | "IN_PROGRESS" | "CANCELLED";
  }>;
  getRole: CancelablePromise<{
     description: string | null;
     name: string;
     roleId: string;
  }>;
  getRuntimeBackup: CancelablePromise<{
     backupId: number;
     details: object[];
     failureReason: string | null;
     state: StateCode;
  }>;
  getRuntimeBackupAsClusterAdmin: CancelablePromise<{
     backupId: number;
     failureReason: string | null;
     physicalTenants: object[];
     state: StateCode;
  }>;
  getRuntimeBackupState: CancelablePromise<{
     backupStates: object[];
     checkpointStates: object[];
     ranges: object[];
  }>;
  getRuntimeBackupStateAsClusterAdmin: CancelablePromise<{
     physicalTenants: object[];
  }>;
  getStartProcessForm: CancelablePromise<
     | void
     | {
     formId: string;
     formKey: string;
     schema: string;
     tenantId: string;
     version: number;
  }>;
  getStatus: CancelablePromise<void>;
  getSystemConfiguration: CancelablePromise<{
     authentication: {
        canLogout: boolean;
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
  getTenant: CancelablePromise<{
     description: string | null;
     name: string;
     tenantId: string;
  }>;
  getTenantClusterVariable: CancelablePromise<{
     kind: ClusterVariableKindEnum;
     metadata: {
      [key: string]: string | number;
     };
     name: string;
     scope: ClusterVariableScopeEnum;
     tenantId: string | null;
     value: string;
  }>;
  getTopology: CancelablePromise<{
     brokers: object[];
     clusterId: string | null;
     clusterSize: number;
     gatewayVersion: string;
     lastCompletedChangeId: string;
     partitionsCount: number;
     replicationFactor: number;
  }>;
  getUsageMetrics: CancelablePromise<{
     activeTenants: number;
     assignees: number;
     decisionInstances: number;
     processInstances: number;
     tenants: {
      [key: string]: object;
     };
  }>;
  getUser: CancelablePromise<{
     email: string | null;
     name: string | null;
     username: string;
  }>;
  getUserTask: CancelablePromise<{
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
  getUserTaskForm: CancelablePromise<
     | void
     | {
     formId: string;
     formKey: string;
     schema: string;
     tenantId: string;
     version: number;
  }>;
  getVariable: CancelablePromise<{
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
  getWorkers: any[];
  listHistoryBackups: CancelablePromise<object[]>;
  listHistoryBackupsAsClusterAdmin: CancelablePromise<object[]>;
  listRuntimeBackups: CancelablePromise<object[]>;
  listRuntimeBackupsAsClusterAdmin: CancelablePromise<object[]>;
  listSecrets: CancelablePromise<{
     references: string[];
  }>;
  logger: {
     code: void;
     debug: void;
     error: void;
     info: void;
     level: LogLevel;
     scope: { level: () => LogLevel; setLevel: (level: LogLevel) => void; setTransport: (t?: ((e: { level: LogLevel; scope: string; ts: number; args: any[]; code?: string | undefined; data?: any; }) => void) | undefined) => void; ... 7 more ...; code: (level: LogLevel, code: string, msg: string, data?: any) => void; };
     setLevel: void;
     setTransport: void;
     silly: void;
     trace: void;
     warn: void;
  };
  migrateProcessInstance: CancelablePromise<void>;
  migrateProcessInstancesBatchOperation: CancelablePromise<{
     batchOperationKey: string;
     batchOperationType: BatchOperationTypeEnum;
  }>;
  modifyProcessInstance: CancelablePromise<void>;
  modifyProcessInstancesBatchOperation: CancelablePromise<{
     batchOperationKey: string;
     batchOperationType: BatchOperationTypeEnum;
  }>;
  onAuthHeaders: void;
  pauseClusterExporting: CancelablePromise<void>;
  pauseExporting: CancelablePromise<void>;
  pinClock: CancelablePromise<void>;
  publishMessage: CancelablePromise<{
     messageKey: string;
     tenantId: string;
  }>;
  resetClock: CancelablePromise<void>;
  resolveIncident: CancelablePromise<void>;
  resolveIncidentsBatchOperation: CancelablePromise<{
     batchOperationKey: string;
     batchOperationType: BatchOperationTypeEnum;
  }>;
  resolveProcessInstanceIncidents: CancelablePromise<{
     batchOperationKey: string;
     batchOperationType: BatchOperationTypeEnum;
  }>;
  resolveSecrets: CancelablePromise<{
     errors: object[];
     resolved: object[];
  }>;
  restore: CancelablePromise<{
     changeId: string;
     plannedChanges: object[];
  }>;
  restoreAsClusterAdmin: CancelablePromise<{
     changeId: string;
     plannedChanges: object[];
  }>;
  resumeBatchOperation: CancelablePromise<void>;
  resumeClusterExporting: CancelablePromise<void>;
  resumeExporting: CancelablePromise<void>;
  resumeProcessInstance: CancelablePromise<void>;
  resumeProcessInstancesBatchOperation: CancelablePromise<{
     batchOperationKey: string;
     batchOperationType: BatchOperationTypeEnum;
  }>;
  searchAgentDefinitions: CancelablePromise<{
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
  searchAgentInstanceHistory: CancelablePromise<{
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
  searchAgentInstances: CancelablePromise<{
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
  searchAuditLogs: CancelablePromise<{
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
  searchAuthorizations: CancelablePromise<{
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
  searchBatchOperationItems: CancelablePromise<{
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
  searchBatchOperations: CancelablePromise<{
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
  searchClientsForGroup: CancelablePromise<{
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
  searchClientsForRole: CancelablePromise<{
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
  searchClientsForTenant: CancelablePromise<{
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
  searchClusterVariables: CancelablePromise<{
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
  searchCorrelatedMessageSubscriptions: CancelablePromise<{
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
  searchDecisionDefinitions: CancelablePromise<{
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
  searchDecisionInstances: CancelablePromise<{
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
  searchDecisionRequirements: CancelablePromise<{
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
  searchElementInstanceIncidents: CancelablePromise<{
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
  searchElementInstances: CancelablePromise<{
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
  searchElementInstanceWaitStates: CancelablePromise<{
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
  searchGlobalTaskListeners: CancelablePromise<{
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
  searchGroupIdsForTenant: CancelablePromise<{
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
  searchGroups: CancelablePromise<{
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
  searchGroupsForRole: CancelablePromise<{
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
  searchIncidents: CancelablePromise<{
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
  searchJobs: CancelablePromise<{
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
  searchMappingRule: CancelablePromise<{
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
  searchMappingRulesForGroup: CancelablePromise<{
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
  searchMappingRulesForRole: CancelablePromise<{
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
  searchMappingRulesForTenant: CancelablePromise<{
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
  searchMessageSubscriptions: CancelablePromise<{
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
  searchOwnAuthorizations: CancelablePromise<{
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
  searchProcessDefinitions: CancelablePromise<{
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
  searchProcessDefinitionVariableNames: CancelablePromise<{
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
  searchProcessInstanceIncidents: CancelablePromise<{
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
  searchProcessInstances: CancelablePromise<{
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
  searchResources: CancelablePromise<{
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
  searchRoles: CancelablePromise<{
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
  searchRolesForGroup: CancelablePromise<{
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
  searchRolesForTenant: CancelablePromise<{
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
  searchTenants: CancelablePromise<{
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
  searchUsers: CancelablePromise<{
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
  searchUsersForGroup: CancelablePromise<{
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
  searchUsersForRole: CancelablePromise<{
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
  searchUsersForTenant: CancelablePromise<{
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
  searchUserTaskAuditLogs: CancelablePromise<{
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
  searchUserTaskEffectiveVariables: CancelablePromise<{
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
  searchUserTasks: CancelablePromise<{
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
  searchUserTaskVariables: CancelablePromise<{
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
  searchVariables: CancelablePromise<{
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
  searchVariablesAsDto: CancelablePromise<{
     raw: {
      [key: string]: unknown;
     };
     get: unknown;
     has: boolean;
     validate: {
      [key: string]: unknown;
     };
  }>;
  stopAllWorkers: void;
  suspendBatchOperation: CancelablePromise<void>;
  suspendProcessInstance: CancelablePromise<void>;
  suspendProcessInstancesBatchOperation: CancelablePromise<{
     batchOperationKey: string;
     batchOperationType: BatchOperationTypeEnum;
  }>;
  syncRuntimeBackupState: CancelablePromise<{
     backupStates: object[];
     checkpointStates: object[];
     ranges: object[];
  }>;
  syncRuntimeBackupStateAsClusterAdmin: CancelablePromise<{
     physicalTenants: object[];
  }>;
  takeHistoryBackup: CancelablePromise<{
     backupId: number;
     scheduledSnapshots: string[];
  }>;
  takeHistoryBackupAsClusterAdmin: CancelablePromise<{
     backupId: number;
     physicalTenants: object[];
  }>;
  takeRuntimeBackup: CancelablePromise<{
     backupId: number;
  }>;
  takeRuntimeBackupAsClusterAdmin: CancelablePromise<{
     physicalTenants: object[];
  }>;
  throwJobError: CancelablePromise<void>;
  triggerClusterRebalance: CancelablePromise<{
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
  unassignClientFromGroup: CancelablePromise<void>;
  unassignClientFromTenant: CancelablePromise<void>;
  unassignGroupFromTenant: CancelablePromise<void>;
  unassignMappingRuleFromGroup: CancelablePromise<void>;
  unassignMappingRuleFromTenant: CancelablePromise<void>;
  unassignRoleFromClient: CancelablePromise<void>;
  unassignRoleFromGroup: CancelablePromise<void>;
  unassignRoleFromMappingRule: CancelablePromise<void>;
  unassignRoleFromTenant: CancelablePromise<void>;
  unassignRoleFromUser: CancelablePromise<void>;
  unassignUserFromGroup: CancelablePromise<void>;
  unassignUserFromTenant: CancelablePromise<void>;
  unassignUserTask: CancelablePromise<void>;
  updateAgentInstance: CancelablePromise<{
     createdHistory: object[];
  }>;
  updateAuthorization: CancelablePromise<void>;
  updateGlobalClusterVariable: CancelablePromise<{
     kind: ClusterVariableKindEnum;
     metadata: {
      [key: string]: string | number;
     };
     name: string;
     scope: ClusterVariableScopeEnum;
     tenantId: string | null;
     value: string;
  }>;
  updateGlobalTaskListener: CancelablePromise<{
     afterNonGlobal?: boolean;
     eventTypes: GlobalTaskListenerEventTypeEnum[];
     id: string;
     priority?: number;
     retries?: number;
     source: GlobalListenerSourceEnum;
     type?: string;
  }>;
  updateGroup: CancelablePromise<{
     description: string | null;
     groupId: string;
     name: string;
  }>;
  updateJob: CancelablePromise<void>;
  updateJobsBatchOperation: CancelablePromise<{
     batchOperationKey: string;
     batchOperationType: BatchOperationTypeEnum;
  }>;
  updateMappingRule: CancelablePromise<{
     claimName: string;
     claimValue: string;
     mappingRuleId: string;
     name: string;
  }>;
  updateRole: CancelablePromise<{
     description: string | null;
     name: string;
     roleId: string;
  }>;
  updateTenant: CancelablePromise<{
     description: string | null;
     name: string;
     tenantId: string;
  }>;
  updateTenantClusterVariable: CancelablePromise<{
     kind: ClusterVariableKindEnum;
     metadata: {
      [key: string]: string | number;
     };
     name: string;
     scope: ClusterVariableScopeEnum;
     tenantId: string | null;
     value: string;
  }>;
  updateUser: CancelablePromise<{
     email: string | null;
     name: string | null;
     username: string;
  }>;
  updateUserTask: CancelablePromise<void>;
  withCorrelation: Promise<unknown>;
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

...\[[`CamundaOptions`](../interfaces/CamundaOptions.md)\]

## Returns

[`WithSearchPagination`](../type-aliases/WithSearchPagination.md)\<\{
`clock`: \{
`deadline`: \{
`dispose`: (...`a`) => `void`;
`signal`: \{
\};
\};
`now`: `number`;
`sleep`: `Promise`\<`void`\>;
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
`_getSupportLogger`: \{
`log`: `void`;
\};
`_invokeWithRetry`: `Promise`\<`unknown`\>;
`activateAdHocSubProcessActivities`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`activateJobs`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`jobs`: `object`[];
\}\>;
`assignClientToGroup`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignClientToTenant`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignGroupToTenant`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignMappingRuleToGroup`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignMappingRuleToTenant`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignProcessInstanceBusinessId`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignRoleToClient`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignRoleToGroup`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignRoleToMappingRule`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignRoleToTenant`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignRoleToUser`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignUserTask`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignUserToGroup`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`assignUserToTenant`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`broadcastSignal`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`signalKey`: `string`;
`tenantId`: `string`;
\}\>;
`cancelBatchOperation`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`cancelClusterRebalance`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`wasRunning`: `boolean`;
\}\>;
`cancelProcessInstance`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`cancelProcessInstancesBatchOperation`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>;
`changeClusterMode`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`changeId`: `string`;
`plannedChanges`: `object`[];
\}\>;
`changeClusterModeAsClusterAdmin`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`changeId`: `string`;
`plannedChanges`: `object`[];
\}\>;
`clearAuthCache`: `void`;
`completeJob`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`completeUserTask`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`configure`: `void`;
`correlateMessage`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`messageKey`: `string`;
`processInstanceKey`: `string`;
`tenantId`: `string`;
\}\>;
`createAdminUser`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`email`: `string` \| `null`;
`name`: `string` \| `null`;
`username`: `string`;
\}\>;
`createAgentInstance`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`agentInstanceKey`: `string`;
`createdHistory`: `object`[];
\}\>;
`createAuthorization`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`authorizationKey`: `string`;
\}\>;
`createDeployment`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`decisionRequirements`: `object`[];
`decisions`: `object`[];
`deploymentKey`: `string`;
`deployments`: `object`[];
`forms`: `object`[];
`processes`: `object`[];
`resources`: `object`[];
`tenantId`: `string`;
\}\>;
`createDocument`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`createDocumentLink`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`expiresAt`: `string`;
`url`: `string`;
\}\>;
`createDocuments`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`createdDocuments`: `object`[];
`failedDocuments`: `object`[];
\}\>;
`createElementInstanceVariables`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`createGlobalClusterVariable`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`kind`: [`ClusterVariableKindEnum`](../type-aliases/ClusterVariableKindEnum.md);
`metadata`: \{
\[`key`: `string`\]: `string` \| `number`;
\};
`name`: `string`;
`scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
`tenantId`: `string` \| `null`;
`value`: `string`;
\}\>;
`createGlobalTaskListener`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`afterNonGlobal?`: `boolean`;
`eventTypes`: [`GlobalTaskListenerEventTypeEnum`](../type-aliases/GlobalTaskListenerEventTypeEnum.md)[];
`id`: `string`;
`priority?`: `number`;
`retries?`: `number`;
`source`: [`GlobalListenerSourceEnum`](../type-aliases/GlobalListenerSourceEnum.md);
`type?`: `string`;
\}\>;
`createGroup`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description`: `string` \| `null`;
`groupId`: `string`;
`name`: `string`;
\}\>;
`createJobWorker`: \{
`activeJobs`: `number`;
`name`: `string`;
`stopped`: `boolean`;
`start`: `void`;
`stop`: `void`;
`stopGracefully`: `Promise`\<\{
`remainingJobs`: `number`;
`timedOut`: `boolean`;
\}\>;
\};
`createMappingRule`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`claimName`: `string`;
`claimValue`: `string`;
`mappingRuleId`: `string`;
`name`: `string`;
\}\>;
`createProcessInstance`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`createRole`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description`: `string` \| `null`;
`name`: `string`;
`roleId`: `string`;
\}\>;
`createTenant`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description`: `string` \| `null`;
`name`: `string`;
`tenantId`: `string`;
\}\>;
`createTenantClusterVariable`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`kind`: [`ClusterVariableKindEnum`](../type-aliases/ClusterVariableKindEnum.md);
`metadata`: \{
\[`key`: `string`\]: `string` \| `number`;
\};
`name`: `string`;
`scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
`tenantId`: `string` \| `null`;
`value`: `string`;
\}\>;
`createThreadedJobWorker`: \{
`activeJobs`: `number`;
`busyThreads`: `number`;
`name`: `string`;
`poolSize`: `number`;
`ready`: `Promise`\<`void`\>;
`stopped`: `boolean`;
`start`: `void`;
`stop`: `void`;
`stopGracefully`: `Promise`\<\{
`remainingJobs`: `number`;
`timedOut`: `boolean`;
\}\>;
\};
`createUser`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`email`: `string` \| `null`;
`name`: `string` \| `null`;
`username`: `string`;
\}\>;
`deleteAuthorization`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteDecisionInstance`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteDecisionInstancesBatchOperation`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>;
`deleteDocument`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteGlobalClusterVariable`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteGlobalTaskListener`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteGroup`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteHistoryBackup`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteHistoryBackupAsClusterAdmin`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteMappingRule`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteProcessInstance`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteProcessInstancesBatchOperation`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>;
`deleteResource`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperation`: \| \{
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}
\| `null`;
`resourceKey`: `string`;
\}\>;
`deleteRole`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteRuntimeBackup`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteRuntimeBackupAsClusterAdmin`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteRuntimeBackupState`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteRuntimeBackupStateAsClusterAdmin`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteTenant`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteTenantClusterVariable`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deleteUser`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`deployResourcesFromFiles`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`decisionRequirements`: `object`[];
`decisions`: `object`[];
`deploymentKey`: `string`;
`deployments`: `object`[];
`forms`: `object`[];
`processes`: `object`[];
`resources`: `object`[];
`tenantId`: `string`;
\}\>;
`emitSupportLogPreamble`: `void`;
`evaluateConditionals`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`conditionalEvaluationKey`: `string`;
`processInstances`: `object`[];
`tenantId`: `string`;
\}\>;
`evaluateDecision`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`evaluateExpression`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`expression`: `string`;
`referencedSecrets`: `object`[];
`result`: `unknown`;
`warnings`: `object`[];
\}\>;
`failJob`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`forceAuthRefresh`: `Promise`\<`string` \| `undefined`\>;
`getAgentDefinition`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`getAgentInstance`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`inputTokens`: `number`;
`modelCalls`: `number`;
`outputTokens`: `number`;
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
`getAuditLog`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`getAuthentication`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`getAuthHeaders`: `Promise`\<\{
\[`key`: `string`\]: `string`;
\}\>;
`getAuthorization`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`authorizationKey`: `string`;
`ownerId`: `string`;
`ownerType`: [`OwnerTypeEnum`](../type-aliases/OwnerTypeEnum.md);
`permissionTypes`: [`PermissionTypeEnum`](../type-aliases/PermissionTypeEnum.md)[];
`resourceId`: `string` \| `null`;
`resourcePropertyName`: `string` \| `null`;
`resourceType`: [`ResourceTypeEnum`](../type-aliases/ResourceTypeEnum.md);
\}\>;
`getBackpressureState`: \| \{
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
`getBatchOperation`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`actorId`: `string` \| `null`;
`actorType`: \| [`AuditLogActorTypeEnum`](../type-aliases/AuditLogActorTypeEnum.md)
\| `null`;
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
`endDate`: `string` \| `null`;
`errors`: `object`[];
`operationsCompletedCount`: `number`;
`operationsFailedCount`: `number`;
`operationsTotalCount`: `number`;
`startDate`: `string` \| `null`;
`state`: [`BatchOperationStateEnum`](../type-aliases/BatchOperationStateEnum.md);
\}\>;
`getClusterExportingStatus`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`status`: [`ExportingStatusCode`](../type-aliases/ExportingStatusCode.md);
\}\>;
`getClusterRebalance`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`getClusterStatus`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`status`: `"HEALTHY"` \| `"DEGRADED"` \| `"DOWN"`;
\}\>;
`getClusterTopology`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`brokers`: `object`[];
`clusterId`: `string` \| `null`;
`clusterSize`: `number`;
`gatewayVersion`: `string` \| `null`;
`physicalTenants`: `object`[];
\}\>;
`getConfig`: \{
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
`getDecisionDefinition`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`getDecisionDefinitionXml`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`string`\>;
`getDecisionInstance`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`getDecisionRequirements`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`decisionRequirementsId`: `string`;
`decisionRequirementsKey`: `string`;
`decisionRequirementsName`: `string`;
`resourceName`: `string`;
`tenantId`: `string`;
`version`: `number`;
\}\>;
`getDecisionRequirementsXml`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`string`\>;
`getDocument`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
\}\>;
`getElementInstance`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`processDefinitionId`: `string`;
`processDefinitionKey`: `string`;
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
`getErrorMode`: `"result"` \| `"throw"`;
`getExportingStatus`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`status`: [`ExportingStatusCode`](../type-aliases/ExportingStatusCode.md);
\}\>;
`getFormByKey`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`formId`: `string`;
`formKey`: `string`;
`schema`: `string`;
`tenantId`: `string`;
`version`: `number`;
\}\>;
`getGlobalClusterVariable`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`kind`: [`ClusterVariableKindEnum`](../type-aliases/ClusterVariableKindEnum.md);
`metadata`: \{
\[`key`: `string`\]: `string` \| `number`;
\};
`name`: `string`;
`scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
`tenantId`: `string` \| `null`;
`value`: `string`;
\}\>;
`getGlobalJobStatistics`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`getGlobalTaskListener`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`afterNonGlobal?`: `boolean`;
`eventTypes`: [`GlobalTaskListenerEventTypeEnum`](../type-aliases/GlobalTaskListenerEventTypeEnum.md)[];
`id`: `string`;
`priority?`: `number`;
`retries?`: `number`;
`source`: [`GlobalListenerSourceEnum`](../type-aliases/GlobalListenerSourceEnum.md);
`type?`: `string`;
\}\>;
`getGroup`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description`: `string` \| `null`;
`groupId`: `string`;
`name`: `string`;
\}\>;
`getHistoryBackup`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`backupId`: `number`;
`details`: `object`[];
`failureReason`: `string` \| `null`;
`state`: [`HistoryBackupStateCode`](../type-aliases/HistoryBackupStateCode.md);
\}\>;
`getHistoryBackupAsClusterAdmin`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`backupId`: `number`;
`physicalTenants`: `object`[];
\}\>;
`getIncident`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`getJobErrorStatistics`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`getJobTimeSeriesStatistics`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`getJobTypeStatistics`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`getJobWorkerStatistics`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`getLicense`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`expiresAt`: `string` \| `null`;
`isCommercial`: `boolean`;
`licenseType`: `string`;
`validLicense`: `boolean`;
\}\>;
`getMappingRule`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`claimName`: `string`;
`claimValue`: `string`;
`mappingRuleId`: `string`;
`name`: `string`;
\}\>;
`getProcessDefinition`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`getProcessDefinitionInstanceStatistics`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`getProcessDefinitionInstanceVersionStatistics`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`getProcessDefinitionMessageSubscriptionStatistics`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`getProcessDefinitionStatistics`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
\}\>;
`getProcessDefinitionXml`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`string`\>;
`getProcessInstance`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`getProcessInstanceCallHierarchy`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`object`[]\>;
`getProcessInstanceSequenceFlows`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
\}\>;
`getProcessInstanceStatistics`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
\}\>;
`getProcessInstanceStatisticsByDefinition`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`getProcessInstanceStatisticsByError`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`getProcessInstanceWaitStateStatistics`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`items`: `object`[];
\}\>;
`getResource`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`resourceId`: `string`;
`resourceKey`: `string`;
`resourceName`: `string`;
`tenantId`: `string`;
`version`: `number`;
`versionTag`: `string` \| `null`;
\}\>;
`getResourceContent`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
\[`key`: `string`\]: `unknown`;
\}\>;
`getResourceContentBinary`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
\}\>;
`getRestoreStatus`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`brokers`: `object`[];
`changeId`: `string`;
`startedAt`: `string` \| `null`;
`status`: `"COMPLETED"` \| `"FAILED"` \| `"IN_PROGRESS"` \| `"CANCELLED"`;
\}\>;
`getRole`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description`: `string` \| `null`;
`name`: `string`;
`roleId`: `string`;
\}\>;
`getRuntimeBackup`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`backupId`: `number`;
`details`: `object`[];
`failureReason`: `string` \| `null`;
`state`: [`StateCode`](../type-aliases/StateCode.md);
\}\>;
`getRuntimeBackupAsClusterAdmin`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`backupId`: `number`;
`failureReason`: `string` \| `null`;
`physicalTenants`: `object`[];
`state`: [`StateCode`](../type-aliases/StateCode.md);
\}\>;
`getRuntimeBackupState`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`backupStates`: `object`[];
`checkpointStates`: `object`[];
`ranges`: `object`[];
\}\>;
`getRuntimeBackupStateAsClusterAdmin`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`physicalTenants`: `object`[];
\}\>;
`getStartProcessForm`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<
\| `void`
\| \{
`formId`: `string`;
`formKey`: `string`;
`schema`: `string`;
`tenantId`: `string`;
`version`: `number`;
\}\>;
`getStatus`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`getSystemConfiguration`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`authentication`: \{
`canLogout`: `boolean`;
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
`getTenant`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description`: `string` \| `null`;
`name`: `string`;
`tenantId`: `string`;
\}\>;
`getTenantClusterVariable`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`kind`: [`ClusterVariableKindEnum`](../type-aliases/ClusterVariableKindEnum.md);
`metadata`: \{
\[`key`: `string`\]: `string` \| `number`;
\};
`name`: `string`;
`scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
`tenantId`: `string` \| `null`;
`value`: `string`;
\}\>;
`getTopology`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`brokers`: `object`[];
`clusterId`: `string` \| `null`;
`clusterSize`: `number`;
`gatewayVersion`: `string`;
`lastCompletedChangeId`: `string`;
`partitionsCount`: `number`;
`replicationFactor`: `number`;
\}\>;
`getUsageMetrics`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`activeTenants`: `number`;
`assignees`: `number`;
`decisionInstances`: `number`;
`processInstances`: `number`;
`tenants`: \{
\[`key`: `string`\]: `object`;
\};
\}\>;
`getUser`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`email`: `string` \| `null`;
`name`: `string` \| `null`;
`username`: `string`;
\}\>;
`getUserTask`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`getUserTaskForm`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<
\| `void`
\| \{
`formId`: `string`;
`formKey`: `string`;
`schema`: `string`;
`tenantId`: `string`;
`version`: `number`;
\}\>;
`getVariable`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`getWorkers`: `any`[];
`listHistoryBackups`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`object`[]\>;
`listHistoryBackupsAsClusterAdmin`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`object`[]\>;
`listRuntimeBackups`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`object`[]\>;
`listRuntimeBackupsAsClusterAdmin`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`object`[]\>;
`listSecrets`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`references`: `string`[];
\}\>;
`logger`: \{
`code`: `void`;
`debug`: `void`;
`error`: `void`;
`info`: `void`;
`level`: [`LogLevel`](../../logger/type-aliases/LogLevel.md);
`scope`: \{ level: () =\> LogLevel; setLevel: (level: LogLevel) =\> void; setTransport: (t?: ((e: \{ level: LogLevel; scope: string; ts: number; args: any\[\]; code?: string \| undefined; data?: any; \}) =\> void) \| undefined) =\> void; ... 7 more ...; code: (level: LogLevel, code: string, msg: string, data?: any) =\> void; \};
`setLevel`: `void`;
`setTransport`: `void`;
`silly`: `void`;
`trace`: `void`;
`warn`: `void`;
\};
`migrateProcessInstance`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`migrateProcessInstancesBatchOperation`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>;
`modifyProcessInstance`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`modifyProcessInstancesBatchOperation`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>;
`onAuthHeaders`: `void`;
`pauseClusterExporting`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`pauseExporting`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`pinClock`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`publishMessage`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`messageKey`: `string`;
`tenantId`: `string`;
\}\>;
`resetClock`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`resolveIncident`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`resolveIncidentsBatchOperation`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>;
`resolveProcessInstanceIncidents`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>;
`resolveSecrets`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`errors`: `object`[];
`resolved`: `object`[];
\}\>;
`restore`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`changeId`: `string`;
`plannedChanges`: `object`[];
\}\>;
`restoreAsClusterAdmin`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`changeId`: `string`;
`plannedChanges`: `object`[];
\}\>;
`resumeBatchOperation`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`resumeClusterExporting`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`resumeExporting`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`resumeProcessInstance`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`resumeProcessInstancesBatchOperation`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>;
`searchAgentDefinitions`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchAgentInstanceHistory`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchAgentInstances`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchAuditLogs`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchAuthorizations`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchBatchOperationItems`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchBatchOperations`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchClientsForGroup`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchClientsForRole`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchClientsForTenant`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchClusterVariables`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchCorrelatedMessageSubscriptions`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchDecisionDefinitions`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchDecisionInstances`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchDecisionRequirements`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchElementInstanceIncidents`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchElementInstances`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchElementInstanceWaitStates`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchGlobalTaskListeners`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchGroupIdsForTenant`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchGroups`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchGroupsForRole`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchIncidents`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchJobs`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchMappingRule`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchMappingRulesForGroup`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchMappingRulesForRole`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchMappingRulesForTenant`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchMessageSubscriptions`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchOwnAuthorizations`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchProcessDefinitions`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchProcessDefinitionVariableNames`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchProcessInstanceIncidents`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchProcessInstances`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchResources`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchRoles`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchRolesForGroup`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchRolesForTenant`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchTenants`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchUsers`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchUsersForGroup`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchUsersForRole`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchUsersForTenant`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchUserTaskAuditLogs`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchUserTaskEffectiveVariables`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchUserTasks`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchUserTaskVariables`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchVariables`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`searchVariablesAsDto`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`raw`: \{
\[`key`: `string`\]: `unknown`;
\};
`get`: `unknown`;
`has`: `boolean`;
`validate`: \{
\[`key`: `string`\]: `unknown`;
\};
\}\>;
`stopAllWorkers`: `void`;
`suspendBatchOperation`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`suspendProcessInstance`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`suspendProcessInstancesBatchOperation`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>;
`syncRuntimeBackupState`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`backupStates`: `object`[];
`checkpointStates`: `object`[];
`ranges`: `object`[];
\}\>;
`syncRuntimeBackupStateAsClusterAdmin`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`physicalTenants`: `object`[];
\}\>;
`takeHistoryBackup`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`backupId`: `number`;
`scheduledSnapshots`: `string`[];
\}\>;
`takeHistoryBackupAsClusterAdmin`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`backupId`: `number`;
`physicalTenants`: `object`[];
\}\>;
`takeRuntimeBackup`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`backupId`: `number`;
\}\>;
`takeRuntimeBackupAsClusterAdmin`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`physicalTenants`: `object`[];
\}\>;
`throwJobError`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`triggerClusterRebalance`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
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
`unassignClientFromGroup`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignClientFromTenant`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignGroupFromTenant`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignMappingRuleFromGroup`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignMappingRuleFromTenant`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignRoleFromClient`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignRoleFromGroup`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignRoleFromMappingRule`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignRoleFromTenant`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignRoleFromUser`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignUserFromGroup`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignUserFromTenant`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`unassignUserTask`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`updateAgentInstance`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`createdHistory`: `object`[];
\}\>;
`updateAuthorization`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`updateGlobalClusterVariable`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`kind`: [`ClusterVariableKindEnum`](../type-aliases/ClusterVariableKindEnum.md);
`metadata`: \{
\[`key`: `string`\]: `string` \| `number`;
\};
`name`: `string`;
`scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
`tenantId`: `string` \| `null`;
`value`: `string`;
\}\>;
`updateGlobalTaskListener`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`afterNonGlobal?`: `boolean`;
`eventTypes`: [`GlobalTaskListenerEventTypeEnum`](../type-aliases/GlobalTaskListenerEventTypeEnum.md)[];
`id`: `string`;
`priority?`: `number`;
`retries?`: `number`;
`source`: [`GlobalListenerSourceEnum`](../type-aliases/GlobalListenerSourceEnum.md);
`type?`: `string`;
\}\>;
`updateGroup`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description`: `string` \| `null`;
`groupId`: `string`;
`name`: `string`;
\}\>;
`updateJob`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`updateJobsBatchOperation`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`batchOperationKey`: `string`;
`batchOperationType`: [`BatchOperationTypeEnum`](../type-aliases/BatchOperationTypeEnum.md);
\}\>;
`updateMappingRule`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`claimName`: `string`;
`claimValue`: `string`;
`mappingRuleId`: `string`;
`name`: `string`;
\}\>;
`updateRole`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description`: `string` \| `null`;
`name`: `string`;
`roleId`: `string`;
\}\>;
`updateTenant`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`description`: `string` \| `null`;
`name`: `string`;
`tenantId`: `string`;
\}\>;
`updateTenantClusterVariable`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`kind`: [`ClusterVariableKindEnum`](../type-aliases/ClusterVariableKindEnum.md);
`metadata`: \{
\[`key`: `string`\]: `string` \| `number`;
\};
`name`: `string`;
`scope`: [`ClusterVariableScopeEnum`](../type-aliases/ClusterVariableScopeEnum.md);
`tenantId`: `string` \| `null`;
`value`: `string`;
\}\>;
`updateUser`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<\{
`email`: `string` \| `null`;
`name`: `string` \| `null`;
`username`: `string`;
\}\>;
`updateUserTask`: [`CancelablePromise`](../interfaces/CancelablePromise.md)\<`void`\>;
`withCorrelation`: `Promise`\<`unknown`\>;
\}\>
