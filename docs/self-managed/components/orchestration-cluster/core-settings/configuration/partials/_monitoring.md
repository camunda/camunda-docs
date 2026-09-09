import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Monitoring

<Tabs>
  <TabItem value="application.yaml" label="Application properties">

### `camunda.monitoring`

| Property                                                       | Description                                                                                  | Default value | Overridable per Physical Tenant |
| :------------------------------------------------------------- | :------------------------------------------------------------------------------------------- | :------------ | :------------------------------ |
| `camunda.monitoring.metrics.actor`                             | Controls whether to collect metrics about actor usage such as actor job execution latencies. | `true`        | Yes                             |
| `camunda.monitoring.metrics.enable-exporter-execution-metrics` | Enable exporter execution metrics.                                                           | `false`       | Yes                             |
| `camunda.monitoring.jfr`                                       | Allows registering and tracking metrics based on JFR events.                                 | `true`        | Yes                             |

</TabItem>
  <TabItem value="env" label="Environment variables">

### `CAMUNDA_MONITORING`

| Property                                                    | Description                                                                                  | Default value | Overridable per Physical Tenant |
| :---------------------------------------------------------- | :------------------------------------------------------------------------------------------- | :------------ | :------------------------------ |
| `CAMUNDA_MONITORING_METRICS_ACTOR`                          | Controls whether to collect metrics about actor usage such as actor job execution latencies. | `true`        | Yes                             |
| `CAMUNDA_MONITORING_METRICS_ENABLEEXPORTEREXECUTIONMETRICS` | Enable exporter execution metrics.                                                           | `false`       | Yes                             |
| `CAMUNDA_MONITORING_JFR`                                    | Allows registering and tracking metrics based on JFR events.                                 | `true`        | Yes                             |

  </TabItem>
</Tabs>
