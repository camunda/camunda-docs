---
id: troubleshooting
title: "Troubleshooting"
sidebar_label: "Troubleshooting"
description: "Troubleshooting considerations in Platform deployment."
---

## Keycloak requires SSL for requests from external sources

When deploying Camunda to a provider, it is important to confirm the IP ranges used
for container to container communication align with the IP ranges Keycloak considers "local". By default, Keycloak considers all IPs outside those listed in their
[external requests documentation](https://www.keycloak.org/docs/latest/server_admin/#_ssl_modes)
to be external and therefore require SSL.

As the [Camunda Helm Charts](hhttps://artifacthub.io/packages/helm/camunda/camunda-platform) currently do
not provide support for the distribution of the Keycloak TLS key to the other containers, we recommend viewing the solution available in the
[Identity documentation](/self-managed/identity/troubleshooting/troubleshoot-identity.md#solution-2-identity-making-requests-from-an-external-ip-address).

## Identity redirect URL

If HTTP to HTTPS redirection is enabled in the load-balancer or ingress, make sure to use the HTTPS
protocol in the values file under `global.identity.auth.[COMPONENT].redirectUrl`.
Otherwise, you will get a redirection error in Keycloak.

For example:

```
global:
  identity:
    auth:
    operate
      redirectUrl: https://operate.example.com
```

## Zeebe Ingress (gRPC)

Zeebe requires an Ingress controller that supports `gRPC` which is built on top of `HTTP/2` transport layer. Therefore, to expose Zeebe Gateway externally, you need the following:

1. An Ingress controller that supports `gRPC` ([ingress-nginx controller](https://github.com/kubernetes/ingress-nginx) supports it out of the box).
2. TLS (HTTPS) via [Application-Layer Protocol Negotiation (ALPN)](https://www.rfc-editor.org/rfc/rfc7301.html) enabled in the Zeebe Gateway Ingress object.

However, according to the official Kubernetes documentation about [Ingress TLS](https://kubernetes.io/docs/concepts/services-networking/ingress/#tls):

> There is a gap between TLS features supported by various Ingress controllers. Please refer to documentation on nginx, GCE, or any other platform specific Ingress controller to understand how TLS works in your environment.

Therefore, if you are not using the [ingress-nginx controller](https://github.com/kubernetes/ingress-nginx), ensure you pay attention to TLS configuration of the Ingress controller of your choice. Find more details about the Zeebe Ingress setup in the [Kubernetes platforms supported by Camunda](/self-managed/setup/install.md).

## Identity `contextPath`

Camunda 8 Self-Managed can be accessed externally via the [combined Ingress setup](self-managed/setup/guides/ingress-setup.md#combined-ingress-setup). In that configuration, Camunda Identity is accessed using a specific path, configured by setting the `contextPath` variable, for example `https://camunda.example.com/identity`.

For security reasons, Camunda Identity requires secure access (HTTPS) when a `contextPath` is configured.

:::note
Due to limitations, the Identity `contextPath` approach is unavailable when using a browser in Incognito mode.
:::

## Web Modeler database schema

The Web Modeler `restapi` component requires a [database connection](/self-managed/modeler/web-modeler/configuration/configuration.md#database). This connection should not point to the same database as Keycloak does.

## Gateway timeout on redirect

A gateway timeout can occur if the headers of a response are too big (for example, if a JWT is returned as `Set-Cookie` header). To avoid this, you can increase the `proxy-buffer-size` of your Ingress controller or Ingress. The setting for **ingress-nginx** can be found [here](https://github.com/kubernetes/ingress-nginx/blob/main/docs/user-guide/nginx-configuration/annotations.md#proxy-buffer-size).

## Helm CLI version and installation failures

If you encounter errors during Helm chart installation, such as type mismatches or other template rendering issues, you may be using an outdated version of the Helm CLI. Helm's handling of data types and template syntax can vary significantly between versions. Ensure you use the Helm CLI version `3.13` or higher.

## DNS disruption issue for Zeebe in Kubernetes clusters (1.29-1.31)

Kubernetes clusters running versions 1.29 to 1.31 may experience DNS disruptions during complete node restarts, such as during upgrades or evictions, particularly if the cluster's DNS resolver pods are affected.

This issue is specifically noticeable for Zeebe (Netty), as it will no longer be able to form a cluster because of improper DNS responses. This occurs because Zeebe continues to communicate with a non-existent DNS resolver, caused by improper cleanup of conntrack entries for UDP connections.

Details on this issue can be found in [this Kubernetes issue](https://github.com/kubernetes/kubernetes/issues/125467) and has been resolved in the following patch releases:

- Kubernetes 1.29.10
- Kubernetes 1.30.6
- Kubernetes 1.31.2

Kubernetes versions 1.32 and versions before 1.29 are not affected.

If an immediate cluster upgrade to a fixed version is not possible, the following temporary workarounds can be applied if you encounter DNS issues:

- Restart the `kube-proxy` pod(s)
- Delete the affected Zeebe pod

## Anomaly detection scripts

The [c8-sm-checks](https://github.com/camunda/c8-sm-checks) project introduces a set of scripts to aid detection of Camunda deployment anomalies.

These scripts perform health checks on various aspects of the Kubernetes installation and Zeebe components, providing insights into potential issues that may affect the performance or stability.

### Usage

Each script in the `c8-sm-checks` project can be executed independently, allowing you to target specific areas for troubleshooting and verification.

To utilize these scripts effectively, ensure you have the necessary permissions and access to your Kubernetes cluster. Additionally, make sure you have the required dependencies installed on your system, such as `kubectl`, `helm`, `curl`, and `grpcurl`.

For detailed documentation and usage instructions for each script, refer to the [c8-sm-checks GitHub repository](https://github.com/camunda/c8-sm-checks).
Additionally, you can use the `-h` option with each script to display help information directly from the command line.

Before using it, clone the `c8-sm-checks` repository to your local environment by running the following command:

```bash
git clone https://github.com/camunda/c8-sm-checks.git
cd c8-sm-checks
```

### Kubernetes connectivity scripts

These scripts enable you to verify the connectivity and configuration of your Kubernetes cluster, including checks for deployment status, service availability, and Ingress configuration.

#### Kubernetes permissions

When utilizing the anomaly detection scripts within a Kubernetes environment, ensure the user has specific permissions:

- **List pods**: Required for `kubectl get pods` to fetch pod details in the namespace.
- **Execute commands in pods**: Necessary for running commands inside pods via `kubectl exec`.
- **List services**: Needed for `kubectl get services` to retrieve service information.
- **List ingresses**: Required by `kubectl get ingress` to obtain Ingress objects.
- **Get Ingress details**: Necessary for `kubectl get ingress` to fetch Ingress configurations.

#### Deployment check (`./checks/kube/deployment.sh`)

This script checks the status of a Helm deployment in the specified namespace, ensuring that all required containers are present and ready. You can customize the list of containers to check based on your deployment topology.

```bash
./checks/kube/deployment.sh -n camunda-primary -d camunda -c "zeebe,zeebe-gateway,web-modeler"
```

#### Connectivity check (`./checks/kube/connectivity.sh`)

This script verifies Kubernetes connectivity and associated configuration, checking for the presence of services and ingresses that conform to the required specifications.

```bash
./checks/kube/connectivity.sh -n camunda-primary
```

### Zeebe connectivity scripts

These scripts focus on verifying the connectivity and health of Zeebe components within your deployment. You can check token generation, gRPC connectivity, and other essential aspects of your Zeebe setup.

#### gRPC Zeebe check (`./checks/zeebe/connectivity.sh`)

This script verifies connectivity to a Zeebe instance using HTTP/2 and gRPC protocols, providing insights into the health and status of your Zeebe deployment.

```bash
./checks/zeebe/connectivity.sh -a https://local.distro.example.com/auth/realms/camunda-platform/protocol/openid-connect/token -i myclientid -s 0Rn28VrQxGNxowrCWe6wbujwFghO4990 -u zeebe.distro.example.com -H zeebe.local.distro.example.com:443
```

Find more information on [how to register your application on Identity](https://github.com/camunda-community-hub/camunda-8-examples/blob/main/payment-example-process-application/kube/README.md#4-generating-an-m2m-token-for-our-application).

### IRSA configuration check

The AWS EKS IRSA configuration scripts are focused on verifying the correct setup of IAM Roles for Service Accounts (IRSA) within your Kubernetes deployment on AWS. These scripts ensure that your Kubernetes service accounts are correctly associated with IAM roles, allowing components like PostgreSQL, OpenSearch, and others in your deployment to securely interact with AWS resources.

For detailed usage instructions and setup information, please refer to the [IRSA guide](/self-managed/setup/deploy/amazon/amazon-eks/irsa.md#irsa-check-script).

### Interpretation of the results

Each script produces an output indicating the status of individual checks, which can be either `[OK]`, which signals a healthy status, or `[FAIL]`, which signals an unhealthy status.

While the scripts continue execution even if a check fails, it may be necessary to review the logs to identify the failed element.

At the end of each script, a global check status is provided, indicating whether any tests failed and the corresponding error code. For example:

```
[FAIL] ./checks/zeebe/connectivity.sh: At least one of the tests failed (error code: 5).
```

### Handling errors

If a check fails, it indicates a deviation from the expected configuration on a normal setup. Resolving the error involves studying the failed check and applying the best practices outlined in the documentation (use the search feature to find the associated recommendation for a failed check).

For example:

```
[FAIL] None of the ingresses contain the annotation nginx.ingress.kubernetes.io/backend-protocol: GRPC, which is required for Zeebe ingress.
```

The error message suggests adjusting the Ingress configuration to include the required annotation. One can also explore the source of the script to have a better understanding of the reason for the failure.

:::note
Sometimes, some checks may not be applicable to your setup if it's custom (for example, with the previous example the Ingress you use may not be [ingress-nginx](https://kubernetes.github.io/ingress-nginx/)).
:::
