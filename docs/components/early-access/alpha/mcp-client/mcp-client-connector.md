---
id: mcp-client-connector
title: MCP Client connector
sidebar_label: MCP Client connector
---

:::note
This connector is not directly available on Camunda 8 SaaS. Instead, you can connect a custom connector runtime configured to run the MCP Client connector to your Camunda 8 SaaS instance.
:::

The MCP Client connector integration allows configuring MCP clients to be started as part of the connector runtime. As the runtime manages MCP client connections (unlike the job worker in the [MCP Remote Client connector](./mcp-remote-client-connector.md#limitations)), this approach enables using both STDIO and remote MCP servers without the overhead of repeatedly opening and closing connections for each interaction.

## Runtime configuration

:::note
Configuration properties can be defined as environment variables using [Spring Boot conventions](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.relaxed-binding.environment-variables).

To define an environment variable, convert the configuration property to uppercase, remove any dashes `-`, and replace any delimiters `.` with underscores `_`.

For example, the property `camunda.connector.agenticai.mcp.remote-client.client.cache.expire-after` is represented by the environment variable `CAMUNDA_CONNECTOR_AGENTICAI_MCP_REMOTECLIENT_CLIENT_CACHE_EXPIREAFTER`.
:::

To use the MCP Client connector, it must be enabled in the connector runtime. Any clients that should be available to the connector must also be defined in the runtime configuration.

STDIO servers can use any programming language or execution runtime available on the machine running the connector runtime. The example below starts MCP servers using both Node.js and Docker, and therefore requires a Node.js and Docker environment to be available.

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
              enabled: false
              http:
                sse-url: https://example.com/mcp/sse
```

The YAML structure above describes the overall configuration structure of the MCP Client connector. How to configure
this for your specific use case varies on the connector runtime you are using.

### Camunda 8 Run

1. Download and extract the latest [Camunda 8 Run](../../../../self-managed/quickstart/developer-quickstart/c8run.md) release (at
   least version 8.8.0-alpha6).
2. Before starting Camunda 8 Run, create a config file (for example `mcp-clients.yml`) in the same directory as
   `connectors-application.properties` and add the MCP Client configuration as shown above. Adapt the configuration as
   needed.
3. Edit `connectors-application.properties` and add the following line to include your custom config file:
   ```properties
   spring.config.import=file:./mcp-client.yml
   ```
4. [Start Camunda 8 Run](../../../../self-managed/quickstart/developer-quickstart/c8run.md#install-and-start-camunda-8-run).
5. While starting up, you can follow `logs/connectors.log`. If configured correctly, you should see log messages for the
   initialization of the configured MCP clients and the registration of the MCP Client connector:
   ```log
   [...] Creating MCP client with ID 'filesystem'
   [...] Creating MCP client with ID 'time'
   [...] Starting job worker: JobWorkerValue{type='io.camunda.agenticai:mcpclient:xxx', name='MCP Client', ...}
   ```

### Custom project using the Spring Boot starter runtime

1. Create a new Spring Boot project.
2. Add the [Camunda Connector Spring Boot starter](../../../connectors/custom-built-connectors/connector-sdk.md#spring-boot-starter-runtime) and the Agentic AI dependencies to your `pom.xml`:

   ```xml
   <project>
       <!-- .... -->

       <properties>
           <version.connectors>8.8.0-alpha6</version.connectors>
       </properties>

       <dependencies>
           <!-- .... -->

           <dependency>
               <groupId>io.camunda.connector</groupId>
               <artifactId>spring-boot-starter-camunda-connectors</artifactId>
               <version>${version.connectors}</version>
           </dependency>
           <dependency>
               <groupId>io.camunda.connector</groupId>
               <artifactId>connector-agentic-ai</artifactId>
               <version>${version.connectors}</version>
           </dependency>

           <!-- .... -->
       </dependencies>

       <!-- .... -->
   </project>
   ```

3. Configure the SDK to connect to your cluster, according to [the Camunda SDK documentation](../../../../apis-tools/spring-zeebe-sdk/getting-started.md#configuring-the-camunda-8-connection).
4. In your application configuration file (e.g., `application.yml`), add the MCP client configuration as shown above.
5. If you only want to run the MCP Client connector (for example, because you're connecting the runtime to SaaS), disable the other Agentic AI connectors provided by the `connector-agentic-ai` dependency:

   ```yaml
   camunda:
     connector:
       agenticai:
         aiagent:
           enabled: false
         ad-hoc-tools-schema-resolver:
           enabled: false
         mcp:
           remote-client:
             enabled: false
   ```

## Modeling

1. Configure an AI agent tools feedback loop as described in the [example integration](../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent-example.md). Do not configure any tools within the ad-hoc sub-process yet.
2. Install the [MCP Client element template](https://github.com/camunda/connectors/blob/8.8.0-alpha6/connectors/agentic-ai/element-templates/agenticai-mcp-client-outbound-connector.json).
3. Create a service task within the ad-hoc sub-process and apply the **MCP Client** element template you installed in step 2.
4. In the **MCP Client** section of the properties panel, configure the **Client ID** to match the value of the MCP client you used in the runtime configuration (example: `filesystem`).
5. Execute your process. You should see tool discovery calls being routed to the MCP Client service task, and tool definitions provided by the MCP server listed in the agent context variable. As a result, the agent should be able to call the tools provided by the MCP server.
