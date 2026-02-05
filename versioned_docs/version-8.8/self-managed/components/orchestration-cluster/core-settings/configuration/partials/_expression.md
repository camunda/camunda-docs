import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Expression

See [Expressions](/components/concepts/expressions.md).

<Tabs>
  <TabItem value="application.yaml" label="Application properties">

### `camunda.expression`

| Property                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Default value |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `camunda.expression.timeout` | <p>The timeout for expression evaluation. If an expression takes longer to evaluate than this timeout, the evaluation will be interrupted. An incident is raised if the expression is evaluated for a process instance.</p><p>Setting a lower value avoids the expression evaluation blocking the execution of other process instances on the same partition for too long. We recommend keeping this below 5 seconds to avoid unhealthy partitions due to 'actor appears blocked'.</p> | `5s`          |

</TabItem>
  <TabItem value="env" label="Environment variables">

### `CAMUNDA_EXPRESSION`

| Property                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Default value |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `CAMUNDA_EXPRESSION_TIMEOUT` | <p>The timeout for expression evaluation. If an expression takes longer to evaluate than this timeout, the evaluation will be interrupted. An incident is raised if the expression is evaluated for a process instance.</p><p>Setting a lower value avoids the expression evaluation blocking the execution of other process instances on the same partition for too long. We recommend keeping this below 5 seconds to avoid unhealthy partitions due to 'actor appears blocked'.</p> | `5s`          |

  </TabItem>
</Tabs>
