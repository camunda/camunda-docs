---
title: "Type Alias: AdvancedIntegerFilter"
sidebar_label: "AdvancedIntegerFilter"
mdx:
  format: md
---

# Type Alias: AdvancedIntegerFilter

```ts
type AdvancedIntegerFilter = object;
```

Advanced filter

Advanced integer (int32) filter.

## Properties

### $eq?

```ts
optional $eq?: number;
```

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Checks if the current property exists.

---

### $gt?

```ts
optional $gt?: number;
```

Greater than comparison with the provided value.

---

### $gte?

```ts
optional $gte?: number;
```

Greater than or equal comparison with the provided value.

---

### $in?

```ts
optional $in?: number[];
```

Checks if the property matches any of the provided values.

---

### $lt?

```ts
optional $lt?: number;
```

Lower than comparison with the provided value.

---

### $lte?

```ts
optional $lte?: number;
```

Lower than or equal comparison with the provided value.

---

### $neq?

```ts
optional $neq?: number;
```

Checks for inequality with the provided value.
