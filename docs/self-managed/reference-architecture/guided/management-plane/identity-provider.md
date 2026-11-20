---
id: identity-provider
title: "Identity provider"
sidebar_label: "Identity provider"
description: "Deploy an OIDC identity provider on Amazon ECS for Management Identity, Camunda Hub, and your Orchestration Clusters, and connect clusters to it."
---

The identity provider step deploys an OIDC provider on Amazon ECS that Management Identity, Camunda Hub, and every Orchestration Cluster sign in against. Skip it if you run your own provider, such as Entra ID or Okta: describe it in the [identity step of the Orchestration Cluster](../orchestration-cluster/identity.md) instead.

## Understand what the stage creates

The provider is shared by the [management plane](./overview.md) and by all your Orchestration Clusters, so you deploy it once. It imports one realm when it starts for the first time:

| Client                    | Created for                                   | Type                                            |
| ------------------------- | --------------------------------------------- | ----------------------------------------------- |
| `orchestration-<cluster>` | Each cluster in `clusters`                    | Confidential, browser login and service account |
| `connectors-<cluster>`    | Each cluster in `clusters`                    | Confidential, machine to machine                |
| `camunda-identity`        | Management Identity                           | Confidential                                    |
| `web-modeler`             | Camunda Hub, when `enable_camunda_hub` is set | Public, browser login with PKCE                 |

The realm also has one login user, `admin`, who administers the platform. The stage stores every secret in Secrets Manager and publishes the ARNs, never the values.

## Create the identity provider stage

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

1. Apply the stages of the management plane in order:

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

1. Use it as `external_oidc` in the [identity stage](../orchestration-cluster/identity.md) of that cluster, with `authentication_mode = "oidc"`. See `examples/management-plane/cluster/identity.tfvars`.
1. Apply the stages of the cluster. Its Camunda stage publishes `cluster_registration`, which you give to [Camunda Hub](./camunda-hub.md).

The realm is imported when the provider starts for the first time. To add a cluster later, register its two clients in the administration console of the provider with the values of the `clusters` output, the same way as for a provider that you run yourself.

## Use the stage outputs

| Output                | Used by                                                                                               |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| `clusters`            | The identity stage of each cluster, as `external_oidc`                                                |
| `management`          | Management Identity and Camunda Hub: the issuer, the administrator claim, their clients and audiences |
| `issuer_uri`          | The issuer of the tokens                                                                              |
| `admin_user_password` | You, to sign in as the administrator                                                                  |

## Troubleshoot the identity provider stage

### The OIDC provider connects with a password: declare its database with auth = password in the storage stage.

The database of the provider was declared with `auth = iam`, or the stage received another database. Set `auth = "password"` on `oidc_provider` in the `databases` of the storage stage.

### clusters needs at least one entry, named with lowercase letters, digits, and hyphens.

A cluster name contains other characters, or `clusters` is empty. The name becomes part of the client IDs. Use names such as `emea` or `prod-1`.

### database_name and username must be lowercase letters, digits, and underscores, starting with a letter: they are used in SQL statements.

A database in the storage stage has a name with other characters. Rename it.

## Next steps

- [Deploy Management Identity](./management-identity.md)
- [Deploy Camunda Hub](./camunda-hub.md)
