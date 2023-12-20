---
id: common-problems
title: "Common problems"
sidebar_label: "Common problems"
---

## Problem: Identity is unable to connect to Keycloak

If you are seeing an error message such as this in your Identity service logs there is an issue with the connection
Identity is trying to make and the Keycloak service:

```
2022-07-04 15:52:04.250 ERROR 1 --- [main] i.c.i.i.k.config.KeycloakConfiguration   : Failure #1. Unable to connect to Keycloak.
```

This can be caused by:

1. The Keycloak service has not started/is not ready
2. Identity making requests from an external IP address

### Solution 1: The Keycloak service has not started/is not ready

The Keycloak service can take time to start due to the supporting systems.

Keycloak is ready to accept connections when the following log lines are visible:

```
15:24:24,094 INFO  [org.jboss.as] (Controller Boot Thread) WFLYSRV0025: Keycloak 16.1.1 (WildFly Core 18.0.4.Final) started in 33171ms - Started 718 of 1020 services (699 services are lazy, passive or on-demand)
15:24:24,098 INFO  [org.jboss.as] (Controller Boot Thread) WFLYSRV0060: Http management interface listening on http://127.0.0.1:9990/management
15:24:24,100 INFO  [org.jboss.as] (Controller Boot Thread) WFLYSRV0051: Admin console listening on http://127.0.0.1:9990
```

When the Keycloak service is ready for connections, please start (or restart) the Identity pod.

### Solution 2: Identity making requests from an external IP address

By default, Keycloak requires TLS on requests that originate from what it considers to be an external source. The Keycloak
documentation for [setting up SSL](https://www.keycloak.org/docs/19.0.3/server_installation/#_setting_up_ssl) maintains
a list of what they consider to be an external IP address under the `external requests` section.

The solution to this issue will depend largely on your environment, however as a starting point we would suggest you consider
these options:

1. Configure the communication between the services (for example in a cluster) to use IP ranges that fall within the
   ranges that Keycloak expects.
2. If configuring the IP ranges is not an option then it is possible to disable the SSL requirement in Keycloak itself.
   to achieve this:
   1. In the `master` realm set `Require SSL` to `none` by following the steps in [SSL modes](https://www.keycloak.org/docs/19.0.3/server_admin/#_ssl_modes)
   2. Restart the Identity service
   3. In the `camunda-platform` realm set `Require SSL` to `none` by following the steps in [SSL modes](https://www.keycloak.org/docs/19.0.3/server_admin/#_ssl_modes)
   4. Restart the Identity service again
   5. Identity should now start successfully

:::warning
We would only recommend that requirements for SSL are disabled in a development environment.
:::

## Problem: There is an issue in Keycloak where Identity crashloops

There currently exists a [known issue in Keycloak](https://github.com/keycloak/keycloak/issues/12484) where Identity experiences a crashloop. You may see something similar to the following:

```
2023-12-08 04:35:17,142 ERROR [org.keycloak.services.error.KeycloakErrorHandler] (executor-thread-39) Uncaught server error: java.lang.IllegalStateException: Duplicate key openid-connect%Client ID (attempted merging values org.keycloak.models.ProtocolMapperModel@aa0f0e69 and org.keycloak.models.ProtocolMapperModel@9d856c11)
    at java.base/java.util.stream.Collectors.duplicateKeyException(Collectors.java:135)
    at java.base/java.util.stream.Collectors.lambda$uniqKeysMapAccumulator$1(Collectors.java:182)
    at java.base/java.util.stream.ReduceOps$3ReducingSink.accept(ReduceOps.java:169)
    at java.base/java.util.stream.DistinctOps$1$2.accept(DistinctOps.java:174)
```

### Solution

As a workaround, take the following steps for **all** Camunda clients:

1. Log in to Keycloak as an administrator.
2. Go to the `camunda-platform` realm.
3. Click **Clients > Zeebe**.
4. Click **Client Scopes > zeebe-dedicated**.
5. You will likely see duplicates of `Client ID`, `Client IP Address`, and `Client Host`. Delete these until there is only one of each remaining.
6. Restart your Identity pod to ensure connection.
