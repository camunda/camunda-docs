---
id: job-api
title: "Job Api"
sidebar_label: "Job Api"
sidebar_position: 24
mdx:
  format: md
---

# Job Api

`JobApi` — 12 operations. Call any of these directly on the client, or via `$client->api(\Camunda\Orchestration\Api\Api\JobApi::class)`.

- `activateJobs()`
- `completeJob()`
- `failJob()`
- `getGlobalJobStatistics()`
- `getJobErrorStatistics()`
- `getJobTimeSeriesStatistics()`
- `getJobTypeStatistics()`
- `getJobWorkerStatistics()`
- `searchJobs()`
- `throwJobError()`
- `updateJob()`
- `updateJobsBatchOperation()`
