# AI-ready content guidelines

This guide describes how to write Camunda docs content that's reliably consumable by AI assistants and by RAG/agent pipelines.

It supplements the [Camunda style guide](technical-writing-styleguide.md) and the [contributor documentation guidelines](documentation-guidelines.md).

### 1. Start each page and each section with a direct answer

The first sentence under any heading (including the H1) should directly answer "what is this?" or "what does this section do?" in one quotable line. Agents extract the first sentences after a heading; that's what gets cited and indexed.

- **Bad:** A heading "Process instance modification" followed by three paragraphs of history and rationale before defining what process instance modification is.
- **Good:** A heading "Modify a process instance", followed immediately by: _Process instance modification lets you change the active state of a running process instance — moving tokens, adding variables, or cancelling activities — without redeploying the process._

### 2. Make every section self-contained

A section must make sense in isolation. RAG systems fetch sections, not whole pages, and agents follow links one at a time.

- Don't write "as mentioned above", "see the previous section", "now that you've configured X".
- Repeat the prerequisite or context inline. Short, slightly redundant prose beats implicit references.
- If you need to refer to another page, link to it with a descriptive label, not "see here".

### 3. Use descriptive, specific headings

Headings are how agents recover document structure. Vague headings break that recovery.

- **Bad:** "Configuration", "Overview", "Examples", "How it works"
- **Good:** "Configure the Slack outbound connector", "How Zeebe assigns jobs to workers", "Example: Schedule a recurring timer event"

Reuse the same heading wording when the same concept appears in multiple pages so retrieval can cluster them.

### 4. Keep heading hierarchy consistent

- Use H1 once, for the page title (Docusaurus generates it from frontmatter `title`).
- Do not skip levels (no H4 directly under H2).
- Within a page, sibling headings at the same depth should describe sibling concepts.

A page with H2 → H3 → H3 → H4 → H3 will confuse agent parsers. Keep depth predictable.

### 5. Put structured data in tables, not prose

Anything that is fundamentally a list of fields, options, parameters, or values goes in a Markdown table. Prose descriptions of parameters scatter the contract across paragraphs and make field-level extraction unreliable.

This is the most common Camunda-specific gap, addressed as its own rule for connector pages below.

### 6. Critical information must appear as text, not only in screenshots or diagrams

Agents can't OCR. If the only place a binding name, field value, or required setting appears is inside an image, that information is invisible to AI assistants.

- Use images as **supplementary illustration**, never as the only source of a value the reader (human or agent) needs to act on.
- For every diagram, include a short prose description of what it shows.
- For every screenshot of a UI form, include the field names and their values inline in the text before or after the image.

### 7. Never put critical information only inside a tab

Agents typically see only the active tab when a page is rendered, and Markdown-export pipelines often serialize only the default tab. Content inside non-default tabs becomes invisible.

- **Allowed:** Code examples in different languages across tabs (the concept is repeated, only the syntax changes).
- **Not allowed:** Prerequisites split across SaaS vs Self-Managed tabs, configuration steps that exist only in one tab, error troubleshooting that only appears under one variant.

If prerequisites or steps differ by environment, list both flat in the page body, clearly labeled — for example:

```markdown
## Prerequisites

**For SaaS:**

- A Camunda 8 SaaS account.
- …

**For Self-Managed:**

- A running Self-Managed installation (v8.X+).
- …
```

### 8. Keep code blocks complete and self-contained

- Always close fences (` ``` `).
- Always include the language tag (` ```yaml `, ` ```java `, ` ```bash `).
- Don't split a single example across multiple unrelated fences with prose in between if the prose isn't part of the example.
- Don't rely on "...add your value here..." placeholders without explaining what kind of value belongs there.

## Connector pages: the parameter table contract

Connector pages document a contract that AI agents act on directly — they write BPMN, generate API calls, and bind variables based on these pages. Prose configuration is the single highest-impact gap found in the audit and is the root cause of several AI DX feedback items.

**Rule:** For every connector page, every operation, authentication method, and output structure is documented as a Markdown table with these columns (in this order):

| UI label | Binding name | Type | Required | Valid values | Default | Description |
| -------- | ------------ | ---- | -------- | ------------ | ------- | ----------- |

- **UI label** — what the field is called in the Web Modeler property panel, bolded (e.g., **API Key**).
- **Binding name** — the exact identifier used at runtime (e.g., `authentication.apiKey`), in code formatting.
- **Type** — `string`, `number`, `boolean`, `object`, `array`, or a specific enum, in code formatting.
- **Required** — `Yes` or `No`. No other values.
- **Valid values** — enum values, ranges (`0`–`2`), or `—` if any value of the declared type is valid.
- **Default** — the default value, in code formatting, or `—` if there is no default.
- **Description** — one sentence. Link to a deeper concept page if the field needs more explanation.

All seven columns must be present even when some cells contain `—`. The absence of a column is itself a contract — agents will assume the value is unconstrained.

Each connector operation gets its own table. Authentication is its own table, separate from operation tables. Outputs use the simpler form: `Field | Type | Description`.

This rule applies to **every** connector page in [docs/components/connectors/out-of-the-box-connectors/](../docs/components/connectors/out-of-the-box-connectors/). New connector pages must follow it from day one; existing pages should be retrofitted opportunistically during normal edits, with the most frequently used connectors prioritized.

## References

- [Agent-Friendly Documentation Spec](https://agentdocsspec.com/) — defines the 23 checks behind the Camunda Agent Score benchmark.
- [Camunda's Agent Score](https://buildwithfern.com/agent-score/company/camunda) — current public score and per-check breakdown.
- [Kapa.ai — Writing documentation for AI](https://docs.kapa.ai/improving/writing-best-practices) — guidance from the team behind the Camunda Docs chatbot.
- [What an Agent Score Can Tell You — Dachary Carey](https://dacharycarey.com/2026/04/18/what-agent-score-can-tell-you/) — practical analysis of what moves the score.
- [llmstxt.org](https://llmstxt.org/) — the `llms.txt` specification.
- [Camunda's `llms.txt`](https://docs.camunda.io/llms.txt) and [`llms-full.txt`](https://docs.camunda.io/llms-full.txt) — the machine-readable indexes auto-generated from this site.
