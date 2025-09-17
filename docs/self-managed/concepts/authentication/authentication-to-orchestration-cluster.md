---
id: authentication-to-orchestration-cluster
title: Authentication to Orchestration Cluster on Self-Managed
sidebar_label: "Authentication to Orchestration Cluster"
description: "Learn about authentication methods for the Orchestration Cluster on Self-Managed and how to choose the right one for your environment."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Authentication to the Orchestration Cluster components and their resources is managed by [Identity](../../components/orchestration-cluster/identity/overview.md). It includes components like [Zeebe](/components/zeebe/zeebe-overview.md), [Operate](/components/operate/operate-introduction.md), [Tasklist](/components/tasklist/introduction-to-tasklist.md), and [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

Camunda 8' Orchestration Cluster supports the following authentication methods for all Self-Managed installation methods:

- [Basic authentication with unprotected APIs](#no-authentication-for-apis)
- [Basic authentication](#full-basic-authentication)
- [OIDC](#oidc)

### Comparison of authentication methods

|                                                | **Recommended use**    | **API access**             | **Web UI access**     | **User management**            | **Security** |
| ---------------------------------------------- | ---------------------- | -------------------------- | --------------------- | ------------------------------ | ------------ |
| **Basic authentication with unprotected APIs** | Local development      | No authentication required | Username and password | Via Identity                   | Low          |
| **Basic authentication**                       | Development or testing | Username and password      | Username and password | Via Identity                   | Medium       |
| **OIDC**                                       | Production             | OAuth 2.0 (via IdP)        | OIDC (via IdP)        | Via External Identity Provider | High         |

## Basic authentication

With the Basic authentication, API and web component access are protected by username and password. User management is handled within the built-in Identity service. This method offers two main configuration scenarios, controlled by the `Unprotected API` property.

### Unprotected APIs

In this scenario, API access is unprotected for easier development, while web components remain secured with basic authentication.

This is the default for local development environments like [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md) and [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md).
It should never be used in production environments.

#### Example configuration

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

### Full basic authentication

Both APIs and web components are protected with username and password.

This is the default authentication method for [Helm charts](/self-managed/installation-methods/helm/index.md) and [Manual installation](/self-managed/installation-methods/manual/install.md).
It is typically used in development or testing environments.

#### Example configuration

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

- **No multi-factor authentication (MFA):** Basic authentication does not support MFA, increasing the risk of unauthorized access through credential stuffing attacks, where attackers use stolen credentials from other services.
- **No account locking:** The system does not lock accounts after multiple failed login attempts, leaving it vulnerable to brute-force attacks where an attacker can try to guess passwords repeatedly without being blocked.
- **Insecure password recovery:** The password recovery process for administrators can be insecure and may require direct, risky manual intervention with the system.
- **No single sign-on (SSO):** It leads to a higher likelihood of weak or reused passwords.

#### Mitigation and recommendations

For a secure, production-ready setup, we **strongly recommend using [OIDC](#oidc)**. OIDC delegates authentication to a dedicated Identity Provider (IdP), allowing you to leverage advanced security features like MFA, SSO, and password policies.

## OIDC

With OIDC, authentication is delegated to an [external Identity Provider (IdP)](/components/concepts/access-control/connect-to-identity-provider.md) using **OpenID Connect (OIDC)**. This is the **recommended method for production environments**.

- [Users](/components/identity/user.md) are managed in your external IdP and [mapped through rules](/components/concepts/access-control/mapping-rules.md) in Identity.
- [User groups](/components/identity/group.md) can be managed in Identity or configured to use groups from your IdP.
- [Clients](/components/identity/client.md) are managed in your external IdP and [mapped through rules](/components/concepts/access-control/mapping-rules.md) in Identity.

:::tip
For the details, see the guide how to [connect Orchestration Cluster Identity to an external IdP](/self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md).
:::

Using OIDC provides several security benefits:

- **Centralized user management:** Manage all users and their access from a single, central IdP.
- **Single Sign-On (SSO):** Provide a seamless login experience for your users across multiple applications.
- **Enhanced security:** Enforce MFA, password rotation policies, and other advanced security measures offered by your IdP.

### Example configuration

<Tabs groupId="option" defaultValue="env">
  <TabItem value="env" label="Environment variables">
```yaml
CAMUNDA_SECURITY_AUTHENTICATION_METHOD=oidc
``` 
  </TabItem>
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

When the OIDC authentication method is enabled, additional configuration values must be set. See the [OIDC configuration](../../components/orchestration-cluster/core-settings/configuration/properties.md#oidc-configuration) for the details.
