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

Defined in: [gen/types.gen.ts:4502](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4502)

The response of a license request.

## Properties

### expiresAt?

```ts
optional expiresAt: string | null;
```

Defined in: [gen/types.gen.ts:4518](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4518)

The date when the Camunda license expires

---

### isCommercial

```ts
isCommercial: boolean;
```

Defined in: [gen/types.gen.ts:4514](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4514)

Will be false when a license contains a non-commerical=true property

---

### licenseType

```ts
licenseType: string;
```

Defined in: [gen/types.gen.ts:4510](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4510)

Will return the license type property of the Camunda license

---

### validLicense

```ts
validLicense: boolean;
```

Defined in: [gen/types.gen.ts:4506](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4506)

True if the Camunda license is valid, false if otherwise
