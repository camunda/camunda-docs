import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Monitoring

<Tabs>
  <TabItem value="application.yaml" label="Application properties">

### `camunda.monitoring`

| Property                                                       | Description                                                                                  | Default value |
| :------------------------------------------------------------- | :------------------------------------------------------------------------------------------- | :------------ |
| `camunda.monitoring.metrics.actor`                             | Controls whether to collect metrics about actor usage such as actor job execution latencies. | `true`        |
| `camunda.monitoring.metrics.enable-exporter-execution-metrics` | Enable exporter execution metrics.                                                           | `false`       |
| `camunda.monitoring.jfr`                                       | Allows registering and tracking metrics based on JFR events.                                 | `true`        |

</TabItem>
  <TabItem value="env" label="Environment variables">

### `CAMUNDA_MONITORING`

| Property                                                    | Description                                                                                  | Default value |
| :---------------------------------------------------------- | :------------------------------------------------------------------------------------------- | :------------ |
| `CAMUNDA_MONITORING_METRICS_ACTOR`                          | Controls whether to collect metrics about actor usage such as actor job execution latencies. | `true`        |
| `CAMUNDA_MONITORING_METRICS_ENABLEEXPORTEREXECUTIONMETRICS` | Enable exporter execution metrics.                                                           | `false`       |
| `CAMUNDA_MONITORING_JFR`                                    | Allows registering and tracking metrics based on JFR events.                                 | `true`        |

  </TabItem>
</Tabs>
