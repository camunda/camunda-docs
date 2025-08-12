---
id: webserver
title: "Webserver & security"
description: "This page covers the configuration settings related to the webserver and security components of the Camunda 8 Orchestration Cluster."
---

## Operate

Operate supports customizing the **context-path** using default Spring configuration.

Example for `application.yml`:
`server.servlet.context-path: /operate`

Example for environment variable:
`SERVER_SERVLET_CONTEXT_PATH=/operate`

The default context-path is `/`.

### Security

To change the values for http header for security reasons, you can use the configuration parameters:

| Name                                                                     | Description                                                                                                                                                  | Default value                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| camunda.operate.websecurity.contentSecurityPolicy                        | See [Spring description](https://docs.spring.io/spring-security/site/docs/5.2.0.RELEASE/reference/html/default-security-headers-2.html#webflux-headers-csp)  | base-uri 'self'; default-src 'self' 'unsafe-inline' 'unsafe-eval' cdn.jsdelivr.net;img-src \* data:; block-all-mixed-content; form-action 'self'; frame-ancestors 'none'; object-src 'none'; font-src 'self' fonts.camunda.io cdn.jsdelivr.net; sandbox allow-forms allow-scripts allow-same-origin allow-popups |
| camunda.operate.websecurity.httpStrictTransportSecurityMaxAgeInSeconds   | See [Spring description](https://docs.spring.io/spring-security/site/docs/5.2.0.RELEASE/reference/html/default-security-headers-2.html#webflux-headers-hsts) | 63,072,000 (two years)                                                                                                                                                                                                                                                                                           |
| camunda.operate.websecurity.httpStrictTransportSecurityIncludeSubDomains | See [Spring description](https://docs.spring.io/spring-security/site/docs/5.2.0.RELEASE/reference/html/default-security-headers-2.html#webflux-headers-hsts) | true                                                                                                                                                                                                                                                                                                             |

### Securing Operate - Zeebe interaction

While executing user operations, Operate communicates with Zeebe using the Zeebe Java client. For Zeebe to know whether operations are allowed to be executed
in terms of tenant assignment, Operate - Zeebe connection must be secured. Check the list of environment variables to be provided in the [Zeebe documentation](../../zeebe/security/client-authorization.md#environment-variables).

### Troubleshooting multi-tenancy in Operate

If users can view data from the `<default>` tenant only and no data from other tenants (and you have not [configured multi-tenancy using Helm](https://artifacthub.io/packages/helm/camunda/camunda-platform#global-parameters)), multi-tenancy is not enabled in Operate. Refer to the [multi-tenancy configuration guide](../../../../installation-methods/helm/configure/configure-multi-tenancy.md).

If multi-tenancy is enabled in Operate but disabled in [Identity](/self-managed/components/management-identity/what-is-identity.md), users will not have any tenant authorizations in Operate
and will not be able to access the data of any tenants in Operate.

## Tasklist

Tasklist supports customizing the **context-path** using the default Spring configuration.

Example for `application.yml`:
`server.servlet.context-path: /tasklist`

Example for environment variable:
`SERVER_SERVLET_CONTEXT_PATH=/tasklist`

Default context-path is `/`.
