<?php

declare(strict_types=1);

namespace Camunda\Orchestration\Examples\Advanced\Internal;

use Camunda\Orchestration\Api\Model\CreateProcessInstanceResult;
use Camunda\Orchestration\Api\Model\DeploymentResult;
use Camunda\Orchestration\Api\Model\ProblemDetail;
use Camunda\Orchestration\Api\Model\ProcessInstanceResult;
use Camunda\Orchestration\Api\Model\ProcessInstanceStateEnum;
use Camunda\Orchestration\CamundaClient;
use Camunda\Orchestration\Semantic\ProcessDefinitionId;
use Camunda\Orchestration\Semantic\ProcessInstanceKey;
use RuntimeException;

final class ExampleSupport
{
    private const PROCESS_VISIBILITY_TIMEOUT_SECONDS = 5;

    public static function client(): CamundaClient
    {
        return CamundaClient::fromEnvironment();
    }

    public static function runId(): string
    {
        return bin2hex(random_bytes(6));
    }

    /**
     * @param array<string, string> $replacements
     */
    public static function renderBpmn(string $templatePath, array $replacements): string
    {
        $template = file_get_contents($templatePath);
        if ($template === false) {
            throw new RuntimeException("Cannot read BPMN template: $templatePath");
        }

        $temporary = tempnam(sys_get_temp_dir(), 'camunda-php-example-');
        if ($temporary === false) {
            throw new RuntimeException('Cannot allocate a temporary BPMN resource.');
        }

        $path = $temporary . '.bpmn';
        if (!rename($temporary, $path)) {
            unlink($temporary);
            throw new RuntimeException("Cannot create temporary BPMN resource: $path");
        }
        if (file_put_contents($path, strtr($template, $replacements)) === false) {
            unlink($path);
            throw new RuntimeException("Cannot write temporary BPMN resource: $path");
        }

        return $path;
    }

    public static function deploy(CamundaClient $client, string ...$resources): DeploymentResult
    {
        $deployment = $client->deployResourcesFromFiles(...$resources);
        if (!$deployment instanceof DeploymentResult) {
            throw new RuntimeException('Deployment failed: ' . self::describeProblem($deployment));
        }

        return $deployment;
    }

    /**
     * @param array<string, mixed> $variables
     */
    public static function startProcess(
        CamundaClient $client,
        string $processDefinitionId,
        array $variables,
    ): ProcessInstanceKey {
        $instruction = new \Camunda\Orchestration\Api\Model\ProcessInstanceCreationInstructionById([
            'processDefinitionId' => ProcessDefinitionId::of($processDefinitionId),
            'variables' => $variables,
        ]);
        $result = $client->createProcessInstance($instruction);
        if (!$result instanceof CreateProcessInstanceResult) {
            throw new RuntimeException('Process creation failed: ' . self::describeProblem($result));
        }

        return $result->getProcessInstanceKey();
    }

    public static function waitForCompletion(
        CamundaClient $client,
        ProcessInstanceKey $key,
        int $timeoutSeconds = 30,
    ): ProcessInstanceResult {
        $deadline = microtime(true) + $timeoutSeconds;
        $lastState = 'not yet visible';

        do {
            $result = $client->getProcessInstance((string) $key);
            if ($result instanceof ProcessInstanceResult) {
                if ($result->getState() === ProcessInstanceStateEnum::COMPLETED) {
                    return $result;
                }
                $lastState = $result->getState()->value;
            } elseif ($result->getStatus() !== 404) {
                $lastState = self::describeProblem($result);
            }

            usleep(200_000);
        } while (microtime(true) < $deadline);

        throw new RuntimeException("Process instance $key did not complete within $timeoutSeconds seconds (last state: $lastState).");
    }

    public static function cancelIfActive(CamundaClient $client, ProcessInstanceKey $key): void
    {
        $deadline = microtime(true) + self::PROCESS_VISIBILITY_TIMEOUT_SECONDS;

        do {
            $result = $client->getProcessInstance((string) $key);
            if ($result instanceof ProblemDetail) {
                if ($result->getStatus() === 404) {
                    usleep(200_000);
                    continue;
                }
                throw new RuntimeException(
                    'Could not inspect incomplete process instance: ' . self::describeProblem($result),
                );
            }
            if ($result->getState() !== ProcessInstanceStateEnum::ACTIVE) {
                return;
            }

            $cancelled = $client->cancelProcessInstance((string) $key);
            if ($cancelled instanceof ProblemDetail) {
                throw new RuntimeException('Could not cancel incomplete process instance: ' . self::describeProblem($cancelled));
            }

            return;
        } while (microtime(true) < $deadline);

        throw new RuntimeException(
            "Could not inspect incomplete process instance $key within "
            . self::PROCESS_VISIBILITY_TIMEOUT_SECONDS
            . ' seconds.',
        );
    }

    private static function describeProblem(ProblemDetail $problem): string
    {
        return $problem->getDetail() !== '' ? $problem->getDetail() : $problem->getTitle();
    }
}
