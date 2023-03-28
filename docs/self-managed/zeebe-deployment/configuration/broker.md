---
id: broker-config
title: "Broker configuration"
sidebar_label: "Broker configuration"
description: "Let's analyze how to configure the Zeebe broker"
---

A complete broker configuration template is available in the [Zeebe repo](https://github.com/camunda/zeebe/blob/main/dist/src/main/config/broker.yaml.template).

## Conventions
Take the following conventions into consideration when working with the broker configuration.

### Byte sizes
For buffers and others must be specified as strings and follow the following format: "10U" where U (unit) must be replaced with KB = Kilobytes, MB = Megabytes or GB = Gigabytes. If unit is omitted then the default unit is simply bytes.

Example:
`sendBufferSize = "16MB"` (creates a buffer of 16 Megabytes)

### Time units
Timeouts, intervals, and the likes, must be specified either in the standard ISO-8601 format used by java.time.Duration, or as strings with the following format: "VU", where:
- V is a numerical value (e.g. 1, 5, 10, etc.)
- U is the unit, one of: ms = Millis, s = Seconds, m = Minutes, or h = Hours

### Paths
Relative paths are resolved relative to the installation directory of the broker.

## Configuration

### zeebe.broker.gateway

To configure the embedded gateway, see [Gateway config docs](self-managed/zeebe-depolyment/configuration/gateway-config).

<table name="gateway" id="zeebe">
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Example value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>enable</td>
            <td>Enable the embedded gateway to start on broker startup. This setting can also be overridden using the environment variable `ZEEBE_BROKER_GATEWAY_ENABLE`.</td>
            <td>False</td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
broker:
    gateway:
      enable: false
```

### zeebe.broker.network

This section contains the network configuration. Particularly, it allows to configure the hosts and ports the broker should bind to. The broker exposes two sockets:

  1. command: the socket which is used for gateway-to-broker communication 
  2. internal: the socket which is used for broker-to-broker communication

<table name="network" id="network">
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Default Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>host</td>
            <td>Controls the default host the broker should bind to. Can be overwritten on a per binding basis for client, management and replication. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_HOST`.</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>advertisedHost</td>
            <td>Controls the advertised host; if omitted defaults to the host. This is particularly useful if your broker stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_ADVERTISEDHOST`.</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>portOffset</td>
            <td>If a port offset is set it will be added to all ports specified in the config or the default values. This is a shortcut to not always specifying every port. The offset will be added to the second last position of the port, as Zeebe requires multiple ports. As example a portOffset of 5 will increment all ports by 50, i.e. 26500 will become 26550 and so on. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_PORTOFFSET`.</td>
            <td>0</td>
        </tr>
        <tr>
            <td>maxMessageSize</td>
            <td>Sets the maximum size of the incoming and outgoing messages (i.e. commands and events). This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_MAXMESSAGESIZE`.</td>
            <td>4MB</td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
network:
    host: 0.0.0.0
    advertisedHost: 0.0.0.0
    portOffset: 0
    maxMessageSize: 4MB
```

### zeebe.broker.network.security

<table name="security" id="security">
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Default Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>enabled</td>
            <td>Enables TLS authentication between this gateway and other nodes in the cluster. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_SECURITY_ENABLED`.</td>
            <td>False</td>
        </tr>
        <tr>
            <td>certificateChainPath</td>
            <td>Sets the path to the certificate chain file. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_SECURITY_CERTIFICATECHAINPATH`.</td>
            <td></td>
        </tr>
        <tr>
            <td>privateKeyPath</td>
            <td>Sets the path to the private key file location. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_SECURITY_PRIVATEKEYPATH`.</td>
            <td></td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
security:
    enabled: false
    certificateChainPath:
    privateKeyPath:
```

### zeebe.broker.network.commandApi

<table name="commandApi" id="commandApi">
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Default Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>host</td>
            <td>Overrides the host used for gateway-to-broker communication. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_COMMANDAPI_HOST`.</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>port</td>
            <td>Sets the port used for gateway-to-broker communication. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_COMMANDAPI_PORT`.</td>
            <td>26501</td>
        </tr>
        <tr>
            <td>advertisedHost</td>
            <td>Controls the advertised host; if omitted defaults to the host. This is particularly useful if your broker stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_COMMANDAPI_ADVERTISEDHOST`.</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>advertisedPort</td>
            <td>Controls the advertised port; if omitted defaults to the port. This is particularly useful if your broker stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_COMMANDAPI_ADVERTISEDPORT`.</td>
            <td>25601</td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
commandApi:
    host: 0.0.0.0
    port: 26501
    advertisedHost: 0.0.0.0
    advertisedPort: 25601
```

### zeebe.broker.network.internalApi

<table name="internalApi" id="internalApi">
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Default Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>host</td>
            <td>Overrides the host used for internal broker-to-broker communication. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_INTERNALAPI_HOST`.</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>port</td>
            <td>Sets the port used for internal broker-to-broker communication. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_INTERNALAPI_PORT`.</td>
            <td>26502</td>
        </tr>
        <tr>
            <td>advertisedHost</td>
            <td>Controls the advertised host; if omitted defaults to the host. This is particularly useful if your broker stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_INTERNALAPI_ADVERTISEDHOST`.</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>advertisedPort</td>
            <td>Controls the advertised port; if omitted defaults to the port. This is particularly useful if your broker stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_INTERNALAPI_ADVERTISEDPORT`.</td>
            <td>25602</td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
internalApi:
    host: 0.0.0.0
    port: 26502
    advertisedHost: 0.0.0.0
    advertisedPort: 25602
```

<table name="zeebe" id="zeebe">
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Default Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>network</td>
            <td>This section contains the network configuration. Particularly, it allows to configure the hosts and ports the broker should bind to. The broker exposes two sockets:
            1. command: the socket which is used for gateway-to-broker communication
            2. internal: the socket which is used for broker-to-broker communication</td>
            <td>&nbsp;&nbsp;</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;host</td>
            <td>Controls the default host the broker should bind to. Can be overwritten on a per binding basis for client, management and replication. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_HOST`.</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;advertisedHost</td>
            <td>Controls the advertised host; if omitted defaults to the host. This is particularly useful if your broker stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_ADVERTISEDHOST`.</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;portOffset</td>
            <td>If a port offset is set it will be added to all ports specified in the config or the default values. This is a shortcut to not always specifying every port. The offset will be added to the second last position of the port, as Zeebe requires multiple ports. As example a portOffset of 5 will increment all ports by 50, i.e. 26500 will become 26550 and so on. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_PORTOFFSET`.</td>
            <td>0</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;maxMessageSize</td>
            <td>Sets the maximum size of the incoming and outgoing messages (i.e. commands and events). This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_MAXMESSAGESIZE`.</td>
            <td>4MB</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;security</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</td>
            <td>Enables TLS authentication between this gateway and other nodes in the cluster. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_SECURITY_ENABLED`.</td>
            <td>False</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;certificateChainPath</td>
            <td>Sets the path to the certificate chain file. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_SECURITY_CERTIFICATECHAINPATH`.</td>
            <td></td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;privateKeyPath</td>
            <td>Sets the path to the private key file location. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_SECURITY_PRIVATEKEYPATH`.</td>
            <td></td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;commandApi</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;host</td>
            <td>Overrides the host used for gateway-to-broker communication. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_COMMANDAPI_HOST`.</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port</td>
            <td>Sets the port used for gateway-to-broker communication. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_COMMANDAPI_PORT`.</td>
            <td>26501</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advertisedHost</td>
            <td>Controls the advertised host; if omitted defaults to the host. This is particularly useful if your broker stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_COMMANDAPI_ADVERTISEDHOST`.</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advertisedPort</td>
            <td>Controls the advertised port; if omitted defaults to the port. This is particularly useful if your broker stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_COMMANDAPI_ADVERTISEDPORT`.</td>
            <td>25601</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;internalApi</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;host</td>
            <td>Overrides the host used for internal broker-to-broker communication. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_INTERNALAPI_HOST`.</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port</td>
            <td>Sets the port used for internal broker-to-broker communication. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_INTERNALAPI_PORT`.</td>
            <td>26502</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advertisedHost</td>
            <td>Controls the advertised host; if omitted defaults to the host. This is particularly useful if your broker stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_INTERNALAPI_ADVERTISEDHOST`.</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advertisedPort</td>
            <td>Controls the advertised port; if omitted defaults to the port. This is particularly useful if your broker stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_INTERNALAPI_ADVERTISEDPORT`.</td>
            <td>25602</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;data</td>
            <td>This section allows to configure Zeebe's data storage. Data is stored in "partition folders".</td>
            <td></td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;directory</td>
            <td>Specify the directory in which data is stored. This setting can also be overridden using the environment variable ZEEBE_BROKER_DATA_DIRECTORY.</td>
            <td>data</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;runtimeDirectory</td>
            <td>Specify the directory in which runtime is stored. By default runtime is stored in `directory` for data. If runtimeDirectory is configured, then the configured directory will be used. It will have a subdirectory for each partition to store its runtime. There is no need to store runtime in a persistent storage. This configuration allows to split runtime to another disk to optimize for performance and disk usage.
            Note: If runtime is another disk than the data directory, files need to be copied to data directory while taking snapshot. This may impact disk i/o or performance during snapshotting. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_RUNTIMEDIRECTORY`.</td>
            <td>None</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;logSegmentSize</td>
            <td>The size of data log segment files. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_LOGSEGMENTSIZE`.</td>
            <td>128MB</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;snapshotPeriod</td>
            <td>How often we take snapshots of streams (time unit). This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_SNAPSHOTPERIOD`.</td>
            <td>15m</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;disk</td>
            <td>&nbsp;&nbsp;</td>
            <td>Configure disk monitoring to prevent getting into a non-recoverable state due to out of disk space. When monitoring is enabled, the broker rejects commands and pause replication when the required freeSpace is not available. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_DISK_ENABLEMONITORING`.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enableMonitoring</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;cras&#x27; b&#x27;ve&#x27; b&#x27;natoque&#x27; b&#x27;nulla&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoringInterval</td>
            <td>1s</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;enim&#x27; b&#x27;ve&#x27; b&#x27;a&#x27; b&#x27;a&#x27; b&#x27;ut&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;freeSpace</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processing</td>
            <td>2GB</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;nibh&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;replication</td>
            <td>1GB</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;backup</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;store</td>
            <td>NONE</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;odio&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;s3</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bucketName</td>
            <td>None</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;endpoint</td>
            <td>None</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;region</td>
            <td>None</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;secretKey</td>
            <td>None</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;apiCallTimeout</td>
            <td>PT180S</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;forcePathStyleAccess</td>
            <td>False</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;compression</td>
            <td>none</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;arcu&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;basePath</td>
            <td>None</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gcs</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bucketName</td>
            <td>None</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;basePath</td>
            <td>None</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;host</td>
            <td>None</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;auth</td>
            <td>auto</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;amet&#x27; b&#x27;ut&#x27; b&#x27;a&#x27; b&#x27;id&#x27; b&#x27;at&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;cluster</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;urna&#x27; b&#x27;ve&#x27; b&#x27;id&#x27; b&#x27;nibh&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;nodeId</td>
            <td>0</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;partitionsCount</td>
            <td>1</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;replicationFactor</td>
            <td>1</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;quis&#x27; b&#x27;in&#x27; b&#x27;a&#x27; b&#x27;per&#x27; b&#x27;ipsum&#x27; b&#x27;auctor&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;clusterSize</td>
            <td>1</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;initialContactPoints</td>
            <td></td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;cras&#x27; b&#x27;in&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;clusterName</td>
            <td>zeebe-cluster</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;heartbeatInterval</td>
            <td>250ms</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;electionTimeout</td>
            <td>2500ms</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;raft</td>
            <td>enablePriorityElection = true</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;flush</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;delayTime</td>
            <td>0s</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;erat&#x27; b&#x27;ad&#x27; b&#x27;a&#x27; b&#x27;quis&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;membership</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;nibh&#x27; b&#x27;ad&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;broadcastUpdates</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;orci&#x27; b&#x27;ve&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;broadcastDisputes</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;notifySuspect</td>
            <td>False</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gossipInterval</td>
            <td>250ms</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gossipFanout</td>
            <td>2</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;eget&#x27; b&#x27;ut&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;probeInterval</td>
            <td>1s</td>
            <td>Lorem ipsum dolor.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;probeTimeout</td>
            <td>100ms</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suspectProbes</td>
            <td>3</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;failureTimeout</td>
            <td>10s</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;syncInterval</td>
            <td>10s</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;messageCompression</td>
            <td>NONE</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;threads</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;odio&#x27; b&#x27;ut&#x27; b&#x27;mi&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;cpuThreadCount</td>
            <td>2</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;nisi&#x27; b&#x27;ac&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;ioThreadCount</td>
            <td>2</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;backpressure</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;ante&#x27; b&#x27;in&#x27; b&#x27;a&#x27; b&#x27;enim&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;enabled</td>
            <td>True</td>
            <td>Lorem ipsum dolor.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;useWindowed</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;algorithm</td>
            <td>aimd</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;aimd</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requestTimeout</td>
            <td>200ms</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;elit&#x27; b&#x27;id&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;initialLimit</td>
            <td>100</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;diam&#x27; b&#x27;et&#x27; b&#x27;amet&#x27; b&#x27;a&#x27; b&#x27;porta&#x27; b&#x27;magnis&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minLimit</td>
            <td>1</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;nisi&#x27; b&#x27;id&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;maxLimit</td>
            <td>1000</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;backoffRatio</td>
            <td>0.9</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;enim&#x27; b&#x27;et&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;fixed</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;limit</td>
            <td>20</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;vegas</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;duis&#x27; b&#x27;ve&#x27; b&#x27;a&#x27; b&#x27;ac&#x27; b&#x27;a&#x27; b&#x27;ut&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;initialLimit</td>
            <td>20</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;eros&#x27; b&#x27;ac&#x27; b&#x27;a&#x27; b&#x27;rutrum&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alpha</td>
            <td>3</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;enim&#x27; b&#x27;at&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;beta</td>
            <td>6</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;quis&#x27; b&#x27;ut&#x27; b&#x27;a&#x27; b&#x27;a&#x27; b&#x27;tempor&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;gradient</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minLimit</td>
            <td>10</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;initialLimit</td>
            <td>20</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rttTolerance</td>
            <td>2.0</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;gradient2</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;ante&#x27; b&#x27;ac&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minLimit</td>
            <td>10</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;initialLimit</td>
            <td>20</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;cras&#x27; b&#x27;ac&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rttTolerance</td>
            <td>2.0</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;duis&#x27; b&#x27;ac&#x27; b&#x27;a&#x27; b&#x27;ac&#x27; b&#x27;mauris&#x27; b&#x27;a&#x27; b&#x27;accumsan&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;longWindow</td>
            <td>600</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;ante&#x27; b&#x27;ve&#x27; b&#x27;a&#x27; b&#x27;maecenas&#x27; b&#x27;quam&#x27; b&#x27;placerat&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;exporters</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;jarPath</td>
            <td>None</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;className</td>
            <td>None</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;debuglog</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;className</td>
            <td>io.camunda.zeebe.broker.exporter.debug.DebugLogExporter</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;args</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logLevel</td>
            <td>debug</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;prettyPrint</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;nisl&#x27; b&#x27;in&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;debugHttp</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;ante&#x27; b&#x27;ac&#x27; b&#x27;a&#x27; b&#x27;ut&#x27; b&#x27;nascetur&#x27; b&#x27;a&#x27; b&#x27;a&#x27; b&#x27;justo&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;className</td>
            <td>io.camunda.zeebe.broker.exporter.debug.DebugHttpExporter</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;args</td>
            <td>port = 8000 limit = 1024</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;elasticsearch</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;className</td>
            <td>io.camunda.zeebe.exporter.ElasticsearchExporter</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;args</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url</td>
            <td>http://localhost:9200</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bulk</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;delay</td>
            <td>5</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;size</td>
            <td>1000</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;memoryLimit</td>
            <td>10485760</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;authentication</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;amet&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;username</td>
            <td>elastic</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password</td>
            <td>changeme</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;prefix</td>
            <td>zeebe-record</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;createTemplate</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;numberOfShards</td>
            <td>3</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;numberOfReplicas</td>
            <td>0</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;enim&#x27; b&#x27;eu&#x27; b&#x27;nunc&#x27; b&#x27;a&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;command</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;event</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rejection</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;quis&#x27; b&#x27;mi&#x27; b&#x27;eu&#x27; b&#x27;velit&#x27; b&#x27;ut&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;commandDistribution</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;quis&#x27; b&#x27;ve&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;decisionRequirements</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;diam&#x27; b&#x27;mi&#x27; b&#x27;in&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;decision</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;elit&#x27; b&#x27;mi&#x27; b&#x27;a&#x27; b&#x27;quis&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;decisionEvaluation</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deployment</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deploymentDistribution</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;error</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;escalation</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;pede&#x27; b&#x27;et&#x27; b&#x27;id&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;incident</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;job</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jobBatch</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;nisl&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;message</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;eget&#x27; b&#x27;id&#x27; b&#x27;a&#x27; b&#x27;ante&#x27; b&#x27;taciti&#x27; b&#x27;a&#x27; b&#x27;montes&#x27; b&#x27;vitae&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;messageStartSubscription</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;messageSubscription</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;process</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processEvent</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processInstance</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processInstanceCreation</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processInstanceModification</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processMessageSubscription</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;quam&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resourceDeletion</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;signal</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;urna&#x27; b&#x27;eu&#x27; b&#x27;a&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;signalSubscription</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;nisi&#x27; b&#x27;et&#x27; b&#x27;a&#x27; b&#x27;turpis&#x27; b&#x27;est&#x27; b&#x27;mi&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;timer</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variable</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;urna&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variableDocument</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;retention</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;enim&#x27; b&#x27;id&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minimumAge</td>
            <td>30d</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;policyName</td>
            <td>zeebe-record-retention-policy</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;opensearch</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;amet&#x27; b&#x27;ac&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;className</td>
            <td>io.camunda.zeebe.exporter.opensearch.OpensearchExporter</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;args</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url</td>
            <td>http://localhost:9200</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;elit&#x27; b&#x27;ve&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requestTimeoutMs</td>
            <td>1000</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;elit&#x27; b&#x27;ve&#x27; b&#x27;a&#x27; b&#x27;a&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bulk</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;cras&#x27; b&#x27;ve&#x27; b&#x27;a&#x27; b&#x27;mi&#x27; b&#x27;nec&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;delay</td>
            <td>5</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;size</td>
            <td>1000</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;nisl&#x27; b&#x27;et&#x27; b&#x27;a&#x27; b&#x27;ad&#x27; b&#x27;nec&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;memoryLimit</td>
            <td>10485760</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;authentication</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;erat&#x27; b&#x27;id&#x27; b&#x27;a&#x27; b&#x27;et&#x27; b&#x27;nisi&#x27; b&#x27;est&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;username</td>
            <td>opensearch</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;ante&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password</td>
            <td>changeme</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;aws</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;cras&#x27; b&#x27;ut&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;serviceName</td>
            <td>es</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;region</td>
            <td>eu-west-1</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;diam&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;prefix</td>
            <td>zeebe-record</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;nisl&#x27; b&#x27;ac&#x27; b&#x27;a&#x27; b&#x27;auctor&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;createTemplate</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;numberOfShards</td>
            <td>3</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;numberOfReplicas</td>
            <td>0</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;command</td>
            <td>False</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;event</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;orci&#x27; b&#x27;eu&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rejection</td>
            <td>False</td>
            <td>Lorem ipsum dolor.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;commandDistribution</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;decisionRequirements</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;quam&#x27; b&#x27;ut&#x27; b&#x27;a&#x27; b&#x27;per&#x27; b&#x27;a&#x27; b&#x27;ipsum&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;decision</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;decisionEvaluation</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deployment</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deploymentDistribution</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;enim&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;error</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;elit&#x27; b&#x27;in&#x27; b&#x27;a&#x27; b&#x27;velit&#x27; b&#x27;potenti&#x27; b&#x27;dui&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;escalation</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;incident</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;elit&#x27; b&#x27;et&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;job</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;amet&#x27; b&#x27;ve&#x27; b&#x27;id&#x27; b&#x27;magna&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jobBatch</td>
            <td>False</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;message</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;messageStartSubscription</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;messageSubscription</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;nibh&#x27; b&#x27;ac&#x27; b&#x27;a&#x27; b&#x27;nibh&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;process</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;nibh&#x27; b&#x27;ut&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processEvent</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processInstance</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;cras&#x27; b&#x27;mi&#x27; b&#x27;a&#x27; b&#x27;nam&#x27; b&#x27;aliquam&#x27; b&#x27;eu&#x27; b&#x27;a&#x27; b&#x27;a&#x27; b&#x27;a&#x27; b&#x27;posuere&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processInstanceCreation</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processInstanceModification</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processMessageSubscription</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;eget&#x27; b&#x27;in&#x27; b&#x27;a&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resourceDeletion</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;signal</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;signalSubscription</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;orci&#x27; b&#x27;id&#x27; b&#x27;ut&#x27; b&#x27;id&#x27; b&#x27;dui&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;timer</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;amet&#x27; b&#x27;ac&#x27; b&#x27;pretium&#x27; b&#x27;erat&#x27; b&#x27;a&#x27; b&#x27;felis&#x27; b&#x27;proin&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variable</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variableDocument</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;processing</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;elit&#x27; b&#x27;ut&#x27; b&#x27;a&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;partitioning</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;ante&#x27; b&#x27;id&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scheme</td>
            <td>ROUND_ROBIN</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fixed</td>
            <td></td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;urna&#x27; b&#x27;ut&#x27; b&#x27;a&#x27; b&#x27;a&#x27; b&#x27;ac&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;partitionId</td>
            <td>1</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodes</td>
            <td></td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodeId</td>
            <td>0</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priority</td>
            <td>1</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;eget&#x27; b&#x27;in&#x27; b&#x27;a&#x27; b&#x27;hac&#x27; b&#x27;condimentum&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodeId</td>
            <td>1</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priority</td>
            <td>2</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodeId</td>
            <td>2</td>
            <td>Lorem ipsum dolor.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priority</td>
            <td>3</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;quam&#x27; b&#x27;et&#x27; b&#x27;a&#x27; b&#x27;quam&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;partitionId</td>
            <td>2</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodes</td>
            <td></td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodeId</td>
            <td>0</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priority</td>
            <td>3</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodeId</td>
            <td>1</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priority</td>
            <td>2</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;amet&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodeId</td>
            <td>2</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priority</td>
            <td>1</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;partitionId</td>
            <td>3</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;enim&#x27; b&#x27;ut&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodes</td>
            <td></td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodeId</td>
            <td>0</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priority</td>
            <td>2</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodeId</td>
            <td>1</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priority</td>
            <td>3</td>
            <td>Lorem ipsum dolor.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodeId</td>
            <td>2</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;odio&#x27; b&#x27;id&#x27; b&#x27;a&#x27; b&#x27;ad&#x27; b&#x27;a&#x27; b&#x27;ac&#x27; b&#x27;nunc&#x27; b&#x27;ve&#x27; b&#x27;at&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priority</td>
            <td>2</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;eget&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;raft</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requestTimeout</td>
            <td>5s</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minStepDownFailureCount</td>
            <td>3</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;amet&#x27; b&#x27;eu&#x27; b&#x27;a&#x27; b&#x27;et&#x27; b&#x27;at&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;maxQuorumResponseTimeout</td>
            <td>0ms</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;odio&#x27; b&#x27;ut&#x27; b&#x27;a&#x27; b&#x27;ac&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;preferSnapshotReplicationThreshold</td>
            <td>100</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;orci&#x27; b&#x27;id&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;preallocateSegmentFiles</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;odio&#x27; b&#x27;ve&#x27; b&#x27;et&#x27; b&#x27;at&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;rocksdb</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;columnFamilyOptions</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;compaction_pri</td>
            <td>kOldestSmallestSeqFirst</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;write_buffer_size</td>
            <td>67108864</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enableStatistics</td>
            <td>False</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;memoryLimit</td>
            <td>512MB</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;maxOpenFiles</td>
            <td>-1</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;maxWriteBufferNumber</td>
            <td>6</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minWriteBufferNumberToMerge</td>
            <td>3</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ioRateBytesPerSecond</td>
            <td>0</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;disableWal</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;consistencyChecks</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enablePreconditions</td>
            <td>False</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enableForeignKeyChecks</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;queryApi</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;engine</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;messages</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ttlCheckerBatchLimit</td>
            <td>2147483647</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ttlCheckerInterval</td>
            <td>1m</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;features</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enableYieldingDueDateChecker</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;eros&#x27; b&#x27;in&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enableActorMetrics</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enableMessageTTLCheckerAsync</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
    </tbody>
</table> 