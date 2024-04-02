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
current={<Three viewBox="140 40 680 500" />}
desired={<Four viewBox="140 40 680 500" />}
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
current={<Five viewBox="140 40 680 500" />}
desired={<Six viewBox="140 40 680 500" />}
/>

<div>

#### Current

You have made sure by previous measures, for example, firewall rules that the lost region does not reconnect during the failover procedure.

Due to the partitioning of Zeebe, no data has been lost so far.

#### Desired

You are creating a temporary Camunda Platform deployment within the same region, but different namespace, to recover functionality. The extra namespace allows for easier distinguishing between the normal Zeebe deployment and Zeebe failover deployment.

The newly deployed Zeebe brokers will be running in failover mode to restore the quorum and allow processing again. Additionally, they will be pointed at the existing Elasticsearch instance and the newly deployed Elasticsearch instance to allow exporting the data again.

#### How to get there

In the previously cloned repository [c8-multi-region](https://github.com/camunda/c8-multi-region) navigate to the folder [aws/dual-region/kubernetes/region0](https://github.com/camunda/c8-multi-region/blob/main/aws/dual-region/kubernetes/region0/) it contains the example Helm values yaml `camunda-values-failover.yml` containing the required overlay for the **failover** mode.

In the case your **Region 0** was lost, please consider the folder [aws/dual-region/kubernetes/region1](https://github.com/camunda/c8-multi-region/blob/main/aws/dual-region/kubernetes/region1/). We will refrain from mentioning both possibilities always but as you can see it's simply the other way around in case of the loss of the **Region 0**.

The chosen `camunda-values-failover.yml` requires adjustments before installing the Helm chart and the same has to be done for the base `camunda-values.yml` in `aws/dual-region/kubernetes`.

- `ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS`
- `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL`
- `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL`

1. The bash script [generate_zeebe_helm_values.sh](https://github.com/camunda/c8-multi-region/blob/main/aws/dual-region/scripts/generate_zeebe_helm_values.sh) in the repository folder `aws/dual-region/scripts/` helps generate those values. You only have to copy and replace them within the previously mentioned Helm values files. It will use the exported environment variables of the environment prerequisites for namespaces and regions. Additionally, you have to pass in whether your region 0 or 1 was lost.

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
Please use the following to change the existing environment variable ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS in the failover Camunda Helm chart values file 'camunda-values-failover.yml'. It's part of the 'zeebe.env' path.

- name: ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS
  value: camunda-zeebe-0.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-0.camunda-zeebe.camunda-paris.svc.cluster.local:26502,camunda-zeebe-1.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-1.camunda-zeebe.camunda-paris.svc.cluster.local:26502,camunda-zeebe-2.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-2.camunda-zeebe.camunda-paris.svc.cluster.local:26502,camunda-zeebe-3.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-3.camunda-zeebe.camunda-paris.svc.cluster.local:26502

Please use the following to change the existing environment variable ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL in the failover Camunda Helm chart values file 'camunda-values-failover.yml'. It's part of the 'zeebe.env' path.

- name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL
  value: http://camunda-elasticsearch-master-hl.camunda-london.svc.cluster.local:9200

Please use the following to change the existing environment variable ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL in the failover Camunda Helm chart values file 'camunda-values-failover.yml'. It's part of the 'zeebe.env' path.

- name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL
  value: http://camunda-elasticsearch-master-hl.camunda-london-failover.svc.cluster.local:9200
```

  </summary>
</details>

2. As the script suggests, replace the environment variables within the `camunda-values-failover.yml`.
3. Repeat the adjustments for the base Helm values file `camunda-values.yml` in `aws/dual-region/kubernetes` with the same output for the mentioned environment variables.
4. From the terminal context of `aws/dual-region/kubernetes` execute:

```bash
helm install $HELM_RELEASE_NAME camunda/camunda-platform \
  --version $HELM_CHART_VERSION \
  --kube-context $CLUSTER_0 \
  --namespace $CAMUNDA_NAMESPACE_0_FAILOVER \
  -f camunda-values.yml \
  -f region0/camunda-values-failover.yml
```

#### Verification

The following command will show the deployed pods of the failover namespace.

Depending on your chosen `clusterSize` you should see that the failover deployment contains only a subset of Zeebe instances.

For example 2 in the case of `clusterSize: 8`. This allows to recover the quorum.

```bash
kubectl --context $CLUSTER_0 get pods -n $CAMUNDA_NAMESPACE_0_FAILOVER
```

Port-forwarding the Zeebe Gateway via `kubectl` and printing the topology should reveal that the **failover** brokers have joined the cluster.

```bash
ZEEBE_GATEWAY_SERVICE=$(kubectl --context $CLUSTER_0 get service --selector=app\.kubernetes\.io/component=zeebe-gateway -o jsonpath='{.items[0].metadata.name}' -n $CAMUNDA_NAMESPACE_0)
kubectl --context $CLUSTER_0 port-forward services/$ZEEBE_GATEWAY_SERVICE 26500:26500 -n $CAMUNDA_NAMESPACE_0
zbctl status --insecure --address localhost:26500
```

</div>

  </TabItem>
  <TabItem value="step3" label="Step 3">

#### Adjust Elasticsearch Exporters Endpoints to Temporary Deployment

<StateContainer
current={<Six viewBox="140 40 680 500" />}
desired={<Seven viewBox="140 40 680 500" />}
/>

<div>

#### Current

Zeebe won't be able to continue processing yet since the existing Zeebe brokers are still pointing at the Elasticsearch of the lost region.

Simply disabling the exporter would not be enough since the sequence numbers are not persistent when an exporter is removed and those are required by the Operate and Tasklist importers.

#### Desired

You are reconfiguring the existing Camunda deployment of `CAMUNDA_NAMESPACE_0` to point Zeebe to the temporary Elasticsearch instance that was previously created in **Step 2**. The outcome will be that Zeebe is unblocked and can export data to Elasticsearch again. This allows users to interact with the Camunda Platform again.

#### How to get there

In **Step 2** you have already adjusted the base Helm values file `camunda-values.yml` in `aws/dual-region/kubernetes` with the same changes as for the failover deployment for the environment variables.

- `ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS`
- `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL`
- `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL`

1. From the terminal context of `aws/dual-region/kubernetes`, you will do a Helm upgrade to update the existing Zeebe deployment in `CAMUNDA_NAMESPACE_0` to point to the failover Elasticsearch instance:

```bash
helm upgrade $HELM_RELEASE_NAME camunda/camunda-platform \
  --version $HELM_CHART_VERSION \
  --kube-context $CLUSTER_0 \
  --namespace $CAMUNDA_NAMESPACE_0 \
  -f camunda-values.yml \
  -f region0/camunda-values.yml
```

#### Verification

The following command will show the deployed pods of the healthy namespace. You should see that the Zeebe brokers have just restarted or are still restarting due to the configuration upgrade.

```bash
kubectl --context $CLUSTER_0 get pods -n $CAMUNDA_NAMESPACE_0
```

Alternatively, you can check that the Elasticsearch value was updated in the [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) configuration of the Zeebe brokers and are reflecting the previous output of the script `generate_zeebe_helm_values.sh` in **Step 2**.

```bash
kubectl --context $CLUSTER_0 get statefulsets $HELM_RELEASE_NAME-zeebe -oyaml -n $CAMUNDA_NAMESPACE_0 | grep -A1 'ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION[0-1]_ARGS_URL'
```

<details>
  <summary>Example Output</summary>
  <summary>

```bash
  - name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL
    value: http://camunda-elasticsearch-master-hl.camunda-primary.svc.cluster.local:9200
--
  - name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL
    value: http://camunda-elasticsearch-master-hl.camunda-primary-failover.svc.cluster.local:9200
```

  </summary>
</details>

</div>
  </TabItem>
</Tabs>

### Failback

<Tabs queryString="failback">
  <TabItem value="step1" label="Step 1" default>

#### Deploy Camunda 8 in Failback Mode in Newly Created Region

<StateContainer
current={<Seven viewBox="140 40 680 500" />}
desired={<Nine viewBox="140 40 680 500" />}
/>

<div>

#### Current

You have temporary Zeebe brokers deployed in failover mode together with a temporary Elasticsearch within the same surviving region.

#### Desired

You want to restore the dual-region functionality again and deploy Zeebe in failback mode to the newly restored region.

Failback mode means that two brokers will be added to the cluster to allow processing and restore data. While two brokers are sleeping since you still have the temporary setup that you have to transfer.

An Elasticsearch will also be deployed but not used yet since you have to restore a backup from the temporary setup.

#### How to get there

The changes previously done in the base Helm values file `camunda-values.yml` in `aws/dual-region/kubernetes` should still be present from **Failover - Step 2**.

In particular, the values `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL` and `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL` should solely point at the surviving region.

In addition, the following Helm command will disable Operate and Tasklist since those will only be enabled at the end of the full region restore. It's required to keep them disabled in the newly created region due to their Elasticsearch importers.
Lastly, the `installationType` is set to `failBack` to switch the behaviour of Zeebe and prepare for this procedure.

1. From the terminal context of `aws/dual-region/kubernetes` execute:

```bash
helm install $HELM_RELEASE_NAME camunda/camunda-platform \
  --version $HELM_CHART_VERSION \
  --kube-context $CLUSTER_1 \
  --namespace $CAMUNDA_NAMESPACE_1 \
  -f camunda-values.yml \
  -f region1/camunda-values.yml \
  --set global.multiregion.installationType=failBack \
  --set operate.enabled=false \
  --set tasklist.enabled=false
```

#### Verification

The following command will show the deployed pods of the newly created region.

Depending on your chosen `clusterSize` you should see that the **failback** deployment contains some Zeebe instances being ready and others unready. Those unready instances are sleeping indefinitely and is the expected behaviour.
This behaviour stems from the **failback** mode since we still have the temporary **failover**, which acts as replacement for the lost region.

For example in the case of `clusterSize: 8`, you find 2 active Zeebe brokers and 2 unready brokers in the newly created region.

```bash
kubectl --context $CLUSTER_1 get pods -n $CAMUNDA_NAMESPACE_1
```

Port-forwarding the Zeebe Gateway via `kubectl` and printing the topology should reveal that the **failback** brokers have joined the cluster.

```bash
ZEEBE_GATEWAY_SERVICE=$(kubectl --context $CLUSTER_0 get service --selector=app\.kubernetes\.io/component=zeebe-gateway -o jsonpath='{.items[0].metadata.name}' -n $CAMUNDA_NAMESPACE_0)
kubectl --context $CLUSTER_0 port-forward services/$ZEEBE_GATEWAY_SERVICE 26500:26500 -n $CAMUNDA_NAMESPACE_0
zbctl status --insecure --address localhost:26500
```

</div>
  </TabItem>
  <TabItem value="step2" label="Step 2">

#### Pause Elasticsearch Exporters and Operate / Tasklist

<StateContainer
current={<Nine viewBox="140 40 680 500" />}
desired={<Ten viewBox="140 40 680 500" />}
/>

<div>

#### Current

You currently have the following setups:

- Healthy Camunda Platform
- Camunda Platform in failover mode within the same region as the healthy setup
- Camunda Platform in failback mode within a newly created region

#### Desired

:::warning

This step is very important to minimise the risk of loosing any data when restoring the backup in the new region.

There remains a small chance of losing some data in Elasticsearch (in turn in Operate and Tasklist). This is because Zeebe might have exported some records to the failover Elasticsearch in `REGION_0`, but not to the main Elasticsearch in `REGION_0` before pausing the exporters. So those records are not included in the `REGION_0` Elasticsearch backup when the new `REGION_1` Elasticsearch is restored from the `REGION_0` backup, the new region is missing those records and Zeebe does not re-export them.

:::

You are preparing everything for the newly created region to take over again to restore the benefits of a dual-region setup.

For this, you need to stop the Zeebe exporters to not export any new data to Elasticsearch, so you can create a backup.

Additionally, you need to scale down Operate and Tasklist. This will result in users not being able to interact with the Camunda Platform anymore and is required to guarantee no new data is imported to Elasticsearch.

:::note

That this **does not** affect processing of process instances in any way. The impact is that some information about the affected instances might not be visible in Operate.

:::

#### How to get there

1. Disable Operate and Tasklist by scaling to 0

```bash
OPERATE_DEPLOYMENT=$(kubectl --context $CLUSTER_0 get deployment --selector=app\.kubernetes\.io/component=operate -o jsonpath='{.items[0].metadata.name}' -n $CAMUNDA_NAMESPACE_0)
TASKLIST_DEPLOYMENT=$(kubectl --context $CLUSTER_0 get deployment --selector=app\.kubernetes\.io/component=tasklist -o jsonpath='{.items[0].metadata.name}' -n $CAMUNDA_NAMESPACE_0)

kubectl --context $CLUSTER_0 scale deployments/$OPERATE_DEPLOYMENT --replicas 0
kubectl --context $CLUSTER_0 scale deployments/$TASKLIST_DEPLOYMENT --replicas 0

```

2. Disable the Zeebe Elasticsearch exporters in Zeebe via kubectl

```bash
ZEEBE_GATEWAY_SERVICE=$(kubectl --context $CLUSTER_0 get service --selector=app\.kubernetes\.io/component=zeebe-gateway -o jsonpath='{.items[0].metadata.name}' -n $CAMUNDA_NAMESPACE_0)
kubectl --context $CLUSTER_0 port-forward services/$ZEEBE_GATEWAY_SERVICE 9600:9600 -n $CAMUNDA_NAMESPACE_0
curl -i localhost:9600/actuator/exporting/pause -XPOST
# The successful response should be:
# HTTP/1.1 204 No Content
```

#### Verification

For Operate and Tasklist, you can confirm that the deployments have successfully scaled down by listing those and indicating `0/0` ready.

```bash
kubectl --context $CLUSTER_0 get deployments $OPERATE_DEPLOYMENT $TASKLIST_DEPLOYMENT -n $CAMUNDA_NAMESPACE_0
# NAME               READY   UP-TO-DATE   AVAILABLE   AGE
# camunda-operate    0/0     0            0           23m
# camunda-tasklist   0/0     0            0           23m
```

For the Zeebe Elasticsearch exporters, there's currently no API available to confirm this. Only the response code of `204` indicates a successful disabling.

</div>
  </TabItem>
  <TabItem value="step3" label="Step 3">

#### Create and Restore Elasticsearch Backup

<StateContainer
current={<Ten viewBox="140 40 680 500" />}
desired={<Eleven viewBox="140 40 680 500" />}
/>

<div>

#### Current

The Camunda Platform is currently not reachable by end-users and does not process any new processes to allow creating a backup of Elasticsearch without losing any new data.

#### Desired

You are creating a backup of the healthy Elasticsearch instance in `CAMUNDA_NAMESPACE_0` and restore it in the new region. This Elasticsearch backup contains all the data and may take some time to backup. The failover Elasticsearch instance only contains a subset of the data from after the region loss and is not sufficient to restore this in the new region.

#### How to get there

This builds on top of the [AWS Setup](./../../platform-deployment/helm-kubernetes/platforms/amazon-eks/dual-region.md) and assumes that the S3 bucket was automatically created as part of the Terraform execution.

:::info

The procedure works for other cloud providers and bare metal the same. You have to adjust the AWS S3 specific part depending on your chosen backup source for Elasticsearch. Make sure to conduct the [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshot-restore.html) on snapshot and restore to learn more about it and specifically the [different supported types](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshots-register-repository.html#ess-repo-types) by Elasticsearch.

:::

1. Determine the S3 bucket name by retrieving it via Terraform. Go to `aws/dual-region/terraform` within the repository and retrieve the bucket name from the Terraform state.

```bash
export S3_BUCKET_NAME=$(terraform output -raw s3_bucket_name)
```

2. Configure Elasticsearch backup endpoint in the healthy namespace `CAMUNDA_NAMESPACE_0`

```bash
ELASTIC_POD=$(kubectl --context $CLUSTER_0 get pod --selector=app\.kubernetes\.io/name=elasticsearch -o jsonpath='{.items[0].metadata.name}' -n $CAMUNDA_NAMESPACE_0)
kubectl --context $CLUSTER_0 exec -n $CAMUNDA_NAMESPACE_0 -it $ELASTIC_POD -- curl -XPUT "http://localhost:9200/_snapshot/camunda_backup" -H "Content-Type: application/json" -d'
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

3. Create an Elasticsearch backup in the healthy namespace `CAMUNDA_NAMESPACE_0`. Depending on the amount of data, this operation will take a while to complete.

```bash
# The backup will be called failback
kubectl --context $CLUSTER_0 exec -n $CAMUNDA_NAMESPACE_0 -it $ELASTIC_POD -- curl -XPUT "http://localhost:9200/_snapshot/camunda_backup/failback?wait_for_completion=true"
```

4. Verify that the backup has been completed successfully by checking all backups and ensuring the `state` is `SUCCESS`

```bash
kubectl --context $CLUSTER_0 exec -n $CAMUNDA_NAMESPACE_0 -it $ELASTIC_POD -- curl -XGET "http://localhost:9200/_snapshot/camunda_backup/_all"
```

<details>
  <summary>Example Output</summary>
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

5. Configure Elasticsearch backup endpoint in the new region namespace `CAMUNDA_NAMESPACE_1`. It's essential to only do this step now as otherwise it won't see the backup.

```bash
ELASTIC_POD=$(kubectl --context $CLUSTER_1 get pod --selector=app\.kubernetes\.io/name=elasticsearch -o jsonpath='{.items[0].metadata.name}' -n $CAMUNDA_NAMESPACE_1)
kubectl --context $CLUSTER_1 exec -n $CAMUNDA_NAMESPACE_1 -it $ELASTIC_POD -- curl -XPUT "http://localhost:9200/_snapshot/camunda_backup" -H "Content-Type: application/json" -d'
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

6. Verify that the backup can be found in the shared S3 bucket

```bash
kubectl --context $CLUSTER_1 exec -n $CAMUNDA_NAMESPACE_1 -it $ELASTIC_POD -- curl -XGET "http://localhost:9200/_snapshot/camunda_backup/_all"
```

The example output above should be the same since it's the same backup.

7. Restore Elasticsearch backup in the new region namespace `CAMUNDA_NAMESPACE_1`. Depending on the amount of data, this operation will take a while to complete.

```bash
kubectl --context $CLUSTER_1 exec -n $CAMUNDA_NAMESPACE_1 -it $ELASTIC_POD -- curl -XPOST "http://localhost:9200/_snapshot/camunda_backup/failback/_restore?wait_for_completion=true"
```

8. Verify that the restore has been completed successfully in the new region.

```bash
kubectl --context $CLUSTER_1 exec -n $CAMUNDA_NAMESPACE_1 -it $ELASTIC_POD -- curl -XGET "http://localhost:9200/_snapshot/camunda_backup/failback/_status"
```

<details>
  <summary>Example Output</summary>
  <summary>

The important part being the `state: "SUCCESS"` and that `done` and `total` are equal. This is just an example and the values will differ for you!

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

#### Adjust Elasticsearch Exporters Endpoints to Newly Created Region

<StateContainer
current={<Eleven viewBox="140 40 680 500" />}
desired={<Twelve viewBox="140 40 680 500" />}
/>

<div>

#### Current

The backup of Elasticsearch has been created and restored to the new region.

The Camunda Platform remains unreachable by end-users as you proceed to restore functionality.

#### Desired

You are pointing all Camunda Platforms from the temporary Elasticsearch to the Elasticsearch in the new region.

The Elasticsearch exporters will remain paused during this step.

#### How to get there

Your `camunda-values-failover.yml` and base `camunda-values.yml` require adjustments again to reconfigure all installations to the Elasticsearch instance in the new region.

- `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL`
- `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL`

1. The bash script [generate_zeebe_helm_values.sh](https://github.com/camunda/c8-multi-region/blob/main/aws/dual-region/scripts/generate_zeebe_helm_values.sh) in the repository folder `aws/dual-region/scripts/` helps generate those values again. You only have to copy and replace them within the previously mentioned Helm values files. It will use the exported environment variables of the environment prerequisites for namespaces and regions.

```bash
./generate_zeebe_helm_values.sh

# It will ask you to provide the following values
# Enter Zeebe cluster size (total number of Zeebe brokers in both Kubernetes clusters):
## for a dual-region setup we recommend 8. Resulting in 4 brokers per region.
```

<details>
  <summary>Example output</summary>
  <summary>

```bash
Please use the following to change the existing environment variable ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS in the failover Camunda Helm chart values file 'camunda-values-failover.yml'. It's part of the 'zeebe.env' path.

- name: ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS
  value: camunda-zeebe-0.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-0.camunda-zeebe.camunda-paris.svc.cluster.local:26502,camunda-zeebe-1.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-1.camunda-zeebe.camunda-paris.svc.cluster.local:26502,camunda-zeebe-2.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-2.camunda-zeebe.camunda-paris.svc.cluster.local:26502,camunda-zeebe-3.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-3.camunda-zeebe.camunda-paris.svc.cluster.local:26502

Please use the following to change the existing environment variable ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL in the failover Camunda Helm chart values file 'camunda-values-failover.yml'. It's part of the 'zeebe.env' path.

- name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL
  value: http://camunda-elasticsearch-master-hl.camunda-london.svc.cluster.local:9200

Please use the following to change the existing environment variable ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL in the failover Camunda Helm chart values file 'camunda-values-failover.yml'. It's part of the 'zeebe.env' path.

- name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL
  value: http://camunda-elasticsearch-master-hl.camunda-paris.svc.cluster.local:9200
```

  </summary>
</details>

2. As the script suggests, replace the environment variables within the `camunda-values-failover.yml`.
3. Repeat the adjustments for the base Helm values file `camunda-values.yml` in `aws/dual-region/kubernetes` with the same output for the mentioned environment variables.
4. Upgrade the normal Camunda environment in `CAMUNDA_NAMESPACE_0` and `REGION 0` to point to the new Elasticsearch

```bash
helm upgrade $HELM_RELEASE_NAME camunda/camunda-platform \
  --version $HELM_CHART_VERSION \
  --kube-context $CLUSTER_0 \
  --namespace $CAMUNDA_NAMESPACE_0 \
  -f camunda-values.yml \
  -f region0/camunda-values.yml \
  --set operate.enabled=false \
  --set tasklist.enabled=false
```

5. Upgrade the failover Camunda environment in `CAMUNDA_NAMESPACE_0_FAILOVER` and `REGION 0` to point to the new Elasticsearch

```bash
helm upgrade $HELM_RELEASE_NAME camunda/camunda-platform \
  --version $HELM_CHART_VERSION \
  --kube-context $CLUSTER_0 \
  --namespace $CAMUNDA_NAMESPACE_0_FAILOVER \
  -f camunda-values.yml \
  -f region0/camunda-values-failover.yml
```

6. Upgrade the new region environment in `CAMUNDA_NAMESPACE_1` and `REGION 1` to point to the new Elasticsearch

```bash
helm upgrade $HELM_RELEASE_NAME camunda/camunda-platform \
  --version $HELM_CHART_VERSION \
  --kube-context $CLUSTER_1 \
  --namespace $CAMUNDA_NAMESPACE_1 \
  -f camunda-values.yml \
  -f region1/camunda-values.yml \
  --set global.multiregion.installationType=failBack \
  --set operate.enabled=false \
  --set tasklist.enabled=false
```

7. Delete the sleeping pods in the new region, as those are blocking a successful rollout due to the failback mode.

```bash
kubectl --context $CLUSTER_1 --namespace $CAMUNDA_NAMESPACE_1 delete pods --selector=app\.kubernetes\.io/component=zeebe-broker
```

#### Verification

The following command will show the deployed pods of the namespaces. You should see that the Zeebe brokers are restarting. Adjusting the command for the other cluster and namespaces should reveal the same.

```bash
kubectl --context $CLUSTER_0 get pods -n $CAMUNDA_NAMESPACE_0
```

Alternatively, you can check that the Elasticsearch value was updated in the [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) configuration of the Zeebe brokers and are reflecting the previous output of the script `generate_zeebe_helm_values.sh` in **Step 1**.

```bash
kubectl --context $CLUSTER_0 get statefulsets $HELM_RELEASE_NAME-zeebe -oyaml -n $CAMUNDA_NAMESPACE_0 | grep -A1 'ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION[0-1]_ARGS_URL'
```

<details>
  <summary>Example Output</summary>
  <summary>

```bash
  - name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL
    value: http://camunda-elasticsearch-master-hl.camunda-primary.svc.cluster.local:9200
--
  - name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL
    value: http://camunda-elasticsearch-master-hl.camunda-primary-failover.svc.cluster.local:9200
```

  </summary>
</details>

</div>
  </TabItem>
  <TabItem value="step5" label="Step 5">

#### Reactivate Exporters and Operate / Tasklist

<StateContainer
current={<Twelve viewBox="140 40 680 500" />}
desired={<Thirteen viewBox="140 40 680 500" />}
/>

<div>

#### Current

The Camunda Platforms are pointing at the Elasticsearch instances in both regions again and not the temporary instance. It still remains unreachable to the end-users and no processes are advanced.

#### Desired

You are reactivating the exporters and enabling Operate and Tasklist again within the two regions. This will allow users to interact with the Camunda Platform again.

#### How to get there

1. Upgrade the normal Camunda environment in `CAMUNDA_NAMESPACE_0` and `REGION 0` to deploy Operate and Tasklist.

```bash
helm upgrade $HELM_RELEASE_NAME camunda/camunda-platform \
  --version $HELM_CHART_VERSION \
  --kube-context $CLUSTER_0 \
  --namespace $CAMUNDA_NAMESPACE_0 \
  -f camunda-values.yml \
  -f region0/camunda-values.yml
```

2. Upgrade the new region environment in `CAMUNDA_NAMESPACE_1` and `REGION 1` to deploy Operate and Tasklist.

```bash
helm upgrade $HELM_RELEASE_NAME camunda/camunda-platform \
  --version $HELM_CHART_VERSION \
  --kube-context $CLUSTER_1 \
  --namespace $CAMUNDA_NAMESPACE_1 \
  -f camunda-values.yml \
  -f region1/camunda-values.yml \
  --set global.multiregion.installationType=failBack
```

3. Reactivate the exporters by sending the API activation request via the Zeebe Gateway

```bash
ZEEBE_GATEWAY_SERVICE=$(kubectl --context $CLUSTER_0 get service --selector=app\.kubernetes\.io/component=zeebe-gateway -o jsonpath='{.items[0].metadata.name}' -n $CAMUNDA_NAMESPACE_0)
kubectl --context $CLUSTER_0 port-forward services/$ZEEBE_GATEWAY_SERVICE 9600:9600 -n $CAMUNDA_NAMESPACE_0
curl -i localhost:9600/actuator/exporting/resume -XPOST
# The successful response should be:
# HTTP/1.1 204 No Content
```

#### Verification

For Operate and Tasklist, you can confirm that the deployments have successfully been deployed by listing those and indicating `1/1` ready. The same command can be applied for the `CLUSTER_1` and `CAMUNDA_NAMESPACE_1`.

```bash
kubectl --context $CLUSTER_0 get deployments -n $CAMUNDA_NAMESPACE_0
# NAME                    READY   UP-TO-DATE   AVAILABLE   AGE
# camunda-operate         1/1     1            1           3h24m
# camunda-tasklist        1/1     1            1           3h24m
# camunda-zeebe-gateway   1/1     1            1           3h24m
```

For the Zeebe Elasticsearch exporters, there's currently no API available to confirm this. Only the response code of `204` indicates a successful resumption.

</div>
  </TabItem>
  <TabItem value="step6" label="Step 6">

#### Remove Temporary Failover Installation

<StateContainer
current={<Thirteen viewBox="140 40 680 500" />}
desired={<Fourteen viewBox="140 40 680 500" />}
/>

<div>

#### Current

The Camunda Platform is healthy and running in two regions again. You have redeployed Operate and Tasklist and enabled the Elasticsearch exporters again. This will allow users to interact with Camunda 8 again.

#### Desired

You can remove the temporary failover solution since it is not required anymore and would hinder disablement of the failback mode within the new region.

#### How to get there

1. You can uninstall the failover installation via Helm.

```bash
helm uninstall $HELM_RELEASE_NAME --kube-context $CLUSTER_0 --namespace $CAMUNDA_NAMESPACE_0_FAILOVER
```

2. Delete the leftover persistent volume claims of the Camunda 8 components

```bash
kubectl --context $CLUSTER_0 delete pvc --all -n $CAMUNDA_NAMESPACE_0_FAILOVER
```

#### Verification

The following will show the pods within the namespace. You deleted the Helm installation in the failover namespace, which should result in no pods or in deletion state.

```bash
kubectl --context $CLUSTER_0 get pods -n $CAMUNDA_NAMESPACE_0_FAILOVER
```

Port-forwarding the Zeebe Gateway via `kubectl` and printing the topology should reveal that the failover brokers are missing.

```bash
ZEEBE_GATEWAY_SERVICE=$(kubectl --context $CLUSTER_0 get service --selector=app\.kubernetes\.io/component=zeebe-gateway -o jsonpath='{.items[0].metadata.name}' -n $CAMUNDA_NAMESPACE_0)
kubectl --context $CLUSTER_0 port-forward services/$ZEEBE_GATEWAY_SERVICE 26500:26500 -n $CAMUNDA_NAMESPACE_0
zbctl status --insecure --address localhost:26500
```

</div>
  </TabItem>
  <TabItem value="step7" label="Step 7">

#### Switch to Normal Mode in Zeebe for Newly Created Region

<StateContainer
current={<Fourteen viewBox="140 40 680 500" />}
desired={<Fifteen viewBox="140 40 680 500" />}
/>

<div>

#### Current

You have almost fully restored the dual-region setup. Two Camunda deployments exist in two different regions.

The failback mode is still enabled in the restored region.

#### Desired

You restore the new region to its normal functionality by removing the failback mode and forcefully removing the sleeping Zeebe pods. They would otherwise hinder the rollout since they will never be ready.

With this done Zeebe is fully functional again and you are prepared in case of another region loss.

#### How to get there

1. Upgrade the new region environment in `CAMUNDA_NAMESPACE_1` and `REGION 1` by removing the failback mode

```bash
helm upgrade $HELM_RELEASE_NAME camunda/camunda-platform \
  --version $HELM_CHART_VERSION \
  --kube-context $CLUSTER_1 \
  --namespace $CAMUNDA_NAMESPACE_1 \
  -f camunda-values.yml \
  -f region1/camunda-values.yml
```

2. Delete the sleeping pods in the new region, as those are blocking a successful rollout due to the failback mode.

```bash
kubectl --context $CLUSTER_1 --namespace $CAMUNDA_NAMESPACE_1 delete pods --selector=app\.kubernetes\.io/component=zeebe-broker
```

#### Verification

Port-forwarding the Zeebe Gateway via `kubectl` and printing the topology should reveal that all brokers have joined the Zeebe cluster again.

```bash
ZEEBE_GATEWAY_SERVICE=$(kubectl --context $CLUSTER_0 get service --selector=app\.kubernetes\.io/component=zeebe-gateway -o jsonpath='{.items[0].metadata.name}' -n $CAMUNDA_NAMESPACE_0)
kubectl --context $CLUSTER_0 port-forward services/$ZEEBE_GATEWAY_SERVICE 26500:26500 -n $CAMUNDA_NAMESPACE_0
zbctl status --insecure --address localhost:26500
```

</div>
  </TabItem>
</Tabs>
