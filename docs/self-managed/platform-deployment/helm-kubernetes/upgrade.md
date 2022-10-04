---
id: upgrade
title: "Upgrading Camunda Platform 8 Helm deployment"
sidebar_label: "Upgrade"
---

To upgrade to a more recent version of the Camunda Platform Helm charts, there are certain things you need to keep in mind.

## General upgrade instructions

### Upgrading where Identity disabled

Normally for a Helm upgrade, you run the [Helm upgrade](https://helm.sh/docs/helm/helm_upgrade/) command. If you have disabled Camunda Identity component and the related authentication mechanism, you should be able to easily do an upgrade as following:

```sh
helm upgrade <RELEASE_NAME>
```

However, if Camunda Identity component is enabled (which is the default), the upgrade path is a bit more complex than just running `helm upgrade`. Read the next section to familiarize yourself with the upgrade process.

### Upgrading where Identity enabled

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

#### Secrets extraction

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
