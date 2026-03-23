---
id: http-proxy-configuration
title: HTTP proxy configuration
sidebar_label: HTTP proxy configuration
description: Configure HTTP proxy settings for Camunda connectors in Self-Managed environments.
---

In Self-Managed environments, you can configure connectors to route HTTP requests through a proxy server.

Two configuration methods are available:

| Configuration type                                                                        | Scope                                                                                                                                                  | Example                                                                                                                                                                            |
| :---------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [JVM properties](https://docs.oracle.com/javase/8/docs/technotes/guides/net/proxies.html) | JVM, **the whole runtime** will be affected. **Any HTTP client** used internally (for example, in a connector, or the Zeebe client) might be affected. | `-Dhttp.proxyHost=proxy -Dhttp.proxyPort=3128 -Dhttps.proxyHost=proxy -Dhttps.proxyPort=3128 -Dhttp.nonProxyHosts=OTHER_DOMAIN`                                                    |
| Environment variables                                                                     | Connector-scoped, **only supported connectors** such as the REST connector will be affected                                                            | `CONNECTOR_HTTP_PROXY_HOST=proxy; CONNECTOR_HTTP_PROXY_PORT=3128; CONNECTOR_HTTPS_PROXY_HOST=proxy; CONNECTOR_HTTPS_PROXY_PORT=3128; CONNECTOR_HTTP_NON_PROXY_HOSTS=OTHER_DOMAIN;` |

## HTTP/HTTPS properties

Depending on the **target URL**, you can set the proxy as an HTTP or HTTPS protocol handler. A target URL such as `http://example.com` will use the HTTP protocol handler, while a target URL such as `https://example.com` will use the HTTPS protocol handler.

### JVM properties

You can set the following standard JVM properties for HTTP and HTTPS:

| Property (HTTP target URL) | Property (HTTPS target URL) | Description                        |
| :------------------------- | :-------------------------- | :--------------------------------- |
| `http.proxyHost`           | `https.proxyHost`           | The host name of the proxy server. |
| `http.proxyPort`           | `https.proxyPort`           | The port number (default is 80).   |

Some HTTP clients might offer more properties to configure the proxy. For example, the [Apache HTTP client](https://hc.apache.org/httpcomponents-client-5.6.x/current/httpclient5/apidocs/org/apache/hc/client5/http/impl/classic/HttpClientBuilder.html) used in the REST connector offers the following properties:

| Property (HTTP target URL) | Property (HTTPS target URL) | Description                                       |
| :------------------------- | :-------------------------- | :------------------------------------------------ |
| `http.proxyUser`           | `https.proxyUser`           | _(optional)_ The username to log in to the proxy. |
| `http.proxyPassword`       | `https.proxyPassword`       | _(optional)_ The password to log in to the proxy. |

The `http.nonProxyHosts` property applies to both HTTP and HTTPS target URLs:

| Property             | Description                                                                                                                                                                                                                                                                                                                     |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `http.nonProxyHosts` | <p> _(optional)_ A list of hosts to connect to directly, bypassing the proxy.</p><p><ul><li>Specify as a list of patterns, separated by <code>\|</code>.</li><li>Patterns can start or end with a `*` for wildcards.</li><li>Any host matching one of these patterns uses a direct connection instead of a proxy.</li></ul></p> |

:::note
To ensure Camunda can properly access Camunda components when using JVM properties, non-proxy hosts must contain `camunda-platform-zeebe|camunda-platform-keycloak`.
:::

### Environment variables

As an alternative to using JVM properties, the proxy settings can also be set with environment variables:

| Variable (HTTP target URL)      | Variable (HTTPS target URL)      | Description                                                                                                                            |
| :------------------------------ | :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `CONNECTOR_HTTP_PROXY_HOST`     | `CONNECTOR_HTTPS_PROXY_HOST`     | The host name of the proxy server.                                                                                                     |
| `CONNECTOR_HTTP_PROXY_PORT`     | `CONNECTOR_HTTPS_PROXY_PORT`     | The port number (default is 80).                                                                                                       |
| `CONNECTOR_HTTP_PROXY_USER`     | `CONNECTOR_HTTPS_PROXY_USER`     | _(optional)_ The username to log in to the proxy.                                                                                      |
| `CONNECTOR_HTTP_PROXY_PASSWORD` | `CONNECTOR_HTTPS_PROXY_PASSWORD` | _(optional)_ The password to log in to the proxy.                                                                                      |
| `CONNECTOR_HTTP_PROXY_SCHEME`   | `CONNECTOR_HTTPS_PROXY_SCHEME`   | _(optional)_ The scheme of the proxy server. This allows you to use the `https` protocol to contact your proxy. The default is `http`. |

The `CONNECTOR_HTTP_NON_PROXY_HOSTS` variable applies to both HTTP and HTTPS target URLs:

| Variable                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CONNECTOR_HTTP_NON_PROXY_HOSTS` | <p> _(optional)_ A list of hosts to connect to directly, bypassing the proxy.</p><p><ul><li>Specify as a list of patterns, separated by <code>\|</code>.</li><li>Patterns can start or end with a `*` for wildcards.</li><li>Any host matching one of these patterns uses a direct connection instead of a proxy.</li></ul>Connectors will also use the exception list provided by the `http.nonProxyHosts` JVM property if existing.</p> |

### Plain proxy variables

The standard proxy variables support configuring a TLS-based proxy (running under `https://`) via the `SCHEME` variable. However, some connector integrations use HTTP clients (such as the JDK HttpClient) that do not support TLS-based proxy connections. For these connectors, an alternative set of **plain proxy variables** is available.

When both plain and standard variables are configured, the **plain variables take priority**. If the plain variables are not set, the connector falls back to the standard variables.

| Variable (HTTP target URL)            | Variable (HTTPS target URL)            | Description                                                         |
| :------------------------------------ | :------------------------------------- | :------------------------------------------------------------------ |
| `CONNECTOR_HTTP_PLAIN_PROXY_HOST`     | `CONNECTOR_HTTPS_PLAIN_PROXY_HOST`     | The host name of the proxy server.                                  |
| `CONNECTOR_HTTP_PLAIN_PROXY_PORT`     | `CONNECTOR_HTTPS_PLAIN_PROXY_PORT`     | The port number (default is 80).                                    |
| `CONNECTOR_HTTP_PLAIN_PROXY_USER`     | `CONNECTOR_HTTPS_PLAIN_PROXY_USER`     | _(optional)_ The username to log in to the proxy.                   |
| `CONNECTOR_HTTP_PLAIN_PROXY_PASSWORD` | `CONNECTOR_HTTPS_PLAIN_PROXY_PASSWORD` | _(optional)_ The password to log in to the proxy.                   |
| `CONNECTOR_HTTP_PLAIN_PROXY_SCHEME`   | `CONNECTOR_HTTPS_PLAIN_PROXY_SCHEME`   | _(optional)_ The scheme of the proxy server. The default is `http`. |

:::note
There is no plain variant of `NON_PROXY_HOSTS`. The standard `CONNECTOR_HTTP_NON_PROXY_HOSTS` variable applies to both standard and plain proxy configurations.
:::

The following connectors support plain proxy variables:

- [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md)
- [MCP Client connector](/components/connectors/out-of-the-box-connectors/agentic-ai-mcp-client.md)
- [A2A Client connector](/components/early-access/alpha/a2a-client/a2a-client.md)
- [Vector database connector](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md)

Not all providers within each connector support proxy configuration. Refer to the individual connector documentation for details on unsupported providers.

The [REST connector](/components/connectors/protocol/rest.md) and the core SDK HTTP client use only the standard proxy variables.

## How proxy configuration works

The process consists of two main steps: configuration and request handling.

### Set your configuration

First, define how the proxy should behave.
These are the available configuration options:

- Enable or disable proxying.
- Define which URLs should skip the proxy, listed as `nonProxyHosts`.
- Define which URLs require authentication.

### Handle requests

When a connector makes an HTTP request, it's handled according to your previously set configuration:

1. Check if the proxy is enabled:
   1. Yes: Proceed with proxying.
   1. No: Do not proxy; the request is handled directly.
1. Check if the host is listed in `nonProxyHosts`:
   1. Yes: Do not proxy; the request bypasses the proxy.
   1. No: Proceed with proxying.
1. Check if the proxy requires authentication:
   1. Yes: The request is proxied only if authentication succeeds; otherwise, it returns an authentication error.
   1. No: The request is proxied normally.
