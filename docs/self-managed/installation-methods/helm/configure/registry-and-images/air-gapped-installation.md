---
id: air-gapped-installation
sidebar_label: Air-gapped environment
title: Helm chart air-gapped environment installation
description: "Camunda 8 Self-Managed installation in an air-gapped environment"
---

The [Camunda Helm chart](/self-managed/installation-methods/helm/install.md) may assist in an air-gapped environment. By default, the Docker images are fetched via Docker Hub.
With the dependencies in third-party Docker images and Helm charts, additional steps are required to make all charts available as outlined in this resource.

:::info Bitnami images in air-gapped environments

For air-gapped deployments, you'll need to mirror Bitnami infrastructure images if you choose to use the embedded subcharts. These include PostgreSQL (for Identity and Web Modeler), Elasticsearch (for data storage), and Keycloak (for authentication). Note that these components are only required if you're not using external managed services or separately deployed infrastructure.

For comprehensive information about Bitnami image types and security considerations, see [Install Bitnami enterprise images](/self-managed/installation-methods/helm/configure/registry-and-images/install-bitnami-enterprise-images.md).

:::

To find out the necessary Docker images for your Helm release, note that the required images depend on the values you specify for your deployment. You can get an overview of all required images by running the following command:

```shell
helm repo add camunda https://helm.camunda.io
helm repo update
helm template camunda/camunda-platform -f values.yaml | grep 'image:'
```

## Required Docker images

The following images must be available in your air-gapped environment:

**Camunda images:**

- [camunda/zeebe](https://hub.docker.com/r/camunda/zeebe)
- [camunda/operate](https://hub.docker.com/r/camunda/operate)
- [camunda/tasklist](https://hub.docker.com/r/camunda/tasklist)
- [camunda/optimize](https://hub.docker.com/r/camunda/optimize)
- [camunda/connectors-bundle](https://hub.docker.com/r/camunda/connectors-bundle)
- [camunda/identity](https://hub.docker.com/r/camunda/identity)

**Infrastructure images (choose one option):**

_Option A: Open-source Bitnami images (default)_

- [bitnami/postgresql](https://hub.docker.com/r/bitnamilegacy/postgresql)
- [bitnami/keycloak](https://hub.docker.com/r/bitnamilegacy/keycloak)
- [bitnami/os-shell](https://hub.docker.com/r/bitnamilegacy/os-shell/)
- [bitnami/elasticsearch](https://hub.docker.com/r/bitnamilegacy/elasticsearch/)

_Option B: Enterprise Bitnami Premium images (recommended for production)_

- `registry.camunda.cloud/bitnamipremium/postgresql` (requires enterprise credentials)
- `registry.camunda.cloud/bitnamipremium/keycloak` (requires enterprise credentials)
- `registry.camunda.cloud/bitnamipremium/os-shell` (requires enterprise credentials)
- `registry.camunda.cloud/bitnamipremium/elasticsearch` (requires enterprise credentials)

**Optional components:**

- [Web Modeler images](/self-managed/installation-methods/docker/docker.md#component-images):
  - [camunda/web-modeler-restapi](https://hub.docker.com/r/camunda/web-modeler-restapi)
  - [camunda/web-modeler-webapp](https://hub.docker.com/r/camunda/web-modeler-webapp)
  - [camunda/web-modeler-websockets](https://hub.docker.com/r/camunda/web-modeler-websockets)
- [Console images](/self-managed/installation-methods/docker/docker.md#component-images):
  - `console/console-sm`

We currently have a script in the [camunda-helm-respository](https://github.com/camunda/camunda-platform-helm/blob/c6a6e0c327f2acb8746802fbe03b3774b8284de3/scripts/download-chart-docker-images.sh) that will assist in pulling and saving Docker images.

## Accessing Camunda images from Camunda Docker Registry

All required Docker images, available on DockerHub's Camunda and Bitnami organizations, are also provided publicly via Camunda's Docker registry: `registry.camunda.cloud/camunda/<image>` and `registry.camunda.cloud/bitnami/<image>`

For example, the Docker image of Zeebe and PostgreSQL can be pulled via DockerHub or via the Camunda's Docker Registry:

```shell
docker pull camunda/zeebe:latest
docker pull registry.camunda.cloud/camunda/zeebe:latest

docker pull bitnamilegacy/postgresql:latest
docker pull registry.camunda.cloud/bitnami/postgresql:latest
```

### Accessing enterprise images with Skopeo

For enterprise customers using Bitnami Premium images from the `vendor-ee` registry, you can use [Skopeo](https://github.com/containers/skopeo) to copy images directly to your private registry without requiring Docker to be installed locally:

```shell
# Copy Bitnami Premium PostgreSQL image
skopeo copy --src-creds=<your-username>:<your-password> \
  docker://registry.camunda.cloud/vendor-ee/postgresql:16.6.0-debian-12-r0 \
  docker://your-private-registry.com/bitnami/postgresql:16.6.0-debian-12-r0

# Copy Bitnami Premium Elasticsearch image
skopeo copy --src-creds=<your-username>:<your-password> \
  docker://registry.camunda.cloud/vendor-ee/elasticsearch:8.11.4-debian-12-r0 \
  docker://your-private-registry.com/bitnami/elasticsearch:8.11.4-debian-12-r0

# Copy Bitnami Premium Keycloak image
skopeo copy --src-creds=<your-username>:<your-password> \
  docker://registry.camunda.cloud/vendor-ee/keycloak:26.0.7-debian-12-r0 \
  docker://your-private-registry.com/bitnami/keycloak:26.0.7-debian-12-r0
```

**Configuration notes:**

- Replace `<your-username>` and `<your-password>` with your Camunda Enterprise LDAP credentials
- Replace `your-private-registry.com` with your actual private registry URL
- Use the specific image tags that match your Helm chart version requirements
- For a complete list of available enterprise images and their tags, see [Install Bitnami enterprise images](/self-managed/installation-methods/helm/configure/registry-and-images/install-bitnami-enterprise-images.md)

## Required Helm charts

The [Camunda Helm chart](https://artifacthub.io/packages/helm/camunda/camunda-platform)
must be available in your air-gapped environment.
It can be downloaded from [GitHub](https://github.com/camunda/camunda-platform-helm/releases) or via the following commands:

```shell
helm repo add camunda https://helm.camunda.io
helm repo update
helm pull camunda/camunda-platform
```

The package is self-contained and already includes the following dependencies:

- [Elasticsearch Helm chart](https://artifacthub.io/packages/helm/bitnami/elasticsearch)
- [Keycloak Helm chart](https://artifacthub.io/packages/helm/bitnami/keycloak)
- [Postgres Helm chart](https://artifacthub.io/packages/helm/bitnami/postgresql)
- [Bitnami Common Helm chart](https://artifacthub.io/packages/helm/bitnami/common)

Install the Helm chart by either making it available on a [private repository](https://helm.sh/docs/topics/chart_repository/) that can be accessed from the air-gapped environment or by providing the downloaded chart archive locally to Helm, for example:

```shell
helm install camunda --version $HELM_CHART_VERSION ./camunda-platform-11.1.0.tgz
```

For supported versions, refer to [supported environments](/reference/supported-environments.md#camunda-8-self-managed).

## Dependencies explained

Identity utilizes Keycloak and allows you to manage users, roles, and permissions for Camunda 8 components. This third-party dependency is reflected in the Helm chart as follows:

```
camunda-platform
    |_ elasticsearch
    |_ identity
    |_ identityKeycloak
        |_ postgresql
    |_ zeebe
    |_ zeebeGateway
    |_ optimize
    |_ operate
    |_ tasklist
    |_ connectors
    |_ webModeler
    |_ postgresql
```

- Keycloak is a dependency for Camunda Identity and PostgreSQL is a dependency for Keycloak.
- PostgreSQL is a dependency for Web Modeler.
  - This dependency is optional as you can either install PostgreSQL with Helm or use an existing [external database](/self-managed/installation-methods/helm/install.md#optional-configure-external-database).
- Elasticsearch is a dependency for Zeebe, Operate, Tasklist, and Optimize.
- Connectors can be stand-alone; however if there's an intention to use inbound capabilities, Operate becomes a dependency.

The values for the dependencies Keycloak and PostgreSQL can be set in the same hierarchy:

```yaml
identity:
  [identity values]
identityKeycloak:
  [keycloak values]
  postgresql:
    [postgresql values]
```

## Push Docker images to your repository

All the [required Docker images](#required-docker-images) need to be pushed to your repository using the following steps:

1. Tag your image using the following command (replace `<IMAGE ID>`, `<DOCKER REPOSITORY>`, and `<DOCKER TAG>` with the corresponding values.)

```shell
docker tag <IMAGE_ID> example.jfrog.io/camunda/<DOCKER_IMAGE>:<DOCKER_TAG>
```

2. Push your image using the following command:

```shell
docker push example.jfrog.io/camunda/<DOCKER_IMAGE>:<DOCKER_TAG>
```

## Deploy Helm charts to your repository

You must deploy the [required Helm charts](#required-helm-charts) to your repository.
For details about hosting options, visit the [chart repository guide](https://helm.sh/docs/topics/chart_repository).

### Add your Helm repository

You must add your Helm chart repository to use the chart:

```shell
helm repo add camunda https://example.jfrog.io/artifactory/api/helm/camunda-platform
helm repo update
```

### Helm chart values

In a custom values file, it is possible to override the image repository and the image tag.

```yaml
global:
  image:
    registry: example.jfrog.io
zeebe:
  image:
    repository: camunda/zeebe
    # e.g. work with the latest versions in development
    tag: latest
zeebeGateway:
  image:
    repository: camunda/zeebe
elasticsearch:
  image:
    registry: example.jfrog.io
    repository: bitnamilegacy/os-shell
  sysctlImage:
    registry: example.jfrog.io
    repository: bitnamilegacy/elasticsearch
identity:
  image:
    repository: camunda/identity
    ...
identityKeycloak:
  image:
    registry: example.jfrog.io
    repository: bitnamilegacy/keycloak
    ...
  postgresql:
    image:
      registry: example.jfrog.io
      repository: bitnamilegacy/postgresql

      ...
operate:
  image:
    repository: camunda/operate
    ...
tasklist:
  image:
    repository: camunda/tasklist
    ...
optimize:
  image:
    repository: camunda/optimize
    ...
connectors:
  image:
    repository: camunda/connectors-bundle
    ...
webModeler:
  image:
    # registry and tag will be used for all three Web Modeler images
    tag: latest
  restapi:
    image:
      repository: camunda/web-modeler-restapi
  webapp:
    image:
      repository: camunda/web-modeler-webapp
  websockets:
    image:
      repository: camunda/web-modeler-websockets
  ...
postgresql:
  image:
    registry: example.jfrog.io
    repository: bitnamilegacy/postgresql
  ...
```

Afterwards, you can deploy Camunda using Helm and the custom values file.

```shell
helm install camunda camunda/camunda-platform --version $HELM_CHART_VERSION -f values.yaml
```
