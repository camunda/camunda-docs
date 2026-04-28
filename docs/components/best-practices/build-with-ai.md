---
id: build-with-ai
title: "Build with AI"
sidebar_label: Build with AI
description: "Set up an AI-ready development workflow for Camunda with MCP, docs context, and practical troubleshooting guidance."
keywords: [ai, mcp, claude, copilot, cursor, agentic]
---

Use this guide to set up a practical AI-assisted development workflow for Camunda-based solutions.

## Set up your AI development environment

The [Build with Camunda](/build-with-camunda/) page is the starting point for AI development with Camunda. From there, you can explore quickstarts, download the CLI, and connect AI tooling to a running cluster.

Once you have a cluster running, connect your AI tools:

- Set up Camunda locally with [Camunda 8 Run and `c8ctl`](/guides/getting-started-example.md), or [run your solution in Camunda 8 SaaS](/components/saas/saas.md).
- If you are building agentic use cases, complete [Build your first AI agent](/guides/getting-started-agentic-orchestration.md).
- Use an MCP-capable AI tool, such as VS Code with Copilot, Claude Code, or Cursor.
- Store configuration in source-controlled tool config files where possible, and keep secrets in environment variables or your platform's secret manager.

## Orchestrate AI agents

With Camunda [agentic orchestration](/components/agentic-orchestration/agentic-orchestration-overview.md), you can embed AI agents directly inside your BPMN-based workflows. Agentic orchestration lets human tasks, deterministic rule sets, and AI-driven decisions collaborate in a robust, end-to-end process.

In the agentic orchestration section you'll find:

- **Fundamentals** — what an AI agent is, how to design processes around it, and how the AI Agent connector works with ad-hoc sub-processes.
- **Monitoring and testing** — observe agent decisions in real time with Operate, analyze performance with Optimize, and validate behavior with Camunda Process Test.
- **Model recommendations** — guidelines for choosing an LLM provider and model for your use case.

Start with [Build your first AI agent](/guides/getting-started-agentic-orchestration.md) to see the end-to-end pattern in action.

## Design processes with Camunda Copilot

Camunda Copilot is an AI assistant built into Web Modeler that helps you design and iterate on processes faster.

With Copilot you can:

- **Generate and modify BPMN processes** from natural-language descriptions — create a new process, add error handling, or restructure an existing workflow using plain text prompts.
- **Write and debug FEEL expressions** — describe what the expression should calculate, translate code from Java or JavaScript, or fix a broken expression.
- **Build Camunda Forms** — describe the data you need to collect and Copilot creates the form structure and binds it to a user task.
- **Convert legacy artifacts** — paste BPEL, Java, or Python code and let Copilot transform it into BPMN.
- **Search documentation** — Copilot can query the Camunda knowledge base to give context-aware guidance directly inside Web Modeler (SaaS only).

Copilot is available in Web Modeler for SaaS clusters. Self-Managed deployments can configure their own LLM provider.

## Integrate via MCP

Use the [Orchestration Cluster MCP Server](/apis-tools/orchestration-cluster-api-mcp/orchestration-cluster-api-mcp-overview.md) to let your AI assistant interact with Camunda runtime and management capabilities.

Use the [Docs MCP server](/reference/mcp-docs/mcp-docs.md) so your AI assistant can retrieve up-to-date Camunda documentation while generating code or guidance.

Using both MCP servers gives your AI tool runtime context and documentation context in the same workflow.

## Best practices for integrating AI

See [Integrate AI into your processes](./integrate-ai-into-your-processes.md) for guidance on how to apply AI patterns effectively inside Camunda: when to use the AI Agent connector instead of a hand-rolled LLM loop, how to compose multi-step tools inside ad-hoc sub-processes, and how to structure prompts for predictable results.
