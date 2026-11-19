---
id: <feature>
title: <Feature name>
sidebar_label: <Feature name>
description: "<One sentence: what the feature does and the outcome it gives the user. Rendered on the page by PageDescription.>"
keywords: [<feature>, <related term>, <related term>]
---

<!--
TEMPLATE: Landing page
Based on: Agentic orchestration (guides/build-with-ai/overview), MCP Client, and IDP landing pages.
Purpose: orient the reader and route them to the right tutorial, how-to, concept, or reference.
A landing page contains NO instructions and NO reference facts. If it grows beyond one screen of prose, move content to a concept page.
File location: docs/<area>/<feature>/<feature>.md (see folder-structure.md). Set as the category link in the sidebar.
Delete every "TEMPLATE:" comment before committing.
-->

import PageDescription from '@site/src/components/PageDescription';
import AoGrid from '<relative path>/react-components/\_ao-card';

<PageDescription />

<!-- TEMPLATE: Optional. At most one availability or status admonition, for example alpha, SaaS-only, or required license. -->

## About <feature>

<!-- TEMPLATE: 2–4 sentences. What it is, who it is for, and the main benefit. Link to the concept page for depth. No steps. -->

<Feature> lets you <do what> so you can <benefit>. Use it when <situation>.

[Learn what <feature> is](./concepts/what-is-<feature>.md)

## Get started

<!-- TEMPLATE: The shortest path to a working result. Exactly one primary call to action, optionally 2–3 cards. -->

<AoGrid columns={3} ao={[
{
link: "./get-started/get-started-<feature>/",
title: "Get started with <feature>",
image: <IconImg>,
description: "<One sentence outcome.>",
},
]} />

## Learn the fundamentals

<!-- TEMPLATE: Concept pages. Include only if the feature has concepts to learn before use. -->

<AoGrid columns={3} ao={[
{ link: "./concepts/<concept>/", title: "<Concept>", image: <IconImg>, description: "<What the reader will understand.>" },
]} />

## Build and configure

<!-- TEMPLATE: How-to guides, grouped by user goal, not by UI structure. Use a task verb in card titles. -->

<AoGrid columns={3} ao={[
{ link: "./how-to/<task>/", title: "<Verb> <object>", image: <IconImg>, description: "<The goal this achieves.>" },
]} />

## Reference

<!-- TEMPLATE: Reference pages only. -->

<AoGrid columns={3} ao={[
{ link: "./reference/<feature>-reference/", title: "<Feature> reference", image: <IconImg>, description: "<The facts the reader can look up.>" },
]} />

## Explore further resources

<!-- TEMPLATE: Optional. Examples, Academy courses, blog posts, webinars, Marketplace listings. External links use class="link-arrow". -->

<p><a href="<url>" class="link-arrow" target="_blank">Try out <example></a></p>

<!--
TEMPLATE checklist
- [ ] Front matter is complete and the description is one sentence.
- [ ] Contains no steps, no property tables, and no long explanations.
- [ ] Section order: About, Get started, Fundamentals, Build and configure, Reference (omit empty sections).
- [ ] Every card links to a page of a single, clear type.
- [ ] Added to the sidebar as the category link for the feature folder.
-->
