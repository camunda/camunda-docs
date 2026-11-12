---
title: "Type Alias: AdvancedMetadataValueFilter"
sidebar_label: "AdvancedMetadataValueFilter"
mdx:
  format: md
---

# Type Alias: AdvancedMetadataValueFilter

```ts
type AdvancedMetadataValueFilter = object;
```

Advanced filter

Advanced filter on a metadata value (string or number).

## Properties

### $eq?

```ts
$eq?: string | number;
```

Checks for equality with the provided value.

---

### $exists?

```ts
$exists?: boolean;
```

Checks if the metadata key exists.

---

### $gt?

```ts
$gt?: number;
```

Greater than comparison with the provided value.

---

### $gte?

```ts
$gte?: number;
```

Greater than or equal comparison with the provided value.

---

### $in?

```ts
$in?: (string | number)[];
```

Checks if the property matches any of the provided values.

---

### $like?

```ts
$like?: LikeFilter;
```

---

### $lt?

```ts
$lt?: number;
```

Lower than comparison with the provided value.

---

### $lte?

```ts
$lte?: number;
```

Lower than or equal comparison with the provided value.

---

### $neq?

```ts
$neq?: string | number;
```

Checks for inequality with the provided value.
