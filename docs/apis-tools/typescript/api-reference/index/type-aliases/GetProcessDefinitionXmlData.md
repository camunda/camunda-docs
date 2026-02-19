---
title: "Type Alias: GetProcessDefinitionXmlData"
sidebar_label: "GetProcessDefinitionXmlData"
mdx:
  format: md
---

# Type Alias: GetProcessDefinitionXmlData

```ts
type GetProcessDefinitionXmlData = object;
```

Defined in: [gen/types.gen.ts:13103](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13103)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:13104](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13104)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13105](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13105)

#### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The assigned key of the process definition, which acts as a unique identifier for this process definition.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13112](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13112)

---

### url

```ts
url: "/process-definitions/{processDefinitionKey}/xml";
```

Defined in: [gen/types.gen.ts:13113](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13113)
