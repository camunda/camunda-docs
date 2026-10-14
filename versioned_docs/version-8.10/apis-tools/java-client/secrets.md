---
id: secrets
title: "Secrets"
description: "Resolve and list camunda.secrets.<name> references from the Camunda Java client."
---

For what a `camunda.secrets.<name>` reference is and how it's resolved, see [Secret resolution](/components/concepts/secret-resolution.md). For the request and response contract shared by these commands, see [Secrets](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-secrets.md).

## Resolve a batch of references

```java
ResolveSecretsResponse response = client.newResolveSecretsCommand()
    .references("camunda.secrets.API_TOKEN", "camunda.secrets.db-password")
    .send()
    .join();
```

A per-reference failure does not throw. `send()` only raises when the whole request is rejected. For example, more than 20 references in one call. Read the outcome from the response instead:

```java
if (!response.isFullyResolved()) {
  response.getErrors().forEach(error ->
      log.warn("Could not resolve {}: {}", error.getReference(), error.getCode()));
}

Optional<String> token = response.getValue("camunda.secrets.API_TOKEN");
```

- `getResolved()` returns the references that resolved, each with its value.
- `getErrors()` returns the references that didn't, each with a typed `SecretErrorCode` (`NOT_FOUND`, `ACCESS_DENIED`, `INVALID_REFERENCE`, `UNREADABLE`) and a server-provided message.
- `isFullyResolved()` is `true` only when every requested reference resolved with no errors.
- `getValue(reference)` looks up a single resolved value without scanning `getResolved()` yourself.

`ResolveSecretsResponse`, `ResolvedSecret`, and `ResolutionError` all omit resolved values and error messages from their `toString()`. Logging the response itself or an object holding one never prints a secret value. Log `getReference()` and `getCode()` instead of the response object.

## List known references

```java
ListSecretsResponse response = client.newListSecretsCommand().send().join();
List<String> references = response.getReferences();
```

`getReferences()` returns reference names only, never values, and only the references the caller holds `SECRET:READ` on.

## Physical-tenant scoping

Both commands resolve and list against the secret stores of the client's own [Physical Tenant](./physical-tenants.md). Neither command takes a separate tenant parameter.
