---
id: agentic-ai-ad-hoc-tools-schema-resolver
sidebar_label: Ad-Hoc Tools Schema Resolver
title: Ad-Hoc Tools Schema Resolver connector
description: Resolve an input schema used in combination with LLMs for activities defined within an ad-hoc sub-process.
---

The **Ad-Hoc Tools Schema connector** is an outbound connector that implements the tool resolution part of
the [**AI Agent connector**](./agentic-ai-aiagent.md). While its function is also embedded in the AI Agent connector,
the tools-schema connector can be used independently in combination with other AI connectors.

This can be useful for:

- **Direct LLM interaction**: if you don't want to use the AI Agent connector but still want to resolve tools
  for an ad-hoc sub-process, leveraging the `fromAi` function to define the input schema in combination with custom LLM
  integrations.
- **Debugging tool definitions**: if you want to test the tool resolution logic without having to set up a full AI Agent
  connector, you can use the tools-schema connector to get the tool definitions and see how they are generated.

## Prerequisites

To use the **Ad-Hoc Tools Schema connector**, your process must contain an ad-hoc sub-process whose ID you
can reference.

## Create an Ad-Hoc Tools Schema connector task

1. Create a service task.
2. [Apply](../use-connectors/outbound.md) the **Ad-Hoc Tools Schema** element template.
3. Configure the **Ad-hoc sub-process ID** to reference the element ID of the ad-hoc sub-process.
4. Configure [a result variable or a result expression](../use-connectors/#variableresponse-mapping) to map the
   connector results to process variables.

## Tool Definitions

Please see the [AI Agent connector](./agentic-ai-aiagent.md) documentation for a detailed description of how tools can
be defined.

## Response Structure

The connector returns a list of tool definitions in the following format. Individual tool definitions are modeled after
the [list tools response](https://modelcontextprotocol.io/specification/2025-03-26/server/tools#listing-tools) defined
in the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) specification, so you should be able to directly
use the definitions with different LLMs or transform them into the reuired format for your AI integration.

```json
{
  "toolDefinitions": [
    {
      "name": "GetDateAndTime",
      "description": "Returns the current date and time including the timezone.",
      "inputSchema": {
        "type": "object",
        "properties": {},
        "required": []
      }
    },
    {
      "name": "Download_A_File",
      "description": "Download a file from the provided URL",
      "inputSchema": {
        "type": "object",
        "properties": {
          "url": {
            "type": "string",
            "description": "The URL to download the file from"
          }
        },
        "required": ["url"]
      }
    },
    {
      "name": "SuperfluxProduct",
      "description": "Calculates the superflux product (a very complicated calculation) given two input numbers",
      "inputSchema": {
        "type": "object",
        "properties": {
          "a": {
            "type": "number",
            "description": "The first number to be superflux calculated."
          },
          "b": {
            "type": "number",
            "description": "The second number to be superflux calculated."
          }
        },
        "required": ["a", "b"]
      }
    }
  ]
}
```

You can either configure a result variable to contain the whole response or use a result expression to map parts of the
response into your process.
