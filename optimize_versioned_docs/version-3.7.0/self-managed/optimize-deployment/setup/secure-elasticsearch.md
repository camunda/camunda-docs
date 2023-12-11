---
id: secure-elasticsearch
title: "Secure Elasticsearch"
description: "Secure your Elasticsearch instance so that the communication is encrypted and only authorized users have access to Elasticsearch."
---

<span class="badge badge--platform">Camunda Platform 7 only</span>

It is possible to connect Optimize to an Elasticsearch instance or cluster which is secured by the Elasticsearch extension X-Pack. Bear in mind that X-Pack is an enterprise feature of Elasticsearch and might require you to obtain a license before it can be used in a commercial context.

## Installing X-Pack

All the information about how to install X-Pack to secure Elasticsearch can be found in the [installing X-Pack in Elasticsearch guide](https://www.elastic.co/guide/en/elasticsearch/reference/6.2/installing-xpack-es.html#installing-xpack-es). Follow the steps 1 to 5.

## Securing Elasticsearch

To enable TLS for Elasticsearch communication once X-Pack is installed, follow these instructions: [Encrypting Communications in Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/6.2/configuring-tls.html).

Optimize v2.4.0+ communicates with Elasticsearch only via HTTP, the minimum encryption setup for HTTP client communications is described here: [Encrypting HTTP Client Communications](https://www.elastic.co/guide/en/elasticsearch/reference/6.2/configuring-tls.html#tls-http). However, if you operate an Elasticsearch cluster, it is recommended to encrypt the transport layer as well, see [Encrypting Communications Between Nodes in a Cluster](https://www.elastic.co/guide/en/elasticsearch/reference/6.2/configuring-tls.html#tls-transport).

Some comments on the guide:

- To secure Elasticsearch HTTP communication, you should have added at least the following settings to the Elasticsearch configuration file `elasticsearch.yml` in the config folder of your Elasticsearch distribution (adjust the values):

  ```
  xpack.security.http.ssl.enabled: true
  xpack.security.http.key: path/to/server.key
  xpack.security.http.certificate: path/to/server.crt
  xpack.security.http.certificate_authorities: path/to/ca.crt
  ```

- If you want to use hostname verification within your cluster, run the `certutil cert` command once for each of your nodes and provide the --name, --dns, and --ip options.
- If you used the `--dns` or `--ip` options with the certutil cert command and you want to enable strict hostname checking, set the [verification mode](https://www.elastic.co/guide/en/elasticsearch/reference/6.2/security-settings.html#ssl-tls-settings) to `full`. Otherwise, the verification mode needs to be set to `certificate`. The respective Elasticsearch setting is called `xpack.security.transport.ssl.verification_mode` and needs to be added to the `elasticsearch.yml` configuration file.
- It is recommended to set up a user just for Optimize which has only the necessary rights to execute queries in Elasticsearch. For instance, you could add an `optimize` user with the password `IloveOptimize` and give them `superuser` rights by executing the following command in the Elasticsearch root directory:

       ```
       ./bin/x-pack/users useradd optimize -p IloveOptimize -r superuser
       ```

:::note Warning!
Aalthough the `superuser` role does allow Optimize to communicate with the secured Elasticsearch instance, this role also grants full access to the cluster. A user with the superuser role can also manage users, roles and impersonate any other user in the system which is a security risk for your system.
See [Setting Up User Authentication](https://www.elastic.co/guide/en/x-pack/6.2/setting-up-authentication.html) for further details.
:::

## Enable Optimize to connect to the secured HTTP Elasticsearch instance

Now that you have configured your Elasticsearch instance, you need to set up the connection security settings accordingly
to allow Optimize to connect to the secured Elasticsearch instance via HTTPS.

All the necessary Optimize settings can be found in the [configuration guide](./configuration.md#elasticsearch-security).
