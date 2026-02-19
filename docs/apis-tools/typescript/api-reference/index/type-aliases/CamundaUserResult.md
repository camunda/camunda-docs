---
title: "Type Alias: CamundaUserResult"
sidebar_label: "CamundaUserResult"
mdx:
  format: md
---

# Type Alias: CamundaUserResult

```ts
type CamundaUserResult = object;
```

Defined in: [gen/types.gen.ts:488](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L488)

## Properties

### authorizedComponents?

```ts
optional authorizedComponents: string[];
```

Defined in: [gen/types.gen.ts:504](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L504)

The web components the user is authorized to use.

---

### c8Links

```ts
c8Links: object;
```

Defined in: [gen/types.gen.ts:524](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L524)

The links to the components in the C8 stack.

#### Index Signature

```ts
[key: string]: string
```

---

### canLogout

```ts
canLogout: boolean;
```

Defined in: [gen/types.gen.ts:530](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L530)

Flag for understanding if the user is able to perform logout.

---

### displayName?

```ts
optional displayName: string | null;
```

Defined in: [gen/types.gen.ts:496](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L496)

The display name of the user.

---

### email?

```ts
optional email: string | null;
```

Defined in: [gen/types.gen.ts:500](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L500)

The email of the user.

---

### groups

```ts
groups: string[];
```

Defined in: [gen/types.gen.ts:512](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L512)

The groups assigned to the user.

---

### roles

```ts
roles: string[];
```

Defined in: [gen/types.gen.ts:516](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L516)

The roles assigned to the user.

---

### salesPlanType

```ts
salesPlanType: string;
```

Defined in: [gen/types.gen.ts:520](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L520)

The plan of the user.

---

### tenants

```ts
tenants: TenantResult[];
```

Defined in: [gen/types.gen.ts:508](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L508)

The tenants the user is a member of.

---

### username?

```ts
optional username: Username | null;
```

Defined in: [gen/types.gen.ts:492](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L492)

The username of the user.
