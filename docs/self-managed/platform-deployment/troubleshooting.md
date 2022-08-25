---
id: troubleshooting
title: "Troubleshooting"
sidebar_label: "Troubleshooting"
---

## Keycloak requires SSL for requests from external sources

When deploying the Camunda Platform to a provider it is important to confirm that the IP ranges used
for container to container communication align with the IP ranges that Keycloak consider to be
"local". By default, Keycloak considers all IPs outside those listed in their
[external requests documentation](https://www.keycloak.org/docs/latest/server_installation/#_setting_up_ssl)
to be external and therefore require SSL.

As the [Camunda Platform Helm Charts](https://github.com/camunda/camunda-platform-helm) currently do
not provide support for the distribution of the Keycloak TLS key to the other containers,
for advice, we would recommend viewing the solution available in the
[Identity documentation](/docs/self-managed/identity/troubleshooting/common-problems#solution-2-identity-making-requests-from-an-external-ip-address).

## Identity redirect URL

If HTTP to HTTPS redirection is enabled in the Load-balancer or Ingress, make sure to use the HTTPS
protocol in the values file under `global.identity.auth.[COMPONENT].redirectUrl'.
Otherwise you will get a redirection error in Keycloak.

For example:

```
global:
  identity:
    auth:
    operate
      redirectUrl: https://operate.example.com
```
