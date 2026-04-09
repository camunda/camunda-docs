---
title: "Type Alias: AdvancedDeploymentKeyFilter"
sidebar_label: "AdvancedDeploymentKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedDeploymentKeyFilter

```ts
type AdvancedDeploymentKeyFilter = object;
```

Advanced filter

Advanced DeploymentKey filter.

## Properties

### $eq?

```ts
optional $eq?: DeploymentKey;
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
optional $in?: DeploymentKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: DeploymentKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: DeploymentKey[];
```

Checks if the property matches none of the provided values.
