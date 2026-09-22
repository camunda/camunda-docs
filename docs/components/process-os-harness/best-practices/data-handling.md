---
id: data-handling
title: Handle project data safely
sidebar_label: Data handling
description: "Understand what stays local in a ProcessOS Harness project, what the AI coding agent sends to an AI platform, and how to choose data sources without over-sharing sensitive material."
keywords:
  ["ProcessOS Harness", "data handling", "AI platform", "discovery sources"]
---

A ProcessOS Harness project reads your organizational knowledge and sends parts of it to an AI platform. Knowing which parts, and controlling what you expose, is part of running a project responsibly.

This page covers the practical choices you make as a builder. It doesn't replace your organization's data classification policy or your agreement with an AI platform provider.

## Where project data lives

| Location            | What's stored there                                                                  |
| ------------------- | ------------------------------------------------------------------------------------ |
| Your local machine  | The whole project, including sources, generated artifacts, and configuration.        |
| Your Git repository | Every committed artifact.                                                            |
| Camunda cluster     | Governance process state, including which phase you're in and pending SME questions. |
| AI platform         | The context your coding agent sends while running a skill.                           |

The AI platform is the boundary worth thinking about. Everything else stays inside infrastructure you already control, so your main decision is what the agent gets to read.

## Control what reaches the AI platform

Your AI coding agent determines which AI platform is used and what it sends, so route that choice through the same review any other processor would get. Platforms such as Amazon Bedrock, Azure OpenAI, and Ollama are supported through the agent rather than by ProcessOS Harness directly.

Practical controls:

- **Keep secrets out of the project directory.** Credentials, tokens, and keys shouldn't be in files the agent can read. Generated workers reference configuration rather than embedding it.
- **Review the diff before you commit.** Skills stage changes in your working tree, which is your checkpoint for catching anything that shouldn't enter the repository.

## Choose sources that make discovery succeed

Source quality drives the accuracy of the as-is process, and a confident but wrong model is the expensive failure mode here.

- Prefer primary artifacts, such as exported legacy process definitions, production configuration, and real forms, over summary presentations.
- Include the systems the process integrates with, so integration points surface during discovery rather than during implementation.
- Provide current material. Documentation for a version of the process no longer in use produces a model that looks right and isn't.
- Name known gaps in `process-scope.md`. Telling ProcessOS Harness what's missing is more reliable than hoping it infers the gap.
- Prefer anonymized samples to production records. Discovery needs the shape of the data, rarely the data itself.

## Handle personal and regulated data

Process documentation often carries personal data by accident, in the form of sample cases, screenshots, and exported records.

- Remove or mask personal data from sample files before adding them to the project.
- Crop personal information from screenshots used in review packages.
- Check whether your process falls under rules requiring disclosure that AI was involved, described in the [AI usage guidelines](/guides/build-with-ai/ai-usage-guidelines.md).
- Treat the generated solution as you would any other code artifact when it contains business rules you consider confidential.

## Share with SMEs and reviewers

Review cycles move project material to people outside the builder workspace, so apply the same care there.

Review packages produced by `/process-os-sme-review-package` are static files you can inspect before sending.
