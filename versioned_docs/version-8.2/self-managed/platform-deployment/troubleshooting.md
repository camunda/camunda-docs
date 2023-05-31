---
id: troubleshooting
title: "Troubleshooting"
sidebar_label: "Troubleshooting"
description: "Troubleshooting considerations in Platform deployment."
---

## Keycloak requires SSL for requests from external sources

When deploying the Camunda Platform to a provider, it is important to confirm the IP ranges used
for container to container communication align with the IP ranges Keycloak considers "local". By default, Keycloak considers all IPs outside those listed in their
[external requests documentation](https://www.keycloak.org/docs/19.0.3/server_installation/#_setting_up_ssl)
to be external and therefore require SSL.

As the [Camunda Platform Helm Charts](https://github.com/camunda/camunda-platform-helm) currently do
not provide support for the distribution of the Keycloak TLS key to the other containers, we recommend viewing the solution available in the
[Identity documentation](/docs/self-managed/identity/troubleshooting/common-problems#solution-2-identity-making-requests-from-an-external-ip-address).

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

Zeebe requires an Ingress controller that supports `gRPC` which is built on top of `HTTP/2` transport layer. Therefore, to expose Zeebe-Gateway externally, you need the following:

1. An Ingress controller that supports `gRPC` ([Ingress-NGINX controller](https://github.com/kubernetes/ingress-nginx) supports it out of the box).
2. TLS enabled (HTTPS) in the Zeebe-Gateway Ingress object.

However, according to the official Kubernetes documentation about [Ingress TLS](https://kubernetes.io/docs/concepts/services-networking/ingress/#tls):

> There is a gap between TLS features supported by various Ingress controllers. Please refer to documentation on nginx, GCE, or any other platform specific Ingress controller to understand how TLS works in your environment.

Therefore, if you are not using the [Ingress-NGINX controller](https://github.com/kubernetes/ingress-nginx), ensure you pay attention to TLS configuration of the Ingress controller of your choice. Find more details about the Zeebe Ingress setup in the [Kubernetes platforms supported by Camunda](./helm-kubernetes/platforms/platforms.md).
