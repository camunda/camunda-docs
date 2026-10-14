<?php

declare(strict_types=1);

namespace Camunda\Orchestration\Examples\Advanced\SdkTestDrive;

require_once dirname(__DIR__, 3) . '/vendor/autoload.php';
require_once dirname(__DIR__) . '/internal/ExampleSupport.php';

use Camunda\Orchestration\Api\Model\ActivatedJobResult;
use Camunda\Orchestration\Api\Model\ExpressionEvaluationRequest;
use Camunda\Orchestration\Api\Model\ExpressionEvaluationResult;
use Camunda\Orchestration\Api\Model\ProblemDetail;
use Camunda\Orchestration\Api\Model\TopologyResponse;
use Camunda\Orchestration\Examples\Advanced\Internal\ExampleSupport;
use Camunda\Orchestration\Semantic\ProcessInstanceKey;
use Camunda\Orchestration\Worker\JobActionClient;
use Camunda\Orchestration\Worker\JobWorkerOptions;

function run(): void
{
    $client = ExampleSupport::client();
    $topology = $client->getTopology();
    if (!$topology instanceof TopologyResponse) {
        throw new \RuntimeException('Topology request failed: ' . describeProblem($topology));
    }
    printf(
        "Connected to Camunda %s with %d broker(s).\n",
        $topology->getGatewayVersion(),
        count($topology->getBrokers()),
    );

    $evaluation = $client->evaluateExpression(
        (new ExpressionEvaluationRequest())->setExpression('=21 * 2'),
    );
    if (!$evaluation instanceof ExpressionEvaluationResult || $evaluation->getResult() !== 42) {
        throw new \RuntimeException('Expected FEEL expression =21 * 2 to evaluate to 42.');
    }

    $runId = ExampleSupport::runId();
    $processId = 'php-sdk-test-drive-' . $runId;
    $jobType = 'php-sdk-test-drive-greet-' . $runId;
    $resource = ExampleSupport::renderBpmn(__DIR__ . '/test-drive.bpmn', [
        '__PROCESS_ID__' => $processId,
        '__JOB_TYPE__' => $jobType,
    ]);
    $instance = null;
    $completed = false;

    try {
        ExampleSupport::deploy($client, $resource);
        $instance = ExampleSupport::startProcess($client, $processId, ['name' => 'Camunda']);

        $handled = false;
        $worker = $client->createJobWorker(new JobWorkerOptions(
            type: $jobType,
            maxJobs: 1,
            timeoutMs: 15_000,
            requestTimeoutMs: 1_000,
            fetchVariables: ['name'],
            workerName: 'php-sdk-test-drive',
        ));
        $deadline = microtime(true) + 30;

        while (!$handled && microtime(true) < $deadline) {
            $processed = $worker->pollOnce(
                static function (ActivatedJobResult $job, JobActionClient $action) use (&$handled): array {
                    if (($job->getVariables()['name'] ?? null) !== 'Camunda') {
                        $action->fail(retries: 0, errorMessage: 'Unexpected job input.');
                        return [];
                    }

                    $handled = true;

                    return ['greeting' => 'Hello, Camunda!'];
                },
            );
            if ($processed === 0) {
                usleep(200_000);
            }
        }

        if (!$handled) {
            throw new \RuntimeException('The test-drive worker did not receive its job within 30 seconds.');
        }

        $result = ExampleSupport::waitForCompletion($client, $instance);
        $completed = true;
        printf("Process instance %s reached %s.\n", $instance, $result->getState()->value);
    } finally {
        if (!$completed && $instance instanceof ProcessInstanceKey) {
            ExampleSupport::cancelIfActive($client, $instance);
        }
        if (is_file($resource)) {
            unlink($resource);
        }
    }
}

function describeProblem(ProblemDetail $problem): string
{
    return $problem->getDetail() !== '' ? $problem->getDetail() : $problem->getTitle();
}

try {
    run();
} catch (\Throwable $error) {
    fwrite(STDERR, "SDK test drive failed: {$error->getMessage()}\n");
    exit(1);
}
