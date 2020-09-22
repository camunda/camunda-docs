---
id: connect-to-your-cluster
title: Connect to your Cluster
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Installation

Install the appropriate package.

<Tabs
defaultValue="cli"
values={[
{ label: 'CLI', value: 'cli', },
]
}>

<TabItem value="cli">

```bash
npm i -g zbctl
```

</TabItem>

</Tabs>

## First connection

After creating a client, export statements are displayed which set all necessary environment variables. If these are known to the system, a client can communicate directly with its own cluster in the cloud without further configuration.

<Tabs
defaultValue="cli"
values={[
{ label: 'CLI', value: 'cli', },
]
}>

<TabItem value="cli">

```bash
zbctl status
```

</TabItem>

</Tabs>

As a result you will get a similar result:

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
