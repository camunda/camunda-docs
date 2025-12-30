---
id: dual-region-operational-procedure
sidebar_label: Dual-region operational procedure
title: Helm chart dual-region operational procedure
description: "This operational blueprint procedure is a step-by-step guide on how to restore operations in the case of a total region failure."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import StateContainer from './components/stateContainer.jsx';

<!-- Image source: https://miro.com/app/board/uXjVL-6SrPc=/ -->

import OC from './img/oc-pod.jpg';

<!-- Failover -->

import Four from './img/4.jpg';
import Five from './img/5.jpg';
import Six from './img/6.jpg';

<!-- Failback -->

import Eight from './img/8.jpg';
import Nine from './img/9.jpg';
import Ten from './img/10.jpg';
import Eleven from './img/11.jpg';
import Twelve from './img/12.jpg';
import Thirteen from './img/13.jpg';
import Fourteen from './img/14.jpg';
import Fifteen from './img/15.jpg';

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

:::info

In the following examples, direct API calls are used because authentication methods may vary depending on your embedded Identity configuration.

The **Management API** (default port `9600`) is not secured by default.

The **v2 REST API** (default port `8080`) **requires authentication**, described in the [API authentication guide](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md).

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

The `camunda-zeebe-x` pod represents the new architecture that contains the Orchestration Cluster and its components. It includes the former Zeebe Gateway, Operate, Tasklist, the new embedded Identity, and the new Camunda Exporter.

<div style={{textAlign: 'center'}}>
  <img src={OC} alt="Orchestration Cluster" style={{border: 'none', width: '60%', transform: 'scale(1.3)'}} />
</div>

### Failover phase

The Failover phase outlines steps for removing lost brokers, redistributing load, disabling Elasticsearch export to a failed region, and restoring user interaction with Camunda 8 to ensure smooth recovery and continued functionality.

<Tabs queryString="failover" values={[{label: 'Step 1', value: 'step1'}, {label: 'Step 2', value: 'step2'}]}>
<TabItem value="step1" label="Step 1" default>

#### Remove lost brokers from Zeebe cluster in the surviving region

<StateContainer
current={<img src={Four} alt="Current state diagram" style={{border: 'none', transform: 'scale(1.1)'}} />}
desired={<img src={Five} alt="Desired state diagram" style={{border: 'none', transform: 'scale(1.1)'}} />}
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

2. Port-forward the Zeebe Gateway service to access the [Management REST API](/self-managed/components/orchestration-cluster/zeebe/configuration/gateway.md#managementserver):

   ```bash
   kubectl --context $CLUSTER_SURVIVING port-forward services/$CAMUNDA_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
   ```

3. Based on the [Cluster Scaling APIs](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md), send a request to the Zeebe Gateway to redistribute load to the remaining brokers and remove the lost ones.
   Depending on which region was lost, you must redistribute to either the even- or odd-numbered brokers. In this example, `region 1` was lost, along with the odd-numbered brokers. Therefore, the load is redistributed to the even-numbered brokers. Run the appropriate command for the surviving region to remove the lost brokers and trigger redistribution.
   Removing the lost (odd-numbered) brokers will automatically redistribute partitions to the remaining (even-numbered) brokers.

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
current={<img src={Five} alt="Current state diagram" style={{border: 'none', transform: 'scale(1.1)'}} />}
desired={<img src={Six} alt="Desired state diagram" style={{border: 'none', transform: 'scale(1.1)'}} />}
/>

<div>

| **Details**             | **Current state**                                                                                                                                           | **Desired state**                                                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Zeebe configuration** | Zeebe brokers in the surviving region are still configured to point to the Elasticsearch instance of the lost region. Zeebe cannot continue exporting data. | Elasticsearch exporter to the failed region has been disabled in the Zeebe cluster. Zeebe can export data to Elasticsearch again. |
| **User interaction**    | Regular interaction with Camunda 8 is not restored.                                                                                                         | Regular interaction with Camunda 8 is restored, marking the conclusion of the temporary recovery.                                 |

:::info

If you have upgraded from a previously migrated 8.7 system, you may still have the legacy `elasticsearchregion0` and `elasticsearchregion1` exporters configured.

- If **both exporters are disabled**, you can safely ignore them.
- If they are **enabled** (for example, because you’re using **Optimize**), apply the same logic to these exporters as described for the new ones in this guide.

:::

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
current={<img src={Six} alt="Current state diagram" style={{border: 'none', transform: 'scale(1.1)'}} />}
desired={<img src={Eight} alt="Desired state diagram" style={{border: 'none', transform: 'scale(1.1)'}} />}
/>

<div>

| **Details**              | **Current state**                                                                                                                                             | **Desired state**                                                                                                                                                                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Camunda 8**            | A standalone region with a fully functional Camunda 8 setup, including the Orchestration Cluster (Zeebe, Operate, Tasklist, Zeebe Gateway) and Elasticsearch. | Restore dual-region functionality by deploying Camunda 8 isolated to the Orchestration Cluster (Zeebe and Zeebe Gateway) and Elasticsearch in the newly restored region. Disable the standalone Schema Manager to prevent seeding Elasticsearch. |
| **Operate and Tasklist** | Operate and Tasklist are operational in the standalone region.                                                                                                | Keep Operate and Tasklist disabled in the restored region to avoid interference during the database backup and restore process. They will also be disabled in the following steps for the surviving region.                                      |

#### Procedure

This step involves redeploying the recreated region using the same values files from the initial deployment.

The Helm command also disables Operate and Tasklist. These components will be re-enabled only after region recovery is complete. Keeping them disabled in the newly created region helps prevent data loss, as Operate and Tasklist may still rely on v1 APIs and functionality that are isolated to a single region. Disabling them also prevents user confusion, since no visible updates will appear for their actions while the exporters remain disabled in the following steps.

<Tabs groupId="clusters-types">
  <TabItem value="EKS" label="EKS">

This procedure requires your Helm values file, `camunda-values.yml,` in `aws/dual-region/kubernetes,` used to deploy EKS Dual-region Camunda clusters.

Ensure that the values for `ZEEBE_BROKER_EXPORTERS_CAMUNDAREGION0_ARGS_CONNECT_URL` and `ZEEBE_BROKER_EXPORTERS_CAMUNDAREGION1_ARGS_CONNECT_URL` correctly point to their respective regions. The placeholder in `CAMUNDA_CLUSTER_INITIALCONTACTPOINTS` should contain the Zeebe endpoints for both regions, the result of the `aws/dual-region/scripts/generate_zeebe_helm_values.sh`.

This step is equivalent to applying for the region to be recreated:

- [Setting up the Camunda 8 Dual-Region Helm chart](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md#camunda-8-helm-chart-prerequisites)
- [Deploying the Camunda 8 Dual-Region Helm chart](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md#deploy-camunda-8)

:::important
The standalone Schema Manager must be disabled; otherwise, it will prevent a successful restore of the Elasticsearch backup later on. If you forget to disable it, you must manually remove all created indices in Elasticsearch in the restored region before restoring the backup.
:::

There is no Helm chart option for this setting. Because `orchestration.env` is an array, it cannot be overwritten through an overlay and must be added manually on a temporary basis.

Edit the `camunda-values.yml` file in `aws/dual-region/kubernetes` to include the following under `orchestration.env`:

```yaml
orchestration:
  env:
    - name: CAMUNDA_DATABASE_SCHEMAMANAGER_CREATESCHEMA
      value: "false"
  # ...
```

From the terminal context of `aws/dual-region/kubernetes` execute:

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

After successfully applying the recreated region, remove the temporary `CAMUNDA_DATABASE_SCHEMAMANAGER_CREATESCHEMA` environment variable.

</TabItem>
<TabItem value="OpenShift" label="OpenShift">

Follow the installation steps **recreated region**:

- [Setting up the Camunda 8 Dual-Region Helm chart](/self-managed/deployment/helm/cloud-providers/openshift/dual-region.md#configure-your-deployment-for-each-region) _Optional if you already have your pre-configured `generated-values-file.yml`_
- Once your values file is generated from the installation step, install **Camunda 8 only in the recreated region**. Adjust the installation command to disable Operate and Tasklist:

  ```bash
  --set orchestration.profiles.operate=false \
  --set orchestration.profiles.tasklist=false
  ```

  :::important
  The standalone Schema Manager must be disabled; otherwise, it will prevent a successful restore of the Elasticsearch backup later on. If you forget to disable it, you must manually remove all created indices in Elasticsearch in the restored region before restoring the backup.
  :::

  There is no Helm chart option for this setting. Because `orchestration.env` is an array, it cannot be overwritten through an overlay and must be added manually on a temporary basis.

  Edit the `generated-values-region-1|2.yaml` to include the following under `orchestration.env`:

  ```yaml
  orchestration:
    env:
      - name: CAMUNDA_DATABASE_SCHEMAMANAGER_CREATESCHEMA
        value: "false"
    # ...
  ```

  Example command adapted from the installation step:

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

  After successfully applying the recreated region, remove the temporary `CAMUNDA_DATABASE_SCHEMAMANAGER_CREATESCHEMA` environment variable again.

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

#### Deactivate Operate and Tasklist in the active region

<StateContainer
current={<img src={Eight} alt="Current state diagram" style={{border: 'none', transform: 'scale(1.1)'}} />}
desired={<img src={Nine} alt="Desired state diagram" style={{border: 'none', transform: 'scale(1.1)'}} />}
/>

| **Details**   | **Current State**                                                                                                                                    | **Desired State**                                                                                           |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Camunda 8** | The recovered region has been deployed with Operate and Tasklist disabled. Users can still access Operate and Tasklist through the surviving region. | Operate and Tasklist are turned off in the surviving region to avoid data loss during the backup procedure. |

#### How to get there

With the Orchestration Cluster, Operate and Tasklist are consolidated with the Zeebe Broker and Gateway into a single application.

Similar to `Step 1`, this step redeploys the active region using the same value files from the initial deployment.

Additionally, the Helm command disables Operate and Tasklist. These components will only be enabled at the end of the full region recovery again.

This step reduces the deployed application to the Zeebe Cluster and Elasticsearch only.

<Tabs groupId="clusters-types">
  <TabItem value="EKS" label="EKS">

This procedure requires your Helm values file, `camunda-values.yml,` in `aws/dual-region/kubernetes,` used to deploy EKS dual-region Camunda clusters.

Ensure that the values for `ZEEBE_BROKER_EXPORTERS_CAMUNDAREGION0_ARGS_CONNECT_URL` and `ZEEBE_BROKER_EXPORTERS_CAMUNDAREGION1_ARGS_CONNECT_URL` correctly point to their respective regions. The placeholder in `CAMUNDA_CLUSTER_INITIALCONTACTPOINTS` should contain the Zeebe endpoints for both regions, generated by the `aws/dual-region/scripts/generate_zeebe_helm_values.sh` script.

This step is equivalent to applying the configuration for the recreated region:

- [Setting up the Camunda 8 Dual-Region Helm chart](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md#camunda-8-helm-chart-prerequisites)
- [Deploying the Camunda 8 Dual-Region Helm chart](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md#deploy-camunda-8)

If not already done, remove the `CAMUNDA_DATABASE_SCHEMAMANAGER_CREATESCHEMA` variable from the `camunda-values.yml`.

Edit the `camunda-values.yml` in `aws/dual-region/kubernetes` and remove the following from `orchestration.env`:

```yaml
orchestration:
  env:
    - name: CAMUNDA_DATABASE_SCHEMAMANAGER_CREATESCHEMA
      value: "false"
  # ...
```

From the `aws/dual-region/kubernetes` directory, run:

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

Follow the installation steps for the **surviving region**:

- [Set up the Camunda 8 Dual-Region Helm chart](/self-managed/deployment/helm/cloud-providers/openshift/dual-region.md#configure-your-deployment-for-each-region) (optional if you already have your pre-configured `generated-values-file.yml`)
- Once your values file is generated from the installation step, upgrade **Camunda 8 only in the surviving region**. Adjust the installation command to disable Operate and Tasklist:

  ```bash
  --set orchestration.profiles.operate=false`
  --set orchestration.profiles.tasklist=false`
  ```

  Example command adapted from the installation step:

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

- [Follow the installation step for the **surviving region only**](/self-managed/deployment/helm/cloud-providers/openshift/dual-region.md#install-camunda-8-using-helm).

</TabItem>
</Tabs>

#### Verification

1. If the environment is exposed through an Ingress, verify that Operate and Tasklist are no longer accessible via the Ingress.
2. Check the logs of any `camunda-zeebe-X` pod to confirm that only a subset of profiles are active:

   ```bash
   kubectl --context $CLUSTER_SURVIVING logs camunda-zeebe-0 | grep "profiles are active"
   ```

   ```bash
   # The default are 5 profiles, so this confirms that Operate and Tasklist are not enabled
   io.camunda.application.StandaloneCamunda - The following 3 profiles are active: "broker", "identity", "consolidated-auth"
   ```

3. Alternatively, verify that the configuration does not list Operate and Tasklist as active profiles:

   ```bash
   kubectl --context $CLUSTER_SURVIVING get cm camunda-zeebe-configuration-unified -oyaml | grep spring -A2
   ```

   ```bash
   spring:
     profiles:
       active: "broker,identity,consolidated-auth"
   ```

  </TabItem>
  <TabItem value="step3" label="Step 3">

#### Pause Camunda exporters to Elasticsearch

<StateContainer
current={<img src={Nine} alt="Current state diagram" style={{border: 'none', transform: 'scale(1.1)'}} />}
desired={<img src={Ten} alt="Desired state diagram" style={{border: 'none', transform: 'scale(1.1'}} />}
/>

| **Details**   | **Current state**                                                                                                                                                                                                                                                                                                                                                      | **Desired state**                                                                                                                                                                                                   |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Camunda 8** | The Orchestration Cluster is operating in a single region:<ul><li> Isolated to a [Zeebe cluster](/reference/glossary.md#zeebe-cluster) in the surviving region.</li><li>Non-participating [Zeebe Brokers](/reference/glossary.md#zeebe-broker) in the recreated region.</li><li>Data is currently being exported to Elasticsearch from the surviving region.</li></ul> | Preparing the newly created region to take over and restore the dual-region setup. Stop Camunda exporters to prevent new data from being exported to Elasticsearch, allowing an Elasticsearch backup to be created. |

:::note

This step **does not** affect process instances. Process information may not be visible in Operate and Tasklist running in the affected instance.

:::

#### Procedure

1. Disable the Camunda Exporter exporters in Zeebe using kubectl and the [exporting API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#exporting-api):

   ```bash
   kubectl --context $CLUSTER_SURVIVING port-forward services/$CAMUNDA_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
   curl -i localhost:9600/actuator/exporting/pause -XPOST
   # The successful response should be:
   # HTTP/1.1 204 No Content
   ```

#### Verification

There is no API available to confirm the status of the Camunda exporters. A response code of `204` indicates that the disabling was successful. This is a synchronous operation.

  </TabItem>
  <TabItem value="step4" label="Step 4">

#### Create and restore Elasticsearch backup

<StateContainer
current={<img src={Ten} alt="Current state diagram" style={{border: 'none', transform: 'scale(1.1)'}} />}
desired={<img src={Eleven} alt="Desired state diagram" style={{border: 'none', transform: 'scale(1.1)'}} />}
/>

<div>

| **Details**                          | **Current State**                                                                                                                                | **Desired State**                                                                                                                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Camunda 8**<br />_(Zeebe Cluster)_ | Reachable by end-users but not processing any new process instances nor reflecting User changes. This state allows for data backup without loss. | Remain not processing any new instances nor processing user inputs.                                                                                                                   |
| **Elasticsearch Backup**             | No backup is in progress.                                                                                                                        | Backup of Elasticsearch in the surviving region is initiated and being restored in the recreated region, containing all necessary data. The backup process may take time to complete. |

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
   kubectl --context $CLUSTER_SURVIVING exec -n $CAMUNDA_NAMESPACE_SURVIVING -it $ELASTIC_POD -c elasticsearch -- \
    curl -XPUT 'http://localhost:9200/_snapshot/camunda_backup' \
    -H 'Content-Type: application/json' \
    -d'
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

3. Create an Elasticsearch backup in the surviving namespace `CAMUNDA_NAMESPACE_SURVIVING`. Depending on the amount of data, this operation will take a while to complete. It also explicitly includes the global state, which is required during restore because it contains the Camunda index templates.

   ```bash
   # The backup will be called failback
   kubectl --context $CLUSTER_SURVIVING exec -n $CAMUNDA_NAMESPACE_SURVIVING -it $ELASTIC_POD -c elasticsearch -- \
    curl -XPUT 'http://localhost:9200/_snapshot/camunda_backup/failback?wait_for_completion=true' \
    -H 'Content-Type: application/json' \
    -d '{"include_global_state": true}'
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
   kubectl --context $CLUSTER_RECREATED exec -n $CAMUNDA_NAMESPACE_RECREATED -it $ELASTIC_POD -c elasticsearch -- \
    curl -XPOST 'http://localhost:9200/_snapshot/camunda_backup/failback/_restore?wait_for_completion=true' \
    -H 'Content-Type: application/json' \
    -d '{"include_global_state": true}'
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

#### Initialize new Camunda exporter to the recreated region

<StateContainer
current={<img src={Eleven} alt="Current state diagram" style={{border: 'none', transform: 'scale(1.1)'}} />}
desired={<img src={Twelve} alt="Desired state diagram" style={{border: 'none', transform: 'scale(1.1)'}} />}
/>

<div>

| **Details**              | **Current state**                                               | **Desired state**                                                                                                                                                                                                                            |
| ------------------------ | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Camunda 8**            | Remains unreachable by end-users while restoring functionality. | Start a new exporter to the recreated region.<br /> Ensure that both Elasticsearch instances are populated for data redundancy. <br /> Separate the initialization step (asynchronous) and confirm completion before resuming the exporters. |
| **Elasticsearch Backup** | Backup has been created and restored to the recreated region.   | N/A                                                                                                                                                                                                                                          |

:::info

If you have upgraded from a previously migrated 8.7 system, you may still have the legacy `elasticsearchregion0` and `elasticsearchregion1` exporters configured.

- If **both exporters are disabled**, you can safely ignore them.
- If the old exporter is **enabled** in the survived region (for example, because you’re using **Optimize**), apply the same logic to these exporters as described for the new ones in this guide.

:::

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
  <TabItem value="step6" label="Step 6">

#### Reactivate Camunda exporter

<StateContainer
current={<img src={Twelve} alt="Current state diagram" style={{border: 'none', transform: 'scale(1.1)'}} />}
desired={<img src={Thirteen} alt="Desired state diagram" style={{border: 'none', transform: 'scale(1.1)'}} />}
/>

<div>

| **Details**   | **Current state**                                                                                                                                          | **Desired state**                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Camunda 8** | Not reachable yet by end-users and currently not exporting any data. Exporters are enabled for both regions, with the operation confirmed to be completed. | Reactivate existing exporters that will allow Zeebe to export data to Elasticsearch again. |

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
  <TabItem value="step7" label="Step 7">

#### Add new brokers to the Zeebe cluster

<StateContainer
current={<img src={Thirteen} alt="Current state diagram" style={{border: 'none', transform: 'scale(1.1)'}} />}
desired={<img src={Fourteen} alt="Desired state diagram" style={{border: 'none', transform: 'scale(1.1)'}} />}
/>

<div>

| **Details**   | **Current state**                                                                                                                          | **Desired state**                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| **Camunda 8** | Running in two regions, but not yet utilizing all Zeebe brokers. Operate and Tasklist remain unavailable, Elasticsearch exporters enabled. | Fully functional Zeebe cluster setup utilizing both regions, recovering the main dual-region benefits. |

#### How to get there

1.  From the base Helm values file (`camunda-values.yml`) in `aws/dual-region/kubernetes`, extract the `clusterSize` and `replicationFactor` values. You’ll need these when re-adding the brokers to the Zeebe cluster.

2.  Port-forward the Zeebe Gateway to access the [management REST API](/self-managed/components/orchestration-cluster/zeebe/configuration/gateway.md#managementserver). This allows you to send a Cluster API call to add the new brokers to the Zeebe cluster using the previously extracted `clusterSize` and `replicationFactor`.

    In this example, the `clusterSize` is `8` and the `replicationFactor` is `4`. Because the uneven brokers were lost, re-add them (brokers with IDs `1, 3, 5, 7`) and set the appropriate `replicationFactor` in the request.

    ```bash
    kubectl --context $CLUSTER_SURVIVING port-forward services/$CAMUNDA_RELEASE_NAME-zeebe-gateway 9600:9600 -n $CAMUNDA_NAMESPACE_SURVIVING
    ```

    <Tabs queryString="lost-region" values={[{label: 'Re-add uneven brokers', value: 'redistribute-to-even'}, {label: 'Re-add even brokers', value: 'redistribute-to-odd'}]}>
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

    :::note
    This step can take longer depending on the cluster size, data volume, and current load.
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

Another way to confirm this is to use the v2 topology REST endpoint to see that partitions are actively re-distributed to the uneven members.

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
      "partitions": [
        {
          "partitionId": 1,
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
      "nodeId": 3,
      "host": "camunda-zeebe-1.camunda-zeebe.camunda-paris",
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
          "role": "follower",
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
      "nodeId": 5,
      "host": "camunda-zeebe-2.camunda-zeebe.camunda-paris",
      "port": 26501,
      "partitions": [
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
    },
    {
      "nodeId": 7,
      "host": "camunda-zeebe-3.camunda-zeebe.camunda-paris",
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
          "role": "follower",
          "health": "healthy"
        }
      ],
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
    <TabItem value="step8" label="Step 8">

#### Start Operate and Tasklist

<StateContainer
current={<img src={Fourteen} alt="Current state diagram" style={{border: 'none', transform: 'scale(1.1)'}} />}
desired={<img src={Fifteen} alt="Desired state diagram" style={{border: 'none', transform: 'scale(1.1)'}} />}
/>

<div>

| **Details**          | **Current state**                                                                                                          | **Desired state**                                                                                                   |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Camunda 8**        | Remains unreachable by end-users while dual-region functionality is being restored.                                        | Enable Operate and Tasklist in both the surviving and recreated regions to restore user interaction with Camunda 8. |
| **User interaction** | Users can interact with Zeebe cluster again. Dual-region functionality is restored, improving reliability and performance. | Users can fully utilize the Camunda 8 environment again.                                                            |

#### Procedure

:::info

This step is executed at this stage because the application must be redeployed — all components run within the same Kubernetes pod. Performing it earlier would block the automatic rollout, as readiness only complete once Zeebe brokers have joined the cluster. Executing it prematurely would therefore require manual intervention.

:::

Reapply or upgrade the Helm release to enable and deploy Operate and Tasklist.

<Tabs groupId="clusters-types">
  <TabItem value="EKS" label="EKS">

Assuming based on **Step 1** and **Step 2**, the base Helm values file `camunda-values.yml` in `aws/dual-region/kubernetes` includes the adjustments for Elasticsearch and the Zeebe initial brokers.

Make sure to remove the `CAMUNDA_DATABASE_SCHEMAMANAGER_CREATESCHEMA` variable from `camunda-values.yml`.

Edit the `camunda-values.yml` in `aws/dual-region/kubernetes` and remove the following from the `orchestration.env`:

```yaml
orchestration:
  env:
    - name: CAMUNDA_DATABASE_SCHEMAMANAGER_CREATESCHEMA
      value: "false"
  # ...
```

1. Upgrade the Camunda environment in the surviving region (`CAMUNDA_NAMESPACE_SURVIVING` and `REGION_SURVIVING`) to deploy Operate and Tasklist:

   ```bash
   helm upgrade $CAMUNDA_RELEASE_NAME camunda/camunda-platform \
   --version $HELM_CHART_VERSION \
   --kube-context $CLUSTER_SURVIVING \
   --namespace $CAMUNDA_NAMESPACE_SURVIVING \
   -f camunda-values.yml \
   -f $REGION_SURVIVING/camunda-values.yml
   ```

2. Upgrade the environment in new region (`CAMUNDA_NAMESPACE_RECREATED` and `REGION_RECREATED`) to deploy Operate and Tasklist:

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

Follow the installation instructions for both regions. You’ll need to apply `helm upgrade` on both `CLUSTER_RECREATED` and `CLUSTER_SURVIVING`.

Make sure to remove the `CAMUNDA_DATABASE_SCHEMAMANAGER_CREATESCHEMA` variable from `camunda-values.yml`.

Edit the `generated-values-region-1|2.yml` file and remove the following from the `orchestration.env`:

```yaml
orchestration:
  env:
    - name: CAMUNDA_DATABASE_SCHEMAMANAGER_CREATESCHEMA
      value: "false"
  # ...
```

- [Apply the initial installation on the two regions](/self-managed/deployment/helm/cloud-providers/openshift/dual-region.md#install-camunda-8-using-helm).
- Ensure that the services are exported correctly using `subctl`.
- This step re-enables Operate and Tasklist in both regions.

</TabItem>
</Tabs>

#### Verification

1. If the environment is exposed through an Ingress, verify that Operate and Tasklist are reachable again.
2. Check the logs of any `camunda-zeebe-X` pod to confirm the active profiles.

   Run this command for both the surviving and recreated clusters (`CLUSTER_RECREATED` and `CAMUNDA_NAMESPACE_RECREATED`):

   ```bash
   kubectl --context $CLUSTER_SURVIVING logs camunda-zeebe-0 | grep "profiles are active"
   ```

   ```bash
   # The default are 5 profiles, so this confirms that Operate and Tasklist are enabled
   io.camunda.application.StandaloneCamunda - The following 5 profiles are active: "broker", "operate", "tasklist", "identity", "consolidated-auth"
   ```

3. Alternatively, verify that the configuration lists Operate and Tasklist as active profiles:

   ```bash
   kubectl --context $CLUSTER_SURVIVING get cm camunda-zeebe-configuration-unified -oyaml | grep spring -A2
   ```

   ```bash
   spring:
     profiles:
       active: "broker,operate,tasklist,identity,consolidated-auth"
   ```

</div>
  </TabItem>
</Tabs>

---

### Conclusion

Following this procedure ensures a structured and efficient recovery process that maintains operational continuity in dual-region deployments. Always manage dual-region environments carefully, and be prepared to follow these steps to perform a successful failover and failback.
