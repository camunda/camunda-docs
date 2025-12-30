---
id: a2a-client
title: A2A Client
sidebar_label: A2A Client
description: "The Agent-to-Agent (A2A) Client connectors enable Camunda processes to interact with remote agents using the A2A protocol."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import AoGrid from '/docs/components/react-components/\_ao-card';
import { a2aConnectorCards } from '/docs/components/react-components/\_ao-card-data';

The Agent-to-Agent (A2A) Client connectors enable Camunda processes to interact with remote agents using the [A2A protocol](https://a2a-protocol.org/v0.3.0/specification/).

## About A2A Client

Combined with the [AI Agent connector](../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent.md), the A2A Client suite of connectors supports multi-agent collaboration scenarios.

It also provides capabilities to discover remote agents, send messages, and receive responses through multiple mechanisms.

:::info
A2A Client connectors do not currently support authentication against a remote A2A server. This feature will be added in a future release.
:::

## Prerequisites

To use any A2A Client connector, you need:

- Access to an A2A-compliant agent.
- Its [Agent Card URL](https://a2a-protocol.org/v0.3.0/specification/#5-agent-discovery-the-agent-card).

## A2A Client connectors

The A2A Client includes three connectors:

<AoGrid ao={a2aConnectorCards} />

Together, these connectors enable seamless integration with A2A-compliant agents, allowing you to build multi-agent workflows within Camunda processes.

<p><a href="./a2a-client-usage-patterns/" class="link-arrow">Explore common A2A Client usage patterns</a></p>
