---
id: job-api
title: "Job API"
sidebar_label: "Job API"
sidebar_position: 24
mdx:
  format: md
---

# Job API

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
