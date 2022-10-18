---
id: air-gapped-installation
title: "Installing in an air-gapped environment"
description: "Camunda Platform 8 Self-Managed installation in an air-gapped environment"
---

Also in an air-gapped environment, one would like to profit from the [Camunda Platform Helm chart](../../helm-kubernetes/deploy.md). By default the images are fetched via docker hub.
With the dependencies to third-party images and helm charts, additional steps are required to have all charts available.

## Required Images

The following images must be available in your air-gapped environment:

- [camunda/zeebe](https://hub.docker.com/r/camunda/zeebe)
- [camunda/operate](https://hub.docker.com/r/camunda/operate)
- [camunda/tasklist](https://hub.docker.com/r/camunda/tasklist)
- [camunda/optimize](https://hub.docker.com/r/camunda/optimize)
- [camunda/identity](https://hub.docker.com/r/camunda/identity)
- [postgres](https://hub.docker.com/_/postgres)
- [bitnami/keycloak](https://hub.docker.com/r/bitnami/keycloak)
- [elasticsearch](https://hub.docker.com/_/elasticsearch)

## Required Helm Charts

The following charts must be available in your air-gapped environment:

- [Camunda Platform Helm Chart](https://github.com/camunda/camunda-platform-helm)
- [Elasticsearch Helm Chart](https://github.com/elastic/helm-charts/tree/main/elasticsearch)
- [Keycloak Helm Chart](https://github.com/bitnami/charts/tree/master/bitnami/keycloak)
- [Postgres Helm Chart](https://github.com/bitnami/charts/tree/master/bitnami/postgresql/)

## Dependencies explained

Identity utilizes Keycloak and allows you to manage users, roles, and permissions for Camunda Platform 8 components. This third-party dependency is reflected in the Helm Chart as follows:

```
camunda-platform
    |_ elasticsearch
    |_ identity
        |_ keycloak
            |_ postgresql
    |_ zeebe
    |_ optimize
    |_ operate
    |_ tasklist
```

- Keycloak is a dependency for Camunda Identity and PostgreSQL is a dependency for Keycloak.
- Elasticsearch is a dependency for Zeebe, Operate, Tasklist and Optimize.

The values for the dependencies Keycloak and PostgreSQL can be set in the same hierarchy.

```yaml
identity:
  [identity values]
  keycloak:
    [keycloak values]
    postgresql:
      [postgresql values]
```

## Push Images to your repository

All the [required images](#required-images) need to be pushed to your repository.

1. Tag your image using the following command (replace `<IMAGE ID>`, `<DOCKER REPOSITORY>` and `<DOCKER TAG>` with the corresponding values)

```
docker tag <IMAGE_ID> example.jfrog.io/camunda/<DOCKER_IMAGE>:<DOCKER_TAG>
```

2. Push your image using the following command

```
docker push example.jfrog.io/camunda/<DOCKER_IMAGE>:<DOCKER_TAG>
```

## Deploy Helm Charts to your repository

You have to deploy the [required Helm Charts](#required-helm-charts) to your repository.
E.g. In JFrog you can do it via the Artifactory's REST API.

```
curl -u <USER>:<PASSWORD> -T <PATH_TO_FILE> "https://example.jfrog.io/artifactory/camunda-platform/<TARGET_FILE_PATH>"
```

Alternatively, you can setup remote repositories (e.g. with url: https://helm.camunda.io for Camunda Charts, https://helm.elastic.co for Elastic)

### Add your Helm repositories

You have to add your Helm chart repositories in order to use the charts.

```
helm repo add camunda https://example.jfrog.io/artifactory/api/helm/camunda-platform
helm repo add elastic https://example.jfrog.io/artifactory/api/helm/elastic
helm repo add bitnami https://example.jfrog.io/artifactory/api/helm/bitnami
helm repo update
```

### Helm Chart values

In a custom values file, it is possible to override the image repository and the image tag.

```yaml
zeebe:
  image:
    repository: example.jfrog.io/camunda/zeebe
    # e.g. work with the latest versions in development
    tag: latest
zeebe-gateway:
  image:
    repository: example.jfrog.io/camunda/zeebe
    tag: latest
elasticsearch:
  image: example.jfrog.io/elastic/elasticsearch
  imageTag: 7.16.3
identity:
  image:
    repository: example.jfrog.io/camunda/identity
    ...
  keycloak:
    image:
      repository: example.jfrog.io/bitnami/keycloak
      ...
    postgresql:
      image:
        repository: example.jfrog.io/bitnami/postgres
        ...
operate:
  image:
    repository: example.jfrog.io/camunda/operate
    ...
tasklist:
  image:
    repository: example.jfrog.io/camunda/tasklist
    ...
optimize:
  image:
    repository: example.jfrog.io/camunda/optimize
    ...
```

Afterwards you can deploy Camunda Platform using Helm and the custom values file.

```
helm install my-camunda-platform camunda-cloud/camunda-platform -f values.yaml
```
