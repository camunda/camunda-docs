---
id: aks-helm
title: "Install Camunda 8 on an AKS cluster"
description: "Set up your Camunda 8 environment with Helm on Azure Kubernetes Service."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This guide provides a comprehensive walkthrough for installing the Camunda 8 Helm chart on your existing Azure Kubernetes Service (AKS) cluster, and confirmation it is working as intended.

## Prerequisites

- A Kubernetes cluster; refer to the [Terraform guide](./terraform-setup.md) for details.
- [Helm](https://helm.sh/docs/intro/install/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) to interact with the cluster.
- [jq](https://jqlang.github.io/jq/download/) to interact with some variables.
- [GNU envsubst](https://www.gnu.org/software/gettext/manual/html_node/envsubst-Invocation.html) to generate manifests.
- (optional) Custom domain name/[DNS zone](https://learn.microsoft.com/en-us/azure/dns/dns-zones-records) in Azure DNS. This allows you to expose Camunda 8 endpoints and connect via community-supported [zbctl](https://github.com/camunda-community-hub/zeebe-client-go/blob/main/cmd/zbctl/zbctl.md) or [Camunda Modeler](https://camunda.com/download/modeler/).
- A namespace to host the Camunda Platform; in this guide we will reference `camunda` as the target namespace.

For the tool versions used, check the [.tool-versions](https://github.com/camunda/camunda-deployment-references/blob/main/.tool-versions) file in the related repository. This contains an up-to-date list of versions we also use for testing.

### Considerations

While this guide is primarily tailored for UNIX systems, it can also be run under Windows by utilizing the [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl/about).

Multi-tenancy is disabled by default and is not covered further in this guide. If you decide to enable it, you may use the same PostgreSQL instance and add an extra database for multi-tenancy purposes.

[Workload Identities](https://learn.microsoft.com/en-us/azure/aks/workload-identity-overview) offer a way to connect to Azure-managed PostgreSQL. This is not yet supported by Camunda.

## Export environment variables

To streamline execution of the following commands, we recommend exporting multiple environment variables.

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

## (Optional) Ingress Setup

:::info Domain or domainless installation

If you do not have a domain name, external access to Camunda 8 web endpoints from outside the Azure Virtual Network will not be possible. In this case, skip the DNS setup and proceed directly to [deploying Camunda 8 via Helm charts](#deploy-camunda-8-via-helm-charts).

Alternatively, you can use `kubectl port-forward` to access the Camunda platform without a domain or Ingress configuration. For more information, see the [kubectl port-forward documentation](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_port-forward/).

Throughout the rest of this installation guide, we will refer to configurations as **"With domain"** or **"Without domain"** depending on whether the application is exposed via a domain.
:::

In this section, we provide an optional setup guide for configuring an Ingress with TLS and DNS management, allowing you to access your application through a specified domain. If you haven't set up an Ingress, refer to the [Kubernetes Ingress documentation](https://kubernetes.io/docs/concepts/services-networking/ingress/) for more details. In Kubernetes, an Ingress is an API object that manages external access to services in a cluster, typically over HTTP, and can also handle TLS encryption for secure connections.

To monitor your Ingress setup using Azure Monitor, you may find the official guide on [monitoring ingress controllers with Azure Monitor and Prometheus](https://learn.microsoft.com/en-us/azure/azure-monitor/containers/container-insights-prometheus-integration) helpful. Additionally, for detailed steps on exposing Kubernetes applications with the nginx ingress controller on Azure, refer to the [official Azure tutorial](https://learn.microsoft.com/en-us/azure/aks/ingress-basic).

### Export Values

Set the following values for your Ingress configuration:

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/export-ingress-setup-vars.sh
```

Additionally, before proceeding, export the following environment variables. These will be used throughout this guide for configuring DNS, certificates, and other Azure resources:

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/procedure/export-domain-setup-vars.sh
```

These variables will be referenced in later steps, so make sure they are set in your current shell session before continuing.

### ingress-nginx

[Ingress-nginx](https://github.com/kubernetes/ingress-nginx) is an open-source Kubernetes Ingress controller that provides a way to manage external access to services within a Kubernetes cluster. It acts as a reverse proxy and load balancer, routing incoming traffic to the appropriate services based on rules defined in the Ingress resource.

The following installs `ingress-nginx` in the `ingress-nginx` namespace via Helm. For more configuration options, consult the [Helm chart](https://github.com/kubernetes/ingress-nginx/tree/main/charts/ingress-nginx).

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/procedure/install-ingress-nginx.sh
```

For a step-by-step walkthrough (and the full list of Azure-specific annotations) see the Microsoft Learn article [“Create an unmanaged NGINX ingress controller in AKS.”](https://learn.microsoft.com/en-us/troubleshoot/azure/azure-kubernetes/load-bal-ingress-c/create-unmanaged-ingress-controller)

### external-dns

[External-dns](https://github.com/kubernetes-sigs/external-dns) is a Kubernetes add-on that automates the management of DNS records for external resources, such as load balancers or Ingress controllers. It monitors the Kubernetes resources and dynamically updates the DNS provider with the appropriate DNS records.

The following installs `external-dns` in the `external-dns` namespace via Helm. For more configuration options, consult the [Helm chart](https://github.com/kubernetes-sigs/external-dns/tree/master/charts/external-dns).

Consider setting `domainFilters` via `--set` to restrict access to certain hosted zones.

To enable external-dns to work with Azure Managed Identities, create the Kubernetes secret directly using the exported environment variables:

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/procedure/external-dns-azure-config.sh
```

:::danger Uniqueness of txtOwnerId for DNS

If you are already running `external-dns` in a different cluster, ensure each instance has a **unique** `txtOwnerId` for the TXT record. Without unique identifiers, the `external-dns` instances will conflict and inadvertently delete existing DNS records.

In the example below, it's set to `external-dns` and should be changed if this identifier is already in use. Consult the [documentation](https://kubernetes-sigs.github.io/external-dns/v0.15.0/#note) to learn more about DNS record ownership.
:::

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/procedure/install-external-dns.sh
```

### cert-manager

[Cert-manager](https://cert-manager.io/) is an open-source Kubernetes add-on that automates the management and issuance of TLS certificates. It integrates with various certificate authorities (CAs) and provides a straightforward way to obtain, renew, and manage SSL/TLS certificates for your Kubernetes applications.

To simplify the installation process, it is [recommended](https://cert-manager.io/docs/installation/helm/#3-install-customresourcedefinitions) to install the cert-manager `CustomResourceDefinition` resources before installing the chart. This separate step allows for easy uninstallation and reinstallation of cert-manager without deleting any custom resources that have been installed.

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/install-cert-manager-crds.sh
```

The following installs `cert-manager` in the `cert-manager` namespace via Helm. For more configuration options, consult the [Helm chart](https://artifacthub.io/packages/helm/cert-manager/cert-manager). The supplied settings also configure `cert-manager` to ease the certificate creation by setting a default issuer, which allows you to add a single annotation on an Ingress to request the relevant certificates.

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/procedure/install-cert-manager.sh
```

Create a `ClusterIssuer` via `kubectl` to enable cert-manager to request certificates from [Let's Encrypt](https://letsencrypt.org/):

After exporting the above values, follow up with:

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/procedure/install-cert-manager-issuer.sh
```

## Deploy Camunda 8 via Helm charts

For more configuration options, refer to the [Helm chart documentation](https://artifacthub.io/packages/helm/camunda/camunda-platform#parameters). Additionally, explore our existing resources in the [Camunda 8 Helm chart](/self-managed/setup/install.md) and [related guides](/self-managed/setup/guides/guides.md).

Depending on your installation path, you may use different settings.
For easy and reproducible installations, we will use YAML files to configure the chart.

### 1. Create the `values.yml` file

Start by creating a `values.yml` file to store the configuration for your environment. This file will contain key-value pairs that will be substituted using `envsubst`. You can find a reference example of this file here:

<Tabs groupId="values">
  <TabItem value="with-domain" label="With domain" default>

The following makes use of the [combined Ingress setup](/self-managed/setup/guides/ingress-setup.md#combined-ingress-setup) by deploying a single Ingress for all HTTP components and a separate Ingress for the gRPC endpoint.

:::info Cert-manager annotation for domain installation
The annotation `kubernetes.io/tls-acme=true` will be [interpreted by cert-manager](https://cert-manager.io/docs/usage/ingress/) and automatically results in the creation of the required certificate request, easing the setup.
:::

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/helm-values/values-domain.yml
```

:::danger Exposure of the Zeebe Gateway

Publicly exposing the Zeebe Gateway without proper authorization can pose significant security risks. To avoid this, consider disabling the Ingress for the Zeebe Gateway by setting the following values to `false` in your configuration file:

- `zeebeGateway.ingress.grpc.enabled`
- `zeebeGateway.ingress.rest.enabled`

By default, authorization is enabled to ensure secure access to Zeebe. Typically, only internal components need direct access to Zeebe, making it unnecessary to expose the gateway externally.

:::

#### Reference the credentials in secrets

Before installing the Helm chart, create Kubernetes secrets to store the Keycloak database authentication credentials.

To create the secrets, run the following commands:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/procedure/create-external-db-secrets.sh
```

</TabItem>

<TabItem value="without-domain" label="Without domain">

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/helm-values/values-no-domain.yml
```

#### Reference the credentials in secrets

Before installing the Helm chart, create Kubernetes secrets to store the Keycloak database authentication credentials.

To create the secrets, run the following command:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/procedure/create-external-db-secrets.sh
```

</TabItem>
</Tabs>

### 2. Configure your deployment

#### Enable Web Modeller and Console services

Some components are not enabled by default in this deployment. For more information on how to configure and enable these components, refer to [configuring Web Modeler, Console, and Connectors](../../../install.md#configuring-web-modeler-console-and-connectors).

#### Elasticsearch options

Camunda Helm chart supports both internal and external Elasticsearch deployments. For production workloads, we recommend using an externally managed Elasticsearch service (for example, [Elastic Cloud on Azure](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/elastic.ec-azure-pp)). Terraform support for Elastic Cloud on Azure can be restrictive but remains a viable option. In this guide, we default to the internal deployment of Elasticsearch.

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

#### (Optional) Use internal PostgreSQL instead of the managed PostgreSQL service

In some scenarios, you might prefer to use an internal PostgreSQL deployment instead of the external Azure Database for PostgreSQL service. This could be due to cost considerations, network restrictions, or the need for tighter control over the database environment.

For example, if your application or service is deployed in a private network and requires a database that resides within the same Kubernetes cluster for performance or security reasons, the internal PostgreSQL deployment would be a better fit.

To switch to the internal PostgreSQL deployment, configure the Helm chart as follows. Additionally, remove configurations related to the external database and secret references to avoid conflicts.

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

:::note
The `smtp-password` is required for Web Modeler to send emails, but Web Modeler is not enabled by default in this guide. If you plan to enable Web Modeler, ensure you configure the SMTP settings as described in the [Web Modeler configuration guide](/self-managed/modeler/web-modeler/configuration/configuration.md#smtp--email).
:::

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/create-identity-secret.sh
```

### 3. Install Camunda 8 using Helm

Now that the `generated-values.yml` is ready, you can install Camunda 8 using Helm. Run the following command:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/install-chart.sh
```

This script:

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

## Verify connectivity to Camunda 8

First, we need an OAuth client to be able to connect to the Camunda 8 cluster.

### Generate an M2M token using Identity

Generate an M2M token by following the steps outlined in the [Identity getting started guide](/self-managed/identity/identity-first-steps.md), along with the [incorporating applications documentation](/self-managed/identity/application-user-group-role-management/applications.md).

Below is a summary of the necessary instructions:

<Tabs groupId="domain">
  <TabItem value="with" label="With domain" default>

1. Open Identity in your browser at `https://${DOMAIN_NAME}/identity`. You will be redirected to Keycloak and prompted to log in with a username and password.
2. Use `demo` as both the username and password.
3. Select **Add application** and select **M2M** as the type. Assign a name like "test."
4. Select the newly created application. Then, select **Access to APIs > Assign permissions**, and select the **Core API** with "read" and "write" permission.
5. Retrieve the `client-id` and `client-secret` values from the application details

```shell
export ZEEBE_CLIENT_ID='client-id' # retrieve the value from the identity page of your created m2m application
export ZEEBE_CLIENT_SECRET='client-secret' # retrieve the value from the identity page of your created m2m application
```

</TabItem>
  
<TabItem value="without" label="Without domain">

Identity and Keycloak must be port-forwarded to be able to connect to the cluster.

```shell
kubectl port-forward "services/$CAMUNDA_RELEASE_NAME-identity" 8080:80 --namespace "$CAMUNDA_NAMESPACE"
kubectl port-forward "services/$CAMUNDA_RELEASE_NAME-keycloak" 18080:80 --namespace "$CAMUNDA_NAMESPACE"
```

1. Open Identity in your browser at `http://localhost:8080`. You will be redirected to Keycloak and prompted to log in with a username and password.
2. Use `demo` as both the username and password.
3. Select **Add application** and select **M2M** as the type. Assign a name like "test".
4. Select the newly created application. Then, select **Access to APIs > Assign permissions**, and select the **Core API** with "read" and "write" permission.
5. Retrieve the `client-id` and `client-secret` values from the application details

```shell
export ZEEBE_CLIENT_ID='client-id' # retrieve the value from the identity page of your created m2m application
export ZEEBE_CLIENT_SECRET='client-secret' # retrieve the value from the identity page of your created m2m application
```

<details>
<summary>To access the other services and their UIs, port-forward those components as well:</summary>
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

</TabItem>
</Tabs>

### Use the token

<Tabs groupId="c8-connectivity">
  <TabItem value="rest-api" label="REST API" default>

For a detailed guide on generating and using a token, conduct the relevant documentation on [authenticating with the Orchestration cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md).

<Tabs groupId="domain">
  <TabItem value="with" label="With domain" default>

Export the following environment variables:

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/export-verify-zeebe-domain.sh
```

  </TabItem>
  <TabItem value="without" label="Without domain">

This requires to port-forward the Zeebe Gateway to be able to connect to the cluster.

```shell
kubectl port-forward "services/$CAMUNDA_RELEASE_NAME-zeebe-gateway" 8080:8080 --namespace "$CAMUNDA_NAMESPACE"
```

Export the following environment variables:

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/export-verify-zeebe-local.sh
```

  </TabItem>

</Tabs>

Generate a temporary token to access the Orchestration cluster REST API, then capture the value of the `access_token` property and store it as your token. Use the stored token (referred to as `TOKEN` in this case) to interact with the Orchestration cluster REST API and display the cluster topology:


```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/check-zeebe-cluster-topology.sh
```

...and results in the following output:

<details>
  <summary>Example output</summary>
  <summary>

```json reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/check-zeebe-cluster-topology-output.json
```

  </summary>
</details>
  </TabItem>
  <TabItem value="modeler" label="Desktop Modeler">

Follow our existing [Modeler guide on deploying a diagram](/self-managed/modeler/desktop-modeler/deploy-to-self-managed.md). Below are the helper values required to be filled in Modeler:

<Tabs groupId="domain" defaultValue="with" queryString values={
[
{label: 'With domain', value: 'with' },
{label: 'Without domain', value: 'without' },
]}>

<TabItem value="with">

The following values are required for the OAuth authentication:

- **Cluster endpoint:** `https://zeebe.$DOMAIN_NAME`, replacing `$DOMAIN_NAME` with your domain
- **Client ID:** Retrieve the client ID value from the identity page of your created M2M application
- **Client Secret:** Retrieve the client secret value from the Identity page of your created M2M application
- **OAuth Token URL:** `https://$DOMAIN_NAME/auth/realms/camunda-platform/protocol/openid-connect/token`, replacing `$DOMAIN_NAME` with your domain
- **Audience:** `zeebe-api`, the default for Camunda 8 Self-Managed

</TabItem>

<TabItem value="without">

This requires port-forwarding the Zeebe Gateway to be able to connect to the cluster:

```shell
kubectl port-forward "services/$CAMUNDA_RELEASE_NAME-zeebe-gateway" 26500:26500 --namespace "$CAMUNDA_NAMESPACE"
```

The following values are required for OAuth authentication:

- **Cluster endpoint:** `http://localhost:26500`
- **Client ID:** Retrieve the client ID value from the identity page of your created M2M application.
- **Client Secret:** Retrieve the client secret value from the Identity page of your created M2M application.
- **OAuth Token URL:** `http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token`
- **Audience:** `zeebe-api`, the default for Camunda 8 Self-Managed.

</TabItem>
</Tabs>

</TabItem>
</Tabs>

## Test the installation with payment example application

To test your installation with the deployment of a sample application, refer to the [installing payment example guide](../../../guides/installing-payment-example.md).

## Advanced topics

The following are some advanced configuration topics to consider for your cluster:

- [Camunda production installation guide with Kubernetes and Helm](versioned_docs/version-8.7/self-managed/operational-guides/production-guide/helm-chart-production-guide.md)
- [Cluster autoscaling](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/cloudprovider/azure/README.md)

To get more familiar with our product stack, visit the following topics:

- [Operate](/components/operate/operate-introduction.md)
- [Tasklist](/components/tasklist/introduction-to-tasklist.md)
- [Optimize](/components/optimize/what-is-optimize.md)
