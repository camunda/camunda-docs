---
id: deployment
title: "Camunda Platform 8 Helm deployment"
sidebar_label: "Deployment"
---

Camunda provides continuously improved Helm charts which are not cloud provider-specific, so you can choose your Kubernetes provider. The charts are available in [Camunda Platform Helm repository](https://github.com/camunda/camunda-platform-helm) and we encourage you to [report issues](https://github.com/camunda/camunda-platform-helm/issues) if you find any of them.

## What is Helm?

[Helm](https://helm.sh/) is a package manager for Kubernetes resources. Helm allows us to install a set of components by simply referencing a package name, and allowing us to override configurations to accommodate these packages to different scenarios.

Helm also provides dependency management between charts, meaning that charts can depend on other charts. This allows us to aggregate a set of components together that can be installed with a single command.

## Components installed by the Helm charts

By default, the following charts will be installed as part of Camunda Platform 8 Self-Managed:

- **Zeebe**: Deploys a Zeebe Cluster with three brokers using the `camunda/zeebe` docker image.
- **Zeebe Gateway**: Deploys the standalone Zeebe Gateway with two replicas.
- **Operate**: Deploys Operate, which connects to an existing Elasticsearch.
- **Tasklist**: Deploys the Tasklist component to work with user tasks.
- **Optimize**: Deploys the Optimize component to analyze the historic process executions.
- **Identity**: Deploys the Identity component responsible for authentication and authorization.
- **Elasticsearch**: Deploys an Elasticsearch cluster with two nodes.

![Charts](../assets/c8sm-helm-charts.png)

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
Change &gt;RELEASE_NAME&lt; with a name of your choice.

Also, notice that you can add the `-n` flag to specify in which Kubernetes namespace the components should be installed.
:::

Notice that this Kubernetes cluster can have services which are already running; Camunda components are simply installed as another set of services.

Installing all the components in a cluster requires all Docker images to be downloaded to the remote cluster. Depending on which Cloud provider you are using, the amount of time it will take to fetch all the images will vary.

Review the progress of your deployment by checking if the Kubernetes PODs are up and running with the following:

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

Review the progress of your deployment by checking if the Kubernetes PODs are up and running with the following:

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

### Troubleshooting the installation

Check that each pod is running and ready. If one or more of your pods stay pending, it means that it can not be scheduled onto a node. Usually this happens because there are insufficient resources that prevent it. Use the `kubectl describe ...` command to check on messages from the scheduler:

```
kubectl describe pods <POD_NAME>
```

If the output of the `describe` command was not beneficial, tail the logs of these pods by running the following:

```
kubectl logs -f <POD_NAME>
```

## Upgrading from one Helm release to another

To upgrade to a more recent version of the Camunda Platform Helm charts, there are certain things you need to keep in mind.

Normally for a Helm upgrade, you run the [Helm upgrade](https://helm.sh/docs/helm/helm_upgrade/) command. If you have disabled Camunda Identity component and the related authentication mechanism, you should be able to easily do an upgrade via this command, `helm upgrade`.

However, if Camunda Identity component is enabled (this is the default), the upgrade path is a bit more complex than just running `helm upgrade`. Read the next sections to familiarize yourself with the upgrade process.

### Upgrading with Identity and secrets

If you have installed the Camunda Platform 8 Helm charts before with default values, this means Identity and the related authentication mechanism are enabled. For authentication, the Helm charts generate for each web app the secrets randomly if not specified on installation. If you just run `helm upgrade` to upgrade to a newer chart version, you likely will see the following return:

```shell
helm upgrade camunda-platform-test camunda/camunda-platform

Error: UPGRADE FAILED: execution error at (camunda-platform/charts/identity/templates/tasklist-secret.yaml:10:22):
PASSWORDS ERROR: You must provide your current passwords when upgrading the release.
                 Note that even after reinstallation, old credentials may be needed as they may be kept in persistent volume claims.
                 Further information can be obtained at https://docs.bitnami.com/general/how-to/troubleshoot-helm-chart-issues/#credential-errors-while-upgrading-chart-releases

    'global.identity.auth.tasklist.existingSecret' must not be empty, please add '--set global.identity.auth.tasklist.existingSecret=$TASKLIST_SECRET' to the command. To get the current value:

        export TASKLIST_SECRET=$(kubectl get secret --namespace "zell-c8-optimize" "camunda-platform-test-tasklist-identity-secret" -o jsonpath="{.data.tasklist-secret}" | base64 --decode)
```

As mentioned, this output returns because secrets are randomly generated with the first Helm installation by default if not further specified. We use a library chart [provided by Bitnami](https://github.com/bitnami/charts/tree/master/bitnami/common) for this. The generated secrets are persisted on persistent volume claims (PVCs), which are not maintained by Helm.

If you remove the Helm chart release or do an upgrade, PVCs are not removed nor recreated. On an upgrade, secrets can be recreated by Helm, and could lead to the regeneration of the secret values. This would mean that newly-generated secrets wouldn't longer match with the persisted secrets. To avoid such an issue, Bitnami blocks the upgrade path and prints the help message as shown above.

In the error message, Bitnami links to their well-described [troubleshooting guide](https://docs.bitnami.com/general/how-to/troubleshoot-helm-chart-issues/#credential-errors-while-upgrading-chart-releases). However, to avoid confusion we will step through the troubleshooting process in this guide as well.

### Secrets extraction

For a successful upgrade, you first need to extract all secrets which were previously generated.

:::note
You also need to extract all secrets which were generated for Keycloak, since Keycloak is a dependency of Identity.
:::

To extract the secrets, use the following code snippet. Make sure to replace `<RELEASE_NAME>` with your chosen Helm RELEASE_NAME.

```shell
export TASKLIST_SECRET=$(kubectl get secret "<RELEASE_NAME>-tasklist-identity-secret" -o jsonpath="{.data.tasklist-secret}" | base64 --decode)
export OPTIMIZE_SECRET=$(kubectl get secret "<RELEASE_NAME>-optimize-identity-secret" -o jsonpath="{.data.optimize-secret}" | base64 --decode)
export OPERATE_SECRET=$(kubectl get secret "<RELEASE_NAME>-operate-identity-secret" -o jsonpath="{.data.operate-secret}" | base64 --decode)
export KEYCLOAK_ADMIN_SECRET=$(kubectl get secret "<RELEASE_NAME>-keycloak" -o jsonpath="{.data.admin-password}" | base64 --decode)
export KEYCLOAK_MANAGEMENT_SECRET=$(kubectl get secret "<RELEASE_NAME>-keycloak" -o jsonpath="{.data.management-password}" | base64 --decode)
export POSTGRESQL_SECRET=$(kubectl get secret "<RELEASE_NAME>-postgresql" -o jsonpath="{.data.postgres-password}" | base64 --decode)
```

After exporting all secrets into environment variables, run the following upgrade command.

```shell
helm upgrade <RELEASE_NAME> charts/camunda-platform/ \
  --set global.identity.auth.tasklist.existingSecret=$TASKLIST_SECRET \
  --set global.identity.auth.optimize.existingSecret=$OPTIMIZE_SECRET \
  --set global.identity.auth.operate.existingSecret=$OPERATE_SECRET \
  --set identity.keycloak.auth.adminPassword=$KEYCLOAK_ADMIN_SECRET \
  --set identity.keycloak.auth.managementPassword=$KEYCLOAK_MANAGEMENT_SECRET \
  --set identity.keycloak.postgresql.auth.password=$POSTGRESQL_SECRET
```

:::note
If you have specified on the first installation certain values, you have to specify them again on the upgrade. Either via `--set` or the values file and the `-f` flag.
:::

For more details on the Keycloak upgrade path, you can also read the [Bitnami Keycloak upgrade guide](https://docs.bitnami.com/kubernetes/apps/keycloak/administration/upgrade/).

## General notes

- **Zeebe gateway** is deployed as a stateless service. We support [Kubernetes startup and liveness probes](../../zeebe-deployment/configuration/gateway-health-probes.md) for Zeebe.
- **Zeebe broker nodes** need to be deployed as a [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) to preserve the identity of cluster nodes. StatefulSets require persistent storage, which must be allocated in advance. Depending on your cloud provider, the persistent storage differs as it is provider-specific.
