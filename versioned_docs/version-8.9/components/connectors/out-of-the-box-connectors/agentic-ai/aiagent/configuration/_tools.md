### Tools

Specify the tool resolution for an accompanying ad-hoc sub-process.

| Field                 | Required | Description                                                                                                                                                                                                                                                                                                                        |
| :-------------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ad-hoc sub-process ID | No       | <p>Specify the element ID of the ad-hoc sub-process to use for tool resolution (see [Tool Definitions](../../../agentic-ai-aiagent-tool-definitions.md)).</p><p>When entering the AI Agent connector, the connector resolves the tools available in the ad-hoc sub-process, and passes these to the LLM as part of the prompt.</p> |
| Tool call results     | No       | <p>Specify the results collection of the ad-hoc sub-process multi-instance execution.</p><p>Example: `=toolCallResults`</p>                                                                                                                                                                                                        |

:::note

- Leave this section empty if using this connector independently, without an accompanying ad-hoc sub-process.
- To actually use the tools, you must model your process to include a tools feedback loop, routing into the ad-hoc sub-process and back to the AI agent connector. See [example tools feedback loop](../../../agentic-ai-aiagent-task-example.md#tools-loop).

:::
