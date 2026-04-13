---
id: machine-client-authorization
sidebar_label: Granting API permissions to machine clients
title: Granting Camunda API permissions to machine clients
description: How to bootstrap Camunda authorization DB entries for machine clients (service accounts) using the Helm chart initialization configuration.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

When you enable authorization enforcement (`orchestration.security.authorizations.enabled: true`),
every API caller must have entries in Camunda's authorization DB — including machine clients such
as CI/CD pipelines, load test runners, or backend services.

This page explains how to grant those permissions declaratively via Helm values.

## Understanding the two authorization layers

Camunda Self-Managed enforces **two independent authorization layers**:

| Layer | What it controls | Configured via |
|-------|-----------------|----------------|
| **Keycloak / Management Identity** | Whether a client can obtain a token; JWT claims (`resource_access`, `realm_access`) | `identity.clients`, `global.identity.auth.*` |
| **Camunda authorization DB** | Whether a principal can call a specific Camunda API endpoint | `orchestration.security.initialization.authorizations` or `POST /v2/authorizations` |

A client with a valid token — even one with `orchestration-api: read:*, write:*` in its JWT — will
receive **HTTP 403** from Camunda if it has no entries in Camunda's authorization DB.

:::warning `global.identity.auth.admin` cannot bootstrap Camunda DB entries

The `global.identity.auth.admin` admin client has Keycloak-level admin permissions but **cannot
call `POST /v2/authorizations`** to create authorization DB entries for other clients. The admin
client's service account is not assigned the `Orchestration` Keycloak realm role, which is what
triggers DB entry seeding for a principal. This is a known limitation.

Use `orchestration.security.initialization.authorizations` (described below) to bootstrap
machine client permissions instead.

:::

## Bootstrap permissions via Helm values

The `orchestration.security.initialization.authorizations` field seeds the Camunda authorization
DB directly at broker startup. No external scripts, API calls, or Keycloak credential fetching
are needed.

```yaml
orchestration:
  security:
    authorizations:
      enabled: true
    initialization:
      authorizations:
        - ownerType: CLIENT
          ownerId: my-client-id       # must match the Keycloak client ID
          resourceType: PROCESS_DEFINITION
          resourceId: "*"             # "*" grants access to all resources of this type
          permissions:
            - CREATE_PROCESS_INSTANCE
            - READ_PROCESS_INSTANCE
            - READ_PROCESS_DEFINITION
        - ownerType: CLIENT
          ownerId: my-client-id
          resourceType: RESOURCE
          resourceId: "*"
          permissions:
            - CREATE                  # required to deploy BPMN/DMN resources
```

### Behavior on restart

On subsequent broker restarts, duplicate entries are rejected with `ALREADY_EXISTS`. The broker
logs the rejection and continues normally — the configuration is **safe across restarts**.

### Field reference

| Field | Type | Description |
|-------|------|-------------|
| `ownerType` | enum | `USER`, `CLIENT`, `ROLE`, `GROUP` |
| `ownerId` | string | The Keycloak client ID, username, role name, or group name |
| `resourceType` | enum | See [resource types](#resource-types) below |
| `resourceId` | string | Specific resource ID, or `"*"` for all resources of this type |
| `permissions` | list | One or more permission types (see [permissions](#permissions) below) |

### Resource types

| Resource type | Description |
|--------------|-------------|
| `PROCESS_DEFINITION` | BPMN process definitions |
| `PROCESS_INSTANCE` | Running process instances |
| `DECISION_DEFINITION` | DMN decision definitions |
| `DECISION_INSTANCE` | DMN decision evaluations |
| `RESOURCE` | Deployed resources (BPMN, DMN, forms) |
| `USER_TASK` | User tasks |
| `BATCH` | Batch operations |
| `AUTHORIZATION` | Authorization entries themselves |
| `GROUP`, `ROLE`, `TENANT`, `USER` | Identity management resources |

### Permissions

Common permissions per resource type:

| Resource type | Typical permissions for a machine client |
|--------------|------------------------------------------|
| `RESOURCE` | `CREATE` (deploy BPMN/DMN) |
| `PROCESS_DEFINITION` | `CREATE_PROCESS_INSTANCE`, `READ_PROCESS_INSTANCE`, `UPDATE_PROCESS_INSTANCE`, `READ_PROCESS_DEFINITION` |
| `DECISION_DEFINITION` | `CREATE_DECISION_INSTANCE`, `READ_DECISION_INSTANCE`, `READ_DECISION_DEFINITION` |
| `USER_TASK` | `READ_USER_TASK`, `CLAIM_USER_TASK`, `COMPLETE_USER_TASK` |

## Complete example: load test client

A client that deploys processes and starts/monitors instances:

```yaml
orchestration:
  security:
    authorizations:
      enabled: true
    initialization:
      authorizations:
        # Deploy BPMN and DMN resources
        - ownerType: CLIENT
          ownerId: my-load-test-client
          resourceType: RESOURCE
          resourceId: "*"
          permissions:
            - CREATE
        # Start and monitor process instances
        - ownerType: CLIENT
          ownerId: my-load-test-client
          resourceType: PROCESS_DEFINITION
          resourceId: "*"
          permissions:
            - CREATE_PROCESS_INSTANCE
            - UPDATE_PROCESS_INSTANCE
            - READ_PROCESS_INSTANCE
            - READ_PROCESS_DEFINITION
```

The client also needs to be registered in Keycloak with the `orchestration-api: read:*, write:*`
permission. See [Adding users and clients](./custom-users-and-clients.md) for how to configure
that via `identity.clients`.

## Granting permissions at runtime

If you need to grant permissions to a client after the cluster is already running (without
redeploying), use the `POST /v2/authorizations` REST API with a token from a user that already
has authorization management permissions:

```bash
curl -X POST http://your-camunda-gateway:8080/v2/authorizations \
  -H "Authorization: Bearer <user-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "ownerId": "my-client-id",
    "ownerType": "CLIENT",
    "resourceId": "*",
    "resourceType": "PROCESS_DEFINITION",
    "permissionTypes": ["CREATE_PROCESS_INSTANCE", "READ_PROCESS_INSTANCE"]
  }'
```

HTTP 201 means created; HTTP 409 means the entry already exists (both are acceptable).
