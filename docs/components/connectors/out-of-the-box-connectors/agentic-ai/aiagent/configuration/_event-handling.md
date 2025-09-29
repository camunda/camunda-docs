### Event handling {#configuration-event-handling}

Configures how the AI Agent process should behave when handling results from an [event subprocess](../../../../../../components/modeler/bpmn/event-subprocesses/event-subprocesses.md).

The **Event handling behavior** field can be set to one of options:

- [Wait for tool call results](#wait-for-tool-call-results) (default)
- [Interrupt tool calls](#interrupt-tool-calls)

Assuming the agent requested to execute tools `A` and `B` and tool `B` already being completed, the following describes how each option behaves when an event is received.

#### Wait for tool call results

The process waits for all tool calls to complete before handling the event. For the example above, the following sequence of messages would be sent to the LLM after both tools complete:

- Tool A: `Tool A result`
- Tool B: `Tool B result`
- Event message: `Content from event message`

#### Interrupt tool calls

When an event is received while other tool calls are still in progress, the process will cancel the tool execution and directly return a list of messages to the LLM:

- Tool A: `Tool A execution was cancelled`
- Tool B: `Tool B result`
- Event message: `Content from event message`
