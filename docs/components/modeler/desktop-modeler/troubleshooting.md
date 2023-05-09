---
id: troubleshooting
title: Fix common issues with the Desktop Modeler
description: "This page lists common issues with the Desktop Modeler and potential resolutions."
---

## How to start the Modeler without plug-ins?

You can start the modeler with the [`--disable-plugins` flag](https://docs.camunda.io/docs/components/modeler/desktop-modeler/flags/#disable-plug-ins).

## How to obtain the Modeler logs?

Depending on your operating system you can find the Modeler logs in different places:

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

## I cannot connect to Zeebe

> I try to connect to deploy to a remote Zeebe instance and the modeler tells me "cannot find a running Zeebe".

Check if you can connect to Zeebe through another client, i.e. [`zbctl`](https://docs.camunda.io/docs/apis-tools/cli-client/). If that works [further debug your Zeebe connection](#debug-zeebe-connection-issues), if not try to resolve that [general connection issue](#resolve-general-zeebe-connection-issue).

## Resolve general Zeebe connection issue

> I'm trying to connect to Zeebe from both Desktop modeler _and_ [`zbctl`](https://docs.camunda.io/docs/apis-tools/cli-client/) to a running Zeebe cluster and non of them works.

This can have multiple reasons:

- The remote endpoint is not reachable
- The connection is passed through a proxy :arrow_right: Ensure the proxy supports [HTTP/2 transport forwarding for GRPC](https://docs.camunda.io/docs/self-managed/platform-deployment/troubleshooting/#zeebe-ingress-grpc)

## Debug Zeebe connection issues

> I resolved [general connection issues](#resolve-general-zeebe-connection-issue) and can connect to Zeebe via [`zbctl`](https://docs.camunda.io/docs/apis-tools/cli-client/). However connecting throught the Desktop Modeler fails.

### Secure connection to Zeebe fails

When connecting securely (i.e. to Camunda 8 self-managed via `https` endpoint URL) the Desktop Modeler tries to establish a TLS connection. In the process it strictly validates server certificates presented. Failure to connect may have two reasons:

- Remote endpoint is not configured for secure connections.
- Remote endpoint presents a certificate that is not trusted by the app :arrow_right: [Configure modeler to use a custom CA certificate](#how-can-i-provide-my-custom-certificate).
- Custom CA certificate is [configured with modeler](#how-can-i-provide-my-custom-certificate) and connection still fails to establish :arrow_right: If you use intermediate certificates, configure the remote endpoint to [serve both server and intermediate certificates](https://nginx.org/en/docs/http/configuring_https_servers.html#chains) to the modeler.

You can debug the remote secured connections using `openssl`:

```sh
> openssl s_client -connect google.com:443
CONNECTED(00000003)
depth=2 C = US, O = Google Trust Services LLC, CN = GTS Root R1
verify return:1
depth=1 C = US, O = Google Trust Services LLC, CN = GTS CA 1C3
verify return:1
depth=0 CN = *.google.com
verify return:1
---
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

### Insecure connection to Zeebe fails

Ensure you [properly configured any intermediary](https://docs.camunda.io/docs/next/self-managed/platform-deployment/troubleshooting) (proxy, ingress, VPN).

## How can I provide my custom certificate?

> I'm using a custom SSL certificate / certificate authority with the Desktop Modeler.

The modeler reads root certificates from your operating systems trust store. Installing it there is recommended.

Alternatively you may provide custom trusted certificates via the [`--zeebe-ssl-certificate` flag](https://docs.camunda.io/docs/next/components/modeler/desktop-modeler/flags/#zeebe-ssl-certificate).

Note that the modeler [strictly validates](https://docs.camunda.io/docs/next/components/modeler/desktop-modeler/flags/#zeebe-ssl-certificate) the remote server certificate certificate trust chain.
