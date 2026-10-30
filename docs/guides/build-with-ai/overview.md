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
import IconRagImg from '../../components/assets/icon-long-term-memory.png';
import IconOperateImg from '../../components/assets/icon-operate.png';
import IconOptimizeImg from '../../components/assets/icon-optimize.png';
import IconConfigImg from '../../components/assets/icon-config.png';
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
link: "../../../components/agentic-orchestration/camunda-provided-llm/",
title: "Camunda-provided LLM",
image: IconLlmImg,
description: "Run AI agents quickly in Camunda SaaS with Camunda-provided LLM.",
},
{
link: "../../../components/agentic-orchestration/add-tool-to-ai-agent/",
title: "Add tools to an AI agent",
image: IconAgenticImg,
description: "Add BPMN elements as callable tools to your AI agents.",
},
{
link: "../../../components/agentic-orchestration/rag-ai-agents/",
title: "Add long-term memory",
image: IconRagImg,
description: "Add long-term memory to your AI agents.",
},
{
link: "../../../components/agentic-orchestration/connect-external-agent/",
title: "Connect an external agent",
image: IconAgenticImg,
description: "Connect an external agent to Camunda.",
},
{
link: "../../../components/agentic-orchestration/expose-process-as-mcp-tool/",
title: "Expose a process as an MCP tool",
image: IconMcpImg,
description: "Configure a BPMN process as a callable MCP tool for AI agents.",
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
link: "../../../components/agentic-orchestration/evaluate-agents/monitor-ai-agents/",
title: "Monitor with Operate",
image: IconOperateImg,
description: "Monitor your AI agents with Operate.",
},
{
link: "../../../components/agentic-orchestration/evaluate-agents/detect-off-rail-agents/",
title: "Detect off-rail agents",
image: IconAgenticImg,
description: "Identify a stuck or looping AI agent before it fails.",
},
{
link: "../../../components/agentic-orchestration/evaluate-agents/analyze-ai-agents/",
title: "Analyze with Optimize",
image: IconOptimizeImg,
description: "Analyze your AI agents with Optimize.",
},
{
link: "../../../components/agentic-orchestration/evaluate-agents/test-ai-agents/",
title: "Test with CPT",
image: IconConfigImg,
description: "Test your AI agents with Camunda Process Test.",
},
]} />

## Best practices

Follow guidelines and recommendations for designing and running AI agents.

<AoGrid columns={3} ao={[
{
link: "../../../components/agentic-orchestration/ai-usage-guidelines/",
title: "AI usage guidelines",
image: IconDocsImg,
description: "Requirements on security, legality, data handling, human oversight, and prohibited use cases.",
},
{
link: "../../../components/agentic-orchestration/ao-design/",
title: "Design and architecture",
image: IconDocsImg,
description: "Plan and design your agentic orchestration solutions.",
},
{
link: "../../../components/agentic-orchestration/choose-right-model-agentic/",
title: "Choose the right LLM",
image: IconLlmImg,
description: "Choose the right Large Language Model (LLM) for AI agents.",
},
{
link: "../../../components/agentic-orchestration/model-recommendations-agentic/",
title: "LLM recommendations",
image: IconLlmImg,
description: "Best practices for working with models and prompts.",
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
