---
id: orchestration-cluster-api-rest-secrets
title: "Secrets"
description: "Learn about the shared request and response contract for the resolve and list secrets endpoints."
---

`POST /v2/secrets/resolve` and `POST /v2/secrets/list` use a shared request and response contract that differs from most of the Orchestration Cluster REST API.

For the complete request and response schema for each endpoint, see [Resolve secrets](./specifications/resolve-secrets.api.mdx) and [List secrets](./specifications/list-secrets.api.mdx). To understand what a `camunda.secrets.<name>` reference is and how Camunda resolves it elsewhere in the cluster, see [Secret resolution](../../components/concepts/secret-resolution.md). For Java client usage, see [Secrets](../java-client/secrets.md).

## Understand resolve responses

`POST /v2/secrets/resolve` accepts a batch of references and resolves each reference independently. A structurally valid request always returns HTTP 200, even if every reference in the batch fails.

Successfully resolved references are returned in `resolved`. References that cannot be resolved are returned in `errors`. A failure for one reference does not affect the others in the same batch.

### Review per-reference errors

Each entry in `errors` uses one of the following codes:

| Code                | Meaning                                                                       |
| ------------------- | ----------------------------------------------------------------------------- |
| `NOT_FOUND`         | No secret exists for this reference.                                          |
| `ACCESS_DENIED`     | The caller lacks `SECRET:REVEAL` for this reference.                          |
| `INVALID_REFERENCE` | The reference is malformed or exceeds the length limit.                       |
| `UNREADABLE`        | The store contains a secret for this reference, but its value cannot be read. |

`UNREADABLE` does not mean that the secret is absent. Handle it differently from `NOT_FOUND` when responding to a failure.

### Check batch limits

A request can contain up to 20 references, with a maximum length of 256 characters per reference. The server deduplicates duplicate references within the same request and resolves each unique reference once.

### Understand HTTP 400 responses

`POST /v2/secrets/resolve` returns HTTP 400 only when the request itself is malformed. Examples include:

- A missing or non-array `references` field.
- More than 20 references.
- A `null` entry.

A well-formed request that fails to resolve every reference still returns HTTP 200 with `errors` populated.

## List secrets

`POST /v2/secrets/list` returns the names of references the caller is authorized to view. It never returns secret values.

Unauthorized references are omitted from the response rather than causing the request to fail.

The request body is optional and can be empty. The endpoint does not currently support filtering or pagination. Pagination is marked in the OpenAPI specification as a pre-GA follow-up.

## Grant required permissions

Resolving a reference requires `SECRET:REVEAL`. Listing requires `SECRET:READ`. Neither permission grants the other.

See [Authorizations](../../components/concepts/access-control/authorizations.md) for details about permissions on the `SECRET` resource and who receives them by default.
