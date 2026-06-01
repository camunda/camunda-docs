---
id: overview
title: Build with AI
sidebar_label: Build with AI
description: "Build Camunda solutions with AI-ready workflows, including agentic orchestration, Camunda Copilot, and MCP integrations."
keywords: [ai, mcp, claude, copilot, cursor, agentic]
---

import AoGrid from '../../components/react-components/\_ao-card';
import IconAgenticImg from '../../components/assets/icon-agentic.png';
import IconConnectorsImg from '../../components/assets/icon-connectors.png';
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

## Orchestrate AI agents

Orchestrate AI agents within your BPMN-based workflows, enabling human tasks, deterministic rule sets, and AI-driven decisions to collaborate in a robust, end-to-end process.

Set up and build any enterprise automation pattern, from simple task agents to complex multi-agent systems.

<AoGrid columns={2} ao={[
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
description: "Embed an LLM-powered agent in your process with the out-of-the-box AI Agent connector.",
},
]} />

## Design with AI

Explore these selected AI features to design workflows and processes more easily and faster.

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

Retrieve up-to-date Camunda documentation from your AI agents with the Camunda [Docs MCP server](../../reference/mcp-docs/mcp-docs.md).

## Use AI responsibly

Review our [AI usage guidelines](./ai-usage-guidelines.md) for requirements on security, legality, data handling, human oversight, and prohibited use cases.
