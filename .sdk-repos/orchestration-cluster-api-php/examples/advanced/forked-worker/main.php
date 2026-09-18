<?php

declare(strict_types=1);

namespace Camunda\Orchestration\Examples\Advanced\ForkedWorker;

require_once dirname(__DIR__, 3) . '/vendor/autoload.php';
require_once dirname(__DIR__) . '/internal/ExampleSupport.php';

use Camunda\Orchestration\Api\Model\ActivatedJobResult;
use Camunda\Orchestration\Examples\Advanced\Internal\ExampleSupport;
use Camunda\Orchestration\Semantic\ProcessInstanceKey;
use Camunda\Orchestration\Worker\ForkedWorkerSupport;
use Camunda\Orchestration\Worker\JobActionClient;
use Camunda\Orchestration\Worker\JobWorkerOptions;

function run(): void
{
    if (!function_exists('pcntl_fork')) {
        fwrite(STDOUT, "Skipping forked-worker example: ext-pcntl is not available in this PHP runtime.\n");
        return;
    }

    $client = ExampleSupport::client();
    $runId = ExampleSupport::runId();
    $processId = 'php-sdk-forked-worker-' . $runId;
    $jobType = 'php-sdk-forked-job-' . $runId;
    $parentPid = getmypid();
    if ($parentPid === false) {
        throw new \RuntimeException('Cannot determine the parent process PID.');
    }
    $handledByPidFile = tempnam(sys_get_temp_dir(), 'camunda-php-forked-worker-');
    if ($handledByPidFile === false) {
        throw new \RuntimeException('Cannot allocate a temporary PID marker file.');
    }
    $resource = ExampleSupport::renderBpmn(__DIR__ . '/forked-worker.bpmn', [
        '__PROCESS_ID__' => $processId,
        '__JOB_TYPE__' => $jobType,
    ]);
    $instance = null;
    $completed = false;
    $failure = null;
    $cleanupMessage = null;

    try {
        ExampleSupport::deploy($client, $resource);
        $instance = ExampleSupport::startProcess($client, $processId, ['input' => 'forked']);
        $worker = $client->createJobWorker(new JobWorkerOptions(
            type: $jobType,
            maxJobs: 1,
            timeoutMs: 15_000,
            requestTimeoutMs: 1_000,
            workerName: 'php-sdk-forked-worker',
            forked: true,
        ));

        $deadline = microtime(true) + 30;
        do {
            $processed = $worker->pollOnce(
                static function (ActivatedJobResult $_job, JobActionClient $_action) use ($handledByPidFile, $parentPid, $runId): array {
                    $handledByPid = getmypid();
                    if ($handledByPid === false) {
                        throw new \RuntimeException('Cannot determine the forked worker PID.');
                    }
                    $marker = ForkedWorkerSupport::encodePidMarker((string) $handledByPid, $parentPid, $runId);
                    if (file_put_contents($handledByPidFile, $marker) === false) {
                        throw new \RuntimeException('Cannot persist the worker PID marker.');
                    }

                    return [
                        'handledByPid' => (string) $handledByPid,
                    ];
                },
            );
            if ($processed === 0) {
                usleep(200_000);
            }
        } while ($processed === 0 && microtime(true) < $deadline);

        if ($processed === 0) {
            throw new \RuntimeException('The forked worker did not receive its job.');
        }

        $result = ExampleSupport::waitForCompletion($client, $instance);
        $marker = ForkedWorkerSupport::waitForHandledByPidMarker($handledByPidFile);
        $handledByPid = ForkedWorkerSupport::validateHandledByPidMarker($marker, $runId, $parentPid);
        $completed = true;
        printf(
            "Forked worker child PID %s completed process instance %s (%s).\n",
            $handledByPid,
            $instance,
            $result->getState()->value,
        );
    } catch (\Throwable $error) {
        $failure = $error;
    } finally {
        $cleanupErrors = [];

        if (!$completed && $instance instanceof ProcessInstanceKey) {
            try {
                ExampleSupport::cancelIfActive($client, $instance);
            } catch (\Throwable $error) {
                $cleanupErrors[] = $error->getMessage();
            }
        }

        foreach ([
            ForkedWorkerSupport::cleanupFile($handledByPidFile, 'worker PID marker'),
            ForkedWorkerSupport::cleanupFile($resource, 'BPMN resource'),
        ] as $cleanupError) {
            if ($cleanupError !== null) {
                $cleanupErrors[] = $cleanupError;
            }
        }

        if ($cleanupErrors !== []) {
            $cleanupMessage = implode(' ', $cleanupErrors);
        }
    }

    if ($failure !== null) {
        if ($cleanupMessage !== null) {
            fwrite(STDERR, "Forked-worker cleanup warning: $cleanupMessage\n");
        }
        throw $failure;
    }
    if ($cleanupMessage !== null) {
        throw new \RuntimeException($cleanupMessage);
    }
}

try {
    run();
} catch (\Throwable $error) {
    fwrite(STDERR, "Forked-worker example failed: {$error->getMessage()}\n");
    exit(1);
}
