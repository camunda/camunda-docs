---
id: dual-region-operational-procedure
title: "Dual-Region Operational Procedure"
sidebar_label: "Dual-Region Operational Procedure"
description: "The operational procedure concerning dual-region setups to recover from a region loss."
---

import Swip from './swip.jsx';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import SwipItem from './swipItem';

<!-- Failover -->

import Three from './img/3.svg';
import Four from './img/4.svg';
import Five from './img/5.svg';
import Six from './img/6.svg';
import Seven from './img/7.svg';

<!-- Fallback -->

import Nine from './img/9.svg';
import Ten from './img/10.svg';
import Eleven from './img/11.svg';
import Twelve from './img/12.svg';
import Thirteen from './img/13.svg';
import Fourteen from './img/14.svg';
import Fifteen from './img/15.svg';

## Introduction

The operational procedure is a step-by-step guide on how to proceed in the case of a total region failure. Allowing you to temporarily restore functionality and ultimately do a full recovery to restore the dual-region.

## Disclaimer

:::danger

- Customers must develop and test operational procedures in non-production environments based on the framework steps outlined by Camunda.
- Before advancing to production go-live, it is essential for customers to validate these procedures with Camunda.

:::

## Procedure

We don't differ between primary and secondary regions as the procedure is the same for either loss. We will focus on losing the secondary region (passive) while still having the primary region (active).

You'll have to take care of DNS considerations by rerouting traffic to the functioning region, which are disregarded in the following.

After identifying or considering a region as lost, you should ensure that it doesn't reconnect, as this will hinder a successful recovery during failover and failback execution. <!-- Again, from what point on is a region loss fatal -->

We will first look at the failover procedure, which is responsible for temporarily recovering the operations to unblock those. Zeebe cannot export and process any new data as long as it can't export those to ElasticSearch.

Afterwards, the failback procedure is responsible for recovering a region.

### Failover

<Tabs>
  <TabItem value="step1" label="Step 1" default>
    <SwipItem 
      current={<Three viewBox="140 0 680 500" />}
      desired={<Four viewBox="140 0 680 500" />}
    />
<div>

#### Current

The current state is that one of the regions is lost. This will result in Zeebe not being able to advance any new processes anymore since it
can't export data anymore as one of the ElasticSearch instances is unreachable. Neither would it export to the local region since exporters are
invoked sequentially.

#### Desired

For the failover procedure, we need to ensure that the lost region does not accidentally reconnect. You should be sure that the it really is lost and if so look into measures that it doesn't reconnect.

#### How to get there

Potential approaches are the following:

- [Kubernetes Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- Firewall rules to block the traffic from the lost region

</div>
  </TabItem>
  <TabItem value="step2" label="Step 2">
    <SwipItem
      current={<Five viewBox="140 0 680 500" />}
      desired={<Six viewBox="140 0 680 500" />}
    />
<div>

#### Current

You have made sure by previous measures, e.g. firewall rules that the lost region does not reconnect during the failover procedure.

Due to the partitioning of Zeebe, no data has been lost so far.

#### Desired

You are creating a temporary Camunda Platform deployment within the same region, but different namespace, to recover functionality.

The newly deployed Zeebe brokers will be running in failover mode to restore the quorum and allow processing again. Additionally, they will be pointed at the existing ElasticSearch instance and the newly deployed ElasticSearch instance.

#### How to get there

</div>

  </TabItem>
  <TabItem value="step3" label="Step 3">
    <SwipItem
      current={<Six viewBox="140 0 680 500" />}
      desired={<Seven viewBox="140 0 680 500" />}
    />
<div>

#### Current

Zeebe won't be able to continue processing yet since the existing Zeebe brokers are still pointing at the ElasticSearch of the lost region.

Simply disabling the exporter would not be enough since the sequence numbers are not persistent when an exporter removed and those are required by the WebApps importers.

#### Desired

You are reconfiguring the existing Camunda Platform setup to point Zeebe to the temporary ElasticSearch instance. This will result in Zeebe being operational again.

#### How to get there

```bash reference title="Example"
https://github.com/camunda/zeebe/blob/main/NOTICE.txt
```

</div>
  </TabItem>
</Tabs>

### Fallback

<Tabs>
  <TabItem value="step1" label="Step 1" default>
    <SwipItem
      current={<Seven viewBox="140 0 680 500" />}
      desired={<Nine viewBox="140 0 680 500" />}
    />
<div>

#### Current

You have temporary Zeebe brokers deployed in failover mode together with a temporary ElasticSearch within the same surviving region.

#### Desired

You want to restore the dual-region functionality again and deploy Zeebe in fallback mode to the newly restored region.

Fallback mode means that two brokers will be added to the cluster to allow processing and restore data. While two brokers are sleeping since you still have the temporary setup that you have to transfer.

An ElasticSearch will also be deployed but not used yet since you have to restore a backup from the temporary setup.

#### How to get there

</div>
  </TabItem>
  <TabItem value="step2" label="Step 2">
    <SwipItem 
      current={<Nine viewBox="140 0 680 500" />}
      desired={<Ten viewBox="140 0 680 500" />}
    />
<div>

#### Current

You currently have the following setups:

- Healthy Camunda Platform
- Camunda Platform in failover mode within the same region as the healthy setup
- Camunda Platform in fallback mode within a newly created region

#### Desired

You are preparing everything for the newly created region to take over again to restore the benefits of a dual-region setup.

For this, you need to stop the Zeebe exporters to not export any new data to ElasticSearch, so you can create a backup.

Additionally, you need to scale down the WebApps. This will result in users not being able to interact with the Camunda Platform anymore and is required to guarantee no new data is imported to ElasticSearch.

#### How to get there

</div>
  </TabItem>
  <TabItem value="step3" label="Step 3">
    <SwipItem
      current={<Ten viewBox="140 0 680 500" />}
      desired={<Eleven viewBox="140 0 680 500" />}
    />
<div>

#### Current

The Camunda Platform is currently not reachable by end-users and does not process any new processes to allow creating a backup of ElasticSearch without losing any new data.

#### Desired

You are creating a backup within the temporary ElasticSearch instance and restore it in the new region.

#### How to get there

</div>

  </TabItem>
  <TabItem value="step4" label="Step 4">
    <SwipItem
      current={<Eleven viewBox="140 0 680 500" />}
      desired={<Twelve viewBox="140 0 680 500" />}
    />
<div>

#### Current

The backup of ElasticSearch has been created and restored to the new region.

The Camunda Platform remains unreachable by end-users as you proceed to restore functionality.

#### Desired

You are pointing all Camunda Platforms from the temporary ElasticSearch to the ElasticSearch in the new region.

The exporters will remain paused but ultimately data will be exported to both regions again.

#### How to get there

</div>
  </TabItem>
  <TabItem value="step5" label="Step 5">
    <SwipItem
      current={<Twelve viewBox="140 0 680 500" />}
      desired={<Thirteen viewBox="140 0 680 500" />}
    />
<div>

#### Current

The Camunda Platforms are pointing at the ElasticSearch instances in both regions again and not the temporary instance. It still remains unreachable to the end-users and no processes are advanced.

#### Desired

You are reactivating the exporters and enabling the WebApps again within the two regions. This will allow users to interact with the Camunda Platform again.

#### How to get there

</div>
  </TabItem>
  <TabItem value="step6" label="Step 6">
    <SwipItem
      current={<Thirteen viewBox="140 0 680 500" />}
      desired={<Fourteen viewBox="140 0 680 500" />}
    />
<div>

#### Current

The Camunda Platform is healthy and running in two regions again.

#### Desired

You can remove the temporary failover solution since it is not required anymore.

#### How to get there

</div>
  </TabItem>
  <TabItem value="step7" label="Step 7">
    <SwipItem
      current={<Fourteen viewBox="140 0 680 500" />}
      desired={<Fifteen viewBox="140 0 680 500" />}
    />
<div>

#### Current

Only the two Camunda Platform regions remain, without any temporary solution.

The fallback mode in the new region is still active.

#### Desired

You restore the new region to its normal functionality by removing the fallback mode and forcefully removing the sleeping Zeebe pods.

They would otherwise hinder the rollout since they will never be ready.

#### How to get there

</div>
  </TabItem>
</Tabs>
