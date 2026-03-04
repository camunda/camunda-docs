---
id: using-the-sdk
title: Using the SDK
sidebar_label: Using the SDK
sidebar_position: 3
mdx:
  format: md
---

# Using the SDK

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
