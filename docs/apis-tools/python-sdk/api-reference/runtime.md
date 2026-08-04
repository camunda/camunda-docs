---
title: Runtime
sidebar_label: Runtime
sidebar_position: 5
mdx:
  format: md
---

# Runtime

## Authentication

## AsyncAuthProvider

```python
class AsyncAuthProvider(*args, **kwargs)
```

Bases: `Protocol`

Async auth provider variant.

If an auth provider implements this protocol, async clients will prefer it.

### aget_headers()

```python
async def aget_headers()
```

- **Return type:**
  _Mapping_[str, str]

## AsyncOAuthClientCredentialsAuthProvider

```python
class AsyncOAuthClientCredentialsAuthProvider(, oauth_url, client_id, client_secret, audience, cache_dir=None, disk_cache_disable=False, saas_401_cooldown_s=30.0, transport=None, timeout=None, logger=None)
```

Bases: `object`

OAuth 2.0 Client Credentials provider with in-memory caching.

This is designed for async clients.

**Parameters:**

| Parameter             | Type                                 | Description |
| --------------------- | ------------------------------------ | ----------- |
| `oauth_url`           | `str`                                |             |
| `client_id`           | `str`                                |             |
| `client_secret`       | `str`                                |             |
| `audience`            | `str`                                |             |
| `cache_dir`           | `str` \| `None`                      |             |
| `disk_cache_disable`  | `bool`                               |             |
| `saas_401_cooldown_s` | `float`                              |             |
| `transport`           | `httpx.AsyncBaseTransport` \| `None` |             |
| `timeout`             | `float` \| `None`                    |             |
| `logger`              | [SdkLogger](#sdklogger) \| `None`    |             |

### aclose()

```python
async def aclose()
```

Close the underlying async HTTP client used for token requests.

- **Return type:**
  None

### aget_headers()

```python
async def aget_headers()
```

- **Return type:**
  _Mapping_[str, str]

### get_headers()

```python
def get_headers()
```

Sync fallback satisfying the `AuthProvider` protocol.

Returns cached token headers if a valid token is already held,
otherwise returns empty headers (the next async request hook will
call `aget_headers` to fetch a fresh token).

- **Return type:**
  _Mapping_[str, str]

## AuthProvider

```python
class AuthProvider(*args, **kwargs)
```

Bases: `Protocol`

Provides per-request authentication headers.

Implementations are expected to be lightweight and safe to call for every request.

### get_headers()

```python
def get_headers()
```

- **Return type:**
  _Mapping_[str, str]

## BasicAuthProvider

```python
class BasicAuthProvider(, username, password)
```

Bases: `object`

HTTP Basic auth provider.

**Parameters:**

| Parameter  | Type  | Description |
| ---------- | ----- | ----------- |
| `username` | `str` |             |
| `password` | `str` |             |

### get_headers()

```python
def get_headers()
```

- **Return type:**
  _Mapping_[str, str]

## NullAuthProvider

```python
class NullAuthProvider
```

Bases: `object`

Default auth provider that adds no headers.

### get_headers()

```python
def get_headers()
```

- **Return type:**
  dict[str, str]

## OAuthClientCredentialsAuthProvider

```python
class OAuthClientCredentialsAuthProvider(, oauth_url, client_id, client_secret, audience, cache_dir=None, disk_cache_disable=False, saas_401_cooldown_s=30.0, transport=None, timeout=None, logger=None)
```

Bases: `object`

OAuth 2.0 Client Credentials provider with in-memory caching.

This is designed for sync clients.

**Parameters:**

| Parameter             | Type                              | Description |
| --------------------- | --------------------------------- | ----------- |
| `oauth_url`           | `str`                             |             |
| `client_id`           | `str`                             |             |
| `client_secret`       | `str`                             |             |
| `audience`            | `str`                             |             |
| `cache_dir`           | `str` \| `None`                   |             |
| `disk_cache_disable`  | `bool`                            |             |
| `saas_401_cooldown_s` | `float`                           |             |
| `transport`           | `httpx.BaseTransport` \| `None`   |             |
| `timeout`             | `float` \| `None`                 |             |
| `logger`              | [SdkLogger](#sdklogger) \| `None` |             |

### close()

```python
def close()
```

Close the underlying HTTP client used for token requests.

Call this when the application is shutting down if you created a provider
instance yourself (or if you want deterministic cleanup in tests).

- **Return type:**
  None

### get_headers()

```python
def get_headers()
```

- **Return type:**
  _Mapping_[str, str]

### inject_auth_event_hooks()

```python
def inject_auth_event_hooks(httpx_args, auth_provider, *, async_client=False, log_level=None, logger=None)
```

Return a copy of httpx_args with a request hook that applies auth headers.

This uses httpx event hooks so we don’t have to inject headers in every generated API call.

**Parameters:**

| Parameter       | Type                              | Description |
| --------------- | --------------------------------- | ----------- |
| `httpx_args`    | dict [str , Any ] \| `None`       |             |
| `auth_provider` | `object`                          |             |
| `async_client`  | `bool`                            |             |
| `log_level`     | `str` \| `None`                   |             |
| `logger`        | [SdkLogger](#sdklogger) \| `None` |             |

- **Return type:**
  dict[str, _Any_]

## Logging

Pluggable logger abstraction for the Camunda SDK.

Users can inject any logger that implements [`CamundaLogger`](#camundalogger) (stdlib
`logging.Logger`, `loguru.logger`, or a custom object with
`debug`/`info`/`warning`/`error` methods).

When no logger is provided, loguru is used if installed, otherwise logging is
silently disabled.

## CamundaLogger

```python
class CamundaLogger(*args, **kwargs)
```

Bases: `Protocol`

Protocol for a logger injectable into the SDK.

Compatible with Python’s `logging.Logger`, `loguru.logger`, or any
object that exposes these four methods.

### debug()

```python
def debug(msg, *args, **kwargs)
```

**Parameters:**

| Parameter | Type  | Description |
| --------- | ----- | ----------- |
| `msg`     | `str` |             |
| `args`    | `Any` |             |
| `kwargs`  | `Any` |             |

- **Return type:**
  None

### error()

```python
def error(msg, *args, **kwargs)
```

**Parameters:**

| Parameter | Type  | Description |
| --------- | ----- | ----------- |
| `msg`     | `str` |             |
| `args`    | `Any` |             |
| `kwargs`  | `Any` |             |

- **Return type:**
  None

### info()

```python
def info(msg, *args, **kwargs)
```

**Parameters:**

| Parameter | Type  | Description |
| --------- | ----- | ----------- |
| `msg`     | `str` |             |
| `args`    | `Any` |             |
| `kwargs`  | `Any` |             |

- **Return type:**
  None

### warning()

```python
def warning(msg, *args, **kwargs)
```

**Parameters:**

| Parameter | Type  | Description |
| --------- | ----- | ----------- |
| `msg`     | `str` |             |
| `args`    | `Any` |             |
| `kwargs`  | `Any` |             |

- **Return type:**
  None

## NullLogger

```python
class NullLogger
```

Bases: `object`

Logger that silently discards all messages.

### debug()

```python
def debug(msg, *args, **kwargs)
```

**Parameters:**

| Parameter | Type  | Description |
| --------- | ----- | ----------- |
| `msg`     | `str` |             |
| `args`    | `Any` |             |
| `kwargs`  | `Any` |             |

- **Return type:**
  None

### error()

```python
def error(msg, *args, **kwargs)
```

**Parameters:**

| Parameter | Type  | Description |
| --------- | ----- | ----------- |
| `msg`     | `str` |             |
| `args`    | `Any` |             |
| `kwargs`  | `Any` |             |

- **Return type:**
  None

### info()

```python
def info(msg, *args, **kwargs)
```

**Parameters:**

| Parameter | Type  | Description |
| --------- | ----- | ----------- |
| `msg`     | `str` |             |
| `args`    | `Any` |             |
| `kwargs`  | `Any` |             |

- **Return type:**
  None

### trace()

```python
def trace(msg, *args, **kwargs)
```

**Parameters:**

| Parameter | Type  | Description |
| --------- | ----- | ----------- |
| `msg`     | `str` |             |
| `args`    | `Any` |             |
| `kwargs`  | `Any` |             |

- **Return type:**
  None

### warning()

```python
def warning(msg, *args, **kwargs)
```

**Parameters:**

| Parameter | Type  | Description |
| --------- | ----- | ----------- |
| `msg`     | `str` |             |
| `args`    | `Any` |             |
| `kwargs`  | `Any` |             |

- **Return type:**
  None

## SdkLogger

```python
class SdkLogger(logger, prefix='')
```

Bases: `object`

Internal wrapper that normalises logger implementations.

Adds `trace()` support (falls back to `debug()` on loggers that lack
it) and `bind()` support (uses loguru’s native `bind` when available,
otherwise prepends a `[key=value ...]` prefix to messages).

**Parameters:**

| Parameter | Type                            | Description |
| --------- | ------------------------------- | ----------- |
| `logger`  | [CamundaLogger](#camundalogger) |             |
| `prefix`  | `str`                           |             |

### bind()

```python
def bind(**kwargs)
```

Create a child logger with additional context.

If the underlying logger supports `bind()` (e.g. loguru), the native
method is used. Otherwise context is rendered as a `[k=v ...]`
prefix on each message.

- **Parameters:**
  **kwargs** (_str_)
- **Return type:**
  [_SdkLogger_](#sdklogger)

### debug()

```python
def debug(msg, *args, **kwargs)
```

**Parameters:**

| Parameter | Type  | Description |
| --------- | ----- | ----------- |
| `msg`     | `str` |             |
| `args`    | `Any` |             |
| `kwargs`  | `Any` |             |

- **Return type:**
  None

### error()

```python
def error(msg, *args, **kwargs)
```

**Parameters:**

| Parameter | Type  | Description |
| --------- | ----- | ----------- |
| `msg`     | `str` |             |
| `args`    | `Any` |             |
| `kwargs`  | `Any` |             |

- **Return type:**
  None

### info()

```python
def info(msg, *args, **kwargs)
```

**Parameters:**

| Parameter | Type  | Description |
| --------- | ----- | ----------- |
| `msg`     | `str` |             |
| `args`    | `Any` |             |
| `kwargs`  | `Any` |             |

- **Return type:**
  None

### trace()

```python
def trace(msg)
```

- **Parameters:**
  **msg** (_str_)
- **Return type:**
  None

### warning()

```python
def warning(msg, *args, **kwargs)
```

**Parameters:**

| Parameter | Type  | Description |
| --------- | ----- | ----------- |
| `msg`     | `str` |             |
| `args`    | `Any` |             |
| `kwargs`  | `Any` |             |

- **Return type:**
  None

### create_logger()

```python
def create_logger(logger=None)
```

Create an [`SdkLogger`](#sdklogger).

- **Parameters:**
  **logger** ([_CamundaLogger_](#camundalogger) _|_ _None_) – A user-supplied logger. When `None`, loguru is used if installed,
  otherwise a [`NullLogger`](#nulllogger) is used.
- **Return type:**
  [_SdkLogger_](#sdklogger)

## Job Worker

### AsyncJobContext

alias of [`ConnectedJobContext`](#connectedjobcontext)

## ConnectedJobContext

```python
class ConnectedJobContext(type_, process_definition_id, process_definition_version, element_id, custom_headers, worker, retries, deadline, variables, tenant_id, physical_tenant_id, job_key, process_instance_key, process_definition_key, element_instance_key, kind, listener_event_type, user_task, tags, root_process_instance_key, business_id, priority, lease_token, log=NOTHING, , client)
```

Bases: [`JobContext`](#jobcontext)

Context for **async** handlers — includes an async client reference.

Extends [`JobContext`](#jobcontext) with a `client` attribute that provides
access to the Camunda API from within an async job handler. Use
`await job.client.method(...)` to call API methods.

This context is provided when the execution strategy is `"async"`.
For `"thread"` handlers, see [`SyncJobContext`](#syncjobcontext).
For `"process"` handlers, see [`JobContext`](#jobcontext).

**Parameters:**

| Parameter                    | Type                                                                                                 | Description |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- | ----------- |
| `type_`                      | `str`                                                                                                |             |
| `process_definition_id`      | [ProcessDefinitionId](types.md#camunda_orchestration_sdk.semantic_types.ProcessDefinitionId)         |             |
| `process_definition_version` | `int`                                                                                                |             |
| `element_id`                 | [ElementId](types.md#camunda_orchestration_sdk.semantic_types.ElementId)                             |             |
| `custom_headers`             | `ActivatedJobResultCustomHeaders`                                                                    |             |
| `worker`                     | `str`                                                                                                |             |
| `retries`                    | `int`                                                                                                |             |
| `deadline`                   | `int`                                                                                                |             |
| `variables`                  | `ActivatedJobResultVariables`                                                                        |             |
| `tenant_id`                  | [TenantId](types.md#camunda_orchestration_sdk.semantic_types.TenantId)                               |             |
| `physical_tenant_id`         | `str`                                                                                                |             |
| `job_key`                    | [JobKey](types.md#camunda_orchestration_sdk.semantic_types.JobKey)                                   |             |
| `process_instance_key`       | [ProcessInstanceKey](types.md#camunda_orchestration_sdk.semantic_types.ProcessInstanceKey)           |             |
| `process_definition_key`     | [ProcessDefinitionKey](types.md#camunda_orchestration_sdk.semantic_types.ProcessDefinitionKey)       |             |
| `element_instance_key`       | [ElementInstanceKey](types.md#camunda_orchestration_sdk.semantic_types.ElementInstanceKey)           |             |
| `kind`                       | `JobKindEnum`                                                                                        |             |
| `listener_event_type`        | `JobListenerEventTypeEnum`                                                                           |             |
| `user_task`                  | `ActivatedJobResultUserTask` \| `None`                                                               |             |
| `tags`                       | list [str ]                                                                                          |             |
| `root_process_instance_key`  | `None` \| [ProcessInstanceKey](types.md#camunda_orchestration_sdk.semantic_types.ProcessInstanceKey) |             |
| `business_id`                | `None` \| [BusinessId](types.md#camunda_orchestration_sdk.semantic_types.BusinessId)                 |             |
| `priority`                   | `int`                                                                                                |             |
| `lease_token`                | `None` \| `str`                                                                                      |             |
| `log`                        | [SdkLogger](#sdklogger)                                                                              |             |
| `client`                     | [CamundaAsyncClient](async-client.md#camunda_orchestration_sdk.CamundaAsyncClient)                   |             |

### client

```python
client: [CamundaAsyncClient](async-client.md#camunda_orchestration_sdk.CamundaAsyncClient)
```

### _classmethod_ create(job, client, logger=None)

**Parameters:**

| Parameter | Type                              | Description |
| --------- | --------------------------------- | ----------- |
| `job`     | `ActivatedJobResult`              |             |
| `client`  | `Any`                             |             |
| `logger`  | [SdkLogger](#sdklogger) \| `None` |             |

- **Return type:**
  [_ConnectedJobContext_](#connectedjobcontext)

## JobContext

```python
class JobContext(type_, process_definition_id, process_definition_version, element_id, custom_headers, worker, retries, deadline, variables, tenant_id, physical_tenant_id, job_key, process_instance_key, process_definition_key, element_instance_key, kind, listener_event_type, user_task, tags, root_process_instance_key, business_id, priority, lease_token, log=NOTHING)
```

Bases: `ActivatedJobResult`

Read-only context for a job execution.

**Parameters:**

| Parameter                    | Type                                                                                                 | Description |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- | ----------- |
| `type_`                      | `str`                                                                                                |             |
| `process_definition_id`      | [ProcessDefinitionId](types.md#camunda_orchestration_sdk.semantic_types.ProcessDefinitionId)         |             |
| `process_definition_version` | `int`                                                                                                |             |
| `element_id`                 | [ElementId](types.md#camunda_orchestration_sdk.semantic_types.ElementId)                             |             |
| `custom_headers`             | `ActivatedJobResultCustomHeaders`                                                                    |             |
| `worker`                     | `str`                                                                                                |             |
| `retries`                    | `int`                                                                                                |             |
| `deadline`                   | `int`                                                                                                |             |
| `variables`                  | `ActivatedJobResultVariables`                                                                        |             |
| `tenant_id`                  | [TenantId](types.md#camunda_orchestration_sdk.semantic_types.TenantId)                               |             |
| `physical_tenant_id`         | `str`                                                                                                |             |
| `job_key`                    | [JobKey](types.md#camunda_orchestration_sdk.semantic_types.JobKey)                                   |             |
| `process_instance_key`       | [ProcessInstanceKey](types.md#camunda_orchestration_sdk.semantic_types.ProcessInstanceKey)           |             |
| `process_definition_key`     | [ProcessDefinitionKey](types.md#camunda_orchestration_sdk.semantic_types.ProcessDefinitionKey)       |             |
| `element_instance_key`       | [ElementInstanceKey](types.md#camunda_orchestration_sdk.semantic_types.ElementInstanceKey)           |             |
| `kind`                       | `JobKindEnum`                                                                                        |             |
| `listener_event_type`        | `JobListenerEventTypeEnum`                                                                           |             |
| `user_task`                  | `ActivatedJobResultUserTask` \| `None`                                                               |             |
| `tags`                       | list [str ]                                                                                          |             |
| `root_process_instance_key`  | `None` \| [ProcessInstanceKey](types.md#camunda_orchestration_sdk.semantic_types.ProcessInstanceKey) |             |
| `business_id`                | `None` \| [BusinessId](types.md#camunda_orchestration_sdk.semantic_types.BusinessId)                 |             |
| `priority`                   | `int`                                                                                                |             |
| `lease_token`                | `None` \| `str`                                                                                      |             |
| `log`                        | [SdkLogger](#sdklogger)                                                                              |             |

### log

A scoped logger bound to this job’s context (job type, job key).
Use `job.log.info(...)` etc. inside your handler to emit
structured log messages.

- **Type:**
  [SdkLogger](#sdklogger)

### _classmethod_ from_job(job, logger=None)

**Parameters:**

| Parameter | Type                              | Description |
| --------- | --------------------------------- | ----------- |
| `job`     | `ActivatedJobResult`              |             |
| `logger`  | [SdkLogger](#sdklogger) \| `None` |             |

- **Return type:**
  [_JobContext_](#jobcontext)

### log

```python
log: [SdkLogger](#sdklogger)
```

### _exception_ JobError(error_code, message='', variables=None)

Bases: `Exception`

Raise this exception to throw a BPMN error.

**Parameters:**

| Parameter    | Type                        | Description |
| ------------ | --------------------------- | ----------- |
| `error_code` | `str`                       |             |
| `message`    | `str`                       |             |
| `variables`  | dict [str , Any ] \| `None` |             |

### _exception_ JobFailure(message, retries=None, retry_back_off=0, variables=None)

Bases: `Exception`

Raise this exception to explicitly fail a job with custom retries/backoff.

**Parameters:**

| Parameter        | Type                        | Description |
| ---------------- | --------------------------- | ----------- |
| `message`        | `str`                       |             |
| `retries`        | `int` \| `None`             |             |
| `retry_back_off` | `int`                       |             |
| `variables`      | dict [str , Any ] \| `None` |             |

## JobWorker

```python
class JobWorker(client, callback, config, logger=None, execution_strategy='auto', startup_jitter_max_seconds=0)
```

Bases: `object`

**Parameters:**

| Parameter                    | Type                                                                               | Description |
| ---------------------------- | ---------------------------------------------------------------------------------- | ----------- |
| `client`                     | [CamundaAsyncClient](async-client.md#camunda_orchestration_sdk.CamundaAsyncClient) |             |
| `callback`                   | `JobHandler`                                                                       |             |
| `config`                     | [WorkerConfig](#workerconfig)                                                      |             |
| `logger`                     | [SdkLogger](#sdklogger) \| `None`                                                  |             |
| `execution_strategy`         | `EXECUTION_STRATEGY`                                                               |             |
| `startup_jitter_max_seconds` | `float`                                                                            |             |

### aclose()

```python
async def aclose()
```

Async-aware teardown.

Cancels any in-flight job tasks and awaits their cancellation
(bounded by a timeout) before delegating to the synchronous
`close()`. Prefer this over `stop()`/`close()` from inside
a running event loop — it gives cancelled tasks a chance to
propagate before the pools they depend on are shut down, which
prevents ‘cannot schedule new futures after shutdown’ (and the
post-#150 ‘JobWorker is closed’) errors from surfacing as task
exceptions.

- **Return type:**
  None

### close()

```python
def close()
```

Release any resources this worker lazily allocated.

Safe to call multiple times and from multiple threads concurrently.
Use as a context manager (`with JobWorker(...) as worker:`) or in
a pytest fixture teardown to avoid leaking file descriptors across
many short-lived worker instances (see issue #148).

Blocks until pools have finished shutdown so file descriptors and
worker processes are reliably released before the references are
cleared. If invoked from inside a pool worker thread, falls back
to a non-waiting shutdown for that pool to avoid a self-join
deadlock. If invoked from the worker loop thread, skips joining
the worker thread (same self-join hazard).

After `close()` returns, accessing `thread_pool`,
`process_pool`, or `worker_loop` raises `RuntimeError`;
a closed JobWorker cannot be reused.

- **Return type:**
  None

### poll_loop()

```python
async def poll_loop()
```

Background polling loop - always async

### _property_ process_pool _: ProcessPoolExecutor_

### start()

```python
def start()
```

### stop()

```python
def stop()
```

### _property_ thread_pool _: ThreadPoolExecutor_

### _property_ worker_loop _: AbstractEventLoop_

## SyncJobContext

```python
class SyncJobContext(type_, process_definition_id, process_definition_version, element_id, custom_headers, worker, retries, deadline, variables, tenant_id, physical_tenant_id, job_key, process_instance_key, process_definition_key, element_instance_key, kind, listener_event_type, user_task, tags, root_process_instance_key, business_id, priority, lease_token, log=NOTHING, , client)
```

Bases: [`JobContext`](#jobcontext)

Context for **thread** handlers — includes a sync client reference.

Extends [`JobContext`](#jobcontext) with a `client` attribute that provides
access to the Camunda API from within a synchronous (thread) handler.
Call `job.client.method(...)` directly — no `await` needed.

This context is provided when the execution strategy is `"thread"`.
For `"async"` handlers, see [`ConnectedJobContext`](#connectedjobcontext).
For `"process"` handlers, see [`JobContext`](#jobcontext).

**Parameters:**

| Parameter                    | Type                                                                                                 | Description |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- | ----------- |
| `type_`                      | `str`                                                                                                |             |
| `process_definition_id`      | [ProcessDefinitionId](types.md#camunda_orchestration_sdk.semantic_types.ProcessDefinitionId)         |             |
| `process_definition_version` | `int`                                                                                                |             |
| `element_id`                 | [ElementId](types.md#camunda_orchestration_sdk.semantic_types.ElementId)                             |             |
| `custom_headers`             | `ActivatedJobResultCustomHeaders`                                                                    |             |
| `worker`                     | `str`                                                                                                |             |
| `retries`                    | `int`                                                                                                |             |
| `deadline`                   | `int`                                                                                                |             |
| `variables`                  | `ActivatedJobResultVariables`                                                                        |             |
| `tenant_id`                  | [TenantId](types.md#camunda_orchestration_sdk.semantic_types.TenantId)                               |             |
| `physical_tenant_id`         | `str`                                                                                                |             |
| `job_key`                    | [JobKey](types.md#camunda_orchestration_sdk.semantic_types.JobKey)                                   |             |
| `process_instance_key`       | [ProcessInstanceKey](types.md#camunda_orchestration_sdk.semantic_types.ProcessInstanceKey)           |             |
| `process_definition_key`     | [ProcessDefinitionKey](types.md#camunda_orchestration_sdk.semantic_types.ProcessDefinitionKey)       |             |
| `element_instance_key`       | [ElementInstanceKey](types.md#camunda_orchestration_sdk.semantic_types.ElementInstanceKey)           |             |
| `kind`                       | `JobKindEnum`                                                                                        |             |
| `listener_event_type`        | `JobListenerEventTypeEnum`                                                                           |             |
| `user_task`                  | `ActivatedJobResultUserTask` \| `None`                                                               |             |
| `tags`                       | list [str ]                                                                                          |             |
| `root_process_instance_key`  | `None` \| [ProcessInstanceKey](types.md#camunda_orchestration_sdk.semantic_types.ProcessInstanceKey) |             |
| `business_id`                | `None` \| [BusinessId](types.md#camunda_orchestration_sdk.semantic_types.BusinessId)                 |             |
| `priority`                   | `int`                                                                                                |             |
| `lease_token`                | `None` \| `str`                                                                                      |             |
| `log`                        | [SdkLogger](#sdklogger)                                                                              |             |
| `client`                     | [CamundaClient](client.md#camunda_orchestration_sdk.CamundaClient)                                   |             |

### client

```python
client: [CamundaClient](client.md#camunda_orchestration_sdk.CamundaClient)
```

### _classmethod_ create(job, client, logger=None)

**Parameters:**

| Parameter | Type                              | Description |
| --------- | --------------------------------- | ----------- |
| `job`     | `ActivatedJobResult`              |             |
| `client`  | `Any`                             |             |
| `logger`  | [SdkLogger](#sdklogger) \| `None` |             |

- **Return type:**
  [_SyncJobContext_](#syncjobcontext)

## WorkerConfig

```python
class WorkerConfig(job_type, job_timeout_milliseconds=None, request_timeout_milliseconds=None, max_concurrent_jobs=None, fetch_variables=None, worker_name=None)
```

Bases: `object`

User-facing configuration.

Fields left as `None` inherit the global default from
`CAMUNDA_WORKER_*` environment variables (or the client constructor),
falling back to the hardcoded SDK default when neither is set.

**Parameters:**

| Parameter                      | Type                  | Description |
| ------------------------------ | --------------------- | ----------- |
| `job_type`                     | `str`                 |             |
| `job_timeout_milliseconds`     | `int` \| `None`       |             |
| `request_timeout_milliseconds` | `int` \| `None`       |             |
| `max_concurrent_jobs`          | `int` \| `None`       |             |
| `fetch_variables`              | list [str ] \| `None` |             |
| `worker_name`                  | `str` \| `None`       |             |

### fetch_variables

```python
fetch_variables: list[str] | None* *= None
```

### job_timeout_milliseconds

```python
job_timeout_milliseconds: int | None* *= None
```

How long the job is reserved for this worker only. Falls back to
`CAMUNDA_WORKER_TIMEOUT` env var if not set.

### job_type

```python
job_type: str
```

Job type to activate and process.

### max_concurrent_jobs

```python
max_concurrent_jobs: int | None* *= None
```

Max jobs executing at once. Falls back to
`CAMUNDA_WORKER_MAX_CONCURRENT_JOBS` env var, then `10`.

### request_timeout_milliseconds

```python
request_timeout_milliseconds: int | None* *= None
```

Long-poll request timeout in milliseconds. Falls back to
`CAMUNDA_WORKER_REQUEST_TIMEOUT` env var, then `0`.

### worker_name

```python
worker_name: str | None* *= None
```

Worker identifier. Falls back to `CAMUNDA_WORKER_NAME` env var,
then `"camunda-python-sdk-worker"`.

### resolve_worker_config()

```python
def resolve_worker_config(config, configuration)
```

Return a new WorkerConfig with `None` fields filled from _configuration_.

Precedence: explicit field value > `CAMUNDA_WORKER_*` config > hardcoded default.
Raises `ValueError` if `job_timeout_milliseconds` is still unset after merging.

**Parameters:**

| Parameter       | Type                          | Description |
| --------------- | ----------------------------- | ----------- |
| `config`        | [WorkerConfig](#workerconfig) |             |
| `configuration` | `Any`                         |             |

- **Return type:**
  [_WorkerConfig_](#workerconfig)

## Configuration Resolver

## CamundaSdkConfigPartial

```python
class CamundaSdkConfigPartial
```

Bases: `TypedDict`

### CAMUNDA_AUTH_STRATEGY

```python
CAMUNDA_AUTH_STRATEGY: Literal['NONE', 'OAUTH', 'BASIC']
```

### CAMUNDA_BASIC_AUTH_PASSWORD

```python
CAMUNDA_BASIC_AUTH_PASSWORD: str
```

### CAMUNDA_BASIC_AUTH_USERNAME

```python
CAMUNDA_BASIC_AUTH_USERNAME: str
```

### CAMUNDA_CLIENT_AUTH_CLIENTID

```python
CAMUNDA_CLIENT_AUTH_CLIENTID: str
```

### CAMUNDA_CLIENT_AUTH_CLIENTSECRET

```python
CAMUNDA_CLIENT_AUTH_CLIENTSECRET: str
```

### CAMUNDA_CLIENT_ID

```python
CAMUNDA_CLIENT_ID: str
```

### CAMUNDA_CLIENT_SECRET

```python
CAMUNDA_CLIENT_SECRET: str
```

### CAMUNDA_LOAD_ENVFILE

```python
CAMUNDA_LOAD_ENVFILE: str
```

### CAMUNDA_MTLS_CA

```python
CAMUNDA_MTLS_CA: str
```

### CAMUNDA_MTLS_CA_PATH

```python
CAMUNDA_MTLS_CA_PATH: str
```

### CAMUNDA_MTLS_CERT

```python
CAMUNDA_MTLS_CERT: str
```

### CAMUNDA_MTLS_CERT_PATH

```python
CAMUNDA_MTLS_CERT_PATH: str
```

### CAMUNDA_MTLS_KEY

```python
CAMUNDA_MTLS_KEY: str
```

### CAMUNDA_MTLS_KEY_PASSPHRASE

```python
CAMUNDA_MTLS_KEY_PASSPHRASE: str
```

### CAMUNDA_MTLS_KEY_PATH

```python
CAMUNDA_MTLS_KEY_PATH: str
```

### CAMUNDA_OAUTH_URL

```python
CAMUNDA_OAUTH_URL: str
```

### CAMUNDA_REST_ADDRESS

```python
CAMUNDA_REST_ADDRESS: str
```

### CAMUNDA_SDK_BACKPRESSURE_PROFILE

```python
CAMUNDA_SDK_BACKPRESSURE_PROFILE: str
```

### CAMUNDA_SDK_LOG_LEVEL

```python
CAMUNDA_SDK_LOG_LEVEL: Literal['silent', 'error', 'warn', 'info', 'debug', 'trace', 'silly']
```

### CAMUNDA_TENANT_ID

```python
CAMUNDA_TENANT_ID: str
```

### CAMUNDA_TENANT_IDS

```python
CAMUNDA_TENANT_IDS: str | list[str]
```

### CAMUNDA_TOKEN_AUDIENCE

```python
CAMUNDA_TOKEN_AUDIENCE: str
```

### CAMUNDA_TOKEN_CACHE_DIR

```python
CAMUNDA_TOKEN_CACHE_DIR: str
```

### CAMUNDA_TOKEN_DISK_CACHE_DISABLE

```python
CAMUNDA_TOKEN_DISK_CACHE_DISABLE: str
```

### CAMUNDA_WORKER_MAX_CONCURRENT_JOBS

```python
CAMUNDA_WORKER_MAX_CONCURRENT_JOBS: str
```

### CAMUNDA_WORKER_NAME

```python
CAMUNDA_WORKER_NAME: str
```

### CAMUNDA_WORKER_REQUEST_TIMEOUT

```python
CAMUNDA_WORKER_REQUEST_TIMEOUT: str
```

### CAMUNDA_WORKER_STARTUP_JITTER_MAX_SECONDS

```python
CAMUNDA_WORKER_STARTUP_JITTER_MAX_SECONDS: str
```

### CAMUNDA_WORKER_TIMEOUT

```python
CAMUNDA_WORKER_TIMEOUT: str
```

### ZEEBE_REST_ADDRESS

```python
ZEEBE_REST_ADDRESS: str
```

## CamundaSdkConfiguration

```python
class CamundaSdkConfiguration(, ZEEBE_REST_ADDRESS='http://localhost:8080/v2', CAMUNDA_REST_ADDRESS='http://localhost:8080/v2', CAMUNDA_TOKEN_AUDIENCE='zeebe.camunda.io', CAMUNDA_OAUTH_URL='https://login.cloud.camunda.io/oauth/token', CAMUNDA_CLIENT_ID=None, CAMUNDA_CLIENT_SECRET=None, CAMUNDA_CLIENT_AUTH_CLIENTID=None, CAMUNDA_CLIENT_AUTH_CLIENTSECRET=None, CAMUNDA_AUTH_STRATEGY='NONE', CAMUNDA_BASIC_AUTH_USERNAME=None, CAMUNDA_BASIC_AUTH_PASSWORD=None, CAMUNDA_SDK_LOG_LEVEL='error', CAMUNDA_TOKEN_CACHE_DIR=None, CAMUNDA_TOKEN_DISK_CACHE_DISABLE=False, CAMUNDA_SDK_BACKPRESSURE_PROFILE='BALANCED', CAMUNDA_TENANT_ID=None, CAMUNDA_TENANT_IDS=None, CAMUNDA_WORKER_TIMEOUT=None, CAMUNDA_WORKER_MAX_CONCURRENT_JOBS=None, CAMUNDA_WORKER_REQUEST_TIMEOUT=None, CAMUNDA_WORKER_NAME=None, CAMUNDA_WORKER_STARTUP_JITTER_MAX_SECONDS=None, CAMUNDA_MTLS_CERT_PATH=None, CAMUNDA_MTLS_KEY_PATH=None, CAMUNDA_MTLS_CA_PATH=None, CAMUNDA_MTLS_CERT=None, CAMUNDA_MTLS_KEY=None, CAMUNDA_MTLS_CA=None, CAMUNDA_MTLS_KEY_PASSPHRASE=None)
```

Bases: `BaseModel`

**Parameters:**

| Parameter                                   | Type                                                                           | Description |
| ------------------------------------------- | ------------------------------------------------------------------------------ | ----------- |
| `ZEEBE_REST_ADDRESS`                        | `str`                                                                          |             |
| `CAMUNDA_REST_ADDRESS`                      | `str`                                                                          |             |
| `CAMUNDA_TOKEN_AUDIENCE`                    | `str`                                                                          |             |
| `CAMUNDA_OAUTH_URL`                         | `str`                                                                          |             |
| `CAMUNDA_CLIENT_ID`                         | `str` \| `None`                                                                |             |
| `CAMUNDA_CLIENT_SECRET`                     | `str` \| `None`                                                                |             |
| `CAMUNDA_CLIENT_AUTH_CLIENTID`              | `str` \| `None`                                                                |             |
| `CAMUNDA_CLIENT_AUTH_CLIENTSECRET`          | `str` \| `None`                                                                |             |
| `CAMUNDA_AUTH_STRATEGY`                     | Literal [ 'NONE' , 'OAUTH' , 'BASIC' ]                                         |             |
| `CAMUNDA_BASIC_AUTH_USERNAME`               | `str` \| `None`                                                                |             |
| `CAMUNDA_BASIC_AUTH_PASSWORD`               | `str` \| `None`                                                                |             |
| `CAMUNDA_SDK_LOG_LEVEL`                     | Literal [ 'silent' , 'error' , 'warn' , 'info' , 'debug' , 'trace' , 'silly' ] |             |
| `CAMUNDA_TOKEN_CACHE_DIR`                   | `str` \| `None`                                                                |             |
| `CAMUNDA_TOKEN_DISK_CACHE_DISABLE`          | `bool`                                                                         |             |
| `CAMUNDA_SDK_BACKPRESSURE_PROFILE`          | Literal [ 'BALANCED' , 'LEGACY' ]                                              |             |
| `CAMUNDA_TENANT_ID`                         | `str` \| `None`                                                                |             |
| `CAMUNDA_TENANT_IDS`                        | list [str ] \| `None`                                                          |             |
| `CAMUNDA_WORKER_TIMEOUT`                    | `int` \| `None`                                                                |             |
| `CAMUNDA_WORKER_MAX_CONCURRENT_JOBS`        | `int` \| `None`                                                                |             |
| `CAMUNDA_WORKER_REQUEST_TIMEOUT`            | `int` \| `None`                                                                |             |
| `CAMUNDA_WORKER_NAME`                       | `str` \| `None`                                                                |             |
| `CAMUNDA_WORKER_STARTUP_JITTER_MAX_SECONDS` | `float` \| `None`                                                              |             |
| `CAMUNDA_MTLS_CERT_PATH`                    | `str` \| `None`                                                                |             |
| `CAMUNDA_MTLS_KEY_PATH`                     | `str` \| `None`                                                                |             |
| `CAMUNDA_MTLS_CA_PATH`                      | `str` \| `None`                                                                |             |
| `CAMUNDA_MTLS_CERT`                         | `str` \| `None`                                                                |             |
| `CAMUNDA_MTLS_KEY`                          | `str` \| `None`                                                                |             |
| `CAMUNDA_MTLS_CA`                           | `str` \| `None`                                                                |             |
| `CAMUNDA_MTLS_KEY_PASSPHRASE`               | `str` \| `None`                                                                |             |

### CAMUNDA_AUTH_STRATEGY

```python
CAMUNDA_AUTH_STRATEGY: CamundaAuthStrategy
```

### CAMUNDA_BASIC_AUTH_PASSWORD

```python
CAMUNDA_BASIC_AUTH_PASSWORD: str | None
```

### CAMUNDA_BASIC_AUTH_USERNAME

```python
CAMUNDA_BASIC_AUTH_USERNAME: str | None
```

### CAMUNDA_CLIENT_AUTH_CLIENTID

```python
CAMUNDA_CLIENT_AUTH_CLIENTID: str | None
```

### CAMUNDA_CLIENT_AUTH_CLIENTSECRET

```python
CAMUNDA_CLIENT_AUTH_CLIENTSECRET: str | None
```

### CAMUNDA_CLIENT_ID

```python
CAMUNDA_CLIENT_ID: str | None
```

### CAMUNDA_CLIENT_SECRET

```python
CAMUNDA_CLIENT_SECRET: str | None
```

### CAMUNDA_MTLS_CA

```python
CAMUNDA_MTLS_CA: str | None
```

### CAMUNDA_MTLS_CA_PATH

```python
CAMUNDA_MTLS_CA_PATH: str | None
```

### CAMUNDA_MTLS_CERT

```python
CAMUNDA_MTLS_CERT: str | None
```

### CAMUNDA_MTLS_CERT_PATH

```python
CAMUNDA_MTLS_CERT_PATH: str | None
```

### CAMUNDA_MTLS_KEY

```python
CAMUNDA_MTLS_KEY: str | None
```

### CAMUNDA_MTLS_KEY_PASSPHRASE

```python
CAMUNDA_MTLS_KEY_PASSPHRASE: str | None
```

### CAMUNDA_MTLS_KEY_PATH

```python
CAMUNDA_MTLS_KEY_PATH: str | None
```

### CAMUNDA_OAUTH_URL

```python
CAMUNDA_OAUTH_URL: str
```

### CAMUNDA_REST_ADDRESS

```python
CAMUNDA_REST_ADDRESS: str
```

### CAMUNDA_SDK_BACKPRESSURE_PROFILE

```python
CAMUNDA_SDK_BACKPRESSURE_PROFILE: CamundaBackpressureProfile
```

### CAMUNDA_SDK_LOG_LEVEL

```python
CAMUNDA_SDK_LOG_LEVEL: CamundaSdkLogLevel
```

### CAMUNDA_TENANT_ID

```python
CAMUNDA_TENANT_ID: str | None
```

### CAMUNDA_TENANT_IDS

```python
CAMUNDA_TENANT_IDS: list[str] | None
```

### CAMUNDA_TOKEN_AUDIENCE

```python
CAMUNDA_TOKEN_AUDIENCE: str
```

### CAMUNDA_TOKEN_CACHE_DIR

```python
CAMUNDA_TOKEN_CACHE_DIR: str | None
```

### CAMUNDA_TOKEN_DISK_CACHE_DISABLE

```python
CAMUNDA_TOKEN_DISK_CACHE_DISABLE: bool
```

### CAMUNDA_WORKER_MAX_CONCURRENT_JOBS

```python
CAMUNDA_WORKER_MAX_CONCURRENT_JOBS: int | None
```

### CAMUNDA_WORKER_NAME

```python
CAMUNDA_WORKER_NAME: str | None
```

### CAMUNDA_WORKER_REQUEST_TIMEOUT

```python
CAMUNDA_WORKER_REQUEST_TIMEOUT: int | None
```

### CAMUNDA_WORKER_STARTUP_JITTER_MAX_SECONDS

```python
CAMUNDA_WORKER_STARTUP_JITTER_MAX_SECONDS: float | None
```

### CAMUNDA_WORKER_TIMEOUT

```python
CAMUNDA_WORKER_TIMEOUT: int | None
```

### ZEEBE_REST_ADDRESS

```python
ZEEBE_REST_ADDRESS: str
```

### model_config _= {'extra': 'forbid'}_

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

## ConfigurationResolver

```python
class ConfigurationResolver(environment, explicit_configuration=None)
```

Bases: `object`

Resolves an effective configuration from environment + explicit overrides.

**Parameters:**

| Parameter                | Type                                                                                  | Description |
| ------------------------ | ------------------------------------------------------------------------------------- | ----------- |
| `environment`            | [CamundaSdkConfigPartial](#camundasdkconfigpartial) \| Mapping [str , Any ]           |             |
| `explicit_configuration` | [CamundaSdkConfigPartial](#camundasdkconfigpartial) \| Mapping [str , Any ] \| `None` |             |

### resolve()

```python
def resolve()
```

- **Return type:**
  [_ResolvedCamundaSdkConfiguration_](#resolvedcamundasdkconfiguration)

## ResolvedCamundaSdkConfiguration

```python
class ResolvedCamundaSdkConfiguration(effective: 'CamundaSdkConfiguration', environment: 'CamundaSdkConfigPartial', explicit: 'CamundaSdkConfigPartial | None')
```

Bases: `object`

**Parameters:**

| Parameter     | Type                                                          | Description |
| ------------- | ------------------------------------------------------------- | ----------- |
| `effective`   | [CamundaSdkConfiguration](#camundasdkconfiguration)           |             |
| `environment` | [CamundaSdkConfigPartial](#camundasdkconfigpartial)           |             |
| `explicit`    | [CamundaSdkConfigPartial](#camundasdkconfigpartial) \| `None` |             |

### effective

```python
effective: [CamundaSdkConfiguration](#camundasdkconfiguration)
```

### environment

```python
environment: [CamundaSdkConfigPartial](#camundasdkconfigpartial)
```

### explicit

```python
explicit: [CamundaSdkConfigPartial](#camundasdkconfigpartial) | None
```

### read_environment()

```python
def read_environment(environ=None)
```

- **Parameters:**
  **environ** (_Mapping_ _[__str_ _,_ _str_ _]_ _|_ _None_)
- **Return type:**
  [_CamundaSdkConfigPartial_](#camundasdkconfigpartial)
