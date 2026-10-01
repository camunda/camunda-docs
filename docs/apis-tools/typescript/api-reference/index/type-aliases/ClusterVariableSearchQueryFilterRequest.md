---
title: "Type Alias: ClusterVariableSearchQueryFilterRequest"
sidebar_label: "ClusterVariableSearchQueryFilterRequest"
mdx:
  format: md
---

# Type Alias: ClusterVariableSearchQueryFilterRequest

```ts
type ClusterVariableSearchQueryFilterRequest = object;
```

Cluster variable filter request.

## Properties

### isTruncated?

```ts
optional isTruncated?: boolean;
```

Filter cluster variables by truncation status of their stored values. When true, returns only variables whose stored values are truncated (i.e., the value exceeds the storage size limit and is truncated in storage). When false, returns only variables with non-truncated stored values. This filter is based on the underlying storage characteristic, not the response format.

---

### kind?

```ts
optional kind?: ClusterVariableKindFilterProperty;
```

The kind filter for cluster variables.

---

### metadata?

```ts
optional metadata?: object;
```

Filter by metadata entries. A map of metadata key to an advanced filter on that key's value. Metadata values are strings or numbers.

#### Index Signature

```ts
[key: string]: AdvancedMetadataValueFilter
```

---

### name?

```ts
optional name?: StringFilterProperty;
```

Name of the cluster variable.

---

### scope?

```ts
optional scope?: ClusterVariableScopeFilterProperty;
```

The scope filter for cluster variables.

---

### tenantId?

```ts
optional tenantId?: StringFilterProperty;
```

Tenant ID of this variable.

---

### value?

```ts
optional value?: StringFilterProperty;
```

The value of the cluster variable.
