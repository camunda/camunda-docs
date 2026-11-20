---
title: Best Practices
description: "Condensed Camunda project experience covering process modeling, development, architecture, operations, and agentic orchestration, as a mix of conceptual and practical implementation guidance."
---

import AoGrid from '../react-components/\_ao-card';
import { projectManagementCards, architectureCards, developmentCards, modelingCards, operationsCards, cicdCards } from '../react-components/\_best-practices-card-data';

The Camunda Best Practices distill Camunda's experience with BPMN, DMN, and agentic orchestration on the Camunda toolstack, drawing on consulting engagements, community feedback, and customer projects. They offer a blend of conceptual and practical guidance, generalized from current project experience. They are not definitive: learning is ongoing, and how well a practice applies depends on your situation.

Note that Camunda extends the same guarantee to Best Practices as to the core product. However, Camunda cannot ensure the absolute accuracy or timeliness of the information provided, and disclaims any liability for damages resulting from applying these recommendations.

## Project management

<AoGrid ao={projectManagementCards} columns={2}/>

## Architecture

<AoGrid ao={architectureCards} columns={2}/>

## Development

<AoGrid ao={developmentCards} columns={3}/>

## Modeling

<AoGrid ao={modelingCards} columns={3}/>

## Operations

<AoGrid ao={operationsCards} columns={2}/>

## CI/CD guidelines

<AoGrid ao={cicdCards} columns={2}/>
