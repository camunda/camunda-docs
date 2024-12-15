---
id: metrics
title: "Metrics"
keywords: ["backpressure", "back-pressure", "back pressure"]
---

When operating a distributed system like Zeebe, it is important to put proper monitoring in place. To facilitate this, Zeebe exposes an extensive set of metrics over an embedded HTTP server.

## Types of metrics

- **Counters**: A time series that records a growing count of some unit. Examples: number of bytes transmitted over the network, number of process instances started.
- **Gauges**: A time series that records the current size of some unit. Examples: number of currently open client connections, current number of partitions.

## Metrics format

Zeebe exposes metrics directly in the [Prometheus text format][prom-format].

**Example:**

```
# HELP zeebe_stream_processor_records_total Number of events processed by stream processor
# TYPE zeebe_stream_processor_records_total counter
zeebe_stream_processor_records_total{action="written",partition="1",} 20320.0
zeebe_stream_processor_records_total{action="processed",partition="1",} 20320.0
zeebe_stream_processor_records_total{action="skipped",partition="1",} 2153.0
```

## Enable additional metrics

Metrics are exported by default. To enable execution metrics, set the `ZEEBE_BROKER_EXECUTION_METRICS_EXPORTER_ENABLED` environment variable to `true` in your Zeebe [configuration file](../configuration/configuration.md).

## Connect Prometheus

Zeebe exposes the metrics over an HTTP server. The default port is `9600`.

Add the following entry to your `prometheus.yml`:

```
- job_name: zeebe
  scrape_interval: 15s
  metrics_path: /actuator/prometheus
  scheme: http
  static_configs:
  - targets:
    - localhost: 9600
```

## Available metrics

All Zeebe-related metrics have a `zeebe_`-prefix.

Most metrics have the following common label:

- `partition`: Cluster-unique ID of the partition

:::note
Both brokers and gateways expose their respective metrics. The brokers have an optional metrics exporter that can be enabled for maximum insight.
:::

**Metrics related to process processing:**

- `zeebe_stream_processor_records_total`: The number of events processed by the stream processor.
  The `action` label separates processed, skipped, and written events.
- `zeebe_exporter_events_total`: The number of events processed by the exporter processor.
  The `action` label separates exported and skipped events.
- `zeebe_element_instance_events_total`: The number of occurred process element instance events.
  The `action` label separates the number of activated, completed, and terminated elements.
  The `type` label separates different BPMN element types.
- `zeebe_job_events_total`: The number of job events. The `action` label separates the number of
  created, activated, timed out, completed, failed, and canceled jobs.
- `zeebe_incident_events_total`: The number of incident events. The `action` label separates the number
  of created and resolved incident events.
- `zeebe_pending_incidents_total`: The number of currently pending incident, i.e. not resolved.

**Metrics related to performance:**

Zeebe has a backpressure mechanism by which it rejects requests when it receives more requests than it can handle without incurring high processing latency.

Monitor backpressure and processing latency of the commands using the following metrics:

- `zeebe_dropped_request_count_total`: The number of user requests rejected by the broker due to backpressure.
- `zeebe_backpressure_requests_limit`: The limit for the number of inflight requests used for backpressure.
- `zeebe_stream_processor_latency_bucket`: The processing latency for commands and event.

**Metrics related to health:**

The health of partitions in a broker can be monitored by the metric `zeebe_health`.

[prom-format]: https://prometheus.io/docs/instrumenting/exposition_formats/#text-format-details

## Grafana

Zeebe comes with a pre-built dashboard, available in the repository:
[monitor/grafana/zeebe.json](https://github.com/camunda/camunda/blob/main/monitor/grafana/zeebe.json).

[Import](https://grafana.com/docs/grafana/latest/reference/export_import/#importing-a-dashboard) it into your Grafana instance and select the correct Prometheus data source (important if you have more than one). You will then be greeted with the following dashboard, which displays a healthy cluster topology, general throughput metrics, handled requests, exported events per second, disk and memory usage, and more.

![Grafana dashboard](assets/grafana-preview.png)

You can also try out an [interactive version](https://snapshots.raintank.io/dashboard/snapshot/Vbu3EHQMTI5Onh5RKuiS5J7QSMd7Sp5V), where you can explore help messages for every panel and get a feel for what data is available.
