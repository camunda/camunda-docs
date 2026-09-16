---
id: metrics
sidebar_label: Metrics
title: Camunda components metrics
keywords: ["observability", "metrics", "monitoring", "monitor"]
Description: "Learn about Camunda distributed system monitoring metrics using the Micrometer library as a facade for exporting metrics."
---

For distributed system monitoring, Camunda uses the [Micrometer](https://micrometer.io/) library as a facade to export metrics to [supported implementations](https://docs.micrometer.io/micrometer/reference/implementations.html) such as Prometheus, OpenTelemetry, Datadog, and Dynatrace.

## Access metrics

You can access your metrics data using your chosen monitoring implementation. Metrics data is only stored in-memory in Camunda, so it needs to be consumed and aggregated by a monitoring system.

Monitoring typically uses either a polling (default) or pushing system.

### Polling

The system (for example, Prometheus) polls an endpoint exposed by Camunda at a regular interval.

- Each request constitutes a data point for each metric.
- When working with such systems, configure the polling interval to get information quickly but without overwhelming Camunda itself (which still has to serve this data) or having to store too much data in your monitoring system itself.
- Additionally, this means exposing the Camunda endpoint to your external monitoring system.

### Pushing

For a pushing system (for example, OpenTelemetry), Camunda is configured to asynchronously push metric updates to an external endpoint at a regular interval.

- This implies that the system is accessible to Camunda via the network, so you should ensure communication is secure.
- Similarly to the polling approach, balance how fast you are pushing (and getting updates/data points) without overwhelming your external system.

## Configuration

Configure your metrics using the built-in [Spring Boot Micrometer configuration](https://docs.spring.io/spring-boot/reference/actuator/metrics.html).

### Defaults

Camunda includes built-in support for [Prometheus](https://prometheus.io) and [OpenTelemetry](https://opentelemetry.io/). By default, the configuration only exports Prometheus metrics via [a scraping endpoint](https://docs.spring.io/spring-boot/reference/actuator/metrics.html#actuator.metrics.export.prometheus), with OpenTelemetry disabled.

#### Prometheus

The scraping endpoint for Prometheus is located under the management context (default `:9600/actuator/prometheus`).

Configure this via the following properties:

```yaml
management:
  endpoint.prometheus.access: unrestricted
  prometheus.metrics.export.enabled: true
```

To collect metrics, you must define the new scraping endpoint for Prometheus.

Add the following scraping job:

```
- job_name: camunda
  scrape_interval: 30s
  metrics_path: /actuator/prometheus
  scheme: http
  static_configs:
  - targets:
    - localhost: 9600
```

:::warning
If you've configured your management context to use HTTPS, you must also update the `scheme` for the scraping job above. This also applies if you change the management port.
:::

:::note

The scraping interval is `30s` by default. This means you will get new data points in Prometheus every 30 seconds.

- This is a good default to minimize the storage requirements for Prometheus.
- To run alerts or auto-scaling based on the provided metrics, you can configure a shorter interval. As this results in more data
  being ingested, use at your own risk.

:::

#### OpenTelemetry Protocol

Zeebe also comes built-in with support to export metrics via OpenTelemetry (using the `micrometer-registry-otlp`).

Configure this via the following properties:

```yaml
management:
  # Disable Prometheus
  promethus.metrics.export.enabled: false
  # Configure OpenTelemetry Metrics
  otlp:
    metrics:
      export:
        # Enable OTLP
        enabled: true
        # Since metrics are pushed, you will need to configure at least one endpoint
        url: "https://otlp.example.com:4318/v1/metrics"
```

For a complete list of configuration options for OTLP, refer to the [Micrometer](https://docs.micrometer.io/micrometer/reference/implementations/otlp.html#_configuring) documentation.

:::warning
When using the OTLP exporter, check the requirements of your target endpoint, as it might require additional configuration. For example, you might need to pass a client secret and ID for authentication via the `otlp.metrics.export.headers` options, or your system might not support `cumulative` aggregation temporality and instead require `delta` (for example, Dynatrace).
:::

:::tip
A wide variety of existing monitoring systems also support ingesting OpenTelemetry data (for example, Dynatrace, Datadog, and so on). Camunda recommends using these instead of the specific Micrometer implementations.
:::

### Use a different monitoring system

To use a different monitoring system, refer to the [Spring Boot](https://docs.spring.io/spring-boot/reference/actuator/metrics.html#actuator.metrics.export) documentation.
Zeebe only ships with built-in support for the [Prometheus](https://docs.spring.io/spring-boot/reference/actuator/metrics.html#actuator.metrics.export.prometheus)
and [OTLP](https://docs.spring.io/spring-boot/reference/actuator/metrics.html#actuator.metrics.export.otlp) systems.

To use a different system, you must add the required dependencies to your Zeebe installation, specifically to the distribution's `lib/` folder.

:::note
When using the container image, you must add it to the following paths, based on your image:

- `camunda/zeebe`: `/usr/local/zeebe/lib`
- `camunda/camunda`: `/usr/local/camunda/lib`
  :::

For example, to export to Datadog, download the `io.micrometer:micrometer-registry-datadog` JAR and place it in the `./lib` folder of the distribution.

Running from the root of the distribution, you can use Maven to do this for you:

```shell
mvn dependency:copy -Dartifact=io.micrometer:micrometer-registry-datadog:1.14.4 -Dtransitive=false -DoutputDirectory=./lib
```

:::note
The version must be the same as the Micrometer version used by Camunda.

- Find this information by checking the distribution artifact on [Maven Central](https://central.sonatype.com/artifact/io.camunda/camunda-zeebe/dependencies).
- Select the distribution version you are using, and filter for `micrometer` to get the expected Micrometer version.

:::

### Customize metrics

You can modify and filter the metrics exposed in Camunda via configuration.

#### Common tags

[Tags provide a convenient way of aggregating metrics over common attributes](https://docs.spring.io/spring-boot/reference/actuator/metrics.html#actuator.metrics.customizing.common-tags). Via configuration, you can ensure that all metrics for a specific instance of Camunda share common tags.

For example, if you deployed two different clusters and wanted to differentiate them:

The first cluster could be configured as:

```yaml
management:
  metrics:
    tags:
      cluster: "foo"
```

And the second cluster configured as:

```yaml
management:
  metrics:
    tags:
      cluster: "bar"
```

#### Filtering

[You can additionally disable certain metrics](https://docs.spring.io/spring-boot/reference/actuator/metrics.html#actuator.metrics.customizing.per-meter-properties).
This can be useful for high cardinality metrics which you do not care for, but which may end up being expensive to store in your target system.

To filter a metric called `zeebe.foo`, you would configure the following property:

```yaml
management:
  metrics:
    enable:
      zeebe:
        foo: false
```

:::note
Filtering applies not only to direct name matches (for example, `zeebe.foo`), but as a prefix. This means any metric starting with the prefix `zeebe.foo` in the example would also be filtered out, and would not be exported.
:::

## Available metrics

[Spring already exposes various metrics](https://docs.spring.io/spring-boot/reference/actuator/metrics.html#actuator.metrics.supported), some of which will be made available
through Camunda:

- [JVM metrics](https://docs.spring.io/spring-boot/reference/actuator/metrics.html#actuator.metrics.supported.jvm)
- [System metrics](https://docs.spring.io/spring-boot/reference/actuator/metrics.html#actuator.metrics.supported.system)
- [Application startup metrics](https://docs.spring.io/spring-boot/reference/actuator/metrics.html#actuator.metrics.supported.application-startup)
- [Logger metrics](https://docs.spring.io/spring-boot/reference/actuator/metrics.html#actuator.metrics.supported.logger)
- [Spring MVC metrics](https://docs.spring.io/spring-boot/reference/actuator/metrics.html#actuator.metrics.supported.spring-mvc)

Camunda also exposes several custom metrics, most of them under the `zeebe`, `atomix`, `operate`, `tasklist`, or `optimize` prefixes.

:::note
While all nodes in a Camunda cluster expose metrics, they will expose relevant metrics based on their role. For example, brokers will expose processing related metrics,
while gateways will expose REST API relevant metrics.
:::

:::note
**Not all metrics are available at all times.** This can apply to various metrics, but is especially noticeable for **processing-related metrics**, which are recorded on events that can occur infrequently. For example, the `zeebe_incident_events_total` metric is only recorded when an incident is **created** or **resolved**.
:::

### Process processing metrics

The following metrics are related to process processing:

| Metric                                 | Description                                                                                                                                                                                                |
| :------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `zeebe_stream_processor_records_total` | The number of events processed by the stream processor. The `action` label separates processed, skipped, and written events.                                                                               |
| `zeebe_exporter_events_total`          | The number of events processed by the exporter processor. The `action` label separates exported and skipped events.                                                                                        |
| `zeebe_element_instance_events_total`  | The number of occurred process element instance events. The `action` label separates the number of activated, completed, and terminated elements. The `type` label separates different BPMN element types. |
| `zeebe_job_events_total`               | The number of job events. The `action` label separates the number of created, activated, timed out, completed, failed, and canceled jobs.                                                                  |
| `zeebe_incident_events_total`          | The number of incident events. The `action` label separates the number of created and resolved incident events.                                                                                            |
| `zeebe_pending_incidents_total`        | The number of currently pending incidents, that is, not resolved.                                                                                                                                          |

### Performance metrics

The following metrics are related to performance. For example, Zeebe has a backpressure mechanism to reject requests when it receives more requests than it can handle without incurring high processing latency.

Monitor backpressure and processing latency of the commands using the following metrics:

| Metric                                  | Description                                                             |
| :-------------------------------------- | :---------------------------------------------------------------------- |
| `zeebe_dropped_request_count_total`     | The number of user requests rejected by the broker due to backpressure. |
| `zeebe_backpressure_requests_limit`     | The limit for the number of inflight requests used for backpressure.    |
| `zeebe_stream_processor_latency_bucket` | The processing latency for commands and event.                          |

### Health metrics

The health of partitions in a broker can be monitored using the metric `zeebe_health`.

## Execution latency metrics

Brokers can export optional execution latency metrics.

To enable export of execution metrics, set the `CAMUNDA_MONITORING_METRICS_ENABLEEXPORTEREXECUTIONMETRICS` environment variable to `true` in your Zeebe [configuration file](/self-managed/components/orchestration-cluster/zeebe/configuration/configuration.md).

## Optimize error metrics

Optimize exposes a counter metric for tracking errors by type.

| Metric name            | Type    | Description                                              | Labels                   |
| ---------------------- | ------- | -------------------------------------------------------- | ------------------------ |
| `optimize_error_total` | Counter | Number of errors occurring in Optimize, grouped by type. | `ERROR_TYPE` (see below) |

The `ERROR_TYPE` label can have the following values:

| Value                    | Description                                                                 |
| ------------------------ | --------------------------------------------------------------------------- |
| `too_many_buckets`       | Aggregation bucket limit exceeded during report evaluation.                 |
| `version_conflict`       | Document version conflict on write, for example, during imports or updates. |
| `index_not_found`        | Required index is missing, for example, in metadata queries or scrollers.   |
| `search_context_missing` | Search context expired during pagination, for example, JSON export.         |
| `nested_limit_exceeded`  | Nested document limit exceeded in complex queries.                          |
| `elasticsearch_error`    | Generic Elasticsearch error that does not match a more specific type.       |
| `opensearch_error`       | Generic OpenSearch error that does not match a more specific type.          |

Each time series uses the same metric name and differs only by the `ERROR_TYPE` label value. For example:

```
optimize_error_total{ERROR_TYPE="too_many_buckets"} 5
optimize_error_total{ERROR_TYPE="version_conflict"} 12
```

## Optimize report latency metrics

Optimize exposes a timer metric for tracking how long report evaluations take.

| Metric name                       | Type  | Description                    | Labels                     |
| --------------------------------- | ----- | ------------------------------ | -------------------------- |
| `optimize_report_reportLatency_*` | Timer | Duration of report evaluation. | `REPORT_NAME`, `REPORT_ID` |

The `REPORT_NAME` and `REPORT_ID` labels identify the evaluated report or dashboard.

Report latency metrics are controlled by the `optimize.metrics.report-latency.enabled=true` configuration property. Set the property to `false` to disable report latency metrics.

## Secret resolution and cache metrics

Camunda emits meters for secret resolution and for the in-memory cache associated with each configured store. Use these meters to distinguish a slow or unavailable secret store from a cold cache when jobs don't activate.

These meters don't use secret names as labels because secret-name cardinality is unbounded and secret names contain customer data.

### Secret resolution metrics

These meters cover resolving secret references against a secret store.

| Metric name                             | Type    | Description                                                                                                                                                                                                                                                                                                                                                          | Labels                                                       |
| --------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `camunda.secret.resolution.duration`    | Timer   | Latency of one batch resolution call against a secret store. Measures the store call only, not the follow-up commands the engine writes for its results. The `result` label separates calls by outcome so store timeouts don't distort the latency of successful calls.                                                                                              | `store`, `result` (see below), `physicalTenant`, `partition` |
| `camunda.secret.resolution.outcome`     | Counter | Number of secret reference resolutions that produced an outcome, per store. Every result value is terminal for the reference it counts, so the values can be summed or divided by one another to derive rates. A reference whose store is unavailable but still has retry attempts left is not counted at all, since it has not reached a terminal outcome.          | `store`, `result` (see below), `physicalTenant`, `partition` |
| `camunda.secret.resolution.cycle.error` | Counter | Number of resolution cycles in which a store encounters an unexpected exception that the engine does not model as a per-secret failure or unavailable store. Counted per store. A nonzero value indicates a bug in either the store implementation or the engine. Counts cycles, not references, so it is a separate meter from `camunda.secret.resolution.outcome`. | `store`, `physicalTenant`, `partition`                       |
| `camunda.secret.resolution.cycle.delay` | Timer   | Delay before the next resolution cycle, grouped by the reason for the delay. Monitor `IDLE_BACKOFF` to verify that the delay increases geometrically after consecutive misses. Its distribution shows the backoff behavior without requiring you to infer it from the cycle rate.                                                                                    | `result` (see below), `physicalTenant`, `partition`          |

The `store` label carries the ID of the secret store a reference belongs to. `camunda.secret.resolution.cycle.delay` carries no `store` label, since a resolution cycle isn't scoped to one store. Every resolution meter also carries the `physicalTenant` and `partition` labels applied to Zeebe metrics generally.

The `result` label uses different values depending on the meter:

`result` values on `camunda.secret.resolution.duration`:

| Value               | Description                                                                  |
| ------------------- | ---------------------------------------------------------------------------- |
| `RETURNED`          | The store returned, whatever the per-reference results were.                 |
| `STORE_UNAVAILABLE` | The store could not be reached for this call.                                |
| `ERROR`             | The store threw something the engine does not model. Always indicates a bug. |

`result` values on `camunda.secret.resolution.outcome`:

| Value               | Description                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `RESOLVED`          | The store returned a value for the reference.                                                                                         |
| `NOT_FOUND`         | The store does not hold the reference.                                                                                                |
| `ACCESS_DENIED`     | The store refused to read the reference.                                                                                              |
| `INVALID_REF`       | The reference is not valid for the store.                                                                                             |
| `UNREADABLE`        | The store holds the reference but could not read a value from it.                                                                     |
| `STORE_UNAVAILABLE` | The store could not serve the reference at all: either it is not configured, or it could not be reached and no retry attempt is left. |

`result` values on `camunda.secret.resolution.cycle.delay` (why the cycle chose its delay, not a per-reference outcome):

| Value            | Description                                                                                               |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| `DRAINING`       | More pending references remained than the batch cap allowed this cycle to take. The delay is always zero. |
| `WAKE`           | This cycle resolved something, or a reference was requested since the last cycle ran.                     |
| `IDLE_BACKOFF`   | Neither of the above, and no store is in retry cooldown.                                                  |
| `RETRY_COOLDOWN` | Neither of the above, and a store's retry cooldown deadline set the delay instead.                        |

### Interpret secret cache metrics

Each configured secret store uses an in-memory cache during resolution. Use these metrics to evaluate cache behavior and distinguish cache misses from store-level resolution failures.

| Metric name                      | Type    | Description                                                                                                                                                                                                                                                                                                                                   | Labels                                          |
| -------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `camunda.secret.cache.result`    | Counter | Number of secret cache lookups, grouped by store and result. Use `HIT / (HIT + MISS)` to calculate the cache hit rate. Each lookup is counted once. References that result in permanent failures, such as not found, access denied, or invalid, are never cached and therefore produce a `MISS` on every lookup while they remain referenced. | `store`, `result` (see below), `physicalTenant` |
| `camunda.secret.cache.evictions` | Counter | Number of entries removed from a secret cache, grouped by store and cause.                                                                                                                                                                                                                                                                    | `store`, `cause` (see below), `physicalTenant`  |
| `camunda.secret.cache.size`      | Gauge   | Estimated number of entries currently held in a secret cache, per store. Because eviction is asynchronous, the value can briefly exceed the configured maximum. Use this metric to compare the current cache level with the configured maximum rather than as an exact count.                                                                 | `store`, `physicalTenant`                       |

The `store` label contains the ID of the secret store associated with the cache. Every cache metric also includes `physicalTenant` because the registry that publishes these metrics is scoped per tenant. Cache metrics don't include `partition` because a secret cache exists outside any partition.

#### `result` values for `camunda.secret.cache.result`

| Value  | Description                                                                                               |
| ------ | --------------------------------------------------------------------------------------------------------- |
| `HIT`  | The cache contains a value for the requested name.                                                        |
| `MISS` | The cache contains no value for the requested name, so resolution must continue against the secret store. |

#### `cause` values for `camunda.secret.cache.evictions`

| Value       | Description                                                                                                                                                                              |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SIZE`      | The cache reached its configured maximum and evicted an entry to make room for another.                                                                                                  |
| `EXPIRED`   | The entry's time-to-live expired.                                                                                                                                                        |
| `EXPLICIT`  | An entry was explicitly removed by name. In the current implementation, this occurs when a store reports a permanent failure, such as not found, access denied, or an invalid reference. |
| `COLLECTED` | The entry's key or value was garbage collected. The current cache configuration does not emit this value because it uses neither weak keys nor soft values.                              |

### Read cache and resolution metrics together

`camunda.secret.cache.result` and `camunda.secret.resolution.outcome` describe different parts of secret resolution.

A low cache hit rate does not necessarily indicate a cache problem. References that result in permanent failures, such as not found, access denied, or invalid, are never cached and therefore produce a `MISS` on every lookup.

When the cache hit rate is low, check `camunda.secret.resolution.outcome` first. If the misses correspond to references that never resolve successfully, address the resolution failures rather than the cache configuration.

### Cache size and the configured maximum

`camunda.secret.cache.size` is bounded per store by the
[`camunda.secrets.cache.max-size`](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#camundasecretscache)
property. The bound applies per store, not as a shared budget, so the worst-case memory footprint
across a deployment is the number of configured stores multiplied by that maximum.

### Metric names in Prometheus

The tables above name meters by their Micrometer meter ID. When Prometheus scrapes them, dots
become underscores, and Micrometer appends a type suffix: `_total` for a counter, the base unit for
a timer (plus `_count` and `_sum`; both timers here also declare fixed histogram buckets, so
`_bucket` is always emitted for them too), and no suffix for a gauge:

| Metric name                             | Prometheus metric name                          |
| --------------------------------------- | ----------------------------------------------- |
| `camunda.secret.resolution.duration`    | `camunda_secret_resolution_duration_seconds`    |
| `camunda.secret.resolution.cycle.delay` | `camunda_secret_resolution_cycle_delay_seconds` |
| `camunda.secret.resolution.outcome`     | `camunda_secret_resolution_outcome_total`       |
| `camunda.secret.resolution.cycle.error` | `camunda_secret_resolution_cycle_error_total`   |
| `camunda.secret.cache.result`           | `camunda_secret_cache_result_total`             |
| `camunda.secret.cache.evictions`        | `camunda_secret_cache_evictions_total`          |
| `camunda.secret.cache.size`             | `camunda_secret_cache_size`                     |

`camunda.secret.cache.size` is the one exception with no unit suffix at all, so it stays exactly
`camunda_secret_cache_size`. For example, the cache hit rate described above becomes:

```promql
camunda_secret_cache_result_total{result="HIT"} / ignoring(result) sum without (result) (camunda_secret_cache_result_total)
```

For how the broker resolves secret references before job activation, see
[Secret resolution and job activation](/components/concepts/secret-resolution-and-job-activation.md).

## Grafana

### Zeebe

Zeebe comes with a pre-built dashboard, available in the repository:
[monitor/grafana/zeebe.json](https://github.com/camunda/camunda/blob/main/monitor/grafana/zeebe.json).

- [Import](https://grafana.com/docs/grafana/latest/reference/export_import/#importing-a-dashboard) the dashboard into your Grafana instance and select the correct Prometheus data source (if you have more than one).
- The dashboard displays a healthy cluster topology, general throughput metrics, handled requests, exported events per second, disk and memory usage, and more.

The following image shows an example of the Zeebe Grafana dashboard after import.

![Example Zeebe Grafana dashboard](assets/grafana-preview.png)

#### Physical Tenant filtering

Partition-scoped Zeebe metrics include a `physicalTenant` label. Node-level metrics that are not partition-scoped do not carry this label. The Zeebe dashboard supports filtering and aggregating metrics by `physicalTenant` and `partition`, and exposes `physicalTenant` as a variable selector, so you can monitor throughput, latency, and resource usage for each Physical Tenant independently.

To compare across tenants in Prometheus queries, use the `physicalTenant` label directly. For example:

```promql
sum by (physicalTenant) (zeebe_stream_processor_latency_seconds_count)
```

:::note
Other Grafana dashboards (API panels, gateway panels) are being updated to include `physicalTenant` filtering, tracked in [camunda/camunda#56250](https://github.com/camunda/camunda/issues/56250).
:::

### Data layer

A pre-built Grafana dashboard is available for the data layer in the repository:

[monitor/grafana/data_layer.json](https://github.com/camunda/camunda/blob/main/monitor/grafana/dashboards/data_layer.json)

To use it:

1. [Import](https://grafana.com/docs/grafana/latest/reference/export_import/#importing-a-dashboard) the dashboard into your Grafana instance.
2. When prompted, select the appropriate Prometheus data source (especially if multiple are configured).

The dashboard provides insights into key data layer components for Camunda versions `>= 8.8`, with a focus on the Camunda exporter through which all data flows.

![Example panels](assets/example-panels-data-layer.png)

## Configure metrics

Configure metrics for each Camunda 8 component as follows:

- [Orchestration Cluster](/self-managed/components/orchestration-cluster/core-settings/concepts/monitoring.md)
- [Camunda Hub](/self-managed/components/hub/monitoring.md)
