import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## API

<Tabs>
  <TabItem value="application.yaml" label="Application properties">

### `camunda.api.long-polling`

| Property                                       | Description                                                                                                                           | Default value |
| :--------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ | :------------ |
| `camunda.api.long-polling.enabled`             | <p>Enable [long-polling](/components/concepts/job-workers.md#long-polling) for the Camunda gRPC API server.</p>                       | `true`        |
| `camunda.api.long-polling.timeout`             | <p>Set the timeout for long polling in milliseconds.</p>                                                                              | `10000`       |
| `camunda.api.long-polling.probe-timeout`       | <p>Set the probe timeout for long polling in milliseconds.</p>                                                                        | `10000`       |
| `camunda.api.long-polling.min-empty-responses` | <p>Set the number of minimum empty responses. A minimum number of responses with jobCount of 0 infers that no jobs are available.</p> | `10s`         |

  </TabItem>
    <TabItem value="env" label="Environment variables">

### `CAMUNDA_API_LONGPOLLING`

| Property                                    | Description                                                                                                                           | Default value |
| :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------ | :------------ |
| `CAMUNDA_API_LONGPOLLING_ENABLED`           | <p>Enable [long-polling](/components/concepts/job-workers.md#long-polling) for the Camunda gRPC API server.</p>                       | `true`        |
| `CAMUNDA_API_LONGPOLLING_TIMEOUT`           | <p>Set the timeout for long polling in milliseconds.</p>                                                                              | `10000`       |
| `CAMUNDA_API_LONGPOLLING_PROBETIMEOUT`      | <p>Set the probe timeout for long polling in milliseconds.</p>                                                                        | `10000`       |
| `CAMUNDA_API_LONGPOLLING_MINEMPTYRESPONSES` | <p>Set the number of minimum empty responses. A minimum number of responses with jobCount of 0 infers that no jobs are available.</p> | `10s`         |

  </TabItem>
</Tabs>

## API - gRPC

<Tabs>
  <TabItem value="application.yaml" label="Application properties">

### `camunda.api.grpc`

| Property                                   | Description                                                                                                                                                                                                                                                           | Default value |
| :----------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `camunda.api.grpc.address`                 | <p>Set the address the gateway binds to.</p>                                                                                                                                                                                                                          | `0.0.0.0`     |
| `camunda.api.grpc.port`                    | <p>Set the port the gateway binds to.</p>                                                                                                                                                                                                                             | `26500`       |
| `camunda.api.grpc.min-keep-alive-interval` | <p>Set the minimum keep alive interval.</p><ul><li>This setting specifies the minimum accepted interval between keep alive pings.</li><li>This value must be specified as a positive integer followed by 's' for seconds, 'm' for minutes or 'h' for hours.</li></ul> | `30s`         |
| `camunda.api.grpc.max-message-size`        | <p>Set the maximum size of the incoming and outgoing messages (that is, commands and events).</p>                                                                                                                                                                     | `4MB`         |
| `camunda.api.grpc.management-threads`      | <p>Set the number of threads the gateway will use to communicate with the broker cluster.</p>                                                                                                                                                                         | `1`           |

### `camunda.api.grpc.ssl`

| Property                                       | Description                                                                                                                          | Default value       |
| :--------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- | :------------------ |
| `camunda.api.grpc.ssl.enabled`                 | <p>Enable SSL (Secure Sockets Layer) authentication for the gateway.</p>                                                             | `false`             |
| `camunda.api.grpc.ssl.certificate`             | <p>Set the path to the certificate chain file.</p>                                                                                   | Null                |
| `camunda.api.grpc.ssl.certificate-private-key` | <p>Set the path to the private key file location.</p>                                                                                | Null                |
| `camunda.api.grpc.ssl.key-store.file-path`     | <p>Configure the keystore file containing both the certificate chain and the private key. Currently only supports PKCS12 format.</p> | `/path/to/keystore` |
| `camunda.api.grpc.ssl.key-store.password`      | <p>Configure the keystore password.</p>                                                                                              | Null                |

### `camunda.api.grpc.interceptors`

| Property                                     | Description                                                                                                                                                                                                                                                         | Default value |
| :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------ |
| `camunda.api.grpc.interceptors[]`            | <p>This property is part of Camunda's gRPC interceptor system, which allows you to add custom processing logic to gRPC requests and responses.</p><p>The property is a list of interceptor configurations, each requiring an `id`, `jar-path` and `class-name`.</p> | No entries    |
| `camunda.api.grpc.interceptors[].id`         | <p>The unique identifier for a particular gRPC interceptor configuration.</p>                                                                                                                                                                                       | Null          |
| `camunda.api.grpc.interceptors[].jar-path`   | <p>The file path to a JAR file that contains a custom gRPC interceptor implementation.</p>                                                                                                                                                                          | Null          |
| `camunda.api.grpc.interceptors[].class-name` | <p>Set the fully qualified class name of a custom gRPC interceptor implementation that should be loaded and executed by the Camunda gRPC server.</p>                                                                                                                | Null          |

</TabItem>
<TabItem value="env" label="Environment variables">

### `CAMUNDA_API_GRPC`

| Property                                | Description                                                                                                                                                                                                                                                           | Default value |
| :-------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `CAMUNDA_API_GRPC_ADDRESS`              | <p>Set the address the gateway binds to.</p>                                                                                                                                                                                                                          | `0.0.0.0`     |
| `CAMUNDA_API_GRPC_PORT`                 | <p>Set the port the gateway binds to.</p>                                                                                                                                                                                                                             | `26500`       |
| `CAMUNDA_API_GRPC_MINKEEPALIVEINTERVAL` | <p>Set the minimum keep alive interval.</p><ul><li>This setting specifies the minimum accepted interval between keep alive pings.</li><li>This value must be specified as a positive integer followed by 's' for seconds, 'm' for minutes or 'h' for hours.</li></ul> | `30s`         |
| `CAMUNDA_API_GRPC_MAXMESSAGESIZE`       | <p>Set the maximum size of the incoming and outgoing messages (that is, commands and events).</p>                                                                                                                                                                     | `4MB`         |
| `CAMUNDA_API_GRPC_MANAGEMENTTHREADS`    | <p>Set the number of threads the gateway will use to communicate with the broker cluster.</p>                                                                                                                                                                         | `1`           |

### `CAMUNDA_API_GRPC_SSL`

| Property                                     | Description                                                                                                                          | Default value       |
| :------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- | :------------------ |
| `CAMUNDA_API_GRPC_SSL_ENABLED`               | <p>Enable SSL (Secure Sockets Layer) authentication for the gateway.</p>                                                             | `false`             |
| `CAMUNDA_API_GRPC_SSL_CERTIFICATE`           | <p>Set the path to the certificate chain file.</p>                                                                                   | Null                |
| `CAMUNDA_API_GRPC_SSL_CERTIFICATEPRIVATEKEY` | <p>Set the path to the private key file location.</p>                                                                                | Null                |
| `CAMUNDA_API_GRPC_SSL_KEYSTORE_FILEPATH`     | <p>Configure the keystore file containing both the certificate chain and the private key. Currently only supports PKCS12 format.</p> | `/path/to/keystore` |
| `CAMUNDA_API_GRPC_SSL_KEYSTORE_PASSWORD`     | <p>Configure the keystore password.</p>                                                                                              | Null                |

### `CAMUNDA_API_GRPC_INTERCEPTORS`

| Property                                    | Description                                                                                                                                          | Default value |
| :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `CAMUNDA_API_GRPC_INTERCEPTORS`             | <p>List of gRPC interceptor configurations.</p><p>Each entry requires `ID`, `JARPATH`, and `CLASSNAME`.</p>                                          | No entries    |
| `CAMUNDA_API_GRPC_INTERCEPTORS_0_ID`        | <p>The unique identifier for a particular gRPC interceptor configuration.</p>                                                                        | Null          |
| `CAMUNDA_API_GRPC_INTERCEPTORS_0_JARPATH`   | <p>The file path to a JAR file that contains a custom gRPC interceptor implementation.</p>                                                           | Null          |
| `CAMUNDA_API_GRPC_INTERCEPTORS_0_CLASSNAME` | <p>Set the fully qualified class name of a custom gRPC interceptor implementation that should be loaded and executed by the Camunda gRPC server.</p> | Null          |

  </TabItem>
</Tabs>

## API - REST

<Tabs>
  <TabItem value="application.yaml" label="Application properties">

### `camunda.api.rest.filters`

| Property                              | Description                                                                                                                                                                                                                               | Default value |
| :------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `camunda.api.rest.filters[]`          | <p>This property is part of Camunda's REST filter system, which allows you to add filters to REST requests and responses.</p><p>The property is a list of filter configurations, each requiring an `id`, `jar-path` and `class-name`.</p> | No entries    |
| `camunda.api.rest.filters[].id`       | <p>The unique identifier for a particular REST filter configuration.</p>                                                                                                                                                                  | Null          |
| `camunda.api.rest.filters.jar-path`   | <p>The file path to a JAR file that contains a custom REST filter implementation.</p>                                                                                                                                                     | Null          |
| `camunda.api.rest.filters.class-name` | <p>Set the fully qualified class name of a custom REST filter implementation that should be loaded and executed by the Camunda REST server.</p>                                                                                           | Null          |

### `camunda.api.rest.process-cache`

| Property                                         | Description                                                                                  | Default value |
| :----------------------------------------------- | :------------------------------------------------------------------------------------------- | :------------ |
| `camunda.api.rest.process-cache.max-size`        | <p>Set the maximum number of entries that can be stored in the REST API's process cache.</p> | `100`         |
| `camunda.api.rest.process-cache.expiration-idle` | <p>Set the idle expiration time for entries in the REST API's process cache.</p>             | `null`        |

### `camunda.api.rest.executor`

| Property                                              | Description                                                                                                                                                                                                                                                                                                                                                                                                 | Default value |
| :---------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `camunda.api.rest.executor.core-pool-size-multiplier` | <p>Multiplier applied to the number of available processors to compute the executor's core pool size (minimum number of threads kept alive).</p><p>Effective value: `corePoolSize` = `availableProcessors` \* `corePoolSizeMultiplier`.</p><p>Use a higher value if you have steady, continuous traffic and want to minimize cold-start latency. Keep it low to allow the pool to scale down when idle.</p> | `1`           |
| `camunda.api.rest.executor.max-pool-size-multiplier`  | <p>Multiplier applied to the number of available processors to compute the executor's maximum pool size (hard cap on threads).</p><p>Effective value: `maxPoolSize` = `availableProcessors` \* `maxPoolSizeMultiplier`.</p><p>Must be >= `corePoolSizeMultiplier`.</p><p>Increase cautiously, as high values can cause oversubscription for CPU-bound workloads.</p>                                        | `2`           |
| `camunda.api.rest.executor.keep-alive`                | <p>Time in seconds that threads above the core size may remain idle before being terminated.</p><p>Lower values reclaim resources faster after bursts. Higher values reduce thread creation/destruction churn if bursts are frequent.</p>                                                                                                                                                                   | `60s`         |
| `camunda.api.rest.executor.queue-capacity`            | <p>Capacity of the executor's task queue. A small bounded queue (for example, `64`) is recommended to handle short bursts while still allowing the pool to grow.</p>                                                                                                                                                                                                                                        | `64`          |

</TabItem>
<TabItem value="env" label="Environment variables">

### `CAMUNDA_API_REST_FILTERS`

| Property                               | Description                                                                                                                                                                                                                               | Default value |
| :------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `CAMUNDA_API_REST_FILTERS`             | <p>This property is part of Camunda's REST filter system, which allows you to add filters to REST requests and responses.</p><p>The property is a list of filter configurations, each requiring an `id`, `jar-path` and `class-name`.</p> | No entries    |
| `CAMUNDA_API_REST_FILTERS_0_ID`        | <p>The unique identifier for a particular REST filter configuration.</p>                                                                                                                                                                  | Null          |
| `CAMUNDA_API_REST_FILTERS_0_JARPATH`   | <p>The file path to a JAR file that contains a custom REST filter implementation.</p>                                                                                                                                                     | Null          |
| `CAMUNDA_API_REST_FILTERS_0_CLASSNAME` | <p>Set the fully qualified class name of a custom REST filter implementation that should be loaded and executed by the Camunda REST server.</p>                                                                                           | Null          |

### `CAMUNDA_API_REST_PROCESSCACHE`

| Property                                       | Description                                                                                  | Default value |
| :--------------------------------------------- | :------------------------------------------------------------------------------------------- | :------------ |
| `CAMUNDA_API_REST_PROCESSCACHE_MAXSIZE`        | <p>Set the maximum number of entries that can be stored in the REST API's process cache.</p> | `100`         |
| `CAMUNDA_API_REST_PROCESSCACHE_EXPIRATIONIDLE` | <p>Set the idle expiration time for entries in the REST API's process cache.</p>             | `null`        |

### `CAMUNDA_API_REST_EXECUTOR`

| Property                                           | Description                                                                                                                                                                                                                                                                                                                                                                                                 | Default value |
| :------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `CAMUNDA_API_REST_EXECUTOR_COREPOOLSIZEMULTIPLIER` | <p>Multiplier applied to the number of available processors to compute the executor's core pool size (minimum number of threads kept alive).</p><p>Effective value: `corePoolSize` = `availableProcessors` \* `corePoolSizeMultiplier`.</p><p>Use a higher value if you have steady, continuous traffic and want to minimize cold-start latency. Keep it low to allow the pool to scale down when idle.</p> | `1`           |
| `CAMUNDA_API_REST_EXECUTOR_MAXPOOLSIZEMULTIPLIER`  | <p>Multiplier applied to the number of available processors to compute the executor's maximum pool size (hard cap on threads).</p><p>Effective value: `maxPoolSize` = `availableProcessors` \* `maxPoolSizeMultiplier`.</p><p>Must be >= `corePoolSizeMultiplier`.</p><p>Increase cautiously, as high values can cause oversubscription for CPU-bound workloads.</p>                                        | `2`           |
| `CAMUNDA_API_REST_EXECUTOR_KEEPALIVE`              | <p>Time in seconds that threads above the core size may remain idle before being terminated.</p><p>Lower values reclaim resources faster after bursts. Higher values reduce thread creation/destruction churn if bursts are frequent.</p>                                                                                                                                                                   | `60s`         |
| `CAMUNDA_API_REST_EXECUTOR_QUEUECAPACITY`          | <p>Capacity of the executor's task queue. A small bounded queue (for example, `64`) is recommended to handle short bursts while still allowing the pool to grow.</p>                                                                                                                                                                                                                                        | `64`          |

  </TabItem>
</Tabs>
