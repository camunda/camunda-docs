---
id: authentication
title: Authentication methods on Self-Managed
sidebar_label: "Authentication methods"
description: "Overview of authentication methods for Orchestration Cluster components."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Authentication to all Orchestration Cluster components and their resources are handled through [Identity](../../components/orchestration-cluster/identity/overview.md).

Below is the overview of the supported authentication methods:

- [No authentication for APIs](#no-authentication-for-apis)
- [Basic authentication](#basic-authentication)
- [OIDC](#oidc)

## No authentication for APIs

- **APIs**: API access is unprotected with no authentication required.
- **Web components access**: Basic authentication for simple protection (username and password).
- [Users](/components/identity/user.md), [groups](/components/identity/group.md) and [clients](/components/identity/client.md) are managed in Identity.

This is the default authentication method for [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md) and [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md) to start quickly with local development.
It never should be used in production environments.

### Example configuration

<Tabs groupId="option" defaultValue="env">
  <TabItem value="env" label="Environment variables">
```yaml
CAMUNDA_SECURITY_AUTHENTICATION_METHOD=basic
CAMUNDA_SECURITY_AUTHENTICATION_UNPROTECTEDAPI=true
```
  </TabItem>
  <TabItem value="yaml" label="application.yaml" default>
```yaml
camunda.security.authentication.method: basic
camunda.security.authentication.unprotected-api: true
```
  </TabItem>
  <TabItem value="helm" label="Helm values">
```yaml
orchestration.security.authentication.method=basic
orchestration.security.authentication.unprotectedApi=true
```
  </TabItem>
</Tabs>

## Basic authentication

- **API and web components access**: Basic authentication for simple protection (username and password)
- [Users](/components/identity/user.md), [groups](/components/identity/group.md) and [clients](/components/identity/client.md) are managed in Identity.

This is the default authentication method for [local Kubernetes deployment](/self-managed/quickstart/administrator-quickstart.md), [Helm chart installation](/self-managed/installation-methods/helm/index.md) and [Manual installation](/self-managed/installation-methods/manual/install.md).
It is typically used in development or testing environments.

### Example configuration

<Tabs  groupId="option" defaultValue="env">
  <TabItem value="env" label="Environment variables">
```yaml
CAMUNDA_SECURITY_AUTHENTICATION_METHOD=basic
CAMUNDA_SECURITY_AUTHENTICATION_UNPROTECTEDAPI=false
```
  </TabItem>
  <TabItem value="yaml" label="application.yaml" default>
```yaml
camunda.security.authentication.method: basic
camunda.security.authentication.unprotected-api: false
```
  </TabItem>
  <TabItem value="helm" label="Helm values">
```yaml
orchestration.security.authentication.method=basic
orchestration.security.authentication.unprotectedApi=false
```
  </TabItem>
</Tabs>

### Security considerations

While basic authentication provides a simple layer of protection suitable for development or testing environments, it has several security limitations:

- **No multi-factor authentication (MFA):** Basic authentication does not support MFA, increasing the risk of unauthorized access through credential stuffing attacks where attackers use stolen credentials from other services.
- **No account locking:** There is no mechanism to lock an account after a certain number of failed login attempts. This leaves the system vulnerable to brute-force attacks, where an attacker can try to guess passwords repeatedly without being blocked.
- **Insecure password recovery:** If an administrator loses their password, the recovery process can be insecure and may require manual intervention with direct access to the system, which can be risky.

#### Mitigation and recommendations

To mitigate these risks, you can implement additional security measures to enforce access control.
However, for a more robust and secure setup, we **strongly recommend using [OIDC](#oidc) for production environments**. If security is a significant concern for your deployment, choosing the OIDC setup is the best practice.

## OIDC

- **Authentication to APIs and web components** is handled via an [external OpenID Connect (OIDC) provider](../../components/orchestration-cluster/identity/connect-external-identity-provider.md), such as Keycloak, Microsoft EntraID, Auth0 or Okta.
- [Users](/components/identity/user.md) are managed in an external Identity provider and [mapped through rules](/components/concepts/access-control/mapping-rules.md) in Identity.
- [User groups](/components/identity/group.md) can be managed in two ways:
  - Via Identity.
  - Via an external Identity provider and [mapped through rules](/components/concepts/access-control/mapping-rules.md) in Identity.
- [Clients](/components/identity/client.md) are managed in an external Identity provider and [mapped through rules](/components/concepts/access-control/mapping-rules.md) in Identity.

This is the **recommended method for production environments**.

### Example configuration

<Tabs groupId="option" defaultValue="env">
  <TabItem value="env" label="Environment variables">
```yaml
CAMUNDA_SECURITY_AUTHENTICATION_METHOD=oidc
```  </TabItem>
  <TabItem value="yaml" label="application.yaml" default>
```yaml
camunda.security.authentication.method: oidc
```
  </TabItem>
  <TabItem value="helm" label="Helm values">
```yaml
orchestration.security.authentication.method=oidc
```
  </TabItem>
</Tabs>

When the OIDC authentication method is enabled, the additional configuration values must be set. See the [OIDC configuration](../../components/orchestration-cluster/core-settings/configuration/properties.md#oidc-configuration) for the details.
