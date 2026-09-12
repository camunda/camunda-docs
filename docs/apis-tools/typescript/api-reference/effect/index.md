---
title: "effect"
sidebar_label: "Overview"
mdx:
  format: md
---

# effect

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

## Classes

- [CamundaEffect](classes/CamundaEffect.md)
- [CamundaGenericError](classes/CamundaGenericError.md)
- [CamundaValidationError](classes/CamundaValidationError.md)
- [EventualConsistencyTimeout](classes/EventualConsistencyTimeout.md)
- [HttpError](classes/HttpError.md)
- [RetryableJobError](classes/RetryableJobError.md)
- [TerminalJobError](classes/TerminalJobError.md)

## Interfaces

- [ActivateJobsStreamOptions](interfaces/ActivateJobsStreamOptions.md)
- [CamundaEffectWorkerHandle](interfaces/CamundaEffectWorkerHandle.md)
- [EffectPaginateOptions](interfaces/EffectPaginateOptions.md)
- [EffectPaginator](interfaces/EffectPaginator.md)
- [EffectWorkerConfig](interfaces/EffectWorkerConfig.md)

## Type Aliases

- [CamundaEffectClient](type-aliases/CamundaEffectClient.md)
- [CompleteVars](type-aliases/CompleteVars.md)
- [DomainError](type-aliases/DomainError.md)
- [DomainErrorTag](type-aliases/DomainErrorTag.md)
- [Effectify](type-aliases/Effectify.md)
- [FnKeys](type-aliases/FnKeys.md)
- [Job](type-aliases/Job.md)
- [JobError](type-aliases/JobError.md)
- [JobHandler](type-aliases/JobHandler.md)

## Functions

- [activateJobsStream](functions/activateJobsStream.md)
- [createCamundaEffectClient](functions/createCamundaEffectClient.md)
- [createCamundaEffectWorker](functions/createCamundaEffectWorker.md)
- [eventually](functions/eventually.md)
- [layer](functions/layer.md)
- [retryWithBackoff](functions/retryWithBackoff.md)
- [runWorkerLoop](functions/runWorkerLoop.md)
- [withTimeout](functions/withTimeout.md)
- [workerLayer](functions/workerLayer.md)
