---
id: host-custom-connectors
title: Host Custom Connectors
description: "The following document provides explanation on how to host a custom Connector developed with Connectors SDK."
---

This guide explains how to host your own **Connectors** developed with [Connectors SDK](/components/connectors/custom-built-connectors/connector-sdk/).

## Prerequisites

Firstly, you have to have a working Camunda cluster: either cloud, or self-managed one. Secondly, you need a
distribution version of your Connector in the form of "fat" `jar` file.

For the purpose of this guide, we will be using a generic [Connector template](https://github.com/camunda/connector-template-outbound)
as a reference. To prepare it, all you need to do is to clone the repository, and execute `mvn clean verify package`.
This will produce a file `target/connector-template-0.1.0-SNAPSHOT-with-dependencies.jar`. Further down in this guide,
we will refer this file as `connector.jar`.

## Wiring Connector with Camunda cloud cluster

This approach is equivalent to the [hybrid mode](./use-connectors-in-hybrid-mode.md), except you don't need to override
existing Connectors but to add a new one. You need to have a running Camunda cluster, and a pair
of `Client ID`/`Client Secret` with `Zeebe` and `Operate` scopes.
[Learn more](../../components/console/manage-clusters/manage-api-clients/) about how to obtain required credentials.

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

## Wiring Connector with Camunda Docker instance (without KeyCloak)

This option is applicable if you launch your Camunda cluster in self-managed version with
[Camunda Platform Docker Compose variant without Keycloak](https://github.com/camunda/camunda-platform/blob/main/docker-compose-core.yaml).

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

Please be mindful, that exact values of the environment variables related to Zeebe, Operate, or network may depend on
your own configuration.

## Wiring Connector with Camunda Docker instance (with KeyCloak)

This option is applicable if you launch your Camunda cluster in self-managed version with
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
    -e ZEEBE_TOKEN_AUDIENCE=zeebe-api \
    -e ZEEBE_AUTHORIZATION_SERVER_URL=http://keycloak:8080/auth/realms/camunda-platform/protocol/openid-connect/token \
    -e CAMUNDA_OPERATE_CLIENT_KEYCLOAK-URL=http://keycloak:8080 \
    -e CAMUNDA_OPERATE_CLIENT_CLIENT-ID=connectors \
    -e CAMUNDA_OPERATE_CLIENT_CLIENT-SECRET=<YOUR_OPERATE_CLIENT_SECRET> \
    -e CAMUNDA_OPERATE_CLIENT_KEYCLOAK-REALM=<YOUR_KEYCLOAK_OPERATE_REALM> \
    -e CAMUNDA_OPERATE_CLIENT_URL=http://operate:8080 \
        camunda/connectors-bundle:<desired-version>
```

Please be mindful, that exact values of the environment variables related to Zeebe, Operate, Keycloak, or network may depend on
your own configuration.

## Wiring Connector with Camunda Helm Charts

There are multiple ways to configure Helm/Kubernetes Camunda self-managed cluster.
Refer to the [official guide](/self-managed/platform-deployment/helm-kubernetes/overview/) to learn more.

For the purpose of this section, let's consider, you installed Helm charts with `helm install dev camunda/camunda-platform`,
and forwarded Zeebe, Operate, and Keycloak ports:

- `kubectl port-forward svc/dev-zeebe-gateway 26500:26500`
- `kubectl port-forward svc/dev-operate  8081:80`
- `kubectl port-forward svc/dev-keycloak 18080:80`

Now you need to obtain both Zeebe and Connectors' Operate OAuth clients. You can do it with `kubectl get secret dev-zeebe-identity-secret -o jsonpath="{.data.*}" | base64 --decode`
and `kubectl get secret dev-connectors-identity-secret -o jsonpath="{.data.*}" | base64 --decode` respectively.

Run the following command:

```shell
docker run --rm --name=CustomConnectorInSMWithHelm \
    -v $PWD/connector.jar:/opt/app/connector.jar \
    -e ZEEBE_CLIENT_BROKER_GATEWAY-ADDRESS=host.docker.internal:26500 \
    -e ZEEBE_CLIENT_SECURITY_PLAINTEXT=true \
    -e ZEEBE_CLIENT_ID=zeebe \
    -e ZEEBE_CLIENT_SECRET=<YOUR_ZEEBE_CLIENT_SECRET> \
    -e ZEEBE_TOKEN_AUDIENCE=zeebe-api \
    -e ZEEBE_AUTHORIZATION_SERVER_URL=http://host.docker.internal:18080/auth/realms/camunda-platform/protocol/openid-connect/token \
    -e CAMUNDA_OPERATE_CLIENT_KEYCLOAK-URL=http://host.docker.internal:18080 \
    -e CAMUNDA_OPERATE_CLIENT_CLIENT-ID=connectors \
    -e CAMUNDA_OPERATE_CLIENT_CLIENT-SECRET=<YOUR_OPERATE_CLIENT_SECRET> \
    -e CAMUNDA_OPERATE_CLIENT_KEYCLOAK-REALM=camunda-platform \
    -e CAMUNDA_OPERATE_CLIENT_URL=http://host.docker.internal:8081 \
        camunda/connectors-bundle:<desired-version>
```

Please be mindful, that exact values of the environment variables related to Zeebe, Operate, Keycloak, or network may depend on
your own configuration.
