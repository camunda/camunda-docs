---
id: model-recommendations-agentic
title: LLM recommendations
sidebar_label: LLM recommendations
description: Prompting recommendations when using models for agentic process
---

Recommendations and best practices for working with models and effective prompts.

## General model requirements

To implement an agentic process, you must choose a model that meets certain baseline requirements. These include:

### Tool calling support

Ensure the model can work with tool-calling mechanisms.

The model should be able to invoke external tools (for example, via function calling or a structured **Tool calling** interface) as part of its output. If a model cannot call tools, it won’t be suitable for an agentic workflow.

### Vendor compatibility

The model must be available through at least one supported vendor or API.

In practice, this means using a model from **AWS Bedrock**, **Google Vertex AI**, **Azure OpenAI**, **OpenAI** (or any platform compatible with the OpenAI API). Choosing a model from these ecosystems ensures it will integrate with Camunda’s connectors and the agentic orchestration framework.

### Plain text I/O

The model should accept and return plain text.

Agentic processes rely on text prompts and text-based replies (which may include JSON or other structured text). Avoid models that only produce non-text outputs or require special input formats. Text in, text out is essential for simplicity and reliable tool integration.

## General recommendations for agentic processes

As well as choosing the right model, you should follow best practices in designing your agentic process. These recommendations help your AI agent work effectively and safely within a workflow.

### Use detailed tool descriptions

When defining tools for the agent to use (for example, in your prompt or via `fromAi` expressions in Camunda), be very specific about what each tool does and what input it expects.

- Write clear, instructive descriptions for each `toolCall`. This guides the model to generate the correct outputs for tools.
- For example, `fromAi(toolCall.emailBody, "Body of the email to be sent")` is better than a vague description.
- The more context you give the AI about the tool’s purpose, the more accurately it will use that tool.

### Mind the context window

Consider the model’s context size when designing your agent’s interactions.

- If your model has a 4k token limit, plan your prompt and tool usage so you don’t exceed that. Only include relevant information in the prompt and trim any unnecessary details.
- When defining tools’ input/output, anticipate how large those inputs or outputs could be. A large chunk of text returned from a tool can quickly consume the context window, leaving little room for the model’s reasoning or response.

### Avoid overfilling the prompt with tool output

Be cautious that tool responses don’t unintentionally fill the entire context. If a tool returns very large data (for example, the full text of a document or a lengthy JSON), consider post-processing it before feeding it back into the model.

For example, you might take only a summary of a document rather than the full text. This prevents the model’s next prompt from being dominated by irrelevant or excessive content, which can degrade performance and increase cost.

### Sanitize tool outputs

Always clean and validate the output from tools before the AI agent uses it in a prompt. This is important for both security and prompt clarity.

- Remove any irrelevant, sensitive, or potentially prompt-breaking content.
- For example, if a web search tool returns HTML or script tags, strip those out or convert them to plain text.
- Sanitizing ensures the agent doesn’t accidentally get confused or manipulated by malformed tool data, and also reduces the risk of prompt injections coming from external tool results.

### Account for limited memory and long processes

Agentic workflows can be long-running. The AI model won’t “remember” everything forever, as its memory is essentially the prompt history within the context window.

- If your process spans multiple steps or lengthy pauses, store important information outside the model’s short-term memory. Use Camunda’s document storage or your own persistent storage layer (such as a database) to save key data between steps.
- For example, if the agent gathers info in an early step that’s needed much later, persist that info so it can be reloaded into the prompt when required. This way, the agent can retrieve past knowledge without relying on an ever-growing prompt history.

:::note
An agentic process might pause or wait for events, causing the context to reset between runs. By saving state to a database or Camunda document storage, you ensure nothing vital is lost when the process continues. Think of it as the agent’s long-term memory—use it for any details the agent might need beyond the current prompt.
:::

### Incorporate human feedback when appropriate

Consider adding a “human in the loop” as one of the agent’s tools. In practice, this could be a special tool (for example, `ask_human` or a review task) that the agent can invoke to get confirmation or guidance from a user.

- This is especially useful for high-stakes decisions or if the AI is unsure how to proceed. Designing your process with a human feedback option means the agent can defer to a person instead of guessing.
- For example, the workflow might include a step where an employee reviews the AI’s draft output or where the AI explicitly asks the user to clarify an ambiguous request. This supervision loop can greatly improve the quality and safety of the agent’s actions.

## Prompting recommendations

Constructing effective prompts is critical for guiding the model in an agentic process. Keep these guidelines in mind:

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

Don’t hesitate to let the model “think out loud” or show it how to handle tricky scenarios. Chain-of-thought prompting involves instructing the model to work through problems step by step. For example, you might include a phrase such as “Let’s reason this out step by step...” in your prompt, or have the agent output its reasoning in a hidden `<reflection>` tag (if your format supports it). This can improve the model’s reasoning accuracy.

Additionally, provide in-context examples (few-shot prompting) to demonstrate how to handle edge cases, compliance requirements, or specific output formats. For example, if your agent should refuse certain requests, show a mini dialogue in the prompt where a user asks something non-compliant and the assistant gives a safe refusal.

By including a few well-crafted examples covering alternative handling and edge cases, you set a clear expectation for the AI. If output needs to follow a structured format, you can illustrate that format in the prompt. Even better, configure the connector’s [response format](../connectors/out-of-the-box-connectors/agentic-ai-aiagent.md) options to enforce JSON or parsed text responses. This ensures consistency across executions and reduces reliance on the model “guessing” the format.

### Define when and how the agent should seek user input

In your system or prompt instructions, clarify the criteria for the AI to loop in a human. You might say, “If the user’s request is unclear or more information is needed, the assistant should ask a follow-up question via the customer communication tool.”

Determine the points in the process where user feedback is valuable—for example, after presenting an intermediate result or when the AI is uncertain about a critical decision. By specifying this, the model will know it’s acceptable (or even expected) to reach out for clarification rather than proceeding blindly.

This ties back to having a human feedback tool: the prompt should instruct the AI on **when** to use that tool. For instance, “Before finalizing an answer, if confidence is low, you must call the `ask_user` tool to confirm the details.” Being explicit about this logic in the prompt helps the agent make better choices during execution.

### Set a clear persona and objective in the system prompt

Always begin your prompt (or configure your system message) by establishing the AI’s role and goal. In an agentic process, the model might behave as a specialized assistant (for example, “You are **OrderAgent**, an AI assistant helping users track and modify their orders…”).

Describe the persona’s traits (helpful, knowledgeable, follows policy X, etc.) and the overarching objective or mission. For example: “Your goal is to resolve customer inquiries by using the tools provided, while remaining compliant with all company guidelines.”

Defining the persona anchors the model’s tone and behavior consistently. Likewise, stating the objective gives the model a north star—it knows what it is trying to accomplish in the process. A well-defined persona and objective in the system prompt lead to more coherent and purpose-driven outputs from the agent.

:::tip
Prompt engineering is iterative. After writing an initial prompt (including role, examples, and instructions), test it with your model and sample scenarios. If the agent’s behavior isn’t quite right, refine the wording or add another example.

Small phrasing changes can have a big impact. Continue to experiment and refine to achieve reliable, compliant results for your specific agentic use case.
:::

### Example generic prompt

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
