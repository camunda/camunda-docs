import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Process instance creation

<Tabs>
  <TabItem value="application.yaml" label="Application properties">

### `camunda.process-instance-creation`

| Property                                                           | Description                                                                                                                                                                                                                                                                                                                                                              | Default value |
| :----------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `camunda.process-instance-creation.business-id-uniqueness-enabled` | <p>When enabled, process instance creation is rejected if a root process instance of the same process definition is already active with the same business ID.</p><p>Requires the process instance creation request to include a <code>businessId</code>. See [business ID uniqueness control](/components/concepts/process-instance-creation.md#uniqueness-control).</p> | `false`       |

</TabItem>
  <TabItem value="env" label="Environment variables">

### `CAMUNDA_PROCESSINSTANCECREATION`

| Property                                                      | Description                                                                                                                                                                                                                                                                                                                                                              | Default value |
| :------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `CAMUNDA_PROCESSINSTANCECREATION_BUSINESSIDUNIQUENESSENABLED` | <p>When enabled, process instance creation is rejected if a root process instance of the same process definition is already active with the same business ID.</p><p>Requires the process instance creation request to include a <code>businessId</code>. See [business ID uniqueness control](/components/concepts/process-instance-creation.md#uniqueness-control).</p> | `false`       |

  </TabItem>
</Tabs>
