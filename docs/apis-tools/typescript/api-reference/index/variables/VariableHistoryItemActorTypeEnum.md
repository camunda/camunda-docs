---
title: "Variable: VariableHistoryItemActorTypeEnum"
sidebar_label: "VariableHistoryItemActorTypeEnum"
mdx:
  format: md
---

# Variable: VariableHistoryItemActorTypeEnum

```ts
const VariableHistoryItemActorTypeEnum: object;
```

The type of the actor who performed the operation. Camunda can add values in later
versions; clients must handle unknown values gracefully.

## Type Declaration

### CLIENT

```ts
readonly CLIENT: "CLIENT" = 'CLIENT';
```

### ENGINE

```ts
readonly ENGINE: "ENGINE" = 'ENGINE';
```

### UNKNOWN

```ts
readonly UNKNOWN: "UNKNOWN" = 'UNKNOWN';
```

### USER

```ts
readonly USER: "USER" = 'USER';
```
