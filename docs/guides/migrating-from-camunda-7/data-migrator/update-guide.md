---
id: update-guide
title: Update Guide
sidebar_label: Update Guide
description: "Breaking changes and migration steps when updating the Data Migrator between versions."
---

This guide documents breaking changes and important updates when upgrading the Data Migrator between different versions.

The Data Migrator follows [semantic versioning](https://semver.org/).

## Version Compatibility

Before updating:

1. Check the [version compatibility matrix](version-compatibility.md) to ensure compatibility with your Camunda 7 and Camunda 8 versions
2. Review the Data Migrator [release notes](https://github.com/camunda/camunda-7-to-8-migration-tooling/releases) for your target version

## Update Process

1. Review the breaking changes for your target version below
2. Update any custom interceptors or configurations
3. Test the migration in a non-production environment
4. Back up your migration state database
5. Update the Data Migrator binaries
6. Validate that your custom code still works

## Breaking Changes by Version

<!-- HEADS-UP: ADD NEW VERSIONS ALWAYS TO THE TOP OF THIS LIST -->

### Version 0.1.x → 0.2.0

**Release Date**: TBD\
**Camunda 8 Compatibility**: 8.9

#### Variable Interceptor API Changes

The variable interceptor API has been improved to support history migration and provide better context awareness.

**Breaking Changes**:

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

**Migration Steps**:

1. Update method signature from `VariableInvocation` to `VariableContext`
2. Replace `invocation.getC7Variable()` with `context.getC7Value()` or `context.getC7TypedValue()`
3. Replace `invocation.getMigrationVariable().getName()` with `context.getName()`
4. Replace `invocation.setVariableValue()` with `context.setC8Value()`
5. Optionally add entity type filtering using `getEntityTypes()`
6. Optionally add runtime/history context detection using `context.isRuntime()` or `context.isHistory()`

**See Also**: [Variables documentation](variables.md)
