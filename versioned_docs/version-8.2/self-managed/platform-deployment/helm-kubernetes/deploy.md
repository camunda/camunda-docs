---
id: deploy
title: "Camunda Platform 8 Helm deployment"
sidebar_label: "Deploy"
description: "Camunda provides continuously improved Helm charts which are not cloud provider-specific, so you can choose your Kubernetes provider."
---

Camunda provides continuously improved Helm charts which are not cloud provider-specific, so you can choose your Kubernetes provider. The charts are available in [Camunda Platform Helm repository](https://github.com/camunda/camunda-platform-helm) and we encourage you to [report issues](https://github.com/camunda/camunda-platform-helm/issues) if you find any of them.

## What is Helm?

[Helm](https://helm.sh/) is a package manager for Kubernetes resources. Helm allows us to install a set of components by simply referencing a package name, and allowing us to override configurations to accommodate these packages to different scenarios.

Helm also provides dependency management between charts, meaning that charts can depend on other charts. This allows us to aggregate a set of components together that can be installed with a single command.

## Components installed by the Helm charts

The following charts will be installed as part of Camunda Platform 8 Self-Managed:

- **Zeebe**: Deploys a Zeebe Cluster with three brokers using the `camunda/zeebe` Docker image.
- **Zeebe Gateway**: Deploys the standalone Zeebe Gateway with two replicas.
- **Operate**: Deploys Operate, which connects to an existing Elasticsearch.
- **Tasklist**: Deploys the Tasklist component to work with user tasks.
- **Optimize**: Deploys the Optimize component to analyze the historic process executions.
- **Identity**: Deploys the Identity component responsible for authentication and authorization.
- **Elasticsearch**: Deploys an Elasticsearch cluster with two nodes.
- **Web Modeler**: Deploys the Web Modeler component that allows you to model BPMN processes in a collaborative way.
  - _Note_: The chart is disabled by default and needs to be [enabled explicitly](#installing-web-modeler) as Web Modeler is only available to enterprise customers.

:::note Connectors
We do not provide a Helm chart for Connectors in Self-Managed yet.
:::

![Camunda Platform 8 Self-Managed Architecture Diagram](../../platform-architecture/assets/camunda-platform-8-self-managed-architecture-diagram-combined-ingress.png)

When installing the [camunda-platform](https://github.com/camunda/camunda-platform-helm/tree/main/charts/camunda-platform) Helm chart, all the components in this picture are installed.

## Install Camunda Platform 8 using Helm

### Prerequisites

Before deploying Camunda Platform using Helm you need the following:

- [Kubernetes cluster](./overview.md#kubernetes-environments): either local, cloud platform, or on-premise.
- [Helm](https://helm.sh/docs/intro/install/) binary.
- [Kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) binary.

### Adding Camunda Helm repository

You have to add the Camunda Helm chart repository in order to use the charts. Once this is done, Helm is able to fetch and install charts hosted in [https://helm.camunda.io](https://helm.camunda.io):

```
helm repo add camunda https://helm.camunda.io
helm repo update
```

Once this is completed, we are ready to install the Helm chart hosted in the official Camunda Helm chart repo.

### Installing the Camunda Helm chart

To install the available Camunda Platform 8 components inside a Kubernetes cluster, you can simply run:

```
helm install <RELEASE_NAME> camunda/camunda-platform
```

:::note
Replace &lt;RELEASE_NAME&gt; with a name of your choice.

You can also add the `-n` flag to specify in which Kubernetes namespace the components should be installed.

The command does not install Web Modeler by default. To enable Web Modeler, refer to the [installation instructions](#installing-web-modeler) below.
:::

Notice that this Kubernetes cluster can have services which are already running; Camunda components are simply installed as another set of services.

Installing all the components in a cluster requires all Docker images to be downloaded to the remote cluster. Depending on which Cloud provider you are using, the amount of time it will take to fetch all the images will vary.

Review the progress of your deployment by checking if the Kubernetes pods are up and running with the following:

```
kubectl get pods
```

This will return something similar to the following:

```
NAME                                           READY   STATUS              RESTARTS   AGE
<RELEASE_NAME>-keycloak-0                       0/1     Pending             0          4s
<RELEASE_NAME>-identity-6bb5d864cc-kk6dv        0/1     ContainerCreating   0          4s
<RELEASE_NAME>-operate-cb597fd76-6vr2x          0/1     ContainerCreating   0          4s
<RELEASE_NAME>-optimize-676955b547-vxts7        0/1     ContainerCreating   0          4s
<RELEASE_NAME>-postgresql-0                     0/1     Pending             0          4s
<RELEASE_NAME>-tasklist-5bf5c56f7b-sdwg7        0/1     ContainerCreating   0          4s
<RELEASE_NAME>-zeebe-0                          0/1     Pending             0          4s
<RELEASE_NAME>-zeebe-1                          0/1     ContainerCreating   0          4s
<RELEASE_NAME>-zeebe-2                          0/1     Pending             0          4s
<RELEASE_NAME>-zeebe-gateway-657b774f95-bbcx5   0/1     ContainerCreating   0          4s
<RELEASE_NAME>-zeebe-gateway-657b774f95-gmlbm   0/1     Running             0          4s
elasticsearch-master-0                          0/1     Pending             0          4s
elasticsearch-master-1                          0/1     Init:0/1            0          4s
```

Review the progress of your deployment by checking if the Kubernetes pods are up and running with the following:

```
kubectl get pods
```

This will return something similar to the following:

```
NAME                                                   READY   STATUS    RESTARTS   AGE
elasticsearch-master-0                                 1/1     Running   0          4m6s
<RELEASE_NAME>-operate-XXX                             1/1     Running   0          4m6s
<RELEASE_NAME>-zeebe-0                                 1/1     Running   0          4m6s
<RELEASE_NAME>-tasklist-XXX                            1/1     Running   0          4m6s
<RELEASE_NAME>-zeebe-gateway                           1/1     Running   0          4m6s
```

### Installing Web Modeler

:::note
Web Modeler Self-Managed is available to [enterprise customers](../../../reference/licenses.md#web-modeler) only.
:::

To install the Camunda Helm chart with Web Modeler enabled, follow the steps below.

#### Create image pull secret

The Docker images for Web Modeler are not publicly accessible, but available to enterprise customers only from Camunda's private Docker registry.
To enable Kubernetes to pull the images from this registry, first [create an image pull secret](https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod) using the credentials you received from Camunda:

```bash
kubectl create secret docker-registry <REGISTRY_SECRET_NAME> \
  --docker-server=registry.camunda.cloud \
  --docker-username=<DOCKER_USER> \
  --docker-password=<DOCKER_PASSWORD> \
  --docker-email=<DOCKER_EMAIL>
```

:::note
Replace `<REGISTRY_SECRET_NAME>` with a name of your choice and `<DOCKER_USER>`, `<DOCKER_PASSWORD>`, and `<DOCKER_EMAIL>` with your credentials.

The secret must be created in the same Kubernetes namespace you will install the Helm chart in. Use the `-n` flag to specify a namespace.
:::

Alternatively, create an image pull secret [from your Docker configuration file](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#registry-secret-existing-credentials).

#### Configure Web Modeler

To set up Web Modeler, you need to provide the following required configuration values (all available configuration options are described in more detail in the Helm chart's [README](https://github.com/camunda/camunda-platform-helm/tree/main/charts/camunda-platform#web-modeler) file):

- Enable Web Modeler with `webModeler.enabled: true` (it is disabled by default).
- Configure the previously created [image pull secret](#create-image-pull-secret) in `webModeler.image.pullSecrets`.
- Configure your SMTP server by providing the values under `webModeler.restapi.mail`.
  - Web Modeler requires an SMTP server to send notification emails to users.
- Configure the database connection
  - Web Modeler requires a PostgreSQL database as persistent data storage (other database systems are currently not supported).
  - _Option 1_: Set `postgresql.enabled: true`. This will install a new PostgreSQL instance as part of the Helm release (using the [PostgreSQL Helm chart](https://github.com/bitnami/charts/tree/main/bitnami/postgresql) by Bitnami as a dependency).
  - _Option 2_: Set `postgresql.enabled: false` and configure a [connection to an external database](#optional-configure-external-database).

We recommend specifying these values in a YAML file that you pass to the `helm install` command. A minimum configuration file would look as follows:

```yaml
webModeler:
  enabled: true
  image:
    pullSecrets:
      # replace with the name of the previously created secret
      - name: <REGISTRY_SECRET_NAME>
  restapi:
    mail:
      smtpHost: smtp.example.com
      smtpPort: 587
      smtpUser: user
      smtpPassword: secret
      # email address to be displayed as sender of emails from Web Modeler
      fromAddress: no-reply@example.com
postgresql:
  enabled: true
```

#### Optional: Configure external database

If you don't want to install a new PostgreSQL instance with Helm, but connect Web Modeler to an existing external database, set `postgresql.enabled: false` and provide the values under `webModeler.restapi.externalDatabase`:

```yaml
webModeler:
  restapi:
    externalDatabase:
      host: postgres.example.com
      port: 5432
      database: modeler-db
      user: modeler-user
      password: secret
postgresql:
  # disables the PostgreSQL chart dependency
  enabled: false
```

#### Install the Helm chart

Assuming you have saved your configuration in `modeler-values.yaml`, install the Helm chart by running the following:

```
helm install --values modeler-values.yaml <RELEASE_NAME> camunda/camunda-platform
```

### Troubleshooting the installation

Check that each pod is running and ready. If one or more of your pods stay pending, it means that it can not be scheduled onto a node. Usually this happens because there are insufficient resources that prevent it. Use the `kubectl describe ...` command to check on messages from the scheduler:

```
kubectl describe pods <POD_NAME>
```

If the output of the `describe` command was not beneficial, tail the logs of these pods by running the following:

```
kubectl logs -f <POD_NAME>
```

## Upgrading Camunda Helm chart

For upgrading Camunda Helm chart from one release to another, perform a [Helm upgrade](upgrade.md).

## General notes

- **Zeebe gateway** is deployed as a stateless service. We support [Kubernetes startup and liveness probes](../../zeebe-deployment/configuration/gateway-health-probes.md) for Zeebe.
- **Zeebe broker nodes** need to be deployed as a [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) to preserve the identity of cluster nodes. StatefulSets require persistent storage, which must be allocated in advance. Depending on your cloud provider, the persistent storage differs as it is provider-specific.
