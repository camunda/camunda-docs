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

## Choose an API and operation

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

| Type                                                    | Use                                                                                                                                                                                          |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OAuth machine-to-machine (M2M) with a service principal | Recommended for production. Client credentials are sent as a Basic authentication header to `https://<workspace>/oidc/v1/token` with `scope=all-apis`. Access tokens are valid for one hour. |
| Personal access token                                   | Testing only.                                                                                                                                                                                |

The OAuth token endpoint is derived from the workspace URL, so it does not need to be configured separately.

## Handle common workflows

### Run a long SQL statement

For SQL statements that take longer than 50 seconds, set **Execute statement**'s `wait_timeout` to `0s` (or `CONTINUE` on timeout). This returns a `statement_id` while the statement is still running.

Poll **Get statement status and result** with a BPMN timer until `status.state` reaches a terminal state. If the response contains `result.next_chunk_index`, retrieve the remaining results with **Get result chunk**.

### Trigger a job and wait for completion

**Run job now** returns a `run_id`. Poll **Get run** until `state.life_cycle_state` reaches one of these terminal values:

- `TERMINATED`
- `SKIPPED`
- `INTERNAL_ERROR`

Do not check only for `TERMINATED`, as this causes the loop to continue indefinitely if a run is skipped or fails internally.

When the run reaches a terminal state, use `state.result_state` to determine the result:

- `SUCCESS`
- `FAILED`
- `TIMEDOUT`
- `CANCELED`

Use **Cancel run** to handle BPMN-side cancellation or a boundary timer.

:::note
For a multi-task job, **Get run output** requires an individual task's `run_id` from `tasks[].run_id` in the terminal **Get run** response. Do not use the top-level `run_id` returned by **Run job now**, as Databricks accepts only a single task's run ID.
:::

### Avoid duplicate writes on retry

**Execute statement** and **Run job now** are non-idempotent, so the **Retries** field defaults to `0`. A retry would otherwise resend the identical request. The SQL Statement Execution API has no idempotency key, so keep **Retries** at `0` for **Execute statement**.

**Run job now** accepts an idempotency token. Set **Idempotency token** to a value that remains stable for each process instance. Databricks then returns the existing run instead of starting a new one.

You can safely increase **Retries** for read-only operations, such as **Get run**, **Get warehouse**, or **Get statement status and result**.

### Start a warehouse before execution

When you use **Execute statement** with a stopped warehouse, Databricks waits for the warehouse to start.

To control this explicitly, call **Start warehouse** and poll **Get warehouse** until `state` is `RUNNING`.

**Start warehouse** and **Stop warehouse** return immediately and do not wait for the state transition to finish.

### Raise the job timeout for slow calls

Model Serving allows up to 597 seconds of model execution — well beyond SQL's own `wait_timeout`, which is capped at 50 seconds.

If **Job timeout** stays at its default while you increase **Read timeout in seconds** for a slow Model Serving call, Zeebe can time out the job and reactivate it on another worker while the first HTTP request is still in flight. This can result in a duplicate non-idempotent call that **Retries** = `0` does not prevent because the retry happens outside the connector. Increase both settings together.

### Provide the required vector search inputs

**Query index** always needs **Columns**, plus exactly one of **Query text** or **Query vector** — which one depends on the index type. Supplying columns alone passes template validation, but the API rejects the request.

## Handle statement and job outcomes

The Databricks SQL Statement Execution API returns HTTP 200 with `status.state = FAILED` when a statement fails at the warehouse, so a plain HTTP success check is not enough. The terminal states are:

| State       | Meaning                                                                                                         |
| ----------- | --------------------------------------------------------------------------------------------------------------- |
| `SUCCEEDED` | Execution successful, result available for fetch.                                                               |
| `FAILED`    | Execution failed; the reason is in `status.error.message`.                                                      |
| `CANCELED`  | Canceled explicitly, or by `on_wait_timeout=CANCEL`.                                                            |
| `CLOSED`    | Execution succeeded and the statement is closed; the result is no longer available for fetch.                   |

`PENDING` and `RUNNING` are not terminal — they mean the statement is still executing, and you must poll the result with **Get statement status and result**.

Branch on the state with a gateway rather than an error expression. Map the state into a variable with the **Result expression**, then route on it with an exclusive gateway:

```
Result expression:
=response.body.status.state

Gateway conditions:
=result = "FAILED"                        -> error handling path
=result = "CANCELED"                      -> cancellation path
=result = "PENDING" or result = "RUNNING" -> poll loop (Get statement status and result)
(default, i.e. SUCCEEDED or CLOSED)       -> continue
```

Routing everything except `FAILED` or `CANCELED` to `(default)` treats a still-running statement as complete. The `PENDING` or `RUNNING` branch is therefore required when `wait_timeout` is `0s` or the statement continues after a timeout.

:::note
This template ships with no default error expression. An error expression is evaluated against the mapped output, not the raw response. When you set **Result variable** or **Result expression**, an expression that uses `response.body.status.state` sees `response.body` as `null` and never fires.A failed statement would then complete as a success. Use the gateway pattern above instead.
:::

Use the same gateway pattern for job run outcomes. **Get run** reports a failed run in `state.result_state` after `state.life_cycle_state` reaches a terminal state. Map `state.result_state` to a variable and branch on it with the gateway.

## Partner telemetry

Every request carries the `User-Agent` header required for Databricks Technology Partner attribution:

```
User-Agent: Camunda_DatabricksConnector/1.0
```

You can supply additional headers, but this value is merged in last and cannot be overridden.

## API documentation

- [SQL Statement Execution API](https://docs.databricks.com/api/workspace/statementexecution/executestatement)
- [SQL Warehouses API](https://docs.databricks.com/api/workspace/warehouses/get)
- [Jobs API 2.2](https://docs.databricks.com/api/workspace/jobs/runnow)
- [Model Serving — query endpoint](https://docs.databricks.com/api/workspace/servingendpoints/query)
- [Vector Search — query index](https://docs.databricks.com/api/workspace/vectorsearchindexes/queryindex)
- [OAuth M2M for service principals](https://docs.databricks.com/aws/en/dev-tools/auth/oauth-m2m)
