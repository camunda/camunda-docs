---
id: upgrade
title: "Upgrading Camunda 8 Helm deployment"
sidebar_label: "Upgrade"
description: "To upgrade to a more recent version of the Camunda Helm charts, there are certain things you need to keep in mind."
---

To upgrade to a more recent version of the Camunda Helm charts, there are certain things you need to keep in mind.

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

If you have installed the Camunda 8 Helm charts before with default values, this means Identity and the related authentication mechanism are enabled. For authentication, the Helm charts generate the secrets randomly if not specified on installation for each web application. If you run `helm upgrade` to upgrade to a newer chart version, you likely will see the following return:

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
export ZEEBE_SECRET=$(kubectl get secret "<RELEASE_NAME>-zeebe-identity-secret" -o jsonpath="{.data.zeebe-secret}" | base64 --decode)
export KEYCLOAK_ADMIN_SECRET=$(kubectl get secret "<RELEASE_NAME>-keycloak" -o jsonpath="{.data.admin-password}" | base64 --decode)
export KEYCLOAK_MANAGEMENT_SECRET=$(kubectl get secret "<RELEASE_NAME>-keycloak" -o jsonpath="{.data.management-password}" | base64 --decode)
export POSTGRESQL_SECRET=$(kubectl get secret "<RELEASE_NAME>-postgresql" -o jsonpath="{.data.postgres-password}" | base64 --decode)
```

After exporting all secrets into environment variables, run the following upgrade command:

```shell
helm upgrade <RELEASE_NAME> camunda/camunda-platform\
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

### v8.4.0

:::caution Potential Breaking changes

- Keycloak-specific configurations are replaced for a mroe generic OIDC configuration so that components can use other oidc-compliant oauth2 identity providers.
- Some unused environment variables have been removed from Web Modeler because of the implementation of custom OIDC support. The naming has also been adjusted to use the newer scheme.

:::

### v8.3.1

:::caution
The following steps are applied when upgrading from **any** previous version, including `8.3.0`.
:::

To fix a critical issue, the following components had labels change: Operate, Optimize, Tasklist, Zeebe, and Zeebe Gateway.

Therefore, before upgrading from any previous versions, delete the `Deployment/StatefulSet`. There will be a downtime between the resource deletion and the actual upgrade.

```shell
kubectl -n <RELEASE_NAMESPACE> delete deployment <RELEASE_NAME>-operate
kubectl -n <RELEASE_NAMESPACE> delete deployment <RELEASE_NAME>-tasklist
kubectl -n <RELEASE_NAMESPACE> delete deployment <RELEASE_NAME>-optimize
kubectl -n <RELEASE_NAMESPACE> delete deployment <RELEASE_NAME>-zeebe-gateway
kubectl -n <RELEASE_NAMESPACE> delete statefulset <RELEASE_NAME>-zeebe
```

Then, follow the upgrade process as usual.

#### Zeebe Gateway

This change has no effect on the usual upgrade using Helm CLI. However, it could be relevant if you are using Helm post-rendering via other tools like Kustomize.

The following resources have been renamed:

- **ConfigMap:** From `<RELEASE_NAME>-zeebe-gateway-gateway` to `<RELEASE_NAME>-zeebe-gateway`.
- **ServiceAccount:** From `<RELEASE_NAME>-zeebe-gateway-gateway` to `<RELEASE_NAME>-zeebe-gateway`.

### v8.3.0 (minor)

:::caution
Updating Operate, Tasklist, and Optimize from 8.2.x to 8.3.0 will potentially take longer than expected, depending on the data to be migrated.
Additionally, we identified some bugs that could also prevent the migration from succeeding. These are being addressed and will be available in an upcoming 8.3.1 patch. We suggest not updating until the patch is released.
:::

For full change log, view the Camunda Helm chart [v8.3.0 release notes](https://github.com/camunda/camunda-platform-helm/releases/tag/camunda-platform-8.3.0).

:::caution Breaking changes

- Elasticsearch upgraded from v7.x to v8.x.
- Keycloak upgraded from v19.x to v22.x.
- Zeebe runs as a non-root user by default.

:::

#### Elasticsearch

Elasticsearch upgraded from v7.x to v8.x. Follow the Elasticsearch official [upgrade guide](https://www.elastic.co/guide/en/elasticsearch/reference/8.10/setup-upgrade.html) to ensure you are not using any deprecated values when upgrading.

##### Elasticsearch - values file

The syntax of the chart values file has been changed due to the upgrade. There are two cases based on if you use the default values or custom values.

**Case One:** Default values.yaml

If you are using our default `values.yaml`, no change is required. Follow the upgrade steps as usual with the updated default `values.yaml`.

**Case Two:** Custom values.yaml

If you have a custom `values.yaml`, change the image repository and tag:

```yaml
image:
  repository: bitnami/elasticsearch
  tag: 8.6.2
```

Setting the persistent volume size of the master nodes can't be done using the `volumeClaimTemplate` anymore. It must be done using the master values:

```yaml
master:
  masterOnly: false
  heapSize: 1024m
  persistence:
    size: 64Gi
```

Setting a `retentionPolicy` for Elasticsearch values can't be done anymore. The `retentionPolicy` should be used in the respective components instead. For example, here is an Elasticsearch `retentionPolicy` for the Tasklist component:

```yaml
retention:
  enabled: false
  minimumAge: 30d
```

In the global section, the host to show to release-name should be changed as well:

```yaml
host: "{{ .Release.Name }}-elasticsearch"
```

##### Elasticsearch - Data retention

The Elasticsearch 8 chart is using different PVC names. Therefore, it's required to migrate the old PVCs to the new names, which could be done in two ways: automatic (requires certain K8s version and CSI driver), or manual (works with any Kubernetes setup).

:::caution

In call cases, the following steps must be executed **before** the upgrade.

:::

**Option One:** CSI volume cloning

This method will take advantage of the CSI volume cloning functionality from the CSI driver.

Prerequisites:

1. The Kubernetes cluster should be at least v1.20.
2. The CSI driver must be present on your cluster.

Clones are provisioned like any other PVC with a reference to an existing PVC in the same namespace.

Before applying this manifest, ensure to scale the Elasticsearch replicas to 0. Also, ensure the `dataSource.name` matches the PVC that you would like to clone.

Here is an example YAML file for cloning the Elasticsearch PVC:

First, stop Elasticsearch pods:

```shell
kubectl scale statefulset elasticsearch-master --replicas=0
```

Then, clone the PVC (this example is for one PVC, usually you have two PVCs):

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  labels:
    app.kubernetes.io/component: master
    app.kubernetes.io/instance: integration
    app.kubernetes.io/name: elasticsearch
  name: data-integration-elasticsearch-master-0
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 64Gi
  dataSource:
    name: elasticsearch-master-elasticsearch-master-0
    kind: PersistentVolumeClaim
```

For reference, visit [Kubernetes - CSI Volume Cloning](https://kubernetes.io/docs/concepts/storage/volume-pvc-datasource/).

**Option Two**: Update PV manually

This approach works with any Kubernetes cluster.

1. Get the name of PV for both Elasticsearch master PVs.
2. Change the reclaim policy of the Elasticsearch PVs to `Retain`.

First, get the PV from PVC:

```shell
ES_PV_NAME0="$(kubectl get pvc elasticsearch-master-elasticsearch-master-0 -o jsonpath='{.spec.volumeName}')"
```

Then, change the Reclaim Policy:

```shell
kubectl patch pv "${ES_PV_NAME0}" -p '{"spec":{"persistentVolumeReclaimPolicy":"Retain"}}'
```

Finally, verify the Reclaim Policy has been changed:

```shell
kubectl get pv "${ES_PV_NAME0}" | grep Retain || echo '[ERROR] Reclaim Policy is not Retain!'
```

Within both Elasticsearch master PVs, edit the `claimRef` to include the name of the new PVCs that will appear after the upgrade. For example:

```yaml
claimRef:
  apiVersion: v1
  kind: PersistentVolumeClaim
  name: data-<RELEASE_NAME>-elasticsearch-master-0
  namespace: <NAMESPACE>
```

After a successful upgrade, you can now delete the old PVCs that are in a `Lost` state. Then, proceed with the upgrade.

#### Keycloak

Keycloak upgraded from v19.x to v22.x, which is the latest version at the time of writing. Even though there is no breaking change found, the upgrade should be handled carefully because of the Keycloak major version upgrade. Ensure you back up the Keycloak database before the upgrade.

:::note
The Keycloak PostgreSQL chart shows some warnings which are safe to ignore. That false positive issue has been reported, and it should be fixed in the next releases of the upstream PostgreSQL Helm chart.
:::

```
coalesce.go:289: warning: destination for keycloak.postgresql.networkPolicy.egressRules.customRules is a table. Ignoring non-table value ([])
coalesce.go:289: warning: destination for keycloak.postgresql.networkPolicy.ingressRules.readReplicasAccessOnlyFrom.customRules is a table. Ignoring non-table value ([])
coalesce.go:289: warning: destination for keycloak.postgresql.networkPolicy.ingressRules.primaryAccessOnlyFrom.customRules is a table. Ignoring non-table value ([])
false
```

#### Zeebe

Using a non-root user by default is a security principle introduced in this version. However, because there is persistent storage in Zeebe, earlier versions may run into problems with existing file permissions not matching up with the file permissions assigned to the running user. There are two ways to fix this:

**Option One:** Use Zeebe user ID (recommended)

Change `podSecurityContext.fsGroup` to point to the UID of the running user. The default user in Zeebe has the UID `1000`. That will modify the group permissions of all persistent volumes attached to that Pod.

```yaml
zeebe:
  podSecurityContext:
    fsGroup: 1000
```

If you already modify the current running user, then the `fsGroup` needs to be changed to match the UID.

```yaml
zeebe:
  containerSecurityContext:
    runAsUser: 1008
  podSecurityContext:
    fsGroup: 1008
```

Some storage classes may not support the `fsGroup` option. In this case, a possibility is to run a debug Pod to chown the mounted volumes.

**Option Two:** Use root user ID

If the recommended solution does not help, you may change the running user back to root.

```yaml
zeebe:
  containerSecurityContext:
    runAsUser: 0
```

#### Web-Modeler

The configuration format of external database has been changed in Web Modeler from `host`, `port`, `database` to `JDBC URL`.

The old format:

```yaml
webModeler:
  restapi:
    externalDatabase:
      host: web-modeler-postgres-ext
      port: 5432
      database: rest-api-db
```

The new format:

```yaml
webModeler:
  restapi:
    externalDatabase:
      url: "jdbc:postgresql://web-modeler-postgres-ext:5432/rest-api-db"
```

### v8.2.9

#### Optimize

For Optimize 3.10.1, a new environment variable introduced redirection URL. However, the change is not compatible with Camunda Helm charts until it is fixed in 3.10.3 (and Helm chart 8.2.9). Therefore, those versions are coupled to certain Camunda Helm chart versions:

| Optimize version                  | Camunda Helm chart version |
| --------------------------------- | -------------------------- |
| Optimize 3.10.1 & Optimize 3.10.2 | 8.2.0 - 8.2.8              |
| Optimize 3.10.3                   | 8.2.9+                     |

No action is needed if you use Optimize 3.10.3 (shipped with this Helm chart version by default), but this Optimize version cannot be used out of the box with previous Helm chart versions.

### v8.2.3

#### Zeebe Gateway

:::caution Breaking change

Zeebe Gateway authentication is now enabled by default.

:::

To authenticate:

1. [Create a client credential](/docs/guides/setup-client-connection-credentials.md).
2. [Assign permissions to the application](/docs/self-managed/identity/user-guide/authorizations/managing-resource-authorizations.md).
3. Connect with:

- [Desktop Modeler](/docs/components/modeler/desktop-modeler/connect-to-camunda-8.md).
- [Zeebe client (zbctl)](/docs/self-managed/zeebe-deployment/security/secure-client-communication/#zbctl).

### v8.2.0 (Minor)

#### Connectors

Camunda 8 Connectors component is one of our applications which performs the integration with an external system.

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

Camunda v8.2 uses Keycloak v19 which depends on PostgreSQL v15. That is a major change for the dependencies. Currently there are two recommended options to upgrade from Camunda 8.1.x to 8.2.x:

1. Use the previous version of PostgreSQL v14 in Camunda v8.2, this should be simple and it will work seamlessly.
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

If you installed Camunda 8 using Helm charts before `8.0.13`, you need to apply the following steps to handle the new Elasticsearch labels.

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
