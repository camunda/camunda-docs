---
id: overview
title: Agentic orchestration
sidebar_label: Agentic orchestration
description: "Build Camunda solutions with AI-ready workflows, including agentic orchestration, Camunda Copilot, and MCP integrations."
keywords: [ai, mcp, claude, copilot, cursor, agentic]
---

import AoGrid from '../../components/react-components/\_ao-card';
import IconAgenticImg from '../../components/assets/icon-agentic.png';
import IconConnectorsImg from '../../components/assets/icon-connectors.png';
import IconBpmnImg from '../../components/assets/icon-bpmn.png';
import IconLlmImg from '../../components/assets/icon-llm.png';
import IconPlay from '../../components/assets/icon-play.png';
import IconAIAgent from '../../components/assets/hero-build-with-ai.png';
import IconCopilotImg from '../../components/assets/icon-camunda-copilot.png';
import IconIdpImg from '../../components/assets/icon-idp.png';
import IconDocsImg from '../../components/assets/icon-docs.png';
import IconOrchClusterImg from '../../components/assets/icon-orchcluster.png';
import IconMcpImg from '../../components/assets/icon-mcp.png';
import AoGetStartedBanner from '../../components/react-components/\_ao-get-started-banner';

<h3 class="subheading">Orchestrate agents, people, and systems in one process.</h3>

<div class="double-column-container" style={{marginBottom: '50px'}}>
<div class="double-column-left" style={{marginRight: '50px', flex: '1.35'}}>

Build and coordinate AI agents, people, and systems across complete processes, combining deterministic execution with AI reasoning and human judgment where each works best.

<p class="link-button">[Get started with agentic orchestration](../../components/agentic-orchestration/agentic-orchestration-overview.md)</p>

</div>
<div class="double-column-right" style={{flex: '1'}}>

<img src={IconAIAgent} alt="Agentic orchestration" title="Build with AI" class="img-noborder img-600 img-transparent hero-topic" style={{marginTop: '0', marginBottom: '0'}}/>

</div>
</div>

## Get started

Get started with Camunda agentic orchestration. Learn how it combines deterministic process logic with AI-driven decisions, understand what AI agents are, and build your first agent.

<AoGrid columns={3} ao={[
{
link: "../../../components/agentic-orchestration/agentic-orchestration-overview/",
title: "What is agentic orchestration?",
image: IconBpmnImg,
description: "Understand how Camunda orchestrates AI agents, people, and systems in one process.",
},
{
link: "../../../components/agentic-orchestration/ai-agents/",
title: "What are AI agents?",
image: IconAgenticImg,
description: "Learn what AI agents are, the agent types Camunda supports, and how the agent loop works.",
},
{
link: "../../getting-started-agentic-orchestration/",
title: "Build your first AI agent",
image: IconPlay,
description: "Follow a hands-on guide to build and run your first AI agent in Camunda.",
},
]} />

## Build

Build AI agents and connect them to LLMs, tools, memory, and other agents.

<AoGrid columns={3} ao={[
{
link: "../../../components/agentic-orchestration/build-agents/",
title: "Build AI agents",
image: IconAgenticImg,
description: "Build AI agents in Camunda by modeling a Camunda AI agent or connecting an external agent.",
},
{
link: "../../../components/agentic-orchestration/camunda-provided-llm/",
title: "Camunda-provided LLM",
image: IconLlmImg,
description: "Run AI agents quickly in Camunda SaaS with Camunda-provided LLM.",
},
{
link: "../../../components/connectors/out-of-the-box-connectors/agentic-ai-aiagent/",
title: "AI Agent connector",
image: IconConnectorsImg,
description: "Embed LLM-powered agents in your processes with the AI Agent connector.",
},
]} />

## Evaluate

Monitor your AI agents in real time with Operate, improve performance over time with Optimize, and test them with Camunda Process Test.

<AoGrid columns={3} ao={[
{
link: "../../../components/agentic-orchestration/evaluate-agents/evaluate-ai-agents/",
title: "Evaluate AI agents",
image: IconAgenticImg,
description: "Test, monitor, and analyze your AI agents with Camunda Process Test, Operate, and Optimize.",
},
]} />

## Best practices

Follow guidelines and recommendations for designing and running AI agents.

<AoGrid columns={3} ao={[
{
link: "../../../components/agentic-orchestration/best-practices-agentic/",
title: "Best practices",
image: IconDocsImg,
description: "Design reliable, governed, and responsible agentic solutions, and choose the right LLM.",
},
]} />

## ProcessOS

Use ProcessOS to discover and re-engineer your existing processes against defined outcomes, and generate executable Camunda solutions.

<AoGrid columns={3} ao={[
{
link: "../../../components/process-os/overview/",
title: "ProcessOS",
image: IconAgenticImg,
description: "Discover and re-engineer your existing processes to use AI, and generate executable Camunda solutions.",
},
{
link: "../../../components/process-os-harness/overview/",
title: "ProcessOS Harness",
image: IconOrchClusterImg,
description: "Guide an AI coding agent through each ProcessOS phase, with human review gates.",
},
]} />

## Design with AI

Explore these selected AI features to design processes more easily and faster.

<AoGrid columns={3} ao={[
{
link: "https://github.com/camunda/skills",
title: "Camunda Skills",
image: IconAgenticImg,
description: "Extend your AI coding assistant with Camunda-specific skills to design, deploy, and manage processes.",
},
{
link: "../../../components/early-access/alpha/bpmn-copilot/",
title: "Camunda Copilot",
image: IconCopilotImg,
description: "Generate and modify BPMN processes, Camunda Forms, and FEEL expressions from natural-language prompts.",
},
{
link: "../../../components/hub/workspace/modeler/idp/",
title: "Intelligent document processing (IDP)",
image: IconIdpImg,
description: "Extract structured data from documents and integrate it into your processes.",
},
]} />

## Integrate via MCP

Use MCP servers to let your AI agents interact with Camunda.

<AoGrid columns={3} ao={[
{
link: "../../../reference/mcp-docs/",
title: "Docs MCP server",
image: IconDocsImg,
description: "Retrieve up-to-date Camunda documentation from your AI agents.",
},
{
link: "../../../apis-tools/orchestration-cluster-api-mcp/orchestration-cluster-api-mcp-overview/",
title: "Orchestration Cluster MCP server",
image: IconMcpImg,
description: "Give your AI agents access to Camunda’s operational capabilities.",
},
{
link: "../../../apis-tools/processes-mcp/processes-mcp-overview/",
title: "Processes MCP server",
image: IconMcpImg,
description: "Expose your Camunda processes as MCP tools that AI agents can invoke.",
},
]} />

<AoGetStartedBanner href="../../getting-started-agentic-orchestration/" />
