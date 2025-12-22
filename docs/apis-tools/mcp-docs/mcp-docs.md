---
id: docs-mcp
title: Camunda Docs MCP server
description: "Connect to Camunda documentation directly from your IDE or AI tool using the Camunda Docs MCP Server"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import McpServerImg from './img/camunda-docs-mcpserver.png';

Use the Camunda Docs MCP server to access and query Camunda 8 documentation directly from your IDE or AI tool.

:::info Intended usage and limits
The Camunda Docs MCP server is not designed for use in production environments, high-volume automation, or as part of a CI/CD pipeline. It is provided to help support Camunda developer queries and coding assistance, evaluation, and testing. See [authentication and usage limits](#authentication-and-usage-limits).
:::

## About

The Camunda Docs [Model Context Protocol (MCP) server](https://modelcontextprotocol.io/docs/getting-started/intro) allows your AI agent to access and use the latest official Camunda 8 documentation, without leaving the editor.

For example, if you use an AI coding tool such as Cursor or Copilot, using the MCP server helps ensure more accurate AI responses and code generation via up-to-date Camunda documentation and context.

<img src={McpServerImg} alt="Ask context-aware questions about Camunda within VS Code." title="Ask context-aware questions about Camunda within VS Code." class="img-800" style={{marginTop: '0'}}/>

The MCP server is available at the following URL:

```
https://camunda-docs.mcp.kapa.ai
```

## Install

The steps required to add the MCP server varies depending on the AI assistant you want to use. For example:

<Tabs groupId="ai-assistant" defaultValue="vscode" values={[
{label: 'VS Code Copilot', value: 'vscode'},
{label: 'Cursor', value: 'cursor'},
{label: 'ChatGPT Desktop', value: 'chatgpt'},
{label: 'Other MCP clients', value: 'other'}
]}>

<TabItem value="vscode">

**Prerequisites:** VS Code 1.102+ with GitHub Copilot enabled.

Create an `mcp.json` file in your workspace `.vscode` folder:

```json title=".vscode/mcp.json"
{
  "servers": {
    "camunda docs": {
      "type": "http",
      "url": "https://camunda-docs.mcp.kapa.ai"
    }
  }
}
```

:::info
For more information, refer to the [MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers) documentation.
:::

</TabItem>

<TabItem value="cursor">

Add the following to your `.cursor/mcp.json` file:

```json
{
  "mcpServers": {
    "camunda docs": {
      "type": "http",
      "url": "https://camunda-docs.mcp.kapa.ai"
    }
  }
}
```

:::info
For more information, refer to the [Cursor MCP](https://cursor.com/docs/context/mcp) documentation.
:::

</TabItem>

<TabItem value="chatgpt">

ChatGPT Desktop supports MCP servers in developer mode:

1. Open ChatGPT Desktop.
1. Navigate to **Settings > Features**.
1. Enable **Developer mode**.
1. Navigate to **Settings > MCP Servers**.
1. Click **Add Server** and enter:
   - **Name**: camunda docs
   - **URL**: https://camunda-docs.mcp.kapa.ai

:::info
For more information, refer to the [ChatGPT Desktop MCP](https://platform.openai.com/docs/guides/developer-mode) documentation.
:::

</TabItem>

<TabItem value="other">

Use the server URL `https://camunda-docs.mcp.kapa.ai` and refer to your client's documentation for installation instructions.

Most clients accept the standard MCP protocol JSON configuration format:

```json
{
  "mcpServers": {
    "camunda docs": {
      "url": "https://camunda-docs.mcp.kapa.ai"
    }
  }
}
```

</TabItem>

</Tabs>

### Authentication and usage limits

When connecting to the MCP server for the first time, you must authenticate via Google sign-in.

This anonymous Google ID is only used to enforce per-user rate limits and prevent abuse of the Camunda Docs MCP server:

- 40 requests per user per hour.
- 200 requests per user per day.

## Use the Camunda Docs MCP server

Once connected to the MCP server within your editor, you can ask context-aware questions about Camunda. For example:

- "What is BPMN?"
- "How do I build an AI agent?"
- "What properties are changed for Camunda 8.8?"

### Example: VS Code Copilot

1. In VS Code, open Copilot Chat.
1. Select **Agent** mode from the **Set Agent** drop-down menu.
1. Click **Configure Tools** to check the `search_camunda_knowledge_sources` tool is available and selected.
1. Ask context-aware questions about Camunda.

### Tools

The Camunda Docs MCP server exposes a single semantic search tool:

`search_camunda_knowledge_sources`

This tool allows AI tools/agents to perform semantic retrieval over the Camunda 8 documentation and other knowledge sources, such as forum posts, repos, podcasts, and product blogs.

:::info
The Camunda Docs MCP server is powered by the [Kapa.ai](https://www.kapa.ai) AI assistant.
:::
