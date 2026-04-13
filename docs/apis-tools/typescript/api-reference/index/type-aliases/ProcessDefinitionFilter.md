---
title: "Type Alias: ProcessDefinitionFilter"
sidebar_label: "ProcessDefinitionFilter"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionFilter

```ts
type ProcessDefinitionFilter = object;
```

Process definition search filter.

## Properties

### hasStartForm?

```ts
optional hasStartForm?: boolean;
```

Indicates whether the start event of the process has an associated Form Key.

---

### isLatestVersion?

```ts
optional isLatestVersion?: boolean;
```

Whether to only return the latest version of each process definition.
When using this filter, pagination functionality is limited, you can only paginate forward using `after` and `limit`.
The response contains no `startCursor` in the `page`, and requests ignore the `from` and `before` in the `page`.
When using this filter, sorting is limited to `processDefinitionId` and `tenantId` fields only.

---

### name?

```ts
optional name?: StringFilterProperty;
```

Name of this process definition.

---

### processDefinitionId?

```ts
optional processDefinitionId?: StringFilterProperty;
```

Process definition ID of this process definition.

---

### processDefinitionKey?

```ts
optional processDefinitionKey?: ProcessDefinitionKey;
```

The key for this process definition.

---

### resourceName?

```ts
optional resourceName?: string;
```

Resource name of this process definition.

---

### tenantId?

```ts
optional tenantId?: TenantId;
```

Tenant ID of this process definition.

---

### version?

```ts
optional version?: number;
```

Version of this process definition.

---

### versionTag?

```ts
optional versionTag?: string;
```

Version tag of this process definition.
