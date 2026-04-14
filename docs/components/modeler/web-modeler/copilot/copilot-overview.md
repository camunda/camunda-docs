---
id: copilot-overview
title: Camunda Copilot
sidebar_label: Copilot overview
description: "Create and refine BPMN processes, FEEL expressions and Camunda Forms faster using natural-language prompts with Camunda Copilot, an AI assistant in Web Modeler."
---

Create and refine BPMN processes, FEEL expressions and Camunda Forms faster using natural-language prompts with Camunda Copilot, an AI assistant in Web Modeler.

:::important
Camunda Copilot must be enabled by an organization admin before use.
:::

## What can Copilot help you with

With Camunda Copilot, you can get assistance when designing BPMN processes, FEEL expressions, and Camunda Forms.

### Design and build BPMN processes

Turn your ideas into working process diagrams without manually placing each element:

- **Create processes from descriptions**: Describe what you need ("Create an employee onboarding process") and Copilot generates the BPMN diagram.
- **Modify existing diagrams**: Ask Copilot to add error handling, insert approval steps, or restructure your workflow.
- **Convert legacy artifacts**: Paste existing documentation, BPEL, Java, or Python code and let Copilot transform it into BPMN.
- **Get explanations**: Ask Copilot to explain what a process does or how a specific element works.

### Write and debug FEEL expressions

FEEL expressions power your process logic. Copilot helps you write them correctly:

- **Generate expressions**: Describe what you need ("Calculate the total price from quantity and unit price") and Copilot writes the FEEL expression.
- **Translate from other languages**: Convert Java, JavaScript, or Python snippets into equivalent FEEL syntax.
- **Debug errors**: When an expression isn't working, ask Copilot to fix it and explain what went wrong.

### Build Camunda Forms

Create user-facing forms that integrate with your processes:

- **Generate forms**: Describe the data you need to collect and Copilot creates the form structure.
- **Link forms to tasks**: Copilot can bind forms to user tasks in your process automatically.
- **Validate and refine**: Ask Copilot to check your form for issues or suggest improvements.

## Get started

1. Log in to [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md).
2. Open an existing BPMN diagram or form, or create a new one via **New project > Create new > BPMN diagram** or **Form**.
3. Click the Camunda Copilot icon in the top-right corner of the editor header to open the Copilot panel.
4. Enter a prompt based on your needs. See [example prompts](#example-prompts).
5. Review the response. For changes to your diagram or form, Copilot applies them automatically and you can undo if needed.

:::tip
For best results, use clear and specific prompts. Break complex requests into smaller steps rather than asking for everything at once.
:::

### Example prompts

Here are some prompts to help you get started:

| What you want to do        | Example prompt                                                    |
| -------------------------- | ----------------------------------------------------------------- |
| Create a new process       | "Create a purchase order approval workflow"                       |
| Add to an existing process | "Add a notification step after the approval task"                 |
| Convert legacy code        | _Paste your BPEL/Java/Python code_ and ask "Convert this to BPMN" |
| Write a FEEL expression    | "Calculate 10% discount if order total exceeds 1000"              |
| Debug an expression        | "Why isn't this expression working?" _(with FEEL editor open)_    |
| Create a form              | "Create a form to collect customer contact information"           |
| Understand your process    | "Explain what this process does"                                  |

## Working with context

Copilot understands what you're working on and uses that context to give relevant responses:

- **No element selected**: Copilot works with your entire diagram or form.
- **Element selected**: Copilot focuses on that specific element. A context tag appears above the chat input showing what's selected.
- **FEEL editor open**: Copilot knows you're working on an expression and can help write or debug it.

This means you can say "add error handling to this task" after selecting a service task, and Copilot knows exactly which task you mean.

## Review and undo changes

When Copilot makes changes to your diagram or form, Web Modeler automatically saves a new version. This means:

- Your previous work is always preserved
- You can roll back to any earlier version from the version history
- You can iterate with Copilot until the result meets your needs

:::note
Copilot's changes may affect more than just the element you asked about. Always review the full diagram after modifications.
:::

## Chat history

Copilot saves your conversations so you can pick up where you left off:

- Conversations are retained for 90 days
- Click any past conversation to continue it
- Rename conversations for easy reference
- Delete conversations you no longer need

## How Copilot works

Behind the scenes, Copilot uses specialized AI agents to handle different types of requests:

- **BPMN agent**: Creates and modifies process diagrams
- **FEEL agent**: Generates and debugs expressions
- **Form agent**: Builds and validates forms

Copilot automatically routes your request to the right agent based on what you're asking for. You don't need to specify which agent to use.

For details on what Copilot can do in each area, see [Built-in tools](built-in-tools.md).

## Permissions

Copilot respects your project permissions:

| What you can do                    | Write access | Read-only access |
| ---------------------------------- | :----------: | :--------------: |
| Ask questions and get explanations |     Yes      |       Yes        |
| Generate FEEL expressions          |     Yes      |       Yes        |
| Create or modify BPMN diagrams     |     Yes      |        No        |
| Create or modify forms             |     Yes      |        No        |
| Apply FEEL expressions to elements |     Yes      |        No        |

### Where Copilot is available

Copilot adapts to your current screen:

| Screen                  | What Copilot can do       |
| ----------------------- | ------------------------- |
| BPMN Design / Implement | Full editing capabilities |
| BPMN Play               | View and query only       |
| BPMN Version History    | View and query only       |
| Form Design / Editor    | Full editing capabilities |
| Form Validate           | View only                 |

If you ask Copilot to do something that isn't available on your current screen, it will suggest navigating to the appropriate screen.

## Limitations

- Copilot does not support pools, lanes, and collaborations.
- Documentation search (Camunda Docs AI) is available only in SaaS deployments.
- Self-Managed users can configure their own LLM provider but do not have access to the Camunda documentation knowledge base.

## Self-Managed configuration

For Self-Managed deployments, see [Copilot configuration](/self-managed/components/modeler/web-modeler/configuration/copilot.md) to configure LLM providers and agent settings.

## Related resources

- [Built-in tools](built-in-tools.md)
- [Self-Managed Copilot configuration](/self-managed/components/modeler/web-modeler/configuration/copilot.md)
