<?php

/**
 * Compilable usage examples for audit-log and form operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;

// region SearchAuditLogs
/**
 * Search audit logs.
 */
function search_audit_logs(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\AuditLogSearchQueryRequest $auditLogSearchQueryRequest = null): void
{
    $client->searchAuditLogs($auditLogSearchQueryRequest);
}
// endregion SearchAuditLogs

// region GetAuditLog
/**
 * Get audit log.
 */
function get_audit_log(CamundaClient $client, string $auditLogKey): void
{
    $client->getAuditLog($auditLogKey);
}
// endregion GetAuditLog

// region GetFormByKey
/**
 * Get form by key.
 */
function get_form_by_key(CamundaClient $client, string $formKey): void
{
    $client->getFormByKey($formKey);
}
// endregion GetFormByKey
