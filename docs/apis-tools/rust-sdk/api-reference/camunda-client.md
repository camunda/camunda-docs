---
title: "CamundaClient"
sidebar_label: "CamundaClient"
mdx:
  format: md
---

# CamundaClient

The primary entry point of the SDK.

A `CamundaClient` is cheap to clone — clones share the same configuration,
HTTP client, OAuth token cache, and worker registry.

`CamundaClient` exposes **241** methods covering the full Orchestration Cluster REST API surface, with authentication, retries, and backpressure applied automatically.

## Methods

| Method                                                                                                              | Description                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`activate_ad_hoc_sub_process_activities`](#activate_ad_hoc_sub_process_activities)                                 | Activate activities within an ad-hoc sub-process (`POST /element-instances/ad-hoc-activities/{adHocSubProcessInstanceKey}/activation`).                                                                                                                                                      |
| [`activate_jobs`](#activate_jobs)                                                                                   | Activate jobs of a given type. Prefer `CamundaClient::create_job_worker` for continuous polling.                                                                                                                                                                                             |
| [`assign_client_to_group`](#assign_client_to_group)                                                                 | Assign a client to a group (`PUT /groups/{groupId}/clients/{clientId}`).                                                                                                                                                                                                                     |
| [`assign_client_to_tenant`](#assign_client_to_tenant)                                                               | Assign a client to a tenant (`PUT /tenants/{tenantId}/clients/{clientId}`).                                                                                                                                                                                                                  |
| [`assign_group_to_tenant`](#assign_group_to_tenant)                                                                 | Assign a group to a tenant (`PUT /tenants/{tenantId}/groups/{groupId}`).                                                                                                                                                                                                                     |
| [`assign_mapping_rule_to_group`](#assign_mapping_rule_to_group)                                                     | Assign a mapping rule to a group (`PUT /groups/{groupId}/mapping-rules/{mappingRuleId}`).                                                                                                                                                                                                    |
| [`assign_mapping_rule_to_tenant`](#assign_mapping_rule_to_tenant)                                                   | Assign a mapping rule to a tenant (`PUT /tenants/{tenantId}/mapping-rules/{mappingRuleId}`).                                                                                                                                                                                                 |
| [`assign_process_instance_business_id`](#assign_process_instance_business_id)                                       | Assign business id to process instance (`POST /process-instances/{processInstanceKey}/business-id-assignment`).                                                                                                                                                                              |
| [`assign_role_to_client`](#assign_role_to_client)                                                                   | Assign a role to a client (`PUT /roles/{roleId}/clients/{clientId}`).                                                                                                                                                                                                                        |
| [`assign_role_to_group`](#assign_role_to_group)                                                                     | Assign a role to a group (`PUT /roles/{roleId}/groups/{groupId}`).                                                                                                                                                                                                                           |
| [`assign_role_to_mapping_rule`](#assign_role_to_mapping_rule)                                                       | Assign a role to a mapping rule (`PUT /roles/{roleId}/mapping-rules/{mappingRuleId}`).                                                                                                                                                                                                       |
| [`assign_role_to_tenant`](#assign_role_to_tenant)                                                                   | Assign a role to a tenant (`PUT /tenants/{tenantId}/roles/{roleId}`).                                                                                                                                                                                                                        |
| [`assign_role_to_user`](#assign_role_to_user)                                                                       | Assign a role to a user (`PUT /roles/{roleId}/users/{username}`).                                                                                                                                                                                                                            |
| [`assign_user_task`](#assign_user_task)                                                                             | Assign user task (`POST /user-tasks/{userTaskKey}/assignment`).                                                                                                                                                                                                                              |
| [`assign_user_to_group`](#assign_user_to_group)                                                                     | Assign a user to a group (`PUT /groups/{groupId}/users/{username}`).                                                                                                                                                                                                                         |
| [`assign_user_to_tenant`](#assign_user_to_tenant)                                                                   | Assign a user to a tenant (`PUT /tenants/{tenantId}/users/{username}`).                                                                                                                                                                                                                      |
| [`auth`](#auth)                                                                                                     | The authentication handler.                                                                                                                                                                                                                                                                  |
| [`backpressure_state`](#backpressure_state)                                                                         | A snapshot of the adaptive backpressure controller's state, for observability.                                                                                                                                                                                                               |
| [`broadcast_signal`](#broadcast_signal)                                                                             | Broadcast a signal. The configured default tenant id is applied when unset.                                                                                                                                                                                                                  |
| [`cancel_batch_operation`](#cancel_batch_operation)                                                                 | Cancel Batch operation (`POST /batch-operations/{batchOperationKey}/cancellation`).                                                                                                                                                                                                          |
| [`cancel_process_instance`](#cancel_process_instance)                                                               | Cancel a running process instance by key.                                                                                                                                                                                                                                                    |
| [`cancel_process_instances_batch_operation`](#cancel_process_instances_batch_operation)                             | Cancel process instances (batch) (`POST /process-instances/cancellation`).                                                                                                                                                                                                                   |
| [`change_cluster_mode`](#change_cluster_mode)                                                                       | Change cluster mode (`PATCH /mode`).                                                                                                                                                                                                                                                         |
| [`change_cluster_mode_as_cluster_admin`](#change_cluster_mode_as_cluster_admin)                                     | Change the cluster mode of one or every physical tenant (`PATCH /cluster/v2/mode`).                                                                                                                                                                                                          |
| [`complete_job`](#complete_job)                                                                                     | Complete a job, optionally with output variables.                                                                                                                                                                                                                                            |
| [`complete_user_task`](#complete_user_task)                                                                         | Complete user task (`POST /user-tasks/{userTaskKey}/completion`).                                                                                                                                                                                                                            |
| [`config`](#config)                                                                                                 | The resolved configuration.                                                                                                                                                                                                                                                                  |
| [`configuration`](#configuration)                                                                                   | Build a generated-client `Configuration` with the base URL set and the current authentication applied (refreshing the OAuth token if needed).                                                                                                                                                |
| [`correlate_message`](#correlate_message)                                                                           | Correlate a message to a waiting process instance. The configured default tenant id is applied when unset.                                                                                                                                                                                   |
| [`create_admin_user`](#create_admin_user)                                                                           | Create admin user (`POST /setup/user`).                                                                                                                                                                                                                                                      |
| [`create_agent_instance`](#create_agent_instance)                                                                   | Create agent instance (`POST /agent-instances`).                                                                                                                                                                                                                                             |
| [`create_agent_instance_history_item`](#create_agent_instance_history_item)                                         | Create agent instance history item (`POST /agent-instances/{agentInstanceKey}/history`).                                                                                                                                                                                                     |
| [`create_authorization`](#create_authorization)                                                                     | Create authorization (`POST /authorizations`).                                                                                                                                                                                                                                               |
| [`create_deployment`](#create_deployment)                                                                           | Deploy resources (`POST /deployments`).                                                                                                                                                                                                                                                      |
| [`create_document`](#create_document)                                                                               | Upload document (`POST /documents`).                                                                                                                                                                                                                                                         |
| [`create_document_link`](#create_document_link)                                                                     | Create document link (`POST /documents/{documentId}/links`).                                                                                                                                                                                                                                 |
| [`create_documents`](#create_documents)                                                                             | Upload multiple documents (`POST /documents/batch`).                                                                                                                                                                                                                                         |
| [`create_element_instance_variables`](#create_element_instance_variables)                                           | Update element instance variables (`PUT /element-instances/{elementInstanceKey}/variables`).                                                                                                                                                                                                 |
| [`create_global_cluster_variable`](#create_global_cluster_variable)                                                 | Create a global-scoped cluster variable (`POST /cluster-variables/global`).                                                                                                                                                                                                                  |
| [`create_global_task_listener`](#create_global_task_listener)                                                       | Create global user task listener (`POST /global-task-listeners`).                                                                                                                                                                                                                            |
| [`create_group`](#create_group)                                                                                     | Create group (`POST /groups`).                                                                                                                                                                                                                                                               |
| [`create_job_worker`](#create_job_worker)                                                                           | Create a `JobWorker` that continuously polls for and processes jobs of the configured type. Call `JobWorker::run` (or `JobWorker::start` / `JobWorker::spawn`) to begin.                                                                                                                     |
| [`create_mapping_rule`](#create_mapping_rule)                                                                       | Create mapping rule (`POST /mapping-rules`).                                                                                                                                                                                                                                                 |
| [`create_process_instance`](#create_process_instance)                                                               | Create (start) a process instance. The configured default tenant id is applied when the instruction does not already specify one.                                                                                                                                                            |
| [`create_role`](#create_role)                                                                                       | Create role (`POST /roles`).                                                                                                                                                                                                                                                                 |
| [`create_tenant`](#create_tenant)                                                                                   | Create tenant (`POST /tenants`).                                                                                                                                                                                                                                                             |
| [`create_tenant_cluster_variable`](#create_tenant_cluster_variable)                                                 | Create a tenant-scoped cluster variable (`POST /cluster-variables/tenants/{tenantId}`).                                                                                                                                                                                                      |
| [`create_user`](#create_user)                                                                                       | Create user (`POST /users`).                                                                                                                                                                                                                                                                 |
| [`delete_authorization`](#delete_authorization)                                                                     | Delete authorization (`DELETE /authorizations/{authorizationKey}`).                                                                                                                                                                                                                          |
| [`delete_decision_instance`](#delete_decision_instance)                                                             | Delete decision instance (`POST /decision-instances/{decisionEvaluationKey}/deletion`).                                                                                                                                                                                                      |
| [`delete_decision_instances_batch_operation`](#delete_decision_instances_batch_operation)                           | Delete decision instances (batch) (`POST /decision-instances/deletion`).                                                                                                                                                                                                                     |
| [`delete_document`](#delete_document)                                                                               | Delete document (`DELETE /documents/{documentId}`).                                                                                                                                                                                                                                          |
| [`delete_global_cluster_variable`](#delete_global_cluster_variable)                                                 | Delete a global-scoped cluster variable (`DELETE /cluster-variables/global/{name}`).                                                                                                                                                                                                         |
| [`delete_global_task_listener`](#delete_global_task_listener)                                                       | Delete global user task listener (`DELETE /global-task-listeners/{id}`).                                                                                                                                                                                                                     |
| [`delete_group`](#delete_group)                                                                                     | Delete group (`DELETE /groups/{groupId}`).                                                                                                                                                                                                                                                   |
| [`delete_history_backup`](#delete_history_backup)                                                                   | Delete history backup (`DELETE /backups/history/{backupId}`).                                                                                                                                                                                                                                |
| [`delete_mapping_rule`](#delete_mapping_rule)                                                                       | Delete a mapping rule (`DELETE /mapping-rules/{mappingRuleId}`).                                                                                                                                                                                                                             |
| [`delete_process_instance`](#delete_process_instance)                                                               | Delete process instance (`POST /process-instances/{processInstanceKey}/deletion`).                                                                                                                                                                                                           |
| [`delete_process_instances_batch_operation`](#delete_process_instances_batch_operation)                             | Delete process instances (batch) (`POST /process-instances/deletion`).                                                                                                                                                                                                                       |
| [`delete_resource`](#delete_resource)                                                                               | Delete resource (`POST /resources/{resourceKey}/deletion`).                                                                                                                                                                                                                                  |
| [`delete_role`](#delete_role)                                                                                       | Delete role (`DELETE /roles/{roleId}`).                                                                                                                                                                                                                                                      |
| [`delete_runtime_backup`](#delete_runtime_backup)                                                                   | Delete runtime backup (`DELETE /backups/runtime/{backupId}`).                                                                                                                                                                                                                                |
| [`delete_runtime_backup_state`](#delete_runtime_backup_state)                                                       | Delete runtime backup state (`DELETE /backups/runtime/state`).                                                                                                                                                                                                                               |
| [`delete_tenant`](#delete_tenant)                                                                                   | Delete tenant (`DELETE /tenants/{tenantId}`).                                                                                                                                                                                                                                                |
| [`delete_tenant_cluster_variable`](#delete_tenant_cluster_variable)                                                 | Delete a tenant-scoped cluster variable (`DELETE /cluster-variables/tenants/{tenantId}/{name}`).                                                                                                                                                                                             |
| [`delete_user`](#delete_user)                                                                                       | Delete user (`DELETE /users/{username}`).                                                                                                                                                                                                                                                    |
| [`deploy_resources`](#deploy_resources)                                                                             | Deploy one or more resources (BPMN, DMN, forms) from local file paths. The configured default tenant id is applied when `tenant_id` is `None`.                                                                                                                                               |
| [`evaluate_conditionals`](#evaluate_conditionals)                                                                   | Evaluate root level conditional start events (`POST /conditionals/evaluation`).                                                                                                                                                                                                              |
| [`evaluate_decision`](#evaluate_decision)                                                                           | Evaluate a decision (DMN). The configured default tenant id is applied when unset.                                                                                                                                                                                                           |
| [`evaluate_expression`](#evaluate_expression)                                                                       | Evaluate an expression (`POST /expression/evaluation`).                                                                                                                                                                                                                                      |
| [`eventual`](#eventual)                                                                                             | Poll a read operation until it returns `Ok`, retrying `404 Not Found` (the typical symptom of a not-yet-replicated read) until the eventual-consistency window elapses.                                                                                                                      |
| [`eventual_until`](#eventual_until)                                                                                 | Poll a read operation until `predicate` is satisfied by its result, retrying `404` and ignoring consistent-but-not-yet-matching reads, until the eventual-consistency window elapses.                                                                                                        |
| [`fail_job`](#fail_job)                                                                                             | Fail a job, decrementing retries.                                                                                                                                                                                                                                                            |
| [`from_env`](#from_env)                                                                                             | Construct a client from environment variables only.                                                                                                                                                                                                                                          |
| [`get_agent_definition`](#get_agent_definition)                                                                     | Get agent definition (`GET /agent-definitions/{agentDefinitionKey}`).                                                                                                                                                                                                                        |
| [`get_agent_instance`](#get_agent_instance)                                                                         | Get agent instance (`GET /agent-instances/{agentInstanceKey}`).                                                                                                                                                                                                                              |
| [`get_audit_log`](#get_audit_log)                                                                                   | Get audit log (`GET /audit-logs/{auditLogKey}`).                                                                                                                                                                                                                                             |
| [`get_authentication`](#get_authentication)                                                                         | Get current user (`GET /authentication/me`).                                                                                                                                                                                                                                                 |
| [`get_authorization`](#get_authorization)                                                                           | Get authorization (`GET /authorizations/{authorizationKey}`).                                                                                                                                                                                                                                |
| [`get_batch_operation`](#get_batch_operation)                                                                       | Get batch operation (`GET /batch-operations/{batchOperationKey}`).                                                                                                                                                                                                                           |
| [`get_cluster_status`](#get_cluster_status)                                                                         | Get the status of the whole cluster (`GET /cluster/v2/status`).                                                                                                                                                                                                                              |
| [`get_decision_definition`](#get_decision_definition)                                                               | Get decision definition (`GET /decision-definitions/{decisionDefinitionKey}`).                                                                                                                                                                                                               |
| [`get_decision_definition_xml`](#get_decision_definition_xml)                                                       | Get decision definition XML (`GET /decision-definitions/{decisionDefinitionKey}/xml`).                                                                                                                                                                                                       |
| [`get_decision_instance`](#get_decision_instance)                                                                   | Get decision instance (`GET /decision-instances/{decisionEvaluationInstanceKey}`).                                                                                                                                                                                                           |
| [`get_decision_requirements`](#get_decision_requirements)                                                           | Get decision requirements (`GET /decision-requirements/{decisionRequirementsKey}`).                                                                                                                                                                                                          |
| [`get_decision_requirements_xml`](#get_decision_requirements_xml)                                                   | Get decision requirements XML (`GET /decision-requirements/{decisionRequirementsKey}/xml`).                                                                                                                                                                                                  |
| [`get_document`](#get_document)                                                                                     | Download document (`GET /documents/{documentId}`).                                                                                                                                                                                                                                           |
| [`get_element_instance`](#get_element_instance)                                                                     | Get element instance (`GET /element-instances/{elementInstanceKey}`).                                                                                                                                                                                                                        |
| [`get_exporting_status`](#get_exporting_status)                                                                     | Get exporting status (`GET /exporting`).                                                                                                                                                                                                                                                     |
| [`get_form_by_key`](#get_form_by_key)                                                                               | Get form by key (`GET /forms/{formKey}`).                                                                                                                                                                                                                                                    |
| [`get_global_cluster_variable`](#get_global_cluster_variable)                                                       | Get a global-scoped cluster variable (`GET /cluster-variables/global/{name}`).                                                                                                                                                                                                               |
| [`get_global_job_statistics`](#get_global_job_statistics)                                                           | Global job statistics (`GET /jobs/statistics/global`).                                                                                                                                                                                                                                       |
| [`get_global_task_listener`](#get_global_task_listener)                                                             | Get global user task listener (`GET /global-task-listeners/{id}`).                                                                                                                                                                                                                           |
| [`get_group`](#get_group)                                                                                           | Get group (`GET /groups/{groupId}`).                                                                                                                                                                                                                                                         |
| [`get_history_backup`](#get_history_backup)                                                                         | Get history backup (`GET /backups/history/{backupId}`).                                                                                                                                                                                                                                      |
| [`get_incident`](#get_incident)                                                                                     | Get incident (`GET /incidents/{incidentKey}`).                                                                                                                                                                                                                                               |
| [`get_job_error_statistics`](#get_job_error_statistics)                                                             | Get error metrics for a job type (`POST /jobs/statistics/errors`).                                                                                                                                                                                                                           |
| [`get_job_time_series_statistics`](#get_job_time_series_statistics)                                                 | Get time-series metrics for a job type (`POST /jobs/statistics/time-series`).                                                                                                                                                                                                                |
| [`get_job_type_statistics`](#get_job_type_statistics)                                                               | Get job statistics by type (`POST /jobs/statistics/by-types`).                                                                                                                                                                                                                               |
| [`get_job_worker_statistics`](#get_job_worker_statistics)                                                           | Get job statistics by worker (`POST /jobs/statistics/by-workers`).                                                                                                                                                                                                                           |
| [`get_license`](#get_license)                                                                                       | Get license status (`GET /license`).                                                                                                                                                                                                                                                         |
| [`get_mapping_rule`](#get_mapping_rule)                                                                             | Get a mapping rule (`GET /mapping-rules/{mappingRuleId}`).                                                                                                                                                                                                                                   |
| [`get_process_definition`](#get_process_definition)                                                                 | Get process definition (`GET /process-definitions/{processDefinitionKey}`).                                                                                                                                                                                                                  |
| [`get_process_definition_instance_statistics`](#get_process_definition_instance_statistics)                         | Get process instance statistics (`POST /process-definitions/statistics/process-instances`).                                                                                                                                                                                                  |
| [`get_process_definition_instance_version_statistics`](#get_process_definition_instance_version_statistics)         | Get process instance statistics by version (`POST /process-definitions/statistics/process-instances-by-version`).                                                                                                                                                                            |
| [`get_process_definition_message_subscription_statistics`](#get_process_definition_message_subscription_statistics) | Get message subscription statistics (`POST /process-definitions/statistics/message-subscriptions`).                                                                                                                                                                                          |
| [`get_process_definition_statistics`](#get_process_definition_statistics)                                           | Get process definition statistics (`POST /process-definitions/{processDefinitionKey}/statistics/element-instances`).                                                                                                                                                                         |
| [`get_process_definition_xml`](#get_process_definition_xml)                                                         | Get process definition XML (`GET /process-definitions/{processDefinitionKey}/xml`).                                                                                                                                                                                                          |
| [`get_process_instance`](#get_process_instance)                                                                     | Fetch a process instance by key (a read; not subject to backpressure). Returns a `404` `CamundaError::Api` if not yet visible — compose with `CamundaClient::eventual` to wait through replication lag.                                                                                      |
| [`get_process_instance_call_hierarchy`](#get_process_instance_call_hierarchy)                                       | Get call hierarchy (`GET /process-instances/{processInstanceKey}/call-hierarchy`).                                                                                                                                                                                                           |
| [`get_process_instance_sequence_flows`](#get_process_instance_sequence_flows)                                       | Get sequence flows (`GET /process-instances/{processInstanceKey}/sequence-flows`).                                                                                                                                                                                                           |
| [`get_process_instance_statistics`](#get_process_instance_statistics)                                               | Get element instance statistics (`GET /process-instances/{processInstanceKey}/statistics/element-instances`).                                                                                                                                                                                |
| [`get_process_instance_statistics_by_definition`](#get_process_instance_statistics_by_definition)                   | Get process instance statistics by definition (`POST /incidents/statistics/process-instances-by-definition`).                                                                                                                                                                                |
| [`get_process_instance_statistics_by_error`](#get_process_instance_statistics_by_error)                             | Get process instance statistics by error (`POST /incidents/statistics/process-instances-by-error`).                                                                                                                                                                                          |
| [`get_process_instance_wait_state_statistics`](#get_process_instance_wait_state_statistics)                         | Get wait state statistics (`GET /process-instances/{processInstanceKey}/statistics/wait-states`).                                                                                                                                                                                            |
| [`get_resource`](#get_resource)                                                                                     | Get resource (`GET /resources/{resourceKey}`).                                                                                                                                                                                                                                               |
| [`get_resource_content`](#get_resource_content)                                                                     | Get RPA resource content (deprecated) (`GET /resources/{resourceKey}/content`).                                                                                                                                                                                                              |
| [`get_resource_content_binary`](#get_resource_content_binary)                                                       | Get resource content as binary (`GET /resources/{resourceKey}/content/binary`).                                                                                                                                                                                                              |
| [`get_restore_status`](#get_restore_status)                                                                         | Get the status of the restore that is currently in progress (`GET /restore`).                                                                                                                                                                                                                |
| [`get_role`](#get_role)                                                                                             | Get role (`GET /roles/{roleId}`).                                                                                                                                                                                                                                                            |
| [`get_runtime_backup`](#get_runtime_backup)                                                                         | Get runtime backup (`GET /backups/runtime/{backupId}`).                                                                                                                                                                                                                                      |
| [`get_runtime_backup_state`](#get_runtime_backup_state)                                                             | Get runtime backup state (`GET /backups/runtime/state`).                                                                                                                                                                                                                                     |
| [`get_start_process_form`](#get_start_process_form)                                                                 | Get process start form (`GET /process-definitions/{processDefinitionKey}/form`).                                                                                                                                                                                                             |
| [`get_status`](#get_status)                                                                                         | Get physical tenant status (`GET /status`).                                                                                                                                                                                                                                                  |
| [`get_system_configuration`](#get_system_configuration)                                                             | System configuration (alpha) (`GET /system/configuration`).                                                                                                                                                                                                                                  |
| [`get_tenant`](#get_tenant)                                                                                         | Get tenant (`GET /tenants/{tenantId}`).                                                                                                                                                                                                                                                      |
| [`get_tenant_cluster_variable`](#get_tenant_cluster_variable)                                                       | Get a tenant-scoped cluster variable (`GET /cluster-variables/tenants/{tenantId}/{name}`).                                                                                                                                                                                                   |
| [`get_usage_metrics`](#get_usage_metrics)                                                                           | Get usage metrics (`GET /system/usage-metrics`).                                                                                                                                                                                                                                             |
| [`get_user`](#get_user)                                                                                             | Get user (`GET /users/{username}`).                                                                                                                                                                                                                                                          |
| [`get_user_task`](#get_user_task)                                                                                   | Get user task (`GET /user-tasks/{userTaskKey}`).                                                                                                                                                                                                                                             |
| [`get_user_task_form`](#get_user_task_form)                                                                         | Get user task form (`GET /user-tasks/{userTaskKey}/form`).                                                                                                                                                                                                                                   |
| [`get_variable`](#get_variable)                                                                                     | Get variable (`GET /variables/{variableKey}`).                                                                                                                                                                                                                                               |
| [`init_logging`](#init_logging)                                                                                     | Install a formatting `tracing` subscriber filtered to the configured `CAMUNDA_SDK_LOG_LEVEL`. No-op if a global subscriber is already set or logging is off. Returns `true` if this call installed the subscriber.                                                                           |
| [`list_history_backups`](#list_history_backups)                                                                     | List history backups (`GET /backups/history`).                                                                                                                                                                                                                                               |
| [`list_runtime_backups`](#list_runtime_backups)                                                                     | List runtime backups (`GET /backups/runtime`).                                                                                                                                                                                                                                               |
| [`list_secrets`](#list_secrets)                                                                                     | List secrets (alpha) (`POST /secrets/list`).                                                                                                                                                                                                                                                 |
| [`migrate_process_instance`](#migrate_process_instance)                                                             | Migrate process instance (`POST /process-instances/{processInstanceKey}/migration`).                                                                                                                                                                                                         |
| [`migrate_process_instances_batch_operation`](#migrate_process_instances_batch_operation)                           | Migrate process instances (batch) (`POST /process-instances/migration`).                                                                                                                                                                                                                     |
| [`modify_process_instance`](#modify_process_instance)                                                               | Modify process instance (`POST /process-instances/{processInstanceKey}/modification`).                                                                                                                                                                                                       |
| [`modify_process_instances_batch_operation`](#modify_process_instances_batch_operation)                             | Modify process instances (batch) (`POST /process-instances/modification`).                                                                                                                                                                                                                   |
| [`new`](#new)                                                                                                       | Construct a client from `CamundaOptions` (environment + overrides).                                                                                                                                                                                                                          |
| [`pause_exporting`](#pause_exporting)                                                                               | Pause exporting (`POST /exporting/pause`).                                                                                                                                                                                                                                                   |
| [`pin_clock`](#pin_clock)                                                                                           | Pin internal clock (alpha) (`PUT /clock`).                                                                                                                                                                                                                                                   |
| [`publish_message`](#publish_message)                                                                               | Publish a message (no correlation key matching against active subscriptions only — buffered). The configured default tenant id is applied when unset.                                                                                                                                        |
| [`reset_clock`](#reset_clock)                                                                                       | Reset internal clock (alpha) (`POST /clock/reset`).                                                                                                                                                                                                                                          |
| [`resolve_incident`](#resolve_incident)                                                                             | Resolve incident (`POST /incidents/{incidentKey}/resolution`).                                                                                                                                                                                                                               |
| [`resolve_incidents_batch_operation`](#resolve_incidents_batch_operation)                                           | Resolve related incidents (batch) (`POST /process-instances/incident-resolution`).                                                                                                                                                                                                           |
| [`resolve_process_instance_incidents`](#resolve_process_instance_incidents)                                         | Resolve related incidents (`POST /process-instances/{processInstanceKey}/incident-resolution`).                                                                                                                                                                                              |
| [`resolve_secrets`](#resolve_secrets)                                                                               | Resolve secrets (alpha) (`POST /secrets/resolve`).                                                                                                                                                                                                                                           |
| [`restore`](#restore)                                                                                               | Restore from a backup (`POST /restore`).                                                                                                                                                                                                                                                     |
| [`resume_batch_operation`](#resume_batch_operation)                                                                 | Resume Batch operation (`POST /batch-operations/{batchOperationKey}/resumption`).                                                                                                                                                                                                            |
| [`resume_exporting`](#resume_exporting)                                                                             | Resume exporting (`POST /exporting/resume`).                                                                                                                                                                                                                                                 |
| [`resume_process_instance`](#resume_process_instance)                                                               | Resume process instance (`POST /process-instances/{processInstanceKey}/resumption`).                                                                                                                                                                                                         |
| [`resume_process_instances_batch_operation`](#resume_process_instances_batch_operation)                             | Resume process instances (batch) (`POST /process-instances/resumption`).                                                                                                                                                                                                                     |
| [`running_workers`](#running_workers)                                                                               | The job types of all currently-registered workers that are still running.                                                                                                                                                                                                                    |
| [`search_agent_definitions`](#search_agent_definitions)                                                             | Search agent definitions (`POST /agent-definitions/search`).                                                                                                                                                                                                                                 |
| [`search_agent_instance_history`](#search_agent_instance_history)                                                   | Search agent instance history (`POST /agent-instances/{agentInstanceKey}/history/search`).                                                                                                                                                                                                   |
| [`search_agent_instances`](#search_agent_instances)                                                                 | Search agent instances (`POST /agent-instances/search`).                                                                                                                                                                                                                                     |
| [`search_audit_logs`](#search_audit_logs)                                                                           | Search audit logs (`POST /audit-logs/search`).                                                                                                                                                                                                                                               |
| [`search_authorizations`](#search_authorizations)                                                                   | Search authorizations (`POST /authorizations/search`).                                                                                                                                                                                                                                       |
| [`search_batch_operation_items`](#search_batch_operation_items)                                                     | Search batch operation items (`POST /batch-operation-items/search`).                                                                                                                                                                                                                         |
| [`search_batch_operations`](#search_batch_operations)                                                               | Search batch operations (`POST /batch-operations/search`).                                                                                                                                                                                                                                   |
| [`search_clients_for_group`](#search_clients_for_group)                                                             | Search group clients (`POST /groups/{groupId}/clients/search`).                                                                                                                                                                                                                              |
| [`search_clients_for_role`](#search_clients_for_role)                                                               | Search role clients (`POST /roles/{roleId}/clients/search`).                                                                                                                                                                                                                                 |
| [`search_clients_for_tenant`](#search_clients_for_tenant)                                                           | Search clients for tenant (`POST /tenants/{tenantId}/clients/search`).                                                                                                                                                                                                                       |
| [`search_cluster_variables`](#search_cluster_variables)                                                             | Search for cluster variables based on given criteria (`POST /cluster-variables/search`).                                                                                                                                                                                                     |
| [`search_correlated_message_subscriptions`](#search_correlated_message_subscriptions)                               | Search correlated message subscriptions (`POST /correlated-message-subscriptions/search`).                                                                                                                                                                                                   |
| [`search_decision_definitions`](#search_decision_definitions)                                                       | Search decision definitions (`POST /decision-definitions/search`).                                                                                                                                                                                                                           |
| [`search_decision_instances`](#search_decision_instances)                                                           | Search decision instances (`POST /decision-instances/search`).                                                                                                                                                                                                                               |
| [`search_decision_requirements`](#search_decision_requirements)                                                     | Search decision requirements (`POST /decision-requirements/search`).                                                                                                                                                                                                                         |
| [`search_element_instance_incidents`](#search_element_instance_incidents)                                           | Search for incidents of a specific element instance (`POST /element-instances/{elementInstanceKey}/incidents/search`).                                                                                                                                                                       |
| [`search_element_instance_wait_states`](#search_element_instance_wait_states)                                       | Search element instance wait states (`POST /element-instances/wait-states/search`).                                                                                                                                                                                                          |
| [`search_element_instances`](#search_element_instances)                                                             | Search element instances (`POST /element-instances/search`).                                                                                                                                                                                                                                 |
| [`search_global_task_listeners`](#search_global_task_listeners)                                                     | Search global user task listeners (`POST /global-task-listeners/search`).                                                                                                                                                                                                                    |
| [`search_group_ids_for_tenant`](#search_group_ids_for_tenant)                                                       | Search groups for tenant (`POST /tenants/{tenantId}/groups/search`).                                                                                                                                                                                                                         |
| [`search_groups`](#search_groups)                                                                                   | Search groups (`POST /groups/search`).                                                                                                                                                                                                                                                       |
| [`search_groups_for_role`](#search_groups_for_role)                                                                 | Search role groups (`POST /roles/{roleId}/groups/search`).                                                                                                                                                                                                                                   |
| [`search_incidents`](#search_incidents)                                                                             | Search incidents (`POST /incidents/search`).                                                                                                                                                                                                                                                 |
| [`search_jobs`](#search_jobs)                                                                                       | Search jobs (`POST /jobs/search`).                                                                                                                                                                                                                                                           |
| [`search_mapping_rule`](#search_mapping_rule)                                                                       | Search mapping rules (`POST /mapping-rules/search`).                                                                                                                                                                                                                                         |
| [`search_mapping_rules_for_group`](#search_mapping_rules_for_group)                                                 | Search group mapping rules (`POST /groups/{groupId}/mapping-rules/search`).                                                                                                                                                                                                                  |
| [`search_mapping_rules_for_role`](#search_mapping_rules_for_role)                                                   | Search role mapping rules (`POST /roles/{roleId}/mapping-rules/search`).                                                                                                                                                                                                                     |
| [`search_mapping_rules_for_tenant`](#search_mapping_rules_for_tenant)                                               | Search mapping rules for tenant (`POST /tenants/{tenantId}/mapping-rules/search`).                                                                                                                                                                                                           |
| [`search_message_subscriptions`](#search_message_subscriptions)                                                     | Search message subscriptions (`POST /message-subscriptions/search`).                                                                                                                                                                                                                         |
| [`search_own_authorizations`](#search_own_authorizations)                                                           | Search own authorizations (`POST /authentication/me/authorizations/search`).                                                                                                                                                                                                                 |
| [`search_process_definition_variable_names`](#search_process_definition_variable_names)                             | Search process definition variable names (`POST /process-definitions/{processDefinitionKey}/variable-names/search`).                                                                                                                                                                         |
| [`search_process_definitions`](#search_process_definitions)                                                         | Search process definitions (`POST /process-definitions/search`).                                                                                                                                                                                                                             |
| [`search_process_instance_incidents`](#search_process_instance_incidents)                                           | Search related incidents (`POST /process-instances/{processInstanceKey}/incidents/search`).                                                                                                                                                                                                  |
| [`search_process_instances`](#search_process_instances)                                                             | Search process instances (`POST /process-instances/search`).                                                                                                                                                                                                                                 |
| [`search_resources`](#search_resources)                                                                             | Search resources (`POST /resources/search`).                                                                                                                                                                                                                                                 |
| [`search_roles`](#search_roles)                                                                                     | Search roles (`POST /roles/search`).                                                                                                                                                                                                                                                         |
| [`search_roles_for_group`](#search_roles_for_group)                                                                 | Search group roles (`POST /groups/{groupId}/roles/search`).                                                                                                                                                                                                                                  |
| [`search_roles_for_tenant`](#search_roles_for_tenant)                                                               | Search roles for tenant (`POST /tenants/{tenantId}/roles/search`).                                                                                                                                                                                                                           |
| [`search_tenants`](#search_tenants)                                                                                 | Search tenants (`POST /tenants/search`).                                                                                                                                                                                                                                                     |
| [`search_user_task_audit_logs`](#search_user_task_audit_logs)                                                       | Search user task audit logs (`POST /user-tasks/{userTaskKey}/audit-logs/search`).                                                                                                                                                                                                            |
| [`search_user_task_effective_variables`](#search_user_task_effective_variables)                                     | Search user task effective variables (`POST /user-tasks/{userTaskKey}/effective-variables/search`).                                                                                                                                                                                          |
| [`search_user_task_variables`](#search_user_task_variables)                                                         | Search user task variables (`POST /user-tasks/{userTaskKey}/variables/search`).                                                                                                                                                                                                              |
| [`search_user_tasks`](#search_user_tasks)                                                                           | Search user tasks (`POST /user-tasks/search`).                                                                                                                                                                                                                                               |
| [`search_users`](#search_users)                                                                                     | Search users (`POST /users/search`).                                                                                                                                                                                                                                                         |
| [`search_users_for_group`](#search_users_for_group)                                                                 | Search group users (`POST /groups/{groupId}/users/search`).                                                                                                                                                                                                                                  |
| [`search_users_for_role`](#search_users_for_role)                                                                   | Search role users (`POST /roles/{roleId}/users/search`).                                                                                                                                                                                                                                     |
| [`search_users_for_tenant`](#search_users_for_tenant)                                                               | Search users for tenant (`POST /tenants/{tenantId}/users/search`).                                                                                                                                                                                                                           |
| [`search_variables`](#search_variables)                                                                             | Search variables, returning the raw generated result.                                                                                                                                                                                                                                        |
| [`search_variables_as`](#search_variables_as)                                                                       | Search variables and deserialize each variable's JSON `value` into a typed `T`.                                                                                                                                                                                                              |
| [`spawn_worker`](#spawn_worker)                                                                                     | Spawn a managed job worker and register it for lifecycle control. The returned handle can stop the individual worker; `CamundaClient::stop_all_workers` stops every registered worker. The worker is also retained by the client so it keeps running even if the returned handle is dropped. |
| [`stop_all_workers`](#stop_all_workers)                                                                             | Gracefully stop every registered worker, letting in-flight jobs drain, and await their completion. Clears the registry.                                                                                                                                                                      |
| [`suspend_batch_operation`](#suspend_batch_operation)                                                               | Suspend Batch operation (`POST /batch-operations/{batchOperationKey}/suspension`).                                                                                                                                                                                                           |
| [`suspend_process_instance`](#suspend_process_instance)                                                             | Suspend process instance (`POST /process-instances/{processInstanceKey}/suspension`).                                                                                                                                                                                                        |
| [`suspend_process_instances_batch_operation`](#suspend_process_instances_batch_operation)                           | Suspend process instances (batch) (`POST /process-instances/suspension`).                                                                                                                                                                                                                    |
| [`sync_runtime_backup_state`](#sync_runtime_backup_state)                                                           | Force-write runtime backup state (`POST /backups/runtime/state/sync`).                                                                                                                                                                                                                       |
| [`take_history_backup`](#take_history_backup)                                                                       | Take a history backup (`POST /backups/history`).                                                                                                                                                                                                                                             |
| [`take_runtime_backup`](#take_runtime_backup)                                                                       | Take a runtime backup (`POST /backups/runtime`).                                                                                                                                                                                                                                             |
| [`throw_job_error`](#throw_job_error)                                                                               | Throw a BPMN error from a job.                                                                                                                                                                                                                                                               |
| [`topology`](#topology)                                                                                             | Fetch the cluster topology.                                                                                                                                                                                                                                                                  |
| [`unassign_client_from_group`](#unassign_client_from_group)                                                         | Unassign a client from a group (`DELETE /groups/{groupId}/clients/{clientId}`).                                                                                                                                                                                                              |
| [`unassign_client_from_tenant`](#unassign_client_from_tenant)                                                       | Unassign a client from a tenant (`DELETE /tenants/{tenantId}/clients/{clientId}`).                                                                                                                                                                                                           |
| [`unassign_group_from_tenant`](#unassign_group_from_tenant)                                                         | Unassign a group from a tenant (`DELETE /tenants/{tenantId}/groups/{groupId}`).                                                                                                                                                                                                              |
| [`unassign_mapping_rule_from_group`](#unassign_mapping_rule_from_group)                                             | Unassign a mapping rule from a group (`DELETE /groups/{groupId}/mapping-rules/{mappingRuleId}`).                                                                                                                                                                                             |
| [`unassign_mapping_rule_from_tenant`](#unassign_mapping_rule_from_tenant)                                           | Unassign a mapping rule from a tenant (`DELETE /tenants/{tenantId}/mapping-rules/{mappingRuleId}`).                                                                                                                                                                                          |
| [`unassign_role_from_client`](#unassign_role_from_client)                                                           | Unassign a role from a client (`DELETE /roles/{roleId}/clients/{clientId}`).                                                                                                                                                                                                                 |
| [`unassign_role_from_group`](#unassign_role_from_group)                                                             | Unassign a role from a group (`DELETE /roles/{roleId}/groups/{groupId}`).                                                                                                                                                                                                                    |
| [`unassign_role_from_mapping_rule`](#unassign_role_from_mapping_rule)                                               | Unassign a role from a mapping rule (`DELETE /roles/{roleId}/mapping-rules/{mappingRuleId}`).                                                                                                                                                                                                |
| [`unassign_role_from_tenant`](#unassign_role_from_tenant)                                                           | Unassign a role from a tenant (`DELETE /tenants/{tenantId}/roles/{roleId}`).                                                                                                                                                                                                                 |
| [`unassign_role_from_user`](#unassign_role_from_user)                                                               | Unassign a role from a user (`DELETE /roles/{roleId}/users/{username}`).                                                                                                                                                                                                                     |
| [`unassign_user_from_group`](#unassign_user_from_group)                                                             | Unassign a user from a group (`DELETE /groups/{groupId}/users/{username}`).                                                                                                                                                                                                                  |
| [`unassign_user_from_tenant`](#unassign_user_from_tenant)                                                           | Unassign a user from a tenant (`DELETE /tenants/{tenantId}/users/{username}`).                                                                                                                                                                                                               |
| [`unassign_user_task`](#unassign_user_task)                                                                         | Unassign user task (`DELETE /user-tasks/{userTaskKey}/assignee`).                                                                                                                                                                                                                            |
| [`update_agent_instance`](#update_agent_instance)                                                                   | Update agent instance (`PATCH /agent-instances/{agentInstanceKey}`).                                                                                                                                                                                                                         |
| [`update_authorization`](#update_authorization)                                                                     | Update authorization (`PUT /authorizations/{authorizationKey}`).                                                                                                                                                                                                                             |
| [`update_global_cluster_variable`](#update_global_cluster_variable)                                                 | Update a global-scoped cluster variable (`PUT /cluster-variables/global/{name}`).                                                                                                                                                                                                            |
| [`update_global_task_listener`](#update_global_task_listener)                                                       | Update global user task listener (`PUT /global-task-listeners/{id}`).                                                                                                                                                                                                                        |
| [`update_group`](#update_group)                                                                                     | Update group (`PUT /groups/{groupId}`).                                                                                                                                                                                                                                                      |
| [`update_job`](#update_job)                                                                                         | Update job (`PATCH /jobs/{jobKey}`).                                                                                                                                                                                                                                                         |
| [`update_jobs_batch_operation`](#update_jobs_batch_operation)                                                       | Update jobs (batch) (`POST /jobs/batch-update`).                                                                                                                                                                                                                                             |
| [`update_mapping_rule`](#update_mapping_rule)                                                                       | Update mapping rule (`PUT /mapping-rules/{mappingRuleId}`).                                                                                                                                                                                                                                  |
| [`update_role`](#update_role)                                                                                       | Update role (`PUT /roles/{roleId}`).                                                                                                                                                                                                                                                         |
| [`update_tenant`](#update_tenant)                                                                                   | Update tenant (`PUT /tenants/{tenantId}`).                                                                                                                                                                                                                                                   |
| [`update_tenant_cluster_variable`](#update_tenant_cluster_variable)                                                 | Update a tenant-scoped cluster variable (`PUT /cluster-variables/tenants/{tenantId}/{name}`).                                                                                                                                                                                                |
| [`update_user`](#update_user)                                                                                       | Update user (`PUT /users/{username}`).                                                                                                                                                                                                                                                       |
| [`update_user_task`](#update_user_task)                                                                             | Update user task (`PATCH /user-tasks/{userTaskKey}`).                                                                                                                                                                                                                                        |
| [`worker_config`](#worker_config)                                                                                   | Build a `JobWorkerConfig` for `job_type` pre-seeded from the SDK's resolved worker defaults (env-driven: `CAMUNDA_WORKER_*`). Builder methods override fields.                                                                                                                               |

## Method details

### activate_ad_hoc_sub_process_activities

```rust
pub async fn activate_ad_hoc_sub_process_activities(&self, params: ActivateAdHocSubProcessActivitiesParams) -> Result<()>
```

Activate activities within an ad-hoc sub-process (`POST /element-instances/ad-hoc-activities/{adHocSubProcessInstanceKey}/activation`).

**Example**

```rust
async fn activate_ad_hoc_sub_process_activities(
    ad_hoc_sub_process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .activate_ad_hoc_sub_process_activities(ActivateAdHocSubProcessActivitiesParams {
            ad_hoc_sub_process_instance_key,
            ad_hoc_sub_process_activate_activities_instruction:
                AdHocSubProcessActivateActivitiesInstruction {
                    elements: vec![AdHocSubProcessActivateActivityReference {
                        element_id: ElementId::assume_exists("my-element"),
                        ..Default::default()
                    }],
                    ..Default::default()
                },
        })
        .await?;
    println!("Activate activities within an ad-hoc sub-process: done");

    Ok(())
}
```

### activate_jobs

```rust
pub async fn activate_jobs(&self, request: models::JobActivationRequest) -> Result<models::JobActivationResult>
```

Activate jobs of a given type. Prefer `CamundaClient::create_job_worker` for
continuous polling.

**Example**

```rust
async fn activate_jobs() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // For long-running workers prefer `client.create_job_worker(..)`, which handles
    // polling, back-off, and concurrency for you.
    let activated = client
        .activate_jobs(JobActivationRequest {
            r#type: "payment-service".to_string(),
            timeout: 60_000,
            max_jobs_to_activate: 10,
            worker: Some("payment-worker".to_string()),
            ..Default::default()
        })
        .await?;

    for job in activated.jobs {
        println!("Activated job {} for {}", job.job_key, job.element_id);
    }

    Ok(())
}
```

### assign_client_to_group

```rust
pub async fn assign_client_to_group(&self, params: AssignClientToGroupParams) -> Result<()>
```

Assign a client to a group (`PUT /groups/{groupId}/clients/{clientId}`).

**Example**

```rust
async fn assign_client_to_group(
    group_id: String,
    client_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_client_to_group(AssignClientToGroupParams {
            group_id,
            client_id,
        })
        .await?;
    println!("Assign a client to a group: done");

    Ok(())
}
```

### assign_client_to_tenant

```rust
pub async fn assign_client_to_tenant(&self, params: AssignClientToTenantParams) -> Result<()>
```

Assign a client to a tenant (`PUT /tenants/{tenantId}/clients/{clientId}`).

**Example**

```rust
async fn assign_client_to_tenant(
    tenant_id: String,
    client_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_client_to_tenant(AssignClientToTenantParams {
            tenant_id,
            client_id,
        })
        .await?;
    println!("Assign a client to a tenant: done");

    Ok(())
}
```

### assign_group_to_tenant

```rust
pub async fn assign_group_to_tenant(&self, params: AssignGroupToTenantParams) -> Result<()>
```

Assign a group to a tenant (`PUT /tenants/{tenantId}/groups/{groupId}`).

**Example**

```rust
async fn assign_group_to_tenant(
    tenant_id: String,
    group_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_group_to_tenant(AssignGroupToTenantParams {
            tenant_id,
            group_id,
        })
        .await?;
    println!("Assign a group to a tenant: done");

    Ok(())
}
```

### assign_mapping_rule_to_group

```rust
pub async fn assign_mapping_rule_to_group(&self, params: AssignMappingRuleToGroupParams) -> Result<()>
```

Assign a mapping rule to a group (`PUT /groups/{groupId}/mapping-rules/{mappingRuleId}`).

**Example**

```rust
async fn assign_mapping_rule_to_group(
    group_id: String,
    mapping_rule_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_mapping_rule_to_group(AssignMappingRuleToGroupParams {
            group_id,
            mapping_rule_id,
        })
        .await?;
    println!("Assign a mapping rule to a group: done");

    Ok(())
}
```

### assign_mapping_rule_to_tenant

```rust
pub async fn assign_mapping_rule_to_tenant(&self, params: AssignMappingRuleToTenantParams) -> Result<()>
```

Assign a mapping rule to a tenant (`PUT /tenants/{tenantId}/mapping-rules/{mappingRuleId}`).

**Example**

```rust
async fn assign_mapping_rule_to_tenant(
    tenant_id: String,
    mapping_rule_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_mapping_rule_to_tenant(AssignMappingRuleToTenantParams {
            tenant_id,
            mapping_rule_id,
        })
        .await?;
    println!("Assign a mapping rule to a tenant: done");

    Ok(())
}
```

### assign_process_instance_business_id

```rust
pub async fn assign_process_instance_business_id(&self, params: AssignProcessInstanceBusinessIdParams) -> Result<()>
```

Assign business id to process instance (`POST /process-instances/{processInstanceKey}/business-id-assignment`).

**Example**

```rust
async fn assign_process_instance_business_id(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_process_instance_business_id(AssignProcessInstanceBusinessIdParams {
            process_instance_key,
            process_instance_business_id_assignment_instruction:
                ProcessInstanceBusinessIdAssignmentInstruction {
                    business_id: BusinessId::assume_exists("my-business-id"),
                },
        })
        .await?;
    println!("Assign business id to process instance: done");

    Ok(())
}
```

### assign_role_to_client

```rust
pub async fn assign_role_to_client(&self, params: AssignRoleToClientParams) -> Result<()>
```

Assign a role to a client (`PUT /roles/{roleId}/clients/{clientId}`).

**Example**

```rust
async fn assign_role_to_client(
    role_id: String,
    client_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_role_to_client(AssignRoleToClientParams { role_id, client_id })
        .await?;
    println!("Assign a role to a client: done");

    Ok(())
}
```

### assign_role_to_group

```rust
pub async fn assign_role_to_group(&self, params: AssignRoleToGroupParams) -> Result<()>
```

Assign a role to a group (`PUT /roles/{roleId}/groups/{groupId}`).

**Example**

```rust
async fn assign_role_to_group(
    role_id: String,
    group_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_role_to_group(AssignRoleToGroupParams { role_id, group_id })
        .await?;
    println!("Assign a role to a group: done");

    Ok(())
}
```

### assign_role_to_mapping_rule

```rust
pub async fn assign_role_to_mapping_rule(&self, params: AssignRoleToMappingRuleParams) -> Result<()>
```

Assign a role to a mapping rule (`PUT /roles/{roleId}/mapping-rules/{mappingRuleId}`).

**Example**

```rust
async fn assign_role_to_mapping_rule(
    role_id: String,
    mapping_rule_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_role_to_mapping_rule(AssignRoleToMappingRuleParams {
            role_id,
            mapping_rule_id,
        })
        .await?;
    println!("Assign a role to a mapping rule: done");

    Ok(())
}
```

### assign_role_to_tenant

```rust
pub async fn assign_role_to_tenant(&self, params: AssignRoleToTenantParams) -> Result<()>
```

Assign a role to a tenant (`PUT /tenants/{tenantId}/roles/{roleId}`).

**Example**

```rust
async fn assign_role_to_tenant(
    tenant_id: String,
    role_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_role_to_tenant(AssignRoleToTenantParams { tenant_id, role_id })
        .await?;
    println!("Assign a role to a tenant: done");

    Ok(())
}
```

### assign_role_to_user

```rust
pub async fn assign_role_to_user(&self, params: AssignRoleToUserParams) -> Result<()>
```

Assign a role to a user (`PUT /roles/{roleId}/users/{username}`).

**Example**

```rust
async fn assign_role_to_user(
    role_id: String,
    username: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_role_to_user(AssignRoleToUserParams { role_id, username })
        .await?;
    println!("Assign a role to a user: done");

    Ok(())
}
```

### assign_user_task

```rust
pub async fn assign_user_task(&self, params: AssignUserTaskParams) -> Result<()>
```

Assign user task (`POST /user-tasks/{userTaskKey}/assignment`).

**Example**

```rust
async fn assign_user_task(user_task_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_user_task(AssignUserTaskParams {
            user_task_key,
            user_task_assignment_request: UserTaskAssignmentRequest::default(),
        })
        .await?;
    println!("Assign user task: done");

    Ok(())
}
```

### assign_user_to_group

```rust
pub async fn assign_user_to_group(&self, params: AssignUserToGroupParams) -> Result<()>
```

Assign a user to a group (`PUT /groups/{groupId}/users/{username}`).

**Example**

```rust
async fn assign_user_to_group(
    group_id: String,
    username: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_user_to_group(AssignUserToGroupParams { group_id, username })
        .await?;
    println!("Assign a user to a group: done");

    Ok(())
}
```

### assign_user_to_tenant

```rust
pub async fn assign_user_to_tenant(&self, params: AssignUserToTenantParams) -> Result<()>
```

Assign a user to a tenant (`PUT /tenants/{tenantId}/users/{username}`).

**Example**

```rust
async fn assign_user_to_tenant(
    tenant_id: String,
    username: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_user_to_tenant(AssignUserToTenantParams {
            tenant_id,
            username,
        })
        .await?;
    println!("Assign a user to a tenant: done");

    Ok(())
}
```

### auth

```rust
pub fn auth(&self) -> &Authentication
```

The authentication handler.

### backpressure_state

```rust
pub fn backpressure_state(&self) -> BackpressureState
```

A snapshot of the adaptive backpressure controller's state, for observability.

### broadcast_signal

```rust
pub async fn broadcast_signal(&self, request: models::SignalBroadcastRequest) -> Result<models::SignalBroadcastResult>
```

Broadcast a signal. The configured default tenant id is applied when unset.

**Example**

```rust
async fn broadcast_signal() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let broadcast = client
        .broadcast_signal(SignalBroadcastRequest {
            signal_name: "cancel-all-orders".to_string(),
            variables: Some(
                [("reason".to_string(), serde_json::json!("stock outage"))]
                    .into_iter()
                    .collect(),
            ),
            ..Default::default()
        })
        .await?;

    println!("Broadcast signal {}", broadcast.signal_key);

    Ok(())
}
```

### cancel_batch_operation

```rust
pub async fn cancel_batch_operation(&self, params: CancelBatchOperationParams) -> Result<()>
```

Cancel Batch operation (`POST /batch-operations/{batchOperationKey}/cancellation`).

**Example**

```rust
async fn cancel_batch_operation(
    batch_operation_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .cancel_batch_operation(CancelBatchOperationParams {
            batch_operation_key,
        })
        .await?;
    println!("Cancel Batch operation: done");

    Ok(())
}
```

### cancel_process_instance

```rust
pub async fn cancel_process_instance(&self, process_instance_key: &str, request: Option<models::CancelProcessInstanceRequest>) -> Result<()>
```

Cancel a running process instance by key.

**Example**

```rust
async fn cancel_process_instance(
    process_instance_key: &str,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // Pass `Some(CancelProcessInstanceRequest { .. })` to supply an operation reference.
    client
        .cancel_process_instance(process_instance_key, None)
        .await?;

    println!("Cancelled process instance {process_instance_key}");

    Ok(())
}
```

### cancel_process_instances_batch_operation

```rust
pub async fn cancel_process_instances_batch_operation(&self, params: CancelProcessInstancesBatchOperationParams) -> Result<models::BatchOperationCreatedResult>
```

Cancel process instances (batch) (`POST /process-instances/cancellation`).

**Example**

```rust
async fn cancel_process_instances_batch_operation() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .cancel_process_instances_batch_operation(CancelProcessInstancesBatchOperationParams {
            process_instance_cancellation_batch_operation_request:
                ProcessInstanceCancellationBatchOperationRequest {
                    filter: Box::new(ProcessInstanceFilter::default()),
                    ..Default::default()
                },
        })
        .await?;
    println!("{}", result.batch_operation_key);

    Ok(())
}
```

### change_cluster_mode

```rust
pub async fn change_cluster_mode(&self, params: ChangeClusterModeParams) -> Result<models::ClusterModeChangeResponse>
```

Change cluster mode (`PATCH /mode`).

**Example**

```rust
async fn change_cluster_mode() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .change_cluster_mode(ChangeClusterModeParams {
            mode: Mode::Recovering,
            dry_run: None,
        })
        .await?;
    println!("{}", result.change_id);

    Ok(())
}
```

### change_cluster_mode_as_cluster_admin

```rust
pub async fn change_cluster_mode_as_cluster_admin(&self, params: ChangeClusterModeAsClusterAdminParams) -> Result<models::ClusterModeChangeResponse>
```

Change the cluster mode of one or every physical tenant (`PATCH /cluster/v2/mode`).

**Example**

```rust
async fn change_cluster_mode_as_cluster_admin() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // Omit `physical_tenant_id` to apply the change to every physical tenant.
    let result = client
        .change_cluster_mode_as_cluster_admin(ChangeClusterModeAsClusterAdminParams {
            mode: Mode::Recovering,
            physical_tenant_id: Some("default".to_string()),
            dry_run: Some(true),
        })
        .await?;
    println!("{}", result.change_id);

    Ok(())
}
```

### complete_job

```rust
pub async fn complete_job(&self, job_key: &str, request: Option<models::JobCompletionRequest>) -> Result<()>
```

Complete a job, optionally with output variables.

Job completion is a _drain_ operation and intentionally bypasses the backpressure
gate so in-flight work can always be drained, even while new load is being shed.

**Example**

```rust
async fn complete_job(job_key: &str) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .complete_job(
            job_key,
            Some(JobCompletionRequest {
                variables: Some(Some(
                    [("paymentStatus".to_string(), serde_json::json!("SETTLED"))]
                        .into_iter()
                        .collect(),
                )),
                ..Default::default()
            }),
        )
        .await?;

    println!("Completed job {job_key}");

    Ok(())
}
```

### complete_user_task

```rust
pub async fn complete_user_task(&self, params: CompleteUserTaskParams) -> Result<()>
```

Complete user task (`POST /user-tasks/{userTaskKey}/completion`).

**Example**

```rust
async fn complete_user_task(user_task_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .complete_user_task(CompleteUserTaskParams {
            user_task_key,
            user_task_completion_request: Some(UserTaskCompletionRequest::default()),
        })
        .await?;
    println!("Complete user task: done");

    Ok(())
}
```

### config

```rust
pub fn config(&self) -> &CamundaConfig
```

The resolved configuration.

### configuration

```rust
pub async fn configuration(&self) -> Result<Configuration>
```

Build a generated-client `Configuration` with the base URL set and the current
authentication applied (refreshing the OAuth token if needed).

Use this to call generated operations that the facade does not yet wrap:

```rust
use camunda_orchestration_sdk::client::apis::authentication_api;
let client = CamundaClient::from_env()?;
let cfg = client.configuration().await?;
let me = authentication_api::get_authentication(&cfg).await?;
```

### correlate_message

```rust
pub async fn correlate_message(&self, request: models::MessageCorrelationRequest) -> Result<models::MessageCorrelationResult>
```

Correlate a message to a waiting process instance. The configured default tenant id
is applied when unset.

**Example**

```rust
async fn correlate_message() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // Unlike `publish_message`, this blocks until the message is correlated and
    // returns the process instance it was correlated with.
    let correlated = client
        .correlate_message(MessageCorrelationRequest {
            name: "order-received".to_string(),
            correlation_key: Some("ORD-4711".to_string()),
            variables: Some(
                [("total".to_string(), serde_json::json!(99.5))]
                    .into_iter()
                    .collect(),
            ),
            ..Default::default()
        })
        .await?;

    println!(
        "Correlated message {} with process instance {}",
        correlated.message_key, correlated.process_instance_key
    );

    Ok(())
}
```

### create_admin_user

```rust
pub async fn create_admin_user(&self, params: CreateAdminUserParams) -> Result<models::UserCreateResult>
```

Create admin user (`POST /setup/user`).

**Example**

```rust
async fn create_admin_user() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_admin_user(CreateAdminUserParams {
            user_request: UserRequest {
                password: "my-password".to_string(),
                username: Username::assume_exists("my-user"),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.username);

    Ok(())
}
```

### create_agent_instance

```rust
pub async fn create_agent_instance(&self, params: CreateAgentInstanceParams) -> Result<models::AgentInstanceCreationResult>
```

Create agent instance (`POST /agent-instances`).

**Example**

```rust
async fn create_agent_instance() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_agent_instance(CreateAgentInstanceParams {
            agent_instance_creation_request: AgentInstanceCreationRequest {
                element_instance_key: Box::new(ElementInstanceKey::assume_exists(
                    "my-element-instance",
                )),
                definition: Box::new(AgentInstanceDefinition {
                    model: "my-model".to_string(),
                    provider: "my-provider".to_string(),
                    system_prompt: "my-system-prompt".to_string(),
                }),
                ..Default::default()
            },
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### create_agent_instance_history_item

```rust
pub async fn create_agent_instance_history_item(&self, params: CreateAgentInstanceHistoryItemParams) -> Result<models::AgentInstanceHistoryItemCreationResult>
```

Create agent instance history item (`POST /agent-instances/{agentInstanceKey}/history`).

**Example**

```rust
async fn create_agent_instance_history_item(
    agent_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_agent_instance_history_item(CreateAgentInstanceHistoryItemParams {
            agent_instance_key,
            agent_instance_history_item_request: AgentInstanceHistoryItemRequest {
                element_instance_key: Box::new(ElementInstanceKey::assume_exists(
                    "my-element-instance",
                )),
                job_key: Box::new(JobKey::assume_exists("my-job")),
                job_lease: "my-job-lease".to_string(),
                role: AgentInstanceHistoryRoleEnum::User,
                content: vec![AgentInstanceMessageContent::Text(Box::new(
                    AgentInstanceTextContent {
                        content_type: "TEXT".to_string(),
                        text: "What is the status of my order?".to_string(),
                    },
                ))],
                produced_at: Default::default(),
                ..Default::default()
            },
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### create_authorization

```rust
pub async fn create_authorization(&self, params: CreateAuthorizationParams) -> Result<models::AuthorizationCreateResult>
```

Create authorization (`POST /authorizations`).

**Example**

```rust
async fn create_authorization() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_authorization(CreateAuthorizationParams {
            authorization_request: AuthorizationRequest::AuthorizationIdBasedRequest(Box::new(
                AuthorizationIdBasedRequest {
                    owner_id: "my-owner".to_string(),
                    owner_type: OwnerTypeEnum::User,
                    resource_id: "my-resource".to_string(),
                    resource_type: ResourceTypeEnum::AuditLog,
                    permission_types: vec![PermissionTypeEnum::Access],
                },
            )),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### create_deployment

```rust
pub async fn create_deployment(&self, params: CreateDeploymentParams) -> Result<models::DeploymentResult>
```

Deploy resources (`POST /deployments`).

**Example**

```rust
async fn create_deployment() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // `deploy_resources` reads the files and builds the multipart request for you.
    // BPMN, DMN, and form resources can be deployed together in one atomic call.
    let deployment = client
        .deploy_resources(
            vec![
                PathBuf::from("resources/order-process.bpmn"),
                PathBuf::from("resources/approval.dmn"),
            ],
            None, // tenant id; `None` uses the default tenant
        )
        .await?;

    println!("Deployment {}", deployment.deployment_key);
    for item in deployment.deployments {
        if let Some(process) = item.process_definition {
            println!("  deployed process {}", process.process_definition_id);
        }
    }

    Ok(())
}
```

### create_document

```rust
pub async fn create_document(&self, params: CreateDocumentParams) -> Result<models::DocumentReference>
```

Upload document (`POST /documents`).

**Example**

```rust
async fn create_document() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_document(CreateDocumentParams {
            file: Default::default(),
            store_id: None,
            document_id: None,
            metadata: Some(DocumentMetadata::default()),
        })
        .await?;
    println!("{}", result.document_id);

    Ok(())
}
```

### create_document_link

```rust
pub async fn create_document_link(&self, params: CreateDocumentLinkParams) -> Result<models::DocumentLink>
```

Create document link (`POST /documents/{documentId}/links`).

**Example**

```rust
async fn create_document_link(document_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_document_link(CreateDocumentLinkParams {
            document_id,
            store_id: None,
            content_hash: None,
            document_link_request: Some(DocumentLinkRequest::default()),
        })
        .await?;
    println!("{}", result.url);

    Ok(())
}
```

### create_documents

```rust
pub async fn create_documents(&self, params: CreateDocumentsParams) -> Result<models::DocumentCreationBatchResponse>
```

Upload multiple documents (`POST /documents/batch`).

**Example**

```rust
async fn create_documents() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_documents(CreateDocumentsParams {
            files: vec![Default::default()],
            store_id: None,
            metadata_list: None,
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### create_element_instance_variables

```rust
pub async fn create_element_instance_variables(&self, params: CreateElementInstanceVariablesParams) -> Result<()>
```

Update element instance variables (`PUT /element-instances/{elementInstanceKey}/variables`).

**Example**

```rust
async fn create_element_instance_variables(
    element_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .create_element_instance_variables(CreateElementInstanceVariablesParams {
            element_instance_key,
            set_variable_request: SetVariableRequest {
                variables: [("key".to_string(), serde_json::json!({"key": "value"}))]
                    .into_iter()
                    .collect(),
                ..Default::default()
            },
        })
        .await?;
    println!("Update element instance variables: done");

    Ok(())
}
```

### create_global_cluster_variable

```rust
pub async fn create_global_cluster_variable(&self, params: CreateGlobalClusterVariableParams) -> Result<models::ClusterVariableResult>
```

Create a global-scoped cluster variable (`POST /cluster-variables/global`).

**Example**

```rust
async fn create_global_cluster_variable() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_global_cluster_variable(CreateGlobalClusterVariableParams {
            create_cluster_variable_request: CreateClusterVariableRequest {
                name: ClusterVariableName::assume_exists("my-variable"),
                value: serde_json::json!({"key": "value"}),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.name);

    Ok(())
}
```

### create_global_task_listener

```rust
pub async fn create_global_task_listener(&self, params: CreateGlobalTaskListenerParams) -> Result<models::GlobalTaskListenerResult>
```

Create global user task listener (`POST /global-task-listeners`).

**Example**

```rust
async fn create_global_task_listener() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_global_task_listener(CreateGlobalTaskListenerParams {
            create_global_task_listener_request: CreateGlobalTaskListenerRequest {
                id: GlobalListenerId::assume_exists("my-id"),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.id);

    Ok(())
}
```

### create_group

```rust
pub async fn create_group(&self, params: CreateGroupParams) -> Result<models::GroupCreateResult>
```

Create group (`POST /groups`).

**Example**

```rust
async fn create_group() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_group(CreateGroupParams {
            group_create_request: Some(GroupCreateRequest {
                group_id: GroupId::assume_exists("my-group"),
                name: "my-variable".to_string(),
                ..Default::default()
            }),
        })
        .await?;
    println!("{}", result.group_id);

    Ok(())
}
```

### create_job_worker

```rust
pub fn create_job_worker(&self, config: JobWorkerConfig) -> JobWorker
```

Create a `JobWorker` that continuously polls for and processes jobs of the
configured type. Call `JobWorker::run` (or `JobWorker::start` /
`JobWorker::spawn`) to begin.

### create_mapping_rule

```rust
pub async fn create_mapping_rule(&self, params: CreateMappingRuleParams) -> Result<models::MappingRuleCreateResult>
```

Create mapping rule (`POST /mapping-rules`).

**Example**

```rust
async fn create_mapping_rule() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_mapping_rule(CreateMappingRuleParams {
            mapping_rule_create_request: Some(MappingRuleCreateRequest {
                claim_name: "my-claim-name".to_string(),
                claim_value: "my-claim-value".to_string(),
                name: "my-variable".to_string(),
                mapping_rule_id: MappingRuleId::assume_exists("my-mapping-rule"),
            }),
        })
        .await?;
    println!("{}", result.mapping_rule_id);

    Ok(())
}
```

### create_process_instance

```rust
pub async fn create_process_instance(&self, instruction: models::ProcessInstanceCreationInstruction) -> Result<models::CreateProcessInstanceResult>
```

Create (start) a process instance. The configured default tenant id is applied when
the instruction does not already specify one.

**Example**

```rust
async fn create_process_instance() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // Start by BPMN process id. Use `ProcessInstanceCreationInstructionByKey` to
    // pin a specific deployed version instead.
    let instruction = ProcessInstanceCreationInstruction::ProcessInstanceCreationInstructionById(
        Box::new(ProcessInstanceCreationInstructionById {
            process_definition_id: ProcessDefinitionId::assume_exists("order-process"),
            variables: Some(
                [
                    ("orderId".to_string(), serde_json::json!("ORD-4711")),
                    ("amount".to_string(), serde_json::json!(42)),
                ]
                .into_iter()
                .collect(),
            ),
            ..Default::default()
        }),
    );

    let created = client.create_process_instance(instruction).await?;
    println!("Started process instance {}", created.process_instance_key);

    Ok(())
}
```

### create_role

```rust
pub async fn create_role(&self, params: CreateRoleParams) -> Result<models::RoleCreateResult>
```

Create role (`POST /roles`).

**Example**

```rust
async fn create_role() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_role(CreateRoleParams {
            role_create_request: Some(RoleCreateRequest {
                role_id: RoleId::assume_exists("my-role"),
                name: "my-variable".to_string(),
                ..Default::default()
            }),
        })
        .await?;
    println!("{}", result.role_id);

    Ok(())
}
```

### create_tenant

```rust
pub async fn create_tenant(&self, params: CreateTenantParams) -> Result<models::TenantCreateResult>
```

Create tenant (`POST /tenants`).

**Example**

```rust
async fn create_tenant() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_tenant(CreateTenantParams {
            tenant_create_request: TenantCreateRequest {
                tenant_id: TenantId::assume_exists("my-tenant"),
                name: "my-variable".to_string(),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.name);

    Ok(())
}
```

### create_tenant_cluster_variable

```rust
pub async fn create_tenant_cluster_variable(&self, params: CreateTenantClusterVariableParams) -> Result<models::ClusterVariableResult>
```

Create a tenant-scoped cluster variable (`POST /cluster-variables/tenants/{tenantId}`).

**Example**

```rust
async fn create_tenant_cluster_variable(
    tenant_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_tenant_cluster_variable(CreateTenantClusterVariableParams {
            tenant_id,
            create_cluster_variable_request: CreateClusterVariableRequest {
                name: ClusterVariableName::assume_exists("my-variable"),
                value: serde_json::json!({"key": "value"}),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.name);

    Ok(())
}
```

### create_user

```rust
pub async fn create_user(&self, params: CreateUserParams) -> Result<models::UserCreateResult>
```

Create user (`POST /users`).

**Example**

```rust
async fn create_user() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_user(CreateUserParams {
            user_request: UserRequest {
                password: "my-password".to_string(),
                username: Username::assume_exists("my-user"),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.username);

    Ok(())
}
```

### delete_authorization

```rust
pub async fn delete_authorization(&self, params: DeleteAuthorizationParams) -> Result<()>
```

Delete authorization (`DELETE /authorizations/{authorizationKey}`).

**Example**

```rust
async fn delete_authorization(authorization_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .delete_authorization(DeleteAuthorizationParams { authorization_key })
        .await?;
    println!("Delete authorization: done");

    Ok(())
}
```

### delete_decision_instance

```rust
pub async fn delete_decision_instance(&self, params: DeleteDecisionInstanceParams) -> Result<()>
```

Delete decision instance (`POST /decision-instances/{decisionEvaluationKey}/deletion`).

**Example**

```rust
async fn delete_decision_instance(
    decision_evaluation_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .delete_decision_instance(DeleteDecisionInstanceParams {
            decision_evaluation_key,
            delete_decision_instance_request: Some(DeleteDecisionInstanceRequest::default()),
        })
        .await?;
    println!("Delete decision instance: done");

    Ok(())
}
```

### delete_decision_instances_batch_operation

```rust
pub async fn delete_decision_instances_batch_operation(&self, params: DeleteDecisionInstancesBatchOperationParams) -> Result<models::BatchOperationCreatedResult>
```

Delete decision instances (batch) (`POST /decision-instances/deletion`).

**Example**

```rust
async fn delete_decision_instances_batch_operation() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .delete_decision_instances_batch_operation(DeleteDecisionInstancesBatchOperationParams {
            decision_instance_deletion_batch_operation_request:
                DecisionInstanceDeletionBatchOperationRequest {
                    filter: Box::new(DecisionInstanceFilter::default()),
                    ..Default::default()
                },
        })
        .await?;
    println!("{}", result.batch_operation_key);

    Ok(())
}
```

### delete_document

```rust
pub async fn delete_document(&self, params: DeleteDocumentParams) -> Result<()>
```

Delete document (`DELETE /documents/{documentId}`).

**Example**

```rust
async fn delete_document(document_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .delete_document(DeleteDocumentParams {
            document_id,
            store_id: None,
        })
        .await?;
    println!("Delete document: done");

    Ok(())
}
```

### delete_global_cluster_variable

```rust
pub async fn delete_global_cluster_variable(&self, params: DeleteGlobalClusterVariableParams) -> Result<()>
```

Delete a global-scoped cluster variable (`DELETE /cluster-variables/global/{name}`).

**Example**

```rust
async fn delete_global_cluster_variable(name: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .delete_global_cluster_variable(DeleteGlobalClusterVariableParams { name })
        .await?;
    println!("Delete a global-scoped cluster variable: done");

    Ok(())
}
```

### delete_global_task_listener

```rust
pub async fn delete_global_task_listener(&self, params: DeleteGlobalTaskListenerParams) -> Result<()>
```

Delete global user task listener (`DELETE /global-task-listeners/{id}`).

**Example**

```rust
async fn delete_global_task_listener(id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .delete_global_task_listener(DeleteGlobalTaskListenerParams { id })
        .await?;
    println!("Delete global user task listener: done");

    Ok(())
}
```

### delete_group

```rust
pub async fn delete_group(&self, params: DeleteGroupParams) -> Result<()>
```

Delete group (`DELETE /groups/{groupId}`).

**Example**

```rust
async fn delete_group(group_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client.delete_group(DeleteGroupParams { group_id }).await?;
    println!("Delete group: done");

    Ok(())
}
```

### delete_history_backup

```rust
pub async fn delete_history_backup(&self, params: DeleteHistoryBackupParams) -> Result<()>
```

Delete history backup (`DELETE /backups/history/{backupId}`).

**Example**

```rust
async fn delete_history_backup() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .delete_history_backup(DeleteHistoryBackupParams { backup_id: 1 })
        .await?;
    println!("Delete history backup: done");

    Ok(())
}
```

### delete_mapping_rule

```rust
pub async fn delete_mapping_rule(&self, params: DeleteMappingRuleParams) -> Result<()>
```

Delete a mapping rule (`DELETE /mapping-rules/{mappingRuleId}`).

**Example**

```rust
async fn delete_mapping_rule(mapping_rule_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .delete_mapping_rule(DeleteMappingRuleParams { mapping_rule_id })
        .await?;
    println!("Delete a mapping rule: done");

    Ok(())
}
```

### delete_process_instance

```rust
pub async fn delete_process_instance(&self, params: DeleteProcessInstanceParams) -> Result<()>
```

Delete process instance (`POST /process-instances/{processInstanceKey}/deletion`).

**Example**

```rust
async fn delete_process_instance(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .delete_process_instance(DeleteProcessInstanceParams {
            process_instance_key,
            delete_process_instance_request: Some(DeleteProcessInstanceRequest::default()),
        })
        .await?;
    println!("Delete process instance: done");

    Ok(())
}
```

### delete_process_instances_batch_operation

```rust
pub async fn delete_process_instances_batch_operation(&self, params: DeleteProcessInstancesBatchOperationParams) -> Result<models::BatchOperationCreatedResult>
```

Delete process instances (batch) (`POST /process-instances/deletion`).

**Example**

```rust
async fn delete_process_instances_batch_operation() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .delete_process_instances_batch_operation(DeleteProcessInstancesBatchOperationParams {
            process_instance_deletion_batch_operation_request:
                ProcessInstanceDeletionBatchOperationRequest {
                    filter: Box::new(ProcessInstanceFilter::default()),
                    ..Default::default()
                },
        })
        .await?;
    println!("{}", result.batch_operation_key);

    Ok(())
}
```

### delete_resource

```rust
pub async fn delete_resource(&self, params: DeleteResourceParams) -> Result<models::DeleteResourceResponse>
```

Delete resource (`POST /resources/{resourceKey}/deletion`).

**Example**

```rust
async fn delete_resource(resource_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .delete_resource(DeleteResourceParams {
            resource_key,
            delete_resource_request: Some(DeleteResourceRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### delete_role

```rust
pub async fn delete_role(&self, params: DeleteRoleParams) -> Result<()>
```

Delete role (`DELETE /roles/{roleId}`).

**Example**

```rust
async fn delete_role(role_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client.delete_role(DeleteRoleParams { role_id }).await?;
    println!("Delete role: done");

    Ok(())
}
```

### delete_runtime_backup

```rust
pub async fn delete_runtime_backup(&self, params: DeleteRuntimeBackupParams) -> Result<()>
```

Delete runtime backup (`DELETE /backups/runtime/{backupId}`).

**Example**

```rust
async fn delete_runtime_backup() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .delete_runtime_backup(DeleteRuntimeBackupParams { backup_id: 1 })
        .await?;
    println!("Delete runtime backup: done");

    Ok(())
}
```

### delete_runtime_backup_state

```rust
pub async fn delete_runtime_backup_state(&self) -> Result<()>
```

Delete runtime backup state (`DELETE /backups/runtime/state`).

**Example**

```rust
async fn delete_runtime_backup_state() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client.delete_runtime_backup_state().await?;
    println!("Delete runtime backup state: done");

    Ok(())
}
```

### delete_tenant

```rust
pub async fn delete_tenant(&self, params: DeleteTenantParams) -> Result<()>
```

Delete tenant (`DELETE /tenants/{tenantId}`).

**Example**

```rust
async fn delete_tenant(tenant_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .delete_tenant(DeleteTenantParams { tenant_id })
        .await?;
    println!("Delete tenant: done");

    Ok(())
}
```

### delete_tenant_cluster_variable

```rust
pub async fn delete_tenant_cluster_variable(&self, params: DeleteTenantClusterVariableParams) -> Result<()>
```

Delete a tenant-scoped cluster variable (`DELETE /cluster-variables/tenants/{tenantId}/{name}`).

**Example**

```rust
async fn delete_tenant_cluster_variable(
    tenant_id: String,
    name: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .delete_tenant_cluster_variable(DeleteTenantClusterVariableParams { tenant_id, name })
        .await?;
    println!("Delete a tenant-scoped cluster variable: done");

    Ok(())
}
```

### delete_user

```rust
pub async fn delete_user(&self, params: DeleteUserParams) -> Result<()>
```

Delete user (`DELETE /users/{username}`).

**Example**

```rust
async fn delete_user(username: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client.delete_user(DeleteUserParams { username }).await?;
    println!("Delete user: done");

    Ok(())
}
```

### deploy_resources

```rust
pub async fn deploy_resources(&self, resources: Vec<PathBuf>, tenant_id: Option<String>) -> Result<models::DeploymentResult>
```

Deploy one or more resources (BPMN, DMN, forms) from local file paths. The
configured default tenant id is applied when `tenant_id` is `None`.

### evaluate_conditionals

```rust
pub async fn evaluate_conditionals(&self, params: EvaluateConditionalsParams) -> Result<models::EvaluateConditionalResult>
```

Evaluate root level conditional start events (`POST /conditionals/evaluation`).

**Example**

```rust
async fn evaluate_conditionals() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .evaluate_conditionals(EvaluateConditionalsParams {
            conditional_evaluation_instruction: ConditionalEvaluationInstruction {
                variables: [("key".to_string(), serde_json::json!({"key": "value"}))]
                    .into_iter()
                    .collect(),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.tenant_id);

    Ok(())
}
```

### evaluate_decision

```rust
pub async fn evaluate_decision(&self, instruction: models::DecisionEvaluationInstruction) -> Result<models::EvaluateDecisionResult>
```

Evaluate a decision (DMN). The configured default tenant id is applied when unset.

**Example**

```rust
async fn evaluate_decision() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let instruction =
        DecisionEvaluationInstruction::DecisionEvaluationById(Box::new(DecisionEvaluationById {
            decision_definition_id: DecisionDefinitionId::assume_exists("approval-decision"),
            variables: Some(
                [("amount".to_string(), serde_json::json!(500))]
                    .into_iter()
                    .collect(),
            ),
            ..Default::default()
        }));

    let evaluated = client.evaluate_decision(instruction).await?;

    println!("Decision output: {}", evaluated.output);

    Ok(())
}
```

### evaluate_expression

```rust
pub async fn evaluate_expression(&self, params: EvaluateExpressionParams) -> Result<models::ExpressionEvaluationResult>
```

Evaluate an expression (`POST /expression/evaluation`).

**Example**

```rust
async fn evaluate_expression() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .evaluate_expression(EvaluateExpressionParams {
            expression_evaluation_request: ExpressionEvaluationRequest {
                expression: "my-expression".to_string(),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.expression);

    Ok(())
}
```

### eventual

```rust
pub async fn eventual<T, F, Fut>(&self, options: ConsistencyOptions, op: F) -> Result<T>
```

Poll a read operation until it returns `Ok`, retrying `404 Not Found` (the typical
symptom of a not-yet-replicated read) until the eventual-consistency window elapses.

The default timeout is `CAMUNDA_SDK_EVENTUAL_POLL_DEFAULT_MS`; override per-call with
`ConsistencyOptions`.

### eventual_until

```rust
pub async fn eventual_until<T, F, Fut, P>(&self, options: ConsistencyOptions, op: F, predicate: P) -> Result<T>
```

Poll a read operation until `predicate` is satisfied by its result, retrying `404`
and ignoring consistent-but-not-yet-matching reads, until the eventual-consistency
window elapses.

### fail_job

```rust
pub async fn fail_job(&self, job_key: &str, request: Option<models::JobFailRequest>) -> Result<()>
```

Fail a job, decrementing retries.

**Example**

```rust
async fn fail_job(job_key: &str) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // Setting `retries` to 0 raises an incident instead of retrying.
    client
        .fail_job(
            job_key,
            Some(JobFailRequest {
                retries: Some(2),
                error_message: Some("payment gateway timed out".to_string()),
                retry_back_off: Some(10_000),
                ..Default::default()
            }),
        )
        .await?;

    println!("Failed job {job_key}");

    Ok(())
}
```

### from_env

```rust
pub fn from_env() -> Result<Self>
```

Construct a client from environment variables only.

### get_agent_definition

```rust
pub async fn get_agent_definition(&self, params: GetAgentDefinitionParams) -> Result<models::AgentDefinitionResult>
```

Get agent definition (`GET /agent-definitions/{agentDefinitionKey}`).

**Example**

```rust
async fn get_agent_definition() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_agent_definition(GetAgentDefinitionParams {
            agent_definition_key: "2251799813691958".to_string(),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### get_agent_instance

```rust
pub async fn get_agent_instance(&self, params: GetAgentInstanceParams) -> Result<models::AgentInstanceResult>
```

Get agent instance (`GET /agent-instances/{agentInstanceKey}`).

**Example**

```rust
async fn get_agent_instance(agent_instance_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_agent_instance(GetAgentInstanceParams { agent_instance_key })
        .await?;
    println!("{}", result.element_id);

    Ok(())
}
```

### get_audit_log

```rust
pub async fn get_audit_log(&self, params: GetAuditLogParams) -> Result<models::AuditLogResult>
```

Get audit log (`GET /audit-logs/{auditLogKey}`).

**Example**

```rust
async fn get_audit_log(audit_log_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_audit_log(GetAuditLogParams { audit_log_key })
        .await?;
    println!("{}", result.entity_key);

    Ok(())
}
```

### get_authentication

```rust
pub async fn get_authentication(&self) -> Result<models::CamundaUserResult>
```

Get current user (`GET /authentication/me`).

**Example**

```rust
async fn get_authentication() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client.get_authentication().await?;
    println!("{}", result.username);

    Ok(())
}
```

### get_authorization

```rust
pub async fn get_authorization(&self, params: GetAuthorizationParams) -> Result<models::AuthorizationResult>
```

Get authorization (`GET /authorizations/{authorizationKey}`).

**Example**

```rust
async fn get_authorization(authorization_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_authorization(GetAuthorizationParams { authorization_key })
        .await?;
    println!("{}", result.owner_id);

    Ok(())
}
```

### get_batch_operation

```rust
pub async fn get_batch_operation(&self, params: GetBatchOperationParams) -> Result<models::BatchOperationResponse>
```

Get batch operation (`GET /batch-operations/{batchOperationKey}`).

**Example**

```rust
async fn get_batch_operation(
    batch_operation_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_batch_operation(GetBatchOperationParams {
            batch_operation_key,
        })
        .await?;
    println!("{}", result.batch_operation_key);

    Ok(())
}
```

### get_cluster_status

```rust
pub async fn get_cluster_status(&self) -> Result<models::ClusterStatusResponse>
```

Get the status of the whole cluster (`GET /cluster/v2/status`).

**Example**

```rust
async fn get_cluster_status() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let status = client.get_cluster_status().await?;
    println!("{status:#?}");

    Ok(())
}
```

### get_decision_definition

```rust
pub async fn get_decision_definition(&self, params: GetDecisionDefinitionParams) -> Result<models::DecisionDefinitionResult>
```

Get decision definition (`GET /decision-definitions/{decisionDefinitionKey}`).

**Example**

```rust
async fn get_decision_definition(
    decision_definition_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_decision_definition(GetDecisionDefinitionParams {
            decision_definition_key,
        })
        .await?;
    println!("{}", result.decision_definition_id);

    Ok(())
}
```

### get_decision_definition_xml

```rust
pub async fn get_decision_definition_xml(&self, params: GetDecisionDefinitionXmlParams) -> Result<String>
```

Get decision definition XML (`GET /decision-definitions/{decisionDefinitionKey}/xml`).

**Example**

```rust
async fn get_decision_definition_xml(
    decision_definition_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let xml = client
        .get_decision_definition_xml(GetDecisionDefinitionXmlParams {
            decision_definition_key,
        })
        .await?;

    println!("{xml}");

    Ok(())
}
```

### get_decision_instance

```rust
pub async fn get_decision_instance(&self, params: GetDecisionInstanceParams) -> Result<models::DecisionInstanceGetQueryResult>
```

Get decision instance (`GET /decision-instances/{decisionEvaluationInstanceKey}`).

**Example**

```rust
async fn get_decision_instance(
    decision_evaluation_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_decision_instance(GetDecisionInstanceParams {
            decision_evaluation_instance_key,
        })
        .await?;
    println!("{}", result.decision_evaluation_instance_key);

    Ok(())
}
```

### get_decision_requirements

```rust
pub async fn get_decision_requirements(&self, params: GetDecisionRequirementsParams) -> Result<models::DecisionRequirementsResult>
```

Get decision requirements (`GET /decision-requirements/{decisionRequirementsKey}`).

**Example**

```rust
async fn get_decision_requirements(
    decision_requirements_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_decision_requirements(GetDecisionRequirementsParams {
            decision_requirements_key,
        })
        .await?;
    println!("{}", result.decision_requirements_id);

    Ok(())
}
```

### get_decision_requirements_xml

```rust
pub async fn get_decision_requirements_xml(&self, params: GetDecisionRequirementsXmlParams) -> Result<String>
```

Get decision requirements XML (`GET /decision-requirements/{decisionRequirementsKey}/xml`).

**Example**

```rust
async fn get_decision_requirements_xml(
    decision_requirements_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let xml = client
        .get_decision_requirements_xml(GetDecisionRequirementsXmlParams {
            decision_requirements_key,
        })
        .await?;

    println!("{xml}");

    Ok(())
}
```

### get_document

```rust
pub async fn get_document(&self, params: GetDocumentParams) -> Result<Response>
```

Download document (`GET /documents/{documentId}`).

**Example**

```rust
async fn get_document(document_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_document(GetDocumentParams {
            document_id,
            store_id: None,
            content_hash: None,
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### get_element_instance

```rust
pub async fn get_element_instance(&self, params: GetElementInstanceParams) -> Result<models::ElementInstanceResult>
```

Get element instance (`GET /element-instances/{elementInstanceKey}`).

**Example**

```rust
async fn get_element_instance(
    element_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_element_instance(GetElementInstanceParams {
            element_instance_key,
        })
        .await?;
    println!("{}", result.element_id);

    Ok(())
}
```

### get_exporting_status

```rust
pub async fn get_exporting_status(&self) -> Result<models::ExportingStatusResponse>
```

Get exporting status (`GET /exporting`).

**Example**

```rust
async fn get_exporting_status() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let status = client.get_exporting_status().await?;
    println!("{status:#?}");

    Ok(())
}
```

### get_form_by_key

```rust
pub async fn get_form_by_key(&self, params: GetFormByKeyParams) -> Result<models::FormResult>
```

Get form by key (`GET /forms/{formKey}`).

**Example**

```rust
async fn get_form_by_key(form_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_form_by_key(GetFormByKeyParams { form_key })
        .await?;
    println!("{}", result.form_id);

    Ok(())
}
```

### get_global_cluster_variable

```rust
pub async fn get_global_cluster_variable(&self, params: GetGlobalClusterVariableParams) -> Result<models::ClusterVariableResult>
```

Get a global-scoped cluster variable (`GET /cluster-variables/global/{name}`).

**Example**

```rust
async fn get_global_cluster_variable(name: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_global_cluster_variable(GetGlobalClusterVariableParams { name })
        .await?;
    println!("{}", result.name);

    Ok(())
}
```

### get_global_job_statistics

```rust
pub async fn get_global_job_statistics(&self, params: GetGlobalJobStatisticsParams) -> Result<models::GlobalJobStatisticsQueryResult>
```

Global job statistics (`GET /jobs/statistics/global`).

**Example**

```rust
async fn get_global_job_statistics() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_global_job_statistics(GetGlobalJobStatisticsParams {
            from: Default::default(),
            to: Default::default(),
            job_type: None,
        })
        .await?;
    println!("{}", result.is_incomplete);

    Ok(())
}
```

### get_global_task_listener

```rust
pub async fn get_global_task_listener(&self, params: GetGlobalTaskListenerParams) -> Result<models::GlobalTaskListenerResult>
```

Get global user task listener (`GET /global-task-listeners/{id}`).

**Example**

```rust
async fn get_global_task_listener(id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_global_task_listener(GetGlobalTaskListenerParams { id })
        .await?;
    println!("{}", result.id);

    Ok(())
}
```

### get_group

```rust
pub async fn get_group(&self, params: GetGroupParams) -> Result<models::GroupResult>
```

Get group (`GET /groups/{groupId}`).

**Example**

```rust
async fn get_group(group_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client.get_group(GetGroupParams { group_id }).await?;
    println!("{}", result.group_id);

    Ok(())
}
```

### get_history_backup

```rust
pub async fn get_history_backup(&self, params: GetHistoryBackupParams) -> Result<models::HistoryBackupInfo>
```

Get history backup (`GET /backups/history/{backupId}`).

**Example**

```rust
async fn get_history_backup() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_history_backup(GetHistoryBackupParams { backup_id: 1 })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### get_incident

```rust
pub async fn get_incident(&self, params: GetIncidentParams) -> Result<models::IncidentResult>
```

Get incident (`GET /incidents/{incidentKey}`).

**Example**

```rust
async fn get_incident(incident_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_incident(GetIncidentParams { incident_key })
        .await?;
    println!("{}", result.element_id);

    Ok(())
}
```

### get_job_error_statistics

```rust
pub async fn get_job_error_statistics(&self, params: GetJobErrorStatisticsParams) -> Result<models::JobErrorStatisticsQueryResult>
```

Get error metrics for a job type (`POST /jobs/statistics/errors`).

**Example**

```rust
async fn get_job_error_statistics() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_job_error_statistics(GetJobErrorStatisticsParams {
            job_error_statistics_query: JobErrorStatisticsQuery {
                filter: Box::new(JobErrorStatisticsFilter {
                    from: Default::default(),
                    to: Default::default(),
                    job_type: "payment-service".to_string(),
                    ..Default::default()
                }),
                ..Default::default()
            },
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### get_job_time_series_statistics

```rust
pub async fn get_job_time_series_statistics(&self, params: GetJobTimeSeriesStatisticsParams) -> Result<models::JobTimeSeriesStatisticsQueryResult>
```

Get time-series metrics for a job type (`POST /jobs/statistics/time-series`).

**Example**

```rust
async fn get_job_time_series_statistics() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_job_time_series_statistics(GetJobTimeSeriesStatisticsParams {
            job_time_series_statistics_query: JobTimeSeriesStatisticsQuery {
                filter: Box::new(JobTimeSeriesStatisticsFilter {
                    from: Default::default(),
                    to: Default::default(),
                    job_type: "payment-service".to_string(),
                    ..Default::default()
                }),
                ..Default::default()
            },
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### get_job_type_statistics

```rust
pub async fn get_job_type_statistics(&self, params: GetJobTypeStatisticsParams) -> Result<models::JobTypeStatisticsQueryResult>
```

Get job statistics by type (`POST /jobs/statistics/by-types`).

**Example**

```rust
async fn get_job_type_statistics() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_job_type_statistics(GetJobTypeStatisticsParams {
            job_type_statistics_query: JobTypeStatisticsQuery::default(),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### get_job_worker_statistics

```rust
pub async fn get_job_worker_statistics(&self, params: GetJobWorkerStatisticsParams) -> Result<models::JobWorkerStatisticsQueryResult>
```

Get job statistics by worker (`POST /jobs/statistics/by-workers`).

**Example**

```rust
async fn get_job_worker_statistics() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_job_worker_statistics(GetJobWorkerStatisticsParams {
            job_worker_statistics_query: JobWorkerStatisticsQuery {
                filter: Box::new(JobWorkerStatisticsFilter {
                    from: Default::default(),
                    to: Default::default(),
                    job_type: "payment-service".to_string(),
                }),
                ..Default::default()
            },
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### get_license

```rust
pub async fn get_license(&self) -> Result<models::LicenseResponse>
```

Get license status (`GET /license`).

**Example**

```rust
async fn get_license() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client.get_license().await?;
    println!("{}", result.license_type);

    Ok(())
}
```

### get_mapping_rule

```rust
pub async fn get_mapping_rule(&self, params: GetMappingRuleParams) -> Result<models::MappingRuleResult>
```

Get a mapping rule (`GET /mapping-rules/{mappingRuleId}`).

**Example**

```rust
async fn get_mapping_rule(mapping_rule_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_mapping_rule(GetMappingRuleParams { mapping_rule_id })
        .await?;
    println!("{}", result.mapping_rule_id);

    Ok(())
}
```

### get_process_definition

```rust
pub async fn get_process_definition(&self, params: GetProcessDefinitionParams) -> Result<models::ProcessDefinitionResult>
```

Get process definition (`GET /process-definitions/{processDefinitionKey}`).

**Example**

```rust
async fn get_process_definition(
    process_definition_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_process_definition(GetProcessDefinitionParams {
            process_definition_key,
        })
        .await?;
    println!("{}", result.process_definition_id);

    Ok(())
}
```

### get_process_definition_instance_statistics

```rust
pub async fn get_process_definition_instance_statistics(&self, params: GetProcessDefinitionInstanceStatisticsParams) -> Result<models::ProcessDefinitionInstanceStatisticsQueryResult>
```

Get process instance statistics (`POST /process-definitions/statistics/process-instances`).

**Example**

```rust
async fn get_process_definition_instance_statistics() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_process_definition_instance_statistics(GetProcessDefinitionInstanceStatisticsParams {
            process_definition_instance_statistics_query: Some(
                ProcessDefinitionInstanceStatisticsQuery::default(),
            ),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### get_process_definition_instance_version_statistics

```rust
pub async fn get_process_definition_instance_version_statistics(&self, params: GetProcessDefinitionInstanceVersionStatisticsParams) -> Result<models::ProcessDefinitionInstanceVersionStatisticsQueryResult>
```

Get process instance statistics by version (`POST /process-definitions/statistics/process-instances-by-version`).

**Example**

```rust
async fn get_process_definition_instance_version_statistics(
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_process_definition_instance_version_statistics(
            GetProcessDefinitionInstanceVersionStatisticsParams {
                process_definition_instance_version_statistics_query:
                    ProcessDefinitionInstanceVersionStatisticsQuery {
                        filter: Box::new(ProcessDefinitionInstanceVersionStatisticsFilter {
                            process_definition_id: ProcessDefinitionId::assume_exists("my-process"),
                            ..Default::default()
                        }),
                        ..Default::default()
                    },
            },
        )
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### get_process_definition_message_subscription_statistics

```rust
pub async fn get_process_definition_message_subscription_statistics(&self, params: GetProcessDefinitionMessageSubscriptionStatisticsParams) -> Result<models::ProcessDefinitionMessageSubscriptionStatisticsQueryResult>
```

Get message subscription statistics (`POST /process-definitions/statistics/message-subscriptions`).

**Example**

```rust
async fn get_process_definition_message_subscription_statistics(
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_process_definition_message_subscription_statistics(
            GetProcessDefinitionMessageSubscriptionStatisticsParams {
                process_definition_message_subscription_statistics_query: Some(
                    ProcessDefinitionMessageSubscriptionStatisticsQuery::default(),
                ),
            },
        )
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### get_process_definition_statistics

```rust
pub async fn get_process_definition_statistics(&self, params: GetProcessDefinitionStatisticsParams) -> Result<models::ProcessDefinitionElementStatisticsQueryResult>
```

Get process definition statistics (`POST /process-definitions/{processDefinitionKey}/statistics/element-instances`).

**Example**

```rust
async fn get_process_definition_statistics(
    process_definition_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_process_definition_statistics(GetProcessDefinitionStatisticsParams {
            process_definition_key,
            process_definition_element_statistics_query: Some(
                ProcessDefinitionElementStatisticsQuery::default(),
            ),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### get_process_definition_xml

```rust
pub async fn get_process_definition_xml(&self, params: GetProcessDefinitionXmlParams) -> Result<String>
```

Get process definition XML (`GET /process-definitions/{processDefinitionKey}/xml`).

**Example**

```rust
async fn get_process_definition_xml(
    process_definition_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let xml = client
        .get_process_definition_xml(GetProcessDefinitionXmlParams {
            process_definition_key,
        })
        .await?;

    println!("{xml}");

    Ok(())
}
```

### get_process_instance

```rust
pub async fn get_process_instance(&self, process_instance_key: &str) -> Result<models::ProcessInstanceResult>
```

Fetch a process instance by key (a read; not subject to backpressure). Returns a
`404` `CamundaError::Api` if not yet visible — compose with `CamundaClient::eventual`
to wait through replication lag.

**Example**

```rust
async fn get_process_instance(
    process_instance_key: &str,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let instance = client.get_process_instance(process_instance_key).await?;

    println!("Process:  {}", instance.process_definition_id);
    println!("State:    {:?}", instance.state);
    println!("Incident: {}", instance.has_incident);

    Ok(())
}
```

### get_process_instance_call_hierarchy

```rust
pub async fn get_process_instance_call_hierarchy(&self, params: GetProcessInstanceCallHierarchyParams) -> Result<Vec<models::ProcessInstanceCallHierarchyEntry>>
```

Get call hierarchy (`GET /process-instances/{processInstanceKey}/call-hierarchy`).

**Example**

```rust
async fn get_process_instance_call_hierarchy(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_process_instance_call_hierarchy(GetProcessInstanceCallHierarchyParams {
            process_instance_key,
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### get_process_instance_sequence_flows

```rust
pub async fn get_process_instance_sequence_flows(&self, params: GetProcessInstanceSequenceFlowsParams) -> Result<models::ProcessInstanceSequenceFlowsQueryResult>
```

Get sequence flows (`GET /process-instances/{processInstanceKey}/sequence-flows`).

**Example**

```rust
async fn get_process_instance_sequence_flows(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_process_instance_sequence_flows(GetProcessInstanceSequenceFlowsParams {
            process_instance_key,
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### get_process_instance_statistics

```rust
pub async fn get_process_instance_statistics(&self, params: GetProcessInstanceStatisticsParams) -> Result<models::ProcessInstanceElementStatisticsQueryResult>
```

Get element instance statistics (`GET /process-instances/{processInstanceKey}/statistics/element-instances`).

**Example**

```rust
async fn get_process_instance_statistics(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_process_instance_statistics(GetProcessInstanceStatisticsParams {
            process_instance_key,
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### get_process_instance_statistics_by_definition

```rust
pub async fn get_process_instance_statistics_by_definition(&self, params: GetProcessInstanceStatisticsByDefinitionParams) -> Result<models::IncidentProcessInstanceStatisticsByDefinitionQueryResult>
```

Get process instance statistics by definition (`POST /incidents/statistics/process-instances-by-definition`).

**Example**

```rust
async fn get_process_instance_statistics_by_definition() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_process_instance_statistics_by_definition(
            GetProcessInstanceStatisticsByDefinitionParams {
                incident_process_instance_statistics_by_definition_query:
                    IncidentProcessInstanceStatisticsByDefinitionQuery {
                        filter: Box::new(IncidentProcessInstanceStatisticsByDefinitionFilter {
                            error_hash_code: 1,
                        }),
                        ..Default::default()
                    },
            },
        )
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### get_process_instance_statistics_by_error

```rust
pub async fn get_process_instance_statistics_by_error(&self, params: GetProcessInstanceStatisticsByErrorParams) -> Result<models::IncidentProcessInstanceStatisticsByErrorQueryResult>
```

Get process instance statistics by error (`POST /incidents/statistics/process-instances-by-error`).

**Example**

```rust
async fn get_process_instance_statistics_by_error() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_process_instance_statistics_by_error(GetProcessInstanceStatisticsByErrorParams {
            incident_process_instance_statistics_by_error_query: Some(
                IncidentProcessInstanceStatisticsByErrorQuery::default(),
            ),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### get_process_instance_wait_state_statistics

```rust
pub async fn get_process_instance_wait_state_statistics(&self, params: GetProcessInstanceWaitStateStatisticsParams) -> Result<models::ProcessInstanceWaitStateStatisticsQueryResult>
```

Get wait state statistics (`GET /process-instances/{processInstanceKey}/statistics/wait-states`).

**Example**

```rust
async fn get_process_instance_wait_state_statistics(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_process_instance_wait_state_statistics(GetProcessInstanceWaitStateStatisticsParams {
            process_instance_key,
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### get_resource

```rust
pub async fn get_resource(&self, params: GetResourceParams) -> Result<models::ResourceResult>
```

Get resource (`GET /resources/{resourceKey}`).

**Example**

```rust
async fn get_resource(resource_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_resource(GetResourceParams { resource_key })
        .await?;
    println!("{}", result.resource_id);

    Ok(())
}
```

### get_resource_content

```rust
pub async fn get_resource_content(&self, params: GetResourceContentParams) -> Result<HashMap<String, Value>>
```

Get RPA resource content (deprecated) (`GET /resources/{resourceKey}/content`).

**Example**

```rust
async fn get_resource_content(resource_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_resource_content(GetResourceContentParams { resource_key })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### get_resource_content_binary

```rust
pub async fn get_resource_content_binary(&self, params: GetResourceContentBinaryParams) -> Result<Response>
```

Get resource content as binary (`GET /resources/{resourceKey}/content/binary`).

**Example**

```rust
async fn get_resource_content_binary(
    resource_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_resource_content_binary(GetResourceContentBinaryParams { resource_key })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### get_restore_status

```rust
pub async fn get_restore_status(&self) -> Result<models::RestoreStatusResponse>
```

Get the status of the restore that is currently in progress (`GET /restore`).

**Example**

```rust
async fn get_restore_status() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let status = client.get_restore_status().await?;
    println!("{status:#?}");

    Ok(())
}
```

### get_role

```rust
pub async fn get_role(&self, params: GetRoleParams) -> Result<models::RoleResult>
```

Get role (`GET /roles/{roleId}`).

**Example**

```rust
async fn get_role(role_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client.get_role(GetRoleParams { role_id }).await?;
    println!("{}", result.role_id);

    Ok(())
}
```

### get_runtime_backup

```rust
pub async fn get_runtime_backup(&self, params: GetRuntimeBackupParams) -> Result<models::BackupInfo>
```

Get runtime backup (`GET /backups/runtime/{backupId}`).

**Example**

```rust
async fn get_runtime_backup() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_runtime_backup(GetRuntimeBackupParams { backup_id: 1 })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### get_runtime_backup_state

```rust
pub async fn get_runtime_backup_state(&self) -> Result<models::RuntimeBackupState>
```

Get runtime backup state (`GET /backups/runtime/state`).

**Example**

```rust
async fn get_runtime_backup_state() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let state = client.get_runtime_backup_state().await?;
    println!("{state:#?}");

    Ok(())
}
```

### get_start_process_form

```rust
pub async fn get_start_process_form(&self, params: GetStartProcessFormParams) -> Result<models::FormResult>
```

Get process start form (`GET /process-definitions/{processDefinitionKey}/form`).

**Example**

```rust
async fn get_start_process_form(
    process_definition_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_start_process_form(GetStartProcessFormParams {
            process_definition_key,
        })
        .await?;
    println!("{}", result.form_id);

    Ok(())
}
```

### get_status

```rust
pub async fn get_status(&self) -> Result<()>
```

Get physical tenant status (`GET /status`).

**Example**

```rust
async fn get_status() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client.get_status().await?;
    println!("Get cluster status: done");

    Ok(())
}
```

### get_system_configuration

```rust
pub async fn get_system_configuration(&self) -> Result<models::SystemConfigurationResponse>
```

System configuration (alpha) (`GET /system/configuration`).

**Example**

```rust
async fn get_system_configuration() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client.get_system_configuration().await?;
    println!("{result:#?}");

    Ok(())
}
```

### get_tenant

```rust
pub async fn get_tenant(&self, params: GetTenantParams) -> Result<models::TenantResult>
```

Get tenant (`GET /tenants/{tenantId}`).

**Example**

```rust
async fn get_tenant(tenant_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client.get_tenant(GetTenantParams { tenant_id }).await?;
    println!("{}", result.name);

    Ok(())
}
```

### get_tenant_cluster_variable

```rust
pub async fn get_tenant_cluster_variable(&self, params: GetTenantClusterVariableParams) -> Result<models::ClusterVariableResult>
```

Get a tenant-scoped cluster variable (`GET /cluster-variables/tenants/{tenantId}/{name}`).

**Example**

```rust
async fn get_tenant_cluster_variable(
    tenant_id: String,
    name: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_tenant_cluster_variable(GetTenantClusterVariableParams { tenant_id, name })
        .await?;
    println!("{}", result.name);

    Ok(())
}
```

### get_usage_metrics

```rust
pub async fn get_usage_metrics(&self, params: GetUsageMetricsParams) -> Result<models::UsageMetricsResponse>
```

Get usage metrics (`GET /system/usage-metrics`).

**Example**

```rust
async fn get_usage_metrics() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_usage_metrics(GetUsageMetricsParams {
            start_time: Default::default(),
            end_time: Default::default(),
            tenant_id: None,
            with_tenants: None,
        })
        .await?;
    println!("{}", result.active_tenants);

    Ok(())
}
```

### get_user

```rust
pub async fn get_user(&self, params: GetUserParams) -> Result<models::UserResult>
```

Get user (`GET /users/{username}`).

**Example**

```rust
async fn get_user(username: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client.get_user(GetUserParams { username }).await?;
    println!("{}", result.username);

    Ok(())
}
```

### get_user_task

```rust
pub async fn get_user_task(&self, params: GetUserTaskParams) -> Result<models::UserTaskResult>
```

Get user task (`GET /user-tasks/{userTaskKey}`).

**Example**

```rust
async fn get_user_task(user_task_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_user_task(GetUserTaskParams { user_task_key })
        .await?;
    println!("{}", result.element_id);

    Ok(())
}
```

### get_user_task_form

```rust
pub async fn get_user_task_form(&self, params: GetUserTaskFormParams) -> Result<models::FormResult>
```

Get user task form (`GET /user-tasks/{userTaskKey}/form`).

**Example**

```rust
async fn get_user_task_form(user_task_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_user_task_form(GetUserTaskFormParams { user_task_key })
        .await?;
    println!("{}", result.form_id);

    Ok(())
}
```

### get_variable

```rust
pub async fn get_variable(&self, params: GetVariableParams) -> Result<models::VariableResult>
```

Get variable (`GET /variables/{variableKey}`).

**Example**

```rust
async fn get_variable(variable_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_variable(GetVariableParams { variable_key })
        .await?;
    println!("{}", result.name);

    Ok(())
}
```

### init_logging

```rust
pub fn init_logging(&self) -> bool
```

Install a formatting `tracing` subscriber filtered to the configured
`CAMUNDA_SDK_LOG_LEVEL`. No-op if a global subscriber is already set or logging is
off. Returns `true` if this call installed the subscriber.

### list_history_backups

```rust
pub async fn list_history_backups(&self, params: ListHistoryBackupsParams) -> Result<Vec<models::HistoryBackupInfo>>
```

List history backups (`GET /backups/history`).

**Example**

```rust
async fn list_history_backups() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // `prefix` must end in a single '*'. Setting `verbose` to false makes the
    // query cheaper, at the cost of snapshot-level detail.
    let backups = client
        .list_history_backups(ListHistoryBackupsParams {
            prefix: None,
            verbose: None,
        })
        .await?;
    for backup in backups {
        println!("{backup:#?}");
    }

    Ok(())
}
```

### list_runtime_backups

```rust
pub async fn list_runtime_backups(&self, params: ListRuntimeBackupsParams) -> Result<Vec<models::BackupInfo>>
```

List runtime backups (`GET /backups/runtime`).

**Example**

```rust
async fn list_runtime_backups() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let backups = client
        .list_runtime_backups(ListRuntimeBackupsParams { prefix: None })
        .await?;
    for backup in backups {
        println!("{backup:#?}");
    }

    Ok(())
}
```

### list_secrets

```rust
pub async fn list_secrets(&self, params: ListSecretsParams) -> Result<models::SecretListResult>
```

List secrets (alpha) (`POST /secrets/list`).

**Example**

```rust
async fn list_secrets() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .list_secrets(ListSecretsParams { body: None })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### migrate_process_instance

```rust
pub async fn migrate_process_instance(&self, params: MigrateProcessInstanceParams) -> Result<()>
```

Migrate process instance (`POST /process-instances/{processInstanceKey}/migration`).

**Example**

```rust
async fn migrate_process_instance(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .migrate_process_instance(MigrateProcessInstanceParams {
            process_instance_key,
            process_instance_migration_instruction: ProcessInstanceMigrationInstruction {
                target_process_definition_key: Box::new(ProcessDefinitionKey::assume_exists(
                    "my-target-process-definition",
                )),
                mapping_instructions: vec![MigrateProcessInstanceMappingInstruction {
                    source_element_id: ElementId::assume_exists("my-source-element"),
                    target_element_id: ElementId::assume_exists("my-target-element"),
                }],
                ..Default::default()
            },
        })
        .await?;
    println!("Migrate process instance: done");

    Ok(())
}
```

### migrate_process_instances_batch_operation

```rust
pub async fn migrate_process_instances_batch_operation(&self, params: MigrateProcessInstancesBatchOperationParams) -> Result<models::BatchOperationCreatedResult>
```

Migrate process instances (batch) (`POST /process-instances/migration`).

**Example**

```rust
async fn migrate_process_instances_batch_operation() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .migrate_process_instances_batch_operation(MigrateProcessInstancesBatchOperationParams {
            process_instance_migration_batch_operation_request:
                ProcessInstanceMigrationBatchOperationRequest {
                    filter: Box::new(ProcessInstanceFilter::default()),
                    migration_plan: Box::new(ProcessInstanceMigrationBatchOperationPlan {
                        target_process_definition_key: Box::new(
                            ProcessDefinitionKey::assume_exists("my-target-process-definition"),
                        ),
                        mapping_instructions: vec![Default::default()],
                    }),
                    ..Default::default()
                },
        })
        .await?;
    println!("{}", result.batch_operation_key);

    Ok(())
}
```

### modify_process_instance

```rust
pub async fn modify_process_instance(&self, params: ModifyProcessInstanceParams) -> Result<()>
```

Modify process instance (`POST /process-instances/{processInstanceKey}/modification`).

**Example**

```rust
async fn modify_process_instance(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .modify_process_instance(ModifyProcessInstanceParams {
            process_instance_key,
            process_instance_modification_instruction:
                ProcessInstanceModificationInstruction::default(),
        })
        .await?;
    println!("Modify process instance: done");

    Ok(())
}
```

### modify_process_instances_batch_operation

```rust
pub async fn modify_process_instances_batch_operation(&self, params: ModifyProcessInstancesBatchOperationParams) -> Result<models::BatchOperationCreatedResult>
```

Modify process instances (batch) (`POST /process-instances/modification`).

**Example**

```rust
async fn modify_process_instances_batch_operation() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .modify_process_instances_batch_operation(ModifyProcessInstancesBatchOperationParams {
            process_instance_modification_batch_operation_request:
                ProcessInstanceModificationBatchOperationRequest {
                    filter: Box::new(ProcessInstanceFilter::default()),
                    move_instructions: vec![
                        ProcessInstanceModificationMoveBatchOperationInstruction {
                            source_element_id: ElementId::assume_exists("my-source-element"),
                            target_element_id: ElementId::assume_exists("my-target-element"),
                        },
                    ],
                    ..Default::default()
                },
        })
        .await?;
    println!("{}", result.batch_operation_key);

    Ok(())
}
```

### new

```rust
pub fn new(options: CamundaOptions) -> Result<Self>
```

Construct a client from `CamundaOptions` (environment + overrides).

### pause_exporting

```rust
pub async fn pause_exporting(&self, params: PauseExportingParams) -> Result<()>
```

Pause exporting (`POST /exporting/pause`).

**Example**

```rust
async fn pause_exporting() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .pause_exporting(PauseExportingParams { soft: Some(true) })
        .await?;
    println!("Pause exporting: done");

    Ok(())
}
```

### pin_clock

```rust
pub async fn pin_clock(&self, params: PinClockParams) -> Result<()>
```

Pin internal clock (alpha) (`PUT /clock`).

**Example**

```rust
async fn pin_clock() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .pin_clock(PinClockParams {
            clock_pin_request: ClockPinRequest { timestamp: 1 },
        })
        .await?;
    println!("Pin internal clock (alpha): done");

    Ok(())
}
```

### publish_message

```rust
pub async fn publish_message(&self, request: models::MessagePublicationRequest) -> Result<models::MessagePublicationResult>
```

Publish a message (no correlation key matching against active subscriptions only —
buffered). The configured default tenant id is applied when unset.

**Example**

```rust
async fn publish_message() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let published = client
        .publish_message(MessagePublicationRequest {
            name: "order-received".to_string(),
            correlation_key: Some("ORD-4711".to_string()),
            time_to_live: Some(60_000),
            variables: Some(
                [("total".to_string(), serde_json::json!(99.5))]
                    .into_iter()
                    .collect(),
            ),
            ..Default::default()
        })
        .await?;

    println!("Published message {}", published.message_key);

    Ok(())
}
```

### reset_clock

```rust
pub async fn reset_clock(&self) -> Result<()>
```

Reset internal clock (alpha) (`POST /clock/reset`).

**Example**

```rust
async fn reset_clock() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client.reset_clock().await?;
    println!("Reset internal clock (alpha): done");

    Ok(())
}
```

### resolve_incident

```rust
pub async fn resolve_incident(&self, params: ResolveIncidentParams) -> Result<()>
```

Resolve incident (`POST /incidents/{incidentKey}/resolution`).

**Example**

```rust
async fn resolve_incident(incident_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .resolve_incident(ResolveIncidentParams {
            incident_key,
            incident_resolution_request: Some(IncidentResolutionRequest::default()),
        })
        .await?;
    println!("Resolve incident: done");

    Ok(())
}
```

### resolve_incidents_batch_operation

```rust
pub async fn resolve_incidents_batch_operation(&self, params: ResolveIncidentsBatchOperationParams) -> Result<models::BatchOperationCreatedResult>
```

Resolve related incidents (batch) (`POST /process-instances/incident-resolution`).

**Example**

```rust
async fn resolve_incidents_batch_operation() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .resolve_incidents_batch_operation(ResolveIncidentsBatchOperationParams {
            process_instance_incident_resolution_batch_operation_request: Some(
                ProcessInstanceIncidentResolutionBatchOperationRequest {
                    filter: Box::new(ProcessInstanceFilter::default()),
                    ..Default::default()
                },
            ),
        })
        .await?;
    println!("{}", result.batch_operation_key);

    Ok(())
}
```

### resolve_process_instance_incidents

```rust
pub async fn resolve_process_instance_incidents(&self, params: ResolveProcessInstanceIncidentsParams) -> Result<models::BatchOperationCreatedResult>
```

Resolve related incidents (`POST /process-instances/{processInstanceKey}/incident-resolution`).

**Example**

```rust
async fn resolve_process_instance_incidents(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .resolve_process_instance_incidents(ResolveProcessInstanceIncidentsParams {
            process_instance_key,
        })
        .await?;
    println!("{}", result.batch_operation_key);

    Ok(())
}
```

### resolve_secrets

```rust
pub async fn resolve_secrets(&self, params: ResolveSecretsParams) -> Result<models::SecretResolveResult>
```

Resolve secrets (alpha) (`POST /secrets/resolve`).

**Example**

```rust
async fn resolve_secrets() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .resolve_secrets(ResolveSecretsParams {
            secret_resolve_request: SecretResolveRequest {
                references: vec!["camunda.secrets.my-secret".to_string()],
            },
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### restore

```rust
pub async fn restore(&self, params: RestoreParams) -> Result<models::ClusterModeChangeResponse>
```

Restore from a backup (`POST /restore`).

**Example**

```rust
async fn restore() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .restore(RestoreParams {
            restore_request: RestoreRequest::default(),
            dry_run: None,
        })
        .await?;
    println!("{}", result.change_id);

    Ok(())
}
```

### resume_batch_operation

```rust
pub async fn resume_batch_operation(&self, params: ResumeBatchOperationParams) -> Result<()>
```

Resume Batch operation (`POST /batch-operations/{batchOperationKey}/resumption`).

**Example**

```rust
async fn resume_batch_operation(
    batch_operation_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .resume_batch_operation(ResumeBatchOperationParams {
            batch_operation_key,
        })
        .await?;
    println!("Resume Batch operation: done");

    Ok(())
}
```

### resume_exporting

```rust
pub async fn resume_exporting(&self) -> Result<()>
```

Resume exporting (`POST /exporting/resume`).

**Example**

```rust
async fn resume_exporting() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client.resume_exporting().await?;
    println!("Resume exporting: done");

    Ok(())
}
```

### resume_process_instance

```rust
pub async fn resume_process_instance(&self, params: ResumeProcessInstanceParams) -> Result<()>
```

Resume process instance (`POST /process-instances/{processInstanceKey}/resumption`).

**Example**

```rust
async fn resume_process_instance(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .resume_process_instance(ResumeProcessInstanceParams {
            process_instance_key,
            resume_process_instance_request: Some(ResumeProcessInstanceRequest::default()),
        })
        .await?;
    println!("Resume process instance: done");

    Ok(())
}
```

### resume_process_instances_batch_operation

```rust
pub async fn resume_process_instances_batch_operation(&self, params: ResumeProcessInstancesBatchOperationParams) -> Result<models::BatchOperationCreatedResult>
```

Resume process instances (batch) (`POST /process-instances/resumption`).

**Example**

```rust
async fn resume_process_instances_batch_operation() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .resume_process_instances_batch_operation(ResumeProcessInstancesBatchOperationParams {
            process_instance_resumption_batch_operation_request:
                ProcessInstanceResumptionBatchOperationRequest {
                    filter: Box::new(ProcessInstanceFilter::default()),
                    ..Default::default()
                },
        })
        .await?;
    println!("{}", result.batch_operation_key);

    Ok(())
}
```

### running_workers

```rust
pub fn running_workers(&self) -> Vec<String>
```

The job types of all currently-registered workers that are still running.

### search_agent_definitions

```rust
pub async fn search_agent_definitions(&self, params: SearchAgentDefinitionsParams) -> Result<models::AgentDefinitionSearchQueryResult>
```

Search agent definitions (`POST /agent-definitions/search`).

**Example**

```rust
async fn search_agent_definitions() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_agent_definitions(SearchAgentDefinitionsParams {
            agent_definition_search_query: Some(AgentDefinitionSearchQuery::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### search_agent_instance_history

```rust
pub async fn search_agent_instance_history(&self, params: SearchAgentInstanceHistoryParams) -> Result<models::AgentInstanceHistorySearchQueryResult>
```

Search agent instance history (`POST /agent-instances/{agentInstanceKey}/history/search`).

**Example**

```rust
async fn search_agent_instance_history(
    agent_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_agent_instance_history(SearchAgentInstanceHistoryParams {
            agent_instance_key,
            agent_instance_history_search_query: Some(AgentInstanceHistorySearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.job_lease);
    }

    Ok(())
}
```

### search_agent_instances

```rust
pub async fn search_agent_instances(&self, params: SearchAgentInstancesParams) -> Result<models::AgentInstanceSearchQueryResult>
```

Search agent instances (`POST /agent-instances/search`).

**Example**

```rust
async fn search_agent_instances() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_agent_instances(SearchAgentInstancesParams {
            agent_instance_search_query: Some(AgentInstanceSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.element_id);
    }

    Ok(())
}
```

### search_audit_logs

```rust
pub async fn search_audit_logs(&self, params: SearchAuditLogsParams) -> Result<models::AuditLogSearchQueryResult>
```

Search audit logs (`POST /audit-logs/search`).

**Example**

```rust
async fn search_audit_logs() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_audit_logs(SearchAuditLogsParams {
            audit_log_search_query_request: Some(AuditLogSearchQueryRequest::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.entity_key);
    }

    Ok(())
}
```

### search_authorizations

```rust
pub async fn search_authorizations(&self, params: SearchAuthorizationsParams) -> Result<models::AuthorizationSearchResult>
```

Search authorizations (`POST /authorizations/search`).

**Example**

```rust
async fn search_authorizations() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_authorizations(SearchAuthorizationsParams {
            authorization_search_query: Some(AuthorizationSearchQuery::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### search_batch_operation_items

```rust
pub async fn search_batch_operation_items(&self, params: SearchBatchOperationItemsParams) -> Result<models::BatchOperationItemSearchQueryResult>
```

Search batch operation items (`POST /batch-operation-items/search`).

**Example**

```rust
async fn search_batch_operation_items() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_batch_operation_items(SearchBatchOperationItemsParams {
            batch_operation_item_search_query: Some(BatchOperationItemSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.batch_operation_key);
    }

    Ok(())
}
```

### search_batch_operations

```rust
pub async fn search_batch_operations(&self, params: SearchBatchOperationsParams) -> Result<models::BatchOperationSearchQueryResult>
```

Search batch operations (`POST /batch-operations/search`).

**Example**

```rust
async fn search_batch_operations() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_batch_operations(SearchBatchOperationsParams {
            batch_operation_search_query: Some(BatchOperationSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.batch_operation_key);
    }

    Ok(())
}
```

### search_clients_for_group

```rust
pub async fn search_clients_for_group(&self, params: SearchClientsForGroupParams) -> Result<models::GroupClientSearchResult>
```

Search group clients (`POST /groups/{groupId}/clients/search`).

**Example**

```rust
async fn search_clients_for_group(group_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_clients_for_group(SearchClientsForGroupParams {
            group_id,
            group_client_search_query_request: Some(GroupClientSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### search_clients_for_role

```rust
pub async fn search_clients_for_role(&self, params: SearchClientsForRoleParams) -> Result<models::RoleClientSearchResult>
```

Search role clients (`POST /roles/{roleId}/clients/search`).

**Example**

```rust
async fn search_clients_for_role(role_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_clients_for_role(SearchClientsForRoleParams {
            role_id,
            role_client_search_query_request: Some(RoleClientSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### search_clients_for_tenant

```rust
pub async fn search_clients_for_tenant(&self, params: SearchClientsForTenantParams) -> Result<models::TenantClientSearchResult>
```

Search clients for tenant (`POST /tenants/{tenantId}/clients/search`).

**Example**

```rust
async fn search_clients_for_tenant(tenant_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_clients_for_tenant(SearchClientsForTenantParams {
            tenant_id,
            tenant_client_search_query_request: Some(TenantClientSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### search_cluster_variables

```rust
pub async fn search_cluster_variables(&self, params: SearchClusterVariablesParams) -> Result<models::ClusterVariableSearchQueryResult>
```

Search for cluster variables based on given criteria (`POST /cluster-variables/search`).

**Example**

```rust
async fn search_cluster_variables() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_cluster_variables(SearchClusterVariablesParams {
            truncate_values: None,
            cluster_variable_search_query_request: Some(
                ClusterVariableSearchQueryRequest::default(),
            ),
        })
        .await?;
    for item in result.items {
        println!("{}", item.name);
    }

    Ok(())
}
```

### search_correlated_message_subscriptions

```rust
pub async fn search_correlated_message_subscriptions(&self, params: SearchCorrelatedMessageSubscriptionsParams) -> Result<models::CorrelatedMessageSubscriptionSearchQueryResult>
```

Search correlated message subscriptions (`POST /correlated-message-subscriptions/search`).

**Example**

```rust
async fn search_correlated_message_subscriptions() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_correlated_message_subscriptions(SearchCorrelatedMessageSubscriptionsParams {
            correlated_message_subscription_search_query: Some(
                CorrelatedMessageSubscriptionSearchQuery::default(),
            ),
        })
        .await?;
    for item in result.items {
        println!("{}", item.process_definition_id);
    }

    Ok(())
}
```

### search_decision_definitions

```rust
pub async fn search_decision_definitions(&self, params: SearchDecisionDefinitionsParams) -> Result<models::DecisionDefinitionSearchQueryResult>
```

Search decision definitions (`POST /decision-definitions/search`).

**Example**

```rust
async fn search_decision_definitions() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_decision_definitions(SearchDecisionDefinitionsParams {
            decision_definition_search_query: Some(DecisionDefinitionSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.decision_definition_id);
    }

    Ok(())
}
```

### search_decision_instances

```rust
pub async fn search_decision_instances(&self, params: SearchDecisionInstancesParams) -> Result<models::DecisionInstanceSearchQueryResult>
```

Search decision instances (`POST /decision-instances/search`).

**Example**

```rust
async fn search_decision_instances() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_decision_instances(SearchDecisionInstancesParams {
            decision_instance_search_query: Some(DecisionInstanceSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.decision_evaluation_instance_key);
    }

    Ok(())
}
```

### search_decision_requirements

```rust
pub async fn search_decision_requirements(&self, params: SearchDecisionRequirementsParams) -> Result<models::DecisionRequirementsSearchQueryResult>
```

Search decision requirements (`POST /decision-requirements/search`).

**Example**

```rust
async fn search_decision_requirements() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_decision_requirements(SearchDecisionRequirementsParams {
            decision_requirements_search_query: Some(DecisionRequirementsSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.decision_requirements_id);
    }

    Ok(())
}
```

### search_element_instance_incidents

```rust
pub async fn search_element_instance_incidents(&self, params: SearchElementInstanceIncidentsParams) -> Result<models::IncidentSearchQueryResult>
```

Search for incidents of a specific element instance (`POST /element-instances/{elementInstanceKey}/incidents/search`).

**Example**

```rust
async fn search_element_instance_incidents(
    element_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_element_instance_incidents(SearchElementInstanceIncidentsParams {
            element_instance_key,
            incident_search_query: IncidentSearchQuery::default(),
        })
        .await?;
    for item in result.items {
        println!("{}", item.element_id);
    }

    Ok(())
}
```

### search_element_instance_wait_states

```rust
pub async fn search_element_instance_wait_states(&self, params: SearchElementInstanceWaitStatesParams) -> Result<models::ElementInstanceWaitStateQueryResult>
```

Search element instance wait states (`POST /element-instances/wait-states/search`).

**Example**

```rust
async fn search_element_instance_wait_states() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_element_instance_wait_states(SearchElementInstanceWaitStatesParams {
            element_instance_wait_state_query: Some(ElementInstanceWaitStateQuery::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### search_element_instances

```rust
pub async fn search_element_instances(&self, params: SearchElementInstancesParams) -> Result<models::ElementInstanceSearchQueryResult>
```

Search element instances (`POST /element-instances/search`).

**Example**

```rust
async fn search_element_instances() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_element_instances(SearchElementInstancesParams {
            element_instance_search_query: Some(ElementInstanceSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.element_id);
    }

    Ok(())
}
```

### search_global_task_listeners

```rust
pub async fn search_global_task_listeners(&self, params: SearchGlobalTaskListenersParams) -> Result<models::GlobalTaskListenerSearchQueryResult>
```

Search global user task listeners (`POST /global-task-listeners/search`).

**Example**

```rust
async fn search_global_task_listeners() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_global_task_listeners(SearchGlobalTaskListenersParams {
            global_task_listener_search_query_request: Some(
                GlobalTaskListenerSearchQueryRequest::default(),
            ),
        })
        .await?;
    for item in result.items {
        println!("{}", item.id);
    }

    Ok(())
}
```

### search_group_ids_for_tenant

```rust
pub async fn search_group_ids_for_tenant(&self, params: SearchGroupIdsForTenantParams) -> Result<models::TenantGroupSearchResult>
```

Search groups for tenant (`POST /tenants/{tenantId}/groups/search`).

**Example**

```rust
async fn search_group_ids_for_tenant(tenant_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_group_ids_for_tenant(SearchGroupIdsForTenantParams {
            tenant_id,
            tenant_group_search_query_request: Some(TenantGroupSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### search_groups

```rust
pub async fn search_groups(&self, params: SearchGroupsParams) -> Result<models::GroupSearchQueryResult>
```

Search groups (`POST /groups/search`).

**Example**

```rust
async fn search_groups() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_groups(SearchGroupsParams {
            group_search_query_request: Some(GroupSearchQueryRequest::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.group_id);
    }

    Ok(())
}
```

### search_groups_for_role

```rust
pub async fn search_groups_for_role(&self, params: SearchGroupsForRoleParams) -> Result<models::RoleGroupSearchResult>
```

Search role groups (`POST /roles/{roleId}/groups/search`).

**Example**

```rust
async fn search_groups_for_role(role_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_groups_for_role(SearchGroupsForRoleParams {
            role_id,
            role_group_search_query_request: Some(RoleGroupSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### search_incidents

```rust
pub async fn search_incidents(&self, params: SearchIncidentsParams) -> Result<models::IncidentSearchQueryResult>
```

Search incidents (`POST /incidents/search`).

**Example**

```rust
async fn search_incidents() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_incidents(SearchIncidentsParams {
            incident_search_query: Some(IncidentSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.element_id);
    }

    Ok(())
}
```

### search_jobs

```rust
pub async fn search_jobs(&self, params: SearchJobsParams) -> Result<models::JobSearchQueryResult>
```

Search jobs (`POST /jobs/search`).

**Example**

```rust
async fn search_jobs() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_jobs(SearchJobsParams {
            job_search_query: Some(JobSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.process_definition_id);
    }

    Ok(())
}
```

### search_mapping_rule

```rust
pub async fn search_mapping_rule(&self, params: SearchMappingRuleParams) -> Result<models::MappingRuleSearchQueryResult>
```

Search mapping rules (`POST /mapping-rules/search`).

**Example**

```rust
async fn search_mapping_rule() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_mapping_rule(SearchMappingRuleParams {
            mapping_rule_search_query_request: Some(MappingRuleSearchQueryRequest::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.mapping_rule_id);
    }

    Ok(())
}
```

### search_mapping_rules_for_group

```rust
pub async fn search_mapping_rules_for_group(&self, params: SearchMappingRulesForGroupParams) -> Result<models::GroupMappingRuleSearchResult>
```

Search group mapping rules (`POST /groups/{groupId}/mapping-rules/search`).

**Example**

```rust
async fn search_mapping_rules_for_group(
    group_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_mapping_rules_for_group(SearchMappingRulesForGroupParams {
            group_id,
            mapping_rule_search_query_request: Some(MappingRuleSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### search_mapping_rules_for_role

```rust
pub async fn search_mapping_rules_for_role(&self, params: SearchMappingRulesForRoleParams) -> Result<models::RoleMappingRuleSearchResult>
```

Search role mapping rules (`POST /roles/{roleId}/mapping-rules/search`).

**Example**

```rust
async fn search_mapping_rules_for_role(role_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_mapping_rules_for_role(SearchMappingRulesForRoleParams {
            role_id,
            mapping_rule_search_query_request: Some(MappingRuleSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### search_mapping_rules_for_tenant

```rust
pub async fn search_mapping_rules_for_tenant(&self, params: SearchMappingRulesForTenantParams) -> Result<models::TenantMappingRuleSearchResult>
```

Search mapping rules for tenant (`POST /tenants/{tenantId}/mapping-rules/search`).

**Example**

```rust
async fn search_mapping_rules_for_tenant(
    tenant_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_mapping_rules_for_tenant(SearchMappingRulesForTenantParams {
            tenant_id,
            mapping_rule_search_query_request: Some(MappingRuleSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### search_message_subscriptions

```rust
pub async fn search_message_subscriptions(&self, params: SearchMessageSubscriptionsParams) -> Result<models::MessageSubscriptionSearchQueryResult>
```

Search message subscriptions (`POST /message-subscriptions/search`).

**Example**

```rust
async fn search_message_subscriptions() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_message_subscriptions(SearchMessageSubscriptionsParams {
            message_subscription_search_query: Some(MessageSubscriptionSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.element_id);
    }

    Ok(())
}
```

### search_own_authorizations

```rust
pub async fn search_own_authorizations(&self, params: SearchOwnAuthorizationsParams) -> Result<models::AuthorizationSearchResult>
```

Search own authorizations (`POST /authentication/me/authorizations/search`).

**Example**

```rust
async fn search_own_authorizations() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_own_authorizations(SearchOwnAuthorizationsParams {
            authorization_search_query: Some(AuthorizationSearchQuery::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### search_process_definition_variable_names

```rust
pub async fn search_process_definition_variable_names(&self, params: SearchProcessDefinitionVariableNamesParams) -> Result<models::ProcessDefinitionVariableNameSearchQueryResult>
```

Search process definition variable names (`POST /process-definitions/{processDefinitionKey}/variable-names/search`).

**Example**

```rust
async fn search_process_definition_variable_names(
    process_definition_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_process_definition_variable_names(SearchProcessDefinitionVariableNamesParams {
            process_definition_key,
            process_definition_variable_name_search_query: Some(
                ProcessDefinitionVariableNameSearchQuery::default(),
            ),
        })
        .await?;
    for item in result.items {
        println!("{}", item.name);
    }

    Ok(())
}
```

### search_process_definitions

```rust
pub async fn search_process_definitions(&self, params: SearchProcessDefinitionsParams) -> Result<models::ProcessDefinitionSearchQueryResult>
```

Search process definitions (`POST /process-definitions/search`).

**Example**

```rust
async fn search_process_definitions() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_process_definitions(SearchProcessDefinitionsParams {
            process_definition_search_query: Some(ProcessDefinitionSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.process_definition_id);
    }

    Ok(())
}
```

### search_process_instance_incidents

```rust
pub async fn search_process_instance_incidents(&self, params: SearchProcessInstanceIncidentsParams) -> Result<models::IncidentSearchQueryResult>
```

Search related incidents (`POST /process-instances/{processInstanceKey}/incidents/search`).

**Example**

```rust
async fn search_process_instance_incidents(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_process_instance_incidents(SearchProcessInstanceIncidentsParams {
            process_instance_key,
            incident_search_query: Some(IncidentSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.element_id);
    }

    Ok(())
}
```

### search_process_instances

```rust
pub async fn search_process_instances(&self, params: SearchProcessInstancesParams) -> Result<models::ProcessInstanceSearchQueryResult>
```

Search process instances (`POST /process-instances/search`).

**Example**

```rust
async fn search_process_instances() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_process_instances(SearchProcessInstancesParams {
            process_instance_search_query: Some(ProcessInstanceSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.process_definition_id);
    }

    Ok(())
}
```

### search_resources

```rust
pub async fn search_resources(&self, params: SearchResourcesParams) -> Result<models::ResourceSearchQueryResult>
```

Search resources (`POST /resources/search`).

**Example**

```rust
async fn search_resources() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_resources(SearchResourcesParams {
            resource_search_query: Some(ResourceSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.resource_id);
    }

    Ok(())
}
```

### search_roles

```rust
pub async fn search_roles(&self, params: SearchRolesParams) -> Result<models::RoleSearchQueryResult>
```

Search roles (`POST /roles/search`).

**Example**

```rust
async fn search_roles() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_roles(SearchRolesParams {
            role_search_query_request: Some(RoleSearchQueryRequest::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.role_id);
    }

    Ok(())
}
```

### search_roles_for_group

```rust
pub async fn search_roles_for_group(&self, params: SearchRolesForGroupParams) -> Result<models::GroupRoleSearchResult>
```

Search group roles (`POST /groups/{groupId}/roles/search`).

**Example**

```rust
async fn search_roles_for_group(group_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_roles_for_group(SearchRolesForGroupParams {
            group_id,
            role_search_query_request: Some(RoleSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### search_roles_for_tenant

```rust
pub async fn search_roles_for_tenant(&self, params: SearchRolesForTenantParams) -> Result<models::TenantRoleSearchResult>
```

Search roles for tenant (`POST /tenants/{tenantId}/roles/search`).

**Example**

```rust
async fn search_roles_for_tenant(tenant_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_roles_for_tenant(SearchRolesForTenantParams {
            tenant_id,
            role_search_query_request: Some(RoleSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### search_tenants

```rust
pub async fn search_tenants(&self, params: SearchTenantsParams) -> Result<models::TenantSearchQueryResult>
```

Search tenants (`POST /tenants/search`).

**Example**

```rust
async fn search_tenants() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_tenants(SearchTenantsParams {
            tenant_search_query_request: Some(TenantSearchQueryRequest::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.name);
    }

    Ok(())
}
```

### search_user_task_audit_logs

```rust
pub async fn search_user_task_audit_logs(&self, params: SearchUserTaskAuditLogsParams) -> Result<models::AuditLogSearchQueryResult>
```

Search user task audit logs (`POST /user-tasks/{userTaskKey}/audit-logs/search`).

**Example**

```rust
async fn search_user_task_audit_logs(
    user_task_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_user_task_audit_logs(SearchUserTaskAuditLogsParams {
            user_task_key,
            user_task_audit_log_search_query_request: Some(
                UserTaskAuditLogSearchQueryRequest::default(),
            ),
        })
        .await?;
    for item in result.items {
        println!("{}", item.entity_key);
    }

    Ok(())
}
```

### search_user_task_effective_variables

```rust
pub async fn search_user_task_effective_variables(&self, params: SearchUserTaskEffectiveVariablesParams) -> Result<models::VariableSearchQueryResult>
```

Search user task effective variables (`POST /user-tasks/{userTaskKey}/effective-variables/search`).

**Example**

```rust
async fn search_user_task_effective_variables(
    user_task_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_user_task_effective_variables(SearchUserTaskEffectiveVariablesParams {
            user_task_key,
            truncate_values: None,
            user_task_effective_variable_search_query_request: Some(
                UserTaskEffectiveVariableSearchQueryRequest::default(),
            ),
        })
        .await?;
    for item in result.items {
        println!("{}", item.name);
    }

    Ok(())
}
```

### search_user_task_variables

```rust
pub async fn search_user_task_variables(&self, params: SearchUserTaskVariablesParams) -> Result<models::VariableSearchQueryResult>
```

Search user task variables (`POST /user-tasks/{userTaskKey}/variables/search`).

**Example**

```rust
async fn search_user_task_variables(
    user_task_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_user_task_variables(SearchUserTaskVariablesParams {
            user_task_key,
            truncate_values: None,
            user_task_variable_search_query_request: Some(
                UserTaskVariableSearchQueryRequest::default(),
            ),
        })
        .await?;
    for item in result.items {
        println!("{}", item.name);
    }

    Ok(())
}
```

### search_user_tasks

```rust
pub async fn search_user_tasks(&self, params: SearchUserTasksParams) -> Result<models::UserTaskSearchQueryResult>
```

Search user tasks (`POST /user-tasks/search`).

**Example**

```rust
async fn search_user_tasks() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_user_tasks(SearchUserTasksParams {
            user_task_search_query: Some(UserTaskSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.element_id);
    }

    Ok(())
}
```

### search_users

```rust
pub async fn search_users(&self, params: SearchUsersParams) -> Result<models::UserSearchResult>
```

Search users (`POST /users/search`).

**Example**

```rust
async fn search_users() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_users(SearchUsersParams {
            user_search_query_request: Some(UserSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### search_users_for_group

```rust
pub async fn search_users_for_group(&self, params: SearchUsersForGroupParams) -> Result<models::GroupUserSearchResult>
```

Search group users (`POST /groups/{groupId}/users/search`).

**Example**

```rust
async fn search_users_for_group(group_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_users_for_group(SearchUsersForGroupParams {
            group_id,
            group_user_search_query_request: Some(GroupUserSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### search_users_for_role

```rust
pub async fn search_users_for_role(&self, params: SearchUsersForRoleParams) -> Result<models::RoleUserSearchResult>
```

Search role users (`POST /roles/{roleId}/users/search`).

**Example**

```rust
async fn search_users_for_role(role_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_users_for_role(SearchUsersForRoleParams {
            role_id,
            role_user_search_query_request: Some(RoleUserSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### search_users_for_tenant

```rust
pub async fn search_users_for_tenant(&self, params: SearchUsersForTenantParams) -> Result<models::TenantUserSearchResult>
```

Search users for tenant (`POST /tenants/{tenantId}/users/search`).

**Example**

```rust
async fn search_users_for_tenant(tenant_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_users_for_tenant(SearchUsersForTenantParams {
            tenant_id,
            tenant_user_search_query_request: Some(TenantUserSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### search_variables

```rust
pub async fn search_variables(&self, request: models::VariableSearchQuery) -> Result<models::VariableSearchQueryResult>
```

Search variables, returning the raw generated result.

**Example**

```rust
async fn search_variables() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // An empty query returns the first page of all variables. Set `filter` to narrow
    // by process instance, scope, name, or value.
    let results = client
        .search_variables(VariableSearchQuery::default())
        .await?;

    for variable in results.items {
        println!("{} = {}", variable.name, variable.value);
    }

    Ok(())
}
```

### search_variables_as

```rust
pub async fn search_variables_as<T>(&self, request: models::VariableSearchQuery) -> Result<Vec<T>>
```

Search variables and deserialize each variable's JSON `value` into a typed `T`.

Returns the deserialized values in result order; variables whose `value` is absent
are skipped.

### spawn_worker

```rust
pub fn spawn_worker<F, Fut>(&self, config: JobWorkerConfig, handler: F)
```

Spawn a managed job worker and register it for lifecycle control. The returned
handle can stop the individual worker; `CamundaClient::stop_all_workers` stops
every registered worker. The worker is also retained by the client so it keeps
running even if the returned handle is dropped.

### stop_all_workers

```rust
pub async fn stop_all_workers(&self) -> Result<()>
```

Gracefully stop every registered worker, letting in-flight jobs drain, and await
their completion. Clears the registry.

### suspend_batch_operation

```rust
pub async fn suspend_batch_operation(&self, params: SuspendBatchOperationParams) -> Result<()>
```

Suspend Batch operation (`POST /batch-operations/{batchOperationKey}/suspension`).

**Example**

```rust
async fn suspend_batch_operation(
    batch_operation_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .suspend_batch_operation(SuspendBatchOperationParams {
            batch_operation_key,
        })
        .await?;
    println!("Suspend Batch operation: done");

    Ok(())
}
```

### suspend_process_instance

```rust
pub async fn suspend_process_instance(&self, params: SuspendProcessInstanceParams) -> Result<()>
```

Suspend process instance (`POST /process-instances/{processInstanceKey}/suspension`).

**Example**

```rust
async fn suspend_process_instance(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .suspend_process_instance(SuspendProcessInstanceParams {
            process_instance_key,
            suspend_process_instance_request: Some(SuspendProcessInstanceRequest::default()),
        })
        .await?;
    println!("Suspend process instance: done");

    Ok(())
}
```

### suspend_process_instances_batch_operation

```rust
pub async fn suspend_process_instances_batch_operation(&self, params: SuspendProcessInstancesBatchOperationParams) -> Result<models::BatchOperationCreatedResult>
```

Suspend process instances (batch) (`POST /process-instances/suspension`).

**Example**

```rust
async fn suspend_process_instances_batch_operation() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .suspend_process_instances_batch_operation(SuspendProcessInstancesBatchOperationParams {
            process_instance_suspension_batch_operation_request:
                ProcessInstanceSuspensionBatchOperationRequest {
                    filter: Box::new(ProcessInstanceFilter::default()),
                    ..Default::default()
                },
        })
        .await?;
    println!("{}", result.batch_operation_key);

    Ok(())
}
```

### sync_runtime_backup_state

```rust
pub async fn sync_runtime_backup_state(&self) -> Result<models::RuntimeBackupState>
```

Force-write runtime backup state (`POST /backups/runtime/state/sync`).

**Example**

```rust
async fn sync_runtime_backup_state() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let state = client.sync_runtime_backup_state().await?;
    println!("{state:#?}");

    Ok(())
}
```

### take_history_backup

```rust
pub async fn take_history_backup(&self, params: TakeHistoryBackupParams) -> Result<models::TakeHistoryBackupResponse>
```

Take a history backup (`POST /backups/history`).

**Example**

```rust
async fn take_history_backup() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .take_history_backup(TakeHistoryBackupParams {
            take_history_backup_request: TakeHistoryBackupRequest { backup_id: 1 },
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### take_runtime_backup

```rust
pub async fn take_runtime_backup(&self, params: TakeRuntimeBackupParams) -> Result<models::TakeRuntimeBackupResponse>
```

Take a runtime backup (`POST /backups/runtime`).

**Example**

```rust
async fn take_runtime_backup() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .take_runtime_backup(TakeRuntimeBackupParams {
            take_runtime_backup_request: Some(TakeRuntimeBackupRequest {
                backup_id: Some(Some(1)),
            }),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
```

### throw_job_error

```rust
pub async fn throw_job_error(&self, job_key: &str, request: models::JobErrorRequest) -> Result<()>
```

Throw a BPMN error from a job.

**Example**

```rust
async fn throw_job_error(job_key: &str) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // Routes the token to a matching BPMN error boundary event, rather than
    // failing the job technically.
    client
        .throw_job_error(
            job_key,
            JobErrorRequest {
                error_code: "PAYMENT_DECLINED".to_string(),
                error_message: Some(Some("card declined by issuer".to_string())),
                ..Default::default()
            },
        )
        .await?;

    println!("Threw BPMN error for job {job_key}");

    Ok(())
}
```

### topology

```rust
pub async fn topology(&self) -> Result<models::TopologyResponse>
```

Fetch the cluster topology.

**Example**

```rust
async fn get_topology() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let topology = client.topology().await?;

    println!("Gateway version:    {}", topology.gateway_version);
    println!("Cluster size:       {}", topology.cluster_size);
    println!("Partitions:         {}", topology.partitions_count);
    println!("Replication factor: {}", topology.replication_factor);

    for broker in topology.brokers {
        println!(
            "  broker {} at {}:{}",
            broker.node_id, broker.host, broker.port
        );
    }

    Ok(())
}
```

### unassign_client_from_group

```rust
pub async fn unassign_client_from_group(&self, params: UnassignClientFromGroupParams) -> Result<()>
```

Unassign a client from a group (`DELETE /groups/{groupId}/clients/{clientId}`).

**Example**

```rust
async fn unassign_client_from_group(
    group_id: String,
    client_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_client_from_group(UnassignClientFromGroupParams {
            group_id,
            client_id,
        })
        .await?;
    println!("Unassign a client from a group: done");

    Ok(())
}
```

### unassign_client_from_tenant

```rust
pub async fn unassign_client_from_tenant(&self, params: UnassignClientFromTenantParams) -> Result<()>
```

Unassign a client from a tenant (`DELETE /tenants/{tenantId}/clients/{clientId}`).

**Example**

```rust
async fn unassign_client_from_tenant(
    tenant_id: String,
    client_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_client_from_tenant(UnassignClientFromTenantParams {
            tenant_id,
            client_id,
        })
        .await?;
    println!("Unassign a client from a tenant: done");

    Ok(())
}
```

### unassign_group_from_tenant

```rust
pub async fn unassign_group_from_tenant(&self, params: UnassignGroupFromTenantParams) -> Result<()>
```

Unassign a group from a tenant (`DELETE /tenants/{tenantId}/groups/{groupId}`).

**Example**

```rust
async fn unassign_group_from_tenant(
    tenant_id: String,
    group_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_group_from_tenant(UnassignGroupFromTenantParams {
            tenant_id,
            group_id,
        })
        .await?;
    println!("Unassign a group from a tenant: done");

    Ok(())
}
```

### unassign_mapping_rule_from_group

```rust
pub async fn unassign_mapping_rule_from_group(&self, params: UnassignMappingRuleFromGroupParams) -> Result<()>
```

Unassign a mapping rule from a group (`DELETE /groups/{groupId}/mapping-rules/{mappingRuleId}`).

**Example**

```rust
async fn unassign_mapping_rule_from_group(
    group_id: String,
    mapping_rule_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_mapping_rule_from_group(UnassignMappingRuleFromGroupParams {
            group_id,
            mapping_rule_id,
        })
        .await?;
    println!("Unassign a mapping rule from a group: done");

    Ok(())
}
```

### unassign_mapping_rule_from_tenant

```rust
pub async fn unassign_mapping_rule_from_tenant(&self, params: UnassignMappingRuleFromTenantParams) -> Result<()>
```

Unassign a mapping rule from a tenant (`DELETE /tenants/{tenantId}/mapping-rules/{mappingRuleId}`).

**Example**

```rust
async fn unassign_mapping_rule_from_tenant(
    tenant_id: String,
    mapping_rule_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_mapping_rule_from_tenant(UnassignMappingRuleFromTenantParams {
            tenant_id,
            mapping_rule_id,
        })
        .await?;
    println!("Unassign a mapping rule from a tenant: done");

    Ok(())
}
```

### unassign_role_from_client

```rust
pub async fn unassign_role_from_client(&self, params: UnassignRoleFromClientParams) -> Result<()>
```

Unassign a role from a client (`DELETE /roles/{roleId}/clients/{clientId}`).

**Example**

```rust
async fn unassign_role_from_client(
    role_id: String,
    client_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_role_from_client(UnassignRoleFromClientParams { role_id, client_id })
        .await?;
    println!("Unassign a role from a client: done");

    Ok(())
}
```

### unassign_role_from_group

```rust
pub async fn unassign_role_from_group(&self, params: UnassignRoleFromGroupParams) -> Result<()>
```

Unassign a role from a group (`DELETE /roles/{roleId}/groups/{groupId}`).

**Example**

```rust
async fn unassign_role_from_group(
    role_id: String,
    group_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_role_from_group(UnassignRoleFromGroupParams { role_id, group_id })
        .await?;
    println!("Unassign a role from a group: done");

    Ok(())
}
```

### unassign_role_from_mapping_rule

```rust
pub async fn unassign_role_from_mapping_rule(&self, params: UnassignRoleFromMappingRuleParams) -> Result<()>
```

Unassign a role from a mapping rule (`DELETE /roles/{roleId}/mapping-rules/{mappingRuleId}`).

**Example**

```rust
async fn unassign_role_from_mapping_rule(
    role_id: String,
    mapping_rule_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_role_from_mapping_rule(UnassignRoleFromMappingRuleParams {
            role_id,
            mapping_rule_id,
        })
        .await?;
    println!("Unassign a role from a mapping rule: done");

    Ok(())
}
```

### unassign_role_from_tenant

```rust
pub async fn unassign_role_from_tenant(&self, params: UnassignRoleFromTenantParams) -> Result<()>
```

Unassign a role from a tenant (`DELETE /tenants/{tenantId}/roles/{roleId}`).

**Example**

```rust
async fn unassign_role_from_tenant(
    tenant_id: String,
    role_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_role_from_tenant(UnassignRoleFromTenantParams { tenant_id, role_id })
        .await?;
    println!("Unassign a role from a tenant: done");

    Ok(())
}
```

### unassign_role_from_user

```rust
pub async fn unassign_role_from_user(&self, params: UnassignRoleFromUserParams) -> Result<()>
```

Unassign a role from a user (`DELETE /roles/{roleId}/users/{username}`).

**Example**

```rust
async fn unassign_role_from_user(
    role_id: String,
    username: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_role_from_user(UnassignRoleFromUserParams { role_id, username })
        .await?;
    println!("Unassign a role from a user: done");

    Ok(())
}
```

### unassign_user_from_group

```rust
pub async fn unassign_user_from_group(&self, params: UnassignUserFromGroupParams) -> Result<()>
```

Unassign a user from a group (`DELETE /groups/{groupId}/users/{username}`).

**Example**

```rust
async fn unassign_user_from_group(
    group_id: String,
    username: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_user_from_group(UnassignUserFromGroupParams { group_id, username })
        .await?;
    println!("Unassign a user from a group: done");

    Ok(())
}
```

### unassign_user_from_tenant

```rust
pub async fn unassign_user_from_tenant(&self, params: UnassignUserFromTenantParams) -> Result<()>
```

Unassign a user from a tenant (`DELETE /tenants/{tenantId}/users/{username}`).

**Example**

```rust
async fn unassign_user_from_tenant(
    tenant_id: String,
    username: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_user_from_tenant(UnassignUserFromTenantParams {
            tenant_id,
            username,
        })
        .await?;
    println!("Unassign a user from a tenant: done");

    Ok(())
}
```

### unassign_user_task

```rust
pub async fn unassign_user_task(&self, params: UnassignUserTaskParams) -> Result<()>
```

Unassign user task (`DELETE /user-tasks/{userTaskKey}/assignee`).

**Example**

```rust
async fn unassign_user_task(user_task_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_user_task(UnassignUserTaskParams { user_task_key })
        .await?;
    println!("Unassign user task: done");

    Ok(())
}
```

### update_agent_instance

```rust
pub async fn update_agent_instance(&self, params: UpdateAgentInstanceParams) -> Result<models::AgentInstanceUpdateResult>
```

Update agent instance (`PATCH /agent-instances/{agentInstanceKey}`).

**Example**

```rust
async fn update_agent_instance(
    agent_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .update_agent_instance(UpdateAgentInstanceParams {
            agent_instance_key,
            agent_instance_update_request: AgentInstanceUpdateRequest {
                element_instance_key: Box::new(ElementInstanceKey::assume_exists(
                    "my-element-instance",
                )),
                ..Default::default()
            },
        })
        .await?;
    println!("Update agent instance: done");

    Ok(())
}
```

### update_authorization

```rust
pub async fn update_authorization(&self, params: UpdateAuthorizationParams) -> Result<()>
```

Update authorization (`PUT /authorizations/{authorizationKey}`).

**Example**

```rust
async fn update_authorization(authorization_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .update_authorization(UpdateAuthorizationParams {
            authorization_key,
            authorization_request: AuthorizationRequest::AuthorizationIdBasedRequest(Box::new(
                AuthorizationIdBasedRequest {
                    owner_id: "my-owner".to_string(),
                    owner_type: OwnerTypeEnum::User,
                    resource_id: "my-resource".to_string(),
                    resource_type: ResourceTypeEnum::AuditLog,
                    permission_types: vec![PermissionTypeEnum::Access],
                },
            )),
        })
        .await?;
    println!("Update authorization: done");

    Ok(())
}
```

### update_global_cluster_variable

```rust
pub async fn update_global_cluster_variable(&self, params: UpdateGlobalClusterVariableParams) -> Result<models::ClusterVariableResult>
```

Update a global-scoped cluster variable (`PUT /cluster-variables/global/{name}`).

**Example**

```rust
async fn update_global_cluster_variable(name: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .update_global_cluster_variable(UpdateGlobalClusterVariableParams {
            name,
            update_cluster_variable_request: UpdateClusterVariableRequest {
                value: serde_json::json!({"key": "value"}),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.name);

    Ok(())
}
```

### update_global_task_listener

```rust
pub async fn update_global_task_listener(&self, params: UpdateGlobalTaskListenerParams) -> Result<models::GlobalTaskListenerResult>
```

Update global user task listener (`PUT /global-task-listeners/{id}`).

**Example**

```rust
async fn update_global_task_listener(id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .update_global_task_listener(UpdateGlobalTaskListenerParams {
            id,
            update_global_task_listener_request: UpdateGlobalTaskListenerRequest {
                r#type: "my-type".to_string(),
                event_types: vec![GlobalTaskListenerEventTypeEnum::All],
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.id);

    Ok(())
}
```

### update_group

```rust
pub async fn update_group(&self, params: UpdateGroupParams) -> Result<models::GroupUpdateResult>
```

Update group (`PUT /groups/{groupId}`).

**Example**

```rust
async fn update_group(group_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .update_group(UpdateGroupParams {
            group_id,
            group_update_request: GroupUpdateRequest {
                name: "my-variable".to_string(),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.group_id);

    Ok(())
}
```

### update_job

```rust
pub async fn update_job(&self, params: UpdateJobParams) -> Result<()>
```

Update job (`PATCH /jobs/{jobKey}`).

**Example**

```rust
async fn update_job(job_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .update_job(UpdateJobParams {
            job_key,
            job_update_request: JobUpdateRequest {
                changeset: Box::new(JobChangeset::default()),
                ..Default::default()
            },
        })
        .await?;
    println!("Update job: done");

    Ok(())
}
```

### update_jobs_batch_operation

```rust
pub async fn update_jobs_batch_operation(&self, params: UpdateJobsBatchOperationParams) -> Result<models::BatchOperationCreatedResult>
```

Update jobs (batch) (`POST /jobs/batch-update`).

**Example**

```rust
async fn update_jobs_batch_operation() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .update_jobs_batch_operation(UpdateJobsBatchOperationParams {
            job_batch_update_request: JobBatchUpdateRequest {
                filter: Box::new(JobFilter::default()),
                changeset: Box::new(JobChangeset::default()),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.batch_operation_key);

    Ok(())
}
```

### update_mapping_rule

```rust
pub async fn update_mapping_rule(&self, params: UpdateMappingRuleParams) -> Result<models::MappingRuleUpdateResult>
```

Update mapping rule (`PUT /mapping-rules/{mappingRuleId}`).

**Example**

```rust
async fn update_mapping_rule(mapping_rule_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .update_mapping_rule(UpdateMappingRuleParams {
            mapping_rule_id,
            mapping_rule_update_request: Some(MappingRuleUpdateRequest {
                claim_name: "my-claim-name".to_string(),
                claim_value: "my-claim-value".to_string(),
                name: "my-variable".to_string(),
            }),
        })
        .await?;
    println!("{}", result.mapping_rule_id);

    Ok(())
}
```

### update_role

```rust
pub async fn update_role(&self, params: UpdateRoleParams) -> Result<models::RoleUpdateResult>
```

Update role (`PUT /roles/{roleId}`).

**Example**

```rust
async fn update_role(role_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .update_role(UpdateRoleParams {
            role_id,
            role_update_request: RoleUpdateRequest {
                name: "my-variable".to_string(),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.role_id);

    Ok(())
}
```

### update_tenant

```rust
pub async fn update_tenant(&self, params: UpdateTenantParams) -> Result<models::TenantUpdateResult>
```

Update tenant (`PUT /tenants/{tenantId}`).

**Example**

```rust
async fn update_tenant(tenant_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .update_tenant(UpdateTenantParams {
            tenant_id,
            tenant_update_request: TenantUpdateRequest {
                name: "my-variable".to_string(),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.name);

    Ok(())
}
```

### update_tenant_cluster_variable

```rust
pub async fn update_tenant_cluster_variable(&self, params: UpdateTenantClusterVariableParams) -> Result<models::ClusterVariableResult>
```

Update a tenant-scoped cluster variable (`PUT /cluster-variables/tenants/{tenantId}/{name}`).

**Example**

```rust
async fn update_tenant_cluster_variable(
    tenant_id: String,
    name: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .update_tenant_cluster_variable(UpdateTenantClusterVariableParams {
            tenant_id,
            name,
            update_cluster_variable_request: UpdateClusterVariableRequest {
                value: serde_json::json!({"key": "value"}),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.name);

    Ok(())
}
```

### update_user

```rust
pub async fn update_user(&self, params: UpdateUserParams) -> Result<models::UserUpdateResult>
```

Update user (`PUT /users/{username}`).

**Example**

```rust
async fn update_user(username: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .update_user(UpdateUserParams {
            username,
            user_update_request: UserUpdateRequest::default(),
        })
        .await?;
    println!("{}", result.username);

    Ok(())
}
```

### update_user_task

```rust
pub async fn update_user_task(&self, params: UpdateUserTaskParams) -> Result<()>
```

Update user task (`PATCH /user-tasks/{userTaskKey}`).

**Example**

```rust
async fn update_user_task(user_task_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .update_user_task(UpdateUserTaskParams {
            user_task_key,
            user_task_update_request: Some(UserTaskUpdateRequest::default()),
        })
        .await?;
    println!("Update user task: done");

    Ok(())
}
```

### worker_config

```rust
pub fn worker_config(&self, job_type: impl Into<String>) -> JobWorkerConfig
```

Build a `JobWorkerConfig` for `job_type` pre-seeded from the SDK's resolved
worker defaults (env-driven: `CAMUNDA_WORKER_*`). Builder methods override fields.

## CamundaOptions

Options for constructing a `CamundaClient`.

### Fields

| Field         | Type                      | Description                                                                                                                      |
| ------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `config`      | `HashMap<String, String>` | Programmatic overrides for `CAMUNDA_*` configuration keys. These take precedence over environment variables.                     |
| `http_client` | `Option<Client>`          | A pre-built `reqwest::Client` to use for all requests (including OAuth token fetches). When `None`, a default client is created. |

### Methods

| Method             | Description                                      |
| ------------------ | ------------------------------------------------ |
| `new`              | Create empty options.                            |
| `with`             | Add a single `CAMUNDA_*` configuration override. |
| `with_http_client` | Use a custom `reqwest::Client`.                  |
