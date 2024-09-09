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

import Four from './img/4.svg';
import Five from './img/5.svg';
import Six from './img/6.svg';

<!-- Failback -->

import Eight from './img/8.svg';
import Nine from './img/9.svg';
import Ten from './img/10.svg';
import Eleven from './img/11.svg';
import Twelve from './img/12.svg';
import Thirteen from './img/13.svg';
import Fourteen from './img/14.svg';

:::info

This procedure has been updated in the Camunda 8.6 release. The procedure used in Camunda 8.5 has been deprecated, and compatibility will be removed in the 8.7 release.

:::

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
    - [Helm (3.x)](https://helm.sh/docs/intro/install/) for installing and upgrading the [Camunda Helm chart](https://github.com/camunda/camunda-platform-helm).
    - [Kubectl (1.30.x)](https://kubernetes.io/docs/tasks/tools/#kubectl) to interact with the Kubernetes cluster.
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

We handle the loss of both active and passive regions using the same procedure. For clarity, this section focuses on the scenario where the passive region is lost while the active region remains operational.

#### Key Steps to Handle Passive Region Loss

1. **Traffic Rerouting:** reroute traffic to the surviving active region using DNS. (Details on how to manage DNS rerouting depend on your specific DNS setup and are not covered in this guide.)
2. **Prevent Reconnection:** ensure that the lost region cannot reconnect before starting the restoration procedure. Reconnection could interfere with a successful recovery during failover and failback.
3. **Temporary Loss Scenario:** if the region loss is temporary (e.g., due to network issues), Zeebe can survive this loss but may stop processing due to quorum loss. This could lead to persistent disk filling up before data is lost.
4. **Procedure Phases**
   - **Failover Phase:** Temporarily restores Camunda 8 functionality by removing the lost brokers and handling the export to the unreachable Elasticsearch instance.
   - **Failback Phase:** Fully restores the failed region to its original functionality. This phase requires the region to be ready for the redeployment of Camunda 8.

:::warning

For the **failback** procedure, your recreated region cannot contain any active Camunda 8 deployments or leftover persistent volumes related to Camunda 8 or its Elasticsearch instance. You must start from a clean slate and not bring old data from the lost region, as states may have diverged.

:::

The following procedures are building on top of the work done in the [AWS setup guide](/self-managed/setup/deploy/amazon/amazon-eks/dual-region.md#deploy-camunda-8-to-the-clusters) about deploying Camunda 8 to two Kubernetes clusters in different regions. We assume you have your own copy of the [c8-multi-region](https://github.com/camunda/c8-multi-region) repository and previously completed changes in the `camunda-values.yml` to adjust them to your setup.

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
export CAMUNDA_NAMESPACE_RECREATED=$CAMUNDA_NAMESPACE_1
export REGION_SURVIVING=region0
export REGION_RECREATED=region1
```

  </TabItem>
</Tabs>

### Failover

<Tabs queryString="failover">
  <TabItem value="step1" label="Step 1" default>

#### Remove lost brokers from Zeebe cluster in the surviving region

<StateContainer
current={<Four viewBox="140 40 680 500" />}
desired={<Five viewBox="140 40 680 500" />}
/>

<div>

| **Current State**                                                                                                                                   | **Desired State**                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The lost region has been ensured not to reconnect during the failover procedure. <br /> <br /> No data has been lost due to Zeebe data replication. | The lost brokers have been removed from the Zeebe cluster. <br /> <br /> Continued processing is enabled, and new brokers in the failback procedure will only join the cluster with our intervention. |

One of the regions is lost, meaning Zeebe:

- Is unable to process new requests due to losing the quorum
- Stops exporting new data to Elasticsearch in the lost region
- Stops exporting new data to Elasticsearch in the survived region

You have previously ensured that the lost region cannot reconnect during the failover procedure.

Due to the Zeebe data replication, no data has been lost.

#### How to get there

You will port-forward the `Zeebe Gateway` in the surviving region to the local host to interact with the Gateway.

The following alternatives to port-forwarding are possible:

- if it's exposed to the outside, one can skip port-forwarding and use the URL directly
- one can [`exec`](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_exec/) into an existing pod (such as Elasticsearch), and `curl` from there
- or temporarily [`run`](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_run/) an Ubuntu pod in the cluster to `curl` from there

In our example, we went with port-forwarding to a local host, but other alternatives can also be used.

1. Use the [zbctl client](../../../apis-tools/cli-client/index.md) to retrieve list of remaining brokers

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
Gateway version: 8.6.0
Brokers:
  Broker 0 - camunda-zeebe-0.camunda-zeebe.camunda-london.svc:26501
    Version: 8.6.0
    Partition 1 : Leader, Healthy
    Partition 6 : Follower, Healthy
    Partition 7 : Follower, Healthy
    Partition 8 : Follower, Healthy
  Broker 2 - camunda-zeebe-1.camunda-zeebe.camunda-london.svc:26501
    Version: 8.6.0
    Partition 1 : Follower, Healthy
    Partition 2 : Follower, Healthy
    Partition 3 : Follower, Healthy
    Partition 8 : Leader, Healthy
  Broker 4 - camunda-zeebe-2.camunda-zeebe.camunda-london.svc:26501
    Version: 8.6.0
    Partition 2 : Follower, Healthy
    Partition 3 : Leader, Healthy
    Partition 4 : Follower, Healthy
    Partition 5 : Follower, Healthy
  Broker 6 - camunda-zeebe-3.camunda-zeebe.camunda-london.svc:26501
    Version: 8.6.0
    Partition 4 : Follower, Healthy
    Partition 5 : Follower, Healthy
    Partition 6 : Follower, Healthy
    Partition 7 : Leader, Healthy
```

  </summary>
</details>

2. Portforward the service of the Zeebe Gateway for the [management REST API](../../zeebe-deployment/configuration/gateway.md#managementserver)

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$HELM_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
```

3. Based on the [Cluster Scaling APIs](../../zeebe-deployment/operations/cluster-scaling.md), send a request to the Zeebe Gateway to redistribute the load to the remaining brokers, thereby removing the lost brokers.
   In our example, we have lost region 1 and with that our uneven brokers. This means we will have to redistribute to our existing even brokers.

```bash
curl -XPOST 'http://localhost:9600/actuator/cluster/brokers?force=true' -H 'Content-Type: application/json' -d '["0", "2", "4", "6"]'
```

#### Verification

Port-forwarding the Zeebe Gateway via `kubectl` and printing the topology should reveal that the cluster size has decreased to 4, partitions have been redistributed over the remaining brokers, and new leaders have been elected.

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$HELM_RELEASE_NAME-zeebe-gateway 26500:26500 -n $CAMUNDA_NAMESPACE_SURVIVING
zbctl status --insecure --address localhost:26500
```

<details>
  <summary>Example output</summary>
  <summary>

```bash
Cluster size: 4
Partitions count: 8
Replication factor: 2
Gateway version: 8.6.0
Brokers:
  Broker 0 - camunda-zeebe-0.camunda-zeebe.camunda-london.svc:26501
    Version: 8.6.0
    Partition 1 : Leader, Healthy
    Partition 6 : Leader, Healthy
    Partition 7 : Follower, Healthy
    Partition 8 : Follower, Healthy
  Broker 2 - camunda-zeebe-1.camunda-zeebe.camunda-london.svc:26501
    Version: 8.6.0
    Partition 1 : Follower, Healthy
    Partition 2 : Leader, Healthy
    Partition 3 : Follower, Healthy
    Partition 8 : Leader, Healthy
  Broker 4 - camunda-zeebe-2.camunda-zeebe.camunda-london.svc:26501
    Version: 8.6.0
    Partition 2 : Follower, Healthy
    Partition 3 : Leader, Healthy
    Partition 4 : Follower, Healthy
    Partition 5 : Follower, Healthy
  Broker 6 - camunda-zeebe-3.camunda-zeebe.camunda-london.svc:26501
    Version: 8.6.0
    Partition 4 : Leader, Healthy
    Partition 5 : Leader, Healthy
    Partition 6 : Follower, Healthy
    Partition 7 : Leader, Healthy
```

  </summary>
</details>

You can also use the Zeebe Gateway's REST API to ensure the scaling progress has been completed. For better readability of the output, it is recommended to use [jq](https://jqlang.github.io/jq/).

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$HELM_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
curl -XGET 'http://localhost:9600/actuator/cluster' | jq .lastChange
```

<details>
  <summary>Example output</summary>
  <summary>

```bash
{
  "id": 2,
  "status": "COMPLETED",
  "startedAt": "2024-08-23T11:33:08.355681311Z",
  "completedAt": "2024-08-23T11:33:09.170531963Z"
}
```

  </summary>
</details>

</div>

  </TabItem>
  <TabItem value="step2" label="Step 2">

#### Configure Zeebe to disable the Elastic exporter to the lost region

<StateContainer
current={<Five viewBox="140 40 680 500" />}
desired={<Six viewBox="140 40 680 500" />}
/>

<div>

| **Details**             | **Current State**                                                                                                     | **Desired State**                                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Zeebe Configuration** | Zeebe brokers in the surviving region are still configured to point to the Elasticsearch instance of the lost region. | Elasticsearch exporter to the failed region has been disabled in the Zeebe cluster.               |
| **Export Capability**   | Zeebe cannot continue exporting data.                                                                                 | Zeebe can export data to Elasticsearch again.                                                     |
| **User Interaction**    | Regular interaction with Camunda 8 is not restored.                                                                   | Regular interaction with Camunda 8 is restored, marking the conclusion of the temporary recovery. |

#### How to get there

1. Portforward the service of the Zeebe Gateway for the [management REST API](../../zeebe-deployment/configuration/gateway.md#managementserver)

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$HELM_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
```

2. List all exporters to find the corresponding ID. Alternatively, you can check your `camunda-values.yml` file, which lists the exporters as those had to be configured explicitly.

```bash
curl -XGET 'http://localhost:9600/actuator/exporters'
```

<details>
  <summary>Example output</summary>
  <summary>

```bash
[{"exporterId":"elasticsearchregion0","status":"ENABLED"},{"exporterId":"elasticsearchregion1","status":"ENABLED"}]
```

  </summary>
</details>

2. Based on the [Exporter APIs](../../zeebe-deployment/operations/cluster-scaling.md) you will send a request to the Zeebe Gateway to disable the Elasticsearch exporter to the lost region.

```bash
curl -XPOST 'http://localhost:9600/actuator/exporters/elasticsearchregion1/disable'
```

#### Verification

Port-forwarding the Zeebe Gateway via `kubectl` for the REST API and listing all exporters will reveal their current status.

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$HELM_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
curl -XGET 'http://localhost:9600/actuator/exporters'
```

<details>
  <summary>Example output</summary>
  <summary>

```bash
[{"exporterId":"elasticsearchregion0","status":"ENABLED"},{"exporterId":"elasticsearchregion1","status":"DISABLED"}]
```

  </summary>
</details>

Via the already port-forwarded Zeebe Gateway, you can also check the status of the change by using the Cluster API.

```bash
curl -XGET 'http://localhost:9600/actuator/cluster' | jq .lastChange
```

<details>
  <summary>Example output</summary>
  <summary>

```bash
{
  "id": 4,
  "status": "COMPLETED",
  "startedAt": "2024-08-23T11:36:14.127510679Z",
  "completedAt": "2024-08-23T11:36:14.379980715Z"
}
```

  </summary>
</details>

</div>
  </TabItem>
</Tabs>

### Failback

<Tabs queryString="failback">
  <TabItem value="step1" label="Step 1" default>

#### Deploy Camunda 8 in the newly created region

<StateContainer
current={<Six viewBox="140 40 680 500" />}
desired={<Eight viewBox="140 40 680 500" />}
/>

<div>

| **Details**              | **Current State**                                                                                                   | **Desired State**                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Camunda 8 Setup**      | A standalone region with a fully functional Camunda 8 setup, including Zeebe, Operate, Tasklist, and Elasticsearch. | Restore dual-region functionality by deploying Camunda 8 (Zeebe and Elasticsearch) to the newly restored region.  |
| **Operate and Tasklist** | Operate and Tasklist are operational in the standalone region.                                                      | Operate and Tasklist should remain disabled to avoid interference during the database backup and restore process. |

#### How to get there

From your initial dual-region deployment, your base Helm values file `camunda-values.yml` in `aws/dual-region/kubernetes` should still be present.

In particular, the values `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL` and `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL` should point to their respective regions. The placeholder in `ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS` should contain the Zeebe endpoints of both regions, the result of the `aws/dual-region/scripts/generate_zeebe_helm_values.sh`.

In addition, the following Helm command will disable Operate and Tasklist since those will only be enabled at the end of the full region restore. It's required to keep them disabled in the newly created region due to their Elasticsearch importers.

From the terminal context of `aws/dual-region/kubernetes` execute:

```bash
helm install $HELM_RELEASE_NAME camunda/camunda-platform \
  --version $HELM_CHART_VERSION \
  --kube-context $CLUSTER_RECREATED \
  --namespace $CAMUNDA_NAMESPACE_RECREATED \
  -f camunda-values.yml \
  -f $REGION_RECREATED/camunda-values.yml \
  --set operate.enabled=false \
  --set tasklist.enabled=false
```

#### Verification

The following command will show the deployed pods of the newly created region.

Depending on your chosen `clusterSize`, you should see that half of the amount are spawned in Zeebe brokers.

For example, in the case of `clusterSize: 8`, you find four Zeebe brokers in the newly created region.

:::warning
It is expected that the Zeebe broker pods don't become ready as they're not yet part of a Zeebe cluster, therefore not considered healthy by the Kubernetes readiness probe.
:::

```bash
kubectl --context $CLUSTER_RECREATED get pods -n $CAMUNDA_NAMESPACE_RECREATED
```

Port-forwarding the Zeebe Gateway via `kubectl` and printing the topology should reveal that the new Zeebe brokers are recognized but yet a full member of the Zeebe cluster.

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$HELM_RELEASE_NAME-zeebe-gateway 26500:26500 -n $CAMUNDA_NAMESPACE_SURVIVING
zbctl status --insecure --address localhost:26500
```

<details>
  <summary>Example Output</summary>
  <summary>

```bash
Cluster size: 4
Partitions count: 8
Replication factor: 2
Gateway version: 8.6.0
Brokers:
  Broker 0 - camunda-zeebe-0.camunda-zeebe.camunda-london.svc:26501
    Version: 8.6.0
    Partition 1 : Leader, Healthy
    Partition 6 : Follower, Healthy
    Partition 7 : Follower, Healthy
    Partition 8 : Leader, Healthy
  Broker 1 - camunda-zeebe-0.camunda-zeebe.camunda-paris.svc:26501
    Version: 8.6.0
  Broker 2 - camunda-zeebe-1.camunda-zeebe.camunda-london.svc:26501
    Version: 8.6.0
    Partition 1 : Follower, Healthy
    Partition 2 : Leader, Healthy
    Partition 3 : Leader, Healthy
    Partition 8 : Follower, Healthy
  Broker 3 - camunda-zeebe-1.camunda-zeebe.camunda-paris.svc:26501
    Version: 8.6.0
  Broker 4 - camunda-zeebe-2.camunda-zeebe.camunda-london.svc:26501
    Version: 8.6.0
    Partition 2 : Follower, Healthy
    Partition 3 : Follower, Healthy
    Partition 4 : Leader, Healthy
    Partition 5 : Leader, Healthy
  Broker 5 - camunda-zeebe-2.camunda-zeebe.camunda-paris.svc:26501
    Version: 8.6.0
  Broker 6 - camunda-zeebe-3.camunda-zeebe.camunda-london.svc:26501
    Version: 8.6.0
    Partition 4 : Follower, Healthy
    Partition 5 : Follower, Healthy
    Partition 6 : Leader, Healthy
    Partition 7 : Leader, Healthy
  Broker 7 - camunda-zeebe-3.camunda-zeebe.camunda-london.svc:26501
    Version: 8.6.0
```

  </summary>
</details>

</div>
  </TabItem>
  <TabItem value="step2" label="Step 2">

#### Pause Zeebe exporters to Elasticsearch, pause Operate and Tasklist

<StateContainer
current={<Eight viewBox="140 40 680 500" />}
desired={<Nine viewBox="140 40 680 500" />}
/>

<div>

| **Details**              | **Current State**                                                                                                                                                                     | **Desired State**                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Zeebe Cluster Setup**  | Functioning Zeebe cluster within a single region: <br/> Working Camunda 8 installation in the surviving region <br/> Non-participating Camunda 8 installation in the recreated region | Preparing the newly created region to take over and restore the dual-region setup.                                                                              |
| **Elasticsearch Export** | Currently exporting data to Elasticsearch from the surviving region.                                                                                                                  | Stop Zeebe exporters to prevent new data from being exported to Elasticsearch, allowing for the creation of an Elasticsearch backup.                            |
| **Operate and Tasklist** | Operate and Tasklist are operational in the surviving region.                                                                                                                         | Temporarily scale down Operate and Tasklist to zero replicas, preventing user interaction with Camunda 8 and ensuring no new data is imported to Elasticsearch. |

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

For the Zeebe Elasticsearch exporters, there's currently no API available to confirm this. Only the response code of `204` indicates a successful disabling. This is a synchronous operation.

</div>
  </TabItem>
  <TabItem value="step3" label="Step 3">

#### Create and restore Elasticsearch backup

<StateContainer
current={<Nine viewBox="140 40 680 500" />}
desired={<Ten viewBox="140 40 680 500" />}
/>

<div>

| **Details**              | **Current State**                                                                                                        | **Desired State**                                                                                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Camunda Components**   | Not reachable by end-users and not processing any new process instances. This state allows for data backup without loss. | Creating a backup of the main Elasticsearch instance in the surviving region and restoring it in the recreated region. Backup process may take time to complete. |
| **Elasticsearch Backup** | No backup is in progress.                                                                                                | Backup of Elasticsearch in the surviving region is initiated and being restored in the recreated region, containing all necessary data.                          |

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
kubectl --context $CLUSTER_SURVIVING exec -n $CAMUNDA_NAMESPACE_SURVIVING -it $ELASTIC_POD -c elasticsearch -- curl -XPUT 'http://localhost:9200/_snapshot/camunda_backup' -H 'Content-Type: application/json' -d'
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
kubectl --context $CLUSTER_SURVIVING exec -n $CAMUNDA_NAMESPACE_SURVIVING -it $ELASTIC_POD -c elasticsearch -- curl -XPUT 'http://localhost:9200/_snapshot/camunda_backup/failback?wait_for_completion=true'
```

4. Verify the backup has been completed successfully by checking all backups and ensuring the `state` is `SUCCESS`:

```bash
kubectl --context $CLUSTER_SURVIVING exec -n $CAMUNDA_NAMESPACE_SURVIVING -it $ELASTIC_POD -c elasticsearch -- curl -XGET 'http://localhost:9200/_snapshot/camunda_backup/_all'
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
kubectl --context $CLUSTER_RECREATED exec -n $CAMUNDA_NAMESPACE_RECREATED -it $ELASTIC_POD -c elasticsearch -- curl -XPUT 'http://localhost:9200/_snapshot/camunda_backup' -H 'Content-Type: application/json' -d'
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
kubectl --context $CLUSTER_RECREATED exec -n $CAMUNDA_NAMESPACE_RECREATED -it $ELASTIC_POD -c elasticsearch -- curl -XGET 'http://localhost:9200/_snapshot/camunda_backup/_all'
```

The example output above should be the same since it's the same backup.

7. Restore Elasticsearch backup in the new region namespace `CAMUNDA_NAMESPACE_RECREATED`. Depending on the amount of data, this operation will take a while to complete.

```bash
kubectl --context $CLUSTER_RECREATED exec -n $CAMUNDA_NAMESPACE_RECREATED -it $ELASTIC_POD -c elasticsearch -- curl -XPOST 'http://localhost:9200/_snapshot/camunda_backup/failback/_restore?wait_for_completion=true'
```

8. Verify that the restore has been completed successfully in the new region:

```bash
kubectl --context $CLUSTER_RECREATED exec -n $CAMUNDA_NAMESPACE_RECREATED -it $ELASTIC_POD -c elasticsearch -- curl -XGET 'http://localhost:9200/_snapshot/camunda_backup/failback/_status'
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

#### Start Operate and Tasklist again

<StateContainer
current={<Ten viewBox="140 40 680 500" />}
desired={<Eleven viewBox="140 40 680 500" />}
/>

<div>

| **Details**              | **Current State**                                              | **Desired State**                                                                                                       |
| ------------------------ | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Elasticsearch Backup** | Backup has been created and restored to the recreated region.  | N/A                                                                                                                     |
| **Camunda Components**   | Remain unreachable by end-users while restoring functionality. | Enable Operate and Tasklist in both the surviving and recreated regions to allow user interaction with Camunda 8 again. |

#### How to get there

The base Helm values file `camunda-values.yml` in `aws/dual-region/kubernetes` contains the adjustments for Elasticsearch and the Zeebe initial brokers, meaning we just have to reapply / upgrade the release to enable and deploy Operate and Tasklist.

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
  -f $REGION_RECREATED/camunda-values.yml
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

</div>
  </TabItem>
  <TabItem value="step5" label="Step 5">

#### Initialize new Zeebe exporter to recreated region

<StateContainer
current={<Eleven viewBox="140 40 680 500" />}
desired={<Twelve viewBox="140 40 680 500" />}
/>

<div>

| **Details**                 | **Current State**                                   | **Desired State**                                                                                     |
| --------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Camunda 8 Accessibility** | Reachable to end-users, but not exporting any data. | Start a new exporter to the recreated region.                                                         |
| **Data Exporting**          | No data export currently in progress.               | Ensure that both Elasticsearch instances are populated for data redundancy.                           |
| **Procedure Step**          | Data export is paused.                              | Separate the initialization step (asynchronous) and confirm completion before resuming the exporters. |

#### How to get there

1. Initialize the new exporter for the recreated region by sending an API request via the Zeebe Gateway:

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$HELM_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
curl -XPOST 'http://localhost:9600/actuator/exporters/elasticsearchregion1/enable' -H 'Content-Type: application/json' -d '{"initializeFrom" : "elasticsearchregion0"}'
```

#### Verification

Port-forwarding the Zeebe Gateway via `kubectl` for the REST API and listing all exporters will reveal their current status.

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$HELM_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
curl -XGET 'http://localhost:9600/actuator/exporters'
```

<details>
  <summary>Example output</summary>
  <summary>

```bash
[{"exporterId":"elasticsearchregion0","status":"ENABLED"},{"exporterId":"elasticsearchregion1","status":"ENABLED"}]
```

  </summary>
</details>

Via the already port-forwarded Zeebe Gateway, you can also check the status of the change by using the Cluster API.

**Ensure it says "COMPLETED" before proceeding with the next step.**

```bash
curl -XGET 'http://localhost:9600/actuator/cluster' | jq .lastChange
```

<details>
  <summary>Example output</summary>
  <summary>

```bash
{
  "id": 6,
  "status": "COMPLETED",
  "startedAt": "2024-08-23T12:54:07.968549269Z",
  "completedAt": "2024-08-23T12:54:09.282558853Z"
}
```

  </summary>
</details>

</div>
</TabItem>
  <TabItem value="step6" label="Step 6">

#### Reactivate Zeebe exporter

<StateContainer
current={<Twelve viewBox="140 40 680 500" />}
desired={<Thirteen viewBox="140 40 680 500" />}
/>

<div>

| **Details**                 | **Current State**                                                       | **Desired State**                                  |
| --------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------- |
| **Camunda 8 Accessibility** | Reachable to end-users, but currently not exporting any data.           | Reactivate existing exporters.                     |
| **Elasticsearch Exporters** | Enabled for both regions, with the operation confirmed to be completed. | Allow Zeebe to export data to Elasticsearch again. |

#### How to get there

1. Reactivate the exporters by sending the [exporting API](./../../zeebe-deployment/operations/management-api.md#exporting-api) activation request via the Zeebe Gateway:

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$HELM_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
curl -i localhost:9600/actuator/exporting/resume -XPOST
# The successful response should be:
# HTTP/1.1 204 No Content
```

#### Verification

For the reactivating the exporters, there's currently no API available to confirm this. Only the response code of `204` indicates a successful resumption. This is a synchronous operation.

</div>
  </TabItem>
  <TabItem value="step7" label="Step 7">

#### Add new brokers to the Zeebe cluster

<StateContainer
current={<Thirteen viewBox="140 40 680 500" />}
desired={<Fourteen viewBox="140 40 680 500" />}
/>

<div>

| **Details**              | **Current State**                                                                                                                  | **Desired State**                                                                             |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Camunda 8 Deployment** | Running in two regions, but not yet utilizing all Zeebe brokers. Operate and Tasklist redeployed, Elasticsearch exporters enabled. | Fully functional Camunda 8 setup utilizing both regions, recovering all dual-region benefits. |
| **User Interaction**     | Users can interact with Camunda 8 again.                                                                                           | Dual-region functionality is restored, maximizing reliability and performance benefits.       |

#### How to get there

1. Based on the base Helm values file `camunda-values.yml` in `aws/dual-region/kubernetes`, you have to extract the `clusterSize` and `replicationFactor` as you have to re-add the brokers to the Zeebe cluster.
2. Port-forwarding the Zeebe Gateway via `kubectl` for the REST API allows you to send a Cluster API call to add the new brokers to the Zeebe cluster with the previous information on size and replication.
   E.g. in our case the `clusterSize` is 8 and `replicationFactor` is 4 meaning we have to list all broker IDs starting from 0 to 7 and set the correct `replicationFactor` in the query.

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$HELM_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
curl -XPOST 'http://localhost:9600/actuator/cluster/brokers?replicationFactor=4' -H 'Content-Type: application/json' -d '["0", "1", "2", "3", "4", "5", "6", "7"]'
```

:::note
This step can take longer depending on the size of the cluster, size of the data and the current load.
:::

#### Verification

Port-forwarding the Zeebe Gateway via `kubectl` for the REST API and checking the Cluster API endpoint will show the status of the last change.

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$HELM_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
curl -XGET 'http://localhost:9600/actuator/cluster' | jq .lastChange
```

<details>
  <summary>Example output</summary>
  <summary>

```bash
{
  "id": 6,
  "status": "COMPLETED",
  "startedAt": "2024-08-23T12:54:07.968549269Z",
  "completedAt": "2024-08-23T12:54:09.282558853Z"
}
```

  </summary>
</details>

Port-forwarding the Zeebe Gateway via kubectl and printing the topology should reveal that all brokers have joined the Zeebe cluster again.

```
kubectl --context $CLUSTER_SURVIVING port-forward services/$HELM_RELEASE_NAME-zeebe-gateway 26500:26500 -n $CAMUNDA_NAMESPACE_SURVIVING
zbctl status --insecure --address localhost:26500
```

<details>
  <summary>Example Output</summary>
  <summary>

```bash
Cluster size: 8
Partitions count: 8
Replication factor: 4
Gateway version: 8.6.0
Brokers:
Broker 0 - camunda-zeebe-0.camunda-zeebe.camunda-london.svc:26501
  Version: 8.6.0
  Partition 1 : Leader, Healthy
  Partition 6 : Follower, Healthy
  Partition 7 : Follower, Healthy
  Partition 8 : Leader, Healthy
Broker 1 - camunda-zeebe-0.camunda-zeebe.camunda-paris.svc:26501
  Version: 8.6.0
  Partition 1 : Follower, Healthy
  Partition 2 : Follower, Healthy
  Partition 7 : Follower, Healthy
  Partition 8 : Follower, Healthy
Broker 2 - camunda-zeebe-1.camunda-zeebe.camunda-london.svc:26501
  Version: 8.6.0
  Partition 1 : Follower, Healthy
  Partition 2 : Follower, Healthy
  Partition 3 : Follower, Healthy
  Partition 8 : Follower, Healthy
Broker 3 - camunda-zeebe-1.camunda-zeebe.camunda-paris.svc:26501
  Version: 8.6.0
  Partition 1 : Follower, Healthy
  Partition 2 : Follower, Healthy
  Partition 3 : Follower, Healthy
  Partition 4 : Follower, Healthy
Broker 4 - camunda-zeebe-2.camunda-zeebe.camunda-london.svc:26501
  Version: 8.6.0
  Partition 2 : Leader, Healthy
  Partition 3 : Leader, Healthy
  Partition 4 : Leader, Healthy
  Partition 5 : Follower, Healthy
Broker 5 - camunda-zeebe-2.camunda-zeebe.camunda-paris.svc:26501
  Version: 8.6.0
  Partition 3 : Follower, Healthy
  Partition 4 : Follower, Healthy
  Partition 5 : Follower, Healthy
  Partition 6 : Follower, Healthy
Broker 6 - camunda-zeebe-3.camunda-zeebe.camunda-london.svc:26501
  Version: 8.6.0
  Partition 4 : Follower, Healthy
  Partition 5 : Leader, Healthy
  Partition 6 : Leader, Healthy
  Partition 7 : Leader, Healthy
Broker 7 - camunda-zeebe-3.camunda-zeebe.camunda-paris.svc:26501
  Version: 8.6.0
  Partition 5 : Follower, Healthy
  Partition 6 : Follower, Healthy
  Partition 7 : Follower, Healthy
  Partition 8 : Follower, Healthy
```

  </summary>
</details>

</div>
  </TabItem>
</Tabs>
