<?php

/**
 * Compilable usage examples for authentication and license inspection.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;

// region GetAuthentication
/**
 * Get current user.
 */
function get_authentication(CamundaClient $client): void
{
    $client->getAuthentication();
}
// endregion GetAuthentication

// region GetLicense
/**
 * Get license status.
 */
function get_license(CamundaClient $client): void
{
    $client->getLicense();
}
// endregion GetLicense
