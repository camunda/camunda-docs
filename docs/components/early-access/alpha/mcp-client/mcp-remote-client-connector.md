---
id: mcp-remote-client-connector
title: MCP Remote Client connector
sidebar_label: MCP Remote Client connector
---

The MCP Remote Client connector allows connecting an AI agent to a remote MCP server by configuring a connection to a
[Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports#streamable-http) (recommended) or [HTTP with SSE](https://modelcontextprotocol.io/specification/2024-11-05/basic/transports#http-with-sse) (legacy) endpoint.

## Limitations

Since the MCP client functionality is handled by a stateless [job worker](../../../concepts/job-workers.md), each activation of an activity using the MCP Remote Client connector requires opening a dedicated HTTP connection/SSE subscription to the MCP server.

For example, each of the following actions in an agentic AI feedback loop opens and closes a dedicated MCP client connection to the remote server:

1. Tool discovery
2. Tool call
3. Every subsequent tool call

Due to this overhead, the MCP Remote Client connector is primarily intended for prototyping and testing purposes. For production or more efficient usage, consider using the [MCP Client](./mcp-client-connector.md) connector instead.

## Modeling

1. Configure an AI agent ad-hoc sub-process as described in the [example integration](../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess-example.md). Do not configure any tools within the ad-hoc sub-process yet.
2. In a Self-Managed environment, install the [MCP Remote Client element template](https://raw.githubusercontent.com/camunda/connectors/refs/heads/main/connectors/agentic-ai/element-templates/agenticai-mcp-remote-client-outbound-connector.json).
3. Create a service task within the ad-hoc sub-process and apply the **MCP Remote Client** element template.
4. Configure the transport type and connection settings as described in [Transport type](#transport-type).
5. Execute your process. You should see tool discovery calls routed to the MCP Client service task, and tool definitions provided by the MCP server listed in the agent context variable. As a result, the agent should be able to call the tools provided by the MCP server.

## Transport type

Select the transport protocol for connecting to the remote MCP server.

### Streamable HTTP

Use for MCP servers exposing a Streamable HTTP endpoint. This is the recommended transport for new implementations.

| Field   | Required | Description                                                                  |
| :------ | :------- | :--------------------------------------------------------------------------- |
| URL     | Yes      | The Streamable HTTP endpoint URL. Typically ends in `/mcp`.                  |
| Headers | No       | Custom HTTP headers as a FEEL map (e.g., `={ "X-Custom-Header": "value" }`). |
| Timeout | No       | Connection timeout in seconds.                                               |

### SSE (Server-Sent Events)

Use for MCP servers exposing an SSE endpoint. This transport is considered legacy; use Streamable HTTP for new implementations where possible.

| Field   | Required | Description                                                                  |
| :------ | :------- | :--------------------------------------------------------------------------- |
| URL     | Yes      | The SSE endpoint URL. Typically ends in `/sse`.                              |
| Headers | No       | Custom HTTP headers as a FEEL map (e.g., `={ "X-Custom-Header": "value" }`). |
| Timeout | No       | Connection timeout in seconds.                                               |

## Authentication

The MCP Remote Client connector supports multiple authentication methods for connecting to secured MCP servers. Authentication is configured per transport type.

### None

Select **None** in the **Authentication** dropdown. No authentication headers are added to requests. You can still configure custom headers for API keys or other header-based authentication mechanisms.

### Basic

Sends an `Authorization: Basic <base64(username:password)>` header with each request.

| Field    | Required | Description                                                                                                                                                |
| :------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Username | Yes      | The username for authentication.                                                                                                                           |
| Password | Yes      | The password for authentication. We recommend using [secrets](/components/console/manage-clusters/manage-secrets.md). Example: `{{secrets.MCP_PASSWORD}}`. |

### Bearer token

Sends an `Authorization: Bearer <token>` header with each request.

| Field        | Required | Description                                                                                                                                           |
| :----------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bearer token | Yes      | The bearer token value. We recommend using [secrets](/components/console/manage-clusters/manage-secrets.md). Example: `{{secrets.MCP_BEARER_TOKEN}}`. |

### OAuth 2.0 client credentials

Automatically retrieves and manages access tokens using the OAuth 2.0 client credentials flow (machine-to-machine authentication). Tokens are cached in memory and automatically refreshed when expired.

| Field                 | Required | Description                                                                                                    |
| :-------------------- | :------- | :------------------------------------------------------------------------------------------------------------- |
| OAuth token endpoint  | Yes      | The URL to obtain access tokens.                                                                               |
| Client ID             | Yes      | Your OAuth client identifier.                                                                                  |
| Client secret         | Yes      | Your OAuth client secret. We recommend using [secrets](/components/console/manage-clusters/manage-secrets.md). |
| Audience              | No       | Target API identifier (required by some OAuth providers).                                                      |
| Scopes                | No       | Space-separated list of scopes to request.                                                                     |
| Client authentication | Yes      | How to send credentials: **Send credentials in header** (Basic auth) or **Send credentials in body**.          |

For more details on OAuth 2.0 client credentials flow, refer to the [REST connector OAuth documentation](/components/connectors/protocol/rest.md#rest-connector-oauth-token).

## Client caching

To reduce the connection overhead described in [Limitations](#limitations), the MCP Remote Client connector can cache MCP clients and reuse connections for calls to the same MCP server.

### Per-client caching options

Enable the **Client cache** checkbox in the connector properties to reuse the MCP client connection for as long as configured on the runtime.

:::warning
Only enable client caching when authentication credentials do not depend on process-specific data. Cached clients reuse the authentication context from the first connection, which may conflict with process-specific credentials in subsequent calls.
:::

### Runtime cache configuration

In a **Camunda 8 Self-Managed** setup or a [custom connector runtime](../../../connectors/custom-built-connectors/connector-sdk.md#runtime-environments), the overall client caching behavior can be configured with the following properties:

:::note
Configuration properties can be defined as environment variables using [Spring Boot conventions](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.relaxed-binding.environment-variables). To define an environment variable, convert the configuration property to uppercase, remove any dashes `-`, and replace any delimiters `.` with underscores `_`.

For example, the property `camunda.connector.agenticai.mcp.remote-client.client.cache.expire-after` is represented by the environment variable `CAMUNDA_CONNECTOR_AGENTICAI_MCP_REMOTECLIENT_CLIENT_CACHE_EXPIREAFTER`.
:::

```properties
camunda.connector.agenticai.mcp.remote-client.client.cache.enabled=true
camunda.connector.agenticai.mcp.remote-client.client.cache.expire-after=PT10M
camunda.connector.agenticai.mcp.remote-client.client.cache.maximum-size=15
```
