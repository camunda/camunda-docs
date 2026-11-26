---
title: "Variable: UserTaskLookupStateEnum"
sidebar_label: "UserTaskLookupStateEnum"
mdx:
  format: md
---

# Variable: UserTaskLookupStateEnum

```ts
const UserTaskLookupStateEnum: object;
```

The lifecycle state of an active user task. A state ending in `-ING` means a change to the
task is in progress, for example waiting for task listeners; the task fields still hold
the values from before the change. A claim in progress is reported as `ASSIGNING`, as in
the user task search.

## Type Declaration

### ASSIGNING

```ts
readonly ASSIGNING: "ASSIGNING" = 'ASSIGNING';
```

### CANCELING

```ts
readonly CANCELING: "CANCELING" = 'CANCELING';
```

### COMPLETING

```ts
readonly COMPLETING: "COMPLETING" = 'COMPLETING';
```

### CREATED

```ts
readonly CREATED: "CREATED" = 'CREATED';
```

### CREATING

```ts
readonly CREATING: "CREATING" = 'CREATING';
```

### UPDATING

```ts
readonly UPDATING: "UPDATING" = 'UPDATING';
```
