---
title: "Type Alias: AdvancedAuditLogEntityKeyFilter"
sidebar_label: "AdvancedAuditLogEntityKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedAuditLogEntityKeyFilter

```ts
type AdvancedAuditLogEntityKeyFilter = object;
```

Defined in: [gen/types.gen.ts:332](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L332)

Advanced filter

Advanced entityKey filter.

## Properties

### $eq?

```ts
optional $eq: AuditLogEntityKey;
```

Defined in: [gen/types.gen.ts:336](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L336)

Checks for equality with the provided value.

***

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:344](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L344)

Checks if the current property exists.

***

### $in?

```ts
optional $in: AuditLogEntityKey[];
```

Defined in: [gen/types.gen.ts:348](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L348)

Checks if the property matches any of the provided values.

***

### $neq?

```ts
optional $neq: AuditLogEntityKey;
```

Defined in: [gen/types.gen.ts:340](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L340)

Checks for inequality with the provided value.

***

### $notIn?

```ts
optional $notIn: AuditLogEntityKey[];
```

Defined in: [gen/types.gen.ts:352](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L352)

Checks if the property matches none of the provided values.
