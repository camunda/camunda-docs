---
title: "Type Alias: LicenseResponse"
sidebar_label: "LicenseResponse"
mdx:
  format: md
---

# Type Alias: LicenseResponse

```ts
type LicenseResponse = object;
```

The response of a license request.

## Properties

### expiresAt

```ts
expiresAt: string | null;
```

The date when the Camunda license expires

---

### isCommercial

```ts
isCommercial: boolean;
```

Will be false when a license contains a non-commerical=true property

---

### licenseType

```ts
licenseType: string;
```

Will return the license type property of the Camunda license

---

### validLicense

```ts
validLicense: boolean;
```

True if the Camunda license is valid, false if otherwise
