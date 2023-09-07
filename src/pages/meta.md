---
title: How to use the docs
description: Learn how Camunda Platform 8 docs are structured and what you can expect when using the docs
---

# How to use the docs

[docs.camunda.io](https://docs.camunda.io) is home to the Camunda Platform 8 docs, including all of the components.

Whether you are reading the docs to understand how Camunda Platform 8 works, or helping write the docs, this _meta_ page will give you all the information you need to be successful.

## Structure

Camunda Platform 8 docs are structured in such a way that the documentation is SaaS-first, meaning you will be introduced to the following based on how they are used in Camunda Platform 8 SaaS:

- Guides: Step-by-step material to get started with Camunda Platform 8.
- Components: Product manual and conceptual content for each component in Camunda Platform 8, including Console, Modeler, Zeebe, Operate, Optimize, and Tasklist. Here, you'll also find The Camunda Best Practices section. This section is our condensed experience of using BPMN and DMN on the Camunda toolstack, and is collected by consulting engagement with our customers and feedback from the community.
- APIs & clients: A section dedicated to a variety of offered APIs and clients for integration.
- Reference: General reference material for Camunda Platform 8, including a glossary, supported environments, and dependencies.

### Self-Managed section

Keen eyes may notice the Self-Managed section in the top navigation or the icon on the main page looks a little different than the rest of the sections. This is intentional to help distinguish this area in the docs from SaaS-focused content.

In the Self-Managed section, documentation includes guidance specifically for Self-Managed users that may not apply to SaaS users, including deployment guides for current components of Camunda Platform 8.

In addition, you can find Optimize documentation for Camunda Platform 7 in this section.

## Badges

As the product matures, the documentation will grow. We are experimenting with added visuals near the top of the docs to help you understand the expectations for a given piece of content. For example, how long will it take to read and complete the tasks in the doc? Is this particular document targeted toward beginners versus advanced users? Is this document exclusive to Camunda Platform 7 or Camunda Platform 8 users?

Disagree with how we've badged our content? Feel free to submit a PR!

### Difficulty badges

Our getting started guides are for beginners and always will be. However, not all of our guides will be getting started guides! Look for these labels to help you understand what's the best guide for your level.

<span class="badge badge--beginner">Beginner</span>

`<span class="badge badge--beginner">Beginner</span>`

<span class="badge badge--intermediate">Intermediate</span>

`<span class="badge badge--intermediate">Intermediate</span>`

<span class="badge badge--advanced">Advanced</span>

`<span class="badge badge--advanced">Advanced</span>`

### Time estimate badges

We use a mix of word count and reading estimates mixed with hands-on experience to determine our estimations.

<span class="badge badge--short">Time estimate: 5 minutes</span>

`<span class="badge badge--short">Time estimate: 5 minutes</span>`

<span class="badge badge--medium">Time estimate: 20 minutes</span>

`<span class="badge badge--medium">Time estimate: 20 minutes</span>`

<span class="badge badge--long">Time estimate: 1 hour</span>

`<span class="badge badge--long">Time estimate: 1 hour</span>`

### Product or component specific badges

Shipping incrementally means we may not always be at feature parity between Camunda Platform 8 and Camunda Platform 7 or Desktop Modeler and Web Modeler.

In those instances, big or small, we want to make sure you can see what works with each product or component.

<span class="badge badge--platform">Camunda Platform 7 only</span>

`<span class="badge badge--platform">Camunda Platform 7 only</span>`

<span class="badge badge--cloud">Camunda Platform 8 only</span>

`<span class="badge badge--cloud">Camunda Platform 8 only</span>`

## Front-matter values

Your front matter should mirror the following structure when creating documentation:

```
---
id: orchestrate-microservices
title: Getting started with microservice orchestration
sidebar_label: Getting started with microservice orchestration
description: "Orchestrate Microservices along a business process for visibility and resilience."
keywords: [microservices, orchestration, getting-started]
---
```

Take a look at Docusaurs' [guidance on headers and Markdown features](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter) for more details.

- id: The id is what connects a specific unique file id to the Docusaurus sidebar, not just the filename. To avoid confusion between the file and the sidebar id, we recommend making both of these the same. For example, a filename may be `learn-about-camunda.md` and therefore we may name the id `learn-about-camunda`.
- title: The title is what will be shown as the header of the page once clicked on. Note that all titles are to be in sentence-case structure, according to the [Camunda style guide](https://camunda.com/brand/writing-style-guide/). Note that search engines typically display 50-60 characters of a title, so ensure your title does not exceed this.
- sidebar_label: (optional) The sidebar_label represents what the file is shown as in the sidebar of the documentation. We recommend the sidebar_label to be the same (or similar, but shortened) as the title and/or id to avoid confusion.
- description: The description of your document which will become the `<meta name="description" content="..."/> and <meta property="og:description" content="..."/> in <head>`, used by search engines. Outline a description for your document if you wish for your content to do well alongside search engine optimization (SEO).According to several resources, including the [Search Engine Journal](https://www.searchenginejournal.com/on-page-seo/optimize-meta-description/), [Moz](https://moz.com/learn/seo/meta-description), and Google, descriptions should be between 150-160 characters.
- keywords: (optional) Take a look at [Docusaurus' guidance on SEO and keywords](https://docusaurus.io/docs/next/seo).
