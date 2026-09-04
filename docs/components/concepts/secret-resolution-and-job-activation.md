---
id: secret-resolution-and-job-activation
title: "Secret resolution and job activation"
description: "Learn how the broker resolves secret references before job activation and injects resolved values when it hands a job to a worker."
---

<!-- Draft. The page title, file name, placement, and the name of the feature itself are owned by
camunda/camunda#60326 and are not settled, so this page is deliberately not listed in sidebars.js
yet and every term used for the feature here is provisional. That ticket also owns whether the
feature is listed on components/early-access/alpha/alpha-features.md: the v2 secret endpoints are
marked alpha, this page carries no availability marker yet, and one may be required. -->

Secret resolution lets job workers use secret values at runtime without storing those values in job variables or configuration.

A job whose variables contain secret references is handed to a worker only after every reference has been resolved. The resolved values reach the worker without being written to any record, runtime state, or log.

The broker resolves secret references in the background rather than while processing a command. It injects the resolved values into the job only when handing the job to a worker. As a result, secret resolution can affect when a job becomes available for activation, even if you don't configure a secret store yourself.

## Resolve references before activation

The broker resolves secret references on a background scheduler, not on the processing path, so a slow or unavailable secret store cannot stall processing.

When the broker creates a job, it records each secret reference together with its position in the job variables. The variable value itself keeps the placeholder text `camunda.secrets.<name>`. Nothing is read from a secret store at this point.

The scheduler then works through the references that are still pending:

1. Each cycle collects up to `camunda.processing.engine.secrets.batch-resolution-limit` pending references and groups them by store.
2. The scheduler requests each store's group of references in one call. The store's local cache holds successfully resolved values for the next activation.
3. References beyond the limit stay pending and are collected by a later cycle. When a cycle reaches the limit and makes progress, the next cycle starts immediately instead of waiting for `camunda.processing.engine.secrets.interval`.

Resolution records carry no secret values. Only the store's cache holds a value, and only for as long as its cache entry lives.

A cached value expires a fixed time after it is written, regardless of when it was last read. The store can also evict the value earlier if its cache is full. If the value is no longer cached when the broker tries to activate a job, the broker parks the job and resolves the reference again.

Resolving the reference again also makes rotated secrets available to workers without a restart. Configure each store's cache lifetime and size under [`camunda.secrets.cache`](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#camundasecretscache).

Two kinds of failure are treated differently:

| Failure                                                      | Behavior                                                                                                                                                                                     |
| :----------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The store reports a secret as missing, forbidden, or invalid | Treated as permanent. The reference fails immediately, with no retry and no cache write.                                                                                                     |
| The store itself is unavailable                              | Treated as transient. The broker retries the store with exponential backoff. After `retry-max-attempts` consecutive failures, the broker fails every reference still pending for that store. |

The broker tracks retry state per store rather than per secret and holds it in memory only. The retry state resets when the broker restarts or the partition changes leader. During backoff, the scheduler skips the store, so its references do not consume batch capacity that a healthy store can use.

A reference that fails permanently, or whose store never recovers, raises an incident for the jobs waiting on it. See [a secret could not be resolved](secret-resolution-incidents.md#a-secret-could-not-be-resolved) for the incident message, how to tell the causes apart, and what resolving it does.

## Activate a job that references secrets

At activation time, the broker looks up each job reference in the secret store's local cache. The broker does not read the store during activation, so store latency cannot block activation.

The broker hands a job to a worker only when every reference has a cached value. If a reference is not yet cached, the broker requests resolution instead of handing out the job. The broker does not fail the waiting job or raise an incident. Once the reference resolves, the job becomes available automatically.

While it waits, the job is in the state `WAITING_FOR_SECRET_RESOLUTION`. A job in that state is not activatable, so no worker receives it on either delivery path.

The following sections describe this behavior for each delivery path. The broker injects the same resolved values on both paths.

### Long polling

During batch collection, a job with a reference that is not yet cached is skipped without consuming a slot in the batch, so jobs behind it can still be activated in the same response.

The broker then requests resolution of that job's missing references and parks the job until they resolve. A parked job is not activatable, so a later poll does not collect it again and no worker receives it. Once the reference resolves, the job is made activatable again automatically. Neither redeployment nor client action is required.

Two limits affect how many jobs one activation can return:

- If a single activation skips 100 jobs for uncached references, it stops there and marks the batch truncated. The gateway polls the same partition again within the same request, so the jobs behind the cap are not held back until the long poll times out.
- If injecting a job's resolved values would exceed the configured message size, the broker removes that job and every subsequent job from the activation and marks the batch as truncated. These jobs remain activatable for the next activation.

The truncated flag is internal to the broker and the gateway. It is not part of the activate jobs response, so a worker never sees it and does not act on it.

The broker injects the resolved values into a copy of the batch used only for the response. The event the broker appends to its log still carries the placeholders.

### Job push

On the push path, the broker performs the same check before pushing a job to a matching job stream. If a reference is not yet cached, the broker requests resolution and parks the job as it does on the polling path.

When the reference resolves, the broker pushes the parked job to a matching stream. Because a worker using job push never polls, the broker must push the reactivated job.

The resolved values are injected into the pushed job only. On this path the activation event carries no variables at all, so neither a value nor a placeholder reaches the log.

### Understand what a job worker receives

A job worker does not need to handle secret resolution. While a job waits for a reference to resolve, the broker does not include it in an activation response or push it to a worker.

A worker receives the job with the placeholders replaced by the resolved values. If your worker logs its input variables, the resolved secret values appear in plaintext.

You don't need to make client-side changes. Existing workers, clients, and job worker libraries continue to work with a cluster that resolves secrets.

## Secret values location

Resolved secret values exist only in the activation response and in the pushed job. Everywhere else, the placeholder text is what is stored.

| Location                                   | What it contains                                              |
| :----------------------------------------- | :------------------------------------------------------------ |
| The activation response or the pushed job  | The resolved values                                           |
| The job batch `ACTIVATED` event in the log | The placeholder text, or no variables at all on the push path |
| Runtime state and exported records         | The placeholder text                                          |
| Broker logs, including failure logs        | The placeholder text, never a value                           |
| Incident messages                          | The reference and the variable path, never a value            |

As a result, Operate shows `camunda.secrets.<name>` for the process instance even though the worker received the resolved value.

## Understand why a job is not activated

Two conditions stop a job from being activated even though all of its references have resolved.

### Resolved values exceed the message size

The activation response has to stay within `camunda.cluster.network.max-message-size`, which defaults to `4MB`. A resolved value is usually longer than the placeholder it replaces, so a job that fit with placeholders can fail to fit once the values are injected. A value shorter than its placeholder reduces the response size and does not cause this condition. If the resolved values exceed the available message size, the broker removes that job and every subsequent job from the activation. The jobs remain activatable for a later batch. If a job cannot fit even in an otherwise empty batch, the broker raises a message size incident.

### Secret injection fails

The broker replaces the placeholder at its recorded position in the job variables. If a later variable merge overwrites the expected placeholder, or if the broker cannot read the variables, the broker does not activate the job and raises an incident. The incident also takes the job out of activation until the incident is resolved, so the same failing injection is not retried on every activation.

For how to inspect and resolve either incident, see [troubleshoot secret resolution failures](secret-resolution-incidents.md).

## Tune the resolution scheduler

Configure the scheduler under `camunda.processing.engine.secrets`. The defaults are intended for stores that respond in less than a second. The separate `camunda.secrets.cache.ttl` setting controls how long a resolved value remains cached before the reference must be resolved again.

| Property                 | Default | Change it when                                                                                                                                      |
| :----------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `interval`               | `5s`    | Jobs that reference secrets take too long to activate. A shorter interval reduces that delay and polls the stores more often.                       |
| `batch-resolution-limit` | `20`    | A backlog of pending references builds up faster than it clears. A higher limit clears it faster at the cost of more concurrent load on the stores. |
| `retry-max-attempts`     | `3`     | You want to tolerate brief store outages before raising incidents.                                                                                  |
| `retry-initial-delay`    | `1s`    | You need a longer or shorter delay before the first retry.                                                                                          |
| `retry-backoff-factor`   | `2`     | You want retry delays to increase more slowly. A value of `1` keeps the delay constant.                                                             |
| `retry-max-delay`        | `30s`   | You want to retry an unavailable store sooner or less often.                                                                                        |

The retry settings apply to an unavailable store as a whole. A secret the store reports as missing or forbidden is never retried, because that failure is permanent.

See the [property reference](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md) for the full description of each property and its environment variable form.

## Monitor secret resolution

A store that is slow or failing shows up as jobs that do not activate, If a store is slow or unavailable, affected jobs may not activate, and the job worker does not indicate the cause. The cluster emits meters for secret resolution and secret caches. Use these meters to distinguish a cold cache from a store that is not responding. To scrape and interpret cluster meters, see the [metrics reference](/self-managed/operational-guides/monitoring/metrics.md).

<!-- The six secret resolution and secret cache meters, their tags, and how to read them are
owned by camunda/camunda#60963. Name and link them here once they are in the metrics reference. -->

## Related resources

- [Job workers](job-workers.md) describes long polling, job push, and job queuing in general.
- [Troubleshoot secret resolution failures](secret-resolution-incidents.md) covers the incidents described here: their messages, how to diagnose them, and what happens after you resolve them.
- [Incidents](incidents.md) explains what an incident is and how it is resolved, which applies to the incidents described here.
