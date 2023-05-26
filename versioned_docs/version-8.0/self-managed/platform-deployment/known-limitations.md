---
id: known-limitations
title: "Known limitations"
sidebar_label: "Known limitations"
---

## Keycloak requires SSL for requests from external sources

When deploying the Camunda stack to a provider it is important to confirm that the IP ranges used for container
to container communication align with the IP ranges that Keycloak consider to be "local". By default, Keycloak
considers all IPs outside those listed in their [external requests documentation](https://www.keycloak.org/docs/19.0.3/server_installation/#_setting_up_ssl)
to be external and therefore require SSL.

As the [Camunda Platform Helm Charts](https://github.com/camunda/camunda-platform-helm) currently do not provide support
for the distribution of the Keycloak TLS key to the other containers, we would recommend viewing the solution available in
the [Identity documentation](/docs/self-managed/identity/troubleshooting/common-problems#solution-2-identity-making-requests-from-an-external-ip-address)
for advice.
