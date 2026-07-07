---
id: air-gapped-installation
sidebar_label: Air-gapped environment
title: Install Helm chart in air-gapped environments
description: Install Camunda 8 Self-Managed in an air-gapped environment.
---

The [Camunda Helm chart](/self-managed/deployment/helm/install/quick-install.md) supports installation in air-gapped environments. By default, Docker images are pulled from Docker Hub. Because the chart depends on third-party images and charts, additional steps are required to make all charts available in your environment.

## Prerequisites

- A private Docker registry accessible from your air-gapped environment
- A private or local Helm chart repository
- Access to a connected environment to pull the required Camunda and infrastructure images
- [Helm CLI](https://helm.sh/docs/intro/install/) installed
- `kubectl` access to your Kubernetes cluster

## Configuration

### List required images

The Docker images required for your Helm release depend on your `values.yaml`. To list the required images, run the following command:

```shell
helm repo add camunda https://helm.camunda.io
helm repo update
helm template camunda/camunda-platform -f values.yaml | grep 'image:'
```

### Required Docker images

The following images must be available in your air-gapped environment:

**Camunda images:**

- [camunda/zeebe](https://hub.docker.com/r/camunda/zeebe)
- [camunda/optimize](https://hub.docker.com/r/camunda/optimize)
- [camunda/connectors-bundle](https://hub.docker.com/r/camunda/connectors-bundle)
- [camunda/identity](https://hub.docker.com/r/camunda/identity)

**Optional components:**

- [Web Modeler images](/self-managed/deployment/docker/docker.md#component-images):
  - [camunda/web-modeler-restapi](https://hub.docker.com/r/camunda/web-modeler-restapi)
  - [camunda/web-modeler-websockets](https://hub.docker.com/r/camunda/web-modeler-websockets)
- [Console images](/self-managed/deployment/docker/docker.md#component-images):
  - `console/console-sm`

**Infrastructure images:**

In Camunda 8.10, the Helm chart no longer bundles infrastructure: the Bitnami subcharts for PostgreSQL, Elasticsearch, and Keycloak are removed. Provide these through managed services or Kubernetes operators, and mirror the images each one requires into your private registry, following the operator or managed-service documentation. See [operator-based infrastructure](/self-managed/deployment/helm/configure/operator-based-infrastructure.md).

:::note
For the air-gapped procedure based on the bundled Bitnami subcharts (Camunda 8.9 and earlier), see the [8.9 air-gapped guide](https://docs.camunda.io/docs/8.9/self-managed/deployment/helm/configure/registry-and-images/air-gapped-installation/).
:::

A helper script is available in the [camunda-helm-repository](https://github.com/camunda/camunda-platform-helm/blob/c6a6e0c327f2acb8746802fbe03b3774b8284de3/scripts/download-chart-docker-images.sh) to pull and save the Camunda Docker images.

### Access Camunda images from the Camunda registry

All required Camunda images published on Docker Hub are also available in the Camunda registry:

- `registry.camunda.cloud/camunda/<image>`

For example, you can pull the Zeebe image from Docker Hub or the Camunda registry:

```shell
docker pull camunda/zeebe:latest
docker pull registry.camunda.cloud/camunda/zeebe:latest
```

### Required Helm charts

The [Camunda Helm chart](https://artifacthub.io/packages/helm/camunda/camunda-platform) must be available in your air-gapped environment.
Download it from [GitHub](https://github.com/camunda/camunda-platform-helm/releases) or run:

```shell
helm repo add camunda https://helm.camunda.io
helm repo update
helm pull camunda/camunda-platform
```

If you deploy infrastructure (PostgreSQL, Elasticsearch, Keycloak) with Kubernetes operators or managed services, also make their Helm charts or images available in your air-gapped environment, following their documentation.

Install the Helm chart by either making it available in a [private repository](https://helm.sh/docs/topics/chart_repository/) that can be accessed from the air-gapped environment or providing the downloaded chart archive locally, for example:

```shell
helm install camunda --version $HELM_CHART_VERSION ./camunda-platform-11.1.0.tgz
```

For supported versions, see [supported environments](/reference/supported-environments.md#camunda-8-self-managed) and the [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md).

### Push Docker images to a repository

Push all [required Docker images](#required-docker-images) to your repository:

1. Tag the image:

   ```shell
   docker tag <IMAGE_ID> example.jfrog.io/camunda/<DOCKER_IMAGE>:<DOCKER_TAG>
   ```

1. Push the image:

   ```shell
   docker push example.jfrog.io/camunda/<DOCKER_IMAGE>:<DOCKER_TAG>
   ```

### Deploy Helm charts to a repository

You must deploy the [required Helm charts](#required-helm-charts) to your repository. For hosting options, see the [chart repository guide](https://helm.sh/docs/topics/chart_repository).

#### Add a Helm repository

To use the chart, add your Helm chart repository:

```shell
helm repo add camunda https://example.jfrog.io/artifactory/api/helm/camunda-platform
helm repo update
```

#### Override Helm chart values

You can override the image registry and tag in a custom `values.yaml` file:

```yaml
global:
  image:
    registry: example.jfrog.io
orchestration:
  image:
    repository: camunda/zeebe
    # e.g. work with the latest versions in development
    tag: latest
identity:
  image:
    repository: camunda/identity
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
    # registry and tag will be used for both Web Modeler images
    tag: latest
  restapi:
    image:
      repository: camunda/web-modeler-restapi
  websockets:
    image:
      repository: camunda/web-modeler-websockets
  ...
```

#### Deploy Camunda with custom values

Finally, deploy Camunda with Helm using the custom values file:

```shell
helm install camunda camunda/camunda-platform --version $HELM_CHART_VERSION -f values.yaml
```

## Best practices

- **Mirror images and charts regularly**: Sync images and charts on a schedule to avoid version drift.
- **Pin versions**: Use explicit tags instead of `latest` to ensure reproducibility.
- **Validate charts**: Test Helm charts in a staging air-gapped environment before production.
- **Monitor dependencies**: Track Camunda and infrastructure dependency updates, since they affect required images.
- **Secure access**: Restrict permissions to your private registry and Helm repository.
