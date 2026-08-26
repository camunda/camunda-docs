---
id: secret-resolution-and-job-activation
title: "Secret resolution and job activation"
description: "The broker resolves secret references in the background and injects the values into a job only as it is handed to a worker, which changes when a job is activated."
---

<!-- Draft. The page title, file name, placement, and the name of the feature itself are owned by
camunda/camunda#60326 and are not settled, so this page is deliberately not listed in sidebars.js
yet and every term used for the feature here is provisional. That ticket also owns whether the
feature is listed on components/early-access/alpha/alpha-features.md: the v2 secret endpoints are
marked alpha, this page carries no availability marker yet, and one may be required. -->

A job whose variables contain secret references is handed to a worker only once every reference has
been resolved, and the resolved values reach the worker without being written to any record, to
runtime state, or to the log.

The broker never reads a secret store while it processes a command. Instead, references are
resolved in the background, ahead of activation, and the resolved values are injected into the job
at the moment it is handed out. This changes when a job becomes available to a worker, so it is
worth understanding even if you never configure a secret store yourself.

## Resolve references before activation

The broker resolves secret references on a background scheduler, not on the processing path, so a
slow or unavailable secret store cannot stall processing.

When a job is created, each secret reference in its variables is recorded on the job together with
the position in the variables it belongs to. The variable value itself keeps the placeholder text
`camunda.secrets.<name>`. Nothing is read from a secret store at this point.

The scheduler then works through the references that are still pending:

1. Each cycle collects up to `camunda.processing.engine.secrets.batch-resolution-limit` pending
   references and groups them by store.
2. Each store is asked for its group of references in one call. Successfully resolved values are
   held in that store's local cache, which is what makes them available to the next activation.
3. References beyond the limit stay pending and are collected by a later cycle. When a cycle
   reaches the limit and made progress, the next cycle starts immediately instead of waiting for
   `camunda.processing.engine.secrets.interval`.

Resolution records carry no secret values. Only the store's cache holds a value, and only for as
long as its cache entry lives.

Two kinds of failure are treated differently:

| Failure                                                      | Behavior                                                                                                                                                                            |
| :----------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The store reports a secret as missing, forbidden, or invalid | Treated as permanent. The reference fails immediately, with no retry and no cache write.                                                                                            |
| The store itself is unavailable                              | Treated as transient. The whole store is retried with exponential backoff. After `retry-max-attempts` consecutive failures, every reference still pending for that store is failed. |

Retry state is tracked per store rather than per secret, is held in memory only, and resets when
the broker restarts or the partition changes leader. A store that is backing off is skipped while
it cools down, so its references do not consume the batch limit that a healthy store could use.

A reference that fails permanently, or whose store never recovers, raises an incident for the
jobs waiting on it. See [incidents](incidents.md).

## Activate a job that references secrets

At activation time the broker looks up each of the job's references in what the secret stores
already hold locally. No store is read, so activation is never blocked on store latency.

A job is only handed to a worker when every one of its references has a cached value. A job with
any reference that is not yet cached is not handed out, and its resolution is requested instead.
Such a job is not failed and does not raise an incident: it is waiting, and it becomes available
again on its own once the reference resolves.

While it waits, the job is in the state `WAITING_FOR_SECRET_RESOLUTION`. A job in that state is
not activatable, so no worker receives it on either delivery path.

The rest of this section describes what that looks like on each of the two delivery paths. Both
paths inject exactly the same values.

### Long polling

During batch collection, a job with a reference that is not yet cached is skipped without
consuming a slot in the batch, so jobs behind it can still be activated in the same response.

The broker then requests resolution of that job's missing references and parks the job until they
resolve. A parked job is not activatable, so a later poll does not collect it again and no worker
receives it. Once the reference resolves, the job is made activatable again automatically. No
redeployment and no client action is needed.

Two effects bound how much one activation can do:

- If a single activation skips 100 jobs for uncached references, it stops there and marks the
  batch truncated. The gateway polls the same partition again within the same request, so the
  jobs behind the cap are not held back until the long poll times out.
- If injecting a job's resolved values would push the response past the configured message size,
  that job and every job after it are dropped from the activation and the batch is marked
  truncated. The dropped jobs stay activatable, so the next activation picks them up.

The truncated flag is internal to the broker and the gateway. It is not part of the activate
jobs response, so a worker never sees it and does not act on it.

Injection happens on a copy of the batch that is used only for the response. The event the broker
appends to its log still carries the placeholders.

### Job push

On the push path, the same check runs before a job is pushed to a matching job stream. A job with a
reference that is not yet cached is not pushed. Its resolution is requested, and it is parked in
the same way as on the polling path.

When the reference resolves, the parked job is pushed to a matching stream. This matters because a
worker using job push receives only jobs that are pushed to it: it never polls, so the reactivation
has to do the pushing.

The resolved values are injected into the pushed job only. On this path the activation event
carries no variables at all, so neither a value nor a placeholder reaches the log.

### What a job worker sees

Nothing in a job worker has to handle secret resolution. A job that is still waiting on a reference
is simply not in the activation response and is not pushed, exactly as if no job of that type were
available yet.

A worker receives the job with the placeholders already replaced by the resolved values. If your
worker logs its input variables, be aware that at that point the values are plaintext.

No client-side change is needed. Existing workers, clients, and job worker libraries keep working
unchanged against a cluster that resolves secrets.

## Where secret values appear

Resolved secret values exist only in the activation response and in the pushed job. Everywhere
else, the placeholder text is what is stored.

| Location                                   | What it contains                                              |
| :----------------------------------------- | :------------------------------------------------------------ |
| The activation response, or the pushed job | The resolved values                                           |
| The job batch `ACTIVATED` event in the log | The placeholder text, or no variables at all on the push path |
| Runtime state and exported records         | The placeholder text                                          |
| Broker logs, including failure logs        | The placeholder text, never a value                           |
| Incident messages                          | The reference and the variable path, never a value            |

This is why a process instance viewed in Operate shows `camunda.secrets.<name>` where the worker
saw the real value.

## When a job is not activated

Two conditions stop a job from being activated even though all of its references resolved.

**The resolved values do not fit.** The activation response has to stay within
`camunda.cluster.network.max-message-size`, which defaults to `4MB`. A resolved value is usually
longer than the placeholder it replaces, so a job that fit with placeholders can fail to fit once
the values are injected. A value shorter than its placeholder makes the job smaller instead, and
never causes this. Such a job, and every job after it in the batch, is dropped from the activation
and stays activatable, so a later batch with more room takes it. A job whose values cannot fit
even in an otherwise empty batch can never be activated, and gets a message size incident
instead.

**Injection fails.** Injection replaces the placeholder at a recorded position in the job's
variables. If that position no longer holds the expected placeholder text, for example because a
later variable merge overwrote it, or if the variables cannot be read at all, the job is not
activated and an incident is raised. The incident also takes the job out of activation until the
incident is resolved, so the same failing injection is not retried on every activation.

For how to inspect and resolve either incident, see [incidents](incidents.md).

<!-- The incident messages, the diagnosis steps, and the operator runbook are owned by
camunda/camunda#60964. Link into that content from here once it lands, instead of restating it. -->

## Tune the resolution scheduler

The scheduler is configured under `camunda.processing.engine.secrets`. The defaults suit a store
that responds in well under a second.

| Property                 | Default | Change it when                                                                                                                                      |
| :----------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `interval`               | `5s`    | Jobs that reference secrets take too long to start. A shorter interval reduces that delay and polls the stores more often.                          |
| `batch-resolution-limit` | `20`    | A backlog of pending references builds up faster than it clears. A higher limit clears it faster at the cost of more concurrent load on the stores. |
| `retry-max-attempts`     | `3`     | A store has short outages that you want to ride out rather than turn into incidents.                                                                |
| `retry-initial-delay`    | `1s`    | The first retry is too eager or not eager enough for your store.                                                                                    |
| `retry-backoff-factor`   | `2`     | You want a flatter retry curve. A value of `1` retries at a constant delay.                                                                         |
| `retry-max-delay`        | `30s`   | A recovering store should be retried sooner, or a struggling one less often.                                                                        |

The retry settings apply to an unavailable store as a whole. A secret the store reports as missing
or forbidden is never retried, because that failure is permanent.

See the [property reference](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md)
for the full description of each property and its environment variable form.

## Monitor secret resolution

A store that is slow or failing shows up as jobs that do not activate, with nothing in the job
worker to point at the cause. The cluster emits meters for secret resolution and for the secret
caches, which is what distinguishes a cache that is simply cold from a store that is not
answering. For how to scrape and read cluster meters in general, see the
[metrics reference](/self-managed/operational-guides/monitoring/metrics.md).

<!-- The six secret resolution and secret cache meters, their tags, and how to read them are
owned by camunda/camunda#60963. Name and link them here once they are in the metrics reference. -->

## Related resources

- [Job workers](job-workers.md) describes long polling, job push, and job queuing in general.
- [Incidents](incidents.md) explains what an incident is and how it is resolved, which applies to
  the incidents described here.
