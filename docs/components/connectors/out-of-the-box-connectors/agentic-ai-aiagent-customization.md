---
id: agentic-ai-aiagent-customization
sidebar_label: Customization
title: AI Agent connector customization
description: Customization of the AI Agent connector in self-managed or hybrid deployments
---

In a self-managed or [hybrid](../../../reference/glossary.md#hybrid-mode) environment, you can customize and extend the [AI Agent connector](./agentic-ai-aiagent.md) to suit your specific needs.

For example, you can:

- Implement custom storage backends for conversation history
- Add support for additional AI models
- Inject additional logic into the agent execution flow

## Prerequisites

This guide assumes you are starting from a fresh Spring Boot project and intend to run a customized AI Agent connector in a self-managed or hybrid environment.

1. Create a new Spring Boot project.
2. Add the [Camunda Connector Spring Boot Starter](../custom-built-connectors/connector-sdk.md#spring-boot-starter-runtime) and the Agentic AI dependencies to your `pom.xml`:

   ```xml
   <project>
       <!-- .... -->

       <properties>
           <!-- use the desired connectors version -->
           <version.connectors>8.8.0-SNAPSHOT</version.connectors>
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
   to [the Camunda SDK documentation](../../../apis-tools/spring-zeebe-sdk/getting-started.md#configuring-the-camunda-8-connection).
4. To only run the AI Agent Client connector, disable the other agentic AI connectors provided by the `connector-agentic-ai` dependency in your `application.yml`:

   ```yaml
   camunda:
     connector:
       agenticai:
         aiagent:
           enabled: true
         ad-hoc-tools-schema-resolver:
           enabled: false
         mcp:
           remote-client:
             enabled: false
   ```

5. If the default AI Agent connector is already connected to your engine (for example, if you are connecting to SaaS), you can override the registered AI Agent connector job worker type by setting the `CONNECTOR_AI_AGENT_TYPE` environment variable to a custom value (such as `my-ai-agent`) when starting your application.
   This allows you to use your custom connector in combination with a [template configured](../use-connectors-in-hybrid-mode.md) for the `my-ai-agent` job worker type.

## Customize individual components

:::tip
Instead of the example below, you can also use other Spring mechanisms to customize the AI Agent connector, such as using Aspect Oriented Programming (AOP) to intercept and modify method calls.
:::

Each component of the AI Agent connector is registered as a Spring bean and annotated with the `@ConditionalOnMissingBean` annotation. This means you can override any component by defining your own bean of the same type in your custom project.

For example, to customize the agent initialization logic, you can create a new bean that implements the `AgentInitializer` interface and register it in your Spring context. In the example below, this is done using the `@Component` annotation, but other Spring Boot mechanisms—like `@Bean` producer methods—work as well.

The following example wraps the default initialization implementation with additional logging, but you can insert any custom logic as needed:

```java

@Component
public class MyCustomAgentInitializer implements AgentInitializer {

    private static final Logger LOGGER = LoggerFactory.getLogger(MyCustomAgentInitializer.class);

    private final AgentInitializer delegate;

    public MyCustomAgentInitializer(
            AdHocToolsSchemaResolver schemaResolver, GatewayToolHandlerRegistry gatewayToolHandlers) {
        this.delegate = new AgentInitializerImpl(schemaResolver, gatewayToolHandlers);
    }

    @Override
    public AgentInitializationResult initializeAgent(AgentExecutionContext executionContext) {
        LOGGER.info(">>> Initializing agent");

        final var result = delegate.initializeAgent(executionContext);

        LOGGER.info("<<< Agent initialized. Result: {}", result);

        return result;
    }
}
```

## Custom conversation storage

The AI Agent connector includes a set of default storage backends for conversation history, but you can also implement your own to meet specific needs. Similar to the agent initialization example above, you can register a bean that implements the `ConversationStore` interface to provide your own storage implementation.

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
    @Transactional
    public <T> T executeInSession(
            AgentExecutionContext executionContext,
            AgentContext agentContext,
            ConversationSessionHandler<T> sessionHandler) {
        // optionally read parameters from execution context
        final var session = new MyConversationSession(repository, executionContext.jobContext());
        return sessionHandler.handleSession(session);
    }
}
```

The actual storage logic lives within the session implementation you'll need to provide, which exposes methods to read and write the messages from the runtime memory:

```java
public interface ConversationSession {
    void loadIntoRuntimeMemory(AgentContext agentContext, RuntimeMemory memory);

    AgentContext storeFromRuntimeMemory(AgentContext agentContext, RuntimeMemory memory);
}
```

After implementing the custom store, you can reference the store type in your AI Agent connector configuration (see [memory configuration](./agentic-ai-aiagent.md#memory)):

1. In the **Memory** group of the AI Agent connector properties, set the **Memory storage type** to **Custom implementation**.
2. In the **Implementation type** field, enter the type value of your custom store implementation (`my-conversation` in the example above).
3. Run your process model. It should now use your custom conversation store for storing the conversation history.

:::info
An incident is raised if the AI Agent connector is not able to find a conversation store implementation for the specified type.
:::
