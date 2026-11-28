# Camunda information architecture framework

> **Status: draft for discussion.** Part of the [docs information architecture epic (#506)](https://github.com/camunda/documentation-team/issues/506), tracked in [#568](https://github.com/camunda/documentation-team/issues/568). Builds on the hackathon braindump in [#7817](https://github.com/camunda/camunda-docs/pull/7817).

This folder defines how Camunda documentation is organized, so new content is consistent, predictable, and easy for both people and AI agents to navigate. It contains:

| File                                                             | Purpose                                                                    |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------- |
| This README                                                      | The framework: content types, decision guide, and shared rules             |
| [templates/landing-page.md](./templates/landing-page.md)         | Standard feature landing page                                              |
| [templates/concept.md](./templates/concept.md)                   | Explanation: what it is and why                                            |
| [templates/how-to-guide.md](./templates/how-to-guide.md)         | Task-oriented steps for a user who knows what they want                    |
| [templates/folder-structure.md](./templates/folder-structure.md) | Standard folder tree for every new feature                                 |
| [examples/desktop-modeler.md](./examples/desktop-modeler.md)     | Worked example: audit and proposed restructure of the Desktop Modeler docs |

Templates are copy-and-fill starting points. There are three: landing page, how-to guide, and concept. Reference pages have no template (see [content types](#1-content-types-diátaxis-adapted)). This folder is **not** published on the docs site because it is outside `docs/`.

## 1. Content types (Diátaxis, adapted)

We adopt the [Diátaxis](https://diataxis.fr/) framework, adapted to Camunda. Every page has **exactly one** primary type, which determines its structure, tone, and what it must leave out. Not every type has a template.

| Type             | User need                          | The page answers                     | Camunda title pattern                                    | Template                                                                                             |
| ---------------- | ---------------------------------- | ------------------------------------ | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Tutorial**     | "Teach me" (learning)              | "Can I get a working result?"        | `Get started with <feature>`, `Build your first <thing>` | None. Use the [how-to guide](./templates/how-to-guide.md) template for the optional Get started page |
| **How-to guide** | "Help me do X" (goal)              | "How do I achieve this task?"        | Verb phrase: `Configure…`, `Install…`, `Connect…`        | [how-to guide](./templates/how-to-guide.md)                                                          |
| **Concept**      | "Help me understand" (explanation) | "What is it, how does it work, why?" | Noun phrase: `<Feature>`, `<Feature> architecture`       | [concept](./templates/concept.md)                                                                    |
| **Reference**    | "Tell me the facts" (lookup)       | "What exactly is the value/limit?"   | `<Feature> reference`, `<Thing> properties`              | None. Reference pages live in the `reference/` folder                                                |

Camunda adds one **navigation type** on top of the four Diátaxis types:

| Type             | Purpose                                                                                                                              | Template                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| **Landing page** | Orient the reader and route them to the right tutorial, how-to, concept, or reference. Contains no instructions or facts of its own. | [landing page](./templates/landing-page.md) |

### Which type is my page?

1. Is it a hub that mostly links elsewhere? → **Landing page**.
2. Does the reader follow steps to learn, with a guaranteed outcome and a prepared example? → **Tutorial** (the optional Get started page, written with the how-to guide template).
3. Does the reader follow steps to accomplish a real-world goal they already have? → **How-to guide**.
4. Is the content mostly facts organized for scanning (tables, lists, options)? → **Reference** (place it in the `reference/` folder).
5. Is it mostly explanation (what, why, how it works, trade-offs)? → **Concept**.

If the answer is "two of these", **split the page**. Mixed pages are the main cause of long, hard-to-follow docs.

### What each type must not contain

| Type         | Keep out                                                         | Link to instead    |
| ------------ | ---------------------------------------------------------------- | ------------------ |
| Tutorial     | Option tables, alternative paths, deep explanation               | Reference, concept |
| How-to guide | Background explanation, exhaustive option lists, teaching basics | Concept, reference |
| Concept      | Step-by-step instructions, property tables                       | How-to, reference  |
| Reference    | Instructions, narrative, opinions                                | How-to, concept    |
| Landing page | Instructions, facts, long prose                                  | Everything         |

## 2. Shared rules (from the hackathon braindump)

The hackathon ([#7817](https://github.com/camunda/camunda-docs/pull/7817)) surfaced patterns the team agreed on, and topics with no preference yet. The templates encode the former; the latter are listed as [open questions](#open-questions).

### Agreed patterns

- **Deliver instructional steps as an ordered list** with one action per step. Use a bolded action as the step lead-in, followed by the detail. Use subheadings only when a step needs multiple substeps, screenshots, or tabs.
- **Organize intro sections consistently**: a one-sentence description (rendered from front matter by `<PageDescription />`), then a short "About" or "Overview" that says who the page is for and what they will achieve.
- **Organize next steps consistently**: every page except reference ends with a `## Next steps` section of 2–4 links, ordered from most to least likely. Each link says why to follow it.
- **Be opinionated in tutorials and how-to guides**: choose the recommended path and state it. Do not present equal alternatives unless the user must choose. Move alternatives to a separate how-to or to reference.
- **Keep out-of-scope tooling out**: do not teach `kubectl`, `helm install` flags, or other third-party tools. Link to their documentation.
- **Front matter is complete**: `id`, `title`, `sidebar_label`, `description` (one sentence, rendered at the top of the page), and `keywords` where useful.
- **One page, one primary type, one title pattern** from the table above.

### Writing for agents as well as humans

- Use descriptive headings. Headings are retrieval anchors for search and LLM chunking.
- Make each page self-contained enough to be understood out of context: state the feature name and prerequisites on the page rather than only by reference.
- Put facts in tables and lists, not in prose.
- Keep one topic per page. Prefer more, smaller pages linked from a landing page.

## 3. Open questions

Decide and update the templates once these are resolved.

Framework questions, tracked in the epic's sub-issues:

- Do landing pages need metadata? ([#570](https://github.com/camunda/documentation-team/issues/570))
- Can metadata point to prior context ("before reading this page, read that one")? Which Docusaurus metadata options can implement it? ([#570](https://github.com/camunda/documentation-team/issues/570))
- What is the ideal page-size threshold for agents? ([#572](https://github.com/camunda/documentation-team/issues/572))
- Does the About page stand alone as text in the concept template? ([#568](https://github.com/camunda/documentation-team/issues/568))
- Can concepts span more than one folder? ([#568](https://github.com/camunda/documentation-team/issues/568))
- What pattern can be extracted from the existing Install pages? ([#569](https://github.com/camunda/documentation-team/issues/569))

Hackathon topics with no consensus:

- Lists versus subheadings for steps (templates default to lists, see above).
- Prerequisites versus "Before you begin" (templates default to `## Prerequisites`).
- Step labels in headings (for example, `## Step 1: …`).
- Labels for target audience or time to complete.
- Distinguishing user personas.
- A custom admonition or component for advertising Academy, Marketplace, and blog content.
- Table bolding rules.
- How to present user choices (tabs, separate pages, or inline).

## 4. How to use this framework

1. Pick the type for each new page using the [decision guide](#which-type-is-my-page).
2. Copy the matching template (landing page, how-to guide, or concept) and rename the file in kebab-case. Reference pages have no template.
3. Place it in the [standard feature folder](./templates/folder-structure.md).
4. Complete the checklist at the bottom of the template, and remove all `<!-- TEMPLATE: … -->` comments.
5. Add the page to the sidebar (and a redirect if you move or rename a page) as described in the [repo instructions](../../.github/instructions/repo.instructions.md).

This framework complements the [technical writing style guide](../technical-writing-styleguide.md) and the [documentation guidelines](../documentation-guidelines.md). If they conflict, the style guide wins for wording and this framework wins for page structure.
