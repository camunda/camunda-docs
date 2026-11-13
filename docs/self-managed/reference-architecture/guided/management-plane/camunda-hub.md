---
id: camunda-hub
title: "Camunda Hub"
sidebar_label: "Camunda Hub"
description: "Deploy a single Camunda Hub on Amazon ECS and connect it to one or more Orchestration Clusters."
pagination_prev: null
pagination_next: null
---

import { GuidedNext, GuidedProgress, GuidedWhen } from "@site/src/components/GuidedDeployment";

The Camunda Hub stage deploys one Camunda Hub for the whole estate and connects it to every Orchestration Cluster that you list. Adding a cluster adds an entry to the stage. It never adds another Hub.

<GuidedProgress />

<GuidedWhen managementPlane="none" chosenOnly>

You chose no management plane, so this page doesn't apply to your deployment. Continue with [your architecture](../your-architecture.md).

</GuidedWhen>

<GuidedWhen compute="eks" managementPlane="deploy">

With Amazon EKS, the [Helm chart](/self-managed/deployment/helm/install/quick-install.md) deploys Camunda Hub and Management Identity with the full platform. The stages on these pages are part of the Amazon ECS Terraform. See [deploy to Amazon EKS](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/amazon-eks.md).

</GuidedWhen>

## Understand how Camunda Hub fits

Camunda Hub is part of the [management plane](./overview.md), next to [Management Identity](./management-identity.md). It signs in against the [identity provider](./identity-provider.md). It owns no cluster. The Orchestration Clusters are inputs.

| What Camunda Hub needs  | Where it comes from                                                               |
| ----------------------- | --------------------------------------------------------------------------------- |
| A database              | The storage stage, declared with `auth = "iam"`                                   |
| Sign-in                 | The `management` output of the identity provider stage                            |
| Roles and organizations | The `internal_url` of Management Identity, with the roles of Camunda Hub declared |
| The clusters            | The `cluster_registration` output of the Camunda stage of each cluster            |

Camunda Hub forwards the signed-in user's token to the clusters. It reaches them over the network on three addresses: the REST API, the gRPC API, and the health endpoint on the management port. The addresses of `cluster_registration` are service discovery names that resolve inside the VPC. A cluster in another VPC is reachable through the interconnect, which forwards the names, and needs its routes and ports open.

<GuidedWhen managementPlane="deploy" compute="ecs">

## Create the Camunda Hub stage

1. Declare the database `camunda_hub` in the storage stage, with `auth = "iam"`. See [prepare the shared steps](./overview.md#prepare-the-shared-steps).
1. Print the registration of each cluster, from the Camunda stage of that cluster:

   ```bash
   terraform -chdir=terraform/camunda output -json cluster_registration
   ```

1. List the clusters in the variables of the stage, by an ID of your choice:

   ```hcl
   prefix = "camunda-mgmt"

   clusters = {
     emea = {
       version       = "8.10.0"
       rest_url      = "http://orchestration-cluster.camunda-emea-oc.service.local:8080"
       grpc_url      = "grpc://orchestration-cluster.camunda-emea-oc.service.local:26500"
       readiness_url = "http://orchestration-cluster.camunda-emea-oc.service.local:9600/actuator/health/readiness"
     }
     apac = {
       name          = "Asia Pacific"
       version       = "8.10.0"
       rest_url      = "http://orchestration-cluster.camunda-apac-oc.service.local:8080"
       grpc_url      = "grpc://orchestration-cluster.camunda-apac-oc.service.local:26500"
       readiness_url = "http://orchestration-cluster.camunda-apac-oc.service.local:9600/actuator/health/readiness"
     }
   }
   ```

   The `version` must match the version of the cluster: from 8.8 on it selects the REST and gRPC cluster API. The name defaults to the ID.

1. Apply the stages of the management plane:

   ```bash
   PLAN=management ./procedure/compose.sh apply examples/management-plane
   ```

1. Open the `public_url` output and sign in as the administrator of the OIDC provider.

## Add a cluster later

1. Connect the cluster to the OIDC provider. See [connect an Orchestration Cluster](./identity-provider.md#connect-an-orchestration-cluster).
1. Add its `cluster_registration` to `clusters` and apply the Camunda Hub stage. Camunda Hub restarts with the new list.

## Use the stage inputs and outputs

| Setting               | Meaning                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------ |
| `clusters`            | The clusters, by ID: version, REST, gRPC, and readiness addresses, and an optional display name        |
| `camunda_license_key` | Stored in Secrets Manager. Empty runs Camunda Hub in its trial mode.                                   |
| `mail_from_address`   | Sender of invitations. Without an SMTP host, invitations aren't sent.                                  |
| `context_path`        | The path Camunda Hub is served under, `/hub` by default. The websocket relay uses `<context_path>-ws`. |

| Output            | Meaning                                             |
| ----------------- | --------------------------------------------------- |
| `public_url`      | The address of Camunda Hub                          |
| `clusters`        | The IDs of the connected clusters                   |
| `clusters_config` | The clusters as Camunda Hub is configured with them |

## Troubleshoot the Camunda Hub stage

### Management Identity does not declare the roles of Camunda Hub: set enable_hub_authorization = true in the Management Identity stage.

Management Identity doesn't declare the Web Modeler roles. Set `enable_hub_authorization = true` in its stage, apply it, then apply the Camunda Hub stage.

### Camunda Hub connects with an IAM token: declare its database with auth = iam in the storage stage.

The database was declared with `auth = password`. Remove `auth` from `camunda_hub` in the `databases` of the storage stage.

### clusters needs at least one Orchestration Cluster.

The map is empty. Add at least one entry.

### A cluster shows as unhealthy

Camunda Hub probes the readiness address on the management port, `9600`. Check that the address resolves from the Camunda Hub task, that the security groups open `9600` between the two, and that the cluster is ready.

</GuidedWhen>

## Next steps

- [Connect an Orchestration Cluster to the OIDC provider](./identity-provider.md#connect-an-orchestration-cluster)
- [Grow to two regions](../grow/single-to-dual-region.md)

<GuidedNext />
