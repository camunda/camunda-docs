---
id: testing-agentic-processes
title: Testing agentic processes
description: "A guide for testing non-deterministic, agentic Camunda processes with CPT."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Agentic processes use AI agents that decide at runtime which actions to take. This makes their execution path and output content non-deterministic, which requires a different testing approach than traditional BPMN processes. This guide walks through the CPT features that address these challenges.

## Why agentic processes need a different testing approach

Traditional BPMN processes follow a predictable path: given the same input, they execute the same sequence of tasks and produce the same output. Tests can assert on specific tasks in a known order and compare variable values with exact equality checks.

Agentic processes break both of these assumptions. A process that uses the [AI Agent connector](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) inside an [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) lets the AI agent decide at runtime which tools to invoke and in what order. The same prompt may lead to different execution paths across runs. On top of that, the agent produces free-text output whose exact wording varies every time.

This creates two concrete problems for tests:

- **Non-deterministic execution order.** Standard CPT assertions are blocking: they wait for a specific condition before the test continues. A test that blocks on one particular tool task will stall if the agent chooses a different tool first, or skips that tool entirely.
- **Non-deterministic output content.** Equality-based variable assertions cannot reliably verify free-text responses. The agent may phrase the same correct answer differently on each run, causing exact-match checks to fail even when the response is valid.

## Prerequisites

This guide requires Camunda 8.9+ with [CPT set up](getting-started.md).

[Judge assertions](#judge-assertions) require an LLM provider. CPT provides an optional
[LangChain4j](https://docs.langchain4j.dev/) integration module that ships with preconfigured support for
[several providers](configuration.md#judge-configuration). LangChain4j requires Java 17+.

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

Camunda Process Test Spring includes the LangChain4j providers as a transitive dependency. No additional
dependency is needed.

</TabItem>

<TabItem value='java-client'>

Add the `camunda-process-test-langchain4j` dependency to your project:

```xml
<dependency>
    <groupId>io.camunda</groupId>
    <artifactId>camunda-process-test-langchain4j</artifactId>
    <scope>test</scope>
</dependency>
```

</TabItem>

</Tabs>

If you provide a custom `ChatModelAdapter` instead (see
[Custom ChatModelAdapter](configuration.md#custom-chatmodeladapter)), this module is not required.

## Example process

The examples in this guide test the **AI Agent Chat With Tools** process from the [Build your first AI agent](/guides/getting-started-agentic-orchestration.md) guide. See [About the example AI agent process](/guides/getting-started-agentic-orchestration.md#about-the-example-ai-agent-process) for the full process structure.

The test scenario is "Send Ervin a joke." To fulfill this request the agent could call `ListUsers` and `LoadUserByID` to find Ervin's email address, or call `Jokes_API` to fetch a joke, and it can do so in any order. The agent then presents the email for human review via the `AskHumanToSendEmail` user task, and after it finishes a `User_Feedback` task lets the user accept or follow up. A test cannot predict which tools the agent picks or in what sequence, so the sections below show how to handle this.

## Handle non-deterministic flows

[Conditional behavior](utilities.md#conditional-behavior) lets you register background reactions that monitor the process state and execute actions as conditions are met, without blocking the test thread. Register behaviors before starting the process, and they react independently as the process progresses.

Each behavior watches for a specific element to become active and then completes it with test data. If the agent never activates that element, the behavior simply never triggers and the test does not stall.

#### Complete tool tasks

Register a behavior for each tool task the agent might invoke. The following two behaviors provide mock responses for the user lookup tools:

```java
// given: complete ListUsers when the agent invokes it
processTestContext
    .when(
        () -> assertThatProcessInstance(ProcessInstanceSelectors.byProcessId("ai-agent-chat"))
            .hasActiveElements("ListUsers"))
    .as("complete ListUsers")
    .then(
        () -> processTestContext.completeJob(
            JobSelectors.byElementId("ListUsers"),
            Map.of("toolCallResult",
                List.of(
                    Map.of("id", 1, "name", "Leanne Graham"),
                    Map.of("id", 2, "name", "Ervin Howell")))));

// given: complete LoadUserByID with Ervin's details
processTestContext
    .when(
        () -> assertThatProcessInstance(ProcessInstanceSelectors.byProcessId("ai-agent-chat"))
            .hasActiveElements("LoadUserByID"))
    .as("complete LoadUserByID")
    .then(
        () -> processTestContext.completeJob(
            JobSelectors.byElementId("LoadUserByID"),
            Map.of("toolCallResult",
                Map.of("id", 2,
                    "name", "Ervin Howell",
                    "email", "Shanna@melissa.tv"))));
```

#### Complete user tasks

The `AskHumanToSendEmail` user task requires human approval. Register a behavior that auto-approves the email when the task appears:

```java
// given: auto-approve the email when the human review task appears
processTestContext
    .when(
        () -> assertThatProcessInstance(ProcessInstanceSelectors.byProcessId("ai-agent-chat"))
            .hasActiveElements("AskHumanToSendEmail"))
    .as("approve email")
    .then(
        () -> processTestContext.completeUserTask(
            "AskHumanToSendEmail", Map.of("emailOk", true)));
```

:::important
Each behavior's action should resolve the process state that the condition checks for. For example, if the condition checks for an active user task, the action should complete that task. Otherwise the behavior may execute repeatedly.
:::

#### Chained actions for repeated invocations

Use chained `.then()` calls when a behavior should produce different results on repeated invocations. The first action is consumed on the first invocation, and the last action repeats for all subsequent invocations.

In this example, the first feedback rejection sends the agent back with a follow-up request, and the second feedback loop approves the result:

```java
// given: first reject, then approve in the feedback loop
processTestContext
    .when(
        () -> assertThatProcessInstance(ProcessInstanceSelectors.byProcessId("ai-agent-chat"))
            .hasActiveElements("User_Feedback"))
    .as("feedback loop")
    // 1) first invocation: reject and ask for a better joke
    .then(
        () -> processTestContext.completeUserTask(
            "User_Feedback",
            Map.of(
                "userSatisfied", false,
                "followUpInput", "This joke is bad, send Ervin a better joke")))
    // 2) subsequent invocations: approve
    .then(
        () -> processTestContext.completeUserTask(
            "User_Feedback", Map.of("userSatisfied", true)));
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

Configure the chat model provider using the tabs below.

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

After the process completes, use a judge assertion to verify that the agent's output satisfies a natural language expectation. The following example checks the full "Send Ervin a joke" scenario, including tool usage, email content, and the feedback loop:

```java
@Test
void shouldSendErvinAJoke() {
    // given: register conditional behaviors for tool tasks, email approval, and feedback
    // ... (see Handle non-deterministic flows above)

    // when: start the process
    ProcessInstanceEvent processInstance = client.newCreateInstanceCommand()
        .bpmnProcessId("ai-agent-chat")
        .latestVersion()
        .variables(Map.of("prompt", "Send Ervin a joke"))
        .send()
        .join();

    // then: the agent completed the full scenario correctly
    assertThat(processInstance).isCompleted();
    assertThat(processInstance)
        .hasVariableSatisfiesJudge(
            "agent",
            """
            The agent correctly identified Ervin by calling the following tools:
            1. ListUsers
            2. LoadUserByID with id=2.
            Furthermore, the agent called AskHumanToSendEmail and the email
            should have been sent successfully!
            The mail must contain a joke.
            After the user rejected the first joke and asked for another one, the
            agent offered a second, different joke.
            """);
}
```

The expectation is a plain-text description of what the agent should have done. The judge does not compare strings literally. It evaluates whether the actual variable content satisfies the expectation semantically, so different phrasing or formatting in the agent's output does not cause false failures.

If the assertion fails, for example because the agent never called `LoadUserByID` or sent the email to the wrong address, the judge returns a low score with an explanation of which parts of the expectation were not met. This gives you a clear, human-readable failure message instead of a generic assertion error.

### Custom threshold

Use `withJudgeConfig` to set a stricter threshold for individual assertions:

```java
assertThat(processInstance)
    .withJudgeConfig(config -> config.withThreshold(0.8))
    .hasVariableSatisfiesJudge(
        "agent",
        "The email body contains a joke addressed to Ervin.");
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

- [Assertions](assertions.md) documents the full assertion API reference, including all judge assertion methods.
- [Configuration](configuration.md#judge-configuration) provides the complete property reference for judge settings and chat model providers.
- [Utilities](utilities.md#conditional-behavior) describes the full conditional behavior API, including chained actions and lifecycle details.
