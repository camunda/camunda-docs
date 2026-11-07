---
id: cost-tracking
title: Track the cost of agent work
sidebar_label: Cost tracking
description: "ProcessOS Harness records the tokens and approximate USD cost of agent work in your project, so you can tell a cheap iteration from an expensive one."
keywords: ["ProcessOS Harness", "cost tracking", "token usage", "usage entries"]
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## About

With cost tracking, you can see roughly what each project iteration costs in tokens and USD. The agent that does the work reports its own usage. ProcessOS Harness validates the reports, stores them in your project, and adds them up when you ask for totals.

ProcessOS Harness never reads the session files of an agent, and no usage data leaves your project.

## What is recorded

ProcessOS Harness stores one usage entry per window of agent work. An entry contains:

- Token counts and an approximate cost in USD.
- Timestamps, model names, and the configured reasoning effort of each model.
- The session ID of the agent and an optional builder pseudonym.

An entry never contains prompts, transcript content, real names, or email addresses.

## Where entries are stored

Each entry is one JSON file under `.camunda/usage/`. You commit these files with the rest of your project.

ProcessOS Harness stores no aggregate. It calculates totals from the entry files when you ask for them. Entries recorded on different branches merge as separate files, so they don't create conflicting totals.

## Automatic recording per builder job

ProcessOS Harness records one `job` entry for each [builder task](builder-task.md) without any action from you.

Each entry counts only the usage inside its own window. If the agent runs several builder jobs in one session, each job gets its own entry, and no stretch of the session is counted twice.

## Manual recording with the usage log skill

To record work outside a governance job, run `/process-os-usage-log`. Choose the kind of entry:

| Kind       | Use it for                                          |
| ---------- | --------------------------------------------------- |
| `adhoc`    | Work you did outside a governance job.              |
| `research` | Work that business reporting must exclude.          |

A session can have several entries. The skill prevents double counting:

- If you log a session again from the same start, the new entry replaces the earlier one.
- If you log it from where the last entry ended, ProcessOS Harness adds a second entry.
- If a window partly overlaps a stored one, ProcessOS Harness refuses it.

## View totals

To print the totals by phase and kind, run `/process-os-usage-log summary`.

The phase is one of `initialization`, `discovery`, `transformation`, or `implementation`. A job entry takes its phase from the skill of the job. Totals leave out `research` entries unless you include them.

## Understand the accuracy

The numbers are approximate. Each entry states how the agent obtained its values:

| Field        | Values                                                         | Meaning                                                                                                          |
| ------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `confidence` | `measured`, `estimated`, `unavailable`                         | Whether the agent read the numbers from its own recorded usage, estimated them, or had no data.                  |
| `costBasis`  | `agent-reported`, `list-price-estimate`, or `null`             | Whether the agent recorded the cost itself or estimated it from published list prices. `null` if `costUsd` is `null`. |

ProcessOS Harness stores an unknown value as `null`, never as `0`. A total that includes a `null` value is marked `(partial)`. Read it as a lower bound.

## Privacy

Before it records an entry, the agent writes a draft file, `.camunda/usage-draft-*.json`. ProcessOS Harness adds these drafts to `.gitignore` when you initialize the project, so they aren't committed.
