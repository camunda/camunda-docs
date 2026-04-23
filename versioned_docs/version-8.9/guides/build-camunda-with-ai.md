---
id: build-camunda-with-ai
title: "Build Camunda solutions with AI"
sidebar_label: Build Camunda with AI
description: "Set up an AI-ready development workflow for Camunda with MCP, docs context, and practical troubleshooting guidance."
keywords: [ai, mcp, claude, copilot, cursor]
---

Use this guide to set up a practical AI-assisted development workflow for Camunda-based solutions.

This is the first iteration. It focuses on the currently available tooling and patterns. As the AI Dev Kit becomes available, this guide will expand.

## Set up your AI development environment

Start with a working Camunda environment, then connect your AI tools:

- Set up Camunda locally with [Camunda 8 Run and `c8ctl`](./getting-started-example.md), or use [Camunda 8 SaaS](/components/saas/saas.md).
- If you are building agentic use cases, complete [Build your first AI agent](./getting-started-agentic-orchestration.md).
- Use an MCP-capable AI tool, such as VS Code with Copilot, Claude Code, or Cursor.
- Store configuration in source-controlled tool config files where possible, and keep secrets in environment variables or your platform's secret manager.

## Integrate the Orchestration Cluster MCP Server

Use the Orchestration Cluster MCP Server to let your AI assistant interact with Camunda runtime and management capabilities.

1. Review [Orchestration Cluster MCP Server overview](/apis-tools/orchestration-cluster-api-mcp/orchestration-cluster-api-mcp-overview.md).
1. Enable and connect using [Enable and connect](/apis-tools/orchestration-cluster-api-mcp/orchestration-cluster-api-mcp-setup.md).
1. For authenticated environments, use [`c8ctl mcp-proxy`](/apis-tools/orchestration-cluster-api-mcp/orchestration-cluster-api-mcp-setup.md#use-c8ctl-mcp-proxy).
1. Validate your setup by listing tools in your AI client, then run a safe read-only query before using write operations.

## Integrate the Camunda Docs MCP server

Use the Docs MCP server so your AI assistant can retrieve up-to-date Camunda documentation while generating code or guidance.

1. Follow [Camunda Docs MCP server](/reference/mcp-docs/mcp-docs.md) installation steps for your AI tool.
1. Add the server URL `https://camunda-docs.mcp.kapa.ai` to your MCP configuration.
1. Test with a focused documentation prompt to confirm the connection works.

Using both MCP servers gives your AI tool runtime context and documentation context in the same workflow.

## Use Claude Skills (AI Dev Kit)

The AI Dev Kit, including Claude Skills guidance, is upcoming and not yet released.

For now, use this guide together with:

- [Build your first AI agent](./getting-started-agentic-orchestration.md)
- [Orchestration Cluster MCP Server](/apis-tools/orchestration-cluster-api-mcp/orchestration-cluster-api-mcp-overview.md)
- [Camunda Docs MCP server](/reference/mcp-docs/mcp-docs.md)

This section will be updated with concrete setup and usage steps when the AI Dev Kit is available.

## Example repository

Use the [camunda-8-get-started repository](https://github.com/camunda/camunda-8-get-started) as a baseline for local development workflows, deployment flows, and worker implementation patterns.

Pair it with MCP-enabled AI tooling so your assistant can:

- Generate and refine BPMN, DMN, and form artifacts.
- Suggest worker implementation patterns.
- Help debug incidents with runtime context.

## FAQs and troubleshooting

### My AI client does not show Camunda tools

Check that:

- You configured the correct MCP endpoint URL.
- Your client supports the transport required by the target server.
- For authenticated clusters, you use `c8ctl mcp-proxy` and valid API client credentials.

### Authentication fails when connecting to the Orchestration Cluster MCP Server

Verify your OAuth token endpoint, client ID, client secret, and audience values. Then verify the API client has the required scope for the Orchestration Cluster API.

### Answers are generic or outdated

Confirm the Docs MCP server is configured and active, then ask the AI tool to cite relevant Camunda docs pages in its response.

### Generated examples do not match my environment

Include your runtime context in prompts, such as SaaS versus Self-Managed, Camunda version, SDK language, and deployment model.

## Next steps

- Start with [Build your first AI agent](./getting-started-agentic-orchestration.md).
- Connect runtime context via [Orchestration Cluster MCP Server](/apis-tools/orchestration-cluster-api-mcp/orchestration-cluster-api-mcp-overview.md).
- Connect documentation context via [Camunda Docs MCP server](/reference/mcp-docs/mcp-docs.md).
