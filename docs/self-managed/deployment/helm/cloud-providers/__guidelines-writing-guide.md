# Cloud Provider Deployment Guides - Writing Guidelines

This document outlines the standard structure and writing practices for cloud provider deployment guides in the Camunda documentation. These guidelines ensure consistency across all deployment documentation.

## Document structure

All deployment guides should follow this consistent structure:

```
1. Title (H1)
2. Overview/Introduction (implicit, before first H2)
3. Considerations (H2) - Optional
4. Variants (H2) - Optional, if multiple setup options exist
5. Outcome (H2) - Optional, describes what the user will have after completing the guide
6. Prerequisites (H2)
7. Steps (H2) - Numbered sections (## 1. Step name, ## 2. Step name, etc.)
8. Verification (H2) - Optional, if not covered in Outcome
```

### Section details

#### Overview/Introduction

- Appears before the first H2 heading
- Brief description of what the guide covers
- Can include admonitions (:::tip, :::note) for important context
- Should mention if this is part of a larger workflow

#### Considerations (H2)

**Purpose**: Help users understand if this guide is right for them and what to keep in mind.

**Content**:

- General considerations about the setup (performance, production-readiness)
- Links to simpler alternatives for beginners
- Links to SaaS offering for testing/development
- Links to skip ahead if user already has infrastructure
- Security considerations (can be a subsection ### Security)
- Cost management warnings (use :::danger admonition)
- Warnings about reference architecture usage

**Example**:

```markdown
## Considerations

This setup provides a foundational starting point for working with Camunda 8, though it is not optimized for peak performance...

:::danger Cost management
Following this guide will incur costs on your cloud provider account...
:::
```

#### Variants (H2)

**Purpose**: Explain different setup options when multiple approaches exist.

**When to include**: Only when the guide supports multiple configuration variants (e.g., Standard vs IRSA, with/without domain).

**Content**:

- List of available variants with descriptions
- "How to choose" subsection (### How to choose) to help users decide
- Clear indication of which variant is simpler vs more secure

**Example**:

```markdown
## Variants

We support two variants of this architecture:

- **Standard installation** - Uses username and password connection...
- **IRSA** (IAM Roles for Service Accounts) - Uses service accounts...

### How to choose

- If you prefer a simpler setup... the **standard installation** is a suitable choice.
- If you require enhanced security... the **IRSA** variant is the better option.
```

#### Outcome (H2)

**Purpose**: Describe what the user will have after completing the guide.

**Content**:

- Infrastructure diagram (with link to PDF version)
- Bulleted list of resources that will be created
- Optional items should be marked with "(Optional)"

**Example**:

```markdown
## Outcome

_Infrastructure diagram for a single region setup (click on the image to open the PDF version)_
[![Infrastructure Diagram](./assets/diagram.jpg)](./assets/diagram.pdf)

After completing this guide, you will have:

- An EKS Kubernetes cluster running with four nodes...
- The EBS CSI driver installed and configured...
- (Optional) A managed Aurora PostgreSQL instance...
```

#### Prerequisites (H2)

**Purpose**: List everything the user needs before starting.

**Naming**: Always use "Prerequisites" (not "Requirements").

**Content**:

- Required accounts (cloud provider, Red Hat, etc.)
- Required CLI tools with installation links
- Service quotas to verify
- Shell requirements (e.g., "This guide uses GNU Bash")
- Link to .tool-versions file for exact versions

**Format**: Use bullet points with bold tool names and em-dash descriptions:

```markdown
- **AWS CLI** – Command-line tool to manage AWS resources. [Install AWS CLI](link).
```

#### Steps (H2)

**Purpose**: The actual procedural steps to complete the setup.

**Format**:

- Use numbered H2 headings: `## 1. Configure AWS and initialize Terraform`
- Use H3 (###) for subsections within each step
- Include code blocks with proper language tags
- Use tabs when showing different variants (Standard vs IRSA)

#### Verification (H2)

**Purpose**: Help users verify that the setup was successful.

**Note**: This can be combined with Outcome if the verification is straightforward, or placed at the end for complex setups.

## Heading hierarchy

- **H1 (#)**: Document title only (from frontmatter)
- **H2 (##)**: Main sections (Considerations, Variants, Outcome, Prerequisites, numbered Steps)
- **H3 (###)**: Subsections within main sections
- **H4 (####)**: Sub-subsections (use sparingly)

**Important**: Considerations, Variants, and Outcome should always be H2, never nested under other sections.

## Admonitions

Use the following admonition types appropriately:

| Type         | Usage                                           |
| ------------ | ----------------------------------------------- |
| `:::tip`     | Helpful hints, links to tutorials for beginners |
| `:::note`    | Additional context, clarifications              |
| `:::warning` | Important caveats, things to be careful about   |
| `:::danger`  | Cost warnings, critical security information    |
| `:::caution` | Ownership/responsibility warnings               |

## Naming conventions

| Use            | Don't use                |
| -------------- | ------------------------ |
| Prerequisites  | Requirements             |
| Considerations | Things to consider       |
| Outcome        | What you'll get / Result |

## File naming

- Main setup guides: `terraform-setup.md`, `eks-helm.md`, `aks-helm.md`
- Dual-region variants: `terraform-setup-dual-region.md`, `dual-region.md`
- Assets folder: `./assets/` for diagrams and images

## Infrastructure diagrams

- Export diagrams as both JPG and PDF from Miro
- Store in `./assets/` folder relative to the guide
- Use clickable image linking to PDF:
  ```markdown
  [![Diagram Alt Text](./assets/diagram.jpg)](./assets/diagram.pdf)
  ```
- Include HTML comment with Miro board link for future updates

## Cross-references

- Link to related guides when appropriate (e.g., simpler alternatives, Helm setup after Terraform)
- Use relative paths for internal links: `../amazon-eks/terraform-setup.md`
- Use absolute paths for cross-section links: `/self-managed/deployment/helm/cloud-providers/openshift/redhat-openshift.md`

## Example structure

```markdown
---
title: Deploy Camunda 8 on Amazon EKS with Terraform
---

# Deploy Camunda 8 on Amazon EKS with Terraform

Brief introduction to what this guide covers...

:::tip
If you are new to Terraform, read through the [Terraform documentation](link)...
:::

## Considerations

This setup provides a solid starting point...

### Security considerations

The following security considerations were flagged...

:::danger Cost management
This guide will incur costs...
:::

## Variants

We support two variants...

### How to choose

...

## Outcome

_Infrastructure diagram..._
[![Diagram](./assets/diagram.jpg)](./assets/diagram.pdf)

After completing this guide, you will have:

- Resource 1
- Resource 2
- (Optional) Resource 3

## Prerequisites

- **Tool 1** – Description. [Install link](url).
- **Tool 2** – Description. [Install link](url).

## 1. First step

### Subsection

...

## 2. Second step

...

## 3. Install Camunda 8 using the Helm chart

...
```

---

_These guidelines were established based on discussions with the documentation team and observed best practices across existing deployment guides. Last updated: January 2026._
