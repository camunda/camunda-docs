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

Each child builds its own HTTP client before it runs the handler, so children never share the parent's keep-alive connections. With `ext-posix` also loaded, a child ends without running the parent's destructors; without it the child falls back to `exit()`, which runs them, so install `ext-posix` alongside `ext-pcntl` for forked mode. If your handler makes further API calls, use `$action->client()`: in forked mode that is the child's own client. A `CamundaClient` captured from the parent would send its requests over the parent's connection, where concurrent children read each other's responses. For clients that have an HTTP client factory (those built with `CamundaClient::fromEnvironment()` or `fromConfiguration()` without a custom HTTP client, or with a factory passed as the third constructor argument), the SDK detects this: the first time such a client is used in a process other than the one that built it, it raises one `E_USER_WARNING` (per client, per process) naming the fix, and the request still goes ahead. If you pass your own Guzzle client without a factory (`new CamundaClient($config, $guzzle)` or `fromEnvironment([], $guzzle)`), children keep using the client you passed and the warning is not raised — pass a factory as the third constructor argument (`new CamundaClient($config, $guzzle, fn () => new GuzzleClient(...))`) to give each child its own transport and enable the check.

## When a handler throws

If your handler throws, the worker catches the `Throwable` and fails the job for you, then carries on: the remaining jobs of the batch are still dispatched and the poll loop keeps running, so one bad job never stops the worker.

What you can rely on:

- The job is failed with one retry consumed — `retries - 1`, floored at zero — so the broker schedules a retry while retries remain and creates an incident when they are exhausted. No retry back-off is set.
- The failure message is the exception class and its message. The stack trace is never sent to the broker.
- If your handler already completed the job, failed it, or raised a BPMN error before throwing, the worker leaves that terminal action alone and sends nothing further.
- Auto-completion is skipped for a job whose handler threw.

To choose the retry count, the back-off, or the message yourself, catch the error inside your handler and call `$action->fail(...)` explicitly.

Note that a transport error raised while reporting the failure — for example broker backpressure on the fail call itself — still surfaces to the caller of `run()` or `pollOnce()`, exactly as a failing auto-completion does. The same holds when your handler calls `$action->complete()`, `fail()` or `error()` itself and that request fails: the worker surfaces the error rather than replacing the terminal action you asked for with one of its own.

In forked mode that last point works differently, because nothing crosses the process boundary. A handler exception is still turned into a job failure, in the child, before it exits. But a transport error while reporting the terminal action ends the child instead of reaching the parent: the child writes it to `STDERR`, the parent reaps it and polls on, and the job is left to its lease timeout. If your handler needs to observe its own transport failures, handle them inside the handler.

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

## Job variables are untrusted input

Job variables and custom headers reach your handler through the cluster, but neither is shaped by your worker. Variables carry whatever is in scope for the task at activation — input supplied by whoever started the process instance, values written by earlier tasks, and data from any external caller along the way. Custom headers come from the deployed process model, so they are as trustworthy as your deployment pipeline and no more. Treat both as untrusted input.

What the SDK does:

- **Deserialization is JSON only.** Variables and custom headers are typed `array<string,mixed>` and are hydrated from `json_decode` alone. The top level is a PHP array; a nested JSON object arrives as a `stdClass`, a JSON array as a PHP array, and everything else as a scalar or `null`. No class is instantiated from the payload, and nothing in it reaches `unserialize()` or `eval()` — a string that looks like serialized PHP stays a string.
- **Nesting is bounded** at `json_decode`'s default depth of 512, applied to the whole response. A payload nested beyond that is rejected with an `ApiException` (`Error JSON decoding server response`) before your handler is called, so an over-deep payload cannot drive the SDK into unbounded recursion.
- **The SDK adds no variable content to its own output.** There is no logger in the SDK, and it never appends a payload to an exception message it raises: a failed activation reports the `title` and `detail` the cluster returned, nothing more. Note that those two fields are the server's text, passed through unredacted, and that a generated `ApiException` still carries the raw HTTP response body on `getResponseBody()` — for an activation response that body _is_ the variables. Log the exception's message, not the whole exception, if variable values are sensitive in your deployment.
- **Each job gets its own objects.** Every dispatched job is given its own `ActivatedJobResult` and its own `JobActionClient`, and the variables handed to one handler call are a separate value from any other's, so no payload is shared or mutated across jobs. That is object isolation, not sandboxing: a stateful handler — properties, captured references, statics, globals — can still carry data from one job to the next, and forked mode separates jobs into processes for concurrency, not as a security boundary.

What the SDK does not do:

- **It enforces no payload size limit.** There is no cap on the byte size of an activation response or of an individual variable. Note where a cap has to go: the activation response is read into a string and decoded in full before any handler is dispatched, so a check inside your handler runs far too late to protect the worker's memory. A size limit must be imposed upstream — on the cluster, or in the HTTP layer, for example a Guzzle middleware on a custom client that rejects an over-large response before it is buffered. A handler-side check is still worth having against individual values you are about to act on; it is just not a defence against an over-large response.
- **It does not validate or sanitise content.** Type-checking, range-checking, schema validation, and escaping before use in SQL, a shell command, a file path or HTML are the handler author's responsibility. In particular, never use a variable value as a file path, a class name or a callable without checking it against a list you control.
