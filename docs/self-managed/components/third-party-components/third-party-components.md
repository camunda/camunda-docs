---
id: third-party-components
title: "Third-party infrastructure components"
description: "Overview of third-party components required by Camunda 8"
---

Learn about the third-party components used by Camunda 8 and how to deploy them in your self-managed environment.

## Overview

Camunda 8 relies on several third-party components that support core features such as data persistence, authentication, and observability. These components are critical to the platform's stability and performance.

The main third-party components are:

* **Elasticsearch**
* **PostgreSQL**
* **Keycloak**

Each of these plays a distinct role in supporting Camunda 8’s functionality.

### Elasticsearch

Elasticsearch is primarily used by the Zeebe cluster, which streams data into it. This data is then consumed by **Orchestration Cluster** and **Optimize**.

Elasticsearch is a critical component as it reflects the state of process instances and provides Zeebe with a form of long-term memory. Without Elasticsearch, Zeebe cannot retain historical data or support monitoring and analysis tools effectively.

### PostgreSQL

PostgreSQL is used by several Camunda 8 components to persist data:

* **Web Modeler**: stores UI-related data and configurations.
* **Keycloak**: stores authentication and user management data.
* **Management Identity**: stores permissions, roles, and RBAC configurations.

You can deploy a separate PostgreSQL instance for each service or use a shared PostgreSQL deployment, depending on your architecture and operational requirements.

### Keycloak

In the absence of an available OIDC provider, **Management Identity** uses **Keycloak** as the authentication source for Camunda 8. It handles login, user federation, and token issuance.

## How to host these dependencies

These third-party services are critical to Camunda 8. It is therefore recommended to use **managed services** provided by cloud vendors, ideally with dedicated teams handling operations and maintenance. This is reflected in the [reference architectures](/self-managed/reference-architecture/reference-architecture.md#architecture) where available managed options are shown.

Camunda 8 consumes these services and is therefore impacted by their configuration, version, and support lifecycle.

### What if your cloud provider doesn’t offer a service?

If a managed service is not available from your provider, you can **self-host** the dependency.

#### Containers

This is commonly done in Kubernetes installations using [Bitnami containers](https://github.com/bitnami/containers) and their associated Helm charts ([Bitnami charts](https://github.com/bitnami/charts)). These services can be deployed alongside your Camunda 8 deployment.

For an example, see the [Kubernetes installation guide](/self-managed/reference-architecture/kubernetes.md#database).

This also works with Docker Compose, using the same Bitnami container images as referenced in the Kubernetes instructions.

:::note

Camunda recommends using your organization’s managed services when available.

:::

#### Lifecycle management of Bitnami and other third-party container images

Camunda provides **customers** with Bitnami-based container images that are patched and maintained according to vendor practices. To use these images, refer to the instructions under [enterprise images](/self-managed/installation-methods/helm/index.md#install-with-vendor-enterprise-images).

These Bitnami images are updated in alignment with [Broadcom’s Bitnami secure image lifecycle](https://news.broadcom.com/app-dev/broadcom-introduces-bitnami-secure-images-for-production-ready-containerized-applications), ensuring production-grade security and reliability.

#### Alternative Installations

You may also install these services following each vendor’s official documentation. Always ensure that the **Camunda-supported versions** are respected—see the [supported environments reference](/reference/supported-environments/) for details.
