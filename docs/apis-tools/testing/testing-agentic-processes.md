---
id: testing-agentic-processes
title: Testing agentic processes
description: "A guide for testing non-deterministic, agentic Camunda processes with CPT."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Agentic processes use AI agents that decide at runtime which actions to take. This makes their execution path and output content non-deterministic, which requires a different testing approach than traditional BPMN processes. This guide walks through the CPT features that address these challenges.

## The challenge

Standard CPT assertions are blocking. They poll the process state and wait until the expected condition is met before the test continues. This works well when the process follows a predictable path, but becomes a problem for agentic processes.

A process that uses the [AI Agent connector](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) inside an [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) decides at runtime which tools to invoke and in what order. A test that blocks on one specific tool task will stall if the agent chooses a different tool first, or skips that tool entirely.

On top of non-deterministic execution order, AI agents produce free-text output whose exact wording is unpredictable. Traditional equality-based variable assertions cannot reliably verify that the agent generated a meaningful response.

## Prerequisites

- Camunda 8.9+ with [CPT set up](getting-started.md)

## Example process

This guide uses the [AI Agent Chat Quick Start](/guides/getting-started-agentic-orchestration.md) blueprint as the process under test. The process has the following structure:

1. A **start form** collects a user prompt ("How can I help you today?").
2. An **ad-hoc sub-process** named `AI Agent` contains tool tasks that the AI agent can invoke at runtime: `Get Date and Time`, `Fetch URL`, `Search recipe`, `List users`, `Load user by ID`, and others.
3. Each tool receives its input through the `toolCall` variable and writes its result to `toolCallResult`.
4. After the agent completes, a **user task** named `User Feedback` asks whether the user is satisfied.
5. If the user is not satisfied, the process loops back to the agent.

Because the agent decides which tools to call and in what order, a test cannot predict the execution path. The sections below show how to handle this.

## Handle non-deterministic flows

[Conditional behavior](utilities.md#conditional-behavior) lets you register background reactions that monitor the process state and execute actions as conditions are met, without blocking the test thread. Register behaviors before starting the process, and they react independently as the process progresses.

```java
@Test
void shouldCompleteAgentProcess() {
    // given: register behaviors for tools the agent might invoke
    processTestContext.when(
        processInstance -> processInstance.hasActiveElements("Get Date and Time"))
        .as("complete-get-date-and-time")
        .then(client -> client.newCompleteJobCommand(
            processTestContext.getActivatedJob(
                ElementSelectors.byName("Get Date and Time")))
            .variables(Map.of("toolCallResult", Map.of(
                "date", "2026-03-26",
                "time", "14:30:00")))
            .send());

    processTestContext.when(
        processInstance -> processInstance.hasActiveElements("Fetch URL"))
        .as("complete-fetch-url")
        .then(client -> client.newCompleteJobCommand(
            processTestContext.getActivatedJob(
                ElementSelectors.byName("Fetch URL")))
            .variables(Map.of("toolCallResult", Map.of(
                "status", 200,
                "body", "Example page content")))
            .send());

    // given: complete the User Feedback task when it appears
    processTestContext.when(
        processInstance -> processInstance.hasActiveElements("User Feedback"))
        .as("complete-user-feedback")
        .then(client -> client.newCompleteJobCommand(
            processTestContext.getActivatedJob(
                ElementSelectors.byName("User Feedback")))
            .variables(Map.of("satisfied", true))
            .send());

    // when: start the process with a user prompt
    ProcessInstanceEvent processInstance = client.newCreateInstanceCommand()
        .bpmnProcessId("ai-agent-chat-with-tools")
        .latestVersion()
        .variables(Map.of("prompt", "What is the current date and time?"))
        .send()
        .join();

    // then: the process completes regardless of which tools the agent invoked
    assertThat(processInstance).isCompleted();
}
```

The conditional behaviors react independently. If the agent calls `Get Date and Time`, that behavior executes its action. If the agent skips `Fetch URL`, that behavior simply never triggers. The test does not stall.

:::important
Each behavior's action should resolve the process state that the condition checks for. For example, if the condition checks for an active user task, the action should complete that task. Otherwise the behavior may execute repeatedly.
:::

If you need the same behaviors across multiple tests, register them in a `@BeforeEach` method:

```java
@BeforeEach
void registerBehaviors() {
    processTestContext.when(
        processInstance -> processInstance.hasActiveElements("User Feedback"))
        .as("complete-user-feedback")
        .then(client -> client.newCompleteJobCommand(
            processTestContext.getActivatedJob(
                ElementSelectors.byName("User Feedback")))
            .variables(Map.of("satisfied", true))
            .send());

    // ... register other shared behaviors
}
```

Use chained `.then()` calls when a behavior should produce different results on repeated invocations. The first action is consumed on the first invocation, and the last action repeats for all subsequent invocations.

```java
processTestContext.when(
    processInstance -> processInstance.hasActiveElements("Search recipe"))
    .as("complete-search-recipe")
    // 1) first invocation returns a pasta recipe
    .then(client -> client.newCompleteJobCommand(
        processTestContext.getActivatedJob(
            ElementSelectors.byName("Search recipe")))
        .variables(Map.of("toolCallResult", Map.of(
            "name", "Spaghetti Carbonara",
            "ingredients", "pasta, eggs, pancetta, parmesan")))
        .send())
    // 2) subsequent invocations return a salad recipe
    .then(client -> client.newCompleteJobCommand(
        processTestContext.getActivatedJob(
            ElementSelectors.byName("Search recipe")))
        .variables(Map.of("toolCallResult", Map.of(
            "name", "Caesar Salad",
            "ingredients", "romaine lettuce, croutons, parmesan, dressing")))
        .send());
```

For the full conditional behavior API, see [Utilities](utilities.md#conditional-behavior).

## Judge assertions

Judge assertions send a process variable and a natural language expectation to a configured LLM, which scores how well they match. The assertion passes if the score meets a configurable threshold. This avoids brittle string-matching on free-text AI output.

The judge evaluates matches using the following scoring scale:

| Score | Meaning                                                                                                                |
| ----- | ---------------------------------------------------------------------------------------------------------------------- |
| 1.0   | Fully satisfied semantically. Different wording or formatting that conveys the same meaning counts as fully satisfied. |
| 0.75  | Satisfied in substance with only minor differences that do not affect correctness.                                     |
| 0.5   | Partially satisfied. Some required elements are present but others are missing or incorrect.                           |
| 0.25  | Mostly not satisfied. Only marginal relevance.                                                                         |
| 0.0   | Not satisfied at all, or the actual value is empty.                                                                    |

The LLM may return any value between these anchor points (for example, 0.6 or 0.85). The default threshold is 0.5. You can change it globally in the [judge configuration](configuration.md#judge-configuration) or per assertion using `withJudgeConfig`.

### Set up an LLM provider

Judge assertions require a configured chat model provider. CPT provides an optional
[LangChain4j](https://docs.langchain4j.dev/) integration module that ships with preconfigured support for major LLM
providers: OpenAI, Anthropic, Amazon Bedrock, Azure OpenAI, and OpenAI-compatible APIs. LangChain4j requires Java 17+.
Camunda Process Test Spring includes the module as a transitive dependency. For the Java client, add
`camunda-process-test-langchain4j` to your project. If you provide a custom `ChatModelAdapter` instead (see
[Custom ChatModelAdapter](configuration.md#custom-chatmodeladapter)), this module is not required.

Configure the provider using the tabs below.

<Tabs groupId="judge-provider" defaultValue="openai" queryString values={[
{label: 'OpenAI', value: 'openai' },
{label: 'Anthropic', value: 'anthropic' },
{label: 'Amazon Bedrock', value: 'amazon-bedrock' },
{label: 'OpenAI-compatible', value: 'openai-compatible' },
{label: 'Azure OpenAI', value: 'azure-openai' },
{label: 'Custom / SPI', value: 'custom' }
]}>

<TabItem value='openai'>

##### Spring Boot Starter

```yaml
camunda:
  process-test:
    judge:
      chat-model:
        provider: "openai"
        model: "gpt-4o"
        api-key: "your-api-key"
```

##### Java client

```properties
judge.chatModel.provider=openai
judge.chatModel.model=gpt-4o
judge.chatModel.apiKey=your-api-key
```

</TabItem>

<TabItem value='anthropic'>

##### Spring Boot Starter

```yaml
camunda:
  process-test:
    judge:
      chat-model:
        provider: "anthropic"
        model: "claude-sonnet-4-20250514"
        api-key: "your-api-key"
```

##### Java client

```properties
judge.chatModel.provider=anthropic
judge.chatModel.model=claude-sonnet-4-20250514
judge.chatModel.apiKey=your-api-key
```

</TabItem>

<TabItem value='amazon-bedrock'>

If no authentication properties are set, the provider defaults to the
[AWS default credentials provider chain](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials-chain.html).

##### Spring Boot Starter

```yaml
camunda:
  process-test:
    judge:
      chat-model:
        provider: "amazon-bedrock"
        model: "eu.anthropic.claude-haiku-4-5-20251001-v1:0"
        region: "eu-central-1"
        # Optional: authenticate with an API key
        api-key: "your-api-key"
        # Or use AWS credentials instead of api-key:
        # credentials:
        #   access-key: "your-access-key"
        #   secret-key: "your-secret-key"
```

##### Java client

```properties
judge.chatModel.provider=amazon-bedrock
judge.chatModel.model=eu.anthropic.claude-haiku-4-5-20251001-v1:0
judge.chatModel.region=eu-central-1
# Optional: authenticate with an API key
judge.chatModel.apiKey=your-api-key
# Or use AWS credentials instead of apiKey:
# judge.chatModel.credentials.accessKey=your-access-key
# judge.chatModel.credentials.secretKey=your-secret-key
```

</TabItem>

<TabItem value='openai-compatible'>

Use this provider for local models (such as [Ollama](https://ollama.com/)) or any API that follows the OpenAI format.

:::tip
If both `api-key` and a custom `Authorization` header are set, the custom header takes precedence.
:::

##### Spring Boot Starter

```yaml
camunda:
  process-test:
    judge:
      chat-model:
        provider: "openai-compatible"
        model: "llama3"
        base-url: "http://localhost:11434/v1"
        # api-key is optional for local providers
        # Optional: custom HTTP headers
        headers:
          X-Custom-Header: "custom-value"
```

##### Java client

```properties
judge.chatModel.provider=openai-compatible
judge.chatModel.model=llama3
judge.chatModel.baseUrl=http://localhost:11434/v1
# judge.chatModel.apiKey is optional for local providers
# Optional: custom HTTP headers
judge.chatModel.headers.X-Custom-Header=custom-value
```

</TabItem>

<TabItem value='azure-openai'>

The `model` property corresponds to your Azure
[deployment name](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/create-resource#deploy-a-model).
If no API key is provided, the provider falls back to
[`DefaultAzureCredential`](https://learn.microsoft.com/en-us/java/api/com.azure.identity.defaultazurecredential).

##### Spring Boot Starter

```yaml
camunda:
  process-test:
    judge:
      chat-model:
        provider: "azure-openai"
        model: "my-gpt-4o-deployment"
        endpoint: "https://my-resource.openai.azure.com/"
        # api-key is optional; if omitted, DefaultAzureCredential is used
        api-key: "your-api-key"
```

##### Java client

```properties
judge.chatModel.provider=azure-openai
judge.chatModel.model=my-gpt-4o-deployment
judge.chatModel.endpoint=https://my-resource.openai.azure.com/
# api-key is optional; if omitted, DefaultAzureCredential is used
judge.chatModel.apiKey=your-api-key
```

</TabItem>

<TabItem value='custom'>

For providers not listed above, use a custom provider name and pass arbitrary properties. These properties are available
to SPI implementations through `ProviderConfig.getCustomProperties()`. See
[Custom ChatModelAdapter](configuration.md#custom-chatmodeladapter) for implementation details.

##### Spring Boot Starter

```yaml
camunda:
  process-test:
    judge:
      chat-model:
        provider: "my-generic"
        model: "custom-model"
        custom-properties:
          endpoint: "http://localhost:8080"
          api-version: "2024-01"
```

##### Java client

```properties
judge.chatModel.provider=my-generic
judge.chatModel.model=custom-model
judge.chatModel.customProperties.endpoint=http://localhost:8080
judge.chatModel.customProperties.api-version=2024-01
```

</TabItem>

</Tabs>

For the full property reference, see [judge configuration](configuration.md#judge-configuration).

### Basic usage

After the agent completes, use a judge assertion to verify that the output meets a natural language expectation:

```java
@Test
void shouldProduceMeaningfulResponse() {
    // given: register conditional behaviors for tool tasks
    // ... (see Handle non-deterministic flows above)

    // when: start the process
    ProcessInstanceEvent processInstance = client.newCreateInstanceCommand()
        .bpmnProcessId("ai-agent-chat-with-tools")
        .latestVersion()
        .variables(Map.of("prompt", "What is the current date?"))
        .send()
        .join();

    // then: the agent produced a response that contains the date
    assertThat(processInstance).isCompleted();
    assertThat(processInstance)
        .hasVariableSatisfiesJudge("agentContext",
            "Contains a response that mentions today's date.");
}
```

### Custom threshold

Use `withJudgeConfig` to set a stricter threshold for individual assertions:

```java
assertThat(processInstance)
    .withJudgeConfig(config -> config.withThreshold(0.8))
    .hasVariableSatisfiesJudge("agentContext",
        "Contains at least two recipe suggestions with ingredient lists.");
```

### Custom prompt

You can replace the default evaluation criteria with a custom prompt. The custom prompt replaces only the evaluation
criteria. The system still controls the expectation and value injection, the scoring rubric, and the JSON output format.

Set a custom prompt globally in configuration:

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

```yaml
camunda:
  process-test:
    judge:
      custom-prompt: "You are a domain expert evaluating financial data accuracy."
```

</TabItem>

<TabItem value='java-client'>

```properties
judge.customPrompt=You are a domain expert evaluating financial data accuracy.
```

</TabItem>

</Tabs>

Or override the prompt for a single assertion:

```java
assertThat(processInstance)
    .withJudgeConfig(config -> config
        .withCustomPrompt("You are a domain expert evaluating financial data accuracy."))
    .hasVariableSatisfiesJudge("result", "Contains valid totals.");
```

For the full assertion API, see [Assertions](assertions.md#hasvariablesatisfiesjudge).

## Next steps

- See [Assertions](assertions.md) for the full assertion API reference, including all judge assertion methods.
- See [Configuration](configuration.md#judge-configuration) for the complete property reference for judge settings and chat model providers.
- See [Utilities](utilities.md#conditional-behavior) for the full conditional behavior API, including chained actions and lifecycle details.
