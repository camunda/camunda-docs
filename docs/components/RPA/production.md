---
id: production
title: Setting up RPA for production deployments
description: "Understand the specific configuration of your RPA runner to set up your workers for production use cases."
---

This article covers the specific configuration of your RPA runner. For the basic getting started guide, check the
[getting started guide](./getting-started.md).

## Using secrets

When running an RPA worker with Camunda SaaS, you can add access to [Connector secrets](/components/connectors/use-connectors/index.md#using-secrets).

To do this, [create client credentials](/guides/setup-client-connection-credentials.md) with both the `Zeebe` and `Secrets` scope and use them in the worker config.

In the RPA script, your secrets are stored in the `${secrets}` variable. You can reference a secret like `MY_API_KEY` with `${secrets.MY_API_KEY}`.

## Labels

If you manage multiple RPA worker machines and scripts, you might need specialized environments to run certain tasks.
To differentiate different capabilities of runners, you can use tags and labels.

In the `rpa-worker.properties`, add `camunda.rpa.zeebe.worker-tags=accounting-system`. This worker will now only take up jobs
which are labeled `accounting-system`. If you also want the worker to work on unlabeled tasks, use `camunda.rpa.zeebe.worker-tags=default,accounting-system` instead.
Each worker can have multiple labels and will pick up waiting jobs from all scripts.

You can add labels to your script when configuring the RPA task in your diagram. Note that a script can only have a single label.

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
