---
id: job-workers
title: "Job workers"
---

A job worker is a service capable of performing a particular task in a process.

Each time such a task needs to be performed, this is represented by a job.

A job has the following properties:

- **Type**: Describes the work item and is defined in each task in the process. The type is referenced by workers to request the jobs they are able to perform.
- **Custom headers**: Additional static metadata that is defined in the process. Custom headers are used to configure reusable job workers (e.g. a `notify Slack` worker might read out the Slack channel from its header).
- **Key**: Unique key to identify a job. The key is used to hand in the results of a job execution, or to report failures during job execution.
- **Variables**: The contextual/business data of the process instance that is required by the worker to do its work.

## Requesting jobs

Job workers request jobs of a certain type on a regular interval (i.e. polling). This interval and the number of jobs requested are configurable in the Zeebe client.

If one or more jobs of the requested type are available, then Zeebe (the workflow engine inside Camunda Cloud) will stream activated jobs to the worker. Upon receiving jobs, a worker performs them and sends back a _complete_ or _fail_
command for each job depending on whether the job could be completed successfully or not.

For example, the following process might generate three different types of jobs: `process-payment`, `fetch-items`, and `ship-parcel`:

![order-process-model](assets/order-process.png)

Three different job workers, one for each job type, could request jobs from Zeebe:

![zeebe-job-workers-requesting-jobs](assets/zeebe-job-workers-graphic.png)

Many workers can request the same job type in order to scale up processing. In this scenario, Zeebe ensures that each job is sent to only one of the workers.
Such a job is considered activated until the job is completed, failed or the job activation times out.

On requesting jobs, the following properties can be set:

- **Worker**: The identifier of the worker. Used for auditing purposes.
- **Timeout**: The time a job is assigned to the worker. If a job is not completed within this time then it can be reassigned by Zeebe to another worker.
- **MaxJobsToActivate**: The maximum number of jobs which should be activated by this request.
- **FetchVariables**: A list of variables names which are required. If the list is empty, all variables of the process instance are requested.

### Long polling

Ordinarily, a request for jobs can be completed immediately when no jobs are available.
To find a job to work on, the worker now needs to poll again for available jobs.
This leads to workers repeatedly sending requests until a job is available.
This is expensive in terms of resource usage, because both the worker and the server are performing a lot of unproductive work. Zeebe supports _long polling_ for available jobs to better utilize resources.

With _long polling_ a request will be kept open while no jobs are available.
The request is completed when at least one job becomes available.

### Job queueing

Zeebe decouples creation of jobs from performing the work on them. It is always possible to create jobs at the highest possible rate, regardless of whether or not there is a job worker available to work on them. This is possible because Zeebe queues jobs until workers request them.

This increases the resilience of the overall system. Camunda Cloud is highly available so that job workers don't have to be highly available. Zeebe queues all jobs during any job worker outages and progress will resume as soon as workers come back online.

It also insulates job workers against sudden bursts in traffic. Because workers request jobs, they have full control over the rate at which they take on new jobs.

## Completing or failing jobs

After working on an activated job, a job worker should inform Camunda Cloud that the job has either _completed_ or _failed_.

- When the job worker completes its work, it sends a _complete job_ command along with any variables, which in turn will be merged into the process instance. This is how the job worker exposes the results of its work.
- If the job worker could not successfully complete its work, it will send _fail job_ command. Fail job commands include the number of remaining retries, which is set by the job worker. If _remaining retries_ is greater than zero, then the job will be retried and reassigned. If _remaining retries_ is zero or negative, an incident will be raised and the job will not be retried until the incident is resolved.

## Timeouts

If the job is not completed or failed within the configured job activation timeout, Zeebe will reassign the job to another job worker. This does not affect the number of _remaining retries_.


A timeout may lead to two different workers working on the same job, possibly at the same time. If this happens, only one worker will successfully complete the job. The other _complete job_ command will be rejected with a 'NOT FOUND' error. The fact that jobs may be worked on more than once means that Zeebe is an at-least once system with respect to job delivery and that worker code must be idempotent. In other words, workers __must__ deal with jobs in a way that allows the code to be executed more than once for the same job while preserving the expected application state.
