---
id: secret-resolution-incidents
title: "Troubleshoot secret resolution failures"
description: "Diagnose the incidents raised when a job's secret references cannot be resolved or their values cannot be injected, fix the cause, and know what happens next."
---

<!-- Draft. The page title, file name, placement, and the name of the feature itself are owned by
camunda/camunda#60326 and are not settled, so this page is deliberately not listed in sidebars.js
yet and every term used for the feature here is provisional. -->

When a job's [secret references](secret-resolution-and-job-activation.md) cannot be delivered, the
cluster reacts in one of three ways: it raises a `SECRET_RESOLUTION_ERROR` incident, it raises a
`MESSAGE_SIZE_EXCEEDED` incident, or it defers the job silently and retries it. The three are not
interchangeable, and only two of them need you.

This page is for the operator who already has a symptom. For how resolution and activation work in
the first place, see [secret resolution and job activation](secret-resolution-and-job-activation.md).

## Find your symptom

| Symptom                                                                              | What happened                                                                                     | Section                                                                                                 |
| :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------ |
| An incident whose message starts with `Failed to resolve secret`                     | The secret store could not return the value, permanently or after exhausting its retries.         | [A secret could not be resolved](#a-secret-could-not-be-resolved)                                       |
| An incident whose message names a job key and a variable path                        | The value was available, but it could not be written into the job's variables.                    | [A secret value could not be injected](#a-secret-value-could-not-be-injected)                           |
| An incident whose message names a growth in bytes and the configured message size    | The resolved values are too large to ever fit an activation.                                      | [Secret values are too large to activate](#secret-values-are-too-large-to-activate)                     |
| A job of a type that references secrets is never activated, and there is no incident | The references have not resolved yet, or the store is backing off.                                | [Failures that raise no incident](#failures-that-raise-no-incident)                                     |
| Jobs activate, but later and in smaller batches than usual, and there is no incident | Injected values did not fit the batch, so jobs were dropped from it and picked up by a later one. | [Failures that raise no incident](#failures-that-raise-no-incident)                                     |
| A job of a suspended process instance is not activated after its secret resolves     | Suspension overrides secret waiting, and secret completion does not undo it.                      | [Secret resolution does not resume a suspended job](#secret-resolution-does-not-resume-a-suspended-job) |

All of these incidents are job incidents. They appear wherever job incidents appear: in
[Operate](/components/operate/userguide/resolve-incidents-update-variables.md), and in the
[search incidents](/apis-tools/orchestration-cluster-api-rest/specifications/search-incidents.api.mdx)
endpoint, where you can filter on `errorType` for `SECRET_RESOLUTION_ERROR` or
`MESSAGE_SIZE_EXCEEDED`.

No incident message ever contains a secret value. A message names the reference, the variable path,
the job key, or a size, and never the value behind any of them.

## A secret could not be resolved

Error type `SECRET_RESOLUTION_ERROR`. The broker asked the secret store for the value and the store
either refused it permanently, or was unavailable until its retries ran out. The broker raises the
incident for the jobs waiting on that reference, one incident per job. A job that already carries an
incident from another failed reference does not get a second one, so a job that waits on two failed
secrets shows only the first.

```
Failed to resolve secret 'API_TOKEN' from the configured secret store. Ensure the secret exists and the store is available, then resolve the incident to retry.
```

The store is named as `the configured secret store` for the default store, and as
`secret store '<storeId>'` for any other. The `camunda.secrets.<name>` syntax carries no store
dimension today, so every reference addresses the default store and you always see the first form.

The message does not say why the store refused the secret. That distinction is in the broker log,
and [diagnose the cause](#diagnose-the-cause) maps the log lines to causes.

The job is parked and is not activatable, so no worker receives it and no further incident is
raised for the same reference.

**What resolving does.** Resolving the incident makes the job activatable again. The next
activation attempt finds the reference still uncached and requests its resolution, so the store is
asked again. Fix the cause first, otherwise the same incident returns. No redeployment and no
client change is needed, and the process instance continues where it was.

## A secret value could not be injected

Error type `SECRET_RESOLUTION_ERROR`, the same type as above, but a different cause: the value was
available and injecting it into the job's variables failed. Each secret reference records the JSON
pointer of the variable it belongs to, and injection replaces the placeholder text at that pointer.

The job is not activated when the injection replaces nothing at that pointer **and** placeholder
text is still there once every reference at the same path has been attempted. Both halves matter: a
pointer that now addresses a list or an object still holding a `camunda.secrets.<name>` placeholder
fails, while a pointer whose value no longer contains any placeholder at all is
[tolerated silently](#failures-that-raise-no-incident).

```
The job with key '2251799813685260' can not be activated, because the secret reference 'camunda.secrets.API_TOKEN' could not be resolved at '/credentials/token'. Fix the variable's value or the input mapping that sets it, then resolve the incident, or use process instance modification to reactivate the element and create a fresh job.
```

When the failure identifies no reference at all, for example because the job's variables cannot be
read, you get the cause-neutral wording instead:

```
The job with key '2251799813685260' can not be activated, because injecting its secret values failed. Resolve the incident, or use process instance modification to reactivate the element and create a fresh job.
```

Both wordings are shared by long polling and job push, so the same failure reads the same way on
either delivery path.

Typical causes are a variable merge that overwrote the placeholder after the job was created, an
input mapping that produces a list or a context rather than a single text value, and a cluster
variable whose content changed between input mapping evaluation and job creation.

The job is taken out of activation until the incident is resolved, so the same failing injection is
not retried on every poll.

**What resolving does.** Resolving the incident makes the job activatable again, and injection is
attempted once more against the variables as they are then. Correct the variable value or the input
mapping that sets it before resolving. If the placeholder cannot be restored, use
[process instance modification](process-instance-modification.md) to reactivate the element, which
creates a fresh job with freshly detected references.

## Secret values are too large to activate

Error type `MESSAGE_SIZE_EXCEEDED`. A resolved value is usually longer than the
`camunda.secrets.<name>` placeholder it replaces, so a job that fits with placeholders can outgrow
the activation once the values are injected.

```
The job with key '2251799813685260' can not be activated, because injecting its secret values would grow the activation batch by 5.2MiB, more than any batch can grow without exceeding the configured message size (per default is 4 MB). Try to reduce the size of the secret values or of the job variables.
```

The limit that applies is `camunda.cluster.network.max-message-size`, which defaults to `4MB`.
There is no separate cap on secret values.

This incident is raised only when the oversized job was first in the activation batch, so it had
the whole message size to itself and its values can never fit any batch. A job whose values merely
do not fit the batch it happened to land in is dropped without an incident and activated later, see
[failures that raise no incident](#failures-that-raise-no-incident).

**What resolving does.** Resolving the incident makes the job activatable again, and it fails the
same way unless the values or the job's variables have shrunk in the meantime. Reduce the size of
the secret value in the store, or reduce the job's other variables, before you resolve. A worker's
`fetchVariables` list is the quickest lever on the second: variables the worker does not fetch are
not in the activation and do not count toward the limit.

## Failures that raise no incident

Three outcomes are silent by design. None of them needs an operator, but each is easy to mistake
for one that does.

**A job dropped from a batch it does not fit.** If injecting a job's values would push the
activation past the message size, that job and every job after it are dropped from the batch, which
is marked truncated. The dropped jobs stay activatable and the next activation picks them up. The
visible effect is smaller batches and slightly later activation, not a stuck job.

**A reference with no placeholder left to replace.** Injection is a no-op and the job is activated
unchanged in two cases. The pointer can address no value at all, for example because the worker's
`fetchVariables` excluded that variable, so there is nothing to replace and nothing left behind. Or
the value at the pointer can no longer contain any `camunda.secrets.<name>` text, for example
because a variable update replaced it with a literal, in which case the worker receives that literal
rather than the secret. Only a placeholder that is still present and could not be replaced raises
[an injection incident](#a-secret-value-could-not-be-injected).

**Job push does not size the injected values.** Long polling measures each job's value growth
against the free message size and drops the job when it does not fit. Job push does not: the
activation event it writes carries no variables, so the check it performs covers the event and not
the pushed job. Nothing on the push path drops a job for its value size, and no
`MESSAGE_SIZE_EXCEEDED` incident is raised there. That does not make job push a way around the
limit: an activation that a long poll cannot carry is still larger than the transport between the
broker, the gateway, and the worker is configured to carry, so expect it to fail there instead of
raising an incident you can find.

## Secret resolution does not resume a suspended job

A job waiting for an uncached secret is parked in `WAITING_FOR_SECRET_RESOLUTION`. Suspending its
process instance overrides that state with `SUSPENDED`. When the secret resolves afterwards, the
completion is a silent no-op: the job is not made activatable, because it is suspended, not waiting.

Resume the process instance to make the job available again. Resuming makes the job activatable, and
the next activation injects the value if it is still cached, or parks the job once more and requests
its resolution again if it is not. Either way the job proceeds on its own, and no incident is raised
in the meantime.

## Diagnose the cause

Start from the incident's error type and message, then confirm the cause in the broker log. The
store's own error category is logged and is never part of the incident message, so the log is where
a missing secret is told apart from a rejected one.

1. Read the incident in Operate, or search incidents filtered by `errorType`. Note the secret
   reference, the variable path, and the job key the message names.
2. For `Failed to resolve secret`, search the broker log of the affected partition for the
   reference name and match the line against the table below.
3. For an injection failure, inspect the job's variables at the named path, in Operate or through
   the variables of the element instance.

| Broker log line                                                                                | Cause                                                                                    | Fix                                                                                                       |
| :--------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `Secret store '<id>' is not configured — failing <n> pending secret refs`                      | No secret store is configured, so every reference fails.                                 | Configure a secret store.                                                                                 |
| `Secret '<ref>' in secret store '<id>' failed permanently: NOT_FOUND — <message>`              | The store has no secret under that name.                                                 | Create the secret, or correct the reference name in the process.                                          |
| `Secret '<ref>' in secret store '<id>' failed permanently: ACCESS_DENIED — <message>`          | The credentials the broker uses for the store are not allowed to read that secret.       | Grant read access on the store side. This is the store's own access control, not a Camunda authorization. |
| `Secret '<ref>' in secret store '<id>' failed permanently: INVALID_REF — <message>`            | The store rejects the reference name as malformed.                                       | Rename the secret so both the store and the reference syntax accept it.                                   |
| `Secret '<ref>' in secret store '<id>' failed permanently: UNREADABLE — <message>`             | The store holds an entry, but its value cannot be read or decoded.                       | Repair the stored value.                                                                                  |
| `Secret store '<id>' unavailable (attempt <n>/<m>), retrying in <backoff>: <message>`          | Transient. The store is being retried with backoff and no incident exists yet.           | Nothing, unless it persists. Restore the store's availability.                                            |
| `Secret store '<id>' unavailable after <n>/<m> attempts — failing <n> pending refs: <message>` | The store never recovered within `retry-max-attempts`, so its pending references failed. | Restore the store's availability, then resolve the incidents.                                             |

The separator in these lines is an em dash, and `<message>` is the store's own text. Search on a
distinctive fragment such as `failed permanently` rather than on a whole line.

Then confirm the reference itself:

- **The reference names the secret you think it does.** In an input mapping, a reference is detected
  from the parsed FEEL expression, so FEEL's own rules decide where the name ends. A dash is
  subtraction to FEEL, so `=camunda.secrets.db-password` is read as the reference `db` minus the
  variable `password`. Escape any name that is not a bare FEEL identifier with backticks, as in
  ``=camunda.secrets.`db-password` ``. An incident naming a shorter secret than you wrote is this
  mistake.
- **The name matches the secret in the store.** The reference name and the secret name must match
  exactly, including case. Names that Camunda's own secret endpoints reject, such as a name holding
  a dot, are still detected and resolved from a store when they are backtick-escaped in an input
  mapping expression, so a store-managed name can work while the API refuses to create it. That
  escape only exists for an expression: a reference read out of a
  [cluster variable's](/components/admin/cluster-variables.md) value is scanned as plain text
  instead of parsed FEEL, so there its name must match `[\p{Alnum}_-]+` after the prefix, with no
  way to escape around it. A dot, space, or any other character outside that set makes the
  reference invisible to that scan.
- **The reference is an expression, not a string.** In an input mapping source or a connector
  property, only a FEEL path such as `=camunda.secrets.TOKEN` is accepted. The same reference
  written as a static value, or quoted inside an expression as in `={"auth": "camunda.secrets.TOKEN"}`,
  is rejected at deployment, so a process that deployed is not using either form.
- **The value is small enough.** Compare the value's size against
  `camunda.cluster.network.max-message-size` together with the job's other variables.

The `SECRET` resource type in
[authorizations](access-control/authorizations.md) governs the secrets API, not the broker's
resolution path. A `SECRET_RESOLUTION_ERROR` is never caused by a missing Camunda authorization.

## What happens after you fix the cause

Resolving an incident is what retries the operation. In every case above, the job returns to the
state it was in before the failure, and the process instance continues from there.

| You fixed                                | Resolve the incident, and then                                                                              |
| :--------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| The secret in the store, or store access | The job becomes activatable, resolution is requested again, and the job activates once the value is cached. |
| The variable or the input mapping        | The job becomes activatable and injection is attempted again against the current variables.                 |
| The size of the value or the variables   | The job becomes activatable and is activated when its values fit.                                           |

No redeployment is needed, and workers, clients, and job worker libraries need no change. Jobs
blocked on a reference that later resolves are picked up on their own, whether they wait behind an
incident you resolved or behind a store that recovered.

<!-- The secret resolution and secret cache meters that show a store failing before it produces
incidents are owned by camunda/camunda#60963. Link them here once they are in the metrics
reference. -->

<!-- The camunda.secrets.* secret store configuration is owned by camunda/camunda#60331. Link the
store configuration reference from the diagnosis steps once it lands. -->

## Related resources

- [Secret resolution and job activation](secret-resolution-and-job-activation.md) describes how
  references are resolved and when a job is activated, including the scheduler settings that
  control how quickly a failing store turns into an incident.
- [Incidents](incidents.md) explains what an incident is and how it is resolved in general.
- [Resolve incidents and update variables](/components/operate/userguide/resolve-incidents-update-variables.md)
  covers resolving incidents in Operate.
