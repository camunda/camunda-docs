import ConfigurationErrorCodesTask from './\_error-codes-task.md';

### Error handling

If an error occurs, the AI Agent connector throws an error and includes the error response in the error variable in Operate.

| Field            | Required | Description                                                                                                                                                        |
| :--------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Error expression | No       | You can handle an AI Agent connector error using an Error Boundary Event and [error expressions](/components/connectors/use-connectors/index.md#error-expression). |

In the error expression, you can handle the following error codes emitted by the AI Agent connector to react on specific situations. For example, you can map a specific error code to a BPMN error and model
your process accordingly.

| Error code                              | Description                                                                                                                                    |
| :-------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `FAILED_MODEL_CALL`                     | The call to the LLM API failed, for example due to misconfiguration or wrong credentials. The error message contains additional details.       |
| `FAILED_TO_PARSE_RESPONSE_CONTENT`      | The AI Agent was configured to parse the LLM response as JSON, but the parsing failed.                                                         |
| `MAXIMUM_NUMBER_OF_MODEL_CALLS_REACHED` | The AI Agent reached the maximum number of configured model calls.                                                                             |
| `NO_USER_MESSAGE_CONTENT`               | Indicates that no user messages content - either coming from a user prompt or a document - was provided to the agent.                          |
| `TOOL_CALL_RESULTS_ON_EMPTY_CONTEXT`    | Tool call results were passed to the AI Agent despite the context being empty. This typically indicates misconfiguration of the agent context. |

{props.type === "task" && <ConfigurationErrorCodesTask />}
