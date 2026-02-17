---
id: logging
title: Logging
sidebar_label: Logging
sidebar_position: 12
mdx:
  format: md
---

# Logging

By default the SDK logs via [loguru](https://github.com/Delgan/loguru). You can inject any logger that exposes `debug`, `info`, `warning`, and `error` methods — including Python's built-in `logging.Logger`.

## Using the default logger (loguru)

No configuration needed. Control verbosity with `CAMUNDA_SDK_LOG_LEVEL` or loguru's own `LOGURU_LEVEL` environment variable:

```bash
CAMUNDA_SDK_LOG_LEVEL=debug python your_script.py
```

## Injecting a custom logger

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

## Disabling logging

Pass an instance of `NullLogger` to silence all SDK output:

```python
from camunda_orchestration_sdk import CamundaClient, NullLogger

client = CamundaClient(logger=NullLogger())
```
