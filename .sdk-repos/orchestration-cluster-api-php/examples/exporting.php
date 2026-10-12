<?php

/**
 * Compilable usage examples for exporter control operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;

// region PauseExporting
/**
 * Pause exporting.
 */
function pause_exporting(CamundaClient $client, ?bool $soft = false): void
{
    $client->pauseExporting($soft);
}
// endregion PauseExporting

// region ResumeExporting
/**
 * Resume exporting.
 */
function resume_exporting(CamundaClient $client): void
{
    $client->resumeExporting();
}
// endregion ResumeExporting

// region GetExportingStatus
/**
 * Get exporting status.
 */
function get_exporting_status(CamundaClient $client): void
{
    $client->getExportingStatus();
}
// endregion GetExportingStatus

// region GetClusterExportingStatus
/**
 * Get cluster exporting status.
 * @param array<string, mixed> $variables
 */
function get_cluster_exporting_status(CamundaClient $client, ?int $hostIndex = null, array $variables = []): void
{
    $client->getClusterExportingStatus($hostIndex, $variables);
}
// endregion GetClusterExportingStatus

// region PauseClusterExporting
/**
 * Pause cluster exporting.
 * @param array<string, mixed> $variables
 */
function pause_cluster_exporting(CamundaClient $client, ?bool $soft = false, ?int $hostIndex = null, array $variables = []): void
{
    $client->pauseClusterExporting($soft, $hostIndex, $variables);
}
// endregion PauseClusterExporting

// region ResumeClusterExporting
/**
 * Resume cluster exporting.
 * @param array<string, mixed> $variables
 */
function resume_cluster_exporting(CamundaClient $client, ?int $hostIndex = null, array $variables = []): void
{
    $client->resumeClusterExporting($hostIndex, $variables);
}
// endregion ResumeClusterExporting
