---
id: overview
title: Identity on Self-Managed
sidebar_label: "Overview"
description: "Learn how Identity is bundled with your default orchestration cluster."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Identity is included by default with the [Orchestration Cluster](/self-managed/reference-architecture/reference-architecture.md#orchestration-cluster) in all Self-Managed installation methods. Within a cluster, Identity provides unified, cluster-level identity management and authorization.

:::info
The following guides cover Identity configuration in Self-Managed environments. For information on using and managing Identity, see [Identity user guides](/components/identity/identity-introduction.md).
:::

## Initial setup

Using the default setup for [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md) will result in a cluster with:

1. Web components login enabled
2. API authentication disabled
3. Authorizations disabled
4. An initial user with username/password: `demo` / `demo`
5. An `admin` role with full permissions, applied to the `demo` user

To modify the [initial configuration](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md), define your custom values in `application.yaml`, and pass this file at startup using the `--config` flag. See [this section](/self-managed/quickstart/developer-quickstart/c8run.md#enable-authentication-and-authorization) for details.

:::note

- In Helm installations, API authentication and authorization are enabled by default. You can adjust these settings in `application.yaml` or using environment variables.
- As a Spring Boot application, the Orchestration Cluster supports standard
  [Spring configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html) methods. [Review configurations which apply to all components within the Orchestration Cluster](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md).

:::

## Configure initial users

If users are managed within the Orchestration Cluster (that is, without an external Identity Provider), you can create an initial user in three ways:

- Using the [Orchestration Cluster UI](#option-1-orchestration-cluster-ui)
- Using the [Setup endpoint of the Orchestration Cluster REST API](#option-2-setup-rest-api)
- Using the [configuration](#option-3-configuration)

:::warning
After completing the initial setup, ensure at least one user remains assigned to the `admin` role.  
If no admin user exists, a third party could create a new admin account and gain full access.
:::

### Option 1: Create an initial admin user in Orchestration Cluster UI {#option-1-orchestration-cluster-ui}

If no admin user exists, the orchestration cluster web applications show a screen for creating the initial user:

![identity-create-initial-user](./img/create-initial-user.png)

This user will be assigned to the `admin` role and granted all permissions in the system. Once an admin user exists, this screen is no longer shown.

### Option 2: Create an initial admin user via the Setup endpoint of Orchestration Cluster REST API{#option-2-setup-rest-api}

You can create the first admin user by calling the Setup API endpoint:

`POST /v2/setup/user` ([API documentation](/apis-tools/orchestration-cluster-api-rest/specifications/create-admin-user.api.mdx))

with the following JSON request body:

```json
{
  "username": "<your chosen username>",
  "password": "<your chosen password>",
  "name": "<the user's full name>",
  "email": "<the user's email address>"
}
```

This endpoint is only available if **no user is assigned to the `admin` role**.

### Option 3: Define initial users via the configuration{#option-3-configuration}

To configure initial users programmatically, include the relevant definitions in your `application.yaml` or environment variables.

<Tabs>
  <TabItem value="helm" label="Helm properties">

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
<TabItem value="env" label="Environment variables" default>

```shell
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_USERNAME=<Your chosen username>
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_PASSWORD=<Your chosen password>
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_NAME=<The name of the first user>
CAMUNDA_SECURITY_INITIALIZATION_USERS_0_EMAIL=<The email address of the first user>

# add more users as desired by repeating the variables with an incremented index,
# like CAMUNDA_SECURITY_INITIALIZATION_USERS_1_USERNAME
```

  </TabItem>
</Tabs>

:::note
By default, a user is not assigned to any roles and therefore has no permissions. See the following section to learn how to assign a user to a role via configuration.
:::

#### Assign users, clients, groups, or mapping rules to roles via configuration

The orchestration cluster provides a number of [built-in roles](/components/concepts/access-control/authorizations.md#default-roles) with predefined permissions for easier setup.

To assign users, clients, groups, or [mapping rules](/components/concepts/access-control/mapping-rules.md) to roles, add the appropriate properties to your `application.yaml` or set them as environment variables.

<Tabs>
  <TabItem value="helm" label="Helm properties">

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
<TabItem value="env" label="Environment variables" default>

```shell
CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<role>_USERS_0=<username>
CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<role>_CLIENTS_0=<client id>
CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<role>_GROUPS_0=<group id>
CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<role>_MAPPINGS_0=<mapping id>

# add more members as desired by repeating the variables with an incremented index,
# like CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<role>_USERS_1
```

  </TabItem>
</Tabs>

Replace `<role>` with the ID of the role you want to configure.

Here is an example how to configure a user `demo` to become a member of the admin role:

<Tabs>
  <TabItem value="helm" label="Helm properties">
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
<TabItem value="env" label="Environment variables" default>

```shell
CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_ADMIN_USERS_0=demo
```

  </TabItem>
</Tabs>

You can assign a user to multiple roles by listing them in the respective section of each role.

## Enable API authentication and authorizations

In Camunda 8 Run installations, basic authentication is enabled for the Orchestration Cluster web components, but the API is unprotected, and [authorizations](/components/identity/authorization.md) are disabled. API protection and authorizations can both be enabled by modifying your `application.yaml` or environment variables:

<Tabs>
  <TabItem value="helm" label="Helm properties">

```yaml
camunda:
  security:
    authentication:
      unprotected-api: false
    authorizations:
      enabled: true
```

  </TabItem>
<TabItem value="env" label="Environment variables" default>

```shell
CAMUNDA_SECURITY_AUTHENTICATION_UNPROTECTED-API=false
CAMUNDA_SECURITY_AUTHORIZATIONS_ENABLED=true
```

  </TabItem>
</Tabs>

:::note
To enable authorizations, API protection must also be enabled.
:::

Basic authentication credentials are then required when making API requests, as in the following:

```shell
curl --request POST 'http://localhost:8080/v1/process-definitions/search'  \
  -u demo:demo \
  --header 'Content-Type: application/json' \
  --data-raw '{}'
```
