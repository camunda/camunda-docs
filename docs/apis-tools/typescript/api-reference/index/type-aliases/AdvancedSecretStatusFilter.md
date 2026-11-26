---
title: "Type Alias: AdvancedSecretStatusFilter"
sidebar_label: "AdvancedSecretStatusFilter"
mdx:
  format: md
---

# Type Alias: AdvancedSecretStatusFilter

```ts
type AdvancedSecretStatusFilter = object;
```

Advanced filter

Advanced SecretStatusEnum filter.

## Properties

### $eq?

```ts
$eq?: SecretStatusEnum;
```

Checks for equality with the provided value.

---

### $exists?

```ts
$exists?: boolean;
```

Checks if the current property exists. Every listed secret has a status, so `true`
matches every secret and `false` matches none.

---

### $in?

```ts
$in?: SecretStatusEnum[];
```

Checks if the property matches any of the provided values.

---

### $like?

```ts
$like?: LikeFilter;
```

---

### $neq?

```ts
$neq?: SecretStatusEnum;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
$notIn?: SecretStatusEnum[];
```

Checks if the property matches none of the provided values.
