## Description

<!-- Provide an overview of what to expect in the PR. -->
<!-- Relate or link the associated epic or task. -->
<!-- Add `@camunda/tech-writers` as reviewer to pull in a tech writer, or add your embedded tech writer. -->

## When should this change go live?

<!-- PRs merged go to stage.docs.camunda.io first and must be manually released to docs.camunda.io. -->

- [ ] This is a bug fix, security concern, or something that needs **urgent release support**. (apply `bug` or `support` label)
- [ ] This is already available but undocumented and should be released within a week. (apply `available & undocumented` label)
- [ ] This is on a **specific schedule** and the assignee will coordinate a release with the DevEx team. (create draft PR and/or apply `hold` label)
- [ ] This is part of a scheduled **alpha or minor**. (apply alpha or minor label)
- [ ] There is **no urgency** with this change (add `low prio` label)

## PR Checklist

<!-- Camunda maintains 18 months of minor versions. Backporting your change to multiple versions is common. -->

- [ ] My changes are for the **next minor** and are in `/docs` directory (aka `/next/`).
- [ ] My changes are for an **already released minor** and are in `/versioned_docs` directory.

<!-- UNCOMMENT THIS SECTION IF APPLICABLE. Adding or removing pages requires extra steps.
- [ ] I included my new page in the sidebar file(s).
- [ ] I added a redirect for a renamed or deleted page to the .htaccess file.
-->

- [ ] I added a DRI, team, or delegate as a reviewer for technical accuracy and grammar/style:
  - [ ] [Engineering team review](https://github.com/camunda/camunda-docs/blob/main/howtos/documentation-guidelines.md#review-process)
  - [ ] [Technical writer review](https://github.com/camunda/camunda-docs/blob/main/howtos/documentation-guidelines.md#review-process) via `@camunda/tech-writers` unless working with an embedded writer.

<!-- UNCOMMENT THIS SECTION IF APPLICABLE. Changes to **docs infra**, including updates to workflows and adding new npm packages, must be first discussed via issue or #ask-c8-documentation and linked for context.
- [ ] My changes require a [docs infrastructure review](https://github.com/camunda/camunda-docs/blob/main/howtos/documentation-guidelines.md#review-process). (apply `dx` label) -->
