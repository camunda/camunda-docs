---
id: host-custom-connectors
title: Host custom connectors
description: "Learn how to host a custom connector developed with Connector SDK."
---

This guide explains how to run your own connector, developed with the [Connector SDK](/components/connectors/custom-built-connectors/connector-sdk.md), in the Camunda connector runtime Docker image and connect it to a Camunda 8 SaaS or Self-Managed cluster.

## How the runtime loads your connector

The Camunda connector runtime Docker images load every JAR found in the `/opt/custom` directory at startup. Mount your connector JAR into that directory, and the runtime discovers the connector under the type declared in its `@OutboundConnector` or `@InboundConnector` annotation. No additional configuration is required to load the JAR.

An outbound connector becomes a job worker for that type as soon as the runtime starts. An inbound connector is hosted the same way, but the runtime activates it only when you deploy a process that uses it, so the startup log shows no job worker line for it.

Two images are available:

| Image                       | Contents                                                                        |
| --------------------------- | ------------------------------------------------------------------------------- |
| `camunda/connectors-bundle` | The runtime plus all Camunda out-of-the-box connectors. Used in this guide.     |
| `camunda/connectors`        | The runtime only. Use this image if you want to run just your custom connector. |

Use the latest image version with the same minor version as your cluster, for example an `8.9.X` image for a Camunda 8.9 cluster. Browse the available tags on [Docker Hub](https://hub.docker.com/r/camunda/connectors-bundle/tags).

If you don't want to run the runtime as a standalone Docker container, use one of these alternatives instead of this guide:

- To run the connector inside a Kubernetes cluster deployed with the Camunda Helm chart, see [run custom connectors in Helm charts](/self-managed/deployment/helm/configure/running-custom-connectors.md).
- To embed the runtime in your own Spring Boot application, see the [Spring Boot Starter runtime](/components/connectors/custom-built-connectors/connector-sdk.md#spring-boot-starter-runtime).
- To run the runtime as a plain Java process, see [run Connectors](/self-managed/deployment/manual/install.md#run-connectors) in the manual installation guide.

## Prerequisites

- A running Camunda 8.8 or later cluster, either SaaS or Self-Managed.
- Docker installed on the machine that hosts the connector.
- Your connector built as a "fat" JAR that bundles its dependencies.

This guide uses the [outbound connector template](https://github.com/camunda/connector-template-outbound) as the example connector. Clone the repository, and execute `mvn clean verify package`.
This produces two JAR files in the `target/` directory. Use `connector-template-0.1.0-SNAPSHOT.jar` (the JAR that bundles all dependencies). Ignore `original-connector-template-0.1.0-SNAPSHOT.jar` (the JAR without dependencies).

In this guide, `connector.jar` refers to `connector-template-0.1.0-SNAPSHOT.jar`. Run every `docker run` command from the directory that contains the file, because the commands mount it from `$PWD`.

## Connect to a Camunda 8 SaaS cluster

Running your own connector runtime against a SaaS cluster is a form of [hybrid mode](/components/connectors/use-connectors-in-hybrid-mode.md): the SaaS cluster keeps running the out-of-the-box connectors, and your local runtime adds the custom connector.

You need a running SaaS cluster and an API client with the **Orchestration Cluster API** scope. If your connector uses cluster secrets, also add the **Secrets** scope and enable the [SaaS secret provider](/components/connectors/use-connectors-in-hybrid-mode.md#using-saas-secrets). Learn more about [how to create an API client](/components/hub/organization/manage-clusters/manage-api-clients.md).

Run the following command:

```shell
docker run --rm --name=custom-connector \
    -v $PWD/connector.jar:/opt/custom/connector.jar \
    -e CAMUNDA_CLIENT_MODE=saas \
    -e CAMUNDA_CLIENT_CLOUD_REGION='<YOUR_CLUSTER_REGION>' \
    -e CAMUNDA_CLIENT_CLOUD_CLUSTERID='<YOUR_CLUSTER_ID>' \
    -e CAMUNDA_CLIENT_AUTH_CLIENTID='<YOUR_CLIENT_ID>' \
    -e CAMUNDA_CLIENT_AUTH_CLIENTSECRET='<YOUR_CLIENT_SECRET>' \
        camunda/connectors-bundle:<desired-version>
```

The line `-v $PWD/connector.jar:/opt/custom/connector.jar` mounts the JAR from your local machine into the `/opt/custom` directory of the container, where the runtime picks it up.

The `camunda/connectors-bundle` image also starts job workers for all out-of-the-box connectors, using the same job types as the connectors hosted in SaaS. Both runtimes then share those jobs. If you only want to run your custom connector, use the `camunda/connectors` image instead, or [disable individual connectors](/self-managed/components/connectors/connectors-configuration.md#disabling-individual-connectors).

## Connect to a Docker Compose cluster

The [Camunda Docker Compose distribution](https://github.com/camunda/camunda-distributions/tree/main/docker-compose) provides two variants. Both run the Orchestration Cluster as the `orchestration` service, with the gRPC API on port `26500` and the REST API on port `8080`. If you are not sure which variant is running, check `docker ps` for a `keycloak` container, which only the full variant starts.

| Compose file               | Docker network     | Authentication                                                  |
| -------------------------- | ------------------ | --------------------------------------------------------------- |
| `docker-compose.yaml`      | `camunda`          | Basic authentication for the web UI, API unprotected by default |
| `docker-compose-full.yaml` | `camunda-platform` | OIDC through Keycloak                                           |

### Docker Compose without Keycloak

If you started the cluster with `docker-compose.yaml`, run the following command:

```shell
docker run --rm --name=custom-connector \
    -v $PWD/connector.jar:/opt/custom/connector.jar \
    --network=camunda \
    -e CAMUNDA_CLIENT_MODE=self-managed \
    -e CAMUNDA_CLIENT_GRPCADDRESS=http://orchestration:26500 \
    -e CAMUNDA_CLIENT_RESTADDRESS=http://orchestration:8080 \
        camunda/connectors-bundle:<desired-version>
```

If you protected the API with basic authentication, add the credentials:

```shell
    -e CAMUNDA_CLIENT_AUTH_METHOD=basic \
    -e CAMUNDA_CLIENT_AUTH_USERNAME=demo \
    -e CAMUNDA_CLIENT_AUTH_PASSWORD=demo \
```

Instead of starting a second container, you can also add the JAR to the `connectors` service that the Compose file already runs. Mount it into `/opt/custom` in a `docker-compose.override.yaml` file next to the Compose file, then restart the stack:

```yaml
services:
  connectors:
    volumes:
      - ./connector.jar:/opt/custom/connector.jar
```

### Docker Compose with Keycloak

If you started the cluster with `docker-compose-full.yaml`, the runtime authenticates with the `connectors` OIDC client. Its secret is the value of `CONNECTORS_CLIENT_SECRET` in the `.env` file of the distribution.

Keycloak is addressed as `host.docker.internal` so the issuer in the token matches the issuer the Orchestration Cluster expects. The `--add-host` flag makes that hostname resolve inside the container on Linux.

Run the following command:

```shell
docker run --rm --name=custom-connector \
    -v $PWD/connector.jar:/opt/custom/connector.jar \
    --network=camunda-platform \
    --add-host=host.docker.internal:host-gateway \
    -e CAMUNDA_CLIENT_MODE=self-managed \
    -e CAMUNDA_CLIENT_GRPCADDRESS=http://orchestration:26500 \
    -e CAMUNDA_CLIENT_RESTADDRESS=http://orchestration:8080 \
    -e CAMUNDA_CLIENT_AUTH_METHOD=oidc \
    -e CAMUNDA_CLIENT_AUTH_TOKENURL=http://host.docker.internal:18080/auth/realms/camunda-platform/protocol/openid-connect/token \
    -e CAMUNDA_CLIENT_AUTH_CLIENTID=connectors \
    -e CAMUNDA_CLIENT_AUTH_CLIENTSECRET='<CONNECTORS_CLIENT_SECRET>' \
    -e CAMUNDA_CLIENT_AUTH_AUDIENCE=orchestration-api \
        camunda/connectors-bundle:<desired-version>
```

:::note
The service names, network names, and Keycloak realm shown here are the defaults of the distribution. If you changed them, adjust the values accordingly.
:::

## Connect to a Helm chart cluster

For production use, deploy the connector inside the Kubernetes cluster by following [run custom connectors in Helm charts](/self-managed/deployment/helm/configure/running-custom-connectors.md). The following steps instead run the runtime on your local machine against a port-forwarded cluster, which is a quick way to test the connector.

This section assumes you installed the chart as described in the [quick install guide](/self-managed/deployment/helm/install/quick-install.md), where the Orchestration Cluster uses basic authentication with the default `demo`/`demo` credentials. Forward the Orchestration Cluster ports, using the namespace you installed the chart into:

```bash
kubectl port-forward svc/camunda-zeebe-gateway 26500:26500 -n orchestration
kubectl port-forward svc/camunda-zeebe-gateway 8080:8080 -n orchestration
```

Run the following command:

```shell
docker run --rm --name=custom-connector \
    -v $PWD/connector.jar:/opt/custom/connector.jar \
    --add-host=host.docker.internal:host-gateway \
    -e CAMUNDA_CLIENT_MODE=self-managed \
    -e CAMUNDA_CLIENT_GRPCADDRESS=http://host.docker.internal:26500 \
    -e CAMUNDA_CLIENT_RESTADDRESS=http://host.docker.internal:8080 \
    -e CAMUNDA_CLIENT_AUTH_METHOD=basic \
    -e CAMUNDA_CLIENT_AUTH_USERNAME=demo \
    -e CAMUNDA_CLIENT_AUTH_PASSWORD=demo \
        camunda/connectors-bundle:<desired-version>
```

If your cluster uses OIDC with [Keycloak](/self-managed/deployment/helm/configure/authentication-and-authorization/internal-keycloak.md), replace the three `CAMUNDA_CLIENT_AUTH_*` basic authentication variables with the [OIDC variables](/self-managed/components/connectors/connectors-configuration.md#authentication-methods), and forward the Keycloak port with `kubectl port-forward svc/keycloak-service 18080:18080`. Use the `connectors` client as `CAMUNDA_CLIENT_AUTH_CLIENTID`, and read its secret for `CAMUNDA_CLIENT_AUTH_CLIENTSECRET` from the `<release>-connectors-identity-secret` secret that the chart creates. The following command assumes the release name `camunda`:

```bash
kubectl get secret camunda-connectors-identity-secret -o jsonpath="{.data.connectors-secret}" -n orchestration | base64 --decode
```

## Verify the connector is running

When the runtime starts, it logs one line per registered connector. For the connector template, look for the following line in the output of `docker logs custom-connector`:

```
Starting job worker: My Connector with type io.camunda:example:1
```

To test the connector end to end, [make its element template available](/components/connectors/custom-built-connectors/connector-templates.md#make-custom-connector-templates-available) in Web Modeler or Desktop Modeler, model a process that uses it, and run the process. The task completes when your runtime picks up the job.

If the task stays active in Operate, check the following:

- The task definition type in the element template matches the type in the connector's `@OutboundConnector` annotation.
- The runtime log shows no connection or authentication errors. A wrong address, credential, or audience produces repeated `Failed to activate jobs` warnings.
- The JAR is a fat JAR. A JAR without dependencies fails with `ClassNotFoundException` errors at startup.

## Configuration reference

The runtime connects to the gRPC and REST APIs of the Orchestration Cluster only. Since Camunda 8.8, it does not need a connection to Operate. The examples on this page use the following environment variables. For all available options, see the [connector runtime configuration](/self-managed/components/connectors/connectors-configuration.md).

| Environment variable               | Purpose                                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| `CAMUNDA_CLIENT_MODE`              | `saas` or `self-managed`. Selects the defaults for the other connection settings.                 |
| `CAMUNDA_CLIENT_CLOUD_REGION`      | SaaS only. The region of your cluster, for example `bru-2`.                                       |
| `CAMUNDA_CLIENT_CLOUD_CLUSTERID`   | SaaS only. The ID of your cluster.                                                                |
| `CAMUNDA_CLIENT_GRPCADDRESS`       | Self-Managed only. The gRPC address of the Orchestration Cluster, including the `http://` scheme. |
| `CAMUNDA_CLIENT_RESTADDRESS`       | Self-Managed only. The REST address of the Orchestration Cluster, including the `http://` scheme. |
| `CAMUNDA_CLIENT_AUTH_METHOD`       | Self-Managed only. `none`, `basic`, or `oidc`.                                                    |
| `CAMUNDA_CLIENT_AUTH_USERNAME`     | Username for basic authentication.                                                                |
| `CAMUNDA_CLIENT_AUTH_PASSWORD`     | Password for basic authentication.                                                                |
| `CAMUNDA_CLIENT_AUTH_CLIENTID`     | Client ID for SaaS or OIDC authentication.                                                        |
| `CAMUNDA_CLIENT_AUTH_CLIENTSECRET` | Client secret for SaaS or OIDC authentication.                                                    |
| `CAMUNDA_CLIENT_AUTH_TOKENURL`     | OIDC only. The token endpoint of the identity provider.                                           |
| `CAMUNDA_CLIENT_AUTH_AUDIENCE`     | OIDC only. The audience the Orchestration Cluster expects in the token.                           |

Interested in creating a custom connector? Review the related Camunda Academy courses on [creating a custom inbound connector](https://academy.camunda.com/c8-custom-inbound-connectors) or [creating a custom outbound connector](https://academy.camunda.com/c8-custom-outbound-connectors).
