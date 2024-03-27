---
id: dual-region-operational-procedure
title: "Dual-Region Operational Procedure"
sidebar_label: "Dual-Region Operational Procedure"
description: "The operational procedure concerning dual-region setups to recover from a region loss."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import StateContainer from './components/stateContainer.jsx';

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

The operational procedure is a step-by-step guide on how to proceed in the case of a total region failure. Allowing you to temporarily restore functionality and ultimately do a full recovery to restore the dual-region setup. The operational procedure builds on top of the [dual-region AWS setup guide](./../../platform-deployment/helm-kubernetes/platforms/amazon-eks/dual-region.md) but is generally applicable for any dual-region setup.

## Disclaimer

:::danger

- Customers must develop and test the below-described operational procedure in non-production environments based on the framework steps outlined by Camunda, **before applying them in production setups**.
- Before advancing to production go-live, customers need to validate these procedures with Camunda.
- Customers are solely responsible for detecting any regional failures and implementing the necessary described operational procedure.

:::

## Procedure

We don't differ between active and passive regions as the procedure is the same for either loss. We will focus on losing the passive region while still having the active region.

You'll have to take care of DNS considerations by rerouting traffic to the functioning region, which are disregarded in the following.

After identifying or considering a region as lost, you should ensure that it doesn't reconnect, as this will hinder a successful recovery during failover and failback execution. In case this is just temporary, Zeebe can survive a region loss but will stop processing due the loss in quorum and ultimately fill up the persistent disk before running out of volume resulting in the loss of data. <!-- Manu had some good advice on this -->

The **failover** procedure aims to temporarily restore operations by redeploying Camunda 8 within the same region to resume workflow engine functionality. During this period, Zeebe is unable to export or process new data until it achieves quorum and the configured Elasticsearch endpoints for the exporters become accessible, which is the outcome of the failover procedure.

The **failback** procedure involves completely restoring the failed region, thereby restoring your dual-region setup to its full functionality.

The following procedures are building on top of the work done in the [AWS setup guide](./../../platform-deployment/helm-kubernetes/platforms/amazon-eks/dual-region.md#deploy-camunda-8-to-the-clusters) about deploying Camunda 8 to a dual-region cluster. We assume you have your own copy of the [c8-multi-region](https://github.com/camunda/c8-multi-region) repository and previously done changes in the `camunda-values.yml`.

Please ensure to have followed the points [environment prerequisites](./../../platform-deployment/helm-kubernetes/platforms/amazon-eks/dual-region.md#environment-prerequisites) and [deploy Camunda 8 to the clusters](./../../platform-deployment/helm-kubernetes/platforms/amazon-eks/dual-region.md#deploy-camunda-8-to-the-clusters) to have the required base to build upon.

### Failover

<Tabs queryString="failover">
  <TabItem value="step1" label="Step 1" default>

#### Ensure Network Disconnection

<StateContainer
current={<Three viewBox="140 0 680 500" />}
desired={<Four viewBox="140 0 680 500" />}
/>

<div>

#### Current

The current state is that one of the regions is lost. This will result in Zeebe being unable to process anything new due to the loss in quorum, nor can it export data to Elasticsearch since one of the instances is unreachable. Neither would it export to the local region since exporters are
invoked sequentially.

#### Desired

For the failover procedure, we need to ensure that the lost region does not accidentally reconnect. You should be sure it is lost, and if so, look into measures to prevent it from reconnecting by for example utilizing the suggested solution below to isolate your active environment.

#### How to get there

Potential approaches are the following:

- [Kubernetes Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- Firewall rules to block the traffic from the lost region

</div>
  </TabItem>
  <TabItem value="step2" label="Step 2">

#### Deploy Temporary Camunda 8 Installation in Failover Mode in Existing Region

<StateContainer
current={<Five viewBox="140 0 680 500" />}
desired={<Six viewBox="140 0 680 500" />}
/>

<div>

#### Current

You have made sure by previous measures, for example, firewall rules that the lost region does not reconnect during the failover procedure.

Due to the partitioning of Zeebe, no data has been lost so far.

#### Desired

You are creating a temporary Camunda Platform deployment within the same region, but different namespace, to recover functionality.

The newly deployed Zeebe brokers will be running in failover mode to restore the quorum and allow processing again. Additionally, they will be pointed at the existing Elasticsearch instance and the newly deployed Elasticsearch instance.

#### How to get there

In the previously cloned repository [c8-multi-region](https://github.com/camunda/c8-multi-region) navigate to the folder [aws/dual-region/kubernetes/region0](https://github.com/camunda/c8-multi-region/blob/main/aws/dual-region/kubernetes/region0/) it contains the example Helm values yaml `camunda-values-failover.yml` containing the required overlay for the **failover** mode.

In the case your **Region 0** was lost, please consider the folder [aws/dual-region/kubernetes/region1](https://github.com/camunda/c8-multi-region/blob/main/aws/dual-region/kubernetes/region1/). We will refrain from mentioning both possibilities always but as you can see it's simply the other way around in case of the loss of the **Region 0**.

The chosen `camunda-values-failover.yml` requires adjustments before installing the Helm chart.

- `ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS`
- `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL`
- `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL`

1. The bash script [generate_zeebe_helm_values.sh](https://github.com/camunda/c8-multi-region/blob/main/aws/dual-region/scripts/generate_zeebe_helm_values.sh) in the repository folder `aws/dual-region/scripts/` helps generate those values. You only have to copy and replace them within the previously mentioned yaml. It will use the exported environment variables of the environment prerequisites for namespaces and regions. Additionally, you have to pass in whether your region 0 or 1 was lost.

```bash
./generate_zeebe_helm_values.sh failover

# It will ask you to provide the following values
# Enter the region that was lost, values can either be 0 or 1:
## In our case we lost region 1, therefore input 1
# Enter Helm release name used for installing Camunda 8 in both Kubernetes clusters:
## the way you'll call the Helm release, for example camunda
# Enter Zeebe cluster size (total number of Zeebe brokers in both Kubernetes clusters):
## for a dual-region setup we recommend 8. Resulting in 4 brokers per region.
```

#### Verification

</div>

  </TabItem>
  <TabItem value="step3" label="Step 3">

#### Adjust Elasticsearch Exporters Endpoints to Temporary Deployment

<StateContainer
current={<Six viewBox="140 0 680 500" />}
desired={<Seven viewBox="140 0 680 500" />}
/>

<div>

#### Current

Zeebe won't be able to continue processing yet since the existing Zeebe brokers are still pointing at the Elasticsearch of the lost region.

Simply disabling the exporter would not be enough since the sequence numbers are not persistent when an exporter removed and those are required by the WebApps importers.

#### Desired

You are reconfiguring the existing Camunda Platform setup to point Zeebe to the temporary Elasticsearch instance. This will result in Zeebe being operational again.

#### How to get there

```bash reference title="Example"
https://github.com/camunda/zeebe/blob/main/NOTICE.txt
```

#### Verification

</div>
  </TabItem>
</Tabs>

### Failback

<Tabs queryString="failback">
  <TabItem value="step1" label="Step 1" default>

#### Deploy Camunda 8 in Failback Mode in Newly Created Region

<StateContainer
current={<Seven viewBox="140 0 680 500" />}
desired={<Nine viewBox="140 0 680 500" />}
/>

<div>

#### Current

You have temporary Zeebe brokers deployed in failover mode together with a temporary Elasticsearch within the same surviving region.

#### Desired

You want to restore the dual-region functionality again and deploy Zeebe in failback mode to the newly restored region.

Failback mode means that two brokers will be added to the cluster to allow processing and restore data. While two brokers are sleeping since you still have the temporary setup that you have to transfer.

An Elasticsearch will also be deployed but not used yet since you have to restore a backup from the temporary setup.

#### How to get there

#### Verification

</div>
  </TabItem>
  <TabItem value="step2" label="Step 2">

#### Pause Elasticsearch Exporters and WebApps

<StateContainer
current={<Nine viewBox="140 0 680 500" />}
desired={<Ten viewBox="140 0 680 500" />}
/>

<div>

#### Current

You currently have the following setups:

- Healthy Camunda Platform
- Camunda Platform in failover mode within the same region as the healthy setup
- Camunda Platform in failback mode within a newly created region

#### Desired

You are preparing everything for the newly created region to take over again to restore the benefits of a dual-region setup.

For this, you need to stop the Zeebe exporters to not export any new data to Elasticsearch, so you can create a backup.

Additionally, you need to scale down the WebApps. This will result in users not being able to interact with the Camunda Platform anymore and is required to guarantee no new data is imported to Elasticsearch.

#### How to get there

#### Verification

</div>
  </TabItem>
  <TabItem value="step3" label="Step 3">

#### Create and Restore Elasticsearch Backup

<StateContainer
current={<Ten viewBox="140 0 680 500" />}
desired={<Eleven viewBox="140 0 680 500" />}
/>

<div>

#### Current

The Camunda Platform is currently not reachable by end-users and does not process any new processes to allow creating a backup of Elasticsearch without losing any new data.

#### Desired

You are creating a backup within the temporary Elasticsearch instance and restore it in the new region.

#### How to get there

#### Verification

</div>

  </TabItem>
  <TabItem value="step4" label="Step 4">

#### Adjust Elasticsearch Exporters Endpoints to Newly Created Region

<StateContainer
current={<Eleven viewBox="140 0 680 500" />}
desired={<Twelve viewBox="140 0 680 500" />}
/>

<div>

#### Current

The backup of Elasticsearch has been created and restored to the new region.

The Camunda Platform remains unreachable by end-users as you proceed to restore functionality.

#### Desired

You are pointing all Camunda Platforms from the temporary Elasticsearch to the Elasticsearch in the new region.

The exporters will remain paused but ultimately data will be exported to both regions again.

#### How to get there

#### Verification

</div>
  </TabItem>
  <TabItem value="step5" label="Step 5">

#### Reactivate Exporters and WebApps

<StateContainer
current={<Twelve viewBox="140 0 680 500" />}
desired={<Thirteen viewBox="140 0 680 500" />}
/>

<div>

#### Current

The Camunda Platforms are pointing at the Elasticsearch instances in both regions again and not the temporary instance. It still remains unreachable to the end-users and no processes are advanced.

#### Desired

You are reactivating the exporters and enabling the WebApps again within the two regions. This will allow users to interact with the Camunda Platform again.

#### How to get there

#### Verification

</div>
  </TabItem>
  <TabItem value="step6" label="Step 6">

#### Remove Temporary Failover Installation

<StateContainer
current={<Thirteen viewBox="140 0 680 500" />}
desired={<Fourteen viewBox="140 0 680 500" />}
/>

<div>

#### Current

The Camunda Platform is healthy and running in two regions again.

#### Desired

You can remove the temporary failover solution since it is not required anymore.

#### How to get there

#### Verification

</div>
  </TabItem>
  <TabItem value="step7" label="Step 7">

#### Switch to Normal Mode in Zeebe for Newly Created Region

<StateContainer
current={<Fourteen viewBox="140 0 680 500" />}
desired={<Fifteen viewBox="140 0 680 500" />}
/>

<div>

#### Current

Only the two Camunda Platform regions remain, without any temporary solution.

The failback mode in the new region is still active.

#### Desired

You restore the new region to its normal functionality by removing the failback mode and forcefully removing the sleeping Zeebe pods.

They would otherwise hinder the rollout since they will never be ready.

#### How to get there

#### Verification

</div>
  </TabItem>
</Tabs>
