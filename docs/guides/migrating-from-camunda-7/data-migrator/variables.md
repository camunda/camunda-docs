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

| Camunda 7 Type                 | Example Value         | Migration Behavior      | Camunda 8 Result  |
| :----------------------------- | :-------------------- | :---------------------- | :---------------- |
| String                         | `"hello world"`       | Direct migration        | String value      |
| Boolean                        | `true`, `false`       | Direct migration        | Boolean value     |
| Integer                        | `42`, `1234`          | Direct migration        | Number value      |
| Long                           | `123456789L`          | Direct migration        | Number value      |
| Double                         | `3.14159`             | Direct migration        | Number value      |
| Short                          | `(short) 1`           | Direct migration        | Number value      |
| Null                           | `null`                | Direct migration        | Null value        |
| Date                           | `new Date()`          | Converted to ISO format | String (ISO 8601) |
| Java Object serialized as JSON | Serialized JSON       | Converted to Map        | JSON object       |
| Spin JSON                      | `SpinJsonNode`        | Converted to Map        | JSON object       |
| Spin XML                       | `SpinXmlElement`      | Converted to String     | String (raw XML)  |
| Java Object serialized as XML  | XML serialized object | Converted to String     | String (raw XML)  |

## Unsupported Types

When a process instance contains unsupported variable types, the migrator will:

- Skip the entire process instance.
- Log a detailed error message indicating the variable type that caused the skip.
- Mark the instance as skipped for potential retry after manual intervention.

The following Camunda 7 variable types are **not supported** and will cause the process instance migration to be skipped:

| Camunda 7 Type          | Example                                                                                                                               |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| Byte Array              | `"hello".getBytes()`                                                                                                                  |
| File                    | `FileValue` objects.                                                                                                                  |
| Java Serialized Objects | Java objects serialized as `application/x-java-serialized-object` like `List`, `Set`, `Map`, `float`, `byte`, `char` or custom types. |

## Transformation

Variable transformations are handled by built-in transformers.

### Date

- **Input**: Java `Date` objects from Camunda 7.
- **Output**: ISO 8601 formatted strings (`yyyy-MM-dd'T'HH:mm:ss.SSSZ`).
  - **Example**: `2024-07-25T14:30:45.123+0200`
- **Timezone**: Uses the JVM's default timezone setting.

### JSON

JSON variables are handled differently depending on their origin:

**Spin JSON Variables** and **JSON Object Variables** (serialized with `application/json`):

- Deserialized into Map structures for Camunda 8.
- Maintains nested object structure.
- Example: `{"name": "John", "age": 30}` becomes a Map object.

**Invalid JSON**:
If JSON cannot be parsed, the process instance is skipped.

### XML

**Spin XML Variables** and **XML Object Variables** (serialized with `application/xml`):

- Raw XML string content is preserved.
- No parsing or transformation applied.

### Name Compatibility

The migrator handles variable names that are invalid in FEEL expressions:

- Names starting with numbers (for example, `1stVariable`).
- Names with spaces (for example, `my variable`).
- Names with special characters (for example, `var/name`, `var-name`).
- Reserved keywords (for example, `null`).

These variables are migrated as-is, but may require special handling in FEEL expressions using bracket notation.

## Built-in Transformers

The following transformers are automatically applied during migration:

1. `BuiltInVariableTransformer` (Order: 0)
   - Handles all basic variable type transformations.
   - Converts JSON objects to Map structures.
   - Handles Spin JSON/XML variables.
   - Rejects unsupported variable types.
   - Runs first to ensure proper type handling.

2. `BuiltInDateVariableTransformer` (Order: 10)
   - Converts Camunda 7 Date variables to ISO 8601 format.
   - Uses JVM default timezone settings.
   - Runs after the main transformer to handle Date-specific formatting.

## Custom Transformation

The `VariableInterceptor` interface allows you to define custom logic that executes whenever a variable is accessed or modified during migration. This is useful for auditing, transforming, or validating variable values.

### How to Implement a `VariableInterceptor`

1. Create a new Maven project with the provided `pom.xml` structure.
2. Add a dependency on `camunda-7-to-8-data-migrator-core` (scope: `provided`).
3. Implement the `VariableInterceptor` interface.
4. Add setter methods for any configurable properties.
5. Package as JAR and deploy to the `configuration/userlib` folder.
6. Configure in `configuration/application.yml`.

```yaml
# Variable interceptor plugins configuration
# These plugins can be packaged in JARs and dropped in the userlib folder
camunda:
  migrator:
    interceptors:
      - class-name: com.example.MyCustomVariableInterceptor
      - class-name: com.example.AnotherVariableInterceptor
```

**Example:** See [./examples/variable-interceptor directory](https://github.com/camunda/camunda-7-to-8-data-migrator/tree/main/examples/variable-interceptor) for an example custom variable interceptor.

### Execution Order

- If multiple interceptors are present, their execution order is determined by the `@Order` annotation (lower values run first).
- When the interceptor is not a Spring bean, the default order is used and added to last in the list.

### Error Handling

When variable transformation fails:

- The entire process instance is skipped.
- Detailed error messages are logged with the specific variable name and error cause.
- The instance is marked for potential retry after fixing the underlying issue.
- You can use `--list-skipped` and `--retry-skipped` commands to manage failed migrations.
