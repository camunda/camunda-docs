---
id: update-guide
title: Update guide
sidebar_label: Update guide
description: "Learn about breaking changes and migration steps to consider when updating Migration Tooling between versions."
---

In this guide, you'll learn about the breaking changes and migration steps to consider when you upgrade Migration Tooling.

:::note
Migration Tooling follows [semantic versioning](https://semver.org/).
:::

## Prerequisites

Before you update:

1. Check the [version compatibility matrix](version-compatibility.md) to confirm your Migration Tooling version is compatible with your Camunda 7 and Camunda 8 versions.
2. Review the [Migration Tooling release notes](https://github.com/camunda/camunda-7-to-8-migration-tooling/releases) for your target version.

## Breaking changes by version

<!-- HEADS-UP: ADD NEW VERSIONS ALWAYS TO THE TOP OF THIS LIST -->

### Version 0.1.x to 0.2.0

**Release date:** 17/12/2025 \
**Camunda 8 compatibility:** 8.8.x

#### Data Migrator: Package name changes

The package name of the Data Migrator has changed from `io.camunda.migrator` to `io.camunda.migration.data`. Make sure you update your custom interceptors and `application.yml` configuration.

**Migration steps**

Change your import statements:

```java
// 0.1.x
import io.camunda.migrator.interceptor.VariableInterceptor;

// 0.2.0
import io.camunda.migration.data.interceptor.VariableInterceptor;
```

Change your `application.yml` configuration for built-in interceptors:

```yaml
# 0.1.x
camunda.migrator.interceptors:
  - class-name: io.camunda.migrator.impl.interceptor.DateVariableTransformer
    enabled: false

# 0.2.0
camunda.migrator.interceptors:
  - class-name: io.camunda.migration.data.impl.interceptor.DateVariableTransformer
    enabled: false
```

#### Data Migrator: Variable interceptor API changes

This release updates the variable interceptor API to support history migration and improve context awareness.

`VariableInvocation` was renamed to `VariableContext`:

```java
// 0.1.x
public void execute(VariableInvocation invocation) {
    VariableInstanceEntity variable = invocation.getC7Variable();
    String processInstanceId = variable.getProcessInstanceId();

    invocation.setVariableValue(transformedValue);
}

// 0.2.0
public void execute(VariableContext context) {
    VariableInstanceEntity variable = (VariableInstanceEntity) context.getEntity();
    String processInstanceId = variable.getProcessInstanceId();

    String name = context.getName();
    Object value = context.getC7Value();
    context.setC8Value(transformedValue);
}
```

`MigrationVariableDto` class was removed:

- Use `VariableContext` methods directly
- `getName()` and `getC8Value()`/`setC8Value()` replace DTO access

**Migration steps**

1. Update method signatures from `VariableInvocation` to `VariableContext`.
2. Replace `invocation.getC7Variable()` with `context.getC7Value()` or `context.getC7TypedValue()`.
3. Replace `invocation.getMigrationVariable().getName()` with `context.getName()`.
4. Replace `invocation.setVariableValue()` with `context.setC8Value()`.
5. (Optional) Add entity type filtering, using `getEntityTypes()`.
6. (Optional) Add runtime/history context detection, using `context.isRuntime()` or `context.isHistory()`.

:::note Further reading
See the [Variables documentation](data-migrator/variables.md) for more information.
:::

#### Code Conversion: Repository and package changes

Code Conversion is now officially supported by Camunda. The code repository and package names have changed.

- Repository location
  - **Old**: `camunda-community-hub/camunda-7-to-8-code-conversion`
  - **New**: `camunda/camunda-7-to-8-migration-tooling`
- Package names
  - **Old**: `org.camunda.migration.rewrite.*`
  - **New**: `io.camunda.migration.code.*`
- Maven module names
  - **Old**: `org.camunda.community:camunda-7-to-8-rewrite-recipes`
  - **New**: `io.camunda:camunda-7-to-8-code-conversion-recipes`
- Documentation location
  - **Old**: `https://camunda-community-hub.github.io/camunda-7-to-8-code-conversion/`
  - **New**: `https://camunda.github.io/camunda-7-to-8-migration-tooling/`

All artifacts now use the `io.camunda` groupId instead of `org.camunda.community`.

**Migration steps**

If you're using OpenRewrite recipes in your project, update your dependencies:

```xml
<!-- OLD -->
<dependency>
  <groupId>org.camunda.community</groupId>
  <artifactId>camunda-7-to-8-rewrite-recipes</artifactId>
</dependency>

<!-- NEW -->
<dependency>
  <groupId>io.camunda</groupId>
  <artifactId>camunda-7-to-8-code-conversion-recipes</artifactId>
  <version>0.2.0</version>
</dependency>
```

Change all imports:

```java
// OLD
import org.camunda.migration.rewrite.*;

// NEW
import io.camunda.migration.code.*;
```

#### Diagram Converter: Repository and module changes

Diagram Converter is now officially supported by Camunda. The code repository location and module names have changed.

- Repository location
  - **Old**: `camunda-community-hub/camunda-7-to-8-migration-analyzer`
  - **New**: `camunda/camunda-7-to-8-migration-tooling`
- Maven module names
  - **Core Module**: `io.camunda:camunda-7-to-8-diagram-converter-core`
  - **Web Application**: `io.camunda:camunda-7-to-8-diagram-converter-webapp`
  - **CLI**: `io.camunda:camunda-7-to-8-diagram-converter-cli`

All artifacts now use the `io.camunda` groupId.

**Migration steps**

If you're embedding the Diagram Converter as a library, update your dependencies:

```xml
<!-- OLD -->
<dependency>
  <groupId>org.camunda.community.migration</groupId>
  <artifactId>camunda-7-to-8-migration-analyzer-core</artifactId>
</dependency>

<!-- NEW -->
<dependency>
  <groupId>io.camunda</groupId>
  <artifactId>camunda-7-to-8-diagram-converter-core</artifactId>
  <version>0.2.0</version>
</dependency>
```

For the web application or CLI, download the [latest releases](https://github.com/camunda/camunda-7-to-8-migration-tooling/releases).
