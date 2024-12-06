---
id: host-custom-connectors
title: Host custom Connectors
description: "Learn how to host a custom Connector developed with Connector SDK."
---

This guide explains how to host your own **Connectors** developed with [Connector SDK](/components/connectors/custom-built-connectors/connector-sdk.md).

## Prerequisites

- Ensure you have to have a working Camunda cluster in SaaS or Self-Managed.
- Ensure you have a distribution version of your Connector in the form of "fat" `jar` file.

For the purpose of this guide, we will be using a generic [Connector template](https://github.com/camunda/connector-template-outbound)
as a reference. Clone the repository, and execute `mvn clean verify package`.
This will produce a file called `target/connector-template-0.1.0-SNAPSHOT-with-dependencies.jar`. In this guide,
we will refer this file as `connector.jar`.

## Wiring your Connector with a Camunda cluster

This approach is equivalent to the [hybrid mode](./use-connectors-in-hybrid-mode.md), except you don't need to override
existing Connectors and instead add a new one. You need to have a running Camunda cluster, and a pair
of `Client ID`/`Client Secret` with `Zeebe` and `Operate` scopes.
Learn more about [how to obtain required credentials](/components/console/manage-clusters/manage-api-clients.md).

Run the following command:

```shell
docker run --rm --name=CustomConnectorInSaaS \
    -v $PWD/connector.jar:/opt/app/connector.jar \
    -e ZEEBE_CLIENT_SECURITY_PLAINTEXT=false \
    -e ZEEBE_CLIENT_CLOUD_CLUSTER-ID='<YOUR_CLUSTER_ID>' \
    -e ZEEBE_CLIENT_CLOUD_CLIENT-ID='<YOUR_CLIENT_ID>' \
    -e ZEEBE_CLIENT_CLOUD_CLIENT-SECRET='<YOUR_CLIENT_SECRET>' \
    -e ZEEBE_CLIENT_CLOUD_REGION='<YOUR_CLUSTER_REGION>' \
    -e CAMUNDA_OPERATE_CLIENT_URL='https://<region>.operate.camunda.io/<cluster-id>' \
        camunda/connectors-bundle:<desired-version>
```

The line `-v $PWD/connector.jar:/opt/app/connector.jar` binds a volume with your Connector at the path `$PWD/connector.jar`
of you local machine.

## Wiring your Connector with Camunda Docker instance (without Keycloak)

This option is applicable if you launch your cluster in a Self-Managed version with
[Camunda Docker Compose variant without Keycloak](https://github.com/camunda/camunda-platform/blob/main/docker-compose-core.yaml).

Run the following command:

```shell
docker run --rm --name=CustomConnectorInSMCore \
    -v $PWD/connector.jar:/opt/app/connector.jar \
    --network=camunda-platform_camunda-platform \
    -e ZEEBE_CLIENT_BROKER_GATEWAY-ADDRESS=zeebe:26500 \
    -e ZEEBE_CLIENT_SECURITY_PLAINTEXT=true \
    -e CAMUNDA_OPERATE_CLIENT_URL=http://operate:8080 \
    -e CAMUNDA_OPERATE_CLIENT_USERNAME=demo \
    -e CAMUNDA_OPERATE_CLIENT_PASSWORD=demo \
        camunda/connectors-bundle:<desired-version>
```

:::note
Exact values of the environment variables related to Zeebe, Operate, or network may depend on your own configuration.
:::

## Wiring your Connector with Camunda Docker instance (with Keycloak)

This option is applicable if you launch your cluster in a Self-Managed version with
[Camunda Platform Docker Compose variant with Keycloak](https://github.com/camunda/camunda-platform/blob/main/docker-compose.yaml).

Run the following command:

```shell
docker run --rm --name=CustomConnectorInSMWithKeyCloak \
    -v $PWD/connector.jar:/opt/app/connector.jar \
    --network=camunda-platform_camunda-platform \
    -e ZEEBE_CLIENT_BROKER_GATEWAY-ADDRESS=zeebe:26500 \
    -e ZEEBE_CLIENT_SECURITY_PLAINTEXT=true \
    -e ZEEBE_CLIENT_ID=<YOUR_ZEEBE_CLIENT_ID> \
    -e ZEEBE_CLIENT_SECRET=<YOUR_ZEEBE_CLIENT_SECRET> \
    -e ZEEBE_CLIENT_CONFIG_PATH=/tmp/zeebe_auth_cache \
    -e ZEEBE_TOKEN_AUDIENCE=zeebe-api \
    -e ZEEBE_AUTHORIZATION_SERVER_URL=http://keycloak:18080/auth/realms/camunda-platform/protocol/openid-connect/token \
    -e CAMUNDA_IDENTITY_TYPE=KEYCLOAK \
    -e CAMUNDA_IDENTITY_AUDIENCE=operate-api \
    -e CAMUNDA_IDENTITY_ISSUER_BACKEND_URL=http://keycloak:18080/auth/realms/camunda-platform \
    -e CAMUNDA_IDENTITY_CLIENT_ID=connectors \
    -e CAMUNDA_IDENTITY_CLIENT_SECRET=<YOUR_OPERATE_SECRET> \
    -e CAMUNDA_OPERATE_CLIENT_URL=http://operate:8080 \
        camunda/connectors-bundle:<desired-version>
```

:::note
Exact values of the environment variables related to Zeebe, Operate, Keycloak, or network may depend on
your own configuration.
:::

## Wiring your Connector with Camunda Helm charts

There are multiple ways to configure a Helm/Kubernetes Self-Managed cluster.
Refer to the [official guide](/self-managed/setup/overview.md) to learn more.

For the purpose of this section, imagine you installed Helm charts with `helm install dev camunda/camunda-platform`,
and forwarded Zeebe, Operate, and Keycloak ports:

- `kubectl port-forward svc/dev-zeebe-gateway 26500:26500`
- `kubectl port-forward svc/dev-operate 8081:80`
- `kubectl port-forward svc/dev-keycloak 18080:80`

Now, you need to obtain both Zeebe and Connectors' Operate OAuth clients. You can do it with `kubectl get secret dev-zeebe-identity-secret -o jsonpath="{.data.*}" | base64 --decode`
and `kubectl get secret dev-connectors-identity-secret -o jsonpath="{.data.*}" | base64 --decode` respectively.

Run the following command:

```shell
docker run --rm --name=CustomConnectorInSMWithHelm \
    -v $PWD/connector.jar:/opt/app/connector.jar \
    -e ZEEBE_CLIENT_BROKER_GATEWAY-ADDRESS=host.docker.internal:26500 \
    -e ZEEBE_CLIENT_SECURITY_PLAINTEXT=true \
    -e ZEEBE_CLIENT_ID=zeebe \
    -e ZEEBE_CLIENT_SECRET=<YOUR_ZEEBE_CLIENT_SECRET> \
    -e ZEEBE_CLIENT_CONFIG_PATH=/tmp/zeebe_auth_cache \
    -e ZEEBE_TOKEN_AUDIENCE=zeebe-api \
    -e ZEEBE_AUTHORIZATION_SERVER_URL=http://host.docker.internal:18080/auth/realms/camunda-platform/protocol/openid-connect/token \
    -e CAMUNDA_IDENTITY_TYPE=KEYCLOAK \
    -e CAMUNDA_IDENTITY_AUDIENCE=operate-api \
    -e CAMUNDA_IDENTITY_ISSUER_BACKEND_URL=http://host.docker.internal:18080/auth/realms/camunda-platform \
    -e CAMUNDA_IDENTITY_CLIENT_ID=connectors \
    -e CAMUNDA_IDENTITY_CLIENT_SECRET=<YOUR_OPERATE_CLIENT_SECRET> \
    -e CAMUNDA_OPERATE_CLIENT_URL=http://host.docker.internal:8081 \
        camunda/connectors-bundle:<desired-version>
```

:::note
Exact values of the environment variables related to Zeebe, Operate, Keycloak, or network may depend on
your own configuration.
:::
