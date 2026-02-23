import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## API - MCP

<Tabs>
  <TabItem value="application.yaml" label="Application properties">

### `camunda.mcp`

| Property              | Description                                                                                                                                                                                                                | Default value |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `camunda.mcp.enabled` | <p>Enable the MCP server. When enabled, the Orchestration Cluster exposes a [Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports#streamable-http) MCP server at `/mcp/cluster`.</p> | `false`       |

  </TabItem>
  <TabItem value="env" label="Environment variables">

### `CAMUNDA_MCP`

| Property              | Description                                                                                                                                                                                                                | Default value |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `CAMUNDA_MCP_ENABLED` | <p>Enable the MCP server. When enabled, the Orchestration Cluster exposes a [Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports#streamable-http) MCP server at `/mcp/cluster`.</p> | `false`       |

  </TabItem>
  <TabItem value="helm" label="Helm values">

### `orchestration.mcp`

| Helm value                  | Description                                                                                                                                                                                                                | Default value |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `orchestration.mcp.enabled` | <p>Enable the MCP server. When enabled, the Orchestration Cluster exposes a [Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports#streamable-http) MCP server at `/mcp/cluster`.</p> | `false`       |

  </TabItem>
</Tabs>
