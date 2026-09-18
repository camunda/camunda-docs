<?php

/**
 * Compilable usage examples for cluster administration operations.
 *
 * Rebalance operations affect broker workload. Use dry-run where supported before changing
 * a production cluster.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;

// region GetStatus
/**
 * Get cluster status.
 */
function get_status(CamundaClient $client): void
{
    $client->getStatus();
}
// endregion GetStatus

// region GetTopology
/**
 * Get cluster topology.
 */
function get_topology(CamundaClient $client): void
{
    $client->getTopology();
}
// endregion GetTopology

// region GetClusterStatus
/**
 * Get the status of the whole cluster.
 * @param array<string, mixed> $variables
 */
function get_cluster_status(CamundaClient $client, ?int $hostIndex = null, array $variables = []): void
{
    $client->getClusterStatus($hostIndex, $variables);
}
// endregion GetClusterStatus

// region GetClusterTopology
/**
 * Get the topology of the whole cluster.
 * @param array<string, mixed> $variables
 */
function get_cluster_topology(CamundaClient $client, ?int $hostIndex = null, array $variables = []): void
{
    $client->getClusterTopology($hostIndex, $variables);
}
// endregion GetClusterTopology

// region TriggerClusterRebalance
/**
 * Trigger a cluster rebalance.
 * @param array<string, mixed> $variables
 */
function trigger_cluster_rebalance(CamundaClient $client, ?bool $dryRun = false, ?\Camunda\Orchestration\Api\Model\ClusterRebalanceRequest $clusterRebalanceRequest = null, ?int $hostIndex = null, array $variables = []): void
{
    $client->triggerClusterRebalance($dryRun, $clusterRebalanceRequest, $hostIndex, $variables);
}
// endregion TriggerClusterRebalance

// region GetClusterRebalance
/**
 * Get cluster rebalance status.
 * @param array<string, mixed> $variables
 */
function get_cluster_rebalance(CamundaClient $client, ?int $hostIndex = null, array $variables = []): void
{
    $client->getClusterRebalance($hostIndex, $variables);
}
// endregion GetClusterRebalance

// region CancelClusterRebalance
/**
 * Cancel a cluster rebalance.
 * @param array<string, mixed> $variables
 */
function cancel_cluster_rebalance(CamundaClient $client, ?int $hostIndex = null, array $variables = []): void
{
    $client->cancelClusterRebalance($hostIndex, $variables);
}
// endregion CancelClusterRebalance
