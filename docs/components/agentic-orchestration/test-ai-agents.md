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

AI agent processes are non-deterministic: the [AI Agent connector](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) inside an [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) decides at runtime which tools to invoke and in what order, and its free-text output varies across runs. This guide shows how to write integration tests that keep the AI agent and LLM interaction real while mocking external tool executions, using two CPT features:

- **[Conditional behavior](/apis-tools/testing/utilities.md#conditional-behavior)** reacts to whichever tasks the agent activates instead of blocking on a single hard-coded execution order, addressing the non-deterministic control flow.
- **[Judge assertions](/apis-tools/testing/assertions.md#hasvariablesatisfiesjudge)** verify AI-generated output or tool execution results with a judge LLM that scores whether a value satisfies a natural-language expectation, replacing brittle exact-match checks.

## Prerequisites

- You use Camunda 8.9+.
- You use the Camunda Process Test Spring Boot Starter.
- You have [Camunda Process Test set up](/apis-tools/testing/getting-started.md).
- You have downloaded the [AI Agent Chat With Tools](https://marketplace.camunda.com/en-US/apps/587865) process to your local machine.

:::important
This guide is a follow-up to [Build your first AI agent](../../guides/getting-started-agentic-orchestration.md), in which you use the same example AI agent process, **AI Agent Chat With Tools**. Completing that guide first is recommended. However, you can also apply this guide to other AI agent process implementations.
:::

## Step 1: Prepare the example AI agent blueprint

Place the BPMN file and any associated forms for your AI agent process in `src/test/resources` (for example, under `bpmn/` and `forms/` subdirectories).

## Step 2: Configure the LLM provider and connectors

Judge assertions send a process variable and a natural language expectation to a configured LLM, which scores how well they match. The assertion passes if the score meets a configurable threshold. This avoids brittle string-matching on free-text AI output.

For this testing style, configure both the connector runtime and the judge LLM first. The goal is to keep the AI agent and LLM interaction real, while disabling outbound connector execution for the tool calls you want to control in the test.

### Configure the connector runtime

Add the following connector runtime configuration to your test configuration, for example in `src/test/resources/application.yaml` or as inline properties on `@SpringBootTest`. For the full property reference, see the [CPT configuration docs](/apis-tools/testing/configuration.md).

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

Create a test class annotated with `@SpringBootTest` and `@CamundaSpringProcessTest`. Use `@TestDeployment` to declare which resources CPT should deploy before each test, and inject the `CamundaClient` and `CamundaProcessTestContext`:

```java
@SpringBootTest
@CamundaSpringProcessTest
@TestDeployment(
    resources = {
        "bpmn/ai-agent-chat-with-tools.bpmn",
        "forms/ai-agent-chat-initial-request.form",
        "forms/ai-agent-chat-user-feedback.form",
        "forms/ai-agent-chat-human-send-email-request.form"
    })
class AiAgentProcessTest {

    @Autowired
    private CamundaClient client;

    @Autowired
    private CamundaProcessTestContext processTestContext;
}
```

For the full setup including dependencies and project structure, see [Getting started with Camunda Process Test](/apis-tools/testing/getting-started.md).

## Step 4: Handle non-deterministic flow paths

The test scenario is "Send Ervin a joke." The agent calls `ListUsers`, `LoadUserByID`, and `Jokes_API` in any order, presents an email for review via `AskHumanToSendEmail`, and collects feedback through `User_Feedback`.

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
                    Map.of("id", 1, "name", "Leanne Graham", "username", "Bret"),
                    Map.of("id", 2, "name", "Ervin Howell", "username", "Antonette")))));

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
                    "username", "Antonette",
                    "email", "123@abc.local"))));

// given: complete Jokes_API with two different jokes
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

## Step 5: Verify agent output with judge assertions

After the process completes, use a judge assertion to verify that the agent's output satisfies a natural language expectation. The following example checks the full "Send Ervin a joke" scenario, including tool usage, email content, and the feedback loop:

```java
@BeforeAll
static void configureCamundaAssert() {
    // AI agent processes involve LLM interactions and typically take longer
    // than standard BPMN processes. Increase the assertion timeout to avoid
    // premature failures.
    CamundaAssert.setAssertionTimeout(Duration.ofMinutes(1));
}

@Test
void shouldSendErvinAJoke() {
    // given: register conditional behaviors for tool tasks, email approval, and feedback
    // ... (see Step 4 above)

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

## Step 6: Tune the judge evaluation

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
