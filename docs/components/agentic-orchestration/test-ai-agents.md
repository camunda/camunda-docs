---
id: test-ai-agents
title: Test your AI agents with CPT
sidebar_label: Test your AI agents
description: "Test non-deterministic AI agent processes in Camunda 8 with Camunda Process Test."
keywords: ["agentic ai", "AI agents", "Camunda Process Test"]
toc_max_heading_level: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Test your AI agent processes in Camunda 8 with [Camunda Process Test (CPT)](/apis-tools/testing/getting-started.md).

## About

Traditional BPMN processes follow a predictable path: given the same input, they execute the same sequence of tasks and produce the same output. Tests can assert on specific tasks in a known order and compare variable values with exact equality checks.

AI agent processes break both assumptions. A process that uses the [AI Agent connector](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) inside an [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) lets the AI agent decide at runtime which tools to invoke and in what order. The same prompt may lead to different execution paths across runs. On top of that, the agent produces free-text output whose exact wording varies every time.

This poses two challenges for testing:

- **Non-deterministic execution order**: Standard CPT assertions are blocking, since they wait for a specific condition before the test continues. A test that blocks on one particular tool task will stall if the agent chooses a different tool first, or skips that tool entirely.
- **Non-deterministic output content**: Equality-based variable assertions cannot reliably verify free-text responses. The agent may phrase the same correct answer differently on each run, causing exact-match checks to fail even when the response is valid.

In practice, CPT addresses these issues with two complementary features:

- Use [conditional behavior](/apis-tools/testing/utilities.md#conditional-behavior) to react to whichever tool or user tasks the agent activates, without hard-coding a single execution order.
- Use [judge assertions](/apis-tools/testing/assertions.md#hasvariablesatisfiesjudge) to check AI-generated output with a judge LLM. Instead of comparing exact wording, the judge scores whether the response satisfies a natural-language expectation, which makes assertions more robust for free-text output.

:::note
This guide provides an integration-test style setup: the AI agent process and its LLM interaction are real, while tool executions (such as REST connector calls) are mocked. This gives you broader coverage than a traditional mock-based unit test, because the test still validates prompting, orchestration, and semantic output quality end to end.
:::

In this guide, you will:

- Run an integration test that keeps the AI agent and LLM interaction real while mocking external tool executions.
- Handle non-deterministic execution paths in AI agent processes with conditional behavior, without hard-coding a single execution order.
- Verify free-text agent output with judge assertions.

After completing this guide, you will be able to test AI agent processes whose control flow and outputs vary across runs.

## Prerequisites

- You use Camunda 8.9+.
- You use the Camunda Process Test Spring Boot Starter.
- You have [Camunda Process Test set up](/apis-tools/testing/getting-started.md).
- You have an LLM provider configured for [judge assertions](#step-2-configure-the-llm-provider-and-connectors). CPT ships with preconfigured [LangChain4j](https://docs.langchain4j.dev/) support for [several providers](/apis-tools/testing/configuration.md#judge-configuration) (Java 17+).

:::important
This guide is a follow-up to [Build your first AI agent](../../guides/getting-started-agentic-orchestration.md), in which you use the same example AI agent process, **AI Agent Chat With Tools**. Completing that guide first is recommended. However, you can also apply this guide to other AI agent process implementations.
:::

:::note
This guide focuses on the Spring-based setup because it is the most direct way to run this style of integration test with CPT. If you use CPT without Spring, review the [configuration reference](/apis-tools/testing/configuration.md) and adapt the same connector and judge settings for your test environment.
:::

## Step 1: Prepare the example AI agent blueprint

The examples in this guide test the **AI Agent Chat With Tools** process from the [Build your first AI agent](/guides/getting-started-agentic-orchestration.md) guide. See [About the example AI agent process](/guides/getting-started-agentic-orchestration.md#about-the-example-ai-agent-process) for the full process structure.

The test scenario is "Send Ervin a joke." To fulfill this request the agent could call `ListUsers` and `LoadUserByID` to find Ervin's email address, or call `Jokes_API` to fetch a joke, and it can do so in any order. The agent then presents the email for human review via the `AskHumanToSendEmail` user task, and after it finishes a `User_Feedback` task lets the user accept or follow up.

This test intentionally keeps the AI agent execution real, including the interaction with the configured LLM. At the same time, it mocks tool executions so the test does not depend on external systems such as REST endpoints behind connector-based tools. That balance makes the test more realistic than a unit test that mocks the whole agent interaction, while still keeping the execution stable and controlled.

## Step 2: Configure the LLM provider and connectors

Judge assertions send a process variable and a natural language expectation to a configured LLM, which scores how well they match. The assertion passes if the score meets a configurable threshold. This avoids brittle string-matching on free-text AI output.

For this testing style, configure both the connector runtime and the judge LLM first. The goal is to keep the AI agent and LLM interaction real, while disabling outbound connector execution for the tool calls you want to control in the test.

### Configure the connector runtime

Add the connector runtime configuration to your test resource file (`src/test/resources/application.yaml`). For the full property reference, see the [CPT configuration docs](/apis-tools/testing/configuration.md).

```yaml
camunda:
  process-test:
    connectors-enabled: true
    connectors-env-vars:
      CAMUNDA_CONNECTOR_POLLING_ENABLED: "false"
      CONNECTOR_OUTBOUND_DISCOVERY_DISABLED: "true"
      CONNECTOR_OUTBOUND_DISABLED: "io.camunda:http-json:1"
```

With this setup:

- CPT starts the connector runtime needed by the AI agent process.
- Outbound connector executions such as the HTTP JSON connector are disabled, so tool behavior can be controlled by the test with conditional behavior.

If your AI agent tools use different outbound connectors, adjust `CONNECTOR_OUTBOUND_DISABLED` accordingly.

### Configure the LLM provider

Configure the judge provider to match the model provider used by your AI agent process.

<Tabs groupId="judge-provider" defaultValue="amazon-bedrock" queryString values={[
{label: 'Amazon Bedrock', value: 'amazon-bedrock' },
{label: 'Ollama', value: 'openai-compatible' }
]}>

<TabItem value='amazon-bedrock'>

```yaml
camunda:
  process-test:
    connectors-secrets:
      AWS_BEDROCK_ACCESS_KEY: ${AWS_BEDROCK_ACCESS_KEY}
      AWS_BEDROCK_SECRET_KEY: ${AWS_BEDROCK_SECRET_KEY}
    judge:
      chat-model:
        provider: "amazon-bedrock"
        model: "eu.anthropic.claude-haiku-4-5-20251001-v1:0"
        region: "eu-central-1"
```

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

:::tip Manage secrets with environment variables
Avoid committing credentials to your test configuration files. CPT properties support [Spring's external configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html), so you can inject secrets through environment variables or a separate profile. See the [CPT configuration reference](/apis-tools/testing/configuration.md) for details.
:::

The AI agent can still interact with the configured LLM provider, while the test controls the tool executions.

For the full property reference, see [judge configuration](/apis-tools/testing/configuration.md#judge-configuration).

## Step 3: Handle non-deterministic flow paths

[Conditional behavior](/apis-tools/testing/utilities.md#conditional-behavior) lets you register background reactions that monitor the process state and execute actions as conditions are met, without blocking the test thread. Register behaviors before starting the process, and they react independently as the process progresses.

Each behavior watches for a specific element to become active and then completes it with test data. If the agent never activates that element, the behavior simply never triggers and the test does not stall.

### Complete tool tasks

Register a behavior for each tool task the agent might invoke. In this integration test, these behaviors stand in for external tool executions such as REST connector calls. The following two behaviors provide mock responses for the user lookup tools:

```java
// given: complete ListUsers when the agent invokes it
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
                    Map.of("id", 1, "name", "Leanne Graham"),
                    Map.of("id", 2, "name", "Ervin Howell")))));

// given: complete LoadUserByID with Ervin's details
processTestContext
    .when(
        () -> assertThatProcessInstance(ProcessInstanceSelectors.byProcessId("ai-agent-chat-with-tools"))
            .hasActiveElements("LoadUserByID"))
    .as("complete LoadUserByID")
    .then(
        () -> processTestContext.completeJob(
            JobSelectors.byElementId("LoadUserByID"),
            Map.of("toolCallResult",
                Map.of("id", 2,
                    "name", "Ervin Howell",
                    "email", "Shanna@melissa.tv"))));

// given: complete Jokes_API with two different jokes
processTestContext
    .when(
            () ->
            assertThatProcessInstance(ProcessInstanceSelectors.byProcessId(PROCESS_ID))
                .hasActiveElements("Jokes_API"))
    .as("complete jokes tool")
    .then(
        () -> processTestContext.completeJob(
        byElementId("Jokes_API"), Map.of("toolCallResult", FIRST_JOKE)))
    .then(
        () -> processTestContext.completeJob(
        byElementId("Jokes_API"), Map.of("toolCallResult", SECOND_JOKE)));
```

### Complete user tasks

The `AskHumanToSendEmail` user task requires human approval. Register a behavior that auto-approves the email when the task appears:

```java
// given: auto-approve the email when the human review task appears
processTestContext
    .when(
        () -> assertThatProcessInstance(ProcessInstanceSelectors.byProcessId("ai-agent-chat-with-tools"))
            .hasActiveElements("AskHumanToSendEmail"))
    .as("approve email")
    .then(
        () -> processTestContext.completeUserTask(
            "AskHumanToSendEmail", Map.of("emailOk", true)));
```

:::important
Each behavior's action should resolve the process state that the condition checks for. For example, if the condition checks for an active user task, the action should complete that task. Otherwise the behavior may execute repeatedly.
:::

### Handle repeated invocations

Use chained `.then()` calls when a behavior should produce different results on repeated invocations. The first action is consumed on the first invocation, and the last action repeats for all subsequent invocations.

In this example, the first feedback rejection sends the agent back with a follow-up request, and the second feedback loop approves the result:

```java
// given: first reject, then approve in the feedback loop
processTestContext
    .when(
        () -> assertThatProcessInstance(ProcessInstanceSelectors.byProcessId("ai-agent-chat-with-tools"))
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

For the full conditional behavior API, see [Utilities](/apis-tools/testing/utilities.md#conditional-behavior).

## Step 4: Verify agent output with judge assertions

After the process completes, use a judge assertion to verify that the agent's output satisfies a natural language expectation. The following example checks the full "Send Ervin a joke" scenario, including tool usage, email content, and the feedback loop:

```java
@Test
void shouldSendErvinAJoke() {
    // given: register conditional behaviors for tool tasks, email approval, and feedback
    // ... (see Step 3 above)

    // when: start the process
    ProcessInstanceEvent processInstance = client.newCreateInstanceCommand()
        .bpmnProcessId("ai-agent-chat-with-tools")
        .latestVersion()
        .variables(Map.of("inputText", "Send Ervin a joke"))
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

The judge evaluates matches using the following scoring scale:

| Score | Meaning                                                                                                                |
| ----- | ---------------------------------------------------------------------------------------------------------------------- |
| 1.0   | Fully satisfied semantically. Different wording or formatting that conveys the same meaning counts as fully satisfied. |
| 0.75  | Satisfied in substance with only minor differences that do not affect correctness.                                     |
| 0.5   | Partially satisfied. Some required elements are present but others are missing or incorrect.                           |
| 0.25  | Mostly not satisfied. Only marginal relevance.                                                                         |
| 0.0   | Not satisfied at all, or the actual value is empty.                                                                    |

The LLM may return any value between these anchor points (for example, 0.6 or 0.85). The default threshold is 0.5. This means the assertion passes when the response is at least partially satisfied according to the rubric, which is a practical default for AI-generated output that may vary in wording or completeness across runs. Use a higher threshold when the response must satisfy stricter semantic requirements. You can change the threshold globally in the [judge configuration](/apis-tools/testing/configuration.md#judge-configuration) or per assertion using `withJudgeConfig`.

If the assertion fails, for example because the agent never called `LoadUserByID` or sent the email to the wrong address, the judge returns a low score with an explanation of which parts of the expectation were not met. This gives you a clear, human-readable failure message instead of a generic assertion error.

## Step 5: Tune the judge evaluation

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

## Next steps

Now that you know how to test your AI agents, you can:

- Learn more about [Camunda Process Test assertions](/apis-tools/testing/assertions.md), including all judge assertion methods.
- Review [judge configuration](/apis-tools/testing/configuration.md#judge-configuration) for the full property reference and chat model provider settings.
- Explore [conditional behavior](/apis-tools/testing/utilities.md#conditional-behavior), including chained actions and lifecycle details.
- [Monitor your AI agents](/components/agentic-orchestration/monitor-ai-agents.md) in Operate and Optimize.
- Learn more about [Camunda agentic orchestration](/components/agentic-orchestration/agentic-orchestration-overview.md) and the [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md).
