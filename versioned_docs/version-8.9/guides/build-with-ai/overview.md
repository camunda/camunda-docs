---
id: overview
title: Build with AI
sidebar_label: Build with AI
description: "Build Camunda solutions with AI-ready workflows, including agentic orchestration, Camunda Copilot, and MCP integrations."
keywords: [ai, mcp, claude, copilot, cursor, agentic]
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import AoGrid from '../../components/react-components/\_ao-card';
import IconAgenticImg from '../../components/assets/icon-agentic.png';
import IconConnectorsImg from '../../components/assets/icon-connectors.png';
import IconPlay from '../../components/assets/icon-play.png';
import IconAIAgent from '../../components/assets/hero-build-with-ai.png';
import IconCopilotImg from '../../components/assets/icon-camunda-copilot.png';
import IconIdpImg from '../../components/assets/icon-idp.png';
import IconDocsImg from '../../components/assets/icon-docs.png';
import IconOrchClusterImg from '../../components/assets/icon-orchcluster.png';
import IconMcpImg from '../../components/assets/icon-mcp.png';

<h3 class="subheading">Build Camunda solutions with AI-ready workflows.</h3>

<div class="double-column-container" style={{marginBottom: '50px'}}>
<div class="double-column-left" style={{marginRight: '50px', flex: '1.35'}}>

Build Camunda solutions with agentic orchestration and MCP integrations. Connect your AI tools to a running Camunda cluster, embed AI agents in BPMN processes, and design faster with Camunda Copilot.

<a class="button button--outline button--secondary button--md button--hero--topic" title="Build with Camunda" href={useBaseUrl('/build-with-camunda')} style={{marginBottom: '30px', marginTop: '20px'}}>Set up your AI development environment</a>

</div>
<div class="double-column-right" style={{flex: '1'}}>

<img src={IconAIAgent} alt="Build with AI" title="Build with AI" class="img-noborder img-600 img-transparent hero-topic" style={{marginTop: '0', marginBottom: '0'}}/>

</div>
</div>

## Build AI agents

Build AI agents that combine the flexibility of AI with the reliability of process orchestration. Embed LLM-powered agents directly in your BPMN processes so they can reason, call tools, and act, with enforceable steps you control between an agent's decision and what it actually does. Build anything from a simple task agent to a complex multi-agent system.

Orchestrate agents alongside human tasks, deterministic rules, and system integrations in end-to-end business processes.

<AoGrid columns={3} ao={[
{
link: "../../getting-started-agentic-orchestration/",
title: "Build your first AI agent",
image: IconPlay,
description: "Follow a hands-on guide to build and run your first AI agent in Camunda.",
},
{
link: "../../../components/agentic-orchestration/agentic-orchestration-overview/",
title: "Agentic orchestration",
image: IconAgenticImg,
description: "Orchestrate AI agents alongside human tasks and system integrations in your BPMN processes.",
},
{
link: "../../../components/connectors/out-of-the-box-connectors/agentic-ai-aiagent/",
title: "AI Agent connector",
image: IconConnectorsImg,
description: "Embed LLM-powered agents in your processes with the AI Agent connector.",
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
link: "../../../components/modeler/web-modeler/idp/",
title: "Intelligent document processing (IDP)",
image: IconIdpImg,
description: "Extract structured data from documents and integrate it into your processes.",
},
]} />

## Integrate via MCP

Use MCP servers to let your AI agents interact with Camunda.

<AoGrid columns={2} ao={[
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
]} />

## Use AI responsibly

Review our [AI usage guidelines](./ai-usage-guidelines.md) for requirements on security, legality, data handling, human oversight, and prohibited use cases.
