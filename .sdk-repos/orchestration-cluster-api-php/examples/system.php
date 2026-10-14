<?php

/**
 * Compilable usage examples for system and setup operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;

// region CreateAdminUser
/**
 * Create admin user.
 */
function create_admin_user(CamundaClient $client, \Camunda\Orchestration\Api\Model\UserRequest $userRequest): void
{
    $client->createAdminUser($userRequest);
}
// endregion CreateAdminUser

// region GetUsageMetrics
/**
 * Get usage metrics.
 */
function get_usage_metrics(CamundaClient $client, \DateTime $startTime, \DateTime $endTime, ?string $tenantId = null, ?bool $withTenants = false): void
{
    $client->getUsageMetrics($startTime, $endTime, $tenantId, $withTenants);
}
// endregion GetUsageMetrics

// region GetSystemConfiguration
/**
 * System configuration (alpha).
 */
function get_system_configuration(CamundaClient $client): void
{
    $client->getSystemConfiguration();
}
// endregion GetSystemConfiguration
