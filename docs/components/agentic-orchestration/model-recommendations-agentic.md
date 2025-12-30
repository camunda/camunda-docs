---
id: model-recommendations-agentic
title: LLM recommendations
sidebar_label: LLM recommendations
description: "## General model requirements To implement an agentic process, you must choose a model that meets certain baseline requirements."
---

Recommendations and best practices for working with Large Language Models (LLMs) and effective prompts.

## General model requirements

To implement an agentic process, you must choose a model that meets certain baseline requirements.
These include:

### Tool calling support

The model should be able to invoke external tools and work with work with tool-calling mechanisms, as part of its output.
If a model cannot call tools, it won’t be suitable for an agentic workflow.

### Vendor compatibility

The model must be available through at least one supported vendor or API.

In practice, this means using a model from AWS Bedrock, Google Vertex AI, Azure OpenAI, OpenAI (or any platform compatible with the OpenAI API).
Choosing a model from these ecosystems ensures it will integrate with Camunda’s connectors and the agentic orchestration framework.

### Plain text I/O

The model should accept and return plain text.

Agentic processes rely on text prompts and text-based replies (which may include JSON or other structured text). Avoid models that only produce non-text outputs or require special input formats. _Text in, text out_ is essential for simplicity and reliable tool integration.

## General recommendations for agentic processes

As well as choosing the right model, you should follow best practices in designing your agentic process.
These recommendations help your AI agent work effectively and safely within a workflow.

### Use detailed tool descriptions

When defining tools for the agent to use be very specific about what each tool does and what input it expects:

- The more context you give the AI about the tool’s purpose, the more accurately it will use that tool.
- Write clear, instructive descriptions for each tool call.

You can do so via [`fromAi` expressions](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md#ai-generated-parameters-via-fromai) in Camunda.
For example, `fromAi(toolCall.emailBody, "Body of the email to be sent")`.

### Mind the context window

Consider the model’s context size when designing your agent’s interactions:

- For example, if your model has a 4k token limit, plan your prompt and tool usage so you don’t exceed that. Only include relevant information in the prompt and trim any unnecessary details.
- When defining tools’ input and output, anticipate how large those could be. A large chunk of text returned from a tool can quickly consume the context window, leaving little room for the model’s reasoning or response.

### Avoid overfilling the prompt with tool output

Be cautious that tool responses don’t unintentionally fill the entire context.

- If a tool returns very large data, consider post-processing it before feeding it back into the model.
- For example, you might take only a summary of a document rather than the full text.
  This prevents the model’s next prompt from being dominated by irrelevant or excessive content, which can degrade performance and increase cost.

### Sanitize tool outputs

Sanitizing ensures the agent doesn’t accidentally get confused or manipulated by malformed tool data, and also reduces the risk of prompt injections coming from external tool results:

- Always clean and validate the output from tools before the AI agent uses it in a prompt, by removing any irrelevant, sensitive, or potentially prompt-breaking content. This is important for both security and prompt clarity.
- For example, if a web search tool returns HTML or script tags, strip those out or convert them to plain text.

### Account for limited memory and long processes

Agentic workflows can be long-running. The AI model won’t “remember” everything forever, as its memory is essentially the prompt history within the context window.

- If your process spans multiple steps or lengthy pauses, store important information outside the model’s short-term memory. Use Camunda’s document storage or your own persistent storage layer, such as a database, to save key data between steps.
- For example, if the agent gathers info in an early step that’s needed much later, persist that info so it can be reloaded into the prompt when required. This way, the agent can retrieve past knowledge without relying on an ever-growing prompt history.

:::note
An agentic process might pause or wait for events, causing the context to reset between runs. By saving state to a database or Camunda document storage, you ensure nothing vital is lost when the process continues. Think of it as the agent’s long-term memory—use it for any details the agent might need beyond the current prompt.
:::

### Incorporate human feedback when appropriate

Consider adding a “human in the loop” as one of the agent’s tools. In practice, this could be a special tool, such as `ask_human` or a review task, that the agent can invoke to get confirmation or guidance from a user.

- This is especially useful for high-stakes decisions or if the AI is unsure how to proceed. Designing your process with a human feedback option means the agent can defer to a person instead of guessing.
- For example, the workflow might include a step where an employee reviews the AI’s draft output or where the AI explicitly asks the user to clarify an ambiguous request. This supervision loop can greatly improve the quality and safety of the agent’s actions.

## Prompting recommendations

Constructing effective prompts is critical for guiding the model in an agentic process. Keep the following guidelines in mind.

### Leverage vendor-specific best practices

Each model has recommended prompting techniques. Refer to the official documentation for each model:

- [Anthropic Claude](https://docs.anthropic.com/claude/docs)
- [OpenAI GPT / reasoning models](https://platform.openai.com/docs/guides/prompt-engineering)
- [Google Gemini](https://cloud.google.com/vertex-ai/generative-ai/docs/models)
- [Cohere Command-R](https://docs.cohere.com/docs/the-cohere-platform)
- [Meta Llama](https://llama.meta.com/docs/)
- [Mistral / Mixtral / Codestral](https://docs.mistral.ai/)
- [Alibaba Qwen](https://qwen.readthedocs.io/)

### Use chain-of-thought and examples for complex tasks

Don’t hesitate to let the model “think out loud” or guide it through tricky scenarios. Chain-of-thought prompting asks the model to solve problems step by step, for example, by including a phrase like “Let’s reason this out step by step...” or using a hidden `<reflection>` tag if supported.
This approach helps improve reasoning accuracy.

Also, provide a few in-context examples (few-shot prompting) to show how to handle edge cases, compliance rules, or specific output formats. Illustrate any structured output formats in the prompt, and if possible, configure the connector's [response format](../connectors/out-of-the-box-connectors/agentic-ai-aiagent.md) options to enforce JSON or parsed text responses. Clear examples and format guidance set expectations for the AI, ensuring consistency and reducing errors.

### Define when and how the agent should seek user input

In your system or prompt instructions, make it clear when the AI should involve a human. For example, you could say, “If the user’s request is unclear or more information is needed, the assistant should ask a follow-up question via the customer communication tool.”

Decide which points in the process need user feedback, such as after showing an intermediate result or when the AI is unsure about a critical decision. Specify this in the prompt so the model knows it is acceptable or expected to ask for clarification.

The instructions should also guide the AI on using the human feedback tool. For example, “Before finalizing an answer, if confidence is low, call the `ask_human` tool to confirm the details.” Being explicit helps the agent make better decisions.

### Set a clear persona and objective in the system prompt

Always start your prompt by defining the AI’s role and goal. For example, in an agentic process, the model could act as a specialized assistant: “You are OrderAgent, an AI assistant helping users track and modify their orders.”

Include the persona’s traits and main objective. For example: “Your goal is to resolve customer inquiries using the tools provided while following all company guidelines.” Defining the persona and objective helps the model maintain a consistent tone and produce focused, coherent outputs.

:::tip
Prompt engineering is iterative. After writing an initial prompt, test it with your model and sample scenarios. If the agent’s behavior isn’t quite right, refine the wording or add another example.

Small phrasing changes can have a big impact. Continue to experiment and refine to achieve reliable, compliant results for your specific agentic use case.
:::

### Example of a generic prompt

```text
You are **OrderAgent**, a helpful AI assistant supporting order management.
Your objective is to resolve requests by:
1. Using the available tools when external action is required.
2. Asking for clarification when input is incomplete or ambiguous.
3. Returning outputs in JSON format if requested by the connector.

Let’s reason step by step.

Comportments for tool usage:
- **Direct actions:**
  - Use `cancel_order` when a clear and valid order ID is provided.
  - Use `send_email` only when communication with the customer is explicitly required.

- **Chained actions:**
  - If cancelling an order also requires notifying the customer, first call `cancel_order`, then call `send_email`.
  - If a tool returns a status update that triggers a follow-up action (for example, an order is “on hold”), use the corresponding resolution tool in sequence.

- **Ambiguity handling:**
  - If the order reference is missing, request clarification before proceeding with a tool.
  - If multiple orders match the request, return options and request the user (or `ask_human`) to disambiguate.

- **Escalation to human (`ask_human`):**
  - If the requested action could have irreversible impact (e.g., “delete all orders”), always escalate.
  - If tool outputs are malformed, incomplete, or contradictory, escalate for review.
  - If confidence in the decision path is low (for example, conflicting data across tools), escalate rather than guessing.

- **Unexpected tool outputs:**
  - If a tool returns irrelevant or excessive data (e.g., HTML instead of plain text), sanitize and summarize before continuing.
  - If output cannot be parsed or mapped correctly, escalate with `ask_human`.

The goal is to use tools precisely, combine them logically when workflows require multiple steps, and defer to a human when safety, ambiguity, or unexpected results make autonomous resolution unreliable.

```
