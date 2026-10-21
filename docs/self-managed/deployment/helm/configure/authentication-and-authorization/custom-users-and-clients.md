---
id: custom-users-and-clients
sidebar_label: Adding users and clients
title: Helm chart user and client setup for Management Identity
description: Configure users and OAuth2 clients for Management Identity in Camunda 8 Self-Managed deployments using the Helm chart.
---

When connected to Keycloak, the Camunda Helm chart allows you to configure Management Identity users and OAuth2 clients through the `identity` section in your Helm values file. This page explains how to define users and clients with YAML examples and descriptions of common fields.

## Add OAuth2 clients

Define custom OAuth2 clients under the `identity.clients` list.

Example:

```yaml
identity:
  clients:
    - id: test
      name: Test
      secret:
        existingSecret: test-secret # Kubernetes secret containing the client secret
        existingSecretKey: test-secret-key # Key inside the secret
      redirectUris: /dummy # Redirect URIs for the OAuth2 client
      rootUrl: http://dummy # Root URL of the client application
      type: confidential # Client type (confidential, public, m2m)
      permissions:
        - resourceServerId: camunda-identity-resource-server
          definition: read
        - resourceServerId: camunda-identity-resource-server
          definition: write
        - resourceServerId: orchestration-api
          definition: read:*
        - resourceServerId: orchestration-api
          definition: write:*
        - resourceServerId: optimize-api
          definition: write:*
        - resourceServerId: web-modeler-api
          definition: write:*
        - resourceServerId: console-api
          definition: write:*
```

## Add Identity users

Create Management Identity users under the `identity.users` list.

Example:

```yaml
identity:
  users:
    - username: foo
      secret:
        existingSecret: foo-secret # Secret containing the user's password
        existingSecretKey: foo-secret-key
      firstName: Foo
      lastName: Bar
      email: foo.bar@camunda.com
      roles:
        - ManagementIdentity # Assign roles to the user
        - Optimize
        - Console
```

## Key points

- OAuth2 clients must include at least one redirect URI.
- Public clients do not require a client secret.
- User roles define permissions across Management Identity components such as Web Modeler, Console, and Optimize.
- All referenced Kubernetes secrets must exist before deploying the Helm chart.

## Troubleshooting

### Clients or users don't appear after installation

**Observed behavior:** Configured clients or users aren't created.

**Why this happens:** A secret referenced in your configuration doesn't exist, or doesn't match the values in your Helm configuration. Missing secrets prevent creation.

**How to fix:** Verify that all referenced secrets exist and match the values in your Helm configuration.

### A client or user has unexpected permission issues

**Observed behavior:** A user or client can authenticate, but can't perform actions you expect it to be allowed to.

**Why this happens:** Its assigned roles don't grant the access it needs.

**How to fix:** Confirm the roles assigned to that user or client align with the access it should have.

### Management Identity fails to bind configuration with an array-indexing error

**Observed behavior:** Management Identity fails to start, logging an error such as:

```
Binding to target [Bindable@3e595da3 type = java.util.List<io.camunda.identity.impl.keycloak.config.record.KeycloakClient>, value = 'none', annotations = array<Annotation>[[empty]], bindMethod = [null]] failed:
```

**Why this happens:** Users or clients were previously configured using environment variables, and the array indexing in that configuration is incorrect.

**How to fix:** Migrate those definitions into `values.yaml` instead of environment variables.
