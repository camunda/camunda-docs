---
id: dual-region-operational-procedure
title: "Dual-region operational procedure"
sidebar_label: "Dual-region operational procedure"
description: "The operational procedure concerning dual-region setups to recover from a region loss."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import StateContainer from './components/stateContainer.jsx';

<!-- Image source: https://docs.google.com/presentation/d/1mbEIc0KuumQCYeg1YMpvdVR8AEUcbTWqlesX-IxVIjY/edit?usp=sharing -->

<!-- Failover -->

import Three from './img/3.svg';
import Four from './img/4.svg';
import Five from './img/5.svg';
import Six from './img/6.svg';
import Seven from './img/7.svg';

<!-- Failback -->

import Nine from './img/9.svg';
import Ten from './img/10.svg';
import Eleven from './img/11.svg';
import Twelve from './img/12.svg';
import Thirteen from './img/13.svg';
import Fourteen from './img/14.svg';
import Fifteen from './img/15.svg';

## Introduction

This operational blueprint procedure is a step-by-step guide on how to restore operations in the case of a total region failure. It explains how to temporarily restore functionality in the surviving region, and how to ultimately do a full recovery to restore the dual-region setup. The operational procedure builds on top of the [dual-region AWS setup guide](/self-managed/setup/deploy/amazon/amazon-eks/dual-region.md), but is generally applicable for any dual-region setup.

Before proceeding with the operational procedure, thoroughly review and understand the contents of the [dual-region concept page](./../../concepts/multi-region/dual-region.md). This page outlines various limitations and requirements pertinent to the procedure, which are crucial for successful execution.

## Disclaimer

:::danger

Running dual-region setups requires the users to be able to detect any regional failures and to implement the necessary operational procedure for failover and failback, matching their environments. The example blueprint procedure is described below.

:::

## Prerequisites

- A dual-region Camunda 8 setup installed in two different regions, preferably derived from our [AWS dual-region guide](/self-managed/setup/deploy/amazon/amazon-eks/dual-region.md).
  - In that guide, we're showcasing Kubernetes dual-region installation, based on the following tools:
    - [Helm (3.x)](https://helm.sh/docs/intro/install/) for installing and upgrading the [Camunda Helm chart](https://artifacthub.io/packages/helm/camunda/camunda-platform).
    - [Kubectl (1.28.x)](https://kubernetes.io/docs/tasks/tools/#kubectl) to interact with the Kubernetes cluster.
- [zbctl](./../../../apis-tools/cli-client/index.md) to interact with the Zeebe cluster.

## Terminology

- **Surviving region**
  - A surviving region refers to a region within a dual-region setup that remains operational and unaffected by a failure or disaster that affects other regions.
- **Lost region**
  - A lost region refers to a region within a dual-region setup that becomes unavailable or unusable due to a failure or disaster.
- **Recreated region**
  - A recreated region refers to a region within a dual-region setup that was previously lost but has been restored or recreated to resume its operational state.
  - We assume this region contains no Camunda 8 deployments or related persistent volumes. Ensure this is the case before executing the **failover** procedure.

## Procedure

We don't differ between active and passive regions as the procedure is the same for either loss. We will focus on losing the passive region while still having the active region.

You'll need to reroute the traffic to the surviving region with the help of DNS (details on how to do that depend on your DNS setup and are not covered in this guide.)

After you've identified a region loss and before beginning the region restoration procedure, ensure the lost region cannot reconnect as this will hinder a successful recovery during failover and failback execution.

In case the region is only lost temporarily (for example, due to network hiccups), Zeebe can survive a region loss but will stop processing due to the loss in quorum and ultimately fill up the persistent disk before running out of volume, resulting in the loss of data.

The **failover** phase of the procedure results in the temporary restoration of Camunda 8 functionality by redeploying it within the surviving region to resume Zeebe engine functionality. Before the completion of this phase, Zeebe is unable to export or process new data until it achieves quorum and the configured Elasticsearch endpoints for the exporters become accessible, which is the outcome of the failover procedure.

The **failback** phase of the procedure results in completely restoring the failed region to its full functionality. It requires you to have the lost region ready again for the redeployment of Camunda 8.

:::danger

For the **failback** procedure, your recreated region cannot contain any active Camunda 8 deployments or leftover persistent volumes related to Camunda 8 or its Elasticsearch instance. You must start from a clean slate and not bring old data from the lost region, as states may have diverged.

:::

The following procedures are building on top of the work done in the [AWS setup guide](/self-managed/setup/deploy/amazon/amazon-eks/dual-region.md#deploy-camunda-8-to-the-clusters) about deploying Camunda 8 to two Kubernetes clusters in different regions. We assume you have your own copy of the [c8-multi-region](https://github.com/camunda/c8-multi-region/tree/stable/8.5) repository and previously completed changes in the `camunda-values.yml` to adjust them to your setup.

Ensure you have followed [deploy Camunda 8 to the clusters](/self-managed/setup/deploy/amazon/amazon-eks/dual-region.md#deploy-camunda-8-to-the-clusters) to have Camunda 8 installed and configured for a dual-region setup.

### Environment prerequisites

Ensure you have followed [environment prerequisites](/self-managed/setup/deploy/amazon/amazon-eks/dual-region.md#environment-prerequisites) to have the general environment variables set up already.

We will try to refrain from always mentioning both possible scenarios (losing either region 0 or region 1). Instead, we generalized the commands and require you to do a one-time setup to configure environment variables to help execute the procedure based on the surviving and to be recreated region.

Depending on which region you lost, select the correct tab below and export those environment variables to your terminal for a smoother procedure execution:

<Tabs queryString="lost-region">
  <TabItem value="region-0-lost" label="Region 0 lost" default>

```bash
export CLUSTER_SURVIVING=$CLUSTER_1
export CLUSTER_RECREATED=$CLUSTER_0
export CAMUNDA_NAMESPACE_SURVIVING=$CAMUNDA_NAMESPACE_1
export CAMUNDA_NAMESPACE_FAILOVER=$CAMUNDA_NAMESPACE_1_FAILOVER
export CAMUNDA_NAMESPACE_RECREATED=$CAMUNDA_NAMESPACE_0
export REGION_SURVIVING=region1
export REGION_RECREATED=region0
```

  </TabItem>
  <TabItem value="region-1-lost" label="Region 1 lost">

```bash
export CLUSTER_SURVIVING=$CLUSTER_0
export CLUSTER_RECREATED=$CLUSTER_1
export CAMUNDA_NAMESPACE_SURVIVING=$CAMUNDA_NAMESPACE_0
export CAMUNDA_NAMESPACE_FAILOVER=$CAMUNDA_NAMESPACE_0_FAILOVER
export CAMUNDA_NAMESPACE_RECREATED=$CAMUNDA_NAMESPACE_1
export REGION_SURVIVING=region0
export REGION_RECREATED=region1
```

  </TabItem>
</Tabs>

### Failover

<Tabs queryString="failover">
  <TabItem value="step1" label="Step 1" default>

#### Ensure network isolation between two regions (for example, between two Kubernetes clusters)

<StateContainer
current={<Three viewBox="140 40 680 500" />}
desired={<Four viewBox="140 40 680 500" />}
/>

<div>

#### Current state

One of the regions is lost, meaning Zeebe:

- Is unable to process new requests due to losing the quorum
- Stops exporting new data to Elasticsearch in the lost region
- Stops exporting new data to Elasticsearch in the survived region

#### Desired state

For the failover procedure, ensure the lost region does not accidentally reconnect. You should be sure it is lost, and if so, look into measures to prevent it from reconnecting. For example, by utilizing the suggested solution below to isolate your active environment.

It's crucial to ensure the isolation of the environments because, during the operational procedure, we will have duplicate Zeebe broker IDs, which would collide if not correctly isolated and if the other region came accidentally on again.

#### How to get there

Depending on your architecture, possible approaches are:

- Configuring [Kubernetes Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/) to disable traffic flow between the clusters.
- Configure firewall rules to disable traffic flow between the clusters.

</div>
  </TabItem>
  <TabItem value="step2" label="Step 2">

#### Create temporary Camunda 8 installation in the failover mode in the surviving region

<StateContainer
current={<Five viewBox="140 40 680 500" />}
desired={<Six viewBox="140 40 680 500" />}
/>

<div>

#### Current state

You have previously ensured that the lost region cannot reconnect during the failover procedure.

Due to the Zeebe data replication, no data has been lost.

#### Desired state

You are creating a temporary Camunda 8 deployment within the same region, but different namespace, to recover the Zeebe cluster functionality. Using a different namespace allows for easier distinguishing between the normal Zeebe deployment and Zeebe failover deployment.

The newly deployed Zeebe brokers will be running in the failover mode. This will restore the quorum and the Zeebe data processing. Additionally, the new failover brokers are configured to export the data to the surviving Elasticsearch instance and to the newly deployed failover Elasticsearch instance.

#### How to get there

In the case **Region 1** was lost: in the previously cloned repository [c8-multi-region](https://github.com/camunda/c8-multi-region/tree/stable/8.5), navigate to the folder [aws/dual-region/kubernetes/region0](https://github.com/camunda/c8-multi-region/tree/stable/8.5/aws/dual-region/kubernetes/region0/). This contains the example Helm values yaml `camunda-values-failover.yml` containing the required overlay for the **failover** mode.

In the case when your **Region 0** was lost, instead go to the folder [aws/dual-region/kubernetes/region1](https://github.com/camunda/c8-multi-region/tree/stable/8.5/aws/dual-region/kubernetes/region1/) for the `camunda-values-failover.yml` file.

The chosen `camunda-values-failover.yml` requires adjustments before installing the Helm chart and the same has to be done for the base `camunda-values.yml` in `aws/dual-region/kubernetes`.

- `ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS`
- `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL`
- `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL`

1. The bash script [generate_zeebe_helm_values.sh](https://github.com/camunda/c8-multi-region/blob/stable/8.5/aws/dual-region/scripts/generate_zeebe_helm_values.sh) in the repository folder `aws/dual-region/scripts/` helps generate those values. You only have to copy and replace them within the previously mentioned Helm values files. It will use the exported environment variables of the environment prerequisites for namespaces and regions. Additionally, you have to pass in whether your region 0 or 1 was lost.

```bash
./generate_zeebe_helm_values.sh failover

# It will ask you to provide the following values
# Enter the region that was lost, values can either be 0 or 1:
## In our case we lost region 1, therefore input 1
# Enter Zeebe cluster size (total number of Zeebe brokers in both Kubernetes clusters):
## for a dual-region setup we recommend 8. Resulting in 4 brokers per region.
```

<details>
  <summary>Example output</summary>
  <summary>

```bash
Please use the following to change the existing environment variable ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS in the failover Camunda Helm chart values file 'region0/camunda-values-failover.yml' and in the base Camunda Helm chart values file 'camunda-values.yml'. It's part of the 'zeebe.env' path.

- name: ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS
  value: camunda-zeebe-0.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-0.camunda-zeebe.camunda-paris.svc.cluster.local:26502,camunda-zeebe-1.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-1.camunda-zeebe.camunda-paris.svc.cluster.local:26502,camunda-zeebe-2.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-2.camunda-zeebe.camunda-paris.svc.cluster.local:26502,camunda-zeebe-3.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-3.camunda-zeebe.camunda-paris.svc.cluster.local:26502

Please use the following to change the existing environment variable ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL in the failover Camunda Helm chart values file 'region0/camunda-values-failover.yml' and in the base Camunda Helm chart values file 'camunda-values.yml'. It's part of the 'zeebe.env' path.

- name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL
  value: http://camunda-elasticsearch-master-hl.camunda-london.svc.cluster.local:9200

Please use the following to change the existing environment variable ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL in the failover Camunda Helm chart values file 'region0/camunda-values-failover.yml' and in the base Camunda Helm chart values file 'camunda-values.yml'. It's part of the 'zeebe.env' path.

- name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL
  value: http://camunda-elasticsearch-master-hl.camunda-london-failover.svc.cluster.local:9200
```

  </summary>
</details>

2. As the script suggests, replace the environment variables within `camunda-values-failover.yml`.
3. Repeat the adjustments for the base Helm values file `camunda-values.yml` in `aws/dual-region/kubernetes` with the same output for the mentioned environment variables.
4. From the terminal context of `aws/dual-region/kubernetes`, execute the following:

```bash
helm install $HELM_RELEASE_NAME camunda/camunda-platform \
  --version $HELM_CHART_VERSION \
  --kube-context $CLUSTER_SURVIVING \
  --namespace $CAMUNDA_NAMESPACE_FAILOVER \
  -f camunda-values.yml \
  -f $REGION_SURVIVING/camunda-values-failover.yml
```

#### Verification

The following command will show the deployed pods of the failover namespace.

Only the minimal amount of brokers required to restore the quorum will be deployed in the failover installation. For example, if `clusterSize` is eight, two Zeebe brokers will be deployed in the failover installation instead of the normal four. This is expected.

```bash
kubectl --context $CLUSTER_SURVIVING get pods -n $CAMUNDA_NAMESPACE_FAILOVER
```

Port-forwarding the Zeebe Gateway via `kubectl` and printing the topology should reveal that the **failover** brokers have joined the cluster.

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$HELM_RELEASE_NAME-zeebe-gateway 26500:26500 -n $CAMUNDA_NAMESPACE_SURVIVING
zbctl status --insecure --address localhost:26500
```

<details>
  <summary>Example output</summary>
  <summary>

```bash
Cluster size: 8
Partitions count: 8
Replication factor: 4
Gateway version: 8.5.0
Brokers:
  Broker 0 - camunda-zeebe-0.camunda-zeebe.camunda-london.svc:26501
    Version: 8.5.0
    Partition 1 : Leader, Healthy
    Partition 6 : Follower, Healthy
    Partition 7 : Follower, Healthy
    Partition 8 : Follower, Healthy
  Broker 1 - camunda-zeebe-0.camunda-zeebe.camunda-london-failover.svc:26501
    Version: 8.5.0
    Partition 1 : Follower, Healthy
    Partition 2 : Leader, Healthy
    Partition 7 : Follower, Healthy
    Partition 8 : Follower, Healthy
  Broker 2 - camunda-zeebe-1.camunda-zeebe.camunda-london.svc:26501
    Version: 8.5.0
    Partition 1 : Follower, Healthy
    Partition 2 : Follower, Healthy
    Partition 3 : Follower, Healthy
    Partition 8 : Leader, Healthy
  Broker 4 - camunda-zeebe-2.camunda-zeebe.camunda-london.svc:26501
    Version: 8.5.0
    Partition 2 : Follower, Healthy
    Partition 3 : Follower, Healthy
    Partition 4 : Follower, Healthy
    Partition 5 : Follower, Healthy
  Broker 5 - camunda-zeebe-1.camunda-zeebe.camunda-london-failover.svc:26501
    Version: 8.5.0
    Partition 3 : Leader, Healthy
    Partition 4 : Follower, Healthy
    Partition 5 : Follower, Healthy
    Partition 6 : Leader, Healthy
  Broker 6 - camunda-zeebe-3.camunda-zeebe.camunda-london.svc:26501
    Version: 8.5.0
    Partition 4 : Leader, Healthy
    Partition 5 : Leader, Healthy
    Partition 6 : Follower, Healthy
    Partition 7 : Leader, Healthy
```

  </summary>
</details>

</div>

  </TabItem>
  <TabItem value="step3" label="Step 3">

#### Configure Zeebe to export data to temporary Elasticsearch deployment

<StateContainer
current={<Six viewBox="140 40 680 500" />}
desired={<Seven viewBox="140 40 680 500" />}
/>

<div>

#### Current state

Zeebe is not yet be able to continue exporting data since the Zeebe brokers in the surviving region are configured to point to the Elasticsearch instance of the lost region.

:::info

Simply disabling the exporter would not be helpful here, since the sequence numbers in the exported data are not persistent when an exporter configuration is removed from Zeebe settings and added back later. The correct sequence numbers are required by Operate and Tasklist to import Elasticsearch data correctly.

:::

#### Desired state

You have reconfigured the existing Camunda deployment in `CAMUNDA_NAMESPACE_SURVIVING` to point Zeebe to the export data to the temporary Elasticsearch instance that was previously created in **Step 2**.

The Zeebe cluster is then unblocked and can export data to Elasticsearch again.

Completing this step will restore regular interaction with Camunda 8 for your users, marking the conclusion of the temporary recovery.

#### How to get there

In **Step 2** you have already adjusted the base Helm values file `camunda-values.yml` in `aws/dual-region/kubernetes` with the same changes as for the failover deployment for the environment variables.

- `ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS`
- `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL`
- `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL`

From the `aws/dual-region/kubernetes` directory, do a Helm upgrade to update the configuration of the Zeebe deployment in `CAMUNDA_NAMESPACE_SURVIVING` to point to the failover Elasticsearch instance:

```bash
helm upgrade $HELM_RELEASE_NAME camunda/camunda-platform \
  --version $HELM_CHART_VERSION \
  --kube-context $CLUSTER_SURVIVING \
  --namespace $CAMUNDA_NAMESPACE_SURVIVING \
  -f camunda-values.yml \
  -f $REGION_SURVIVING/camunda-values.yml
```

#### Verification

The following command will show the deployed pods of the surviving namespace. You should see that the Zeebe brokers have just restarted or are still restarting due to the configuration upgrade.

```bash
kubectl --context $CLUSTER_SURVIVING get pods -n $CAMUNDA_NAMESPACE_SURVIVING
```

Furthermore, the following command will watch the [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) update of the Zeebe brokers and wait until it's done.

```bash
kubectl --context $CLUSTER_SURVIVING rollout status --watch statefulset/$HELM_RELEASE_NAME-zeebe -n $CAMUNDA_NAMESPACE_SURVIVING
```

Alternatively, you can check that the Elasticsearch value was updated in the [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) configuration of the Zeebe brokers and are reflecting the previous output of the script `generate_zeebe_helm_values.sh` in **Step 2**.

```bash
kubectl --context $CLUSTER_SURVIVING get statefulsets $HELM_RELEASE_NAME-zeebe -oyaml -n $CAMUNDA_NAMESPACE_SURVIVING | grep -A1 'ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION[0-1]_ARGS_URL'
```

<details>
  <summary>Example output</summary>
  <summary>

```bash
  - name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL
    value: http://camunda-elasticsearch-master-hl.camunda-london.svc.cluster.local:9200
--
  - name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL
    value: http://camunda-elasticsearch-master-hl.camunda-london-failover.svc.cluster.local:9200
```

  </summary>
</details>

Lastly, port-forwarding the Zeebe Gateway via `kubectl` and printing the topology should reveal that all brokers have joined the Zeebe cluster again.

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$HELM_RELEASE_NAME-zeebe-gateway 26500:26500 -n $CAMUNDA_NAMESPACE_SURVIVING
zbctl status --insecure --address localhost:26500
```

<details>
  <summary>Example output</summary>
  <summary>

```bash
Cluster size: 8
Partitions count: 8
Replication factor: 4
Gateway version: 8.5.0
Brokers:
  Broker 0 - camunda-zeebe-0.camunda-zeebe.camunda-london.svc:26501
    Version: 8.5.0
    Partition 1 : Leader, Healthy
    Partition 6 : Follower, Healthy
    Partition 7 : Follower, Healthy
    Partition 8 : Follower, Healthy
  Broker 1 - camunda-zeebe-0.camunda-zeebe.camunda-london-failover.svc:26501
    Version: 8.5.0
    Partition 1 : Follower, Healthy
    Partition 2 : Leader, Healthy
    Partition 7 : Follower, Healthy
    Partition 8 : Follower, Healthy
  Broker 2 - camunda-zeebe-1.camunda-zeebe.camunda-london.svc:26501
    Version: 8.5.0
    Partition 1 : Follower, Healthy
    Partition 2 : Follower, Healthy
    Partition 3 : Follower, Healthy
    Partition 8 : Leader, Healthy
  Broker 4 - camunda-zeebe-2.camunda-zeebe.camunda-london.svc:26501
    Version: 8.5.0
    Partition 2 : Follower, Healthy
    Partition 3 : Follower, Healthy
    Partition 4 : Follower, Healthy
    Partition 5 : Follower, Healthy
  Broker 5 - camunda-zeebe-1.camunda-zeebe.camunda-london-failover.svc:26501
    Version: 8.5.0
    Partition 3 : Leader, Healthy
    Partition 4 : Follower, Healthy
    Partition 5 : Follower, Healthy
    Partition 6 : Leader, Healthy
  Broker 6 - camunda-zeebe-3.camunda-zeebe.camunda-london.svc:26501
    Version: 8.5.0
    Partition 4 : Leader, Healthy
    Partition 5 : Leader, Healthy
    Partition 6 : Follower, Healthy
    Partition 7 : Leader, Healthy
```

  </summary>
</details>

</div>
  </TabItem>
</Tabs>

### Failback

<Tabs queryString="failback">
  <TabItem value="step1" label="Step 1" default>

#### Deploy Camunda 8 in the failback mode in the newly created region

<StateContainer
current={<Seven viewBox="140 40 680 500" />}
desired={<Nine viewBox="140 40 680 500" />}
/>

<div>

#### Current state

You have temporary Zeebe brokers deployed in failover mode together with a temporary Elasticsearch within the same surviving region.

#### Desired state

You want to restore the dual-region functionality again and deploy Zeebe in failback mode to the newly restored region.

Failback mode means new `clusterSize/2` brokers will be installed in the restored region:

- `clusterSize/4` brokers are running in the normal mode, participating processing and restoring the data.
- `clusterSize/4` brokers are temporarily running in the sleeping mode. They will run in the normal mode later once the failover setup is removed.

An Elasticsearch will also be deployed in the restored region, but not used yet, before the data is restored into it from the backup from the surviving Elasticsearch cluster.

#### How to get there

The changes previously done in the base Helm values file `camunda-values.yml` in `aws/dual-region/kubernetes` should still be present from **Failover - Step 2**.

In particular, the values `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL` and `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL` should solely point at the surviving region.

In addition, the following Helm command will disable Operate and Tasklist since those will only be enabled at the end of the full region restore. It's required to keep them disabled in the newly created region due to their Elasticsearch importers.

Lastly, the `installationType` is set to `failBack` to switch the behavior of Zeebe and prepare for this procedure.

1. From the terminal context of `aws/dual-region/kubernetes` execute:

```bash
helm install $HELM_RELEASE_NAME camunda/camunda-platform \
  --version $HELM_CHART_VERSION \
  --kube-context $CLUSTER_RECREATED \
  --namespace $CAMUNDA_NAMESPACE_RECREATED \
  -f camunda-values.yml \
  -f $REGION_RECREATED/camunda-values.yml \
  --set global.multiregion.installationType=failBack \
  --set operate.enabled=false \
  --set tasklist.enabled=false
```

#### Verification

The following command will show the deployed pods of the newly created region.

Depending on your chosen `clusterSize`, you should see that the **failback** deployment contains some Zeebe instances being ready and others unready. Those unready instances are sleeping indefinitely and is the expected behavior.
This behavior stems from the **failback** mode since we still have the temporary **failover**, which acts as a replacement for the lost region.

For example, in the case of `clusterSize: 8`, you find two active Zeebe brokers and two unready brokers in the newly created region.

```bash
kubectl --context $CLUSTER_RECREATED get pods -n $CAMUNDA_NAMESPACE_RECREATED
```

Port-forwarding the Zeebe Gateway via `kubectl` and printing the topology should reveal that the **failback** brokers have joined the cluster.

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$HELM_RELEASE_NAME-zeebe-gateway 26500:26500 -n $CAMUNDA_NAMESPACE_SURVIVING
zbctl status --insecure --address localhost:26500
```

</div>
  </TabItem>
  <TabItem value="step2" label="Step 2">

#### Pause Zeebe exporters to Elasticsearch, pause Operate and Tasklist

<StateContainer
current={<Nine viewBox="140 40 680 500" />}
desired={<Ten viewBox="140 40 680 500" />}
/>

<div>

#### Current state

You currently have the following setups:

- Functioning Zeebe cluster (in multi-region mode):
  - Camunda 8 installation in the failover mode in the surviving region
  - Camunda 8 installation in the failback mode in the recreated region

#### Desired state

:::danger

This step is very important to minimize the risk of losing any data when restoring the backup in the recreated region.

There remains a small chance of losing some data in Elasticsearch (and in turn, in Operate and Tasklist too). This is because Zeebe might have exported some records to the failover Elasticsearch in the surviving region, but not to the main Elasticsearch in the surviving region, before the exporters have been paused.

This means those records will not be included in the surviving region's Elasticsearch backup when the recreated region's Elasticsearch is restored from the backup, leading to the new region missing those records (as Zeebe does not re-export them).

:::

You are preparing everything for the newly created region to take over again to restore the functioning dual-region setup.

For this, stop the Zeebe exporters from exporting any new data to Elasticsearch so you can create an Elasticsearch backup.

Additionally, temporarily scale down Operate and Tasklist to zero replicas. This will result in users not being able to interact with Camunda 8 anymore and is required to guarantee no new data is imported to Elasticsearch.

:::note

This **does not** affect the processing of process instances in any way. The impact is that process information about the affected instances might not be visible in Operate and Tasklist.

:::

#### How to get there

1. Disable Operate and Tasklist by scaling to 0:

```bash
kubectl --context $CLUSTER_SURVIVING scale -n $CAMUNDA_NAMESPACE_SURVIVING deployments/$HELM_RELEASE_NAME-operate --replicas 0
kubectl --context $CLUSTER_SURVIVING scale -n $CAMUNDA_NAMESPACE_SURVIVING deployments/$HELM_RELEASE_NAME-tasklist --replicas 0
```

2. Disable the Zeebe Elasticsearch exporters in Zeebe via kubectl using the [exporting API](./../../zeebe-deployment/operations/management-api.md#exporting-api):

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$HELM_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
curl -i localhost:9600/actuator/exporting/pause -XPOST
# The successful response should be:
# HTTP/1.1 204 No Content
```

#### Verification

For Operate and Tasklist, you can confirm that the deployments have successfully scaled down by listing those and indicating `0/0` ready:

```bash
kubectl --context $CLUSTER_SURVIVING get deployments $HELM_RELEASE_NAME-operate $HELM_RELEASE_NAME-tasklist -n $CAMUNDA_NAMESPACE_SURVIVING
# NAME               READY   UP-TO-DATE   AVAILABLE   AGE
# camunda-operate    0/0     0            0           23m
# camunda-tasklist   0/0     0            0           23m
```

For the Zeebe Elasticsearch exporters, there's currently no API available to confirm this. Only the response code of `204` indicates a successful disabling.

</div>
  </TabItem>
  <TabItem value="step3" label="Step 3">

#### Create and restore Elasticsearch backup

<StateContainer
current={<Ten viewBox="140 40 680 500" />}
desired={<Eleven viewBox="140 40 680 500" />}
/>

<div>

#### Current state

The Camunda components are currently not reachable by end-users and will not process any new process instances. This allows creating a backup of Elasticsearch without losing any data.

#### Desired state

You are creating a backup of the main Elasticsearch instance in the surviving region and restore it in the recreated region. This Elasticsearch backup contains all the data and may take some time to be finished. The failover Elasticsearch instance only contains a subset of the data from after the region loss and is not sufficient to restore this in the new region.

#### How to get there

This builds on top of the [AWS setup](/self-managed/setup/deploy/amazon/amazon-eks/dual-region.md) and assumes the S3 bucket was automatically created as part of the Terraform execution.

:::info

The procedure works for other cloud providers and bare metal. You have to adjust the AWS S3-specific part depending on your chosen backup source for Elasticsearch. Consult the [Elasticsearch documentation on snapshot and restore](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshot-restore.html) to learn more about this, and specifically the [different supported types](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshots-register-repository.html#ess-repo-types) by Elasticsearch.

:::

1. Determine the S3 bucket name by retrieving it via Terraform. Go to `aws/dual-region/terraform` within the repository and retrieve the bucket name from the Terraform state:

```bash
export S3_BUCKET_NAME=$(terraform output -raw s3_bucket_name)
```

2. Configure Elasticsearch backup endpoint in the surviving namespace `CAMUNDA_NAMESPACE_SURVIVING`:

```bash
ELASTIC_POD=$(kubectl --context $CLUSTER_SURVIVING get pod --selector=app\.kubernetes\.io/name=elasticsearch -o jsonpath='{.items[0].metadata.name}' -n $CAMUNDA_NAMESPACE_SURVIVING)
kubectl --context $CLUSTER_SURVIVING exec -n $CAMUNDA_NAMESPACE_SURVIVING -it $ELASTIC_POD -c elasticsearch -- curl -XPUT "http://localhost:9200/_snapshot/camunda_backup" -H "Content-Type: application/json" -d'
{
  "type": "s3",
  "settings": {
    "bucket": "'$S3_BUCKET_NAME'",
    "client": "camunda",
    "base_path": "backups"
  }
}
'
```

3. Create an Elasticsearch backup in the surviving namespace `CAMUNDA_NAMESPACE_SURVIVING`. Depending on the amount of data, this operation will take a while to complete.

```bash
# The backup will be called failback
kubectl --context $CLUSTER_SURVIVING exec -n $CAMUNDA_NAMESPACE_SURVIVING -it $ELASTIC_POD -c elasticsearch -- curl -XPUT "http://localhost:9200/_snapshot/camunda_backup/failback?wait_for_completion=true"
```

4. Verify the backup has been completed successfully by checking all backups and ensuring the `state` is `SUCCESS`:

```bash
kubectl --context $CLUSTER_SURVIVING exec -n $CAMUNDA_NAMESPACE_SURVIVING -it $ELASTIC_POD -c elasticsearch -- curl -XGET "http://localhost:9200/_snapshot/camunda_backup/_all"
```

<details>
  <summary>Example output</summary>
  <summary>

```json
{
  "snapshots": [
    {
      "snapshot": "failback",
      "uuid": "uTHGdUAYSk-91aAS0sMKFQ",
      "repository": "camunda_backup",
      "version_id": 8090299,
      "version": "8.9.2",
      "indices": [
        "operate-web-session-1.1.0_",
        "tasklist-form-8.4.0_",
        "operate-process-8.3.0_",
        "zeebe-record_process-instance-creation_8.4.5_2024-03-28",
        "operate-batch-operation-1.0.0_",
        "operate-user-1.2.0_",
        "operate-incident-8.3.1_",
        "zeebe-record_job_8.4.5_2024-03-28",
        "operate-variable-8.3.0_",
        "tasklist-web-session-1.1.0_",
        "tasklist-draft-task-variable-8.3.0_",
        "operate-operation-8.4.0_",
        "zeebe-record_process_8.4.5_2024-03-28",
        ".ds-.logs-deprecation.elasticsearch-default-2024.03.28-000001",
        "tasklist-process-8.4.0_",
        "operate-metric-8.3.0_",
        "operate-flownode-instance-8.3.1_",
        "tasklist-flownode-instance-8.3.0_",
        "tasklist-variable-8.3.0_",
        "tasklist-metric-8.3.0_",
        "operate-post-importer-queue-8.3.0_",
        "tasklist-task-variable-8.3.0_",
        "operate-event-8.3.0_",
        "tasklist-process-instance-8.3.0_",
        "operate-import-position-8.3.0_",
        "operate-decision-requirements-8.3.0_",
        "zeebe-record_command-distribution_8.4.5_2024-03-28",
        "operate-list-view-8.3.0_",
        "zeebe-record_process-instance_8.4.5_2024-03-28",
        "tasklist-import-position-8.2.0_",
        "tasklist-user-1.4.0_",
        "operate-decision-instance-8.3.0_",
        "zeebe-record_deployment_8.4.5_2024-03-28",
        "operate-migration-steps-repository-1.1.0_",
        "tasklist-migration-steps-repository-1.1.0_",
        ".ds-ilm-history-5-2024.03.28-000001",
        "operate-decision-8.3.0_",
        "operate-sequence-flow-8.3.0_",
        "tasklist-task-8.4.0_"
      ],
      "data_streams": [
        "ilm-history-5",
        ".logs-deprecation.elasticsearch-default"
      ],
      "include_global_state": true,
      "state": "SUCCESS",
      "start_time": "2024-03-28T03:17:38.340Z",
      "start_time_in_millis": 1711595858340,
      "end_time": "2024-03-28T03:17:39.340Z",
      "end_time_in_millis": 1711595859340,
      "duration_in_millis": 1000,
      "failures": [],
      "shards": {
        "total": 43,
        "failed": 0,
        "successful": 43
      },
      "feature_states": []
    }
  ],
  "total": 1,
  "remaining": 0
}
```

  </summary>
</details>

5. Configure Elasticsearch backup endpoint in the new region namespace `CAMUNDA_NAMESPACE_RECREATED`. It's essential to only do this step now as otherwise it won't see the backup:

```bash
ELASTIC_POD=$(kubectl --context $CLUSTER_RECREATED get pod --selector=app\.kubernetes\.io/name=elasticsearch -o jsonpath='{.items[0].metadata.name}' -n $CAMUNDA_NAMESPACE_RECREATED)
kubectl --context $CLUSTER_RECREATED exec -n $CAMUNDA_NAMESPACE_RECREATED -it $ELASTIC_POD -c elasticsearch -- curl -XPUT "http://localhost:9200/_snapshot/camunda_backup" -H "Content-Type: application/json" -d'
{
  "type": "s3",
  "settings": {
    "bucket": "'$S3_BUCKET_NAME'",
    "client": "camunda",
    "base_path": "backups"
  }
}
'
```

6. Verify that the backup can be found in the shared S3 bucket:

```bash
kubectl --context $CLUSTER_RECREATED exec -n $CAMUNDA_NAMESPACE_RECREATED -it $ELASTIC_POD -c elasticsearch -- curl -XGET "http://localhost:9200/_snapshot/camunda_backup/_all"
```

The example output above should be the same since it's the same backup.

7. Restore Elasticsearch backup in the new region namespace `CAMUNDA_NAMESPACE_RECREATED`. Depending on the amount of data, this operation will take a while to complete.

```bash
kubectl --context $CLUSTER_RECREATED exec -n $CAMUNDA_NAMESPACE_RECREATED -it $ELASTIC_POD -c elasticsearch -- curl -XPOST "http://localhost:9200/_snapshot/camunda_backup/failback/_restore?wait_for_completion=true"
```

8. Verify that the restore has been completed successfully in the new region:

```bash
kubectl --context $CLUSTER_RECREATED exec -n $CAMUNDA_NAMESPACE_RECREATED -it $ELASTIC_POD -c elasticsearch -- curl -XGET "http://localhost:9200/_snapshot/camunda_backup/failback/_status"
```

<details>
  <summary>Example output</summary>
  <summary>

The important part being the `state: "SUCCESS"` and that `done` and `total` are equal. **This is only an example and the values will differ for you.**

```json
{
  "snapshots": [
    {
      "snapshot": "failback",
      "repository": "camunda_backup",
      "uuid": "8AmblqA2Q9WAhuDk-NO5Cg",
      "state": "SUCCESS",
      "include_global_state": true,
      "shards_stats": {
        "initializing": 0,
        "started": 0,
        "finalizing": 0,
        "done": 43,
        "failed": 0,
        "total": 43
      },
      "stats": {
        "incremental": {
          "file_count": 145,
          "size_in_bytes": 353953
        },
        "total": {
          "file_count": 145,
          "size_in_bytes": 353953
        },
        "start_time_in_millis": 1712058365525,
        "time_in_millis": 1005
      },
      "indices": {
        ...
      }
    }
  ]
}
```

  </summary>
</details>

</div>

  </TabItem>
  <TabItem value="step4" label="Step 4">

#### Configure Zeebe exporters to use Elasticsearch in the recreated region

<StateContainer
current={<Eleven viewBox="140 40 680 500" />}
desired={<Twelve viewBox="140 40 680 500" />}
/>

<div>

#### Current state

The backup of Elasticsearch has been created and restored to the recreated region.

The Camunda components remain unreachable by end-users as you proceed to restore functionality.

#### Desired state

You are repointing all Zeebe brokers from the temporary Elasticsearch instance to the Elasticsearch in the recreated region.

The Elasticsearch exporters will remain paused during this step.

#### How to get there

Your `camunda-values-failover.yml` and base `camunda-values.yml` require adjustments again to reconfigure all installations to the Elasticsearch instance in the new region:

- `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL`
- `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL`

1. The bash script [generate_zeebe_helm_values.sh](https://github.com/camunda/c8-multi-region/blob/stable/8.5/aws/dual-region/scripts/generate_zeebe_helm_values.sh) in the repository folder `aws/dual-region/scripts/` helps generate those values again. You only have to copy and replace them within the previously mentioned Helm values files. It will use the exported environment variables of the environment prerequisites for namespaces and regions.

```bash
./generate_zeebe_helm_values.sh failback

# It will ask you to provide the following values
# Enter Zeebe cluster size (total number of Zeebe brokers in both Kubernetes clusters):
## for a dual-region setup we recommend eight, resulting in four brokers per region.
```

<details>
  <summary>Example output</summary>
  <summary>

```bash
Please use the following to change the existing environment variable ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS in the failover Camunda Helm chart values file 'region0/camunda-values-failover.yml' and in the base Camunda Helm chart values file 'camunda-values.yml'. It's part of the 'zeebe.env' path.

- name: ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS
  value: camunda-zeebe-0.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-0.camunda-zeebe.camunda-paris.svc.cluster.local:26502,camunda-zeebe-1.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-1.camunda-zeebe.camunda-paris.svc.cluster.local:26502,camunda-zeebe-2.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-2.camunda-zeebe.camunda-paris.svc.cluster.local:26502,camunda-zeebe-3.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-3.camunda-zeebe.camunda-paris.svc.cluster.local:26502

Please use the following to change the existing environment variable ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL in the failover Camunda Helm chart values file 'region0/camunda-values-failover.yml' and in the base Camunda Helm chart values file 'camunda-values.yml'. It's part of the 'zeebe.env' path.

- name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL
  value: http://camunda-elasticsearch-master-hl.camunda-london.svc.cluster.local:9200

Please use the following to change the existing environment variable ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL in the failover Camunda Helm chart values file 'region0/camunda-values-failover.yml' and in the base Camunda Helm chart values file 'camunda-values.yml'. It's part of the 'zeebe.env' path.

- name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL
  value: http://camunda-elasticsearch-master-hl.camunda-paris.svc.cluster.local:9200
```

  </summary>
</details>

2. As the script suggests, replace the environment variables within `camunda-values-failover.yml`.
3. Repeat the adjustments for the base Helm values file `camunda-values.yml` in `aws/dual-region/kubernetes` with the same output for the mentioned environment variables.
4. Upgrade the normal Camunda environment in `CAMUNDA_NAMESPACE_SURVIVING` and `REGION_SURVIVING` to point to the new Elasticsearch:

```bash
helm upgrade $HELM_RELEASE_NAME camunda/camunda-platform \
  --version $HELM_CHART_VERSION \
  --kube-context $CLUSTER_SURVIVING \
  --namespace $CAMUNDA_NAMESPACE_SURVIVING \
  -f camunda-values.yml \
  -f $REGION_SURVIVING/camunda-values.yml \
  --set operate.enabled=false \
  --set tasklist.enabled=false
```

5. Upgrade the failover Camunda environment in `CAMUNDA_NAMESPACE_FAILOVER` and `REGION_SURVIVING` to point to the new Elasticsearch:

```bash
helm upgrade $HELM_RELEASE_NAME camunda/camunda-platform \
  --version $HELM_CHART_VERSION \
  --kube-context $CLUSTER_SURVIVING \
  --namespace $CAMUNDA_NAMESPACE_FAILOVER \
  -f camunda-values.yml \
  -f $REGION_SURVIVING/camunda-values-failover.yml
```

6. Upgrade the new region environment in `CAMUNDA_NAMESPACE_RECREATED` and `REGION_RECREATED` to point to the new Elasticsearch:

```bash
helm upgrade $HELM_RELEASE_NAME camunda/camunda-platform \
  --version $HELM_CHART_VERSION \
  --kube-context $CLUSTER_RECREATED \
  --namespace $CAMUNDA_NAMESPACE_RECREATED \
  -f camunda-values.yml \
  -f $REGION_RECREATED/camunda-values.yml \
  --set global.multiregion.installationType=failBack \
  --set operate.enabled=false \
  --set tasklist.enabled=false
```

7. Delete all the Zeebe broker pods in the recreated region, as those are blocking a successful rollout of the config change due to the failback mode. The resulting recreated Zeebe brokers pods are expected to be again half of them being functional and half of them running in the sleeping mode due to the failback mode.

```bash
kubectl --context $CLUSTER_RECREATED --namespace $CAMUNDA_NAMESPACE_RECREATED delete pods --selector=app\.kubernetes\.io/component=zeebe-broker
```

#### Verification

The following command will show the deployed pods of the namespaces. You should see that the Zeebe brokers are restarting. Adjusting the command for the other cluster and namespaces should reveal the same.

```bash
kubectl --context $CLUSTER_SURVIVING get pods -n $CAMUNDA_NAMESPACE_SURVIVING
```

Furthermore, the following command will watch the [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) update of the Zeebe brokers and wait until it's done. Adjusting the command for the other cluster and namespaces should have the same effect.

```bash
kubectl --context $CLUSTER_SURVIVING rollout status --watch statefulset/$HELM_RELEASE_NAME-zeebe -n $CAMUNDA_NAMESPACE_SURVIVING
```

Alternatively, you can check that the Elasticsearch value was updated in the [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) configuration of the Zeebe brokers and are reflecting the previous output of the script `generate_zeebe_helm_values.sh` in **Step 1**.

```bash
kubectl --context $CLUSTER_SURVIVING get statefulsets $HELM_RELEASE_NAME-zeebe -oyaml -n $CAMUNDA_NAMESPACE_SURVIVING | grep -A1 'ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION[0-1]_ARGS_URL'
```

<details>
  <summary>Example output</summary>
  <summary>

```bash
  - name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL
    value: http://camunda-elasticsearch-master-hl.camunda-london.svc.cluster.local:9200
--
  - name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL
    value: http://camunda-elasticsearch-master-hl.camunda-london-failover.svc.cluster.local:9200
```

  </summary>
</details>

</div>
  </TabItem>
  <TabItem value="step5" label="Step 5">

#### Reactivate Zeebe exporters, Operate, and Tasklist

<StateContainer
current={<Twelve viewBox="140 40 680 500" />}
desired={<Thirteen viewBox="140 40 680 500" />}
/>

<div>

#### Current state

Camunda 8 is pointing at the Elasticsearch instances in both regions again and not the temporary instance. It still remains unreachable to the end-users and no processes are advanced.

#### Desired state

You are reactivating the exporters and enabling Operate and Tasklist again within the two regions. This will allow users to interact with Camunda 8 again.

#### How to get there

1. Upgrade the normal Camunda environment in `CAMUNDA_NAMESPACE_SURVIVING` and `REGION_SURVIVING` to deploy Operate and Tasklist:

```bash
helm upgrade $HELM_RELEASE_NAME camunda/camunda-platform \
  --version $HELM_CHART_VERSION \
  --kube-context $CLUSTER_SURVIVING \
  --namespace $CAMUNDA_NAMESPACE_SURVIVING \
  -f camunda-values.yml \
  -f $REGION_SURVIVING/camunda-values.yml
```

2. Upgrade the new region environment in `CAMUNDA_NAMESPACE_RECREATED` and `REGION_RECREATED` to deploy Operate and Tasklist:

```bash
helm upgrade $HELM_RELEASE_NAME camunda/camunda-platform \
  --version $HELM_CHART_VERSION \
  --kube-context $CLUSTER_RECREATED \
  --namespace $CAMUNDA_NAMESPACE_RECREATED \
  -f camunda-values.yml \
  -f $REGION_RECREATED/camunda-values.yml \
  --set global.multiregion.installationType=failBack
```

3. Reactivate the exporters by sending the API activation request via the Zeebe Gateway:

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$HELM_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
curl -i localhost:9600/actuator/exporting/resume -XPOST
# The successful response should be:
# HTTP/1.1 204 No Content
```

#### Verification

For Operate and Tasklist, you can confirm that the deployments have successfully deployed by listing those and indicating `1/1` ready. The same command can be applied for the `CLUSTER_RECREATED` and `CAMUNDA_NAMESPACE_RECREATED`:

```bash
kubectl --context $CLUSTER_SURVIVING get deployments -n $CAMUNDA_NAMESPACE_SURVIVING
# NAME                    READY   UP-TO-DATE   AVAILABLE   AGE
# camunda-operate         1/1     1            1           3h24m
# camunda-tasklist        1/1     1            1           3h24m
# camunda-zeebe-gateway   1/1     1            1           3h24m
```

For the Zeebe Elasticsearch exporters, there's currently no API available to confirm this. Only the response code of `204` indicates a successful resumption.

</div>
  </TabItem>
  <TabItem value="step6" label="Step 6">

#### Remove temporary failover installation

<StateContainer
current={<Thirteen viewBox="140 40 680 500" />}
desired={<Fourteen viewBox="140 40 680 500" />}
/>

<div>

#### Current state

Camunda 8 is healthy and running in two regions again. You have redeployed Operate and Tasklist and enabled the Elasticsearch exporters again. This will allow users to interact with Camunda 8 again.

#### Desired state

You can remove the temporary failover solution since it is not required anymore and would hinder disablement of the failback mode within the new region.

#### How to get there

1. Uninstall the failover installation via Helm:

```bash
helm uninstall $HELM_RELEASE_NAME --kube-context $CLUSTER_SURVIVING --namespace $CAMUNDA_NAMESPACE_FAILOVER
```

2. Delete the leftover persistent volume claims of the Camunda 8 components:

```bash
kubectl --context $CLUSTER_SURVIVING delete pvc --all -n $CAMUNDA_NAMESPACE_FAILOVER
```

#### Verification

The following will show the pods within the namespace. You deleted the Helm installation in the failover namespace, which should result in no pods or in deletion state.

```bash
kubectl --context $CLUSTER_SURVIVING get pods -n $CAMUNDA_NAMESPACE_FAILOVER
```

Port-forwarding the Zeebe Gateway via `kubectl` and printing the topology should reveal that the failover brokers are missing:

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$HELM_RELEASE_NAME-zeebe-gateway 26500:26500 -n $CAMUNDA_NAMESPACE_SURVIVING
zbctl status --insecure --address localhost:26500
```

</div>
  </TabItem>
  <TabItem value="step7" label="Step 7">

#### Switch Zeebe brokers in the recreated region to normal mode

<StateContainer
current={<Fourteen viewBox="140 40 680 500" />}
desired={<Fifteen viewBox="140 40 680 500" />}
/>

<div>

#### Current state

You have almost fully restored the dual-region setup. Two Camunda deployments exist in two different regions.

The failback mode is still enabled in the restored region.

#### Desired state

You restore the new region to its normal functionality by removing the failback mode and forcefully removing the sleeping Zeebe pods. They would otherwise hinder the rollout since they will never be ready.

With this done, Zeebe is fully functional again and you are prepared in case of another region loss.

#### How to get there

1. Upgrade the new region environment in `CAMUNDA_NAMESPACE_RECREATED` and `REGION_RECREATED` by removing the failback mode:

```bash
helm upgrade $HELM_RELEASE_NAME camunda/camunda-platform \
  --version $HELM_CHART_VERSION \
  --kube-context $CLUSTER_RECREATED \
  --namespace $CAMUNDA_NAMESPACE_RECREATED \
  -f camunda-values.yml \
  -f $REGION_RECREATED/camunda-values.yml
```

2. Delete the sleeping pods in the new region, as those are blocking a successful rollout due to the failback mode:

```bash
kubectl --context $CLUSTER_RECREATED --namespace $CAMUNDA_NAMESPACE_RECREATED delete pods --selector=app\.kubernetes\.io/component=zeebe-broker
```

#### Verification

Port-forwarding the Zeebe Gateway via `kubectl` and printing the topology should reveal that all brokers have joined the Zeebe cluster again.

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$HELM_RELEASE_NAME-zeebe-gateway 26500:26500 -n $CAMUNDA_NAMESPACE_SURVIVING
zbctl status --insecure --address localhost:26500
```

</div>
  </TabItem>
</Tabs>
