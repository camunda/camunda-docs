<?php

/**
 * Compilable usage examples for deployment operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\Api\Model\DeploymentResult;
use Camunda\Orchestration\Api\Model\ProblemDetail;
use Camunda\Orchestration\CamundaClient;

// region DeployResources
function deploy_resources(CamundaClient $client): DeploymentResult|ProblemDetail
{
    $result = $client->deployResourcesFromFiles(
        __DIR__ . '/resources/order-process.bpmn',
        __DIR__ . '/resources/pricing.dmn',
    );

    if ($result instanceof DeploymentResult) {
        echo 'Deployment key: ', (string) $result->getDeploymentKey(), "\n";
        foreach ($result->getDeployments() as $deployment) {
            $process = $deployment->getProcessDefinition();
            if ($process !== null) {
                echo '  Process: ', (string) $process->getProcessDefinitionId(), "\n";
            }
        }
    }

    return $result;
}
// endregion DeployResources

// region DeploySingleResource
function deploy_single_resource(CamundaClient $client): DeploymentResult|ProblemDetail
{
    return $client->deployResourcesFromFiles(__DIR__ . '/resources/order-process.bpmn');
}
// endregion DeploySingleResource
