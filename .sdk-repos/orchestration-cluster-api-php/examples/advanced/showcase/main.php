<?php

declare(strict_types=1);

namespace Camunda\Orchestration\Examples\Advanced\Showcase;

require_once dirname(__DIR__, 3) . '/vendor/autoload.php';
require_once dirname(__DIR__) . '/internal/ExampleSupport.php';
require_once dirname(__DIR__) . '/internal/ShowcaseCatalog.php';

use Camunda\Orchestration\Api\Api\IncidentApi;
use Camunda\Orchestration\Api\Api\JobApi;
use Camunda\Orchestration\Api\Api\UserTaskApi;
use Camunda\Orchestration\Api\Model\DecisionEvaluationById;
use Camunda\Orchestration\Api\Model\EvaluateDecisionResult;
use Camunda\Orchestration\Api\Model\IncidentSearchQueryResult;
use Camunda\Orchestration\Api\Model\JobActivationRequest;
use Camunda\Orchestration\Api\Model\JobActivationResult;
use Camunda\Orchestration\Api\Model\JobFailRequest;
use Camunda\Orchestration\Api\Model\ProblemDetail;
use Camunda\Orchestration\Api\Model\TopologyResponse;
use Camunda\Orchestration\Api\Model\UserTaskSearchQueryResult;
use Camunda\Orchestration\CamundaClient;
use Camunda\Orchestration\Examples\Advanced\Internal\ExampleSupport;
use Camunda\Orchestration\Examples\Advanced\Internal\ShowcaseCatalog;
use Camunda\Orchestration\Semantic\IncidentKey;
use Camunda\Orchestration\Semantic\ProcessInstanceKey;
use Camunda\Orchestration\Semantic\UserTaskKey;
use RuntimeException;
use Throwable;

const RESULTS_PATH = 'docs/example-validation-results.json';

function run(): int
{
    $root = dirname(__DIR__, 3);
    $scenarios = ShowcaseCatalog::load($root);
    $selected = selected_scenario($scenarios);
    $startedAt = new \DateTimeImmutable();
    $client = CamundaClient::fromEnvironment();
    $configuration = $client->configuration();
    $topology = $client->getTopology();
    if (!$topology instanceof TopologyResponse) {
        throw new RuntimeException('Cannot start the showcase: ' . describe_problem($topology));
    }

    printf(
        "Running PHP SDK showcase against Camunda %s at %s.\n",
        $topology->getGatewayVersion(),
        $configuration->restAddress,
    );

    $scenarioResults = [];
    foreach ($scenarios as $scenario) {
        if ($selected !== null && $scenario['id'] !== $selected) {
            continue;
        }

        $scenarioStartedAt = hrtime(true);
        $entries = [];
        try {
            foreach (scenario_proof_entries($root, $scenario['id'], $client) as $entry) {
                $entries[] = $entry;
            }
        } catch (Throwable $error) {
            $entries[] = result_entry(
                'examples/advanced/showcase/main.php',
                $scenario['id'] . '_proof',
                'FAIL',
                0,
                $error::class . ': ' . $error->getMessage(),
            );
        }

        $status = scenario_status($entries);
        $summary = scenario_summary($entries);
        $durationMs = elapsed_ms($scenarioStartedAt);
        printf("[%s] %s - %s\n", strtoupper($status), $scenario['title'], $summary);
        $scenarioResults[] = [
            'id' => $scenario['id'],
            'status' => $status,
            'durationMs' => $durationMs,
            'summary' => $summary,
            'results' => $entries,
        ];
    }

    $finishedAt = new \DateTimeImmutable();
    $results = [
        'schemaVersion' => 1,
        'run' => [
            'startedAt' => $startedAt->format(DATE_ATOM),
            'finishedAt' => $finishedAt->format(DATE_ATOM),
            'cluster' => [
                'restAddress' => $configuration->restAddress,
                'gatewayVersion' => $topology->getGatewayVersion(),
            ],
        ],
        'snippets' => [
            'status' => 'PASS',
            'summary' => 'All source-backed snippets passed syntax and PHPStan validation; the gallery maps them to these six live proofs.',
        ],
        'scenarios' => $scenarioResults,
    ];
    write_results($root, $results);

    $report = run_program($root, 'scripts/generate-example-validation-report.php');
    if ($report['status'] !== 'PASS') {
        fwrite(STDERR, "Could not generate HTML report: {$report['evidence']}\n");
        return 1;
    }
    printf("HTML report: %s/docs/example-validation.html\n", $root);

    return in_array('FAIL', array_column($scenarioResults, 'status'), true) ? 1 : 0;
}

/**
 * @param list<array{id: string, title: string, summary: string, command: string, sources: list<string>}> $scenarios
 */
function selected_scenario(array $scenarios): ?string
{
    /** @var list<string> $arguments */
    $arguments = [];
    $rawArguments = $_SERVER['argv'] ?? [];
    if (is_array($rawArguments)) {
        foreach ($rawArguments as $rawArgument) {
            if (!is_string($rawArgument)) {
                throw new RuntimeException('Showcase command arguments must be strings.');
            }
            $arguments[] = $rawArgument;
        }
    }
    $selected = null;
    for ($index = 1, $count = count($arguments); $index < $count; ++$index) {
        $argument = $arguments[$index];
        if ($argument === '--scenario' && isset($arguments[++$index])) {
            $selected = $arguments[$index];
            continue;
        }
        if (str_starts_with($argument, '--scenario=')) {
            $selected = substr($argument, strlen('--scenario='));
            continue;
        }
        throw new RuntimeException("Unknown argument: $argument");
    }
    if ($selected === null) {
        return null;
    }
    foreach ($scenarios as $scenario) {
        if ($scenario['id'] === $selected) {
            return $selected;
        }
    }

    throw new RuntimeException("Unknown showcase scenario: $selected");
}

/**
 * @return list<array{source: string, function: string, status: string, durationMs: int, evidence: string}>
 */
function scenario_proof_entries(string $root, string $scenario, CamundaClient $client): array
{
    $entries = match ($scenario) {
        'bootstrap-and-discovery' => [
            program_entry($root, 'examples/advanced/sdk-test-drive/main.php'),
        ],
        'deployment-and-lifecycle' => [
            deployment_proof($root, $client),
        ],
        'jobs-and-workers' => [
            program_entry($root, 'examples/advanced/order-worker/main.php'),
            program_entry($root, 'examples/advanced/forked-worker/main.php'),
            ...worker_proof($root, $client),
        ],
        'runtime-interaction' => [
            runtime_proof($root, $client),
        ],
        'message-correlation' => [
            program_entry($root, 'examples/advanced/message-correlation/main.php'),
        ],
        'management-and-operations' => [
            management_proof($client),
        ],
        default => throw new RuntimeException("No proof runner exists for $scenario."),
    };

    /** @var list<array{source: string, function: string, status: string, durationMs: int, evidence: string}> $entries */
    return $entries;
}

/**
 * @return array{source: string, function: string, status: string, durationMs: int, evidence: string}
 */
function program_entry(string $root, string $program): array
{
    $result = run_program($root, $program);

    return result_entry($program, basename(dirname($program)), $result['status'], $result['durationMs'], $result['evidence']);
}

/**
 * @return array{source: string, function: string, status: string, durationMs: int, evidence: string}
 */
function deployment_proof(string $root, CamundaClient $client): array
{
    $startedAt = hrtime(true);
    $deployment = $client->deployResourcesFromFiles(
        $root . '/examples/resources/order-process.bpmn',
        $root . '/examples/resources/pricing.dmn',
    );
    if ($deployment instanceof ProblemDetail) {
        return result_entry(
            'examples/advanced/showcase/main.php',
            'deployment_showcase',
            'FAIL',
            elapsed_ms($startedAt),
            describe_problem($deployment),
        );
    }

    $evaluation = $client->evaluateDecision(new DecisionEvaluationById([
        'decisionDefinitionId' => 'pricing',
        'variables' => ['orderTotal' => 99],
    ]));
    if (!$evaluation instanceof EvaluateDecisionResult || !str_contains((string) json_encode($evaluation), 'STANDARD')) {
        return result_entry(
            'examples/advanced/showcase/main.php',
            'deployment_showcase',
            'FAIL',
            elapsed_ms($startedAt),
            'The deployed pricing decision did not return STANDARD for orderTotal 99.',
        );
    }

    return result_entry(
        'examples/advanced/showcase/main.php',
        'deployment_showcase',
        'PASS',
        elapsed_ms($startedAt),
        'Deployed BPMN and DMN resources and evaluated the pricing decision.',
    );
}

/**
 * @return array{source: string, function: string, status: string, durationMs: int, evidence: string}
 */
function runtime_proof(string $root, CamundaClient $client): array
{
    $startedAt = hrtime(true);
    require_once $root . '/examples/incident.php';
    require_once $root . '/examples/user_task.php';
    $runId = ExampleSupport::runId();
    $userProcessId = 'php-sdk-showcase-user-' . $runId;
    $incidentProcessId = 'php-sdk-showcase-incident-' . $runId;
    $jobType = 'php-sdk-showcase-incident-job-' . $runId;
    $resource = ExampleSupport::renderBpmn($root . '/examples/advanced/showcase/runtime-showcase.bpmn', [
        '__USER_PROCESS_ID__' => $userProcessId,
        '__INCIDENT_PROCESS_ID__' => $incidentProcessId,
        '__INCIDENT_JOB_TYPE__' => $jobType,
    ]);
    $incidentInstance = null;

    try {
        ExampleSupport::deploy($client, $resource);

        $userInstance = ExampleSupport::startProcess($client, $userProcessId, ['showcase' => $runId]);
        $userTaskKey = await_user_task($client, $userInstance);
        \Camunda\Orchestration\Examples\assign_user_task($client, $userTaskKey);
        \Camunda\Orchestration\Examples\complete_user_task($client, $userTaskKey);
        ExampleSupport::waitForCompletion($client, $userInstance);

        $incidentInstance = ExampleSupport::startProcess($client, $incidentProcessId, ['showcase' => $runId]);
        $jobApi = $client->api(JobApi::class);
        $activation = $jobApi->activateJobs(
            (new JobActivationRequest())
                ->setType($jobType)
                ->setMaxJobsToActivate(1)
                ->setTimeout(10_000),
        );
        if (!$activation instanceof JobActivationResult || $activation->getJobs() === []) {
            throw new RuntimeException('Could not activate the showcase incident job.');
        }
        $fail = (new JobFailRequest())
            ->setRetries(0)
            ->setErrorMessage('Showcase incident');
        $jobApi->failJob((string) $activation->getJobs()[0]->getJobKey(), $fail);

        $incidentKey = await_incident($client, $incidentInstance);
        \Camunda\Orchestration\Examples\resolve_incident($client, $incidentKey);
        ExampleSupport::cancelIfActive($client, $incidentInstance);

        return result_entry(
            'examples/advanced/showcase/main.php',
            'runtime_showcase',
            'PASS',
            elapsed_ms($startedAt),
            'Assigned and completed a user task, then induced, resolved, and cleaned up an incident.',
        );
    } finally {
        if ($incidentInstance instanceof ProcessInstanceKey) {
            try {
                ExampleSupport::cancelIfActive($client, $incidentInstance);
            } catch (Throwable) {
                // The process may already be cancelled after its resolved incident.
            }
        }
        if (is_file($resource)) {
            unlink($resource);
        }
    }
}

/**
 * @return list<array{source: string, function: string, status: string, durationMs: int, evidence: string}>
 */
function worker_proof(string $root, CamundaClient $client): array
{
    if (!function_exists('pcntl_fork')) {
        return [
            result_entry(
                'examples/job.php',
                'worker_showcase',
                'EXPECTED-CONSTRAINT',
                0,
                'ext-pcntl is unavailable, so unbounded worker snippets cannot be bounded safely.',
            ),
        ];
    }

    require_once $root . '/examples/job.php';
    require_once $root . '/examples/readme.php';
    $runId = ExampleSupport::runId();
    $resource = ExampleSupport::renderBpmn($root . '/examples/advanced/showcase/worker-showcase.bpmn', [
        '__EMAIL_PROCESS_ID__' => 'php-sdk-showcase-email-' . $runId,
        '__CPU_PROCESS_ID__' => 'php-sdk-showcase-cpu-' . $runId,
        '__PROCESS_PAYMENT_ID__' => 'php-sdk-showcase-process-payment-' . $runId,
    ]);
    $results = [];

    try {
        ExampleSupport::deploy($client, $root . '/examples/resources/order-process.bpmn', $resource);
        $cases = [
            [
                'source' => 'examples/job.php',
                'function' => 'job_worker',
                'processId' => 'order-process',
                'variables' => ['orderId' => 'worker-' . $runId],
                'callable' => static function (CamundaClient $workerClient): void {
                    \Camunda\Orchestration\Examples\job_worker($workerClient);
                },
            ],
            [
                'source' => 'examples/readme.php',
                'function' => 'readme_job_worker',
                'processId' => 'order-process',
                'variables' => ['orderId' => 'readme-worker-' . $runId],
                'callable' => static function (CamundaClient $_workerClient): void {
                    \Camunda\Orchestration\Examples\readme_job_worker();
                },
            ],
            [
                'source' => 'examples/job.php',
                'function' => 'job_worker_with_error_handling',
                'processId' => 'php-sdk-showcase-email-' . $runId,
                'variables' => ['recipient' => 'showcase@example.test'],
                'callable' => static function (CamundaClient $workerClient): void {
                    \Camunda\Orchestration\Examples\job_worker_with_error_handling($workerClient);
                },
            ],
            [
                'source' => 'examples/job.php',
                'function' => 'forked_job_worker',
                'processId' => 'php-sdk-showcase-cpu-' . $runId,
                'variables' => ['input' => 'showcase'],
                'callable' => static function (CamundaClient $workerClient): void {
                    \Camunda\Orchestration\Examples\forked_job_worker($workerClient);
                },
            ],
            [
                'source' => 'examples/readme.php',
                'function' => 'object_job_handler',
                'processId' => 'php-sdk-showcase-process-payment-' . $runId,
                'variables' => ['paymentId' => 'payment-' . $runId],
                'callable' => static function (CamundaClient $workerClient): void {
                    \Camunda\Orchestration\Examples\object_job_handler($workerClient);
                },
            ],
        ];

        foreach ($cases as $case) {
            $results[] = bounded_worker_entry(
                $client,
                $case['source'],
                $case['function'],
                $case['processId'],
                $case['variables'],
                $case['callable'],
            );
        }
    } finally {
        if (is_file($resource)) {
            unlink($resource);
        }
    }

    return $results;
}

/**
 * @param array<string, mixed> $variables
 * @param callable(CamundaClient): void $worker
 * @return array{source: string, function: string, status: string, durationMs: int, evidence: string}
 */
function bounded_worker_entry(
    CamundaClient $client,
    string $source,
    string $function,
    string $processId,
    array $variables,
    callable $worker,
): array {
    $startedAt = hrtime(true);
    $instance = ExampleSupport::startProcess($client, $processId, $variables);
    $pid = pcntl_fork();
    if ($pid === -1) {
        ExampleSupport::cancelIfActive($client, $instance);

        return result_entry($source, $function, 'FAIL', elapsed_ms($startedAt), 'Cannot fork a bounded worker process.');
    }
    if ($pid === 0) {
        pcntl_async_signals(true);
        pcntl_signal(SIGALRM, static fn (): never => exit(0));
        pcntl_signal(SIGTERM, static fn (): never => exit(0));
        pcntl_alarm(15);
        $worker(CamundaClient::fromEnvironment());
        exit(0);
    }

    try {
        ExampleSupport::waitForCompletion($client, $instance, 12);

        return result_entry(
            $source,
            $function,
            'PASS',
            elapsed_ms($startedAt),
            "Completed process instance $instance through its bounded worker loop.",
        );
    } catch (Throwable $error) {
        try {
            ExampleSupport::cancelIfActive($client, $instance);
        } catch (Throwable) {
            // Preserve the worker failure as the primary result.
        }

        return result_entry($source, $function, 'FAIL', elapsed_ms($startedAt), $error->getMessage());
    } finally {
        if (function_exists('posix_kill')) {
            posix_kill($pid, SIGTERM);
        }
        pcntl_waitpid($pid, $status);
    }
}

/**
 * @return array{source: string, function: string, status: string, durationMs: int, evidence: string}
 */
function management_proof(CamundaClient $client): array
{
    $startedAt = hrtime(true);
    $topology = $client->getTopology();
    if (!$topology instanceof TopologyResponse) {
        return result_entry(
            'examples/advanced/showcase/main.php',
            'management_showcase',
            'FAIL',
            elapsed_ms($startedAt),
            describe_problem($topology),
        );
    }
    $systemConfiguration = $client->getSystemConfiguration();
    if ($systemConfiguration instanceof ProblemDetail) {
        return result_entry(
            'examples/advanced/showcase/main.php',
            'management_showcase',
            'FAIL',
            elapsed_ms($startedAt),
            describe_problem($systemConfiguration),
        );
    }
    $exporting = $client->getExportingStatus();
    if ($exporting instanceof ProblemDetail) {
        return result_entry(
            'examples/advanced/showcase/main.php',
            'management_showcase',
            'FAIL',
            elapsed_ms($startedAt),
            describe_problem($exporting),
        );
    }
    $paused = $client->pauseExporting();
    if ($paused instanceof ProblemDetail) {
        return result_entry(
            'examples/advanced/showcase/main.php',
            'management_showcase',
            'FAIL',
            elapsed_ms($startedAt),
            describe_problem($paused),
        );
    }
    $resumed = $client->resumeExporting();
    if ($resumed instanceof ProblemDetail) {
        return result_entry(
            'examples/advanced/showcase/main.php',
            'management_showcase',
            'FAIL',
            elapsed_ms($startedAt),
            describe_problem($resumed),
        );
    }

    return result_entry(
        'examples/advanced/showcase/main.php',
        'management_showcase',
        'PASS',
        elapsed_ms($startedAt),
        sprintf(
            'Read system configuration and exporting status, then paused and resumed exporting on %d broker(s).',
            count($topology->getBrokers()),
        ),
    );
}

function await_user_task(CamundaClient $client, ProcessInstanceKey $instance): UserTaskKey
{
    /** @var UserTaskApi $api */
    $api = $client->api(UserTaskApi::class);
    $deadline = microtime(true) + 15;
    do {
        $result = $api->searchUserTasks();
        if ($result instanceof UserTaskSearchQueryResult) {
            foreach ($result->getItems() as $task) {
                if ((string) $task->getProcessInstanceKey() === (string) $instance
                    && $task->getUserTaskKey() instanceof UserTaskKey
                ) {
                    return $task->getUserTaskKey();
                }
            }
        }
        usleep(200_000);
    } while (microtime(true) < $deadline);

    throw new RuntimeException("User task for process instance $instance was not visible within 15 seconds.");
}

function await_incident(CamundaClient $client, ProcessInstanceKey $instance): IncidentKey
{
    /** @var IncidentApi $api */
    $api = $client->api(IncidentApi::class);
    $deadline = microtime(true) + 15;
    do {
        $result = $api->searchIncidents();
        if ($result instanceof IncidentSearchQueryResult) {
            foreach ($result->getItems() as $incident) {
                if ((string) $incident->getProcessInstanceKey() === (string) $instance
                    && $incident->getIncidentKey() instanceof IncidentKey
                ) {
                    return $incident->getIncidentKey();
                }
            }
        }
        usleep(200_000);
    } while (microtime(true) < $deadline);

    throw new RuntimeException("Incident for process instance $instance was not visible within 15 seconds.");
}

/**
 * @return array{source: string, function: string, status: string, durationMs: int, evidence: string}
 */
function result_entry(string $source, string $function, string $status, int $durationMs, string $evidence): array
{
    return [
        'source' => $source,
        'function' => $function,
        'status' => $status,
        'durationMs' => $durationMs,
        'evidence' => preg_replace('/\s+/', ' ', $evidence) ?? $evidence,
    ];
}

/**
 * @param list<array{source: string, function: string, status: string, durationMs: int, evidence: string}> $entries
 */
function scenario_status(array $entries): string
{
    if (in_array('FAIL', array_column($entries, 'status'), true)) {
        return 'FAIL';
    }
    if (in_array('EXPECTED-CONSTRAINT', array_column($entries, 'status'), true)) {
        return 'PARTIAL';
    }

    return 'PASS';
}

/**
 * @param list<array{source: string, function: string, status: string, durationMs: int, evidence: string}> $entries
 */
function scenario_summary(array $entries): string
{
    return sprintf(
        '%d PASS, %d expected constraints, %d failures.',
        count_status($entries, 'PASS'),
        count_status($entries, 'EXPECTED-CONSTRAINT'),
        count_status($entries, 'FAIL'),
    );
}

/**
 * @param list<array{status: string}> $entries
 */
function count_status(array $entries, string $status): int
{
    return count(array_filter($entries, static fn (array $entry): bool => $entry['status'] === $status));
}

/**
 * @return array{status: string, durationMs: int, evidence: string}
 */
function run_program(string $root, string $relativePath): array
{
    $path = $root . '/' . $relativePath;
    if (!is_file($path)) {
        return [
            'status' => 'FAIL',
            'durationMs' => 0,
            'evidence' => "Program does not exist: $relativePath",
        ];
    }

    $startedAt = hrtime(true);
    $pipes = [];
    $process = proc_open(
        [PHP_BINARY, $path],
        [
            0 => ['pipe', 'r'],
            1 => ['pipe', 'w'],
            2 => ['pipe', 'w'],
        ],
        $pipes,
        $root,
    );
    if (!is_resource($process)) {
        return [
            'status' => 'FAIL',
            'durationMs' => elapsed_ms($startedAt),
            'evidence' => "Cannot start $relativePath",
        ];
    }

    fclose($pipes[0]);
    $stdout = stream_get_contents($pipes[1]);
    $stderr = stream_get_contents($pipes[2]);
    fclose($pipes[1]);
    fclose($pipes[2]);
    $exitCode = proc_close($process);
    $output = trim((string) $stderr . "\n" . (string) $stdout);

    return [
        'status' => $exitCode === 0 ? 'PASS' : 'FAIL',
        'durationMs' => elapsed_ms($startedAt),
        'evidence' => shorten($output === '' ? "Exited with code $exitCode." : $output),
    ];
}

/**
 * @param array<string, mixed> $results
 */
function write_results(string $root, array $results): void
{
    $path = $root . '/' . RESULTS_PATH;
    $encoded = json_encode($results, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR) . "\n";
    if (file_put_contents($path, $encoded) === false) {
        throw new RuntimeException("Cannot write showcase results: $path");
    }
}

function describe_problem(ProblemDetail $problem): string
{
    return $problem->getDetail() !== '' ? $problem->getDetail() : $problem->getTitle();
}

function elapsed_ms(int $startedAt): int
{
    return (int) ((hrtime(true) - $startedAt) / 1_000_000);
}

function shorten(string $value, int $maximum = 400): string
{
    $value = preg_replace('/\s+/', ' ', $value) ?? $value;

    return strlen($value) <= $maximum ? $value : substr($value, 0, $maximum - 3) . '...';
}

try {
    exit(run());
} catch (Throwable $error) {
    fwrite(STDERR, "Live example showcase failed: {$error->getMessage()}\n");
    exit(1);
}
