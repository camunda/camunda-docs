---
id: upgrade
title: "Upgrading Camunda Platform 8 Helm deployment"
sidebar_label: "Upgrade"
description: "To upgrade to a more recent version of the Camunda Platform Helm charts, there are certain things you need to keep in mind."
---

To upgrade to a more recent version of the Camunda Platform Helm charts, there are certain things you need to keep in mind.

:::caution

Ensure to review the [instructions for specific version](#version-update-instructions) before staring the actual upgrade.

:::

### Upgrading where Identity disabled

Normally for a Helm upgrade, you run the [Helm upgrade](https://helm.sh/docs/helm/helm_upgrade/) command. If you have disabled Camunda Identity and the related authentication mechanism, you should be able to do an upgrade as follows:

```shell
helm upgrade <RELEASE_NAME>
```

However, if Camunda Identity is enabled (which is the default), the upgrade path is a bit more complex than just running `helm upgrade`. Read the next section to familiarize yourself with the upgrade process.

### Upgrading where Identity enabled

If you have installed the Camunda Platform 8 Helm charts before with default values, this means Identity and the related authentication mechanism are enabled. For authentication, the Helm charts generate the secrets randomly if not specified on installation for each web application. If you run `helm upgrade` to upgrade to a newer chart version, you likely will see the following return:

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
export ZEEBE_SECRET=$(kubectl get secret "<RELEASE_NAME>-zeebe-identity-secret" -o jsonpath="{.data.zeebe-secret}" | base64 --decode)
export KEYCLOAK_MANAGEMENT_SECRET=$(kubectl get secret "<RELEASE_NAME>-keycloak" -o jsonpath="{.data.management-password}" | base64 --decode)
export POSTGRESQL_SECRET=$(kubectl get secret "<RELEASE_NAME>-postgresql" -o jsonpath="{.data.postgres-password}" | base64 --decode)
```

After exporting all secrets into environment variables, run the following upgrade command:

```shell
helm upgrade <RELEASE_NAME> camunda/camunda-platform \
  --set global.identity.auth.tasklist.existingSecret=$TASKLIST_SECRET \
  --set global.identity.auth.optimize.existingSecret=$OPTIMIZE_SECRET \
  --set global.identity.auth.operate.existingSecret=$OPERATE_SECRET \
  --set global.identity.auth.connectors.existingSecret=$CONNECTORS_SECRET \
  --set global.identity.auth.zeebe.existingSecret=$ZEEBE_SECRET \
  --set identity.keycloak.auth.adminPassword=$KEYCLOAK_ADMIN_SECRET \
  --set identity.keycloak.auth.managementPassword=$KEYCLOAK_MANAGEMENT_SECRET \
  --set identity.keycloak.postgresql.auth.password=$POSTGRESQL_SECRET
```

:::note
If you have specified on the first installation certain values, you have to specify them again on the upgrade either via `--set` or the values file and the `-f` flag.
:::

For more details on the Keycloak upgrade path, you can also read the [Bitnami Keycloak upgrade guide](https://docs.bitnami.com/kubernetes/apps/keycloak/administration/upgrade/).

## Version update instructions

### v8.2.9

#### Optimize

In Optimize 3.10.1, a new environment variable introduced for redirection URL. However, the change was not compatible with Camunda Platform Helm chart until it is fixed in 3.10.3 (and Helm chart 8.2.9). For that reason, those versions are coupled to certain Camunda Platform Helm chart versions.

| Optimize version                  | Camunda Platform Helm chart version |
| --------------------------------- | ----------------------------------- |
| Optimize 3.10.1 - Optimize 3.10.2 | 8.2.0 - 8.2.8                       |
| Optimize 3.10.3                   | 8.2.9+                              |

No action is needed if you use Optimize 3.10.3 (shipped with this Helm chart version by default), but that Optimize version cannot be used out of the box with previous Helm chart versions.

### v8.2.3

#### Zeebe Gateway

:::caution Breaking change

Zeebe Gateway authentication is now enabled by default.

:::

To authenticate:

1. [Create a client credential](/docs/guides/setup-client-connection-credentials.md).
2. [Assign permissions to the application](/docs/self-managed/identity/user-guide/authorizations/managing-resource-authorizations.md).
3. Connect with:

- [Desktop Modeler](/docs/components/modeler/desktop-modeler/connect-to-camunda-platform-8.md).
- [Zeebe client (zbctl)](/docs/self-managed/zeebe-deployment/security/secure-client-communication/#zbctl).

### v8.2

#### Connectors

Camunda Platform 8 Connectors component is one of our applications which performs the integration with an external system.

Currently, in all cases, either you will use Connectors v8.2 or not, this step should be done. You need to create the Connectors secret object (more details about this in [camunda-platform-helm/656](https://github.com/camunda/camunda-platform-helm/issues/656)).

First, generate the Connectors secret:

```bash
helm template <RELEASE_NAME> camunda/camunda-platform --version 8.2 \
    --show-only charts/identity/templates/connectors-secret.yaml >
    identity-connectors-secret.yaml
```

Then apply it:

```bash
kubectl apply --namespace <NAMESPACE_NAME> -f identity-connectors-secret.yaml
```

#### Keycloak

Camunda Platform v8.2 uses Keycloak v19 which depends on PostgreSQL v15. That is a major change for the dependencies. Currently there are two recommended options to upgrade from Camunda Platform 8.1.x to 8.2.x:

1. Use the previous version of PostgreSQL v14 in Camunda Platform v8.2, this should be simple and it will work seamlessly.
2. Follow the official PostgreSQL upgrade guide: [Upgrading a PostgreSQL Cluster v15](https://www.postgresql.org/docs/15/upgrading.html). However, it requires some manual work and longer downtime to do the database schema upgrade.

**Method 1: Use the previous version PostgreSQL v14**

You can set the PostgreSQL image tag as follows:

```yaml
identity:
  keycloak:
    postgresql:
      image:
        tag: 14.5.0
```

Then follow the [typical upgrade steps](#upgrading-where-identity-enabled).

**Method 2: Upgrade the database schema to work with PostgreSQL v15**

The easiest way to upgrade major versions of postgresql is to start a port-forward,
and then run `pg_dump` or `pg_restore`. The postgresql client versions are fairly flexible
with different server versions, but for best results, we recommend using the newest
client version.

1. In one terminal, start a `port-forward` against the postgresql service:

```bash
kubectl port-forward svc/<RELEASE_NAME>-postgresql 5432
```

Follow the rest of these steps in a different terminal.

2. Get the 'postgres' users password from the postgresql service:

```bash
kubectl exec -it statefulset/<RELEASE_NAME>-postgresql -- env | grep "POSTGRES_POSTGRES_PASSWORD="
```

3. Scale identity down using the following command:

```bash
kubectl scale --replicas=0 deployment <RELEASE_NAME>-identity
```

4. Perform the database dump:

```bash
pg_dumpall -U postgres -h localhost -p 5432 | tee dump.psql
Password: <enter password from previous command without POSTGRES_POSTGRES_PASSWORD=>
```

`pg_dumpall` may ask multiple times for the same password. The database will be dumped into `dump.psql`.

5. Scale database down using the following command:

```bash
kubectl scale --replicas=0 statefulset <RELEASE_NAME>-postgresql
```

6. Delete the PVC for the postgresql instance using the following command:

```bash
kubectl delete pvc data-<RELEASE_NAME>-postgresql-0
```

7. Update the postgresql version using the following command:

```bash
kubectl set image statefulset/<RELEASE_NAME>-postgresql postgresql=docker.io/bitnami/postgresql:15.3.0
```

8. Scale the services back up using the following command:

```bash
kubectl scale --replicas=1 statefulset <RELEASE_NAME>-postgresql
```

9. Restore the database dump using the following command:

```bash
psql -U postgres -h localhost -p 5432 -f dump.psql
```

10. Scale up identity using the following command:

```bash
kubectl scale --replicas=1 deployment <RELEASE_NAME>-identity
```

Then follow the [typical upgrade steps](#upgrading-where-identity-enabled).

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
