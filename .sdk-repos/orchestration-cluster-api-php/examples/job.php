<?php

/**
 * Compilable usage examples for job and job-worker operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\Api\Api\JobApi;
use Camunda\Orchestration\Api\Model\ActivatedJobResult;
use Camunda\Orchestration\Api\Model\JobActivationRequest;
use Camunda\Orchestration\Api\Model\JobActivationResult;
use Camunda\Orchestration\CamundaClient;
use Camunda\Orchestration\Semantic\JobKey;
use Camunda\Orchestration\Worker\JobActionClient;
use Camunda\Orchestration\Worker\JobWorkerOptions;

// region ActivateJobs
function activate_jobs(CamundaClient $client): void
{
    $api = $client->api(JobApi::class);

    $request = (new JobActivationRequest())
        ->setType('payment-processing')
        ->setTimeout(30_000)
        ->setMaxJobsToActivate(5);

    $result = $api->activateJobs($request);

    if ($result instanceof JobActivationResult) {
        foreach ($result->getJobs() as $job) {
            echo 'Job ', (string) $job->getJobKey(), ': ', (string) $job->getType(), "\n";
        }
    }
}
// endregion ActivateJobs

// region JobWorker
function job_worker(CamundaClient $client): void
{
    $worker = $client->createJobWorker(new JobWorkerOptions(
        type: 'payment-processing',
        maxJobs: 5,
        timeoutMs: 30_000,
    ));

    // Returning an array auto-completes the job with those variables.
    $worker->run(function (ActivatedJobResult $job, JobActionClient $action): array {
        return ['status' => 'paid'];
    });
}
// endregion JobWorker

// region JobWorkerWithErrorHandling
function job_worker_with_error_handling(CamundaClient $client): void
{
    $worker = $client->createJobWorker(new JobWorkerOptions(type: 'email-sending'));

    $worker->run(function (ActivatedJobResult $job, JobActionClient $action): void {
        $variables = $job->getVariables();

        if (!isset($variables['recipient'])) {
            // Raise a BPMN error to be caught by an error boundary event.
            $action->error('MISSING_DATA', 'No recipient address provided');
            return;
        }

        try {
            // ... send the email ...
            $action->complete(['sent' => true]);
        } catch (\Throwable $e) {
            // Fail with a retry and back-off.
            $action->fail(retries: 2, errorMessage: $e->getMessage(), retryBackOffMs: 5_000);
        }
    });
}
// endregion JobWorkerWithErrorHandling

// region ForkedJobWorker
function forked_job_worker(CamundaClient $client): void
{
    // With ext-pcntl, each job is processed in its own child process,
    // bounded to `maxJobs` concurrent children.
    $worker = $client->createJobWorker(new JobWorkerOptions(
        type: 'cpu-intensive-task',
        maxJobs: 4,
        forked: true,
    ));

    $worker->run(function (ActivatedJobResult $job, JobActionClient $action): array {
        return ['result' => 'computed'];
    });
}
// endregion ForkedJobWorker

// region CompleteJob
function complete_job(CamundaClient $client, JobKey $jobKey): void
{
    $api = $client->api(JobApi::class);
    $api->completeJob((string) $jobKey);
}
// endregion CompleteJob

// region SearchJobs
/**
 * Search jobs.
 */
function search_jobs(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\JobSearchQuery $jobSearchQuery = null): void
{
    $client->searchJobs($jobSearchQuery);
}
// endregion SearchJobs

// region UpdateJob
/**
 * Update job.
 */
function update_job(CamundaClient $client, JobKey $jobKey, \Camunda\Orchestration\Api\Model\JobUpdateRequest $jobUpdateRequest): void
{
    $client->updateJob((string) $jobKey, $jobUpdateRequest);
}
// endregion UpdateJob

// region UpdateJobsBatchOperation
/**
 * Update jobs (batch).
 */
function update_jobs_batch_operation(CamundaClient $client, \Camunda\Orchestration\Api\Model\JobBatchUpdateRequest $jobBatchUpdateRequest): void
{
    $client->updateJobsBatchOperation($jobBatchUpdateRequest);
}
// endregion UpdateJobsBatchOperation

// region GetGlobalJobStatistics
/**
 * Global job statistics.
 */
function get_global_job_statistics(CamundaClient $client, \DateTime $from, \DateTime $to, ?string $jobType = null): void
{
    $client->getGlobalJobStatistics($from, $to, $jobType);
}
// endregion GetGlobalJobStatistics

// region GetJobTypeStatistics
/**
 * Get job statistics by type.
 */
function get_job_type_statistics(CamundaClient $client, \Camunda\Orchestration\Api\Model\JobTypeStatisticsQuery $jobTypeStatisticsQuery): void
{
    $client->getJobTypeStatistics($jobTypeStatisticsQuery);
}
// endregion GetJobTypeStatistics

// region GetJobWorkerStatistics
/**
 * Get job statistics by worker.
 */
function get_job_worker_statistics(CamundaClient $client, \Camunda\Orchestration\Api\Model\JobWorkerStatisticsQuery $jobWorkerStatisticsQuery): void
{
    $client->getJobWorkerStatistics($jobWorkerStatisticsQuery);
}
// endregion GetJobWorkerStatistics

// region GetJobTimeSeriesStatistics
/**
 * Get time-series metrics for a job type.
 */
function get_job_time_series_statistics(CamundaClient $client, \Camunda\Orchestration\Api\Model\JobTimeSeriesStatisticsQuery $jobTimeSeriesStatisticsQuery): void
{
    $client->getJobTimeSeriesStatistics($jobTimeSeriesStatisticsQuery);
}
// endregion GetJobTimeSeriesStatistics

// region GetJobErrorStatistics
/**
 * Get error metrics for a job type.
 */
function get_job_error_statistics(CamundaClient $client, \Camunda\Orchestration\Api\Model\JobErrorStatisticsQuery $jobErrorStatisticsQuery): void
{
    $client->getJobErrorStatistics($jobErrorStatisticsQuery);
}
// endregion GetJobErrorStatistics
