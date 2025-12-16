---
id: update-guide
title: Update Guide
sidebar_label: Update Guide
description: "Breaking changes and migration steps for updating the Migration Tooling between versions."
---

This guide explains breaking changes and migration steps when you upgrade Migration Tooling.

The Migration Tooling follows [semantic versioning](https://semver.org/).

Before you update, do the following:

1. Check the [version compatibility matrix](version-compatibility.md) to confirm compatibility with your Camunda 7 and Camunda 8 versions.
2. Review the [Migration Tooling release notes](https://github.com/camunda/camunda-7-to-8-migration-tooling/releases) for your target version.

## Breaking changes by version

<!-- HEADS-UP: ADD NEW VERSIONS ALWAYS TO THE TOP OF THIS LIST -->

### Version 0.1.x to 0.2.0

Release date: 17/12/2025 \
Camunda 8 compatibility: 8.8.x

#### Data Migrator: Package name changes

The package name of the Data Migrator has changed from `io.camunda.migrator` to `io.camunda.migration.data`.

Please ensure your custom interceptors and `application.yml` configuration are updated accordingly.

Change your import statements from:

##### 0.1.x

```java
import io.camunda.migrator.interceptor.VariableInterceptor;
```

##### 0.2.0

```java
import io.camunda.migration.data.interceptor.VariableInterceptor;
```

Change your `application.yml` configuration as follows for built-in interceptors:

##### 0.1.x

```yaml
camunda.migrator.interceptors:
  - class-name: io.camunda.migrator.impl.interceptor.DateVariableTransformer
    enabled: false
```

##### 0.2.0

```yaml
camunda.migrator.interceptors:
  - class-name: io.camunda.migration.data.impl.interceptor.DateVariableTransformer
    enabled: false
```

#### Data Migrator: Variable interceptor API changes

This release updates the variable interceptor API to support history migration and improve context awareness.

1. **`VariableInvocation` renamed to `VariableContext`**

   ```java
   // BEFORE (0.1.x)
   public void execute(VariableInvocation invocation) {
       VariableInstanceEntity variable = invocation.getC7Variable();
       String processInstanceId = variable.getProcessInstanceId();

       invocation.setVariableValue(transformedValue);
   }

   // AFTER (0.2.0+)
   public void execute(VariableContext context) {
       VariableInstanceEntity variable = (VariableInstanceEntity) context.getEntity();
       String processInstanceId = variable.getProcessInstanceId();

       String name = context.getName();
       Object value = context.getC7Value();
       context.setC8Value(transformedValue);
   }
   ```

2. **`MigrationVariableDto` class removed**
   - Use `VariableContext` methods directly instead
   - `getName()` and `getC8Value()`/`setC8Value()` replace DTO access

##### Migration steps

1. Update method signature from `VariableInvocation` to `VariableContext`
2. Replace `invocation.getC7Variable()` with `context.getC7Value()` or `context.getC7TypedValue()`
3. Replace `invocation.getMigrationVariable().getName()` with `context.getName()`
4. Replace `invocation.setVariableValue()` with `context.setC8Value()`
5. Optionally add entity type filtering using `getEntityTypes()`
6. Optionally add runtime/history context detection using `context.isRuntime()` or `context.isHistory()`

##### See also

- [Variables documentation](data-migrator/variables.md)

#### Code Conversion: Repository and package changes

Code conversion is now officially supported by Camunda. The code repository and package names have changed.

##### Repository location

- **Old**: `camunda-community-hub/camunda-7-to-8-code-conversion`
- **New**: `camunda/camunda-7-to-8-migration-tooling`

##### Package naming

- **Old**: `org.camunda.migration.rewrite.*`
- **New**: `io.camunda.migration.code.*`

##### Module naming

The following Maven modules have been renamed:

- **Parent Module**:
  - **Old**: `org.camunda.migration:camunda-7-to-8-rewrite-recipes-parent`
  - **New**: `io.camunda:camunda-7-to-8-code-conversion-parent`

- **Recipes Module**:
  - **Old**: `org.camunda.migration:camunda-7-to-8-rewrite-recipes`
  - **New**: `io.camunda:camunda-7-to-8-code-conversion-recipes`

All artifacts now use the `io.camunda` groupId instead of `org.camunda.migration`.

##### Migration steps

If you are using the OpenRewrite recipes in your project, update your dependencies:

###### 0.1.x

```xml
<dependency>
  <groupId>org.camunda.migration</groupId>
  <artifactId>camunda-7-to-8-rewrite-recipes</artifactId>
</dependency>
```

###### 0.2.0

```xml
<dependency>
  <groupId>io.camunda</groupId>
  <artifactId>camunda-7-to-8-code-conversion-recipes</artifactId>
  <version>0.2.0</version>
</dependency>
```

Update imports: Change all imports from:

###### 0.1.x

```java
import org.camunda.migration.rewrite.*;
```

###### 0.2.0

```java
import io.camunda.migration.code.*;
```

#### Diagram Converter: Repository and module changes

Diagram converter is now officially supported by Camunda. The code repository location and module names have changed.

##### Repository location

- **Old**: `camunda-community-hub/camunda-7-to-8-diagram-conversion`
- **New**: `camunda/camunda-7-to-8-migration-tooling`

##### Documentation location

- **Old**: `https://camunda-community-hub.github.io/camunda-7-to-8-code-conversion/`
- **New**: `https://camunda.github.io/camunda-7-to-8-migration-tooling/`

##### Module naming

The following Maven modules are now available:

- **Parent Module**: `io.camunda:camunda-7-to-8-diagram-converter-parent`
- **Core Module**: `io.camunda:camunda-7-to-8-diagram-converter-core`
- **Web Application**: `io.camunda:camunda-7-to-8-diagram-converter-webapp`
- **CLI**: `io.camunda:camunda-7-to-8-diagram-converter-cli`

All artifacts now use the `io.camunda` groupId.

##### Migration steps

If you are embedding the diagram converter as a library, update your dependencies:

###### 0.1.x

```xml
<dependency>
  <groupId>org.camunda.migration</groupId>
  <artifactId>camunda-7-to-8-diagram-converter-core</artifactId>
</dependency>
```

###### 0.2.0

```xml
<dependency>
  <groupId>io.camunda</groupId>
  <artifactId>camunda-7-to-8-diagram-converter-core</artifactId>
  <version>0.2.0</version>
</dependency>
```

For the web application or CLI, download the latest releases from:
https://github.com/camunda/camunda-7-to-8-migration-tooling/releases
