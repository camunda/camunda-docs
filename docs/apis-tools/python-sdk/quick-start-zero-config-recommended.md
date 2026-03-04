---
id: quick-start-zero-config-recommended
title: Quick start (Zero-config – recommended)
sidebar_label: Quick start (Zero-config – recommended)
sidebar_position: 5
mdx:
  format: md
---

# Quick start (Zero-config – recommended)

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
