---
id: platform-deployment
title: "Platform deployment"
---

## Connection issues between Identity and Keycloak

By default, Keycloak requires all non-local IP ranges to use SSL. It has been noted that in certain
cloud environments where communication between containers is performed using IPs outside the local range,
components are not able to function correctly.

To resolve this, we would suggest disabling the requirement for SSL connections by following the steps
in the [SSL modes](https://www.keycloak.org/docs/16.1/server_admin/#_ssl_modes) section of the Keycloak
docs and setting the `Require SSL` field value to `none` for both the `master` and `camunda-platform` realms.

Once updated, a container restart of both `Identity` and `Keycloak` is required for the settings to take
effect.
