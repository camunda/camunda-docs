---
id: token-simulation
title: Token simulation
description: Use token simulation to get a deeper understanding of the BPMN execution semantics by playing, pausing, and stepping through your processes.
---

Get a deeper understanding of the BPMN execution semantic. Play, pause, and step through a process just like a BPMN 2.0 compliant engine would.

:::tip
Token simulation is a BPMN learning tool, not a fully featured BPMN engine.

If you are developing your process and want to validate how _exactly_ it would execute on Camunda, [give Test mode a try](test-your-process.md).
:::

### Turn on/off

1. In Camunda Hub, open your BPMN diagram.
2. Switch to [**Design** mode](/components/hub/workspace/modeler/collaboration/collaborate-with-modes.md).
3. In the top right corner of the modeling interface, toggle **Token simulation**. (You can also use the keyboard shortcut `T` inside the canvas). The modeling features will not work while you are in token simulation mode.

### Start simulation

The simulation can be started by triggering an event. To do this, select the "play" icon hovering over the event.

### Token simulation palette

The palette on the top left side provides the following controls:

- Play/pause simulation
- Reset simulation
- Show simulation log

### Animation speed palette

The speed of the simulation can be changed using the arrow controls at the top of the screen.
