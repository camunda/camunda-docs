---
title: "Interface: EngineClockTarget"
sidebar_label: "EngineClockTarget"
mdx:
  format: md
---

# Interface: EngineClockTarget

The two engine clock operations this clock drives. Declared structurally so this module
stays independent of the generated client; `CamundaClient` satisfies it as-is.

## Methods

### pinClock()

```ts
pinClock(input): PromiseLike<unknown>;
```

#### Parameters

##### input

###### timestamp

`number`

#### Returns

`PromiseLike`\<`unknown`\>

---

### resetClock()

```ts
resetClock(): PromiseLike<unknown>;
```

#### Returns

`PromiseLike`\<`unknown`\>
