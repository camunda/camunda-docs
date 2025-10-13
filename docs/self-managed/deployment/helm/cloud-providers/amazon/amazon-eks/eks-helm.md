---
id: eks-helm
title: "Install Camunda 8 on an EKS cluster"
description: "Set up the Camunda 8 environment with Helm and an optional Ingress setup on Amazon EKS."
---

<!-- (!) Note: Please ensure that this guide maintains a consistent structure and presentation style throughout, as with docs/self-managed/deployment/helm/cloud-providers/openshift/terraform-setup.md. The user should have a similar experience when reading both guides. -->

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This guide provides a comprehensive walkthrough for installing the Camunda 8 Helm chart on your existing AWS Kubernetes EKS cluster. It also includes instructions for setting up optional DNS configurations and other optional AWS-managed services, such as OpenSearch and PostgreSQL.

Lastly you'll verify that the connection to your Self-Managed Camunda 8 environment is working.

## Requirements

- A Kubernetes cluster; see the [eksctl](./eksctl.md) or [Terraform](./terraform-setup.md) guide.
- [Helm](https://helm.sh/docs/intro/install/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) to interact with the cluster.
- [jq](https://jqlang.github.io/jq/download/) to interact with some variables.
- [GNU envsubst](https://www.gnu.org/software/gettext/manual/html_node/envsubst-Invocation.html) to generate manifests.
- (optional) Domain name/[hosted zone](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-working-with.html) in Route53. This allows you to expose Camunda 8 and connect via community-supported [zbctl](https://github.com/camunda-community-hub/zeebe-client-go/blob/main/cmd/zbctl/zbctl.md) or [Camunda Modeler](https://camunda.com/download/modeler/).
- A namespace to host the Camunda Platform.

For the tool versions used, check the [.tool-versions](https://github.com/camunda/camunda-deployment-references/blob/main/.tool-versions) file in the repository. It contains an up-to-date list of versions that we also use for testing.

### Considerations

While this guide is primarily tailored for UNIX systems, it can also be run under Windows by utilizing the [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl/about).

Multi-tenancy is disabled by default and is not covered further in this guide. If you decide to enable it, you may use the same PostgreSQL instance and add an extra database for multi-tenancy purposes.

:::caution Optimize compatibility with OpenSearch

**Migration:** The migration step will be disabled during the installation. For more information, refer to [using Amazon OpenSearch Service](/self-managed/deployment/helm/configure/database/using-external-opensearch.md).

:::

## Architecture

In addition to the infrastructure diagram provided in the [Terraform setup guide](./terraform-setup.md), this section installs Camunda 8 following the architecture described in the [reference architecture](/self-managed/reference-architecture/reference-architecture.md).

The architecture includes the following core components:

- **Orchestration Cluster**: Core process execution engine (Zeebe, Operate, Tasklist, and Identity)
- **Web Modeler and Console**: Management and design tools (Web Modeler, Console, and Management Identity)
- **Keycloak as OIDC provider**: Example OIDC provider (can be replaced with any compatible IdP)

To demonstrate how to deploy with a custom domain, the following stack is also included:

- **cert-manager**: Automates TLS certificate management with [Let's Encrypt](https://letsencrypt.org/)
- **external-dns**: Manages DNS record in Route53 for domain ownership confirmation
- **ingress-nginx**: Provides HTTP/HTTPS load balancing and routing to Kubernetes services

:::info Single namespace deployment
This guide uses a single Kubernetes namespace for simplicity, since the deployment is done with a single Helm chart. This differs from the [reference architecture](/self-managed/reference-architecture/reference-architecture.md#components), which recommends separating Orchestration Cluster and Web Modeler or Console into different namespaces in production to improve isolation and enable independent scaling.
:::

## Export environment variables

To streamline the execution of the subsequent commands, it is recommended to export multiple environment variables.

### Export the AWS region and Helm chart version

The following are the required environment variables with some example values:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region/procedure/setting-region.sh
```

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/chart-env.sh
```

- `CAMUNDA_NAMESPACE` is the Kubernetes namespace where Camunda will be installed.
- `CAMUNDA_RELEASE_NAME` is the name of the Helm release associated with this Camunda installation.

### Export database values

When using either standard authentication (network based or username and password) or IRSA authentication, specific environment variables must be set with valid values. Follow the guide for either [eksctl](./eksctl.md#configuration-1) or [Terraform](./terraform-setup.md#export-values-for-the-helm-chart) to set them correctly.

Verify the configuration of your environment variables by running the following loop:

<Tabs groupId="env" defaultValue="standard" queryString values={
[
{label: 'Standard authentication', value: 'standard' },
{label: 'IRSA authentication', value: 'irsa' },
]}>

<TabItem value="standard">

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region/procedure/check-env-variables.sh
```

</TabItem>

<TabItem value="irsa">

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region-irsa/procedure/check-env-variables.sh
```

</TabItem>

</Tabs>

## (Optional) Ingress Setup

:::info Domain or domainless installation

If you do not have a domain name, external access to Camunda 8 web endpoints from outside the AWS VPC will not be possible. In this case, you may skip the DNS setup and proceed directly to [deploying Camunda 8 via Helm charts](#deploy-camunda-8-via-helm-charts).

Alternatively, you can use `kubectl port-forward` to access the Camunda platform without a domain or Ingress configuration. For more information, see the [kubectl port-forward documentation](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_port-forward/).

Throughout the rest of this installation guide, we will refer to configurations as **"With domain"** or **"Without domain"** depending on whether the application is exposed via a domain.
:::

In this section, we provide an optional setup guide for configuring an Ingress with TLS and DNS management, allowing you to access your application through a specified domain. If you haven't set up an Ingress, refer to the [Kubernetes Ingress documentation](https://kubernetes.io/docs/concepts/services-networking/ingress/) for more details. In Kubernetes, an Ingress is an API object that manages external access to services in a cluster, typically over HTTP, and can also handle TLS encryption for secure connections.

To monitor your Ingress setup using Amazon CloudWatch, you may also find the official AWS guide on [monitoring nginx workloads with CloudWatch Container Insights and Prometheus](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights-Prometheus-Sample-Workloads-nginx.html) helpful. Additionally, for detailed steps on exposing Kubernetes applications with the nginx ingress controller, refer to the [official AWS tutorial](https://aws.amazon.com/fr/blogs/containers/exposing-kubernetes-applications-part-3-nginx-ingress-controller/).

### Export Values

Set the following values for your Ingress configuration:

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/export-ingress-setup-vars.sh
```

Additionally, obtain these values by following the guide for either [eksctl](./eksctl.md) or [Terraform](./terraform-setup.md), as they will be needed in later steps:

- `EXTERNAL_DNS_IRSA_ARN`
- `CERT_MANAGER_IRSA_ARN`
- `REGION`

### ingress-nginx

[Ingress-nginx](https://github.com/kubernetes/ingress-nginx) is an open-source Kubernetes Ingress controller that provides a way to manage external access to services within a Kubernetes cluster. It acts as a reverse proxy and load balancer, routing incoming traffic to the appropriate services based on rules defined in the Ingress resource.

The following installs `ingress-nginx` in the `ingress-nginx` namespace via Helm. For more configuration options, consult the [Helm chart](https://github.com/kubernetes/ingress-nginx/tree/main/charts/ingress-nginx).

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region/procedure/install-ingress-nginx.sh
```

### external-dns

[External-dns](https://github.com/kubernetes-sigs/external-dns) is a Kubernetes add-on that automates the management of DNS records for external resources, such as load balancers or Ingress controllers. It monitors the Kubernetes resources and dynamically updates the DNS provider with the appropriate DNS records.

The following installs `external-dns` in the `external-dns` namespace via Helm. For more configuration options, consult the [Helm chart](https://github.com/kubernetes-sigs/external-dns/tree/master/charts/external-dns).

Consider setting `domainFilters` via `--set` to restrict access to certain hosted zones.

:::tip
Make sure to have `EXTERNAL_DNS_IRSA_ARN` exported prior by either having followed the [eksctl](./eksctl.md#policy-for-external-dns) or [Terraform](./terraform-setup.md#outputs) guide.
:::

:::danger Uniqueness of txtOwnerId for DNS

If you are already running `external-dns` in a different cluster, ensure each instance has a **unique** `txtOwnerId` for the TXT record. Without unique identifiers, the `external-dns` instances will conflict and inadvertently delete existing DNS records.

In the example below, it's set to `external-dns` and should be changed if this identifier is already in use. Consult the [documentation](https://kubernetes-sigs.github.io/external-dns/v0.15.0/#note) to learn more about DNS record ownership.
:::

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region/procedure/install-external-dns.sh
```

### cert-manager

[Cert-manager](https://cert-manager.io/) is an open-source Kubernetes add-on that automates the management and issuance of TLS certificates. It integrates with various certificate authorities (CAs) and provides a straightforward way to obtain, renew, and manage SSL/TLS certificates for your Kubernetes applications.

To simplify the installation process, it is [recommended](https://cert-manager.io/docs/installation/helm/#3-install-customresourcedefinitions) to install the cert-manager `CustomResourceDefinition` resources before installing the chart. This separate step allows for easy uninstallation and reinstallation of cert-manager without deleting any custom resources that have been installed.

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/install-cert-manager-crds.sh
```

The following installs `cert-manager` in the `cert-manager` namespace via Helm. For more configuration options, consult the [Helm chart](https://artifacthub.io/packages/helm/cert-manager/cert-manager). The supplied settings also configure `cert-manager` to ease the certificate creation by setting a default issuer, which allows you to add a single annotation on an Ingress to request the relevant certificates.

:::tip
Make sure to have `CERT_MANAGER_IRSA_ARN` exported prior by either having followed the [eksctl](./eksctl.md#policy-for-cert-manager) or [Terraform](./terraform-setup.md#outputs) guide.
:::

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region/procedure/install-cert-manager.sh
```

Create a `ClusterIssuer` via `kubectl` to enable cert-manager to request certificates from [Let's Encrypt](https://letsencrypt.org/):

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region/procedure/install-cert-manager-issuer.sh
```

## Deploy Camunda 8 via Helm charts

For more configuration options, refer to the [Helm chart documentation](https://artifacthub.io/packages/helm/camunda/camunda-platform#parameters). Additionally, explore our existing resources on the [Camunda 8 Helm chart](/self-managed/deployment/helm/install/quick-install.md) and [guides](/self-managed/deployment/helm/configure/index.md).

Depending of your installation path, you may use different settings.
For easy and reproducible installations, we will use yaml files to configure the chart.

### 1. Create the `values.yml` file

Start by creating a `values.yml` file to store the configuration for your environment. This file will contain key-value pairs that will be substituted using `envsubst`. You can find a reference example of this file here:

<Tabs groupId="values">
  <TabItem value="with-domain-std" label="Standard with domain" default>

The following makes use of the [combined Ingress setup](/self-managed/deployment/helm/configure/ingress/ingress-setup.md#combined-ingress-setup) by deploying a single Ingress for all HTTP components and a separate Ingress for the gRPC endpoint.

:::info Cert-manager annotation for domain installation
The annotation `kubernetes.io/tls-acme=true` will be [interpreted by cert-manager](https://cert-manager.io/docs/usage/ingress/) and automatically results in the creation of the required certificate request, easing the setup.
:::

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region/helm-values/values-domain.yml
```

:::danger Exposure of the Zeebe Gateway Service
For production-grade security, keep the Zeebe Gateway on a private network (no public Ingress) and access it only from internal workloads or through a secure VPN connection. This limits the attack surface and ensures workflow and job traffic remain inside your trusted network boundary. See the [VPN module setup](./terraform-setup.md#vpn-module-setup) for guidance on establishing secure remote access to a private EKS cluster.

Additionally, implement fine-grained [Kubernetes NetworkPolicies](https://kubernetes.io/docs/concepts/services-networking/network-policies/) to explicitly allow only required internal components to initiate connections to the Zeebe Gateway Service. Deny all other Ingress traffic at the network layer to reduce blast radius if another workload in the cluster is compromised.

:::

#### Reference the credentials in secrets

Before installing the Helm chart, create Kubernetes secrets to store the Keycloak database authentication credentials and the OpenSearch authentication credentials.

To create the secrets, run the following commands:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region/procedure/create-external-db-secrets.sh
```

</TabItem>

<TabItem value="without-domain-std" label="Standard without domain">

```hcl reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region/helm-values/values-no-domain.yml
```

:::info Keycloak issuer and localhost hostname alignment

When running without a domain, Console validates the JWT issuer claim against the configured Keycloak base URL. To keep token issuance consistent and avoid mismatches, the chart configuration sets Keycloak's hostname to its Kubernetes Service name when operating locally. This means that during port-forwarding you may need to map the service hostname to `127.0.0.1` so that browser redirects and token issuer values align.

Add (or update) the following entry in your `/etc/hosts` file while developing locally:

```text
127.0.0.1  $CAMUNDA_RELEASE_NAME-keycloak
```

After adding this entry, you can reach Keycloak at:
`http://$CAMUNDA_RELEASE_NAME-keycloak:18080/auth`

**Why port `18080`?**
We forward container port `8080` (originally `80`) to a non‑privileged local port (`18080`) to avoid requiring elevated privileges and to reduce conflicts with other processes using 8080.

This constraint does not apply when a proper domain and Ingress are configured (the public FQDN is then used as the issuer and no hosts file changes are needed).
:::

#### Reference the credentials in secrets

Before installing the Helm chart, create Kubernetes secrets to store the Keycloak database authentication credentials and the OpenSearch authentication credentials.

To create the secrets, run the following commands:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region/procedure/create-external-db-secrets.sh
```

  </TabItem>

  <TabItem value="with-domain-irsa" label="IRSA with domain" default>

The following makes use of the [combined Ingress setup](/self-managed/deployment/helm/configure/ingress/ingress-setup.md#combined-ingress-setup) by deploying a single Ingress for all HTTP components and a separate Ingress for the gRPC endpoint.

:::info Cert-manager annotation for domain installation
The annotation `kubernetes.io/tls-acme=true` will be [interpreted by cert-manager](https://cert-manager.io/docs/usage/ingress/) and automatically results in the creation of the required certificate request, easing the setup.
:::

```hcl reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region-irsa/helm-values/values-domain.yml
```

:::danger Exposure of the Zeebe Gateway Service
For production-grade security, keep the Zeebe Gateway on a private network (no public Ingress) and access it only from internal workloads or through a secure VPN connection. This limits the attack surface and ensures workflow and job traffic remain inside your trusted network boundary. See the [VPN module setup](./terraform-setup.md#vpn-module-setup) for guidance on establishing secure remote access to a private EKS cluster.

Additionally, implement fine-grained [Kubernetes NetworkPolicies](https://kubernetes.io/docs/concepts/services-networking/network-policies/) to explicitly allow only required internal components to initiate connections to the Zeebe Gateway Service. Deny all other Ingress traffic at the network layer to reduce blast radius if another workload in the cluster is compromised.

:::

  </TabItem>

  <TabItem value="without-domain-irsa" label="IRSA without domain">

```hcl reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region-irsa/helm-values/values-no-domain.yml
```

:::info Keycloak issuer and localhost hostname alignment

When running without a domain, Console validates the JWT issuer claim against the configured Keycloak base URL. To keep token issuance consistent and avoid mismatches, the chart configuration sets Keycloak's hostname to its Kubernetes Service name when operating locally. This means that during port-forwarding you may need to map the service hostname to `127.0.0.1` so that browser redirects and token issuer values align.

Add (or update) the following entry in your `/etc/hosts` file while developing locally:

```text
127.0.0.1  $CAMUNDA_RELEASE_NAME-keycloak
```

After adding this entry, you can reach Keycloak at:
`http://$CAMUNDA_RELEASE_NAME-keycloak:18080/auth`

**Why port `18080`?**
We forward container port `8080` (originally `80`) to a non‑privileged local port (`18080`) to avoid requiring elevated privileges and to reduce conflicts with other processes using 8080.

This constraint does not apply when a proper domain and Ingress are configured (the public FQDN is then used as the issuer and no hosts file changes are needed).
:::

  </TabItem>

</Tabs>

### 2. Configure your deployment

#### Enable Enterprise components

Some components are not enabled by default in this deployment. For more information on how to configure and enable these components, refer to [configuring Web Modeler, Console, and connectors](/self-managed/deployment/helm/install/quick-install.md#configuring-web-modeler-console-and-connectors).

#### Use internal Elasticsearch instead of the managed OpenSearch

If you do not wish to use a managed OpenSearch service, you can opt to use the internal Elasticsearch deployment. This configuration disables OpenSearch and enables the internal Kubernetes Elasticsearch deployment:

<details>
<summary>Show configuration changes to disable external OpenSearch usage</summary>

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

#### Use internal PostgreSQL instead of the managed Aurora

If you prefer not to use an external PostgreSQL service, you can switch to the internal PostgreSQL deployment. In this case, you will need to configure the Helm chart as follows and remove certain configurations related to the external database and service account:

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

webModelerPostgresql:
  enabled: true

webModeler:
  # Remove this part

  # restapi:
  #     externalDatabase:
  #         url: jdbc:aws-wrapper:postgresql://${DB_HOST}:5432/${DB_WEBMODELER_NAME}
  #         user: ${DB_WEBMODELER_USERNAME}
  #         ...

identity:
  # Remove this part

  # externalDatabase:
  #     enabled: true
  #     host: ${DB_HOST}
  #     port: 5432
  #     username: ${DB_IDENTITY_USERNAME}
  #     database: ${DB_IDENTITY_NAME}
  #     ...
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

- The `smtp-password` should be replaced with the appropriate external value ([see how it's used by Web Modeler](/self-managed/components/modeler/web-modeler/configuration/configuration.md#smtp--email)).

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

This guide uses `helm upgrade --install` as it runs install on initial deployment and upgrades future usage. This may make it easier for future [Camunda 8 Helm upgrades](/self-managed/deployment/helm/upgrade/index.md) or any other component upgrades.

:::

You can track the progress of the installation using the following command:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/check-deployment-ready.sh
```

<details>
<summary>Understand how each component interacts with IRSA</summary>
<summary>

#### Web Modeler

As the Web Modeler REST API uses PostgreSQL, configure the `restapi` to use IRSA with Amazon Aurora PostgreSQL. Check the [Web Modeler database configuration](../../../../../components/modeler/web-modeler/configuration/database.md#running-web-modeler-on-amazon-aurora-postgresql) for more details.
Web Modeler already comes fitted with the [aws-advanced-jdbc-wrapper](https://github.com/awslabs/aws-advanced-jdbc-wrapper) within the Docker image.

#### Keycloak

:::caution Only available from v21+

IAM Roles for Service Accounts can only be implemented with Keycloak 21+. This may require you to adjust the version used in the Camunda Helm chart.

:::

From Keycloak versions 21+, the default JDBC driver can be overwritten, allowing use of a custom wrapper like the [aws-advanced-jdbc-wrapper](https://github.com/awslabs/aws-advanced-jdbc-wrapper) to utilize the features of IRSA. This is a wrapper around the default JDBC driver, but takes care of signing the requests.

The [official Keycloak documentation](https://www.keycloak.org/server/db#preparing-keycloak-for-amazon-aurora-postgresql) also provides detailed instructions for utilizing Amazon Aurora PostgreSQL.

A custom Keycloak container image containing necessary configurations is accessible on Docker Hub at [camunda/keycloak](https://hub.docker.com/r/camunda/keycloak). This image, built upon the base image [bitnami/keycloak](https://hub.docker.com/r/bitnamilegacy/keycloak), incorporates the required wrapper for seamless integration.

#### Container image sources

The sources of the [Camunda Keycloak images](https://hub.docker.com/r/camunda/keycloak) can be found on [GitHub](https://github.com/camunda/keycloak). In this repository, the [aws-advanced-jdbc-wrapper](https://github.com/awslabs/aws-advanced-jdbc-wrapper) is assembled in the `Dockerfile`.

Maintenance of these images is based on the upstream Bitnami and official keycloak images, ensuring they are always up-to-date with the latest Keycloak releases. The lifecycle details for Keycloak can be found on [endoflife.date](https://endoflife.date/keycloak).

##### Keycloak image configuration

Bitnami Keycloak container image configuration is available at [hub.docker.com/bitnami/keycloak](https://hub.docker.com/r/bitnamilegacy/keycloak).

##### Identity

Identity uses PostgreSQL, and `identity` is configured to use IRSA with Amazon Aurora PostgreSQL. Check the [Identity database configuration](/self-managed/components/management-identity/miscellaneous/configuration-variables.md#running-identity-on-amazon-aurora-postgresql) for more details. Identity includes the [aws-advanced-jdbc-wrapper](https://github.com/awslabs/aws-advanced-jdbc-wrapper) within the Docker image.

#### Amazon OpenSearch Service

##### Internal database configuration

The default setup is sufficient for Amazon OpenSearch Service clusters without **fine-grained access control**.

Fine-grained access control adds another layer of security to OpenSearch, requiring you to add a mapping between the IAM role and the internal OpenSearch role. Visit the [AWS documentation](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/fgac.html) on fine-grained access control.

There are different ways to configure the mapping within Amazon OpenSearch Service:

- Via a [Terraform module](https://registry.terraform.io/modules/idealo/opensearch/aws/latest) in case your OpenSearch instance is exposed.
- Via the [OpenSearch dashboard](https://opensearch.org/docs/latest/security/access-control/users-roles/).
- Via the **REST API**. To authorize the IAM role in OpenSearch for access, follow these steps:

  Use the following `curl` command to update the OpenSearch internal database and authorize the IAM role for access. Replace placeholders with your specific values:

  ```bash reference
  https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region-irsa/setup-opensearch-fgac.yml#L28-L42
  ```

  - Replace `OPENSEARCH_MASTER_USERNAME` and `OPENSEARCH_MASTER_PASSWORD` with your OpenSearch domain admin credentials.
  - Replace `OPENSEARCH_HOST` with your OpenSearch endpoint URL.
  - Replace `OPENSEARCH_ROLE_ARN` with the IAM role name created by Terraform, which is output by the `opensearch_role` module.

  :::note Security of basic auth usage

  **This example uses basic authentication (username and password), which may not be the best practice for all scenarios, especially if fine-grained access control is enabled.** The endpoint used in this example is not exposed by default, so consult your OpenSearch documentation for specifics on enabling and securing this endpoint.

  :::

Ensure that the `iam_role_arn` of the previously created `opensearch_role` is assigned to an internal role within Amazon OpenSearch Service. For example, `all_access` on the Amazon OpenSearch Service side is a good candidate, or if required, extra roles can be created with more restrictive access.

</summary>
</details>

## Verify connectivity to Camunda 8

First, we need an OAuth client to be able to connect to the Camunda 8 cluster.

### Generate an M2M token using Identity

Generate an M2M token by following the steps outlined in the [Identity getting started guide](/self-managed/components/management-identity/overview.md), along with the [incorporating applications documentation](/self-managed/components/management-identity/application-user-group-role-management/applications.md).

Below is a summary of the necessary instructions:

<Tabs groupId="domain">
  <TabItem value="with" label="With domain" default>

1. Open Identity in your browser at `https://${DOMAIN_NAME}/managementidentity`. You will be redirected to Keycloak and prompted to log in with a username and password.
2. Log in with the initial user `admin` (defined in `identity.firstUser` of the values file). Retrieve the generated password (created earlier when running the secret creation script) from the Kubernetes secret and use it to authenticate:

```shell
kubectl get secret identity-secret-for-components \
  --namespace "$CAMUNDA_NAMESPACE" \
  -o jsonpath='{.data.identity-first-user-password}' | base64 -d; echo
```

3. Select **Add application** and select **M2M** as the type. Assign a name like "test."
4. Select the newly created application. Then, select **Access to APIs > Assign permissions**, and select the **Orchestration API** with "read" and "write" permission.
5. Retrieve the `client-id` and `client-secret` values from the application details

```shell
export ZEEBE_CLIENT_ID='client-id' # retrieve the value from the identity page of your created m2m application
export ZEEBE_CLIENT_SECRET='client-secret' # retrieve the value from the identity page of your created m2m application
```

</TabItem>
  
<TabItem value="without" label="Without domain">

Identity and Keycloak must be port-forwarded to be able to connect to the cluster.

```shell
kubectl port-forward "services/$CAMUNDA_RELEASE_NAME-identity" 8085:80 --namespace "$CAMUNDA_NAMESPACE"
kubectl port-forward "services/$CAMUNDA_RELEASE_NAME-keycloak" 18080:8080 --namespace "$CAMUNDA_NAMESPACE"
```

:::tip Localhost development with kubefwd
For a richer localhost experience (and to avoid managing many individual port-forward commands), you can use [kubefwd](https://github.com/txn2/kubefwd) to forward all Services in the target namespace and make them resolvable by their in-cluster DNS names on your workstation.

Example (requires `sudo` to bind privileged ports and modify `/etc/hosts`):

```shell
sudo kubefwd services -n "$CAMUNDA_NAMESPACE"
```

After this runs, you can reach services directly, for example:

- Identity: `http://$CAMUNDA_RELEASE_NAME-identity/managementidentity`
- Keycloak: `http://$CAMUNDA_RELEASE_NAME-keycloak`
- Zeebe Gateway gRPC: `$CAMUNDA_RELEASE_NAME-zeebe-gateway:26500`

You can still use localhost ports if you prefer traditional port-forwarding. Stop kubefwd with **Ctrl+C** when finished. Be aware kubefwd modifies your `/etc/hosts` temporarily; it restores the file when it exits.
:::

1. Open Identity in your browser at `http://localhost:8085/managementidentity`. You will be redirected to Keycloak and prompted to log in with a username and password.
2. Log in with the initial user `admin` (defined in `identity.firstUser` of the values file). Retrieve the generated password (created earlier when running the secret creation script) from the Kubernetes secret and use it to authenticate:

```shell
kubectl get secret identity-secret-for-components \
  --namespace "$CAMUNDA_NAMESPACE" \
  -o jsonpath='{.data.identity-first-user-password}' | base64 -d; echo
```

3. Select **Add application** and select **M2M** as the type. Assign a name like "test."
4. Select the newly created application. Then, select **Access to APIs > Assign permissions**, and select the **Orchestration API** with "read" and "write" permission.
5. Retrieve the `client-id` and `client-secret` values from the application details

```shell
export ZEEBE_CLIENT_ID='client-id' # retrieve the value from the identity page of your created m2m application
export ZEEBE_CLIENT_SECRET='client-secret' # retrieve the value from the identity page of your created m2m application
```

<details>
<summary>To access the other services and their UIs, port-forward those Components as well:</summary>

```shell
Orchestration:
> kubectl port-forward "svc/$CAMUNDA_RELEASE_NAME-zeebe-gateway"  8080:8080 --namespace "$CAMUNDA_NAMESPACE"
Optimize:
> kubectl port-forward "svc/$CAMUNDA_RELEASE_NAME-optimize" 8083:80 --namespace "$CAMUNDA_NAMESPACE"
Connectors:
> kubectl port-forward "svc/$CAMUNDA_RELEASE_NAME-connectors" 8086:8080 --namespace "$CAMUNDA_NAMESPACE"
WebModeler:
> kubectl port-forward "svc/$CAMUNDA_RELEASE_NAME-web-modeler-webapp" 8070:80 --namespace "$CAMUNDA_NAMESPACE"
Console:
> kubectl port-forward "svc/$CAMUNDA_RELEASE_NAME-console" 8087:80 --namespace "$CAMUNDA_NAMESPACE"
```

</details>

</TabItem>
</Tabs>

### Use the token

<Tabs groupId="c8-connectivity">
  <TabItem value="rest-api" label="REST API" default>

For a detailed guide on generating and using a token, please conduct the relevant documentation on [authenticating with the Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md).

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

Generate a temporary token to access the Orchestration Cluster REST API, then capture the value of the `access_token` property and store it as your token. Use the stored token (referred to as `TOKEN` in this case) to interact with the Orchestration Cluster REST API and display the cluster topology:

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

Follow our existing [Modeler guide on deploying a diagram](/self-managed/components/modeler/desktop-modeler/deploy-to-self-managed.md). Below are the helper values required to be filled in Modeler:

<Tabs groupId="domain" defaultValue="with" queryString values={
[
{label: 'With domain', value: 'with' },
{label: 'Without domain', value: 'without' },
]}>

<TabItem value="with">

The following values are required for the OAuth authentication:

- **Cluster endpoint:** `https://zeebe-$DOMAIN_NAME`, replacing `$DOMAIN_NAME` with your domain
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
- **Client ID:** Retrieve the client ID value from the identity page of your created M2M application
- **Client Secret:** Retrieve the client secret value from the Identity page of your created M2M application
- **OAuth Token URL:** `http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token`
- **Audience:** `zeebe-api`, the default for Camunda 8 Self-Managed

</TabItem>
</Tabs>

</TabItem>
</Tabs>

## Advanced topics

The following are some advanced configuration topics to consider for your cluster:

- [Cluster autoscaling](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/cloudprovider/aws/README.md)

To get more familiar with our product stack, visit the following topics:

- [Operate](/components/operate/operate-introduction.md)
- [Tasklist](/components/tasklist/introduction-to-tasklist.md)
- [Optimize](/components/optimize/what-is-optimize.md)
