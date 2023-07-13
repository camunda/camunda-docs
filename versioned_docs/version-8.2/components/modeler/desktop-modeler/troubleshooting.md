---
id: troubleshooting
title: Troubleshooting
description: "This page lists common issues with Desktop Modeler and potential resolutions."
---

## How to start Desktop Modeler without plugins

You can start Desktop Modeler with the [`--disable-plugins` flag](./flags/flags.md#disable-plug-ins).

## How to obtain Desktop Modeler logs

Depending on your operating system, you can find Desktop Modeler logs in different places:

### Windows

```plain
%APPDATA%\camunda-modeler\logs
```

### MacOS

```plain
~/Library/Logs/Camunda Modeler
```

### Linux

```plain
~/.config/camunda-modeler/logs
```

To produce logging output, you can also run Desktop Modeler from the command line.

## I cannot connect to Zeebe

You try to connect (i.e., to deploy) to a remote Zeebe instance, and Desktop Modeler tells you it "cannot find a running Zeebe."

To resolve this issue, check if you can connect to Zeebe through another client, i.e., [`zbctl`](../../../apis-tools/cli-client/index.md). If that works, [further debug your Zeebe connection](#debug-zeebe-connection-issues). If that does not work, resolve the [general connection issue](#resolve-a-general-zeebe-connection-issue) first.

## Resolve a general Zeebe connection issue

You try to connect to Zeebe from both Desktop Modeler _and_ [`zbctl`](../../../apis-tools/cli-client/index.md), and neither of them works. General connection failures can have a couple of reasons:

### The (remote) Zeebe instance is not reachable

Ensure your computer has access to the (remote) network.

### The connection to Zeebe happens through a proxy

To proxy Zeebe traffic, a proxy (security proxy, ingress) must use [HTTP/2 transport and gRPC forwarding](../../../self-managed/platform-deployment/troubleshooting.md#zeebe-ingress-grpc).

## Debug Zeebe connection issues

You can connect to Zeebe via [`zbctl`](../../../apis-tools/cli-client/index.md) or another API client. However, connecting through Desktop Modeler fails.

### Secure connection to Zeebe fails

When connecting securely to Camunda Platform 8 SaaS, Camunda Platform 8 Self-Managed, or a standalone Zeebe instance (via `https` endpoint URL), Desktop Modeler tries to establish a secure connection. In the process, it strictly validates the server certificates presented against well-known certificate authorities. Failure to connect may have several reasons:

#### The (remote) endpoint is not configured for secure connections

Ensure you properly configure the remote endpoint.

#### The (remote) endpoint presents an untrusted certificate

[Inspect the connection](#how-can-i-get-details-about-a-secure-remote-connection) to understand which certificates are being returned by the server.

Ensure you configure Desktop Modeler for [custom SSL certificates](#how-can-i-provide-a-custom-ssl-certificate).

If intermediate signing authorities sign the server certificate, ensure the remote endpoint [serves both server and intermediate certificates](https://nginx.org/en/docs/http/configuring_https_servers.html#chains) to Desktop Modeler.

## How can I provide a custom SSL certificate?

You configured a custom SSL certificate in your (remote) Zeebe endpoint and want Desktop Modeler to accept that certificate.

The app [strictly validates](./flags/flags.md#zeebe-ssl-certificate) the remote server certificate trust chain. If you use a custom SSL server certificate, you must make the signing CA certificate known to Desktop Modeler, not the server certificate itself.

Desktop Modeler reads trusted certificate authorities from your operating systems trust store. Installing custom CA certificates in that trust store is recommended for most users. Alternatively, you may provide custom trusted CA certificates via the [`--zeebe-ssl-certificate` flag](./flags/flags.md#zeebe-ssl-certificate).

## How can I get details about a secure remote connection?

You can use the following command to retrieve information about certificates provided by a remote endpoint:

```sh
> openssl s_client -connect google.com:443
...
Certificate chain
 0 s:CN = *.google.com
   i:C = US, O = Google Trust Services LLC, CN = GTS CA 1C3
   a:PKEY: id-ecPublicKey, 256 (bit); sigalg: RSA-SHA256
   v:NotBefore: Apr 17 08:16:32 2023 GMT; NotAfter: Jul 10 08:16:31 2023 GMT
 1 s:C = US, O = Google Trust Services LLC, CN = GTS CA 1C3
   i:C = US, O = Google Trust Services LLC, CN = GTS Root R1
   a:PKEY: rsaEncryption, 2048 (bit); sigalg: RSA-SHA256
   v:NotBefore: Aug 13 00:00:42 2020 GMT; NotAfter: Sep 30 00:00:42 2027 GMT
 2 s:C = US, O = Google Trust Services LLC, CN = GTS Root R1
   i:C = BE, O = GlobalSign nv-sa, OU = Root CA, CN = GlobalSign Root CA
   a:PKEY: rsaEncryption, 4096 (bit); sigalg: RSA-SHA256
   v:NotBefore: Jun 19 00:00:42 2020 GMT; NotAfter: Jan 28 00:00:42 2028 GMT
...
```

## How can I debug log gRPC / Zeebe communication?

You can also start Desktop Modeler with gRPC logging turned on to get detailed [logging output](#how-to-obtain-desktop-modeler-logs) on communication to Zeebe:

```sh
DEBUG=* ZEEBE_NODE_LOG_LEVEL=DEBUG GRPC_VERBOSITY=DEBUG GRPC_TRACE=all camunda-modeler
```

## Other questions?

Head over to the [Modeler category on the forum](https://forum.camunda.io/c/modeler/6) to receive help from the community.
