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
- (optional) Domain name/[hosted zone](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-working-with.html) in Route53. This allows you to expose Camunda 8 and connect via the [Camunda 8 API](/apis-tools/camunda-api-rest/camunda-api-rest-overview.md) or [Camunda Modeler](https://camunda.com/download/modeler/).

## Considerations

While this guide is primarily tailored for UNIX systems, it can also be run under Windows by utilizing the [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl/about).

Multi-tenancy is disabled by default and is not covered further in this guide. If you decide to enable it, you may use the same PostgreSQL instance and add an extra database for multi-tenancy purposes.

### Architecture

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
export REGION=eu-central-1
# Following two environment variables can be skipped if you don't have a domain
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
# The Camunda 8 Helm Chart version
export CAMUNDA_HELM_CHART_VERSION="11.0.0"
```

Additionally, follow the guide from either [eksctl](./eks-helm.md) or [Terraform](./terraform-setup.md) to retrieve the following values, which will be required for subsequent steps:

- EXTERNAL_DNS_IRSA_ARN
- CERT_MANAGER_IRSA_ARN
- DB_HOST
- PG_USERNAME
- PG_PASSWORD
- DEFAULT_DB_NAME
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

:::warning
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

### Deploy Camunda 8 via Helm charts

For more configuration options, refer to the [Helm chart documentation](https://artifacthub.io/packages/helm/camunda/camunda-platform#parameters). Additionally, explore our existing resources on the [Camunda 8 Helm chart](/self-managed/setup/install.md) and [guides](/self-managed/setup/guides/guides.md).

<Tabs groupId="domain">
  <TabItem value="with" label="With Domain">

The following makes use of the [combined Ingress setup](/self-managed/setup/guides/ingress-setup.md#combined-ingress-setup) by deploying a single Ingress for all HTTP components and a separate Ingress for the gRPC endpoint.

:::warning

Publicly exposing the Zeebe Gateway without authorization enabled can lead to severe security risks. Consider disabling the Ingress for the Zeebe Gateway by setting the `zeebeGateway.ingress.grpc.enabled` and `zeebeGateway.ingress.rest.enabled` to `false`.

By default, authorization is enabled to ensure secure access to Zeebe. Typically, only internal components need direct access, making it unnecessary to expose Zeebe externally.

:::

```shell
helm upgrade --install \
  camunda camunda-platform \
  --repo https://helm.camunda.io \
  --version $CAMUNDA_HELM_CHART_VERSION \
  --namespace camunda \
  --create-namespace \
  --set identityKeycloak.postgresql.enabled=false \
  --set identityKeycloak.externalDatabase.host=$DB_HOST \
  --set identityKeycloak.externalDatabase.user=$PG_USERNAME \
  --set identityKeycloak.externalDatabase.password=$PG_PASSWORD \
  --set identityKeycloak.externalDatabase.database=$DEFAULT_DB_NAME \
  --set global.ingress.enabled=true \
  --set global.ingress.host=$DOMAIN_NAME \
  --set global.ingress.tls.enabled=true \
  --set global.ingress.tls.secretName=camunda-c8-tls \
  --set-string 'global.ingress.annotations.kubernetes\.io\/tls-acme=true' \
  --set global.identity.auth.publicIssuerUrl="https://$DOMAIN_NAME/auth/realms/camunda-platform" \
  --set global.identity.auth.operate.redirectUrl="https://$DOMAIN_NAME/operate" \
  --set global.identity.auth.tasklist.redirectUrl="https://$DOMAIN_NAME/tasklist" \
  --set global.identity.auth.optimize.redirectUrl="https://$DOMAIN_NAME/optimize" \
  --set identity.contextPath="/identity" \
  --set identity.fullURL="https://$DOMAIN_NAME/identity" \
  --set operate.contextPath="/operate" \
  --set tasklist.contextPath="/tasklist" \
  --set optimize.contextPath="/optimize" \
  --set zeebeGateway.ingress.grpc.enabled=true \
  --set zeebeGateway.ingress.grpc.host=zeebe.$DOMAIN_NAME \
  --set zeebeGateway.ingress.grpc.tls.enabled=true \
  --set zeebeGateway.ingress.grpc.tls.secretName=zeebe-c8-tls-grpc \
  --set-string 'zeebeGateway.ingress.grpc.annotations.kubernetes\.io\/tls-acme=true' \
  --set zeebeGateway.contextPath="/zeebe"
```

The annotation `kubernetes.io/tls-acme=true` is [interpreted by cert-manager](https://cert-manager.io/docs/usage/ingress/) and automatically results in the creation of the required certificate request, easing the setup.

  </TabItem>
  <TabItem value="without" label="Without Domain">

```shell
helm upgrade --install \
  camunda camunda-platform \
  --repo https://helm.camunda.io \
  --version $CAMUNDA_HELM_CHART_VERSION \
  --namespace camunda \
  --create-namespace \
  --set identityKeycloak.postgresql.enabled=false \
  --set identityKeycloak.externalDatabase.host=$DB_HOST \
  --set identityKeycloak.externalDatabase.user=$PG_USERNAME \
  --set identityKeycloak.externalDatabase.password=$PG_PASSWORD \
  --set identityKeycloak.externalDatabase.database=$DEFAULT_DB_NAME
```

  </TabItem>
</Tabs>

### Verify connectivity to Camunda 8

First, we need an OAuth client to be able to connect to the Camunda 8 cluster.

This can be done by following the [Identity getting started guide](/self-managed/identity/getting-started/install-identity.md) followed by the [incorporating applications documentation](/self-managed/identity/user-guide/additional-features/incorporate-applications.md).
Instead of creating a confidential application, a machine-to-machine (M2M) application is required to be created.
This reveals a `client-id` and `client-secret` that can be used to connect to the Camunda 8 cluster.

<Tabs groupId="c8-connectivity">
  <TabItem value="rest-api" label="REST API">

For a detailed guide on generating and using a token, please conduct the relevant documentation on [authenticating with the REST API](./../../../../../apis-tools/camunda-api-rest/camunda-api-rest-authentication.md?environment=self-managed).

<Tabs groupId="domain">
  <TabItem value="with" label="With Domain">

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

  <TabItem value="modeler" label="Modeler">

Follow our existing [Modeler guide on deploying a diagram](/self-managed/modeler/desktop-modeler/deploy-to-self-managed.md). Below are the helper values required to be filled in Modeler:

<Tabs groupId="domain">
  <TabItem value="with" label="With Domain">

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
