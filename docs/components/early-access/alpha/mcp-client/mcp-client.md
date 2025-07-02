---
id: mcp-client
title: MCP Client
sidebar_label: MCP Client
description: "Integrate MCP (Model Context Protocol) clients with agentic orchestration."
---

Integrate [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) clients
with [agentic orchestration](../../../agentic-orchestration/agentic-orchestration.md).

Camunda's MCP client integration allows using
the [AI agent connector](../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent.md) in combination with MCP
clients to use tools provided by MCP servers, both for locally
started [STDIO](https://modelcontextprotocol.io/specification/draft/basic/transports#stdio) and for remote MCP servers
using the [HTTP with SSE](https://modelcontextprotocol.io/specification/2024-11-05/basic/transports#http-with-sse)
transport.

:::note
The MCP client integration currently only supports tool-related functionality — other MCP features such as resources or
prompts are not supported.
:::

## MCP tool discovery & calling

AI agents are able to detect and use tools provided by MCP clients configured via activities within an
ad-hoc sub-process by detecting so-called _gateway tool definitions_ which provide access to a list of tools instead of
being a single tool definition.

Tool discovery and tool calling is done through the ad-hoc sub-process rather than directly in the AI agent, enabling:

- The AI agent and individual MCP clients running on different deployments. For example, a custom MCP client acting on
  a local filesystem could be connected to a Camunda 8 SaaS instance.
- More advanced modeling use cases involving other BPMN elements. For example, user tasks can be used to combine MCP
  clients with an approval flow for individual tool calls (see [human-in-the-loop](#human-in-the-loop)).

TBD GRAPHIC

The following sequence diagram illustrates the process of tool discovery and tool calling with MCP clients. Each actor
in the diagram can potentially run in a different deployment, making it truly distributed.

```mermaid
sequenceDiagram
    autonumber
    actor User as User
    participant AAC as AI Agent Connector
    participant LLM as LLM
    participant MCPC as MCP Client Connector
    participant MCPS as MCP Server
    User ->>+ AAC: new request
%% MCP tool lookup
    AAC ->>+ MCPC: list tools
    deactivate AAC
    MCPC ->>+ MCPS: list tools
    note left of MCPC: no LLM interaction<br>(process flow only)
    MCPS -->>- MCPC: MCP tools
    MCPC -->>- AAC: MCP tools
%% LLM call with tool definitions
    activate AAC
    AAC ->>+ LLM: request including MCP tools
    LLM -->>- AAC: tool call requests
%% MCP tool call
    AAC ->>+ MCPC: call tool A
    deactivate AAC
    MCPC ->>+ MCPS: call tool A
    MCPS -->>- MCPC: tool A response
    MCPC -->>- AAC: tool A response
    activate AAC
%% LLM feedback based on tool call
    AAC ->>+ LLM: tool call response
    LLM -->>- AAC: AI response derived from tool call
    AAC -->>- User: final response
```

### Tool discovery

To mark an activity tool as gateway tool definition, the agent expects an
[extension property](../../../modeler/desktop-modeler/element-templates/defining-templates.md#zeebeproperty) of
`io.camunda.agenticai.gateway.type` being configured with a value of `mcpClient`. This is automatically done by the
provided [MCP connectors](#mcp-connectors), but allows you to create more advanced use cases such as tool calling
with [human in the loop](#human-in-the-loop) interaction when added to other activites such as an intermediate event.

When the AI agent connector
[resolves its available tools](../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent-example.md#tool-resolution),
it additionally resolves gateway tool definitions and - if needed by the gateway tool definition type - initiates a tool
discovery feedback loop through the ad-hoc sub-process.

How this tool discovery is implemented varies by gateway tool definition type, but for MCP clients (gateway type
`mcpClient`), it executes the
[`tools/list`](https://modelcontextprotocol.io/specification/2025-06-18/server/tools#listing-tools) method on every MCP
client connector configured in the ad-hoc sub-process. It is the responsibility of the MCP client implementation
to fetch tool definitions from its connected MCP server and to return them to the AI agent as result of this tool
discovery call.

#### Tool definitions

As the AI agent needs to provide unique tool names to the LLM while still needing to be able to map tool calls to
individual activities within the ad-hoc sub-process, it applies a naming convention to uniquely identify MCP tool
names:

```
MCP_<activityId>___<toolName>>
```

For example, the `get_current_time` tool provided by
a [time MCP server](https://github.com/modelcontextprotocol/servers/tree/main/src/time) would resolve to the
following tool definition when accessed through an MCP client activity with the ID `Time`.

```json
{
  "name": "MCP_Time___get_current_time",
  "description": "Get current time in a specific timezones",
  "inputSchema": {
    "properties": {
      "timezone": {
        "type": "string",
        "description": "IANA timezone name (e.g., 'America/New_York', 'Europe/London'). Use 'UTC' as local timezone if no timezone provided by the user."
      }
    },
    "required": ["timezone"],
    "type": "object"
  }
}
```

When handling LLM tool call requests, the MCP client integration of the AI agent connector transparently maps the unique
tool names back to the matching activity. Tool name and arguments are further passed to the MCP client connector for the
actual tool call.

## MCP connectors

:::note
Remote MCP client connectors do not support any features implementing authentication. This will be added in
a future release.
:::

Camunda provides two different MCP connectors with a different focus. The MCP connectors are not mutually exclusive, but
can be used in combination as long as the cluster/environment is configured accordingly.

| Connector                   | STDIO | Remote/HTTP | Configuration                        | Availability                                                                                                  | Description                                                                                                                                                                               |
| :-------------------------- | :---- | ----------- | :----------------------------------- | ------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MCP Remote Client connector | ❌    | ✅          | Properties panel                     | Available on SaaS                                                                                             | Suited for prototyping with remote MCP servers. HTTP connections are opened on demand when executing the activity instead of keeping a persistent connection as designed by the protocol. |
| MCP Client connector        | ✅    | ✅          | Connector runtime + properties panel | Not directly available on Saas, but a custom runtime executing the client connector can be connected to Saas. | Flexible MCP integration based on persistent connections managed by the connector runtime. Provides support for STDIO MCP servers.                                                        |

### Common configuration options

The provided connectors share a set of common options to configure tool access and availability.

#### Tools

Allows filtering the list of tools provided by the MCP server. If not configured, all tools provided by the MCP server
will be available to the AI agent.

| Field          | Required | Description                                             | Example                                |
| :------------- | :------- | :------------------------------------------------------ | :------------------------------------- |
| Included tools | No       | List of allowed tools provided by the MCP server.       | `["read_file", "read_multiple_files"]` |
| Excluded tools | No       | List of tools to exclude. Overrides any included tools. | `["write_file"]`                       |

For example, an MCP client connected to
a [filesystem MCP server](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) could be configured
with `["read_file", "read_multiple_files"]` as included tools to only allow readonly operations to the filesystem.
Alternatively, it could be configured with `["write_file"]` as a list of excluded tools to prevent write operations.

#### Operation

Configures the operation to execute on the MCP server. It should only be necessary to change the default value when
the ad-hoc sub-process multi-instance is configured to use an input element different from `toolCall`.

| Field      | Required | Description                                                                                                                                       |
| :--------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| Method     | Yes      | The [MCP method](https://modelcontextprotocol.io/specification/2025-06-18/server/tools#protocol-messages) to call. Defaults to `toolCall.method`. |
| Parameters | Yes      | The parameters to pass along with the MCP client execution. Defaults to `toolCall.params`.                                                        |

#### Output mapping

Specify the process variables that you want to map and export the tool calling response into.

| Field             | Required | Description                                                                                                                                                                                                                                                                                   |
| :---------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Result variable   | Yes      | Defaults to `toolCallResult`. Only change if the output mapping of the ad-hoc sub-process multi-instance is configured to use a different variable for the [content mapping](../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent-example.md#configure-multi-instance-execution). |
| Result expression | No       | In addition, you can choose to unpack the content of the response into multiple process variables using the **Result expression** field, as a [FEEL Context Expression](../../../concepts/expressions.md).                                                                                    |

### MCP Remote Client connector

:::note
Due to the overhead of managing HTTP connections described below, the MCP Remote Client connector is primarily intended
for prototyping and testing purposes. Consider using the MCP Client connector instead.
:::

The MCP Remote Client connector allows you to connect to a remote MCP client by configuring
an [HTTP with SSE](https://modelcontextprotocol.io/specification/2024-11-05/basic/transports#http-with-sse) (Server-Sent
Events) endpoint provided by an MCP server.

As the MCP client functionality is handled by a stateless [Job Worker](../../../concepts/job-workers.md), each
activation of an activity using the MCP Remote Client demands to open a dedicated HTTP connection/SSE subscription to
the MCP server.

For example, each action in a process would open/close a dedicarted MCP client connection to the remote
server:

1. tool discovery
2. tool call
3. every subsequent tool calls

#### Client/connection caching

To avoid the unnecessary overhead described above, the MCP Remote Client connector will keep MCP clients/HTTP connection
in a cache for a configured amount of time and re-use these connections for calls to the same MCP server. On a
[custom connector runtime](../../../connectors/custom-built-connectors/connector-sdk.md#runtime-environments), this
behavior can be configured with the following properties:

```properties
camunda.connector.agenticai.mcp.remote-client.client.cache.enabled=true
camunda.connector.agenticai.mcp.remote-client.client.cache.expire-after=PT10M
camunda.connector.agenticai.mcp.remote-client.client.cache.maximum-size=15
```

#### Usage

1. Configure an AI agent tools feedback loop as described in
   the [example integration](../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent-example.md). Do not
   configure any tools within the ad-hoc sub-process yet.
2. Install
   the [MCP Remote Client element template](https://raw.githubusercontent.com/camunda/connectors/refs/tags/8.8.0-alpha6/connectors/agentic-ai/element-templates/agenticai-mcp-remote-client-outbound-connector.json)
3. Create a service task within the ad-hoc sub-process and apply the **MCP Remote Client** element template you
   installed in step 2.
4. In the **HTTP Connection** section of the properties panel, configure the **SSE URL** to point to the HTTP with SSE
   endpoint of your MCP server (typically ending in `/sse`)
5. Execute your process. The tool definitions provided by the MCP server should be listed in the agent context variable,
   and requests to the agent should be able to call the tools provided by the MCP server.

### MCP Client Connector

:::note
This connector is not directly available on Camunda 8 SaaS. Instead, you can connect a custom connector runtime
configured to run the MCP Client connector to your Camunda 8 SaaS instance.
:::

The MCP Client connector allows you to configure MCP clients to be started as part of the connector runtime. As the
runtime takes care of managing the MCP client connections (opposed to the Job Worker in the MCP Remote Client
connector), this approach allows using both STDIO and remote MCP servers without the overhead of opening and closing
connections for every MCP client interaction.

#### Runtime Configuration

To use the MCP Client connector, it needs to be explicitely enabled on the connector runtime. Any clients that should
be available to the MCP Client connector need to be configured as part of the runtime configuration.

STDIO servers can use any programming language/execution runtime available to the machine running the connector runtime.
The example below starts MCP servers using both Node.js and Docker (and therefore requires a Node.js and Docker
environment being available).

```yaml
camunda:
  connector:
    agenticai:
      mcp:
        client:
          enabled: true # <-- disabled by default
          clients:
            # STDIO server started Node.js process
            filesystem: # <-- client ID, needed to reference the client in the MCP Client connector configuration
              stio:
                command:
                  - "npx"
                  - "-y"
                  - "@modelcontextprotocol/server-filesystem"
                  - "<path-to-files>"

            # STDIO server started as docker container
            time:
              stio:
                command:
                  - "docker"
                  - "run"
                  - "-i"
                  - "--rm"
                  - "mcp/time"

            # Connection to a remote HTTP/SSE MCP server
            some-remote-server:
              http:
                sse-url: https://example.com/mcp/sse
```

The YAML structure above describes the overall configuration structure of the MCP Client connector. How to configure this
for your specific use case varies on the connector runtime you are using. See TBD for a list of different examples.

#### Usage

1. Configure an AI agent tools feedback loop as described in
   the [example integration](../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent-example.md). Do not
   configure any tools within the ad-hoc sub-process yet.
2. Install
   the [MCP Client element template](https://github.com/camunda/connectors/blob/8.8.0-alpha6/connectors/agentic-ai/element-templates/agenticai-mcp-client-outbound-connector.json)
3. Create a service task within the ad-hoc sub-process and apply the **MCP Client** element template you
   installed in step 2.
4. In the **MCP Client** section of the properties panel, configure the **Client ID** to the value of the MCP Client you
   used in the runtime configuration (example: `filesystem`).
5. Execute your process. The tool definitions provided by the MCP server should be listed in the agent context variable,
   and requests to the agent should be able to call the tools provided by the MCP server.

## Human-in-the-loop

TBD

## Examples

A ready-to-go example using both connector types and a human-in-the-loop interaction is available in the
[connectors repository](https://github.com/camunda/connectors/tree/main/connectors/agentic-ai/examples/ai-agent-chat-mcp).
See
its [README](https://github.com/camunda/connectors/blob/main/connectors/agentic-ai/examples/ai-agent-chat-mcp/README.md)
for further details on the needed configuration.
