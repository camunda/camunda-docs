# AI-ready content guidelines

This guide describes how to write Camunda docs content that's reliably consumable by AI assistants and by RAG/agent pipelines.

It supplements the [Camunda style guide](technical-writing-styleguide.md) and the [contributor documentation guidelines](documentation-guidelines.md).

### 1. Start each page and section with a direct answer

The first sentence under any heading (including the H1) should be quotable and directly answer "what is this?" or "what does this section/page do?".

Aim for one self-contained sentence, ideally under 25 words / ~150 characters. Agents extract the first sentences after a heading; that's what gets cited and indexed.

- **Bad:** A heading "Process instance modification" followed by three paragraphs of history and rationale before defining what process instance modification is.
- **Good:** A heading "Modify a process instance", followed immediately by: "With process instance modification, you can change the active state of a running process instance without redeploying the process."

### 2. Make every section self-contained

A section must make sense in isolation. RAG systems fetch sections, not whole pages, and agents follow links one at a time.

- Avoid context-dependent phrasing like "as mentioned above", "see the previous section", "now that you've configured X". Repeat the context inline instead.
  For example, instead of "Now that you've configured authentication…", write "After you configure authentication with a client ID and client secret, start the connector runtime."
- If you need to refer to another page, link to it with a descriptive label, not "see here".

### 3. Use descriptive, specific headings

Headings are how agents recover document structure. Vague headings break that recovery.

- **Bad:** "Configuration", "Overview", "Examples", "How it works"
- **Good:** "Configure the Slack outbound connector", "How Zeebe assigns jobs to workers", "Example: Schedule a recurring timer event"

Reuse the same heading wording when the same concept appears in multiple pages so retrieval can cluster them.

### 4. Keep heading hierarchy consistent

- Do not add an H1 heading. Docusaurus generates the page title as the only H1 heading from the frontmatter `title`.
- Do not skip levels.
- Within a page, sibling headings at the same depth should describe sibling concepts.

### 5. Put structured data in tables, not prose

Anything that is fundamentally a list of fields, options, parameters, or values goes in a Markdown table.

### 6. Critical information must appear as text, not only in screenshots or diagrams

Agents can't perform optical character recognition. If the only place a binding name, field value, or required setting appears is inside an image, that information is invisible to AI assistants.

- Use images as **supplementary illustration**, never as the only source of a value the reader (human or agent) needs to act on.
- For every diagram, include a short prose description of what it shows.
- For every screenshot of a UI form, include the field names and their values inline in the text before or after the image.

### 7. Keep code blocks complete and self-contained

- Always close fences (` ``` `).
- Include the language tag (` ```yaml `, ` ```java `, ` ```bash `).
- Avoid breaking one example into several separate code blocks unless each block represents a distinct step. If you need to explain the example, place the explanation before or after the full example rather than interrupting it.
- Don't rely on "...add your value here..." placeholders without explaining what kind of value belongs there.

## References

- [Agent-Friendly Documentation Spec](https://agentdocsspec.com/): defines the 23 checks behind the Camunda Agent Score benchmark.
- [Camunda's Agent Score](https://buildwithfern.com/agent-score/company/camunda): current public score and per-check breakdown.
- [Kapa.ai: Writing documentation for AI](https://docs.kapa.ai/improving/writing-best-practices): guidance from the team behind the Camunda Docs chatbot.
- [What an Agent Score Can Tell You (Dachary Carey)](https://dacharycarey.com/2026/04/18/what-agent-score-can-tell-you/): practical analysis of what moves the score.
- [llmstxt.org](https://llmstxt.org/): the `llms.txt` specification.
- [Camunda's `llms.txt`](https://docs.camunda.io/llms.txt) and [`llms-full.txt`](https://docs.camunda.io/llms-full.txt): the machine-readable indexes auto-generated from this site.
