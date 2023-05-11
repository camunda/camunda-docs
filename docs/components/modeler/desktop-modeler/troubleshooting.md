---
id: troubleshooting
title: Troubleshooting
description: "This page lists common issues with the Desktop Modeler and potential resolutions."
---

## How to start the modeler without plug-ins?

You can start the modeler with the [`--disable-plugins` flag](https://docs.camunda.io/docs/components/modeler/desktop-modeler/flags/#disable-plug-ins).

## How to obtain the Modeler logs?

Depending on your operating system, you can find the Modeler logs in different places:

#### Windows

```plain
%APPDATA%\Camunda Modeler\logs
```

#### Mac OS

```plain
~/Library/Logs/Camunda Modeler
```

#### Linux

```plain
~/.config/camunda-modeler/logs
```

To produce logging output, you can also run the modeler from the command line.

## I cannot connect to Zeebe

You try to connect (i.e., to deploy) to a remote Zeebe instance, and the modeler tells you "cannot find a running Zeebe".

To resolve this issue, check if you can connect to Zeebe through another client, i.e., [`zbctl`](https://docs.camunda.io/docs/apis-tools/cli-client/). If that works, [further debug your Zeebe connection](#debug-zeebe-connection-issues). If that does not work, resolve the [general connection issue](#resolve-a-general-zeebe-connection-issue) first.

## Resolve a general Zeebe connection issue

You try to connect to Zeebe from both Desktop Modeler _and_ [`zbctl`](https://docs.camunda.io/docs/apis-tools/cli-client/), and none of them works. General connection failures can have a couple of reasons.

#### The (remote) Zeebe instance is not reachable

Ensure your computer has access to the (remote) network.

#### The connection to Zeebe happens through a proxy

To be able to proxy Zebee traffic, a proxy (security proxy, ingress) must use [HTTP/2 transport and gRPC forwarding](https://docs.camunda.io/docs/self-managed/platform-deployment/troubleshooting/#zeebe-ingress-grpc).

## Debug Zeebe connection issues

You can connect to Zeebe via [`zbctl`](https://docs.camunda.io/docs/apis-tools/cli-client/) or another API client. However, connecting through the Desktop Modeler fails.

### Secure connection to Zeebe fails

When connecting securely to Camunda 8 SaaS, Camunda 8 self-managed, or a standalone Zeebe instance (via `https` endpoint URL), the Desktop Modeler tries to establish a secure connection. In the process, it strictly validates the server certificates presented against wellknown certificate authorities. Failure to connect may have several reasons.
 
#### The (remote) endpoint is not configured for secure connections

Ensure you properly configure the remote endpoint.

#### The (remote) endpoint presents an untrusted certificate

[Inspect the connection](#how-can-i-get-details-about-a-secure-remote-connection) to understand which certificates are being returned by the server.

Ensure you configure the modeler for [custom SSL certificates](#how-can-i-provide-a-custom-ssl-certificate).

If intermediate signing authorities sign the server certificate, ensure that the remote endpoint to [serves both server and intermediate certificates](https://nginx.org/en/docs/http/configuring_https_servers.html#chains) to the modeler.

## How can I provide a custom SSL certificate?

You configured a custom SSL certificate in your (remote) Zeebe endpoint and want the modeler to accept that certificate.

The app [strictly validates](https://docs.camunda.io/docs/next/components/modeler/desktop-modeler/flags/#zeebe-ssl-certificate) the remote server certificate trust chain. If you use a custom SSL server certificate, you must make the signing CA certificate known to the modeler, not the server certificate itself.

The modeler reads trusted certificate authorities from your operating systems trust store. Installing custom CA certificates in that trust store is recommended for most users. Alternatively, you may provide custom trusted CA certificates via the [`--zeebe-ssl-certificate` flag](https://docs.camunda.io/docs/next/components/modeler/desktop-modeler/flags/#zeebe-ssl-certificate).

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

## How can I debug log GRPC / Zeebe communication?

You can also start the modeler with GRPC logging turned on to get detailed [logging output](#how-to-obtain-the-modeler-logs) on communication to Zeebe:

```sh
GRPC_VERBOSITY=DEBUG GRPC_TRACE=all camunda-modeler
```
