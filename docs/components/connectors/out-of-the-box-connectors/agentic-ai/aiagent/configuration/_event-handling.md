### Event handling {#configuration-event-handling}

Configures how the AI Agent sub-process should behave when handling results from an [event subprocess](../../../../../../components/modeler/bpmn/event-subprocesses/event-subprocesses.md).

:::important
In AI Agent sub-processes (implemented as ad-hoc sub-processes), only non-interrupting event subprocesses are supported.

As a result, even when using Cancel tool calls, the event subprocess itself remains non-interrupting; cancellation happens at the tool-call level, not by stopping the parent sub-process.

See [How event subprocesses work with the AI Agent Sub-process](#how-event-subprocesses-work-with-the-ai-agent-sub-process) for more details.
:::

The **Event handling behavior** field can be set to one of these two options:

- [Wait for tool call results](#wait-for-tool-call-results) (default).
- [Cancel tool calls](#cancel-tool-calls).

Consider the example scenario where the agent requested the execution of tools `A` and `B`, and tool `B` has already been completed, the following describes how each option behaves when an event is received.

#### Wait for tool call results

The agent waits for all tool calls (including those that create user tasks, such as “Wait for user”) to complete before handling the event.

Only after that, the job worker sends a new request to the LLM that includes one message per completed tool, each containing the corresponding event payload. For example, the timer or event subprocess handler output.

For the example scenario, the following sequence of messages would be sent to the LLM after both tools complete:

1. Tool A: `Tool A result`.
1. Tool B: `Tool B result`.
1. Event message: `Content from event message`.

#### Cancel tool calls

When the configured event fires while one or more tool calls are still running, the agent:

- **Cancels all still-running tool calls** belonging to the current agent step, including user tasks such as “Wait for user”.
- Synthesizes a message for each canceled tool and includes it in the LLM request, alongside the results of already completed tools and the event message.
- Keeps the surrounding **ad-hoc sub-process scope active**: the agent decides, based on the new LLM response, which elements to activate next or whether to complete the sub-process.

:::note
No BPMN interrupting event subprocess is involved; the interruption happens purely in the agent’s control flow (job worker), not by canceling the BPMN parent scope.
:::

For the example scenario, the following sequence of messages would be sent to the LLM:

1. Tool A: `Tool A execution was cancelled`.
1. Tool B: `Tool B result`.
1. Event message: `Content from event message`.

#### Event payload

To provide additional data to the LLM from a handled event, create a `toolCallResult` variable from the event handling flow.

The content of this variable is added to the LLM API request as a user message, after any tool call results, as follows:

- If the event subprocess creates a non-empty `toolCallResult`, its contents are added as the event payload of the user message generated from the event.
- If no `toolCallResult` is created, a generic message is added as the user message, describing that an interrupting/not interrupting event was handled.

#### How event subprocesses work with the AI Agent Sub-process

In standard BPMN, an interrupting event subprocess cancels its parent scope when triggered, while a non-interrupting one runs in parallel.

For the AI Agent Sub-process (implemented as an ad-hoc sub-process):

- **Only non-interrupting event subprocesses are allowed** on the agent scope, by design and enforced by Modeler.
- The **Event handling behavior** field controls how the agent treats running tool calls when such a (non-interrupting) event subprocess is triggered:
  - [Wait for tool call results](#wait-for-tool-call-results): the event handler runs only after all tool calls complete.
  - [Cancel tool calls](#cancel-tool-calls): running tools are canceled, and their cancellation is surfaced to the LLM, even though the event subprocess itself remains non-interrupting from a BPMN perspective.

By modeling an ad-hoc sub-process with an AI agent, you delegate control of sub-process execution (which tasks/tools run and when it completes) to the agent.

Event subprocesses provide additional signals into that control loop, rather than performing low-level scope cancellation like a classic interrupting event subprocess.
