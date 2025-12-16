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
- Access to a connected environment to pull required Camunda and Bitnami images
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
  - [camunda/web-modeler-webapp](https://hub.docker.com/r/camunda/web-modeler-webapp)
  - [camunda/web-modeler-websockets](https://hub.docker.com/r/camunda/web-modeler-websockets)
- [Console images](/self-managed/deployment/docker/docker.md#component-images):
  - `console/console-sm`

**Infrastructure images:**

:::info When are infrastructure images needed?
For air-gapped deployments, you must mirror Bitnami infrastructure images only if you use the embedded subcharts. These include PostgreSQL (for Identity and Web Modeler), Elasticsearch (for data storage), and Keycloak (for authentication).

Skip this section if you're using external managed services or separately deployed infrastructure.
:::

Choose one of the following image options:

#### Option A: Open-source Bitnami images (community default)

- [bitnamilegacy/postgresql](https://hub.docker.com/r/bitnamilegacy/postgresql)
- [camunda/keycloak](https://hub.docker.com/r/camunda/keycloak) (tag: `bitnami-*`)
- [bitnamilegacy/os-shell](https://hub.docker.com/r/bitnamilegacy/os-shell/)
- [bitnamilegacy/elasticsearch](https://hub.docker.com/r/bitnamilegacy/elasticsearch/)

:::warning Not recommended for production
These open-source images are the community default but are not recommended for production environments due to security and support limitations. Customers should transition to Option B or use managed infrastructure services.
:::

#### Option B: Enterprise Bitnami Premium images (recommended)

- `registry.camunda.cloud/vendor-ee/postgresql` (requires enterprise credentials)
- `registry.camunda.cloud/keycloak-ee/keycloak` (tag: `bitnami-ee-*`, requires enterprise credentials)
- `registry.camunda.cloud/vendor-ee/os-shell` (requires enterprise credentials)
- `registry.camunda.cloud/vendor-ee/elasticsearch` (requires enterprise credentials)

:::tip Enterprise benefits
The `vendor-ee` registry provides proxied access to Bitnami Premium images from Broadcom, offering enhanced security patches, enterprise support, and compliance features.

For detailed configuration and installation instructions, see [Install Bitnami enterprise images](/self-managed/deployment/helm/configure/registry-and-images/install-bitnami-enterprise-images.md).
:::

#### Camunda Keycloak images

Camunda provides custom [Keycloak images](https://github.com/camunda/keycloak) that include the AWS JDBC wrapper and Camunda Identity theme. These images follow Bitnami's environment variable conventions.

| Variant     | Registry                                                                | Tag prefix     | Availability        |
| ----------- | ----------------------------------------------------------------------- | -------------- | ------------------- |
| Open-source | [docker.io/camunda/keycloak](https://hub.docker.com/r/camunda/keycloak) | `bitnami-*`    | Public (Docker Hub) |
| Enterprise  | `registry.camunda.cloud/keycloak-ee/keycloak`                           | `bitnami-ee-*` | Licensed customers  |

For backward compatibility, both variants are also available without the prefix in their respective registries.

:::note
The open-source variant is based on the `bitnamilegacy` repository and receives no further updates from Bitnami. For production environments, use the enterprise variant or a managed Keycloak service.
:::

:::tip About the original Bitnami Keycloak images
If you prefer to use the original Bitnami Keycloak images directly (`bitnamilegacy/keycloak` or `registry.camunda.cloud/vendor-ee/keycloak`), you can override the image in your Helm values. This is not required, as Camunda Keycloak images are fully compatible and recommended.
:::

A helper script is available in the [camunda-helm-respository](https://github.com/camunda/camunda-platform-helm/blob/c6a6e0c327f2acb8746802fbe03b3774b8284de3/scripts/download-chart-docker-images.sh) to pull and save Docker images.

### Access Camunda images from the Camunda registry

All required images published on Docker Hub (Camunda and Bitnami organizations) are also available in the Camunda registry:

- `registry.camunda.cloud/camunda/<image>`
- `registry.camunda.cloud/bitnami/<image>`

For example, you can pull the Zeebe and PostgreSQL images from Docker Hub or the Camunda registry:

```shell
docker pull camunda/zeebe:latest
docker pull registry.camunda.cloud/camunda/zeebe:latest

docker pull bitnamilegacy/postgresql:latest
docker pull registry.camunda.cloud/bitnami/postgresql:latest
```

### Access enterprise images with Skopeo

:::info Registry migration notice
As of November 30, 2025, our image vendor has migrated its repositories. All images downloaded before this date remain available but are no longer listable by the `skopeo` command. The `skopeo` command will return only images added by Bitnami after November 30, 2025.
:::

If you use Bitnami Premium images from the `vendor-ee` registry, you can use [Skopeo](https://github.com/containers/skopeo) to copy images directly to your private registry without requiring Docker locally:

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

- Replace `<your-username>` and `<your-password>` with your Camunda Enterprise LDAP credentials.
- Replace `your-private-registry.com` with your actual private registry URL.
- Use the image tags that match your Helm chart version requirements.
- For a complete list of available enterprise images and their tags, see [Install Bitnami enterprise images](/self-managed/deployment/helm/configure/registry-and-images/install-bitnami-enterprise-images.md).

### Required Helm charts

The [Camunda Helm chart](https://artifacthub.io/packages/helm/camunda/camunda-platform) must be available in your air-gapped environment.
Download it from [GitHub](https://github.com/camunda/camunda-platform-helm/releases) or run:

```shell
helm repo add camunda https://helm.camunda.io
helm repo update
helm pull camunda/camunda-platform
```

The package is self-contained and includes these dependencies:

- [Elasticsearch Helm chart](https://artifacthub.io/packages/helm/bitnami/elasticsearch)
- [Keycloak Helm chart](https://artifacthub.io/packages/helm/bitnami/keycloak)
- [Postgres Helm chart](https://artifacthub.io/packages/helm/bitnami/postgresql)
- [Bitnami Common Helm chart](https://artifacthub.io/packages/helm/bitnami/common)

Install the Helm chart by either making it available in a [private repository](https://helm.sh/docs/topics/chart_repository/) that can be accessed from the air-gapped environment or providing the downloaded chart archive locally, for example:

```shell
helm install camunda --version $HELM_CHART_VERSION ./camunda-platform-11.1.0.tgz
```

For supported versions, see [supported environments](/reference/supported-environments.md#camunda-8-self-managed) and the [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md).

### Dependency overview

Identity uses Keycloak and lets you manage users, roles, and permissions for Camunda 8 components. This third-party dependency is reflected in the Helm chart as follows:

```
camunda-platform
    |_ elasticsearch
    |_ identity
    |_ identityKeycloak
        |_ postgresql
    |_ orchestration
    |_ optimize
    |_ connectors
    |_ webModeler
    |_ postgresql
```

- Keycloak depends on Camunda Identity, and PostgreSQL depends on Keycloak.
- PostgreSQL is also a dependency for Web Modeler.
  - This dependency is optional: you can install PostgreSQL with Helm or use an existing [external database](/self-managed/deployment/helm/install/quick-install.md#optional-configure-external-database).
- Elasticsearch is a dependency for the Orchestration Cluster and Optimize.
- Connectors can run stand-alone, but if you use inbound capabilities, Operate becomes a dependency.

You can configure Keycloak and PostgreSQL values at the same hierarchy level:

```yaml
identity:
  [identity values]
identityKeycloak:
  [keycloak values]
  postgresql:
    [postgresql values]
```

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
elasticsearch:
  image:
    registry: example.jfrog.io
    repository: bitnamilegacy/elasticsearch
  sysctlImage:
    registry: example.jfrog.io
    repository: bitnamilegacy/os-shell
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

#### Deploy Camunda with custom values

Finally, deploy Camunda with Helm using the custom values file:

```shell
helm install camunda camunda/camunda-platform --version $HELM_CHART_VERSION -f values.yaml
```

## Best practices

- **Mirror images and charts regularly**: Sync images and charts on a schedule to avoid version drift.
- **Pin versions**: Use explicit tags instead of `latest` to ensure reproducibility.
- **Validate charts**: Test Helm charts in a staging air-gapped environment before production.
- **Monitor dependencies**: Track Bitnami and Camunda dependency updates, since they affect required images.
- **Secure access**: Restrict permissions to your private registry and Helm repository.
