---
id: exporters
title: "Exporters"
---

As Zeebe processes jobs and processes, or performs internal maintenance (e.g. raft failover), it generates an ordered stream of records.

![record-stream](assets/exporters-stream.png)

While the clients provide no way to inspect this stream directly, Zeebe can load
and configure user code that can process each and every one of those records in the form of an exporter.

An **exporter** provides a single entry point to process every record written on a stream.

- Persist historical data by pushing it to an external data warehouse
- Export records to a visualization tool (e.g. [zeebe-simple-monitor](https://github.com/camunda-community-hub/zeebe-simple-monitor/))

Zeebe only loads exporters configured through the main Zeebe YAML
configuration file.

Once an exporter is configured, the next time Zeebe is started, the exporter
starts receiving records. Note that it is only guaranteed to see records
produced from that point on.

You can find a reference implementation in the form of the Zeebe-maintained
[Elasticsearch exporter](https://github.com/camunda-cloud/zeebe/tree/develop/exporters/elasticsearch-exporter).

The main impact exporters have on a Zeebe cluster is that they remove the burden
of persisting data indefinitely.

Once data is not needed by Zeebe anymore, it queries its exporters to
know if it can be safely deleted. If so, it permanently erases it, thereby
reducing disk usage.

:::note
If no exporters are configured, Zeebe automatically erases data when it is not necessary anymore. If you need historical data, you **must** configure an exporter to stream records into your external data warehouse.

Regardless of how an exporter is loaded (whether through an external JAR or not),
all exporters interact in the same way with the broker, which is defined by the
[Exporter interface](https://github.com/camunda-cloud/zeebe/tree/develop/exporter-api/src/main/java/io/camunda/zeebe/exporter/api/Exporter.java).

## Loading

Once configured, exporters are loaded as part of the broker startup phase, before
any processing is done.

During the loading phase, the configuration for each exporter is validated, so the broker will not start if:

- An exporter ID is not unique
- An exporter points to a non-existent/non-accessible JAR
- An exporter points to a non-existent/non-instantiable class
- An exporter instance throws an exception in its `Exporter#configure` method

The last point is there to provide individual exporters to perform lightweight
validation of their configuration (e.g. fail if missing arguments).

One caveat is that an instance of an exporter is created and immediately thrown away; therefore, exporters should not perform any computationally heavy work during instantiation/configuration.

:::note
Zeebe creates an isolated class loader for every JAR referenced by exporter configurations - that is, only once per JAR. If the same JAR is reused to define different exporters, these will share the same class loader. This has some nice properties, primarily that different exporters can depend on the same third party libraries without having to worry about versions or class name collisions. Additionally, exporters use the system class loader for system classes, or classes packaged as part of the Zeebe JAR.
:::

Exporter-specific configuration is handled through the exporter's `[exporters.args]`
nested map. This provides a simple `Map<String, Object>`, which is passed directly
in the form of a [Configuration](https://github.com/camunda-cloud/zeebe/tree/develop/exporter-api/src/main/java/io/camunda/zeebe/exporter/api/context/Configuration.java) object when the broker calls the `Exporter#configure(Configuration)` method.

Configuration occurs at two different phases: during the broker startup phase, and
once every time a leader is elected for a partition.

## Processing

At any given point, there is exactly one leader node for a given partition.

Whenever a node becomes the leader for a partition, it runs an instance of an
[exporter stream processor](https://github.com/camunda-cloud/zeebe/tree/develop/broker/src/main/java/io/camunda/zeebe/broker/exporter/stream/ExporterDirector.java).

This stream processor creates exactly one instance of each configured exporter,
and forwards every record written on the stream to each of these in turn.

:::note
This implies there will be exactly one instance of every exporter for every partition. If you have four partitions, and at least four threads for processing, there are potentially four instances of your exporter exporting simultaneously.
:::

Zeebe only guarantees at-least-once semantics. A record is seen at least once by an exporter, and maybe more. Cases where this may happen include the following:

- During reprocessing after raft failover (i.e. new leader election)
- On error if the position is not yet updated

To reduce the amount of duplicate records an exporter will process, the stream
processor keeps track of the position of the last successfully exported record
for every single exporter. The position is sufficient since a stream is an ordered
sequence of records whose position is monotonically increasing. This position is
set by the exporter itself once it can guarantee a record has been successfully
updated.

:::note
Zeebe exports with at least once semantics, so you will have to deal with duplicates. It's best to reduce the amount of duplicate records an exporter handles alongside Zeebe, doing as little as possible in the exporter to reduce the load on the broker. We recommend performing deduplication based on the unique record key. We also recommend refraining from blocking, given blocking on the actor threads entirely, which may have a large impact on the system.
:::

### Error handling

If an error occurs during the `Exporter#open(Context)` phase, the stream
processor fails and is restarted, potentially fixing the error. Worst case
scenario, this means no exporter runs at all until these errors stop.

If an error occurs during the `Exporter#close` phase, it is logged, but will
still allow other exporters to gracefully finish their work.

If an error occurs during processing, we retry infinitely the same record until
no error is produced. Worst case scenario, this means a failing exporter could bring
all exporters to a halt. Currently, exporter implementations are expected to
implement their own retry/error handling strategies, though this may change in the
future.

### Performance impact

Zeebe naturally incurs a performance impact for each loaded exporter. A slow
exporter slows down all other exporters for a given partition, and, in the
worst case, could completely block a thread.

It's therefore recommended to keep exporters as simple as possible, and perform
any data enrichment or transformation through the external system.
