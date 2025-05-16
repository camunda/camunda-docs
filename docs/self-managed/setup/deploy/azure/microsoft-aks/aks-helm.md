---
id: aks-helm
title: "Install Camunda 8 on an AKS cluster"
description: "Set up the Camunda 8 environment with Helm and an optional Ingress setup on Azure AKS."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This guide provides a comprehensive walkthrough for installing the Camunda 8 Helm chart on your existing Azure Kubernetes Service (AKS) cluster, as well as verifying that it is working as intended

## Requirements

- A Kubernetes cluster; see the [Terraform](./terraform-setup.md) guide.
- [Helm](https://helm.sh/docs/intro/install/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) to interact with the cluster.
- [jq](https://jqlang.github.io/jq/download/) to interact with some variables.
- [GNU envsubst](https://www.gnu.org/software/gettext/manual/html_node/envsubst-Invocation.html) to generate manifests.
- A namespace to host the Camunda Platform; in this guide we will reference `camunda` as the target namespace.

For the tool versions used, check the [.tool-versions](https://github.com/camunda/camunda-deployment-references/blob/main/.tool-versions) file in the repository. It contains an up-to-date list of versions that we also use for testing.

### Considerations

While this guide is primarily tailored for UNIX systems, it can also be run under Windows by utilizing the [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl/about).

Multi-tenancy is disabled by default and is not covered further in this guide. If you decide to enable it, you may use the same PostgreSQL instance and add an extra database for multi-tenancy purposes.

## Export environment variables

To streamline the execution of the subsequent commands, it is recommended to export multiple environment variables.

### Export the Helm chart version

The following are the required environment variables with some example values:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/chart-env.sh
```

### Export database values

When using standard authentication (username and password), specific environment variables must be set with valid values. Follow the guide for [Terraform](./terraform-setup.md#set-up-azure-authentication) to set them correctly.

Verify the configuration of your environment variables by running the following loop:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/procedure/check-env-variables.sh
```

## Deploy Camunda 8 via Helm charts

For more configuration options, refer to the [Helm chart documentation](https://artifacthub.io/packages/helm/camunda/camunda-platform#parameters). Additionally, explore our existing resources on the [Camunda 8 Helm chart](/self-managed/setup/install.md) and [guides](/self-managed/setup/guides/guides.md).

Depending on your installation path, you may use different settings.
For easy and reproducible installations, we will use YAML files to configure the chart.

### 1. Create the `values.yml` file

Start by creating a `values.yml` file to store the configuration for your environment. This file will contain key-value pairs that will be substituted using `envsubst`. You can find a reference example of this file here:

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/helm-values/values-no-domain.yml
```

### 2. Configure your deployment

#### Enable Enterprise components

Some components are not enabled by default in this deployment. For more information on how to configure and enable these components, refer to [configuring Web Modeler, Console, and Connectors](../../../install.md#configuring-web-modeler-console-and-connectors).

#### Elasticsearch options

Camunda Helm chart supports both internal and external Elasticsearch deployments. For production workloads, we recommend using an externally managed Elasticsearch service (for example, [Elastic Cloud on Azure](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/elastic.ec-azure-pp)
). Note that Terraform support for Elastic Cloud on Azure can be restrictive but remains a viable option. In this guide, we default to the internal deployment of Elasticsearch.

<details>
<summary>Show configuration to enable internal Elasticsearch</summary>

```yaml
global:
  elasticsearch:
    enabled: true
  opensearch:
    enabled: false

elasticsearch:
  enabled: true
```

</details>

#### Use internal PostgreSQL instead of the managed PostgreSQL service

If you prefer not to use the external Azure Database for PostgreSQL service, you can switch to the internal PostgreSQL deployment. In this case, configure the Helm chart as follows and remove certain configurations related to the external database and secret references:

<details>
<summary>Show configuration changes to disable external database usage</summary>

```yaml
identityKeycloak:
  postgresql:
    enabled: true

  # Remove external database configuration
  # externalDatabase:
  #   ...

  # Remove service account and annotations
  # serviceAccount:
  #   ...

  # Remove extra environment variables for external database driver
  # extraEnvVars:
  #   ...

postgresql:
  enabled: true

webModeler:
  # Remove this part

  # restapi:
  #     externalDatabase:
  #         url: jdbc:postgresql://$\{DB_HOST}:5432/$\{DB_WEBMODELER_NAME}
  #         user: $\{DB_WEBMODELER_USERNAME}
  #         existingSecret: webmodeler-postgres-secret
  #         existingSecretPasswordKey: password

identity:
  # Remove this part

  # externalDatabase:
  #     enabled: true
  #     host: $\{DB_HOST}
  #     port: 5432
  #     username: $\{DB_IDENTITY_USERNAME}
  #     database: $\{DB_IDENTITY_NAME}
  #     existingSecret: identity-postgres-secret
  #     existingSecretPasswordKey: password
```

</details>

#### Fill your deployment with actual values

Once you've prepared the `values.yml` file, run the following `envsubst` command to substitute the environment variables with their actual values:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/assemble-envsubst-values.sh
```

Next, store various passwords in a Kubernetes secret, which will be used by the Helm chart. Below is an example of how to set up the required secret. You can use `openssl` to generate random secrets and store them in environment variables:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/generate-passwords.sh
```

Use these environment variables in the `kubectl` command to create the secret.

- The `smtp-password` should be replaced with the appropriate external value ([see how it's used by Web Modeler](/self-managed/modeler/web-modeler/configuration/configuration.md#smtp--email)).

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/create-identity-secret.sh
```

### 3. Install Camunda 8 using Helm

Now that the `generated-values.yml` is ready, you can install Camunda 8 using Helm. Run the following command:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/install-chart.sh
```

This command:

- Installs (or upgrades) the Camunda platform using the Helm chart.
- Substitutes the appropriate version using the `$CAMUNDA_HELM_CHART_VERSION` environment variable.
- Applies the configuration from `generated-values.yml`.

:::note

This guide uses `helm upgrade --install` as it runs install on initial deployment and upgrades future usage. This may make it easier for future [Camunda 8 Helm upgrades](/self-managed/setup/upgrade.md) or any other component upgrades.

:::

You can track the progress of the installation using the following command:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/check-deployment-ready.sh
```

#### Web Modeler

Web Modeler uses PostgreSQL for its REST API. In the Azure setup, it connects to either the internal PostgreSQL instance or the managed Azure Database for PostgreSQL, depending on your configuration. No special JDBC wrapper is needed.

Refer to the [Web Modeler database configuration](../../../../modeler/web-modeler/configuration/database.md) for more information on using PostgreSQL with Web Modeler.

#### Keycloak

In Azure, AWS-specific IRSA (IAM Roles for Service Accounts) does not apply. You can use Azure Workload Identity, but it hasn’t been tested with managed PostgreSQL and may not work out-of-the-box. Keycloak connects to PostgreSQL (internal or external) using standard credentials; no custom JDBC wrapper or AWS-specific container image is required.

You may still use the [Camunda Keycloak images](https://hub.docker.com/r/camunda/keycloak) built upon [bitnami/keycloak](https://hub.docker.com/r/bitnami/keycloak), but the AWS JDBC wrapper is not relevant to this setup.

#### Identity

Identity uses PostgreSQL. In the Azure setup, it connects via standard JDBC to either the internal or managed PostgreSQL instance. No additional JDBC wrapper or cloud-specific driver is needed.

For more details, refer to the [Identity database configuration](../../../../identity/deployment/configuration-variables.md).

## Verify connectivity to Camunda 8

First, we need an OAuth client to be able to connect to the Camunda 8 cluster.

### Generate an M2M token using Identity

Generate an M2M token by following the steps outlined in the [Identity getting started guide](/self-managed/identity/getting-started/install-identity.md), along with the [incorporating applications documentation](/self-managed/identity/user-guide/additional-features/incorporate-applications.md).

Below is a summary of the necessary instructions:

Identity and Keycloak must be port-forwarded to be able to connect to the cluster.

```shell
kubectl port-forward "services/$CAMUNDA_RELEASE_NAME-identity" 8080:80 --namespace "$CAMUNDA_NAMESPACE"
kubectl port-forward "services/$CAMUNDA_RELEASE_NAME-keycloak" 18080:80 --namespace "$CAMUNDA_NAMESPACE"
```

1. Open Identity in your browser at `http://localhost:8080`. You will be redirected to Keycloak and prompted to log in with a username and password.
2. Use `demo` as both the username and password.
3. Select **Add application** and select **M2M** as the type. Assign a name like "test."
4. Select the newly created application. Then, select **Access to APIs > Assign permissions**, and select the **Core API** with "read" and "write" permission.
5. Retrieve the `client-id` and `client-secret` values from the application details

```shell
export ZEEBE_CLIENT_ID='client-id' # retrieve the value from the identity page of your created m2m application
export ZEEBE_CLIENT_SECRET='client-secret' # retrieve the value from the identity page of your created m2m application
```

<details>
<summary>To access the other services and their UIs, port-forward those Components as well:</summary>
<summary>

```shell
Operate:
> kubectl port-forward "svc/$CAMUNDA_RELEASE_NAME-operate"  8081:80 --namespace "$CAMUNDA_NAMESPACE"
Tasklist:
> kubectl port-forward "svc/$CAMUNDA_RELEASE_NAME-tasklist" 8082:80 --namespace "$CAMUNDA_NAMESPACE"
Optimize:
> kubectl port-forward "svc/$CAMUNDA_RELEASE_NAME-optimize" 8083:80 --namespace "$CAMUNDA_NAMESPACE"
Connectors:
> kubectl port-forward "svc/$CAMUNDA_RELEASE_NAME-connectors" 8086:8080 --namespace "$CAMUNDA_NAMESPACE"
WebModeler:
> kubectl port-forward "svc/$CAMUNDA_RELEASE_NAME-web-modeler-webapp" 8084:80 --namespace "$CAMUNDA_NAMESPACE"
Console:
> kubectl port-forward "svc/$CAMUNDA_RELEASE_NAME-console" 8085:80 --namespace "$CAMUNDA_NAMESPACE"
```

</summary>
</details>

### Use the token

<Tabs groupId="c8-connectivity">
  <TabItem value="rest-api" label="REST API" default>

For a detailed guide on generating and using a token, please conduct the relevant documentation on [authenticating with the Camunda 8 REST API](./../../../../../apis-tools/camunda-api-rest/camunda-api-rest-authentication.md?environment=self-managed).

This requires to port-forward the Zeebe Gateway to be able to connect to the cluster.

```shell
kubectl port-forward "services/$CAMUNDA_RELEASE_NAME-zeebe-gateway" 8080:8080 --namespace "$CAMUNDA_NAMESPACE"
```

Export the following environment variables:

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/stable/8.7/generic/kubernetes/single-region/procedure/export-verify-zeebe-local.sh
```

Generate a temporary token to access the Camunda 8 REST API, then capture the value of the `access_token` property and store it as your token. Use the stored token (referred to as `TOKEN` in this case) to interact with the Camunda 8 REST API and display the cluster topology:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/stable/8.7/generic/kubernetes/single-region/procedure/check-zeebe-cluster-topology.sh
```

...and results in the following output:

<details>
  <summary>Example output</summary>
  <summary>

```json reference
https://github.com/camunda/camunda-deployment-references/blob/stable/8.7/generic/kubernetes/single-region/procedure/check-zeebe-cluster-topology-output.json
```

  </summary>
</details>
  </TabItem>
  <TabItem value="modeler" label="Desktop Modeler">

Follow our existing [Modeler guide on deploying a diagram](/self-managed/modeler/desktop-modeler/deploy-to-self-managed.md). Below are the helper values required to be filled in Modeler:

This requires port-forwarding the Zeebe Gateway to be able to connect to the cluster:

```shell
kubectl port-forward "services/$CAMUNDA_RELEASE_NAME-zeebe-gateway" 26500:26500 --namespace "$CAMUNDA_NAMESPACE"
```

The following values are required for OAuth authentication:

- **Cluster endpoint:** `http://localhost:26500`
- **Client ID:** Retrieve the client ID value from the identity page of your created M2M application
- **Client Secret:** Retrieve the client secret value from the Identity page of your created M2M application
- **OAuth Token URL:** `http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token`
- **Audience:** `zeebe-api`, the default for Camunda 8 Self-Managed

</TabItem>
</Tabs>

## Test the installation with payment example application

To test your installation with the deployment of a sample application, refer to the [installing payment example guide](../../../guides/installing-payment-example.md).

## Advanced topics

The following are some advanced configuration topics to consider for your cluster:

- [Camunda Production Installation guide with Kubernetes and Helm](versioned_docs/version-8.7/self-managed/operational-guides/production-guide/helm-chart-production-guide.md)
- [Cluster autoscaling](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/cloudprovider/aws/README.md)

To get more familiar with our product stack, visit the following topics:

- [Operate](/components/operate/operate-introduction.md)
- [Tasklist](/components/tasklist/introduction-to-tasklist.md)
- [Optimize](/components/optimize/what-is-optimize.md)
