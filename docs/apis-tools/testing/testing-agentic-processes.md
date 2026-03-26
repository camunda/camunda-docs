---
id: testing-agentic-processes
title: Testing agentic processes
description: "A guide for testing non-deterministic, agentic Camunda processes with LLM-based assertions and conditional behavior."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

CPT provides two features designed for testing agentic processes: [conditional behavior](utilities.md#conditional-behavior) and [judge assertions](assertions.md#hasvariablesatisfiesjudge). Together, they let you write reliable tests for processes where the execution path and output content are non-deterministic.

## The challenge

Standard CPT assertions are blocking. They poll the process state and wait until the expected condition is met before the test continues. This works well when the process follows a predictable path, but becomes a problem for agentic processes.

A process that uses the [AI Agent connector](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) inside an [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) decides at runtime which tools to invoke and in what order. A test that blocks on one specific tool task will stall if the agent chooses a different tool first, or skips that tool entirely.

On top of non-deterministic execution order, AI agents produce free-text output whose exact wording is unpredictable. Traditional equality-based variable assertions cannot reliably verify that the agent generated a meaningful response.

CPT addresses these challenges with:

- **Conditional behavior** -- registers background reactions that monitor the process state and execute actions as conditions are met, without blocking the test thread.
- **Judge assertions** -- sends a process variable and a natural language expectation to a configured LLM, which scores how well they match. The assertion passes if the score meets a configurable threshold.

## Prerequisites

- Camunda 8.8+ with [CPT set up](getting-started.md)
- A configured LLM provider (for judge assertions)

To use judge assertions, add the LLM provider dependency:

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

Camunda Process Test Spring includes the built-in LLM providers as a transitive dependency. No additional
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

## Configure the judge

The following example shows a minimal configuration using OpenAI:

<Tabs groupId="client" defaultValue="spring-sdk" queryString values={[
{label: 'Camunda Spring Boot Starter', value: 'spring-sdk' },
{label: 'Java client', value: 'java-client' }
]}>

<TabItem value='spring-sdk'>

```yaml
camunda:
  process-test:
    judge:
      chat-model:
        provider: "openai"
        model: "gpt-4o"
        api-key: "your-api-key"
```

</TabItem>

<TabItem value='java-client'>

```properties
judge.chatModel.provider=openai
judge.chatModel.model=gpt-4o
judge.chatModel.apiKey=your-api-key
```

</TabItem>

</Tabs>

The judge evaluates how well a variable value matches your expectation using the following scoring scale:

| Score | Meaning                                                                                                                |
| ----- | ---------------------------------------------------------------------------------------------------------------------- |
| 1.0   | Fully satisfied semantically. Different wording or formatting that conveys the same meaning counts as fully satisfied. |
| 0.75  | Satisfied in substance with only minor differences that do not affect correctness.                                     |
| 0.5   | Partially satisfied. Some required elements are present but others are missing or incorrect.                           |
| 0.25  | Mostly not satisfied. Only marginal relevance.                                                                         |
| 0.0   | Not satisfied at all, or the actual value is empty.                                                                    |

The LLM may return any value between these anchor points (for example, 0.6 or 0.85). The default threshold is 0.5. You can change it globally in the [judge configuration](configuration.md#judge-configuration) or per assertion using `withJudgeConfig`.

For additional providers (Anthropic, Amazon Bedrock, Azure OpenAI, Ollama) and the full property reference, see the [judge configuration](configuration.md#judge-configuration) reference.

## Example process

This guide uses the [AI Agent Chat Quick Start](/guides/getting-started-agentic-orchestration.md) blueprint as the process under test. The process has the following structure:

1. A **start form** collects a user prompt ("How can I help you today?").
2. An **ad-hoc sub-process** named `AI Agent` contains tool tasks that the AI agent can invoke at runtime: `Get Date and Time`, `Fetch URL`, `Search recipe`, `List users`, `Load user by ID`, and others.
3. Each tool receives its input through the `toolCall` variable and writes its result to `toolCallResult`.
4. After the agent completes, a **user task** named `User Feedback` asks whether the user is satisfied.
5. If the user is not satisfied, the process loops back to the agent.

Because the agent decides which tools to call and in what order, a test cannot predict the execution path. The sections below show how to handle this.

## Write test cases

### Handle non-deterministic tool invocations

Register conditional behaviors before starting the process. Each behavior monitors a condition in the background and executes its action when the condition is met.

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

### Assert agent output with a judge

After the agent completes, use a judge assertion to verify that the output meets a natural language expectation. This avoids brittle string-matching on free-text AI output.

```java
@Test
void shouldProduceMeaningfulResponse() {
    // given: register conditional behaviors for tool tasks
    // ... (same as previous example)

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

The LLM judge scores the match and the assertion passes if the score meets the threshold (default: 0.5).

### Custom threshold and chained actions

Use `withJudgeConfig` to set a stricter threshold for individual assertions. Use chained `.then()` calls when a behavior should produce different results on repeated invocations.

```java
@Test
void shouldHandleMultipleToolCalls() {
    // given: chain actions for a tool that might be called multiple times
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

    // given: register other behaviors
    processTestContext.when(
        processInstance -> processInstance.hasActiveElements("User Feedback"))
        .as("complete-user-feedback")
        .then(client -> client.newCompleteJobCommand(
            processTestContext.getActivatedJob(
                ElementSelectors.byName("User Feedback")))
            .variables(Map.of("satisfied", true))
            .send());

    // when: start the process with a recipe-related prompt
    ProcessInstanceEvent processInstance = client.newCreateInstanceCommand()
        .bpmnProcessId("ai-agent-chat-with-tools")
        .latestVersion()
        .variables(Map.of("prompt", "Find me two different recipes for dinner."))
        .send()
        .join();

    // then: the agent produced a response that mentions recipes
    assertThat(processInstance).isCompleted();
    assertThat(processInstance)
        .withJudgeConfig(config -> config.withThreshold(0.8))
        .hasVariableSatisfiesJudge("agentContext",
            "Contains at least two recipe suggestions with ingredient lists.");
}
```

The first `.then()` action is consumed on the first invocation. The second `.then()` action repeats for all subsequent invocations. This lets you simulate tools that return different results each time the agent calls them.

## Next steps

- [Assertions](assertions.md) -- full assertion API reference, including judge assertion methods
- [Configuration](configuration.md#judge-configuration) -- all LLM provider configurations and property reference
- [Utilities](utilities.md#conditional-behavior) -- full conditional behavior API details
- [Build your first AI agent](/guides/getting-started-agentic-orchestration.md) -- set up the example process used in this guide
