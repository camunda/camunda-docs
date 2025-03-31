---
id: production
title: Setting up RPA for production deployments
description: "Understand the specific configuration of your RPA runner to set up your workers for production use cases."
---

This article covers the specific configuration of your RPA runner. For the basics on getting started, visit the
[getting started guide](./getting-started.md).

## Transitioning from a development setup

To transition from a development setup to a production setup, there are a few things to consider:

- **Disable the local sandbox**: If your worker should only accept scripts from Zeebe and is not used for testing scripts from Modeler, disable the local execution by setting `camunda.rpa.sandbox.enabled` to `false`
- **If your scripts require third-party tools**: Install them along with the RPA worker so they are accessible from the scripts.
- **Add tags to your worker and scripts**: Depending on your use case, it might be useful to tag your workers with their capabilities. Common ways for tagging include operation systems and available applications. [Read more on tags and labels](#labels).

## Using secrets

When running an RPA worker with Camunda SaaS, you can add access to [Connector secrets](/components/connectors/use-connectors/index.md#using-secrets).

To do this, [create client credentials](/guides/setup-client-connection-credentials.md) with both the `Zeebe` and `Secrets` scope and use them in the worker config.
In your `rpa-worker.properties` file, add the secrets endpoint `camunda.rpa.zeebe.secrets.secrets-endpoint=https://cluster-api.cloud.camunda.io` to enable secret fetching.

In the RPA script, your secrets are stored in the `${secrets}` variable. You can reference a secret like `MY_API_KEY` with `${secrets.MY_API_KEY}`.

## Labels

If you manage multiple RPA worker machines and scripts, you might need specialized environments to run certain tasks.
To differentiate different capabilities of runners, you can use tags and labels.

Labels are set both on the RPA task in the diagram and on your worker. To ensure your script is only executed by machines with the correct capabilities for this script, we recommend adding labels to your worker.

In the `rpa-worker.properties`, add `camunda.rpa.zeebe.worker-tags=accounting-system`. This worker will now only take up jobs
which are labeled `accounting-system`. If you also want the worker to work on unlabeled tasks, use `camunda.rpa.zeebe.worker-tags=default,accounting-system` instead.
Each worker can have multiple labels and will pick up waiting jobs from all scripts.

You can add labels to your script when configuring the RPA task in your diagram. Note that a script can only have a single label.

Labels describe capabilities. If you want your worker to only pick up a specific script, you will need to use a unique label on both the worker and the RPA task. A worker can have multiple labels and will pick up any script that matches one of the given tags. For example, your worker might have access to the SAP application, but if you also want it to pick up browser automation tasks, add `SAP,BROWSER_AUTOMATION` to your worker tags. This will pick up tasks tagged as `SAP` and tasks tagged as `BROWSER_AUTOMATION`.

If no label is defined, both the task and worker will use the label `default`.

## Pre- and post-run scripts

Some of your scripts might require a specific environment to be prepared before the main script starts, for example, downloading certain documents
or setting up connections to internal systems.
You can create and deploy separate RPA scripts and reference them from the properties panel.

The same works for a post-run script, which can be used for environment cleanup or archiving results. Working directories of the worker's job will be removed once the job is completed.

## Timeouts

Runtime can vary greatly from script to script. It is important to set the right timeout for your job to ensure the jobs do not get canceled prematurely. There are two options to set timeouts:

- **On the RPA task (recommended)**: When configuring the RPA task in your diagram, set the timeout for this script execution. This is recommended as it allows you a per-script configuration.

- **Default timeout in a worker**: You can configure a default timeout in the `rpa-worker.properties` that is used for every task that does not have a timeout configured on the task. This should be used as a fallback.

## Concurrent jobs

By default, each worker only executes one job at the same time. This ensures scripts don't cause side effects while interacting with applications.

Some use cases, like browser automation, can be side effect free and execution can be parallelized. The `camunda.rpa.zeebe.max-concurrent-jobs` defines how many jobs the RPA worker will pick up.

## Additional libraries

The RPA worker comes with a set of [default libraries](https://camunda.github.io/rpa-python-libraries/). Additional dependencies can be installed by providing a supplementary `requirements.txt` file in the `camunda.rpa.python.extra-requirements` property.

These requirements will be installed with the next restart of the RPA worker. Additional libraries are only available on workers configured accordingly. Therefore, it is recommended to use [labels](#labels) to ensure the worker and script are compatible.

For example, the RPA worker allows browser automation with Selenium out of the box. To use Playwright instead, install the dependencies as follows:

```
# requirements.txt
robotframework-browser
```

```
# application.properties
camunda.rpa.python.extra-requirements=extra-requirements.txt
camunda.rpa.zeebe.worker-tags=default,playwright
```

## Scaling effectively

We recommend reviewing [organizing glue code and workers in process solutions](/components/best-practices/development/writing-good-workers.md#organizing-glue-code-and-workers-in-process-solutions).

By default, workers will only request and execute one job at a time. This ensures there are no side effects from multiple scripts interacting with the system at a time.

By extension, that means that one machine should only host a single RPA-worker instance at a time. If your worker can work on different type of tasks, add [labels](#labels) to your worker instead of starting additional workers. This ensures exclusivity of tasks on the machine.

Some workloads do not require exclusivity of the worker. For example, browser automation is usually free of side effects and can execute multiple jobs in parallel. With this, you may label tasks that can be parallelized (such as BROWSER_AUTOMATION). Create separate workers with the corresponding label and `camunda.rpa.zeebe.max-concurrent-jobs` larger than `1`.
