---
id: multi-region-rdbms
title: "Multi-region setup with RDBMS (EKS)"
sidebar_label: "Multi-region with RDBMS"
description: "Deploy three Amazon EKS clusters connected by AWS Transit Gateway and Submariner, backed by an Aurora Global Database, to run one Orchestration Cluster across three regions."
---

<!-- TODO: the `reference` code blocks below point at the `feat/eks-multi-region-rdbms` branch of
     camunda-deployment-references so they render while https://github.com/camunda/camunda-deployment-references/pull/2940
     is open. Repoint every one of them to `main` once that pull request is merged. -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import HighLevelDesign from './assets/eks-multi-region-rdbms.svg';

<!-- Diagrams: edit the .excalidraw source, then export SVG and strip the embedded font block,
     replace font-family with a monospace stack, and remove the root width/height so the SVG
     scales to the content column. A vanilla excalidraw.app export does none of these. -->

import MultiRegionRdbmsCopy from '../../../\_partials/\_multi-region-rdbms-copy.md'

This guide deploys one Camunda 8 Orchestration Cluster across three AWS regions, using [Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html) for compute, [AWS Transit Gateway](https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html) for inter-region routing, [Submariner](https://submariner.io/) for cross-cluster service discovery, and [Aurora Global Database](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html) as relational secondary storage.

:::caution
Review the [Multi-Region RDBMS concept documentation](/self-managed/concepts/multi-region/multi-region-rdbms.md) before continuing, to understand the limitations and requirements of this configuration.
:::

The result is a cluster in which losing a region does not stop processing, and in which bringing the region back is a redeployment rather than a data restore. For the reasoning behind the topology, see [partition placement across zones](/self-managed/concepts/multi-region/multi-region-rdbms.md#partition-placement-across-zones).

## High-level design

<HighLevelDesign role="img" title="Three AWS regions, each with an EKS cluster in its own VPC and a Camunda zone. A Transit Gateway per region is peered in a full mesh, Submariner publishes each region's Zeebe service under a clusterset name, and an Aurora Global Database with a writer in eu-west-2 and a reader in eu-west-3 backs all three regions through a single JDBC URL." />

Each layer of the design has one job, and they are independent of each other:

| Layer                    | Component                  | What it provides                                                                                |
| :----------------------- | :------------------------- | :---------------------------------------------------------------------------------------------- |
| Compute                  | One EKS cluster per region | Zeebe brokers, gateway, and connectors for one Camunda zone.                                    |
| L3, inter-region routing | AWS Transit Gateway        | Carries all cross-region traffic, including Raft and the database writes, on private addresses. |
| L7, service discovery    | Submariner                 | Publishes each region's Zeebe service under a name every other region can resolve.              |
| Secondary storage        | Aurora Global Database     | One writer and its readers, replicated by the database, reached through a single JDBC URL.      |

The database regions are deliberately **decoupled** from the compute regions: the Aurora members live in London and Paris while compute spans all three regions. That keeps the database cheaper and demonstrates that the two topologies are independent.

:::tip
New to Terraform or to running Camunda on EKS? Start with the [single-region EKS Terraform setup](./terraform-setup.md), which covers AWS authentication, Terraform state management, and the essentials of an EKS cluster. This guide assumes you have completed a single-region deployment at least once.
:::

## Requirements

- **AWS account** with permission to create resources in every target region. See [What is an AWS account?](https://docs.aws.amazon.com/accounts/latest/reference/accounts-welcome.html).
- **AWS CLI**, to manage AWS resources. See [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).
- **Terraform**, to provision the infrastructure. See [Install Terraform](https://developer.hashicorp.com/terraform/downloads).
- **kubectl**, to interact with the Kubernetes clusters. See [Install kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl).
- **Helm**, to install Camunda. See [Install Helm](https://helm.sh/docs/intro/install/).
- **subctl**, the Submariner CLI. The reference architecture installs it for you.
- **jq**, used by the procedure scripts to read the Orchestration Cluster management API.

For the tool versions used in testing, see the [.tool-versions](https://github.com/camunda/camunda-deployment-references/blob/main/.tool-versions) file in the reference architecture repository.

### AWS service quotas

Verify your quotas in **every** region before deploying, and request increases where needed:

- **Elastic IPs**: at least three per region, one per availability zone.
- **VPCs, EC2 instances, and EBS storage**: enough for one EKS cluster per region.
- **Transit Gateways**: one per region, plus one peering attachment per region pair.
- **Aurora Global Database**: available in the regions you choose for the database. Aurora Global Database is not offered in every region.

Some AWS regions are **opt-in** and must be enabled on the account before anything can be created in them. `eu-central-2` (Zurich), used as the third region in this guide, is one of them:

```bash
aws account enable-region --region-name eu-central-2
```

### Considerations

- **This is a multi-region deployment, and costs scale with the region count.** Three EKS control planes and node groups, three Transit Gateways with a full peering mesh billed per attachment-hour, and an Aurora Global Database with a member per database region. Inter-region data transfer is billed per gigabyte. Destroy the environment when you are done evaluating.
- **Non-overlapping CIDRs are mandatory.** Transit Gateway cannot route duplicate prefixes, and Submariner runs without Globalnet, so every CIDR must identify exactly one cluster.
- **Round-trip time between regions matters.** Keep it at or below 100 ms. The regions used in this guide are London, Paris, and Zurich, whose pairwise round-trip times are well inside that budget.
- **Management Identity, Web Modeler, Console, and Optimize are not part of this deployment.** See [limitations](/self-managed/concepts/multi-region/multi-region-rdbms.md#limitations).
- **This guide is a blueprint, not a production deployment.** It shows the moving parts and how they fit together. Adapt sizing, security, and traffic routing to your environment.

### Outcome

Following this guide gives you:

- Three EKS clusters, one per region, each with its own VPC and a dedicated non-overlapping CIDR.
- A Transit Gateway per region, peered in a full mesh, routing every VPC and Kubernetes service range between regions.
- Submariner service discovery, publishing each region's Zeebe service as `<clusterID>.<service>.<namespace>.svc.clusterset.local`.
- An Aurora Global Database with a writer in one region and readers in the others, reached through a single JDBC URL.
- One Orchestration Cluster with six brokers, six partitions, and a replication factor of three, with exactly one replica of every partition in each region.

## Topology

The default topology uses three regions and three zones:

| Setting                        | Default                                  | Meaning                                 |
| :----------------------------- | :--------------------------------------- | :-------------------------------------- |
| Regions                        | `eu-west-2`, `eu-west-3`, `eu-central-2` | London, Paris, Zurich                   |
| Zone names                     | `london`, `paris`, `zurich`              | One zone per region                     |
| `global.multiregion.mode`      | `zoned`                                  | Zone-aware partitioning                 |
| `numberOfBrokers` per zone     | `2`                                      | Brokers deployed in that zone           |
| `numberOfReplicas` per zone    | `1`                                      | One replica of every partition per zone |
| `orchestration.clusterSize`    | `6`                                      | Sum of `numberOfBrokers` across zones   |
| Replication factor             | `3`                                      | Sum of `numberOfReplicas` across zones  |
| `orchestration.partitionCount` | `6`                                      | One partition per broker                |
| Database regions               | Slots `0` and `1`                        | Aurora members, writer first            |

Brokers are identified as `<zone>_<index>`, so `paris_1` is the second broker in the Paris zone. The zone list is identical in every region; only `global.multiregion.zone` and the advertised host differ.

### CIDR allocation

Every region owns a distinct VPC range and a distinct Kubernetes service range. Both are routed over the Transit Gateway:

| Slot | Region         | VPC and pod CIDR | Kubernetes service CIDR |
| :--- | :------------- | :--------------- | :---------------------- |
| 0    | `eu-west-2`    | `10.192.0.0/16`  | `10.190.0.0/16`         |
| 1    | `eu-west-3`    | `10.202.0.0/16`  | `10.200.0.0/16`         |
| 2    | `eu-central-2` | `10.212.0.0/16`  | `10.210.0.0/16`         |
| 3    | `eu-south-1`   | `10.222.0.0/16`  | `10.220.0.0/16`         |

There is no separate pod range, and that is deliberate. With the [AWS VPC CNI](https://docs.aws.amazon.com/eks/latest/userguide/pod-networking.html) a pod address is an ordinary VPC address, so routing the VPC range over the Transit Gateway makes cross-region pod-to-pod traffic work natively, with no overlay network. The service range is routed too, because Submariner resolves a remote ClusterIP service out of the exporting cluster's service range.

## 1. Configure AWS and apply Terraform

### Obtain a copy of the reference architecture

<MultiRegionRdbmsCopy />

### Review the region topology

The region slots are declared in [variables.tf](https://github.com/camunda/camunda-deployment-references/blob/feat/eks-multi-region-rdbms/aws/kubernetes/eks-multi-region-rdbms/terraform/clusters/variables.tf). Adjust the regions, short names, and CIDR blocks to your environment before applying.

Two variables control the topology, and they are not interchangeable:

| Variable              | Meaning                                                                                                           |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------- |
| `regions`             | The full list of region slots the cluster will ever have. Every slot contributes a zone to the Camunda zone list. |
| `active_region_count` | How many of those slots are actually deployed. At most one slot may be left empty.                                |

Declaring a slot without deploying it is the supported growth path: its replicas are reserved, each partition runs at `N - 1` of `N`, and activating the slot later fills them in without redistributing anything. Leaving two or more slots empty is rejected at plan time. Within the two to four slots this module supports, a second empty slot costs every partition its majority and the cluster cannot form.

### Apply the infrastructure

The root module creates every EKS cluster, the Transit Gateway mesh, the security group rules, and the Aurora Global Database in a single state.

```bash
cd terraform/clusters
terraform init
terraform apply -var cluster_name=camunda
```

For a cheaper evaluation, deploy two of the three slots and reduce the node count. This is a valid state: every partition holds two of its three replicas.

```bash
terraform apply \
  -var cluster_name=camunda \
  -var active_region_count=2 \
  -var single_nat_gateway=true \
  -var np_desired_node_count=2
```

Expect roughly 25 minutes for the EKS clusters and 15 minutes for the Aurora Global Database. They are created in parallel.

:::note
Set up remote Terraform state before deploying anything you intend to keep. The [single-region EKS guide](./terraform-setup.md#initialize-terraform) covers creating an S3 backend.
:::

### Bring your own database

To run this architecture on a database other than Aurora Global Database, set `deploy_database = false` and supply your own JDBC URL through `CAMUNDA_RDBMS_URL`. Anything that presents a single endpoint following its own writer works the same way: a PostgreSQL cluster behind a floating endpoint, a connection proxy, or a DNS record you repoint during failover.

## 2. Prepare the environment

### Export the Terraform outputs

The procedure scripts derive the entire environment from the Terraform state, down to the kubectl context aliases, so nothing has to be typed twice.

```bash
cd ../../procedure
. ./export-terraform-outputs.sh
. ./export_environment_prerequisites.sh
```

The dot is required: these scripts export variables into your current shell, not into a subshell.

`export_environment_prerequisites.sh` is the environment contract of the architecture. Every value can be overridden by exporting it beforehand, and region-indexed values are space-separated lists in slot order.

<details>
<summary>See the export_environment_prerequisites.sh script</summary>
```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feat/eks-multi-region-rdbms/aws/kubernetes/eks-multi-region-rdbms/procedure/export_environment_prerequisites.sh
```
</details>

The script refuses to continue if the topology is inconsistent, for example if more than one slot is left empty.

:::note One namespace in every cluster
Unlike the [dual-region setup](./dual-region.md), which needs a different namespace per region because CoreDNS stub forwarding cannot distinguish local from remote traffic, this architecture uses the **same namespace name in every cluster**. Submariner disambiguates identically named services with the cluster ID prefix.
:::

### Register the kubectl contexts

Create one kubectl context per active region, named after the region's short name, for example `cluster-london`. The rest of the guide selects regions by these names.

```bash
./register-kubecontexts.sh
```

<details>
<summary>See the register-kubecontexts.sh script</summary>
```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feat/eks-multi-region-rdbms/aws/kubernetes/eks-multi-region-rdbms/procedure/register-kubecontexts.sh
```
</details>

### Configure the storage class

Zeebe brokers need a storage class backed by fast disks. Apply it in every region:

```bash
./storageclass-configure.sh
```

<details>
<summary>See the storageclass-configure.sh script</summary>
```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feat/eks-multi-region-rdbms/aws/kubernetes/eks-multi-region-rdbms/procedure/storageclass-configure.sh
```
</details>

Verify it before continuing. A missing storage class leaves broker PVCs unbound and the pods pending, which is easy to misread later as a networking failure:

```bash
./storageclass-verify.sh
```

<details>
<summary>See the storageclass-verify.sh script</summary>
```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feat/eks-multi-region-rdbms/aws/kubernetes/eks-multi-region-rdbms/procedure/storageclass-verify.sh
```
</details>

## 3. Connect the clusters

Two layers connect the regions, and they have different jobs. The Transit Gateway carries the traffic. Submariner only publishes names.

### Install subctl

Install the Submariner CLI and put it on your `PATH`. Source the script rather than executing it, so the `PATH` change survives in your shell.

```bash
source ./submariner/install-subctl.sh
```

<details>
<summary>See the install-subctl.sh script</summary>
```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feat/eks-multi-region-rdbms/aws/kubernetes/eks-multi-region-rdbms/procedure/submariner/install-subctl.sh
```
</details>

### Deploy the Submariner broker

Deploy the ClusterSet broker into one region. It stores ClusterSet metadata only, so any cluster can host it and its loss does not interrupt anything already established.

```bash
./submariner/deploy-broker.sh
```

<details>
<summary>See the deploy-broker.sh script</summary>
```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feat/eks-multi-region-rdbms/aws/kubernetes/eks-multi-region-rdbms/procedure/submariner/deploy-broker.sh
```
</details>

Submariner is deployed with its **service-discovery component only**. It provides multi-cluster DNS and nothing else: no gateway nodes, no IPsec tunnel, no route agent. `subctl show connections` is empty by design.

<details>
<summary>Why there is no encrypted overlay</summary>

Running Submariner's connectivity component alongside the AWS VPC CNI puts two owners on the same prefixes. Submariner installs node routes for every remote cluster CIDR so it can pull that traffic into its tunnel. With the VPC CNI those CIDRs are the VPC ranges, which the Transit Gateway also routes, including the node addresses the tunnels are built on. The result is tunnels that report `connected`, cross-cluster DNS that resolves correctly, and Raft messages that are silently dropped.

Removing one of the two owners removes the whole class of problem, and the Transit Gateway is the one that cannot be removed.

This does not leave the traffic in clear text. AWS encrypts inter-region Transit Gateway peering itself: traffic is encrypted with AES-256 at the virtual network layer as it travels between regions, and again at the physical layer on links outside AWS's physical control. See [transit gateway peering attachments](https://docs.aws.amazon.com/vpc/latest/tgw/tgw-peering.html) and [encryption in transit](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/data-protection.html#encryption-transit).

What you give up is control of the encryption, not the encryption: the keys are AWS-managed. If a control requires customer-managed keys, enable TLS in the workload, or replace the VPC CNI with Cilium in ENI mode plus WireGuard or IPsec. In ENI mode pod addresses stay ordinary VPC addresses, so the Transit Gateway remains the only owner of the routes.

</details>

### Join the clusters to the ClusterSet

Join every active region to the ClusterSet, so each one can publish and resolve the others' services.

```bash
./submariner/join-clusters.sh
```

<details>
<summary>See the join-clusters.sh script</summary>
```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feat/eks-multi-region-rdbms/aws/kubernetes/eks-multi-region-rdbms/procedure/submariner/join-clusters.sh
```
</details>

Then verify:

```bash
./submariner/verify-submariner.sh
```

<details>
<summary>See the verify-submariner.sh script</summary>
```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feat/eks-multi-region-rdbms/aws/kubernetes/eks-multi-region-rdbms/procedure/submariner/verify-submariner.sh
```
</details>

### Verify the cross-region substrate

Before spending twenty-five minutes deploying Camunda, spend two proving that pods in one region can reach pods in another. Submariner does not carry this traffic, so nothing else covers the Transit Gateway routes and the security group rules.

```bash
./setup-namespaces.sh
./verify-cross-region-connectivity.sh
```

If this fails, the problem is routing or firewalling, not Camunda. See [troubleshooting](#troubleshooting).

### Ports open between regions

The security group rules are declared explicitly in [security.tf](https://github.com/camunda/camunda-deployment-references/blob/feat/eks-multi-region-rdbms/aws/kubernetes/eks-multi-region-rdbms/terraform/clusters/security.tf) rather than allowing all traffic between VPCs:

| Port          | Protocol | Purpose                                                             |
| :------------ | :------- | :------------------------------------------------------------------ |
| 26500 - 26502 | TCP      | Zeebe gateway gRPC, command API, and the internal API carrying Raft |
| 8080          | TCP      | Orchestration Cluster REST API                                      |
| 9600          | TCP      | Orchestration Cluster management API                                |
| 53            | TCP/UDP  | CoreDNS and Submariner service discovery                            |
| n/a           | ICMP     | Cross-region connectivity diagnostics                               |

Each rule is instantiated once per remote VPC range and once per remote service range, so the rule count grows linearly with the region count: 24 inbound rules at three regions, 36 at four, against an AWS limit of 60 per security group. Terraform asserts that budget at plan time rather than letting the apply fail after the clusters exist.

## 4. Deploy Camunda 8

### Create the database secret

Create the Kubernetes secret holding the database password, in every active region. The Helm values reference it by name rather than carrying the password.

```bash
./create-rdbms-secret.sh
```

<details>
<summary>See the create-rdbms-secret.sh script</summary>
```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feat/eks-multi-region-rdbms/aws/kubernetes/eks-multi-region-rdbms/procedure/create-rdbms-secret.sh
```
</details>

### Generate the region-dependent values

Three values cannot be hardcoded in the Helm values, because they depend on the deployed topology:

| Value                                  | Content                                                                        |
| :------------------------------------- | :----------------------------------------------------------------------------- |
| `CAMUNDA_CLUSTER_INITIALCONTACTPOINTS` | One entry per active region, pointing at that region's headless Zeebe service. |
| `REGION_<slot>_ZEEBE_SERVICE_NAME`     | The suffix each broker advertises, so peers in other regions can resolve it.   |
| `CAMUNDA_MULTIREGION_ZONES`            | The zone list, covering **every** slot including any not yet deployed.         |

```bash
. ./generate-zeebe-helm-values.sh
./assemble-envsubst-values.sh
```

:::note Contact points are fully qualified
The generated contact points end with a trailing dot, which marks them as fully qualified names. Without it, the resolver walks the pod's search domains first, and on a cold multi-region start a broker whose peer is not yet published can exhaust its DNS budget and never finish starting. The trailing dot is required, not cosmetic.
:::

### Review the Helm values

The values file is the same in every region. Only `global.multiregion.zone` and the advertised host differ, which is what makes the topology a single description rather than one per region.

<details>
<summary>See the full camunda-values.yml</summary>
```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/feat/eks-multi-region-rdbms/aws/kubernetes/eks-multi-region-rdbms/helm-values/camunda-values.yml
```
</details>

The parts worth reading before you install:

- `global.multiregion.mode: zoned` selects [zone-aware partitioning](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md). The chart rejects the legacy `regions` and `regionId` keys in this mode, and derives the cluster size, replication factor, and broker node IDs from the zone list. See [configure zone-aware multi-region deployments](/self-managed/deployment/helm/configure/multi-region-zone-awareness.md).
- `global.multiregion.zones` lists every zone with its broker count, replica count, and priority. Zone 0 has the highest priority because it hosts the database writer.
- `orchestration.data.secondaryStorage.type: rdbms` with a single `url` shared by every broker in every region.
- `CAMUNDA_DATA_SECONDARYSTORAGE_RDBMS_ASYNCREPLICATION_ENABLED: "true"` is required. Without it the exporter acknowledges records the standby has not received, and a writer failover loses exported data.
- Cross-region SWIM membership timeouts are relaxed. The defaults are tuned for intra-region latency, and on a cold start brokers otherwise see remote peers as unreachable, eject them, and never converge.
- `identity`, `console`, and `optimize` are disabled. See [limitations](/self-managed/concepts/multi-region/multi-region-rdbms.md#limitations).

### Install the chart

Install the same release in every active region, from the values assembled in the previous step.

```bash
./install-chart.sh
```

<details>
<summary>See the install-chart.sh script</summary>
```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feat/eks-multi-region-rdbms/aws/kubernetes/eks-multi-region-rdbms/procedure/install-chart.sh
```
</details>

Then export the Camunda services to the ClusterSet so brokers in other regions can resolve them:

```bash
./submariner/export-services.sh
```

<details>
<summary>See the export-services.sh script</summary>
```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feat/eks-multi-region-rdbms/aws/kubernetes/eks-multi-region-rdbms/procedure/submariner/export-services.sh
```
</details>

## 5. Verify the deployment

Confirm that every broker joined and that the partition distribution matches the zone list:

```bash
./check-cluster-topology.sh
```

<details>
<summary>See the check-cluster-topology.sh script</summary>
```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feat/eks-multi-region-rdbms/aws/kubernetes/eks-multi-region-rdbms/procedure/check-cluster-topology.sh
```
</details>

Expect roughly 10 minutes for the Zeebe cluster to converge across regions. A healthy three-zone cluster reports six brokers, six partitions, and one replica of every partition in each zone.

Measure the cost of the write path from each region to the database writer. Regions that are not co-located with the writer pay the inter-region round trip on every export flush, and this is what tells you whether the exporter queue is sized correctly:

```bash
./measure-rdbms-latency.sh
```

<details>
<summary>See the measure-rdbms-latency.sh script</summary>
```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feat/eks-multi-region-rdbms/aws/kubernetes/eks-multi-region-rdbms/procedure/measure-rdbms-latency.sh
```
</details>

## 6. Operate the cluster

Day-2 procedures, including region loss, failback, and activating a declared zone, are documented separately in the [Multi-Region RDBMS operational procedure](/self-managed/deployment/helm/operational-tasks/multi-region-rdbms-ops.md).

## Troubleshooting

### Cross-region pod traffic is dropped

Prove the substrate before investigating Camunda:

```bash
./verify-cross-region-connectivity.sh
```

Submariner does not carry this traffic, so do not start with `subctl`. The data plane is the Transit Gateway. Check that the remote ranges are routed, expecting one route per remote VPC and service CIDR:

```bash
aws ec2 describe-route-tables --region eu-west-2 \
  --filters "Name=vpc-id,Values=<vpc-id>" \
  --query 'RouteTables[].Routes[?TransitGatewayId!=null].[DestinationCidrBlock]' --output text
```

Then check that the remote security group allows the port:

```bash
aws ec2 describe-security-group-rules --region eu-west-3 \
  --filters "Name=group-id,Values=<security-group-id>" \
  --query 'SecurityGroupRules[?!IsEgress].[CidrIpv4,IpProtocol,FromPort,ToPort]' --output text
```

### Names do not resolve across regions

If routing is correct but names do not resolve, the problem is service discovery:

```bash
subctl show networks --contexts cluster-london
kubectl --context cluster-london -n submariner-operator get clusters.submariner.io
kubectl --context cluster-london -n camunda get serviceexports,serviceimports
```

A full diagnostic dump, including cross-cluster name resolution, is available:

```bash
./submariner/diagnose-submariner.sh
```

<details>
<summary>See the diagnose-submariner.sh script</summary>
```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feat/eks-multi-region-rdbms/aws/kubernetes/eks-multi-region-rdbms/procedure/submariner/diagnose-submariner.sh
```
</details>

### Zeebe never reaches the expected broker count

This is almost always cross-region DNS. Check the service discovery layer first, then the broker's startup gate:

```bash
./submariner/verify-submariner.sh
kubectl --context cluster-london -n camunda logs camunda-zeebe-0 -c wait-clusterset-dns
```

If brokers are `Pending` rather than `Running`, the storage class is missing in that region. See [configure the storage class](#configure-the-storage-class).

## Next steps

- [Multi-Region RDBMS operational procedure](/self-managed/deployment/helm/operational-tasks/multi-region-rdbms-ops.md): region loss, failback, and activating a declared zone.
- [Multi-Region RDBMS concept](/self-managed/concepts/multi-region/multi-region-rdbms.md): the architecture and its trade-offs.
- [Zone-aware clusters](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md): the full zone configuration reference.
- [Relational database configuration](/self-managed/concepts/databases/relational-db/configuration.md): RDBMS secondary storage settings.
