---
id: ai-usage-guidelines
title: AI usage guidelines
sidebar_label: AI usage guidelines
description: "Learn how to use Camunda AI features responsibly with guidance on data handling, human oversight, prohibited uses, and AI agents."
keywords: [ai, ai act, compliance, governance, ai agent, copilot, idp]
---

Learn how to use Camunda AI features responsibly with guidance on data handling, human oversight, prohibited uses, and AI agents.

## About Camunda AI features

Camunda AI features and capabilities currently include:

- **Agentic orchestration**: Embedding AI agents into BPMN processes so that an AI model can, within boundaries you define, decide which tools to call to reach a goal.
- **Camunda Copilot**: AI-assisted process, form, and decision modeling. Describe what you need in natural language and Camunda generates BPMN diagrams, Camunda Forms, and FEEL expressions.
- **Intelligent Document Processing (IDP)**: Automated document analysis and structured data extraction, connecting to your chosen document AI provider.

Camunda provides an **application and orchestration layer** that integrates AI models via interfaces. In most cases, the underlying AI models are not developed or operated by Camunda itself. Depending on your setup, AI models may be:

- Provided by a third-party provider that Camunda has selected and licensed (for example, in SaaS deployments).
- Provided by a third-party provider that you select and contract directly.
- Brought and operated by you under a bring-your-own-model approach.

The specific models and providers active in your environment are described in the applicable service description and documentation.

## How to use AI services responsibly

The following principles apply across all AI service use cases. They reflect both good engineering practice and regulatory expectations.

| Principle    | What it means in practice                                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Security     | Use as little data, as few permissions, and as few interfaces as necessary for your use case. Before using any data or system, confirm you are authorized to use it in the way you intend. |
| Legality     | Comply with all applicable laws, industry regulations, and contractual obligations, including the EU AI Act where it applies to your use case.                                             |
| Fairness     | Review AI-generated outputs to assess whether they could have a discriminatory effect on individuals or groups.                                                                            |
| Transparency | Document data sources, AI models, versions, prompts, and key decisions. Where applicable law requires it, label AI-generated content as such.                                              |
| Monitoring   | Monitor AI service usage at intervals appropriate to the risk level of your use case, and keep records of your monitoring activities.                                                      |

## What these features are designed for

Camunda's AI services are designed and intended for use in non-high-risk scenarios.

If your use case qualifies as high-risk, you are responsible for compliance with the applicable legal requirements. [Reach out to Camunda](https://www.camunda.com/services/support-guide/) before proceeding so we can discuss what that means for your specific scenario.

### Use cases that may qualify as high-risk

If your use case involves any of the following, take a closer look before deploying:

- Recruitment or selection of individuals. For example, filtering job applications or evaluating candidates.
- Decisions affecting employment relationships. For example, promotion, termination, or performance monitoring.
- Creditworthiness assessment or credit scoring (except systems used solely for fraud detection).
- Risk assessment or pricing for life and health insurance.

If you're unsure, [contact Camunda](https://www.camunda.com/services/support-guide/).

## Evaluating AI outputs

AI-generated outputs may be incorrect, incomplete, biased, or outdated. Always review outputs critically before acting on them, particularly in business-critical, legally relevant, or financially significant contexts.

In those contexts, consider implementing a [Human-in-the-Loop (HITL)](/reference/glossary.md#human-in-the-loop-hitl) mechanism: a human review step before the output is acted upon.

## The AI models behind these features

Camunda's AI services integrate models from various sources. Here is what you need to know depending on your setup.

### Camunda-provided models

If Camunda offers its own AI model as part of an AI service and that model qualifies as a general-purpose AI (GPAI) model under the AI Act, Camunda provides it as a GPAI model without systemic risk unless Camunda notifies you otherwise.

### Fine-tuning and training

Where Camunda enables you to refine AI models through fine-tuning or other training methods, be aware that Camunda does not assume responsibility for the resulting model being classified as a GPAI model with systemic risk. Any obligations that arise from such a classification are yours to manage.

### Third-party models

If you train or modify a third-party model, you may become a "provider" of that model under the AI Act, with the compliance obligations that role entails.

## Knowing your AI tools

In practice, AI literacy means the people in your organization who configure, operate, or make decisions based on Camunda's AI services should have a working understanding of:

- What the AI services can and cannot do.
- The risks associated with AI-generated outputs, including the possibility of inaccurate, biased, or incomplete results.
- The requirements set out in these usage guidelines.
- How to correctly interpret and apply AI outputs in your specific context.

### Practical steps

How you meet this standard is largely up to you. The AI Act does not prescribe a specific training format. As a starting point, we suggest:

- Providing some form of orientation before people in your organization first use Camunda's AI services.
- Revisiting that orientation when the AI services change significantly or when use cases evolve.
- Keeping a record of what training you have provided, in whatever format suits your organization's existing compliance processes.

## Handling data with care

When using Camunda's AI services, you are submitting data, potentially including personal data, to AI models. The following requirements apply.

### Data minimization

Use as little data as necessary for your intended purpose. Where possible, use anonymized or pseudonymized data. If you need to use special categories of personal data (such as health data, biometric data, or data revealing racial or ethnic origin) or data relating to minors, ensure a lawful basis exists and, where required, complete a data protection impact assessment (DPIA) first.

### Retention and compliance

Follow applicable retention periods and deletion obligations. Ensure compliance with data subject rights and document data provenance, legal bases, and recipients as required by applicable data protection law.

### Confidential information

Do not include secrets, credentials, or confidential information in prompts, configurations, or any other input to AI services. This includes:

- API keys and passwords.
- Internal pricing or financial data.
- Product roadmaps.
- Confidential contracts or legal documents.

Only use data from approved, lawful sources, and comply with all applicable license, usage, and purpose limitation requirements.

### Security

Implement appropriate measures against prompt injection, data exfiltration, and service misuse. These risks are specific to AI systems and are worth addressing separately from your general application security practices.

## Using content in AI features

### Input content

Before submitting content as input to Camunda's AI services, make sure that:

- You have the right to use it in the way you intend, including for AI processing.
- It does not infringe third-party intellectual property rights, including copyright, trademark, database rights, and open-source license obligations.
- Where the content belongs to a third party, your license covers AI training and the specific use you have in mind.

### Output content

Outputs generated by AI services may be subject to copyright or related rights, the legal position varies by jurisdiction and continues to evolve. Before relying on AI-generated outputs commercially or legally, verify that your intended use is permissible.

## What you must not do

The following uses of Camunda's AI services are prohibited. If you are unsure if a planned use case falls into any of these categories, [contact Camunda](https://www.camunda.com/services/support-guide/) before proceeding.

These uses are prohibited regardless of technical feasibility:

- **Manipulation**: Using AI to materially distort people's behavior through covert or manipulative techniques in a way likely to cause significant harm.
- **Exploitation of vulnerable groups**: Deliberately exploiting the vulnerabilities of specific groups, such as children or persons with disabilities, to materially distort their behavior.
- **Social scoring**: Evaluating or ranking individuals using AI in a way that leads to detrimental or unfair treatment.
- **Predictive policing**: Predicting criminal offenses based on profiling or personal characteristics.
- **Biometric database scraping**: Collecting facial or biometric data from the internet or camera systems without targeting specific individuals, to build or expand facial recognition databases.
- **Biometric categorization**: Inferring sensitive personal characteristics from biometric data, such as racial or ethnic origin, political opinion, religious belief, health data, or sexual orientation.
- **Emotion recognition at work or school**: Monitoring the emotional state of employees or learners in workplace or educational contexts.
- **Real-time biometric identification in public spaces**: Using AI to identify individuals in real time in publicly accessible spaces for law enforcement purposes.

## Working with AI agents

AI agents are AI-powered components that can, with a degree of autonomy, plan and execute multi-step actions to reach a goal, including calling tools, triggering actions in connected systems, and orchestrating sub-processes. Because of this autonomy, they carry higher operational and legal risk than assistive AI features like the Copilot.

The requirements below are not about limiting what you can build: Camunda's AI agent framework is designed to be flexible and powerful. They are about helping you deploy agents safely, so that the autonomy you enable stays within the boundaries you intend.

### Before you deploy: planning

A small amount of upfront planning makes AI agent deployments significantly safer and easier to manage. Before deploying an agent into production, document:

- What the agent is supposed to do, and what it is not supposed to do.
- How much autonomy it has. For example, whether it can act immediately or only propose actions for human approval.
- What "success" looks like, and under what conditions the agent should be stopped.
- Which systems, processes, and interfaces are in scope.

### Governance

For any agent running in production, define clear answers to: who owns this use case, who is responsible for the technical implementation, who handles incidents, and how changes are approved. The AI agent has no legal capacity, and everything it does is legally attributed to your organization, so knowing who is accountable matters.

### Pilot before you scale

Running a limited pilot before full deployment gives you the opportunity to catch unexpected behaviors in a controlled environment. A good pilot has defined success criteria and a clear process for incorporating what you learn before going broader.

### Human oversight

Maintain effective human oversight over any AI agent you deploy. This is also a sound operational principle; autonomous agents acting in production systems can have real-world consequences that are difficult to reverse.

At a minimum, human oversight means:

- Someone with the authority and technical ability to stop the agent at any time using a [kill switch](/reference/glossary.md#kill-switch) or equivalent mechanism.
- Defined limits on what the agent can do. For example, caps on transaction amounts, action frequency, or which systems it can write to.
- A human approval step for any action with significant legal, financial, or safety implications.
- A regular review process so you can catch drift or unexpected behavior before it becomes a problem.

How you implement these controls is up to you. The right approach depends on your use case, your risk tolerance, and your existing operational processes. These guidelines do not prescribe a specific technical implementation.

### Technical readiness

Before going to production with an AI agent, ask:

- Have we tested for edge cases and unexpected inputs, including adversarial ones like prompt injection?
- Do we have monitoring in place to detect errors or anomalous behavior?
- Can we roll back if something goes wrong?

These are standard questions for any production system and they matter more for AI agents because the failure modes can be less predictable.

### Data and tool access

Agents with broad access to data and tools are harder to control and audit. As a general principle, give agents access to only what they need to do their job, the least-privilege principle. In practice this means:

- Knowing what data the agent can reach and how sensitive it is.
- Restricting the tools and actions available to the agent to those actually needed for the use case.
- Keeping production data access as narrow and time-limited as possible.

### Transparency and communication

Users interacting with AI-driven processes should know they are doing so. Make sure that:

- AI-driven interactions are clearly identified.
- Users know how to escalate or get help.
- There is a plan for communicating disruptions or incidents, both internally and, where required, externally.

### Bias and fairness

Where an AI agent makes or influences decisions in sensitive areas, such as HR, financial access, or similar, build in a periodic fairness review.

This does not need to be a formal audit process; it can be as simple as periodically reviewing a sample of agent decisions to check that outcomes are consistent and not systematically skewed.

### Documentation

Keep a record of the key decisions you made when setting up and operating your AI agent, including what it does, how it is configured, what controls are in place, and how those have evolved over time. Good documentation makes incidents easier to investigate and changes easier to manage. It also supports your compliance obligations under the AI Act if your use case is ever scrutinized.
