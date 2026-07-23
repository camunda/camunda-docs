---
id: eks-helm
title: "Install Camunda 8 on an EKS cluster"
description: "Set up the Camunda 8 environment with Helm and an optional Ingress setup on Amazon EKS."
---

<!-- (!) Note: Please ensure that this guide maintains a consistent structure and presentation style throughout, as with docs/self-managed/deployment/helm/cloud-providers/openshift/terraform-setup.md. The user should have a similar experience when reading both guides. -->

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import VerifyConnectivity from '@site/docs/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/_partials/_verify-connectivity.md';

import IdpPrerequisite from '@site/docs/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/_partials/_idp-prerequisite.md'
import NoDomainIdpChoice from '@site/docs/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/_partials/_no-domain-idp-choice.md'
import WhyNoIdp from '@site/docs/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/_partials/_why-no-idp.md'
import SingleNamespaceDeployment from '@site/docs/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/_partials/_single-namespace-deployment.md'
import NoDomainInfo from '@site/docs/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/_partials/_no-domain-info.md'
import HelmUpgradeNote from '@site/docs/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/_partials/_helm-upgrade-note.md'

This guide provides a comprehensive walkthrough for installing the Camunda 8 Helm chart on your existing AWS Kubernetes EKS cluster. It also includes instructions for setting up optional DNS configurations and other optional AWS-managed services, such as OpenSearch and PostgreSQL.

Lastly you'll verify that the connection to your Self-Managed Camunda 8 environment is working.

:::tip Production hardening
This guide gets Camunda 8 running on EKS. For deeper production hardening — scaling, reliability, security, observability, and backups — see the [production install guide](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/install/production/index.md).
:::

<!-- TODO(camunda/team-infrastructure-experience#1063): Reword this Aurora PostgreSQL routing guidance when the broader InfraEx guidance is finalized. -->

:::note Using Amazon Aurora PostgreSQL as secondary storage
Use this page for the EKS cluster, networking, Ingress, and AWS-managed services.

Then continue with [RDBMS example deployment](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/install/helm-with-rdbms.md) and [configure RDBMS in Helm](/self-managed/deployment/helm/configure/database/rdbms.md).

If you use Amazon OpenSearch Service for secondary storage, continue with the default path in this guide.
:::

## Requirements

- A Kubernetes cluster; see the [eksctl](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/provision-your-cluster/amazon-eks/eksctl.md) or [Terraform](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/provision-your-cluster/amazon-eks/terraform-setup.md) guide.
- [Helm](https://helm.sh/docs/intro/install/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) to interact with the cluster.
- [jq](https://jqlang.github.io/jq/download/) to interact with some variables.
- [GNU envsubst](https://www.man7.org/linux/man-pages/man1/envsubst.1.html) to generate manifests.
- (optional) Domain name/[hosted zone](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-working-with.html) in Route53. This allows you to expose Camunda 8 and connect via community-supported [zbctl](https://github.com/camunda-community-hub/zeebe-client-go/blob/main/cmd/zbctl/zbctl.md) or [Camunda Modeler](https://camunda.com/download/modeler/).
- A namespace to host Camunda.

For the tool versions used, check the [.tool-versions](https://github.com/camunda/camunda-deployment-references/blob/main/.tool-versions) file in the repository. It contains an up-to-date list of versions that we also use for testing.

### Considerations

While this guide is primarily tailored for UNIX systems, it can also be run under Windows by utilizing the [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl/about).

Multi-tenancy is disabled by default and is not covered further in this guide. If you decide to enable it, you may use the same PostgreSQL instance and add an extra database for multi-tenancy purposes.

:::caution Optimize compatibility with OpenSearch

**Migration:** The migration step will be disabled during the installation. For more information, refer to [using Amazon OpenSearch Service](/self-managed/deployment/helm/configure/database/using-external-opensearch.md).

:::

## Architecture

In addition to the infrastructure diagram provided in the [Terraform setup guide](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/provision-your-cluster/amazon-eks/terraform-setup.md), this section installs Camunda 8 following the architecture described in the [reference architecture](/self-managed/reference-architecture/reference-architecture.md).

The architecture includes the following core components:

- **Orchestration Cluster**: Core process execution engine (Zeebe, Operate, Tasklist, and Admin)
- **Web Modeler and Console**: Management and design tools (Web Modeler, Console, and Management Identity)

To demonstrate how to deploy with a custom domain, the following stack is also included:

- **cert-manager**: Automates TLS certificate management with [Let's Encrypt](https://letsencrypt.org/)
- **external-dns**: Manages DNS record in Route53 for domain ownership confirmation
- **Contour**: Ingress controller backed by the Envoy proxy, providing HTTP/HTTPS load balancing and routing to Kubernetes services

<SingleNamespaceDeployment />

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

When using either standard authentication (network based or username and password) or IRSA authentication, specific environment variables must be set with valid values. Follow the guide for either [eksctl](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/provision-your-cluster/amazon-eks/eksctl.md#configuration-1) or [Terraform](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/provision-your-cluster/amazon-eks/terraform-setup.md#export-values-for-the-helm-chart) to set them correctly.

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

Alternatively, you can use `kubectl port-forward` to access Camunda without a domain or Ingress configuration. For more information, see the [kubectl port-forward documentation](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_port-forward/).

Throughout the rest of this installation guide, we will refer to configurations as **"With domain"** or **"Without domain"** depending on whether the application is exposed via a domain.
:::

In this section, we provide an optional setup guide for configuring an Ingress with TLS and DNS management, allowing you to access your application through a specified domain. If you haven't set up an Ingress, refer to the [Kubernetes Ingress documentation](https://kubernetes.io/docs/concepts/services-networking/ingress/) for more details. In Kubernetes, an Ingress is an API object that manages external access to services in a cluster, typically over HTTP, and can also handle TLS encryption for secure connections.

For more details on the Ingress controller used here and its configuration options, refer to the [Contour documentation](https://projectcontour.io/docs/). Contour uses the [Envoy proxy](https://www.envoyproxy.io/) as its data plane to route and load balance Ingress traffic.

### Export Values

Set the following values for your Ingress configuration:

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/export-ingress-setup-vars.sh
```

Additionally, obtain these values by following the guide for either [eksctl](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/provision-your-cluster/amazon-eks/eksctl.md) or [Terraform](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/provision-your-cluster/amazon-eks/terraform-setup.md), as they will be needed in later steps:

- `EXTERNAL_DNS_IRSA_ARN`
- `CERT_MANAGER_IRSA_ARN`
- `REGION`

### Contour

[Contour](https://projectcontour.io/) is a CNCF Incubating, open-source Kubernetes Ingress controller that uses the [Envoy proxy](https://www.envoyproxy.io/) as its data plane. It manages external access to services within a Kubernetes cluster, acting as a reverse proxy and load balancer that routes incoming traffic to the appropriate services based on rules defined in the Ingress resource.

The following installs `contour` in the `projectcontour` namespace via Helm. For more configuration options, consult the [Contour Helm chart](https://projectcontour.github.io/helm-charts/).

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region/procedure/install-contour.sh
```

### external-dns

[External-dns](https://github.com/kubernetes-sigs/external-dns) is a Kubernetes add-on that automates the management of DNS records for external resources, such as load balancers or Ingress controllers. It monitors the Kubernetes resources and dynamically updates the DNS provider with the appropriate DNS records.

The following installs `external-dns` in the `external-dns` namespace via Helm. For more configuration options, consult the [Helm chart](https://github.com/kubernetes-sigs/external-dns/tree/master/charts/external-dns).

Consider setting `domainFilters` via `--set` to restrict access to certain hosted zones.

:::tip
Make sure to have `EXTERNAL_DNS_IRSA_ARN` exported prior by either having followed the [eksctl](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/provision-your-cluster/amazon-eks/eksctl.md#policy-for-external-dns) or [Terraform](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/provision-your-cluster/amazon-eks/terraform-setup.md#outputs) guide.
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
Make sure to have `CERT_MANAGER_IRSA_ARN` exported prior by either having followed the [eksctl](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/provision-your-cluster/amazon-eks/eksctl.md#policy-for-cert-manager) or [Terraform](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/provision-your-cluster/amazon-eks/terraform-setup.md#outputs) guide.
:::

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region/procedure/install-cert-manager.sh
```

Create a `ClusterIssuer` via `kubectl` to enable cert-manager to request certificates from [Let's Encrypt](https://letsencrypt.org/):

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region/procedure/install-cert-manager-issuer.sh
```

## Identity Provider (IdP) setup

<IdpPrerequisite />

<NoDomainIdpChoice />

<WhyNoIdp />

## Deploy Camunda 8 via Helm charts

For more configuration options, refer to the [Helm chart documentation](https://artifacthub.io/packages/helm/camunda/camunda-platform#parameters). Additionally, explore our existing resources on the [Camunda 8 Helm chart](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/install/index.md) and [guides](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/configure/index.md).

Depending of your installation path, you may use different settings.
For easy and reproducible installations, we will use yaml files to configure the chart.

### 1. Create the `values.yml` file

Start by creating a `values.yml` file to store the configuration for your environment. This file will contain key-value pairs that will be substituted using `envsubst`. You can find a reference example of this file here:

:::note Database initialization prerequisite
If you're using an external Aurora PostgreSQL database, you must create the individual component databases (Identity and Web Modeler) before installing the Helm chart. This initialization step is covered in the infrastructure setup guides:

- **Terraform**: See [Configure the database and associated access](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/provision-your-cluster/amazon-eks/terraform-setup.md#configure-the-database-and-associated-access) in the Terraform setup guide.
- **eksctl**: See [Create the databases](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/provision-your-cluster/amazon-eks/eksctl.md#create-the-databases) in the eksctl guide.

Without this step, Management Identity and Web Modeler will fail to connect to their databases.
:::

<Tabs groupId="values">
  <TabItem value="with-domain-std" label="Standard with domain" default>

The following makes use of the [combined Ingress setup](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/configure/ingress/ingress-setup.md#combined-ingress-setup) by deploying a single Ingress for all HTTP components and a separate Ingress for the gRPC endpoint.

:::info Cert-manager annotation for domain installation
The annotation `kubernetes.io/tls-acme=true` will be [interpreted by cert-manager](https://cert-manager.io/docs/usage/ingress/) and automatically results in the creation of the required certificate request, easing the setup.
:::

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region/helm-values/values-domain.yml
```

:::danger Exposure of the Zeebe Gateway Service
For production-grade security, keep the Zeebe Gateway on a private network (no public Ingress) and access it only from internal workloads or through a secure VPN connection. This limits the attack surface and ensures workflow and job traffic remain inside your trusted network boundary. See the [VPN module setup](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/provision-your-cluster/amazon-eks/terraform-setup.md#vpn-module-setup) for guidance on establishing secure remote access to a private EKS cluster.

Additionally, implement fine-grained [Kubernetes NetworkPolicies](https://kubernetes.io/docs/concepts/services-networking/network-policies/) to explicitly allow only required internal components to initiate connections to the Zeebe Gateway Service. Deny all other Ingress traffic at the network layer to reduce blast radius if another workload in the cluster is compromised.

:::

#### Reference the credentials in secrets

Before installing the Helm chart, create Kubernetes secrets to store the database authentication credentials.

To create the secrets, run the following commands:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region/procedure/create-external-db-secrets.sh
```

</TabItem>

<TabItem value="without-domain-std" label="Standard without domain">

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region/helm-values/values-no-domain.yml
```

<NoDomainInfo />

#### Reference the credentials in secrets

Before installing the Helm chart, create Kubernetes secrets to store the database authentication credentials.

To create the secrets, run the following commands:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region/procedure/create-external-db-secrets.sh
```

  </TabItem>

  <TabItem value="with-domain-irsa" label="IRSA with domain" default>

The following makes use of the [combined Ingress setup](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/configure/ingress/ingress-setup.md#combined-ingress-setup) by deploying a single Ingress for all HTTP components and a separate Ingress for the gRPC endpoint.

:::info Cert-manager annotation for domain installation
The annotation `kubernetes.io/tls-acme=true` will be [interpreted by cert-manager](https://cert-manager.io/docs/usage/ingress/) and automatically results in the creation of the required certificate request, easing the setup.
:::

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region-irsa/helm-values/values-domain.yml
```

:::danger Exposure of the Zeebe Gateway Service
For production-grade security, keep the Zeebe Gateway on a private network (no public Ingress) and access it only from internal workloads or through a secure VPN connection. This limits the attack surface and ensures workflow and job traffic remain inside your trusted network boundary. See the [VPN module setup](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/provision-your-cluster/amazon-eks/terraform-setup.md#vpn-module-setup) for guidance on establishing secure remote access to a private EKS cluster.

Additionally, implement fine-grained [Kubernetes NetworkPolicies](https://kubernetes.io/docs/concepts/services-networking/network-policies/) to explicitly allow only required internal components to initiate connections to the Zeebe Gateway Service. Deny all other Ingress traffic at the network layer to reduce blast radius if another workload in the cluster is compromised.

:::

  </TabItem>

  <TabItem value="without-domain-irsa" label="IRSA without domain">

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region-irsa/helm-values/values-no-domain.yml
```

<NoDomainInfo />

  </TabItem>

</Tabs>

### 2. Configure your deployment

#### Enable Enterprise components

Web Modeler, Console, and Management Identity are not enabled by default in this deployment.

To enable these enterprise components in an OIDC-enabled full cluster, first deploy the required infrastructure (PostgreSQL, Elasticsearch/OpenSearch, and an IdP, such as Keycloak) using the official operators, then apply the Helm values examples shown in [deploy required dependencies with operators](/self-managed/deploy-to-production/plan-your-deployment/kubernetes-operators.md).

#### Secondary storage options

This guide includes a managed Amazon OpenSearch example path for secondary storage. Choose the backend that fits your requirements:

- **Managed OpenSearch**: Use the managed Amazon OpenSearch domain provisioned in the [eksctl](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/provision-your-cluster/amazon-eks/eksctl.md) or [Terraform](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/provision-your-cluster/amazon-eks/terraform-setup.md) setup.
- **Amazon Aurora PostgreSQL**: Use Aurora PostgreSQL as secondary storage for the Orchestration Cluster. Follow this EKS guide for the cluster, networking, Ingress, and optional AWS services, then continue with [RDBMS example deployment](/self-managed/deploy-to-production/deploy-your-baseline/kubernetes/install/helm-with-rdbms.md) for the Helm workflow and [configure RDBMS in Helm](/self-managed/deployment/helm/configure/database/rdbms.md) for the values reference.

RDBMS as secondary storage disables Optimize unless you also deploy Elasticsearch or OpenSearch alongside it.

#### Advanced: Use Helm-chart Elasticsearch instead of managed OpenSearch

For advanced deployments, you can disable managed OpenSearch and enable the Elasticsearch deployment from the Camunda Helm chart:

:::caution Deprecated path
The Helm-chart Elasticsearch deployment uses deprecated Bitnami subcharts. Prefer managed Elasticsearch/OpenSearch services for long-term deployments, or deploy [Elastic Cloud on Kubernetes (ECK)](/self-managed/deploy-to-production/plan-your-deployment/kubernetes-operators.md#elasticsearch-deployment) if you need operator-based Elasticsearch with automated scaling, upgrades, and built-in security.
:::

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

:::tip Alternative: Operator-based PostgreSQL deployment
Instead of using Bitnami subcharts for internal PostgreSQL, consider using [CloudNativePG operator](/self-managed/deploy-to-production/plan-your-deployment/kubernetes-operators.md#postgresql-deployment) for production-grade PostgreSQL clusters with automated backup, monitoring, and scaling capabilities.
:::

<details>
<summary>Show configuration changes to disable external database usage</summary>

```yaml
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

:::note Web Modeler SMTP secret
If you plan to enable Web Modeler, create the SMTP secret required for email notifications ([see how it's used by Web Modeler](/self-managed/components/hub/configuration/properties.md#smtp--email)):

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region/procedure/create-webmodeler-secret.sh
```

:::

### 3. Install Camunda 8 using Helm

Now that the `generated-values.yml` is ready, you can install Camunda 8 using Helm. Run the following command:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/install-chart.sh
```

This command:

- Installs (or upgrades) Camunda using the Helm chart.
- Substitutes the appropriate version using the `$CAMUNDA_HELM_CHART_VERSION` environment variable.
- Applies the configuration from `generated-values.yml`.

<HelmUpgradeNote />

You can track the progress of the installation using the following command:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/check-deployment-ready.sh
```

<details>
<summary>Understand how each component interacts with IRSA</summary>
<summary>

#### Web Modeler

As the Web Modeler REST API uses PostgreSQL, configure the `restapi` to use IRSA with Amazon Aurora PostgreSQL. Check the [Web Modeler database configuration](/self-managed/components/hub/configuration/database.md#running-web-modeler-on-amazon-aurora-postgresql) for more details.
Web Modeler already comes fitted with the [aws-advanced-jdbc-wrapper](https://github.com/awslabs/aws-advanced-jdbc-wrapper) within the Docker image.

#### Identity

Identity uses PostgreSQL, and `identity` is configured to use IRSA with Amazon Aurora PostgreSQL. Check the [Identity database configuration](/self-managed/components/management-identity/miscellaneous/configuration-variables.md#running-identity-on-amazon-aurora-postgresql) for more details. Identity includes [aws-advanced-jdbc-wrapper](https://github.com/awslabs/aws-advanced-jdbc-wrapper) within the Docker image.

:::info Keycloak with IRSA
If you deploy Keycloak via the Keycloak Operator and want it to use IRSA for database access, refer to the [official Keycloak documentation](https://www.keycloak.org/server/db#preparing-keycloak-for-amazon-aurora-postgresql) for instructions on configuring Amazon Aurora PostgreSQL with a custom JDBC wrapper.
:::

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
  https://github.com/camunda/camunda-deployment-references/blob/main/aws/kubernetes/eks-single-region-irsa/setup-opensearch-fgac.yml#L28-L48
  ```

  - Replace `OPENSEARCH_MASTER_USERNAME` and `OPENSEARCH_MASTER_PASSWORD` with your OpenSearch domain admin credentials.
  - Replace `OPENSEARCH_HOST` with your OpenSearch endpoint URL.
  - Replace `OPENSEARCH_ROLE_ARN` with the IAM role name created by Terraform, which is output by the `opensearch_role` module.

  :::note Security of Basic authentication usage

  **This example uses Basic authentication (username and password), which may not be the best practice for all scenarios, especially if fine-grained access control is enabled.** The endpoint used in this example is not exposed by default, so consult your OpenSearch documentation for specifics on enabling and securing this endpoint.

  :::

Ensure that the `iam_role_arn` of the previously created `opensearch_role` is assigned to an internal role within Amazon OpenSearch Service. For example, `all_access` on the Amazon OpenSearch Service side is a good candidate, or if required, extra roles can be created with more restrictive access.

</summary>
</details>

<VerifyConnectivity />

## Advanced topics

The following are some advanced configuration topics to consider for your cluster:

- [Cluster autoscaling](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/cloudprovider/aws/README.md)

To get more familiar with our product stack, visit the following topics:

- [Operate](/components/operate/operate-introduction.md)
- [Tasklist](/components/tasklist/introduction-to-tasklist.md)
- [Optimize](/components/optimize/what-is-optimize.md)
