# Compilable usage examples for admin, system, and statistics operations.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

import datetime

from camunda_orchestration_sdk import (
    AuditLogKey,
    AuditLogSearchQueryRequest,
    CamundaClient,
    ClockPinRequest,
    ClusterVariableSearchQueryRequest,
    ConditionalEvaluationInstruction,
    ConditionalEvaluationInstructionVariables,
    CorrelatedMessageSubscriptionSearchQuery,
    CreateClusterVariableRequest,
    CreateClusterVariableRequestValue,
    CreateGlobalTaskListenerRequest,
    ExpressionEvaluationRequest,
    GlobalListenerId,
    GlobalTaskListenerEventTypeEnum,
    GlobalTaskListenerSearchQueryRequest,
    IncidentProcessInstanceStatisticsByDefinitionQuery,
    IncidentProcessInstanceStatisticsByDefinitionQueryFilter,
    IncidentProcessInstanceStatisticsByErrorQuery,
    JobErrorStatisticsFilter,
    JobErrorStatisticsQuery,
    JobTimeSeriesStatisticsFilter,
    JobTimeSeriesStatisticsQuery,
    JobTypeStatisticsQuery,
    JobWorkerStatisticsFilter,
    JobWorkerStatisticsQuery,
    MessageSubscriptionSearchQuery,
    TenantId,
    Unset,
    UpdateClusterVariableRequest,
    UpdateClusterVariableRequestValue,
    UpdateGlobalTaskListenerRequest,
)


# region GetGlobalClusterVariable
def get_global_cluster_variable_example() -> None:
    client = CamundaClient()

    result = client.get_global_cluster_variable(name="my-variable")

    print(f"Variable: {result.name} = {result.value}")
# endregion GetGlobalClusterVariable


# region CreateGlobalClusterVariable
def create_global_cluster_variable_example() -> None:
    client = CamundaClient()

    result = client.create_global_cluster_variable(
        data=CreateClusterVariableRequest(
            name="my-variable",
            value=CreateClusterVariableRequestValue.from_dict({"key": "my-value"}),
        ),
    )

    print(f"Created variable: {result.name}")
# endregion CreateGlobalClusterVariable


# region UpdateGlobalClusterVariable
def update_global_cluster_variable_example() -> None:
    client = CamundaClient()

    result = client.update_global_cluster_variable(
        name="my-variable",
        data=UpdateClusterVariableRequest(
            value=UpdateClusterVariableRequestValue.from_dict({"key": "updated-value"}),
        ),
    )

    print(f"Updated variable: {result.name}")
# endregion UpdateGlobalClusterVariable


# region DeleteGlobalClusterVariable
def delete_global_cluster_variable_example() -> None:
    client = CamundaClient()

    client.delete_global_cluster_variable(name="my-variable")
# endregion DeleteGlobalClusterVariable


# region GetTenantClusterVariable
def get_tenant_cluster_variable_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    result = client.get_tenant_cluster_variable(
        tenant_id=tenant_id,
        name="my-variable",
    )

    print(f"Variable: {result.name} = {result.value}")
# endregion GetTenantClusterVariable


# region CreateTenantClusterVariable
def create_tenant_cluster_variable_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    result = client.create_tenant_cluster_variable(
        tenant_id=tenant_id,
        data=CreateClusterVariableRequest(
            name="my-variable",
            value=CreateClusterVariableRequestValue.from_dict({"key": "tenant-value"}),
        ),
    )

    print(f"Created variable: {result.name}")
# endregion CreateTenantClusterVariable


# region UpdateTenantClusterVariable
def update_tenant_cluster_variable_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    result = client.update_tenant_cluster_variable(
        tenant_id=tenant_id,
        name="my-variable",
        data=UpdateClusterVariableRequest(
            value=UpdateClusterVariableRequestValue.from_dict({"key": "updated-tenant-value"}),
        ),
    )

    print(f"Updated variable: {result.name}")
# endregion UpdateTenantClusterVariable


# region DeleteTenantClusterVariable
def delete_tenant_cluster_variable_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    client.delete_tenant_cluster_variable(
        tenant_id=tenant_id,
        name="my-variable",
    )
# endregion DeleteTenantClusterVariable


# region SearchClusterVariables
def search_cluster_variables_example() -> None:
    client = CamundaClient()

    result = client.search_cluster_variables(
        data=ClusterVariableSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for var in result.items:
            print(f"Variable: {var.name}")
# endregion SearchClusterVariables


# region CreateGlobalTaskListener
def create_global_task_listener_example() -> None:
    client = CamundaClient()

    result = client.create_global_task_listener(
        data=CreateGlobalTaskListenerRequest(
            id="audit-log-listener",
            event_types=[GlobalTaskListenerEventTypeEnum.COMPLETING],
            type_="my-task-listener",
        ),
    )

    print(f"Task listener: {result.id}")
# endregion CreateGlobalTaskListener


# region GetGlobalTaskListener
def get_global_task_listener_example(listener_id: GlobalListenerId) -> None:
    client = CamundaClient()

    result = client.get_global_task_listener(id=listener_id)

    print(f"Task listener: {result.event_types}")
# endregion GetGlobalTaskListener


# region UpdateGlobalTaskListener
def update_global_task_listener_example(listener_id: GlobalListenerId) -> None:
    client = CamundaClient()

    result = client.update_global_task_listener(
        id=listener_id,
        data=UpdateGlobalTaskListenerRequest(
            event_types=[GlobalTaskListenerEventTypeEnum.COMPLETING],
            type_="updated-task-listener",
        ),
    )

    print(f"Updated listener: {result.id}")
# endregion UpdateGlobalTaskListener


# region DeleteGlobalTaskListener
def delete_global_task_listener_example(listener_id: GlobalListenerId) -> None:
    client = CamundaClient()

    client.delete_global_task_listener(id=listener_id)
# endregion DeleteGlobalTaskListener


# region SearchGlobalTaskListeners
def search_global_task_listeners_example() -> None:
    client = CamundaClient()

    result = client.search_global_task_listeners(
        data=GlobalTaskListenerSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for listener in result.items:
            print(f"Listener: {listener.id}")
# endregion SearchGlobalTaskListeners


# region GetLicense
def get_license_example() -> None:
    client = CamundaClient()

    result = client.get_license()

    print(f"License type: {result.license_type}")
# endregion GetLicense


# region GetSystemConfiguration
def get_system_configuration_example() -> None:
    client = CamundaClient()

    result = client.get_system_configuration()

    print(f"System config: {result}")
# endregion GetSystemConfiguration


# region GetAuthentication
def get_authentication_example() -> None:
    client = CamundaClient()

    result = client.get_authentication()

    print(f"Authenticated user: {result.username}")
# endregion GetAuthentication


# region GetTopology
def get_topology_example() -> None:
    client = CamundaClient()

    result = client.get_topology()

    print(f"Topology: {result}")
# endregion GetTopology


# region GetStatus
def get_status_example() -> None:
    client = CamundaClient()

    client.get_status()

    print("Cluster is healthy")
# endregion GetStatus


# region PinClock
def pin_clock_example() -> None:
    client = CamundaClient()

    client.pin_clock(
        data=ClockPinRequest(
            timestamp=1700000000000,
        ),
    )
# endregion PinClock


# region ResetClock
def reset_clock_example() -> None:
    client = CamundaClient()

    client.reset_clock()
# endregion ResetClock


# region EvaluateConditionals
def evaluate_conditionals_example() -> None:
    client = CamundaClient()

    result = client.evaluate_conditionals(
        data=ConditionalEvaluationInstruction(
            variables=ConditionalEvaluationInstructionVariables.from_dict({"orderReady": True}),
        ),
    )

    print(f"Result: {result}")
# endregion EvaluateConditionals


# region EvaluateExpression
def evaluate_expression_example() -> None:
    client = CamundaClient()

    result = client.evaluate_expression(
        data=ExpressionEvaluationRequest(
            expression="= 1 + 2",
        ),
    )

    print(f"Result: {result.result}")
# endregion EvaluateExpression


# region GetResource
def get_resource_example() -> None:
    client = CamundaClient()

    result = client.get_resource(resource_key="123456")

    print(f"Resource: {result.resource_name}")
# endregion GetResource


# region GetResourceContent
def get_resource_content_example() -> None:
    client = CamundaClient()

    content = client.get_resource_content(resource_key="123456")

    print(f"Content length: {len(content)}")
# endregion GetResourceContent


# region GetUsageMetrics
def get_usage_metrics_example() -> None:
    client = CamundaClient()

    result = client.get_usage_metrics(
        start_time=datetime.datetime(2024, 1, 1),
        end_time=datetime.datetime(2024, 12, 31),
    )

    print(f"Metrics: {result}")
# endregion GetUsageMetrics


# region SearchMessageSubscriptions
def search_message_subscriptions_example() -> None:
    client = CamundaClient()

    result = client.search_message_subscriptions(
        data=MessageSubscriptionSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for sub in result.items:
            print(f"Subscription: {sub.message_name}")
# endregion SearchMessageSubscriptions


# region SearchCorrelatedMessageSubscriptions
def search_correlated_message_subscriptions_example() -> None:
    client = CamundaClient()

    result = client.search_correlated_message_subscriptions(
        data=CorrelatedMessageSubscriptionSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for sub in result.items:
            print(f"Correlated subscription: {sub.message_name}")
# endregion SearchCorrelatedMessageSubscriptions


# region GetAuditLog
def get_audit_log_example(audit_log_key: AuditLogKey) -> None:
    client = CamundaClient()

    result = client.get_audit_log(audit_log_key=audit_log_key)

    print(f"Audit log: {result.audit_log_key}")
# endregion GetAuditLog


# region SearchAuditLogs
def search_audit_logs_example() -> None:
    client = CamundaClient()

    result = client.search_audit_logs(
        data=AuditLogSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for log in result.items:
            print(f"Audit log: {log.audit_log_key}")
# endregion SearchAuditLogs


# region GetProcessInstanceStatisticsByError
def get_process_instance_statistics_by_error_example() -> None:
    client = CamundaClient()

    result = client.get_process_instance_statistics_by_error(
        data=IncidentProcessInstanceStatisticsByErrorQuery(),
    )

    if not isinstance(result.items, Unset):
        for stat in result.items:
            print(f"Error: {stat.error_message}")
# endregion GetProcessInstanceStatisticsByError


# region GetProcessInstanceStatisticsByDefinition
def get_process_instance_statistics_by_definition_example() -> None:
    client = CamundaClient()

    result = client.get_process_instance_statistics_by_definition(
        data=IncidentProcessInstanceStatisticsByDefinitionQuery(
            filter_=IncidentProcessInstanceStatisticsByDefinitionQueryFilter(
                error_hash_code=12345,
            ),
        ),
    )

    if not isinstance(result.items, Unset):
        for stat in result.items:
            print(f"Definition: {stat.process_definition_key}")
# endregion GetProcessInstanceStatisticsByDefinition


# region GetJobErrorStatistics
def get_job_error_statistics_example() -> None:
    client = CamundaClient()

    result = client.get_job_error_statistics(
        data=JobErrorStatisticsQuery(
            filter_=JobErrorStatisticsFilter(
                from_=datetime.datetime(2024, 1, 1),
                to=datetime.datetime(2024, 12, 31),
                job_type="payment-processing",
            ),
        ),
    )

    if not isinstance(result.items, Unset):
        for stat in result.items:
            print(f"Error: {stat.error_code}")
# endregion GetJobErrorStatistics


# region GetJobTimeSeriesStatistics
def get_job_time_series_statistics_example() -> None:
    client = CamundaClient()

    result = client.get_job_time_series_statistics(
        data=JobTimeSeriesStatisticsQuery(
            filter_=JobTimeSeriesStatisticsFilter(
                from_=datetime.datetime(2024, 1, 1),
                to=datetime.datetime(2024, 12, 31),
                job_type="payment-processing",
            ),
        ),
    )

    if not isinstance(result.items, Unset):
        for stat in result.items:
            print(f"Time series: {stat}")
# endregion GetJobTimeSeriesStatistics


# region GetJobTypeStatistics
def get_job_type_statistics_example() -> None:
    client = CamundaClient()

    result = client.get_job_type_statistics(
        data=JobTypeStatisticsQuery(),
    )

    if not isinstance(result.items, Unset):
        for stat in result.items:
            print(f"Job type: {stat.job_type}")
# endregion GetJobTypeStatistics


# region GetJobWorkerStatistics
def get_job_worker_statistics_example() -> None:
    client = CamundaClient()

    result = client.get_job_worker_statistics(
        data=JobWorkerStatisticsQuery(
            filter_=JobWorkerStatisticsFilter(
                from_=datetime.datetime(2024, 1, 1),
                to=datetime.datetime(2024, 12, 31),
                job_type="payment-processing",
            ),
        ),
    )

    if not isinstance(result.items, Unset):
        for stat in result.items:
            print(f"Worker: {stat.worker}")
# endregion GetJobWorkerStatistics


# region GetGlobalJobStatistics
def get_global_job_statistics_example() -> None:
    client = CamundaClient()

    result = client.get_global_job_statistics(
        from_=datetime.datetime(2024, 1, 1),
        to=datetime.datetime(2024, 12, 31),
    )

    print(f"Global job stats: {result}")
# endregion GetGlobalJobStatistics
