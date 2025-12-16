---
id: update-guide
title: Update Guide
sidebar_label: Update Guide
description: "Breaking changes and migration steps for updating the Migration Tooling between versions."
---

This guide explains breaking changes and migration steps when you upgrade Migraiton Tooling.

The Migration Tooling follows [semantic versioning](https://semver.org/).

## Version compatibility

Before you update, do the following:

1. Check the [version compatibility matrix](version-compatibility.md) to confirm compatibility with your Camunda 7 and Camunda 8 versions.
2. Review the [Migration Tooling release notes](https://github.com/camunda/camunda-7-to-8-migration-tooling/releases) for your target version.

## Update process

1. Review the breaking changes for your target version.
2. Update your custom interceptors and configuration.
3. Test the migration in a non-production environment.
4. Back up the migration state database.
5. Update the Migration Tooling binaries.
6. Validate your custom code.

## Breaking changes by version

<!-- HEADS-UP: ADD NEW VERSIONS ALWAYS TO THE TOP OF THIS LIST -->

### Version 0.1.x to 0.2.0

Release date: 17/12/2025 \
Camunda 8 compatibility: 8.8.x

#### Data Migrator: Package name changes

The package name of the Data Migrator has changed from `io.camunda.migrator` to `io.camunda.migration.data`.

Please ensure your custom interceptors and `application.yml` configuration are updated accordingly.

Change your import statements from:

#### 0.1.x

```java
import io.camunda.migrator.interceptor.VariableInterceptor;
```

#### 0.2.0

```java
import io.camunda.migration.data.interceptor.VariableInterceptor;
```

Change your `application.yml` configuration as follows for built-in interceptors:

#### 0.1.x

```yaml
camunda.migrator.interceptors:
  - class-name: io.camunda.migrator.impl.interceptor.DateVariableTransformer
    enabled: false
```

#### 0.2.0

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

#### Migration steps

1. Update method signature from `VariableInvocation` to `VariableContext`
2. Replace `invocation.getC7Variable()` with `context.getC7Value()` or `context.getC7TypedValue()`
3. Replace `invocation.getMigrationVariable().getName()` with `context.getName()`
4. Replace `invocation.setVariableValue()` with `context.setC8Value()`
5. Optionally add entity type filtering using `getEntityTypes()`
6. Optionally add runtime/history context detection using `context.isRuntime()` or `context.isHistory()`

#### See also

- [Variables documentation](data-migrator/variables.md)
