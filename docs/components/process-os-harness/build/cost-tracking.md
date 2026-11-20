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

With cost tracking, you can see roughly what each project iteration costs in tokens and approximate USD. The goal is to tell a $5 iteration from a $500 one, not to reproduce a bill.

The agent that does the work reports its own usage. ProcessOS Harness validates each report, stores it as an entry in your project, and adds the entries up when you ask for totals.

| Feature                                                      | Use it to                                                   |
| ------------------------------------------------------------ | ----------------------------------------------------------- |
| [Automatic recording](#record-builder-tasks-automatically)   | Record the usage of every builder task without any action.  |
| [Ad-hoc recording](#record-other-work-with-ad-hoc-recording) | Log agent work for the project that happens outside a task. |
| [Summary](#view-the-summary)                                 | Print the totals by phase and kind.                         |

## Record builder tasks automatically

ProcessOS Harness records one `job` entry for each [builder task](builder-task.md). You don't need to do anything.

- The entry covers the window from the activation of the task to its completion or failure.
- The entry is stored in the **Record usage** step of task completion and is committed with the task's output.
- The completion report includes a `Usage:` line.
- If the agent runs several builder tasks in one session, each task gets its own entry, and no stretch of the session is counted twice.
- Recording never blocks a task. If the agent can't produce a valid entry, the task still completes, and the report states why no usage was stored.

## Record other work with ad-hoc recording

Ad-hoc recording logs a one-off agent session, or part of one, outside a builder task as an `adhoc` entry. Use it for agent work that belongs to the project's delivery, for example to optimize a report or fix a BPMN model after review.

1. In the session that did the work, ask the agent to log the session's usage, or run `/process-os-usage ad-hoc`.
2. Review the stored entry the skill reports.
3. Commit the entry file under `.camunda/usage/`. The skill doesn't commit it for you.

The skill supports these arguments:

| Argument             | Description                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--phase <phase>`    | The lifecycle phase of the work: `initialization`, `discovery`, `transformation`, or `implementation`. If you omit it, the phase comes from the active builder task. |
| `--since <ISO-8601>` | The start of the window, for example `2026-11-16T09:00:00Z`. If you omit it, the window is the whole session so far.                                                |

The skill never asks you for the phase. An entry without a phase appears in the `—` row of the summary.

### Decide what to log

| Work                                                 | What to do                                                |
| ---------------------------------------------------- | --------------------------------------------------------- |
| A builder task                                       | Nothing. Completing the task records it.                  |
| Other agent work for the project                     | Log it with `/process-os-usage ad-hoc`.                   |
| Research, co-innovation, or work on ProcessOS itself | Don't log it. Work you don't log stays out of the totals. |

### Log a session correctly

- Use one session per task, so each entry covers one piece of work.
- Log the session in the session that did the work, before you close it. The agent reads only its own current session's usage, so a new session logs only itself.
- Don't log a builder task's work manually. It's already recorded.

No stretch of a session is stored twice. The store matches the entries of one session by the agent's session ID:

- Logging the same session again without `--since` replaces the session's earlier one-off entry.
- To add only later work beside an earlier entry, set `--since` to the time the earlier window ended.
- If the new window partly overlaps a stored one, the skill asks which of the two start times to use.
- If the session also ran a builder task, the skill logs only the work after the task ended.

## View the summary

To print the totals, ask the agent what the project has cost so far, or run `/process-os-usage summary`.

The summary is a table of totals by phase and kind. For each row, it lists entries, model calls, tokens, wall time, and USD, plus a grand total. A `job` entry takes its phase from the skill and mode of the builder task.

ProcessOS Harness stores no aggregate. It calculates the totals from the entry files whenever you ask. Entries recorded on different branches merge as separate files, so they never create conflicting totals.

If an entry file in `.camunda/usage/` is invalid, the summary fails and names the file instead of printing a total that is too small. Fix or remove the file, and run the summary again.

## Understand the accuracy

The numbers are approximate. Each entry states how the agent obtained its values:

| Field        | Values                                             | Meaning                                                                                                               |
| ------------ | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `confidence` | `measured`, `estimated`, `unavailable`             | Whether the agent read the numbers from its own recorded usage, estimated them, or had no data.                       |
| `costBasis`  | `agent-reported`, `list-price-estimate`, or `null` | Whether the agent recorded the cost itself or estimated it from published list prices. `null` if `costUsd` is `null`. |

- If the agent's harness doesn't record a cost, the agent estimates it from the published list prices of the models and names the prices in the entry's `notes` field.
- ProcessOS Harness stores an unknown value as `null`, never as `0`.
- A total that includes a `null` value is marked `(partial)`. Read it as a lower bound. A total with no known value is marked `unknown`.

## Privacy

An entry holds counts, timestamps, model names, effort labels, the agent's session ID, and an optional builder pseudonym. It never contains prompts, transcript content, real names, or email addresses.

ProcessOS Harness never reads an agent's session files. The agent reads its own recorded usage and reports it. Entries stay in `.camunda/usage/` in your project, and no usage data leaves it. The drafts the agent writes before recording are gitignored, so they never end up in a commit.
