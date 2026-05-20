---
id: overview
title: Build with AI
sidebar_label: Build with AI
description: "Build Camunda solutions with AI-ready workflows, including agentic orchestration, Camunda Copilot, and MCP integrations."
keywords: [ai, mcp, claude, copilot, cursor, agentic]
---

import AoGrid from '../../components/react-components/\_ao-card';
import IconAgenticImg from '../../components/assets/icon-agentic.png';
import IconAIAgent from '../../components/agentic-orchestration/img/ao-ai-agent.png';
import IconCopilotImg from '../../components/assets/icon-camunda-copilot.png';
import IconIdpImg from '../../components/assets/icon-idp.png';
import IconDocsImg from '../../components/assets/icon-docs.png';
import IconOrchClusterImg from '../../components/assets/icon-orchcluster.png';
import IconMcpImg from '../../components/assets/icon-mcp.png';

<h3 class="subheading">Build Camunda solutions with AI-ready workflows.</h3>

<div class="double-column-container" style={{marginBottom: '50px'}}>
<div class="double-column-left" style={{marginRight: '50px', flex: '1.35'}}>

Build Camunda solutions with agentic orchestration and MCP integrations. Connect your AI tools to a running Camunda cluster, embed AI agents inside BPMN processes, and use Camunda Copilot to design faster.

<a class="button button--outline button--secondary button--md button--hero--topic button--hero--topic-orange" title="Build with Camunda" href="/build-with-camunda" style={{marginBottom: '30px', marginTop: '20px'}}>Set up your AI development environment</a>

</div>
<div class="double-column-right" style={{flex: '1'}}>

<img src={IconAIAgent} alt="Build with AI" title="Build with AI" class="img-noborder img-transparent hero-topic" style={{marginTop: '0', marginBottom: '0', maxWidth: '300px'}}/>

</div>
</div>

## Orchestrate AI agents

With Camunda [agentic orchestration](/components/agentic-orchestration/agentic-orchestration-overview.md), integrate and orchestrate AI agents into your BPMN-based processes.

Agentic orchestration lets human tasks, deterministic rule sets, and AI-driven decisions collaborate in a robust, end-to-end process.

## Design with AI

Explore these selected AI features to design workflows and processes more easily and faster.

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
