---
id: test-ai-agents
title: Test your AI agents with CPT
sidebar_label: Test with CPT
description: "Test your AI agent processes in Camunda 8 with Camunda Process Test (CPT)."
keywords: ["agentic ai", "AI agents", "Camunda Process Test"]
toc_max_heading_level: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Test your AI agent processes in Camunda 8 with [Camunda Process Test (CPT)](/apis-tools/testing/getting-started.md).

## About

AI agent processes are non-deterministic: the [AI Agent connector](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) inside an [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) decides at runtime which tools to invoke and in what order, and its free-text output varies across runs.

In this guide, you will build integration tests that keep the AI agent and LLM interaction real while mocking external tool executions, using the following CPT features:

- [Conditional behavior](/apis-tools/testing/utilities.md#conditional-behavior): Reacts to whichever tasks the agent activates, instead of blocking on a single hard-coded execution order. This addresses non-deterministic control flow.
- [Judge](/apis-tools/testing/assertions.md#hasvariablesatisfiesjudge) and [semantic similarity assertions](/apis-tools/testing/assertions.md#hasvariablesimilarto): Verify AI-generated output.

After completing this guide, you will be able to test your AI agents using CPT.

## Prerequisites

- You use Camunda 8.9+.
- You use the Camunda Process Test Spring Boot Starter.
- You have [Camunda Process Test set up](/apis-tools/testing/getting-started.md).
- You have downloaded the [AI Agent Chat With Tools](https://marketplace.camunda.com/en-US/apps/587865) process to your local machine.

:::important
This guide is a follow-up to [build your first AI agent](/guides/getting-started-agentic-orchestration.md), in which you use the same example AI agent process. We recommend completing that guide first. However, you can also apply this guide to other AI agent process implementations.
:::

## Step 1: Prepare the example AI agent blueprint

Place the BPMN file and any associated forms for your AI agent process in the `src/main/resources` directory of your Spring Boot project. Create it if it does not already exist.

You can organize files into subdirectories such as `bpmn/` and `forms/`.

## Step 2: Configure the LLM provider and connectors

Judge assertions send a process variable and a natural language expectation to a configured LLM, which scores how well they match. The assertion passes if the score meets a configurable threshold. This avoids brittle string-matching on free-text AI output.

For this testing style, first configure both the connector runtime and the judge LLM. The goal is to keep the AI agent and LLM interaction real while disabling outbound connector execution for the tool calls you want to control in the test.

### Configure the connector runtime

Add the following connector runtime configuration to your test configuration, for example in `src/test/resources/application.yaml` or as inline properties on `@SpringBootTest`. For the full property reference, see the [CPT configuration docs](/apis-tools/testing/configuration.md).

```yaml
camunda:
  process-test:
    assertion:
      timeout: PT1M
    connectors-enabled: true
    connectors-env-vars:
      CAMUNDA_CONNECTOR_POLLING_ENABLED: "false"
      CONNECTOR_OUTBOUND_DISCOVERY_DISABLED: "true"
      CONNECTOR_OUTBOUND_DISABLED: "io.camunda:http-json:1"
```

With this setup:

- The assertion timeout is increased to one minute. AI agent processes involve LLM interactions and typically take longer than standard BPMN processes.
- CPT starts the connector runtime needed by the AI agent process.
- Outbound connector executions, such as the HTTP JSON connector, are disabled so tool behavior can be controlled by the test with conditional behavior.

If your AI agent tools use different outbound connectors, adjust `CONNECTOR_OUTBOUND_DISABLED` accordingly.

### Configure the LLM provider

Configure the LLM provider for the judge. The judge does not need the same provider or model as your AI agent. A lighter model often works well since the judge context is much smaller.

<Tabs groupId="judge-provider" defaultValue="amazon-bedrock" queryString values={[
{label: 'Amazon Bedrock', value: 'amazon-bedrock' },
{label: 'Ollama', value: 'openai-compatible' }
]}>

<TabItem value='amazon-bedrock'>

```yaml
camunda:
  process-test:
    connectors-secrets:
      AWS_BEDROCK_ACCESS_KEY: ${AWS_LLM_BEDROCK_ACCESS_KEY}
      AWS_BEDROCK_SECRET_KEY: ${AWS_LLM_BEDROCK_SECRET_KEY}
    judge:
      chat-model:
        provider: "amazon-bedrock"
        model: "eu.anthropic.claude-haiku-4-5-20251001-v1:0"
        region: "eu-central-1"
        credentials:
          access-key: ${AWS_LLM_BEDROCK_ACCESS_KEY}
          secret-key: ${AWS_LLM_BEDROCK_SECRET_KEY}
```

:::note Bedrock IAM requirements
The AWS principal must have `bedrock:InvokeModel` permission on each model ARN you configure, and each model must be [enabled for access](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html) in the configured region. If you also configure an embedding model through Bedrock for [semantic similarity assertions](#verify-with-semantic-similarity), it requires a separate IAM grant. See [Troubleshooting](/apis-tools/testing/configuration.md#amazon-bedrock-accessdeniedexception) if you encounter a 403 `AccessDeniedException`.
:::

</TabItem>

<TabItem value='openai-compatible'>

Use this provider for [Ollama](https://ollama.com/).

```yaml
camunda:
  process-test:
    judge:
      chat-model:
        provider: "openai-compatible"
        model: "gpt-oss:20b"
        base-url: "http://localhost:11434/v1"
```

</TabItem>

</Tabs>

:::tip Manage secrets safely
Avoid committing credentials to your test configuration files. CPT properties support [Spring's external configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html), so you can inject secrets through environment variables, CI/CD secret stores, or other techniques. See the [CPT configuration reference](/apis-tools/testing/configuration.md) for details.
:::

The AI agent can still interact with the configured LLM provider, while the test controls the tool executions.

For the full property reference, see [judge configuration](/apis-tools/testing/configuration.md#judge-configuration).

## Step 3: Set up the test class

Add the `@Deployment` annotation to your Spring Boot application class to declare which resources CPT should deploy:

```java
@SpringBootApplication
@Deployment(resources = {"classpath*:/bpmn/**/*.bpmn", "classpath*:/forms/**/*.form"})
public class MyApplication {}
```

Then create a test class annotated with `@SpringBootTest` and `@CamundaSpringProcessTest`, and inject the `CamundaClient` and `CamundaProcessTestContext`:

```java
@SpringBootTest(classes = MyApplication.class)
@CamundaSpringProcessTest
class AiAgentProcessTest {

    @Autowired
    private CamundaClient client;

    @Autowired
    private CamundaProcessTestContext processTestContext;
}
```

For the full setup including dependencies and project structure, see [Getting started with Camunda Process Test](/apis-tools/testing/getting-started.md).

## Step 4: Handle non-deterministic flow paths

In this guide, the test uses the prompt `"Give me a joke! Greet Ervin as an introduction"`. In response, the agent:

- Calls `List Users` and `Jokes API` in any order.
- Collects feedback through the `User Feedback` user task.

With [conditional behavior](/apis-tools/testing/utilities.md#conditional-behavior), you can register background reactions that monitor the process state and execute actions as conditions are met, without blocking the test thread. Register behaviors before starting the process; they then react independently as the process progresses.

Each behavior watches for a specific element to become active and then completes it with test data. If the agent never activates that element, the behavior simply never triggers and the test does not stall.

### Complete tool tasks

Register a behavior for each tool task the agent might invoke. In this integration test, these behaviors stand in for external tool executions such as REST connector calls.

First, define records for the tool call results:

```java
record User(int id, String name, String username) {}
```

Register a behavior that completes the `List Users` tool with a mock user list when the agent invokes it:

```java
processTestContext
    .when(
        () -> assertThatProcessInstance(ProcessInstanceSelectors.byProcessId("ai-agent-chat-with-tools"))
            .hasActiveElements("ListUsers"))
    .as("complete ListUsers")
    .then(
        () -> processTestContext.completeJob(
            JobSelectors.byElementId("ListUsers"),
            Map.of("toolCallResult",
                List.of(
                    new User(1, "Leanne Graham", "Bret"),
                    new User(2, "Ervin Howell", "Antonette")))));
```

Register a behavior that completes the `Jokes API` tool. This behavior uses chained `.then()` calls to return different jokes on repeated invocations:

```java
String firstJoke = "Why did the workflow cross the road? To get to the happy path.";
String secondJoke = "Why did the BPMN diagram apply for a job? It had excellent flow experience.";

processTestContext
    .when(
        () -> assertThatProcessInstance(ProcessInstanceSelectors.byProcessId("ai-agent-chat-with-tools"))
            .hasActiveElements("Jokes_API"))
    .as("complete jokes tool")
    .then(
        () -> processTestContext.completeJob(
            byElementId("Jokes_API"), Map.of("toolCallResult", firstJoke)))
    .then(
        () -> processTestContext.completeJob(
            byElementId("Jokes_API"), Map.of("toolCallResult", secondJoke)));
```

### Complete user tasks

The `User Feedback` user task is outside the agent and prompts the user to approve the agent output or request a different one.

Use chained `.then()` calls when a behavior should produce different results on repeated invocations: the first action is consumed on the first invocation, and the last action repeats for all subsequent invocations.

For example, register a behavior that first rejects the joke with a follow-up request, then approves the result on the next invocation:

```java
processTestContext
    .when(
        () -> assertThatProcessInstance(ProcessInstanceSelectors.byProcessId("ai-agent-chat-with-tools"))
            .hasActiveElements("User_Feedback"))
    .as("feedback loop")
    .then(
        () -> processTestContext.completeUserTask(
            "User_Feedback",
            Map.of(
                "userSatisfied", false,
                "followUpInput", "This joke is bad, send Ervin a better joke")))
    .then(
        () -> processTestContext.completeUserTask(
            "User_Feedback", Map.of("userSatisfied", true)));
```

:::important
Each behavior's action should resolve the process state that the condition checks for. For example, if the condition checks for an active user task, the action should complete that task. Otherwise the behavior may execute repeatedly.
:::

For the full conditional behavior API, see [Utilities](/apis-tools/testing/utilities.md#conditional-behavior).

## Step 5: Verify the agent output

You can use two types of assertions to verify the agent output:

- **[Judge assertions](/apis-tools/testing/assertions.md#hasvariablesatisfiesjudge)** verify AI-generated output or tool execution results with a judge LLM that scores whether a value satisfies a natural-language expectation.
- **[Semantic similarity assertions](/apis-tools/testing/assertions.md#hasvariablesimilarto)** verify AI-generated output against a reference text using embeddings and cosine similarity. They are a deterministic, lower-cost alternative to judge assertions.

### When to use judge vs. similarity

| Assertion                                               | Best for                                                                                                                                                                                                                                | Cost                                                                                                                  |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [Judge](#verify-with-judge-assertions)                  | Open-ended natural-language criteria, multi-part expectations, structured data, Camunda document content (with [document attachment](/apis-tools/testing/configuration.md#document-attachment) enabled), anything that needs reasoning. | One extra LLM call per assertion. Score and explanation depend on the configured judge model.                         |
| [Semantic similarity](#verify-with-semantic-similarity) | Checks where a concrete reference text is close to a variable's actual content. Deterministic and fast.                                                                                                                                 | One embedding call per value. No reasoning step, so it cannot evaluate criteria that aren't expressed in the wording. |

:::tip

- Use judge assertions when it feels natural to express the expectation in natural language.
- Use similarity assertions when the expected answer is itself a sample string.
  :::

#### Limitations

- Judge assertions support Camunda document evaluation when [document attachment](/apis-tools/testing/configuration.md#document-attachment) is enabled. When enabled, document references in the variable are resolved, and their content is passed to the judge as structured content blocks.

- Semantic similarity assertions operate on the **serialized JSON string** of a process variable and cannot evaluate non-text content, such as [Camunda documents](/components/document-handling/getting-started.md) or other embedded binaries. In those cases, only metadata or encoded strings reach the assertion.

- Semantic similarity assertions compare the serialized variable against the expected string using a vector space. Highly structured variables, such as JSON objects with many fields, may score lower than expected even when the semantic meaning matches.

### Verify with judge assertions

Use a judge assertion to verify the agent output satisfies a natural language expectation.

The following example registers the conditional behaviors from [Step 4](#step-4-handle-non-deterministic-flow-paths), starts the process with the prompt `"Give me a joke! Greet Ervin as an introduction"`, and then asserts that the agent completed the scenario correctly:

```java
@Test
void shouldSendErvinAJoke() {
    ProcessInstanceEvent processInstance = client.newCreateInstanceCommand()
        .bpmnProcessId("ai-agent-chat-with-tools")
        .latestVersion()
        .variables(Map.of("inputText", "Give me a joke! Greet Ervin as an introduction"))
        .send()
        .join();

    assertThat(processInstance).isCompleted();
    assertThat(processInstance)
        .hasVariableSatisfiesJudge(
            "agent",
            """
            The agent correctly identified Ervin by calling ListUsers.
            The agent fetched a joke using Jokes_API.
            After the user rejected the first joke and asked for another one, the
            agent offered a second, different joke.
            """);
}
```

The expectation is a plain-text description of what the agent should have done. The judge does not compare strings literally. It evaluates whether the actual variable content satisfies the expectation semantically, so different phrasing or formatting in the agent's output does not cause false failures.

The judge evaluates matches using the following scoring scale:

| Score | Meaning                                                                                                                |
| ----- | ---------------------------------------------------------------------------------------------------------------------- |
| 1.0   | Fully satisfied semantically. Different wording or formatting that conveys the same meaning counts as fully satisfied. |
| 0.75  | Satisfied in substance with only minor differences that do not affect correctness.                                     |
| 0.5   | Partially satisfied. Some required elements are present but others are missing or incorrect.                           |
| 0.25  | Mostly not satisfied. Only marginal relevance.                                                                         |
| 0.0   | Not satisfied at all, or the actual value is empty.                                                                    |

The LLM may return any value between these anchor points (for example, 0.6 or 0.85). The default threshold is 0.5. This means the assertion passes when the response is at least partially satisfied according to the rubric, which is a practical default for AI-generated output that may vary in wording or completeness across runs. Use a higher threshold when the response must satisfy stricter semantic requirements. You can change the threshold globally in the [judge configuration](/apis-tools/testing/configuration.md#judge-configuration) or per assertion using `withJudgeConfig`.

If the assertion fails, for example, because the agent made up its own joke instead of calling the `Jokes API` tool, or the feedback was not handled correctly, the judge returns a low score with an explanation of which parts of the expectation were not met. This gives you a clear, human-readable failure message instead of a generic assertion error.

#### Tune the judge evaluation

Use `withJudgeConfig` to set a stricter threshold for individual assertions:

```java
assertThat(processInstance)
    .withJudgeConfig(config -> config.withThreshold(0.8))
    .hasVariableSatisfiesJudge(
        "agent",
        "The email body contains a joke addressed to Ervin.");
```

You can also replace the default evaluation criteria with a custom prompt. The custom prompt replaces only the evaluation criteria. The system still controls the expectation and value injection, the scoring rubric, and the JSON output format.

Set a custom prompt globally in configuration:

```yaml
camunda:
  process-test:
    judge:
      custom-prompt: "You are evaluating whether an AI agent correctly identified the intended recipient, used the right tools, and produced an appropriate email response."
```

Or override the prompt for a single assertion:

```java
assertThat(processInstance)
    .withJudgeConfig(config -> config
        .withCustomPrompt("You are evaluating whether an AI agent correctly identified the intended recipient, used the right tools, and produced an appropriate email response."))
    .hasVariableSatisfiesJudge("agent", "The email body contains a joke addressed to Ervin.");
```

For the full assertion API, see [Assertions](/apis-tools/testing/assertions.md#hasvariablesatisfiesjudge).

### Verify with semantic similarity assertions

Use a semantic similarity assertion to verify the agent output.
Semantic similarity assertions are a deterministic, lower-cost alternative to [judge assertions](#step-5-verify-with-judge-assertions).

Instead of calling a judge LLM at assertion time, they convert both the actual variable value and the expected text to vector embeddings and compare them using cosine similarity.
They work best when you can express the expected result as a concrete sample string.

### Configure the embedding model

The embedding model does not need to match the AI agent's LLM or the judge model. Depending on your requirements, a lightweight model is often good enough for a good test result.

Add the embedding model configuration to your test configuration alongside the CPT settings from [Step 2](#step-2-configure-the-llm-provider-and-connectors):

<Tabs groupId="similarity-provider" defaultValue="amazon-bedrock-similarity" queryString values={[
{label: 'Amazon Bedrock', value: 'amazon-bedrock-similarity' },
{label: 'Ollama', value: 'openai-compatible-similarity' }
]}>

<TabItem value='amazon-bedrock-similarity'>

```yaml
camunda:
  process-test:
    similarity:
      embedding-model:
        provider: "amazon-bedrock"
        model: "amazon.titan-embed-text-v2:0"
        region: "eu-central-1"
        dimensions: 256
        credentials:
          access-key: ${AWS_LLM_BEDROCK_ACCESS_KEY}
          secret-key: ${AWS_LLM_BEDROCK_SECRET_KEY}
```

:::note Bedrock IAM requirements
The AWS principal must have `bedrock:InvokeModel` permission on the embedding model ARN, and the model must be [enabled for access](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html) in the configured region. This is a separate grant from the judge chat model. See [Troubleshooting](/apis-tools/testing/configuration.md#amazon-bedrock-accessdeniedexception) if you encounter a 403 `AccessDeniedException`.
:::

</TabItem>

<TabItem value='openai-compatible-similarity'>

Use this provider for [Ollama](https://ollama.com/).

```yaml
camunda:
  process-test:
    similarity:
      embedding-model:
        provider: "openai-compatible"
        model: "<your-model-id>"
        base-url: "http://localhost:11434/v1"
```

</TabItem>

</Tabs>

For the full property reference, see [semantic similarity configuration](/apis-tools/testing/configuration.md#semantic-similarity-configuration).

### Add a similarity assertion

With the embedding model configured, use `hasVariableSimilarTo` as a complementary check on the `responseText` variable of the `User_Feedback` task instance:

```java
assertThat(processInstance)
    .hasVariableSimilarTo(
        "User_Feedback",
        "responseText",
        """
          Hey Ervin! Here is a joke for you:
          Why did the workflow cross the road? To get to the happy path.
        """);
```

The assertion converts both strings to embeddings, applies the default text preprocessors (lowercase, Unicode NFC, and whitespace normalization), and compares cosine similarity against the default threshold of 0.5.

Override the minimal success threshold for a single assertion if you require a higher precision for some assertions:

```java
assertThat(processInstance)
    .withSemanticSimilarityConfig(config -> config.withThreshold(0.8))
    .hasVariableSimilarTo(
        "User_Feedback",
        "responseText",
        """
          Hey Ervin! Here is a joke for you:
          Why did the workflow cross the road? To get to the happy path.
        """);
```

## Next steps

Now that you know how to test your AI agents, you can:

- Learn more about [Camunda agentic orchestration](/components/agentic-orchestration/agentic-orchestration-overview.md) and the [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md).
- Dive into [Camunda Process Test assertions](/apis-tools/testing/assertions.md).
- Review [judge](/apis-tools/testing/configuration.md#judge-configuration) and [semantic similarity](/apis-tools/testing/configuration.md#semantic-similarity-configuration) configurations for the full property references.
- Explore [conditional behavior](/apis-tools/testing/utilities.md#conditional-behavior), including chained actions and lifecycle details.
