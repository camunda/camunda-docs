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

Defined in: [gen/types.gen.ts:5143](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5143)

The response of a license request.

## Properties

### expiresAt

```ts
expiresAt: string | null;
```

Defined in: [gen/types.gen.ts:5159](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5159)

The date when the Camunda license expires

---

### isCommercial

```ts
isCommercial: boolean;
```

Defined in: [gen/types.gen.ts:5155](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5155)

Will be false when a license contains a non-commerical=true property

---

### licenseType

```ts
licenseType: string;
```

Defined in: [gen/types.gen.ts:5151](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5151)

Will return the license type property of the Camunda license

---

### validLicense

```ts
validLicense: boolean;
```

Defined in: [gen/types.gen.ts:5147](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5147)

True if the Camunda license is valid, false if otherwise
