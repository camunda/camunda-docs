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
afterNonGlobal?: boolean;
```

Whether the listener runs after model-level listeners.

---

### eventTypes?

```ts
eventTypes?: GlobalTaskListenerEventTypeFilterProperty[];
```

Event types of the global listener.

---

### id?

```ts
id?: StringFilterProperty;
```

Id of the global listener.

---

### priority?

```ts
priority?: IntegerFilterProperty;
```

Priority of the global listener.

---

### retries?

```ts
retries?: IntegerFilterProperty;
```

Number of retries of the global listener.

---

### source?

```ts
source?: GlobalListenerSourceFilterProperty;
```

How the global listener was defined.

---

### type?

```ts
type?: StringFilterProperty;
```

Job type of the global listener.
