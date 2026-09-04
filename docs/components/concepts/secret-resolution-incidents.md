---
id: secret-resolution-incidents
title: "Troubleshoot secret resolution failures"
description: "Diagnose the incidents raised when a job's secret references cannot be resolved or their values cannot be injected, fix the cause, and know what happens next."
---

<!-- Draft. The page title, file name, placement, and the name of the feature itself are owned by camunda/camunda#60326 and are not settled, so this page is deliberately not listed in sidebars.js yet and every term used for the feature here is provisional. -->

When a job's [secret references](secret-resolution-and-job-activation.md) cannot be delivered, the cluster responds in one of three ways: it raises a `SECRET_RESOLUTION_ERROR` incident, raises a `MESSAGE_SIZE_EXCEEDED` incident, or defers the job and retries it without raising an incident.

Only the two incident cases require operator action.

Use this page to diagnose an existing secret resolution or activation problem. To understand how secret resolution and job activation work, see [Secret resolution and job activation](secret-resolution-and-job-activation.md).

## Find your symptom

| Symptom                                                                          | What happened                                                                                                | Section                                                                                           |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| An incident message starts with `Failed to resolve secret`                       | The secret store could not return the value, either permanently or after exhausting all retries.             | [Resolve secret lookup failures](#resolve-secret-lookup-failures)                                 |
| An incident message names a job key and variable path                            | The secret value was available, but Camunda could not inject it into the job variables.                      | [Resolve secret injection failures](#resolve-secret-injection-failures)                           |
| An incident message reports growth in bytes and the configured message size      | The resolved values are too large to fit in an activation batch.                                             | [Reduce oversized secret values](#reduce-oversized-secret-values)                                 |
| A job that references secrets is not activated, and no incident is raised        | The references have not resolved yet, or the store is in retry backoff.                                      | [Identify failures that raise no incident](#identify-failures-that-raise-no-incident)             |
| Jobs activate later and in smaller batches than usual, and no incident is raised | The injected values did not fit in the current batch, so the broker deferred the jobs to a later activation. | [Identify failures that raise no incident](#identify-failures-that-raise-no-incident)             |
| A job in a suspended process instance is not activated after its secret resolves | The process instance remains suspended, so secret resolution does not make the job activatable.              | [Resume a suspended job after secret resolution](#resume-a-suspended-job-after-secret-resolution) |

These incidents are job incidents. You can view them in [Operate](/components/operate/userguide/resolve-incidents-update-variables.md) or retrieve them through the [search incidents](/apis-tools/orchestration-cluster-api-rest/specifications/search-incidents.api.mdx) endpoint. Filter by `errorType` for `SECRET_RESOLUTION_ERROR` or `MESSAGE_SIZE_EXCEEDED`.

Incident messages never contain secret values. They may include the secret reference, variable path, job key, or message size, but not the resolved value.

## Resolve secret lookup failures

A secret lookup failure raises a `SECRET_RESOLUTION_ERROR` incident. This happens when the secret store returns a permanent failure or remains unavailable until all retry attempts are exhausted.

The broker raises one incident per affected job. If a job already has an incident for another failed secret reference, the broker does not raise a second incident. As a result, a job waiting on multiple failed secrets shows only the first incident.

```text
Failed to resolve secret 'API_TOKEN' from the configured secret store. Ensure the secret exists and the store is available, then resolve the incident to retry.
```

For the default store, the incident message uses `the configured secret store`. For any other store, it uses `secret store '<storeId>'`.

The `camunda.secrets.<name>` syntax does not currently identify a store, so every reference addresses the default store. As a result, incident messages currently use the default-store wording.

The incident message does not identify the underlying store failure. Check the broker log and follow [Diagnose the cause](#diagnose-the-cause) to determine whether the secret is missing, access is denied, the store is unavailable, or another failure occurred.

While the incident is active, the job is not activatable and no worker receives it. The broker does not raise another incident for the same failed reference.

### Retry after resolving the incident

Resolve the incident only after fixing the underlying cause. Resolving the incident makes the job activatable again. On the next activation attempt, the broker requests resolution again because the reference is still uncached.

You don't need to redeploy or make client-side changes. Once the reference resolves successfully, the process instance continues from where it stopped.

## Resolve secret injection failures

A secret injection failure also raises a `SECRET_RESOLUTION_ERROR` incident, but for a different reason. In this case, the secret value was available, but Camunda could not inject it into the job variables.

Each secret reference records the JSON pointer of the variable that contains the placeholder. During activation, Camunda replaces the placeholder at that pointer with the resolved value.

Injection fails when both of the following conditions apply:

- Camunda cannot replace the placeholder at the recorded pointer.
- A `camunda.secrets.<name>` placeholder still remains at that path after all references for the path have been processed.

For example, injection fails if the pointer now addresses a list or object that still contains a secret placeholder. If the value at the pointer no longer contains a placeholder, Camunda [continues without raising an incident](#failures-that-raise-no-incident).

```text
The job with key '2251799813685260' can not be activated, because the secret reference 'camunda.secrets.API_TOKEN' could not be resolved at '/credentials/token'. Fix the variable's value or the input mapping that sets it, then resolve the incident, or use process instance modification to reactivate the element and create a fresh job.
```

If the failure does not identify a specific reference, for example because Camunda cannot read the job variables, the incident uses the following generic message:

```text
The job with key '2251799813685260' can not be activated, because injecting its secret values failed. Resolve the incident, or use process instance modification to reactivate the element and create a fresh job.
```

Long polling and job push use the same incident messages for injection failures.

Typical causes include:

- A variable merge overwrites the placeholder after the job is created.
- An input mapping produces a list or context instead of a single text value.
- A cluster variable changes between input mapping evaluation and job creation.

While the incident is active, the job is not activatable, so the broker does not retry the same failed injection on every poll.

### Retry secret injection

Resolve the incident only after correcting the variable value or the input mapping that produced it. Resolving the incident makes the job activatable again, and Camunda retries injection against the current job variables.

If you cannot restore the placeholder, use [process instance modification](process-instance-modification.md) to reactivate the element. This creates a new job and detects its secret references again.

## Reduce oversized secret values

A `MESSAGE_SIZE_EXCEEDED` incident is raised when the resolved secret values make the job too large to fit within the configured activation message size.

```text
The job with key '2251799813685260' can not be activated, because injecting its secret values would grow the activation batch by 5.2MiB, more than any batch can grow without exceeding the configured message size (per default is 4 MB). Try to reduce the size of the secret values or of the job variables.
```

The applicable limit is `camunda.cluster.network.max-message-size`, which defaults to `4MB`. Secret values do not have a separate size limit.

Camunda raises this incident only when the oversized job is first in the activation batch and still cannot fit within the available message size. If a job does not fit only because of other jobs already included in the batch, Camunda removes it from that batch without raising an incident and activates it later. See [Identify failures that raise no incident](#identify-failures-that-raise-no-incident).

### Retry after reducing the size

Resolve the incident only after reducing the size of the secret value or the job variables. Otherwise, the next activation attempt fails in the same way.

To reduce the job variables included in activation, adjust the worker's `fetchVariables` list. Variables the worker does not fetch are excluded from the activation and do not count toward the message-size limit.

## Identify failures that raise no incident

Some secret resolution outcomes do not raise incidents and do not require operator action. Their symptoms can still resemble incident conditions.

### Job does not fit in the current batch

If injecting a job's resolved values would exceed the remaining message size in the current activation batch, Camunda removes that job and every subsequent job from the batch and marks the batch as truncated.

The removed jobs remain activatable and can be included in a later activation. The visible effect is smaller batches and slightly delayed activation rather than a stuck job.

### Reference no longer has a placeholder

Camunda activates the job without changing the value when there is no placeholder left to replace.

This can happen in either of the following cases:

- The recorded pointer no longer addresses a value, for example because the worker's `fetchVariables` list excludes that variable.
- The value at the pointer no longer contains `camunda.secrets.<name>`, for example because a variable update replaced the placeholder with a literal value.

In the second case, the worker receives the current literal value instead of the secret. Camunda raises an [injection incident](#resolve-secret-injection-failures) only when a secret placeholder is still present but cannot be replaced.

### Job push does not check injected value size

Long polling checks the growth caused by injected secret values against the remaining message size in the activation batch. If the job does not fit, Camunda removes it from the batch.

Job push does not perform the same size check on the pushed job because the activation event contains no variables. As a result, the push path does not raise a `MESSAGE_SIZE_EXCEEDED` incident for oversized injected values.

Job push does not bypass the transport message-size limit. If the pushed job exceeds the configured transport limit between the broker, gateway, and worker, delivery can fail without raising a `MESSAGE_SIZE_EXCEEDED` incident.

## Resume a suspended job after secret resolution

A job waiting for an uncached secret enters `WAITING_FOR_SECRET_RESOLUTION`. If you suspend its process instance, the job enters `SUSPENDED` instead.

If the secret resolves while the process instance is suspended, the job remains suspended and does not become activatable automatically.

Resume the process instance to make the job available again. On the next activation attempt, Camunda injects the resolved value if it is still cached. If the value is no longer cached, Camunda parks the job again and requests secret resolution.

In either case, no additional operator action is required and no incident is raised.

## Diagnose the cause

Start with the incident error type and message, then confirm the underlying cause in the broker log. Incident messages don't include the store's error category, so use the log to distinguish conditions such as a missing secret, denied access, or an unavailable store.

1. Read the incident in Operate or search for incidents filtered by `errorType`. Note the secret reference, variable path, and job key from the message.
2. For incidents whose message starts with `Failed to resolve secret`, search the broker log for the affected partition and reference name. Match the log entry to the table below.
3. For injection failures, inspect the job variables at the reported path in Operate or through the element instance variables.

| Broker log line                                                                                | Cause                                                                                                | Fix                                                                                                     |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `Secret store '<id>' is not configured — failing <n> pending secret refs`                      | No secret store is configured, so all pending references fail.                                       | Configure a secret store.                                                                               |
| `Secret '<ref>' in secret store '<id>' failed permanently: NOT_FOUND — <message>`              | The store does not contain a secret with that name.                                                  | Create the secret or correct the reference name in the process.                                         |
| `Secret '<ref>' in secret store '<id>' failed permanently: ACCESS_DENIED — <message>`          | The credentials used by the broker don't have permission to read the secret.                         | Grant read access in the secret store. This is store-level access control, not a Camunda authorization. |
| `Secret '<ref>' in secret store '<id>' failed permanently: INVALID_REF — <message>`            | The store rejects the reference name as invalid.                                                     | Rename the secret so the store and Camunda reference syntax both accept it.                             |
| `Secret '<ref>' in secret store '<id>' failed permanently: UNREADABLE — <message>`             | The store contains the secret, but its value cannot be read or decoded.                              | Repair the stored value.                                                                                |
| `Secret store '<id>' unavailable (attempt <n>/<m>), retrying in <backoff>: <message>`          | The failure is transient. The broker is retrying the store with backoff, and no incident exists yet. | If the failure persists, restore the store's availability.                                              |
| `Secret store '<id>' unavailable after <n>/<m> attempts — failing <n> pending refs: <message>` | The store remained unavailable through `retry-max-attempts`, so its pending references failed.       | Restore the store's availability, then resolve the incidents.                                           |

The separator in these log lines is an em dash, and `<message>` contains the store's own error text. Search for a distinctive fragment such as `failed permanently` rather than the entire line.

Then verify the reference itself:

- **Reference name**: Confirm the reference resolves to the intended secret name. In an input mapping, Camunda detects references from the parsed FEEL expression, so FEEL syntax determines where the name ends. For example, FEEL interprets `=camunda.secrets.db-password` as the reference `db` minus the variable `password`. Escape names that aren't valid bare FEEL identifiers with backticks, for example ``=camunda.secrets.`db-password` ``. If the incident names a shorter secret than expected, check whether FEEL interpreted part of the name as an operator.

- **Secret name**: Confirm the reference name exactly matches the secret name in the store, including case. Store-managed names that the Camunda secret endpoints reject, such as names containing a period, can still resolve when you escape them with backticks in an input mapping expression.

  Escaping applies only to expressions. Camunda scans references in [cluster variable](/components/admin/cluster-variables.md) values as plain text rather than parsing them as FEEL. In this case, the name after the prefix must match `[\p{Alnum}_-]+` and cannot be escaped. A period, space, or other unsupported character prevents Camunda from detecting the reference.

- **Reference format**: Confirm the reference is a FEEL expression rather than a static string. In an input mapping source or Connector property, use a path such as `=camunda.secrets.TOKEN`. Static values and quoted references such as `={"auth": "camunda.secrets.TOKEN"}` are rejected at deployment.

- **Value size**: Confirm the resolved value and other job variables fit within `camunda.cluster.network.max-message-size`.

The `SECRET` resource type in [authorizations](access-control/authorizations.md) applies to the secrets API, not broker-side secret resolution. Missing Camunda authorizations don't cause `SECRET_RESOLUTION_ERROR` incidents.

## Retry after fixing the cause

Resolve the incident after correcting the underlying problem. Resolving the incident retries the failed operation and makes the job activatable again.

| You fixed                                     | After you resolve the incident                                                        |
| --------------------------------------------- | ------------------------------------------------------------------------------------- |
| The secret in the store or store access       | The broker requests resolution again, and the job activates once the value is cached. |
| The variable or input mapping                 | Camunda retries injection against the current job variables.                          |
| The size of the secret value or job variables | The job activates once the resolved values fit within the message-size limit.         |

You don't need to redeploy or make changes to workers, clients, or job worker libraries. Jobs blocked on a reference become activatable automatically once the reference resolves, whether resolution follows an incident or store recovery.

<!-- The secret resolution and secret cache meters that show a store failing before it produces incidents are owned by camunda/camunda#60963. Link them here once they are in the metrics reference. -->

<!-- The camunda.secrets.* secret store configuration is owned by camunda/camunda#60331. Link the store configuration reference from the diagnosis steps once it lands. -->

## Related resources

- [Secret resolution and job activation](secret-resolution-and-job-activation.md) describes how Camunda resolves references and when a job becomes activatable, including the scheduler settings that control how quickly store failures become incidents.
- [Incidents](incidents.md) explains how incidents work and how to resolve them.
- [Resolve incidents and update variables](/components/operate/userguide/resolve-incidents-update-variables.md) explains how to resolve incidents in Operate.
