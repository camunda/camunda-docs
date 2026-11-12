---
id: identity
title: "Identity"
sidebar_label: "Identity"
description: "Choose between built-in users and an OIDC provider for a Camunda 8 Orchestration Cluster on AWS, and connect the cluster to the provider."
---

import { ChoicePanel, GuidedNext, GuidedProgress, GuidedWhen } from "@site/src/components/GuidedDeployment";

The identity stage decides how users and clients sign in to an Orchestration Cluster: with built-in users, or with an OIDC provider. Both produce the same output, so the Camunda stage doesn't know which one is behind it.

<GuidedProgress />

## Choose an authentication mode

| Mode    | When to use it                                                                                                           | What you provide                                                               |
| ------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `basic` | A standalone cluster, or an evaluation. Nothing else is deployed.                                                        | Nothing. Passwords are generated and stored in Secrets Manager.                |
| `oidc`  | You use your own provider, or the [identity provider of the management plane](../management-plane/identity-provider.md). | The provider's issuer, token endpoint, audience, and one client per component. |

Camunda Hub and Management Identity need an OIDC provider, so a cluster that Camunda Hub manages uses `oidc`. See [Camunda Hub](../management-plane/camunda-hub.md).

<ChoicePanel question="auth" />

<GuidedWhen compute={["eks", "ec2"]}>

The Orchestration Cluster stage is part of the Amazon ECS Terraform. With Amazon EKS, the Helm chart deploys the Orchestration Cluster: see [deploy to Amazon EKS](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/amazon-eks.md). With Amazon EC2, see [deploy to Amazon EC2](/self-managed/deployment/manual/cloud-providers/amazon/aws-ec2.md). The decisions on these pages apply in both cases.

</GuidedWhen>

<GuidedWhen compute="ecs" auth="oidc">

## Describe your provider

In `oidc` mode, the stage takes one object, `external_oidc`. Create a client for the Orchestration Cluster and one for Connectors in your provider first, and store each client secret in Secrets Manager.

| Field                                                        | Meaning                                                                                                                                                            |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `issuer_uri`, `token_uri`                                    | The issuer of your tokens, and the token endpoint that Connectors uses.                                                                                            |
| `orchestration_audience`                                     | The audience that tokens for the cluster carry.                                                                                                                    |
| `orchestration_client_id`, `orchestration_client_secret_arn` | The client that signs users in to the cluster, and the ARN of its secret.                                                                                          |
| `connectors_client_id`, `connectors_client_secret_arn`       | The machine-to-machine client of Connectors, and the ARN of its secret.                                                                                            |
| `username_claim`, `client_id_claim`                          | The claims that name the user and the calling client. The defaults are `preferred_username` and `client_id`. Entra ID names the application with `azp` or `appid`. |
| `connectors_token_scope`                                     | The scope Connectors requests. Entra ID version 2 needs `<resource>/.default`.                                                                                     |
| `client_secrets_kms_key_arn`                                 | The KMS key that encrypts the client secrets, when it isn't the key of the compute stage.                                                                          |

Set `admin_claim_value` to a principal that exists in your directory. It receives the administrator role. The default `admin` is the login user of the management plane's OIDC provider.

The task execution role must be able to decrypt the client secrets. Encrypt them with the key of the compute stage, or pass the key you used as `client_secrets_kms_key_arn`.

</GuidedWhen>

<GuidedWhen compute="ecs">

## Create the identity stage

1. Write the variables of the stage:

   ```hcl
   prefix              = "camunda-demo"
   authentication_mode = "basic"
   ```

   For `oidc`, set `authentication_mode = "oidc"` and add `external_oidc` and `admin_claim_value`. The stage also needs the public URL of the load balancer, which `compose.sh` passes from the exposure stage.

1. Apply the stages in order:

   ```bash
   ./procedure/compose.sh apply examples/greenfield
   ```

The stage publishes one output for the Camunda stage:

| Output                | Meaning                                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `oidc`                | `null` in basic mode. Otherwise the issuer, token endpoint, audience, redirect URI, claims, and one client for each component. |
| `authentication_mode` | `basic` or `oidc`.                                                                                                             |

</GuidedWhen>

<GuidedWhen compute="ecs" auth="oidc">

## Troubleshoot the identity stage

### authentication_mode = oidc requires external_oidc.

You selected `oidc` without describing a provider. Add `external_oidc`, or use the [identity provider of the management plane](../management-plane/identity-provider.md) and pass the entry of your cluster from its `clusters` output.

### external_oidc is only valid with authentication_mode = oidc.

You set `external_oidc` in basic mode. The values would be ignored. Set `authentication_mode = "oidc"`, or remove `external_oidc`.

### Every required field of external_oidc must be non-empty

A field is an empty string. The values flow into task settings and an empty value only fails when a task starts. Fill in every required field.

### authentication_mode = oidc requires public_base_url, task_execution_role_name and secrets_kms_key_arn.

The stage didn't receive the outputs of the exposure and compute stages. Apply the stages with `compose.sh`, or pass the values yourself.

### admin_claim_value must not be empty: it grants the admin role.

Nobody would receive the administrator role. Set `admin_claim_value` to the value of the username claim of your administrator.

</GuidedWhen>

## Next steps

- [Deploy the identity provider](../management-plane/identity-provider.md)
- [Orchestration Cluster](./overview.md)

<GuidedNext />
