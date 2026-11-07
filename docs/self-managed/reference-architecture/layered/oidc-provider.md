---
id: oidc-provider
title: "Deploy an OIDC provider for the management plane"
sidebar_label: "OIDC provider"
description: "Deploy an OIDC provider on Amazon ECS for Management Identity, Camunda Hub, and your Orchestration Clusters, and connect clusters to it."
---

The OIDC provider layer deploys an OIDC provider on Amazon ECS that Management Identity, Camunda Hub, and every Orchestration Cluster sign in against. Skip it if you run your own provider, such as Entra ID or Okta: describe it in the [identity layer](./identity.md) instead.

## Understand what the layer creates

The management plane is deployed once for all your Orchestration Clusters. It consists of the OIDC provider, [Management Identity](./management-identity.md), and [Camunda Hub](./camunda-hub.md). The provider imports one realm when it starts for the first time:

| Client                    | Created for                                   | Type                                            |
| ------------------------- | --------------------------------------------- | ----------------------------------------------- |
| `orchestration-<cluster>` | Each cluster in `clusters`                    | Confidential, browser login and service account |
| `connectors-<cluster>`    | Each cluster in `clusters`                    | Confidential, machine to machine                |
| `camunda-identity`        | Management Identity                           | Confidential                                    |
| `web-modeler`             | Camunda Hub, when `enable_camunda_hub` is set | Public, browser login with PKCE                 |

The realm also has one login user, `admin`, who administers the platform. The layer stores every secret in Secrets Manager and publishes the ARNs, never the values.

## Prepare the management plane

The management plane has its own layers, because it is shared by every cluster.

| Layer    | What is specific to the management plane                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Network  | The VPC of a cluster, or its own. Camunda Hub reaches each cluster over the network, so the VPCs must be routed to each other. |
| Compute  | `enable_management_plane = true` opens the ports of the three components.                                                      |
| Storage  | `databases` declares one database for each component. The provider uses `auth = password`.                                     |
| Exposure | The public hostname and the certificate: every login redirect is built from them. Use a hostname that you control.             |

Declare the databases in the storage layer:

```hcl
databases = {
  oidc_provider = {
    database_name = "oidc_provider"
    username      = "oidc_provider"
    auth          = "password"
  }
  management_identity = {
    database_name = "management_identity"
    username      = "management_identity"
  }
  camunda_hub = {
    database_name = "camunda_hub"
    username      = "camunda_hub"
  }
}
```

The storage layer creates the roles, generates the password of the provider's role, and publishes each database in its `databases` output. The components read their connection from there.

## Create the OIDC provider layer

1. List the Orchestration Clusters that sign in against the provider. Give each one the public URL that users reach it on:

   ```hcl
   prefix = "camunda-mgmt"

   clusters = {
     emea = { base_url = "https://emea.camunda.example.com" }
     apac = { base_url = "https://apac.camunda.example.com" }
   }

   enable_camunda_hub = true
   ```

   An empty `base_url` uses the public URL of the management plane, which is right when the cluster shares its load balancer.

1. Apply the layers of the management plane in order:

   ```bash
   PLAN=management ./procedure/compose.sh apply examples/management-plane
   ```

1. Read the password of the login user:

   ```bash
   terraform -chdir=terraform/oidc-provider output -raw admin_user_password
   ```

## Connect an Orchestration Cluster

1. Print the entry of the cluster:

   ```bash
   terraform -chdir=terraform/oidc-provider output -json clusters | jq '.emea'
   ```

1. Use it as `external_oidc` in the [identity layer](./identity.md) of that cluster, with `authentication_mode = "oidc"`. See `examples/management-plane/cluster/identity.tfvars`.
1. Apply the layers of the cluster. Its Camunda layer publishes `cluster_registration`, which you give to [Camunda Hub](./camunda-hub.md).

The realm is imported when the provider starts for the first time. To add a cluster later, register its two clients in the administration console of the provider with the values of the `clusters` output, the same way as for a provider that you run yourself.

## Use the layer outputs

| Output                | Used by                                                                                               |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| `clusters`            | The identity layer of each cluster, as `external_oidc`                                                |
| `management`          | Management Identity and Camunda Hub: the issuer, the administrator claim, their clients and audiences |
| `issuer_uri`          | The issuer of the tokens                                                                              |
| `admin_user_password` | You, to sign in as the administrator                                                                  |

## Troubleshoot the OIDC provider layer

### The OIDC provider connects with a password: declare its database with auth = password in the storage layer.

The database of the provider was declared with `auth = iam`, or the layer received another database. Set `auth = "password"` on `oidc_provider` in the `databases` of the storage layer.

### clusters needs at least one entry, named with lowercase letters, digits, and hyphens.

A cluster name contains other characters, or `clusters` is empty. The name becomes part of the client IDs. Use names such as `emea` or `prod-1`.

### database_name and username must be lowercase letters, digits, and underscores, starting with a letter: they are used in SQL statements.

A database in the storage layer has a name with other characters. Rename it.

## Next steps

- [Deploy Management Identity](./management-identity.md)
- [Deploy Camunda Hub](./camunda-hub.md)
