---
id: overview
title: Build with AI
sidebar_label: Build with AI
description: "Build Camunda solutions with AI-ready workflows, including agentic orchestration, Camunda Copilot, and MCP integrations."
keywords: [ai, mcp, claude, copilot, cursor, agentic]
---

import AoGrid from '../../components/react-components/\_ao-card';
import IconAgenticImg from '../../components/assets/icon-agentic.png';
import IconAIAgent from '../../components/assets/hero-build-with-ai.png';
import IconCopilotImg from '../../components/assets/icon-camunda-copilot.png';
import IconIdpImg from '../../components/assets/icon-idp.png';

<h3 class="subheading">Build Camunda solutions with AI-ready workflows.</h3>

<div class="double-column-container" style={{marginBottom: '50px'}}>
<div class="double-column-left" style={{marginRight: '50px', flex: '1.35'}}>

Build Camunda solutions with agentic orchestration and MCP integrations. Connect your AI tools to a running Camunda cluster, embed AI agents in BPMN processes, and design faster with Camunda Copilot.

</div>
<div class="double-column-right" style={{flex: '1'}}>

<img src={IconAIAgent} alt="Build with AI" title="Build with AI" class="img-noborder img-600 img-transparent hero-topic" style={{marginTop: '0', marginBottom: '0'}}/>

</div>
</div>

## Build AI agents

Build AI agents that combine the flexibility of AI with the reliability of process orchestration. Embed LLM-powered agents directly in your BPMN processes so they can reason, call tools, and act, with enforceable steps you control between an agent's decision and what it actually does. Build anything from a simple task agent to a complex multi-agent system.

Orchestrate agents alongside human tasks, deterministic rules, and system integrations in end-to-end business processes.

<p><a href="../../../components/agentic-orchestration/" class="link-arrow">Agentic orchestration</a></p>

## Design with AI

Explore these selected AI features to design processes more easily and faster.

<AoGrid columns={2} ao={[
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

Retrieve up-to-date Camunda documentation from your AI agents with the Camunda [Docs MCP server](../../reference/mcp-docs/mcp-docs.md).

## Use AI responsibly

Review our [AI usage guidelines](./ai-usage-guidelines.md) for requirements on security, legality, data handling, human oversight, and prohibited use cases.
