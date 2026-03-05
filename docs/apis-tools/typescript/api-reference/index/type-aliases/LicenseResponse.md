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

Defined in: [gen/types.gen.ts:5072](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5072)

The response of a license request.

## Properties

### expiresAt

```ts
expiresAt: string | null;
```

Defined in: [gen/types.gen.ts:5088](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5088)

The date when the Camunda license expires

***

### isCommercial

```ts
isCommercial: boolean;
```

Defined in: [gen/types.gen.ts:5084](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5084)

Will be false when a license contains a non-commerical=true property

***

### licenseType

```ts
licenseType: string;
```

Defined in: [gen/types.gen.ts:5080](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5080)

Will return the license type property of the Camunda license

***

### validLicense

```ts
validLicense: boolean;
```

Defined in: [gen/types.gen.ts:5076](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5076)

True if the Camunda license is valid, false if otherwise
