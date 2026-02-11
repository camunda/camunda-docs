import ConfigurationErrorCodesTask from './\_error-codes-task.md';

### Error handling

If an error occurs, the AI Agent connector throws an error and includes the error response in the error variable in Operate.

| Field            | Required | Description                                                                                                                                                        |
| :--------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Error expression | No       | You can handle an AI Agent connector error using an Error Boundary Event and [error expressions](/components/connectors/use-connectors/index.md#error-expression). |

In the error expression, you can handle the following error codes emitted by the AI Agent connector to respond to specific situations. For example, you can map a specific error code to a BPMN error and model
your process accordingly.

| Error code                                   | Description                                                                                                                                                                                                                                                     |
| :------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FAILED_MODEL_CALL`                          | The call to the LLM API failed, for example, due to misconfiguration or invalid credentials. The error message contains additional details.                                                                                                                     |
| `FAILED_TO_PARSE_RESPONSE_CONTENT`           | The AI Agent was configured to parse the LLM response as JSON, but parsing failed.                                                                                                                                                                              |
| `MAXIMUM_NUMBER_OF_MODEL_CALLS_REACHED`      | The AI Agent reached the configured maximum number of model calls.                                                                                                                                                                                              |
| `MIGRATION_MISSING_TOOLS`                    | Tools referenced by the AI Agent were removed after a process instance migration. Removing or renaming tools is not supported. See [process instance migrations](../../../agentic-ai-aiagent.md#process-instance-migrations) for more details.                  |
| `MIGRATION_GATEWAY_TOOL_DEFINITIONS_CHANGED` | Gateway tool definitions have changed after a process instance migration. Adding or removing gateway tools to a running agent is not supported. See [process instance migrations](../../../agentic-ai-aiagent.md#process-instance-migrations) for more details. |
| `NO_USER_MESSAGE_CONTENT`                    | No user message content, either from a user prompt or a document, was provided to the agent.                                                                                                                                                                    |
| `TOOL_CALL_RESULTS_ON_EMPTY_CONTEXT`         | Tool call results were passed to the AI Agent despite an empty context, which typically indicates a misconfiguration of the agent context.                                                                                                                      |

{props.type === "task" && <ConfigurationErrorCodesTask />}
