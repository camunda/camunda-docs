---
id: metrics
title: "Metrics"
keywords: ["backpressure", "back-pressure", "back pressure"]
---

When operating a distributed system like Zeebe, it is important to put proper monitoring in place.

To facilitate this, Zeebe exposes an extensive set of metrics.

Zeebe exposes metrics over an embedded HTTP server.

## Types of metrics

- **Counters**: A time series that records a growing count of some unit. Examples: number of bytes transmitted over the network, number of process instances started.
- **Gauges**: A time series that records the current size of some unit. Examples: number of currently open client connections, current number of partitions.

## Metrics format

Zeebe exposes metrics directly in Prometheus text format.
Read details of the format in the [Prometheus documentation][prom-format].

**Example:**

```
# HELP zeebe_stream_processor_records_total Number of events processed by stream processor
# TYPE zeebe_stream_processor_records_total counter
zeebe_stream_processor_records_total{action="written",partition="1",} 20320.0
zeebe_stream_processor_records_total{action="processed",partition="1",} 20320.0
zeebe_stream_processor_records_total{action="skipped",partition="1",} 2153.0
```

## Configuring metrics

Configure the HTTP server to export the metrics in the [configuration file](../configuration/configuration.md).

## Connecting Prometheus

As explained, Zeebe exposes the metrics over an HTTP server. The default port is `9600`.

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

- `partition`: Cluster-unique id of the partition

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

## All metrics

| Name                                                  | Description                                                                                                                                                                                         |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `backup_operations_total`                             | Total number of backup operations                                                                                                                                                                   |
| `backup_operations_in_progress`                       | Number of backup operations that are in progress                                                                                                                                                    |
| `backup_operations_latency`                           | Latency of backup operations                                                                                                                                                                        |
| `checkpoint_records_total`                            | Number of checkpoint records processed by stream processor. Processing can result in either creating a new checkpoint or ignoring the record. This can be observed by filtering for label 'result'. |
| `checkpoint_position`                                 | Position of the last checkpoint                                                                                                                                                                     |
| `checkpoint_id`                                       | Id of the last checkpoint                                                                                                                                                                           |
| `process_instance_execution_time`                     | The execution time of processing a complete process instance                                                                                                                                        |
| `job_life_time`                                       | The life time of an job                                                                                                                                                                             |
| `job_activation_time`                                 | The time until an job was activated                                                                                                                                                                 |
| `execution_latency_current_cached_instances`          | The current cached instances for counting their execution latency. If only short-lived instances are handled this can be seen or observed as the current active instance count.                     |
| `cluster_topology_version`                            | The version of the cluster topology                                                                                                                                                                 |
| `cluster_changes_id`                                  | The id of the cluster topology change plan                                                                                                                                                          |
| `cluster_changes_status`                              | The state of the current cluster topology                                                                                                                                                           |
| `cluster_changes_version`                             | The version of the cluster topology change plan                                                                                                                                                     |
| `cluster_changes_operations_pending`                  | Number of pending changes in the current change plan                                                                                                                                                |
| `cluster_changes_operations_completed`                | Number of completed changes in the current change plan                                                                                                                                              |
| `cluster_changes_operation_duration`                  | Duration it takes to apply an operation                                                                                                                                                             |
| `cluster_changes_operation_attempts`                  | Number of attempts per operation type                                                                                                                                                               |
| `banned_instances_total`                              | Number of banned instances                                                                                                                                                                          |
| `buffered_messages_count`                             | Current number of buffered messages.                                                                                                                                                                |
| `incident_events_total`                               | Number of incident events                                                                                                                                                                           |
| `pending_incidents_total`                             | Number of pending incidents                                                                                                                                                                         |
| `job_events_total`                                    | Number of job events                                                                                                                                                                                |
| `evaluated_dmn_elements_total`                        | Number of evaluated DMN elements including required decisions                                                                                                                                       |
| `executed_instances_total`                            | Number of executed (root) process instances                                                                                                                                                         |
| `element_instance_events_total`                       | Number of process element instance events                                                                                                                                                           |
| `process_instance_creations_total`                    | Number of created (root) process instances                                                                                                                                                          |
| `gateway_request_latency`                             | Latency of round-trip from gateway to broker                                                                                                                                                        |
| `gateway_failed_requests`                             | Number of failed requests                                                                                                                                                                           |
| `gateway_total_requests`                              | Number of requests                                                                                                                                                                                  |
| `long_polling_queued_current`                         | Number of requests currently queued due to long polling                                                                                                                                             |
| `stream_processor_batch_processing_duration`          | Time spent in batch processing (in seconds)                                                                                                                                                         |
| `stream_processor_batch_processing_commands`          | Records the distribution of commands in a batch over time                                                                                                                                           |
| `stream_processor_batch_processing_post_commit_tasks` | Time spent in executing post commit tasks after batch processing (in seconds)                                                                                                                       |
| `stream_processor_batch_processing_retry`             | Number of times batch processing failed due to reaching batch limit and was retried                                                                                                                 |
| `stream_processor_error_handling_phase`               | The phase of error handling                                                                                                                                                                         |
| `replay_events_total`                                 | Number of events replayed by the stream processor.                                                                                                                                                  |
| `replay_last_source_position`                         | The last source position the stream processor has replayed.                                                                                                                                         |
| `replay_event_batch_replay_duration`                  | Time for replay a batch of events (in seconds)                                                                                                                                                      |
| `stream_processor_records_total`                      | Number of records processed by stream processor                                                                                                                                                     |
| `stream_processor_last_processed_position`            | The last position the stream processor has processed.                                                                                                                                               |
| `stream_processor_latency`                            | Time between a command is written until it is picked up for processing (in seconds)                                                                                                                 |
| `stream_processor_processing_duration`                | Time for processing a record (in seconds)                                                                                                                                                           |
| `stream_processor_startup_recovery_time`              | Time taken for startup and recovery of stream processor (in ms)                                                                                                                                     |
| `stream_processor_state`                              | Describes the state of the stream processor, namely if it is active or paused.                                                                                                                      |
