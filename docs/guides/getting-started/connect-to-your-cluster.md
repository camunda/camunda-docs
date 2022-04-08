---
id: connect-to-your-cluster
title: Connect to your cluster
description: "Let's learn more about installing and communicating with clusters."
---
<span class="badge badge--beginner">Beginner</span>
<span class="badge badge--short">Time estimate: 5 minutes</span>

## Prerequisites

- [Camunda Platform 8 account](create-camunda-cloud-account.md)
- [Download and install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- Install the appropriate package:

```bash
npm i -g zbctl
```

## First connection

After creating a client and downloading the connection file, you will now need to source it to make it available in your environment. If these are known to the system, a client can communicate directly with its own cluster in the cloud without further configuration.

```bash
source ~/Downloads/CamundaCloudMgmtAPI-Client-test-client.txt
```

```bash
zbctl status
```

As a result, you will get a similar response:

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

## Next steps

- [Model your first process](model-your-first-process.md)
