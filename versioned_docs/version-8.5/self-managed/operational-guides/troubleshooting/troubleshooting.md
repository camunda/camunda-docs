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

As the [Camunda Helm Charts](https://github.com/camunda/camunda-platform-helm) currently do
not provide support for the distribution of the Keycloak TLS key to the other containers, we recommend viewing the solution available in the
[Identity documentation](/docs/self-managed/identity/troubleshooting/troubleshoot-identity.md#solution-2-identity-making-requests-from-an-external-ip-address).

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

Camunda 8 Self-Managed can be accessed externally via different methods. One such method is the [combined Ingress setup](self-managed/setup/guides/ingress-setup.md#combined-ingress-setup). In that configuration, Camunda Identity is accessed using a specific path, configured by setting the `contextPath` variable, for example `https://camunda.example.com/identity`.

For security reasons, Camunda Identity requires secure access (HTTPS) when a `contextPath` is configured. If you want to use Camunda Identity with HTTP, use a [separate Ingress setup](self-managed/setup/guides/ingress-setup.md#separated-ingress-setup) (applications such as Operate, Optimize, etc, can still be accessed in a combined setup).

:::note
Due to limitations, the Identity `contextPath` approach is unavailable when using a browser in Incognito mode.
:::

## Web Modeler database schema

The Web Modeler `restapi` component requires a [database connection](/self-managed/modeler/web-modeler/configuration/configuration.md#database). This connection should not point to the same database as Keycloak does.

## Gateway timeout on redirect

A gateway timeout can occur if the headers of a response are too big (for example, if a JWT is returned as `Set-Cookie` header). To avoid this, you can increase the `proxy-buffer-size` of your Ingress controller or Ingress. The setting for **ingress-nginx** can be found [here](https://github.com/kubernetes/ingress-nginx/blob/main/docs/user-guide/nginx-configuration/annotations.md#proxy-buffer-size).

## Helm CLI version and installation failures

If you encounter errors during Helm chart installation, such as type mismatches or other template rendering issues, you may be using an outdated version of the Helm CLI. Helm's handling of data types and template syntax can vary significantly between versions. Ensure you use the Helm CLI version `3.13` or higher.

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

These scripts enable you to verify the connectivity and configuration of your Kubernetes cluster, including checks for deployment status, service availability, and ingress configuration.

#### Kubernetes permissions

When utilizing the anomaly detection scripts within a Kubernetes environment, ensure the user has specific permissions:

- **List pods**: Required for `kubectl get pods` to fetch pod details in the namespace.
- **Execute commands in pods**: Necessary for running commands inside pods via `kubectl exec`.
- **List services**: Needed for `kubectl get services` to retrieve service information.
- **List ingresses**: Required by `kubectl get ingress` to obtain ingress objects.
- **Get ingress details**: Necessary for `kubectl get ingress` to fetch ingress configurations.

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

The error message suggests adjusting the ingress configuration to include the required annotation. One can also explore the source of the script to have a better understanding of the reason for the failure.

:::note
Sometimes, some checks may not be applicable to your setup if it's custom (for example, with the previous example the ingress you use may not be [ingress-nginx](https://kubernetes.github.io/ingress-nginx/)).
:::