---
id: installing-the-sdk-to-your-project
title: Installing the SDK to your project
sidebar_label: Installing the SDK to your project
sidebar_position: 2
mdx:
  format: md
---

# Installing the SDK to your project

## Requirements

- Python 3.10 or later

## Stable release (recommended for production)

The stable version tracks the latest supported Camunda server release. The first stable release will be **8.9.0**.

```bash
pip install camunda-orchestration-sdk
```

## Pre-release / dev channel

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

## Versioning

This SDK does **not** follow traditional semver. The **major.minor** version tracks the Camunda server version, so you can easily match the SDK to your deployment target (e.g. SDK `8.9.x` targets Camunda `8.9`).

**Patch releases** contain fixes, features, and occasionally **breaking type changes**. A breaking type change typically means an upstream API definition fix that corrects the shape of a request or response model — your code may stop type-checking even though it worked before.

When this happens, we signal it in the [CHANGELOG](https://github.com/camunda/orchestration-cluster-api-python/releases).

**Recommended approach:**

- **Ride the latest** — accept that types may shift and update your code when it happens. This keeps you on the most accurate API surface.
- **Pin and review** — pin to a specific patch version and review the [CHANGELOG](https://github.com/camunda/orchestration-cluster-api-python/releases) before upgrading:

  ```text
  camunda-orchestration-sdk==8.9.3
  ```

## Using the SDK

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

### Quick start (Zero-config – recommended)

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

### Programmatic configuration (use sparingly)

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

### Loading configuration from a `.env` file (`CAMUNDA_LOAD_ENVFILE`)

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
