---
title: "Type Alias: AdvancedJobKeyFilter"
sidebar_label: "AdvancedJobKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedJobKeyFilter

```ts
type AdvancedJobKeyFilter = object;
```

Advanced filter

Advanced JobKey filter.

## Properties

### $eq?

```ts
optional $eq?: JobKey;
```

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Checks if the current property exists.

---

### $in?

```ts
optional $in?: JobKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: JobKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: JobKey[];
```

Checks if the property matches none of the provided values.
