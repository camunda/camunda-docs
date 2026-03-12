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

Defined in: [gen/types.gen.ts:5140](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5140)

The response of a license request.

## Properties

### expiresAt

```ts
expiresAt: string | null;
```

Defined in: [gen/types.gen.ts:5156](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5156)

The date when the Camunda license expires

***

### isCommercial

```ts
isCommercial: boolean;
```

Defined in: [gen/types.gen.ts:5152](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5152)

Will be false when a license contains a non-commerical=true property

***

### licenseType

```ts
licenseType: string;
```

Defined in: [gen/types.gen.ts:5148](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5148)

Will return the license type property of the Camunda license

***

### validLicense

```ts
validLicense: boolean;
```

Defined in: [gen/types.gen.ts:5144](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5144)

True if the Camunda license is valid, false if otherwise
