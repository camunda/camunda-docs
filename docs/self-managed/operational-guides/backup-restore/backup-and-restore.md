---
id: backup-and-restore
sidebar_label: Back up and restore
title: Camunda back up and restore
keywords: ["backup", "backups"]
description: "Learn how to back up and restore your Camunda 8 Self-Managed components."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ZeebeGrid from '../../../components/zeebe/react-components/\_zeebe-card';
import { esCards, rdbmsCards } from './react-components/\_card-data';

Use the backup feature to back up and restore your Camunda 8 Self-Managed components and cluster.

## About this guide

This guide covers how to back up and restore your Camunda 8 Self-Managed components and cluster. Automate backup and restore procedures with tools that meet your organization's requirements.

:::info

With Camunda 8.8, the architecture was updated. For clarity, the [Orchestration Cluster](/reference/glossary.md#orchestration-cluster) now consists of:

- Zeebe
- Web Applications (Operate and Tasklist)
- Identity

Depending on context, we may refer to a specific subcomponent of the Orchestration Cluster where appropriate.

:::

This guide includes procedures to:

- Regularly back up the state of the Orchestration Cluster and Optimize without any downtime. You can also back up and restore Web Modeler data.

- Restore a cluster from a backup if any failures occur that cause data loss.

Choose the guide that matches your secondary storage:

### Elasticsearch / OpenSearch

<ZeebeGrid zeebe={esCards} />

### Relational databases (RDBMS)

<ZeebeGrid zeebe={rdbmsCards} />

:::note

- The examples in this guide are based on using the following tools: [curl](https://curl.se/), [jq](https://jqlang.org/), and [kubectl](https://kubernetes.io/de/docs/reference/kubectl/).

:::

## Considerations

The backup of each component and the backup of a Camunda 8 cluster is identified by an ID. The backup ID must be an integer and greater than the previous backups.

:::note
We recommend using the unix timestamp as the backup ID.
:::

The steps outlined on this page are generally applicable for any kind of deployment but might differ slightly depending on your setup.

### Management API

The management API is an extension of the [Spring Boot Actuator](https://docs.spring.io/spring-boot/reference/actuator/index.html), typically used for monitoring and other operational purposes. This is not a public API and not exposed. You will need direct access to your Camunda cluster to be able to interact with these management APIs. This is why you'll often see the reference to `localhost`.

Direct access will depend on your deployment environment. For example, direct Kubernetes cluster access with [port-forwarding](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_port-forward/) or [exec](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_exec/) to execute commands directly on Kubernetes pods. In a manual deployment you will need to be able to reach the machines that host Camunda. Typically, the management port is on port `9600` but might differ on your setup and on the components. You can find the default for each component in their configuration page.

| Component                                                                                                               | Port |
| ----------------------------------------------------------------------------------------------------------------------- | ---- |
| [Optimize](/self-managed/components/optimize/configuration/system-configuration.md#container)                           | 8092 |
| [Orchestration Cluster](/self-managed/components/orchestration-cluster/zeebe/configuration/gateway.md#managementserver) | 9600 |

#### Examples for Kubernetes approaches

<Tabs groupId="application-ports">
   <TabItem value="port-forwarding" label="Port Forwarding" default>

Port-forwarding allows you to temporarily bind a remote Kubernetes cluster port of a service or pod directly to your local machine, allowing you to interact with it via `localhost:PORT`.

Since the services are bound to your local machine, you **cannot reuse the same port for all port-forwards** unless you start and stop each one based on usage. To avoid this limitation, the examples use different local ports for each service, allowing them to run simultaneously without conflict.

```bash
export CAMUNDA_RELEASE_NAME="camunda"
# kubectl port-forward services/$SERVICE_NAME $LOCAL_PORT:$REMOTE_PORT
kubectl port-forward services/$CAMUNDA_RELEASE_NAME-zeebe-gateway 9600:9600 & \
kubectl port-forward services/$CAMUNDA_RELEASE_NAME-optimize 8092:8092 & \
kubectl port-forward services/$CAMUNDA_RELEASE_NAME-elasticsearch 9200:9200 &
```

Using the bash instruction `&` at the end of each line would run the command in a subshell allowing the use of a single terminal.

   </TabItem>
   <TabItem value="exec" label="Exec">

An alternative to port-forwarding is to run commands directly on Kubernetes pods.
In this example we're going to spawn a temporary pod to execute a curl request.
Alternatives are to use existing pods within the namespace. Camunda's pod includes different base images, each with a different feature set.

```bash
# following will create a temporary alias within your terminal to overwrite the normal curl
export CAMUNDA_NAMESPACE="camunda"
export CAMUNDA_RELEASE_NAME="camunda"
# temporary overwrite of curl, can be removed with `unalias curl` again
alias curl="kubectl run curl --rm -i -n $CAMUNDA_NAMESPACE --restart=Never --image=alpine/curl -- -sS"

curl $CAMUNDA_RELEASE_NAME-zeebe-gateway:9600/actuator/health
curl $CAMUNDA_RELEASE_NAME-optimize:8092/actuator/health
curl $CAMUNDA_RELEASE_NAME-elasticsearch:9200/_cluster/health
```

This allows you to directly execute commands within the namespace and communicate with available services.

   </TabItem>
   <TabItem value="jobs" label="Cronjob">

The examples in this guide showcase the backup process in a manual fashion to help you fully understand the process.
You might want to use [Kubernetes Cronjobs](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/) to automate the backup process for your own use case based on your own environment on a regular schedule.

Kubernetes Cronjobs will spawn a [Job](https://kubernetes.io/docs/concepts/workloads/controllers/job/) on a regular basis. The job will run a defined image within a given namespace, allowing you to run commands and interact with the environment.

:::note

You can see further examples from Camunda consultants in the [Backup and Restore Workshop](https://github.com/camunda-consulting/c8-devops-workshop/tree/main/03%20-%20Lab%203%20-%20Backup%20and%20Restore). You can use these examples to achieve similar automation.

:::

   </TabItem>

</Tabs>

### ContextPath

If you are defining the `contextPath` in the Camunda Helm chart or the `management.server.servlet.context-path` in a standalone setup, your API requests must prepend the value specific to the `contextPath` for the individual component. If the `management.server.port` is defined this also applies to `management.endpoints.web.base-path`. You can learn more about this behavior in the [Spring Boot documentation](https://docs.spring.io/spring-boot/docs/2.1.7.RELEASE/reference/html/production-ready-monitoring.html#production-ready-customizing-management-server-context-path).

:::warning Optimize Helm chart Exception
Setting the `contextPath` in the Helm chart for Optimize will not overwrite the `contextPath` of the management API, it will remain as `/`.
:::

<details>
<summary>Example</summary>
<summary>

If you are defining the `contextPath` for the Orchestration Cluster in the Camunda Helm chart:

```bash
orchestration:
   contextPath: /example
```

A call to the management API of the Orchestration Cluster would look like the following example:

```bash
ORCHESTRATION_CLUSTER_MANAGEMENT_API=http://localhost:9600

curl $ORCHESTRATION_CLUSTER_MANAGEMENT_API/example/actuator/health
```

Without the `contextPath` it would just be:

```bash
ORCHESTRATION_CLUSTER_MANAGEMENT_API=http://localhost:9600

curl $ORCHESTRATION_CLUSTER_MANAGEMENT_API/actuator/health
```

</summary>
</details>
