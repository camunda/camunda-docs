---
title: "Type Alias: BasicStringFilter"
sidebar_label: "BasicStringFilter"
mdx:
  format: md
---

# Type Alias: BasicStringFilter

```ts
type BasicStringFilter = object;
```

Advanced filter

Basic advanced string filter.

## Properties

### $eq?

```ts
optional $eq?: string;
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
optional $in?: string[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: string;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: string[];
```

Checks if the property matches none of the provided values.
