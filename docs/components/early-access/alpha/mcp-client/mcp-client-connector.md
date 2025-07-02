---
id: mcp-client-connector
title: MCP Client connector
sidebar_label: MCP Client connector
---

:::note
This connector is not directly available on Camunda 8 SaaS. Instead, you can connect a custom connector runtime
configured to run the MCP Client connector to your Camunda 8 SaaS instance.
:::

The MCP Client connector allows you to configure MCP clients to be started as part of the connector runtime. As the
runtime takes care of managing the MCP client connections (opposed to the Job Worker in the MCP Remote Client
connector), this approach allows using both STDIO and remote MCP servers without the overhead of opening and closing
connections for every MCP client interaction.

## Runtime Configuration

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

## Usage

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
