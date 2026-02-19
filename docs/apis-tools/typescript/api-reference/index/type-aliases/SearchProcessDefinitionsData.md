---
title: "Type Alias: SearchProcessDefinitionsData"
sidebar_label: "SearchProcessDefinitionsData"
mdx:
  format: md
---

# Type Alias: SearchProcessDefinitionsData

```ts
type SearchProcessDefinitionsData = object;
```

Defined in: [gen/types.gen.ts:12642](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12642)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:12643](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12643)

#### Type Declaration

##### filter?

```ts
optional filter: ProcessDefinitionFilter;
```

The process definition search filters.

##### sort?

```ts
optional sort: object[];
```

Sort field criteria.

---

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:12659](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12659)

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:12660](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12660)

---

### url

```ts
url: "/process-definitions/search";
```

Defined in: [gen/types.gen.ts:12661](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12661)
