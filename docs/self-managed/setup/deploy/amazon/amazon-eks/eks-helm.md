---
id: eks-helm
title: "Install Camunda 8 on an EKS cluster"
description: "Set up the Camunda 8 environment with Helm and an optional DNS setup on Amazon EKS."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This guide offers a comprehensive guide for installing the Camunda 8 Helm chart on your pre-existing AWS Kubernetes EKS cluster. Additionally, it includes instructions for setting up an optional DNS configuration.
Lastly you'll verify that the connection to your Self-Managed Camunda 8 environment is working.

## Prerequisites

- A Kubernetes cluster; see the [eksctl](./eksctl.md) or [terraform](./terraform-setup.md) guide.

- [Helm (3.16+)](https://helm.sh/docs/intro/install/)
- [kubectl (1.30+)](https://kubernetes.io/docs/tasks/tools/#kubectl) to interact with the cluster.
- (optional) Domain name/[hosted zone](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-working-with.html) in Route53. This allows you to expose Camunda 8 and connect via [zbctl](/apis-tools/community-clients/cli-client/index.md) or [Camunda Modeler](https://camunda.com/download/modeler/).

## Considerations

While this guide is primarily tailored for UNIX systems, it can also be run under Windows by utilizing the [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl/about).

Multi-tenancy is disabled by default and is not covered further in this guide. If you decide to enable it, you may use the same PostgreSQL instance and add an extra database for multi-tenancy purposes.

:::caution Optimize compatibility with OpenSearch

**Migration:** The migration step will be disabled during the installation. For more information, refer to [using Amazon OpenSearch Service](/self-managed/setup/guides/using-existing-opensearch.md).
:::

### Architecture

<!-- TODO: add steps to indicates that Aurora is optional and how can it be disabled -->
<!-- TODO: add steps to indicates that OpenSearch is optional and how can it be disabled -->

<!-- TODO: update Arch to include Aurora and OpenSearch both text and diagram -->

Note the [existing architecture](../../../../about-self-managed.md#architecture) extended by deploying a Network Load Balancer with TLS termination within the [ingress](https://kubernetes.github.io/ingress-nginx/user-guide/tls/) below.

Additionally, two components ([external-dns](https://github.com/kubernetes-sigs/external-dns) and [cert-manager](https://cert-manager.io/)) handle requesting the TLS certificate from [Let's Encrypt](https://letsencrypt.org/) and configuring Route53 to confirm domain ownership and update the DNS records to expose the Camunda 8 deployment.

![Camunda 8 Self-Managed AWS Architecture Diagram](./assets/camunda-8-self-managed-architecture-aws.png)

## Usage

In the following, we're using `helm upgrade --install` as it runs install on initial deployment and upgrades future usage. This may make it easier for future [Camunda 8 Helm upgrades](/self-managed/setup/upgrade.md) or any other component upgrades.

### Environment prerequisites

To streamline the execution of the subsequent commands, it is recommended to export multiple environment variables.

The following are the required environment variables with some example values:

```shell
# Your standard region that you host AWS resources in
export REGION="$AWS_REGION"

# The Camunda 8 Helm Chart version
export CAMUNDA_HELM_CHART_VERSION="11.0.0"
```

<Tabs groupId="auth">

  <TabItem value="basic" label="Basic Auth" default>
  
When using Basic authentication (username and password), some following environment variables must be set and contain valid values.

Once you have set the environment variables, you can verify that they are correctly configured by running the following loop:

```bash
# List of required environment variables
required_vars=("PG_USERNAME" "PG_PASSWORD" "OPENSEARCH_MASTER_USER" "OPENSEARCH_MASTER_PASSWORD" "DB_HOST" "DEFAULT_DB_NAME" "OPENSEARCH_HOST")

# Loop through each variable and check if it is set and not empty
for var in "${required_vars[@]}"; do
  if [[ -z "${!var}" ]]; then
    echo "Error: $var is not set or is empty"
  else
    echo "$var is set to '${!var}'"
  fi
done
```

  </TabItem>

  <TabItem value="irsa" label="IRSA Auth" default>
  
When using IRSA authentication, some following environment variables must be set and contain valid values.

:::caution Optimize compatibility with OpenSearch

**Authentification:** Optimize does not work with the IRSA method, it will use standard basic auth (username and password).

:::

Once you have set the environment variables, you can verify that they are correctly configured by running the following loop:

```bash
# List of required environment variables
required_vars=("PG_USERNAME" "DEFAULT_DB_NAME" "DB_HOST" "DB_ROLE_ARN" "OPENSEARCH_HOST" "OPENSEARCH_ROLE_ARN" "CAMUNDA_WEBMODELER_SERVICE_ACCOUNT_NAME" "CAMUNDA_IDENTITY_SERVICE_ACCOUNT_NAME" "CAMUNDA_KEYCLOAK_SERVICE_ACCOUNT_NAME" "CAMUNDA_ZEEBE_SERVICE_ACCOUNT_NAME" "CAMUNDA_OPERATE_SERVICE_ACCOUNT_NAME" "CAMUNDA_TASKLIST_SERVICE_ACCOUNT_NAME" "CAMUNDA_OPTIMIZE_SERVICE_ACCOUNT_NAME")

# Loop through each variable and check if it is set and not empty
for var in "${required_vars[@]}"; do
  if [[ -z "${!var}" ]]; then
    echo "Error: $var is not set or is empty"
  else
    echo "$var is set to '${!var}'"
  fi
done
```

  </TabItem>

</Tabs>

You can follow the guide from either [eksctl](./eks-helm.md) or [Terraform](./terraform-setup.md#export-values-for-the-helm-chart) to set it correctly.

<Tabs groupId="domain">
  <TabItem value="with" label="With Domain" default>

```shell
# The domain name that you intend to use
export DOMAIN_NAME=camunda.example.com
# The e-mail to register with Let's Encrypt
export MAIL=admin@camunda.example.com
# The Ingress-Nginx Helm Chart version
export INGRESS_HELM_CHART_VERSION="4.11.2"
# The External DNS Helm Chart version
export EXTERNAL_DNS_HELM_CHART_VERSION="1.15.0"
# The Cert-Manager Helm Chart version
export CERT_MANAGER_HELM_CHART_VERSION="1.15.3"

```

Additionally, follow the guide from either [eksctl](./eks-helm.md) or [Terraform](./terraform-setup.md) to retrieve the following values, which will be required for subsequent steps:

- EXTERNAL_DNS_IRSA_ARN
- CERT_MANAGER_IRSA_ARN
- REGION

### DNS set up

:::info
If you don't have a domain name, you cannot access Camunda 8 web endpoints from outside the AWS VPC. Therefore, you can skip the DNS set up and continue with deploying [Camunda 8](#deploy-camunda-8-via-helm-charts).
:::

#### ingress-nginx

[Ingress-nginx](https://github.com/kubernetes/ingress-nginx) is an open-source Kubernetes Ingress controller that provides a way to manage external access to services within a Kubernetes cluster. It acts as a reverse proxy and load balancer, routing incoming traffic to the appropriate services based on rules defined in the Ingress resource.

The following installs `ingress-nginx` in the `ingress-nginx` namespace via Helm. For more configuration options, consult the [Helm chart](https://github.com/kubernetes/ingress-nginx/tree/main/charts/ingress-nginx).

```shell
helm upgrade --install \
  ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --version $INGRESS_HELM_CHART_VERSION \
  --set 'controller.service.annotations.service\.beta\.kubernetes\.io\/aws-load-balancer-backend-protocol=tcp' \
  --set 'controller.service.annotations.service\.beta\.kubernetes\.io\/aws-load-balancer-cross-zone-load-balancing-enabled=true' \
  --set 'controller.service.annotations.service\.beta\.kubernetes\.io\/aws-load-balancer-type=nlb' \
  --namespace ingress-nginx \
  --create-namespace
```

#### external-dns

[External-dns](https://github.com/kubernetes-sigs/external-dns) is a Kubernetes add-on that automates the management of DNS records for external resources, such as load balancers or Ingress controllers. It monitors the Kubernetes resources and dynamically updates the DNS provider with the appropriate DNS records.

The following installs `external-dns` in the `external-dns` namespace via Helm. For more configuration options, consult the [Helm chart](https://github.com/kubernetes-sigs/external-dns/tree/master/charts/external-dns).

Consider setting `domainFilters` via `--set` to restrict access to certain hosted zones.

:::tip
Make sure to have `EXTERNAL_DNS_IRSA_ARN` exported prior by either having followed the [eksctl](./eksctl.md#policy-for-external-dns) or [Terraform](./terraform-setup.md#outputs) guide.
:::

:::warning Uniqueness of txtOwnerId for DNS

If you are already running `external-dns` in a different cluster, ensure each instance has a **unique** `txtOwnerId` for the TXT record. Without unique identifiers, the `external-dns` instances will conflict and inadvertently delete existing DNS records.

In the example below, it's set to `external-dns` and should be changed if this identifier is already in use. Consult the [documentation](https://kubernetes-sigs.github.io/external-dns/v0.15.0/#note) to learn more about DNS record ownership.
:::

```shell
helm upgrade --install \
  external-dns external-dns \
  --repo https://kubernetes-sigs.github.io/external-dns/ \
  --version $EXTERNAL_DNS_HELM_CHART_VERSION \
  --set "env[0].name=AWS_DEFAULT_REGION" \
  --set "env[0].value=$REGION" \
  --set txtOwnerId=external-dns \
  --set policy=sync \
  --set "serviceAccount.annotations.eks\.amazonaws\.com\/role-arn=$EXTERNAL_DNS_IRSA_ARN" \
  --namespace external-dns \
  --create-namespace
```

#### cert-manager

[Cert-manager](https://cert-manager.io/) is an open-source Kubernetes add-on that automates the management and issuance of TLS certificates. It integrates with various certificate authorities (CAs) and provides a straightforward way to obtain, renew, and manage SSL/TLS certificates for your Kubernetes applications.

To simplify the installation process, it is [recommended](https://cert-manager.io/docs/installation/helm/#3-install-customresourcedefinitions) to install the cert-manager `CustomResourceDefinition` resources before installing the chart. This separate step allows for easy uninstallation and reinstallation of cert-manager without deleting any custom resources that have been installed.

```shell
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v$CERT_MANAGER_HELM_CHART_VERSION/cert-manager.crds.yaml
```

The following installs `cert-manager` in the `cert-manager` namespace via Helm. For more configuration options, consult the [Helm chart](https://artifacthub.io/packages/helm/cert-manager/cert-manager). The supplied settings also configure `cert-manager` to ease the certificate creation by setting a default issuer, which allows you to add a single annotation on an Ingress to request the relevant certificates.

:::tip
Make sure to have `CERT_MANAGER_IRSA_ARN` exported prior by either having followed the [eksctl](./eksctl.md#policy-for-cert-manager) or [Terraform](./terraform-setup.md#outputs) guide.
:::

```shell
helm upgrade --install \
  cert-manager cert-manager \
  --repo https://charts.jetstack.io \
  --version $CERT_MANAGER_HELM_CHART_VERSION \
  --namespace cert-manager \
  --create-namespace \
  --set "serviceAccount.annotations.eks\.amazonaws\.com\/role-arn=$CERT_MANAGER_IRSA_ARN" \
  --set securityContext.fsGroup=1001 \
  --set ingressShim.defaultIssuerName=letsencrypt \
  --set ingressShim.defaultIssuerKind=ClusterIssuer \
  --set ingressShim.defaultIssuerGroup=cert-manager.io
```

Create a `ClusterIssuer` via `kubectl` to enable cert-manager to request certificates from [Let's Encrypt](https://letsencrypt.org/):

```shell
cat << EOF | kubectl apply -f -
---
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: $MAIL
    privateKeySecretRef:
      name: letsencrypt-issuer-account-key
    solvers:
      - selector: {}
        dns01:
          route53:
            region: $REGION
            # Cert-manager will automatically observe the hosted zones
            # Cert-manager will automatically make use of the IRSA assigned service account
EOF
```

</TabItem>

<TabItem value="without" label="Without Domain">

Without a domain, you will need to use [kubectl port-forward to access the Camunda 8 platform](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_port-forward/).

</TabItem>
</Tabs>

### Deploy Camunda 8 via Helm charts

For more configuration options, refer to the [Helm chart documentation](https://artifacthub.io/packages/helm/camunda/camunda-platform#parameters). Additionally, explore our existing resources on the [Camunda 8 Helm chart](/self-managed/setup/install.md) and [guides](/self-managed/setup/guides/guides.md).

Depending of your installation path, you may use different settings.
For having easy and reproductable installations, we will use yaml files to configure the chart.

#### 1. Create the `values.yml` File

Start by creating a `values.yml` file to store the configuration for your environment. This file will contain key-value pairs that will be substituted using `envsubst`. You can find a reference example of this file here:

<Tabs groupId="domain">
  <TabItem value="with-domain-std" label="With Domain Basic Auth" default>

The following makes use of the [combined Ingress setup](/self-managed/setup/guides/ingress-setup.md#combined-ingress-setup) by deploying a single Ingress for all HTTP components and a separate Ingress for the gRPC endpoint.

```hcl reference
https://github.com/camunda/camunda-tf-eks-module/blob/feature/opensearch-doc/examples/camunda-8.6/helm-values/values-domain.yml
```

:::warning Exposure of the Zeebe Gateway

Publicly exposing the Zeebe Gateway without proper authorization can pose significant security risks. To avoid this, consider disabling the Ingress for the Zeebe Gateway by setting the following values to `false` in your configuration file:

- `zeebeGateway.ingress.grpc.enabled`
- `zeebeGateway.ingress.rest.enabled`

By default, authorization is enabled to ensure secure access to Zeebe. Typically, only internal components need direct access to Zeebe, making it unnecessary to expose the gateway externally.

:::

##### Reference the credentials in secrets

Before installing the Helm chart, you need to create a Kubernetes secrets to store the Keycloak database authentication credentials and the OpenSearch authentication credentials.

To create the secrets, run the following commands:

```bash
# ensure that the namespace exists
kubectl create namespace camunda

kubectl create secret generic identity-keycloak-secret \
  --namespace camunda \
  --from-literal=host=${DB_HOST} \
  --from-literal=user=${PG_USERNAME} \
  --from-literal=password=${PG_PASSWORD} \
  --from-literal=database=${DEFAULT_DB_NAME} \
  --from-literal=port=5432
```

```bash
kubectl create secret generic opensearch-secret \
  --namespace camunda \
  --from-literal=password=${OPENSEARCH_MASTER_PASSWORD}
```

  </TabItem>

  <TabItem value="without-domain-std" label="Without Domain Basic Auth">

```hcl reference
https://github.com/camunda/camunda-tf-eks-module/blob/feature/opensearch-doc/examples/camunda-8.6/helm-values/values-no-domain.yml
```

##### Reference the credentials in secrets

Before installing the Helm chart, you need to create a Kubernetes secrets to store the Keycloak database authentication credentials and the OpenSearch authentication credentials.

To create the secrets, run the following commands:

```bash
# ensure that the namespace exists
kubectl create namespace camunda

kubectl create secret generic identity-keycloak-secret \
  --namespace camunda \
  --from-literal=host=${DB_HOST} \
  --from-literal=user=${PG_USERNAME} \
  --from-literal=password=${PG_PASSWORD} \
  --from-literal=database=${DEFAULT_DB_NAME} \
  --from-literal=port=5432
```

```bash
kubectl create secret generic opensearch-secret \
  --namespace camunda \
  --from-literal=password=${OPENSEARCH_MASTER_PASSWORD}
```

  </TabItem>

  <TabItem value="with-domain-irsa" label="With Domain IRSA Auth" default>

The following makes use of the [combined Ingress setup](/self-managed/setup/guides/ingress-setup.md#combined-ingress-setup) by deploying a single Ingress for all HTTP components and a separate Ingress for the gRPC endpoint.

```hcl reference
https://github.com/camunda/camunda-tf-eks-module/blob/feature/opensearch-doc/examples/camunda-8.6-irsa/helm-values/values-domain.yml
```

:::warning Exposure of the Zeebe Gateway

Publicly exposing the Zeebe Gateway without proper authorization can pose significant security risks. To avoid this, consider disabling the Ingress for the Zeebe Gateway by setting the following values to `false` in your configuration file:

- `zeebeGateway.ingress.grpc.enabled`
- `zeebeGateway.ingress.rest.enabled`

By default, authorization is enabled to ensure secure access to Zeebe. Typically, only internal components need direct access to Zeebe, making it unnecessary to expose the gateway externally.

:::

  </TabItem>

  <TabItem value="without-domain-irsa" label="Without Domain IRSA Auth">

```hcl reference
https://github.com/camunda/camunda-tf-eks-module/blob/feature/opensearch-doc/examples/camunda-8.6-irsa/helm-values/values-no-domain.yml
```

  </TabItem>

</Tabs>

#### 2. Substitute Environment Variables

Once you've prepared the `values.yml` file, use the `envsubst` command to substitute the environment variables with their actual values. Run the following command:

```bash
envsubst < values.yml > generated-values.yml
```

This will generate a new file `generated-values.yml` with the environment-specific values.

#### 3. Install Camunda 8 Using Helm

Now that the `generated-values.yml` is ready, you can install Camunda 8 using Helm. Here's the command:

```bash
helm upgrade --install \
  camunda camunda-platform \
  --repo https://helm.camunda.io \
  --version $CAMUNDA_HELM_CHART_VERSION \
  --namespace camunda \
  --create-namespace \
  -f generated-values.yml
```

This command:

- Installs (or upgrades) the Camunda 8 platform using the Helm chart.
- Substitutes the appropriate version using the `$CAMUNDA_HELM_CHART_VERSION` environment variable.
- References the namespace `camunda`, creating it if it doesn't exist.
- Applies the configuration from `generated-values.yml`.

**Note for domain installation:** the annotation `kubernetes.io/tls-acme=true` will be [interpreted by cert-manager](https://cert-manager.io/docs/usage/ingress/) and automatically results in the creation of the required certificate request, easing the setup.

<details>
<summary>Understand how each component interacts with IRSA</summary>
<summary>

##### Web Modeler

Since Web Modeler RestAPI uses PostgreSQL, configure the `restapi` to use IRSA with Amazon Aurora PostgreSQL. Check the [Web Modeler database configuration](../../../../modeler/web-modeler/configuration/database.md#running-web-modeler-on-amazon-aurora-postgresql) for more details.
Web Modeler already comes fitted with the [aws-advanced-jdbc-wrapper](https://github.com/awslabs/aws-advanced-jdbc-wrapper) within the Docker image.

##### Keycloak

:::caution Only available from v21+

IAM Roles for Service Accounts can only be implemented with Keycloak 21 onwards. This may require you to adjust the version used in the Camunda Helm Chart.

:::

From Keycloak versions 21+, the default JDBC driver can be overwritten, allowing use of a custom wrapper like the [aws-advanced-jdbc-wrapper](https://github.com/awslabs/aws-advanced-jdbc-wrapper) to utilize the features of IRSA. This is a wrapper around the default JDBC driver, but takes care of signing the requests.

Furthermore, the [official Keycloak documentation](https://www.keycloak.org/server/db#preparing-keycloak-for-amazon-aurora-postgresql) also provides detailed instructions for utilizing Amazon Aurora PostgreSQL.

A custom Keycloak container image containing necessary configurations is conveniently accessible on Docker Hub at [camunda/keycloak](https://hub.docker.com/r/camunda/keycloak). This image, built upon the base image [bitnami/keycloak](https://hub.docker.com/r/bitnami/keycloak), incorporates the required wrapper for seamless integration.

###### Container image sources

The sources of the [Camunda Keycloak images](https://hub.docker.com/r/camunda/keycloak) can be found on [GitHub](https://github.com/camunda/keycloak). In this repository, the [aws-advanced-jdbc-wrapper](https://github.com/awslabs/aws-advanced-jdbc-wrapper) is assembled in the `Dockerfile`.

Maintenance of these images is based on the upstream [Bitnami Keycloak images](https://hub.docker.com/r/bitnami/keycloak), ensuring they are always up-to-date with the latest Keycloak releases. The lifecycle details for Keycloak can be found on [endoflife.date](https://endoflife.date/keycloak).

###### Keycloak image configuration

Bitnami Keycloak container image configuration is available at [hub.docker.com/bitnami/keycloak](https://hub.docker.com/r/bitnami/keycloak).

##### Identity

Identity uses PostgreSQL, we need to configure `identity` to use IRSA with Amazon Aurora PostgreSQL. Check the [Identity database configuration](../../../../identity/deployment/configuration-variables.md#running-identity-on-amazon-aurora-postgresql) for more details.
Identity already comes fitted with the [aws-advanced-jdbc-wrapper](https://github.com/awslabs/aws-advanced-jdbc-wrapper) within the Docker image.

##### Amazon OpenSearch Service

###### Internal Database configuration

The default setup is sufficient for Amazon OpenSearch Service clusters without `fine-grained access control`.

`Fine-grained access control` adds another layer of security to OpenSearch, requiring you to add a mapping between the IAM role and the internal OpenSearch role. Visit the [AWS documentation](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/fgac.html) on `fine-grained access control`.

There are different ways to configure the mapping within Amazon OpenSearch Service:

- Via a [Terraform module](https://registry.terraform.io/modules/idealo/opensearch/aws/latest) in case your OpenSearch instance is exposed.
- Via the [OpenSearch dashboard](https://opensearch.org/docs/latest/security/access-control/users-roles/).

<details>

<summary>Via the REST API</summary>

To authorize the IAM role in OpenSearch for access, follow these steps:

**_Note that this example uses basic authentication (username and password), which may not be the best practice for all scenarios, especially if fine-grained access control is enabled._** The endpoint used in this example is not exposed by default, so consult your OpenSearch documentation for specifics on enabling and securing this endpoint.

Use the following `curl` command to update the OpenSearch internal database and authorize the IAM role for access. Replace placeholders with your specific values:

```bash
curl -sS -u "<OS_DOMAIN_USER>:<OS_DOMAIN_PASSWORD>" \
    -X PATCH \
    "https://<OS_ENDPOINT>/_opendistro/_security/api/rolesmapping/all_access?pretty" \
    -H 'Content-Type: application/json' \
    -d'
[
  {
    "op": "add",
    "path": "/backend_roles",
    "value": ["<ROLE_NAME>"]
  }
]
'
```

- Replace `<OS_DOMAIN_USER>` and `<OS_DOMAIN_PASSWORD>` with your OpenSearch domain admin credentials.
- Replace `<OS_ENDPOINT>` with your OpenSearch endpoint URL.
- Replace `<ROLE_NAME>` with the IAM role name created by Terraform, which is output by the `opensearch_role` module.

</details>

The important part is assigning the `iam_role_arn` of the previously created `opensearch_role` to an internal role within Amazon OpenSearch Service. For example, `all_access` on the Amazon OpenSearch Service side is a good candidate, or if required, extra roles can be created with more restrictive access.

</summary>
</details>

### Verify connectivity to Camunda 8

First, we need an OAuth client to be able to connect to the Camunda 8 cluster.

This can be done by following the [Identity getting started guide](/self-managed/identity/getting-started/install-identity.md) followed by the [incorporating applications documentation](/self-managed/identity/user-guide/additional-features/incorporate-applications.md).
Instead of creating a confidential application, a machine-to-machine (M2M) application is required to be created.
This reveals a `client-id` and `client-secret` that can be used to connect to the Camunda 8 cluster.

<Tabs groupId="c8-connectivity">
  <TabItem value="rest-api" label="REST API" default>

For a detailed guide on generating and using a token, please conduct the relevant documentation on [authenticating with the REST API](./../../../../../apis-tools/camunda-api-rest/camunda-api-rest-authentication.md?environment=self-managed).

<Tabs groupId="domain">
  <TabItem value="with" label="With Domain" default>

Export the following environment variables:

```shell
export ZEEBE_ADDRESS=zeebe-rest.$DOMAIN_NAME
export ZEEBE_CLIENT_ID='client-id' # retrieve the value from the identity page of your created m2m application
export ZEEBE_CLIENT_SECRET='client-secret' # retrieve the value from the identity page of your created m2m application
export ZEEBE_AUTHORIZATION_SERVER_URL=https://$DOMAIN_NAME/auth/realms/camunda-platform/protocol/openid-connect/token
```

  </TabItem>
  <TabItem value="without" label="Without Domain">

This requires to port-forward the Zeebe Gateway and Keycloak to be able to connect to the cluster.

```shell
kubectl port-forward services/camunda-zeebe-gateway 8080:8080
kubectl port-forward services/camunda-keycloak 18080:80
```

Export the following environment variables:

```shell
export ZEEBE_ADDRESS=localhost:8080
export ZEEBE_CLIENT_ID='client-id' # retrieve the value from the identity page of your created m2m application
export ZEEBE_CLIENT_SECRET='client-secret' # retrieve the value from the identity page of your created m2m application
export ZEEBE_AUTHORIZATION_SERVER_URL=http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token
```

  </TabItem>

</Tabs>

Generate a temporary token to access the REST API:

```shell
curl --location --request POST "${ZEEBE_AUTHORIZATION_SERVER_URL}" \
--header "Content-Type: application/x-www-form-urlencoded" \
--data-urlencode "client_id=${ZEEBE_CLIENT_ID}" \
--data-urlencode "client_secret=${ZEEBE_CLIENT_SECRET}" \
--data-urlencode "grant_type=client_credentials"
```

Capture the value of the `access_token` property and store it as your token.

Use the stored token, in our case `TOKEN`, to use the REST API to print the cluster topology.

```shell
curl --header "Authorization: Bearer ${TOKEN}" "${ZEEBE_ADDRESS}/v2/topology"
```

...and results in the following output:

<details>
  <summary>Example output</summary>
  <summary>

```shell
{
  "brokers": [
    {
      "nodeId": 0,
      "host": "camunda-zeebe-0.camunda-zeebe",
      "port": 26501,
      "partitions": [
        {
          "partitionId": 1,
          "role": "leader",
          "health": "healthy"
        },
        {
          "partitionId": 2,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 3,
          "role": "follower",
          "health": "healthy"
        }
      ],
      "version": "8.6.0"
    },
    {
      "nodeId": 1,
      "host": "camunda-zeebe-1.camunda-zeebe",
      "port": 26501,
      "partitions": [
        {
          "partitionId": 1,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 2,
          "role": "leader",
          "health": "healthy"
        },
        {
          "partitionId": 3,
          "role": "follower",
          "health": "healthy"
        }
      ],
      "version": "8.6.0"
    },
    {
      "nodeId": 2,
      "host": "camunda-zeebe-2.camunda-zeebe",
      "port": 26501,
      "partitions": [
        {
          "partitionId": 1,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 2,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 3,
          "role": "leader",
          "health": "healthy"
        }
      ],
      "version": "8.6.0"
    }
  ],
  "clusterSize": 3,
  "partitionsCount": 3,
  "replicationFactor": 3,
  "gatewayVersion": "8.6.0"
}
```

  </summary>
</details>

  </TabItem>
  <TabItem value="zbctl" label="zbctl">

After following the installation instructions in the [zbctl docs](/apis-tools/community-clients/cli-client/index.md), we can configure the required connectivity to check that the Zeebe cluster is reachable.

<Tabs groupId="domain">
  <TabItem value="with" label="With Domain" default>

Export the following environment variables:

```shell
export ZEEBE_ADDRESS=zeebe.$DOMAIN_NAME:443
export ZEEBE_CLIENT_ID='client-id' # retrieve the value from the identity page of your created m2m application
export ZEEBE_CLIENT_SECRET='client-secret' # retrieve the value from the identity page of your created m2m application
export ZEEBE_AUTHORIZATION_SERVER_URL=https://$DOMAIN_NAME/auth/realms/camunda-platform/protocol/openid-connect/token
export ZEEBE_TOKEN_AUDIENCE='zeebe-api'
export ZEEBE_TOKEN_SCOPE='camunda-identity'
```

  </TabItem>
  <TabItem value="without" label="Without Domain">

This requires to port-forward the Zeebe Gateway and Keycloak to be able to connect to the cluster.

```shell
kubectl port-forward services/camunda-zeebe-gateway 26500:26500
kubectl port-forward services/camunda-keycloak 18080:80
```

Export the following environment variables:

```shell
export ZEEBE_ADDRESS=localhost:26500
export ZEEBE_CLIENT_ID='client-id' # retrieve the value from the identity page of your created m2m application
export ZEEBE_CLIENT_SECRET='client-secret' # retrieve the value from the identity page of your created m2m application
export ZEEBE_AUTHORIZATION_SERVER_URL=http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token
export ZEEBE_TOKEN_AUDIENCE='zeebe-api'
export ZEEBE_TOKEN_SCOPE='camunda-identity'
```

  </TabItem>

</Tabs>

Executing the following command will result in a successful connection to the Zeebe cluster...

```shell
zbctl status
# or in the case of port-forwarding (without domain)
zbctl status --insecure
```

...and results in the following output:

<details>
  <summary>Example output</summary>
  <summary>

```shell
Cluster size: 3
Partitions count: 3
Replication factor: 3
Gateway version: 8.6.0
Brokers:
  Broker 0 - camunda-zeebe-0.camunda-zeebe.camunda.svc:26501
    Version: 8.6.0
    Partition 1 : Follower, Healthy
    Partition 2 : Follower, Healthy
    Partition 3 : Follower, Healthy
  Broker 1 - camunda-zeebe-1.camunda-zeebe.camunda.svc:26501
    Version: 8.6.0
    Partition 1 : Leader, Healthy
    Partition 2 : Leader, Healthy
    Partition 3 : Follower, Healthy
  Broker 2 - camunda-zeebe-2.camunda-zeebe.camunda.svc:26501
    Version: 8.6.0
    Partition 1 : Follower, Healthy
    Partition 2 : Follower, Healthy
    Partition 3 : Leader, Healthy
```

  </summary>
</details>

For more advanced topics, like deploying a process or registering a worker, consult the [zbctl docs](/apis-tools/community-clients/cli-client/cli-get-started.md).

If you want to access the other services and their UI, you can port-forward those as well:

```shell
Identity:
> kubectl port-forward svc/camunda-identity 8080:80
Operate:
> kubectl port-forward svc/camunda-operate  8081:80
Tasklist:
> kubectl port-forward svc/camunda-tasklist 8082:80
Optimize:
> kubectl port-forward svc/camunda-optimize 8083:80
Connectors:
> kubectl port-forward svc/camunda-connectors 8088:8080
```

:::note
Keycloak must be port-forwarded at all times as it is required to authenticate.
:::

```shell
kubectl port-forward services/camunda-keycloak 18080:80
```

  </TabItem>
    <TabItem value="modeler" label="Modeler">

Follow our existing [Modeler guide on deploying a diagram](/self-managed/modeler/desktop-modeler/deploy-to-self-managed.md). Below are the helper values required to be filled in Modeler:

<Tabs groupId="domain">
  <TabItem value="with" label="With Domain" default>

The following values are required for the OAuth authentication:

```shell
# Make sure to manually replace #DOMAIN_NAME with your actual domain since Modeler can't access the shell context
Cluster endpoint=https://zeebe.$DOMAIN_NAME
Client ID='client-id' # retrieve the value from the identity page of your created m2m application
Client Secret='client-secret' # retrieve the value from the identity page of your created m2m application
OAuth Token URL=https://$DOMAIN_NAME/auth/realms/camunda-platform/protocol/openid-connect/token
Audience=zeebe-api # the default for Camunda 8 Self-Managed
```

  </TabItem>
  <TabItem value="without" label="Without Domain">

This requires to port-forward the Zeebe Gateway and Keycloak to be able to connect to the cluster.

```shell
kubectl port-forward services/camunda-zeebe-gateway 26500:26500
kubectl port-forward services/camunda-keycloak 18080:80
```

The following values are required for the OAuth authentication:

```shell
# Make sure to manually replace #DOMAIN_NAME with your actual domain since Modeler can't access the shell context
Cluster endpoint=http://localhost:26500
Client ID='client-id' # retrieve the value from the identity page of your created m2m application
Client Secret='client-secret' # retrieve the value from the identity page of your created m2m application
OAuth Token URL=http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token
Audience=zeebe-api # the default for Camunda 8 Self-Managed
```

If you want to access the other services and their UI, you can port-forward those as well:

```shell
Identity:
> kubectl port-forward svc/camunda-identity 8080:80
Operate:
> kubectl port-forward svc/camunda-operate  8081:80
Tasklist:
> kubectl port-forward svc/camunda-tasklist 8082:80
Optimize:
> kubectl port-forward svc/camunda-optimize 8083:80
Connectors:
> kubectl port-forward svc/camunda-connectors 8088:8080
```

:::note
Keycloak must be port-forwarded at all times as it is required to authenticate.
:::

```shell
kubectl port-forward services/camunda-keycloak 18080:80
```

  </TabItem>
</Tabs>

  </TabItem>
</Tabs>

### Testing installation with payment example application

To test your installation with the deployment of a sample application, refer to the [installing payment example guide](../../../guides/installing-payment-example.md).

### Advanced topics

The following are some advanced configuration topics to consider for your cluster:

- [Cluster autoscaling](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/cloudprovider/aws/README.md)

To get more familiar with our product stack, visit the following topics:

- [Operate](/components/operate/operate-introduction.md)
- [Tasklist](/components/tasklist/introduction-to-tasklist.md)
- [Optimize]($optimize$/components/what-is-optimize)
