---
id: overview
title: Build with AI
sidebar_label: Build with AI
description: "Build Camunda solutions with AI-ready workflows, including agentic orchestration, Camunda Copilot, and MCP integrations."
keywords: [ai, mcp, claude, copilot, cursor, agentic]
---

import AoGrid from '../../components/react-components/\_ao-card';
import IconAgenticImg from '../../components/assets/icon-agentic.png';
import IconCopilotImg from '../../components/assets/icon-camunda-copilot.png';
import IconIdpImg from '../../components/assets/icon-idp.png';
import IconDocsImg from '../../components/assets/icon-docs.png';
import IconOrchClusterImg from '../../components/assets/icon-orchcluster.png';
import IconMcpImg from '../../components/assets/icon-mcp.png';

<h3 class="subheading">Build Camunda solutions with AI-ready workflows.</h3>

<div class="double-column-container" style={{marginBottom: '50px'}}>
<div class="double-column-left" style={{marginRight: '50px', flex: '1.35'}}>

Build Camunda solutions with AI-ready workflows, including agentic orchestration, Camunda Copilot, and MCP integrations. Connect your AI tools to a running Camunda cluster, embed AI agents inside BPMN processes, and use Camunda Copilot to design faster.

<a class="button button--outline button--secondary button--md button--hero--topic button--hero--topic-orange" title="Build with Camunda" href="/build-with-camunda" style={{marginBottom: '30px', marginTop: '20px'}}>Build with Camunda</a>

</div>
<div class="double-column-right" style={{flex: '1'}}>

<img src={IconAgenticImg} alt="Build with AI" title="Build with AI" class="img-noborder img-transparent hero-topic" style={{marginTop: '0', marginBottom: '0', maxWidth: '300px'}}/>

</div>
</div>

## Get started

See [Build with Camunda](/build-with-camunda) to set up your AI development environment. It's the starting point for AI development with Camunda. From there, you can explore quickstarts, download the CLI, and connect AI tooling to a running cluster.

Once you have a cluster running, connect your AI tools:

- Set up Camunda locally with Camunda 8 Run and `c8ctl`, or run your solution in Camunda 8 SaaS.
- If you are building agentic use cases, complete Build your first AI agent.
- Use an MCP-capable AI tool, such as VS Code with Copilot, Claude Code, or Cursor.
- Store configuration in source-controlled tool config files where possible, and keep secrets in environment variables or your platform's secret manager.

## Orchestrate AI agents

With Camunda agentic orchestration, you can embed AI agents directly inside your BPMN-based processes. Agentic orchestration lets human tasks, deterministic rule sets, and AI-driven decisions collaborate in a robust, end-to-end process.

In the agentic orchestration section you'll find:

- **Fundamentals** — what an AI agent is, how to design processes around it, and how the AI Agent connector works with ad-hoc sub-processes.
- **Monitoring and testing** — observe agent decisions in real time with Operate, analyze performance with Optimize, and validate behavior with Camunda Process Test.
- **Model recommendations** — guidelines for choosing an LLM provider and model for your use case.

Start with Build your first AI agent to see the end-to-end pattern in action.

## Design with AI

Use Camunda Copilot to design processes, forms, and decisions faster. Use Intelligent document processing (IDP) to extract structured data from documents inside your processes.

<AoGrid columns={2} ao={[
{
link: "../../components/early-access/alpha/bpmn-copilot/bpmn-copilot/",
title: "Camunda Copilot",
image: IconCopilotImg,
description: "Generate and modify BPMN processes, Camunda Forms, and FEEL expressions from natural-language prompts.",
},
{
link: "../../components/hub/workspace/modeler/idp/",
title: "Intelligent document processing (IDP)",
image: IconIdpImg,
description: "Extract structured data from documents and integrate it into your processes.",
},
]} />

## Integrate via MCP

Use MCP servers to give your AI assistant context — both runtime cluster state and Camunda documentation — in the same workflow.

<AoGrid columns={3} ao={[
{
link: "../../reference/mcp-docs/docs-mcp/",
title: "Docs MCP server",
image: IconDocsImg,
description: "Retrieve up-to-date Camunda documentation from your AI assistant.",
},
{
link: "../../apis-tools/orchestration-cluster-api-mcp/orchestration-cluster-api-mcp-overview/",
title: "Orchestration Cluster MCP server",
image: IconOrchClusterImg,
description: "Interact with Camunda runtime and management capabilities from your AI assistant.",
},
{
link: "../../apis-tools/processes-mcp/processes-mcp-overview/",
title: "Processes MCP server",
image: IconMcpImg,
description: "Expose your Camunda processes as MCP tools that AI agents can invoke.",
},
]} />

## Use AI responsibly

Before you ship AI-driven processes to production, review the [AI usage guidelines](./ai-usage-guidelines.md) for requirements on security, legality, data handling, human oversight, and prohibited use cases.
