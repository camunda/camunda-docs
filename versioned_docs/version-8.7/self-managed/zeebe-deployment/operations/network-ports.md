---
id: network-ports
title: "Network ports"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

The broker cluster sits behind the gateway, which handles all requests (via REST and gRPC servers) from clients/workers and forwards events to brokers.

<Tabs groupId="networkPorts" defaultValue="gateway" queryString values={[{label: 'Gateway', value: 'gateway' },{label: 'Broker', value: 'broker' }]} >

<TabItem value="gateway">

To communicate with clients/workers, the gateway will start two different ports to communicate via its REST API (default port 8080) and gRPC (default port 26500). These are respectively controlled via `server.port: 8080` (REST) and `zeebe.gateway.network.port: 26500` (gRPC).

Additionally, it will need to communicate with other nodes (mostly brokers) in the cluster (default port 26502), configured via `zeebe.gateway.cluster.port: 26502`.

To join the cluster, it will also need at least one initial contact point, typically a broker, configured via `zeebe.gateway.cluster.initialContactPoints: [127.0.0.1:26502]`.

:::note
You can use all broker connections instead of one to make the startup process of the Zeebe Gateway more resilient.
:::

The relevant [configuration](../configuration/configuration.md) settings are:

```
Config file
    server:
      port: 8080 # REST
    zeebe:
      gateway:
        network:
          port: 26500 # gRPC
        cluster:
          port: 26502
          initialContactPoints: [127.0.0.1:26502]


Environment Variables
  SERVER_PORT = 8080
  ZEEBE_GATEWAY_NETWORK_PORT = 26500
  ZEEBE_GATEWAY_CLUSTER_PORT = 26502
  ZEEBE_GATEWAY_CLUSTER_INITIALCONTACTPOINTS = 127.0.0.1:26502
```

</TabItem>

<TabItem value="broker">

The broker needs to receive communication from the gateway and from other brokers. It also exposes a port for monitoring.

- `zeebe.broker.network.commandApi.port: 26501`: Gateway-to-broker communication, using an internal SBE (Simple Binary Encoding) protocol. This is the Command API port. This should be exposed to the gateway.
- `zeebe.broker.network.internalApi.port: 26502`: Inter-broker clustering using the Gossip and Raft protocols for partition replication, broker elections, topology sharing, and message subscriptions. This should be exposed to other brokers and the gateway.
- `zeebe.broker.network.monitoringApi.port: 9600`: Metrics and Readiness Probe. Prometheus metrics are exported on the route `/metrics`. There is a readiness probe on `/ready`.

The relevant [configuration](../configuration/configuration.md) settings are:

```
Config file
    zeebe:
      broker:
        network:
          commandAPI:
            port: 26501
          internalAPI:
            port: 26502
          monitoringApi
            port: 9600

Environment Variables
  ZEEBE_BROKER_NETWORK_COMMANDAPI_PORT = 26501
  ZEEBE_BROKER_NETWORK_INTERNALAPI_PORT = 26501
  ZEEBE_BROKER_NETWORK_MONITORINGAPI_PORT = 26501
```

</TabItem>
</Tabs>
