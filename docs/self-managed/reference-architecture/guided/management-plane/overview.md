---
id: overview
title: "Management plane"
sidebar_label: "Overview"
description: "Deploy the Camunda 8 management plane, Camunda Hub and Management Identity, once for several Orchestration Clusters on Amazon ECS."
---

import { ChoicePanel, GuidedNext, GuidedProgress, GuidedWhen } from "@site/src/components/GuidedDeployment";

The management plane is the part of a Camunda 8 deployment that you use to design and manage processes and clusters. It consists of [Camunda Hub](/components/hub/index.md) and [Management Identity](/self-managed/components/management-identity/overview.md), and serves one or more Orchestration Clusters. You deploy it once for the whole estate, such as your development, integration, and production clusters. See the [deployment topology](/self-managed/reference-architecture/reference-architecture.md#deployment-topology) for how it relates to the clusters.

:::note Separate from the cluster's Admin
Camunda Hub uses Management Identity, which is a separate deployment from the Admin that is embedded in each Orchestration Cluster.
:::

<GuidedProgress />

<ChoicePanel step="management-plane" />

<GuidedWhen managementPlane="none" chosenOnly>

You chose no management plane, so the pages of this step don't apply to your deployment. Continue with [your architecture](../your-architecture.md).

</GuidedWhen>

<GuidedWhen compute="eks" managementPlane="deploy">

With Amazon EKS, the [Helm chart](/self-managed/deployment/helm/install/quick-install.md) deploys Camunda Hub and Management Identity with the full platform. The stages on these pages are part of the Amazon ECS Terraform. See [deploy to Amazon EKS](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/amazon-eks.md).

</GuidedWhen>

## Decide what you deploy

| Page                                            | What it deploys                                                                                                    |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [Identity provider](./identity-provider.md)     | The OIDC provider that Management Identity and the clusters sign in against. Skip it if you run your own provider. |
| [Management Identity](./management-identity.md) | The permission model that Camunda Hub resolves its authorization through, with its own database.                   |
| [Camunda Hub](./camunda-hub.md)                 | One Camunda Hub that connects to every Orchestration Cluster that you list, with its own database.                 |

The management plane needs an OIDC provider. Deploy the one of this guide, or use your own and describe it to the stages.

<GuidedWhen managementPlane="deploy" compute="ecs">

## Prepare the shared steps

The management plane is shared by every cluster, so it has its own network, compute, secondary storage, and exposure stages. What is specific to it:

| Stage    | What is specific to the management plane                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Network  | The VPC of a cluster, or its own. Camunda Hub reaches each cluster over the network, so the VPCs must be routed to each other. |
| Compute  | `enable_management_plane = true` opens the ports of the three components.                                                      |
| Storage  | `databases` declares one database for each component. The provider uses `auth = password`.                                     |
| Exposure | The public hostname and the certificate: every login redirect is built from them. Use a hostname that you control.             |

Declare the databases in the storage stage:

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

The storage stage creates the roles, generates the password of the provider's role, and publishes each database in its `databases` output. The components read their connection from there.

## Deploy the management plane

Apply the stages of the management plane in order. The helper script passes the outputs of each stage to the next:

```bash
export TF_STATE_BUCKET=my-state-bucket TF_STATE_REGION=eu-west-1
PLAN=management ./procedure/compose.sh apply examples/management-plane
```

The order is network, compute, secondary storage, exposure, identity provider, Management Identity, and Camunda Hub. Each Orchestration Cluster then connects to the identity provider and registers with Camunda Hub. See [connect an Orchestration Cluster](./identity-provider.md#connect-an-orchestration-cluster) and [add a cluster to Camunda Hub](./camunda-hub.md#add-a-cluster-later).

</GuidedWhen>

## Next steps

- [Deploy the identity provider](./identity-provider.md)
- [Deploy Management Identity](./management-identity.md)
- [Deploy Camunda Hub](./camunda-hub.md)

<GuidedNext />
