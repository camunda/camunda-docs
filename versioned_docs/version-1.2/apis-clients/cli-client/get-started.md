---
id: get-started
title: "CLI client - Getting started guide"
sidebar_label: "Getting started guide"
---

In this tutorial, you will learn to use the CLI client `zbctl` to interact with Camunda Cloud.

## Prerequisites

- [Camunda Cloud account](/guides/getting-started/create-camunda-cloud-account.md)
- [Cluster](/guides/getting-started/create-camunda-cloud-account.md)
- [Client credentials](/guides/getting-started/setup-client-connection-credentials.md)
- [Modeler](/guides/getting-started/model-your-first-process.md)
- [NPM environment](https://www.npmjs.com/)

## Set up

### Installation

An installation can be done quickly via the package manager `npm`. The corresponding package is [here](https://www.npmjs.com/package/zbctl).

```bash
npm i -g zbctl
```

You can also download a binary for your operating system from the [Zeebe GitHub releases page](https://github.com/camunda-cloud/zeebe/releases).

### Connection settings

To use `zbctl`, it is recommended to define environment variables for the connection settings:

```bash
export ZEEBE_ADDRESS='[Zeebe API]'
export ZEEBE_CLIENT_ID='[Client ID]'
export ZEEBE_CLIENT_SECRET='[Client Secret]'
export ZEEBE_AUTHORIZATION_SERVER_URL='[OAuth API]'
```

When creating client credentials in Camunda Cloud, you have the option to download a file with the lines above filled out for you.

Alternatively, use the [described flags](https://www.npmjs.com/package/zbctl#usage) (`--address`, `--clientId`, and `--clientSecret`) with the `zbctl` commands.

### Test command

Use the following command to verify everything is set up correctly:

```bash
zbctl status
```

As a result, you should receive a similar response:

```bash
Cluster size: 1
Partitions count: 2
Replication factor: 1
Gateway version: unavailable
Brokers:
  Broker 0 - zeebe-0.zeebe-broker-service.456637ef-8832-428b-a2a4-82b531b25635-zeebe.svc.cluster.local:26501
    Version: unavailable
    Partition 1 : Leader
    Partition 2 : Leader
```

## Advanced process

Use [this process model](./assets/gettingstarted_quickstart_advanced.bpmn) for the tutorial.

![processId](./assets/zeebe-modeler-advanced-process-id.png)

This process includes a service task and an XOR gateway. Select the service task and fill in the properties. Set the **Type** to `test-worker`.

![process](./assets/zeebe-modeler-advanced.png)

The worker will return a JSON object as a result, which is used to decide which path to take.

Now, we can use the JSON object to route your process by filling in the condition expression on the two sequence flows after the XOR gateway.

Use the following conditional expression for the **Pong** sequence flow:

```bash
=return="Pong"
```

Use the following conditional expression for the **else** sequence flow:

```bash
=return!="Pong"
```

![sequenceflows](./assets/zeebe-modeler-advanced-sequence-flows.png)

## Deploy a process

Now, you can deploy the [process](./assets/gettingstarted_quickstart_advanced.bpmn). Navigate to the folder where you saved your process.

```bash
zbctl deploy gettingstarted_quickstart_advanced.bpmn
```

If the deployment is successful, you'll get the following output:

```bash
{
  "key": 2251799813685493,
  "processes": [
    {
      "bpmnProcessId": "camunda-cloud-quick-start-advanced",
      "version": 1,
      "processKey": 2251799813685492,
      "resourceName": "gettingstarted_quickstart_advanced.bpmn"
    }
  ]
}
```

:::note
You will need the `bpmnProcessId` to create a new instance.
:::

## Register a worker

The process uses the worker with the type `test-worker`. Register a new one by using the following command:

```bash
zbctl create worker test-worker --handler "echo {\"return\":\"Pong\"}"
```

## Start a new instance

You can start a new instance with a single command:

```bash
zbctl create instance camunda-cloud-quick-start-advanced
```

As a result, you'll get the following output. This output will contain—among others—the `processInstanceKey`:

```bash
{
  "processKey": 2251799813685492,
  "bpmnProcessId": "camunda-cloud-quick-start-advanced",
  "version": 1,
  "processInstanceKey": 2251799813685560
}
```

Navigate to **Operate** to monitor the process instance.

![operate-instances](assets/operate-advanced-instances-pong.png)

Because the worker returns the following output, the process ends in the upper end event following the **Ping** sequence flow:

```json
{
  "return": "Pong"
}
```

This will change the worker to the following:

```bash
zbctl create worker test-worker --handler "echo {\"return\":\"...\"}"
```

Creating a new instance leads to a second instance in **Operate**, which you'll see ending in the second end event following the **else** sequence flow:

![operate-instance](assets/operate-advanced-instances-other.png)

Next, you can connect both workers in parallel and create more process instances:

```bash
while true; do zbctl create instance camunda-cloud-quick-start-advanced; sleep 1; done
```

In **Operate**, you'll see instances ending in both end events depending on which worker picked up the job.

![operate-instances](assets/operate-advanced-instances.png)
