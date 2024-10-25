---
id: secure-cluster-communication
title: "Secure cluster communication"
---

:::note

TLS between nodes in the same cluster is disabled by default.

:::

Zeebe supports transport layer security (TLS v1.3) between all nodes in a Zeebe cluster. This means it's possible to encrypt all TCP traffic between all nodes of a given cluster.

Enabling TLS for cluster communication is an all or nothing feature: either all nodes are configured to use TLS, or none are. It's not currently possible to only configure some nodes to enable TLS.

Additionally, a small portion of Zeebe traffic is done over UDP, which is left unencrypted. This is purely used for the nodes to gossip topology information amongst themselves, and no sensitive or user-given data is transmitted this way.

## Configuration

To enable TLS for cluster communication, provide a certificate chain and a private key.

Two mutually exclusive formats can be provided, and attempting to use both at the same time will result in an error.

### Keystore file

A keystore file can be provided. Currently, this only supports PKCS#12. Per the [RFC](https://datatracker.ietf.org/doc/html/rfc7292) it must:

- Not have more than **one** certificate-key entry in the file.
- Have the same password for the keystore and the key password of the only entry.

The certificate will remain the same as the PEM certificate approach, and it should be an x.509 public certificate. The private key must also be generated using PKCS#8.

### PEM certificate and keys

The certificate chain file is expected to be a PEM public certificate file, which should contain a x509 public certificate, and may additionally contain an entire certificate chain. If it does include the chain, it should simply be concatenated after the node's certificate.

For example, a simple certificate file with only a single certificate:

```
-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----
```

If you wanted to include its signing authority, for example, you would append the contents of the authority's public certificate to the end of the certificate chain file:

```
-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----
-----BEGIN TRUSTED CERTIFICATE-----
...
-----END TRUSTED CERTIFICATE-----
```

While each node uses the default Java trust store to verify incoming certificates (configurable via `javax.net.ssl.trustStore`), which by default uses the system's root certificates, it's recommended to include the complete certificate chain in the file. These will also be used by each node to verify the other nodes' certificates.

:::note
More specifically, the certificate chain will be part of the trust store of the node, and will be used to verify other node's certificates.
:::

This will allow you to configure each node with a different leaf certificate sharing the same root certificate (or at least an intermediate authority), as long as they're contained in the chain. If all nodes use the same certificate, or if you're certain the certificate is trusted by the root certificates available on each node, it's sufficient for the file to only contain the leaf certificate.

The private key file should be a PEM private key file, and should be the one during generation of the node's public certificate. Algorithms supported for the private keys are RSA, DSA, and EC. The private key must be generated using [PKCS8](https://datatracker.ietf.org/doc/html/rfc5208) or [PKCS #1](https://datatracker.ietf.org/doc/html/rfc2437); any other format will not work with Zeebe. If you're unsure what format your private key is, you can quickly run it through the `openssl` utility to convert it to PKCS8:

```shell
> openssl pkcs8 -topk8 -nocrypt -in my_private_key -out my_private_pkcs8_key.pem
```

Remove the `-nocrypt` parameter if your private key has a password. If your certificate is already in the right format, it will simply do nothing. See the [OpenSSL manpages](https://www.openssl.org/docs/man1.1.1/man1/openssl-pkcs8.html) for more options.

:::caution

Note that currently, Zeebe does not support password protected private keys. Since storing the certificates and private keys unencrypted on disk is a security risk, we recommend you use a secret management solution like Vault to inject your certificates in memory at runtime.

:::

## Broker

To configure secure communication for a broker, configure its `zeebe.broker.network.security` section, which looks like this:

```yaml
security:
  # Enables TLS authentication between this gateway and other nodes in the cluster
  # This setting can also be overridden using the environment variable ZEEBE_BROKER_NETWORK_SECURITY_ENABLED.
  enabled: false

  # Sets the path to the certificate chain file.
  # This setting can also be overridden using the environment variable ZEEBE_BROKER_NETWORK_SECURITY_CERTIFICATECHAINPATH.
  certificateChainPath:

  # Sets the path to the private key file location
  # This setting can also be overridden using the environment variable ZEEBE_BROKER_NETWORK_SECURITY_PRIVATEKEYPATH.
  privateKeyPath:

  # Configures the keystore file containing both the certificate chain and the private key.
  # Currently only supports PKCS#12 format.
  keyStore:
    # The path for the keystore file
    # This setting can also be overridden using the environment variable ZEEBE_BROKER_NETWORK_SECURITY_PKCS12_FILEPATH
    filePath:

    # Sets the password for the keystore file, if not set it is assumed there is no password
    # This setting can also be overridden using the environment variable ZEEBE_BROKER_NETWORK_SECURITY_PKCS12_PASSWORD
    password:
```

> The `certificateChainPath`, `privateKeyPath` and `keyStore.filePath` can be relative to your broker's working directory, or can be absolute paths.

## Gateway

To configure secure communication for a standalone gateway with the rest of the cluster, configure its `zeebe.gateway.cluster.security` section, which looks like this:

```yaml
security:
  # Enables TLS authentication between this gateway and other nodes in the cluster
  # This setting can also be overridden using the environment variable ZEEBE_GATEWAY_CLUSTER_SECURITY_ENABLED.
  enabled: false

  # Sets the path to the certificate chain file.
  # This setting can also be overridden using the environment variable ZEEBE_GATEWAY_CLUSTER_SECURITY_CERTIFICATECHAINPATH.
  certificateChainPath:

  # Sets the path to the private key file location
  # This setting can also be overridden using the environment variable ZEEBE_GATEWAY_CLUSTER_SECURITY_PRIVATEKEYPATH.
  privateKeyPath:

  # Configures the keystore file containing both the certificate chain and the private key.
  # Currently only supports PKCS#12 format.
  keyStore:
    # The path for the keystore file
    # This setting can also be overridden using the environment variable ZEEBE_GATEWAY_CLUSTER_SECURITY_PKCS12_FILEPATH
    filePath:

    # Sets the password for the keystore file, if not set it is assumed there is no password
    # This setting can also be overridden using the environment variable ZEEBE_GATEWAY_CLUSTER_SECURITY_PKCS12_PASSWORD
    password:
```

:::note

The `certificateChainPath`, `privateKeyPath`, and `keyStore.filePath` can be relative to the gateway's working directory, or can be absolute paths.

:::

## How it works

When enabled for each node, communication over TCP between these is securely encrypted using the provided certificates in a client-server model.

For example, let's take two nodes (`A` and `B`). When `A` (the client) sends a request to `B` (the server), they perform a TLS handshake, wherein `B`'s certificate is exchanged and verified by `A`. Afterwards, the request is encrypted such that only a node with `B`'s private key may decrypt it (i.e. in this instance, `B`).

When the roles are reversed (e.g. `B` sends a request to `A`), the same handshake occurs, but the other way around. As`B` is now the client, and `A` the server, `A`'s certificate is exchanged and verified by `B`. Afterwards, all communication is encrypted and can only be decrypted with `A`'s private key.

:::note

In this model, only the client verifies the identity of the server, as opposed to mTLS, in which both client and server exchange and verify one another's identities. If you need mTLS, it's currently recommended to explore a solution which provides this transparently like a service mesh (e.g. Linkerd or Istio).

:::

## Self signed certificates

If you wish to use self-signed certificates for testing or development purposes, the simplest way is to have all nodes share the same certificate. As aforementioned, the certificate chain configured on a node is also part of its trust store. As such, if all nodes share the same certificate, they will have no trouble verifying the identity of the other nodes.

You can still configure a different self-signed certificate for each node, _provided they can be verified by the other nodes' certificate chain_.

For example, let's say you have your own root certificate authority you use to sign your own certificates, and one certificate for each node that you signed with that authority. For each node, you can then create a certificate chain file which would consist of the node's public certificate, followed by the root certificate authority's public certificate. Though each node would have a different leaf certificate it uses to identify itself, the other nodes could verify its identity since their certificate chain contains an authority used to sign it.

### Testing & example

To generate your own self-signed certificates for testing, you must first create a certificate authority.

:::note
For this example, whenever you are asked for input, feel free to just press enter and leave the defaults there.
:::

```shell
openssl req -config <(printf "[req]\ndistinguished_name=dn\n[dn]\n[ext]\nbasicConstraints=CA:TRUE,pathlen:0") -new -newkey rsa:2048 -nodes -subj "/C=DE/O=Test/OU=Test/ST=BE/CN=cluster.local" -x509 -extensions ext -keyout ca.key -out ca.pem
```

Once we have our certificate authority, we can now generate certificates for each node. Let's say we have a cluster of three nodes, `A`, `B`, and `C`.

Take the following steps:

1. Generate a private key for each node:

```shell
openssl genpkey -out nodeA.key -algorithm RSA -pkeyopt rsa_keygen_bits:2048
openssl genpkey -out nodeB.key -algorithm RSA -pkeyopt rsa_keygen_bits:2048
openssl genpkey -out nodeC.key -algorithm RSA -pkeyopt rsa_keygen_bits:2048
```

:::note

Generating a private key using RSA and `openssl` will generate a PKCS8 private key by default.

:::

2. Create a certificate signing request (CSR) for each as well:

```shell
openssl req -new -key nodeA.key -out nodeA.csr
openssl req -new -key nodeB.key -out nodeB.csr
openssl req -new -key nodeC.key -out nodeC.csr
```

3. Create the final certificates for each node:

```shell
openssl x509 -req -days 365 -in nodeA.csr -CA ca.pem -CAkey ca.key -set_serial 01 -extfile <(printf "subjectAltName = IP.1:127.0.0.1") -out nodeA.pem
openssl x509 -req -days 365 -in nodeB.csr -CA ca.pem -CAkey ca.key -set_serial 01 -extfile <(printf "subjectAltName = IP.1:127.0.0.1") -out nodeB.pem
openssl x509 -req -days 365 -in nodeC.csr -CA ca.pem -CAkey ca.key -set_serial 01 -extfile <(printf "subjectAltName = IP.1:127.0.0.1") -out nodeC.pem
```

Make sure to replace `IP.1:127.0.0.1` with the advertised host of the broker. If it's an IP address, then keep the `IP.1` prefix. If it's a hostname/DNS entry, then you can write it out as `DNS.1:advertisedHost`. To be flexible, you can also use a wildcard host. For example, if you're deploying in Kubernetes, you could use `subjectAltName = DNS.1:*.cluster.local"`. You can also omit the whole `-extfile` parameter if you do not wish to use hostname verification at all.

4. Create the certificate chain so that each node is able to verify the identity of the others:

```shell
cat nodeA.pem ca.pem > chainNodeA.pem
cat nodeB.pem ca.pem > chainNodeB.pem
cat nodeC.pem ca.pem > chainNodeC.pem
```

5. You can now configure each node using its respective final `chainNode*.pem` file and `node*.key` file. For example, if node `A` was a broker:

```yaml
security:
  enabled: true
  certificateChainPath: chainNodeA.pem
  privateKeyPath: nodeA.key
```
