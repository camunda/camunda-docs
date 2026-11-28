---
title: "Type Alias: SearchUserTaskAuditLogsData"
sidebar_label: "SearchUserTaskAuditLogsData"
mdx:
  format: md
---

# Type Alias: SearchUserTaskAuditLogsData

```ts
type SearchUserTaskAuditLogsData = object;
```

## Properties

### body?

```ts
body?: UserTaskAuditLogSearchQueryRequest;
```

---

### path

```ts
path: object;
```

#### userTaskKey

```ts
userTaskKey: UserTaskKeyWritable;
```

The key of the user task.

---

### query?

```ts
query?: never;
```

---

### url

```ts
url: "/user-tasks/{userTaskKey}/audit-logs/search";
```
