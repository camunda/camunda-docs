---
id: python-sdk
title: Python SDK
sidebar_label: Python SDK
mdx:
  format: md
---

# Camunda Orchestration Cluster API – Python SDK

A fully typed Python client for the [Camunda 8 Orchestration Cluster REST API](../../apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md). Generated from the upstream OpenAPI spec with hand-written runtime infrastructure for authentication, configuration, and job workers.

- **Sync and async** — `CamundaClient` (synchronous) and `CamundaAsyncClient` (async/await)
- **Strict typing** — pyright-strict compatible with PEP 561 `py.typed` marker
- **Zero-config** — reads `CAMUNDA_*` environment variables (12-factor style)
- **Job workers** — long-poll workers with thread, process, or async execution strategies
- **OAuth & Basic auth** — pluggable authentication with automatic token management
- **Pluggable logging** — inject your own logger (stdlib `logging`, loguru, or custom)

## Installing the SDK to your project

### Requirements

- Python 3.10 or later

### Stable release (recommended for production)

The stable version tracks the latest supported Camunda server release. The first stable release will be **8.9.0**.

```bash
pip install camunda-orchestration-sdk
```

### Pre-release / dev channel

Pre-release versions (e.g. `8.9.0.dev2`) are published from the `main` branch and contain the latest changes targeting the next server minor version. Use these to preview upcoming features or validate your integration ahead of a stable release.

```bash
# pip
pip install --pre camunda-orchestration-sdk

# pin to a specific pre-release
pip install camunda-orchestration-sdk==8.9.0.dev2
```

In a `requirements.txt`:

```text
camunda-orchestration-sdk>=8.9.0.dev1
```

> **Note:** Pre-release versions may contain breaking changes between builds. Pin to a specific version if you need reproducible builds.

### Versioning

This SDK does **not** follow traditional semver. The **major.minor** version tracks the Camunda server version, so you can easily match the SDK to your deployment target (e.g. SDK `8.9.x` targets Camunda `8.9`).

**Patch releases** contain fixes, features, and occasionally **breaking type changes**. A breaking type change typically means an upstream API definition fix that corrects the shape of a request or response model — your code may stop type-checking even though it worked before.

When this happens, we signal it in the [CHANGELOG](https://github.com/camunda/orchestration-cluster-api-python/releases).

**Recommended approach:**

- **Ride the latest** — accept that types may shift and update your code when it happens. This keeps you on the most accurate API surface.
- **Pin and review** — pin to a specific patch version and review the [CHANGELOG](https://github.com/camunda/orchestration-cluster-api-python/releases) before upgrading:

  ```text
  camunda-orchestration-sdk==8.9.3
  ```

### Using the generated SDK

The SDK provides two clients with identical API surfaces:

- **`CamundaClient`** — synchronous. Every method blocks until the response arrives. Use this in scripts, CLI tools, Django views, Flask handlers, or anywhere you don't have an async event loop.
- **`CamundaAsyncClient`** — asynchronous (`async`/`await`). Every method is a coroutine. Use this in FastAPI, aiohttp, or any `asyncio`-based application. **Job workers require `CamundaAsyncClient`** because they use `asyncio` for long-polling and concurrent job execution.

Both clients share the same method names and parameters — the only difference is calling convention:

```python
# Sync
from camunda_orchestration_sdk import CamundaClient

with CamundaClient() as client:
    topology = client.get_topology()
```

```python
# Async
import asyncio
from camunda_orchestration_sdk import CamundaAsyncClient

async def main():
    async with CamundaAsyncClient() as client:
        topology = await client.get_topology()

asyncio.run(main())
```

> **Which one should I use?** If your application already uses `asyncio` (FastAPI, aiohttp, etc.) or you need job workers, use `CamundaAsyncClient`. Otherwise, `CamundaClient` is simpler and works everywhere.

#### Quick start (Zero-config – recommended)

Keep configuration out of application code. Let the client read `CAMUNDA_*` variables from the environment (12-factor style). This makes secret rotation, environment promotion (dev → staging → prod), and operational tooling (vaults / secret managers) safer and simpler.

If no configuration is present, the SDK defaults to a local Camunda 8 Run-style endpoint at `http://localhost:8080/v2`.

```python
from camunda_orchestration_sdk import CamundaClient, CamundaAsyncClient

# Zero-config construction: reads CAMUNDA_* from the environment
client = CamundaClient()
async_client = CamundaAsyncClient()
```

Typical `.env` (example):

```bash
CAMUNDA_REST_ADDRESS=https://cluster.example/v2
CAMUNDA_AUTH_STRATEGY=OAUTH
CAMUNDA_CLIENT_ID=***
CAMUNDA_CLIENT_SECRET=***
```

#### Advanced: Programmatic configuration (use sparingly)

Only use `configuration={...}` when you must supply or mutate configuration dynamically (e.g. tests, multi-tenant routing, or ephemeral preview environments). Keys mirror their `CAMUNDA_*` environment names.

```python
from camunda_orchestration_sdk import CamundaClient

client = CamundaClient(
    configuration={
        "CAMUNDA_REST_ADDRESS": "http://localhost:8080/v2",
        "CAMUNDA_AUTH_STRATEGY": "NONE",
    }
)
```

#### Loading configuration from a `.env` file (`CAMUNDA_LOAD_ENVFILE`)

The SDK can optionally load configuration values from a dotenv file.

- Set `CAMUNDA_LOAD_ENVFILE=true` (or `1` / `yes`) to load `.env` from the current working directory.
- Set `CAMUNDA_LOAD_ENVFILE=/path/to/file.env` to load from an explicit path.
- If the file does not exist, it is silently ignored.
- Precedence is: `.env` < environment variables < explicit `configuration={...}` passed to the client.
- The resolver reads dotenv values without mutating `os.environ`.

Example `.env`:

```bash
CAMUNDA_REST_ADDRESS=http://localhost:8080/v2
CAMUNDA_CLIENT_ID=your-client-id
CAMUNDA_CLIENT_SECRET=your-client-secret
```

Enable loading from the current directory:

```bash
export CAMUNDA_LOAD_ENVFILE=true
python your_script.py
```

Or enable loading from a specific file:

```bash
export CAMUNDA_LOAD_ENVFILE=~/camunda/dev.env
python your_script.py
```

You can also enable it via the explicit configuration dict:

```python
from camunda_orchestration_sdk import CamundaClient

client = CamundaClient(configuration={"CAMUNDA_LOAD_ENVFILE": "true"})
```

## Authentication

The SDK supports three authentication strategies, controlled by `CAMUNDA_AUTH_STRATEGY`:

| Strategy | When to use                                               |
| -------- | --------------------------------------------------------- |
| `NONE`   | Local development with unauthenticated Camunda (default)  |
| `OAUTH`  | Camunda SaaS or any OAuth 2.0 Client Credentials endpoint |
| `BASIC`  | Self-Managed Camunda with Basic auth (username/password)  |

### Auto-detection

If you omit `CAMUNDA_AUTH_STRATEGY`, the SDK infers it from the credentials you provide:

- Only `CAMUNDA_CLIENT_ID` + `CAMUNDA_CLIENT_SECRET` → **OAUTH**
- Only `CAMUNDA_BASIC_AUTH_USERNAME` + `CAMUNDA_BASIC_AUTH_PASSWORD` → **BASIC**
- No credentials → **NONE**
- Both OAuth and Basic credentials present → **error** (set `CAMUNDA_AUTH_STRATEGY` explicitly)

### OAuth 2.0

```bash
CAMUNDA_REST_ADDRESS=https://cluster.example/v2
CAMUNDA_AUTH_STRATEGY=OAUTH
CAMUNDA_CLIENT_ID=your-client-id
CAMUNDA_CLIENT_SECRET=your-client-secret
# Optional:
# CAMUNDA_OAUTH_URL=https://login.cloud.camunda.io/oauth/token
# CAMUNDA_TOKEN_AUDIENCE=zeebe.camunda.io
```

### Basic authentication

```bash
CAMUNDA_REST_ADDRESS=http://localhost:8080/v2
CAMUNDA_AUTH_STRATEGY=BASIC
CAMUNDA_BASIC_AUTH_USERNAME=your-username
CAMUNDA_BASIC_AUTH_PASSWORD=your-password
```

Or programmatically:

```python
from camunda_orchestration_sdk import CamundaClient

client = CamundaClient(
    configuration={
        "CAMUNDA_REST_ADDRESS": "http://localhost:8080/v2",
        "CAMUNDA_AUTH_STRATEGY": "BASIC",
        "CAMUNDA_BASIC_AUTH_USERNAME": "your-username",
        "CAMUNDA_BASIC_AUTH_PASSWORD": "your-password",
    }
)
```

## Configuration reference

All `CAMUNDA_*` environment variables recognised by the SDK. These can also be passed as keys in the `configuration={...}` dict.

<!-- BEGIN_CONFIG_REFERENCE -->

| Variable                           | Default                                      | Description                                                                                |
| ---------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `ZEEBE_REST_ADDRESS`               | `http://localhost:8080/v2`                   | REST API base URL (alias for CAMUNDA_REST_ADDRESS).                                        |
| `CAMUNDA_REST_ADDRESS`             | `http://localhost:8080/v2`                   | REST API base URL. `/v2` is appended automatically if missing.                             |
| `CAMUNDA_TOKEN_AUDIENCE`           | `zeebe.camunda.io`                           | OAuth token audience.                                                                      |
| `CAMUNDA_OAUTH_URL`                | `https://login.cloud.camunda.io/oauth/token` | OAuth token endpoint URL.                                                                  |
| `CAMUNDA_CLIENT_ID`                | —                                            | OAuth client ID.                                                                           |
| `CAMUNDA_CLIENT_SECRET`            | —                                            | OAuth client secret.                                                                       |
| `CAMUNDA_CLIENT_AUTH_CLIENTID`     | —                                            | Alias for CAMUNDA_CLIENT_ID.                                                               |
| `CAMUNDA_CLIENT_AUTH_CLIENTSECRET` | —                                            | Alias for CAMUNDA_CLIENT_SECRET.                                                           |
| `CAMUNDA_AUTH_STRATEGY`            | `NONE`                                       | Authentication strategy: NONE, OAUTH, or BASIC. Auto-inferred from credentials if omitted. |
| `CAMUNDA_BASIC_AUTH_USERNAME`      | —                                            | Basic auth username. Required when CAMUNDA_AUTH_STRATEGY=BASIC.                            |
| `CAMUNDA_BASIC_AUTH_PASSWORD`      | —                                            | Basic auth password. Required when CAMUNDA_AUTH_STRATEGY=BASIC.                            |
| `CAMUNDA_SDK_LOG_LEVEL`            | `error`                                      | SDK log level: silent, error, warn, info, debug, trace, or silly.                          |
| `CAMUNDA_TOKEN_CACHE_DIR`          | —                                            | Directory for OAuth token disk cache. Disabled if unset.                                   |
| `CAMUNDA_TOKEN_DISK_CACHE_DISABLE` | `false`                                      | Disable OAuth token disk caching.                                                          |
| `CAMUNDA_LOAD_ENVFILE`             | —                                            | Load configuration from a `.env` file. Set to `true` (or a file path).                     |

<!-- END_CONFIG_REFERENCE -->

## Deploying Resources

Deploy BPMN, DMN, or Form files from disk:

```python
from camunda_orchestration_sdk import CamundaClient

with CamundaClient() as client:
    result = client.deploy_resources_from_files(["process.bpmn", "decision.dmn"])

    print(f"Deployment key: {result.deployment_key}")
    for process in result.processes:
        print(f"  Process: {process.process_definition_id} (key: {process.process_definition_key})")
```

## Creating a Process Instance

The recommended pattern is to obtain keys from a prior API response (e.g. a deployment) and pass them directly — no manual lifting needed:

```python
from camunda_orchestration_sdk import CamundaClient
from camunda_orchestration_sdk.models.process_creation_by_key import ProcessCreationByKey

with CamundaClient() as client:
    # Deploy and capture the typed key
    deployment = client.deploy_resources_from_files(["process.bpmn"])
    process_key = deployment.processes[0].process_definition_key

    # Use it directly — the type flows through without conversion
    result = client.create_process_instance(
        data=ProcessCreationByKey(process_definition_key=process_key)
    )
    print(f"Process instance key: {result.process_instance_key}")
```

If you need to restore a key from external storage (database, message queue, config file), wrap the raw string with the semantic type constructor:

```python
from camunda_orchestration_sdk import CamundaClient, ProcessDefinitionKey
from camunda_orchestration_sdk.models.process_creation_by_key import ProcessCreationByKey

with CamundaClient() as client:
    stored_key = "2251799813685249"  # from a DB row or config
    result = client.create_process_instance(
        data=ProcessCreationByKey(process_definition_key=ProcessDefinitionKey(stored_key))
    )
    print(f"Process instance key: {result.process_instance_key}")
```

## Semantic Types

The SDK uses Python `NewType` wrappers for identifiers like `ProcessDefinitionKey`, `ProcessInstanceKey`, `JobKey`, `TenantId`, etc. These are defined in `camunda_orchestration_sdk.semantic_types` and re-exported from the top-level package.

### Why they exist

Camunda's API has many operations that accept string keys — process definition keys, process instance keys, incident keys, job keys, and so on. Without semantic types, it is easy to accidentally pass a process instance key where a process definition key is expected, or mix up a job key with an incident key. The type checker cannot help you if everything is `str`.

Semantic types make these identifiers **distinct at the type level**. Pyright (and other type checkers) will flag an error if you pass a `ProcessInstanceKey` where a `ProcessDefinitionKey` is expected, catching bugs before runtime.

### How to use them

Treat semantic types as **opaque identifiers** — receive them from API responses and pass them to subsequent API calls without inspecting or transforming the underlying value:

```python
from camunda_orchestration_sdk import CamundaClient
from camunda_orchestration_sdk.models.process_creation_by_key import ProcessCreationByKey

client = CamundaClient()

# Deploy → the response already carries typed keys
deployment = client.deploy_resources_from_files(["process.bpmn"])
process_key = deployment.processes[0].process_definition_key  # ProcessDefinitionKey

# Pass it directly to another call — no conversion needed
result = client.create_process_instance(
    data=ProcessCreationByKey(process_definition_key=process_key)
)

# The result also carries typed keys
instance_key = result.process_instance_key  # ProcessInstanceKey
client.cancel_process_instance(process_instance_key=instance_key)
```

### Serialising in and out of the type system

Semantic types are `NewType` wrappers over `str`, so they serialise transparently:

```python
from camunda_orchestration_sdk import ProcessDefinitionKey, ProcessInstanceKey

# --- Serialising out (to storage / JSON / message queue) ---
# A semantic type IS a str at runtime, so str()/json.dumps()/ORM columns just work:
process_key: ProcessDefinitionKey = deployment.processes[0].process_definition_key
db.save("process_key", process_key)   # stores the raw string
json.dumps({"key": process_key})      # "2251799813685249"

# --- Deserialising in (from storage / external input) ---
# Wrap the raw string with the type constructor:
raw = db.load("process_key")           # returns a plain str
typed_key = ProcessDefinitionKey(raw)  # re-enters the type system

result = client.create_process_instance(
    data=ProcessCreationByKey(process_definition_key=typed_key)
)
```

The available semantic types include: `ProcessDefinitionKey`, `ProcessDefinitionId`, `ProcessInstanceKey`, `JobKey`, `IncidentKey`, `DecisionDefinitionKey`, `DecisionDefinitionId`, `DeploymentKey`, `UserTaskKey`, `MessageKey`, `SignalKey`, `TenantId`, `ElementId`, `FormKey`, and others. All are importable from `camunda_orchestration_sdk` or `camunda_orchestration_sdk.semantic_types`.

## Job Workers

Job workers long-poll for available jobs, execute a callback, and automatically complete or fail the job based on the return value. Workers are available on `CamundaAsyncClient`.

```python
import asyncio
from camunda_orchestration_sdk import CamundaAsyncClient, WorkerConfig
from camunda_orchestration_sdk.runtime.job_worker import JobContext

async def handle_job(job_context: JobContext) -> dict:
    variables = job_context.variables.to_dict()
    job_context.log.info(f"Processing job {job_context.job_key}: {variables}")
    # Return a dict to set output variables
    return {"result": "processed"}

async def main():
    async with CamundaAsyncClient() as client:
        config = WorkerConfig(
            job_type="my-service-task",
            job_timeout_milliseconds=30_000,
        )
        client.create_job_worker(config=config, callback=handle_job)

        # Keep workers running until cancelled
        await client.run_workers()

asyncio.run(main())
```

### Job Logger

Each `JobContext` exposes a `log` property — a scoped logger automatically bound with the job's context (job type, worker name, and job key). Use it inside your handler for structured, per-job log output:

```python
async def handler(job: JobContext) -> dict:
    job.log.info(f"Starting work on {job.job_key}")
    # ... do work ...
    job.log.debug("Work completed successfully")
    return {"done": True}
```

The job logger inherits the SDK's logger configuration (loguru by default, or whatever you passed via `logger=`). If you injected a custom logger into the client, job handlers will use a child of that same logger.

> **Note:** When using the `"process"` execution strategy, the job logger silently degrades to a no-op (`NullLogger`) because loggers cannot be pickled across process boundaries. The worker's main-process logger still records all job lifecycle events (activation, completion, failure, errors). If you need per-job logging from a process-isolated handler, configure a logger inside the handler itself.

### Execution Strategies

Job workers support multiple execution strategies to match your workload type. Set `execution_strategy` in `WorkerConfig` or let the SDK auto-detect.

| Strategy           | How it runs your handler                                                       | Best for                                                                     |
| ------------------ | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| `"auto"` (default) | Auto-detects: `"async"` for `async def` handlers, `"thread"` for sync handlers | Most use cases — sensible defaults without configuration                     |
| `"async"`          | Runs on a dedicated `asyncio` event loop                                       | I/O-bound async work (HTTP calls, database queries)                          |
| `"thread"`         | Runs in a `ThreadPoolExecutor`                                                 | Blocking I/O (file system, synchronous HTTP libraries)                       |
| `"process"`        | Runs in a `ProcessPoolExecutor`                                                | CPU-bound work that needs to escape the GIL (image processing, ML inference) |

**Auto-detection logic:** If your handler is an `async def`, the strategy defaults to `"async"`. If it's a regular `def`, the strategy defaults to `"thread"`. You can override this explicitly:

```python
# Force thread pool for a sync handler
config = WorkerConfig(
    job_type="io-bound-task",
    job_timeout_milliseconds=30_000,
    execution_strategy="thread",
)

# Force process pool for CPU-heavy work
config = WorkerConfig(
    job_type="image-processing",
    job_timeout_milliseconds=120_000,
    execution_strategy="process",
)
```

**Process strategy caveats:** The `"process"` strategy serialises (pickles) your handler and `JobContext` to send them to a worker process. This means:

- Your handler function and its closure must be picklable (top-level functions work; lambdas and closures over unpicklable objects do not).
- `job.log` degrades to a silent no-op logger in the child process (see [Job Logger](#job-logger)).
- There is additional overhead per job from serialisation and inter-process communication.

### Worker Configuration

`WorkerConfig` supports:

| Parameter                      | Default                       | Description                                     |
| ------------------------------ | ----------------------------- | ----------------------------------------------- |
| `job_type`                     | _(required)_                  | The BPMN service task type to poll for          |
| `job_timeout_milliseconds`     | _(required)_                  | How long the worker has to complete the job     |
| `request_timeout_milliseconds` | `0`                           | Long-poll request timeout (0 = server default)  |
| `max_concurrent_jobs`          | `10`                          | Maximum jobs executing concurrently             |
| `execution_strategy`           | `"auto"`                      | `"auto"`, `"async"`, `"thread"`, or `"process"` |
| `fetch_variables`              | `None`                        | List of variable names to fetch (None = all)    |
| `worker_name`                  | `"camunda-python-sdk-worker"` | Identifier for this worker in Camunda           |

## Error Handling

The SDK raises typed exceptions for API errors. Each operation has specific exception classes for each HTTP error status code:

```python
from camunda_orchestration_sdk import CamundaClient
from camunda_orchestration_sdk.models.process_creation_by_key import ProcessCreationByKey
from camunda_orchestration_sdk.errors import CreateProcessInstanceBadRequest

with CamundaClient() as client:
    try:
        result = client.create_process_instance(
            data=ProcessCreationByKey(process_definition_key=99999)
        )
    except CreateProcessInstanceBadRequest as e:
        print(f"Bad request: {e}")
```

## Logging

By default the SDK logs via [loguru](https://github.com/Delgan/loguru). You can inject any logger that exposes `debug`, `info`, `warning`, and `error` methods — including Python's built-in `logging.Logger`.

### Using the default logger (loguru)

No configuration needed. Control verbosity with `CAMUNDA_SDK_LOG_LEVEL` or loguru's own `LOGURU_LEVEL` environment variable:

```bash
CAMUNDA_SDK_LOG_LEVEL=debug python your_script.py
```

### Injecting a custom logger

Pass a `logger=` argument to `CamundaClient` or `CamundaAsyncClient`. The logger is forwarded to all internal components (auth providers, HTTP hooks, job workers).

**stdlib `logging`:**

```python
import logging
from camunda_orchestration_sdk import CamundaClient

my_logger = logging.getLogger("my_app.camunda")
my_logger.setLevel(logging.DEBUG)

client = CamundaClient(logger=my_logger)
```

**Custom logger object:**

```python
from camunda_orchestration_sdk import CamundaClient

class MyLogger:
    def debug(self, msg, *args, **kwargs):
        print(f"[DEBUG] {msg}")
    def info(self, msg, *args, **kwargs):
        print(f"[INFO] {msg}")
    def warning(self, msg, *args, **kwargs):
        print(f"[WARN] {msg}")
    def error(self, msg, *args, **kwargs):
        print(f"[ERROR] {msg}")

client = CamundaClient(logger=MyLogger())
```

### Disabling logging

Pass an instance of `NullLogger` to silence all SDK output:

```python
from camunda_orchestration_sdk import CamundaClient, NullLogger

client = CamundaClient(logger=NullLogger())
```

## API Reference

See the [API Reference](api-reference/index.md) for full class and method documentation.
