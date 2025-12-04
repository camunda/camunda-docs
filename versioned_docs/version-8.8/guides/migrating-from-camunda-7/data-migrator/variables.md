---
id: variables
title: Variables
sidebar_label: Variables
description: "How the Data Migrator transforms Camunda 7 variables to Camunda 8."
---

The Data Migrator automatically handles the transformation of Camunda 7 variables to Camunda 8 compatible formats during migration.

:::info
The handling and intercepting of variables described on this page is currently only supported for the **Runtime Data Migrator**.
:::

## About variables

This section documents which variable types are supported and how they are transformed.

For complete details on Camunda 7 variable types, see the [official Camunda 7 documentation](https://docs.camunda.org/manual/latest/user-guide/process-engine/variables/#supported-variable-values).

## Supported Types

The following table shows how different Camunda 7 variable types are handled during migration:

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

## Unsupported Types

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

- **Input**: Java `Date` objects from Camunda 7
- **Output**: ISO 8601 formatted strings (`yyyy-MM-dd'T'HH:mm:ss.SSSZ`)
  - **Example**: `2024-07-25T14:30:45.123+0200`
- **Timezone**: Uses the JVM's default timezone setting

### JSON

JSON variables are handled differently depending on their origin:

**Spin JSON Variables** and **JSON Object Variables** (serialized with `application/json`):

- Deserialized into Map structures for Camunda 8
- Maintains nested object structure
- Example: `{"name": "John", "age": 30}` becomes a Map object

**Invalid JSON**:
If JSON cannot be parsed, the process instance is skipped.

### XML

**Spin XML Variables** and **XML Object Variables** (serialized with `application/xml`):

- Raw XML string content is preserved
- No parsing or transformation applied

### Name Compatibility

The migrator handles variable names that are invalid in FEEL expressions:

- Names starting with numbers (e.g., `1stVariable`)
- Names with spaces (e.g., `my variable`)
- Names with special characters (e.g., `var/name`, `var-name`)
- Reserved keywords (e.g., `null`)

These variables are migrated as-is, but may require special handling in FEEL expressions using bracket notation.

## Disabling Built-in Interceptors

You can disable any built-in transformer or validator using the `enabled` configuration property. Use the class names from the tables above:

```yaml
camunda:
  migrator:
    # Variable interceptor plugins configuration
    interceptors:
      # Disable date transformation
      - class-name: io.camunda.migrator.impl.interceptor.DateVariableTransformer
        enabled: false
```

You can find a complete list of built-in interceptors in the [property reference](/guides/migrating-from-camunda-7/data-migrator/config-properties.md#built-in-interceptors).

## Custom Transformation

The `VariableInterceptor` interface allows you to define custom logic that executes whenever a variable is accessed or modified during migration. This is useful for auditing, transforming, or validating variable values.

Custom interceptors are enabled by default and can be restricted to specific variable types.

### How to Implement a `VariableInterceptor`

1. Create a new Maven project with the provided `pom.xml` structure
2. Add a dependency on `camunda-7-to-8-data-migrator-core` (scope: `provided`)
3. Implement the `VariableInterceptor` interface
4. Add setter methods for any configurable properties
5. Package as JAR and deploy to the `configuration/userlib` folder
6. Configure in `configuration/application.yml`

### Creating a Custom Variable Interceptor

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
    public void execute(VariableInvocation invocation) {
      // ...
    }

}
```

### Type Restrictions

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

### Configuring Custom Interceptors

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

### Execution Order

- Custom interceptors configured in the `application.yml` are executed in their order of appearance from top to bottom
  - Built-in interceptors run first, followed by custom interceptors
- In a Spring Boot environment, you can register interceptors as beans and change their execution order with the `@Order` annotation (lower values run first)

### Error Handling

When variable transformation fails:

- The entire process instance is skipped
- Detailed error messages are logged with the specific variable name and error cause
- The instance is marked for potential retry after fixing the underlying issue
- You can use `--list-skipped` and `--retry-skipped` commands to manage failed migrations
