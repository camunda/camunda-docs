<?php

/**
 * Compilable usage examples for user-task operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\Api\Api\UserTaskApi;
use Camunda\Orchestration\Api\Model\UserTaskAssignmentRequest;
use Camunda\Orchestration\Api\Model\UserTaskCompletionRequest;
use Camunda\Orchestration\CamundaClient;
use Camunda\Orchestration\Semantic\UserTaskKey;

// region CompleteUserTask
function complete_user_task(CamundaClient $client, UserTaskKey $key): void
{
    $api = $client->api(UserTaskApi::class);

    $request = (new UserTaskCompletionRequest())
        ->setVariables(['approved' => true]);

    $api->completeUserTask((string) $key, $request);
}
// endregion CompleteUserTask

// region AssignUserTask
function assign_user_task(CamundaClient $client, UserTaskKey $key): void
{
    $api = $client->api(UserTaskApi::class);

    $request = (new UserTaskAssignmentRequest())
        ->setAssignee('demo');

    $api->assignUserTask((string) $key, $request);
}
// endregion AssignUserTask

// region SearchUserTasks
/**
 * Search user tasks.
 */
function search_user_tasks(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\UserTaskSearchQuery $userTaskSearchQuery = null): void
{
    $client->searchUserTasks($userTaskSearchQuery);
}
// endregion SearchUserTasks

// region GetUserTask
/**
 * Get user task.
 */
function get_user_task(CamundaClient $client, UserTaskKey $userTaskKey): void
{
    $client->getUserTask((string) $userTaskKey);
}
// endregion GetUserTask

// region UpdateUserTask
/**
 * Update user task.
 */
function update_user_task(CamundaClient $client, UserTaskKey $userTaskKey, ?\Camunda\Orchestration\Api\Model\UserTaskUpdateRequest $userTaskUpdateRequest = null): void
{
    $client->updateUserTask((string) $userTaskKey, $userTaskUpdateRequest);
}
// endregion UpdateUserTask

// region UnassignUserTask
/**
 * Unassign user task.
 */
function unassign_user_task(CamundaClient $client, UserTaskKey $userTaskKey): void
{
    $client->unassignUserTask((string) $userTaskKey);
}
// endregion UnassignUserTask

// region SearchUserTaskAuditLogs
/**
 * Search user task audit logs.
 */
function search_user_task_audit_logs(CamundaClient $client, UserTaskKey $userTaskKey, ?\Camunda\Orchestration\Api\Model\UserTaskAuditLogSearchQueryRequest $userTaskAuditLogSearchQueryRequest = null): void
{
    $client->searchUserTaskAuditLogs((string) $userTaskKey, $userTaskAuditLogSearchQueryRequest);
}
// endregion SearchUserTaskAuditLogs

// region SearchUserTaskEffectiveVariables
/**
 * Search user task effective variables.
 */
function search_user_task_effective_variables(CamundaClient $client, UserTaskKey $userTaskKey, ?bool $truncateValues = null, ?\Camunda\Orchestration\Api\Model\UserTaskEffectiveVariableSearchQueryRequest $userTaskEffectiveVariableSearchQueryRequest = null): void
{
    $client->searchUserTaskEffectiveVariables((string) $userTaskKey, $truncateValues, $userTaskEffectiveVariableSearchQueryRequest);
}
// endregion SearchUserTaskEffectiveVariables

// region GetUserTaskForm
/**
 * Get user task form.
 */
function get_user_task_form(CamundaClient $client, UserTaskKey $userTaskKey): void
{
    $client->getUserTaskForm((string) $userTaskKey);
}
// endregion GetUserTaskForm

// region SearchUserTaskVariables
/**
 * Search user task variables.
 */
function search_user_task_variables(CamundaClient $client, UserTaskKey $userTaskKey, ?bool $truncateValues = null, ?\Camunda\Orchestration\Api\Model\UserTaskVariableSearchQueryRequest $userTaskVariableSearchQueryRequest = null): void
{
    $client->searchUserTaskVariables((string) $userTaskKey, $truncateValues, $userTaskVariableSearchQueryRequest);
}
// endregion SearchUserTaskVariables
