---
id: a2a-client
title: A2A Client
sidebar_label: A2A Client
description: "Enables interaction with remote agents using the Agent-to-Agent (A2A) protocol."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import AoGrid from '/docs/components/react-components/\_ao-card';
import { a2aConnectorCards, a2aIntroCards } from '/docs/components/react-components/\_ao-card-data';

The Agent-to-Agent (A2A) Client connectors enable Camunda processes to interact with remote agents using the [A2A protocol](https://a2a-protocol.org/v0.3.0/specification/).

## About A2A Client

Combined with the [AI Agent connector](../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent.md), the A2A Client suite of connectors supports multi-agent collaboration scenarios.

It also provides capabilities to discover remote agents, send messages, and receive responses through multiple mechanisms.

## A2A Client connectors

The A2A Client include three connectors:

<AoGrid ao={a2aConnectorCards} />

1. **A2A Client connector ([outbound](/components/connectors/use-connectors/outbound.md))**: Retrieves an agent card from a remote agent and sends messages to it.
2. **A2A Client Polling connector ([inbound](/components/connectors/use-connectors/inbound.md))**: Polls for responses from remote A2A agents.
3. **A2A Client Webhook connector (inbound)**: Receives responses from remote A2A agents via webhooks.

Together, these connectors enable seamless integration with A2A-compliant agents, allowing you to build multi-agent workflows within Camunda processes.

Learn about A2A Client usage patterns with the following guide:

<AoGrid ao={a2aIntroCards} />
