---
id: your-architecture
title: "Your architecture"
sidebar_label: "Your architecture"
description: "See the Camunda 8 Self-Managed architecture on AWS that your choices in the guided deployment describe, with a diagram, a bill of materials, and a link to share it."
pagination_prev: null
pagination_next: null
---

import { AllOptions, GuidedNext, GuidedProgress, YourArchitecture } from "@site/src/components/GuidedDeployment";

Your architecture is the Camunda 8 Self-Managed deployment on AWS that your choices in the guided deployment describe. This page draws it, lists every choice with a link back to its step, and gives you a link that reproduces it.

<GuidedProgress />

## See the diagram and the bill of materials

The diagram shows the regions, the network, the compute, the storage, the buckets, the load balancers, DNS, and TLS, the Orchestration Cluster components, the management plane, the identity provider, and how they connect. Steps that you haven't decided yet use their defaults, and the bill of materials marks them.

<YourArchitecture />

## Share or change your architecture

The choices live in the query string of the page, so a link reproduces the same architecture. Use **Copy link to your architecture**, or copy the address of the page. A link wins over the choices stored in your browser.

To change a choice, open its step from the bill of materials or the progress above. A change can rule out a later choice: the step clears it and tells you why. **Reset choices** clears every choice.

## See every option

The guided deployment has one model of every option and the rules between them. The diagram below shows it: which choice requires another, which one rules out another, and which choices raise a question.

<AllOptions />

## Deploy your architecture

Each step page ends with the Terraform of its stage, for Amazon ECS, and the order to apply the stages in. To grow later, see [grow to two regions](./grow/single-to-dual-region.md) and [grow to three regions](./grow/dual-to-three-regions.md).

## Next steps

- [Guided deployment overview](./guided-deployment.md)
- [Grow to two regions](./grow/single-to-dual-region.md)

<GuidedNext />
