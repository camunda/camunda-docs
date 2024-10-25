---
id: troubleshoot-zeebe-connection
title: "Troubleshoot Zeebe connection issues"
sidebar_label: "Zeebe connection"
---

You try to connect (i.e., to deploy) to a remote Zeebe cluster and Web Modeler reports an error.

To resolve this issue, check if you can connect to Zeebe through another client/SDK or directly with the [Camunda 8 API](/apis-tools/camunda-api-rest/camunda-api-rest-overview.md).
If that doesn't work, resolve the general connection issue first (see [the platform deployment troubleshooting section](/self-managed/operational-guides/troubleshooting/troubleshooting.md), for example.)

If that works, further debug your Zeebe connection with the help of the information stated below. Enabling [debug logging in `modeler-restapi`](#how-can-i-debug-log-grpc--zeebe-communication) may also help to understand the issue.

## Zeebe connection times out

### Increase the Zeebe client timeout

Web Modeler uses the [Zeebe Java client](/apis-tools/java-client/index.md) to connect to Zeebe.
Depending on your infrastructure, the default timeouts configured may be too short.

You can pass custom timeouts in milliseconds for Web Modeler's Zeebe client to `modeler-restapi` via three individual environment variables:

```shell
ZEEBE_CLIENT_REQUESTTIMEOUT=30000 # limit the time to wait for a response from the Zeebe gateway
ZEEBE_AUTH_CONNECT_TIMEOUT=60000 # limit the time to wait for a connection to the OAuth server
ZEEBE_AUTH_READ_TIMEOUT=60000 # limits the time to wait for a response from the OAuth server
```

## Secure connection to Zeebe fails

If you provide a cluster URL starting with `https`, Web Modeler will try to establish a secure connection to
the Zeebe instance.
In the process, it strictly validates the server's Application-Layer Protocol Negotiation (ALPN) support and its certificates
presented against well-known certificate authorities.
Failure to connect may have several reasons:

### Configure the gateway to accept secure connections

Ensure you properly configure the remote cluster URL to accept secure connections.
Refer to the [Zeebe Gateway configuration documentation](/self-managed/zeebe-deployment/security/secure-client-communication.md#gateway)
for additional information.

### Configure the gateway to support ALPN

[Inspect the connection](#how-can-i-get-details-about-a-secure-remote-connection) to understand if ALPN is supported
by the server.

Secure connections to Zeebe require an Ingress controller that supports HTTP/2 over TLS with protocol negotiation via ALPN.
Ensure you properly [configured your Zeebe ingress to support ALPN](/self-managed/operational-guides/troubleshooting/troubleshooting.md#zeebe-ingress-grpc).

### Configure `modeler-restapi` to trust a custom Zeebe SSL certificate

[Inspect the connection](#how-can-i-get-details-about-a-secure-remote-connection) to understand which certificates are
being returned by the server and ensure you configure Web Modeler for [custom SSL certificates](#how-can-i-provide-a-custom-zeebe-ssl-certificate).

If intermediate signing authorities sign the server certificate, ensure the remote endpoint [serves both server and
intermediate certificates](https://nginx.org/en/docs/http/configuring_https_servers.html#chains) to Web Modeler.

### Make the OAuth token cache location writeable for the `modeler-restapi` process

When using the `OAuth` authentication method for deploying to Zeebe, Web Modeler caches OAuth tokens in a file-based
cache.
By default, the cache location is writeable by the `modeler-restapi` process.
If you run `modeler-restapi` as a non-root user (e.g. via Kubernetes' `securityContext.runAsUser` option),
you must ensure to provide a writeable cache file location to `modeler-restapi` via the `ZEEBE_CLIENT_CONFIG_PATH`
environment variable:

```shell
ZEEBE_CLIENT_CONFIG_PATH=/path/to/credentials/cache.txt
```

## How can I provide a custom Zeebe SSL certificate?

You configured a custom SSL certificate in your (remote) Zeebe deployment and want Web Modeler to accept that certificate.
Web Modeler strictly validates the remote server certificate trust chain.
If you use a custom SSL server certificate, you must make the signing CA certificate known to Web Modeler, not the
server certificate itself.

### Provide the certificate via an environment variable

`modeler-restapi` reads a trusted certificate from the environment variable `ZEEBE_CA_CERTIFICATE_PATH`.
This solution is recommended for most users:

```shell
ZEEBE_CA_CERTIFICATE_PATH=/path/to/certificate
```

The provided path has to be accessible from the `modeler-restapi` container (e.g. via a mounted volume).

### Provide the certificate to the JVM trust store

Alternatively, you may pass a custom trust store to `modeler-restapi` via the environment variable `JAVA_TOOL_OPTIONS`:

```shell
JAVA_TOOL_OPTIONS="-Djavax.net.ssl.trustStore=/path/to/truststore.jks -Djavax.net.ssl.trustStorePassword=changeit"
```

Analogous to above, the provided path has to be accessible from the `modeler-restapi` container (e.g. via a mounted volume).

:::caution
Be aware that passing a custom trust store via `JAVA_TOOL_OPTIONS` overrides the default JVM trust store.
This means that all certificates shipped by default with the Java runtime (e.g. the Amazon Trust Services CA for
connecting to a secured Aurora instance) are no longer trusted unless explicitly added.
:::

## How can I get details about a secure remote connection?

You can use the following command to retrieve information about HTTP/2 over TLS support (ALPN) and certificates provided
by a remote endpoint:

```shell
> openssl s_client -alpn h2 -connect google.com:443 -servername google.com
[...]
---
Certificate chain
 0 s:/CN=*.google.com
   i:/C=US/O=Google Trust Services LLC/CN=GTS CA 1C3
 1 s:/C=US/O=Google Trust Services LLC/CN=GTS CA 1C3
   i:/C=US/O=Google Trust Services LLC/CN=GTS Root R1
 2 s:/C=US/O=Google Trust Services LLC/CN=GTS Root R1
   i:/C=BE/O=GlobalSign nv-sa/OU=Root CA/CN=GlobalSign Root CA
---
[...]
---
New, TLSv1/SSLv3, Cipher is AEAD-CHACHA20-POLY1305-SHA256
Server public key is 256 bit
Secure Renegotiation IS NOT supported
Compression: NONE
Expansion: NONE
ALPN protocol: h2
SSL-Session:
    Protocol  : TLSv1.3
    Cipher    : AEAD-CHACHA20-POLY1305-SHA256
    Session-ID:
    Session-ID-ctx:
    Master-Key:
    Start Time: 1687516295
    Timeout   : 7200 (sec)
    Verify return code: 0 (ok)
---
```

## How can I debug log gRPC / Zeebe communication?

You can also start `modeler-restapi` with gRPC debug logging turned on to get detailed [logging
output](../configuration/logging.md) on communication to Zeebe:

```shell
LOGGING_LEVEL_IO_GRPC=TRACE
LOGGING_LEVEL_IO_CAMUNDA_MODELER=DEBUG
```
