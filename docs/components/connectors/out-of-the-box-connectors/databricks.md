---
id: databricks
title: Databricks connector
sidebar_label: Databricks
description: Run SQL statements, control warehouses, trigger jobs, invoke Model Serving endpoints, and query Vector Search indexes on Databricks from your BPMN process.
---

The **Databricks connector** allows you to call the [Databricks REST API](https://docs.databricks.com/api/workspace/introduction) from your BPMN process — SQL Statement Execution, SQL Warehouses, Jobs, Model Serving, and Vector Search.

This connector reuses the base implementation of the [REST connector](../protocol/rest.md) by providing a compatible element template. There is no additional runtime to deploy.

## Prerequisites

To use the **Databricks connector**, you need an active Camunda 8.9 or later cluster, and a Databricks workspace with — depending on the operation — a SQL warehouse, job, Model Serving endpoint, or Vector Search index to target.

You also need credentials to authenticate against your workspace. See [configure authentication](#configure-authentication) below.

:::note
Use Camunda secrets to store credentials so you don't expose sensitive information directly from the process. See [managing secrets](/components/hub/organization/manage-clusters/manage-secrets.md) to learn more.
:::

## Create a Databricks connector task

import ConnectorTask from '../../../components/react-components/connector-task.md';

<ConnectorTask/>

## Choose API and operation

In the **Databricks API** dropdown list, select the API you want to call. In the **Operation** dropdown list, select one of the operations supported for that API. The workspace URL, endpoint path, HTTP method, and query parameters are derived automatically from this choice; only the fields the selected operation needs are shown.

| API                     | Operation                         | Request                                                                  |
| ----------------------- | --------------------------------- | ------------------------------------------------------------------------ |
| SQL Statement Execution | Execute statement                 | `POST /api/2.0/sql/statements`                                           |
| SQL Statement Execution | Get statement status and result   | `GET /api/2.0/sql/statements/{statement_id}`                             |
| SQL Statement Execution | Get result chunk                  | `GET /api/2.0/sql/statements/{statement_id}/result/chunks/{chunk_index}` |
| SQL Statement Execution | Cancel statement                  | `POST /api/2.0/sql/statements/{statement_id}/cancel`                     |
| SQL Warehouses          | Get warehouse                     | `GET /api/2.0/sql/warehouses/{id}`                                       |
| SQL Warehouses          | Start warehouse                   | `POST /api/2.0/sql/warehouses/{id}/start`                                |
| SQL Warehouses          | Stop warehouse                    | `POST /api/2.0/sql/warehouses/{id}/stop`                                 |
| Jobs                    | Run job now                       | `POST /api/2.2/jobs/run-now`                                             |
| Jobs                    | Get run                           | `GET /api/2.2/jobs/runs/get`                                             |
| Jobs                    | Get run output                    | `GET /api/2.2/jobs/runs/get-output`                                      |
| Jobs                    | Cancel run                        | `POST /api/2.2/jobs/runs/cancel`                                         |
| Model Serving           | Invoke chat / LLM endpoint        | `POST /serving-endpoints/{name}/invocations`                             |
| Model Serving           | Invoke custom model (raw payload) | `POST /serving-endpoints/{name}/invocations`                             |
| Model Serving           | Get endpoint                      | `GET /api/2.0/serving-endpoints/{name}`                                  |
| Vector Search           | Query index                       | `POST /api/2.0/vector-search/indexes/{index_name}/query`                 |

:::note
Model Serving invocations are the only requests without an `/api/2.0` prefix. Every other operation, including **Get endpoint**, is prefixed.
:::

## Configure authentication

| Type                          | Use                                                                                                                                                                                          |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OAuth M2M (service principal) | Recommended for production. Client credentials are sent as a Basic authentication header to `https://<workspace>/oidc/v1/token` with `scope=all-apis`. Access tokens are valid for one hour. |
| Personal access token         | Testing only.                                                                                                                                                                                |

The OAuth token endpoint is derived from the workspace URL, so it does not need to be configured separately.

## Common patterns

**Run a SQL statement that takes longer than 50 seconds.** Set **Execute statement**'s `wait_timeout` to `0s` (or `CONTINUE` on timeout) to get a `statement_id` back in a non-terminal state. Loop **Get statement status and result** behind a BPMN timer until `status.state` is terminal. If the response carries `result.next_chunk_index`, page through the rest with **Get result chunk**.

**Trigger a job and wait for it.** **Run job now** returns a `run_id`. Poll **Get run** until `state.life_cycle_state` reaches one of its three terminal values — `TERMINATED`, `SKIPPED`, or `INTERNAL_ERROR`. Checking only for `TERMINATED` makes the loop poll forever when a run is skipped or fails internally. Once terminal, `state.result_state` (`SUCCESS`, `FAILED`, `TIMEDOUT`, `CANCELED`) becomes available to branch on. **Cancel run** covers BPMN-side cancellation or a boundary timer.

:::note
For a multi-task job, **Get run output** needs an individual task's `run_id`, taken from the terminal **Get run** response's `tasks[].run_id` — not the top-level `run_id` that **Run job now** returned. Databricks only accepts a single task's run there.
:::

**Avoid duplicate job runs.** The template defaults to 3 retries. A retried **Run job now** call would otherwise start the job twice, so set **Idempotency token** to a value that is stable per process instance — Databricks then returns the existing run instead of starting a new one.

**Warm the warehouse first.** **Execute statement** against a stopped warehouse waits for it to start. To control that explicitly, call **Start warehouse** and poll **Get warehouse** until `state` is `RUNNING`. **Start warehouse** and **Stop warehouse** both return immediately and do not wait for the transition to finish.

## Handle SQL statement failures

The Databricks SQL Statement Execution API returns **HTTP 200 with `status.state = FAILED`** when a statement fails at the warehouse, so a plain HTTP success check is not enough. The template ships a default error expression that raises a BPMN error for the terminal failure states `FAILED`, `CANCELED`, and `CLOSED`. `PENDING` and `RUNNING` are deliberately not treated as errors — they mean the statement is still executing.

Job run outcomes are not covered by that expression. A failed run is reported in `state.result_state` on **Get run**, and polling loops normally branch on it with a gateway rather than throwing. Add it to the error expression yourself if you want a failed run to also raise a BPMN error.

## Partner telemetry

Every request carries the `User-Agent` header required for Databricks Technology Partner attribution:

```
User-Agent: Camunda_DatabricksConnector/1.0
```

You can supply additional headers, but this value is merged in last and cannot be overridden.

## Appendix & FAQ

### API documentation

- [SQL Statement Execution API](https://docs.databricks.com/api/workspace/statementexecution/executestatement)
- [SQL Warehouses API](https://docs.databricks.com/api/workspace/warehouses/get)
- [Jobs API 2.2](https://docs.databricks.com/api/workspace/jobs/runnow)
- [Model Serving — query endpoint](https://docs.databricks.com/api/workspace/servingendpoints/query)
- [Vector Search — query index](https://docs.databricks.com/api/workspace/vectorsearchindexes/queryindex)
- [OAuth M2M for service principals](https://docs.databricks.com/aws/en/dev-tools/auth/oauth-m2m)
