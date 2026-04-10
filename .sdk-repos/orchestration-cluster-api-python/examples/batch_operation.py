# Compilable usage examples for batch operation management.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

from camunda_orchestration_sdk import (
    BatchOperationItemSearchQuery,
    BatchOperationKey,
    BatchOperationSearchQuery,
    CamundaClient,
    DecisionInstanceDeletionBatchOperationRequest,
    DecisionInstanceDeletionBatchOperationRequestFilter,
    ElementId,
    MigrateProcessInstanceMappingInstruction,
    ProcessDefinitionKey,
    ProcessInstanceCancellationBatchOperationRequest,
    ProcessInstanceCancellationBatchOperationRequestFilter,
    ProcessInstanceDeletionBatchOperationRequest,
    ProcessInstanceIncidentResolutionBatchOperationRequest,
    ProcessInstanceMigrationBatchOperationRequest,
    ProcessInstanceMigrationBatchOperationRequestMigrationPlan,
    ProcessInstanceModificationBatchOperationRequest,
    ProcessInstanceModificationMoveBatchOperationInstruction,
    Unset,
)


# region GetBatchOperation
def get_batch_operation_example(batch_operation_key: BatchOperationKey) -> None:
    client = CamundaClient()

    result = client.get_batch_operation(
        batch_operation_key=batch_operation_key,
    )

    print(f"Batch operation: {result.batch_operation_key}")
# endregion GetBatchOperation


# region SearchBatchOperations
def search_batch_operations_example() -> None:
    client = CamundaClient()

    result = client.search_batch_operations(
        data=BatchOperationSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for op in result.items:
            print(f"Batch operation: {op.batch_operation_key}")
# endregion SearchBatchOperations


# region SearchBatchOperationItems
def search_batch_operation_items_example(batch_operation_key: BatchOperationKey) -> None:
    client = CamundaClient()

    result = client.search_batch_operation_items(
        batch_operation_key=batch_operation_key,
        data=BatchOperationItemSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for item in result.items:
            print(f"Item: {item.item_key}")
# endregion SearchBatchOperationItems


# region CancelBatchOperation
def cancel_batch_operation_example(batch_operation_key: BatchOperationKey) -> None:
    client = CamundaClient()

    client.cancel_batch_operation(
        batch_operation_key=batch_operation_key,
    )
# endregion CancelBatchOperation


# region SuspendBatchOperation
def suspend_batch_operation_example(batch_operation_key: BatchOperationKey) -> None:
    client = CamundaClient()

    client.suspend_batch_operation(
        batch_operation_key=batch_operation_key,
    )
# endregion SuspendBatchOperation


# region ResumeBatchOperation
def resume_batch_operation_example(batch_operation_key: BatchOperationKey) -> None:
    client = CamundaClient()

    client.resume_batch_operation(
        batch_operation_key=batch_operation_key,
    )
# endregion ResumeBatchOperation


# region CancelProcessInstancesBatchOperation
def cancel_process_instances_batch_operation_example() -> None:
    client = CamundaClient()

    result = client.cancel_process_instances_batch_operation(
        data=ProcessInstanceCancellationBatchOperationRequest(
            filter_=ProcessInstanceCancellationBatchOperationRequestFilter(),
        ),
    )

    print(f"Batch operation key: {result.batch_operation_key}")
# endregion CancelProcessInstancesBatchOperation


# region DeleteProcessInstancesBatchOperation
def delete_process_instances_batch_operation_example() -> None:
    client = CamundaClient()

    result = client.delete_process_instances_batch_operation(
        data=ProcessInstanceDeletionBatchOperationRequest(
            filter_=ProcessInstanceCancellationBatchOperationRequestFilter(),
        ),
    )

    print(f"Batch operation key: {result.batch_operation_key}")
# endregion DeleteProcessInstancesBatchOperation


# region MigrateProcessInstancesBatchOperation
def migrate_process_instances_batch_operation_example(target_process_definition_key: ProcessDefinitionKey, source_element_id: ElementId, target_element_id: ElementId) -> None:
    client = CamundaClient()

    result = client.migrate_process_instances_batch_operation(
        data=ProcessInstanceMigrationBatchOperationRequest(
            filter_=ProcessInstanceCancellationBatchOperationRequestFilter(),
            migration_plan=ProcessInstanceMigrationBatchOperationRequestMigrationPlan(
                target_process_definition_key=target_process_definition_key,
                mapping_instructions=[
                    MigrateProcessInstanceMappingInstruction(
                        source_element_id=source_element_id,
                        target_element_id=target_element_id,
                    ),
                ],
            ),
        ),
    )

    print(f"Batch operation key: {result.batch_operation_key}")
# endregion MigrateProcessInstancesBatchOperation


# region ModifyProcessInstancesBatchOperation
def modify_process_instances_batch_operation_example(source_element_id: ElementId, target_element_id: ElementId) -> None:
    client = CamundaClient()

    result = client.modify_process_instances_batch_operation(
        data=ProcessInstanceModificationBatchOperationRequest(
            filter_=ProcessInstanceCancellationBatchOperationRequestFilter(),
            move_instructions=[
                ProcessInstanceModificationMoveBatchOperationInstruction(
                    source_element_id=source_element_id,
                    target_element_id=target_element_id,
                ),
            ],
        ),
    )

    print(f"Batch operation key: {result.batch_operation_key}")
# endregion ModifyProcessInstancesBatchOperation


# region ResolveIncidentsBatchOperation
def resolve_incidents_batch_operation_example() -> None:
    client = CamundaClient()

    result = client.resolve_incidents_batch_operation(
        data=ProcessInstanceIncidentResolutionBatchOperationRequest(
            filter_=ProcessInstanceCancellationBatchOperationRequestFilter(),
        ),
    )

    print(f"Batch operation key: {result.batch_operation_key}")
# endregion ResolveIncidentsBatchOperation


# region DeleteDecisionInstancesBatchOperation
def delete_decision_instances_batch_operation_example() -> None:
    client = CamundaClient()

    result = client.delete_decision_instances_batch_operation(
        data=DecisionInstanceDeletionBatchOperationRequest(
            filter_=DecisionInstanceDeletionBatchOperationRequestFilter(),
        ),
    )

    print(f"Batch operation key: {result.batch_operation_key}")
# endregion DeleteDecisionInstancesBatchOperation
