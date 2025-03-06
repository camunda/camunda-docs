---
id: installation
title: Initial setup
description: "Learn how Identity is bundled with your default Orchestration cluster."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Identity is included by default with the deployment of any [Orchestration cluster](/self-managed/reference-architecture/reference-architecture.md#orchestration-cluster). Within an Orchestration cluster, Identity provides unified, cluster-level identity management and authorizations.

Identity for Orchestration clusters is available via [Helm install](/self-managed/setup/install.md), and for local development via [Camunda 8 Run](/self-managed/setup/deploy/local/c8run.md).

## Initial configuration

Following the default installation will result in a cluster with the following:

1. Basic authentication enabled
2. API authentication disabled
3. Authorizations disabled
4. An initial user with the username/password `demo`/`demo`
5. An `admin` role with read, create, update, and delete permissions for other roles, which is applied to the initial `demo` user

To make changes to the initial configuration, add the desired values via your `application.yaml` or environment variables according to the available [configuration properties](./configuration.md).

### Configure an initial user

The initial user created by the application will be assigned the `admin` role, and can be used for authentication to the web applications and additional role management.

To create a unique initial user, the following is required in your `application.yaml` or environment variables:

<Tabs>
  <TabItem value="helm" label="Helm properties" default>

```yaml
camunda:
  security:
    initialization:
      users:
        - username: <Your chosen username>
          password: <Your chosen password>
          name: <The name of the first user>
          email: <The email address of the first user>
```

  </TabItem>
<TabItem value="env" label="Environment variables" default>

```shell
CAMUNDA_SECURITY_INITIALIZATION_USERS[0]_USERNAME=<Your chosen username>
CAMUNDA_SECURITY_INITIALIZATION_USERS[0]_PASSWORD=<Your chosen password>
CAMUNDA_SECURITY_INITIALIZATION_USERS[0]_NAME=<The name of the first user>
CAMUNDA_SECURITY_INITIALIZATION_USERS[0]_EMAIL=<The email address of the first user>
```

:::note
Any other users included in the initialization `user` list will also be granted the `admin` role.
:::

  </TabItem>
</Tabs>

### Enable API authentication and authorizations

By default, basic authentication is enabled on the Camunda web applications, but the API is unprotected, and authorizations are disabled. API protection and authorizations can both be enabled by modifying your `application.yaml` or environment variables:

<Tabs>
  <TabItem value="helm" label="Helm properties" default>

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
