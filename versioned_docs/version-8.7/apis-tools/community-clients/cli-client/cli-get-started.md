---
id: cli-get-started
title: Getting started with the CLI client
sidebar_label: "Getting started with the CLI client"
description: "Get started with this tutorial that shows you how to interact with Camunda 8 using the community-supported CLI client and command line interface `zbctl`."
---

In this tutorial, you will learn how to use the [community-supported](https://github.com/camunda-community-hub) `zbctl` CLI client to interact with Camunda 8.

:::note
The CLI client doesn't support [multi-tenancy](/self-managed/concepts/multi-tenancy.md) and can only be used when multi-tenancy is disabled.
:::

## Prerequisites

- [Camunda 8 account](/guides/create-account.md)
- [Cluster](/guides/create-cluster.md)
- [Client credentials](/guides/setup-client-connection-credentials.md)
- [Modeler](/guides/model-your-first-process.md)
- [NPM environment](https://www.npmjs.com/)

## Set up

### Installation

Quickly install via the package manager `npm`. The corresponding package is [here](https://www.npmjs.com/package/zbctl).

```bash
npm i -g zbctl
```

You can also download a binary for your operating system from the [Zeebe GitHub releases page](https://github.com/camunda/camunda/releases).

### Connection settings

To use `zbctl`, it is recommended to define environment variables for the connection settings:

```bash
export ZEEBE_ADDRESS='[Zeebe API]'
export ZEEBE_CLIENT_ID='[Client ID]'
export ZEEBE_CLIENT_SECRET='[Client Secret]'
export ZEEBE_AUTHORIZATION_SERVER_URL='[OAuth API]'
```

When creating client credentials in Camunda 8, you have the option to download a file with the lines above filled out for you.

Alternatively, use the [described flags](https://www.npmjs.com/package/zbctl#usage) (`--address`, `--clientId`, and `--clientSecret`) with the `zbctl` commands.

### Test command

Use the following command to verify everything is set up correctly:

```bash
zbctl status
```

As a result, you will receive a similar response:

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

Use [this process model](/bpmn/apis-tools/gettingstarted_quickstart_advanced.bpmn) for the tutorial.

![processId](./assets/zeebe-modeler-advanced-process-id.png)

This process includes a service task and an XOR gateway. Select the service task and fill in the properties. Set the **Type** to `test-worker`.

![process](./assets/zeebe-modeler-advanced.png)

The worker will return a JSON object as a result, which is used to decide which path to take.

Now, we can use the JSON object to route your process by filling in the condition expression on the two sequence flows after the XOR gateway.

Use the following conditional expression for the **Pong** sequence flow:

```bash
=result="Pong"
```

Use the following conditional expression for the **else** sequence flow:

```bash
=result!="Pong"
```

![sequenceflows](./assets/zeebe-modeler-advanced-sequence-flows.png)

## Deploy a process

Now, you can deploy the [process](/bpmn/apis-tools/gettingstarted_quickstart_advanced.bpmn). Navigate to the folder where you saved your process.

```bash
zbctl deploy resource gettingstarted_quickstart_advanced.bpmn
```

If the deployment is successful, you'll get the following output:

```bash
{
  "key": 2251799813685493,
  "deployments": [
    {
      "process": {
        "bpmnProcessId": "camunda-cloud-quick-start-advanced",
        "version": 1,
        "processKey": 2251799813685492,
        "resourceName": "gettingstarted_quickstart_advanced.bpmn"
      }
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
zbctl create worker test-worker --handler "echo {\"result\":\"Pong\"}"
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
  "result": "Pong"
}
```

To end up in the lower end event you'll have to modify the worker to return a different result.
Change the worker to the following:

```bash
zbctl create worker test-worker --handler "echo {\"result\":\"...\"}"
```

Creating a new instance leads to a second instance in **Operate**, which you'll note ending in the second end event following the **else** sequence flow:

![operate-instance](assets/operate-advanced-instances-other.png)

Next, you can connect both workers in parallel and create more process instances:

```bash
while true; do zbctl create instance camunda-cloud-quick-start-advanced; sleep 1; done
```

In **Operate**, you'll note instances ending in both end events depending on which worker picked up the job.

![operate-instances](assets/operate-advanced-instances.png)
