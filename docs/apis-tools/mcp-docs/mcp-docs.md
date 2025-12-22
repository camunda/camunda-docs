---
id: docs-mcp
title: Camunda Docs MCP
sidebar_label: "Camunda Docs MCP"
description: "Connect to Camunda documentation directly from your IDE or AI tool using the Camunda Docs MCP Server"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import McpServerImg from './img/camunda-docs-mcpserver.png';

Connect to Camunda 8 documentation directly from your IDE or AI tool.

## About

The Camunda 8 Docs [Model Context Protocol (MCP) server](https://modelcontextprotocol.io/docs/getting-started/intro) allows your AI agent to access and use the latest official Camunda 8 documentation, without leaving the editor.

For example, if you use an AI coding tool such as Cursor or Copilot, using the MCP server helps ensure more accurate AI responses and code generation via up-to-date Camunda documentation and context.

<img src={McpServerImg} alt="Ask context-aware questions about Camunda within VS Code." title="Ask context-aware questions about Camunda within VS Code." class="img-800" style={{marginTop: '0', marginBottom: '0'}}/>

### MCP Server URL

The MCP server is available at the following URL:

```
https://camunda-docs.mcp.kapa.ai
```

## Install

The steps required to add the MCP server varies depending on the AI assistant you want to use. For example:

<Tabs groupId="ai-assistant" defaultValue="vscode" values={[
{label: 'Copilot (in VS Code)', value: 'vscode'},
{label: 'Cursor', value: 'cursor'},
{label: 'Other MCP clients', value: 'other'}
]}>

<TabItem value="vscode">

**Prerequisites:** VS Code 1.102+ with GitHub Copilot enabled.

Create an `mcp.json` file in your workspace `.vscode` folder:

```json title=".vscode/mcp.json"
{
  "servers": {
    "camunda": {
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
    "camunda": {
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

<TabItem value="other">

Use the server URL `https://camunda-docs.mcp.kapa.ai` and refer to your client's documentation for installation instructions.

Most clients accept the standard MCP protocol JSON configuration format:

```json
{
  "mcpServers": {
    "camunda": {
      "url": "https://camunda-docs.mcp.kapa.ai"
    }
  }
}
```

</TabItem>

</Tabs>

### Authentication and usage

When connecting to the MCP server for the first time, you must authenticate via Google sign-in.

This anonymous Google ID is only used to enforce per-user rate limits and prevent abuse of the Camunda Docs MCP server:

- 40 requests per user per hour.
- 200 requests per user per day.

## Use the Camunda Docs MCP server

Once connected to the MCP server within your editor, you can ask context-aware questions about Camunda. For example:

- "What is BPMN?"
- "How do I build an AI agent?"
- "What properties are changed for Camunda 8.8?"
