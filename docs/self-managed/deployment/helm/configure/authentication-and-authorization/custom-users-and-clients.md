---
id: custom-users-and-clients
sidebar_label: Adding Users and Clients
title: Helm chart user and client setup on Management Identity
description: Learn how to configure users and clients on Management Identity for Camunda 8 Self-Managed deployments using Helm chart.
---

The Camunda Helm chart allows you to configure custom Management Identity users and OAuth2 clients through the `identity`` section in the Helm values file. This guide explains how to add users and clients by providing YAML examples and descriptions of the available fields.

## Adding OAuth2 Clients

To add custom OAuth2 clients, define them under the `identity.clients` list.

Example confgiuration for client:

```yaml
identity:
  clients:
    - id: test
      name: Test
      secret:
        existingSecret: test-secret # Kubernetes secret name holding the client secret
        existingSecretKey: test-secret-key # Key name inside test-secret
      redirectUris: /dummy # Redirect URI(s) for the OAuth2 client
      rootUrl: http://dummy # Root URL of the client application
      type: confidential # Client type (e.g., confidential,public,m2m)
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

## Adding Identity Users

You can create custom Management Identity users by defining them under the `identity.users` list.

Example configuration for users:

```yaml
identity:
  users:
    - username: foo
      secret:
        existingSecret: foo-secret # Kubernetes secret name holding the user secret
        existingSecretKey: foo-secret-key # Key name inside test-secret
      firstName: Foo
      lastName: Bar
      email: foo.bar@camunda.com
      roles:
        - ManagementIdentity # Roles assigned to the user
        - Optimize
        - Console
```

## Key Points

- Clients require at least one redirect URI for OAuth2 redirection handling.
- Public clients do not require a secret
- User roles assign permissions across Management Identity components such as Web Modeler, Console and Optimize.
- Ensure that the secrets referenced exist in the Kubernetes cluster before deploying the Helm chart.
