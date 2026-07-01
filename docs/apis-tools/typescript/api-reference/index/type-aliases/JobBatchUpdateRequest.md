---
title: "Type Alias: JobBatchUpdateRequest"
sidebar_label: "JobBatchUpdateRequest"
mdx:
  format: md
---

# Type Alias: JobBatchUpdateRequest

```ts
type JobBatchUpdateRequest = object;
```

The filter and changeset for a batch job update operation. The filter defines which jobs are updated; the changeset defines what to update. At least one changeset field must be non-null.

## Properties

### changeset

```ts
changeset: JobChangeset;
```

The fields to update. At least one field must be non-null.

---

### filter

```ts
filter: JobFilter;
```

The job filter. At least one dimension must be set.

---

### operationReference?

```ts
optional operationReference?: OperationReference;
```
