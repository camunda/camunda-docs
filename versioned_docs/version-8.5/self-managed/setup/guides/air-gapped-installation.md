---
id: air-gapped-installation
title: "Installing in an air-gapped environment"
description: "Camunda 8 Self-Managed installation in an air-gapped environment"
---

The [Camunda Helm chart](/self-managed/setup/install.md) may assist in an air-gapped environment. By default, the Docker images are fetched via Docker Hub (except for [Web Modeler](/self-managed/setup/deploy/other/docker.md#web-modeler)).
With the dependencies in third-party Docker images and Helm charts, additional steps are required to make all charts available as outlined in this resource.

To find out the necessary Docker images for your Helm release, note that the required images depend on the values you specify for your deployment. You can get an overview of all required images by running the following command:

```shell
helm repo add camunda https://helm.camunda.io
helm repo update
helm template camunda/camunda-platform -f values.yaml | grep 'image:'
```

## Required Docker images

The following images must be available in your air-gapped environment:

- [camunda/zeebe](https://hub.docker.com/r/camunda/zeebe)
- [camunda/operate](https://hub.docker.com/r/camunda/operate)
- [camunda/tasklist](https://hub.docker.com/r/camunda/tasklist)
- [camunda/optimize](https://hub.docker.com/r/camunda/optimize)
- [camunda/connectors-bundle](https://hub.docker.com/r/camunda/connectors-bundle)
- [camunda/identity](https://hub.docker.com/r/camunda/identity)
- [bitnami/postgresql](https://hub.docker.com/r/bitnami/postgresql)
- [bitnami/keycloak](https://hub.docker.com/r/bitnami/keycloak)
- [bitnami/os-shell](https://hub.docker.com/r/bitnami/os-shell/)
- [bitnami/elasticsearch](https://hub.docker.com/r/bitnami/elasticsearch/)
- [bitnami/kibana](https://hub.docker.com/r/bitnami/kibana/)
- Web Modeler images (only available from [Camunda's private registry](/self-managed/setup/deploy/other/docker.md#web-modeler)):
  - `web-modeler-ee/modeler-restapi`
  - `web-modeler-ee/modeler-webapp`
  - `web-modeler-ee/modeler-websockets`
- Console images (only available from [Camunda's private registry](https://registry.camunda.cloud/)):
  - `console/console-sm`

We currently have a script in the [camunda-helm-respository](https://github.com/camunda/camunda-platform-helm/blob/c6a6e0c327f2acb8746802fbe03b3774b8284de3/scripts/download-chart-docker-images.sh) that will assist in pulling and saving Docker images.

## Accessing Camunda images from Camunda Docker Registry

Please note that all the required Docker images, available on DockerHub's Camunda and Bitnami organizations, are also provided publicly via Camunda's Docker registry: `registry.camunda.cloud/camunda/<image>` and `registry.camunda.cloud/bitnami/<image>`

For example, the Docker image of Zeebe and PostgreSQL can be pulled via DockerHub or via the Camunda's Docker Registry:

```shell
docker pull camunda/zeebe:latest
docker pull registry.camunda.cloud/camunda/zeebe:latest

docker pull bitnami/postgresql:latest
docker pull registry.camunda.cloud/bitnami/postgresql:latest
```

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
helm install camunda ./camunda-platform-11.1.0.tgz
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
  - This dependency is optional as you can either install PostgreSQL with Helm or use an existing [external database](/self-managed/setup/install.md#optional-configure-external-database).
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
    repository: bitnami/os-shell
  sysctlImage:
    registry: example.jfrog.io
    repository: bitnami/elasticsearch
identity:
  image:
    repository: camunda/identity
    ...
identityKeycloak:
  image:
    registry: example.jfrog.io
    repository: bitnami/keycloak
    ...
  postgresql:
    image:
      registry: example.jfrog.io
      repository: bitnami/postgresql

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
      repository: camunda/modeler-restapi
  webapp:
    image:
      repository: camunda/modeler-webapp
  websockets:
    image:
      repository: camunda/modeler-websockets
  ...
postgresql:
  image:
    registry: example.jfrog.io
    repository: bitnami/postgresql
  ...
```

Afterwards, you can deploy Camunda using Helm and the custom values file.

```shell
helm install my-camunda-platform camunda/camunda-platform -f values.yaml
```
