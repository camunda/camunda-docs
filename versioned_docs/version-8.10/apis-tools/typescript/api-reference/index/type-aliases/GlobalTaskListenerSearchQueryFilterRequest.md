---
title: "Type Alias: GlobalTaskListenerSearchQueryFilterRequest"
sidebar_label: "GlobalTaskListenerSearchQueryFilterRequest"
mdx:
  format: md
---

# Type Alias: GlobalTaskListenerSearchQueryFilterRequest

```ts
type GlobalTaskListenerSearchQueryFilterRequest = object;
```

Global listener filter request.

## Properties

### afterNonGlobal?

```ts
optional afterNonGlobal?: boolean;
```

Whether the listener runs after model-level listeners.

---

### eventTypes?

```ts
optional eventTypes?: GlobalTaskListenerEventTypeFilterProperty[];
```

Event types of the global listener.

---

### id?

```ts
optional id?: StringFilterProperty;
```

Id of the global listener.

---

### priority?

```ts
optional priority?: IntegerFilterProperty;
```

Priority of the global listener.

---

### retries?

```ts
optional retries?: IntegerFilterProperty;
```

Number of retries of the global listener.

---

### source?

```ts
optional source?: GlobalListenerSourceFilterProperty;
```

How the global listener was defined.

---

### type?

```ts
optional type?: StringFilterProperty;
```

Job type of the global listener.
