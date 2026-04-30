---
title: "Type Alias: ActivateAdHocSubProcessActivitiesData"
sidebar_label: "ActivateAdHocSubProcessActivitiesData"
mdx:
  format: md
---

# Type Alias: ActivateAdHocSubProcessActivitiesData

```ts
type ActivateAdHocSubProcessActivitiesData = object;
```

## Properties

### body

```ts
body: AdHocSubProcessActivateActivitiesInstruction;
```

---

### path

```ts
path: object;
```

#### adHocSubProcessInstanceKey

```ts
adHocSubProcessInstanceKey: ElementInstanceKey;
```

The key of the ad-hoc sub-process instance that contains the activities.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/element-instances/ad-hoc-activities/{adHocSubProcessInstanceKey}/activation";
```
