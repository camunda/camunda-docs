<?php

/**
 * Compilable usage examples for process instance operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\Api\Api\ProcessInstanceApi;
use Camunda\Orchestration\Api\Model\CreateProcessInstanceResult;
use Camunda\Orchestration\Api\Model\ProcessInstanceCreationInstructionById;
use Camunda\Orchestration\Api\Model\ProcessInstanceSearchQuery;
use Camunda\Orchestration\Api\Model\ProcessInstanceSearchQueryResult;
use Camunda\Orchestration\CamundaClient;
use Camunda\Orchestration\Semantic\ProcessDefinitionId;
use Camunda\Orchestration\Semantic\ProcessInstanceKey;

// region CreateProcessInstance
function create_process_instance(CamundaClient $client): void
{
    $api = $client->api(ProcessInstanceApi::class);

    $instruction = (new ProcessInstanceCreationInstructionById())
        ->setProcessDefinitionId(ProcessDefinitionId::of('order-process'))
        ->setVariables(['orderId' => 'ORD-42', 'total' => 99.5]);

    $result = $api->createProcessInstance($instruction);

    if ($result instanceof CreateProcessInstanceResult) {
        echo 'Started instance: ', (string) $result->getProcessInstanceKey(), "\n";
    }
}
// endregion CreateProcessInstance

// region CreateProcessInstanceFromArray
function create_process_instance_from_array(CamundaClient $client): void
{
    $api = $client->api(ProcessInstanceApi::class);

    // Array construction lifts raw strings into their semantic value objects.
    $instruction = new ProcessInstanceCreationInstructionById([
        'processDefinitionId' => 'order-process',
        'variables' => ['orderId' => 'ORD-42'],
    ]);

    $api->createProcessInstance($instruction);
}
// endregion CreateProcessInstanceFromArray

// region CancelProcessInstance
function cancel_process_instance(CamundaClient $client, ProcessInstanceKey $key): void
{
    $api = $client->api(ProcessInstanceApi::class);
    $api->cancelProcessInstance((string) $key);
}
// endregion CancelProcessInstance

// region SearchProcessInstances
function search_process_instances(CamundaClient $client): void
{
    $api = $client->api(ProcessInstanceApi::class);

    $result = $api->searchProcessInstances(new ProcessInstanceSearchQuery());

    if ($result instanceof ProcessInstanceSearchQueryResult) {
        foreach ($result->getItems() as $item) {
            echo (string) $item->getProcessInstanceKey(), "\n";
        }
    }
}
// endregion SearchProcessInstances

// region CancelProcessInstancesBatchOperation
/**
 * Cancel process instances (batch).
 */
function cancel_process_instances_batch_operation(CamundaClient $client, \Camunda\Orchestration\Api\Model\ProcessInstanceCancellationBatchOperationRequest $processInstanceCancellationBatchOperationRequest): void
{
    $client->cancelProcessInstancesBatchOperation($processInstanceCancellationBatchOperationRequest);
}
// endregion CancelProcessInstancesBatchOperation

// region DeleteProcessInstancesBatchOperation
/**
 * Delete process instances (batch).
 */
function delete_process_instances_batch_operation(CamundaClient $client, \Camunda\Orchestration\Api\Model\ProcessInstanceDeletionBatchOperationRequest $processInstanceDeletionBatchOperationRequest): void
{
    $client->deleteProcessInstancesBatchOperation($processInstanceDeletionBatchOperationRequest);
}
// endregion DeleteProcessInstancesBatchOperation

// region ResolveIncidentsBatchOperation
/**
 * Resolve related incidents (batch).
 */
function resolve_incidents_batch_operation(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\ProcessInstanceIncidentResolutionBatchOperationRequest $processInstanceIncidentResolutionBatchOperationRequest = null): void
{
    $client->resolveIncidentsBatchOperation($processInstanceIncidentResolutionBatchOperationRequest);
}
// endregion ResolveIncidentsBatchOperation

// region MigrateProcessInstancesBatchOperation
/**
 * Migrate process instances (batch).
 */
function migrate_process_instances_batch_operation(CamundaClient $client, \Camunda\Orchestration\Api\Model\ProcessInstanceMigrationBatchOperationRequest $processInstanceMigrationBatchOperationRequest): void
{
    $client->migrateProcessInstancesBatchOperation($processInstanceMigrationBatchOperationRequest);
}
// endregion MigrateProcessInstancesBatchOperation

// region ModifyProcessInstancesBatchOperation
/**
 * Modify process instances (batch).
 */
function modify_process_instances_batch_operation(CamundaClient $client, \Camunda\Orchestration\Api\Model\ProcessInstanceModificationBatchOperationRequest $processInstanceModificationBatchOperationRequest): void
{
    $client->modifyProcessInstancesBatchOperation($processInstanceModificationBatchOperationRequest);
}
// endregion ModifyProcessInstancesBatchOperation

// region SuspendProcessInstance
/**
 * Suspend process instance.
 */
function suspend_process_instance(CamundaClient $client, ProcessInstanceKey $processInstanceKey, ?\Camunda\Orchestration\Api\Model\SuspendProcessInstanceRequest $suspendProcessInstanceRequest = null): void
{
    $client->suspendProcessInstance((string) $processInstanceKey, $suspendProcessInstanceRequest);
}
// endregion SuspendProcessInstance

// region ResumeProcessInstance
/**
 * Resume process instance.
 */
function resume_process_instance(CamundaClient $client, ProcessInstanceKey $processInstanceKey, ?\Camunda\Orchestration\Api\Model\ResumeProcessInstanceRequest $resumeProcessInstanceRequest = null): void
{
    $client->resumeProcessInstance((string) $processInstanceKey, $resumeProcessInstanceRequest);
}
// endregion ResumeProcessInstance

// region AssignProcessInstanceBusinessId
/**
 * Assign business ID.
 */
function assign_process_instance_business_id(CamundaClient $client, ProcessInstanceKey $processInstanceKey, \Camunda\Orchestration\Api\Model\ProcessInstanceBusinessIdAssignmentInstruction $processInstanceBusinessIdAssignmentInstruction): void
{
    $client->assignProcessInstanceBusinessId((string) $processInstanceKey, $processInstanceBusinessIdAssignmentInstruction);
}
// endregion AssignProcessInstanceBusinessId

// region SuspendProcessInstancesBatchOperation
/**
 * Suspend process instances (batch).
 */
function suspend_process_instances_batch_operation(CamundaClient $client, \Camunda\Orchestration\Api\Model\ProcessInstanceSuspensionBatchOperationRequest $processInstanceSuspensionBatchOperationRequest): void
{
    $client->suspendProcessInstancesBatchOperation($processInstanceSuspensionBatchOperationRequest);
}
// endregion SuspendProcessInstancesBatchOperation

// region ResumeProcessInstancesBatchOperation
/**
 * Resume process instances (batch).
 */
function resume_process_instances_batch_operation(CamundaClient $client, \Camunda\Orchestration\Api\Model\ProcessInstanceResumptionBatchOperationRequest $processInstanceResumptionBatchOperationRequest): void
{
    $client->resumeProcessInstancesBatchOperation($processInstanceResumptionBatchOperationRequest);
}
// endregion ResumeProcessInstancesBatchOperation

// region GetProcessInstance
/**
 * Get process instance.
 */
function get_process_instance(CamundaClient $client, ProcessInstanceKey $processInstanceKey): void
{
    $client->getProcessInstance((string) $processInstanceKey);
}
// endregion GetProcessInstance

// region GetProcessInstanceCallHierarchy
/**
 * Get call hierarchy.
 */
function get_process_instance_call_hierarchy(CamundaClient $client, ProcessInstanceKey $processInstanceKey): void
{
    $client->getProcessInstanceCallHierarchy((string) $processInstanceKey);
}
// endregion GetProcessInstanceCallHierarchy

// region DeleteProcessInstance
/**
 * Delete process instance.
 */
function delete_process_instance(CamundaClient $client, ProcessInstanceKey $processInstanceKey, ?\Camunda\Orchestration\Api\Model\DeleteProcessInstanceRequest $deleteProcessInstanceRequest = null): void
{
    $client->deleteProcessInstance((string) $processInstanceKey, $deleteProcessInstanceRequest);
}
// endregion DeleteProcessInstance

// region ResolveProcessInstanceIncidents
/**
 * Resolve related incidents.
 */
function resolve_process_instance_incidents(CamundaClient $client, ProcessInstanceKey $processInstanceKey): void
{
    $client->resolveProcessInstanceIncidents((string) $processInstanceKey);
}
// endregion ResolveProcessInstanceIncidents

// region SearchProcessInstanceIncidents
/**
 * Search related incidents.
 */
function search_process_instance_incidents(CamundaClient $client, ProcessInstanceKey $processInstanceKey, ?\Camunda\Orchestration\Api\Model\IncidentSearchQuery $incidentSearchQuery = null): void
{
    $client->searchProcessInstanceIncidents((string) $processInstanceKey, $incidentSearchQuery);
}
// endregion SearchProcessInstanceIncidents

// region MigrateProcessInstance
/**
 * Migrate process instance.
 */
function migrate_process_instance(CamundaClient $client, ProcessInstanceKey $processInstanceKey, \Camunda\Orchestration\Api\Model\ProcessInstanceMigrationInstruction $processInstanceMigrationInstruction): void
{
    $client->migrateProcessInstance((string) $processInstanceKey, $processInstanceMigrationInstruction);
}
// endregion MigrateProcessInstance

// region ModifyProcessInstance
/**
 * Modify process instance.
 */
function modify_process_instance(CamundaClient $client, ProcessInstanceKey $processInstanceKey, \Camunda\Orchestration\Api\Model\ProcessInstanceModificationInstruction $processInstanceModificationInstruction): void
{
    $client->modifyProcessInstance((string) $processInstanceKey, $processInstanceModificationInstruction);
}
// endregion ModifyProcessInstance

// region GetProcessInstanceSequenceFlows
/**
 * Get sequence flows.
 */
function get_process_instance_sequence_flows(CamundaClient $client, ProcessInstanceKey $processInstanceKey): void
{
    $client->getProcessInstanceSequenceFlows((string) $processInstanceKey);
}
// endregion GetProcessInstanceSequenceFlows

// region GetProcessInstanceStatistics
/**
 * Get element instance statistics.
 */
function get_process_instance_statistics(CamundaClient $client, ProcessInstanceKey $processInstanceKey): void
{
    $client->getProcessInstanceStatistics((string) $processInstanceKey);
}
// endregion GetProcessInstanceStatistics

// region GetProcessInstanceWaitStateStatistics
/**
 * Get wait state statistics.
 */
function get_process_instance_wait_state_statistics(CamundaClient $client, ProcessInstanceKey $processInstanceKey): void
{
    $client->getProcessInstanceWaitStateStatistics((string) $processInstanceKey);
}
// endregion GetProcessInstanceWaitStateStatistics
