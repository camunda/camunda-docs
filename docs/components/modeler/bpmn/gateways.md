---
id: gateways
title: "Overview"
description: "This document outlines an overview of currently supported gateways."
---

import ReactPlayer from 'react-player'

Gateways are elements that route tokens in more complex patterns than plain sequence flow.

BPMN's **exclusive gateway** chooses one sequence flow out of many based on data:

<center>
<ReactPlayer
playing
loop
playsinline
height="300px"
url={[
{src: '/videos/exclusive-gw.mp4', type: 'video/mp4'}
]}
/>
</center>

BPMN's **parallel gateway** generates new tokens by activating multiple sequence flows in parallel:

<center>
<ReactPlayer
playing
loop
playsinline
height="300px"
url={[
{src: '/videos/parallel-gw.mp4', type: 'video/mp4'}
]}
/>
</center>

Currently supported elements:

- [Exclusive gateways](exclusive-gateways/exclusive-gateways.md)
- [Parallel gateways](parallel-gateways/parallel-gateways.md)
- [Event-based gateways](event-based-gateways/event-based-gateways.md)
- [Inclusive gateways](inclusive-gateways/inclusive-gateways.md)
