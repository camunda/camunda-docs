---
id: configure-flow-control
title: "Configure Flow Control"
sidebar_label: "Configure Flow Control"
description: "Learn how to configure Flow Control"
---

# Configuring Flow Control

When a broker receives a client request, it is written to the **_event
stream_** first (see section [internal processing](/components/zeebe/technical-concepts/internal-processing.md) for details), and processed later by the stream processor.

If the exporting is slow, if there are many client requests in the stream,
or processing largely outpaces the exporting rate, it can lead to the backlog
increasing and the processing latency can grow beyond an acceptable time.

Zeebe 8.6 introduces a new unified flow control mechanism that is able to limit user commands (by default it tries to achieve 200ms response times) and rate limit writes of new records in general.

Limiting the write rate is a new feature that can be used to prevent building up an excessive exporting backlog. There are two ways to limit the write rate, either by setting a static limit or by enabling throttling that dynamically adjust the write rate based on the exporting backlog and rate.

The write rate consists of all new records from processing results, user commands, inter-partition messages, and scheduled tasks.

This feature allows to safeguard that if exporting slows down, writing of new
records becomes slower too. For user commands this will show up as
increased backpressure, and observed increase latency and throughput. Internal
processing will slow down because the stream processor needs to wait longer for writing of processing results to
complete.

:::note
The limit and inflight count are calculated per partition.
:::

```yaml
zeebe:
  broker:
    flowControl:
      write:
        enabled: false
        rampUp: 0
        limit: 1000
        throttling:
          enabled: false
          acceptableBacklog: 100000
          minimumLimit: 100
          resolution: 15s
```

The zeebe engine can use a static rate limit to restrict the number of
records that can be written per second, and it can use a dynamic throttling
which changes the write rate based on the exporting backlog.

The default values can be found in the [Zeebe broker standalone
configuration template](https://github.com/camunda/camunda/blob/main/dist/src/main/config/broker.standalone.yaml.template) or in the [Zeebe broker configuration template](https://github.com/camunda/camunda/blob/main/dist/src/main/config/broker.yaml.template) in
the `# flowControl` section.

The `rampUp` value refers to the warmup period or how long it takes to go
for the current write rate to the one set in the limit (assuming the rate
higher than the limit). This value is given in seconds and can't be set
null nor negative.

The `limit` is the static value that we can configure to the write rate,
therefore this can't be either null nor negative.

The `throttling`, if enabled will additionally limit the write rate based on
the exporting backlog.

The exporting backlog is the quantity of records that were already
processed but not yet exported. The increase of this is usually due to a
mismatch of the rate of processed and exported records, or to exporting
capability being degraded.

The `throttling` algorithm used takes into account the ratio
between the acceptable backlog and the actual backlog. If the acceptable
backlog is at least twice as long as the real backlog we set the current
rate as the limit (since we still have quite a margin, then we can increase
the current processing rate to the defined limit). If the ratio between these
is smaller than 2, then we calculate the rate by multiplying the ratio with
the current exporting rate, with `minimumLimit` being our floor and `limit`
being our ceiling. The intention is to increase or decrease proportionally the rate
in between the defined limits according to the ratio of the acceptable
backlog and the actual backlog, therefore if the acceptable backlog is
larger than the backlog, we increase the rate, and we do the opposite if the
backlog is larger than the acceptable backlog.

The `resolution` value refers to the frequency that we adjust the
throttling, and is given in seconds. Adjusting this value is useful to set
the speed to which the processing rate can respond to changes.

The current exporting rate is calculated by observing the number of records
that we export during a period of time that's at least as long as the
resolution window divided by the elapsed time.

## Using the Flow Control endpoint to configure the write rate limits

This feature can be especially useful adjust the flow control on the fly to
solve an incident for a specific cluster without having to reset the clusters.

:::caution
Important to note that this should be used as a temporary fix, and changes
should be reverted after the issue is addressed. Otherwise, permanent
should be done through the environment variables.

Another detail is that configuring the flow control through the endpoint
does not preserve the
configuration in the broker state, so if this restarts, any leader
partition in this broker will revert to the defined configuration in the
environment variables.
:::

## Fetch current configuration

Note that the backup API can be reached via the /actuator management port, which by default is 8092. The configured context path does not apply to the management port.

The following endpoint can be used to fetch the flow control configuration:

```

GET actuator/flowControl

```

### Example Request

```

curl -X GET 'localhost:8092/actuator/flowControl'

```

### Response

| Code             | Description                                                             |
| ---------------- | ----------------------------------------------------------------------- |
| 200 Accepted     | The flow configuration was retrieved successfully.                      |
| 400 Bad Request  | Indicates issues with the request.                                      |
| 500 Server Error | All other errors. Refer to the returned error message for more details. |

### Example Response

```

{
  "1": {
    "requestLimiter": {
      "delegate": {
        "limit": 100,
        "minLimit": 1,
        "maxLimit": 1000,
        "backoffRatio": 0.9,
        "expectedRTT": 200000000
      }
    },
    "writeRateLimit": {
      "enabled": true,
      "limit": 4000,
      "rampUp": 0.0,
      "throttling": {
        "enabled": true,
        "acceptableBacklog": 100000,
        "minRate": 100,
        "resolution": 15.0
      }
    }
  }
}


```

The `writeRateLimit` value can be null if it
has not been defined yet.

## Setting the configuration

To set the configuration the same endpoint is used.

```

POST actuator/flowControl
{
  "write": {
    "rampUp": <rampUp>,
    "enabled": <enabled>,
    "limit": <limit>,
    "throttling": {
      "enabled": <enabled>,
      "acceptableBacklog": <acceptableBacklog>,
      "minimumLimit": <minimumLimit>,
      "resolution": <resolution>
    }
  }
}

```

### Response

| Code             | Description                                                                                                                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200 Accepted     | The flow configuration request was processed correctly.                                                                                                                                        |
| 400 Bad Request  | Indicates issues with the request, e.g. one of the fields contains an invalid type.                                                                                                            |
| 500 Server Error | All other errors, e.g. when the values set do not conform to the imposed restriction (such as `minimumLimit` being higher than `limit`). Refer to the returned error message for more details. |

### Example request

```

curl -X POST 'localhost:8092actuator/flowControl' -H "Content-Type: application/json" --data
'{
  "write": {
    "rampUp": 0,
    "enabled": true,
    "limit": 2000,
    "throttling": {
      "enabled": true,
      "acceptableBacklog": 100000,
      "minimumLimit": 200,
      "resolution": 15
    }
  }
}'

```

### Example response

```

{
  "1": {
    "requestLimiter": {
      "delegate": {
        "limit": 100,
        "minLimit": 1,
        "maxLimit": 1000,
        "backoffRatio": 0.9,
        "expectedRTT": 200000000
      }
    },
    "writeRateLimit": {
      "enabled": true,
      "limit": 4000,
      "rampUp": 0.0,
      "throttling": {
        "enabled": true,
        "acceptableBacklog": 100000,
        "minRate": 100,
        "resolution": 15.0
      }
    }
  }
}

```

To note that the first value "1" refers to the partition in question, as
explained
before the flow configuration is defined by partition. The endpoint
attempts to configure all partitions, but it is possible that they might
differ in configuration if for example one of the brokers restarts and the
leader partition in this one will revert to the configuration defined in
the environment variables.

:::note
We recommend to leave the write rate limits disabled by default. These
largely should only be enabled if some issue arises, namely using the
static write rate limit can be useful to prevent throughput peaks and the
write rate throttling can be useful to help keep the backlog stable. In the
latter case it's important to note that for throttling to be useful it helps
to keep a high static limit so as to have a high write rate if the
exporting can keep up.
:::

### Understanding write rate limits in Grafana

#### Throttling

The throttling when actively acting on the current rate (different from
simply being enabled), will show in every panel in Grafana with an
underlying yellow bar to show the period where this was active.

![backpressure-throttling](img/backpressure-throttling.png)

#### Exporting backlog

The exporting backlog panel can be found under the `Processing` row and
displays
the number of records not yet exported per partition.

![exporting-backlog](img/exporting-backlog.png)

#### Exporting and Write rate

The `Measured exporting rate` and `Accepted writes by source` panels can be
found under the `Logstream` row. The first shows the number of records
accepted by flow control per second, organized by partition and write
source (e.g. processing result, scheduled tasks etc.), and the latter
displays measured average exporting rate which may be used to throttle write rate.

![measured-exporting-rate](img/mesured-exporting-rate.png)
![accepted-by-writes-source](img/accepted-by-writes-source.png)

#### Write rate limit

The panel for the `Write rate limits` can also be found under the
`Logstream` row, displaying the current and maximum permissible write rate
limit per partition.

![write-rate-limit](img/write-rate-limit.png)
