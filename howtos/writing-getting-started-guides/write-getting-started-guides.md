# Writing Getting Started Guides with GitHub Copilot

This document explains how to use GitHub Copilot as an AI agent to write getting started guides efficiently and consistently.

## Overview

The `writing-getting-started-guides` folder contains a template and instructions for creating getting started guides. GitHub Copilot can act as an intelligent agent to help you create these guides by following the established template and instructions automatically.

## Prerequisites

- GitHub Copilot installed and activated in VS Code
- Access to the `camunda-docs` repository
- The `.instructions.md` file in the `writing-getting-started-guides` folder

## How the AI agent works

GitHub Copilot can read and apply the instructions from `.instructions.md` when you open a file in the `writing-getting-started-guides` folder. The `.instructions.md` file contains:

- Rules for using the `_guide_template.md` as a template
- Guidelines for targeting new users
- Best practices for content structure
- Instructions to prioritize readability and clarity

The instructions are automatically applied to files matching the pattern `*started*.md` in this folder.

## Step-by-step: Using Copilot to write a guide

### 1. Start the chat with the right prompt

Open GitHub Copilot Chat and use a prompt that clearly describes what you want to create. The prompt should be:

- **Specific** - Clearly state the topic or feature
- **Action-oriented** - Use "write a getting started guide about..."
- **Contextual** - Mention Web Modeler, Camunda 8, or specific features

### Example prompts

**Good prompts:**

- `write a getting started guide about using the AI copilot in web modeler. Describe how to use it, where it's accessible, and provide examples.`
- `write a getting started guide on running an RPA process with Camunda 8 SaaS.`

### 2. Let Copilot work

After providing the prompt, Copilot will:

1. **Search for context** - Look for existing documentation about the topic
2. **Read the template** - Load the `_guide_template.md` structure
3. **Apply instructions** - Follow the guidelines from `.instructions.md`
4. **Create the guide** - Generate a complete markdown file with:
   - Proper frontmatter (id, title, description)
   - Introduction section
   - Prerequisites
   - Step-by-step instructions
   - Examples and code snippets
   - Troubleshooting section
   - Links to additional resources
   - Glossary of terms

### 3. Review and refine

After Copilot creates the guide:

1. **Review the content** - Check for accuracy and completeness
2. **Test the steps** - Verify instructions work as described
3. **Request changes** - Ask Copilot to adjust specific sections if needed
4. **Check links** - Ensure all internal links are valid
5. **Finalize the guide** - Make any final edits and save the file
6. **Move the file into its final place** - Place the new guide in the appropriate folder within the documentation structure. Don't forget to add it to the sidebar if necessary.

### Example refinement prompts:

- `add more examples to the BPMN Copilot section`
- `simplify the prerequisites`
- `add a troubleshooting section for connection issues`
- `make the introduction shorter`

## Key features of the .instructions.md file

The `.instructions.md` file ensures that Copilot:

- **Uses the template** - Always creates a copy from `_guide_template.md`
- **Targets new users** - Keeps language simple and accessible
- **Prioritizes readability** - Uses short paragraphs and clear structure
- **Asks for clarification** - Requests more details if the prompt is unclear
- **Provides examples** - Includes practical demonstrations
- **Links to resources** - Connects to relevant documentation pages
- **Considers alternatives** - Mentions other approaches when applicable

## Tips for best results

### 1. Be specific about the scope

Instead of "write about Camunda," specify "write a getting started guide for creating your first BPMN process in Web Modeler."

### 2. Mention the target audience

The guides are already targeted at new users, but you can specify:

- "for developers new to Camunda"
- "for business analysts"
- "for users migrating from Camunda 7"

### 3. Include context about prerequisites

If you know specific requirements, mention them:

- "assumes user has a Camunda 8 SaaS account"
- "requires knowledge of REST APIs"
- "needs Docker installed"

### 4. Provide examples in your prompt

If you want specific examples included:

- "include an example of a loan approval process"
- "show how to use the HTTP connector"
- "demonstrate error handling patterns"

### 5. Reference existing documentation

Point Copilot to relevant docs:

- "refer to the BPMN Copilot documentation"
- "link to the API reference"
- "mention the Forms documentation"

## File naming convention

Name your getting started guides with this pattern:

- `getting-started-[feature].md`

Examples:

- `get-started-ai-copilot-web-modeler.md`
- `get-started-process-deployment.md`
- `getting-started-with-connectors.md`

## Verifying .instructions.md is active

To ensure the `.instructions.md` file is being used:

1. **Check the attachment** - When you open Copilot Chat with a file in this folder open, you should see `.instructions.md` listed in attachments
2. **Test with a simple prompt** - Ask Copilot to create a guide and verify it uses the template structure
3. **Look for template elements** - The generated guide should include all sections from the template

## Common issues and solutions

### Issue: Copilot doesn't follow the template

**Solution:**

- Make sure you have a file matching `*started*.md` open in the editor
- Explicitly mention "use the template from \_guide_template.md" in your prompt
- Check that `.instructions.md` is in the same folder

### Issue: Generated content is too technical

**Solution:**

- Remind Copilot: "make this simpler for new users"
- Ask to "explain [concept] in simpler terms"
- Request: "add a beginner-friendly explanation"

### Issue: Missing sections

**Solution:**

- Ask Copilot to "add the missing [section name] section"
- Request: "follow the complete template structure"
- Be specific: "add a troubleshooting section"

### Issue: Links are broken

**Solution:**

- After generation, ask Copilot to "verify all links are correct"
- Provide the correct path: "update the link to point to /components/..."
- Use the workspace search to find correct file paths

## Example workflow

Here's a complete example of creating a guide:

```
1. Open .instructions.md in VS Code
2. Open Copilot Chat (Cmd/Ctrl + I or click the chat icon)
3. Enter prompt: "write a getting started guide about using connectors in web modeler"
4. Wait for Copilot to generate the guide
5. Review the generated content
6. Ask for refinements: "add more examples of connector usage"
7. Verify links and test instructions
8. Save and commit the new guide
```

## Best practices

1. **Always start with .instructions.md open** - This ensures the context is loaded
2. **Use descriptive prompts** - More detail leads to better results
3. **Iterate** - Don't expect perfection on the first generation
4. **Verify accuracy** - Always review technical steps and links
5. **Test the guide** - Follow the steps yourself to ensure they work
6. **Keep the template updated** - If you improve the template, guides will improve too
7. **Learn from examples** - Look at existing guides to understand the style

## Metadata requirements

Every guide should have proper frontmatter:

```yaml
---
id: unique-identifier-here
title: "Human-Readable Title"
description: "Brief description, approximately 160 characters for SEO."
---
```

Copilot will generate this automatically, but verify:

- The `id` is unique and follows kebab-case
- The `title` is clear and descriptive
- The `description` is concise (around 160 characters)

## Contributing improvements

If you discover better ways to work with Copilot for guide creation:

1. Update this document with your findings
2. Consider updating `.instructions.md` with new guidelines
3. Refine `_guide_template.md` if structural improvements are needed
4. Share successful prompts with the team
