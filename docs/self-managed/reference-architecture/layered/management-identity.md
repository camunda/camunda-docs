---
id: management-identity
title: "Deploy Management Identity"
sidebar_label: "Management Identity"
description: "Deploy Management Identity for Camunda Hub on Amazon ECS, with its own database, and declare the roles that Camunda Hub needs."
---

The Management Identity layer deploys Management Identity, the permission model that Camunda Hub resolves its authorization through. Deploy it once, in the management plane, together with the [OIDC provider](./oidc-provider.md).

## Decide whether you need it

| You deploy                                   | You need Management Identity |
| -------------------------------------------- | ---------------------------- |
| An Orchestration Cluster and Connectors only | No                           |
| Camunda Hub                                  | Yes                          |

Management Identity signs in against your OIDC provider and keeps its own database. In the generic OIDC profile it can't read role assignments from the provider, so it declares the roles itself and grants them by matching a token claim.

## Declare the roles of Camunda Hub

Management Identity ships no roles. Set `enable_hub_authorization = true` to declare these:

| Role                 | Grants                             |
| -------------------- | ---------------------------------- |
| `ManagementIdentity` | Full access to Management Identity |
| `Web Modeler`        | Full access to Web Modeler         |
| `Web Modeler Admin`  | Elevated access to Web Modeler     |

A mapping rule grants all three roles to the administrator: the principal whose username claim equals `admin_claim` in the provider's output. Without the roles, Camunda Hub signs in but denies every authorization check. The [Camunda Hub layer](./camunda-hub.md) therefore requires them.

## Create the Management Identity layer

1. Declare its database in the storage layer, with `auth = "iam"`. See [OIDC provider](./oidc-provider.md#prepare-the-management-plane).
1. Write the variables of the layer:

   ```hcl
   prefix = "camunda-mgmt"

   enable_hub_authorization = true
   ```

1. Apply the layers of the management plane:

   ```bash
   PLAN=management ./procedure/compose.sh apply examples/management-plane
   ```

The layer publishes:

| Output                      | Used by                                                                                                                 |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `internal_url`              | Camunda Hub, which asks Management Identity for roles. It is the address inside the ECS cluster, with the context path. |
| `public_url`                | You, in a browser                                                                                                       |
| `hub_authorization_enabled` | The Camunda Hub layer, which requires `true`                                                                            |

## Troubleshoot the Management Identity layer

### Management Identity connects with an IAM token: declare its database with auth = iam in the storage layer.

The database of Management Identity was declared with `auth = password`. Remove `auth`, or set it to `"iam"`, on `management_identity` in the `databases` of the storage layer.

### Camunda Hub signs in but every project call is denied

The roles of Camunda Hub aren't declared. Set `enable_hub_authorization = true` and apply the layer again. Management Identity restarts with the model.

## Next steps

- [Deploy Camunda Hub](./camunda-hub.md)
