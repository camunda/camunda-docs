---
id: upgrade
title: "Upgrading Camunda Platform 8 Helm deployment"
sidebar_label: "Upgrade"
description: "To upgrade to a more recent version of the Camunda Platform Helm charts, there are certain things you need to keep in mind."
---

To upgrade to a more recent version of the Camunda Platform Helm charts, there are certain things you need to keep in mind.

### Upgrading where Identity disabled

Normally for a Helm upgrade, you run the [Helm upgrade](https://helm.sh/docs/helm/helm_upgrade/) command. If you have disabled Camunda Identity and the related authentication mechanism, you should be able to do an upgrade as follows:

```shell
helm upgrade <RELEASE_NAME>
```

However, if Camunda Identity is enabled (which is the default), the upgrade path is a bit more complex than just running `helm upgrade`. Read the next section to familiarize yourself with the upgrade process.

### Upgrading where Identity enabled

If you have installed the Camunda Platform 8 Helm charts before with default values, this means Identity and the related authentication mechanism are enabled. For authentication, the Helm charts generate for each web app the secrets randomly if not specified on installation.

## If you just tried upgrading to a newer chart version

If you have installed the Camunda Platform 8 Helm charts before with default values, this means Identity and the related authentication mechanism are enabled. For authentication, the Helm charts generate the secrets randomly if not specified on installation for each web app. If you run `helm upgrade` to upgrade to a newer chart version, you likely will see the following return:

```shell
helm upgrade camunda-platform-test camunda/camunda-platform
```

You likely will see the following error:

```shell
Error: UPGRADE FAILED: execution error at (camunda-platform/charts/identity/templates/tasklist-secret.yaml:10:22):
PASSWORDS ERROR: You must provide your current passwords when upgrading the release.
                 Note that even after reinstallation, old credentials may be needed as they may be kept in persistent volume claims.
                 Further information can be obtained at https://docs.bitnami.com/general/how-to/troubleshoot-helm-chart-issues/#credential-errors-while-upgrading-chart-releases

    'global.identity.auth.tasklist.existingSecret' must not be empty, please add '--set global.identity.auth.tasklist.existingSecret=$TASKLIST_SECRET' to the command. To get the current value:

        export TASKLIST_SECRET=$(kubectl get secret --namespace "camunda" "camunda-platform-test-tasklist-identity-secret" -o jsonpath="{.data.tasklist-secret}" | base64 --decode)
```

As mentioned, this output returns because secrets are randomly generated with the first Helm installation by default if not further specified. We use a library chart [provided by Bitnami](https://github.com/bitnami/charts/tree/master/bitnami/common) for this. The generated secrets persist on persistent volume claims (PVCs), which are not maintained by Helm.

If you remove the Helm chart release or do an upgrade, PVCs are not removed nor recreated. On an upgrade, secrets can be recreated by Helm, and could lead to the regeneration of the secret values. This would mean that newly-generated secrets would no longer match with the persisted secrets. To avoid such an issue, Bitnami blocks the upgrade path and prints the help message as shown above.

In the error message, Bitnami links to their [troubleshooting guide](https://docs.bitnami.com/general/how-to/troubleshoot-helm-chart-issues/#credential-errors-while-upgrading-chart-releases). However, to avoid confusion we will step through the troubleshooting process in this guide as well.

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
export CONNECTORS_SECRET=$(kubectl get secret "<RELEASE_NAME>-connectors-identity-secret" -o jsonpath="{.data.connectors-secret}" | base64 --decode)
export KEYCLOAK_ADMIN_SECRET=$(kubectl get secret "<RELEASE_NAME>-keycloak" -o jsonpath="{.data.admin-password}" | base64 --decode)
export KEYCLOAK_MANAGEMENT_SECRET=$(kubectl get secret "<RELEASE_NAME>-keycloak" -o jsonpath="{.data.management-password}" | base64 --decode)
export POSTGRESQL_SECRET=$(kubectl get secret "<RELEASE_NAME>-postgresql" -o jsonpath="{.data.postgres-password}" | base64 --decode)
```

After exporting all secrets into environment variables, run the following upgrade command:

```shell
helm upgrade <RELEASE_NAME> charts/camunda-platform/ \
  --set global.identity.auth.tasklist.existingSecret=$TASKLIST_SECRET \
  --set global.identity.auth.optimize.existingSecret=$OPTIMIZE_SECRET \
  --set global.identity.auth.operate.existingSecret=$OPERATE_SECRET \
  --set global.identity.auth.connectors.existingSecret=$CONNECTORS_SECRET \
  --set identity.keycloak.auth.adminPassword=$KEYCLOAK_ADMIN_SECRET \
  --set identity.keycloak.auth.managementPassword=$KEYCLOAK_MANAGEMENT_SECRET \
  --set identity.keycloak.postgresql.auth.password=$POSTGRESQL_SECRET
```

:::note
If you have specified on the first installation certain values, you have to specify them again on the upgrade either via `--set` or the values file and the `-f` flag.
:::

For more details on the Keycloak upgrade path, you can also read the [Bitnami Keycloak upgrade guide](https://docs.bitnami.com/kubernetes/apps/keycloak/administration/upgrade/).

## Version update instructions

### v8.2

Camunda Platform v8.2 uses Keycloak v19 which depends on PostgreSQL v15. That is a major change for the dependencies. Currently there are two recommended options to upgrade from Camunda Platform 8.1.x to 8.2.x:

1. Follow the official PostgreSQL upgrade guide: [Upgrading a PostgreSQL Cluster v15](https://www.postgresql.org/docs/15/upgrading.html). However, it requires some manual work and longer downtime to do the database schema upgrade.
2. Use the previous version of PostgreSQL v14 in Camunda Platform v8.2, this should be simple and it will work seamlessly.

**Method 1: Upgrade the database schema to work with PostgreSQL v15**

TBA

**Method 2: Use the previous version PostgreSQL v14**

You can set the PostgreSQL either by values file or CLI.

By values file:

```yaml
identity:
  keycloak:
    postgresql:
      image:
        tag: 14.5.0
```

By CLI:

```yaml
helm upgrade [...] --set identity.keycloak.postgresql.image.tag=14.5.0
```

### v8.0.13

If you installed Camunda Platform 8 using Helm charts before `8.0.13`, you need to apply the following steps to handle the new Elasticsearch labels.

As a prerequisite, make sure you have the Elasticsearch Helm repository added:

```shell
helm repo add elastic https://helm.elastic.co
```

#### 1. Retain Elasticsearch Persistent Volume

First get the name of Elasticsearch Persistent Volumes:

```shell
ES_PV_NAME0=$(kubectl get pvc elasticsearch-master-elasticsearch-master-0 -o jsonpath="{.spec.volumeName}")

ES_PV_NAME1=$(kubectl get pvc elasticsearch-master-elasticsearch-master-1 -o jsonpath="{.spec.volumeName}")
```

Make sure these are the correct Persistent Volumes:

```shell
kubectl get persistentvolume $ES_PV_NAME0 $ES_PV_NAME1
```

It should show something like the following (note the name of the claim, it's for Elasticsearch):

```
NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM                                                   STORAGECLASS   REASON   AGE
pvc-80bde37a-3c5b-40f4-87f3-8440e658be75   64Gi       RWO            Delete           Bound    camunda/elasticsearch-master-elasticsearch-master-0     standard                20d
pvc-3e9129bc-9415-46c3-a005-00ce3b9b3be9   64Gi       RWO            Delete           Bound    camunda/elasticsearch-master-elasticsearch-master-1     standard                20d
```

The final step here is to change Persistent Volumes reclaim policy:

```shell
kubectl patch persistentvolume "${ES_PV_NAME0}" \
    -p '{"spec":{"persistentVolumeReclaimPolicy":"Retain"}}'

kubectl patch persistentvolume "${ES_PV_NAME1}" \
    -p '{"spec":{"persistentVolumeReclaimPolicy":"Retain"}}'
```

#### 2. Update Elasticsearch PersistentVolumeClaim labels

```shell
kubectl label persistentvolumeclaim elasticsearch-master-elasticsearch-master-0 \
    release=<RELEASE_NAME> chart=elasticsearch app=elasticsearch-master

kubectl label persistentvolumeclaim elasticsearch-master-elasticsearch-master-1 \
    release=<RELEASE_NAME> chart=elasticsearch app=elasticsearch-master
```

#### 3. Delete Elasticsearch StatefulSet

Note that there will be a **downtime** between this step and the next step.

```shell
kubectl delete statefulset elasticsearch-master
```

#### 4. Apply Elasticsearch StatefulSet chart

```shell
helm template camunda/camunda-platform <RELEASE_NAME> --version <CHART_VERSION> \
    --show-only charts/elasticsearch/templates/statefulset.yaml
```

The `RELEASE_NAME` is your current release name and `CHART_VERSION` is the version you want to update to (`8.0.13` or later).
