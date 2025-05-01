---
id: aks-helm
title: "Install Camunda 8 on an AKS cluster"
description: "Set up the Camunda 8 environment with Helm and an optional Ingress setup on Azure AKS."
---

<!-- (!) Note: Please ensure that this guide maintains a consistent structure and presentation style throughout, as with docs/self-managed/setup/deploy/openshift/terraform-setup.md. The user should have a similar experience when reading both guides. -->

This guide provides a comprehensive walkthrough for installing the Camunda 8 Helm chart on your existing Azure Kubernetes Service (AKS) cluster. It also includes optional steps for DNS configuration and connecting external clients such as zbctl or Camunda Modeler.

Lastly, you'll verify that the connection to your Self-Managed Camunda 8 environment is working.

## Requirements

- A Kubernetes cluster; see the [Terraform](./terraform-setup.md) guide.
- [Helm](https://helm.sh/docs/intro/install/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) to interact with the cluster.
- [jq](https://jqlang.github.io/jq/download/) to interact with some variables.
- [GNU envsubst](https://www.gnu.org/software/gettext/manual/html_node/envsubst-Invocation.html) to generate manifests.
- (optional) Domain name/[DNS zone](https://learn.microsoft.com/azure/dns/dns-overview) in Azure DNS. This allows you to expose Camunda 8 and connect via community-supported [zbctl](https://github.com/camunda-community-hub/zeebe-client-go/blob/main/cmd/zbctl/zbctl.md) or [Camunda Modeler](https://camunda.com/download/modeler/).
- A namespace to host the Camunda Platform; in this guide we will reference `camunda` as the target namespace.

For the tool versions used, check the [.tool-versions](https://github.com/camunda/camunda-deployment-references/blob/main/.tool-versions) file in the repository. It contains an up-to-date list of versions that we also use for testing.

### Considerations

While this guide is primarily tailored for UNIX systems, it can also be run under Windows by utilizing the [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl/about).

Multi-tenancy is disabled by default and is not covered further in this guide. If you decide to enable it, you may use the same PostgreSQL instance and add an extra database for multi-tenancy purposes.

<!-- OpenSearch is not included in the AKS setup, so compatibility notes are omitted. -->

## Architecture

<!-- OpenSearch and Aurora are not included in the AKS setup; references omitted accordingly. -->

Note the [existing architecture](../../../../about-self-managed.md#architecture) extended by deploying a public Load Balancer with TLS termination via the [nginx ingress controller](https://kubernetes.github.io/ingress-nginx/user-guide/tls/).

Additionally, two components ([external-dns](https://github.com/kubernetes-sigs/external-dns) and [cert-manager](https://cert-manager.io/)) handle requesting the TLS certificate from [Let's Encrypt](https://letsencrypt.org/) and configuring Azure DNS to confirm domain ownership and update the DNS records to expose the Camunda 8 deployment.

![Camunda 8 Self-Managed Azure Architecture Diagram](./assets/camunda-8-self-managed-architecture-azure.png)

## Export environment variables

To streamline the execution of the subsequent commands, it is recommended to export multiple environment variables.

### Export the region and Helm chart version

The following are the required environment variables with some example values:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/procedure/setting-region.sh
```

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/chart-env.sh
```

### Export database values

When using standard authentication (username and password), specific environment variables must be set with valid values. Follow the guide for [Terraform](./terraform-setup.md#export-values-for-the-helm-chart) to set them correctly.

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

<!-- Domain-specific configuration (Ingress, cert-manager) is not currently supported in the Azure reference and is intentionally omitted. -->

:::danger Exposure of the Zeebe Gateway

Publicly exposing the Zeebe Gateway without proper authorization can pose significant security risks. To avoid this, consider disabling the Ingress for the Zeebe Gateway by setting the following values to `false` in your configuration file:

- `zeebeGateway.ingress.grpc.enabled`
- `zeebeGateway.ingress.rest.enabled`

By default, authorization is enabled to ensure secure access to Zeebe. Typically, only internal components need direct access to Zeebe, making it unnecessary to expose the gateway externally.

:::

#### Reference the credentials in secrets

Before installing the Helm chart, create Kubernetes secrets to store the Keycloak database authentication credentials.

To create the secrets, run the following command:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/procedure/create-setup-db-secret.sh
```

### 2. Configure your deployment

#### Enable Enterprise components

Some components are not enabled by default in this deployment. For more information on how to configure and enable these components, refer to [configuring Web Modeler, Console, and Connectors](../../../install.md#configuring-web-modeler-console-and-connectors).

#### Use internal Elasticsearch

In the Azure setup, OpenSearch is not included. You must use the internal Elasticsearch deployment. This configuration enables the bundled Elasticsearch component within the Kubernetes cluster:

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

<!-- IRSA interaction note omitted — not applicable to Azure setup. -->

#### Web Modeler

Web Modeler uses PostgreSQL for its REST API. In the Azure setup, it connects to either the internal PostgreSQL instance or the managed Azure Database for PostgreSQL, depending on your configuration. No special JDBC wrapper is needed.

Refer to the [Web Modeler database configuration](../../../../modeler/web-modeler/configuration/database.md) for more information on using PostgreSQL with Web Modeler.

#### Keycloak

In the Azure setup, IAM role-based authentication like IRSA is not applicable. Keycloak connects to PostgreSQL either internally or externally using standard credentials. No custom JDBC wrapper or AWS-specific container image is required.

You may still use the [Camunda Keycloak images](https://hub.docker.com/r/camunda/keycloak) built upon [bitnami/keycloak](https://hub.docker.com/r/bitnami/keycloak), but the AWS JDBC wrapper is not relevant to this setup.

#### Identity

Identity uses PostgreSQL. In the Azure setup, it connects via standard JDBC to either the internal or managed PostgreSQL instance. No additional JDBC wrapper or cloud-specific driver is needed.

For more details, refer to the [Identity database configuration](../../../../identity/deployment/configuration-variables.md).

## Verify connectivity to Camunda 8

First, you need an OAuth client to connect to the Camunda 8 cluster.

### Generate an M2M token using Identity

Generate an M2M token by following the steps outlined in the [Identity getting started guide](/self-managed/identity/getting-started/install-identity.md), along with the [incorporating applications documentation](/self-managed/identity/user-guide/additional-features/incorporate-applications.md).

Below is a summary of the necessary instructions:

1. Port-forward Identity and Keycloak to access the UIs:

````bash
kubectl port-forward services/camunda-identity 8080:80 --namespace camunda ```
kubectl port-forward services/camunda-keycloak 18080:80 --namespace camunda ```
````

2. Open Identity in your browser at `http://localhost:8080`. You will be redirected to Keycloak and prompted to log in.
3. Use `demo` as both the username and password.
4. Select **Add application** and choose **M2M** as the type. Assign a name like "test."
5. Select the newly created application. Then, under **Access to APIs > Assign permissions**, choose **Core API** and select "read" and "write" permissions.
6. Retrieve the `client-id` and `client-secret` values:

```bash
export ZEEBE_CLIENT_ID='client-id'     # from Identity page
export ZEEBE_CLIENT_SECRET='client-secret' # from Identity page
```

To access other Camunda services locally, port-forward them as needed:

<details>
<summary>Port-forward commands for service UIs</summary>

```bash
# Operate
kubectl port-forward svc/camunda-operate 8081:80 --namespace camunda

# Tasklist
kubectl port-forward svc/camunda-tasklist 8082:80 --namespace camunda

# Optimize
kubectl port-forward svc/camunda-optimize 8083:80 --namespace camunda

# Connectors
kubectl port-forward svc/camunda-connectors 8086:8080 --namespace camunda

# Web Modeler
kubectl port-forward svc/camunda-web-modeler-webapp 8084:80 --namespace camunda

# Console
kubectl port-forward svc/camunda-console 8085:80 --namespace camunda
```

</details>

### Use the token

#### REST API

For a detailed guide, see [REST API authentication](./../../../../../apis-tools/camunda-api-rest/camunda-api-rest-authentication.md?environment=self-managed).

1. Port-forward the Zeebe Gateway:

```bash
kubectl port-forward services/camunda-zeebe-gateway 8080:8080 --namespace camunda
```

2. Export environment variables:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/export-verify-zeebe-local.sh
```

3. Generate a temporary token and verify the cluster topology:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/check-zeebe-cluster-topology.sh
```

<details>
<summary>Example output</summary>

```json reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/check-zeebe-cluster-topology-output.json
```

</details>

#### Desktop Modeler

Follow the [Modeler guide on deploying a diagram](/self-managed/modeler/desktop-modeler/deploy-to-self-managed.md). Use the following values for OAuth authentication:

1. Port-forward the Zeebe Gateway:

```bash
kubectl port-forward services/camunda-zeebe-gateway 26500:26500 --namespace camunda
```

2. Use these values in Camunda Modeler:

- **Cluster endpoint:** `http://localhost:26500`
- **Client ID:** From your M2M app in Identity
- **Client Secret:** From your M2M app in Identity
- **OAuth Token URL:** `http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token`
- **Audience:** `zeebe-api`

## Test the installation with payment example application

To test your installation with the deployment of a sample application, refer to the [installing payment example guide](../../../guides/installing-payment-example.md).

## Advanced topics

The following are some advanced configuration topics to consider for your cluster:

- [Cluster autoscaling in AKS](https://learn.microsoft.com/azure/aks/cluster-autoscaler)

To get more familiar with our product stack, visit the following topics:

- [Operate](/components/operate/operate-introduction.md)
- [Tasklist](/components/tasklist/introduction-to-tasklist.md)
- [Optimize](/components/optimize/what-is-optimize.md)
