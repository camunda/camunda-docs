---
id: dual-region-operational-procedure
sidebar_label: Dual-region operational procedure
title: Helm chart dual-region operational procedure
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

## Introduction

This operational blueprint procedure is a step-by-step guide on how to restore operations in the case of a total region failure. It explains how to temporarily restore functionality in the surviving region and how to ultimately do a full recovery to restore the dual-region setup.

The operational procedure builds on top of the [dual-region AWS setup guidance](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md), but is generally applicable for any dual-region setup.
It has been also validated for the [OpenShift dual-region setup guidance](/self-managed/deployment/helm/cloud-providers/openshift/dual-region.md).

Before proceeding with the operational procedure, thoroughly review and understand the contents of the [dual-region concept page](/self-managed/concepts/multi-region/dual-region.md). This page outlines various limitations and requirements pertinent to the procedure, which are crucial for successful execution.

## Disclaimer

:::caution

Running a dual-region configuration requires users to detect and manage any regional failures, and implement the operational procedure for failover and failback that matches their environment.

:::

## Prerequisites

- A dual-region Camunda 8 setup installed in two different regions, preferably derived from our [AWS dual-region concept](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md) or [OpenShift dual-region concept](/self-managed/deployment/helm/cloud-providers/openshift/dual-region.md).
  - In that guide, we're showcasing Kubernetes dual-region installation, based on the following tools:
    - [Helm](https://helm.sh/docs/intro/install/) for installing and upgrading the [Camunda Helm chart](https://artifacthub.io/packages/helm/camunda/camunda-platform).
    - [Kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) to interact with the Kubernetes cluster.
- `cURL` or similar to interact with the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

## Terminology

- **Surviving region**
  - A surviving region refers to a region within a dual-region setup that remains operational and unaffected by a failure or disaster that affects other regions.
- **Lost region**
  - A lost region is a region within a dual-region setup that becomes unavailable or unusable due to a failure or disaster.
- **Recreated region**
  - A recreated region is a region within a dual-region setup that was previously lost but has been restored or recreated to resume its operational state.
  - We assume this region does not contain Camunda 8 deployments or related persistent volumes. Ensure this is the case before executing the failover procedure.

## Procedure

We use the same procedure to handle the loss of both active and passive regions. For clarity, this section focuses on the scenario where the passive region is lost while the active region remains operational. The same procedure will be valid in case of active region loss.

**Temporary Loss Scenario:** If a region loss is temporary — such as from transient network issues — Zeebe can handle this situation without initiating recovery procedures, provided there is sufficient free space on the persistent disk. However, processing may halt due to a loss of quorum during this time.

#### Key steps to handle passive region loss

1. **Traffic rerouting:** Use DNS to reroute traffic to the surviving active region. (Details on managing DNS rerouting depend on your specific DNS setup and are not covered in this guide.)
2. **Failover phase:** Temporarily restores Camunda 8 functionality by removing the lost brokers and handling the export to the unreachable Elasticsearch instance.
3. **Failback phase:** Fully restores the failed region to its original functionality. This phase requires the region to be ready for the redeployment of Camunda 8.

:::caution

For the failback procedure, the recreated region must not include any active Camunda 8 deployments or residual persistent volumes associated with Camunda 8 or its Elasticsearch instance. It is essential to initiate a clean deployment to prevent data replication and state conflicts.

:::

### Prerequisites

The following procedures assume the following dual-region deployment for:

- **AWS:** the deployment has been created using [AWS setup guide](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md#deploy-camunda-8-to-the-clusters) and you have your own copy of the [c8-multi-region](https://github.com/camunda/c8-multi-region) repository and previously completed changes in the `camunda-values.yml` to adjust them in your setup.
  Follow the [dual-region cluster deployment](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md#deploy-camunda-8-to-the-clusters) guide to install Camunda 8, configure a dual-region setup, and have the general environment variables (see [environment prerequisites](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md#environment-prerequisites) already set up).

- **OpenShift:** the deployment has been created using [OpenShift setup guide](/self-managed/deployment/helm/cloud-providers/openshift/dual-region.md#deploying-camunda-8-via-helm-charts-in-a-dual-region-setup) and previously completed changes in your `generated-values-region-1.yml` and `generated-values-region-2.yml` to adjust them in your setup.

:::note OpenShift cluster reference

    The OpenShift guide references the cluster's context using `CLUSTER_1_NAME` and `CLUSTER_2_NAME` and the namespaces using `CAMUNDA_NAMESPACE_1` and `CAMUNDA_NAMESPACE_2`.
    This guide use a different convention, the convertion can be done as follow:
    <details>
      <summary>Show OpenShift convertion</summary>

    ```bash
    export CLUSTER_0="$CLUSTER_1_NAME"
    export CAMUNDA_NAMESPACE_0="$CAMUNDA_NAMESPACE_1"
    echo "CLUSTER_0=$CLUSTER_0"
    echo "CAMUNDA_NAMESPACE_0=$CAMUNDA_NAMESPACE_0"

    export CLUSTER_1="$CLUSTER_2_NAME"
    export CAMUNDA_NAMESPACE_1="$CAMUNDA_NAMESPACE_2"
    echo "CLUSTER_1=$CLUSTER_1"
    echo "CAMUNDA_NAMESPACE_1=$CAMUNDA_NAMESPACE_1"
    ```

    </details>

:::

We will avoid referencing both scenarios of losing either region. Instead, we have generalized the commands and require a one-time setup to configure environment variables, enabling you to execute the procedure based on the surviving region and the one that needs to be recreated.
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

echo "You have lost $CLUSTER_RECREATED, $CLUSTER_SURVIVING is still alive"
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

echo "You have lost $CLUSTER_RECREATED, $CLUSTER_SURVIVING is still alive"
```

  </TabItem>
</Tabs>

### Failover phase

The Failover phase outlines steps for removing lost brokers, redistributing load, disabling Elasticsearch export to a failed region, and restoring user interaction with Camunda 8 to ensure smooth recovery and continued functionality.

<Tabs queryString="failover" values={[{label: 'Step 1', value: 'step1'}, {label: 'Step 2', value: 'step2'}]}>
<TabItem value="step1" label="Step 1" default>

#### Remove lost brokers from Zeebe cluster in the surviving region

<StateContainer
current={<Four viewBox="140 40 680 500" />}
desired={<Five viewBox="140 40 680 500" />}
/>

<div>

| **Current state**                                                                                                                                                                                                                                                                                                                                                                                                                     | **Desired state**                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| You have ensured that you fully lost a region and want to start the temporary recovery. <br /> <br /> One of the regions is lost, meaning Zeebe: <br /> - No data has been lost thanks to Zeebe data replication. <br /> - Is unable to process new requests due to losing the quorum <br /> - Stops exporting new data to Elasticsearch in the lost region <br /> - Stops exporting new data to Elasticsearch in the survived region | The lost brokers have been removed from the Zeebe cluster. <br /> <br /> Continued processing is enabled, and new brokers in the failback procedure will only join the cluster with our intervention. |

#### Procedure

Start with creating a port-forward to the `Zeebe Gateway` in the surviving region to the local host to interact with the Gateway.

The following alternatives to port-forwarding are possible:

- If the Zeebe Gateway is exposed to the outside of the Kubernetes cluster, you can skip port-forwarding and use the URL directly
- [`exec`](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_exec/) into an existing pod (such as Elasticsearch), and execute `curl` commands from inside of the pod
- [`run`](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_run/) an Ubuntu pod in the cluster to execute `curl` commands from inside the Kubernetes cluster

In our example, we went with port-forwarding to a localhost, but other alternatives can also be used.

1. Use the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) to retrieve the list of the remaining brokers

   ```bash
   kubectl --context $CLUSTER_SURVIVING port-forward services/$CAMUNDA_RELEASE_NAME-zeebe-gateway 8080:8080 -n $CAMUNDA_NAMESPACE_SURVIVING

   curl -L -X GET 'http://localhost:8080/v2/topology' \
   -H 'Accept: application/json'
   ```

<details>
   <summary>Example output</summary>
   <summary>

```bash
{
"brokers": [
   {
      "nodeId": 0,
      "host": "camunda-zeebe-0.camunda-zeebe.camunda-london",
      "port": 26501,
      "partitions": [
      {
         "partitionId": 1,
         "role": "leader",
         "health": "healthy"
      },
      {
         "partitionId": 6,
         "role": "follower",
         "health": "healthy"
      },
      {
         "partitionId": 7,
         "role": "follower",
         "health": "healthy"
      },
      {
         "partitionId": 8,
         "role": "follower",
         "health": "healthy"
      }
      ],
      "version": "8.8.0"
   },
   {
      "nodeId": 2,
      "host": "camunda-zeebe-1.camunda-zeebe.camunda-london",
      "port": 26501,
      "partitions": [
      {
         "partitionId": 1,
         "role": "follower",
         "health": "healthy"
      },
      {
         "partitionId": 2,
         "role": "follower",
         "health": "healthy"
      },
      {
         "partitionId": 3,
         "role": "follower",
         "health": "healthy"
      },
      {
         "partitionId": 8,
         "role": "leader",
         "health": "healthy"
      }
      ],
      "version": "8.8.0"
   },
   {
      "nodeId": 4,
      "host": "camunda-zeebe-2.camunda-zeebe.camunda-london",
      "port": 26501,
      "partitions": [
      {
         "partitionId": 2,
         "role": "follower",
         "health": "healthy"
      },
      {
         "partitionId": 3,
         "role": "leader",
         "health": "healthy"
      },
      {
         "partitionId": 4,
         "role": "follower",
         "health": "healthy"
      },
      {
         "partitionId": 5,
         "role": "follower",
         "health": "healthy"
      }
      ],
      "version": "8.8.0"
   },
   {
      "nodeId": 6,
      "host": "camunda-zeebe-3.camunda-zeebe.camunda-london",
      "port": 26501,
      "partitions": [
      {
         "partitionId": 4,
         "role": "follower",
         "health": "healthy"
      },
      {
         "partitionId": 5,
         "role": "follower",
         "health": "healthy"
      },
      {
         "partitionId": 6,
         "role": "follower",
         "health": "healthy"
      },
      {
         "partitionId": 7,
         "role": "leader",
         "health": "healthy"
      }
      ],
      "version": "8.8.0"
   }
],
"clusterSize": 8,
"partitionsCount": 8,
"replicationFactor": 4,
"gatewayVersion": "8.8.0"
}
```

   </summary>
</details>

2.  Port-forward the service of the Zeebe Gateway to access the [management REST API](/self-managed/components/orchestration-cluster/zeebe/configuration/gateway.md#managementserver)

    ```bash
    kubectl --context $CLUSTER_SURVIVING port-forward services/$CAMUNDA_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
    ```

3.  Based on the [Cluster Scaling APIs](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md), send a request to the Zeebe Gateway to redistribute the load to the remaining brokers, thereby removing the lost brokers.
    Depending on which region was lost, the load must be redistributed to the remaining brokers, either the even or odd numbered ones. In our example, we have lost `region 1` and with it our uneven brokers. This means we will have to redistribute to our existing even brokers. Make sure to only run the correct one based on the surviving region's brokers.
    We do the redistribution by removing the brokers that we've lost. Meaning by removing the uneven brokers we actively redistribute to the even brokers.

<Tabs queryString="lost-region" values={[{label: 'Redistribute to even brokers', value: 'redistribute-to-even'}, {label: 'Redistribute to odd brokers', value: 'redistribute-to-odd'}]}>
<TabItem value="redistribute-to-even" label="Redistribute to even brokers" default>

```bash
curl -XPATCH 'http://localhost:9600/actuator/cluster?force=true' \
  -H 'Content-Type: application/json' \
  -d '{
    "brokers": {
      "remove": [1,3,5,7]
      }
    }'
```

  </TabItem>
  <TabItem value="redistribute-to-odd" label="Redistribute to odd brokers">

```bash
curl -XPATCH 'http://localhost:9600/actuator/cluster?force=true' \
  -H 'Content-Type: application/json' \
  -d '{
    "brokers": {
      "remove": [0,2,4,6]
      }
    }'
```

  </TabItem>

  </Tabs>

Using the `force=true` parameter reduces the replication factor accordingly.

#### Verification

Port-forwarding the Zeebe Gateway via `kubectl` and printing the topology should reveal that the cluster size has decreased to 4, partitions have been redistributed over the remaining brokers, and new leaders have been elected.

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$CAMUNDA_RELEASE_NAME-zeebe-gateway 8080:8080 -n $CAMUNDA_NAMESPACE_SURVIVING

curl -L -X GET 'http://localhost:8080/v2/topology' \
  -H 'Accept: application/json'
```

<details>
  <summary>Example output</summary>
  <summary>

```bash
{
  "brokers": [
    {
      "nodeId": 0,
      "host": "camunda-zeebe-0.camunda-zeebe.camunda-london",
      "port": 26501,
      "partitions": [
        {
          "partitionId": 1,
          "role": "leader",
          "health": "healthy"
        },
        {
          "partitionId": 6,
          "role": "leader",
          "health": "healthy"
        },
        {
          "partitionId": 7,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 8,
          "role": "follower",
          "health": "healthy"
        }
      ],
      "version": "8.8.0"
    },
    {
      "nodeId": 2,
      "host": "camunda-zeebe-1.camunda-zeebe.camunda-london",
      "port": 26501,
      "partitions": [
        {
          "partitionId": 1,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 2,
          "role": "leader",
          "health": "healthy"
        },
        {
          "partitionId": 3,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 8,
          "role": "leader",
          "health": "healthy"
        }
      ],
      "version": "8.8.0"
    },
    {
      "nodeId": 4,
      "host": "camunda-zeebe-2.camunda-zeebe.camunda-london",
      "port": 26501,
      "partitions": [
        {
          "partitionId": 2,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 3,
          "role": "leader",
          "health": "healthy"
        },
        {
          "partitionId": 4,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 5,
          "role": "follower",
          "health": "healthy"
        }
      ],
      "version": "8.8.0"
    },
    {
      "nodeId": 6,
      "host": "camunda-zeebe-3.camunda-zeebe.camunda-london",
      "port": 26501,
      "partitions": [
        {
          "partitionId": 4,
          "role": "leader",
          "health": "healthy"
        },
        {
          "partitionId": 5,
          "role": "leader",
          "health": "healthy"
        },
        {
          "partitionId": 6,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 7,
          "role": "leader",
          "health": "healthy"
        }
      ],
      "version": "8.8.0"
    }
  ],
  "clusterSize": 4,
  "partitionsCount": 8,
  "replicationFactor": 2,
  "gatewayVersion": "8.8.0"
}
```

  </summary>
</details>

You can also use the Zeebe Gateway's REST API to ensure the scaling progress has been completed. For better output readability, we use [jq](https://jqlang.github.io/jq/).

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$CAMUNDA_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
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

| **Details**             | **Current state**                                                                                                                                           | **Desired state**                                                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Zeebe configuration** | Zeebe brokers in the surviving region are still configured to point to the Elasticsearch instance of the lost region. Zeebe cannot continue exporting data. | Elasticsearch exporter to the failed region has been disabled in the Zeebe cluster. Zeebe can export data to Elasticsearch again. |
| **User interaction**    | Regular interaction with Camunda 8 is not restored.                                                                                                         | Regular interaction with Camunda 8 is restored, marking the conclusion of the temporary recovery.                                 |

#### Procedure

1. Port-forward the service of the Zeebe Gateway for the [management REST API](/self-managed/components/orchestration-cluster/zeebe/configuration/gateway.md#managementserver)

   ```bash
   kubectl --context $CLUSTER_SURVIVING port-forward services/$CAMUNDA_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
   ```

2. List all exporters to find the corresponding ID. Alternatively, you can check your Helm chart `camunda-values.yml` file, which lists the exporters as those that had to be configured explicitly.

   ```bash
   curl -XGET 'http://localhost:9600/actuator/exporters'
   ```

   <details>
   <summary>Example output</summary>
   <summary>

   ```bash
   [{"exporterId":"camundaregion0","status":"ENABLED"},{"exporterId":"camundaregion1","status":"ENABLED"}]
   ```

   </summary>
   </details>

3. Based on the Exporter APIs you will send a request to the Zeebe Gateway to disable the Elasticsearch exporter connected with the lost region.

   ```bash
   curl -XPOST 'http://localhost:9600/actuator/exporters/camundaregion1/disable'
   ```

#### Verification

Port-forwarding the Zeebe Gateway via `kubectl` for the REST API and listing all exporters will reveal their current status.

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$CAMUNDA_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
curl -XGET 'http://localhost:9600/actuator/exporters'
```

<details>
  <summary>Example output</summary>
  <summary>

```bash
[{"exporterId":"camundaregion0","status":"ENABLED"},{"exporterId":"camundaregion1","status":"DISABLED"}]
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

### Failback phase

<Tabs queryString="failback" values={[{label: 'Step 1', value: 'step1'}, {label: 'Step 2', value: 'step2'}, {label: 'Step 3', value: 'step3'}, {label: 'Step 4', value: 'step4'}, {label: 'Step 5', value: 'step5'}, {label: 'Step 6', value: 'step6'}, {label: 'Step 7', value: 'step7'}, {label: 'Step 8', value: 'step8'}]}>
<TabItem value="step1" label="Step 1" default>

#### Deploy Camunda 8 in the newly created region

<StateContainer
current={<Six viewBox="140 40 680 500" />}
desired={<Eight viewBox="140 40 680 500" />}
/>

<div>

| **Details**              | **Current state**                                                                                                   | **Desired state**                                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Camunda 8**            | A standalone region with a fully functional Camunda 8 setup, including Zeebe, Operate, Tasklist, and Elasticsearch. | Restore dual-region functionality by deploying Camunda 8 (Zeebe and Elasticsearch) to the newly restored region. |
| **Operate and Tasklist** | Operate and Tasklist are operational in the standalone region.                                                      | Operate and Tasklist need to stay disabled to avoid interference during the database backup and restore process. |

#### Procedure

This step is a re-deployment of the recreated region using the same value files that were used during the initial deployment.

Additionally, the Helm command will disable Operate and Tasklist. These components will only be enabled at the end of the region recovery. Keeping them disabled in the newly created region is necessary to avoid data duplication by their Elasticsearch importers.

<Tabs groupId="clusters-types">
  <TabItem value="EKS" label="EKS">

This procedure requires your Helm values file, `camunda-values.yml,` in `aws/dual-region/kubernetes,` used to deploy EKS Dual-region Camunda clusters.

Ensure that the values for `ZEEBE_BROKER_EXPORTERS_CAMUNDAREGION0_ARGS_URL` and `ZEEBE_BROKER_EXPORTERS_CAMUNDAREGION1_ARGS_URL` correctly point to their respective regions. The placeholder in `ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS` should contain the Zeebe endpoints for both regions, the result of the `aws/dual-region/scripts/generate_zeebe_helm_values.sh`.

This step is equivalent to applying for the region to be recreated:

- [Setting up the Camunda 8 Dual-Region Helm chart](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md#camunda-8-helm-chart-prerequisites)
- [Deploying the Camunda 8 Dual-Region Helm chart](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md#deploy-camunda-8)

From the terminal context of `aws/dual-region/kubernetes` execute:

<!-- TODO: CAMUNDA_DATABASE_SCHEMAMANAGER_CREATESCHEMA=false -->

```bash
helm install $CAMUNDA_RELEASE_NAME camunda/camunda-platform \
  --version $HELM_CHART_VERSION \
  --kube-context $CLUSTER_RECREATED \
  --namespace $CAMUNDA_NAMESPACE_RECREATED \
  -f camunda-values.yml \
  -f $REGION_RECREATED/camunda-values.yml \
  --set orchestration.profiles.operate=false \
  --set orchestration.profiles.tasklist=false
```

</TabItem>
<TabItem value="OpenShift" label="OpenShift">

Follow the installation steps **recreated region**:

- [Setting up the Camunda 8 Dual-Region Helm chart](/self-managed/deployment/helm/cloud-providers/openshift/dual-region.md#configure-your-deployment-for-each-region) _Optional if you already have your pre-configured `generated-values-file.yml`_
- Once your values file is generated from the installation step, install **Camunda 8 only in the recreated region**, you will need to adjust the installation command to disable Operate (`--set orchestration.profiles.operate=false`) and Tasklist (`--set orchestration.profiles.tasklist=false`):

  Example command adapted from the installation step.

  ```bash
  helm upgrade --install \
  "$CAMUNDA_RELEASE_NAME" camunda/camunda-platform \
  --version "$HELM_CHART_VERSION" \
  --kube-context "$CLUSTER_RECREATED" \
  --namespace "$CAMUNDA_NAMESPACE_RECREATED" \
  -f "<generated-values-region-1|2.yaml>" \
  --set orchestration.profiles.operate=false \
  --set orchestration.profiles.tasklist=false
  ```

- [Follow the installation step for the **recreated region only**](/self-managed/deployment/helm/cloud-providers/openshift/dual-region.md#install-camunda-8-using-helm).

</TabItem>
</Tabs>

#### Verification

The following command will show the pods deployed in the newly created region.

```bash
kubectl --context $CLUSTER_RECREATED get pods -n $CAMUNDA_NAMESPACE_RECREATED
```

Half of the amount of your set `clusterSize` is used to spawn Zeebe brokers.

For example, in the case of `clusterSize: 8`, four Zeebe brokers are provisioned in the newly created region.

:::danger
It is expected that the Zeebe broker pods will not reach the "Ready" state since they are not yet part of a Zeebe cluster and, therefore, not considered healthy by the readiness probe.
:::

Port-forwarding the Zeebe Gateway via `kubectl` and printing the topology should reveal that the new Zeebe brokers are recognized but yet a full member of the Zeebe cluster.

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$CAMUNDA_RELEASE_NAME-zeebe-gateway 8080:8080 -n $CAMUNDA_NAMESPACE_SURVIVING

curl -L -X GET 'http://localhost:8080/v2/topology' \
  -H 'Accept: application/json'
```

<details>
  <summary>Example output</summary>
  <summary>

```bash
{
  "brokers": [
    {
      "nodeId": 0,
      "host": "camunda-zeebe-0.camunda-zeebe.camunda-london",
      "port": 26501,
      "partitions": [
        {
          "partitionId": 1,
          "role": "leader",
          "health": "healthy"
        },
        {
          "partitionId": 6,
          "role": "leader",
          "health": "healthy"
        },
        {
          "partitionId": 7,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 8,
          "role": "follower",
          "health": "healthy"
        }
      ],
      "version": "8.8.0"
    },
    {
      "nodeId": 1,
      "host": "camunda-zeebe-0.camunda-zeebe.camunda-paris",
      "port": 26501,
      "partitions": [],
      "version": "8.8.0"
    },
    {
      "nodeId": 2,
      "host": "camunda-zeebe-1.camunda-zeebe.camunda-london",
      "port": 26501,
      "partitions": [
        {
          "partitionId": 1,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 2,
          "role": "leader",
          "health": "healthy"
        },
        {
          "partitionId": 3,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 8,
          "role": "leader",
          "health": "healthy"
        }
      ],
      "version": "8.8.0"
    },
    {
      "nodeId": 3,
      "host": "camunda-zeebe-1.camunda-zeebe.camunda-paris",
      "port": 26501,
      "partitions": [],
      "version": "8.8.0"
    },
    {
      "nodeId": 4,
      "host": "camunda-zeebe-2.camunda-zeebe.camunda-london",
      "port": 26501,
      "partitions": [
        {
          "partitionId": 2,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 3,
          "role": "leader",
          "health": "healthy"
        },
        {
          "partitionId": 4,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 5,
          "role": "follower",
          "health": "healthy"
        }
      ],
      "version": "8.8.0"
    },
    {
      "nodeId": 5,
      "host": "camunda-zeebe-2.camunda-zeebe.camunda-paris",
      "port": 26501,
      "partitions": [],
      "version": "8.8.0"
    },
    {
      "nodeId": 6,
      "host": "camunda-zeebe-3.camunda-zeebe.camunda-london",
      "port": 26501,
      "partitions": [
        {
          "partitionId": 4,
          "role": "leader",
          "health": "healthy"
        },
        {
          "partitionId": 5,
          "role": "leader",
          "health": "healthy"
        },
        {
          "partitionId": 6,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 7,
          "role": "leader",
          "health": "healthy"
        }
      ],
      "version": "8.8.0"
    },
    {
      "nodeId": 7,
      "host": "camunda-zeebe-3.camunda-zeebe.camunda-paris",
      "port": 26501,
      "partitions": [],
      "version": "8.8.0"
    },
  ],
  "clusterSize": 4,
  "partitionsCount": 8,
  "replicationFactor": 2,
  "gatewayVersion": "8.8.0"
}
```

  </summary>
</details>

</div>
  </TabItem>
  <TabItem value="step2" label="Step 2">

#### Pause Camunda exporters to Elasticsearch

<StateContainer
current={<Eight viewBox="140 40 680 500" />}
desired={<Nine viewBox="140 40 680 500" />}
/>

<div>

| **Details**   | **Current state**                                                                                                                                                                                                                                                                                                                             | **Desired state**                                                                                                                                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Camunda 8** | Functioning Orchestration Cluster within a single region: <br/> Including working [Zeebe cluster](/reference/glossary/#zeebe-cluster) in the surviving region <br/> Non-participating [Zeebe Brokers](/reference/glossary/#zeebe-broker) in the recreated region. <br /> Currently exporting data to Elasticsearch from the surviving region. | Preparing the newly created region to take over and restore the dual-region setup. Stop Camunda exporters to prevent new data from being exported to Elasticsearch, allowing for the creation of an Elasticsearch backup. |

:::note

This step **does not** affect the process instances in any way. Process information may not be visible in Operate and Tasklist running in the affected instance.

:::

#### Procedure

1. Disable the Camunda Exporter exporters in Zeebe via kubectl using the [exporting API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#exporting-api):

   ```bash
   kubectl --context $CLUSTER_SURVIVING port-forward services/$CAMUNDA_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
   curl -i localhost:9600/actuator/exporting/pause -XPOST
   # The successful response should be:
   # HTTP/1.1 204 No Content
   ```

#### Verification

For the Camunda exporters, there's currently no API available to confirm this. Only the response code of `204` indicates a successful disabling. This is a synchronous operation.

</div>
  </TabItem>
  <TabItem value="step3" label="Step 3">

#### Deactivate Operate / Tasklist in active region by re-deploying

<StateContainer
current={<Nine viewBox="140 40 680 500" />}
desired={<Ten viewBox="140 40 680 500" />}
/>

| **Details**   | **Current State**                                                                                                                                                                                                                                                                            | **Desired State**                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Camunda 8** | Not processing any new process instances nor reflecting user changes but Operate and Tasklist still reachable from the surviving region. With the exporting paused, it will impact the UX for the end-user and may impact the Elastic backup due to isolated Operate and or Tasklist writes. | Operate and Tasklist turned off in the Orchestration Cluster to avoid data loss during the backup procedure. |

#### How to get there

With the Orchestration Cluster, Operate and Tasklist were consolidated with the Zeebe Broker and Gateway into a single application.

Similar to `Step 1`, this step is a re-deployment of the active region using the same value files that were used during the initial deployment.

Additionally, the Helm command will disable Operate and Tasklist. These components will only be enabled at the end of the full region recovery again.

We want to reduce the deployed application to just the Zeebe Cluster and Elasticsearch.

<Tabs groupId="clusters-types">
  <TabItem value="EKS" label="EKS">

This procedure requires your Helm values file, `camunda-values.yml,` in `aws/dual-region/kubernetes,` used to deploy EKS Dual-region Camunda clusters.

Ensure that the values for `ZEEBE_BROKER_EXPORTERS_CAMUNDAREGION0_ARGS_URL` and `ZEEBE_BROKER_EXPORTERS_CAMUNDAREGION1_ARGS_URL` correctly point to their respective regions. The placeholder in `ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS` should contain the Zeebe endpoints for both regions, the result of the `aws/dual-region/scripts/generate_zeebe_helm_values.sh`.

This step is equivalent to applying for the region to be recreated:

- [Setting up the Camunda 8 Dual-Region Helm chart](/self-managed/installation-methods/helm/cloud-providers/amazon/amazon-eks/dual-region.md#camunda-8-helm-chart-prerequisites)
- [Deploying the Camunda 8 Dual-Region Helm chart](/self-managed/installation-methods/helm/cloud-providers/amazon/amazon-eks/dual-region.md#deploy-camunda-8)

From the terminal context of `aws/dual-region/kubernetes` execute:

```bash
helm upgrade --install $CAMUNDA_RELEASE_NAME camunda/camunda-platform \
  --version $HELM_CHART_VERSION \
  --kube-context $CLUSTER_SURVIVING \
  --namespace $CAMUNDA_NAMESPACE_SURVIVING \
  -f camunda-values.yml \
  -f $REGION_SURVIVING/camunda-values.yml \
  --set orchestration.profiles.operate=false \
  --set orchestration.profiles.tasklist=false
```

</TabItem>
<TabItem value="OpenShift" label="OpenShift">

Follow the installation steps **surviving region**:

- [Setting up the Camunda 8 Dual-Region Helm chart](/self-managed/installation-methods/helm/cloud-providers/openshift/dual-region.md#configure-your-deployment-for-each-region) _Optional if you already have your pre-configured `generated-values-file.yml`_
- Once your values file is generated from the installation step, upgrade **Camunda 8 only in the surviving region**, you will need to adjust the installation command to disable Operate (`--set orchestration.profiles.operate=false`) and Tasklist (`--set orchestration.profiles.tasklist=false`):

  Example command adapted from the installation step.

  ```bash
  helm upgrade --install \
  "$CAMUNDA_RELEASE_NAME" camunda/camunda-platform \
  --version "$HELM_CHART_VERSION" \
  --kube-context "$CLUSTER_SURVIVING" \
  --namespace "$CAMUNDA_NAMESPACE_SURVIVING" \
  -f "<generated-values-region-1|2.yaml>" \
  --set orchestration.profiles.operate=false \
  --set orchestration.profiles.tasklist=false
  ```

- [Follow the installation step for the **surviving region only**](/self-managed/installation-methods/helm/cloud-providers/openshift/dual-region.md#install-camunda-8-using-helm).

</TabItem>
</Tabs>

#### Verification

1. If the environment is exposed via e.g. an ingress a quick way to confirm is that `Operate` and `Tasklist` are not reachable through said ingress anymore.
2. Another option is to check the logs of any `camunda-zeebe-X` pod to mention that only a subset of profiles are active.

   ```bash
   kubectl --context $CLUSTER_SURVIVING logs camunda-zeebe-0 | grep "profiles are active"
   ```

   ```bash
   # The default are 5 profiles, so this confirms that Operate and Tasklist are not enabled
   io.camunda.application.StandaloneCamunda - The following 3 profiles are active: "broker", "identity", "consolidated-auth"
   ```

3. Or check that the configuration is not listing `Operate` and `Tasklist` as active profile

   ```bash
   kubectl --context $CLUSTER_SURVIVING get cm camunda-zeebe-configuration-unified -oyaml | grep spring -A2
   ```

   ```bash
   spring:
     profiles:
       active: "broker,identity,consolidated-auth"
   ```

  </TabItem>
  <TabItem value="step4" label="Step 4">

#### Create and restore Elasticsearch backup

<StateContainer
current={<Nine viewBox="140 40 680 500" />}
desired={<Ten viewBox="140 40 680 500" />}
/>

<div>

| **Details**              | **Current State**                                                                                                                                | **Desired State**                                                                                                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Camunda 8**            | Reachable by end-users but not processing any new process instances nor reflecting User changes. This state allows for data backup without loss. | Remain not processing any new instances nor processing user inputs.                                                                                                                   |
| **Elasticsearch Backup** | No backup is in progress.                                                                                                                        | Backup of Elasticsearch in the surviving region is initiated and being restored in the recreated region, containing all necessary data. The backup process may take time to complete. |

#### How to get there

This builds on top of the [AWS setup](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md) and assumes the S3 bucket was automatically created as part of the Terraform execution.

:::info

The procedure works for other Cloud providers and bare metal. You have to adjust the AWS S3-specific part depending on your chosen backup source for Elasticsearch. Consult the [Elasticsearch documentation on snapshot and restore](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshot-restore.html) to learn more about this, and specifically the [different supported types](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshots-register-repository.html#ess-repo-types) by Elasticsearch.

:::

1. Determine the S3 bucket

   <Tabs groupId="clusters-types">
   <TabItem value="EKS" label="EKS">

   Retrieve the name of the bucket via Terraform. Go to `aws/dual-region/terraform` within the repository and retrieve the bucket name from the Terraform state:

   ```bash
   export S3_BUCKET_NAME=$(terraform output -raw s3_bucket_name)
   ```

   </TabItem>
   <TabItem value="OpenShift" label="OpenShift">

   Retrieve the name of the bucket from the [verify the pre-requisites step of OpenShift Dual-region](/self-managed/deployment/helm/cloud-providers/openshift/dual-region.md#verify-the-pre-requisites) step, it should be referenced as the `AWS_ES_BUCKET_NAME` variable.

   Export it:

   ```bash
   export S3_BUCKET_NAME="$AWS_ES_BUCKET_NAME"
   ```

   </TabItem>
   </Tabs>

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
         "uuid": "1S_C05K0RjqFyWMfjSKI_A",
         "repository": "camunda_backup",
         "version_id": 8525000,
         "version": "8.18.0",
         "indices": [
           "camunda-usage-metric-tu-8.8.0_",
           "tasklist-metric-8.3.0_",
           "camunda-mapping-rule-8.8.0_",
           "operate-job-8.6.0_",
           "camunda-user-8.8.0_",
           "camunda-usage-metric-8.8.0_",
           "operate-import-position-8.3.0_",
           "camunda-correlated-message-subscription-8.8.0_",
           "operate-variable-8.3.0_",
           "operate-message-8.5.0_",
           "operate-decision-requirements-8.3.0_",
           "operate-process-8.3.0_",
           "camunda-authorization-8.8.0_",
           "operate-decision-instance-8.3.0_",
           "operate-list-view-8.3.0_",
           "camunda-group-8.8.0_",
           "operate-batch-operation-1.0.0_",
           "tasklist-form-8.4.0_",
           "tasklist-task-variable-8.3.0_",
           "operate-metric-8.3.0_",
           "camunda-web-session-8.8.0_",
           "operate-sequence-flow-8.3.0_",
           "tasklist-task-8.8.0_",
           "tasklist-draft-task-variable-8.3.0_",
           "operate-flownode-instance-8.3.1_",
           "operate-event-8.3.0_",
           "tasklist-import-position-8.2.0_",
           "operate-decision-8.3.0_",
           "operate-incident-8.3.1_",
           "operate-operation-8.4.1_",
           "camunda-role-8.8.0_",
           "operate-post-importer-queue-8.3.0_",
           "camunda-tenant-8.8.0_"
         ],
         "data_streams": [],
         "include_global_state": true,
         "state": "SUCCESS",
         "start_time": "2025-09-29T11:38:18.285Z",
         "start_time_in_millis": 1759145898285,
         "end_time": "2025-09-29T11:38:19.292Z",
         "end_time_in_millis": 1759145899292,
         "duration_in_millis": 1007,
         "failures": [],
         "shards": {
           "total": 33,
           "failed": 0,
           "successful": 33
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

7. Restore Elasticsearch backup in the new region namespace `CAMUNDA_NAMESPACE_RECREATED`. Depending on the amount of data, this operation may take a while to complete.

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

   **This is only an example, and the values will differ for you.** Ensure you see `state: "SUCCESS"`, and that the properties `done` and `total` have equal values.

   ```json
   {
   "snapshots": [
      {
         "snapshot": "failback",
         "repository": "camunda_backup",
         "uuid": "1S_C05K0RjqFyWMfjSKI_A",
         "state": "SUCCESS",
         "include_global_state": true,
         "shards_stats": {
         "initializing": 0,
         "started": 0,
         "finalizing": 0,
         "done": 33,
         "failed": 0,
         "total": 33
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
  <TabItem value="step5" label="Step 5">

#### Start Operate and Tasklist again

<StateContainer
current={<Ten viewBox="140 40 680 500" />}
desired={<Eleven viewBox="140 40 680 500" />}
/>

<div>

| **Details**              | **Current state**                                               | **Desired state**                                                                                                       |
| ------------------------ | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Camunda 8**            | Remains unreachable by end-users while restoring functionality. | Enable Operate and Tasklist in both the surviving and recreated regions to allow user interaction with Camunda 8 again. |
| **Elasticsearch Backup** | Backup has been created and restored to the recreated region.   | N/A                                                                                                                     |

#### Procedure

We need to reapply/upgrade the Helm release to enable and deploy Operate and Tasklist.

<Tabs groupId="clusters-types">
  <TabItem value="EKS" label="EKS">

The base Helm values file `camunda-values.yml` in `aws/dual-region/kubernetes` contains the adjustments for Elasticsearch and the Zeebe initial brokers.

<!-- TODO: REMOVE ENV OVERWRITE ABOUT SCHEMA MANAGER -->

1. Upgrade the normal Camunda environment in `CAMUNDA_NAMESPACE_SURVIVING` and `REGION_SURVIVING` to deploy Operate and Tasklist:

   ```bash
   helm upgrade $CAMUNDA_RELEASE_NAME camunda/camunda-platform \
   --version $HELM_CHART_VERSION \
   --kube-context $CLUSTER_SURVIVING \
   --namespace $CAMUNDA_NAMESPACE_SURVIVING \
   -f camunda-values.yml \
   -f $REGION_SURVIVING/camunda-values.yml
   ```

2. Upgrade the new region environment in `CAMUNDA_NAMESPACE_RECREATED` and `REGION_RECREATED` to deploy Operate and Tasklist:

   ```bash
   helm upgrade $CAMUNDA_RELEASE_NAME camunda/camunda-platform \
   --version $HELM_CHART_VERSION \
   --kube-context $CLUSTER_RECREATED \
   --namespace $CAMUNDA_NAMESPACE_RECREATED \
   -f camunda-values.yml \
   -f $REGION_RECREATED/camunda-values.yml
   ```

</TabItem>
<TabItem value="OpenShift" label="OpenShift">

Follow the installation instruction for the two regions, you will need to apply helm upgrade on the `CLUSTER_RECREATED` and on the `CLUSTER_SURVIVING`.

- [Apply the initial installation on the two regions](/self-managed/deployment/helm/cloud-providers/openshift/dual-region.md#install-camunda-8-using-helm).
- Ensure that the services are exported correctly using `subctl`.
- This step will re-enable Operate and Tasklist in the two regions.

</TabItem>
</Tabs>

#### Verification

For Operate and Tasklist, you can confirm that the deployments have been successfully deployed by listing those and indicating `1/1` ready. The same command can be applied for the `CLUSTER_RECREATED` and `CAMUNDA_NAMESPACE_RECREATED`:

```bash
kubectl --context $CLUSTER_SURVIVING get deployments -n $CAMUNDA_NAMESPACE_SURVIVING
# NAME                    READY   UP-TO-DATE   AVAILABLE   AGE
# camunda-operate         1/1     1            1           3h24m
# camunda-tasklist        1/1     1            1           3h24m
# camunda-zeebe-gateway   1/1     1            1           3h24m
```

</div>
  </TabItem>
  <TabItem value="step6" label="Step 6">

#### Initialize new Camunda exporter to the recreated region

<StateContainer
current={<Eleven viewBox="140 40 680 500" />}
desired={<Twelve viewBox="140 40 680 500" />}
/>

<div>

| **Details**   | **Current state**                                   | **Desired state**                                                                                                                                                                                                                            |
| ------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Camunda 8** | Reachable to end-users, but not exporting any data. | Start a new exporter to the recreated region.<br /> Ensure that both Elasticsearch instances are populated for data redundancy. <br /> Separate the initialization step (asynchronous) and confirm completion before resuming the exporters. |

#### How to get there

1. Initialize the new exporter for the recreated region by sending an API request via the Zeebe Gateway:

   ```bash
   kubectl --context $CLUSTER_SURVIVING port-forward services/$CAMUNDA_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
   curl -XPOST 'http://localhost:9600/actuator/exporters/camundaregion1/enable' -H 'Content-Type: application/json' -d '{"initializeFrom" : "camundaregion0"}'
   ```

#### Verification

Port-forwarding the Zeebe Gateway via `kubectl` for the REST API and listing all exporters will reveal their current status.

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$CAMUNDA_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
curl -XGET 'http://localhost:9600/actuator/exporters'
```

<details>
  <summary>Example output</summary>
  <summary>

```bash
[{"exporterId":"camundaregion0","status":"ENABLED"},{"exporterId":"camundaregion1","status":"ENABLED"}]
```

  </summary>
</details>

You can also check the status of the change using the Cluster API via the already port-forwarded Zeebe Gateway.

**Ensure the status is "COMPLETED" before proceeding with the next step.**

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
  <TabItem value="step7" label="Step 7">

#### Reactivate Camunda exporter

<StateContainer
current={<Twelve viewBox="140 40 680 500" />}
desired={<Thirteen viewBox="140 40 680 500" />}
/>

<div>

| **Details**   | **Current state**                                                                                                                                   | **Desired state**                                                                          |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Camunda 8** | Reachable to end-users, but currently not exporting any data. Exporters are enabled for both regions, with the operation confirmed to be completed. | Reactivate existing exporters that will allow Zeebe to export data to Elasticsearch again. |

#### How to get there

1. Reactivate the exporters by sending the [exporting API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#exporting-api) activation request via the Zeebe Gateway:

   ```bash
   kubectl --context $CLUSTER_SURVIVING port-forward services/$CAMUNDA_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
   curl -i localhost:9600/actuator/exporting/resume -XPOST
   # The successful response should be:
   # HTTP/1.1 204 No Content
   ```

#### Verification

There is currently no API available to confirm the reactivation of the exporters. Only the response code `204` indicates a successful resumption. This is a synchronous operation.

</div>
  </TabItem>
  <TabItem value="step8" label="Step 8">

#### Add new brokers to the Zeebe cluster

<StateContainer
current={<Thirteen viewBox="140 40 680 500" />}
desired={<Fourteen viewBox="140 40 680 500" />}
/>

<div>

| **Details**          | **Current state**                                                                                                                  | **Desired state**                                                                             |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Camunda 8**        | Running in two regions, but not yet utilizing all Zeebe brokers. Operate and Tasklist redeployed, Elasticsearch exporters enabled. | Fully functional Camunda 8 setup utilizing both regions, recovering all dual-region benefits. |
| **User interaction** | Users can interact with Camunda 8 again.                                                                                           | Dual-region functionality is restored, maximizing reliability and performance benefits.       |

#### How to get there

1. Based on the base Helm values file `camunda-values.yml` in `aws/dual-region/kubernetes`, you have to extract the `clusterSize` and `replicationFactor` as you have to re-add the brokers to the Zeebe cluster.
2. Port-forwarding the Zeebe Gateway via `kubectl` for the REST API allows you to send a Cluster API call to add the new brokers to the Zeebe cluster with the previous information on size and replication.
   E.g. in our case the `clusterSize` is 8 and `replicationFactor` is 4 meaning we have to list all even or uneven broker IDs starting from 0 to 7 and set the correct `replicationFactor` in the query.

<Tabs queryString="lost-region" values={[{label: 'Redistribute to even brokers', value: 'redistribute-to-even'}, {label: 'Redistribute to odd brokers', value: 'redistribute-to-odd'}]}>
<TabItem value="redistribute-to-even" label="Add the uneven brokers" default>

    ```bash
    curl -XPATCH 'http://localhost:9600/actuator/cluster?force=true' \
      -H 'Content-Type: application/json' \
      -d '{
        "brokers": {
          "add": [1,3,5,7]
          },
        "partitions": {
          "replicationFactor": 4
        }
      }'
    ```

    </TabItem>
    <TabItem value="redistribute-to-odd" label="Add the even brokers">

    ```bash
    curl -XPATCH 'http://localhost:9600/actuator/cluster?force=true' \
      -H 'Content-Type: application/json' \
      -d '{
        "brokers": {
          "add": [0,2,4,6]
          },
        "partitions": {
          "replicationFactor": 4
        }
      }'
    ```

    </TabItem>

  </Tabs>

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$CAMUNDA_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
curl -XPOST 'http://localhost:9600/actuator/cluster/brokers?replicationFactor=4' -H 'Content-Type: application/json' -d '["0", "1", "2", "3", "4", "5", "6", "7"]'
```

:::note
This step can take longer depending on the size of the cluster, size of the data and the current load.
:::

#### Verification

Port-forwarding the Zeebe Gateway via `kubectl` for the REST API and checking the Cluster API endpoint will show the status of the last change.

```bash
kubectl --context $CLUSTER_SURVIVING port-forward services/$CAMUNDA_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
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
</Tabs>

In conclusion, adhering to this updated operational procedure ensures a structured and efficient recovery process for maintaining operational continuity in dual-region deployments. Please remain cautious in managing dual-region environments and be prepared to implement the outlined steps for successful failover and failback.
