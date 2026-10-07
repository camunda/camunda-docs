---
id: agentic-ai-aiagent-customization
sidebar_label: Customize in Self-Managed
title: Customize the AI Agent connector
description: Customize the AI Agent connector in Self-Managed or hybrid deployments to suit your specific needs.
---

Customize the [AI Agent connector](./agentic-ai-aiagent.md) in Self-Managed or [hybrid](../../../reference/glossary.md#hybrid-mode) deployments by implementing custom conversation storage, supporting additional AI models, or adding logic to the agent execution flow.

## HTTP proxy configuration

In Self-Managed environments, the AI Agent connector supports routing HTTP requests to LLM providers through an HTTP proxy. This applies to the AI Agent, [MCP Client](./agentic-ai-mcp-client.md), and [A2A Client](/components/early-access/alpha/a2a-client/a2a-client.md) connectors.

These connectors support [plain proxy variables](/self-managed/components/connectors/http-proxy-configuration.md#plain-proxy-variables) in addition to the standard connector proxy variables. Refer to the [HTTP proxy configuration](/self-managed/components/connectors/http-proxy-configuration.md) page for the full list of environment variables and configuration options.

The following LLM providers do not support connector proxy variables, but respect standard [JVM proxy properties](/self-managed/components/connectors/http-proxy-configuration.md#jvm-properties):

- Google Vertex AI.

To disable proxy support entirely (for example, if only an HTTPS-based proxy is available):

- **Spring Boot property:** `camunda.connector.agenticai.http.proxy-support.enabled=false`.
- **Environment variable:** `CAMUNDA_CONNECTOR_AGENTICAI_HTTP_PROXYSUPPORT_ENABLED=false`.

## Extend the AI Agent connector

:::note
The agentic AI ecosystem evolves quickly. The APIs used for these customizations can change between minor releases. See the [breaking changes for custom extensions](https://github.com/camunda/connectors/blob/main/connectors/agentic-ai/docs/breaking-changes.md).
:::

### Prerequisites

This guide assumes you are starting from a fresh Spring Boot project and intend to run a customized AI Agent connector in a self-managed or hybrid environment.

1. Create a new Spring Boot project.
2. Add the [Camunda Connector Spring Boot Starter](../custom-built-connectors/connector-sdk.md#spring-boot-starter-runtime) and the Agentic AI dependencies to your `pom.xml`:

   ```xml
   <project>
       <!-- .... -->

       <properties>
           <!-- use the desired connectors version -->
           <version.connectors>8.10.0</version.connectors>
       </properties>

       <dependencies>
           <!-- .... -->

           <dependency>
               <groupId>io.camunda.connector</groupId>
               <artifactId>spring-boot-starter-camunda-connectors</artifactId>
               <version>${version.connectors}</version>
           </dependency>
           <dependency>
               <groupId>io.camunda.connector</groupId>
               <artifactId>connector-agentic-ai</artifactId>
               <version>${version.connectors}</version>
           </dependency>

           <!-- .... -->
       </dependencies>

       <!-- .... -->
   </project>
   ```

3. Configure the SDK to connect to your cluster according
   to [the Camunda SDK documentation](../../../apis-tools/camunda-spring-boot-starter/getting-started.md#configuring-the-camunda-8-connection).
4. To only run the AI Agent Client connector, disable the other agentic AI connectors provided by the `connector-agentic-ai` dependency in your `application.yml`:

   ```yaml
   camunda:
     connector:
       agenticai:
         ad-hoc-tools-schema-resolver:
           enabled: false
         mcp:
           remote-client:
             enabled: false
         a2a:
           client:
             outbound:
               enabled: false
             polling:
               enabled: false
             webhook:
               enabled: false
   ```

5. If the default AI Agent connector is already connected to your engine (for example, if you are connecting to SaaS), you can override the registered AI Agent connector job worker type by setting one of the following type environment variables to a custom value (such as `my-ai-agent`) when starting your application.
   This allows you to use your custom connector in combination with an [element template configured](../use-connectors-in-hybrid-mode.md) for the `my-ai-agent` job worker type.

| Variable                             | Description                                                                                                                                           |
| :----------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CONNECTOR_AI_AGENT_TASK_TYPE`       | Overrides the type of the [AI Agent Task](./agentic-ai-aiagent-task.md) connector (default `io.camunda.agenticai:aiagent:task:2`).                    |
| `CONNECTOR_AI_AGENT_SUBPROCESS_TYPE` | Overrides the type of the [AI Agent Sub-process](./agentic-ai-aiagent-subprocess.md) connector (default `io.camunda.agenticai:aiagent:subprocess:2`). |

If you previously overrode the job types of the legacy element templates, see [job type overrides](./agentic-ai-aiagent-upgrade.md#job-type-overrides).

### Customize individual components

Each component of the AI Agent connector is registered as a Spring bean and annotated with the `@ConditionalOnMissingBean` annotation. This means you can override a component by defining your own bean of the same type in your custom project. You can register your bean with the `@Component` annotation or with a `@Bean` producer method.

The following sections show how to add a custom chat model provider and a custom conversation store.

:::tip
You can also use other Spring mechanisms to customize the AI Agent connector, such as using Aspect Oriented Programming (AOP) to intercept and modify method calls.
:::

### Custom chat model provider

Add support for an LLM provider that the connector doesn't include by registering a `ChatModelFactory` bean. The AI Agent connector routes requests to your factory when a process uses the **Custom implementation** model provider with a matching **Provider type**.

A custom provider needs two pieces:

- A `ChatModelFactory` bean: `supports(...)` decides whether the factory handles a configuration, and `create(...)` builds the `ChatModel`.
- A `ChatModel`: `execute(...)` performs one round-trip against the provider and returns a `ChatResult`. The connector calls `close()` once the agent request is done.

The following skeleton handles the provider type `my-provider`:

```java
@Component
public class MyChatModelFactory implements ChatModelFactory {

    public static final String PROVIDER_TYPE = "my-provider";

    @Override
    public boolean supports(ChatModelConfiguration configuration) {
        return configuration instanceof CustomProviderConfiguration custom
            && PROVIDER_TYPE.equals(custom.providerType());
    }

    @Override
    public ChatModel create(ChatModelConfiguration configuration) {
        final var custom = (CustomProviderConfiguration) configuration;
        // custom.model() is the model ID, custom.parameters() the provider parameters
        return new MyChatModel(custom.model(), custom.parameters());
    }
}
```

```java
public class MyChatModel implements ChatModel {

    public MyChatModel(String model, Map<String, Object> parameters) {
        // set up your provider client
    }

    @Override
    public ChatResult execute(ChatRequest request) {
        // 1. Convert request.snapshot() to your provider's request format.
        // 2. Call the provider.
        // 3. Convert the response to an AssistantMessage and fill in the AgentMetrics
        //    (model calls, token usage).
        return new ChatResult.Completed(assistantMessage, metrics);
    }

    @Override
    public void close() {
        // release provider client resources
    }
}
```

Return `ChatResult.Continuation` instead of `ChatResult.Completed` if the provider pauses mid-turn and must be called again to continue the same turn.

:::note
The connector throws an error if no factory, or more than one factory, supports a configuration. Make sure `supports(...)` only matches your own provider type.
:::

To use the provider in a process:

1. Apply the new AI Agent element template, version 2.
2. In the **Model provider** group, set **Provider** to **Custom implementation**.
3. Set **Provider type** to the value your factory matches (`my-provider` in the example above).
4. Set **Model** to the model ID your implementation expects.
5. (Optional) Set **Provider parameters** to a FEEL context that your factory reads, for example `={apiKey: "{{secrets.MY_API_KEY}}"}`.

To build on a built-in provider instead of calling an API yourself, inject the built-in factory bean, such as `OpenAiChatModelFactory`, and call it directly from your factory.

### Custom conversation storage

The AI Agent connector includes a set of default storage backends for conversation history, but you can also implement your own to meet specific needs. Like other components, you can register a bean that implements the `ConversationStore` interface to provide your own storage implementation.

A custom store needs three pieces:

- A `ConversationStore` bean: The entry point. Its `type()` value is referenced from the element template.
- A `ConversationSession` returned by `createSession(...)`: Performs the actual load and store for a single agent turn. The caller manages its lifecycle via `try-with-resources`, so override `close()` if your session holds external resources (connections, clients).
- A `ConversationContext` implementation: The storage cursor persisted as part of the `agentContext` process variable. It must be annotated with `@JsonTypeName` and registered with the runtime `ObjectMapper`.

The following example shows how to implement a custom store using a Spring Data JPA repository. The value returned by the `type()` method is used to identify the store type in the AI Agent connector configuration.

```java
@Component
public class MyConversationStore implements ConversationStore {

    public static final String TYPE = "my-conversation";

    private final MyConversationRepository repository;

    public MyConversationStore(MyConversationRepository repository) {
        this.repository = repository;
    }

    @Override
    public String type() {
        return TYPE;
    }

    @Override
    public ConversationSession createSession(
            AgentExecutionContext executionContext, AgentContext agentContext) {
        return new MyConversationSession(repository, executionContext);
    }

    @Override
    public void onJobCompleted(
            AgentExecutionContext executionContext, AgentContext committedContext) {
        // Best-effort hook fired after Zeebe accepted the job completion. Optional: use
        // this to update a projection, archive the previous record, emit an event, etc.
    }

    @Override
    public void onJobCompletionFailed(
            AgentExecutionContext executionContext,
            AgentContext failedContext,
            JobCompletionFailure failure) {
        // Best-effort hook fired after Zeebe rejected the job completion (or the
        // connector itself raised an error). The record written by storeMessages during
        // this job is now an orphan — optional: delete it here so orphans do not
        // accumulate.
    }
}
```

The session reads and writes the conversation messages for a single agent turn. `loadMessages` returns the message history that the incoming `ConversationContext` references; `storeMessages` persists the updated message list and returns a new `ConversationContext` pointing to the newly written record. The caller assembles the full `AgentContext` from the returned context.

```java
public class MyConversationSession implements ConversationSession {

    @Override
    public ConversationLoadResult loadMessages(AgentContext agentContext) {
        // Load the messages referenced by the ConversationContext in agentContext.
    }

    @Override
    public ConversationContext storeMessages(
            AgentContext agentContext, ConversationStoreRequest request) {
        // Persist request.messages() to a new record and return a ConversationContext
        // pointing at it. Never mutate the record the previous context points to —
        // see the storage contract note below.
    }
}
```

The `ConversationContext` is the storage cursor. It is serialized as part of the `agentContext` process variable, so it must be annotated with `@JsonTypeName` and contain everything needed to locate the stored data on the next turn:

```java
@JsonTypeName("my-conversation")
public record MyConversationContext(String conversationId, UUID recordId)
        implements ConversationContext {}
```

Register the subtype with the connector runtime's `ObjectMapper` instances so the connector can deserialize the context back from the process variable. The runtime builds its own mappers, which Spring Boot's `Jackson2ObjectMapperBuilderCustomizer` and `JsonMapperBuilderCustomizer` beans don't configure. Use a `BeanPostProcessor` that registers the subtype on every `ObjectMapper` bean instead:

```java
@Component
public class ConversationContextSubTypesBeanPostProcessor implements BeanPostProcessor {

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) {
        if (bean instanceof ObjectMapper objectMapper) {
            objectMapper.registerSubtypes(MyConversationContext.class);
        }
        return bean;
    }
}
```

:::tip Serialize with the connector object mapper
If your store serializes messages to JSON, use the connector runtime's `ObjectMapper` bean (qualifier `@ConnectorsObjectMapper`) instead of creating your own. It already supports the connector data types that messages can contain, such as document references.
:::

:::note Storage contract
`storeMessages` must always write to a **new** record (or document, or branch) and return a `ConversationContext` pointing to it.

Never mutate or overwrite the data the previous context points at. If job completion fails, Zeebe retries with the old `AgentContext` (and therefore the old cursor); the old pointer must still resolve to the old data. The newly written record becomes an orphan, which the `onJobCompletionFailed` hook can clean up.

See the [storage contract reference](https://github.com/camunda/connectors/blob/main/connectors/agentic-ai/docs/reference/ai-agent.md#storage-contract) for the full rules every implementation must follow.
:::

After implementing the custom store, you can reference the store type in your AI Agent connector configuration (see [memory configuration](./agentic-ai-aiagent.md#memory)):

1. In the **Memory** group of the AI Agent connector properties, set the **Memory storage type** to **Custom implementation**.
2. In the **Implementation type** field, enter the type value of your custom store implementation (`my-conversation` in the example above).
3. Run your process model. It should now use your custom conversation store for storing the conversation history.

:::info
An incident is raised if the AI Agent connector is not able to find a conversation store implementation for the specified type.
:::
