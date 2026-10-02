import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Licensing

Installations of Camunda 8 Self-Managed that require a license can provide their license key to the components. See [licensing](../licensing.md).

<Tabs>
  <TabItem value="application.yaml" label="Application properties">

### `camunda.license`

| Property              | Description                                                                 | Default value |
| :-------------------- | :-------------------------------------------------------------------------- | :------------ |
| `camunda.license.key` | <p>Your Camunda 8 license key, if your installation requires a license.</p> | Null          |

</TabItem>
  <TabItem value="env" label="Environment variables">

### `CAMUNDA_LICENSE`

| Property              | Description                                                                 | Default value |
| :-------------------- | :-------------------------------------------------------------------------- | :------------ |
| `CAMUNDA_LICENSE_KEY` | <p>Your Camunda 8 license key, if your installation requires a license.</p> | Null          |

  </TabItem>
</Tabs>
