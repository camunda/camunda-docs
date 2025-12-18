---
id: variables
title: Variables
sidebar_label: Variables
description: "How the Data Migrator transforms Camunda 7 variables to Camunda 8."
---

The Data Migrator automatically handles the transformation of Camunda 7 variables to Camunda 8 compatible formats during migration.

Variable transformation is supported for the following migration types:

- Runtime migration: process instance variables.
- History migration: process variables, decision inputs, and decision outputs.

## About variables

This section documents which variable types are supported and how they are transformed.

For complete details on Camunda 7 variable types, see the [official Camunda 7 documentation](https://docs.camunda.org/manual/latest/user-guide/process-engine/variables/#supported-variable-values).

## Supported types

The following table shows how the migrator handles different Camunda 7 variable types:

| Camunda 7 Type                 | Example Value         | Migration Behavior      | Camunda 8 Result  | Interceptor Type                   |
| ------------------------------ | --------------------- | ----------------------- | ----------------- | ---------------------------------- |
| String                         | `"hello world"`       | Direct migration        | String value      | `StringValue`, `PrimitiveValue`    |
| Boolean                        | `true`, `false`       | Direct migration        | Boolean value     | `BooleanValue`, `PrimitiveValue`   |
| Integer                        | `42`, `1234`          | Direct migration        | Number value      | `IntegerValue`, `PrimitiveValue`   |
| Long                           | `123456789L`          | Direct migration        | Number value      | `LongValue`, `PrimitiveValue`      |
| Double                         | `3.14159`             | Direct migration        | Number value      | `DoubleValue`, `PrimitiveValue`    |
| Short                          | `(short) 1`           | Direct migration        | Number value      | `ShortValue`, `PrimitiveValue`     |
| Null                           | `null`                | Direct migration        | Null value        | `NullValueImpl`                    |
| Date                           | `new Date()`          | Converted to ISO format | String (ISO 8601) | `DateValue`, `PrimitiveValue`      |
| Java Object serialized as JSON | Serialized JSON       | Converted to Map        | JSON object       | `ObjectValue`, `SerializableValue` |
| Spin JSON                      | `SpinJsonNode`        | Converted to Map        | JSON object       | `SpinValue`, `SerializableValue`   |
| Spin XML                       | `SpinXmlElement`      | Converted to String     | String (raw XML)  | `SpinValue`, `SerializableValue`   |
| Java Object serialized as XML  | XML serialized object | Converted to String     | String (raw XML)  | `ObjectValue`, `SerializableValue` |

## Unsupported types

When a process instance contains unsupported variable types, the migrator will:

- Skip the entire process instance
- Log a detailed error message indicating the variable type that caused the skip
- Mark the instance as skipped for potential retry after manual intervention

The following Camunda 7 variable types are **not supported** and will cause the process instance migration to be skipped:

| Camunda 7 Type          | Example                                                                                                                              | Interceptor Type                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| Byte Array              | `"hello".getBytes()`                                                                                                                 | `BytesValue`, `PrimitiveValue`     |
| File                    | `FileValue` objects                                                                                                                  | `FileValue`                        |
| Java Serialized Objects | Java objects serialized as `application/x-java-serialized-object` like `List`, `Set`, `Map`, `float`, `byte`, `char` or custom types | `ObjectValue`, `SerializableValue` |

## Transformation

Variable transformations are handled by built-in transformers that run in a specific execution order. Validators run first (Order: 1-3) to reject unsupported types, followed by transformers (Order: 10-20) that convert supported types.

### Date

- Input: Java `Date` objects from Camunda 7
- Output: ISO 8601 formatted strings (`yyyy-MM-dd'T'HH:mm:ss.SSSZ`)
- Example: `2024-07-25T14:30:45.123+0200`
- Timezone: Uses the JVM's default timezone setting

### JSON

JSON variables are handled differently depending on their origin and migration mode:

Spin JSON Variables and JSON Object Variables (serialized with `application/json`):

- Runtime migration:
  - Deserializes JSON into Map structures for Camunda 8.
  - Preserves the nested object structure.
  - Example: `{"name": "John", "age": 30}` becomes a Map object.
- History migration:
  - Preserves JSON values as raw strings.
  - Example: `{"name": "John", "age": 30}` is stored as-is.

**Invalid JSON**:
If JSON cannot be parsed during runtime migration, the migrator skips the process instance.

### XML

Spin XML Variables and XML Object Variables (serialized with `application/xml`):

- Raw XML string content is preserved
- No parsing or transformation applied

### Name compatibility

The migrator handles variable names that are invalid in FEEL expressions:

- Names starting with numbers (e.g., `1stVariable`)
- Names with spaces (e.g., `my variable`)
- Names with special characters (e.g., `var/name`, `var-name`)
- Reserved keywords (e.g., `null`)

These variables are migrated as-is, but may require special handling in FEEL expressions using bracket notation.

## Disabling built-in interceptors

You can disable any built-in transformer or validator using the `enabled` configuration property:

```yaml
camunda:
  migrator:
    # Variable interceptor plugins configuration
    interceptors:
      # Disable date transformation
      - class-name: io.camunda.migration.data.impl.interceptor.DateVariableTransformer
        enabled: false
```

You can find a complete list of built-in interceptors in the [property reference](/guides/migrating-from-camunda-7/migration-tooling/data-migrator/config-properties.md#built-in-interceptors).

## Custom transformation

The `VariableInterceptor` interface allows you to define custom logic that executes whenever a variable is accessed or modified during migration. This is useful for auditing, transforming, or validating variable values.

Custom interceptors are enabled by default and can be restricted to specific variable types.

### How to implement a `VariableInterceptor`

1. Create a new Maven project with the provided `pom.xml` structure
2. Add a dependency on `camunda-7-to-8-data-migrator-core` (scope: `provided`)
3. Implement the `VariableInterceptor` interface
4. Add setter methods for any configurable properties
5. Package as JAR and deploy to the `configuration/userlib` folder
6. Configure in `configuration/application.yml`

### Creating a custom variable interceptor

Here's an example of a custom variable interceptor which is only called for string variables:

```java
public class MyVariableInterceptor implements VariableInterceptor {

    /**
     * Restrict this interceptor to only handle string variables.
     */
    @Override
    public Set<Class<?>> getTypes() {
        return Set.of(StringValue.class);
    }

    @Override
    public void execute(VariableContext context) {
      // Access the variable name
      String name = context.getName();

      // Get the Camunda 7 value
      Object c7Value = context.getC7Value();

      // Get the Camunda 7 entity
      VariableInstanceEntity variableInstance = context.getEntity();

      // Transform and set the Camunda 8 value
      context.setC8Value(transformedValue);
    }

}
```

### Type restrictions

Variable interceptors can be restricted to specific variable types using the `getTypes()` method. You can find a complete list of available variable types for restriction as subinterfaces of the `TypedValue` interface in the [JavaDoc](https://docs.camunda.org/javadoc/camunda-bpm-platform/7.24/org/camunda/bpm/engine/variable/value/TypedValue.html#:~:text=All%20Known%20Subinterfaces%3A).

```java
@Override
public Set<Class<?>> getTypes() {
    // Handle only specific types
    return Set.of(
        PrimitiveValue.class,    // String, Integer, Boolean, etc.
        DateValue.class,         // Date variables
        ObjectValue.class        // JSON, XML, Java serialized objects
    );
}
```

```java
// Or handle all types (default behavior)
@Override
public Set<Class<?>> getTypes() {
    return Set.of(); // Empty set = handle all types
}
```

### Entity type filtering

In addition to filtering by variable type, interceptors can also filter by the source entity type. This is useful when you want different behavior for history/runtime process variables and decision inputs/outputs.

#### Available entity types

- `VariableInstanceEntity.class`: runtime process variables
- `HistoricVariableInstanceEntity.class`: historic process variables
- `HistoricDecisionInputInstanceEntity.class`: decision input variables
- `HistoricDecisionOutputInstanceEntity.class`: decision output variables

#### Example: process variables only

```java
public class ProcessVariableInterceptor implements VariableInterceptor {

    @Override
    public Set<Class<? extends ValueFields>> getEntityTypes() {
        // Only handle process variables (runtime and history)
        return Set.of(
            VariableInstanceEntity.class,
            HistoricVariableInstanceEntity.class
        );
    }

    @Override
    public void execute(VariableContext context) {
        // This is only called for process variables
        // not for decision inputs/outputs
    }
}
```

#### Example: decision variables only

```java
public class DecisionVariableInterceptor implements VariableInterceptor {

    @Override
    public Set<Class<? extends ValueFields>> getEntityTypes() {
        // Only handle decision inputs and outputs
        return Set.of(
            HistoricDecisionInputInstanceEntity.class,
            HistoricDecisionOutputInstanceEntity.class
        );
    }

    @Override
    public void execute(VariableContext context) {
        // This is only called for decision variables
    }
}
```

#### Default behavior

```java
// Empty set = handle all entity types
@Override
public Set<Class<? extends ValueFields>> getEntityTypes() {
    return Set.of();
}
```

### Detecting migration context

Variable interceptors can detect whether they are running in a runtime or history migration context:

```java
@Override
public void execute(VariableContext context) {
    if (context.isRuntime()) {
        // Handle runtime migration
        // Example: Deserialize JSON to Map
    } else if (context.isHistory()) {
        // Handle history migration
        // Example: Keep JSON as string
    }
}
```

### Configuring custom interceptors

Configure your custom interceptors in `application.yml`:

```yaml
# Variable interceptor plugins configuration
# These plugins can be packaged in JARs and dropped in the userlib folder
camunda:
  migrator:
    interceptors:
      - class-name: com.example.migrator.AuditVariableInterceptor
        enabled: true
        properties:
          prefix: "CUSTOM_PREFIX_"
          enableLogging: true
```

### Deployment

1. Package your custom interceptor as a JAR file
2. Place the JAR in the `configuration/userlib/` folder
3. Configure the interceptor in `configuration/application.yml`
4. Restart the Data Migrator

The `enabled` property is supported for all interceptors (both built-in and custom) and defaults to `true`.

See [example interceptor](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/data-migrator/examples/variable-interceptor).

### Execution order

- Custom interceptors configured in the `application.yml` are executed in their order of appearance from top to bottom
  - Built-in interceptors run first, followed by custom interceptors
- In a Spring Boot environment, you can register interceptors as beans and change their execution order with the `@Order` annotation (lower values run first)

### Error handling

When variable transformation fails:

#### Runtime migration

- The migrator skips the entire process instance.
- Logs detailed error messages with the variable name and cause.
- Marks the instance for potential retry after you fix the underlying issue.

#### History migration

- Skips only the affected variables, decision inputs, or outputs.
- Continues migrating the parent entity.
- Logs skipped items with detailed error information.

#### Example commands

```bash
# List all skipped variables
./start.sh --history --list-skipped HISTORY_VARIABLE

# List all skipped decision instances
./start.sh --history --list-skipped HISTORY_DECISION_INSTANCE

# Retry skipped entities after fixing issues
./start.sh --history --retry-skipped
```
