---
id: troubleshoot-identity
title: "Troubleshooting Management Identity"
sidebar_label: "Troubleshooting"
description: "Troubleshooting guide for Troubleshooting Management Identity, covering common issues, errors, and resolution strategies."
---

Troubleshoot common issues with Management Identity in a Self-Managed deployment.

## Management Identity pod crashloops/continually restarts

If the Management Identity pod crash loops, or the pod continually restarts, it is likely there is an issue with the Keycloak connection.

### Solution

1. Find the name of the Management Identity pod by running:

   ```
   kubectl get pods
   ```

   The output should look similar to:

   ```
   NAME                                      READY   STATUS    RESTARTS      AGE
   c8-local-identity-6fd96d59c4-8lzxv        1/1     Running   2 (24s ago)   85s
   c8-local-keycloak-0                       1/1     Running   0             30m
   c8-local-operate-69b765f7bb-hjcts         1/1     Running   0             30m
   c8-local-postgresql-0                     1/1     Running   0             30m
   c8-local-zeebe-0                          1/1     Running   0             30m
   c8-local-zeebe-gateway-678f4c7bfb-w8ght   1/1     Running   0             30m
   elasticsearch-master-0                    1/1     Running   0             30m
   ```

2. Using the pod name from the output above, view the logs:
   ```
   kubectl logs <POD_NAME>
   ```
3. Observe the most recent logs for an error message or stacktrace, for example:

   ```
   2022-07-04 15:52:04.250 ERROR 1 --- [main] i.c.i.i.k.config.KeycloakConfiguration   : Failure #1. Unable to connect to Keycloak.
   2022-07-04 15:52:09.252  WARN 1 --- [main] i.c.i.i.k.config.KeycloakConfiguration   : Retrying...
   ```

## Management Identity is unable to connect to Keycloak

If you are seeing an error message like the one below in your Management Identity service logs, there is an issue with the connection
Management Identity is trying to make and the Keycloak service:

```
2022-07-04 15:52:04.250 ERROR 1 --- [main] i.c.i.i.k.config.KeycloakConfiguration   : Failure #1. Unable to connect to Keycloak.
```

This can be caused by:

- The Keycloak service has not started/is not ready.
- Management Identity making requests from an external IP address.

See details on resolving these issues below.

### Solution 1: The Keycloak service has not started/is not ready

The Keycloak service can take time to start due to the supporting systems.

Keycloak is ready to accept connections when the following log lines are visible:

```
15:24:24,094 INFO  [org.jboss.as] (Controller Boot Thread) WFLYSRV0025: Keycloak 16.1.1 (WildFly Core 18.0.4.Final) started in 33171ms - Started 718 of 1020 services (699 services are lazy, passive or on-demand)
15:24:24,098 INFO  [org.jboss.as] (Controller Boot Thread) WFLYSRV0060: Http management interface listening on http://127.0.0.1:9990/management
15:24:24,100 INFO  [org.jboss.as] (Controller Boot Thread) WFLYSRV0051: Admin console listening on http://127.0.0.1:9990
```

When the Keycloak service is ready for connections, start (or restart) the Management Identity pod.

### Solution 2: Management Identity making requests from an external IP address

By default, Keycloak requires TLS on requests that originate from what it considers to be an external source. The Keycloak
documentation for [setting up SSL](https://www.keycloak.org/docs/latest/server_admin/#_ssl_modes) maintains
a list of what they consider to be an external IP address under the `external requests` section.

The solution to this issue depends largely on your environment. As a starting point, consider
these options:

- Configure communication between the services (for example in a cluster) to use IP ranges within the
  ranges Keycloak expects.

- If configuring IP ranges is not an option, you can disable the SSL requirement in Keycloak itself:
  1.  In the `master` realm, set `Require SSL` to `none` by following the steps in [SSL modes](https://www.keycloak.org/docs/latest/server_admin/#_ssl_modes) for your version of Keycloak.
  2.  Restart the Management Identity service.
  3.  In the `camunda-platform` realm, set `Require SSL` to `none` by following the steps in [SSL modes](https://www.keycloak.org/docs/latest/server_admin/#_ssl_modes) for your version of Keycloak.
  4.  Restart the Management Identity service again. Management Identity should now start successfully.

:::danger warning
Camunda would only recommend that requirements for SSL are disabled in a development environment.
:::
