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
class AsyncAuthProvider(\*args, \*\*kwargs)
```

Bases: `Protocol`

Async auth provider variant.

If an auth provider implements this protocol, async clients will prefer it.

### aget_headers()

```python
async def aget_headers()
```

* **Return type:**
  *Mapping*[str, str]

## AsyncOAuthClientCredentialsAuthProvider

```python
class AsyncOAuthClientCredentialsAuthProvider(, oauth_url, client_id, client_secret, audience, cache_dir=None, disk_cache_disable=False, saas_401_cooldown_s=30.0, transport=None, timeout=None, logger=None)
```

Bases: `object`

OAuth 2.0 Client Credentials provider with in-memory caching.

This is designed for async clients.

* **Parameters:**
  * **oauth_url** (*str*)
  * **client_id** (*str*)
  * **client_secret** (*str*)
  * **audience** (*str*)
  * **cache_dir** (*str* *|* *None*)
  * **disk_cache_disable** (*bool*)
  * **saas_401_cooldown_s** (*float*)
  * **transport** (*httpx.AsyncBaseTransport* *|* *None*)
  * **timeout** (*float* *|* *None*)
  * **logger** ([*SdkLogger*](#sdklogger) *|* *None*)

### aclose()

```python
async def aclose()
```

Close the underlying async HTTP client used for token requests.

* **Return type:**
  None

### aget_headers()

```python
async def aget_headers()
```

* **Return type:**
  *Mapping*[str, str]

### get_headers()

```python
def get_headers()
```

Sync fallback satisfying the `AuthProvider` protocol.

Returns cached token headers if a valid token is already held,
otherwise returns empty headers (the next async request hook will
call `aget_headers` to fetch a fresh token).

* **Return type:**
  *Mapping*[str, str]

## AuthProvider

```python
class AuthProvider(\*args, \*\*kwargs)
```

Bases: `Protocol`

Provides per-request authentication headers.

Implementations are expected to be lightweight and safe to call for every request.

### get_headers()

```python
def get_headers()
```

* **Return type:**
  *Mapping*[str, str]

## BasicAuthProvider

```python
class BasicAuthProvider(, username, password)
```

Bases: `object`

HTTP Basic auth provider.

* **Parameters:**
  * **username** (*str*)
  * **password** (*str*)

### get_headers()

```python
def get_headers()
```

* **Return type:**
  *Mapping*[str, str]

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

* **Return type:**
  dict[str, str]

## OAuthClientCredentialsAuthProvider

```python
class OAuthClientCredentialsAuthProvider(, oauth_url, client_id, client_secret, audience, cache_dir=None, disk_cache_disable=False, saas_401_cooldown_s=30.0, transport=None, timeout=None, logger=None)
```

Bases: `object`

OAuth 2.0 Client Credentials provider with in-memory caching.

This is designed for sync clients.

* **Parameters:**
  * **oauth_url** (*str*)
  * **client_id** (*str*)
  * **client_secret** (*str*)
  * **audience** (*str*)
  * **cache_dir** (*str* *|* *None*)
  * **disk_cache_disable** (*bool*)
  * **saas_401_cooldown_s** (*float*)
  * **transport** (*httpx.BaseTransport* *|* *None*)
  * **timeout** (*float* *|* *None*)
  * **logger** ([*SdkLogger*](#sdklogger) *|* *None*)

### close()

```python
def close()
```

Close the underlying HTTP client used for token requests.

Call this when the application is shutting down if you created a provider
instance yourself (or if you want deterministic cleanup in tests).

* **Return type:**
  None

### get_headers()

```python
def get_headers()
```

* **Return type:**
  *Mapping*[str, str]

### inject_auth_event_hooks()

```python
def inject_auth_event_hooks(httpx_args, auth_provider, , async_client=False, log_level=None, logger=None)
```

Return a copy of httpx_args with a request hook that applies auth headers.

This uses httpx event hooks so we don’t have to inject headers in every generated API call.

* **Parameters:**
  * **httpx_args** (*dict* *[**str* *,* *Any* *]*  *|* *None*)
  * **auth_provider** (*object*)
  * **async_client** (*bool*)
  * **log_level** (*str* *|* *None*)
  * **logger** ([*SdkLogger*](#sdklogger) *|* *None*)
* **Return type:**
  dict[str, *Any*]

## Logging

Pluggable logger abstraction for the Camunda SDK.

Users can inject any logger that implements [`CamundaLogger`](#camundalogger) (stdlib
`logging.Logger`, `loguru.logger`, or a custom object with
`debug`/`info`/`warning`/`error` methods).

When no logger is provided, loguru is used if installed, otherwise logging is
silently disabled.

## CamundaLogger

```python
class CamundaLogger(\*args, \*\*kwargs)
```

Bases: `Protocol`

Protocol for a logger injectable into the SDK.

Compatible with Python’s `logging.Logger`, `loguru.logger`, or any
object that exposes these four methods.

### debug()

```python
def debug(msg, \*args, \*\*kwargs)
```

* **Parameters:**
  * **msg** (*str*)
  * **args** (*Any*)
  * **kwargs** (*Any*)
* **Return type:**
  None

### error()

```python
def error(msg, \*args, \*\*kwargs)
```

* **Parameters:**
  * **msg** (*str*)
  * **args** (*Any*)
  * **kwargs** (*Any*)
* **Return type:**
  None

### info()

```python
def info(msg, \*args, \*\*kwargs)
```

* **Parameters:**
  * **msg** (*str*)
  * **args** (*Any*)
  * **kwargs** (*Any*)
* **Return type:**
  None

### warning()

```python
def warning(msg, \*args, \*\*kwargs)
```

* **Parameters:**
  * **msg** (*str*)
  * **args** (*Any*)
  * **kwargs** (*Any*)
* **Return type:**
  None

## NullLogger

```python
class NullLogger
```

Bases: `object`

Logger that silently discards all messages.

### debug()

```python
def debug(msg, \*args, \*\*kwargs)
```

* **Parameters:**
  * **msg** (*str*)
  * **args** (*Any*)
  * **kwargs** (*Any*)
* **Return type:**
  None

### error()

```python
def error(msg, \*args, \*\*kwargs)
```

* **Parameters:**
  * **msg** (*str*)
  * **args** (*Any*)
  * **kwargs** (*Any*)
* **Return type:**
  None

### info()

```python
def info(msg, \*args, \*\*kwargs)
```

* **Parameters:**
  * **msg** (*str*)
  * **args** (*Any*)
  * **kwargs** (*Any*)
* **Return type:**
  None

### trace()

```python
def trace(msg, \*args, \*\*kwargs)
```

* **Parameters:**
  * **msg** (*str*)
  * **args** (*Any*)
  * **kwargs** (*Any*)
* **Return type:**
  None

### warning()

```python
def warning(msg, \*args, \*\*kwargs)
```

* **Parameters:**
  * **msg** (*str*)
  * **args** (*Any*)
  * **kwargs** (*Any*)
* **Return type:**
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

* **Parameters:**
  * **logger** ([*CamundaLogger*](#camundalogger))
  * **prefix** (*str*)

### bind()

```python
def bind(\*\*kwargs)
```

Create a child logger with additional context.

If the underlying logger supports `bind()` (e.g. loguru), the native
method is used.  Otherwise context is rendered as a `[k=v ...]`
prefix on each message.

* **Parameters:**
  **kwargs** (*str*)
* **Return type:**
  [*SdkLogger*](#sdklogger)

### debug()

```python
def debug(msg)
```

* **Parameters:**
  **msg** (*str*)
* **Return type:**
  None

### error()

```python
def error(msg)
```

* **Parameters:**
  **msg** (*str*)
* **Return type:**
  None

### info()

```python
def info(msg)
```

* **Parameters:**
  **msg** (*str*)
* **Return type:**
  None

### trace()

```python
def trace(msg)
```

* **Parameters:**
  **msg** (*str*)
* **Return type:**
  None

### warning()

```python
def warning(msg)
```

* **Parameters:**
  **msg** (*str*)
* **Return type:**
  None

### create_logger()

```python
def create_logger(logger=None)
```

Create an [`SdkLogger`](#sdklogger).

* **Parameters:**
  **logger** ([*CamundaLogger*](#camundalogger) *|* *None*) – A user-supplied logger.  When `None`, loguru is used if installed,
  otherwise a [`NullLogger`](#nulllogger) is used.
* **Return type:**
  [*SdkLogger*](#sdklogger)

## Job Worker

## ExecutionHint

```python
class ExecutionHint
```

Bases: `object`

Decorators for users to hint at their workload execution potential

### *static* permit(strategy)

* **Parameters:**
  **strategy** (*Literal* *[* *'thread'* *,*  *'process'* *,*  *'async'* *]*)
* **Return type:**
  *Callable*[[*Callable*[[…], *Any*]], [*HintedCallable*](#hintedcallable)]

### *static* prefer(strategy)

* **Parameters:**
  **strategy** (*Literal* *[* *'thread'* *,*  *'process'* *,*  *'async'* *]*)
* **Return type:**
  *Callable*[[*Callable*[[…], *Any*]], [*HintedCallable*](#hintedcallable)]

## HintedCallable

```python
class HintedCallable(\*args, \*\*kwargs)
```

Bases: `Protocol`

## JobContext

```python
class JobContext(type_, process_definition_id, process_definition_version, element_id, custom_headers, worker, retries, deadline, variables, tenant_id, job_key, process_instance_key, process_definition_key, element_instance_key, kind, listener_event_type, user_task=<camunda_orchestration_sdk.types.Unset object>, tags=<camunda_orchestration_sdk.types.Unset object>, log=NOTHING)
```

Bases: `ActivateJobsJobsItem`

Read-only context for a job execution.

* **Parameters:**
  * **type_** (*str*)
  * **process_definition_id** (*ProcessDefinitionId*)
  * **process_definition_version** (*int*)
  * **element_id** (*ElementId*)
  * **custom_headers** (*ActivatedJobResultCustomHeaders*)
  * **worker** (*str*)
  * **retries** (*int*)
  * **deadline** (*int*)
  * **variables** (*ActivatedJobResultVariables*)
  * **tenant_id** (*TenantId*)
  * **job_key** (*JobKey*)
  * **process_instance_key** (*ProcessInstanceKey*)
  * **process_definition_key** (*ProcessDefinitionKey*)
  * **element_instance_key** (*ElementInstanceKey*)
  * **kind** (*JobKindEnum*)
  * **listener_event_type** (*JobListenerEventTypeEnum*)
  * **user_task** (*UserTaskProperties* *|* *Unset*)
  * **tags** (*list* *[**str* *]*  *|* *Unset*)
  * **log** ([*SdkLogger*](#sdklogger))

### log

A scoped logger bound to this job’s context (job type, job key).
Use `job.log.info(...)` etc. inside your handler to emit
structured log messages.

* **Type:**
  [SdkLogger](#sdklogger)

### *classmethod* from_job(job, logger=None)

* **Parameters:**
  * **job** (*ActivateJobsJobsItem*)
  * **logger** ([*SdkLogger*](#sdklogger) *|* *None*)
* **Return type:**
  [*JobContext*](#jobcontext)

### log

```python
log: [SdkLogger](#sdklogger)
```

### *exception* JobError(error_code, message='')

Bases: `Exception`

Raise this exception to throw a BPMN error.

* **Parameters:**
  * **error_code** (*str*)
  * **message** (*str*)

### *exception* JobFailure(message, retries=None, retry_back_off=0)

Bases: `Exception`

Raise this exception to explicitly fail a job with custom retries/backoff.

* **Parameters:**
  * **message** (*str*)
  * **retries** (*int* *|* *None*)
  * **retry_back_off** (*int*)

## JobWorker

```python
class JobWorker(client, callback, config, logger=None)
```

Bases: `object`

* **Parameters:**
  * **client** ([*CamundaAsyncClient*](async-client.md#camunda_orchestration_sdk.CamundaAsyncClient))
  * **callback** (*JobHandler*)
  * **config** ([*WorkerConfig*](#workerconfig))
  * **logger** ([*SdkLogger*](#sdklogger) *|* *None*)

### poll_loop()

```python
async def poll_loop()
```

Background polling loop - always async

### start()

```python
def start()
```

### stop()

```python
def stop()
```

## WorkerConfig

```python
class WorkerConfig(job_type, job_timeout_milliseconds, request_timeout_milliseconds=0, max_concurrent_jobs=10, execution_strategy='auto', fetch_variables=None, worker_name='camunda-python-sdk-worker')
```

Bases: `object`

User-facing configuration

* **Parameters:**
  * **job_type** (*str*)
  * **job_timeout_milliseconds** (*int*)
  * **request_timeout_milliseconds** (*int*)
  * **max_concurrent_jobs** (*int*)
  * **execution_strategy** (*Literal* *[* *'thread'* *,*  *'process'* *,*  *'async'* *,*  *'auto'* *]*)
  * **fetch_variables** (*list* *[**str* *]*  *|* *None*)
  * **worker_name** (*str*)

### execution_strategy

```python
execution_strategy: Literal['thread', 'process', 'async', 'auto']* *= 'auto'
```

### fetch_variables

```python
fetch_variables: list[str] | None* *= None
```

### job_timeout_milliseconds

```python
job_timeout_milliseconds: int
```

Long-poll request timeout in milliseconds. Defaults to 0, which allows the server to set the request timeout

### job_type

```python
job_type: str
```

How long the job is reserved for this worker only

### max_concurrent_jobs

```python
max_concurrent_jobs: int* *= 10
```

### request_timeout_milliseconds

```python
request_timeout_milliseconds: int* *= 0
```

### worker_name

```python
worker_name: str* *= 'camunda-python-sdk-worker'
```

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

### CAMUNDA_OAUTH_URL

```python
CAMUNDA_OAUTH_URL: str
```

### CAMUNDA_REST_ADDRESS

```python
CAMUNDA_REST_ADDRESS: str
```

### CAMUNDA_SDK_LOG_LEVEL

```python
CAMUNDA_SDK_LOG_LEVEL: Literal['silent', 'error', 'warn', 'info', 'debug', 'trace', 'silly']
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
CAMUNDA_TOKEN_DISK_CACHE_DISABLE: bool
```

### ZEEBE_REST_ADDRESS

```python
ZEEBE_REST_ADDRESS: str
```

## CamundaSdkConfiguration

```python
class CamundaSdkConfiguration(, ZEEBE_REST_ADDRESS='http://localhost:8080/v2', CAMUNDA_REST_ADDRESS='http://localhost:8080/v2', CAMUNDA_TOKEN_AUDIENCE='zeebe.camunda.io', CAMUNDA_OAUTH_URL='https://login.cloud.camunda.io/oauth/token', CAMUNDA_CLIENT_ID=None, CAMUNDA_CLIENT_SECRET=None, CAMUNDA_CLIENT_AUTH_CLIENTID=None, CAMUNDA_CLIENT_AUTH_CLIENTSECRET=None, CAMUNDA_AUTH_STRATEGY='NONE', CAMUNDA_BASIC_AUTH_USERNAME=None, CAMUNDA_BASIC_AUTH_PASSWORD=None, CAMUNDA_SDK_LOG_LEVEL='error', CAMUNDA_TOKEN_CACHE_DIR=None, CAMUNDA_TOKEN_DISK_CACHE_DISABLE=False)
```

Bases: `BaseModel`

* **Parameters:**
  * **ZEEBE_REST_ADDRESS** (*str*)
  * **CAMUNDA_REST_ADDRESS** (*str*)
  * **CAMUNDA_TOKEN_AUDIENCE** (*str*)
  * **CAMUNDA_OAUTH_URL** (*str*)
  * **CAMUNDA_CLIENT_ID** (*str* *|* *None*)
  * **CAMUNDA_CLIENT_SECRET** (*str* *|* *None*)
  * **CAMUNDA_CLIENT_AUTH_CLIENTID** (*str* *|* *None*)
  * **CAMUNDA_CLIENT_AUTH_CLIENTSECRET** (*str* *|* *None*)
  * **CAMUNDA_AUTH_STRATEGY** (*Literal* *[* *'NONE'* *,*  *'OAUTH'* *,*  *'BASIC'* *]*)
  * **CAMUNDA_BASIC_AUTH_USERNAME** (*str* *|* *None*)
  * **CAMUNDA_BASIC_AUTH_PASSWORD** (*str* *|* *None*)
  * **CAMUNDA_SDK_LOG_LEVEL** (*Literal* *[* *'silent'* *,*  *'error'* *,*  *'warn'* *,*  *'info'* *,*  *'debug'* *,*  *'trace'* *,*  *'silly'* *]*)
  * **CAMUNDA_TOKEN_CACHE_DIR** (*str* *|* *None*)
  * **CAMUNDA_TOKEN_DISK_CACHE_DISABLE** (*bool*)

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

### CAMUNDA_OAUTH_URL

```python
CAMUNDA_OAUTH_URL: str
```

### CAMUNDA_REST_ADDRESS

```python
CAMUNDA_REST_ADDRESS: str
```

### CAMUNDA_SDK_LOG_LEVEL

```python
CAMUNDA_SDK_LOG_LEVEL: CamundaSdkLogLevel
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

### ZEEBE_REST_ADDRESS

```python
ZEEBE_REST_ADDRESS: str
```

### model_config *= {'extra': 'forbid'}*

Configuration for the model, should be a dictionary conforming to [ConfigDict][pydantic.config.ConfigDict].

## ConfigurationResolver

```python
class ConfigurationResolver(environment, explicit_configuration=None)
```

Bases: `object`

Resolves an effective configuration from environment + explicit overrides.

* **Parameters:**
  * **environment** ([*CamundaSdkConfigPartial*](#camundasdkconfigpartial) *|* *Mapping* *[**str* *,* *Any* *]*)
  * **explicit_configuration** ([*CamundaSdkConfigPartial*](#camundasdkconfigpartial) *|* *Mapping* *[**str* *,* *Any* *]*  *|* *None*)

### resolve()

```python
def resolve()
```

* **Return type:**
  [*ResolvedCamundaSdkConfiguration*](#resolvedcamundasdkconfiguration)

## ResolvedCamundaSdkConfiguration

```python
class ResolvedCamundaSdkConfiguration(effective: 'CamundaSdkConfiguration', environment: 'CamundaSdkConfigPartial', explicit: 'CamundaSdkConfigPartial | None')
```

Bases: `object`

* **Parameters:**
  * **effective** ([*CamundaSdkConfiguration*](#camundasdkconfiguration))
  * **environment** ([*CamundaSdkConfigPartial*](#camundasdkconfigpartial))
  * **explicit** ([*CamundaSdkConfigPartial*](#camundasdkconfigpartial) *|* *None*)

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

* **Parameters:**
  **environ** (*Mapping* *[**str* *,* *str* *]*  *|* *None*)
* **Return type:**
  [*CamundaSdkConfigPartial*](#camundasdkconfigpartial)
