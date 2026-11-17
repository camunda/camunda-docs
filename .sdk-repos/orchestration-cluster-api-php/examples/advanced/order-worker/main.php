<?php

declare(strict_types=1);

namespace Camunda\Orchestration\Examples\Advanced\OrderWorker;

require_once dirname(__DIR__, 3) . '/vendor/autoload.php';
require_once dirname(__DIR__) . '/internal/ExampleSupport.php';

use Camunda\Orchestration\Api\Model\ActivatedJobResult;
use Camunda\Orchestration\Examples\Advanced\Internal\ExampleSupport;
use Camunda\Orchestration\Semantic\ProcessInstanceKey;
use Camunda\Orchestration\Worker\JobActionClient;
use Camunda\Orchestration\Worker\JobWorkerOptions;

function run(): void
{
    $client = ExampleSupport::client();
    $runId = ExampleSupport::runId();
    $processId = 'php-sdk-order-' . $runId;
    $jobType = 'php-sdk-reserve-inventory-' . $runId;
    $resource = ExampleSupport::renderBpmn(__DIR__ . '/order.bpmn', [
        '__PROCESS_ID__' => $processId,
        '__JOB_TYPE__' => $jobType,
    ]);
    /** @var list<ProcessInstanceKey> $instances */
    $instances = [];
    $completed = false;

    try {
        ExampleSupport::deploy($client, $resource);
        $orders = [
            ['orderId' => 'normal-' . $runId, 'sku' => 'coffee-maker', 'outOfStock' => false, 'failFirstIo' => false],
            ['orderId' => 'out-of-stock-' . $runId, 'sku' => 'limited-mug', 'outOfStock' => true, 'failFirstIo' => false],
            ['orderId' => 'retry-' . $runId, 'sku' => 'coffee-beans', 'outOfStock' => false, 'failFirstIo' => true],
        ];
        foreach ($orders as $order) {
            $instances[] = ExampleSupport::startProcess($client, $processId, $order);
        }

        /** @var array<string, int> $attempts */
        $attempts = [];
        $worker = $client->createJobWorker(new JobWorkerOptions(
            type: $jobType,
            maxJobs: 3,
            timeoutMs: 20_000,
            requestTimeoutMs: 1_000,
            fetchVariables: ['orderId', 'sku', 'outOfStock', 'failFirstIo'],
            workerName: 'php-sdk-inventory-reservation',
        ));
        $deadline = microtime(true) + 45;
        $retryOrderId = $orders[2]['orderId'];

        while ((count($attempts) < count($orders) || ($attempts[$retryOrderId] ?? 0) < 2)
            && microtime(true) < $deadline
        ) {
            $processed = $worker->pollOnce(
                static function (ActivatedJobResult $job, JobActionClient $action) use (&$attempts): ?array {
                    $variables = $job->getVariables();
                    $orderId = $variables['orderId'] ?? null;
                    $sku = $variables['sku'] ?? null;
                    if (!is_string($orderId) || !is_string($sku)) {
                        $action->fail(retries: 0, errorMessage: 'The inventory job has invalid input.');
                        return null;
                    }

                    $attempts[$orderId] = ($attempts[$orderId] ?? 0) + 1;
                    if (($variables['outOfStock'] ?? false) === true) {
                        $action->error(
                            errorCode: 'OUT_OF_STOCK',
                            errorMessage: "$sku is unavailable.",
                            variables: ['rejectionReason' => 'inventory unavailable'],
                        );
                        return null;
                    }
                    if (($variables['failFirstIo'] ?? false) === true && $attempts[$orderId] === 1) {
                        $action->fail(
                            retries: 2,
                            errorMessage: "Inventory API timeout for $orderId.",
                            retryBackOffMs: 250,
                        );
                        return null;
                    }

                    return [
                        'reservationId' => 'reservation-' . $orderId,
                        'reserved' => true,
                    ];
                },
            );
            if ($processed === 0) {
                usleep(200_000);
            }
        }

        if (count($attempts) !== count($orders) || ($attempts[$retryOrderId] ?? 0) !== 2) {
            throw new \RuntimeException('The order-worker scenario did not observe the expected retry behavior.');
        }
        foreach ($instances as $instance) {
            ExampleSupport::waitForCompletion($client, $instance);
        }

        $completed = true;
        printf(
            "Completed %d orders: normal=%d, out-of-stock=%d, retry=%d attempts.\n",
            count($instances),
            $attempts[$orders[0]['orderId']],
            $attempts[$orders[1]['orderId']],
            $attempts[$orders[2]['orderId']],
        );
    } finally {
        if (!$completed) {
            foreach ($instances as $instance) {
                ExampleSupport::cancelIfActive($client, $instance);
            }
        }
        if (is_file($resource)) {
            unlink($resource);
        }
    }
}

try {
    run();
} catch (\Throwable $error) {
    fwrite(STDERR, "Order-worker example failed: {$error->getMessage()}\n");
    exit(1);
}
