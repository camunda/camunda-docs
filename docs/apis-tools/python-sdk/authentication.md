---
id: authentication
title: Authentication
sidebar_label: Authentication
sidebar_position: 3
mdx:
  format: md
---

# Authentication

The SDK supports three authentication strategies, controlled by `CAMUNDA_AUTH_STRATEGY`:

| Strategy | When to use |
|----------|------------|
| `NONE`   | Local development with unauthenticated Camunda (default) |
| `OAUTH`  | Camunda SaaS or any OAuth 2.0 Client Credentials endpoint |
| `BASIC`  | Self-Managed Camunda with Basic auth (username/password) |

## Auto-detection

If you omit `CAMUNDA_AUTH_STRATEGY`, the SDK infers it from the credentials you provide:

- Only `CAMUNDA_CLIENT_ID` + `CAMUNDA_CLIENT_SECRET` → **OAUTH**
- Only `CAMUNDA_BASIC_AUTH_USERNAME` + `CAMUNDA_BASIC_AUTH_PASSWORD` → **BASIC**
- No credentials → **NONE**
- Both OAuth and Basic credentials present → **error** (set `CAMUNDA_AUTH_STRATEGY` explicitly)

## OAuth 2.0

```bash
CAMUNDA_REST_ADDRESS=https://cluster.example/v2
CAMUNDA_AUTH_STRATEGY=OAUTH
CAMUNDA_CLIENT_ID=your-client-id
CAMUNDA_CLIENT_SECRET=your-client-secret
# Optional:
# CAMUNDA_OAUTH_URL=https://login.cloud.camunda.io/oauth/token
# CAMUNDA_TOKEN_AUDIENCE=zeebe.camunda.io
```

## Basic authentication

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
