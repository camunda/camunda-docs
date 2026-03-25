---
title: "Models"
sidebar_label: "Models"
mdx:
  format: md
---

# Models

:::caution Technical Preview
The C# SDK is a **technical preview** available from Camunda 8.9. It will become fully supported in Camunda 8.10. Its API surface may change in future releases without following semver.
:::

Request and response model classes (540 types).

## Quick Reference

- [ActivatedJob](#activatedjob) — An activated job received from the Camunda broker, with typed variable access
- [ActivatedJobResult](#activatedjobresult) — ActivatedJobResult
- [AdHocSubProcessActivateActivitiesInstruction](#adhocsubprocessactivateactivitiesinstruction) — AdHocSubProcessActivateActivitiesInstruction
- [AdHocSubProcessActivateActivityReference](#adhocsubprocessactivateactivityreference) — AdHocSubProcessActivateActivityReference
- [AdvancedActorTypeFilter](#advancedactortypefilter) — Advanced AuditLogActorTypeEnum filter
- [AdvancedAuditLogEntityKeyFilter](#advancedauditlogentitykeyfilter) — Advanced entityKey filter
- [AdvancedAuditLogKeyFilter](#advancedauditlogkeyfilter) — Advanced AuditLogKey filter
- [AdvancedBatchOperationItemStateFilter](#advancedbatchoperationitemstatefilter) — Advanced BatchOperationItemStateEnum filter
- [AdvancedBatchOperationStateFilter](#advancedbatchoperationstatefilter) — Advanced BatchOperationStateEnum filter
- [AdvancedBatchOperationTypeFilter](#advancedbatchoperationtypefilter) — Advanced BatchOperationTypeEnum filter
- [AdvancedCategoryFilter](#advancedcategoryfilter) — Advanced AuditLogCategoryEnum filter
- [AdvancedClusterVariableScopeFilter](#advancedclustervariablescopefilter) — Advanced ClusterVariableScopeEnum filter
- [AdvancedDateTimeFilter](#advanceddatetimefilter) — Advanced date-time filter
- [AdvancedDecisionDefinitionKeyFilter](#advanceddecisiondefinitionkeyfilter) — Advanced DecisionDefinitionKey filter
- [AdvancedDecisionEvaluationInstanceKeyFilter](#advanceddecisionevaluationinstancekeyfilter) — Advanced DecisionEvaluationInstanceKey filter
- [AdvancedDecisionEvaluationKeyFilter](#advanceddecisionevaluationkeyfilter) — Advanced DecisionEvaluationKey filter
- [AdvancedDecisionInstanceStateFilter](#advanceddecisioninstancestatefilter) — Advanced DecisionInstanceStateEnum filter
- [AdvancedDecisionRequirementsKeyFilter](#advanceddecisionrequirementskeyfilter) — Advanced DecisionRequirementsKey filter
- [AdvancedDeploymentKeyFilter](#advanceddeploymentkeyfilter) — Advanced DeploymentKey filter
- [AdvancedElementInstanceKeyFilter](#advancedelementinstancekeyfilter) — Advanced ElementInstanceKey filter
- [AdvancedElementInstanceStateFilter](#advancedelementinstancestatefilter) — Advanced ElementInstanceStateEnum filter
- [AdvancedEntityTypeFilter](#advancedentitytypefilter) — Advanced AuditLogEntityTypeEnum filter
- [AdvancedFormKeyFilter](#advancedformkeyfilter) — Advanced FormKey filter
- [AdvancedGlobalListenerSourceFilter](#advancedgloballistenersourcefilter) — Advanced global listener source filter
- [AdvancedGlobalTaskListenerEventTypeFilter](#advancedglobaltasklistenereventtypefilter) — Advanced global listener event type filter
- [AdvancedIncidentErrorTypeFilter](#advancedincidenterrortypefilter) — Advanced IncidentErrorTypeEnum filter
- [AdvancedIncidentStateFilter](#advancedincidentstatefilter) — Advanced IncidentStateEnum filter
- [AdvancedIntegerFilter](#advancedintegerfilter) — Advanced integer (int32) filter
- [AdvancedJobKeyFilter](#advancedjobkeyfilter) — Advanced JobKey filter
- [AdvancedJobKindFilter](#advancedjobkindfilter) — Advanced JobKindEnum filter
- [AdvancedJobListenerEventTypeFilter](#advancedjoblistenereventtypefilter) — Advanced JobListenerEventTypeEnum filter
- [AdvancedJobStateFilter](#advancedjobstatefilter) — Advanced JobStateEnum filter
- [AdvancedMessageSubscriptionKeyFilter](#advancedmessagesubscriptionkeyfilter) — Advanced MessageSubscriptionKey filter
- [AdvancedMessageSubscriptionStateFilter](#advancedmessagesubscriptionstatefilter) — Advanced MessageSubscriptionStateEnum filter
- [AdvancedOperationTypeFilter](#advancedoperationtypefilter) — Advanced AuditLogOperationTypeEnum filter
- [AdvancedProcessDefinitionKeyFilter](#advancedprocessdefinitionkeyfilter) — Advanced ProcessDefinitionKey filter
- [AdvancedProcessInstanceKeyFilter](#advancedprocessinstancekeyfilter) — Advanced ProcessInstanceKey filter
- [AdvancedProcessInstanceStateFilter](#advancedprocessinstancestatefilter) — Advanced ProcessInstanceStateEnum filter
- [AdvancedResourceKeyFilter](#advancedresourcekeyfilter) — Advanced ResourceKey filter
- [AdvancedResultFilter](#advancedresultfilter) — Advanced AuditLogResultEnum filter
- [AdvancedScopeKeyFilter](#advancedscopekeyfilter) — Advanced ScopeKey filter
- [AdvancedStringFilter](#advancedstringfilter) — Advanced string filter
- [AdvancedUserTaskStateFilter](#advancedusertaskstatefilter) — Advanced UserTaskStateEnum filter
- [AdvancedVariableKeyFilter](#advancedvariablekeyfilter) — Advanced VariableKey filter
- [AncestorScopeInstruction](#ancestorscopeinstruction) — Defines the ancestor scope for the created element instances
- [AuditLogActorTypeExactMatch](#auditlogactortypeexactmatch) — Matches the value exactly
- [AuditLogActorTypeFilterProperty](#auditlogactortypefilterproperty) — AuditLogActorTypeEnum property with full advanced search capabilities
- [AuditLogEntityKeyExactMatch](#auditlogentitykeyexactmatch) — Matches the value exactly
- [AuditLogEntityKeyFilterProperty](#auditlogentitykeyfilterproperty) — EntityKey property with full advanced search capabilities
- [AuditLogFilter](#auditlogfilter) — Audit log filter request
- [AuditLogKeyExactMatch](#auditlogkeyexactmatch) — Matches the value exactly
- [AuditLogKeyFilterProperty](#auditlogkeyfilterproperty) — AuditLogKey property with full advanced search capabilities
- [AuditLogResult](#auditlogresult) — Audit log item
- [AuditLogResultExactMatch](#auditlogresultexactmatch) — Matches the value exactly
- [AuditLogResultFilterProperty](#auditlogresultfilterproperty) — AuditLogResultEnum property with full advanced search capabilities
- [AuditLogSearchQueryRequest](#auditlogsearchqueryrequest) — Audit log search request
- [AuditLogSearchQueryResult](#auditlogsearchqueryresult) — Audit log search response
- [AuditLogSearchQuerySortRequest](#auditlogsearchquerysortrequest) — AuditLogSearchQuerySortRequest
- [AuthorizationCreateResult](#authorizationcreateresult) — AuthorizationCreateResult
- [AuthorizationFilter](#authorizationfilter) — Authorization search filter
- [AuthorizationIdBasedRequest](#authorizationidbasedrequest) — AuthorizationIdBasedRequest
- [AuthorizationPropertyBasedRequest](#authorizationpropertybasedrequest) — AuthorizationPropertyBasedRequest
- [AuthorizationRequest](#authorizationrequest) — Defines an authorization request
- [AuthorizationResult](#authorizationresult) — AuthorizationResult
- [AuthorizationSearchQuery](#authorizationsearchquery) — AuthorizationSearchQuery
- [AuthorizationSearchQuerySortRequest](#authorizationsearchquerysortrequest) — AuthorizationSearchQuerySortRequest
- [AuthorizationSearchResult](#authorizationsearchresult) — AuthorizationSearchResult
- [BackpressureState](#backpressurestate)
- [BaseProcessInstanceFilterFields](#baseprocessinstancefilterfields) — Base process instance search filter
- [BasicStringFilter](#basicstringfilter) — Basic advanced string filter
- [BasicStringFilterProperty](#basicstringfilterproperty) — String property with basic advanced search capabilities
- [BatchOperationCreatedResult](#batchoperationcreatedresult) — The created batch operation
- [BatchOperationError](#batchoperationerror) — BatchOperationError
- [BatchOperationFilter](#batchoperationfilter) — Batch operation filter request
- [BatchOperationItemFilter](#batchoperationitemfilter) — Batch operation item filter request
- [BatchOperationItemResponse](#batchoperationitemresponse) — BatchOperationItemResponse
- [BatchOperationItemSearchQuery](#batchoperationitemsearchquery) — Batch operation item search request
- [BatchOperationItemSearchQueryResult](#batchoperationitemsearchqueryresult) — BatchOperationItemSearchQueryResult
- [BatchOperationItemSearchQuerySortRequest](#batchoperationitemsearchquerysortrequest) — BatchOperationItemSearchQuerySortRequest
- [BatchOperationItemStateExactMatch](#batchoperationitemstateexactmatch) — Matches the value exactly
- [BatchOperationItemStateFilterProperty](#batchoperationitemstatefilterproperty) — BatchOperationItemStateEnum property with full advanced search capabilities
- [BatchOperationResponse](#batchoperationresponse) — BatchOperationResponse
- [BatchOperationSearchQuery](#batchoperationsearchquery) — Batch operation search request
- [BatchOperationSearchQueryResult](#batchoperationsearchqueryresult) — The batch operation search query result
- [BatchOperationSearchQuerySortRequest](#batchoperationsearchquerysortrequest) — BatchOperationSearchQuerySortRequest
- [BatchOperationStateExactMatch](#batchoperationstateexactmatch) — Matches the value exactly
- [BatchOperationStateFilterProperty](#batchoperationstatefilterproperty) — BatchOperationStateEnum property with full advanced search capabilities
- [BatchOperationTypeExactMatch](#batchoperationtypeexactmatch) — Matches the value exactly
- [BatchOperationTypeFilterProperty](#batchoperationtypefilterproperty) — BatchOperationTypeEnum property with full advanced search capabilities
- [BpmnErrorException](#bpmnerrorexception) — Throw from a job handler to trigger a BPMN error boundary event on the job's task
- [BrokerInfo](#brokerinfo) — Provides information on a broker node
- [BusinessId](#businessid) — An optional, user-defined string identifier that identifies the process instance
  within the scope of a process definition (scoped by tenant)
- [CamundaAuthException](#camundaauthexception) — Authentication-specific exception
- [CamundaConfigurationException](#camundaconfigurationexception) — Thrown when configuration hydration encounters validation errors
- [CamundaKeyJsonConverterFactory](#camundakeyjsonconverterfactory) — JSON converter factory that handles any struct
- [CamundaKeyValidation](#camundakeyvalidation) — Validation helpers for domain key constraints
- [CamundaLongKeyJsonConverterFactory](#camundalongkeyjsonconverterfactory) — JSON converter factory that handles any struct
- [CamundaSdkException](#camundasdkexception) — SDK error types mirroring the JS SDK's error structure
- [CamundaUserResult](#camundauserresult) — CamundaUserResult
- [CancelProcessInstanceRequest](#cancelprocessinstancerequest) — CancelProcessInstanceRequest
- [CancelSdkException](#cancelsdkexception) — Thrown when a cancellable operation is cancelled
- [CategoryExactMatch](#categoryexactmatch) — Matches the value exactly
- [CategoryFilterProperty](#categoryfilterproperty) — AuditLogCategoryEnum property with full advanced search capabilities
- [Changeset](#changeset) — JSON object with changed task attribute values
- [ClockPinRequest](#clockpinrequest) — ClockPinRequest
- [ClusterVariableResult](#clustervariableresult) — ClusterVariableResult
- [ClusterVariableResultBase](#clustervariableresultbase) — Cluster variable response item
- [ClusterVariableScopeExactMatch](#clustervariablescopeexactmatch) — Matches the value exactly
- [ClusterVariableScopeFilterProperty](#clustervariablescopefilterproperty) — ClusterVariableScopeEnum property with full advanced search capabilities
- [ClusterVariableSearchQueryFilterRequest](#clustervariablesearchqueryfilterrequest) — Cluster variable filter request
- [ClusterVariableSearchQueryRequest](#clustervariablesearchqueryrequest) — Cluster variable search query request
- [ClusterVariableSearchQueryResult](#clustervariablesearchqueryresult) — Cluster variable search query response
- [ClusterVariableSearchQuerySortRequest](#clustervariablesearchquerysortrequest) — ClusterVariableSearchQuerySortRequest
- [ClusterVariableSearchResult](#clustervariablesearchresult) — Cluster variable search response item
- [ConditionalEvaluationInstruction](#conditionalevaluationinstruction) — ConditionalEvaluationInstruction
- [ConsistencyOptions<T>](#consistencyoptions<t>) — Options for eventual consistency polling behavior
- [CorrelatedMessageSubscriptionFilter](#correlatedmessagesubscriptionfilter) — Correlated message subscriptions search filter
- [CorrelatedMessageSubscriptionResult](#correlatedmessagesubscriptionresult) — CorrelatedMessageSubscriptionResult
- [CorrelatedMessageSubscriptionSearchQuery](#correlatedmessagesubscriptionsearchquery) — CorrelatedMessageSubscriptionSearchQuery
- [CorrelatedMessageSubscriptionSearchQueryResult](#correlatedmessagesubscriptionsearchqueryresult) — CorrelatedMessageSubscriptionSearchQueryResult
- [CorrelatedMessageSubscriptionSearchQuerySortRequest](#correlatedmessagesubscriptionsearchquerysortrequest) — CorrelatedMessageSubscriptionSearchQuerySortRequest
- [CreateClusterVariableRequest](#createclustervariablerequest) — CreateClusterVariableRequest
- [CreateGlobalTaskListenerRequest](#createglobaltasklistenerrequest) — CreateGlobalTaskListenerRequest
- [CreateMappingRuleResponse](#createmappingruleresponse) — CreateMappingRuleResponse
- [CreateProcessInstanceResult](#createprocessinstanceresult) — CreateProcessInstanceResult
- [CursorBackwardPagination](#cursorbackwardpagination) — CursorBackwardPagination
- [CursorForwardPagination](#cursorforwardpagination) — CursorForwardPagination
- [DateTimeFilterProperty](#datetimefilterproperty) — Date-time property with full advanced search capabilities
- [DecisionDefinitionFilter](#decisiondefinitionfilter) — Decision definition search filter
- [DecisionDefinitionId](#decisiondefinitionid) — Id of a decision definition, from the model
- [DecisionDefinitionKeyExactMatch](#decisiondefinitionkeyexactmatch) — Matches the value exactly
- [DecisionDefinitionKeyFilterProperty](#decisiondefinitionkeyfilterproperty) — DecisionDefinitionKey property with full advanced search capabilities
- [DecisionDefinitionResult](#decisiondefinitionresult) — DecisionDefinitionResult
- [DecisionDefinitionSearchQuery](#decisiondefinitionsearchquery) — DecisionDefinitionSearchQuery
- [DecisionDefinitionSearchQueryResult](#decisiondefinitionsearchqueryresult) — DecisionDefinitionSearchQueryResult
- [DecisionDefinitionSearchQuerySortRequest](#decisiondefinitionsearchquerysortrequest) — DecisionDefinitionSearchQuerySortRequest
- [DecisionEvaluationById](#decisionevaluationbyid) — DecisionEvaluationById
- [DecisionEvaluationByKey](#decisionevaluationbykey) — DecisionEvaluationByKey
- [DecisionEvaluationInstanceKeyExactMatch](#decisionevaluationinstancekeyexactmatch) — Matches the value exactly
- [DecisionEvaluationInstanceKeyFilterProperty](#decisionevaluationinstancekeyfilterproperty) — DecisionEvaluationInstanceKey property with full advanced search capabilities
- [DecisionEvaluationInstruction](#decisionevaluationinstruction) — DecisionEvaluationInstruction
- [DecisionEvaluationKeyExactMatch](#decisionevaluationkeyexactmatch) — Matches the value exactly
- [DecisionEvaluationKeyFilterProperty](#decisionevaluationkeyfilterproperty) — DecisionEvaluationKey property with full advanced search capabilities
- [DecisionInstanceDeletionBatchOperationRequest](#decisioninstancedeletionbatchoperationrequest) — The decision instance filter that defines which decision instances should be deleted
- [DecisionInstanceFilter](#decisioninstancefilter) — Decision instance search filter
- [DecisionInstanceGetQueryResult](#decisioninstancegetqueryresult) — DecisionInstanceGetQueryResult
- [DecisionInstanceResult](#decisioninstanceresult) — DecisionInstanceResult
- [DecisionInstanceSearchQuery](#decisioninstancesearchquery) — DecisionInstanceSearchQuery
- [DecisionInstanceSearchQueryResult](#decisioninstancesearchqueryresult) — DecisionInstanceSearchQueryResult
- [DecisionInstanceSearchQuerySortRequest](#decisioninstancesearchquerysortrequest) — DecisionInstanceSearchQuerySortRequest
- [DecisionInstanceStateExactMatch](#decisioninstancestateexactmatch) — Matches the value exactly
- [DecisionInstanceStateFilterProperty](#decisioninstancestatefilterproperty) — DecisionInstanceStateEnum property with full advanced search capabilities
- [DecisionRequirementsFilter](#decisionrequirementsfilter) — Decision requirements search filter
- [DecisionRequirementsKeyExactMatch](#decisionrequirementskeyexactmatch) — Matches the value exactly
- [DecisionRequirementsKeyFilterProperty](#decisionrequirementskeyfilterproperty) — DecisionRequirementsKey property with full advanced search capabilities
- [DecisionRequirementsResult](#decisionrequirementsresult) — DecisionRequirementsResult
- [DecisionRequirementsSearchQuery](#decisionrequirementssearchquery) — DecisionRequirementsSearchQuery
- [DecisionRequirementsSearchQueryResult](#decisionrequirementssearchqueryresult) — DecisionRequirementsSearchQueryResult
- [DecisionRequirementsSearchQuerySortRequest](#decisionrequirementssearchquerysortrequest) — DecisionRequirementsSearchQuerySortRequest
- [DeleteDecisionInstanceRequest](#deletedecisioninstancerequest) — DeleteDecisionInstanceRequest
- [DeleteProcessInstanceRequest](#deleteprocessinstancerequest) — DeleteProcessInstanceRequest
- [DeleteResourceRequest](#deleteresourcerequest) — DeleteResourceRequest
- [DeleteResourceResponse](#deleteresourceresponse) — DeleteResourceResponse
- [DeploymentDecisionRequirementsResult](#deploymentdecisionrequirementsresult) — Deployed decision requirements
- [DeploymentDecisionResult](#deploymentdecisionresult) — A deployed decision
- [DeploymentFormResult](#deploymentformresult) — A deployed form
- [DeploymentKeyExactMatch](#deploymentkeyexactmatch) — Matches the value exactly
- [DeploymentKeyFilterProperty](#deploymentkeyfilterproperty) — DeploymentKey property with full advanced search capabilities
- [DeploymentMetadataResult](#deploymentmetadataresult) — DeploymentMetadataResult
- [DeploymentProcessResult](#deploymentprocessresult) — A deployed process
- [DeploymentResourceResult](#deploymentresourceresult) — A deployed Resource
- [DeploymentResult](#deploymentresult) — DeploymentResult
- [DirectAncestorKeyInstruction](#directancestorkeyinstruction) — Provides a concrete key to use as ancestor scope for the created element instance
- [DocumentCreationBatchResponse](#documentcreationbatchresponse) — DocumentCreationBatchResponse
- [DocumentCreationFailureDetail](#documentcreationfailuredetail) — DocumentCreationFailureDetail
- [DocumentId](#documentid) — Document Id that uniquely identifies a document
- [DocumentLink](#documentlink) — DocumentLink
- [DocumentLinkRequest](#documentlinkrequest) — DocumentLinkRequest
- [DocumentMetadata](#documentmetadata) — Information about the document
- [DocumentMetadataResponse](#documentmetadataresponse) — Information about the document that is returned in responses
- [DocumentReference](#documentreference) — DocumentReference
- [ElementId](#elementid) — The model-defined id of an element
- [ElementInstanceFilter](#elementinstancefilter) — Element instance filter
- [ElementInstanceKeyExactMatch](#elementinstancekeyexactmatch) — Matches the value exactly
- [ElementInstanceKeyFilterProperty](#elementinstancekeyfilterproperty) — ElementInstanceKey property with full advanced search capabilities
- [ElementInstanceResult](#elementinstanceresult) — ElementInstanceResult
- [ElementInstanceSearchQuery](#elementinstancesearchquery) — Element instance search request
- [ElementInstanceSearchQueryResult](#elementinstancesearchqueryresult) — ElementInstanceSearchQueryResult
- [ElementInstanceSearchQuerySortRequest](#elementinstancesearchquerysortrequest) — ElementInstanceSearchQuerySortRequest
- [ElementInstanceStateExactMatch](#elementinstancestateexactmatch) — Matches the value exactly
- [ElementInstanceStateFilterProperty](#elementinstancestatefilterproperty) — ElementInstanceStateEnum property with full advanced search capabilities
- [EndCursor](#endcursor) — The end cursor in a search query result set
- [EntityTypeExactMatch](#entitytypeexactmatch) — Matches the value exactly
- [EntityTypeFilterProperty](#entitytypefilterproperty) — AuditLogEntityTypeEnum property with full advanced search capabilities
- [EvaluateConditionalResult](#evaluateconditionalresult) — EvaluateConditionalResult
- [EvaluateDecisionResult](#evaluatedecisionresult) — EvaluateDecisionResult
- [EvaluatedDecisionInputItem](#evaluateddecisioninputitem) — A decision input that was evaluated within this decision evaluation
- [EvaluatedDecisionOutputItem](#evaluateddecisionoutputitem) — The evaluated decision outputs
- [EvaluatedDecisionResult](#evaluateddecisionresult) — A decision that was evaluated
- [EventualConsistencyTimeoutException](#eventualconsistencytimeoutexception) — Thrown when an eventually consistent endpoint times out waiting for data
- [ExpressionEvaluationRequest](#expressionevaluationrequest) — ExpressionEvaluationRequest
- [ExpressionEvaluationResult](#expressionevaluationresult) — ExpressionEvaluationResult
- [ExpressionEvaluationWarningItem](#expressionevaluationwarningitem) — ExpressionEvaluationWarningItem
- [ExtendedDeploymentResponse](#extendeddeploymentresponse) — Extended deployment result with typed convenience properties for direct access
  to deployed artifacts by category (processes, decisions, forms, etc
- [FormId](#formid) — The user-defined id for the form
- [FormKeyExactMatch](#formkeyexactmatch) — Matches the value exactly
- [FormKeyFilterProperty](#formkeyfilterproperty) — FormKey property with full advanced search capabilities
- [FormResult](#formresult) — FormResult
- [GetUserResponse](#getuserresponse) — GetUserResponse
- [GlobalJobStatisticsQueryResult](#globaljobstatisticsqueryresult) — Global job statistics query result
- [GlobalListenerBase](#globallistenerbase) — GlobalListenerBase
- [GlobalListenerId](#globallistenerid) — The user-defined id for the global listener
- [GlobalListenerSourceExactMatch](#globallistenersourceexactmatch) — Matches the value exactly
- [GlobalListenerSourceFilterProperty](#globallistenersourcefilterproperty) — Global listener source property with full advanced search capabilities
- [GlobalTaskListenerBase](#globaltasklistenerbase) — GlobalTaskListenerBase
- [GlobalTaskListenerEventTypeExactMatch](#globaltasklistenereventtypeexactmatch) — Matches the value exactly
- [GlobalTaskListenerEventTypeFilterProperty](#globaltasklistenereventtypefilterproperty) — Global listener event type property with full advanced search capabilities
- [GlobalTaskListenerResult](#globaltasklistenerresult) — GlobalTaskListenerResult
- [GlobalTaskListenerSearchQueryFilterRequest](#globaltasklistenersearchqueryfilterrequest) — Global listener filter request
- [GlobalTaskListenerSearchQueryRequest](#globaltasklistenersearchqueryrequest) — Global listener search query request
- [GlobalTaskListenerSearchQueryResult](#globaltasklistenersearchqueryresult) — Global listener search query response
- [GlobalTaskListenerSearchQuerySortRequest](#globaltasklistenersearchquerysortrequest) — GlobalTaskListenerSearchQuerySortRequest
- [GroupClientResult](#groupclientresult) — GroupClientResult
- [GroupClientSearchQueryRequest](#groupclientsearchqueryrequest) — GroupClientSearchQueryRequest
- [GroupClientSearchQuerySortRequest](#groupclientsearchquerysortrequest) — GroupClientSearchQuerySortRequest
- [GroupClientSearchResult](#groupclientsearchresult) — GroupClientSearchResult
- [GroupCreateRequest](#groupcreaterequest) — GroupCreateRequest
- [GroupCreateResult](#groupcreateresult) — GroupCreateResult
- [GroupFilter](#groupfilter) — Group filter request
- [GroupMappingRuleSearchResult](#groupmappingrulesearchresult) — GroupMappingRuleSearchResult
- [GroupResult](#groupresult) — Group search response item
- [GroupRoleSearchResult](#grouprolesearchresult) — GroupRoleSearchResult
- [GroupSearchQueryRequest](#groupsearchqueryrequest) — Group search request
- [GroupSearchQueryResult](#groupsearchqueryresult) — Group search response
- [GroupSearchQuerySortRequest](#groupsearchquerysortrequest) — GroupSearchQuerySortRequest
- [GroupUpdateRequest](#groupupdaterequest) — GroupUpdateRequest
- [GroupUpdateResult](#groupupdateresult) — GroupUpdateResult
- [GroupUserResult](#groupuserresult) — GroupUserResult
- [GroupUserSearchQueryRequest](#groupusersearchqueryrequest) — GroupUserSearchQueryRequest
- [GroupUserSearchQuerySortRequest](#groupusersearchquerysortrequest) — GroupUserSearchQuerySortRequest
- [GroupUserSearchResult](#groupusersearchresult) — GroupUserSearchResult
- [HttpSdkException](#httpsdkexception) — HTTP-specific SDK error with RFC 7807 Problem Details
- [ICamundaKey](#icamundakey) — Marker interface for all Camunda domain key types
- [ICamundaLongKey](#icamundalongkey) — Marker interface for Camunda domain types backed by a long (int64) value
- [ITenantIdSettable](#itenantidsettable) — Implemented by request body types that have an optional tenantId property
- [IncidentErrorTypeExactMatch](#incidenterrortypeexactmatch) — Matches the value exactly
- [IncidentErrorTypeFilterProperty](#incidenterrortypefilterproperty) — IncidentErrorTypeEnum with full advanced search capabilities
- [IncidentFilter](#incidentfilter) — Incident search filter
- [IncidentProcessInstanceStatisticsByDefinitionFilter](#incidentprocessinstancestatisticsbydefinitionfilter) — Filter for the incident process instance statistics by definition query
- [IncidentProcessInstanceStatisticsByDefinitionQuery](#incidentprocessinstancestatisticsbydefinitionquery) — IncidentProcessInstanceStatisticsByDefinitionQuery
- [IncidentProcessInstanceStatisticsByDefinitionQueryResult](#incidentprocessinstancestatisticsbydefinitionqueryresult) — IncidentProcessInstanceStatisticsByDefinitionQueryResult
- [IncidentProcessInstanceStatisticsByDefinitionQuerySortRequest](#incidentprocessinstancestatisticsbydefinitionquerysortrequest) — IncidentProcessInstanceStatisticsByDefinitionQuerySortRequest
- [IncidentProcessInstanceStatisticsByDefinitionResult](#incidentprocessinstancestatisticsbydefinitionresult) — IncidentProcessInstanceStatisticsByDefinitionResult
- [IncidentProcessInstanceStatisticsByErrorQuery](#incidentprocessinstancestatisticsbyerrorquery) — IncidentProcessInstanceStatisticsByErrorQuery
- [IncidentProcessInstanceStatisticsByErrorQueryResult](#incidentprocessinstancestatisticsbyerrorqueryresult) — IncidentProcessInstanceStatisticsByErrorQueryResult
- [IncidentProcessInstanceStatisticsByErrorQuerySortRequest](#incidentprocessinstancestatisticsbyerrorquerysortrequest) — IncidentProcessInstanceStatisticsByErrorQuerySortRequest
- [IncidentProcessInstanceStatisticsByErrorResult](#incidentprocessinstancestatisticsbyerrorresult) — IncidentProcessInstanceStatisticsByErrorResult
- [IncidentResolutionRequest](#incidentresolutionrequest) — IncidentResolutionRequest
- [IncidentResult](#incidentresult) — IncidentResult
- [IncidentSearchQuery](#incidentsearchquery) — IncidentSearchQuery
- [IncidentSearchQueryResult](#incidentsearchqueryresult) — IncidentSearchQueryResult
- [IncidentSearchQuerySortRequest](#incidentsearchquerysortrequest) — IncidentSearchQuerySortRequest
- [IncidentStateExactMatch](#incidentstateexactmatch) — Matches the value exactly
- [IncidentStateFilterProperty](#incidentstatefilterproperty) — IncidentStateEnum with full advanced search capabilities
- [InferredAncestorKeyInstruction](#inferredancestorkeyinstruction) — Instructs the engine to derive the ancestor scope key from the source element's hierarchy
- [IntegerFilterProperty](#integerfilterproperty) — Integer property with advanced search capabilities
- [JobActivationRequest](#jobactivationrequest) — JobActivationRequest
- [JobActivationResult](#jobactivationresult) — The list of activated jobs
- [JobChangeset](#jobchangeset) — JSON object with changed job attribute values
- [JobCompletionRequest](#jobcompletionrequest) — JobCompletionRequest
- [JobErrorRequest](#joberrorrequest) — JobErrorRequest
- [JobErrorStatisticsFilter](#joberrorstatisticsfilter) — Job error statistics search filter
- [JobErrorStatisticsItem](#joberrorstatisticsitem) — Aggregated error metrics for a single error type and message combination
- [JobErrorStatisticsQuery](#joberrorstatisticsquery) — Job error statistics query
- [JobErrorStatisticsQueryResult](#joberrorstatisticsqueryresult) — Job error statistics query result
- [JobFailRequest](#jobfailrequest) — JobFailRequest
- [JobFailureException](#jobfailureexception) — Throw from a job handler to explicitly fail a job with custom retry settings
- [JobFilter](#jobfilter) — Job search filter
- [JobHandler](#jobhandler) — Delegate for job handler functions
- [JobKeyExactMatch](#jobkeyexactmatch) — Matches the value exactly
- [JobKeyFilterProperty](#jobkeyfilterproperty) — JobKey property with full advanced search capabilities
- [JobKindExactMatch](#jobkindexactmatch) — Matches the value exactly
- [JobKindFilterProperty](#jobkindfilterproperty) — JobKindEnum property with full advanced search capabilities
- [JobListenerEventTypeExactMatch](#joblistenereventtypeexactmatch) — Matches the value exactly
- [JobListenerEventTypeFilterProperty](#joblistenereventtypefilterproperty) — JobListenerEventTypeEnum property with full advanced search capabilities
- [JobMetricsConfigurationResponse](#jobmetricsconfigurationresponse) — Configuration for job metrics collection and export
- [JobResult](#jobresult) — The result of the completed job as determined by the worker
- [JobResultActivateElement](#jobresultactivateelement) — Instruction to activate a single BPMN element within an ad‑hoc sub‑process, optionally providing variables scoped to that element
- [JobResultAdHocSubProcess](#jobresultadhocsubprocess) — Job result details for an ad‑hoc sub‑process, including elements to activate and flags indicating completion or cancellation behavior
- [JobResultCorrections](#jobresultcorrections) — JSON object with attributes that were corrected by the worker
- [JobResultUserTask](#jobresultusertask) — Job result details for a user task completion, optionally including a denial reason and corrected task properties
- [JobSearchQuery](#jobsearchquery) — Job search request
- [JobSearchQueryResult](#jobsearchqueryresult) — Job search response
- [JobSearchQuerySortRequest](#jobsearchquerysortrequest) — JobSearchQuerySortRequest
- [JobSearchResult](#jobsearchresult) — JobSearchResult
- [JobStateExactMatch](#jobstateexactmatch) — Matches the value exactly
- [JobStateFilterProperty](#jobstatefilterproperty) — JobStateEnum property with full advanced search capabilities
- [JobTimeSeriesStatisticsFilter](#jobtimeseriesstatisticsfilter) — Job time-series statistics search filter
- [JobTimeSeriesStatisticsItem](#jobtimeseriesstatisticsitem) — Aggregated job metrics for a single time bucket
- [JobTimeSeriesStatisticsQuery](#jobtimeseriesstatisticsquery) — Job time-series statistics query
- [JobTimeSeriesStatisticsQueryResult](#jobtimeseriesstatisticsqueryresult) — Job time-series statistics query result
- [JobTypeStatisticsFilter](#jobtypestatisticsfilter) — Job type statistics search filter
- [JobTypeStatisticsItem](#jobtypestatisticsitem) — Statistics for a single job type
- [JobTypeStatisticsQuery](#jobtypestatisticsquery) — Job type statistics query
- [JobTypeStatisticsQueryResult](#jobtypestatisticsqueryresult) — Job type statistics query result
- [JobUpdateRequest](#jobupdaterequest) — JobUpdateRequest
- [JobWorker](#jobworker) — A long-running worker that polls the Camunda broker for jobs of a specific type,
  dispatches them to a handler, and auto-completes or auto-fails based on the outcome
- [JobWorkerStatisticsFilter](#jobworkerstatisticsfilter) — Job worker statistics search filter
- [JobWorkerStatisticsItem](#jobworkerstatisticsitem) — Statistics for a single worker within a job type
- [JobWorkerStatisticsQuery](#jobworkerstatisticsquery) — Job worker statistics query
- [JobWorkerStatisticsQueryResult](#jobworkerstatisticsqueryresult) — Job worker statistics query result
- [LicenseResponse](#licenseresponse) — The response of a license request
- [LikeFilter](#likefilter) — Checks if the property matches the provided like value
- [LimitPagination](#limitpagination) — LimitPagination
- [MappingRuleCreateRequest](#mappingrulecreaterequest) — MappingRuleCreateRequest
- [MappingRuleCreateResult](#mappingrulecreateresult) — MappingRuleCreateResult
- [MappingRuleCreateUpdateRequest](#mappingrulecreateupdaterequest) — MappingRuleCreateUpdateRequest
- [MappingRuleCreateUpdateResult](#mappingrulecreateupdateresult) — MappingRuleCreateUpdateResult
- [MappingRuleFilter](#mappingrulefilter) — Mapping rule search filter
- [MappingRuleResult](#mappingruleresult) — MappingRuleResult
- [MappingRuleSearchQueryRequest](#mappingrulesearchqueryrequest) — MappingRuleSearchQueryRequest
- [MappingRuleSearchQueryResult](#mappingrulesearchqueryresult) — MappingRuleSearchQueryResult
- [MappingRuleSearchQuerySortRequest](#mappingrulesearchquerysortrequest) — MappingRuleSearchQuerySortRequest
- [MappingRuleUpdateRequest](#mappingruleupdaterequest) — MappingRuleUpdateRequest
- [MappingRuleUpdateResult](#mappingruleupdateresult) — MappingRuleUpdateResult
- [MatchedDecisionRuleItem](#matcheddecisionruleitem) — A decision rule that matched within this decision evaluation
- [MessageCorrelationRequest](#messagecorrelationrequest) — MessageCorrelationRequest
- [MessageCorrelationResult](#messagecorrelationresult) — The message key of the correlated message, as well as the first process instance key it
  correlated with
- [MessagePublicationRequest](#messagepublicationrequest) — MessagePublicationRequest
- [MessagePublicationResult](#messagepublicationresult) — The message key of the published message
- [MessageSubscriptionFilter](#messagesubscriptionfilter) — Message subscription search filter
- [MessageSubscriptionKeyExactMatch](#messagesubscriptionkeyexactmatch) — Matches the value exactly
- [MessageSubscriptionKeyFilterProperty](#messagesubscriptionkeyfilterproperty) — MessageSubscriptionKey property with full advanced search capabilities
- [MessageSubscriptionResult](#messagesubscriptionresult) — MessageSubscriptionResult
- [MessageSubscriptionSearchQuery](#messagesubscriptionsearchquery) — MessageSubscriptionSearchQuery
- [MessageSubscriptionSearchQueryResult](#messagesubscriptionsearchqueryresult) — MessageSubscriptionSearchQueryResult
- [MessageSubscriptionSearchQuerySortRequest](#messagesubscriptionsearchquerysortrequest) — MessageSubscriptionSearchQuerySortRequest
- [MessageSubscriptionStateExactMatch](#messagesubscriptionstateexactmatch) — Matches the value exactly
- [MessageSubscriptionStateFilterProperty](#messagesubscriptionstatefilterproperty) — MessageSubscriptionStateEnum with full advanced search capabilities
- [MigrateProcessInstanceMappingInstruction](#migrateprocessinstancemappinginstruction) — The mapping instructions describe how to map elements from the source process definition to the target process definition
- [ModifyProcessInstanceVariableInstruction](#modifyprocessinstancevariableinstruction) — Instruction describing which variables to create or update
- [OffsetPagination](#offsetpagination) — OffsetPagination
- [OperationReference](#operationreference) — A reference key chosen by the user that will be part of all records resulting from this operation
- [OperationTypeExactMatch](#operationtypeexactmatch) — Matches the value exactly
- [OperationTypeFilterProperty](#operationtypefilterproperty) — AuditLogOperationTypeEnum property with full advanced search capabilities
- [Partition](#partition) — Provides information on a partition within a broker node
- [ProblemDetail](#problemdetail) — A Problem detail object as described in [RFC 9457](https://www
- [ProcessDefinitionElementStatisticsQuery](#processdefinitionelementstatisticsquery) — Process definition element statistics request
- [ProcessDefinitionElementStatisticsQueryResult](#processdefinitionelementstatisticsqueryresult) — Process definition element statistics query response
- [ProcessDefinitionFilter](#processdefinitionfilter) — Process definition search filter
- [ProcessDefinitionId](#processdefinitionid) — Id of a process definition, from the model
- [ProcessDefinitionInstanceStatisticsQuery](#processdefinitioninstancestatisticsquery) — ProcessDefinitionInstanceStatisticsQuery
- [ProcessDefinitionInstanceStatisticsQueryResult](#processdefinitioninstancestatisticsqueryresult) — ProcessDefinitionInstanceStatisticsQueryResult
- [ProcessDefinitionInstanceStatisticsQuerySortRequest](#processdefinitioninstancestatisticsquerysortrequest) — ProcessDefinitionInstanceStatisticsQuerySortRequest
- [ProcessDefinitionInstanceStatisticsResult](#processdefinitioninstancestatisticsresult) — Process definition instance statistics response
- [ProcessDefinitionInstanceVersionStatisticsFilter](#processdefinitioninstanceversionstatisticsfilter) — Process definition instance version statistics search filter
- [ProcessDefinitionInstanceVersionStatisticsQuery](#processdefinitioninstanceversionstatisticsquery) — ProcessDefinitionInstanceVersionStatisticsQuery
- [ProcessDefinitionInstanceVersionStatisticsQueryResult](#processdefinitioninstanceversionstatisticsqueryresult) — ProcessDefinitionInstanceVersionStatisticsQueryResult
- [ProcessDefinitionInstanceVersionStatisticsQuerySortRequest](#processdefinitioninstanceversionstatisticsquerysortrequest) — ProcessDefinitionInstanceVersionStatisticsQuerySortRequest
- [ProcessDefinitionInstanceVersionStatisticsResult](#processdefinitioninstanceversionstatisticsresult) — Process definition instance version statistics response
- [ProcessDefinitionKeyExactMatch](#processdefinitionkeyexactmatch) — Matches the value exactly
- [ProcessDefinitionKeyFilterProperty](#processdefinitionkeyfilterproperty) — ProcessDefinitionKey property with full advanced search capabilities
- [ProcessDefinitionMessageSubscriptionStatisticsQuery](#processdefinitionmessagesubscriptionstatisticsquery) — ProcessDefinitionMessageSubscriptionStatisticsQuery
- [ProcessDefinitionMessageSubscriptionStatisticsQueryResult](#processdefinitionmessagesubscriptionstatisticsqueryresult) — ProcessDefinitionMessageSubscriptionStatisticsQueryResult
- [ProcessDefinitionMessageSubscriptionStatisticsResult](#processdefinitionmessagesubscriptionstatisticsresult) — ProcessDefinitionMessageSubscriptionStatisticsResult
- [ProcessDefinitionResult](#processdefinitionresult) — ProcessDefinitionResult
- [ProcessDefinitionSearchQuery](#processdefinitionsearchquery) — ProcessDefinitionSearchQuery
- [ProcessDefinitionSearchQueryResult](#processdefinitionsearchqueryresult) — ProcessDefinitionSearchQueryResult
- [ProcessDefinitionSearchQuerySortRequest](#processdefinitionsearchquerysortrequest) — ProcessDefinitionSearchQuerySortRequest
- [ProcessDefinitionStatisticsFilter](#processdefinitionstatisticsfilter) — Process definition statistics search filter
- [ProcessElementStatisticsResult](#processelementstatisticsresult) — Process element statistics response
- [ProcessInstanceCallHierarchyEntry](#processinstancecallhierarchyentry) — ProcessInstanceCallHierarchyEntry
- [ProcessInstanceCancellationBatchOperationRequest](#processinstancecancellationbatchoperationrequest) — The process instance filter that defines which process instances should be canceled
- [ProcessInstanceCreationInstruction](#processinstancecreationinstruction) — Instructions for creating a process instance
- [ProcessInstanceCreationInstructionById](#processinstancecreationinstructionbyid) — ProcessInstanceCreationInstructionById
- [ProcessInstanceCreationInstructionByKey](#processinstancecreationinstructionbykey) — ProcessInstanceCreationInstructionByKey
- [ProcessInstanceCreationRuntimeInstruction](#processinstancecreationruntimeinstruction) — ProcessInstanceCreationRuntimeInstruction
- [ProcessInstanceCreationStartInstruction](#processinstancecreationstartinstruction) — ProcessInstanceCreationStartInstruction
- [ProcessInstanceCreationTerminateInstruction](#processinstancecreationterminateinstruction) — Terminates the process instance after a specific BPMN element is completed or terminated
- [ProcessInstanceDeletionBatchOperationRequest](#processinstancedeletionbatchoperationrequest) — The process instance filter that defines which process instances should be deleted
- [ProcessInstanceElementStatisticsQueryResult](#processinstanceelementstatisticsqueryresult) — Process instance element statistics query response
- [ProcessInstanceFilter](#processinstancefilter) — Process instance search filter
- [ProcessInstanceFilterFields](#processinstancefilterfields) — Process instance search filter
- [ProcessInstanceIncidentResolutionBatchOperationRequest](#processinstanceincidentresolutionbatchoperationrequest) — The process instance filter that defines which process instances should have their incidents resolved
- [ProcessInstanceKeyExactMatch](#processinstancekeyexactmatch) — Matches the value exactly
- [ProcessInstanceKeyFilterProperty](#processinstancekeyfilterproperty) — ProcessInstanceKey property with full advanced search capabilities
- [ProcessInstanceMigrationBatchOperationPlan](#processinstancemigrationbatchoperationplan) — The migration instructions describe how to migrate a process instance from one process definition to another
- [ProcessInstanceMigrationBatchOperationRequest](#processinstancemigrationbatchoperationrequest) — ProcessInstanceMigrationBatchOperationRequest
- [ProcessInstanceMigrationInstruction](#processinstancemigrationinstruction) — The migration instructions describe how to migrate a process instance from one process definition to another
- [ProcessInstanceModificationActivateInstruction](#processinstancemodificationactivateinstruction) — Instruction describing an element to activate
- [ProcessInstanceModificationBatchOperationRequest](#processinstancemodificationbatchoperationrequest) — The process instance filter to define on which process instances tokens should be moved,
  and new element instances should be activated or terminated
- [ProcessInstanceModificationInstruction](#processinstancemodificationinstruction) — ProcessInstanceModificationInstruction
- [ProcessInstanceModificationMoveBatchOperationInstruction](#processinstancemodificationmovebatchoperationinstruction) — Instructions describing a move operation
- [ProcessInstanceModificationMoveInstruction](#processinstancemodificationmoveinstruction) — Instruction describing a move operation
- [ProcessInstanceModificationTerminateByIdInstruction](#processinstancemodificationterminatebyidinstruction) — Instruction describing which elements to terminate
- [ProcessInstanceModificationTerminateByKeyInstruction](#processinstancemodificationterminatebykeyinstruction) — Instruction providing the key of the element instance to terminate
- [ProcessInstanceModificationTerminateInstruction](#processinstancemodificationterminateinstruction) — Instruction describing which elements to terminate
- [ProcessInstanceReference](#processinstancereference) — ProcessInstanceReference
- [ProcessInstanceResult](#processinstanceresult) — Process instance search response item
- [ProcessInstanceSearchQuery](#processinstancesearchquery) — Process instance search request
- [ProcessInstanceSearchQueryResult](#processinstancesearchqueryresult) — Process instance search response
- [ProcessInstanceSearchQuerySortRequest](#processinstancesearchquerysortrequest) — ProcessInstanceSearchQuerySortRequest
- [ProcessInstanceSequenceFlowResult](#processinstancesequenceflowresult) — Process instance sequence flow result
- [ProcessInstanceSequenceFlowsQueryResult](#processinstancesequenceflowsqueryresult) — Process instance sequence flows query response
- [ProcessInstanceStateExactMatch](#processinstancestateexactmatch) — Matches the value exactly
- [ProcessInstanceStateFilterProperty](#processinstancestatefilterproperty) — ProcessInstanceStateEnum property with full advanced search capabilities
- [ResourceKeyExactMatch](#resourcekeyexactmatch) — Matches the value exactly
- [ResourceKeyFilterProperty](#resourcekeyfilterproperty) — ResourceKey property with full advanced search capabilities
- [ResourceResult](#resourceresult) — ResourceResult
- [RetryDecision](#retrydecision)
- [RoleClientResult](#roleclientresult) — RoleClientResult
- [RoleClientSearchQueryRequest](#roleclientsearchqueryrequest) — RoleClientSearchQueryRequest
- [RoleClientSearchQuerySortRequest](#roleclientsearchquerysortrequest) — RoleClientSearchQuerySortRequest
- [RoleClientSearchResult](#roleclientsearchresult) — RoleClientSearchResult
- [RoleCreateRequest](#rolecreaterequest) — RoleCreateRequest
- [RoleCreateResult](#rolecreateresult) — RoleCreateResult
- [RoleFilter](#rolefilter) — Role filter request
- [RoleGroupResult](#rolegroupresult) — RoleGroupResult
- [RoleGroupSearchQueryRequest](#rolegroupsearchqueryrequest) — RoleGroupSearchQueryRequest
- [RoleGroupSearchQuerySortRequest](#rolegroupsearchquerysortrequest) — RoleGroupSearchQuerySortRequest
- [RoleGroupSearchResult](#rolegroupsearchresult) — RoleGroupSearchResult
- [RoleMappingRuleSearchResult](#rolemappingrulesearchresult) — RoleMappingRuleSearchResult
- [RoleResult](#roleresult) — Role search response item
- [RoleSearchQueryRequest](#rolesearchqueryrequest) — Role search request
- [RoleSearchQueryResult](#rolesearchqueryresult) — Role search response
- [RoleSearchQuerySortRequest](#rolesearchquerysortrequest) — RoleSearchQuerySortRequest
- [RoleUpdateRequest](#roleupdaterequest) — RoleUpdateRequest
- [RoleUpdateResult](#roleupdateresult) — RoleUpdateResult
- [RoleUserResult](#roleuserresult) — RoleUserResult
- [RoleUserSearchQueryRequest](#roleusersearchqueryrequest) — RoleUserSearchQueryRequest
- [RoleUserSearchQuerySortRequest](#roleusersearchquerysortrequest) — RoleUserSearchQuerySortRequest
- [RoleUserSearchResult](#roleusersearchresult) — RoleUserSearchResult
- [ScopeKeyExactMatch](#scopekeyexactmatch) — Matches the value exactly
- [ScopeKeyFilterProperty](#scopekeyfilterproperty) — ScopeKey property with full advanced search capabilities
- [SearchClientsForGroupRequest](#searchclientsforgrouprequest) — SearchClientsForGroupRequest
- [SearchClientsForGroupResponse](#searchclientsforgroupresponse) — SearchClientsForGroupResponse
- [SearchClientsForRoleRequest](#searchclientsforrolerequest) — SearchClientsForRoleRequest
- [SearchClientsForRoleResponse](#searchclientsforroleresponse) — SearchClientsForRoleResponse
- [SearchClientsForTenantRequest](#searchclientsfortenantrequest) — SearchClientsForTenantRequest
- [SearchClientsForTenantResponse](#searchclientsfortenantresponse) — SearchClientsForTenantResponse
- [SearchMappingRuleResponse](#searchmappingruleresponse) — SearchMappingRuleResponse
- [SearchMappingRulesForGroupResponse](#searchmappingrulesforgroupresponse) — SearchMappingRulesForGroupResponse
- [SearchMappingRulesForRoleResponse](#searchmappingrulesforroleresponse) — SearchMappingRulesForRoleResponse
- [SearchMappingRulesForTenantResponse](#searchmappingrulesfortenantresponse) — SearchMappingRulesForTenantResponse
- [SearchQueryPageRequest](#searchquerypagerequest) — Pagination criteria
- [SearchQueryPageResponse](#searchquerypageresponse) — Pagination information about the search results
- [SearchQueryRequest](#searchqueryrequest) — SearchQueryRequest
- [SearchQueryResponse](#searchqueryresponse) — SearchQueryResponse
- [SearchRolesForGroupResponse](#searchrolesforgroupresponse) — SearchRolesForGroupResponse
- [SearchRolesForTenantResponse](#searchrolesfortenantresponse) — SearchRolesForTenantResponse
- [SearchUserTaskVariablesRequest](#searchusertaskvariablesrequest) — User task search query request
- [SearchUsersForGroupRequest](#searchusersforgrouprequest) — SearchUsersForGroupRequest
- [SearchUsersForGroupResponse](#searchusersforgroupresponse) — SearchUsersForGroupResponse
- [SearchUsersForRoleRequest](#searchusersforrolerequest) — SearchUsersForRoleRequest
- [SearchUsersForRoleResponse](#searchusersforroleresponse) — SearchUsersForRoleResponse
- [SearchUsersForTenantRequest](#searchusersfortenantrequest) — SearchUsersForTenantRequest
- [SearchUsersForTenantResponse](#searchusersfortenantresponse) — SearchUsersForTenantResponse
- [SearchUsersResponse](#searchusersresponse) — SearchUsersResponse
- [SearchVariablesRequest](#searchvariablesrequest) — Variable search query request
- [SetVariableRequest](#setvariablerequest) — SetVariableRequest
- [SignalBroadcastRequest](#signalbroadcastrequest) — SignalBroadcastRequest
- [SignalBroadcastResult](#signalbroadcastresult) — SignalBroadcastResult
- [SourceElementIdInstruction](#sourceelementidinstruction) — Defines an instruction with a sourceElementId
- [SourceElementInstanceKeyInstruction](#sourceelementinstancekeyinstruction) — Defines an instruction with a sourceElementInstanceKey
- [SourceElementInstruction](#sourceelementinstruction) — Defines the source element identifier for the move instruction
- [StartCursor](#startcursor) — The start cursor in a search query result set
- [StatusMetric](#statusmetric) — Metric for a single job status
- [StopResult](#stopresult) — Result of a call
- [StringFilterProperty](#stringfilterproperty) — String property with full advanced search capabilities
- [SystemConfigurationResponse](#systemconfigurationresponse) — Envelope for all system configuration sections
- [Tag](#tag) — A tag
- [TenantClientResult](#tenantclientresult) — TenantClientResult
- [TenantClientSearchQueryRequest](#tenantclientsearchqueryrequest) — TenantClientSearchQueryRequest
- [TenantClientSearchQuerySortRequest](#tenantclientsearchquerysortrequest) — TenantClientSearchQuerySortRequest
- [TenantClientSearchResult](#tenantclientsearchresult) — TenantClientSearchResult
- [TenantCreateRequest](#tenantcreaterequest) — TenantCreateRequest
- [TenantCreateResult](#tenantcreateresult) — TenantCreateResult
- [TenantFilter](#tenantfilter) — Tenant filter request
- [TenantGroupResult](#tenantgroupresult) — TenantGroupResult
- [TenantGroupSearchQueryRequest](#tenantgroupsearchqueryrequest) — TenantGroupSearchQueryRequest
- [TenantGroupSearchQuerySortRequest](#tenantgroupsearchquerysortrequest) — TenantGroupSearchQuerySortRequest
- [TenantGroupSearchResult](#tenantgroupsearchresult) — TenantGroupSearchResult
- [TenantId](#tenantid) — The unique identifier of the tenant
- [TenantMappingRuleSearchResult](#tenantmappingrulesearchresult) — TenantMappingRuleSearchResult
- [TenantResult](#tenantresult) — Tenant search response item
- [TenantRoleSearchResult](#tenantrolesearchresult) — TenantRoleSearchResult
- [TenantSearchQueryRequest](#tenantsearchqueryrequest) — Tenant search request
- [TenantSearchQueryResult](#tenantsearchqueryresult) — Tenant search response
- [TenantSearchQuerySortRequest](#tenantsearchquerysortrequest) — TenantSearchQuerySortRequest
- [TenantUpdateRequest](#tenantupdaterequest) — TenantUpdateRequest
- [TenantUpdateResult](#tenantupdateresult) — TenantUpdateResult
- [TenantUserResult](#tenantuserresult) — TenantUserResult
- [TenantUserSearchQueryRequest](#tenantusersearchqueryrequest) — TenantUserSearchQueryRequest
- [TenantUserSearchQuerySortRequest](#tenantusersearchquerysortrequest) — TenantUserSearchQuerySortRequest
- [TenantUserSearchResult](#tenantusersearchresult) — TenantUserSearchResult
- [TopologyResponse](#topologyresponse) — The response of a topology request
- [TypedVariables](#typedvariables) — Extension methods for deserializing Camunda variable and custom header payloads
  from untyped object properties into strongly-typed DTOs
- [UpdateClusterVariableRequest](#updateclustervariablerequest) — UpdateClusterVariableRequest
- [UpdateGlobalTaskListenerRequest](#updateglobaltasklistenerrequest) — UpdateGlobalTaskListenerRequest
- [UpdateMappingRuleResponse](#updatemappingruleresponse) — UpdateMappingRuleResponse
- [UpdateUserResponse](#updateuserresponse) — UpdateUserResponse
- [UsageMetricsResponse](#usagemetricsresponse) — UsageMetricsResponse
- [UsageMetricsResponseItem](#usagemetricsresponseitem) — UsageMetricsResponseItem
- [UseSourceParentKeyInstruction](#usesourceparentkeyinstruction) — Instructs the engine to use the source's direct parent key as the ancestor scope key for the target element
- [UserCreateResult](#usercreateresult) — UserCreateResult
- [UserFilter](#userfilter) — User search filter
- [UserRequest](#userrequest) — UserRequest
- [UserResult](#userresult) — UserResult
- [UserSearchQueryRequest](#usersearchqueryrequest) — UserSearchQueryRequest
- [UserSearchQuerySortRequest](#usersearchquerysortrequest) — UserSearchQuerySortRequest
- [UserSearchResult](#usersearchresult) — UserSearchResult
- [UserTaskAssignmentRequest](#usertaskassignmentrequest) — UserTaskAssignmentRequest
- [UserTaskAuditLogFilter](#usertaskauditlogfilter) — The user task audit log search filters
- [UserTaskAuditLogSearchQueryRequest](#usertaskauditlogsearchqueryrequest) — User task search query request
- [UserTaskCompletionRequest](#usertaskcompletionrequest) — UserTaskCompletionRequest
- [UserTaskFilter](#usertaskfilter) — User task filter request
- [UserTaskProperties](#usertaskproperties) — Contains properties of a user task
- [UserTaskResult](#usertaskresult) — UserTaskResult
- [UserTaskSearchQuery](#usertasksearchquery) — User task search query request
- [UserTaskSearchQueryResult](#usertasksearchqueryresult) — User task search query response
- [UserTaskSearchQuerySortRequest](#usertasksearchquerysortrequest) — UserTaskSearchQuerySortRequest
- [UserTaskStateExactMatch](#usertaskstateexactmatch) — Matches the value exactly
- [UserTaskStateFilterProperty](#usertaskstatefilterproperty) — UserTaskStateEnum property with full advanced search capabilities
- [UserTaskUpdateRequest](#usertaskupdaterequest) — UserTaskUpdateRequest
- [UserTaskVariableFilter](#usertaskvariablefilter) — The user task variable search filters
- [UserTaskVariableSearchQueryRequest](#usertaskvariablesearchqueryrequest) — User task search query request
- [UserTaskVariableSearchQuerySortRequest](#usertaskvariablesearchquerysortrequest) — UserTaskVariableSearchQuerySortRequest
- [UserUpdateRequest](#userupdaterequest) — UserUpdateRequest
- [UserUpdateResult](#userupdateresult) — UserUpdateResult
- [Username](#username) — The unique name of a user
- [VariableFilter](#variablefilter) — Variable filter request
- [VariableKeyExactMatch](#variablekeyexactmatch) — Matches the value exactly
- [VariableKeyFilterProperty](#variablekeyfilterproperty) — VariableKey property with full advanced search capabilities
- [VariableResult](#variableresult) — Variable search response item
- [VariableResultBase](#variableresultbase) — Variable response item
- [VariableSearchQuery](#variablesearchquery) — Variable search query request
- [VariableSearchQueryResult](#variablesearchqueryresult) — Variable search query response
- [VariableSearchQuerySortRequest](#variablesearchquerysortrequest) — VariableSearchQuerySortRequest
- [VariableSearchResult](#variablesearchresult) — Variable search response item
- [VariableValueFilterProperty](#variablevaluefilterproperty) — VariableValueFilterProperty

---

## ActivatedJob

An activated job received from the Camunda broker, with typed variable access.
This is what job handler functions receive.

```csharp
public sealed class ActivatedJob
```

| Property                   | Type                       | Description                                           |
| -------------------------- | -------------------------- | ----------------------------------------------------- |
| `Type`                     | `String`                   | The job type (matches the BPMN task definition type). |
| `ProcessDefinitionId`      | `ProcessDefinitionId`      | The BPMN process ID of the job's process definition.  |
| `ProcessDefinitionVersion` | `Int32`                    | The version of the job's process definition.          |
| `ElementId`                | `ElementId`                | The associated task element ID.                       |
| `CustomHeaders`            | `Object`                   | Raw custom headers (typically a at runtime).          |
| `Worker`                   | `String`                   | The name of the worker that activated this job.       |
| `Retries`                  | `Int32`                    | Retries remaining for this job.                       |
| `Deadline`                 | `Int64`                    | UNIX epoch timestamp (ms) when the job lock expires.  |
| `Variables`                | `Object`                   | Raw variables (typically a at runtime).               |
| `TenantId`                 | `TenantId`                 | The tenant that owns this job.                        |
| `JobKey`                   | `JobKey`                   | Unique identifier for this job.                       |
| `ProcessInstanceKey`       | `ProcessInstanceKey`       | The process instance this job belongs to.             |
| `ProcessDefinitionKey`     | `ProcessDefinitionKey`     | The process definition key.                           |
| `ElementInstanceKey`       | `ElementInstanceKey`       | The element instance key.                             |
| `Kind`                     | `JobKindEnum`              | The job kind.                                         |
| `ListenerEventType`        | `JobListenerEventTypeEnum` | The listener event type.                              |
| `UserTask`                 | `UserTaskProperties`       | User task properties (if this is a user task job).    |
| `Tags`                     | `List<Tag>`                | Tags associated with this job.                        |

## ActivatedJobResult

ActivatedJobResult

```csharp
public sealed class ActivatedJobResult
```

| Property                   | Type                           | Description                                                                                                                                                                                                                                 |
| -------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Type`                     | `String`                       | The type of the job (should match what was requested).                                                                                                                                                                                      |
| `ProcessDefinitionId`      | `ProcessDefinitionId`          | The bpmn process ID of the job's process definition.                                                                                                                                                                                        |
| `ProcessDefinitionVersion` | `Int32`                        | The version of the job's process definition.                                                                                                                                                                                                |
| `ElementId`                | `ElementId`                    | The associated task element ID.                                                                                                                                                                                                             |
| `CustomHeaders`            | `Object`                       | A set of custom headers defined during modelling; returned as a serialized JSON document.                                                                                                                                                   |
| `Worker`                   | `String`                       | The name of the worker which activated this job.                                                                                                                                                                                            |
| `Retries`                  | `Int32`                        | The amount of retries left to this job (should always be positive).                                                                                                                                                                         |
| `Deadline`                 | `Int64`                        | When the job can be activated again, sent as a UNIX epoch timestamp.                                                                                                                                                                        |
| `Variables`                | `Object`                       | All variables visible to the task scope, computed at activation time.                                                                                                                                                                       |
| `TenantId`                 | `TenantId`                     | The ID of the tenant that owns the job.                                                                                                                                                                                                     |
| `JobKey`                   | `JobKey`                       | The key, a unique identifier for the job.                                                                                                                                                                                                   |
| `ProcessInstanceKey`       | `ProcessInstanceKey`           | The job's process instance key.                                                                                                                                                                                                             |
| `ProcessDefinitionKey`     | `ProcessDefinitionKey`         | The key of the job's process definition.                                                                                                                                                                                                    |
| `ElementInstanceKey`       | `ElementInstanceKey`           | The element instance key of the task.                                                                                                                                                                                                       |
| `Kind`                     | `JobKindEnum`                  | The job kind.                                                                                                                                                                                                                               |
| `ListenerEventType`        | `JobListenerEventTypeEnum`     | The listener event type of the job.                                                                                                                                                                                                         |
| `UserTask`                 | `UserTaskProperties`           | User task properties, if the job is a user task. This is `null` if the job is not a user task.                                                                                                                                              |
| `Tags`                     | `List<Tag>`                    | List of tags. Tags need to start with a letter; then alphanumerics, `_`, `-`, `:`, or `.`; length ≤ 100.                                                                                                                                    |
| `RootProcessInstanceKey`   | `Nullable<ProcessInstanceKey>` | The key of the root process instance. The root process instance is the top-level ancestor in the process instance hierarchy. This field is only present for data belonging to process instance hierarchies created in version 8.9 or later. |

## AdHocSubProcessActivateActivitiesInstruction

AdHocSubProcessActivateActivitiesInstruction

```csharp
public sealed class AdHocSubProcessActivateActivitiesInstruction
```

| Property                   | Type                                             | Description                                                      |
| -------------------------- | ------------------------------------------------ | ---------------------------------------------------------------- |
| `Elements`                 | `List<AdHocSubProcessActivateActivityReference>` | Activities to activate.                                          |
| `CancelRemainingInstances` | `Nullable<Boolean>`                              | Whether to cancel remaining instances of the ad-hoc sub-process. |

## AdHocSubProcessActivateActivityReference

AdHocSubProcessActivateActivityReference

```csharp
public sealed class AdHocSubProcessActivateActivityReference
```

| Property    | Type        | Description                                      |
| ----------- | ----------- | ------------------------------------------------ |
| `ElementId` | `ElementId` | The ID of the element that should be activated.  |
| `Variables` | `Object`    | Variables to be set when activating the element. |

## AdvancedActorTypeFilter

Advanced AuditLogActorTypeEnum filter.

```csharp
public sealed class AdvancedActorTypeFilter
```

| Property | Type                              | Description                                                                                                                                                                                                                                                |
| -------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Eq`     | `Nullable<AuditLogActorTypeEnum>` | Checks for equality with the provided value.                                                                                                                                                                                                               |
| `Neq`    | `Nullable<AuditLogActorTypeEnum>` | Checks for inequality with the provided value.                                                                                                                                                                                                             |
| `Exists` | `Nullable<Boolean>`               | Checks if the current property exists.                                                                                                                                                                                                                     |
| `In`     | `List<AuditLogActorTypeEnum>`     | Checks if the property matches any of the provided values.                                                                                                                                                                                                 |
| `Like`   | `Nullable<LikeFilter>`            | Checks if the property matches the provided like value. Supported wildcard characters are: _ `_`: matches zero, one, or multiple characters. * `?`: matches one, single character.  Wildcard characters can be escaped with backslash, for instance: `\*`. |

## AdvancedAuditLogEntityKeyFilter

Advanced entityKey filter.

```csharp
public sealed class AdvancedAuditLogEntityKeyFilter
```

| Property | Type                          | Description                                                 |
| -------- | ----------------------------- | ----------------------------------------------------------- |
| `Eq`     | `Nullable<AuditLogEntityKey>` | Checks for equality with the provided value.                |
| `Neq`    | `Nullable<AuditLogEntityKey>` | Checks for inequality with the provided value.              |
| `Exists` | `Nullable<Boolean>`           | Checks if the current property exists.                      |
| `In`     | `List<AuditLogEntityKey>`     | Checks if the property matches any of the provided values.  |
| `NotIn`  | `List<AuditLogEntityKey>`     | Checks if the property matches none of the provided values. |

## AdvancedAuditLogKeyFilter

Advanced AuditLogKey filter.

```csharp
public sealed class AdvancedAuditLogKeyFilter
```

| Property | Type                    | Description                                                 |
| -------- | ----------------------- | ----------------------------------------------------------- |
| `Eq`     | `Nullable<AuditLogKey>` | Checks for equality with the provided value.                |
| `Neq`    | `Nullable<AuditLogKey>` | Checks for inequality with the provided value.              |
| `Exists` | `Nullable<Boolean>`     | Checks if the current property exists.                      |
| `In`     | `List<AuditLogKey>`     | Checks if the property matches any of the provided values.  |
| `NotIn`  | `List<AuditLogKey>`     | Checks if the property matches none of the provided values. |

## AdvancedBatchOperationItemStateFilter

Advanced BatchOperationItemStateEnum filter.

```csharp
public sealed class AdvancedBatchOperationItemStateFilter
```

| Property | Type                                    | Description                                                                                                                                                                                                                                                |
| -------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Eq`     | `Nullable<BatchOperationItemStateEnum>` | Checks for equality with the provided value.                                                                                                                                                                                                               |
| `Neq`    | `Nullable<BatchOperationItemStateEnum>` | Checks for inequality with the provided value.                                                                                                                                                                                                             |
| `Exists` | `Nullable<Boolean>`                     | Checks if the current property exists.                                                                                                                                                                                                                     |
| `In`     | `List<BatchOperationItemStateEnum>`     | Checks if the property matches any of the provided values.                                                                                                                                                                                                 |
| `Like`   | `Nullable<LikeFilter>`                  | Checks if the property matches the provided like value. Supported wildcard characters are: _ `_`: matches zero, one, or multiple characters. * `?`: matches one, single character.  Wildcard characters can be escaped with backslash, for instance: `\*`. |

## AdvancedBatchOperationStateFilter

Advanced BatchOperationStateEnum filter.

```csharp
public sealed class AdvancedBatchOperationStateFilter
```

| Property | Type                                | Description                                                                                                                                                                                                                                                |
| -------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Eq`     | `Nullable<BatchOperationStateEnum>` | Checks for equality with the provided value.                                                                                                                                                                                                               |
| `Neq`    | `Nullable<BatchOperationStateEnum>` | Checks for inequality with the provided value.                                                                                                                                                                                                             |
| `Exists` | `Nullable<Boolean>`                 | Checks if the current property exists.                                                                                                                                                                                                                     |
| `In`     | `List<BatchOperationStateEnum>`     | Checks if the property matches any of the provided values.                                                                                                                                                                                                 |
| `Like`   | `Nullable<LikeFilter>`              | Checks if the property matches the provided like value. Supported wildcard characters are: _ `_`: matches zero, one, or multiple characters. * `?`: matches one, single character.  Wildcard characters can be escaped with backslash, for instance: `\*`. |

## AdvancedBatchOperationTypeFilter

Advanced BatchOperationTypeEnum filter.

```csharp
public sealed class AdvancedBatchOperationTypeFilter
```

| Property | Type                               | Description                                                                                                                                                                                                                                                |
| -------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Eq`     | `Nullable<BatchOperationTypeEnum>` | Checks for equality with the provided value.                                                                                                                                                                                                               |
| `Neq`    | `Nullable<BatchOperationTypeEnum>` | Checks for inequality with the provided value.                                                                                                                                                                                                             |
| `Exists` | `Nullable<Boolean>`                | Checks if the current property exists.                                                                                                                                                                                                                     |
| `In`     | `List<BatchOperationTypeEnum>`     | Checks if the property matches any of the provided values.                                                                                                                                                                                                 |
| `Like`   | `Nullable<LikeFilter>`             | Checks if the property matches the provided like value. Supported wildcard characters are: _ `_`: matches zero, one, or multiple characters. * `?`: matches one, single character.  Wildcard characters can be escaped with backslash, for instance: `\*`. |

## AdvancedCategoryFilter

Advanced AuditLogCategoryEnum filter.

```csharp
public sealed class AdvancedCategoryFilter
```

| Property | Type                             | Description                                                                                                                                                                                                                                                |
| -------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Eq`     | `Nullable<AuditLogCategoryEnum>` | Checks for equality with the provided value.                                                                                                                                                                                                               |
| `Neq`    | `Nullable<AuditLogCategoryEnum>` | Checks for inequality with the provided value.                                                                                                                                                                                                             |
| `Exists` | `Nullable<Boolean>`              | Checks if the current property exists.                                                                                                                                                                                                                     |
| `In`     | `List<AuditLogCategoryEnum>`     | Checks if the property matches any of the provided values.                                                                                                                                                                                                 |
| `Like`   | `Nullable<LikeFilter>`           | Checks if the property matches the provided like value. Supported wildcard characters are: _ `_`: matches zero, one, or multiple characters. * `?`: matches one, single character.  Wildcard characters can be escaped with backslash, for instance: `\*`. |

## AdvancedClusterVariableScopeFilter

Advanced ClusterVariableScopeEnum filter.

```csharp
public sealed class AdvancedClusterVariableScopeFilter
```

| Property | Type                                 | Description                                                                                                                                                                                                                                                |
| -------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Eq`     | `Nullable<ClusterVariableScopeEnum>` | Checks for equality with the provided value.                                                                                                                                                                                                               |
| `Neq`    | `Nullable<ClusterVariableScopeEnum>` | Checks for inequality with the provided value.                                                                                                                                                                                                             |
| `Exists` | `Nullable<Boolean>`                  | Checks if the current property exists.                                                                                                                                                                                                                     |
| `In`     | `List<ClusterVariableScopeEnum>`     | Checks if the property matches any of the provided values.                                                                                                                                                                                                 |
| `Like`   | `Nullable<LikeFilter>`               | Checks if the property matches the provided like value. Supported wildcard characters are: _ `_`: matches zero, one, or multiple characters. * `?`: matches one, single character.  Wildcard characters can be escaped with backslash, for instance: `\*`. |

## AdvancedDateTimeFilter

Advanced date-time filter.

```csharp
public sealed class AdvancedDateTimeFilter
```

| Property | Type                       | Description                                                |
| -------- | -------------------------- | ---------------------------------------------------------- |
| `Eq`     | `Nullable<DateTimeOffset>` | Checks for equality with the provided value.               |
| `Neq`    | `Nullable<DateTimeOffset>` | Checks for inequality with the provided value.             |
| `Exists` | `Nullable<Boolean>`        | Checks if the current property exists.                     |
| `Gt`     | `Nullable<DateTimeOffset>` | Greater than comparison with the provided value.           |
| `Gte`    | `Nullable<DateTimeOffset>` | Greater than or equal comparison with the provided value.  |
| `Lt`     | `Nullable<DateTimeOffset>` | Lower than comparison with the provided value.             |
| `Lte`    | `Nullable<DateTimeOffset>` | Lower than or equal comparison with the provided value.    |
| `In`     | `List<DateTimeOffset>`     | Checks if the property matches any of the provided values. |

## AdvancedDecisionDefinitionKeyFilter

Advanced DecisionDefinitionKey filter.

```csharp
public sealed class AdvancedDecisionDefinitionKeyFilter
```

| Property | Type                              | Description                                                 |
| -------- | --------------------------------- | ----------------------------------------------------------- |
| `Eq`     | `Nullable<DecisionDefinitionKey>` | Checks for equality with the provided value.                |
| `Neq`    | `Nullable<DecisionDefinitionKey>` | Checks for inequality with the provided value.              |
| `Exists` | `Nullable<Boolean>`               | Checks if the current property exists.                      |
| `In`     | `List<DecisionDefinitionKey>`     | Checks if the property matches any of the provided values.  |
| `NotIn`  | `List<DecisionDefinitionKey>`     | Checks if the property matches none of the provided values. |

## AdvancedDecisionEvaluationInstanceKeyFilter

Advanced DecisionEvaluationInstanceKey filter.

```csharp
public sealed class AdvancedDecisionEvaluationInstanceKeyFilter
```

| Property | Type                                      | Description                                                 |
| -------- | ----------------------------------------- | ----------------------------------------------------------- |
| `Eq`     | `Nullable<DecisionEvaluationInstanceKey>` | Checks for equality with the provided value.                |
| `Neq`    | `Nullable<DecisionEvaluationInstanceKey>` | Checks for inequality with the provided value.              |
| `Exists` | `Nullable<Boolean>`                       | Checks if the current property exists.                      |
| `In`     | `List<DecisionEvaluationInstanceKey>`     | Checks if the property matches any of the provided values.  |
| `NotIn`  | `List<DecisionEvaluationInstanceKey>`     | Checks if the property matches none of the provided values. |

## AdvancedDecisionEvaluationKeyFilter

Advanced DecisionEvaluationKey filter.

```csharp
public sealed class AdvancedDecisionEvaluationKeyFilter
```

| Property | Type                              | Description                                                 |
| -------- | --------------------------------- | ----------------------------------------------------------- |
| `Eq`     | `Nullable<DecisionEvaluationKey>` | Checks for equality with the provided value.                |
| `Neq`    | `Nullable<DecisionEvaluationKey>` | Checks for inequality with the provided value.              |
| `Exists` | `Nullable<Boolean>`               | Checks if the current property exists.                      |
| `In`     | `List<DecisionEvaluationKey>`     | Checks if the property matches any of the provided values.  |
| `NotIn`  | `List<DecisionEvaluationKey>`     | Checks if the property matches none of the provided values. |

## AdvancedDecisionInstanceStateFilter

Advanced DecisionInstanceStateEnum filter.

```csharp
public sealed class AdvancedDecisionInstanceStateFilter
```

| Property | Type                                  | Description                                                                                                                                                                                                                                                |
| -------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Eq`     | `Nullable<DecisionInstanceStateEnum>` | Checks for equality with the provided value.                                                                                                                                                                                                               |
| `Neq`    | `Nullable<DecisionInstanceStateEnum>` | Checks for inequality with the provided value.                                                                                                                                                                                                             |
| `Exists` | `Nullable<Boolean>`                   | Checks if the current property exists.                                                                                                                                                                                                                     |
| `In`     | `List<DecisionInstanceStateEnum>`     | Checks if the property matches any of the provided values.                                                                                                                                                                                                 |
| `NotIn`  | `List<DecisionInstanceStateEnum>`     | Checks if the property matches none of the provided values.                                                                                                                                                                                                |
| `Like`   | `Nullable<LikeFilter>`                | Checks if the property matches the provided like value. Supported wildcard characters are: _ `_`: matches zero, one, or multiple characters. * `?`: matches one, single character.  Wildcard characters can be escaped with backslash, for instance: `\*`. |

## AdvancedDecisionRequirementsKeyFilter

Advanced DecisionRequirementsKey filter.

```csharp
public sealed class AdvancedDecisionRequirementsKeyFilter
```

| Property | Type                                | Description                                                 |
| -------- | ----------------------------------- | ----------------------------------------------------------- |
| `Eq`     | `Nullable<DecisionRequirementsKey>` | Checks for equality with the provided value.                |
| `Neq`    | `Nullable<DecisionRequirementsKey>` | Checks for inequality with the provided value.              |
| `Exists` | `Nullable<Boolean>`                 | Checks if the current property exists.                      |
| `In`     | `List<DecisionRequirementsKey>`     | Checks if the property matches any of the provided values.  |
| `NotIn`  | `List<DecisionRequirementsKey>`     | Checks if the property matches none of the provided values. |

## AdvancedDeploymentKeyFilter

Advanced DeploymentKey filter.

```csharp
public sealed class AdvancedDeploymentKeyFilter
```

| Property | Type                      | Description                                                 |
| -------- | ------------------------- | ----------------------------------------------------------- |
| `Eq`     | `Nullable<DeploymentKey>` | Checks for equality with the provided value.                |
| `Neq`    | `Nullable<DeploymentKey>` | Checks for inequality with the provided value.              |
| `Exists` | `Nullable<Boolean>`       | Checks if the current property exists.                      |
| `In`     | `List<DeploymentKey>`     | Checks if the property matches any of the provided values.  |
| `NotIn`  | `List<DeploymentKey>`     | Checks if the property matches none of the provided values. |

## AdvancedElementInstanceKeyFilter

Advanced ElementInstanceKey filter.

```csharp
public sealed class AdvancedElementInstanceKeyFilter
```

| Property | Type                           | Description                                                 |
| -------- | ------------------------------ | ----------------------------------------------------------- |
| `Eq`     | `Nullable<ElementInstanceKey>` | Checks for equality with the provided value.                |
| `Neq`    | `Nullable<ElementInstanceKey>` | Checks for inequality with the provided value.              |
| `Exists` | `Nullable<Boolean>`            | Checks if the current property exists.                      |
| `In`     | `List<ElementInstanceKey>`     | Checks if the property matches any of the provided values.  |
| `NotIn`  | `List<ElementInstanceKey>`     | Checks if the property matches none of the provided values. |

## AdvancedElementInstanceStateFilter

Advanced ElementInstanceStateEnum filter.

```csharp
public sealed class AdvancedElementInstanceStateFilter
```

| Property | Type                                 | Description                                                                                                                                                                                                                                                |
| -------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Eq`     | `Nullable<ElementInstanceStateEnum>` | Checks for equality with the provided value.                                                                                                                                                                                                               |
| `Neq`    | `Nullable<ElementInstanceStateEnum>` | Checks for inequality with the provided value.                                                                                                                                                                                                             |
| `Exists` | `Nullable<Boolean>`                  | Checks if the current property exists.                                                                                                                                                                                                                     |
| `In`     | `List<ElementInstanceStateEnum>`     | Checks if the property matches any of the provided values.                                                                                                                                                                                                 |
| `Like`   | `Nullable<LikeFilter>`               | Checks if the property matches the provided like value. Supported wildcard characters are: _ `_`: matches zero, one, or multiple characters. * `?`: matches one, single character.  Wildcard characters can be escaped with backslash, for instance: `\*`. |

## AdvancedEntityTypeFilter

Advanced AuditLogEntityTypeEnum filter.

```csharp
public sealed class AdvancedEntityTypeFilter
```

| Property | Type                               | Description                                                                                                                                                                                                                                                |
| -------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Eq`     | `Nullable<AuditLogEntityTypeEnum>` | Checks for equality with the provided value.                                                                                                                                                                                                               |
| `Neq`    | `Nullable<AuditLogEntityTypeEnum>` | Checks for inequality with the provided value.                                                                                                                                                                                                             |
| `Exists` | `Nullable<Boolean>`                | Checks if the current property exists.                                                                                                                                                                                                                     |
| `In`     | `List<AuditLogEntityTypeEnum>`     | Checks if the property matches any of the provided values.                                                                                                                                                                                                 |
| `Like`   | `Nullable<LikeFilter>`             | Checks if the property matches the provided like value. Supported wildcard characters are: _ `_`: matches zero, one, or multiple characters. * `?`: matches one, single character.  Wildcard characters can be escaped with backslash, for instance: `\*`. |

## AdvancedFormKeyFilter

Advanced FormKey filter.

```csharp
public sealed class AdvancedFormKeyFilter
```

| Property | Type                | Description                                                 |
| -------- | ------------------- | ----------------------------------------------------------- |
| `Eq`     | `Nullable<FormKey>` | Checks for equality with the provided value.                |
| `Neq`    | `Nullable<FormKey>` | Checks for inequality with the provided value.              |
| `Exists` | `Nullable<Boolean>` | Checks if the current property exists.                      |
| `In`     | `List<FormKey>`     | Checks if the property matches any of the provided values.  |
| `NotIn`  | `List<FormKey>`     | Checks if the property matches none of the provided values. |

## AdvancedGlobalListenerSourceFilter

Advanced global listener source filter.

```csharp
public sealed class AdvancedGlobalListenerSourceFilter
```

| Property | Type                                 | Description                                                                                                                                                                                                                                                |
| -------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Eq`     | `Nullable<GlobalListenerSourceEnum>` | Checks for equality with the provided value.                                                                                                                                                                                                               |
| `Neq`    | `Nullable<GlobalListenerSourceEnum>` | Checks for inequality with the provided value.                                                                                                                                                                                                             |
| `Exists` | `Nullable<Boolean>`                  | Checks if the current property exists.                                                                                                                                                                                                                     |
| `In`     | `List<GlobalListenerSourceEnum>`     | Checks if the property matches any of the provided values.                                                                                                                                                                                                 |
| `Like`   | `Nullable<LikeFilter>`               | Checks if the property matches the provided like value. Supported wildcard characters are: _ `_`: matches zero, one, or multiple characters. * `?`: matches one, single character.  Wildcard characters can be escaped with backslash, for instance: `\*`. |

## AdvancedGlobalTaskListenerEventTypeFilter

Advanced global listener event type filter.

```csharp
public sealed class AdvancedGlobalTaskListenerEventTypeFilter
```

| Property | Type                                        | Description                                                                                                                                                                                                                                                |
| -------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Eq`     | `Nullable<GlobalTaskListenerEventTypeEnum>` | Checks for equality with the provided value.                                                                                                                                                                                                               |
| `Neq`    | `Nullable<GlobalTaskListenerEventTypeEnum>` | Checks for inequality with the provided value.                                                                                                                                                                                                             |
| `Exists` | `Nullable<Boolean>`                         | Checks if the current property exists.                                                                                                                                                                                                                     |
| `In`     | `List<GlobalTaskListenerEventTypeEnum>`     | Checks if the property matches any of the provided values.                                                                                                                                                                                                 |
| `Like`   | `Nullable<LikeFilter>`                      | Checks if the property matches the provided like value. Supported wildcard characters are: _ `_`: matches zero, one, or multiple characters. * `?`: matches one, single character.  Wildcard characters can be escaped with backslash, for instance: `\*`. |

## AdvancedIncidentErrorTypeFilter

Advanced IncidentErrorTypeEnum filter

```csharp
public sealed class AdvancedIncidentErrorTypeFilter
```

| Property | Type                              | Description                                                                                                                                                                                                                                                |
| -------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Eq`     | `Nullable<IncidentErrorTypeEnum>` | Checks for equality with the provided value.                                                                                                                                                                                                               |
| `Neq`    | `Nullable<IncidentErrorTypeEnum>` | Checks for inequality with the provided value.                                                                                                                                                                                                             |
| `Exists` | `Nullable<Boolean>`               | Checks if the current property exists.                                                                                                                                                                                                                     |
| `In`     | `List<IncidentErrorTypeEnum>`     | Checks if the property matches any of the provided values.                                                                                                                                                                                                 |
| `NotIn`  | `List<IncidentErrorTypeEnum>`     | Checks if the property does not match any of the provided values.                                                                                                                                                                                          |
| `Like`   | `Nullable<LikeFilter>`            | Checks if the property matches the provided like value. Supported wildcard characters are: _ `_`: matches zero, one, or multiple characters. * `?`: matches one, single character.  Wildcard characters can be escaped with backslash, for instance: `\*`. |

## AdvancedIncidentStateFilter

Advanced IncidentStateEnum filter

```csharp
public sealed class AdvancedIncidentStateFilter
```

| Property | Type                          | Description                                                                                                                                                                                                                                                |
| -------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Eq`     | `Nullable<IncidentStateEnum>` | Checks for equality with the provided value.                                                                                                                                                                                                               |
| `Neq`    | `Nullable<IncidentStateEnum>` | Checks for inequality with the provided value.                                                                                                                                                                                                             |
| `Exists` | `Nullable<Boolean>`           | Checks if the current property exists.                                                                                                                                                                                                                     |
| `In`     | `List<IncidentStateEnum>`     | Checks if the property matches any of the provided values.                                                                                                                                                                                                 |
| `NotIn`  | `List<IncidentStateEnum>`     | Checks if the property does not match any of the provided values.                                                                                                                                                                                          |
| `Like`   | `Nullable<LikeFilter>`        | Checks if the property matches the provided like value. Supported wildcard characters are: _ `_`: matches zero, one, or multiple characters. * `?`: matches one, single character.  Wildcard characters can be escaped with backslash, for instance: `\*`. |

## AdvancedIntegerFilter

Advanced integer (int32) filter.

```csharp
public sealed class AdvancedIntegerFilter
```

| Property | Type                | Description                                                |
| -------- | ------------------- | ---------------------------------------------------------- |
| `Eq`     | `Nullable<Int32>`   | Checks for equality with the provided value.               |
| `Neq`    | `Nullable<Int32>`   | Checks for inequality with the provided value.             |
| `Exists` | `Nullable<Boolean>` | Checks if the current property exists.                     |
| `Gt`     | `Nullable<Int32>`   | Greater than comparison with the provided value.           |
| `Gte`    | `Nullable<Int32>`   | Greater than or equal comparison with the provided value.  |
| `Lt`     | `Nullable<Int32>`   | Lower than comparison with the provided value.             |
| `Lte`    | `Nullable<Int32>`   | Lower than or equal comparison with the provided value.    |
| `In`     | `List<Int32>`       | Checks if the property matches any of the provided values. |

## AdvancedJobKeyFilter

Advanced JobKey filter.

```csharp
public sealed class AdvancedJobKeyFilter
```

| Property | Type                | Description                                                 |
| -------- | ------------------- | ----------------------------------------------------------- |
| `Eq`     | `Nullable<JobKey>`  | Checks for equality with the provided value.                |
| `Neq`    | `Nullable<JobKey>`  | Checks for inequality with the provided value.              |
| `Exists` | `Nullable<Boolean>` | Checks if the current property exists.                      |
| `In`     | `List<JobKey>`      | Checks if the property matches any of the provided values.  |
| `NotIn`  | `List<JobKey>`      | Checks if the property matches none of the provided values. |

## AdvancedJobKindFilter

Advanced JobKindEnum filter.

```csharp
public sealed class AdvancedJobKindFilter
```

| Property | Type                    | Description                                                                                                                                                                                                                                                |
| -------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Eq`     | `Nullable<JobKindEnum>` | Checks for equality with the provided value.                                                                                                                                                                                                               |
| `Neq`    | `Nullable<JobKindEnum>` | Checks for inequality with the provided value.                                                                                                                                                                                                             |
| `Exists` | `Nullable<Boolean>`     | Checks if the current property exists.                                                                                                                                                                                                                     |
| `In`     | `List<JobKindEnum>`     | Checks if the property matches any of the provided values.                                                                                                                                                                                                 |
| `Like`   | `Nullable<LikeFilter>`  | Checks if the property matches the provided like value. Supported wildcard characters are: _ `_`: matches zero, one, or multiple characters. * `?`: matches one, single character.  Wildcard characters can be escaped with backslash, for instance: `\*`. |

## AdvancedJobListenerEventTypeFilter

Advanced JobListenerEventTypeEnum filter.

```csharp
public sealed class AdvancedJobListenerEventTypeFilter
```

| Property | Type                                 | Description                                                                                                                                                                                                                                                |
| -------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Eq`     | `Nullable<JobListenerEventTypeEnum>` | Checks for equality with the provided value.                                                                                                                                                                                                               |
| `Neq`    | `Nullable<JobListenerEventTypeEnum>` | Checks for inequality with the provided value.                                                                                                                                                                                                             |
| `Exists` | `Nullable<Boolean>`                  | Checks if the current property exists.                                                                                                                                                                                                                     |
| `In`     | `List<JobListenerEventTypeEnum>`     | Checks if the property matches any of the provided values.                                                                                                                                                                                                 |
| `Like`   | `Nullable<LikeFilter>`               | Checks if the property matches the provided like value. Supported wildcard characters are: _ `_`: matches zero, one, or multiple characters. * `?`: matches one, single character.  Wildcard characters can be escaped with backslash, for instance: `\*`. |

## AdvancedJobStateFilter

Advanced JobStateEnum filter.

```csharp
public sealed class AdvancedJobStateFilter
```

| Property | Type                     | Description                                                                                                                                                                                                                                                |
| -------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Eq`     | `Nullable<JobStateEnum>` | Checks for equality with the provided value.                                                                                                                                                                                                               |
| `Neq`    | `Nullable<JobStateEnum>` | Checks for inequality with the provided value.                                                                                                                                                                                                             |
| `Exists` | `Nullable<Boolean>`      | Checks if the current property exists.                                                                                                                                                                                                                     |
| `In`     | `List<JobStateEnum>`     | Checks if the property matches any of the provided values.                                                                                                                                                                                                 |
| `Like`   | `Nullable<LikeFilter>`   | Checks if the property matches the provided like value. Supported wildcard characters are: _ `_`: matches zero, one, or multiple characters. * `?`: matches one, single character.  Wildcard characters can be escaped with backslash, for instance: `\*`. |

## AdvancedMessageSubscriptionKeyFilter

Advanced MessageSubscriptionKey filter.

```csharp
public sealed class AdvancedMessageSubscriptionKeyFilter
```

| Property | Type                               | Description                                                 |
| -------- | ---------------------------------- | ----------------------------------------------------------- |
| `Eq`     | `Nullable<MessageSubscriptionKey>` | Checks for equality with the provided value.                |
| `Neq`    | `Nullable<MessageSubscriptionKey>` | Checks for equality with the provided value.                |
| `Exists` | `Nullable<Boolean>`                | Checks if the current property exists.                      |
| `In`     | `List<MessageSubscriptionKey>`     | Checks if the property matches any of the provided values.  |
| `NotIn`  | `List<MessageSubscriptionKey>`     | Checks if the property matches none of the provided values. |

## AdvancedMessageSubscriptionStateFilter

Advanced MessageSubscriptionStateEnum filter

```csharp
public sealed class AdvancedMessageSubscriptionStateFilter
```

| Property | Type                                     | Description                                                                                                                                                                                                                                                |
| -------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Eq`     | `Nullable<MessageSubscriptionStateEnum>` | Checks for equality with the provided value.                                                                                                                                                                                                               |
| `Neq`    | `Nullable<MessageSubscriptionStateEnum>` | Checks for inequality with the provided value.                                                                                                                                                                                                             |
| `Exists` | `Nullable<Boolean>`                      | Checks if the current property exists.                                                                                                                                                                                                                     |
| `In`     | `List<MessageSubscriptionStateEnum>`     | Checks if the property matches any of the provided values.                                                                                                                                                                                                 |
| `Like`   | `Nullable<LikeFilter>`                   | Checks if the property matches the provided like value. Supported wildcard characters are: _ `_`: matches zero, one, or multiple characters. * `?`: matches one, single character.  Wildcard characters can be escaped with backslash, for instance: `\*`. |

## AdvancedOperationTypeFilter

Advanced AuditLogOperationTypeEnum filter.

```csharp
public sealed class AdvancedOperationTypeFilter
```

| Property | Type                                  | Description                                                                                                                                                                                                                                                |
| -------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Eq`     | `Nullable<AuditLogOperationTypeEnum>` | Checks for equality with the provided value.                                                                                                                                                                                                               |
| `Neq`    | `Nullable<AuditLogOperationTypeEnum>` | Checks for inequality with the provided value.                                                                                                                                                                                                             |
| `Exists` | `Nullable<Boolean>`                   | Checks if the current property exists.                                                                                                                                                                                                                     |
| `In`     | `List<AuditLogOperationTypeEnum>`     | Checks if the property matches any of the provided values.                                                                                                                                                                                                 |
| `Like`   | `Nullable<LikeFilter>`                | Checks if the property matches the provided like value. Supported wildcard characters are: _ `_`: matches zero, one, or multiple characters. * `?`: matches one, single character.  Wildcard characters can be escaped with backslash, for instance: `\*`. |

## AdvancedProcessDefinitionKeyFilter

Advanced ProcessDefinitionKey filter.

```csharp
public sealed class AdvancedProcessDefinitionKeyFilter
```

| Property | Type                             | Description                                                 |
| -------- | -------------------------------- | ----------------------------------------------------------- |
| `Eq`     | `Nullable<ProcessDefinitionKey>` | Checks for equality with the provided value.                |
| `Neq`    | `Nullable<ProcessDefinitionKey>` | Checks for inequality with the provided value.              |
| `Exists` | `Nullable<Boolean>`              | Checks if the current property exists.                      |
| `In`     | `List<ProcessDefinitionKey>`     | Checks if the property matches any of the provided values.  |
| `NotIn`  | `List<ProcessDefinitionKey>`     | Checks if the property matches none of the provided values. |

## AdvancedProcessInstanceKeyFilter

Advanced ProcessInstanceKey filter.

```csharp
public sealed class AdvancedProcessInstanceKeyFilter
```

| Property | Type                           | Description                                                 |
| -------- | ------------------------------ | ----------------------------------------------------------- |
| `Eq`     | `Nullable<ProcessInstanceKey>` | Checks for equality with the provided value.                |
| `Neq`    | `Nullable<ProcessInstanceKey>` | Checks for inequality with the provided value.              |
| `Exists` | `Nullable<Boolean>`            | Checks if the current property exists.                      |
| `In`     | `List<ProcessInstanceKey>`     | Checks if the property matches any of the provided values.  |
| `NotIn`  | `List<ProcessInstanceKey>`     | Checks if the property matches none of the provided values. |

## AdvancedProcessInstanceStateFilter

Advanced ProcessInstanceStateEnum filter.

```csharp
public sealed class AdvancedProcessInstanceStateFilter
```

| Property | Type                                 | Description                                                                                                                                                                                                                                                |
| -------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Eq`     | `Nullable<ProcessInstanceStateEnum>` | Checks for equality with the provided value.                                                                                                                                                                                                               |
| `Neq`    | `Nullable<ProcessInstanceStateEnum>` | Checks for inequality with the provided value.                                                                                                                                                                                                             |
| `Exists` | `Nullable<Boolean>`                  | Checks if the current property exists.                                                                                                                                                                                                                     |
| `In`     | `List<ProcessInstanceStateEnum>`     | Checks if the property matches any of the provided values.                                                                                                                                                                                                 |
| `Like`   | `Nullable<LikeFilter>`               | Checks if the property matches the provided like value. Supported wildcard characters are: _ `_`: matches zero, one, or multiple characters. * `?`: matches one, single character.  Wildcard characters can be escaped with backslash, for instance: `\*`. |

## AdvancedResourceKeyFilter

Advanced ResourceKey filter.

```csharp
public sealed class AdvancedResourceKeyFilter
```

| Property | Type                    | Description                                                 |
| -------- | ----------------------- | ----------------------------------------------------------- |
| `Eq`     | `Nullable<ResourceKey>` | Checks for equality with the provided value.                |
| `Neq`    | `Nullable<ResourceKey>` | Checks for inequality with the provided value.              |
| `Exists` | `Nullable<Boolean>`     | Checks if the current property exists.                      |
| `In`     | `List<ResourceKey>`     | Checks if the property matches any of the provided values.  |
| `NotIn`  | `List<ResourceKey>`     | Checks if the property matches none of the provided values. |

## AdvancedResultFilter

Advanced AuditLogResultEnum filter.

```csharp
public sealed class AdvancedResultFilter
```

| Property | Type                           | Description                                                                                                                                                                                                                                                |
| -------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Eq`     | `Nullable<AuditLogResultEnum>` | Checks for equality with the provided value.                                                                                                                                                                                                               |
| `Neq`    | `Nullable<AuditLogResultEnum>` | Checks for inequality with the provided value.                                                                                                                                                                                                             |
| `Exists` | `Nullable<Boolean>`            | Checks if the current property exists.                                                                                                                                                                                                                     |
| `In`     | `List<AuditLogResultEnum>`     | Checks if the property matches any of the provided values.                                                                                                                                                                                                 |
| `Like`   | `Nullable<LikeFilter>`         | Checks if the property matches the provided like value. Supported wildcard characters are: _ `_`: matches zero, one, or multiple characters. * `?`: matches one, single character.  Wildcard characters can be escaped with backslash, for instance: `\*`. |

## AdvancedScopeKeyFilter

Advanced ScopeKey filter.

```csharp
public sealed class AdvancedScopeKeyFilter
```

| Property | Type                 | Description                                                 |
| -------- | -------------------- | ----------------------------------------------------------- |
| `Eq`     | `Nullable<ScopeKey>` | Checks for equality with the provided value.                |
| `Neq`    | `Nullable<ScopeKey>` | Checks for inequality with the provided value.              |
| `Exists` | `Nullable<Boolean>`  | Checks if the current property exists.                      |
| `In`     | `List<ScopeKey>`     | Checks if the property matches any of the provided values.  |
| `NotIn`  | `List<ScopeKey>`     | Checks if the property matches none of the provided values. |

## AdvancedStringFilter

Advanced string filter.

```csharp
public sealed class AdvancedStringFilter
```

| Property | Type                   | Description                                                                                                                                                                                                                                                |
| -------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Eq`     | `String`               | Checks for equality with the provided value.                                                                                                                                                                                                               |
| `Neq`    | `String`               | Checks for inequality with the provided value.                                                                                                                                                                                                             |
| `Exists` | `Nullable<Boolean>`    | Checks if the current property exists.                                                                                                                                                                                                                     |
| `In`     | `List<String>`         | Checks if the property matches any of the provided values.                                                                                                                                                                                                 |
| `NotIn`  | `List<String>`         | Checks if the property matches none of the provided values.                                                                                                                                                                                                |
| `Like`   | `Nullable<LikeFilter>` | Checks if the property matches the provided like value. Supported wildcard characters are: _ `_`: matches zero, one, or multiple characters. * `?`: matches one, single character.  Wildcard characters can be escaped with backslash, for instance: `\*`. |

## AdvancedUserTaskStateFilter

Advanced UserTaskStateEnum filter.

```csharp
public sealed class AdvancedUserTaskStateFilter
```

| Property | Type                          | Description                                                                                                                                                                                                                                                |
| -------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Eq`     | `Nullable<UserTaskStateEnum>` | Checks for equality with the provided value.                                                                                                                                                                                                               |
| `Neq`    | `Nullable<UserTaskStateEnum>` | Checks for inequality with the provided value.                                                                                                                                                                                                             |
| `Exists` | `Nullable<Boolean>`           | Checks if the current property exists.                                                                                                                                                                                                                     |
| `In`     | `List<UserTaskStateEnum>`     | Checks if the property matches any of the provided values.                                                                                                                                                                                                 |
| `Like`   | `Nullable<LikeFilter>`        | Checks if the property matches the provided like value. Supported wildcard characters are: _ `_`: matches zero, one, or multiple characters. * `?`: matches one, single character.  Wildcard characters can be escaped with backslash, for instance: `\*`. |

## AdvancedVariableKeyFilter

Advanced VariableKey filter.

```csharp
public sealed class AdvancedVariableKeyFilter
```

| Property | Type                    | Description                                                 |
| -------- | ----------------------- | ----------------------------------------------------------- |
| `Eq`     | `Nullable<VariableKey>` | Checks for equality with the provided value.                |
| `Neq`    | `Nullable<VariableKey>` | Checks for inequality with the provided value.              |
| `Exists` | `Nullable<Boolean>`     | Checks if the current property exists.                      |
| `In`     | `List<VariableKey>`     | Checks if the property matches any of the provided values.  |
| `NotIn`  | `List<VariableKey>`     | Checks if the property matches none of the provided values. |

## AncestorScopeInstruction

Defines the ancestor scope for the created element instances. The default behavior resembles
a "direct" scope instruction with an `ancestorElementInstanceKey` of `"-1"`.

```csharp
public abstract class AncestorScopeInstruction
```

## AuditLogActorTypeExactMatch

Matches the value exactly.

```csharp
public readonly record struct AuditLogActorTypeExactMatch : ICamundaKey, IEquatable<AuditLogActorTypeExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## AuditLogActorTypeFilterProperty

AuditLogActorTypeEnum property with full advanced search capabilities.

```csharp
public sealed class AuditLogActorTypeFilterProperty
```

## AuditLogEntityKeyExactMatch

Matches the value exactly.

```csharp
public readonly record struct AuditLogEntityKeyExactMatch : ICamundaKey, IEquatable<AuditLogEntityKeyExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## AuditLogEntityKeyFilterProperty

EntityKey property with full advanced search capabilities.

```csharp
public sealed class AuditLogEntityKeyFilterProperty
```

## AuditLogFilter

Audit log filter request

```csharp
public sealed class AuditLogFilter
```

| Property                  | Type                                    | Description                                  |
| ------------------------- | --------------------------------------- | -------------------------------------------- |
| `AuditLogKey`             | `AuditLogKeyFilterProperty`             | The audit log key search filter.             |
| `ProcessDefinitionKey`    | `ProcessDefinitionKeyFilterProperty`    | The process definition key search filter.    |
| `ProcessInstanceKey`      | `ProcessInstanceKeyFilterProperty`      | The process instance key search filter.      |
| `ElementInstanceKey`      | `ElementInstanceKeyFilterProperty`      | The element instance key search filter.      |
| `OperationType`           | `OperationTypeFilterProperty`           | The operation type search filter.            |
| `Result`                  | `AuditLogResultFilterProperty`          | The result search filter.                    |
| `Timestamp`               | `DateTimeFilterProperty`                | The timestamp search filter.                 |
| `ActorId`                 | `StringFilterProperty`                  | The actor ID search filter.                  |
| `ActorType`               | `AuditLogActorTypeFilterProperty`       | The actor type search filter.                |
| `AgentElementId`          | `StringFilterProperty`                  | The agent element ID search filter.          |
| `EntityKey`               | `AuditLogEntityKeyFilterProperty`       | The entity key search filter.                |
| `EntityType`              | `EntityTypeFilterProperty`              | The entity type search filter.               |
| `TenantId`                | `StringFilterProperty`                  | The tenant ID search filter.                 |
| `Category`                | `CategoryFilterProperty`                | The category search filter.                  |
| `DeploymentKey`           | `DeploymentKeyFilterProperty`           | The deployment key search filter.            |
| `FormKey`                 | `FormKeyFilterProperty`                 | The form key search filter.                  |
| `ResourceKey`             | `ResourceKeyFilterProperty`             | The resource key search filter.              |
| `BatchOperationType`      | `BatchOperationTypeFilterProperty`      | The batch operation type search filter.      |
| `ProcessDefinitionId`     | `StringFilterProperty`                  | The process definition ID search filter.     |
| `JobKey`                  | `JobKeyFilterProperty`                  | The job key search filter.                   |
| `UserTaskKey`             | `BasicStringFilterProperty`             | The user task key search filter.             |
| `DecisionRequirementsId`  | `StringFilterProperty`                  | The decision requirements ID search filter.  |
| `DecisionRequirementsKey` | `DecisionRequirementsKeyFilterProperty` | The decision requirements key search filter. |
| `DecisionDefinitionId`    | `StringFilterProperty`                  | The decision definition ID search filter.    |
| `DecisionDefinitionKey`   | `DecisionDefinitionKeyFilterProperty`   | The decision definition key search filter.   |
| `DecisionEvaluationKey`   | `DecisionEvaluationKeyFilterProperty`   | The decision evaluation key search filter.   |
| `RelatedEntityKey`        | `AuditLogEntityKeyFilterProperty`       | The related entity key search filter.        |
| `RelatedEntityType`       | `EntityTypeFilterProperty`              | The related entity type search filter.       |
| `EntityDescription`       | `StringFilterProperty`                  | The entity description filter.               |

## AuditLogKeyExactMatch

Matches the value exactly.

```csharp
public readonly record struct AuditLogKeyExactMatch : ICamundaKey, IEquatable<AuditLogKeyExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## AuditLogKeyFilterProperty

AuditLogKey property with full advanced search capabilities.

```csharp
public sealed class AuditLogKeyFilterProperty
```

## AuditLogResult

Audit log item.

```csharp
public sealed class AuditLogResult
```

| Property                  | Type                                | Description                                                                                                                                                                                                                                 |
| ------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AuditLogKey`             | `AuditLogKey`                       | The unique key of the audit log entry.                                                                                                                                                                                                      |
| `EntityKey`               | `AuditLogEntityKey`                 | System-generated entity key for an audit log entry.                                                                                                                                                                                         |
| `EntityType`              | `AuditLogEntityTypeEnum`            | The type of entity affected by the operation.                                                                                                                                                                                               |
| `OperationType`           | `AuditLogOperationTypeEnum`         | The type of operation performed.                                                                                                                                                                                                            |
| `BatchOperationKey`       | `Nullable<BatchOperationKey>`       | Key of the batch operation.                                                                                                                                                                                                                 |
| `BatchOperationType`      | `Nullable<BatchOperationTypeEnum>`  | The type of batch operation performed, if this is part of a batch.                                                                                                                                                                          |
| `Timestamp`               | `DateTimeOffset`                    | The timestamp when the operation occurred.                                                                                                                                                                                                  |
| `ActorId`                 | `String`                            | The ID of the actor who performed the operation.                                                                                                                                                                                            |
| `ActorType`               | `Nullable<AuditLogActorTypeEnum>`   | The type of the actor who performed the operation.                                                                                                                                                                                          |
| `AgentElementId`          | `String`                            | The element ID of the agent that performed the operation (e.g. ad-hoc subprocess element ID).                                                                                                                                               |
| `TenantId`                | `Nullable<TenantId>`                | The tenant ID of the audit log.                                                                                                                                                                                                             |
| `Result`                  | `AuditLogResultEnum`                | The result status of the operation.                                                                                                                                                                                                         |
| `Category`                | `AuditLogCategoryEnum`              | The category of the audit log operation.                                                                                                                                                                                                    |
| `ProcessDefinitionId`     | `Nullable<ProcessDefinitionId>`     | The process definition ID.                                                                                                                                                                                                                  |
| `ProcessDefinitionKey`    | `Nullable<ProcessDefinitionKey>`    | The key of the process definition.                                                                                                                                                                                                          |
| `ProcessInstanceKey`      | `Nullable<ProcessInstanceKey>`      | The key of the process instance.                                                                                                                                                                                                            |
| `RootProcessInstanceKey`  | `Nullable<ProcessInstanceKey>`      | The key of the root process instance. The root process instance is the top-level ancestor in the process instance hierarchy. This field is only present for data belonging to process instance hierarchies created in version 8.9 or later. |
| `ElementInstanceKey`      | `Nullable<ElementInstanceKey>`      | The key of the element instance.                                                                                                                                                                                                            |
| `JobKey`                  | `Nullable<JobKey>`                  | The key of the job.                                                                                                                                                                                                                         |
| `UserTaskKey`             | `Nullable<UserTaskKey>`             | The key of the user task.                                                                                                                                                                                                                   |
| `DecisionRequirementsId`  | `String`                            | The decision requirements ID.                                                                                                                                                                                                               |
| `DecisionRequirementsKey` | `Nullable<DecisionRequirementsKey>` | The assigned key of the decision requirements.                                                                                                                                                                                              |
| `DecisionDefinitionId`    | `Nullable<DecisionDefinitionId>`    | The decision definition ID.                                                                                                                                                                                                                 |
| `DecisionDefinitionKey`   | `Nullable<DecisionDefinitionKey>`   | The key of the decision definition.                                                                                                                                                                                                         |
| `DecisionEvaluationKey`   | `Nullable<DecisionEvaluationKey>`   | The key of the decision evaluation.                                                                                                                                                                                                         |
| `DeploymentKey`           | `Nullable<DeploymentKey>`           | The key of the deployment.                                                                                                                                                                                                                  |
| `FormKey`                 | `Nullable<FormKey>`                 | The key of the form.                                                                                                                                                                                                                        |
| `ResourceKey`             | `Nullable<ResourceKey>`             | The system-assigned key for this resource.                                                                                                                                                                                                  |
| `RelatedEntityKey`        | `Nullable<AuditLogEntityKey>`       | The key of the related entity. The content depends on the operation type and entity type. For example, for authorization operations, this will contain the ID of the owner (e.g., user or group) the authorization belongs to.              |
| `RelatedEntityType`       | `Nullable<AuditLogEntityTypeEnum>`  | The type of the related entity. The content depends on the operation type and entity type. For example, for authorization operations, this will contain the type of the owner (e.g., USER or GROUP) the authorization belongs to.           |
| `EntityDescription`       | `String`                            | Additional description of the entity affected by the operation. For example, for variable operations, this will contain the variable name.                                                                                                  |

## AuditLogResultExactMatch

Matches the value exactly.

```csharp
public readonly record struct AuditLogResultExactMatch : ICamundaKey, IEquatable<AuditLogResultExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## AuditLogResultFilterProperty

AuditLogResultEnum property with full advanced search capabilities.

```csharp
public sealed class AuditLogResultFilterProperty
```

## AuditLogSearchQueryRequest

Audit log search request.

```csharp
public sealed class AuditLogSearchQueryRequest
```

| Property | Type                                   | Description                   |
| -------- | -------------------------------------- | ----------------------------- |
| `Sort`   | `List<AuditLogSearchQuerySortRequest>` | Sort field criteria.          |
| `Filter` | `AuditLogFilter`                       | The audit log search filters. |
| `Page`   | `SearchQueryPageRequest`               | Pagination criteria.          |

## AuditLogSearchQueryResult

Audit log search response.

```csharp
public sealed class AuditLogSearchQueryResult
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<AuditLogResult>`    | The matching audit logs.                         |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## AuditLogSearchQuerySortRequest

AuditLogSearchQuerySortRequest

```csharp
public sealed class AuditLogSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## AuthorizationCreateResult

AuthorizationCreateResult

```csharp
public sealed class AuthorizationCreateResult
```

| Property           | Type               | Description                           |
| ------------------ | ------------------ | ------------------------------------- |
| `AuthorizationKey` | `AuthorizationKey` | The key of the created authorization. |

## AuthorizationFilter

Authorization search filter.

```csharp
public sealed class AuthorizationFilter
```

| Property                | Type                         | Description                                                     |
| ----------------------- | ---------------------------- | --------------------------------------------------------------- |
| `OwnerId`               | `String`                     | The ID of the owner of permissions.                             |
| `OwnerType`             | `Nullable<OwnerTypeEnum>`    | The type of the owner of permissions.                           |
| `ResourceIds`           | `List<String>`               | The IDs of the resource to search permissions for.              |
| `ResourcePropertyNames` | `List<String>`               | The names of the resource properties to search permissions for. |
| `ResourceType`          | `Nullable<ResourceTypeEnum>` | The type of resource to search permissions for.                 |

## AuthorizationIdBasedRequest

AuthorizationIdBasedRequest

```csharp
public sealed class AuthorizationIdBasedRequest : AuthorizationRequest
```

| Property          | Type                       | Description                                   |
| ----------------- | -------------------------- | --------------------------------------------- |
| `OwnerId`         | `String`                   | The ID of the owner of the permissions.       |
| `OwnerType`       | `OwnerTypeEnum`            | The type of the owner of permissions.         |
| `ResourceId`      | `String`                   | The ID of the resource to add permissions to. |
| `ResourceType`    | `ResourceTypeEnum`         | The type of resource to add permissions to.   |
| `PermissionTypes` | `List<PermissionTypeEnum>` | The permission types to add.                  |

## AuthorizationPropertyBasedRequest

AuthorizationPropertyBasedRequest

```csharp
public sealed class AuthorizationPropertyBasedRequest : AuthorizationRequest
```

| Property               | Type                       | Description                                                             |
| ---------------------- | -------------------------- | ----------------------------------------------------------------------- |
| `OwnerId`              | `String`                   | The ID of the owner of the permissions.                                 |
| `OwnerType`            | `OwnerTypeEnum`            | The type of the owner of permissions.                                   |
| `ResourcePropertyName` | `String`                   | The name of the resource property on which this authorization is based. |
| `ResourceType`         | `ResourceTypeEnum`         | The type of resource to add permissions to.                             |
| `PermissionTypes`      | `List<PermissionTypeEnum>` | The permission types to add.                                            |

## AuthorizationRequest

Defines an authorization request.
Either an id-based or a property-based authorization can be provided.

```csharp
public abstract class AuthorizationRequest
```

## AuthorizationResult

AuthorizationResult

```csharp
public sealed class AuthorizationResult
```

| Property               | Type                       | Description                                                                                         |
| ---------------------- | -------------------------- | --------------------------------------------------------------------------------------------------- |
| `OwnerId`              | `String`                   | The ID of the owner of permissions.                                                                 |
| `OwnerType`            | `OwnerTypeEnum`            | The type of the owner of permissions.                                                               |
| `ResourceType`         | `ResourceTypeEnum`         | The type of resource that the permissions relate to.                                                |
| `ResourceId`           | `String`                   | ID of the resource the permission relates to (mutually exclusive with `resourcePropertyName`).      |
| `ResourcePropertyName` | `String`                   | The name of the resource property the permission relates to (mutually exclusive with `resourceId`). |
| `PermissionTypes`      | `List<PermissionTypeEnum>` | Specifies the types of the permissions.                                                             |
| `AuthorizationKey`     | `AuthorizationKey`         | The key of the authorization.                                                                       |

## AuthorizationSearchQuery

AuthorizationSearchQuery

```csharp
public sealed class AuthorizationSearchQuery
```

| Property | Type                                        | Description                       |
| -------- | ------------------------------------------- | --------------------------------- |
| `Sort`   | `List<AuthorizationSearchQuerySortRequest>` | Sort field criteria.              |
| `Filter` | `AuthorizationFilter`                       | The authorization search filters. |
| `Page`   | `SearchQueryPageRequest`                    | Pagination criteria.              |

## AuthorizationSearchQuerySortRequest

AuthorizationSearchQuerySortRequest

```csharp
public sealed class AuthorizationSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## AuthorizationSearchResult

AuthorizationSearchResult

```csharp
public sealed class AuthorizationSearchResult
```

| Property | Type                        | Description                                      |
| -------- | --------------------------- | ------------------------------------------------ |
| `Items`  | `List<AuthorizationResult>` | The matching authorizations.                     |
| `Page`   | `SearchQueryPageResponse`   | Pagination information about the search results. |

## BackpressureState

```csharp
public sealed class BackpressureState
```

| Property      | Type              | Description |
| ------------- | ----------------- | ----------- |
| `Severity`    | `String`          |             |
| `PermitsMax`  | `Nullable<Int32>` |             |
| `Consecutive` | `Int32`           |             |

## BaseProcessInstanceFilterFields

Base process instance search filter.

```csharp
public sealed class BaseProcessInstanceFilterFields
```

| Property                     | Type                                 | Description                                                                                                                                                                                                                              |
| ---------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `StartDate`                  | `DateTimeFilterProperty`             | The start date.                                                                                                                                                                                                                          |
| `EndDate`                    | `DateTimeFilterProperty`             | The end date.                                                                                                                                                                                                                            |
| `State`                      | `ProcessInstanceStateFilterProperty` | The process instance state.                                                                                                                                                                                                              |
| `HasIncident`                | `Nullable<Boolean>`                  | Whether this process instance has a related incident or not.                                                                                                                                                                             |
| `TenantId`                   | `StringFilterProperty`               | The tenant id.                                                                                                                                                                                                                           |
| `Variables`                  | `List<VariableValueFilterProperty>`  | The process instance variables.                                                                                                                                                                                                          |
| `ProcessInstanceKey`         | `ProcessInstanceKeyFilterProperty`   | The key of this process instance.                                                                                                                                                                                                        |
| `ParentProcessInstanceKey`   | `ProcessInstanceKeyFilterProperty`   | The parent process instance key.                                                                                                                                                                                                         |
| `ParentElementInstanceKey`   | `ElementInstanceKeyFilterProperty`   | The parent element instance key.                                                                                                                                                                                                         |
| `BatchOperationId`           | `StringFilterProperty`               | The batch operation id. **Deprecated**: Use `batchOperationKey` instead. This field will be removed in a future release. If both `batchOperationId` and `batchOperationKey` are provided, the request will be rejected with a 400 error. |
| `BatchOperationKey`          | `StringFilterProperty`               | The batch operation key.                                                                                                                                                                                                                 |
| `ErrorMessage`               | `StringFilterProperty`               | The error message related to the process.                                                                                                                                                                                                |
| `HasRetriesLeft`             | `Nullable<Boolean>`                  | Whether the process has failed jobs with retries left.                                                                                                                                                                                   |
| `ElementInstanceState`       | `ElementInstanceStateFilterProperty` | The state of the element instances associated with the process instance.                                                                                                                                                                 |
| `ElementId`                  | `StringFilterProperty`               | The element id associated with the process instance.                                                                                                                                                                                     |
| `HasElementInstanceIncident` | `Nullable<Boolean>`                  | Whether the element instance has an incident or not.                                                                                                                                                                                     |
| `IncidentErrorHashCode`      | `IntegerFilterProperty`              | The incident error hash code, associated with this process.                                                                                                                                                                              |
| `Tags`                       | `List<Tag>`                          | List of tags. Tags need to start with a letter; then alphanumerics, `_`, `-`, `:`, or `.`; length ≤ 100.                                                                                                                                 |
| `BusinessId`                 | `StringFilterProperty`               | The business id associated with the process instance.                                                                                                                                                                                    |

## BasicStringFilter

Basic advanced string filter.

```csharp
public sealed class BasicStringFilter
```

| Property | Type                | Description                                                 |
| -------- | ------------------- | ----------------------------------------------------------- |
| `Eq`     | `String`            | Checks for equality with the provided value.                |
| `Neq`    | `String`            | Checks for inequality with the provided value.              |
| `Exists` | `Nullable<Boolean>` | Checks if the current property exists.                      |
| `In`     | `List<String>`      | Checks if the property matches any of the provided values.  |
| `NotIn`  | `List<String>`      | Checks if the property matches none of the provided values. |

## BasicStringFilterProperty

String property with basic advanced search capabilities.

```csharp
public sealed class BasicStringFilterProperty
```

## BatchOperationCreatedResult

The created batch operation.

```csharp
public sealed class BatchOperationCreatedResult
```

| Property             | Type                     | Description                      |
| -------------------- | ------------------------ | -------------------------------- |
| `BatchOperationKey`  | `BatchOperationKey`      | Key of the batch operation.      |
| `BatchOperationType` | `BatchOperationTypeEnum` | The type of the batch operation. |

## BatchOperationError

BatchOperationError

```csharp
public sealed class BatchOperationError
```

| Property      | Type     | Description                                                     |
| ------------- | -------- | --------------------------------------------------------------- |
| `PartitionId` | `Int32`  | The partition ID where the error occurred.                      |
| `Type`        | `String` | The type of the error that occurred during the batch operation. |
| `Message`     | `String` | The error message that occurred during the batch operation.     |

## BatchOperationFilter

Batch operation filter request.

```csharp
public sealed class BatchOperationFilter
```

| Property            | Type                                | Description                                            |
| ------------------- | ----------------------------------- | ------------------------------------------------------ |
| `BatchOperationKey` | `BasicStringFilterProperty`         | The key (or operate legacy ID) of the batch operation. |
| `OperationType`     | `BatchOperationTypeFilterProperty`  | The type of the batch operation.                       |
| `State`             | `BatchOperationStateFilterProperty` | The state of the batch operation.                      |
| `ActorType`         | `Nullable<AuditLogActorTypeEnum>`   | The type of the actor who performed the operation.     |
| `ActorId`           | `StringFilterProperty`              | The ID of the actor who performed the operation.       |

## BatchOperationItemFilter

Batch operation item filter request.

```csharp
public sealed class BatchOperationItemFilter
```

| Property             | Type                               | Description                                            |
| -------------------- | ---------------------------------- | ------------------------------------------------------ |
| `BatchOperationKey`  | `BasicStringFilterProperty`        | The key (or operate legacy ID) of the batch operation. |
| `ItemKey`            | `BasicStringFilterProperty`        | The key of the item, e.g. a process instance key.      |
| `ProcessInstanceKey` | `ProcessInstanceKeyFilterProperty` | The process instance key of the processed item.        |
| `State`              | `String`                           | The state of the batch operation.                      |
| `OperationType`      | `BatchOperationTypeFilterProperty` | The type of the batch operation.                       |

## BatchOperationItemResponse

BatchOperationItemResponse

```csharp
public sealed class BatchOperationItemResponse
```

| Property                 | Type                           | Description                                                                                                                                                                                                                                 |
| ------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OperationType`          | `BatchOperationTypeEnum`       | The type of the batch operation.                                                                                                                                                                                                            |
| `BatchOperationKey`      | `BatchOperationKey`            | The key (or operate legacy ID) of the batch operation.                                                                                                                                                                                      |
| `ItemKey`                | `String`                       | Key of the item, e.g. a process instance key.                                                                                                                                                                                               |
| `ProcessInstanceKey`     | `ProcessInstanceKey`           | the process instance key of the processed item.                                                                                                                                                                                             |
| `RootProcessInstanceKey` | `Nullable<ProcessInstanceKey>` | The key of the root process instance. The root process instance is the top-level ancestor in the process instance hierarchy. This field is only present for data belonging to process instance hierarchies created in version 8.9 or later. |
| `State`                  | `String`                       | State of the item.                                                                                                                                                                                                                          |
| `ProcessedDate`          | `Nullable<DateTimeOffset>`     | The date this item was processed. This is `null` if the item has not yet been processed.                                                                                                                                                    |
| `ErrorMessage`           | `String`                       | The error message from the engine in case of a failed operation.                                                                                                                                                                            |

## BatchOperationItemSearchQuery

Batch operation item search request.

```csharp
public sealed class BatchOperationItemSearchQuery
```

| Property | Type                                             | Description                              |
| -------- | ------------------------------------------------ | ---------------------------------------- |
| `Sort`   | `List<BatchOperationItemSearchQuerySortRequest>` | Sort field criteria.                     |
| `Filter` | `BatchOperationItemFilter`                       | The batch operation item search filters. |
| `Page`   | `SearchQueryPageRequest`                         | Pagination criteria.                     |

## BatchOperationItemSearchQueryResult

BatchOperationItemSearchQueryResult

```csharp
public sealed class BatchOperationItemSearchQueryResult
```

| Property | Type                               | Description                                      |
| -------- | ---------------------------------- | ------------------------------------------------ |
| `Items`  | `List<BatchOperationItemResponse>` | The matching batch operation items.              |
| `Page`   | `SearchQueryPageResponse`          | Pagination information about the search results. |

## BatchOperationItemSearchQuerySortRequest

BatchOperationItemSearchQuerySortRequest

```csharp
public sealed class BatchOperationItemSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## BatchOperationItemStateExactMatch

Matches the value exactly.

```csharp
public readonly record struct BatchOperationItemStateExactMatch : ICamundaKey, IEquatable<BatchOperationItemStateExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## BatchOperationItemStateFilterProperty

BatchOperationItemStateEnum property with full advanced search capabilities.

```csharp
public sealed class BatchOperationItemStateFilterProperty
```

## BatchOperationResponse

BatchOperationResponse

```csharp
public sealed class BatchOperationResponse
```

| Property                   | Type                              | Description                                                                                                                                                    |
| -------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BatchOperationKey`        | `BatchOperationKey`               | Key or (Operate Legacy ID = UUID) of the batch operation.                                                                                                      |
| `State`                    | `BatchOperationStateEnum`         | The batch operation state.                                                                                                                                     |
| `BatchOperationType`       | `BatchOperationTypeEnum`          | The type of the batch operation.                                                                                                                               |
| `StartDate`                | `Nullable<DateTimeOffset>`        | The start date of the batch operation. This is `null` if the batch operation has not yet started.                                                              |
| `EndDate`                  | `Nullable<DateTimeOffset>`        | The end date of the batch operation. This is `null` if the batch operation is still running.                                                                   |
| `ActorType`                | `Nullable<AuditLogActorTypeEnum>` | The type of the actor who performed the operation. This is `null` if the batch operation was created before 8.9, or if the actor information is not available. |
| `ActorId`                  | `String`                          | The ID of the actor who performed the operation. Available for batch operations created since 8.9.                                                             |
| `OperationsTotalCount`     | `Int32`                           | The total number of items contained in this batch operation.                                                                                                   |
| `OperationsFailedCount`    | `Int32`                           | The number of items which failed during execution of the batch operation. (e.g. because they are rejected by the Zeebe engine).                                |
| `OperationsCompletedCount` | `Int32`                           | The number of successfully completed tasks.                                                                                                                    |
| `Errors`                   | `List<BatchOperationError>`       | The errors that occurred per partition during the batch operation.                                                                                             |

## BatchOperationSearchQuery

Batch operation search request.

```csharp
public sealed class BatchOperationSearchQuery
```

| Property | Type                                         | Description                         |
| -------- | -------------------------------------------- | ----------------------------------- |
| `Sort`   | `List<BatchOperationSearchQuerySortRequest>` | Sort field criteria.                |
| `Filter` | `BatchOperationFilter`                       | The batch operation search filters. |
| `Page`   | `SearchQueryPageRequest`                     | Pagination criteria.                |

## BatchOperationSearchQueryResult

The batch operation search query result.

```csharp
public sealed class BatchOperationSearchQueryResult
```

| Property | Type                           | Description                                      |
| -------- | ------------------------------ | ------------------------------------------------ |
| `Items`  | `List<BatchOperationResponse>` | The matching batch operations.                   |
| `Page`   | `SearchQueryPageResponse`      | Pagination information about the search results. |

## BatchOperationSearchQuerySortRequest

BatchOperationSearchQuerySortRequest

```csharp
public sealed class BatchOperationSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## BatchOperationStateExactMatch

Matches the value exactly.

```csharp
public readonly record struct BatchOperationStateExactMatch : ICamundaKey, IEquatable<BatchOperationStateExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## BatchOperationStateFilterProperty

BatchOperationStateEnum property with full advanced search capabilities.

```csharp
public sealed class BatchOperationStateFilterProperty
```

## BatchOperationTypeExactMatch

Matches the value exactly.

```csharp
public readonly record struct BatchOperationTypeExactMatch : ICamundaKey, IEquatable<BatchOperationTypeExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## BatchOperationTypeFilterProperty

BatchOperationTypeEnum property with full advanced search capabilities.

```csharp
public sealed class BatchOperationTypeFilterProperty
```

## BpmnErrorException

Throw from a job handler to trigger a BPMN error boundary event on the job's task.
The error code is matched against error catch events in the process model.

```csharp
public sealed class BpmnErrorException : Exception, ISerializable
```

| Property       | Type     | Description                                               |
| -------------- | -------- | --------------------------------------------------------- |
| `ErrorCode`    | `String` | The error code matched against BPMN error catch events.   |
| `ErrorMessage` | `String` | Optional additional context message.                      |
| `Variables`    | `Object` | Optional variables to set at the error catch event scope. |

## BrokerInfo

Provides information on a broker node.

```csharp
public sealed class BrokerInfo
```

| Property     | Type              | Description                                                |
| ------------ | ----------------- | ---------------------------------------------------------- |
| `NodeId`     | `Int32`           | The unique (within a cluster) node ID for the broker.      |
| `Host`       | `String`          | The hostname for reaching the broker.                      |
| `Port`       | `Int32`           | The port for reaching the broker.                          |
| `Partitions` | `List<Partition>` | A list of partitions managed or replicated on this broker. |
| `Version`    | `String`          | The broker version.                                        |

## BusinessId

An optional, user-defined string identifier that identifies the process instance
within the scope of a process definition (scoped by tenant). If provided and uniqueness
enforcement is enabled, the engine will reject creation if another root process instance
with the same business id is already active for the same process definition.
Note that any active child process instances with the same business id are not taken into account.

```csharp
public readonly record struct BusinessId : ICamundaKey, IEquatable<BusinessId>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## CamundaAuthException

Authentication-specific exception.

```csharp
public sealed class CamundaAuthException : Exception, ISerializable
```

| Property | Type                   | Description |
| -------- | ---------------------- | ----------- |
| `Code`   | `CamundaAuthErrorCode` |             |

## CamundaConfigurationException

Thrown when configuration hydration encounters validation errors.

```csharp
public sealed class CamundaConfigurationException : Exception, ISerializable
```

| Property | Type                               | Description |
| -------- | ---------------------------------- | ----------- |
| `Errors` | `IReadOnlyList<ConfigErrorDetail>` |             |

## CamundaKeyJsonConverterFactory

JSON converter factory that handles any struct.
Serializes as a plain JSON string; deserializes by calling the static AssumeExists factory.

```csharp
public sealed class CamundaKeyJsonConverterFactory : JsonConverterFactory
```

## CamundaKeyValidation

Validation helpers for domain key constraints.

```csharp
public static class CamundaKeyValidation
```

## CamundaLongKeyJsonConverterFactory

JSON converter factory that handles any struct.
Serializes as a JSON number; deserializes by calling the static AssumeExists factory.

```csharp
public sealed class CamundaLongKeyJsonConverterFactory : JsonConverterFactory
```

## CamundaSdkException

SDK error types mirroring the JS SDK's error structure.

```csharp
public class CamundaSdkException : Exception, ISerializable
```

| Property      | Type              | Description |
| ------------- | ----------------- | ----------- |
| `OperationId` | `String`          |             |
| `Status`      | `Nullable<Int32>` |             |

## CamundaUserResult

CamundaUserResult

```csharp
public sealed class CamundaUserResult
```

| Property               | Type                 | Description                                                   |
| ---------------------- | -------------------- | ------------------------------------------------------------- |
| `Username`             | `Nullable<Username>` | The username of the user.                                     |
| `DisplayName`          | `String`             | The display name of the user.                                 |
| `Email`                | `String`             | The email of the user.                                        |
| `AuthorizedComponents` | `List<String>`       | The web components the user is authorized to use.             |
| `Tenants`              | `List<TenantResult>` | The tenants the user is a member of.                          |
| `Groups`               | `List<String>`       | The groups assigned to the user.                              |
| `Roles`                | `List<String>`       | The roles assigned to the user.                               |
| `SalesPlanType`        | `String`             | The plan of the user.                                         |
| `C8Links`              | `Dictionary<String>` | The links to the components in the C8 stack.                  |
| `CanLogout`            | `Boolean`            | Flag for understanding if the user is able to perform logout. |

## CancelProcessInstanceRequest

CancelProcessInstanceRequest

```csharp
public sealed class CancelProcessInstanceRequest
```

| Property             | Type                           | Description                                                                                                                    |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `OperationReference` | `Nullable<OperationReference>` | A reference key chosen by the user that will be part of all records resulting from this operation. Must be &gt; 0 if provided. |

## CancelSdkException

Thrown when a cancellable operation is cancelled.

```csharp
public sealed class CancelSdkException : CamundaSdkException, ISerializable
```

## CategoryExactMatch

Matches the value exactly.

```csharp
public readonly record struct CategoryExactMatch : ICamundaKey, IEquatable<CategoryExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## CategoryFilterProperty

AuditLogCategoryEnum property with full advanced search capabilities.

```csharp
public sealed class CategoryFilterProperty
```

## Changeset

JSON object with changed task attribute values.

The following attributes can be adjusted with this endpoint, additional attributes
will be ignored:

- `candidateGroups` - reset by providing an empty list
- `candidateUsers` - reset by providing an empty list
- `dueDate` - reset by providing an empty String
- `followUpDate` - reset by providing an empty String
- `priority` - minimum 0, maximum 100, default 50

Providing any of those attributes with a `null` value or omitting it preserves
the persisted attribute's value.

The assignee cannot be adjusted with this endpoint, use the Assign task endpoint.
This ensures correct event emission for assignee changes.

```csharp
public sealed class Changeset
```

| Property          | Type                       | Description                                                                 |
| ----------------- | -------------------------- | --------------------------------------------------------------------------- |
| `DueDate`         | `Nullable<DateTimeOffset>` | The due date of the task. Reset by providing an empty String.               |
| `FollowUpDate`    | `Nullable<DateTimeOffset>` | The follow-up date of the task. Reset by providing an empty String.         |
| `CandidateUsers`  | `List<String>`             | The list of candidate users of the task. Reset by providing an empty list.  |
| `CandidateGroups` | `List<String>`             | The list of candidate groups of the task. Reset by providing an empty list. |
| `Priority`        | `Nullable<Int32>`          | The priority of the task.                                                   |

## ClockPinRequest

ClockPinRequest

```csharp
public sealed class ClockPinRequest
```

| Property    | Type    | Description                                                               |
| ----------- | ------- | ------------------------------------------------------------------------- |
| `Timestamp` | `Int64` | The exact time in epoch milliseconds to which the clock should be pinned. |

## ClusterVariableResult

ClusterVariableResult

```csharp
public sealed class ClusterVariableResult
```

| Property   | Type                       | Description                                                                             |
| ---------- | -------------------------- | --------------------------------------------------------------------------------------- |
| `Value`    | `String`                   | Full value of this cluster variable.                                                    |
| `Name`     | `String`                   | The name of the cluster variable. Unique within its scope (global or tenant-specific).  |
| `Scope`    | `ClusterVariableScopeEnum` | The scope of a cluster variable.                                                        |
| `TenantId` | `String`                   | Only provided if the cluster variable scope is TENANT. Null for global scope variables. |

## ClusterVariableResultBase

Cluster variable response item.

```csharp
public sealed class ClusterVariableResultBase
```

| Property   | Type                       | Description                                                                             |
| ---------- | -------------------------- | --------------------------------------------------------------------------------------- |
| `Name`     | `String`                   | The name of the cluster variable. Unique within its scope (global or tenant-specific).  |
| `Scope`    | `ClusterVariableScopeEnum` | The scope of a cluster variable.                                                        |
| `TenantId` | `String`                   | Only provided if the cluster variable scope is TENANT. Null for global scope variables. |

## ClusterVariableScopeExactMatch

Matches the value exactly.

```csharp
public readonly record struct ClusterVariableScopeExactMatch : ICamundaKey, IEquatable<ClusterVariableScopeExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## ClusterVariableScopeFilterProperty

ClusterVariableScopeEnum property with full advanced search capabilities.

```csharp
public sealed class ClusterVariableScopeFilterProperty
```

## ClusterVariableSearchQueryFilterRequest

Cluster variable filter request.

```csharp
public sealed class ClusterVariableSearchQueryFilterRequest
```

| Property      | Type                                 | Description                                                                                                                                                                                                                                                                                                                                                                          |
| ------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Name`        | `StringFilterProperty`               | Name of the cluster variable.                                                                                                                                                                                                                                                                                                                                                        |
| `Value`       | `StringFilterProperty`               | The value of the cluster variable.                                                                                                                                                                                                                                                                                                                                                   |
| `Scope`       | `ClusterVariableScopeFilterProperty` | The scope filter for cluster variables.                                                                                                                                                                                                                                                                                                                                              |
| `TenantId`    | `StringFilterProperty`               | Tenant ID of this variable.                                                                                                                                                                                                                                                                                                                                                          |
| `IsTruncated` | `Nullable<Boolean>`                  | Filter cluster variables by truncation status of their stored values. When true, returns only variables whose stored values are truncated (i.e., the value exceeds the storage size limit and is truncated in storage). When false, returns only variables with non-truncated stored values. This filter is based on the underlying storage characteristic, not the response format. |

## ClusterVariableSearchQueryRequest

Cluster variable search query request.

```csharp
public sealed class ClusterVariableSearchQueryRequest
```

| Property | Type                                          | Description                          |
| -------- | --------------------------------------------- | ------------------------------------ |
| `Sort`   | `List<ClusterVariableSearchQuerySortRequest>` | Sort field criteria.                 |
| `Filter` | `ClusterVariableSearchQueryFilterRequest`     | The cluster variable search filters. |
| `Page`   | `SearchQueryPageRequest`                      | Pagination criteria.                 |

## ClusterVariableSearchQueryResult

Cluster variable search query response.

```csharp
public sealed class ClusterVariableSearchQueryResult
```

| Property | Type                                | Description                                      |
| -------- | ----------------------------------- | ------------------------------------------------ |
| `Items`  | `List<ClusterVariableSearchResult>` | The matching cluster variables.                  |
| `Page`   | `SearchQueryPageResponse`           | Pagination information about the search results. |

## ClusterVariableSearchQuerySortRequest

ClusterVariableSearchQuerySortRequest

```csharp
public sealed class ClusterVariableSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## ClusterVariableSearchResult

Cluster variable search response item.

```csharp
public sealed class ClusterVariableSearchResult
```

| Property      | Type                       | Description                                                                             |
| ------------- | -------------------------- | --------------------------------------------------------------------------------------- |
| `Value`       | `String`                   | Value of this cluster variable. Can be truncated.                                       |
| `IsTruncated` | `Boolean`                  | Whether the value is truncated or not.                                                  |
| `Name`        | `String`                   | The name of the cluster variable. Unique within its scope (global or tenant-specific).  |
| `Scope`       | `ClusterVariableScopeEnum` | The scope of a cluster variable.                                                        |
| `TenantId`    | `String`                   | Only provided if the cluster variable scope is TENANT. Null for global scope variables. |

## ConditionalEvaluationInstruction

ConditionalEvaluationInstruction

```csharp
public sealed class ConditionalEvaluationInstruction : ITenantIdSettable
```

| Property               | Type                             | Description                                                                                                                                                                                         |
| ---------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TenantId`             | `Nullable<TenantId>`             | Used to evaluate root-level conditional start events for a tenant with the given ID. This will only evaluate root-level conditional start events of process definitions which belong to the tenant. |
| `ProcessDefinitionKey` | `Nullable<ProcessDefinitionKey>` | Used to evaluate root-level conditional start events of the process definition with the given key.                                                                                                  |
| `Variables`            | `Object`                         | JSON object representing the variables to use for evaluation of the conditions and to pass to the process instances that have been triggered.                                                       |

## ConsistencyOptions<T>

Options for eventual consistency polling behavior.

```csharp
public sealed class ConsistencyOptions<T>
```

| Property         | Type       | Description                                                                                                                                        |
| ---------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `WaitUpToMs`     | `Int32`    | Maximum time to wait for the data to become consistent, in milliseconds. Set to 0 to skip eventual consistency handling.                           |
| `PollIntervalMs` | `Int32`    | Poll interval in milliseconds (default: 500).                                                                                                      |
| `IsConsistent`   | `Boolean}` | Optional predicate: when true, the response is considered consistent. If not set, any non-null response with items (where applicable) is accepted. |

## CorrelatedMessageSubscriptionFilter

Correlated message subscriptions search filter.

```csharp
public sealed class CorrelatedMessageSubscriptionFilter
```

| Property               | Type                                   | Description                                                                                                                                                            |
| ---------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CorrelationKey`       | `StringFilterProperty`                 | The correlation key of the message.                                                                                                                                    |
| `CorrelationTime`      | `DateTimeFilterProperty`               | The time when the message was correlated.                                                                                                                              |
| `ElementId`            | `StringFilterProperty`                 | The element ID that received the message.                                                                                                                              |
| `ElementInstanceKey`   | `ElementInstanceKeyFilterProperty`     | The element instance key that received the message.                                                                                                                    |
| `MessageKey`           | `BasicStringFilterProperty`            | The message key.                                                                                                                                                       |
| `MessageName`          | `StringFilterProperty`                 | The name of the message.                                                                                                                                               |
| `PartitionId`          | `IntegerFilterProperty`                | The partition ID that correlated the message.                                                                                                                          |
| `ProcessDefinitionId`  | `StringFilterProperty`                 | The process definition ID associated with this correlated message subscription.                                                                                        |
| `ProcessDefinitionKey` | `ProcessDefinitionKeyFilterProperty`   | The process definition key associated with this correlated message subscription. For intermediate message events, this only works for data created with 8.9 and later. |
| `ProcessInstanceKey`   | `ProcessInstanceKeyFilterProperty`     | The process instance key associated with this correlated message subscription.                                                                                         |
| `SubscriptionKey`      | `MessageSubscriptionKeyFilterProperty` | The subscription key that received the message.                                                                                                                        |
| `TenantId`             | `StringFilterProperty`                 | The tenant ID associated with this correlated message subscription.                                                                                                    |

## CorrelatedMessageSubscriptionResult

CorrelatedMessageSubscriptionResult

```csharp
public sealed class CorrelatedMessageSubscriptionResult
```

| Property                 | Type                           | Description                                                                                                                                                                                                                                 |
| ------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CorrelationKey`         | `String`                       | The correlation key of the message.                                                                                                                                                                                                         |
| `CorrelationTime`        | `DateTimeOffset`               | The time when the message was correlated.                                                                                                                                                                                                   |
| `ElementId`              | `String`                       | The element ID that received the message.                                                                                                                                                                                                   |
| `ElementInstanceKey`     | `Nullable<ElementInstanceKey>` | The element instance key that received the message. It is `null` for start event subscriptions.                                                                                                                                             |
| `MessageKey`             | `MessageKey`                   | The message key.                                                                                                                                                                                                                            |
| `MessageName`            | `String`                       | The name of the message.                                                                                                                                                                                                                    |
| `PartitionId`            | `Int32`                        | The partition ID that correlated the message.                                                                                                                                                                                               |
| `ProcessDefinitionId`    | `ProcessDefinitionId`          | The process definition ID associated with this correlated message subscription.                                                                                                                                                             |
| `ProcessDefinitionKey`   | `ProcessDefinitionKey`         | The process definition key associated with this correlated message subscription.                                                                                                                                                            |
| `ProcessInstanceKey`     | `ProcessInstanceKey`           | The process instance key associated with this correlated message subscription.                                                                                                                                                              |
| `RootProcessInstanceKey` | `Nullable<ProcessInstanceKey>` | The key of the root process instance. The root process instance is the top-level ancestor in the process instance hierarchy. This field is only present for data belonging to process instance hierarchies created in version 8.9 or later. |
| `SubscriptionKey`        | `MessageSubscriptionKey`       | The subscription key that received the message.                                                                                                                                                                                             |
| `TenantId`               | `TenantId`                     | The tenant ID associated with this correlated message subscription.                                                                                                                                                                         |

## CorrelatedMessageSubscriptionSearchQuery

CorrelatedMessageSubscriptionSearchQuery

```csharp
public sealed class CorrelatedMessageSubscriptionSearchQuery
```

| Property | Type                                                        | Description                                          |
| -------- | ----------------------------------------------------------- | ---------------------------------------------------- |
| `Sort`   | `List<CorrelatedMessageSubscriptionSearchQuerySortRequest>` | Sort field criteria.                                 |
| `Filter` | `CorrelatedMessageSubscriptionFilter`                       | The correlated message subscriptions search filters. |
| `Page`   | `SearchQueryPageRequest`                                    | Pagination criteria.                                 |

## CorrelatedMessageSubscriptionSearchQueryResult

CorrelatedMessageSubscriptionSearchQueryResult

```csharp
public sealed class CorrelatedMessageSubscriptionSearchQueryResult
```

| Property | Type                                        | Description                                      |
| -------- | ------------------------------------------- | ------------------------------------------------ |
| `Items`  | `List<CorrelatedMessageSubscriptionResult>` | The matching correlated message subscriptions.   |
| `Page`   | `SearchQueryPageResponse`                   | Pagination information about the search results. |

## CorrelatedMessageSubscriptionSearchQuerySortRequest

CorrelatedMessageSubscriptionSearchQuerySortRequest

```csharp
public sealed class CorrelatedMessageSubscriptionSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## CreateClusterVariableRequest

CreateClusterVariableRequest

```csharp
public sealed class CreateClusterVariableRequest
```

| Property | Type     | Description                                                                                                                     |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `Name`   | `String` | The name of the cluster variable. Must be unique within its scope (global or tenant-specific).                                  |
| `Value`  | `Object` | The value of the cluster variable. Can be any JSON object or primitive value. Will be serialized as a JSON string in responses. |

## CreateGlobalTaskListenerRequest

CreateGlobalTaskListenerRequest

```csharp
public sealed class CreateGlobalTaskListenerRequest
```

| Property     | Type                                    | Description                                              |
| ------------ | --------------------------------------- | -------------------------------------------------------- |
| `Id`         | `GlobalListenerId`                      | The user-defined id for the global listener              |
| `EventTypes` | `List<GlobalTaskListenerEventTypeEnum>` | List of user task event types that trigger the listener. |

## CreateMappingRuleResponse

CreateMappingRuleResponse

```csharp
public sealed class CreateMappingRuleResponse
```

| Property        | Type     | Description                        |
| --------------- | -------- | ---------------------------------- |
| `ClaimName`     | `String` | The name of the claim to map.      |
| `ClaimValue`    | `String` | The value of the claim to map.     |
| `Name`          | `String` | The name of the mapping rule.      |
| `MappingRuleId` | `String` | The unique ID of the mapping rule. |

## CreateProcessInstanceResult

CreateProcessInstanceResult

```csharp
public sealed class CreateProcessInstanceResult
```

| Property                   | Type                   | Description                                                                                                                                            |
| -------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ProcessDefinitionId`      | `ProcessDefinitionId`  | The BPMN process id of the process definition which was used to create the process. instance                                                           |
| `ProcessDefinitionVersion` | `Int32`                | The version of the process definition which was used to create the process instance.                                                                   |
| `TenantId`                 | `TenantId`             | The tenant id of the created process instance.                                                                                                         |
| `Variables`                | `Object`               | All the variables visible in the root scope.                                                                                                           |
| `ProcessDefinitionKey`     | `ProcessDefinitionKey` | The key of the process definition which was used to create the process instance.                                                                       |
| `ProcessInstanceKey`       | `ProcessInstanceKey`   | The unique identifier of the created process instance; to be used wherever a request needs a process instance key (e.g. CancelProcessInstanceRequest). |
| `Tags`                     | `List<Tag>`            | List of tags. Tags need to start with a letter; then alphanumerics, `_`, `-`, `:`, or `.`; length ≤ 100.                                               |
| `BusinessId`               | `Nullable<BusinessId>` | Business id as provided on creation.                                                                                                                   |

## CursorBackwardPagination

CursorBackwardPagination

```csharp
public sealed class CursorBackwardPagination : SearchQueryPageRequest
```

| Property | Type              | Description                                                                                   |
| -------- | ----------------- | --------------------------------------------------------------------------------------------- |
| `Before` | `StartCursor`     | Use the `startCursor` value from the previous response to fetch the previous page of results. |
| `Limit`  | `Nullable<Int32>` | The maximum number of items to return in one request.                                         |

## CursorForwardPagination

CursorForwardPagination

```csharp
public sealed class CursorForwardPagination : SearchQueryPageRequest
```

| Property | Type              | Description                                                                             |
| -------- | ----------------- | --------------------------------------------------------------------------------------- |
| `After`  | `EndCursor`       | Use the `endCursor` value from the previous response to fetch the next page of results. |
| `Limit`  | `Nullable<Int32>` | The maximum number of items to return in one request.                                   |

## DateTimeFilterProperty

Date-time property with full advanced search capabilities.

```csharp
public sealed class DateTimeFilterProperty
```

## DecisionDefinitionFilter

Decision definition search filter.

```csharp
public sealed class DecisionDefinitionFilter
```

| Property                      | Type                                | Description                                                                                                                                                                                                                                                                                                   |
| ----------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DecisionDefinitionId`        | `Nullable<DecisionDefinitionId>`    | The DMN ID of the decision definition.                                                                                                                                                                                                                                                                        |
| `Name`                        | `String`                            | The DMN name of the decision definition.                                                                                                                                                                                                                                                                      |
| `IsLatestVersion`             | `Nullable<Boolean>`                 | Whether to only return the latest version of each decision definition. When using this filter, pagination functionality is limited, you can only paginate forward using `after` and `limit`. The response contains no `startCursor` in the `page`, and requests ignore the `from` and `before` in the `page`. |
| `Version`                     | `Nullable<Int32>`                   | The assigned version of the decision definition.                                                                                                                                                                                                                                                              |
| `DecisionRequirementsId`      | `String`                            | the DMN ID of the decision requirements graph that the decision definition is part of.                                                                                                                                                                                                                        |
| `TenantId`                    | `Nullable<TenantId>`                | The tenant ID of the decision definition.                                                                                                                                                                                                                                                                     |
| `DecisionDefinitionKey`       | `Nullable<DecisionDefinitionKey>`   | The assigned key, which acts as a unique identifier for this decision definition.                                                                                                                                                                                                                             |
| `DecisionRequirementsKey`     | `Nullable<DecisionRequirementsKey>` | The assigned key of the decision requirements graph that the decision definition is part of.                                                                                                                                                                                                                  |
| `DecisionRequirementsName`    | `String`                            | The DMN name of the decision requirements that the decision definition is part of.                                                                                                                                                                                                                            |
| `DecisionRequirementsVersion` | `Nullable<Int32>`                   | The assigned version of the decision requirements that the decision definition is part of.                                                                                                                                                                                                                    |

## DecisionDefinitionId

Id of a decision definition, from the model. Only ids of decision definitions that are deployed are useful.

```csharp
public readonly record struct DecisionDefinitionId : ICamundaKey, IEquatable<DecisionDefinitionId>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## DecisionDefinitionKeyExactMatch

Matches the value exactly.

```csharp
public readonly record struct DecisionDefinitionKeyExactMatch : ICamundaKey, IEquatable<DecisionDefinitionKeyExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## DecisionDefinitionKeyFilterProperty

DecisionDefinitionKey property with full advanced search capabilities.

```csharp
public sealed class DecisionDefinitionKeyFilterProperty
```

## DecisionDefinitionResult

DecisionDefinitionResult

```csharp
public sealed class DecisionDefinitionResult
```

| Property                      | Type                      | Description                                                                                  |
| ----------------------------- | ------------------------- | -------------------------------------------------------------------------------------------- |
| `DecisionDefinitionId`        | `DecisionDefinitionId`    | The DMN ID of the decision definition.                                                       |
| `DecisionDefinitionKey`       | `DecisionDefinitionKey`   | The assigned key, which acts as a unique identifier for this decision definition.            |
| `DecisionRequirementsId`      | `String`                  | the DMN ID of the decision requirements graph that the decision definition is part of.       |
| `DecisionRequirementsKey`     | `DecisionRequirementsKey` | The assigned key of the decision requirements graph that the decision definition is part of. |
| `DecisionRequirementsName`    | `String`                  | The DMN name of the decision requirements that the decision definition is part of.           |
| `DecisionRequirementsVersion` | `Int32`                   | The assigned version of the decision requirements that the decision definition is part of.   |
| `Name`                        | `String`                  | The DMN name of the decision definition.                                                     |
| `TenantId`                    | `TenantId`                | The tenant ID of the decision definition.                                                    |
| `Version`                     | `Int32`                   | The assigned version of the decision definition.                                             |

## DecisionDefinitionSearchQuery

DecisionDefinitionSearchQuery

```csharp
public sealed class DecisionDefinitionSearchQuery
```

| Property | Type                                             | Description                             |
| -------- | ------------------------------------------------ | --------------------------------------- |
| `Sort`   | `List<DecisionDefinitionSearchQuerySortRequest>` | Sort field criteria.                    |
| `Filter` | `DecisionDefinitionFilter`                       | The decision definition search filters. |
| `Page`   | `SearchQueryPageRequest`                         | Pagination criteria.                    |

## DecisionDefinitionSearchQueryResult

DecisionDefinitionSearchQueryResult

```csharp
public sealed class DecisionDefinitionSearchQueryResult
```

| Property | Type                             | Description                                      |
| -------- | -------------------------------- | ------------------------------------------------ |
| `Items`  | `List<DecisionDefinitionResult>` | The matching decision definitions.               |
| `Page`   | `SearchQueryPageResponse`        | Pagination information about the search results. |

## DecisionDefinitionSearchQuerySortRequest

DecisionDefinitionSearchQuerySortRequest

```csharp
public sealed class DecisionDefinitionSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## DecisionEvaluationById

DecisionEvaluationById

```csharp
public sealed class DecisionEvaluationById : DecisionEvaluationInstruction, ITenantIdSettable
```

| Property               | Type                   | Description                                                                                                              |
| ---------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `DecisionDefinitionId` | `DecisionDefinitionId` | The ID of the decision to be evaluated. When using the decision ID, the latest deployed version of the decision is used. |
| `Variables`            | `Object`               | The message variables as JSON document.                                                                                  |
| `TenantId`             | `Nullable<TenantId>`   | The tenant ID of the decision.                                                                                           |

## DecisionEvaluationByKey

DecisionEvaluationByKey

```csharp
public sealed class DecisionEvaluationByKey : DecisionEvaluationInstruction, ITenantIdSettable
```

| Property                | Type                    | Description                                     |
| ----------------------- | ----------------------- | ----------------------------------------------- |
| `DecisionDefinitionKey` | `DecisionDefinitionKey` | System-generated key for a decision definition. |
| `Variables`             | `Object`                | The message variables as JSON document.         |
| `TenantId`              | `Nullable<TenantId>`    | The tenant ID of the decision.                  |

## DecisionEvaluationInstanceKeyExactMatch

Matches the value exactly.

```csharp
public readonly record struct DecisionEvaluationInstanceKeyExactMatch : ICamundaKey, IEquatable<DecisionEvaluationInstanceKeyExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## DecisionEvaluationInstanceKeyFilterProperty

DecisionEvaluationInstanceKey property with full advanced search capabilities.

```csharp
public sealed class DecisionEvaluationInstanceKeyFilterProperty
```

## DecisionEvaluationInstruction

DecisionEvaluationInstruction

```csharp
public abstract class DecisionEvaluationInstruction
```

## DecisionEvaluationKeyExactMatch

Matches the value exactly.

```csharp
public readonly record struct DecisionEvaluationKeyExactMatch : ICamundaKey, IEquatable<DecisionEvaluationKeyExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## DecisionEvaluationKeyFilterProperty

DecisionEvaluationKey property with full advanced search capabilities.

```csharp
public sealed class DecisionEvaluationKeyFilterProperty
```

## DecisionInstanceDeletionBatchOperationRequest

The decision instance filter that defines which decision instances should be deleted.

```csharp
public sealed class DecisionInstanceDeletionBatchOperationRequest
```

| Property             | Type                           | Description                                                                                                                    |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `Filter`             | `DecisionInstanceFilter`       | The decision instance filter.                                                                                                  |
| `OperationReference` | `Nullable<OperationReference>` | A reference key chosen by the user that will be part of all records resulting from this operation. Must be &gt; 0 if provided. |

## DecisionInstanceFilter

Decision instance search filter.

```csharp
public sealed class DecisionInstanceFilter
```

| Property                        | Type                                          | Description                                                                                                                                                                                        |
| ------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DecisionEvaluationInstanceKey` | `DecisionEvaluationInstanceKeyFilterProperty` | The key of the decision evaluation instance.                                                                                                                                                       |
| `State`                         | `DecisionInstanceStateFilterProperty`         | The state of the decision instance.                                                                                                                                                                |
| `EvaluationFailure`             | `String`                                      | The evaluation failure of the decision instance.                                                                                                                                                   |
| `EvaluationDate`                | `DateTimeFilterProperty`                      | The evaluation date of the decision instance.                                                                                                                                                      |
| `DecisionDefinitionId`          | `Nullable<DecisionDefinitionId>`              | The ID of the DMN decision.                                                                                                                                                                        |
| `DecisionDefinitionName`        | `String`                                      | The name of the DMN decision.                                                                                                                                                                      |
| `DecisionDefinitionVersion`     | `Nullable<Int32>`                             | The version of the decision.                                                                                                                                                                       |
| `DecisionDefinitionType`        | `Nullable<DecisionDefinitionTypeEnum>`        | The type of the decision. UNSPECIFIED is deprecated and should not be used anymore, for removal in 8.10                                                                                            |
| `TenantId`                      | `Nullable<TenantId>`                          | The tenant ID of the decision instance.                                                                                                                                                            |
| `DecisionEvaluationKey`         | `Nullable<DecisionEvaluationKey>`             | The key of the parent decision evaluation. Note that this is not the identifier of an individual decision instance; the `decisionEvaluationInstanceKey` is the identifier for a decision instance. |
| `ProcessDefinitionKey`          | `Nullable<ProcessDefinitionKey>`              | The key of the process definition.                                                                                                                                                                 |
| `ProcessInstanceKey`            | `Nullable<ProcessInstanceKey>`                | The key of the process instance.                                                                                                                                                                   |
| `DecisionDefinitionKey`         | `DecisionDefinitionKeyFilterProperty`         | The key of the decision.                                                                                                                                                                           |
| `ElementInstanceKey`            | `ElementInstanceKeyFilterProperty`            | The key of the element instance this decision instance is linked to.                                                                                                                               |
| `RootDecisionDefinitionKey`     | `DecisionDefinitionKeyFilterProperty`         | The key of the root decision definition.                                                                                                                                                           |
| `DecisionRequirementsKey`       | `DecisionRequirementsKeyFilterProperty`       | The key of the decision requirements definition.                                                                                                                                                   |

## DecisionInstanceGetQueryResult

DecisionInstanceGetQueryResult

```csharp
public sealed class DecisionInstanceGetQueryResult
```

| Property                        | Type                               | Description                                                                                                                                                                                                                                 |
| ------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DecisionDefinitionId`          | `DecisionDefinitionId`             | The ID of the DMN decision.                                                                                                                                                                                                                 |
| `DecisionDefinitionKey`         | `DecisionDefinitionKey`            | The key of the decision.                                                                                                                                                                                                                    |
| `DecisionDefinitionName`        | `String`                           | The name of the DMN decision.                                                                                                                                                                                                               |
| `DecisionDefinitionType`        | `DecisionDefinitionTypeEnum`       | The type of the decision. UNSPECIFIED is deprecated and should not be used anymore, for removal in 8.10                                                                                                                                     |
| `DecisionDefinitionVersion`     | `Int32`                            | The version of the decision.                                                                                                                                                                                                                |
| `DecisionEvaluationInstanceKey` | `DecisionEvaluationInstanceKey`    | System-generated key for a decision evaluation instance.                                                                                                                                                                                    |
| `DecisionEvaluationKey`         | `DecisionEvaluationKey`            | The key of the decision evaluation where this instance was created.                                                                                                                                                                         |
| `ElementInstanceKey`            | `Nullable<ElementInstanceKey>`     | The key of the element instance this decision instance is linked to.                                                                                                                                                                        |
| `EvaluationDate`                | `DateTimeOffset`                   | The evaluation date of the decision instance.                                                                                                                                                                                               |
| `EvaluationFailure`             | `String`                           | The evaluation failure of the decision instance.                                                                                                                                                                                            |
| `ProcessDefinitionKey`          | `Nullable<ProcessDefinitionKey>`   | The key of the process definition.                                                                                                                                                                                                          |
| `ProcessInstanceKey`            | `Nullable<ProcessInstanceKey>`     | The key of the process instance.                                                                                                                                                                                                            |
| `Result`                        | `String`                           | The result of the decision instance.                                                                                                                                                                                                        |
| `RootDecisionDefinitionKey`     | `DecisionDefinitionKey`            | The key of the root decision definition.                                                                                                                                                                                                    |
| `RootProcessInstanceKey`        | `Nullable<ProcessInstanceKey>`     | The key of the root process instance. The root process instance is the top-level ancestor in the process instance hierarchy. This field is only present for data belonging to process instance hierarchies created in version 8.9 or later. |
| `State`                         | `DecisionInstanceStateEnum`        | The state of the decision instance. UNSPECIFIED and UNKNOWN are deprecated and should not be used anymore, for removal in 8.10                                                                                                              |
| `TenantId`                      | `TenantId`                         | The tenant ID of the decision instance.                                                                                                                                                                                                     |
| `EvaluatedInputs`               | `List<EvaluatedDecisionInputItem>` | The evaluated inputs of the decision instance.                                                                                                                                                                                              |
| `MatchedRules`                  | `List<MatchedDecisionRuleItem>`    | The matched rules of the decision instance.                                                                                                                                                                                                 |

## DecisionInstanceResult

DecisionInstanceResult

```csharp
public sealed class DecisionInstanceResult
```

| Property                        | Type                             | Description                                                                                                                                                                                                                                 |
| ------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DecisionDefinitionId`          | `DecisionDefinitionId`           | The ID of the DMN decision.                                                                                                                                                                                                                 |
| `DecisionDefinitionKey`         | `DecisionDefinitionKey`          | The key of the decision.                                                                                                                                                                                                                    |
| `DecisionDefinitionName`        | `String`                         | The name of the DMN decision.                                                                                                                                                                                                               |
| `DecisionDefinitionType`        | `DecisionDefinitionTypeEnum`     | The type of the decision. UNSPECIFIED is deprecated and should not be used anymore, for removal in 8.10                                                                                                                                     |
| `DecisionDefinitionVersion`     | `Int32`                          | The version of the decision.                                                                                                                                                                                                                |
| `DecisionEvaluationInstanceKey` | `DecisionEvaluationInstanceKey`  | System-generated key for a decision evaluation instance.                                                                                                                                                                                    |
| `DecisionEvaluationKey`         | `DecisionEvaluationKey`          | The key of the decision evaluation where this instance was created.                                                                                                                                                                         |
| `ElementInstanceKey`            | `Nullable<ElementInstanceKey>`   | The key of the element instance this decision instance is linked to.                                                                                                                                                                        |
| `EvaluationDate`                | `DateTimeOffset`                 | The evaluation date of the decision instance.                                                                                                                                                                                               |
| `EvaluationFailure`             | `String`                         | The evaluation failure of the decision instance.                                                                                                                                                                                            |
| `ProcessDefinitionKey`          | `Nullable<ProcessDefinitionKey>` | The key of the process definition.                                                                                                                                                                                                          |
| `ProcessInstanceKey`            | `Nullable<ProcessInstanceKey>`   | The key of the process instance.                                                                                                                                                                                                            |
| `Result`                        | `String`                         | The result of the decision instance.                                                                                                                                                                                                        |
| `RootDecisionDefinitionKey`     | `DecisionDefinitionKey`          | The key of the root decision definition.                                                                                                                                                                                                    |
| `RootProcessInstanceKey`        | `Nullable<ProcessInstanceKey>`   | The key of the root process instance. The root process instance is the top-level ancestor in the process instance hierarchy. This field is only present for data belonging to process instance hierarchies created in version 8.9 or later. |
| `State`                         | `DecisionInstanceStateEnum`      | The state of the decision instance. UNSPECIFIED and UNKNOWN are deprecated and should not be used anymore, for removal in 8.10                                                                                                              |
| `TenantId`                      | `TenantId`                       | The tenant ID of the decision instance.                                                                                                                                                                                                     |

## DecisionInstanceSearchQuery

DecisionInstanceSearchQuery

```csharp
public sealed class DecisionInstanceSearchQuery
```

| Property | Type                                           | Description                           |
| -------- | ---------------------------------------------- | ------------------------------------- |
| `Sort`   | `List<DecisionInstanceSearchQuerySortRequest>` | Sort field criteria.                  |
| `Filter` | `DecisionInstanceFilter`                       | The decision instance search filters. |
| `Page`   | `SearchQueryPageRequest`                       | Pagination criteria.                  |

## DecisionInstanceSearchQueryResult

DecisionInstanceSearchQueryResult

```csharp
public sealed class DecisionInstanceSearchQueryResult
```

| Property | Type                           | Description                                      |
| -------- | ------------------------------ | ------------------------------------------------ |
| `Items`  | `List<DecisionInstanceResult>` | The matching decision instances.                 |
| `Page`   | `SearchQueryPageResponse`      | Pagination information about the search results. |

## DecisionInstanceSearchQuerySortRequest

DecisionInstanceSearchQuerySortRequest

```csharp
public sealed class DecisionInstanceSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## DecisionInstanceStateExactMatch

Matches the value exactly.

```csharp
public readonly record struct DecisionInstanceStateExactMatch : ICamundaKey, IEquatable<DecisionInstanceStateExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## DecisionInstanceStateFilterProperty

DecisionInstanceStateEnum property with full advanced search capabilities.

```csharp
public sealed class DecisionInstanceStateFilterProperty
```

## DecisionRequirementsFilter

Decision requirements search filter.

```csharp
public sealed class DecisionRequirementsFilter
```

| Property                   | Type                                | Description                                                               |
| -------------------------- | ----------------------------------- | ------------------------------------------------------------------------- |
| `DecisionRequirementsName` | `String`                            | The DMN name of the decision requirements.                                |
| `DecisionRequirementsId`   | `String`                            | the DMN ID of the decision requirements.                                  |
| `DecisionRequirementsKey`  | `Nullable<DecisionRequirementsKey>` | System-generated key for a deployed decision requirements definition.     |
| `Version`                  | `Nullable<Int32>`                   | The assigned version of the decision requirements.                        |
| `TenantId`                 | `Nullable<TenantId>`                | The tenant ID of the decision requirements.                               |
| `ResourceName`             | `String`                            | The name of the resource from which the decision requirements were parsed |

## DecisionRequirementsKeyExactMatch

Matches the value exactly.

```csharp
public readonly record struct DecisionRequirementsKeyExactMatch : ICamundaKey, IEquatable<DecisionRequirementsKeyExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## DecisionRequirementsKeyFilterProperty

DecisionRequirementsKey property with full advanced search capabilities.

```csharp
public sealed class DecisionRequirementsKeyFilterProperty
```

## DecisionRequirementsResult

DecisionRequirementsResult

```csharp
public sealed class DecisionRequirementsResult
```

| Property                   | Type                      | Description                                                                         |
| -------------------------- | ------------------------- | ----------------------------------------------------------------------------------- |
| `DecisionRequirementsId`   | `String`                  | The DMN ID of the decision requirements.                                            |
| `DecisionRequirementsKey`  | `DecisionRequirementsKey` | The assigned key, which acts as a unique identifier for this decision requirements. |
| `DecisionRequirementsName` | `String`                  | The DMN name of the decision requirements.                                          |
| `ResourceName`             | `String`                  | The name of the resource from which this decision requirements was parsed.          |
| `TenantId`                 | `TenantId`                | The tenant ID of the decision requirements.                                         |
| `Version`                  | `Int32`                   | The assigned version of the decision requirements.                                  |

## DecisionRequirementsSearchQuery

DecisionRequirementsSearchQuery

```csharp
public sealed class DecisionRequirementsSearchQuery
```

| Property | Type                                               | Description                             |
| -------- | -------------------------------------------------- | --------------------------------------- |
| `Sort`   | `List<DecisionRequirementsSearchQuerySortRequest>` | Sort field criteria.                    |
| `Filter` | `DecisionRequirementsFilter`                       | The decision definition search filters. |
| `Page`   | `SearchQueryPageRequest`                           | Pagination criteria.                    |

## DecisionRequirementsSearchQueryResult

DecisionRequirementsSearchQueryResult

```csharp
public sealed class DecisionRequirementsSearchQueryResult
```

| Property | Type                               | Description                                      |
| -------- | ---------------------------------- | ------------------------------------------------ |
| `Items`  | `List<DecisionRequirementsResult>` | The matching decision requirements.              |
| `Page`   | `SearchQueryPageResponse`          | Pagination information about the search results. |

## DecisionRequirementsSearchQuerySortRequest

DecisionRequirementsSearchQuerySortRequest

```csharp
public sealed class DecisionRequirementsSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## DeleteDecisionInstanceRequest

DeleteDecisionInstanceRequest

```csharp
public sealed class DeleteDecisionInstanceRequest
```

| Property             | Type                           | Description                                                                                                                    |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `OperationReference` | `Nullable<OperationReference>` | A reference key chosen by the user that will be part of all records resulting from this operation. Must be &gt; 0 if provided. |

## DeleteProcessInstanceRequest

DeleteProcessInstanceRequest

```csharp
public sealed class DeleteProcessInstanceRequest
```

| Property             | Type                           | Description                                                                                                                    |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `OperationReference` | `Nullable<OperationReference>` | A reference key chosen by the user that will be part of all records resulting from this operation. Must be &gt; 0 if provided. |

## DeleteResourceRequest

DeleteResourceRequest

```csharp
public sealed class DeleteResourceRequest
```

| Property             | Type                           | Description                                                                                                                                                                                                                                                                                                                                                            |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OperationReference` | `Nullable<OperationReference>` | A reference key chosen by the user that will be part of all records resulting from this operation. Must be &gt; 0 if provided.                                                                                                                                                                                                                                         |
| `DeleteHistory`      | `Nullable<Boolean>`            | Indicates if the historic data of a process resource should be deleted via a batch operation asynchronously. This flag is only effective for process resources. For other resource types (decisions, forms, generic resources), this flag is ignored and no history will be deleted. In those cases, the `batchOperation` field in the response will not be populated. |

## DeleteResourceResponse

DeleteResourceResponse

```csharp
public sealed class DeleteResourceResponse
```

| Property         | Type                          | Description                                                                                                                                                                                                                                                                                    |
| ---------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ResourceKey`    | `ResourceKey`                 | The system-assigned key for this resource, requested to be deleted.                                                                                                                                                                                                                            |
| `BatchOperation` | `BatchOperationCreatedResult` | The batch operation created for asynchronously deleting the historic data. This field is only populated when the request `deleteHistory` is set to `true` and the resource is a process definition. For other resource types (decisions, forms, generic resources), this field will be `null`. |

## DeploymentDecisionRequirementsResult

Deployed decision requirements.

```csharp
public sealed class DeploymentDecisionRequirementsResult
```

| Property                   | Type                      | Description                                                                                               |
| -------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------- |
| `DecisionRequirementsId`   | `String`                  | The id of the deployed decision requirements.                                                             |
| `DecisionRequirementsName` | `String`                  | The name of the deployed decision requirements.                                                           |
| `Version`                  | `Int32`                   | The version of the deployed decision requirements.                                                        |
| `ResourceName`             | `String`                  | The name of the resource.                                                                                 |
| `TenantId`                 | `TenantId`                | The tenant ID of the deployed decision requirements.                                                      |
| `DecisionRequirementsKey`  | `DecisionRequirementsKey` | The assigned decision requirements key, which acts as a unique identifier for this decision requirements. |

## DeploymentDecisionResult

A deployed decision.

```csharp
public sealed class DeploymentDecisionResult
```

| Property                  | Type                      | Description                                                                                                                    |
| ------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `DecisionDefinitionId`    | `DecisionDefinitionId`    | The dmn decision ID, as parsed during deployment, together with the version forms a unique identifier for a specific decision. |
| `Version`                 | `Int32`                   | The assigned decision version.                                                                                                 |
| `Name`                    | `String`                  | The DMN name of the decision, as parsed during deployment.                                                                     |
| `TenantId`                | `TenantId`                | The tenant ID of the deployed decision.                                                                                        |
| `DecisionRequirementsId`  | `String`                  | The dmn ID of the decision requirements graph that this decision is part of, as parsed during deployment.                      |
| `DecisionDefinitionKey`   | `DecisionDefinitionKey`   | The assigned decision key, which acts as a unique identifier for this decision.                                                |
| `DecisionRequirementsKey` | `DecisionRequirementsKey` | The assigned key of the decision requirements graph that this decision is part of.                                             |

## DeploymentFormResult

A deployed form.

```csharp
public sealed class DeploymentFormResult
```

| Property       | Type       | Description                                                                                                        |
| -------------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| `FormId`       | `FormId`   | The form ID, as parsed during deployment, together with the version forms a unique identifier for a specific form. |
| `Version`      | `Int32`    | The version of the deployed form.                                                                                  |
| `ResourceName` | `String`   | The name of the resource.                                                                                          |
| `TenantId`     | `TenantId` | The unique identifier of the tenant.                                                                               |
| `FormKey`      | `FormKey`  | The assigned key, which acts as a unique identifier for this form.                                                 |

## DeploymentKeyExactMatch

Matches the value exactly.

```csharp
public readonly record struct DeploymentKeyExactMatch : ICamundaKey, IEquatable<DeploymentKeyExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## DeploymentKeyFilterProperty

DeploymentKey property with full advanced search capabilities.

```csharp
public sealed class DeploymentKeyFilterProperty
```

## DeploymentMetadataResult

DeploymentMetadataResult

```csharp
public sealed class DeploymentMetadataResult
```

| Property               | Type                                   | Description                               |
| ---------------------- | -------------------------------------- | ----------------------------------------- |
| `ProcessDefinition`    | `DeploymentProcessResult`              | Deployed process.                         |
| `DecisionDefinition`   | `DeploymentDecisionResult`             | Deployed decision.                        |
| `DecisionRequirements` | `DeploymentDecisionRequirementsResult` | Deployed decision requirement definition. |
| `Form`                 | `DeploymentFormResult`                 | Deployed form.                            |
| `Resource`             | `DeploymentResourceResult`             | Deployed resource.                        |

## DeploymentProcessResult

A deployed process.

```csharp
public sealed class DeploymentProcessResult
```

| Property                   | Type                   | Description                                                                                                                              |
| -------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `ProcessDefinitionId`      | `ProcessDefinitionId`  | The bpmn process ID, as parsed during deployment, together with the version forms a unique identifier for a specific process definition. |
| `ProcessDefinitionVersion` | `Int32`                | The assigned process version.                                                                                                            |
| `ResourceName`             | `String`               | The resource name from which this process was parsed.                                                                                    |
| `TenantId`                 | `TenantId`             | The tenant ID of the deployed process.                                                                                                   |
| `ProcessDefinitionKey`     | `ProcessDefinitionKey` | The assigned key, which acts as a unique identifier for this process.                                                                    |

## DeploymentResourceResult

A deployed Resource.

```csharp
public sealed class DeploymentResourceResult
```

| Property       | Type          | Description                                                            |
| -------------- | ------------- | ---------------------------------------------------------------------- |
| `ResourceId`   | `String`      | The resource id of the deployed resource.                              |
| `ResourceName` | `String`      | The name of the deployed resource.                                     |
| `Version`      | `Int32`       | The description of the deployed resource.                              |
| `TenantId`     | `TenantId`    | The unique identifier of the tenant.                                   |
| `ResourceKey`  | `ResourceKey` | The assigned key, which acts as a unique identifier for this Resource. |

## DeploymentResult

DeploymentResult

```csharp
public sealed class DeploymentResult
```

| Property        | Type                             | Description                                   |
| --------------- | -------------------------------- | --------------------------------------------- |
| `DeploymentKey` | `DeploymentKey`                  | The unique key identifying the deployment.    |
| `TenantId`      | `TenantId`                       | The tenant ID associated with the deployment. |
| `Deployments`   | `List<DeploymentMetadataResult>` | Items deployed by the request.                |

## DirectAncestorKeyInstruction

Provides a concrete key to use as ancestor scope for the created element instance.

```csharp
public sealed class DirectAncestorKeyInstruction : AncestorScopeInstruction
```

| Property                     | Type     | Description                                                                                                                                                                                                                                                                                                   |
| ---------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AncestorScopeType`          | `String` | The type of ancestor scope instruction.                                                                                                                                                                                                                                                                       |
| `AncestorElementInstanceKey` | `Object` | The key of the ancestor scope the element instance should be created in. Set to -1 to create the new element instance within an existing element instance of the flow scope. If multiple instances of the target element's flow scope exist, choose one specifically with this property by providing its key. |

## DocumentCreationBatchResponse

DocumentCreationBatchResponse

```csharp
public sealed class DocumentCreationBatchResponse
```

| Property           | Type                                  | Description                               |
| ------------------ | ------------------------------------- | ----------------------------------------- |
| `FailedDocuments`  | `List<DocumentCreationFailureDetail>` | Documents that were successfully created. |
| `CreatedDocuments` | `List<DocumentReference>`             | Documents that failed creation.           |

## DocumentCreationFailureDetail

DocumentCreationFailureDetail

```csharp
public sealed class DocumentCreationFailureDetail
```

| Property   | Type     | Description                                                              |
| ---------- | -------- | ------------------------------------------------------------------------ |
| `FileName` | `String` | The name of the file that failed to upload.                              |
| `Status`   | `Int32`  | The HTTP status code of the failure.                                     |
| `Title`    | `String` | A short, human-readable summary of the problem type.                     |
| `Detail`   | `String` | A human-readable explanation specific to this occurrence of the problem. |

## DocumentId

Document Id that uniquely identifies a document.

```csharp
public readonly record struct DocumentId : ICamundaKey, IEquatable<DocumentId>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## DocumentLink

DocumentLink

```csharp
public sealed class DocumentLink
```

| Property    | Type             | Description                              |
| ----------- | ---------------- | ---------------------------------------- |
| `Url`       | `String`         | The link to the document.                |
| `ExpiresAt` | `DateTimeOffset` | The date and time when the link expires. |

## DocumentLinkRequest

DocumentLinkRequest

```csharp
public sealed class DocumentLinkRequest
```

| Property     | Type              | Description                                  |
| ------------ | ----------------- | -------------------------------------------- |
| `TimeToLive` | `Nullable<Int64>` | The time-to-live of the document link in ms. |

## DocumentMetadata

Information about the document.

```csharp
public sealed class DocumentMetadata
```

| Property              | Type                            | Description                                                 |
| --------------------- | ------------------------------- | ----------------------------------------------------------- |
| `ContentType`         | `String`                        | The content type of the document.                           |
| `FileName`            | `String`                        | The name of the file.                                       |
| `ExpiresAt`           | `Nullable<DateTimeOffset>`      | The date and time when the document expires.                |
| `Size`                | `Nullable<Int64>`               | The size of the document in bytes.                          |
| `ProcessDefinitionId` | `Nullable<ProcessDefinitionId>` | The ID of the process definition that created the document. |
| `ProcessInstanceKey`  | `Nullable<ProcessInstanceKey>`  | The key of the process instance that created the document.  |
| `CustomProperties`    | `Object`                        | Custom properties of the document.                          |

## DocumentMetadataResponse

Information about the document that is returned in responses.

```csharp
public sealed class DocumentMetadataResponse
```

| Property              | Type                            | Description                                                 |
| --------------------- | ------------------------------- | ----------------------------------------------------------- |
| `ContentType`         | `String`                        | The content type of the document.                           |
| `FileName`            | `String`                        | The name of the file.                                       |
| `ExpiresAt`           | `Nullable<DateTimeOffset>`      | The date and time when the document expires.                |
| `Size`                | `Int64`                         | The size of the document in bytes.                          |
| `ProcessDefinitionId` | `Nullable<ProcessDefinitionId>` | The ID of the process definition that created the document. |
| `ProcessInstanceKey`  | `Nullable<ProcessInstanceKey>`  | The key of the process instance that created the document.  |
| `CustomProperties`    | `Object`                        | Custom properties of the document.                          |

## DocumentReference

DocumentReference

```csharp
public sealed class DocumentReference
```

| Property              | Type                       | Description                                                   |
| --------------------- | -------------------------- | ------------------------------------------------------------- |
| `CamundaDocumentType` | `String`                   | Document discriminator. Always set to "camunda".              |
| `StoreId`             | `String`                   | The ID of the document store.                                 |
| `DocumentId`          | `DocumentId`               | The ID of the document.                                       |
| `ContentHash`         | `String`                   | The hash of the document.                                     |
| `Metadata`            | `DocumentMetadataResponse` | Information about the document that is returned in responses. |

## ElementId

The model-defined id of an element.

```csharp
public readonly record struct ElementId : ICamundaKey, IEquatable<ElementId>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## ElementInstanceFilter

Element instance filter.

```csharp
public sealed class ElementInstanceFilter
```

| Property                  | Type                                 | Description                                                                                                                                                                                                                                                                                          |
| ------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ProcessDefinitionId`     | `Nullable<ProcessDefinitionId>`      | The process definition ID associated to this element instance.                                                                                                                                                                                                                                       |
| `State`                   | `ElementInstanceStateFilterProperty` | State of element instance as defined set of values.                                                                                                                                                                                                                                                  |
| `Type`                    | `String`                             | Type of element as defined set of values.                                                                                                                                                                                                                                                            |
| `ElementId`               | `Nullable<ElementId>`                | The element ID for this element instance.                                                                                                                                                                                                                                                            |
| `ElementName`             | `String`                             | The element name. This only works for data created with 8.8 and onwards. Instances from prior versions don't contain this data and cannot be found.                                                                                                                                                  |
| `HasIncident`             | `Nullable<Boolean>`                  | Shows whether this element instance has an incident related to.                                                                                                                                                                                                                                      |
| `TenantId`                | `Nullable<TenantId>`                 | The unique identifier of the tenant.                                                                                                                                                                                                                                                                 |
| `ElementInstanceKey`      | `Nullable<ElementInstanceKey>`       | The assigned key, which acts as a unique identifier for this element instance.                                                                                                                                                                                                                       |
| `ProcessInstanceKey`      | `Nullable<ProcessInstanceKey>`       | The process instance key associated to this element instance.                                                                                                                                                                                                                                        |
| `ProcessDefinitionKey`    | `Nullable<ProcessDefinitionKey>`     | The process definition key associated to this element instance.                                                                                                                                                                                                                                      |
| `IncidentKey`             | `Nullable<IncidentKey>`              | The key of incident if field incident is true.                                                                                                                                                                                                                                                       |
| `StartDate`               | `DateTimeFilterProperty`             | The start date of this element instance.                                                                                                                                                                                                                                                             |
| `EndDate`                 | `DateTimeFilterProperty`             | The end date of this element instance.                                                                                                                                                                                                                                                               |
| `ElementInstanceScopeKey` | `String`                             | The scope key of this element instance. If provided with a process instance key it will return element instances that are immediate children of the process instance. If provided with an element instance key it will return element instances that are immediate children of the element instance. |

## ElementInstanceKeyExactMatch

Matches the value exactly.

```csharp
public readonly record struct ElementInstanceKeyExactMatch : ICamundaKey, IEquatable<ElementInstanceKeyExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## ElementInstanceKeyFilterProperty

ElementInstanceKey property with full advanced search capabilities.

```csharp
public sealed class ElementInstanceKeyFilterProperty
```

## ElementInstanceResult

ElementInstanceResult

```csharp
public sealed class ElementInstanceResult
```

| Property                 | Type                           | Description                                                                                                                                                                                                                                 |
| ------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ProcessDefinitionId`    | `ProcessDefinitionId`          | The process definition ID associated to this element instance.                                                                                                                                                                              |
| `StartDate`              | `DateTimeOffset`               | Date when element instance started.                                                                                                                                                                                                         |
| `EndDate`                | `Nullable<DateTimeOffset>`     | Date when element instance finished.                                                                                                                                                                                                        |
| `ElementId`              | `ElementId`                    | The element ID for this element instance.                                                                                                                                                                                                   |
| `ElementName`            | `String`                       | The element name for this element instance.                                                                                                                                                                                                 |
| `Type`                   | `String`                       | Type of element as defined set of values.                                                                                                                                                                                                   |
| `State`                  | `ElementInstanceStateEnum`     | State of element instance as defined set of values.                                                                                                                                                                                         |
| `HasIncident`            | `Boolean`                      | Shows whether this element instance has an incident. If true also an incidentKey is provided.                                                                                                                                               |
| `TenantId`               | `TenantId`                     | The tenant ID of the incident.                                                                                                                                                                                                              |
| `ElementInstanceKey`     | `ElementInstanceKey`           | The assigned key, which acts as a unique identifier for this element instance.                                                                                                                                                              |
| `ProcessInstanceKey`     | `ProcessInstanceKey`           | The process instance key associated to this element instance.                                                                                                                                                                               |
| `RootProcessInstanceKey` | `Nullable<ProcessInstanceKey>` | The key of the root process instance. The root process instance is the top-level ancestor in the process instance hierarchy. This field is only present for data belonging to process instance hierarchies created in version 8.9 or later. |
| `ProcessDefinitionKey`   | `ProcessDefinitionKey`         | The process definition key associated to this element instance.                                                                                                                                                                             |
| `IncidentKey`            | `Nullable<IncidentKey>`        | Incident key associated with this element instance.                                                                                                                                                                                         |

## ElementInstanceSearchQuery

Element instance search request.

```csharp
public sealed class ElementInstanceSearchQuery
```

| Property | Type                                          | Description                          |
| -------- | --------------------------------------------- | ------------------------------------ |
| `Sort`   | `List<ElementInstanceSearchQuerySortRequest>` | Sort field criteria.                 |
| `Filter` | `ElementInstanceFilter`                       | The element instance search filters. |
| `Page`   | `SearchQueryPageRequest`                      | Pagination criteria.                 |

## ElementInstanceSearchQueryResult

ElementInstanceSearchQueryResult

```csharp
public sealed class ElementInstanceSearchQueryResult
```

| Property | Type                          | Description                                      |
| -------- | ----------------------------- | ------------------------------------------------ |
| `Items`  | `List<ElementInstanceResult>` | The matching element instances.                  |
| `Page`   | `SearchQueryPageResponse`     | Pagination information about the search results. |

## ElementInstanceSearchQuerySortRequest

ElementInstanceSearchQuerySortRequest

```csharp
public sealed class ElementInstanceSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## ElementInstanceStateExactMatch

Matches the value exactly.

```csharp
public readonly record struct ElementInstanceStateExactMatch : ICamundaKey, IEquatable<ElementInstanceStateExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## ElementInstanceStateFilterProperty

ElementInstanceStateEnum property with full advanced search capabilities.

```csharp
public sealed class ElementInstanceStateFilterProperty
```

## EndCursor

The end cursor in a search query result set.

```csharp
public readonly record struct EndCursor : ICamundaKey, IEquatable<EndCursor>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## EntityTypeExactMatch

Matches the value exactly.

```csharp
public readonly record struct EntityTypeExactMatch : ICamundaKey, IEquatable<EntityTypeExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## EntityTypeFilterProperty

AuditLogEntityTypeEnum property with full advanced search capabilities.

```csharp
public sealed class EntityTypeFilterProperty
```

## EvaluateConditionalResult

EvaluateConditionalResult

```csharp
public sealed class EvaluateConditionalResult
```

| Property                   | Type                             | Description                                                                                                             |
| -------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `ConditionalEvaluationKey` | `ConditionalEvaluationKey`       | The unique key of the conditional evaluation operation.                                                                 |
| `TenantId`                 | `TenantId`                       | The tenant ID of the conditional evaluation operation.                                                                  |
| `ProcessInstances`         | `List<ProcessInstanceReference>` | List of process instances created. If no root-level conditional start events evaluated to true, the list will be empty. |

## EvaluateDecisionResult

EvaluateDecisionResult

```csharp
public sealed class EvaluateDecisionResult
```

| Property                     | Type                             | Description                                                                                                  |
| ---------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `DecisionDefinitionId`       | `DecisionDefinitionId`           | The ID of the decision which was evaluated.                                                                  |
| `DecisionDefinitionKey`      | `DecisionDefinitionKey`          | The unique key identifying the decision which was evaluated.                                                 |
| `DecisionDefinitionName`     | `String`                         | The name of the decision which was evaluated.                                                                |
| `DecisionDefinitionVersion`  | `Int32`                          | The version of the decision which was evaluated.                                                             |
| `DecisionEvaluationKey`      | `DecisionEvaluationKey`          | The unique key identifying this decision evaluation.                                                         |
| `DecisionInstanceKey`        | `DecisionInstanceKey`            | Deprecated, please refer to `decisionEvaluationKey`.                                                         |
| `DecisionRequirementsId`     | `String`                         | The ID of the decision requirements graph that the decision which was evaluated is part of.                  |
| `DecisionRequirementsKey`    | `DecisionRequirementsKey`        | The unique key identifying the decision requirements graph that the decision which was evaluated is part of. |
| `EvaluatedDecisions`         | `List<EvaluatedDecisionResult>`  | Decisions that were evaluated within the requested decision evaluation.                                      |
| `FailedDecisionDefinitionId` | `Nullable<DecisionDefinitionId>` | The ID of the decision which failed during evaluation.                                                       |
| `FailureMessage`             | `String`                         | Message describing why the decision which was evaluated failed.                                              |
| `Output`                     | `String`                         | JSON document that will instantiate the result of the decision which was evaluated.                          |
| `TenantId`                   | `TenantId`                       | The tenant ID of the evaluated decision.                                                                     |

## EvaluatedDecisionInputItem

A decision input that was evaluated within this decision evaluation.

```csharp
public sealed class EvaluatedDecisionInputItem
```

| Property     | Type     | Description                           |
| ------------ | -------- | ------------------------------------- |
| `InputId`    | `String` | The identifier of the decision input. |
| `InputName`  | `String` | The name of the decision input.       |
| `InputValue` | `String` | The value of the decision input.      |

## EvaluatedDecisionOutputItem

The evaluated decision outputs.

```csharp
public sealed class EvaluatedDecisionOutputItem
```

| Property      | Type              | Description                                           |
| ------------- | ----------------- | ----------------------------------------------------- |
| `OutputId`    | `String`          | The ID of the evaluated decison output item.          |
| `OutputName`  | `String`          | The name of the of the evaluated decison output item. |
| `OutputValue` | `String`          | The value of the evaluated decison output item.       |
| `RuleId`      | `String`          | The ID of the matched rule.                           |
| `RuleIndex`   | `Nullable<Int32>` | The index of the matched rule.                        |

## EvaluatedDecisionResult

A decision that was evaluated.

```csharp
public sealed class EvaluatedDecisionResult
```

| Property                        | Type                               | Description                                                                         |
| ------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------- |
| `DecisionDefinitionId`          | `DecisionDefinitionId`             | The ID of the decision which was evaluated.                                         |
| `DecisionDefinitionName`        | `String`                           | The name of the decision which was evaluated.                                       |
| `DecisionDefinitionVersion`     | `Int32`                            | The version of the decision which was evaluated.                                    |
| `DecisionDefinitionType`        | `String`                           | The type of the decision which was evaluated.                                       |
| `Output`                        | `String`                           | JSON document that will instantiate the result of the decision which was evaluated. |
| `TenantId`                      | `TenantId`                         | The tenant ID of the evaluated decision.                                            |
| `MatchedRules`                  | `List<MatchedDecisionRuleItem>`    | The decision rules that matched within this decision evaluation.                    |
| `EvaluatedInputs`               | `List<EvaluatedDecisionInputItem>` | The decision inputs that were evaluated within this decision evaluation.            |
| `DecisionDefinitionKey`         | `DecisionDefinitionKey`            | The unique key identifying the decision which was evaluate.                         |
| `DecisionEvaluationInstanceKey` | `DecisionEvaluationInstanceKey`    | The unique key identifying this decision evaluation instance.                       |

## EventualConsistencyTimeoutException

Thrown when an eventually consistent endpoint times out waiting for data.

```csharp
public sealed class EventualConsistencyTimeoutException : CamundaSdkException, ISerializable
```

| Property   | Type    | Description |
| ---------- | ------- | ----------- |
| `WaitedMs` | `Int32` |             |

## ExpressionEvaluationRequest

ExpressionEvaluationRequest

```csharp
public sealed class ExpressionEvaluationRequest : ITenantIdSettable
```

| Property     | Type     | Description                                                                                                                          |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `Expression` | `String` | The expression to evaluate (e.g., "=x + y")                                                                                          |
| `TenantId`   | `String` | Required when the expression references tenant-scoped cluster variables                                                              |
| `Variables`  | `Object` | Optional variables for expression evaluation. These variables are only used for the current evaluation and do not persist beyond it. |

## ExpressionEvaluationResult

ExpressionEvaluationResult

```csharp
public sealed class ExpressionEvaluationResult
```

| Property     | Type                                    | Description                                             |
| ------------ | --------------------------------------- | ------------------------------------------------------- |
| `Expression` | `String`                                | The evaluated expression                                |
| `Result`     | `Object`                                | The result value. Its type can vary.                    |
| `Warnings`   | `List<ExpressionEvaluationWarningItem>` | List of warnings generated during expression evaluation |

## ExpressionEvaluationWarningItem

ExpressionEvaluationWarningItem

```csharp
public sealed class ExpressionEvaluationWarningItem
```

| Property  | Type     | Description         |
| --------- | -------- | ------------------- |
| `Message` | `String` | The warning message |

## ExtendedDeploymentResponse

Extended deployment result with typed convenience properties for direct access
to deployed artifacts by category (processes, decisions, forms, etc.).

```csharp
public sealed class ExtendedDeploymentResponse
```

| Property               | Type                                         | Description                                   |
| ---------------------- | -------------------------------------------- | --------------------------------------------- |
| `Raw`                  | `DeploymentResult`                           | The underlying raw deployment response.       |
| `DeploymentKey`        | `DeploymentKey`                              | The unique key identifying the deployment.    |
| `TenantId`             | `TenantId`                                   | The tenant ID associated with the deployment. |
| `Deployments`          | `List<DeploymentMetadataResult>`             | All items deployed by the request.            |
| `Processes`            | `List<DeploymentProcessResult>`              | Deployed process definitions.                 |
| `Decisions`            | `List<DeploymentDecisionResult>`             | Deployed decision definitions.                |
| `DecisionRequirements` | `List<DeploymentDecisionRequirementsResult>` | Deployed decision requirements.               |
| `Forms`                | `List<DeploymentFormResult>`                 | Deployed forms.                               |
| `Resources`            | `List<DeploymentResourceResult>`             | Deployed resources.                           |

## FormId

The user-defined id for the form

```csharp
public readonly record struct FormId : ICamundaKey, IEquatable<FormId>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## FormKeyExactMatch

Matches the value exactly.

```csharp
public readonly record struct FormKeyExactMatch : ICamundaKey, IEquatable<FormKeyExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## FormKeyFilterProperty

FormKey property with full advanced search capabilities.

```csharp
public sealed class FormKeyFilterProperty
```

## FormResult

FormResult

```csharp
public sealed class FormResult
```

| Property   | Type       | Description                                                        |
| ---------- | ---------- | ------------------------------------------------------------------ |
| `TenantId` | `TenantId` | The tenant ID of the form.                                         |
| `FormId`   | `FormId`   | The user-provided identifier of the form.                          |
| `Schema`   | `String`   | The form schema as a JSON document serialized as a string.         |
| `Version`  | `Int64`    | The version of the the deployed form.                              |
| `FormKey`  | `FormKey`  | The assigned key, which acts as a unique identifier for this form. |

## GetUserResponse

GetUserResponse

```csharp
public sealed class GetUserResponse
```

| Property   | Type       | Description                |
| ---------- | ---------- | -------------------------- |
| `Username` | `Username` | The unique name of a user. |
| `Name`     | `String`   | The name of the user.      |
| `Email`    | `String`   | The email of the user.     |

## GlobalJobStatisticsQueryResult

Global job statistics query result.

```csharp
public sealed class GlobalJobStatisticsQueryResult
```

| Property       | Type           | Description                                                                                           |
| -------------- | -------------- | ----------------------------------------------------------------------------------------------------- |
| `Created`      | `StatusMetric` | Metric for a single job status.                                                                       |
| `Completed`    | `StatusMetric` | Metric for a single job status.                                                                       |
| `Failed`       | `StatusMetric` | Metric for a single job status.                                                                       |
| `IsIncomplete` | `Boolean`      | True if some data is missing because internal limits were reached and some metrics were not recorded. |

## GlobalListenerBase

GlobalListenerBase

```csharp
public sealed class GlobalListenerBase
```

| Property         | Type                | Description                                                                                                     |
| ---------------- | ------------------- | --------------------------------------------------------------------------------------------------------------- |
| `Type`           | `String`            | The name of the job type, used as a reference to specify which job workers request the respective listener job. |
| `Retries`        | `Nullable<Int32>`   | Number of retries for the listener job.                                                                         |
| `AfterNonGlobal` | `Nullable<Boolean>` | Whether the listener should run after model-level listeners.                                                    |
| `Priority`       | `Nullable<Int32>`   | The priority of the listener. Higher priority listeners are executed before lower priority ones.                |

## GlobalListenerId

The user-defined id for the global listener

```csharp
public readonly record struct GlobalListenerId : ICamundaKey, IEquatable<GlobalListenerId>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## GlobalListenerSourceExactMatch

Matches the value exactly.

```csharp
public readonly record struct GlobalListenerSourceExactMatch : ICamundaKey, IEquatable<GlobalListenerSourceExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## GlobalListenerSourceFilterProperty

Global listener source property with full advanced search capabilities.

```csharp
public sealed class GlobalListenerSourceFilterProperty
```

## GlobalTaskListenerBase

GlobalTaskListenerBase

```csharp
public sealed class GlobalTaskListenerBase
```

| Property         | Type                                    | Description                                                                                                     |
| ---------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `EventTypes`     | `List<GlobalTaskListenerEventTypeEnum>` | List of user task event types that trigger the listener.                                                        |
| `Type`           | `String`                                | The name of the job type, used as a reference to specify which job workers request the respective listener job. |
| `Retries`        | `Nullable<Int32>`                       | Number of retries for the listener job.                                                                         |
| `AfterNonGlobal` | `Nullable<Boolean>`                     | Whether the listener should run after model-level listeners.                                                    |
| `Priority`       | `Nullable<Int32>`                       | The priority of the listener. Higher priority listeners are executed before lower priority ones.                |

## GlobalTaskListenerEventTypeExactMatch

Matches the value exactly.

```csharp
public readonly record struct GlobalTaskListenerEventTypeExactMatch : ICamundaKey, IEquatable<GlobalTaskListenerEventTypeExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## GlobalTaskListenerEventTypeFilterProperty

Global listener event type property with full advanced search capabilities.

```csharp
public sealed class GlobalTaskListenerEventTypeFilterProperty
```

## GlobalTaskListenerResult

GlobalTaskListenerResult

```csharp
public sealed class GlobalTaskListenerResult
```

| Property         | Type                                    | Description                                                                                                     |
| ---------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `Id`             | `GlobalListenerId`                      | The user-defined id for the global listener                                                                     |
| `Source`         | `GlobalListenerSourceEnum`              | How the global listener was defined.                                                                            |
| `EventTypes`     | `List<GlobalTaskListenerEventTypeEnum>` | List of user task event types that trigger the listener.                                                        |
| `Type`           | `String`                                | The name of the job type, used as a reference to specify which job workers request the respective listener job. |
| `Retries`        | `Int32`                                 | Number of retries for the listener job.                                                                         |
| `AfterNonGlobal` | `Boolean`                               | Whether the listener should run after model-level listeners.                                                    |
| `Priority`       | `Int32`                                 | The priority of the listener. Higher priority listeners are executed before lower priority ones.                |

## GlobalTaskListenerSearchQueryFilterRequest

Global listener filter request.

```csharp
public sealed class GlobalTaskListenerSearchQueryFilterRequest
```

| Property         | Type                                              | Description                                            |
| ---------------- | ------------------------------------------------- | ------------------------------------------------------ |
| `Id`             | `StringFilterProperty`                            | Id of the global listener.                             |
| `Type`           | `StringFilterProperty`                            | Job type of the global listener.                       |
| `Retries`        | `IntegerFilterProperty`                           | Number of retries of the global listener.              |
| `EventTypes`     | `List<GlobalTaskListenerEventTypeFilterProperty>` | Event types of the global listener.                    |
| `AfterNonGlobal` | `Nullable<Boolean>`                               | Whether the listener runs after model-level listeners. |
| `Priority`       | `IntegerFilterProperty`                           | Priority of the global listener.                       |
| `Source`         | `GlobalListenerSourceFilterProperty`              | How the global listener was defined.                   |

## GlobalTaskListenerSearchQueryRequest

Global listener search query request.

```csharp
public sealed class GlobalTaskListenerSearchQueryRequest
```

| Property | Type                                             | Description                         |
| -------- | ------------------------------------------------ | ----------------------------------- |
| `Sort`   | `List<GlobalTaskListenerSearchQuerySortRequest>` | Sort field criteria.                |
| `Filter` | `GlobalTaskListenerSearchQueryFilterRequest`     | The global listener search filters. |
| `Page`   | `SearchQueryPageRequest`                         | Pagination criteria.                |

## GlobalTaskListenerSearchQueryResult

Global listener search query response.

```csharp
public sealed class GlobalTaskListenerSearchQueryResult
```

| Property | Type                             | Description                                      |
| -------- | -------------------------------- | ------------------------------------------------ |
| `Items`  | `List<GlobalTaskListenerResult>` | The matching global listeners.                   |
| `Page`   | `SearchQueryPageResponse`        | Pagination information about the search results. |

## GlobalTaskListenerSearchQuerySortRequest

GlobalTaskListenerSearchQuerySortRequest

```csharp
public sealed class GlobalTaskListenerSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## GroupClientResult

GroupClientResult

```csharp
public sealed class GroupClientResult
```

| Property   | Type     | Description           |
| ---------- | -------- | --------------------- |
| `ClientId` | `String` | The ID of the client. |

## GroupClientSearchQueryRequest

GroupClientSearchQueryRequest

```csharp
public sealed class GroupClientSearchQueryRequest
```

| Property | Type                                      | Description          |
| -------- | ----------------------------------------- | -------------------- |
| `Sort`   | `List<GroupClientSearchQuerySortRequest>` | Sort field criteria. |
| `Page`   | `SearchQueryPageRequest`                  | Pagination criteria. |

## GroupClientSearchQuerySortRequest

GroupClientSearchQuerySortRequest

```csharp
public sealed class GroupClientSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## GroupClientSearchResult

GroupClientSearchResult

```csharp
public sealed class GroupClientSearchResult
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<GroupClientResult>` | The matching client IDs.                         |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## GroupCreateRequest

GroupCreateRequest

```csharp
public sealed class GroupCreateRequest
```

| Property      | Type     | Description                        |
| ------------- | -------- | ---------------------------------- |
| `GroupId`     | `String` | The ID of the new group.           |
| `Name`        | `String` | The display name of the new group. |
| `Description` | `String` | The description of the new group.  |

## GroupCreateResult

GroupCreateResult

```csharp
public sealed class GroupCreateResult
```

| Property      | Type     | Description                            |
| ------------- | -------- | -------------------------------------- |
| `GroupId`     | `String` | The ID of the created group.           |
| `Name`        | `String` | The display name of the created group. |
| `Description` | `String` | The description of the created group.  |

## GroupFilter

Group filter request

```csharp
public sealed class GroupFilter
```

| Property  | Type                   | Description                    |
| --------- | ---------------------- | ------------------------------ |
| `GroupId` | `StringFilterProperty` | The group ID search filters.   |
| `Name`    | `String`               | The group name search filters. |

## GroupMappingRuleSearchResult

GroupMappingRuleSearchResult

```csharp
public sealed class GroupMappingRuleSearchResult
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<MappingRuleResult>` | The matching mapping rules.                      |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## GroupResult

Group search response item.

```csharp
public sealed class GroupResult
```

| Property      | Type     | Description            |
| ------------- | -------- | ---------------------- |
| `Name`        | `String` | The group name.        |
| `GroupId`     | `String` | The group ID.          |
| `Description` | `String` | The group description. |

## GroupRoleSearchResult

GroupRoleSearchResult

```csharp
public sealed class GroupRoleSearchResult
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<RoleResult>`        | The matching roles.                              |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## GroupSearchQueryRequest

Group search request.

```csharp
public sealed class GroupSearchQueryRequest
```

| Property | Type                                | Description               |
| -------- | ----------------------------------- | ------------------------- |
| `Sort`   | `List<GroupSearchQuerySortRequest>` | Sort field criteria.      |
| `Filter` | `GroupFilter`                       | The group search filters. |
| `Page`   | `SearchQueryPageRequest`            | Pagination criteria.      |

## GroupSearchQueryResult

Group search response.

```csharp
public sealed class GroupSearchQueryResult
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<GroupResult>`       | The matching groups.                             |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## GroupSearchQuerySortRequest

GroupSearchQuerySortRequest

```csharp
public sealed class GroupSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## GroupUpdateRequest

GroupUpdateRequest

```csharp
public sealed class GroupUpdateRequest
```

| Property      | Type     | Description                       |
| ------------- | -------- | --------------------------------- |
| `Name`        | `String` | The new name of the group.        |
| `Description` | `String` | The new description of the group. |

## GroupUpdateResult

GroupUpdateResult

```csharp
public sealed class GroupUpdateResult
```

| Property      | Type     | Description                   |
| ------------- | -------- | ----------------------------- |
| `GroupId`     | `String` | The unique external group ID. |
| `Name`        | `String` | The name of the group.        |
| `Description` | `String` | The description of the group. |

## GroupUserResult

GroupUserResult

```csharp
public sealed class GroupUserResult
```

| Property   | Type       | Description                |
| ---------- | ---------- | -------------------------- |
| `Username` | `Username` | The unique name of a user. |

## GroupUserSearchQueryRequest

GroupUserSearchQueryRequest

```csharp
public sealed class GroupUserSearchQueryRequest
```

| Property | Type                                    | Description          |
| -------- | --------------------------------------- | -------------------- |
| `Sort`   | `List<GroupUserSearchQuerySortRequest>` | Sort field criteria. |
| `Page`   | `SearchQueryPageRequest`                | Pagination criteria. |

## GroupUserSearchQuerySortRequest

GroupUserSearchQuerySortRequest

```csharp
public sealed class GroupUserSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## GroupUserSearchResult

GroupUserSearchResult

```csharp
public sealed class GroupUserSearchResult
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<GroupUserResult>`   | The matching members.                            |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## HttpSdkException

HTTP-specific SDK error with RFC 7807 Problem Details.

```csharp
public sealed class HttpSdkException : CamundaSdkException, ISerializable
```

| Property         | Type      | Description |
| ---------------- | --------- | ----------- |
| `Type`           | `String`  |             |
| `Title`          | `String`  |             |
| `Detail`         | `String`  |             |
| `Instance`       | `String`  |             |
| `IsBackpressure` | `Boolean` |             |

## ICamundaKey

Marker interface for all Camunda domain key types.
Enables generic constraints and JSON converter discovery.

```csharp
public interface ICamundaKey
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## ICamundaLongKey

Marker interface for Camunda domain types backed by a long (int64) value.

```csharp
public interface ICamundaLongKey
```

| Property | Type    | Description                |
| -------- | ------- | -------------------------- |
| `Value`  | `Int64` | The underlying long value. |

## ITenantIdSettable

Implemented by request body types that have an optional tenantId property.
The SDK uses this to inject the configured default tenant ID when the caller
does not supply one explicitly.

```csharp
public interface ITenantIdSettable
```

## IncidentErrorTypeExactMatch

Matches the value exactly.

```csharp
public readonly record struct IncidentErrorTypeExactMatch : ICamundaKey, IEquatable<IncidentErrorTypeExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## IncidentErrorTypeFilterProperty

IncidentErrorTypeEnum with full advanced search capabilities.

```csharp
public sealed class IncidentErrorTypeFilterProperty
```

## IncidentFilter

Incident search filter.

```csharp
public sealed class IncidentFilter
```

| Property               | Type                                 | Description                                                            |
| ---------------------- | ------------------------------------ | ---------------------------------------------------------------------- |
| `ProcessDefinitionId`  | `StringFilterProperty`               | The process definition ID associated to this incident.                 |
| `ErrorType`            | `IncidentErrorTypeFilterProperty`    | Incident error type with a defined set of values.                      |
| `ErrorMessage`         | `StringFilterProperty`               | The error message of this incident.                                    |
| `ElementId`            | `StringFilterProperty`               | The element ID associated to this incident.                            |
| `CreationTime`         | `DateTimeFilterProperty`             | Date of incident creation.                                             |
| `State`                | `IncidentStateFilterProperty`        | State of this incident with a defined set of values.                   |
| `TenantId`             | `StringFilterProperty`               | The tenant ID of the incident.                                         |
| `IncidentKey`          | `BasicStringFilterProperty`          | The assigned key, which acts as a unique identifier for this incident. |
| `ProcessDefinitionKey` | `ProcessDefinitionKeyFilterProperty` | The process definition key associated to this incident.                |
| `ProcessInstanceKey`   | `ProcessInstanceKeyFilterProperty`   | The process instance key associated to this incident.                  |
| `ElementInstanceKey`   | `ElementInstanceKeyFilterProperty`   | The element instance key associated to this incident.                  |
| `JobKey`               | `JobKeyFilterProperty`               | The job key, if exists, associated with this incident.                 |

## IncidentProcessInstanceStatisticsByDefinitionFilter

Filter for the incident process instance statistics by definition query.

```csharp
public sealed class IncidentProcessInstanceStatisticsByDefinitionFilter
```

| Property        | Type    | Description                                                                        |
| --------------- | ------- | ---------------------------------------------------------------------------------- |
| `ErrorHashCode` | `Int32` | The error hash code of the incidents to filter the process instance statistics by. |

## IncidentProcessInstanceStatisticsByDefinitionQuery

IncidentProcessInstanceStatisticsByDefinitionQuery

```csharp
public sealed class IncidentProcessInstanceStatisticsByDefinitionQuery
```

| Property | Type                                                                  | Description                                                                     |
| -------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `Filter` | `IncidentProcessInstanceStatisticsByDefinitionFilter`                 | Filter criteria for the aggregated process instance statistics.                 |
| `Page`   | `OffsetPagination`                                                    | Pagination parameters for the aggregated process instance statistics.           |
| `Sort`   | `List<IncidentProcessInstanceStatisticsByDefinitionQuerySortRequest>` | Sorting criteria for process instance statistics grouped by process definition. |

## IncidentProcessInstanceStatisticsByDefinitionQueryResult

IncidentProcessInstanceStatisticsByDefinitionQueryResult

```csharp
public sealed class IncidentProcessInstanceStatisticsByDefinitionQueryResult
```

| Property | Type                                                        | Description                                                                                                             |
| -------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `Items`  | `List<IncidentProcessInstanceStatisticsByDefinitionResult>` | Statistics of active process instances with incidents, grouped by process definition for the specified error hash code. |
| `Page`   | `SearchQueryPageResponse`                                   | Pagination information about the search results.                                                                        |

## IncidentProcessInstanceStatisticsByDefinitionQuerySortRequest

IncidentProcessInstanceStatisticsByDefinitionQuerySortRequest

```csharp
public sealed class IncidentProcessInstanceStatisticsByDefinitionQuerySortRequest
```

| Property | Type                      | Description                                                               |
| -------- | ------------------------- | ------------------------------------------------------------------------- |
| `Field`  | `String`                  | The aggregated field by which the process instance statistics are sorted. |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field.                             |

## IncidentProcessInstanceStatisticsByDefinitionResult

IncidentProcessInstanceStatisticsByDefinitionResult

```csharp
public sealed class IncidentProcessInstanceStatisticsByDefinitionResult
```

| Property                        | Type                   | Description                                                                                                |
| ------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| `ProcessDefinitionId`           | `ProcessDefinitionId`  | Id of a process definition, from the model. Only ids of process definitions that are deployed are useful.  |
| `ProcessDefinitionKey`          | `ProcessDefinitionKey` | System-generated key for a deployed process definition.                                                    |
| `ProcessDefinitionName`         | `String`               | The name of the process definition.                                                                        |
| `ProcessDefinitionVersion`      | `Int32`                | The version of the process definition.                                                                     |
| `TenantId`                      | `TenantId`             | The unique identifier of the tenant.                                                                       |
| `ActiveInstancesWithErrorCount` | `Int64`                | The number of active process instances that currently have an incident with the specified error hash code. |

## IncidentProcessInstanceStatisticsByErrorQuery

IncidentProcessInstanceStatisticsByErrorQuery

```csharp
public sealed class IncidentProcessInstanceStatisticsByErrorQuery
```

| Property | Type                                                             | Description                                                                      |
| -------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `Page`   | `OffsetPagination`                                               | Pagination parameters for process instance statistics grouped by incident error. |
| `Sort`   | `List<IncidentProcessInstanceStatisticsByErrorQuerySortRequest>` | Sorting criteria for process instance statistics grouped by incident error.      |

## IncidentProcessInstanceStatisticsByErrorQueryResult

IncidentProcessInstanceStatisticsByErrorQueryResult

```csharp
public sealed class IncidentProcessInstanceStatisticsByErrorQueryResult
```

| Property | Type                                                   | Description                                                       |
| -------- | ------------------------------------------------------ | ----------------------------------------------------------------- |
| `Items`  | `List<IncidentProcessInstanceStatisticsByErrorResult>` | Statistics of active process instances grouped by incident error. |
| `Page`   | `SearchQueryPageResponse`                              | Pagination information about the search results.                  |

## IncidentProcessInstanceStatisticsByErrorQuerySortRequest

IncidentProcessInstanceStatisticsByErrorQuerySortRequest

```csharp
public sealed class IncidentProcessInstanceStatisticsByErrorQuerySortRequest
```

| Property | Type                      | Description                                         |
| -------- | ------------------------- | --------------------------------------------------- |
| `Field`  | `String`                  | The field to sort the incident error statistics by. |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field.       |

## IncidentProcessInstanceStatisticsByErrorResult

IncidentProcessInstanceStatisticsByErrorResult

```csharp
public sealed class IncidentProcessInstanceStatisticsByErrorResult
```

| Property                        | Type     | Description                                                                                    |
| ------------------------------- | -------- | ---------------------------------------------------------------------------------------------- |
| `ErrorHashCode`                 | `Int32`  | The hash code identifying a specific incident error..                                          |
| `ErrorMessage`                  | `String` | The error message associated with the incident error hash code.                                |
| `ActiveInstancesWithErrorCount` | `Int64`  | The number of active process instances that currently have an active incident with this error. |

## IncidentResolutionRequest

IncidentResolutionRequest

```csharp
public sealed class IncidentResolutionRequest
```

| Property             | Type                           | Description                                                                                                                    |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `OperationReference` | `Nullable<OperationReference>` | A reference key chosen by the user that will be part of all records resulting from this operation. Must be &gt; 0 if provided. |

## IncidentResult

IncidentResult

```csharp
public sealed class IncidentResult
```

| Property                 | Type                           | Description                                                                                                                                                                                                                                 |
| ------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ProcessDefinitionId`    | `ProcessDefinitionId`          | The process definition ID associated to this incident.                                                                                                                                                                                      |
| `ErrorType`              | `IncidentErrorTypeEnum`        | The type of the incident error.                                                                                                                                                                                                             |
| `ErrorMessage`           | `String`                       | Error message which describes the error in more detail.                                                                                                                                                                                     |
| `ElementId`              | `ElementId`                    | The element ID associated to this incident.                                                                                                                                                                                                 |
| `CreationTime`           | `DateTimeOffset`               | The creation time of the incident.                                                                                                                                                                                                          |
| `State`                  | `IncidentStateEnum`            | The incident state.                                                                                                                                                                                                                         |
| `TenantId`               | `TenantId`                     | The tenant ID of the incident.                                                                                                                                                                                                              |
| `IncidentKey`            | `IncidentKey`                  | The assigned key, which acts as a unique identifier for this incident.                                                                                                                                                                      |
| `ProcessDefinitionKey`   | `ProcessDefinitionKey`         | The process definition key associated to this incident.                                                                                                                                                                                     |
| `ProcessInstanceKey`     | `ProcessInstanceKey`           | The process instance key associated to this incident.                                                                                                                                                                                       |
| `RootProcessInstanceKey` | `Nullable<ProcessInstanceKey>` | The key of the root process instance. The root process instance is the top-level ancestor in the process instance hierarchy. This field is only present for data belonging to process instance hierarchies created in version 8.9 or later. |
| `ElementInstanceKey`     | `ElementInstanceKey`           | The element instance key associated to this incident.                                                                                                                                                                                       |
| `JobKey`                 | `Nullable<JobKey>`             | The job key, if exists, associated with this incident.                                                                                                                                                                                      |

## IncidentSearchQuery

IncidentSearchQuery

```csharp
public sealed class IncidentSearchQuery
```

| Property | Type                                   | Description                  |
| -------- | -------------------------------------- | ---------------------------- |
| `Sort`   | `List<IncidentSearchQuerySortRequest>` | Sort field criteria.         |
| `Filter` | `IncidentFilter`                       | The incident search filters. |
| `Page`   | `SearchQueryPageRequest`               | Pagination criteria.         |

## IncidentSearchQueryResult

IncidentSearchQueryResult

```csharp
public sealed class IncidentSearchQueryResult
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<IncidentResult>`    | The matching incidents.                          |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## IncidentSearchQuerySortRequest

IncidentSearchQuerySortRequest

```csharp
public sealed class IncidentSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## IncidentStateExactMatch

Matches the value exactly.

```csharp
public readonly record struct IncidentStateExactMatch : ICamundaKey, IEquatable<IncidentStateExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## IncidentStateFilterProperty

IncidentStateEnum with full advanced search capabilities.

```csharp
public sealed class IncidentStateFilterProperty
```

## InferredAncestorKeyInstruction

Instructs the engine to derive the ancestor scope key from the source element's hierarchy. The engine traverses the source element's ancestry to find an instance that matches one of the target element's flow scopes, ensuring the target is activated in the correct scope.

```csharp
public sealed class InferredAncestorKeyInstruction : AncestorScopeInstruction
```

| Property            | Type     | Description                             |
| ------------------- | -------- | --------------------------------------- |
| `AncestorScopeType` | `String` | The type of ancestor scope instruction. |

## IntegerFilterProperty

Integer property with advanced search capabilities.

```csharp
public sealed class IntegerFilterProperty
```

## JobActivationRequest

JobActivationRequest

```csharp
public sealed class JobActivationRequest
```

| Property            | Type                         | Description                                                                                                                                                                                                                                                                                 |
| ------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Type`              | `String`                     | The job type, as defined in the BPMN process (e.g. &lt;zeebe:taskDefinition type="payment-service" /&gt;)                                                                                                                                                                                   |
| `Worker`            | `String`                     | The name of the worker activating the jobs, mostly used for logging purposes.                                                                                                                                                                                                               |
| `Timeout`           | `Int64`                      | A job returned after this call will not be activated by another call until the timeout (in ms) has been reached.                                                                                                                                                                            |
| `MaxJobsToActivate` | `Int32`                      | The maximum jobs to activate by this request.                                                                                                                                                                                                                                               |
| `FetchVariable`     | `List<String>`               | A list of variables to fetch as the job variables; if empty, all visible variables at the time of activation for the scope of the job will be returned.                                                                                                                                     |
| `RequestTimeout`    | `Nullable<Int64>`            | The request will be completed when at least one job is activated or after the requestTimeout (in ms). If the requestTimeout = 0, a default timeout is used. If the requestTimeout &lt; 0, long polling is disabled and the request is completed immediately, even when no job is activated. |
| `TenantIds`         | `List<TenantId>`             | A list of IDs of tenants for which to activate jobs.                                                                                                                                                                                                                                        |
| `TenantFilter`      | `Nullable<TenantFilterEnum>` | The tenant filtering strategy - determines whether to use provided tenant IDs or assigned tenant IDs from the authenticated principal's authorized tenants.                                                                                                                                 |

## JobActivationResult

The list of activated jobs

```csharp
public sealed class JobActivationResult
```

| Property | Type                       | Description         |
| -------- | -------------------------- | ------------------- |
| `Jobs`   | `List<ActivatedJobResult>` | The activated jobs. |

## JobChangeset

JSON object with changed job attribute values. The job cannot be completed or failed with this endpoint, use the complete job or fail job endpoints instead.

```csharp
public sealed class JobChangeset
```

| Property  | Type              | Description                                  |
| --------- | ----------------- | -------------------------------------------- |
| `Retries` | `Nullable<Int32>` | The new number of retries for the job.       |
| `Timeout` | `Nullable<Int64>` | The new timeout for the job in milliseconds. |

## JobCompletionRequest

JobCompletionRequest

```csharp
public sealed class JobCompletionRequest
```

| Property    | Type        | Description                                                  |
| ----------- | ----------- | ------------------------------------------------------------ |
| `Variables` | `Object`    | The variables to complete the job with.                      |
| `Result`    | `JobResult` | The result of the completed job as determined by the worker. |

## JobErrorRequest

JobErrorRequest

```csharp
public sealed class JobErrorRequest
```

| Property       | Type     | Description                                                                                                                |
| -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| `ErrorCode`    | `String` | The error code that will be matched with an error catch event.                                                             |
| `ErrorMessage` | `String` | An error message that provides additional context.                                                                         |
| `Variables`    | `Object` | JSON object that will instantiate the variables at the local scope of the error catch event that catches the thrown error. |

## JobErrorStatisticsFilter

Job error statistics search filter.

```csharp
public sealed class JobErrorStatisticsFilter
```

| Property       | Type                   | Description                                                            |
| -------------- | ---------------------- | ---------------------------------------------------------------------- |
| `From`         | `DateTimeOffset`       | Start of the time window to filter metrics. ISO 8601 date-time format. |
| `To`           | `DateTimeOffset`       | End of the time window to filter metrics. ISO 8601 date-time format.   |
| `JobType`      | `String`               | Job type to return error metrics for.                                  |
| `ErrorCode`    | `StringFilterProperty` | Optional error code filter with advanced search capabilities.          |
| `ErrorMessage` | `StringFilterProperty` | Optional error message filter with advanced search capabilities.       |

## JobErrorStatisticsItem

Aggregated error metrics for a single error type and message combination.

```csharp
public sealed class JobErrorStatisticsItem
```

| Property       | Type     | Description                                             |
| -------------- | -------- | ------------------------------------------------------- |
| `ErrorCode`    | `String` | The error code identifier.                              |
| `ErrorMessage` | `String` | The error message.                                      |
| `Workers`      | `Int32`  | Number of distinct workers that encountered this error. |

## JobErrorStatisticsQuery

Job error statistics query.

```csharp
public sealed class JobErrorStatisticsQuery
```

| Property | Type                       | Description                         |
| -------- | -------------------------- | ----------------------------------- |
| `Filter` | `JobErrorStatisticsFilter` | Job error statistics search filter. |
| `Page`   | `CursorForwardPagination`  | Search cursor pagination.           |

## JobErrorStatisticsQueryResult

Job error statistics query result.

```csharp
public sealed class JobErrorStatisticsQueryResult
```

| Property | Type                           | Description                                      |
| -------- | ------------------------------ | ------------------------------------------------ |
| `Items`  | `List<JobErrorStatisticsItem>` | The list of per-error statistics items.          |
| `Page`   | `SearchQueryPageResponse`      | Pagination information about the search results. |

## JobFailRequest

JobFailRequest

```csharp
public sealed class JobFailRequest
```

| Property       | Type              | Description                                                                                                                                                                                 |
| -------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Retries`      | `Nullable<Int32>` | The amount of retries the job should have left                                                                                                                                              |
| `ErrorMessage` | `String`          | An optional error message describing why the job failed; if not provided, an empty string is used.                                                                                          |
| `RetryBackOff` | `Nullable<Int64>` | An optional retry back off for the failed job. The job will not be retryable before the current time plus the back off time. The default is 0 which means the job is retryable immediately. |
| `Variables`    | `Object`          | JSON object that will instantiate the variables at the local scope of the job's associated task.                                                                                            |

## JobFailureException

Throw from a job handler to explicitly fail a job with custom retry settings.

```csharp
public sealed class JobFailureException : Exception, ISerializable
```

| Property         | Type              | Description                                                            |
| ---------------- | ----------------- | ---------------------------------------------------------------------- |
| `Retries`        | `Nullable<Int32>` | How many retries the job should have remaining. null = server decides. |
| `RetryBackOffMs` | `Nullable<Int64>` | Retry back-off in milliseconds. null = immediate retry.                |

## JobFilter

Job search filter.

```csharp
public sealed class JobFilter
```

| Property                   | Type                                 | Description                                                                 |
| -------------------------- | ------------------------------------ | --------------------------------------------------------------------------- |
| `Deadline`                 | `DateTimeFilterProperty`             | When the job can next be activated.                                         |
| `DeniedReason`             | `StringFilterProperty`               | The reason provided by the user task listener for denying the work.         |
| `ElementId`                | `StringFilterProperty`               | The element ID associated with the job.                                     |
| `ElementInstanceKey`       | `ElementInstanceKeyFilterProperty`   | The element instance key associated with the job.                           |
| `EndTime`                  | `DateTimeFilterProperty`             | When the job ended.                                                         |
| `ErrorCode`                | `StringFilterProperty`               | The error code provided for the failed job.                                 |
| `ErrorMessage`             | `StringFilterProperty`               | The error message that provides additional context for a failed job.        |
| `HasFailedWithRetriesLeft` | `Nullable<Boolean>`                  | Indicates whether the job has failed with retries left.                     |
| `IsDenied`                 | `Nullable<Boolean>`                  | Indicates whether the user task listener denies the work.                   |
| `JobKey`                   | `JobKeyFilterProperty`               | The key, a unique identifier for the job.                                   |
| `Kind`                     | `JobKindFilterProperty`              | The kind of the job.                                                        |
| `ListenerEventType`        | `JobListenerEventTypeFilterProperty` | The listener event type of the job.                                         |
| `ProcessDefinitionId`      | `StringFilterProperty`               | The process definition ID associated with the job.                          |
| `ProcessDefinitionKey`     | `ProcessDefinitionKeyFilterProperty` | The process definition key associated with the job.                         |
| `ProcessInstanceKey`       | `ProcessInstanceKeyFilterProperty`   | The process instance key associated with the job.                           |
| `Retries`                  | `IntegerFilterProperty`              | The number of retries left.                                                 |
| `State`                    | `JobStateFilterProperty`             | The state of the job.                                                       |
| `TenantId`                 | `StringFilterProperty`               | The tenant ID.                                                              |
| `Type`                     | `StringFilterProperty`               | The type of the job.                                                        |
| `Worker`                   | `StringFilterProperty`               | The name of the worker for this job.                                        |
| `CreationTime`             | `DateTimeFilterProperty`             | When the job was created. Field is present for jobs created after 8.9.      |
| `LastUpdateTime`           | `DateTimeFilterProperty`             | When the job was last updated. Field is present for jobs created after 8.9. |

## JobHandler

Delegate for job handler functions. Return the output variables to complete the
job with, or null to complete with no output variables.

To signal a BPMN error, throw .
To explicitly fail a job with custom retries, throw .
Any other unhandled exception auto-fails the job with retries - 1.

```csharp
public delegate Task<object?> JobHandler(ActivatedJob job, CancellationToken ct)
```

## JobKeyExactMatch

Matches the value exactly.

```csharp
public readonly record struct JobKeyExactMatch : ICamundaKey, IEquatable<JobKeyExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## JobKeyFilterProperty

JobKey property with full advanced search capabilities.

```csharp
public sealed class JobKeyFilterProperty
```

## JobKindExactMatch

Matches the value exactly.

```csharp
public readonly record struct JobKindExactMatch : ICamundaKey, IEquatable<JobKindExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## JobKindFilterProperty

JobKindEnum property with full advanced search capabilities.

```csharp
public sealed class JobKindFilterProperty
```

## JobListenerEventTypeExactMatch

Matches the value exactly.

```csharp
public readonly record struct JobListenerEventTypeExactMatch : ICamundaKey, IEquatable<JobListenerEventTypeExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## JobListenerEventTypeFilterProperty

JobListenerEventTypeEnum property with full advanced search capabilities.

```csharp
public sealed class JobListenerEventTypeFilterProperty
```

## JobMetricsConfigurationResponse

Configuration for job metrics collection and export.

```csharp
public sealed class JobMetricsConfigurationResponse
```

| Property              | Type      | Description                                                              |
| --------------------- | --------- | ------------------------------------------------------------------------ |
| `Enabled`             | `Boolean` | Whether job metrics export is enabled.                                   |
| `ExportInterval`      | `String`  | The interval at which job metrics are exported, as an ISO 8601 duration. |
| `MaxWorkerNameLength` | `Int32`   | The maximum length of the worker name used in job metrics labels.        |
| `MaxJobTypeLength`    | `Int32`   | The maximum length of the job type used in job metrics labels.           |
| `MaxTenantIdLength`   | `Int32`   | The maximum length of the tenant ID used in job metrics labels.          |
| `MaxUniqueKeys`       | `Int32`   | The maximum number of unique metric keys tracked for job metrics.        |

## JobResult

The result of the completed job as determined by the worker.

```csharp
public abstract class JobResult
```

## JobResultActivateElement

Instruction to activate a single BPMN element within an ad‑hoc sub‑process, optionally providing variables scoped to that element.

```csharp
public sealed class JobResultActivateElement
```

| Property    | Type                  | Description                 |
| ----------- | --------------------- | --------------------------- |
| `ElementId` | `Nullable<ElementId>` | The element ID to activate. |
| `Variables` | `Object`              | Variables for the element.  |

## JobResultAdHocSubProcess

Job result details for an ad‑hoc sub‑process, including elements to activate and flags indicating completion or cancellation behavior.

```csharp
public sealed class JobResultAdHocSubProcess : JobResult
```

| Property                         | Type                             | Description                                                                            |
| -------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------- |
| `ActivateElements`               | `List<JobResultActivateElement>` | Indicates which elements need to be activated in the ad-hoc subprocess.                |
| `IsCompletionConditionFulfilled` | `Nullable<Boolean>`              | Indicates whether the completion condition of the ad-hoc subprocess is fulfilled.      |
| `IsCancelRemainingInstances`     | `Nullable<Boolean>`              | Indicates whether the remaining instances of the ad-hoc subprocess should be canceled. |
| `Type`                           | `String`                         | Used to distinguish between different types of job results.                            |

## JobResultCorrections

JSON object with attributes that were corrected by the worker.

The following attributes can be corrected, additional attributes will be ignored:

- `assignee` - clear by providing an empty String
- `dueDate` - clear by providing an empty String
- `followUpDate` - clear by providing an empty String
- `candidateGroups` - clear by providing an empty list
- `candidateUsers` - clear by providing an empty list
- `priority` - minimum 0, maximum 100, default 50

Providing any of those attributes with a `null` value or omitting it preserves
the persisted attribute's value.

```csharp
public sealed class JobResultCorrections
```

| Property          | Type                       | Description                               |
| ----------------- | -------------------------- | ----------------------------------------- |
| `Assignee`        | `String`                   | Assignee of the task.                     |
| `DueDate`         | `Nullable<DateTimeOffset>` | The due date of the task.                 |
| `FollowUpDate`    | `Nullable<DateTimeOffset>` | The follow-up date of the task.           |
| `CandidateUsers`  | `List<String>`             | The list of candidate users of the task.  |
| `CandidateGroups` | `List<String>`             | The list of candidate groups of the task. |
| `Priority`        | `Nullable<Int32>`          | The priority of the task.                 |

## JobResultUserTask

Job result details for a user task completion, optionally including a denial reason and corrected task properties.

```csharp
public sealed class JobResultUserTask : JobResult
```

| Property       | Type                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Denied`       | `Nullable<Boolean>`    | Indicates whether the worker denies the work, i.e. explicitly doesn't approve it. For example, a user task listener can deny the completion of a task by setting this flag to true. In this example, the completion of a task is represented by a job that the worker can complete as denied. As a result, the completion request is rejected and the task remains active. Defaults to false.                                                                                                                                                                                            |
| `DeniedReason` | `String`               | The reason provided by the user task listener for denying the work.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `Corrections`  | `JobResultCorrections` | JSON object with attributes that were corrected by the worker. The following attributes can be corrected, additional attributes will be ignored: _ `assignee` - clear by providing an empty String _ `dueDate` - clear by providing an empty String _ `followUpDate` - clear by providing an empty String _ `candidateGroups` - clear by providing an empty list _ `candidateUsers` - clear by providing an empty list _ `priority` - minimum 0, maximum 100, default 50 Providing any of those attributes with a `null` value or omitting it preserves the persisted attribute's value. |
| `Type`         | `String`               | Used to distinguish between different types of job results.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

## JobSearchQuery

Job search request.

```csharp
public sealed class JobSearchQuery
```

| Property | Type                              | Description             |
| -------- | --------------------------------- | ----------------------- |
| `Sort`   | `List<JobSearchQuerySortRequest>` | Sort field criteria.    |
| `Filter` | `JobFilter`                       | The job search filters. |
| `Page`   | `SearchQueryPageRequest`          | Pagination criteria.    |

## JobSearchQueryResult

Job search response.

```csharp
public sealed class JobSearchQueryResult
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<JobSearchResult>`   | The matching jobs.                               |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## JobSearchQuerySortRequest

JobSearchQuerySortRequest

```csharp
public sealed class JobSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## JobSearchResult

JobSearchResult

```csharp
public sealed class JobSearchResult
```

| Property                   | Type                           | Description                                                                                                                                                                                                                                 |
| -------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CustomHeaders`            | `Dictionary<String>`           | A set of custom headers defined during modelling.                                                                                                                                                                                           |
| `Deadline`                 | `Nullable<DateTimeOffset>`     | If the job has been activated, when it will next be available to be activated.                                                                                                                                                              |
| `DeniedReason`             | `String`                       | The reason provided by the user task listener for denying the work.                                                                                                                                                                         |
| `ElementId`                | `Nullable<ElementId>`          | The element ID associated with the job. May be missing on job failure.                                                                                                                                                                      |
| `ElementInstanceKey`       | `ElementInstanceKey`           | The element instance key associated with the job.                                                                                                                                                                                           |
| `EndTime`                  | `Nullable<DateTimeOffset>`     | End date of the job. This is `null` if the job is not in an end state yet.                                                                                                                                                                  |
| `ErrorCode`                | `String`                       | The error code provided for a failed job.                                                                                                                                                                                                   |
| `ErrorMessage`             | `String`                       | The error message that provides additional context for a failed job.                                                                                                                                                                        |
| `HasFailedWithRetriesLeft` | `Boolean`                      | Indicates whether the job has failed with retries left.                                                                                                                                                                                     |
| `IsDenied`                 | `Nullable<Boolean>`            | Indicates whether the user task listener denies the work.                                                                                                                                                                                   |
| `JobKey`                   | `JobKey`                       | The key, a unique identifier for the job.                                                                                                                                                                                                   |
| `Kind`                     | `JobKindEnum`                  | The job kind.                                                                                                                                                                                                                               |
| `ListenerEventType`        | `JobListenerEventTypeEnum`     | The listener event type of the job.                                                                                                                                                                                                         |
| `ProcessDefinitionId`      | `ProcessDefinitionId`          | The process definition ID associated with the job.                                                                                                                                                                                          |
| `ProcessDefinitionKey`     | `ProcessDefinitionKey`         | The process definition key associated with the job.                                                                                                                                                                                         |
| `ProcessInstanceKey`       | `ProcessInstanceKey`           | The process instance key associated with the job.                                                                                                                                                                                           |
| `RootProcessInstanceKey`   | `Nullable<ProcessInstanceKey>` | The key of the root process instance. The root process instance is the top-level ancestor in the process instance hierarchy. This field is only present for data belonging to process instance hierarchies created in version 8.9 or later. |
| `Retries`                  | `Int32`                        | The amount of retries left to this job.                                                                                                                                                                                                     |
| `State`                    | `JobStateEnum`                 | The state of the job.                                                                                                                                                                                                                       |
| `TenantId`                 | `TenantId`                     | The unique identifier of the tenant.                                                                                                                                                                                                        |
| `Type`                     | `String`                       | The type of the job.                                                                                                                                                                                                                        |
| `Worker`                   | `String`                       | The name of the worker of this job.                                                                                                                                                                                                         |
| `CreationTime`             | `Nullable<DateTimeOffset>`     | When the job was created. Field is present for jobs created after 8.9.                                                                                                                                                                      |
| `LastUpdateTime`           | `Nullable<DateTimeOffset>`     | When the job was last updated. Field is present for jobs created after 8.9.                                                                                                                                                                 |

## JobStateExactMatch

Matches the value exactly.

```csharp
public readonly record struct JobStateExactMatch : ICamundaKey, IEquatable<JobStateExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## JobStateFilterProperty

JobStateEnum property with full advanced search capabilities.

```csharp
public sealed class JobStateFilterProperty
```

## JobTimeSeriesStatisticsFilter

Job time-series statistics search filter.

```csharp
public sealed class JobTimeSeriesStatisticsFilter
```

| Property     | Type             | Description                                                                                                                                             |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `From`       | `DateTimeOffset` | Start of the time window to filter metrics. ISO 8601 date-time format.                                                                                  |
| `To`         | `DateTimeOffset` | End of the time window to filter metrics. ISO 8601 date-time format.                                                                                    |
| `JobType`    | `String`         | Job type to return time-series metrics for.                                                                                                             |
| `Resolution` | `String`         | Time bucket resolution as an ISO 8601 duration (for example `PT1M` for 1 minute, `PT1H` for 1 hour). If omitted, the server chooses a sensible default. |

## JobTimeSeriesStatisticsItem

Aggregated job metrics for a single time bucket.

```csharp
public sealed class JobTimeSeriesStatisticsItem
```

| Property    | Type             | Description                                                    |
| ----------- | ---------------- | -------------------------------------------------------------- |
| `Time`      | `DateTimeOffset` | ISO 8601 timestamp representing the start of this time bucket. |
| `Created`   | `StatusMetric`   | Metric for a single job status.                                |
| `Completed` | `StatusMetric`   | Metric for a single job status.                                |
| `Failed`    | `StatusMetric`   | Metric for a single job status.                                |

## JobTimeSeriesStatisticsQuery

Job time-series statistics query.

```csharp
public sealed class JobTimeSeriesStatisticsQuery
```

| Property | Type                            | Description                               |
| -------- | ------------------------------- | ----------------------------------------- |
| `Filter` | `JobTimeSeriesStatisticsFilter` | Job time-series statistics search filter. |
| `Page`   | `CursorForwardPagination`       | Search cursor pagination.                 |

## JobTimeSeriesStatisticsQueryResult

Job time-series statistics query result.

```csharp
public sealed class JobTimeSeriesStatisticsQueryResult
```

| Property | Type                                | Description                                                            |
| -------- | ----------------------------------- | ---------------------------------------------------------------------- |
| `Items`  | `List<JobTimeSeriesStatisticsItem>` | The list of time-bucketed statistics items, ordered ascending by time. |
| `Page`   | `SearchQueryPageResponse`           | Pagination information about the search results.                       |

## JobTypeStatisticsFilter

Job type statistics search filter.

```csharp
public sealed class JobTypeStatisticsFilter
```

| Property  | Type                   | Description                                                                                                              |
| --------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `From`    | `DateTimeOffset`       | Start of the time window to filter metrics. ISO 8601 date-time format.                                                   |
| `To`      | `DateTimeOffset`       | End of the time window to filter metrics. ISO 8601 date-time format.                                                     |
| `JobType` | `StringFilterProperty` | Optional job type filter with advanced search capabilities. Supports exact match, pattern matching, and other operators. |

## JobTypeStatisticsItem

Statistics for a single job type.

```csharp
public sealed class JobTypeStatisticsItem
```

| Property    | Type           | Description                                            |
| ----------- | -------------- | ------------------------------------------------------ |
| `JobType`   | `String`       | The job type identifier.                               |
| `Created`   | `StatusMetric` | Metric for a single job status.                        |
| `Completed` | `StatusMetric` | Metric for a single job status.                        |
| `Failed`    | `StatusMetric` | Metric for a single job status.                        |
| `Workers`   | `Int32`        | Number of distinct workers observed for this job type. |

## JobTypeStatisticsQuery

Job type statistics query.

```csharp
public sealed class JobTypeStatisticsQuery
```

| Property | Type                      | Description                        |
| -------- | ------------------------- | ---------------------------------- |
| `Filter` | `JobTypeStatisticsFilter` | Job type statistics search filter. |
| `Page`   | `CursorForwardPagination` | Search cursor pagination.          |

## JobTypeStatisticsQueryResult

Job type statistics query result.

```csharp
public sealed class JobTypeStatisticsQueryResult
```

| Property | Type                          | Description                                      |
| -------- | ----------------------------- | ------------------------------------------------ |
| `Items`  | `List<JobTypeStatisticsItem>` | The list of job type statistics items.           |
| `Page`   | `SearchQueryPageResponse`     | Pagination information about the search results. |

## JobUpdateRequest

JobUpdateRequest

```csharp
public sealed class JobUpdateRequest
```

| Property             | Type                           | Description                                                                                                                                                  |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Changeset`          | `JobChangeset`                 | JSON object with changed job attribute values. The job cannot be completed or failed with this endpoint, use the complete job or fail job endpoints instead. |
| `OperationReference` | `Nullable<OperationReference>` | A reference key chosen by the user that will be part of all records resulting from this operation. Must be &gt; 0 if provided.                               |

## JobWorker

A long-running worker that polls the Camunda broker for jobs of a specific type,
dispatches them to a handler, and auto-completes or auto-fails based on the outcome.

Concurrency model: jobs are dispatched as concurrent s
on the .NET thread pool. controls how
many jobs may be in-flight simultaneously. For async handlers (the typical case), the
thread pool thread is released during await points, so many jobs can be handled
by a small number of OS threads. For CPU-bound handlers, set MaxConcurrentJobs
to to match available cores.

```csharp
public sealed class JobWorker : IAsyncDisposable, IDisposable
```

| Property     | Type      | Description                                        |
| ------------ | --------- | -------------------------------------------------- |
| `ActiveJobs` | `Int32`   | Number of jobs currently being processed.          |
| `IsRunning`  | `Boolean` | Whether the poll loop is currently running.        |
| `Name`       | `String`  | The worker's name (auto-generated or from config). |

## JobWorkerStatisticsFilter

Job worker statistics search filter.

```csharp
public sealed class JobWorkerStatisticsFilter
```

| Property  | Type             | Description                                                            |
| --------- | ---------------- | ---------------------------------------------------------------------- |
| `From`    | `DateTimeOffset` | Start of the time window to filter metrics. ISO 8601 date-time format. |
| `To`      | `DateTimeOffset` | End of the time window to filter metrics. ISO 8601 date-time format.   |
| `JobType` | `String`         | Job type to return worker metrics for.                                 |

## JobWorkerStatisticsItem

Statistics for a single worker within a job type.

```csharp
public sealed class JobWorkerStatisticsItem
```

| Property    | Type           | Description                                                                   |
| ----------- | -------------- | ----------------------------------------------------------------------------- |
| `Worker`    | `String`       | The name of the worker activating the jobs, mostly used for logging purposes. |
| `Created`   | `StatusMetric` | Metric for a single job status.                                               |
| `Completed` | `StatusMetric` | Metric for a single job status.                                               |
| `Failed`    | `StatusMetric` | Metric for a single job status.                                               |

## JobWorkerStatisticsQuery

Job worker statistics query.

```csharp
public sealed class JobWorkerStatisticsQuery
```

| Property | Type                        | Description                          |
| -------- | --------------------------- | ------------------------------------ |
| `Filter` | `JobWorkerStatisticsFilter` | Job worker statistics search filter. |
| `Page`   | `CursorForwardPagination`   | Search cursor pagination.            |

## JobWorkerStatisticsQueryResult

Job worker statistics query result.

```csharp
public sealed class JobWorkerStatisticsQueryResult
```

| Property | Type                            | Description                                      |
| -------- | ------------------------------- | ------------------------------------------------ |
| `Items`  | `List<JobWorkerStatisticsItem>` | The list of per-worker statistics items.         |
| `Page`   | `SearchQueryPageResponse`       | Pagination information about the search results. |

## LicenseResponse

The response of a license request.

```csharp
public sealed class LicenseResponse
```

| Property       | Type                       | Description                                                          |
| -------------- | -------------------------- | -------------------------------------------------------------------- |
| `ValidLicense` | `Boolean`                  | True if the Camunda license is valid, false if otherwise             |
| `LicenseType`  | `String`                   | Will return the license type property of the Camunda license         |
| `IsCommercial` | `Boolean`                  | Will be false when a license contains a non-commerical=true property |
| `ExpiresAt`    | `Nullable<DateTimeOffset>` | The date when the Camunda license expires                            |

## LikeFilter

Checks if the property matches the provided like value.

Supported wildcard characters are:

- `*`: matches zero, one, or multiple characters.
- `?`: matches one, single character.

Wildcard characters can be escaped with backslash, for instance: `\*`.

```csharp
public readonly record struct LikeFilter : ICamundaKey, IEquatable<LikeFilter>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## LimitPagination

LimitPagination

```csharp
public sealed class LimitPagination : SearchQueryPageRequest
```

| Property | Type              | Description                                           |
| -------- | ----------------- | ----------------------------------------------------- |
| `Limit`  | `Nullable<Int32>` | The maximum number of items to return in one request. |

## MappingRuleCreateRequest

MappingRuleCreateRequest

```csharp
public sealed class MappingRuleCreateRequest
```

| Property        | Type     | Description                        |
| --------------- | -------- | ---------------------------------- |
| `MappingRuleId` | `String` | The unique ID of the mapping rule. |
| `ClaimName`     | `String` | The name of the claim to map.      |
| `ClaimValue`    | `String` | The value of the claim to map.     |
| `Name`          | `String` | The name of the mapping rule.      |

## MappingRuleCreateResult

MappingRuleCreateResult

```csharp
public sealed class MappingRuleCreateResult
```

| Property        | Type     | Description                        |
| --------------- | -------- | ---------------------------------- |
| `ClaimName`     | `String` | The name of the claim to map.      |
| `ClaimValue`    | `String` | The value of the claim to map.     |
| `Name`          | `String` | The name of the mapping rule.      |
| `MappingRuleId` | `String` | The unique ID of the mapping rule. |

## MappingRuleCreateUpdateRequest

MappingRuleCreateUpdateRequest

```csharp
public sealed class MappingRuleCreateUpdateRequest
```

| Property     | Type     | Description                    |
| ------------ | -------- | ------------------------------ |
| `ClaimName`  | `String` | The name of the claim to map.  |
| `ClaimValue` | `String` | The value of the claim to map. |
| `Name`       | `String` | The name of the mapping rule.  |

## MappingRuleCreateUpdateResult

MappingRuleCreateUpdateResult

```csharp
public sealed class MappingRuleCreateUpdateResult
```

| Property        | Type     | Description                        |
| --------------- | -------- | ---------------------------------- |
| `ClaimName`     | `String` | The name of the claim to map.      |
| `ClaimValue`    | `String` | The value of the claim to map.     |
| `Name`          | `String` | The name of the mapping rule.      |
| `MappingRuleId` | `String` | The unique ID of the mapping rule. |

## MappingRuleFilter

Mapping rule search filter.

```csharp
public sealed class MappingRuleFilter
```

| Property        | Type     | Description                              |
| --------------- | -------- | ---------------------------------------- |
| `ClaimName`     | `String` | The claim name to match against a token. |
| `ClaimValue`    | `String` | The value of the claim to match.         |
| `Name`          | `String` | The name of the mapping rule.            |
| `MappingRuleId` | `String` | The ID of the mapping rule.              |

## MappingRuleResult

MappingRuleResult

```csharp
public sealed class MappingRuleResult
```

| Property        | Type     | Description                    |
| --------------- | -------- | ------------------------------ |
| `ClaimName`     | `String` | The name of the claim to map.  |
| `ClaimValue`    | `String` | The value of the claim to map. |
| `Name`          | `String` | The name of the mapping rule.  |
| `MappingRuleId` | `String` | The ID of the mapping rule.    |

## MappingRuleSearchQueryRequest

MappingRuleSearchQueryRequest

```csharp
public sealed class MappingRuleSearchQueryRequest
```

| Property | Type                                      | Description                      |
| -------- | ----------------------------------------- | -------------------------------- |
| `Sort`   | `List<MappingRuleSearchQuerySortRequest>` | Sort field criteria.             |
| `Filter` | `MappingRuleFilter`                       | The mapping rule search filters. |
| `Page`   | `SearchQueryPageRequest`                  | Pagination criteria.             |

## MappingRuleSearchQueryResult

MappingRuleSearchQueryResult

```csharp
public sealed class MappingRuleSearchQueryResult
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<MappingRuleResult>` | The matching mapping rules.                      |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## MappingRuleSearchQuerySortRequest

MappingRuleSearchQuerySortRequest

```csharp
public sealed class MappingRuleSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## MappingRuleUpdateRequest

MappingRuleUpdateRequest

```csharp
public sealed class MappingRuleUpdateRequest
```

| Property     | Type     | Description                    |
| ------------ | -------- | ------------------------------ |
| `ClaimName`  | `String` | The name of the claim to map.  |
| `ClaimValue` | `String` | The value of the claim to map. |
| `Name`       | `String` | The name of the mapping rule.  |

## MappingRuleUpdateResult

MappingRuleUpdateResult

```csharp
public sealed class MappingRuleUpdateResult
```

| Property        | Type     | Description                        |
| --------------- | -------- | ---------------------------------- |
| `ClaimName`     | `String` | The name of the claim to map.      |
| `ClaimValue`    | `String` | The value of the claim to map.     |
| `Name`          | `String` | The name of the mapping rule.      |
| `MappingRuleId` | `String` | The unique ID of the mapping rule. |

## MatchedDecisionRuleItem

A decision rule that matched within this decision evaluation.

```csharp
public sealed class MatchedDecisionRuleItem
```

| Property           | Type                                | Description                     |
| ------------------ | ----------------------------------- | ------------------------------- |
| `RuleId`           | `String`                            | The ID of the matched rule.     |
| `RuleIndex`        | `Int32`                             | The index of the matched rule.  |
| `EvaluatedOutputs` | `List<EvaluatedDecisionOutputItem>` | The evaluated decision outputs. |

## MessageCorrelationRequest

MessageCorrelationRequest

```csharp
public sealed class MessageCorrelationRequest : ITenantIdSettable
```

| Property         | Type                 | Description                                     |
| ---------------- | -------------------- | ----------------------------------------------- |
| `Name`           | `String`             | The message name as defined in the BPMN process |
| `CorrelationKey` | `String`             | The correlation key of the message.             |
| `Variables`      | `Object`             | The message variables as JSON document          |
| `TenantId`       | `Nullable<TenantId>` | the tenant for which the message is published   |

## MessageCorrelationResult

The message key of the correlated message, as well as the first process instance key it
correlated with.

```csharp
public sealed class MessageCorrelationResult
```

| Property             | Type                 | Description                                                       |
| -------------------- | -------------------- | ----------------------------------------------------------------- |
| `TenantId`           | `TenantId`           | The tenant ID of the correlated message                           |
| `MessageKey`         | `MessageKey`         | The key of the correlated message.                                |
| `ProcessInstanceKey` | `ProcessInstanceKey` | The key of the first process instance the message correlated with |

## MessagePublicationRequest

MessagePublicationRequest

```csharp
public sealed class MessagePublicationRequest : ITenantIdSettable
```

| Property         | Type                 | Description                                                                                                                                                            |
| ---------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Name`           | `String`             | The name of the message.                                                                                                                                               |
| `CorrelationKey` | `String`             | The correlation key of the message.                                                                                                                                    |
| `TimeToLive`     | `Nullable<Int64>`    | Timespan (in ms) to buffer the message on the broker.                                                                                                                  |
| `MessageId`      | `String`             | The unique ID of the message. This is used to ensure only one message with the given ID will be published during the lifetime of the message (if `timeToLive` is set). |
| `Variables`      | `Object`             | The message variables as JSON document.                                                                                                                                |
| `TenantId`       | `Nullable<TenantId>` | The tenant of the message sender.                                                                                                                                      |

## MessagePublicationResult

The message key of the published message.

```csharp
public sealed class MessagePublicationResult
```

| Property     | Type         | Description                       |
| ------------ | ------------ | --------------------------------- |
| `TenantId`   | `TenantId`   | The tenant ID of the message.     |
| `MessageKey` | `MessageKey` | The key of the published message. |

## MessageSubscriptionFilter

Message subscription search filter.

```csharp
public sealed class MessageSubscriptionFilter
```

| Property                   | Type                                     | Description                                                                                                                           |
| -------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `MessageSubscriptionKey`   | `MessageSubscriptionKeyFilterProperty`   | The message subscription key associated with this message subscription.                                                               |
| `ProcessDefinitionKey`     | `ProcessDefinitionKeyFilterProperty`     | The process definition key associated with this correlated message subscription. This only works for data created with 8.9 and later. |
| `ProcessDefinitionId`      | `StringFilterProperty`                   | The process definition ID associated with this message subscription.                                                                  |
| `ProcessInstanceKey`       | `ProcessInstanceKeyFilterProperty`       | The process instance key associated with this message subscription.                                                                   |
| `ElementId`                | `StringFilterProperty`                   | The element ID associated with this message subscription.                                                                             |
| `ElementInstanceKey`       | `ElementInstanceKeyFilterProperty`       | The element instance key associated with this message subscription.                                                                   |
| `MessageSubscriptionState` | `MessageSubscriptionStateFilterProperty` | The message subscription state.                                                                                                       |
| `LastUpdatedDate`          | `DateTimeFilterProperty`                 | The last updated date of the message subscription.                                                                                    |
| `MessageName`              | `StringFilterProperty`                   | The name of the message associated with the message subscription.                                                                     |
| `CorrelationKey`           | `StringFilterProperty`                   | The correlation key of the message subscription.                                                                                      |
| `TenantId`                 | `StringFilterProperty`                   | The unique external tenant ID.                                                                                                        |

## MessageSubscriptionKeyExactMatch

Matches the value exactly.

```csharp
public readonly record struct MessageSubscriptionKeyExactMatch : ICamundaKey, IEquatable<MessageSubscriptionKeyExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## MessageSubscriptionKeyFilterProperty

MessageSubscriptionKey property with full advanced search capabilities.

```csharp
public sealed class MessageSubscriptionKeyFilterProperty
```

## MessageSubscriptionResult

MessageSubscriptionResult

```csharp
public sealed class MessageSubscriptionResult
```

| Property                   | Type                             | Description                                                                                                                                                                                                                                 |
| -------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MessageSubscriptionKey`   | `MessageSubscriptionKey`         | The message subscription key associated with this message subscription.                                                                                                                                                                     |
| `ProcessDefinitionId`      | `ProcessDefinitionId`            | The process definition ID associated with this message subscription.                                                                                                                                                                        |
| `ProcessDefinitionKey`     | `Nullable<ProcessDefinitionKey>` | The process definition key associated with this message subscription.                                                                                                                                                                       |
| `ProcessInstanceKey`       | `Nullable<ProcessInstanceKey>`   | The process instance key associated with this message subscription.                                                                                                                                                                         |
| `RootProcessInstanceKey`   | `Nullable<ProcessInstanceKey>`   | The key of the root process instance. The root process instance is the top-level ancestor in the process instance hierarchy. This field is only present for data belonging to process instance hierarchies created in version 8.9 or later. |
| `ElementId`                | `ElementId`                      | The element ID associated with this message subscription.                                                                                                                                                                                   |
| `ElementInstanceKey`       | `Nullable<ElementInstanceKey>`   | The element instance key associated with this message subscription.                                                                                                                                                                         |
| `MessageSubscriptionState` | `MessageSubscriptionStateEnum`   | The state of message subscription.                                                                                                                                                                                                          |
| `LastUpdatedDate`          | `DateTimeOffset`                 | The last updated date of the message subscription.                                                                                                                                                                                          |
| `MessageName`              | `String`                         | The name of the message associated with the message subscription.                                                                                                                                                                           |
| `CorrelationKey`           | `String`                         | The correlation key of the message subscription.                                                                                                                                                                                            |
| `TenantId`                 | `TenantId`                       | The unique identifier of the tenant.                                                                                                                                                                                                        |

## MessageSubscriptionSearchQuery

MessageSubscriptionSearchQuery

```csharp
public sealed class MessageSubscriptionSearchQuery
```

| Property | Type                                              | Description                  |
| -------- | ------------------------------------------------- | ---------------------------- |
| `Sort`   | `List<MessageSubscriptionSearchQuerySortRequest>` | Sort field criteria.         |
| `Filter` | `MessageSubscriptionFilter`                       | The incident search filters. |
| `Page`   | `SearchQueryPageRequest`                          | Pagination criteria.         |

## MessageSubscriptionSearchQueryResult

MessageSubscriptionSearchQueryResult

```csharp
public sealed class MessageSubscriptionSearchQueryResult
```

| Property | Type                              | Description                                      |
| -------- | --------------------------------- | ------------------------------------------------ |
| `Items`  | `List<MessageSubscriptionResult>` | The matching message subscriptions.              |
| `Page`   | `SearchQueryPageResponse`         | Pagination information about the search results. |

## MessageSubscriptionSearchQuerySortRequest

MessageSubscriptionSearchQuerySortRequest

```csharp
public sealed class MessageSubscriptionSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## MessageSubscriptionStateExactMatch

Matches the value exactly.

```csharp
public readonly record struct MessageSubscriptionStateExactMatch : ICamundaKey, IEquatable<MessageSubscriptionStateExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## MessageSubscriptionStateFilterProperty

MessageSubscriptionStateEnum with full advanced search capabilities.

```csharp
public sealed class MessageSubscriptionStateFilterProperty
```

## MigrateProcessInstanceMappingInstruction

The mapping instructions describe how to map elements from the source process definition to the target process definition.

```csharp
public sealed class MigrateProcessInstanceMappingInstruction
```

| Property          | Type        | Description                     |
| ----------------- | ----------- | ------------------------------- |
| `SourceElementId` | `ElementId` | The element id to migrate from. |
| `TargetElementId` | `ElementId` | The element id to migrate into. |

## ModifyProcessInstanceVariableInstruction

Instruction describing which variables to create or update.

```csharp
public sealed class ModifyProcessInstanceVariableInstruction
```

| Property    | Type     | Description                                                                                                                                                          |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Variables` | `Object` | JSON document that will instantiate the variables at the scope defined by the scopeId. It must be a JSON object, as variables will be mapped in a key-value fashion. |
| `ScopeId`   | `String` | The id of the element in which scope the variables should be created. Leave empty to create the variables in the global scope of the process instance.               |

## OffsetPagination

OffsetPagination

```csharp
public sealed class OffsetPagination : SearchQueryPageRequest
```

| Property | Type              | Description                                           |
| -------- | ----------------- | ----------------------------------------------------- |
| `From`   | `Nullable<Int32>` | The index of items to start searching from.           |
| `Limit`  | `Nullable<Int32>` | The maximum number of items to return in one request. |

## OperationReference

A reference key chosen by the user that will be part of all records resulting from this operation.
Must be &gt; 0 if provided.

```csharp
public readonly record struct OperationReference : ICamundaLongKey, IEquatable<OperationReference>
```

| Property | Type    | Description                |
| -------- | ------- | -------------------------- |
| `Value`  | `Int64` | The underlying long value. |

## OperationTypeExactMatch

Matches the value exactly.

```csharp
public readonly record struct OperationTypeExactMatch : ICamundaKey, IEquatable<OperationTypeExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## OperationTypeFilterProperty

AuditLogOperationTypeEnum property with full advanced search capabilities.

```csharp
public sealed class OperationTypeFilterProperty
```

## Partition

Provides information on a partition within a broker node.

```csharp
public sealed class Partition
```

| Property      | Type     | Description                                                  |
| ------------- | -------- | ------------------------------------------------------------ |
| `PartitionId` | `Int32`  | The unique ID of this partition.                             |
| `Role`        | `String` | Describes the Raft role of the broker for a given partition. |
| `Health`      | `String` | Describes the current health of the partition.               |

## ProblemDetail

A Problem detail object as described in [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457). There may be additional properties specific to the problem type.

```csharp
public sealed class ProblemDetail
```

| Property   | Type     | Description                                       |
| ---------- | -------- | ------------------------------------------------- |
| `Type`     | `String` | A URI identifying the problem type.               |
| `Title`    | `String` | A summary of the problem type.                    |
| `Status`   | `Int32`  | The HTTP status code for this problem.            |
| `Detail`   | `String` | An explanation of the problem in more detail.     |
| `Instance` | `String` | A URI path identifying the origin of the problem. |

## ProcessDefinitionElementStatisticsQuery

Process definition element statistics request.

```csharp
public sealed class ProcessDefinitionElementStatisticsQuery
```

| Property | Type                                | Description                                       |
| -------- | ----------------------------------- | ------------------------------------------------- |
| `Filter` | `ProcessDefinitionStatisticsFilter` | The process definition statistics search filters. |

## ProcessDefinitionElementStatisticsQueryResult

Process definition element statistics query response.

```csharp
public sealed class ProcessDefinitionElementStatisticsQueryResult
```

| Property | Type                                   | Description             |
| -------- | -------------------------------------- | ----------------------- |
| `Items`  | `List<ProcessElementStatisticsResult>` | The element statistics. |

## ProcessDefinitionFilter

Process definition search filter.

```csharp
public sealed class ProcessDefinitionFilter
```

| Property               | Type                             | Description                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Name`                 | `StringFilterProperty`           | Name of this process definition.                                                                                                                                                                                                                                                                                                                                                                             |
| `IsLatestVersion`      | `Nullable<Boolean>`              | Whether to only return the latest version of each process definition. When using this filter, pagination functionality is limited, you can only paginate forward using `after` and `limit`. The response contains no `startCursor` in the `page`, and requests ignore the `from` and `before` in the `page`. When using this filter, sorting is limited to `processDefinitionId` and `tenantId` fields only. |
| `ResourceName`         | `String`                         | Resource name of this process definition.                                                                                                                                                                                                                                                                                                                                                                    |
| `Version`              | `Nullable<Int32>`                | Version of this process definition.                                                                                                                                                                                                                                                                                                                                                                          |
| `VersionTag`           | `String`                         | Version tag of this process definition.                                                                                                                                                                                                                                                                                                                                                                      |
| `ProcessDefinitionId`  | `StringFilterProperty`           | Process definition ID of this process definition.                                                                                                                                                                                                                                                                                                                                                            |
| `TenantId`             | `Nullable<TenantId>`             | Tenant ID of this process definition.                                                                                                                                                                                                                                                                                                                                                                        |
| `ProcessDefinitionKey` | `Nullable<ProcessDefinitionKey>` | The key for this process definition.                                                                                                                                                                                                                                                                                                                                                                         |
| `HasStartForm`         | `Nullable<Boolean>`              | Indicates whether the start event of the process has an associated Form Key.                                                                                                                                                                                                                                                                                                                                 |

## ProcessDefinitionId

Id of a process definition, from the model. Only ids of process definitions that are deployed are useful.

```csharp
public readonly record struct ProcessDefinitionId : ICamundaKey, IEquatable<ProcessDefinitionId>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## ProcessDefinitionInstanceStatisticsQuery

ProcessDefinitionInstanceStatisticsQuery

```csharp
public sealed class ProcessDefinitionInstanceStatisticsQuery
```

| Property | Type                                                        | Description               |
| -------- | ----------------------------------------------------------- | ------------------------- |
| `Page`   | `OffsetPagination`                                          | Search cursor pagination. |
| `Sort`   | `List<ProcessDefinitionInstanceStatisticsQuerySortRequest>` | Sort field criteria.      |

## ProcessDefinitionInstanceStatisticsQueryResult

ProcessDefinitionInstanceStatisticsQueryResult

```csharp
public sealed class ProcessDefinitionInstanceStatisticsQueryResult
```

| Property | Type                                              | Description                                        |
| -------- | ------------------------------------------------- | -------------------------------------------------- |
| `Items`  | `List<ProcessDefinitionInstanceStatisticsResult>` | The process definition instance statistics result. |
| `Page`   | `SearchQueryPageResponse`                         | Pagination information about the search results.   |

## ProcessDefinitionInstanceStatisticsQuerySortRequest

ProcessDefinitionInstanceStatisticsQuerySortRequest

```csharp
public sealed class ProcessDefinitionInstanceStatisticsQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## ProcessDefinitionInstanceStatisticsResult

Process definition instance statistics response.

```csharp
public sealed class ProcessDefinitionInstanceStatisticsResult
```

| Property                              | Type                  | Description                                                                                               |
| ------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------- |
| `ProcessDefinitionId`                 | `ProcessDefinitionId` | Id of a process definition, from the model. Only ids of process definitions that are deployed are useful. |
| `TenantId`                            | `TenantId`            | The unique identifier of the tenant.                                                                      |
| `LatestProcessDefinitionName`         | `String`              | Name of the latest deployed process definition instance version.                                          |
| `HasMultipleVersions`                 | `Boolean`             | Indicates whether multiple versions of this process definition instance are deployed.                     |
| `ActiveInstancesWithoutIncidentCount` | `Int64`               | Total number of currently active process instances of this definition that do not have incidents.         |
| `ActiveInstancesWithIncidentCount`    | `Int64`               | Total number of currently active process instances of this definition that have at least one incident.    |

## ProcessDefinitionInstanceVersionStatisticsFilter

Process definition instance version statistics search filter.

```csharp
public sealed class ProcessDefinitionInstanceVersionStatisticsFilter
```

| Property              | Type                  | Description                                                          |
| --------------------- | --------------------- | -------------------------------------------------------------------- |
| `ProcessDefinitionId` | `ProcessDefinitionId` | The ID of the process definition to retrieve version statistics for. |
| `TenantId`            | `Nullable<TenantId>`  | Tenant ID of this process definition.                                |

## ProcessDefinitionInstanceVersionStatisticsQuery

ProcessDefinitionInstanceVersionStatisticsQuery

```csharp
public sealed class ProcessDefinitionInstanceVersionStatisticsQuery
```

| Property | Type                                                               | Description                                                        |
| -------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `Page`   | `OffsetPagination`                                                 | Pagination criteria.                                               |
| `Sort`   | `List<ProcessDefinitionInstanceVersionStatisticsQuerySortRequest>` | Sort field criteria.                                               |
| `Filter` | `ProcessDefinitionInstanceVersionStatisticsFilter`                 | The process definition instance version statistics search filters. |

## ProcessDefinitionInstanceVersionStatisticsQueryResult

ProcessDefinitionInstanceVersionStatisticsQueryResult

```csharp
public sealed class ProcessDefinitionInstanceVersionStatisticsQueryResult
```

| Property | Type                                                     | Description                                                |
| -------- | -------------------------------------------------------- | ---------------------------------------------------------- |
| `Items`  | `List<ProcessDefinitionInstanceVersionStatisticsResult>` | The process definition instance version statistics result. |
| `Page`   | `SearchQueryPageResponse`                                | Pagination information about the search results.           |

## ProcessDefinitionInstanceVersionStatisticsQuerySortRequest

ProcessDefinitionInstanceVersionStatisticsQuerySortRequest

```csharp
public sealed class ProcessDefinitionInstanceVersionStatisticsQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## ProcessDefinitionInstanceVersionStatisticsResult

Process definition instance version statistics response.

```csharp
public sealed class ProcessDefinitionInstanceVersionStatisticsResult
```

| Property                              | Type                   | Description                                                                             |
| ------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------- |
| `ProcessDefinitionId`                 | `ProcessDefinitionId`  | The ID associated with the process definition.                                          |
| `ProcessDefinitionKey`                | `ProcessDefinitionKey` | The unique key of the process definition.                                               |
| `ProcessDefinitionName`               | `String`               | The name of the process definition.                                                     |
| `TenantId`                            | `TenantId`             | The tenant ID associated with the process definition.                                   |
| `ProcessDefinitionVersion`            | `Int32`                | The version number of the process definition.                                           |
| `ActiveInstancesWithIncidentCount`    | `Int64`                | The number of active process instances for this version that currently have incidents.  |
| `ActiveInstancesWithoutIncidentCount` | `Int64`                | The number of active process instances for this version that do not have any incidents. |

## ProcessDefinitionKeyExactMatch

Matches the value exactly.

```csharp
public readonly record struct ProcessDefinitionKeyExactMatch : ICamundaKey, IEquatable<ProcessDefinitionKeyExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## ProcessDefinitionKeyFilterProperty

ProcessDefinitionKey property with full advanced search capabilities.

```csharp
public sealed class ProcessDefinitionKeyFilterProperty
```

## ProcessDefinitionMessageSubscriptionStatisticsQuery

ProcessDefinitionMessageSubscriptionStatisticsQuery

```csharp
public sealed class ProcessDefinitionMessageSubscriptionStatisticsQuery
```

| Property | Type                        | Description                       |
| -------- | --------------------------- | --------------------------------- |
| `Page`   | `CursorForwardPagination`   | Search cursor pagination.         |
| `Filter` | `MessageSubscriptionFilter` | The message subscription filters. |

## ProcessDefinitionMessageSubscriptionStatisticsQueryResult

ProcessDefinitionMessageSubscriptionStatisticsQueryResult

```csharp
public sealed class ProcessDefinitionMessageSubscriptionStatisticsQueryResult
```

| Property | Type                                                         | Description                                                      |
| -------- | ------------------------------------------------------------ | ---------------------------------------------------------------- |
| `Items`  | `List<ProcessDefinitionMessageSubscriptionStatisticsResult>` | The matching process definition message subscription statistics. |
| `Page`   | `SearchQueryPageResponse`                                    | Pagination information about the search results.                 |

## ProcessDefinitionMessageSubscriptionStatisticsResult

ProcessDefinitionMessageSubscriptionStatisticsResult

```csharp
public sealed class ProcessDefinitionMessageSubscriptionStatisticsResult
```

| Property                                  | Type                   | Description                                                                       |
| ----------------------------------------- | ---------------------- | --------------------------------------------------------------------------------- |
| `ProcessDefinitionId`                     | `ProcessDefinitionId`  | The process definition ID associated with this message subscription.              |
| `TenantId`                                | `TenantId`             | The tenant ID associated with this message subscription.                          |
| `ProcessDefinitionKey`                    | `ProcessDefinitionKey` | The process definition key associated with this message subscription.             |
| `ProcessInstancesWithActiveSubscriptions` | `Int64`                | The number of process instances with active message subscriptions.                |
| `ActiveSubscriptions`                     | `Int64`                | The total number of active message subscriptions for this process definition key. |

## ProcessDefinitionResult

ProcessDefinitionResult

```csharp
public sealed class ProcessDefinitionResult
```

| Property               | Type                   | Description                                                                  |
| ---------------------- | ---------------------- | ---------------------------------------------------------------------------- |
| `Name`                 | `String`               | Name of this process definition.                                             |
| `ResourceName`         | `String`               | Resource name for this process definition.                                   |
| `Version`              | `Int32`                | Version of this process definition.                                          |
| `VersionTag`           | `String`               | Version tag of this process definition.                                      |
| `ProcessDefinitionId`  | `ProcessDefinitionId`  | Process definition ID of this process definition.                            |
| `TenantId`             | `TenantId`             | Tenant ID of this process definition.                                        |
| `ProcessDefinitionKey` | `ProcessDefinitionKey` | The key for this process definition.                                         |
| `HasStartForm`         | `Boolean`              | Indicates whether the start event of the process has an associated Form Key. |

## ProcessDefinitionSearchQuery

ProcessDefinitionSearchQuery

```csharp
public sealed class ProcessDefinitionSearchQuery
```

| Property | Type                                            | Description                            |
| -------- | ----------------------------------------------- | -------------------------------------- |
| `Sort`   | `List<ProcessDefinitionSearchQuerySortRequest>` | Sort field criteria.                   |
| `Filter` | `ProcessDefinitionFilter`                       | The process definition search filters. |
| `Page`   | `SearchQueryPageRequest`                        | Pagination criteria.                   |

## ProcessDefinitionSearchQueryResult

ProcessDefinitionSearchQueryResult

```csharp
public sealed class ProcessDefinitionSearchQueryResult
```

| Property | Type                            | Description                                      |
| -------- | ------------------------------- | ------------------------------------------------ |
| `Items`  | `List<ProcessDefinitionResult>` | The matching process definitions.                |
| `Page`   | `SearchQueryPageResponse`       | Pagination information about the search results. |

## ProcessDefinitionSearchQuerySortRequest

ProcessDefinitionSearchQuerySortRequest

```csharp
public sealed class ProcessDefinitionSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## ProcessDefinitionStatisticsFilter

Process definition statistics search filter.

```csharp
public sealed class ProcessDefinitionStatisticsFilter
```

| Property                     | Type                                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `StartDate`                  | `DateTimeFilterProperty`                | The start date.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `EndDate`                    | `DateTimeFilterProperty`                | The end date.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `State`                      | `ProcessInstanceStateFilterProperty`    | The process instance state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `HasIncident`                | `Nullable<Boolean>`                     | Whether this process instance has a related incident or not.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `TenantId`                   | `StringFilterProperty`                  | The tenant id.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `Variables`                  | `List<VariableValueFilterProperty>`     | The process instance variables.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `ProcessInstanceKey`         | `ProcessInstanceKeyFilterProperty`      | The key of this process instance.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `ParentProcessInstanceKey`   | `ProcessInstanceKeyFilterProperty`      | The parent process instance key.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `ParentElementInstanceKey`   | `ElementInstanceKeyFilterProperty`      | The parent element instance key.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `BatchOperationId`           | `StringFilterProperty`                  | The batch operation id. **Deprecated**: Use `batchOperationKey` instead. This field will be removed in a future release. If both `batchOperationId` and `batchOperationKey` are provided, the request will be rejected with a 400 error.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `BatchOperationKey`          | `StringFilterProperty`                  | The batch operation key.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `ErrorMessage`               | `StringFilterProperty`                  | The error message related to the process.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `HasRetriesLeft`             | `Nullable<Boolean>`                     | Whether the process has failed jobs with retries left.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `ElementInstanceState`       | `ElementInstanceStateFilterProperty`    | The state of the element instances associated with the process instance.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `ElementId`                  | `StringFilterProperty`                  | The element id associated with the process instance.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `HasElementInstanceIncident` | `Nullable<Boolean>`                     | Whether the element instance has an incident or not.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `IncidentErrorHashCode`      | `IntegerFilterProperty`                 | The incident error hash code, associated with this process.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `Tags`                       | `List<Tag>`                             | List of tags. Tags need to start with a letter; then alphanumerics, `_`, `-`, `:`, or `.`; length ≤ 100.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `BusinessId`                 | `StringFilterProperty`                  | The business id associated with the process instance.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `Or`                         | `List<BaseProcessInstanceFilterFields>` | Defines a list of alternative filter groups combined using OR logic. Each object in the array is evaluated independently, and the filter matches if any one of them is satisfied. Top-level fields and the `$or` clause are combined using AND logic — meaning: (top-level filters) AND (any of the `$or` filters) must match. &lt;br&gt; &lt;em&gt;Example:&lt;/em&gt; `json {   "state": "ACTIVE",   "tenantId": 123,   "$or": [     { "processDefinitionId": "process_v1" },     { "processDefinitionId": "process_v2", "hasIncident": true }   ] } ` This matches process instances that: &lt;ul style="padding-left: 20px; margin-left: 20px;"&gt; &lt;li style="list-style-type: disc;"&gt;are in &lt;em&gt;ACTIVE&lt;/em&gt; state&lt;/li&gt; &lt;li style="list-style-type: disc;"&gt;have tenant id equal to &lt;em&gt;123&lt;/em&gt;&lt;/li&gt; &lt;li style="list-style-type: disc;"&gt;and match either: &lt;ul style="padding-left: 20px; margin-left: 20px;"&gt; &lt;li style="list-style-type: circle;"&gt;&lt;code&gt;processDefinitionId&lt;/code&gt; is &lt;em&gt;process_v1&lt;/em&gt;, or&lt;/li&gt; &lt;li style="list-style-type: circle;"&gt;&lt;code&gt;processDefinitionId&lt;/code&gt; is &lt;em&gt;process_v2&lt;/em&gt; and &lt;code&gt;hasIncident&lt;/code&gt; is &lt;em&gt;true&lt;/em&gt;&lt;/li&gt; &lt;/ul&gt; &lt;/li&gt; &lt;/ul&gt; &lt;br&gt; &lt;p&gt;Note: Using complex &lt;code&gt;$or&lt;/code&gt; conditions may impact performance, use with caution in high-volume environments. |

## ProcessElementStatisticsResult

Process element statistics response.

```csharp
public sealed class ProcessElementStatisticsResult
```

| Property    | Type        | Description                                             |
| ----------- | ----------- | ------------------------------------------------------- |
| `ElementId` | `ElementId` | The element ID for which the results are aggregated.    |
| `Active`    | `Int64`     | The total number of active instances of the element.    |
| `Canceled`  | `Int64`     | The total number of canceled instances of the element.  |
| `Incidents` | `Int64`     | The total number of incidents for the element.          |
| `Completed` | `Int64`     | The total number of completed instances of the element. |

## ProcessInstanceCallHierarchyEntry

ProcessInstanceCallHierarchyEntry

```csharp
public sealed class ProcessInstanceCallHierarchyEntry
```

| Property                | Type                   | Description                                                                                    |
| ----------------------- | ---------------------- | ---------------------------------------------------------------------------------------------- |
| `ProcessInstanceKey`    | `ProcessInstanceKey`   | The key of the process instance.                                                               |
| `ProcessDefinitionKey`  | `ProcessDefinitionKey` | The key of the process definition.                                                             |
| `ProcessDefinitionName` | `String`               | The name of the process definition (fall backs to the process definition id if not available). |

## ProcessInstanceCancellationBatchOperationRequest

The process instance filter that defines which process instances should be canceled.

```csharp
public sealed class ProcessInstanceCancellationBatchOperationRequest
```

| Property             | Type                           | Description                                                                                                                    |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `Filter`             | `ProcessInstanceFilter`        | The process instance filter.                                                                                                   |
| `OperationReference` | `Nullable<OperationReference>` | A reference key chosen by the user that will be part of all records resulting from this operation. Must be &gt; 0 if provided. |

## ProcessInstanceCreationInstruction

Instructions for creating a process instance. The process definition can be specified
either by id or by key.

```csharp
public abstract class ProcessInstanceCreationInstruction
```

## ProcessInstanceCreationInstructionById

ProcessInstanceCreationInstructionById

```csharp
public sealed class ProcessInstanceCreationInstructionById : ProcessInstanceCreationInstruction, ITenantIdSettable
```

| Property                   | Type                                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ProcessDefinitionId`      | `ProcessDefinitionId`                             | The BPMN process id of the process definition to start an instance of.                                                                                                                                                                                                                                                                                                                                                                            |
| `ProcessDefinitionVersion` | `Nullable<Int32>`                                 | The version of the process. By default, the latest version of the process is used.                                                                                                                                                                                                                                                                                                                                                                |
| `Variables`                | `Object`                                          | JSON object that will instantiate the variables for the root variable scope of the process instance.                                                                                                                                                                                                                                                                                                                                              |
| `TenantId`                 | `Nullable<TenantId>`                              | The tenant id of the process definition. If multi-tenancy is enabled, provide the tenant id of the process definition to start a process instance of. If multi-tenancy is disabled, don't provide this parameter.                                                                                                                                                                                                                                 |
| `OperationReference`       | `Nullable<OperationReference>`                    | A reference key chosen by the user that will be part of all records resulting from this operation. Must be &gt; 0 if provided.                                                                                                                                                                                                                                                                                                                    |
| `StartInstructions`        | `List<ProcessInstanceCreationStartInstruction>`   | List of start instructions. By default, the process instance will start at the start event. If provided, the process instance will apply start instructions after it has been created.                                                                                                                                                                                                                                                            |
| `RuntimeInstructions`      | `List<ProcessInstanceCreationRuntimeInstruction>` | Runtime instructions (alpha). List of instructions that affect the runtime behavior of the process instance. Refer to specific instruction types for more details. This parameter is an alpha feature and may be subject to change in future releases.                                                                                                                                                                                            |
| `AwaitCompletion`          | `Nullable<Boolean>`                               | Wait for the process instance to complete. If the process instance does not complete within the request timeout limit, a 504 response status will be returned. The process instance will continue to run in the background regardless of the timeout. Disabled by default.                                                                                                                                                                        |
| `FetchVariables`           | `List<String>`                                    | List of variables by name to be included in the response when awaitCompletion is set to true. If empty, all visible variables in the root scope will be returned.                                                                                                                                                                                                                                                                                 |
| `RequestTimeout`           | `Nullable<Int64>`                                 | Timeout (in ms) the request waits for the process to complete. By default or when set to 0, the generic request timeout configured in the cluster is applied.                                                                                                                                                                                                                                                                                     |
| `Tags`                     | `List<Tag>`                                       | List of tags. Tags need to start with a letter; then alphanumerics, `_`, `-`, `:`, or `.`; length ≤ 100.                                                                                                                                                                                                                                                                                                                                          |
| `BusinessId`               | `Nullable<BusinessId>`                            | An optional, user-defined string identifier that identifies the process instance within the scope of a process definition (scoped by tenant). If provided and uniqueness enforcement is enabled, the engine will reject creation if another root process instance with the same business id is already active for the same process definition. Note that any active child process instances with the same business id are not taken into account. |

## ProcessInstanceCreationInstructionByKey

ProcessInstanceCreationInstructionByKey

```csharp
public sealed class ProcessInstanceCreationInstructionByKey : ProcessInstanceCreationInstruction, ITenantIdSettable
```

| Property                   | Type                                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ProcessDefinitionKey`     | `ProcessDefinitionKey`                            | The unique key identifying the process definition, for example, returned for a process in the deploy resources endpoint.                                                                                                                                                                                                                                                                                                                          |
| `ProcessDefinitionVersion` | `Nullable<Int32>`                                 | As the version is already identified by the `processDefinitionKey`, the value of this field is ignored. It's here for backwards-compatibility only as previous releases accepted it in request bodies.                                                                                                                                                                                                                                            |
| `Variables`                | `Object`                                          | Set of variables as JSON object to instantiate in the root variable scope of the process instance. Can include nested complex objects.                                                                                                                                                                                                                                                                                                            |
| `StartInstructions`        | `List<ProcessInstanceCreationStartInstruction>`   | List of start instructions. By default, the process instance will start at the start event. If provided, the process instance will apply start instructions after it has been created.                                                                                                                                                                                                                                                            |
| `RuntimeInstructions`      | `List<ProcessInstanceCreationRuntimeInstruction>` | Runtime instructions (alpha). List of instructions that affect the runtime behavior of the process instance. Refer to specific instruction types for more details. This parameter is an alpha feature and may be subject to change in future releases.                                                                                                                                                                                            |
| `TenantId`                 | `Nullable<TenantId>`                              | The tenant id of the process definition. If multi-tenancy is enabled, provide the tenant id of the process definition to start a process instance of. If multi-tenancy is disabled, don't provide this parameter.                                                                                                                                                                                                                                 |
| `OperationReference`       | `Nullable<OperationReference>`                    | A reference key chosen by the user that will be part of all records resulting from this operation. Must be &gt; 0 if provided.                                                                                                                                                                                                                                                                                                                    |
| `AwaitCompletion`          | `Nullable<Boolean>`                               | Wait for the process instance to complete. If the process instance does not complete within the request timeout limit, a 504 response status will be returned. The process instance will continue to run in the background regardless of the timeout. Disabled by default.                                                                                                                                                                        |
| `RequestTimeout`           | `Nullable<Int64>`                                 | Timeout (in ms) the request waits for the process to complete. By default or when set to 0, the generic request timeout configured in the cluster is applied.                                                                                                                                                                                                                                                                                     |
| `FetchVariables`           | `List<String>`                                    | List of variables by name to be included in the response when awaitCompletion is set to true. If empty, all visible variables in the root scope will be returned.                                                                                                                                                                                                                                                                                 |
| `Tags`                     | `List<Tag>`                                       | List of tags. Tags need to start with a letter; then alphanumerics, `_`, `-`, `:`, or `.`; length ≤ 100.                                                                                                                                                                                                                                                                                                                                          |
| `BusinessId`               | `Nullable<BusinessId>`                            | An optional, user-defined string identifier that identifies the process instance within the scope of a process definition (scoped by tenant). If provided and uniqueness enforcement is enabled, the engine will reject creation if another root process instance with the same business id is already active for the same process definition. Note that any active child process instances with the same business id are not taken into account. |

## ProcessInstanceCreationRuntimeInstruction

ProcessInstanceCreationRuntimeInstruction

```csharp
public abstract class ProcessInstanceCreationRuntimeInstruction
```

## ProcessInstanceCreationStartInstruction

ProcessInstanceCreationStartInstruction

```csharp
public sealed class ProcessInstanceCreationStartInstruction
```

| Property    | Type        | Description                                                                                                                                                                                                                  |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ElementId` | `ElementId` | Future extensions might include: - different types of start instructions - ability to set local variables for different flow scopes For now, however, the start instruction is implicitly a "startBeforeElement" instruction |

## ProcessInstanceCreationTerminateInstruction

Terminates the process instance after a specific BPMN element is completed or terminated.

```csharp
public sealed class ProcessInstanceCreationTerminateInstruction : ProcessInstanceCreationRuntimeInstruction
```

| Property         | Type        | Description                                                                                        |
| ---------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| `Type`           | `String`    | The type of the runtime instruction                                                                |
| `AfterElementId` | `ElementId` | The id of the element that, once completed or terminated, will cause the process to be terminated. |

## ProcessInstanceDeletionBatchOperationRequest

The process instance filter that defines which process instances should be deleted.

```csharp
public sealed class ProcessInstanceDeletionBatchOperationRequest
```

| Property             | Type                           | Description                                                                                                                    |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `Filter`             | `ProcessInstanceFilter`        | The process instance filter.                                                                                                   |
| `OperationReference` | `Nullable<OperationReference>` | A reference key chosen by the user that will be part of all records resulting from this operation. Must be &gt; 0 if provided. |

## ProcessInstanceElementStatisticsQueryResult

Process instance element statistics query response.

```csharp
public sealed class ProcessInstanceElementStatisticsQueryResult
```

| Property | Type                                   | Description             |
| -------- | -------------------------------------- | ----------------------- |
| `Items`  | `List<ProcessElementStatisticsResult>` | The element statistics. |

## ProcessInstanceFilter

Process instance search filter.

```csharp
public sealed class ProcessInstanceFilter
```

| Property                      | Type                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ProcessDefinitionId`         | `StringFilterProperty`               | The process definition id.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `ProcessDefinitionName`       | `StringFilterProperty`               | The process definition name.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `ProcessDefinitionVersion`    | `IntegerFilterProperty`              | The process definition version.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `ProcessDefinitionVersionTag` | `StringFilterProperty`               | The process definition version tag.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `ProcessDefinitionKey`        | `ProcessDefinitionKeyFilterProperty` | The process definition key.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `Or`                          | `List<ProcessInstanceFilterFields>`  | Defines a list of alternative filter groups combined using OR logic. Each object in the array is evaluated independently, and the filter matches if any one of them is satisfied. Top-level fields and the `$or` clause are combined using AND logic — meaning: (top-level filters) AND (any of the `$or` filters) must match. &lt;br&gt; &lt;em&gt;Example:&lt;/em&gt; `json {   "state": "ACTIVE",   "tenantId": 123,   "$or": [     { "processDefinitionId": "process_v1" },     { "processDefinitionId": "process_v2", "hasIncident": true }   ] } ` This matches process instances that: &lt;ul style="padding-left: 20px; margin-left: 20px;"&gt; &lt;li style="list-style-type: disc;"&gt;are in &lt;em&gt;ACTIVE&lt;/em&gt; state&lt;/li&gt; &lt;li style="list-style-type: disc;"&gt;have tenant id equal to &lt;em&gt;123&lt;/em&gt;&lt;/li&gt; &lt;li style="list-style-type: disc;"&gt;and match either: &lt;ul style="padding-left: 20px; margin-left: 20px;"&gt; &lt;li style="list-style-type: circle;"&gt;&lt;code&gt;processDefinitionId&lt;/code&gt; is &lt;em&gt;process_v1&lt;/em&gt;, or&lt;/li&gt; &lt;li style="list-style-type: circle;"&gt;&lt;code&gt;processDefinitionId&lt;/code&gt; is &lt;em&gt;process_v2&lt;/em&gt; and &lt;code&gt;hasIncident&lt;/code&gt; is &lt;em&gt;true&lt;/em&gt;&lt;/li&gt; &lt;/ul&gt; &lt;/li&gt; &lt;/ul&gt; &lt;br&gt; &lt;p&gt;Note: Using complex &lt;code&gt;$or&lt;/code&gt; conditions may impact performance, use with caution in high-volume environments. |

## ProcessInstanceFilterFields

Process instance search filter.

```csharp
public sealed class ProcessInstanceFilterFields
```

| Property                      | Type                                 | Description                                                                                                                                                                                                                              |
| ----------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ProcessDefinitionId`         | `StringFilterProperty`               | The process definition id.                                                                                                                                                                                                               |
| `ProcessDefinitionName`       | `StringFilterProperty`               | The process definition name.                                                                                                                                                                                                             |
| `ProcessDefinitionVersion`    | `IntegerFilterProperty`              | The process definition version.                                                                                                                                                                                                          |
| `ProcessDefinitionVersionTag` | `StringFilterProperty`               | The process definition version tag.                                                                                                                                                                                                      |
| `ProcessDefinitionKey`        | `ProcessDefinitionKeyFilterProperty` | The process definition key.                                                                                                                                                                                                              |
| `StartDate`                   | `DateTimeFilterProperty`             | The start date.                                                                                                                                                                                                                          |
| `EndDate`                     | `DateTimeFilterProperty`             | The end date.                                                                                                                                                                                                                            |
| `State`                       | `ProcessInstanceStateFilterProperty` | The process instance state.                                                                                                                                                                                                              |
| `HasIncident`                 | `Nullable<Boolean>`                  | Whether this process instance has a related incident or not.                                                                                                                                                                             |
| `TenantId`                    | `StringFilterProperty`               | The tenant id.                                                                                                                                                                                                                           |
| `Variables`                   | `List<VariableValueFilterProperty>`  | The process instance variables.                                                                                                                                                                                                          |
| `ProcessInstanceKey`          | `ProcessInstanceKeyFilterProperty`   | The key of this process instance.                                                                                                                                                                                                        |
| `ParentProcessInstanceKey`    | `ProcessInstanceKeyFilterProperty`   | The parent process instance key.                                                                                                                                                                                                         |
| `ParentElementInstanceKey`    | `ElementInstanceKeyFilterProperty`   | The parent element instance key.                                                                                                                                                                                                         |
| `BatchOperationId`            | `StringFilterProperty`               | The batch operation id. **Deprecated**: Use `batchOperationKey` instead. This field will be removed in a future release. If both `batchOperationId` and `batchOperationKey` are provided, the request will be rejected with a 400 error. |
| `BatchOperationKey`           | `StringFilterProperty`               | The batch operation key.                                                                                                                                                                                                                 |
| `ErrorMessage`                | `StringFilterProperty`               | The error message related to the process.                                                                                                                                                                                                |
| `HasRetriesLeft`              | `Nullable<Boolean>`                  | Whether the process has failed jobs with retries left.                                                                                                                                                                                   |
| `ElementInstanceState`        | `ElementInstanceStateFilterProperty` | The state of the element instances associated with the process instance.                                                                                                                                                                 |
| `ElementId`                   | `StringFilterProperty`               | The element id associated with the process instance.                                                                                                                                                                                     |
| `HasElementInstanceIncident`  | `Nullable<Boolean>`                  | Whether the element instance has an incident or not.                                                                                                                                                                                     |
| `IncidentErrorHashCode`       | `IntegerFilterProperty`              | The incident error hash code, associated with this process.                                                                                                                                                                              |
| `Tags`                        | `List<Tag>`                          | List of tags. Tags need to start with a letter; then alphanumerics, `_`, `-`, `:`, or `.`; length ≤ 100.                                                                                                                                 |
| `BusinessId`                  | `StringFilterProperty`               | The business id associated with the process instance.                                                                                                                                                                                    |

## ProcessInstanceIncidentResolutionBatchOperationRequest

The process instance filter that defines which process instances should have their incidents resolved.

```csharp
public sealed class ProcessInstanceIncidentResolutionBatchOperationRequest
```

| Property             | Type                           | Description                                                                                                                    |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `Filter`             | `ProcessInstanceFilter`        | The process instance filter.                                                                                                   |
| `OperationReference` | `Nullable<OperationReference>` | A reference key chosen by the user that will be part of all records resulting from this operation. Must be &gt; 0 if provided. |

## ProcessInstanceKeyExactMatch

Matches the value exactly.

```csharp
public readonly record struct ProcessInstanceKeyExactMatch : ICamundaKey, IEquatable<ProcessInstanceKeyExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## ProcessInstanceKeyFilterProperty

ProcessInstanceKey property with full advanced search capabilities.

```csharp
public sealed class ProcessInstanceKeyFilterProperty
```

## ProcessInstanceMigrationBatchOperationPlan

The migration instructions describe how to migrate a process instance from one process definition to another.

```csharp
public sealed class ProcessInstanceMigrationBatchOperationPlan
```

| Property                     | Type                                             | Description                        |
| ---------------------------- | ------------------------------------------------ | ---------------------------------- |
| `TargetProcessDefinitionKey` | `ProcessDefinitionKey`                           | The target process definition key. |
| `MappingInstructions`        | `List<MigrateProcessInstanceMappingInstruction>` | The mapping instructions.          |

## ProcessInstanceMigrationBatchOperationRequest

ProcessInstanceMigrationBatchOperationRequest

```csharp
public sealed class ProcessInstanceMigrationBatchOperationRequest
```

| Property             | Type                                         | Description                                                                                                                    |
| -------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `Filter`             | `ProcessInstanceFilter`                      | The process instance filter.                                                                                                   |
| `MigrationPlan`      | `ProcessInstanceMigrationBatchOperationPlan` | The migration plan.                                                                                                            |
| `OperationReference` | `Nullable<OperationReference>`               | A reference key chosen by the user that will be part of all records resulting from this operation. Must be &gt; 0 if provided. |

## ProcessInstanceMigrationInstruction

The migration instructions describe how to migrate a process instance from one process definition to another.

```csharp
public sealed class ProcessInstanceMigrationInstruction
```

| Property                     | Type                                             | Description                                                                                                                    |
| ---------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `TargetProcessDefinitionKey` | `ProcessDefinitionKey`                           | The key of process definition to migrate the process instance to.                                                              |
| `MappingInstructions`        | `List<MigrateProcessInstanceMappingInstruction>` | Element mappings from the source process instance to the target process instance.                                              |
| `OperationReference`         | `Nullable<OperationReference>`                   | A reference key chosen by the user that will be part of all records resulting from this operation. Must be &gt; 0 if provided. |

## ProcessInstanceModificationActivateInstruction

Instruction describing an element to activate.

```csharp
public sealed class ProcessInstanceModificationActivateInstruction
```

| Property                     | Type                                             | Description                                                                                                                                                                                                                                                                                                   |
| ---------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ElementId`                  | `ElementId`                                      | The id of the element to activate.                                                                                                                                                                                                                                                                            |
| `VariableInstructions`       | `List<ModifyProcessInstanceVariableInstruction>` | Instructions describing which variables to create or update.                                                                                                                                                                                                                                                  |
| `AncestorElementInstanceKey` | `Nullable<ElementInstanceKey>`                   | The key of the ancestor scope the element instance should be created in. Set to -1 to create the new element instance within an existing element instance of the flow scope. If multiple instances of the target element's flow scope exist, choose one specifically with this property by providing its key. |

## ProcessInstanceModificationBatchOperationRequest

The process instance filter to define on which process instances tokens should be moved,
and new element instances should be activated or terminated.

```csharp
public sealed class ProcessInstanceModificationBatchOperationRequest
```

| Property             | Type                                                             | Description                                                                                                                    |
| -------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `Filter`             | `ProcessInstanceFilter`                                          | The process instance filter.                                                                                                   |
| `MoveInstructions`   | `List<ProcessInstanceModificationMoveBatchOperationInstruction>` | Instructions for moving tokens between elements.                                                                               |
| `OperationReference` | `Nullable<OperationReference>`                                   | A reference key chosen by the user that will be part of all records resulting from this operation. Must be &gt; 0 if provided. |

## ProcessInstanceModificationInstruction

ProcessInstanceModificationInstruction

```csharp
public sealed class ProcessInstanceModificationInstruction
```

| Property                | Type                                                    | Description                                                                                                                    |
| ----------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `OperationReference`    | `Nullable<OperationReference>`                          | A reference key chosen by the user that will be part of all records resulting from this operation. Must be &gt; 0 if provided. |
| `ActivateInstructions`  | `List<ProcessInstanceModificationActivateInstruction>`  | Instructions describing which elements to activate in which scopes and which variables to create or update.                    |
| `MoveInstructions`      | `List<ProcessInstanceModificationMoveInstruction>`      | Instructions describing which elements to move from one scope to another.                                                      |
| `TerminateInstructions` | `List<ProcessInstanceModificationTerminateInstruction>` | Instructions describing which elements to terminate.                                                                           |

## ProcessInstanceModificationMoveBatchOperationInstruction

Instructions describing a move operation. This instruction will terminate all active
element instances at `sourceElementId` and activate a new element instance for each
terminated one at `targetElementId`. The new element instances are created in the parent
scope of the source element instances.

```csharp
public sealed class ProcessInstanceModificationMoveBatchOperationInstruction
```

| Property          | Type        | Description            |
| ----------------- | ----------- | ---------------------- |
| `SourceElementId` | `ElementId` | The source element ID. |
| `TargetElementId` | `ElementId` | The target element ID. |

## ProcessInstanceModificationMoveInstruction

Instruction describing a move operation. This instruction will terminate active element
instances based on the sourceElementInstruction and activate a new element instance for each terminated
one at targetElementId. Note that, for multi-instance activities, only the multi-instance
body instances will activate new element instances at the target id.

```csharp
public sealed class ProcessInstanceModificationMoveInstruction
```

| Property                   | Type                                             | Description                                                                                                                                                               |
| -------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SourceElementInstruction` | `SourceElementInstruction`                       | Defines the source element identifier for the move instruction. It can either be a sourceElementId, or sourceElementInstanceKey.                                          |
| `TargetElementId`          | `ElementId`                                      | The target element id.                                                                                                                                                    |
| `AncestorScopeInstruction` | `AncestorScopeInstruction`                       | Defines the ancestor scope for the created element instances. The default behavior resembles a "direct" scope instruction with an `ancestorElementInstanceKey` of `"-1"`. |
| `VariableInstructions`     | `List<ModifyProcessInstanceVariableInstruction>` | Instructions describing which variables to create or update.                                                                                                              |

## ProcessInstanceModificationTerminateByIdInstruction

Instruction describing which elements to terminate. The element instances are determined
at runtime by the given id.

```csharp
public sealed class ProcessInstanceModificationTerminateByIdInstruction : ProcessInstanceModificationTerminateInstruction
```

| Property    | Type        | Description                                                                           |
| ----------- | ----------- | ------------------------------------------------------------------------------------- |
| `ElementId` | `ElementId` | The id of the elements to terminate. The element instances are determined at runtime. |

## ProcessInstanceModificationTerminateByKeyInstruction

Instruction providing the key of the element instance to terminate.

```csharp
public sealed class ProcessInstanceModificationTerminateByKeyInstruction : ProcessInstanceModificationTerminateInstruction
```

| Property             | Type                 | Description                                   |
| -------------------- | -------------------- | --------------------------------------------- |
| `ElementInstanceKey` | `ElementInstanceKey` | The key of the element instance to terminate. |

## ProcessInstanceModificationTerminateInstruction

Instruction describing which elements to terminate.

```csharp
public abstract class ProcessInstanceModificationTerminateInstruction
```

## ProcessInstanceReference

ProcessInstanceReference

```csharp
public sealed class ProcessInstanceReference
```

| Property               | Type                   | Description                              |
| ---------------------- | ---------------------- | ---------------------------------------- |
| `ProcessDefinitionKey` | `ProcessDefinitionKey` | The key of the process definition.       |
| `ProcessInstanceKey`   | `ProcessInstanceKey`   | The key of the created process instance. |

## ProcessInstanceResult

Process instance search response item.

```csharp
public sealed class ProcessInstanceResult
```

| Property                      | Type                           | Description                                                                                                                                                                                                                                 |
| ----------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ProcessDefinitionId`         | `ProcessDefinitionId`          | Id of a process definition, from the model. Only ids of process definitions that are deployed are useful.                                                                                                                                   |
| `ProcessDefinitionName`       | `String`                       | The process definition name.                                                                                                                                                                                                                |
| `ProcessDefinitionVersion`    | `Int32`                        | The process definition version.                                                                                                                                                                                                             |
| `ProcessDefinitionVersionTag` | `String`                       | The process definition version tag.                                                                                                                                                                                                         |
| `StartDate`                   | `DateTimeOffset`               | The start time of the process instance.                                                                                                                                                                                                     |
| `EndDate`                     | `Nullable<DateTimeOffset>`     | The completion or termination time of the process instance.                                                                                                                                                                                 |
| `State`                       | `ProcessInstanceStateEnum`     | Process instance states                                                                                                                                                                                                                     |
| `HasIncident`                 | `Boolean`                      | Whether this process instance has a related incident or not.                                                                                                                                                                                |
| `TenantId`                    | `TenantId`                     | The unique identifier of the tenant.                                                                                                                                                                                                        |
| `ProcessInstanceKey`          | `ProcessInstanceKey`           | The key of this process instance.                                                                                                                                                                                                           |
| `ProcessDefinitionKey`        | `ProcessDefinitionKey`         | The process definition key.                                                                                                                                                                                                                 |
| `ParentProcessInstanceKey`    | `Nullable<ProcessInstanceKey>` | The parent process instance key.                                                                                                                                                                                                            |
| `ParentElementInstanceKey`    | `Nullable<ElementInstanceKey>` | The parent element instance key.                                                                                                                                                                                                            |
| `RootProcessInstanceKey`      | `Nullable<ProcessInstanceKey>` | The key of the root process instance. The root process instance is the top-level ancestor in the process instance hierarchy. This field is only present for data belonging to process instance hierarchies created in version 8.9 or later. |
| `Tags`                        | `List<Tag>`                    | List of tags. Tags need to start with a letter; then alphanumerics, `_`, `-`, `:`, or `.`; length ≤ 100.                                                                                                                                    |
| `BusinessId`                  | `Nullable<BusinessId>`         | The business id associated with this process instance.                                                                                                                                                                                      |

## ProcessInstanceSearchQuery

Process instance search request.

```csharp
public sealed class ProcessInstanceSearchQuery
```

| Property | Type                                          | Description                          |
| -------- | --------------------------------------------- | ------------------------------------ |
| `Sort`   | `List<ProcessInstanceSearchQuerySortRequest>` | Sort field criteria.                 |
| `Filter` | `ProcessInstanceFilter`                       | The process instance search filters. |
| `Page`   | `SearchQueryPageRequest`                      | Pagination criteria.                 |

## ProcessInstanceSearchQueryResult

Process instance search response.

```csharp
public sealed class ProcessInstanceSearchQueryResult
```

| Property | Type                          | Description                                      |
| -------- | ----------------------------- | ------------------------------------------------ |
| `Items`  | `List<ProcessInstanceResult>` | The matching process instances.                  |
| `Page`   | `SearchQueryPageResponse`     | Pagination information about the search results. |

## ProcessInstanceSearchQuerySortRequest

ProcessInstanceSearchQuerySortRequest

```csharp
public sealed class ProcessInstanceSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## ProcessInstanceSequenceFlowResult

Process instance sequence flow result.

```csharp
public sealed class ProcessInstanceSequenceFlowResult
```

| Property                 | Type                           | Description                                                                                                                                                                                                                                 |
| ------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SequenceFlowId`         | `String`                       | The sequence flow id.                                                                                                                                                                                                                       |
| `ProcessInstanceKey`     | `ProcessInstanceKey`           | The key of this process instance.                                                                                                                                                                                                           |
| `RootProcessInstanceKey` | `Nullable<ProcessInstanceKey>` | The key of the root process instance. The root process instance is the top-level ancestor in the process instance hierarchy. This field is only present for data belonging to process instance hierarchies created in version 8.9 or later. |
| `ProcessDefinitionKey`   | `ProcessDefinitionKey`         | The process definition key.                                                                                                                                                                                                                 |
| `ProcessDefinitionId`    | `ProcessDefinitionId`          | The process definition id.                                                                                                                                                                                                                  |
| `ElementId`              | `ElementId`                    | The element id for this sequence flow, as provided in the BPMN process.                                                                                                                                                                     |
| `TenantId`               | `TenantId`                     | The unique identifier of the tenant.                                                                                                                                                                                                        |

## ProcessInstanceSequenceFlowsQueryResult

Process instance sequence flows query response.

```csharp
public sealed class ProcessInstanceSequenceFlowsQueryResult
```

| Property | Type                                      | Description         |
| -------- | ----------------------------------------- | ------------------- |
| `Items`  | `List<ProcessInstanceSequenceFlowResult>` | The sequence flows. |

## ProcessInstanceStateExactMatch

Matches the value exactly.

```csharp
public readonly record struct ProcessInstanceStateExactMatch : ICamundaKey, IEquatable<ProcessInstanceStateExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## ProcessInstanceStateFilterProperty

ProcessInstanceStateEnum property with full advanced search capabilities.

```csharp
public sealed class ProcessInstanceStateFilterProperty
```

## ResourceKeyExactMatch

Matches the value exactly.

```csharp
public readonly record struct ResourceKeyExactMatch : ICamundaKey, IEquatable<ResourceKeyExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## ResourceKeyFilterProperty

ResourceKey property with full advanced search capabilities.

```csharp
public sealed class ResourceKeyFilterProperty
```

## ResourceResult

ResourceResult

```csharp
public sealed class ResourceResult
```

| Property       | Type          | Description                                            |
| -------------- | ------------- | ------------------------------------------------------ |
| `ResourceName` | `String`      | The resource name from which this resource was parsed. |
| `Version`      | `Int32`       | The assigned resource version.                         |
| `VersionTag`   | `String`      | The version tag of this resource.                      |
| `ResourceId`   | `String`      | The resource ID of this resource.                      |
| `TenantId`     | `TenantId`    | The tenant ID of this resource.                        |
| `ResourceKey`  | `ResourceKey` | The unique key of this resource.                       |

## RetryDecision

```csharp
public readonly record struct RetryDecision : IEquatable<RetryDecision>
```

| Property    | Type      | Description |
| ----------- | --------- | ----------- |
| `Retryable` | `Boolean` |             |
| `Reason`    | `String`  |             |

## RoleClientResult

RoleClientResult

```csharp
public sealed class RoleClientResult
```

| Property   | Type     | Description           |
| ---------- | -------- | --------------------- |
| `ClientId` | `String` | The ID of the client. |

## RoleClientSearchQueryRequest

RoleClientSearchQueryRequest

```csharp
public sealed class RoleClientSearchQueryRequest
```

| Property | Type                                     | Description          |
| -------- | ---------------------------------------- | -------------------- |
| `Sort`   | `List<RoleClientSearchQuerySortRequest>` | Sort field criteria. |
| `Page`   | `SearchQueryPageRequest`                 | Pagination criteria. |

## RoleClientSearchQuerySortRequest

RoleClientSearchQuerySortRequest

```csharp
public sealed class RoleClientSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## RoleClientSearchResult

RoleClientSearchResult

```csharp
public sealed class RoleClientSearchResult
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<RoleClientResult>`  | The matching clients.                            |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## RoleCreateRequest

RoleCreateRequest

```csharp
public sealed class RoleCreateRequest
```

| Property      | Type     | Description                       |
| ------------- | -------- | --------------------------------- |
| `RoleId`      | `String` | The ID of the new role.           |
| `Name`        | `String` | The display name of the new role. |
| `Description` | `String` | The description of the new role.  |

## RoleCreateResult

RoleCreateResult

```csharp
public sealed class RoleCreateResult
```

| Property      | Type     | Description                           |
| ------------- | -------- | ------------------------------------- |
| `RoleId`      | `String` | The ID of the created role.           |
| `Name`        | `String` | The display name of the created role. |
| `Description` | `String` | The description of the created role.  |

## RoleFilter

Role filter request

```csharp
public sealed class RoleFilter
```

| Property | Type     | Description                   |
| -------- | -------- | ----------------------------- |
| `RoleId` | `String` | The role ID search filters.   |
| `Name`   | `String` | The role name search filters. |

## RoleGroupResult

RoleGroupResult

```csharp
public sealed class RoleGroupResult
```

| Property  | Type     | Description          |
| --------- | -------- | -------------------- |
| `GroupId` | `String` | The id of the group. |

## RoleGroupSearchQueryRequest

RoleGroupSearchQueryRequest

```csharp
public sealed class RoleGroupSearchQueryRequest
```

| Property | Type                                    | Description          |
| -------- | --------------------------------------- | -------------------- |
| `Sort`   | `List<RoleGroupSearchQuerySortRequest>` | Sort field criteria. |
| `Page`   | `SearchQueryPageRequest`                | Pagination criteria. |

## RoleGroupSearchQuerySortRequest

RoleGroupSearchQuerySortRequest

```csharp
public sealed class RoleGroupSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## RoleGroupSearchResult

RoleGroupSearchResult

```csharp
public sealed class RoleGroupSearchResult
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<RoleGroupResult>`   | The matching groups.                             |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## RoleMappingRuleSearchResult

RoleMappingRuleSearchResult

```csharp
public sealed class RoleMappingRuleSearchResult
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<MappingRuleResult>` | The matching mapping rules.                      |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## RoleResult

Role search response item.

```csharp
public sealed class RoleResult
```

| Property      | Type     | Description                  |
| ------------- | -------- | ---------------------------- |
| `Name`        | `String` | The role name.               |
| `RoleId`      | `String` | The role id.                 |
| `Description` | `String` | The description of the role. |

## RoleSearchQueryRequest

Role search request.

```csharp
public sealed class RoleSearchQueryRequest
```

| Property | Type                               | Description              |
| -------- | ---------------------------------- | ------------------------ |
| `Sort`   | `List<RoleSearchQuerySortRequest>` | Sort field criteria.     |
| `Filter` | `RoleFilter`                       | The role search filters. |
| `Page`   | `SearchQueryPageRequest`           | Pagination criteria.     |

## RoleSearchQueryResult

Role search response.

```csharp
public sealed class RoleSearchQueryResult
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<RoleResult>`        | The matching roles.                              |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## RoleSearchQuerySortRequest

RoleSearchQuerySortRequest

```csharp
public sealed class RoleSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## RoleUpdateRequest

RoleUpdateRequest

```csharp
public sealed class RoleUpdateRequest
```

| Property      | Type     | Description                       |
| ------------- | -------- | --------------------------------- |
| `Name`        | `String` | The display name of the new role. |
| `Description` | `String` | The description of the new role.  |

## RoleUpdateResult

RoleUpdateResult

```csharp
public sealed class RoleUpdateResult
```

| Property      | Type     | Description                           |
| ------------- | -------- | ------------------------------------- |
| `Name`        | `String` | The display name of the updated role. |
| `Description` | `String` | The description of the updated role.  |
| `RoleId`      | `String` | The ID of the updated role.           |

## RoleUserResult

RoleUserResult

```csharp
public sealed class RoleUserResult
```

| Property   | Type       | Description                |
| ---------- | ---------- | -------------------------- |
| `Username` | `Username` | The unique name of a user. |

## RoleUserSearchQueryRequest

RoleUserSearchQueryRequest

```csharp
public sealed class RoleUserSearchQueryRequest
```

| Property | Type                                   | Description          |
| -------- | -------------------------------------- | -------------------- |
| `Sort`   | `List<RoleUserSearchQuerySortRequest>` | Sort field criteria. |
| `Page`   | `SearchQueryPageRequest`               | Pagination criteria. |

## RoleUserSearchQuerySortRequest

RoleUserSearchQuerySortRequest

```csharp
public sealed class RoleUserSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## RoleUserSearchResult

RoleUserSearchResult

```csharp
public sealed class RoleUserSearchResult
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<RoleUserResult>`    | The matching users.                              |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## ScopeKeyExactMatch

Matches the value exactly.

```csharp
public readonly record struct ScopeKeyExactMatch : ICamundaKey, IEquatable<ScopeKeyExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## ScopeKeyFilterProperty

ScopeKey property with full advanced search capabilities. Filter by the key of the
element instance or process instance that defines the scope of a variable.

```csharp
public sealed class ScopeKeyFilterProperty
```

## SearchClientsForGroupRequest

SearchClientsForGroupRequest

```csharp
public sealed class SearchClientsForGroupRequest
```

| Property | Type                                   | Description          |
| -------- | -------------------------------------- | -------------------- |
| `Sort`   | `List<AuditLogSearchQuerySortRequest>` | Sort field criteria. |
| `Page`   | `SearchQueryPageRequest`               | Pagination criteria. |

## SearchClientsForGroupResponse

SearchClientsForGroupResponse

```csharp
public sealed class SearchClientsForGroupResponse
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<GroupClientResult>` | The matching client IDs.                         |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## SearchClientsForRoleRequest

SearchClientsForRoleRequest

```csharp
public sealed class SearchClientsForRoleRequest
```

| Property | Type                                   | Description          |
| -------- | -------------------------------------- | -------------------- |
| `Sort`   | `List<AuditLogSearchQuerySortRequest>` | Sort field criteria. |
| `Page`   | `SearchQueryPageRequest`               | Pagination criteria. |

## SearchClientsForRoleResponse

SearchClientsForRoleResponse

```csharp
public sealed class SearchClientsForRoleResponse
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<GroupClientResult>` | The matching clients.                            |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## SearchClientsForTenantRequest

SearchClientsForTenantRequest

```csharp
public sealed class SearchClientsForTenantRequest
```

| Property | Type                                   | Description          |
| -------- | -------------------------------------- | -------------------- |
| `Sort`   | `List<AuditLogSearchQuerySortRequest>` | Sort field criteria. |
| `Page`   | `SearchQueryPageRequest`               | Pagination criteria. |

## SearchClientsForTenantResponse

SearchClientsForTenantResponse

```csharp
public sealed class SearchClientsForTenantResponse
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<GroupClientResult>` | The matching clients.                            |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## SearchMappingRuleResponse

SearchMappingRuleResponse

```csharp
public sealed class SearchMappingRuleResponse
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<MappingRuleResult>` | The matching mapping rules.                      |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## SearchMappingRulesForGroupResponse

SearchMappingRulesForGroupResponse

```csharp
public sealed class SearchMappingRulesForGroupResponse
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<MappingRuleResult>` | The matching mapping rules.                      |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## SearchMappingRulesForRoleResponse

SearchMappingRulesForRoleResponse

```csharp
public sealed class SearchMappingRulesForRoleResponse
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<MappingRuleResult>` | The matching mapping rules.                      |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## SearchMappingRulesForTenantResponse

SearchMappingRulesForTenantResponse

```csharp
public sealed class SearchMappingRulesForTenantResponse
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<MappingRuleResult>` | The matching mapping rules.                      |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## SearchQueryPageRequest

Pagination criteria. Can use offset-based pagination (from/limit) OR cursor-based pagination (after/before + limit), but not both.

```csharp
public abstract class SearchQueryPageRequest
```

## SearchQueryPageResponse

Pagination information about the search results.

```csharp
public sealed class SearchQueryPageResponse
```

| Property            | Type                    | Description                                                                                                                                                                                         |
| ------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TotalItems`        | `Int64`                 | Total items matching the criteria.                                                                                                                                                                  |
| `HasMoreTotalItems` | `Boolean`               | Indicates whether the `totalItems` value has been capped due to system limits. When true, `totalItems` is a lower bound and the actual number of matching items is greater than the reported value. |
| `StartCursor`       | `Nullable<StartCursor>` | The cursor value for getting the previous page of results. Use this in the `before` field of an ensuing request.                                                                                    |
| `EndCursor`         | `Nullable<EndCursor>`   | The cursor value for getting the next page of results. Use this in the `after` field of an ensuing request.                                                                                         |

## SearchQueryRequest

SearchQueryRequest

```csharp
public sealed class SearchQueryRequest
```

| Property | Type                     | Description          |
| -------- | ------------------------ | -------------------- |
| `Page`   | `SearchQueryPageRequest` | Pagination criteria. |

## SearchQueryResponse

SearchQueryResponse

```csharp
public sealed class SearchQueryResponse
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## SearchRolesForGroupResponse

SearchRolesForGroupResponse

```csharp
public sealed class SearchRolesForGroupResponse
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<RoleResult>`        | The matching roles.                              |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## SearchRolesForTenantResponse

SearchRolesForTenantResponse

```csharp
public sealed class SearchRolesForTenantResponse
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<RoleResult>`        | The matching roles.                              |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## SearchUserTaskVariablesRequest

User task search query request.

```csharp
public sealed class SearchUserTaskVariablesRequest
```

| Property | Type                                   | Description                            |
| -------- | -------------------------------------- | -------------------------------------- |
| `Sort`   | `List<AuditLogSearchQuerySortRequest>` | Sort field criteria.                   |
| `Filter` | `UserTaskVariableFilter`               | The user task variable search filters. |
| `Page`   | `SearchQueryPageRequest`               | Pagination criteria.                   |

## SearchUsersForGroupRequest

SearchUsersForGroupRequest

```csharp
public sealed class SearchUsersForGroupRequest
```

| Property | Type                                   | Description          |
| -------- | -------------------------------------- | -------------------- |
| `Sort`   | `List<AuditLogSearchQuerySortRequest>` | Sort field criteria. |
| `Page`   | `SearchQueryPageRequest`               | Pagination criteria. |

## SearchUsersForGroupResponse

SearchUsersForGroupResponse

```csharp
public sealed class SearchUsersForGroupResponse
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<GroupUserResult>`   | The matching members.                            |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## SearchUsersForRoleRequest

SearchUsersForRoleRequest

```csharp
public sealed class SearchUsersForRoleRequest
```

| Property | Type                                   | Description          |
| -------- | -------------------------------------- | -------------------- |
| `Sort`   | `List<AuditLogSearchQuerySortRequest>` | Sort field criteria. |
| `Page`   | `SearchQueryPageRequest`               | Pagination criteria. |

## SearchUsersForRoleResponse

SearchUsersForRoleResponse

```csharp
public sealed class SearchUsersForRoleResponse
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<GroupUserResult>`   | The matching users.                              |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## SearchUsersForTenantRequest

SearchUsersForTenantRequest

```csharp
public sealed class SearchUsersForTenantRequest
```

| Property | Type                                   | Description          |
| -------- | -------------------------------------- | -------------------- |
| `Sort`   | `List<AuditLogSearchQuerySortRequest>` | Sort field criteria. |
| `Page`   | `SearchQueryPageRequest`               | Pagination criteria. |

## SearchUsersForTenantResponse

SearchUsersForTenantResponse

```csharp
public sealed class SearchUsersForTenantResponse
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<GroupUserResult>`   | The matching users.                              |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## SearchUsersResponse

SearchUsersResponse

```csharp
public sealed class SearchUsersResponse
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<UserCreateResult>`  | The matching users.                              |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## SearchVariablesRequest

Variable search query request.

```csharp
public sealed class SearchVariablesRequest
```

| Property | Type                                   | Description                  |
| -------- | -------------------------------------- | ---------------------------- |
| `Sort`   | `List<AuditLogSearchQuerySortRequest>` | Sort field criteria.         |
| `Filter` | `VariableFilter`                       | The variable search filters. |
| `Page`   | `SearchQueryPageRequest`               | Pagination criteria.         |

## SetVariableRequest

SetVariableRequest

```csharp
public sealed class SetVariableRequest
```

| Property             | Type                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Variables`          | `Object`                       | JSON object representing the variables to set in the element’s scope.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `Local`              | `Nullable<Boolean>`            | If set to `true`, the variables are merged strictly into the local scope (as specified by the `elementInstanceKey`). Otherwise, the variables are propagated to upper scopes and set at the outermost one. Let's consider the following example: There are two scopes '1' and '2'. Scope '1' is the parent scope of '2'. The effective variables of the scopes are: 1 =&gt; { "foo" : 2 } 2 =&gt; { "bar" : 1 } An update request with elementInstanceKey as '2', variables { "foo": 5 }, and local set to `true` leaves scope '1' unchanged and adjusts scope '2' to { "bar": 1, "foo": 5 }. By default, with local set to `false`, scope '1' will be { "foo": 5 } and scope '2' will be { "bar": 1 }. |
| `OperationReference` | `Nullable<OperationReference>` | A reference key chosen by the user that will be part of all records resulting from this operation. Must be &gt; 0 if provided.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

## SignalBroadcastRequest

SignalBroadcastRequest

```csharp
public sealed class SignalBroadcastRequest : ITenantIdSettable
```

| Property     | Type                 | Description                                |
| ------------ | -------------------- | ------------------------------------------ |
| `SignalName` | `String`             | The name of the signal to broadcast.       |
| `Variables`  | `Object`             | The signal variables as a JSON object.     |
| `TenantId`   | `Nullable<TenantId>` | The ID of the tenant that owns the signal. |

## SignalBroadcastResult

SignalBroadcastResult

```csharp
public sealed class SignalBroadcastResult
```

| Property    | Type        | Description                                     |
| ----------- | ----------- | ----------------------------------------------- |
| `TenantId`  | `TenantId`  | The tenant ID of the signal that was broadcast. |
| `SignalKey` | `SignalKey` | The key of the broadcasted signal.              |

## SourceElementIdInstruction

Defines an instruction with a sourceElementId. The move instruction with this sourceType will terminate all active element
instances with the sourceElementId and activate a new element instance for each terminated
one at targetElementId.

```csharp
public sealed class SourceElementIdInstruction : SourceElementInstruction
```

| Property          | Type        | Description                                            |
| ----------------- | ----------- | ------------------------------------------------------ |
| `SourceType`      | `String`    | The type of source element instruction.                |
| `SourceElementId` | `ElementId` | The id of the source element for the move instruction. |

## SourceElementInstanceKeyInstruction

Defines an instruction with a sourceElementInstanceKey. The move instruction with this sourceType will terminate one active element
instance with the sourceElementInstanceKey and activate a new element instance at targetElementId.

```csharp
public sealed class SourceElementInstanceKeyInstruction : SourceElementInstruction
```

| Property                   | Type                 | Description                                               |
| -------------------------- | -------------------- | --------------------------------------------------------- |
| `SourceType`               | `String`             | The type of source element instruction.                   |
| `SourceElementInstanceKey` | `ElementInstanceKey` | The source element instance key for the move instruction. |

## SourceElementInstruction

Defines the source element identifier for the move instruction. It can either be a sourceElementId, or sourceElementInstanceKey.

```csharp
public abstract class SourceElementInstruction
```

## StartCursor

The start cursor in a search query result set.

```csharp
public readonly record struct StartCursor : ICamundaKey, IEquatable<StartCursor>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## StatusMetric

Metric for a single job status.

```csharp
public sealed class StatusMetric
```

| Property        | Type                       | Description                                            |
| --------------- | -------------------------- | ------------------------------------------------------ |
| `Count`         | `Int64`                    | Number of jobs in this status.                         |
| `LastUpdatedAt` | `Nullable<DateTimeOffset>` | ISO 8601 timestamp of the last update for this status. |

## StopResult

Result of a call.

```csharp
public readonly record struct StopResult : IEquatable<StopResult>
```

| Property        | Type      | Description                                                   |
| --------------- | --------- | ------------------------------------------------------------- |
| `RemainingJobs` | `Int32`   | Number of jobs still in-flight when stop completed.           |
| `TimedOut`      | `Boolean` | Whether the grace period was exceeded with jobs still active. |

## StringFilterProperty

String property with full advanced search capabilities.

```csharp
public sealed class StringFilterProperty
```

## SystemConfigurationResponse

Envelope for all system configuration sections. Each property
represents a feature area.

```csharp
public sealed class SystemConfigurationResponse
```

| Property     | Type                              | Description                                          |
| ------------ | --------------------------------- | ---------------------------------------------------- |
| `JobMetrics` | `JobMetricsConfigurationResponse` | Configuration for job metrics collection and export. |

## Tag

A tag. Needs to start with a letter; then alphanumerics, `_`, `-`, `:`, or `.`; length ≤ 100.

```csharp
public readonly record struct Tag : ICamundaKey, IEquatable<Tag>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## TenantClientResult

TenantClientResult

```csharp
public sealed class TenantClientResult
```

| Property   | Type     | Description           |
| ---------- | -------- | --------------------- |
| `ClientId` | `String` | The ID of the client. |

## TenantClientSearchQueryRequest

TenantClientSearchQueryRequest

```csharp
public sealed class TenantClientSearchQueryRequest
```

| Property | Type                                       | Description          |
| -------- | ------------------------------------------ | -------------------- |
| `Sort`   | `List<TenantClientSearchQuerySortRequest>` | Sort field criteria. |
| `Page`   | `SearchQueryPageRequest`                   | Pagination criteria. |

## TenantClientSearchQuerySortRequest

TenantClientSearchQuerySortRequest

```csharp
public sealed class TenantClientSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## TenantClientSearchResult

TenantClientSearchResult

```csharp
public sealed class TenantClientSearchResult
```

| Property | Type                       | Description                                      |
| -------- | -------------------------- | ------------------------------------------------ |
| `Items`  | `List<TenantClientResult>` | The matching clients.                            |
| `Page`   | `SearchQueryPageResponse`  | Pagination information about the search results. |

## TenantCreateRequest

TenantCreateRequest

```csharp
public sealed class TenantCreateRequest
```

| Property      | Type     | Description                                                                                                            |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `TenantId`    | `String` | The unique ID for the tenant. Must be 255 characters or less. Can contain letters, numbers, [`_`, `-`, `+`, `.`, `@`]. |
| `Name`        | `String` | The name of the tenant.                                                                                                |
| `Description` | `String` | The description of the tenant.                                                                                         |

## TenantCreateResult

TenantCreateResult

```csharp
public sealed class TenantCreateResult
```

| Property      | Type       | Description                          |
| ------------- | ---------- | ------------------------------------ |
| `TenantId`    | `TenantId` | The unique identifier of the tenant. |
| `Name`        | `String`   | The name of the tenant.              |
| `Description` | `String`   | The description of the tenant.       |

## TenantFilter

Tenant filter request

```csharp
public sealed class TenantFilter
```

| Property   | Type                 | Description                          |
| ---------- | -------------------- | ------------------------------------ |
| `TenantId` | `Nullable<TenantId>` | The unique identifier of the tenant. |
| `Name`     | `String`             | The name of the tenant.              |

## TenantGroupResult

TenantGroupResult

```csharp
public sealed class TenantGroupResult
```

| Property  | Type     | Description               |
| --------- | -------- | ------------------------- |
| `GroupId` | `String` | The groupId of the group. |

## TenantGroupSearchQueryRequest

TenantGroupSearchQueryRequest

```csharp
public sealed class TenantGroupSearchQueryRequest
```

| Property | Type                                      | Description          |
| -------- | ----------------------------------------- | -------------------- |
| `Sort`   | `List<TenantGroupSearchQuerySortRequest>` | Sort field criteria. |
| `Page`   | `SearchQueryPageRequest`                  | Pagination criteria. |

## TenantGroupSearchQuerySortRequest

TenantGroupSearchQuerySortRequest

```csharp
public sealed class TenantGroupSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## TenantGroupSearchResult

TenantGroupSearchResult

```csharp
public sealed class TenantGroupSearchResult
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<TenantGroupResult>` | The matching groups.                             |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## TenantId

The unique identifier of the tenant.

```csharp
public readonly record struct TenantId : ICamundaKey, IEquatable<TenantId>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## TenantMappingRuleSearchResult

TenantMappingRuleSearchResult

```csharp
public sealed class TenantMappingRuleSearchResult
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<MappingRuleResult>` | The matching mapping rules.                      |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## TenantResult

Tenant search response item.

```csharp
public sealed class TenantResult
```

| Property      | Type       | Description                          |
| ------------- | ---------- | ------------------------------------ |
| `Name`        | `String`   | The tenant name.                     |
| `TenantId`    | `TenantId` | The unique identifier of the tenant. |
| `Description` | `String`   | The tenant description.              |

## TenantRoleSearchResult

TenantRoleSearchResult

```csharp
public sealed class TenantRoleSearchResult
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<RoleResult>`        | The matching roles.                              |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## TenantSearchQueryRequest

Tenant search request

```csharp
public sealed class TenantSearchQueryRequest
```

| Property | Type                                 | Description                |
| -------- | ------------------------------------ | -------------------------- |
| `Sort`   | `List<TenantSearchQuerySortRequest>` | Sort field criteria.       |
| `Filter` | `TenantFilter`                       | The tenant search filters. |
| `Page`   | `SearchQueryPageRequest`             | Pagination criteria.       |

## TenantSearchQueryResult

Tenant search response.

```csharp
public sealed class TenantSearchQueryResult
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<TenantResult>`      | The matching tenants.                            |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## TenantSearchQuerySortRequest

TenantSearchQuerySortRequest

```csharp
public sealed class TenantSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## TenantUpdateRequest

TenantUpdateRequest

```csharp
public sealed class TenantUpdateRequest
```

| Property      | Type     | Description                        |
| ------------- | -------- | ---------------------------------- |
| `Name`        | `String` | The new name of the tenant.        |
| `Description` | `String` | The new description of the tenant. |

## TenantUpdateResult

TenantUpdateResult

```csharp
public sealed class TenantUpdateResult
```

| Property      | Type       | Description                          |
| ------------- | ---------- | ------------------------------------ |
| `TenantId`    | `TenantId` | The unique identifier of the tenant. |
| `Name`        | `String`   | The name of the tenant.              |
| `Description` | `String`   | The description of the tenant.       |

## TenantUserResult

TenantUserResult

```csharp
public sealed class TenantUserResult
```

| Property   | Type       | Description                |
| ---------- | ---------- | -------------------------- |
| `Username` | `Username` | The unique name of a user. |

## TenantUserSearchQueryRequest

TenantUserSearchQueryRequest

```csharp
public sealed class TenantUserSearchQueryRequest
```

| Property | Type                                     | Description          |
| -------- | ---------------------------------------- | -------------------- |
| `Sort`   | `List<TenantUserSearchQuerySortRequest>` | Sort field criteria. |
| `Page`   | `SearchQueryPageRequest`                 | Pagination criteria. |

## TenantUserSearchQuerySortRequest

TenantUserSearchQuerySortRequest

```csharp
public sealed class TenantUserSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## TenantUserSearchResult

TenantUserSearchResult

```csharp
public sealed class TenantUserSearchResult
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<TenantUserResult>`  | The matching users.                              |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## TopologyResponse

The response of a topology request.

```csharp
public sealed class TopologyResponse
```

| Property                | Type               | Description                                             |
| ----------------------- | ------------------ | ------------------------------------------------------- |
| `Brokers`               | `List<BrokerInfo>` | A list of brokers that are part of this cluster.        |
| `ClusterId`             | `String`           | The cluster Id.                                         |
| `ClusterSize`           | `Int32`            | The number of brokers in the cluster.                   |
| `PartitionsCount`       | `Int32`            | The number of partitions are spread across the cluster. |
| `ReplicationFactor`     | `Int32`            | The configured replication factor for this cluster.     |
| `GatewayVersion`        | `String`           | The version of the Zeebe Gateway.                       |
| `LastCompletedChangeId` | `String`           | ID of the last completed change                         |

## TypedVariables

Extension methods for deserializing Camunda variable and custom header payloads
from untyped object properties into strongly-typed DTOs.

Camunda API responses return variables and customHeaders as
object properties which, at runtime, are values.
These extensions let you opt in to typed deserialization:

// Define your domain DTO
public record OrderVars(string OrderId, decimal Amount);

// Deserialize variables from a process instance result
var result = await client.CreateProcessInstanceAsync(
new ProcessInstanceCreationInstructionById
{
ProcessDefinitionId = ProcessDefinitionId.AssumeExists("order-process"),
Variables = new OrderVars("ord-123", 99.99m), // input: just assign your DTO
});

var vars = result.Variables.DeserializeAs&lt;OrderVars&gt;(); // output: typed extraction

For input (sending variables), simply assign your DTO to the Variables
property — System.Text.Json serializes the runtime type automatically.

For output (receiving variables), call on the
Variables or CustomHeaders property to deserialize the underlying
into your DTO type.

```csharp
public static class TypedVariables
```

## UpdateClusterVariableRequest

UpdateClusterVariableRequest

```csharp
public sealed class UpdateClusterVariableRequest
```

| Property | Type     | Description                                                                                                                         |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `Value`  | `Object` | The new value of the cluster variable. Can be any JSON object or primitive value. Will be serialized as a JSON string in responses. |

## UpdateGlobalTaskListenerRequest

UpdateGlobalTaskListenerRequest

```csharp
public sealed class UpdateGlobalTaskListenerRequest
```

| Property         | Type                                    | Description                                                                                                     |
| ---------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `EventTypes`     | `List<GlobalTaskListenerEventTypeEnum>` | List of user task event types that trigger the listener.                                                        |
| `Type`           | `String`                                | The name of the job type, used as a reference to specify which job workers request the respective listener job. |
| `Retries`        | `Nullable<Int32>`                       | Number of retries for the listener job.                                                                         |
| `AfterNonGlobal` | `Nullable<Boolean>`                     | Whether the listener should run after model-level listeners.                                                    |
| `Priority`       | `Nullable<Int32>`                       | The priority of the listener. Higher priority listeners are executed before lower priority ones.                |

## UpdateMappingRuleResponse

UpdateMappingRuleResponse

```csharp
public sealed class UpdateMappingRuleResponse
```

| Property        | Type     | Description                        |
| --------------- | -------- | ---------------------------------- |
| `ClaimName`     | `String` | The name of the claim to map.      |
| `ClaimValue`    | `String` | The value of the claim to map.     |
| `Name`          | `String` | The name of the mapping rule.      |
| `MappingRuleId` | `String` | The unique ID of the mapping rule. |

## UpdateUserResponse

UpdateUserResponse

```csharp
public sealed class UpdateUserResponse
```

| Property   | Type       | Description                |
| ---------- | ---------- | -------------------------- |
| `Username` | `Username` | The unique name of a user. |
| `Name`     | `String`   | The name of the user.      |
| `Email`    | `String`   | The email of the user.     |

## UsageMetricsResponse

UsageMetricsResponse

```csharp
public sealed class UsageMetricsResponse
```

| Property            | Type                 | Description                                                                                       |
| ------------------- | -------------------- | ------------------------------------------------------------------------------------------------- |
| `ActiveTenants`     | `Int64`              | The amount of active tenants.                                                                     |
| `Tenants`           | `Dictionary<Object>` | The usage metrics by tenants. Only available if request `withTenants` query parameter was `true`. |
| `ProcessInstances`  | `Int64`              | The amount of created root process instances.                                                     |
| `DecisionInstances` | `Int64`              | The amount of executed decision instances.                                                        |
| `Assignees`         | `Int64`              | The amount of unique active task users.                                                           |

## UsageMetricsResponseItem

UsageMetricsResponseItem

```csharp
public sealed class UsageMetricsResponseItem
```

| Property            | Type    | Description                                   |
| ------------------- | ------- | --------------------------------------------- |
| `ProcessInstances`  | `Int64` | The amount of created root process instances. |
| `DecisionInstances` | `Int64` | The amount of executed decision instances.    |
| `Assignees`         | `Int64` | The amount of unique active task users.       |

## UseSourceParentKeyInstruction

Instructs the engine to use the source's direct parent key as the ancestor scope key for the target element. This is a simpler alternative to `inferred` that skips hierarchy traversal and directly uses the source's parent key. This is useful when the source and target elements are siblings within the same flow scope.

```csharp
public sealed class UseSourceParentKeyInstruction : AncestorScopeInstruction
```

| Property            | Type     | Description                             |
| ------------------- | -------- | --------------------------------------- |
| `AncestorScopeType` | `String` | The type of ancestor scope instruction. |

## UserCreateResult

UserCreateResult

```csharp
public sealed class UserCreateResult
```

| Property   | Type       | Description                |
| ---------- | ---------- | -------------------------- |
| `Username` | `Username` | The unique name of a user. |
| `Name`     | `String`   | The name of the user.      |
| `Email`    | `String`   | The email of the user.     |

## UserFilter

User search filter.

```csharp
public sealed class UserFilter
```

| Property   | Type                   | Description               |
| ---------- | ---------------------- | ------------------------- |
| `Username` | `StringFilterProperty` | The username of the user. |
| `Name`     | `StringFilterProperty` | The name of the user.     |
| `Email`    | `StringFilterProperty` | The email of the user.    |

## UserRequest

UserRequest

```csharp
public sealed class UserRequest
```

| Property   | Type     | Description               |
| ---------- | -------- | ------------------------- |
| `Password` | `String` | The password of the user. |
| `Username` | `String` | The username of the user. |
| `Name`     | `String` | The name of the user.     |
| `Email`    | `String` | The email of the user.    |

## UserResult

UserResult

```csharp
public sealed class UserResult
```

| Property   | Type       | Description                |
| ---------- | ---------- | -------------------------- |
| `Username` | `Username` | The unique name of a user. |
| `Name`     | `String`   | The name of the user.      |
| `Email`    | `String`   | The email of the user.     |

## UserSearchQueryRequest

UserSearchQueryRequest

```csharp
public sealed class UserSearchQueryRequest
```

| Property | Type                               | Description              |
| -------- | ---------------------------------- | ------------------------ |
| `Sort`   | `List<UserSearchQuerySortRequest>` | Sort field criteria.     |
| `Filter` | `UserFilter`                       | The user search filters. |
| `Page`   | `SearchQueryPageRequest`           | Pagination criteria.     |

## UserSearchQuerySortRequest

UserSearchQuerySortRequest

```csharp
public sealed class UserSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## UserSearchResult

UserSearchResult

```csharp
public sealed class UserSearchResult
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<UserResult>`        | The matching users.                              |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## UserTaskAssignmentRequest

UserTaskAssignmentRequest

```csharp
public sealed class UserTaskAssignmentRequest
```

| Property        | Type                | Description                                                                                                                                                                                                                                                               |
| --------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Assignee`      | `String`            | The assignee for the user task. The assignee must not be empty or `null`.                                                                                                                                                                                                 |
| `AllowOverride` | `Nullable<Boolean>` | By default, the task is reassigned if it was already assigned. Set this to `false` to return an error in such cases. The task must then first be unassigned to be assigned again. Use this when you have users picking from group task queues to prevent race conditions. |
| `Action`        | `String`            | A custom action value that will be accessible from user task events resulting from this endpoint invocation. If not provided, it will default to "assign".                                                                                                                |

## UserTaskAuditLogFilter

The user task audit log search filters.

```csharp
public sealed class UserTaskAuditLogFilter
```

| Property        | Type                              | Description                                 |
| --------------- | --------------------------------- | ------------------------------------------- |
| `OperationType` | `OperationTypeFilterProperty`     | The audit log operation type search filter. |
| `Result`        | `AuditLogResultFilterProperty`    | The audit log result search filter.         |
| `Timestamp`     | `DateTimeFilterProperty`          | The audit log timestamp filter.             |
| `ActorType`     | `AuditLogActorTypeFilterProperty` | The actor type search filter.               |
| `ActorId`       | `StringFilterProperty`            | The actor ID search filter.                 |

## UserTaskAuditLogSearchQueryRequest

User task search query request.

```csharp
public sealed class UserTaskAuditLogSearchQueryRequest
```

| Property | Type                                   | Description                             |
| -------- | -------------------------------------- | --------------------------------------- |
| `Sort`   | `List<AuditLogSearchQuerySortRequest>` | Sort field criteria.                    |
| `Filter` | `UserTaskAuditLogFilter`               | The user task audit log search filters. |
| `Page`   | `SearchQueryPageRequest`               | Pagination criteria.                    |

## UserTaskCompletionRequest

UserTaskCompletionRequest

```csharp
public sealed class UserTaskCompletionRequest
```

| Property    | Type     | Description                                                                                                                                                  |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Variables` | `Object` | The variables to complete the user task with.                                                                                                                |
| `Action`    | `String` | A custom action value that will be accessible from user task events resulting from this endpoint invocation. If not provided, it will default to "complete". |

## UserTaskFilter

User task filter request.

```csharp
public sealed class UserTaskFilter
```

| Property                   | Type                                | Description                                                                                                                                      |
| -------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `State`                    | `UserTaskStateFilterProperty`       | The user task state.                                                                                                                             |
| `Assignee`                 | `StringFilterProperty`              | The assignee of the user task.                                                                                                                   |
| `Priority`                 | `IntegerFilterProperty`             | The priority of the user task.                                                                                                                   |
| `ElementId`                | `Nullable<ElementId>`               | The element ID of the user task.                                                                                                                 |
| `Name`                     | `StringFilterProperty`              | The task name. This only works for data created with 8.8 and onwards. Instances from prior versions don't contain this data and cannot be found. |
| `CandidateGroup`           | `StringFilterProperty`              | The candidate group for this user task.                                                                                                          |
| `CandidateUser`            | `StringFilterProperty`              | The candidate user for this user task.                                                                                                           |
| `TenantId`                 | `StringFilterProperty`              | Tenant ID of this user task.                                                                                                                     |
| `ProcessDefinitionId`      | `Nullable<ProcessDefinitionId>`     | The ID of the process definition.                                                                                                                |
| `CreationDate`             | `DateTimeFilterProperty`            | The user task creation date.                                                                                                                     |
| `CompletionDate`           | `DateTimeFilterProperty`            | The user task completion date.                                                                                                                   |
| `FollowUpDate`             | `DateTimeFilterProperty`            | The user task follow-up date.                                                                                                                    |
| `DueDate`                  | `DateTimeFilterProperty`            | The user task due date.                                                                                                                          |
| `ProcessInstanceVariables` | `List<VariableValueFilterProperty>` | The variables of the process instance.                                                                                                           |
| `LocalVariables`           | `List<VariableValueFilterProperty>` | The local variables of the user task.                                                                                                            |
| `UserTaskKey`              | `Nullable<UserTaskKey>`             | The key for this user task.                                                                                                                      |
| `ProcessDefinitionKey`     | `Nullable<ProcessDefinitionKey>`    | The key of the process definition.                                                                                                               |
| `ProcessInstanceKey`       | `Nullable<ProcessInstanceKey>`      | The key of the process instance.                                                                                                                 |
| `ElementInstanceKey`       | `Nullable<ElementInstanceKey>`      | The key of the element instance.                                                                                                                 |
| `Tags`                     | `List<Tag>`                         | List of tags. Tags need to start with a letter; then alphanumerics, `_`, `-`, `:`, or `.`; length ≤ 100.                                         |

## UserTaskProperties

Contains properties of a user task.

```csharp
public sealed class UserTaskProperties
```

| Property            | Type                    | Description                                             |
| ------------------- | ----------------------- | ------------------------------------------------------- |
| `Action`            | `String`                | The action performed on the user task.                  |
| `Assignee`          | `String`                | The user assigned to the task.                          |
| `CandidateGroups`   | `List<String>`          | The groups eligible to claim the task.                  |
| `CandidateUsers`    | `List<String>`          | The users eligible to claim the task.                   |
| `ChangedAttributes` | `List<String>`          | The attributes that were changed in the task.           |
| `DueDate`           | `String`                | The due date of the user task in ISO 8601 format.       |
| `FollowUpDate`      | `String`                | The follow-up date of the user task in ISO 8601 format. |
| `FormKey`           | `Nullable<FormKey>`     | The key of the form associated with the user task.      |
| `Priority`          | `Nullable<Int32>`       | The priority of the user task.                          |
| `UserTaskKey`       | `Nullable<UserTaskKey>` | The unique key identifying the user task.               |

## UserTaskResult

UserTaskResult

```csharp
public sealed class UserTaskResult
```

| Property                   | Type                           | Description                                                                                                                                                                                                                                 |
| -------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Name`                     | `String`                       | The name for this user task.                                                                                                                                                                                                                |
| `State`                    | `UserTaskStateEnum`            | The state of the user task. Note: FAILED state is only for legacy job-worker-based tasks.                                                                                                                                                   |
| `Assignee`                 | `String`                       | The assignee of the user task.                                                                                                                                                                                                              |
| `ElementId`                | `ElementId`                    | The element ID of the user task.                                                                                                                                                                                                            |
| `CandidateGroups`          | `List<String>`                 | The candidate groups for this user task.                                                                                                                                                                                                    |
| `CandidateUsers`           | `List<String>`                 | The candidate users for this user task.                                                                                                                                                                                                     |
| `ProcessDefinitionId`      | `ProcessDefinitionId`          | The ID of the process definition.                                                                                                                                                                                                           |
| `CreationDate`             | `DateTimeOffset`               | The creation date of a user task.                                                                                                                                                                                                           |
| `CompletionDate`           | `Nullable<DateTimeOffset>`     | The completion date of a user task.                                                                                                                                                                                                         |
| `FollowUpDate`             | `Nullable<DateTimeOffset>`     | The follow date of a user task.                                                                                                                                                                                                             |
| `DueDate`                  | `Nullable<DateTimeOffset>`     | The due date of a user task.                                                                                                                                                                                                                |
| `TenantId`                 | `TenantId`                     | The unique identifier of the tenant.                                                                                                                                                                                                        |
| `ExternalFormReference`    | `String`                       | The external form reference.                                                                                                                                                                                                                |
| `ProcessDefinitionVersion` | `Int32`                        | The version of the process definition.                                                                                                                                                                                                      |
| `CustomHeaders`            | `Dictionary<String>`           | Custom headers for the user task.                                                                                                                                                                                                           |
| `Priority`                 | `Int32`                        | The priority of a user task. The higher the value the higher the priority.                                                                                                                                                                  |
| `UserTaskKey`              | `UserTaskKey`                  | The key of the user task.                                                                                                                                                                                                                   |
| `ElementInstanceKey`       | `ElementInstanceKey`           | The key of the element instance.                                                                                                                                                                                                            |
| `ProcessName`              | `String`                       | The name of the process definition. This is `null` if the process has no name defined.                                                                                                                                                      |
| `ProcessDefinitionKey`     | `ProcessDefinitionKey`         | The key of the process definition.                                                                                                                                                                                                          |
| `ProcessInstanceKey`       | `ProcessInstanceKey`           | The key of the process instance.                                                                                                                                                                                                            |
| `RootProcessInstanceKey`   | `Nullable<ProcessInstanceKey>` | The key of the root process instance. The root process instance is the top-level ancestor in the process instance hierarchy. This field is only present for data belonging to process instance hierarchies created in version 8.9 or later. |
| `FormKey`                  | `Nullable<FormKey>`            | The key of the form.                                                                                                                                                                                                                        |
| `Tags`                     | `List<Tag>`                    | List of tags. Tags need to start with a letter; then alphanumerics, `_`, `-`, `:`, or `.`; length ≤ 100.                                                                                                                                    |

## UserTaskSearchQuery

User task search query request.

```csharp
public sealed class UserTaskSearchQuery
```

| Property | Type                                   | Description                   |
| -------- | -------------------------------------- | ----------------------------- |
| `Sort`   | `List<UserTaskSearchQuerySortRequest>` | Sort field criteria.          |
| `Filter` | `UserTaskFilter`                       | The user task search filters. |
| `Page`   | `SearchQueryPageRequest`               | Pagination criteria.          |

## UserTaskSearchQueryResult

User task search query response.

```csharp
public sealed class UserTaskSearchQueryResult
```

| Property | Type                      | Description                                      |
| -------- | ------------------------- | ------------------------------------------------ |
| `Items`  | `List<UserTaskResult>`    | The matching user tasks.                         |
| `Page`   | `SearchQueryPageResponse` | Pagination information about the search results. |

## UserTaskSearchQuerySortRequest

UserTaskSearchQuerySortRequest

```csharp
public sealed class UserTaskSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## UserTaskStateExactMatch

Matches the value exactly.

```csharp
public readonly record struct UserTaskStateExactMatch : ICamundaKey, IEquatable<UserTaskStateExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## UserTaskStateFilterProperty

UserTaskStateEnum property with full advanced search capabilities.

```csharp
public sealed class UserTaskStateFilterProperty
```

## UserTaskUpdateRequest

UserTaskUpdateRequest

```csharp
public sealed class UserTaskUpdateRequest
```

| Property    | Type        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Changeset` | `Changeset` | JSON object with changed task attribute values. The following attributes can be adjusted with this endpoint, additional attributes will be ignored: _ `candidateGroups` - reset by providing an empty list _ `candidateUsers` - reset by providing an empty list _ `dueDate` - reset by providing an empty String _ `followUpDate` - reset by providing an empty String \* `priority` - minimum 0, maximum 100, default 50 Providing any of those attributes with a `null` value or omitting it preserves the persisted attribute's value. The assignee cannot be adjusted with this endpoint, use the Assign task endpoint. This ensures correct event emission for assignee changes. |
| `Action`    | `String`    | A custom action value that will be accessible from user task events resulting from this endpoint invocation. If not provided, it will default to "update".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

## UserTaskVariableFilter

The user task variable search filters.

```csharp
public sealed class UserTaskVariableFilter
```

| Property | Type                   | Description           |
| -------- | ---------------------- | --------------------- |
| `Name`   | `StringFilterProperty` | Name of the variable. |

## UserTaskVariableSearchQueryRequest

User task search query request.

```csharp
public sealed class UserTaskVariableSearchQueryRequest
```

| Property | Type                                           | Description                            |
| -------- | ---------------------------------------------- | -------------------------------------- |
| `Sort`   | `List<UserTaskVariableSearchQuerySortRequest>` | Sort field criteria.                   |
| `Filter` | `UserTaskVariableFilter`                       | The user task variable search filters. |
| `Page`   | `SearchQueryPageRequest`                       | Pagination criteria.                   |

## UserTaskVariableSearchQuerySortRequest

UserTaskVariableSearchQuerySortRequest

```csharp
public sealed class UserTaskVariableSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## UserUpdateRequest

UserUpdateRequest

```csharp
public sealed class UserUpdateRequest
```

| Property   | Type     | Description                                                    |
| ---------- | -------- | -------------------------------------------------------------- |
| `Password` | `String` | The password of the user. If blank, the password is unchanged. |
| `Name`     | `String` | The name of the user.                                          |
| `Email`    | `String` | The email of the user.                                         |

## UserUpdateResult

UserUpdateResult

```csharp
public sealed class UserUpdateResult
```

| Property   | Type       | Description                |
| ---------- | ---------- | -------------------------- |
| `Username` | `Username` | The unique name of a user. |
| `Name`     | `String`   | The name of the user.      |
| `Email`    | `String`   | The email of the user.     |

## Username

The unique name of a user.

```csharp
public readonly record struct Username : ICamundaKey, IEquatable<Username>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## VariableFilter

Variable filter request.

```csharp
public sealed class VariableFilter
```

| Property             | Type                               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Name`               | `StringFilterProperty`             | Name of the variable.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `Value`              | `StringFilterProperty`             | The value of the variable. Variable values in filters need to be in serialized JSON format. For example, a variable with string value `myValue` can be found with the filter value `"myValue"`. Consider appropriate escaping for special characters in JSON strings when constructing filter values.                                                                                                                                      |
| `TenantId`           | `Nullable<TenantId>`               | Tenant ID of this variable.                                                                                                                                                                                                                                                                                                                                                                                                                |
| `IsTruncated`        | `Nullable<Boolean>`                | Whether the value is truncated or not.                                                                                                                                                                                                                                                                                                                                                                                                     |
| `VariableKey`        | `VariableKeyFilterProperty`        | The key for this variable.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `ScopeKey`           | `ScopeKeyFilterProperty`           | The key of the scope that defines where this variable is directly defined. This can be a process instance key (for process-level variables) or an element instance key (for local variables scoped to tasks, subprocesses, gateways, events, etc.). Use this filter to find variables directly defined in specific scopes. Note that this does not include variables from parent scopes that would be visible through the scope hierarchy. |
| `ProcessInstanceKey` | `ProcessInstanceKeyFilterProperty` | The key of the process instance of this variable.                                                                                                                                                                                                                                                                                                                                                                                          |

## VariableKeyExactMatch

Matches the value exactly.

```csharp
public readonly record struct VariableKeyExactMatch : ICamundaKey, IEquatable<VariableKeyExactMatch>
```

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## VariableKeyFilterProperty

VariableKey property with full advanced search capabilities.

```csharp
public sealed class VariableKeyFilterProperty
```

## VariableResult

Variable search response item.

```csharp
public sealed class VariableResult
```

| Property                 | Type                           | Description                                                                                                                                                                                                                                                                         |
| ------------------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Value`                  | `String`                       | Full value of this variable.                                                                                                                                                                                                                                                        |
| `Name`                   | `String`                       | Name of this variable.                                                                                                                                                                                                                                                              |
| `TenantId`               | `TenantId`                     | Tenant ID of this variable.                                                                                                                                                                                                                                                         |
| `VariableKey`            | `VariableKey`                  | The key for this variable.                                                                                                                                                                                                                                                          |
| `ScopeKey`               | `ScopeKey`                     | The key of the scope where this variable is directly defined. For process-level variables, this is the process instance key. For local variables, this is the key of the specific element instance (task, subprocess, gateway, event, etc.) where the variable is directly defined. |
| `ProcessInstanceKey`     | `ProcessInstanceKey`           | The key of the process instance of this variable.                                                                                                                                                                                                                                   |
| `RootProcessInstanceKey` | `Nullable<ProcessInstanceKey>` | The key of the root process instance. The root process instance is the top-level ancestor in the process instance hierarchy. This field is only present for data belonging to process instance hierarchies created in version 8.9 or later.                                         |

## VariableResultBase

Variable response item.

```csharp
public sealed class VariableResultBase
```

| Property                 | Type                           | Description                                                                                                                                                                                                                                                                         |
| ------------------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Name`                   | `String`                       | Name of this variable.                                                                                                                                                                                                                                                              |
| `TenantId`               | `TenantId`                     | Tenant ID of this variable.                                                                                                                                                                                                                                                         |
| `VariableKey`            | `VariableKey`                  | The key for this variable.                                                                                                                                                                                                                                                          |
| `ScopeKey`               | `ScopeKey`                     | The key of the scope where this variable is directly defined. For process-level variables, this is the process instance key. For local variables, this is the key of the specific element instance (task, subprocess, gateway, event, etc.) where the variable is directly defined. |
| `ProcessInstanceKey`     | `ProcessInstanceKey`           | The key of the process instance of this variable.                                                                                                                                                                                                                                   |
| `RootProcessInstanceKey` | `Nullable<ProcessInstanceKey>` | The key of the root process instance. The root process instance is the top-level ancestor in the process instance hierarchy. This field is only present for data belonging to process instance hierarchies created in version 8.9 or later.                                         |

## VariableSearchQuery

Variable search query request.

```csharp
public sealed class VariableSearchQuery
```

| Property | Type                                   | Description                  |
| -------- | -------------------------------------- | ---------------------------- |
| `Sort`   | `List<VariableSearchQuerySortRequest>` | Sort field criteria.         |
| `Filter` | `VariableFilter`                       | The variable search filters. |
| `Page`   | `SearchQueryPageRequest`               | Pagination criteria.         |

## VariableSearchQueryResult

Variable search query response.

```csharp
public sealed class VariableSearchQueryResult
```

| Property | Type                         | Description                                      |
| -------- | ---------------------------- | ------------------------------------------------ |
| `Items`  | `List<VariableSearchResult>` | The matching variables.                          |
| `Page`   | `SearchQueryPageResponse`    | Pagination information about the search results. |

## VariableSearchQuerySortRequest

VariableSearchQuerySortRequest

```csharp
public sealed class VariableSearchQuerySortRequest
```

| Property | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `Field`  | `String`                  | The field to sort by.                         |
| `Order`  | `Nullable<SortOrderEnum>` | The order in which to sort the related field. |

## VariableSearchResult

Variable search response item.

```csharp
public sealed class VariableSearchResult
```

| Property                 | Type                           | Description                                                                                                                                                                                                                                                                         |
| ------------------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Value`                  | `String`                       | Value of this variable. Can be truncated.                                                                                                                                                                                                                                           |
| `IsTruncated`            | `Boolean`                      | Whether the value is truncated or not.                                                                                                                                                                                                                                              |
| `Name`                   | `String`                       | Name of this variable.                                                                                                                                                                                                                                                              |
| `TenantId`               | `TenantId`                     | Tenant ID of this variable.                                                                                                                                                                                                                                                         |
| `VariableKey`            | `VariableKey`                  | The key for this variable.                                                                                                                                                                                                                                                          |
| `ScopeKey`               | `ScopeKey`                     | The key of the scope where this variable is directly defined. For process-level variables, this is the process instance key. For local variables, this is the key of the specific element instance (task, subprocess, gateway, event, etc.) where the variable is directly defined. |
| `ProcessInstanceKey`     | `ProcessInstanceKey`           | The key of the process instance of this variable.                                                                                                                                                                                                                                   |
| `RootProcessInstanceKey` | `Nullable<ProcessInstanceKey>` | The key of the root process instance. The root process instance is the top-level ancestor in the process instance hierarchy. This field is only present for data belonging to process instance hierarchies created in version 8.9 or later.                                         |

## VariableValueFilterProperty

VariableValueFilterProperty

```csharp
public sealed class VariableValueFilterProperty
```

| Property | Type                   | Description                                                                                                                                                                                                                                                                                           |
| -------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Name`   | `String`               | Name of the variable.                                                                                                                                                                                                                                                                                 |
| `Value`  | `StringFilterProperty` | The value of the variable. Variable values in filters need to be in serialized JSON format. For example, a variable with string value `myValue` can be found with the filter value `"myValue"`. Consider appropriate escaping for special characters in JSON strings when constructing filter values. |
