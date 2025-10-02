import ConfigurationMemoryStorageBackends from './\_memory-storage-backends.md';

### Memory

Configure the agent's short-term/conversational memory.

For the AI Agent Process implementation, configuration of the agent context field is only necessary when re-entering the agent as part of a feedback loop outside the agent execution.

| Field         | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :------------ | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Agent context | No       | <p>As the process implementation keeps the agent context within the subprocess scope, it is only necessary to configure the agent context when the agent should pick up an existing conversation, for example to model a user feedback loop as used in the [quickstart example](../../../../../../guides/getting-started-agentic-orchestration.md).</p><p>Should be used in combination with the **Include agent context** setting in the [response](#response) section and be aligned with the used result variable.</p><p>Example: `=agent.context`, `=anotherAgent.context`</p> |

<ConfigurationMemoryStorageBackends />
