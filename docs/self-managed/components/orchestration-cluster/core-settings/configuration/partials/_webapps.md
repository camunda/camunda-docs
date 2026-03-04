import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Webapps

<Tabs>
  <TabItem value="application.aml" label="Application properties">

## `camunda.webapps`

### `camunda.webapps.operate`

| Property                          | Description                                                                                                                                                                                                                                                                                                                                                                                                  | Default value |
| :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `camunda.webapps.operate.enabled` | <p>Decides whether Operate is enabled or not, when the Orchestration Cluster is launched with `camunda.mode`. This also affects the Operate API v1.</p> | `true` |
| `camunda.webapps.operate.ui-enabled` | <p>Decides whether the Operate UI is enabled or not. If false, the Operate API v1 will still be available, but Operate will not be accessible with a web browser.</p> | `true` |

### `camunda.webapps.tasklist`

| Property                          | Description                                                                                                                                                                                                                                                                                                                                                                                                  | Default value |
| :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `camunda.webapps.tasklist.enabled` | <p>Decides whether Tasklist is enabled or not, when the Orchestration Cluster is launched with `camunda.mode`. This also affects the Tasklist API v1.</p> | `true` |
| `camunda.webapps.tasklist.ui-enabled` | <p>Decides whether the Tasklist UI is enabled or not. If false, the Tasklist API v1 will still be available, but Tasklist will not be accessible with a web browser.</p> | `true` |

### `camunda.webapps.identity`

| Property                          | Description                                                                                                                                                                                                                                                                                                                                                                                                  | Default value |
| :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `camunda.webapps.identity.enabled` | <p>Decides whether Identity is enabled or not, when the Orchestration Cluster is launched with `camunda.mode`. This also affects the Identity API v1.</p> | `true` |
| `camunda.webapps.identity.ui-enabled` | <p>Decides whether the Identity UI is enabled or not. If false, the Identity API v1 will still be available, but Identity will not be accessible with a web browser.</p> | `true` |

  </TabItem>
</Tab>
