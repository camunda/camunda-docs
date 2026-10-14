---
id: job-workers
title: "Job workers"
sidebar_label: "Job workers"
sidebar_position: 8
mdx:
  format: md
---

# Job workers

:::caution Technical Preview
The PHP SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

A job worker long-polls for jobs of a given type and dispatches each to your handler. Returning an array auto-completes the job with those variables; you can also complete, fail, or raise a BPMN error explicitly via the handler's `JobActionClient`.

```php
function readme_job_worker(): void
{
    $client = CamundaClient::fromEnvironment();

    $worker = $client->createJobWorker(new JobWorkerOptions(
        type: 'payment-processing',
        maxJobs: 5,
        timeoutMs: 30_000,
    ));

    $worker->run(function (ActivatedJobResult $job, JobActionClient $action): array {
        // ... perform the work ...
        return ['status' => 'paid'];
    });
}
```

When `ext-pcntl` is available and `forked: true` is set, each job is processed in its own child process, bounded to `maxJobs` concurrent children.

## Object-oriented handlers

```php
final class PaymentJobHandler implements JobHandler
{
    public function handle(ActivatedJobResult $job, JobActionClient $action): ?array
    {
        $variables = $job->getVariables();
        if (!isset($variables['paymentId'])) {
            $action->error('MISSING_PAYMENT_ID', 'The payment job has no payment id.');
            return null;
        }

        return ['paymentStatus' => 'approved'];
    }
}

function object_job_handler(CamundaClient $client): void
{
    $worker = $client->createJobWorker(new JobWorkerOptions(type: 'process-payment'));
    $worker->run(new PaymentJobHandler());
}
```
