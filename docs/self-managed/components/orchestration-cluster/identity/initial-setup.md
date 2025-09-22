---
id: initial-setup
title: Initial setup for Identity on Self-Managed
sidebar_label: "Initial setup"
description: "Learn how Identity is bundled with your default orchestration cluster."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The default setup of Orchestration Cluster Identity varies depending on the Self-Managed installation method you choose.

<Tabs groupId="installation" defaultValue="c8run" queryString values={
[
{label: 'C8 Run', value: 'c8run' },
{label: 'Docker Compose', value: 'docker' },
{label: 'Helm charts', value: 'helm' },
{label: 'Manual', value: 'manual' }
]}>
<TabItem value="c8run">

For [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md) and [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md), a cluster has the following initial configuration:

- **Authentication:** Basic authentication is used.
- **API access:** API authentication is **disabled** ([unprotected API mode](/self-managed/concepts/authentication/authentication-to-orchestration-cluster.md#unprotected-api-mode) is enabled).
- **Authorization:** Authorizations are **disabled**.
- **Admin Role:** A predefined `admin` role exists with permissions to all Orchestration Cluster components and resources.
- **Initial User:** An initial user with the **admin** role and credentials `demo`/`demo`.

</TabItem>
<TabItem value="docker">

For [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md) and [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md), a cluster has the following initial configuration:

- **Authentication:** Basic authentication is used.
- **API access:** API authentication is **disabled** ([unprotected API mode](/self-managed/concepts/authentication/authentication-to-orchestration-cluster.md#unprotected-api-mode) is enabled).
- **Authorization:** Authorizations are **disabled**.
- **Admin Role:** A predefined `admin` role exists with permissions to all Orchestration Cluster components and resources.
- **Initial User:** An initial user with the **admin** role and credentials `demo`/`demo`.

</TabItem>
<TabItem value="helm">

For [Helm](/self-managed/installation-methods/helm/index.md) and [Manual](/self-managed/installation-methods/manual/install.md) installations, a cluster has the following initial configuration:

- **Authentication:** Basic authentication is used.
- **API access:** API authentication is **enabled** ([unprotected API mode](/self-managed/concepts/authentication/authentication-to-orchestration-cluster.md#unprotected-api-mode) is disabled).
- **Authorization:** Authorizations are **enabled**.
- **Admin Role:** A predefined `admin` role exists with permissions to all Orchestration Cluster components and resources.
- **Initial User:** An initial user with the **admin** role and credentials `demo`/`demo`.

</TabItem>
<TabItem value="manual">

For [Helm](/self-managed/installation-methods/helm/index.md) and [Manual](/self-managed/installation-methods/manual/install.md) installations, a cluster has the following initial configuration:

- **Authentication:** Basic authentication is used.
- **API access:** API authentication is **enabled** ([unprotected API mode](/self-managed/concepts/authentication/authentication-to-orchestration-cluster.md#unprotected-api-mode) is disabled).
- **Authorization:** Authorizations are **enabled**.
- **Admin Role:** A predefined `admin` role exists with permissions to all Orchestration Cluster components and resources.
- **Initial User:** An initial user with the **admin** role and credentials `demo`/`demo`.

</TabItem>
</Tabs>

To modify the initial setup, see the [supported configuration properties](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md).

## Configure initial users

When you start using Identity, you can create the initial users in one of the following ways:

- [Startup configuration](#configure-initial-users-via-configuration)
- [Orchestration Cluster UI](#create-admin-user-via-orchestration-cluster-ui)
- [Setup endpoint of the Orchestration Cluster REST API](#create-admin-user-via-setup-rest-api)

:::warning
After completing the initial setup, ensure at least one user remains assigned to the `admin` role.  
If no admin user exists, a third party could create a new admin account and gain full access.
:::

### Define initial users via the startup configuration{#configure-initial-users-via-configuration}

To configure initial users programmatically, include the relevant definitions in your application configuration:

<Tabs groupId="option" defaultValue="env" queryString values={
[
{label: 'Environment variables', value: 'env' },
{label: 'application.yaml', value: 'application-yaml' },
{label: 'Helm values', value: 'helm-values' },
]}>
<TabItem value="env">

```shell
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_USERNAME=<Your chosen username>
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_PASSWORD=<Your chosen password>
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_NAME=<The name of the first user>
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_EMAIL=<The email address of the first user>

# add more users as desired by repeating the variables with an incremented index,
# like CAMUNDA_SECURITY_INITIALIZATION_USERS_1_USERNAME
```

</TabItem>
<TabItem value="application-yaml">

```shell
camunda.security.initialization.users[0].username: <Your chosen username>
camunda.security.initialization.users[0].password: <Your chosen password>
camunda.security.initialization.users[0].name: <The name of the first user>
camunda.security.initialization.users[0].email: <The email address of the first user>

# add more users as desired by repeating the variables with an incremented index,
# like camunda.security.initialization.users[1].username
```

</TabItem>
<TabItem value="helm-values">
```yaml
camunda:
  security:
    initialization:
      users:
        - username: <Your chosen username>
          password: <Your chosen password>
          name: <The name of the first user>
          email: <The email address of the first user>
        # add more users to this list as desired
```

</TabItem>
</Tabs>

:::note
By default, a user is not assigned to any roles and therefore has no permissions. See the next section to learn how to assign a user to a role via configuration.
:::

### Create an initial admin user in Orchestration Cluster UI {#create-admin-user-via-orchestration-cluster-ui}

For [Helm charts](../../../installation-methods/helm/install.md) and [Manual](../../../installation-methods/manual/install.md) installations, if an initial admin user is not defined in the configuration (or was removed from the configuration), the web components will automatically prompt you to create one on the first start:

![identity-create-initial-user](./img/create-initial-user.png)

This user will be assigned to the `admin` role and granted all permissions in the system. Once an admin user exists, this screen is no longer shown.

:::note
This option does not apply to **Camunda 8 Run** and **Docker Compose** installations, as they come with a pre-configured `demo` user by default.
:::

### Create an initial admin user via the Setup endpoint of Orchestration Cluster REST API{#create-admin-user-via-setup-rest-api}

As a programmatic alternative to the UI, you can create the first admin user by calling the Setup API endpoint. This is useful for automated or headless installations.

- **API endpoint**: `POST /v2/setup/user` (see the [documentation](/apis-tools/orchestration-cluster-api-rest/specifications/create-admin-user.api.mdx))

The following JSON request body can be used:

```json
{
  "username": "<your chosen username>",
  "password": "<your chosen password>",
  "name": "<the user's full name>",
  "email": "<the user's email address>"
}
```

This endpoint is only available as long as **no user is assigned to the `admin` role**.

### Assign users, clients, groups, or mapping rules to roles via configuration

The Orchestration Cluster provides a number of [built-in roles](/components/concepts/access-control/authorizations.md#default-roles) with predefined permissions for easier setup.

To assign users, clients, groups, or [mapping rules](/components/concepts/access-control/mapping-rules.md) to roles, add the appropriate properties to your `application.yaml` or set them as environment variables.

<Tabs groupId="option" defaultValue="env" queryString values={
[
{label: 'Environment variables', value: 'env' },
{label: 'application.yaml', value: 'application-yaml' },
{label: 'Helm values', value: 'helm-values' },
]}>
<TabItem value="env">

```shell
CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<role>_USERS_0=<username>
CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<role>_CLIENTS_0=<client id>
CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<role>_GROUPS_0=<group id>
CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<role>_MAPPINGS_0=<mapping id>

# add more members as desired by repeating the variables with an incremented index,
# like CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<role>_USERS_1
```

</TabItem>
<TabItem value="application-yaml">

```shell
camunda.security.initialization.default-roles.<role>.users[0]: <username>
camunda.security.initialization.default-roles.<role>.groups[0]: <client id>
camunda.security.initialization.default-roles.<role>.clients[0]: <group id>
camunda.security.initialization.default-roles.<role>.mappingrules[0]: <mapping id>

# add more members as desired by repeating the variables with an incremented index,
# like camunda.security.initialization.default-roles.<role>.users[1]
```

</TabItem>
<TabItem value="helm-values">

```yaml
camunda:
  security:
    initialization:
      defaultRoles:
        <role>:
          users:
            - <username>
            # add more users to this list as desired
          clients:
            - <client id>
            # add more clients to this list as desired
          groups:
            - <group id>
            # add more groups to this list as desired
          mappings:
            - <mapping id>
            # add more mappings to this list as desired
```

</TabItem>
</Tabs>

Replace `<role>` with the ID of the role you want to configure.

Here is an example how to configure a user `demo` to become a member of the admin role:

<Tabs groupId="option" defaultValue="env" queryString values={
[
{label: 'Environment variables', value: 'env' },
{label: 'application.yaml', value: 'application-yaml' },
{label: 'Helm values', value: 'helm-values' },
]}>
<TabItem value="env">

```shell
CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_ADMIN_USERS_0=demo
```

</TabItem>
<TabItem value="application-yaml">

```shell
camunda.security.initialization.default-roles.admin.users[0]:demo
```

</TabItem>
<TabItem value="helm-values">

```yaml
camunda:
  security:
    initialization:
      defaultRoles:
        admin:
          users:
            - demo
```

</TabItem>
</Tabs>

You can assign a user to multiple roles by listing them in the respective section of each role.

## Enable API authentication and authorizations

For development setups like [Camunda 8 Run](../../../quickstart/developer-quickstart/c8run.md) and [Docker Compose](../../../quickstart/developer-quickstart/docker-compose.md), API access is [unprotected](../../../concepts/authentication/authentication-to-orchestration-cluster.md#unprotected-api-mode), and [authorizations](/components/identity/authorization.md) are disabled by default.

To enable them, you can apply the following configuration:

<Tabs groupId="option" defaultValue="env" queryString values={
[
{label: 'Environment variables', value: 'env' },
{label: 'application.yaml', value: 'application-yaml' },
{label: 'Helm values', value: 'helm-values' },
]}>
<TabItem value="env">

```shell
CAMUNDA_SECURITY_AUTHENTICATION_UNPROTECTED-API=false
CAMUNDA_SECURITY_AUTHORIZATIONS_ENABLED=true
```

</TabItem>
<TabItem value="application-yaml">

```shell
camunda.security.authentication.unprotected-api: false
camunda.security.authorizations.enabled: true
```

</TabItem>
<TabItem value="helm-values">

```yaml
camunda:
  security:
    authentication:
      unprotected-api: false
    authorizations:
      enabled: true
```

</TabItem>
</Tabs>
