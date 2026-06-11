---
id: template-page
title: Template connector
description: "Description of this connector for SEO, search etc"
---

import InboundConnectorBasics from '../../../components/react-components/\_connector-inbound-basics.md'
import OutboundConnectorBasics from '../../../components/react-components/\_connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

<!-- Start with a single-sentence that concisely sums up what the connector does, beginning with a verb typically (use, integrate, connect etc). For example, "Integrate an AI agent using an ad-hoc sub-process with an applied AI Agent connector template."  -->

Single concise sentence of what you would use the connector for.

## About this connector

<!-- Provide any further useful overview information about the connector.  -->

The [connector name] connector enables AI agents to integrate with an LLM to provide... This connector is designed for use with an ad-hoc sub-process in a feedback loop, providing automated user interaction and tool selection.

For example, use this connector to...

## Prerequisites

External accounts, permissions, tokens

<InboundConnectorBasics /> or <OutboundConnectorBasics />

## Configuration

Tables grouped by configuration area (Authentication, Payload, Advanced, etc.) configurations that apply to all operations

### Authentication

| Property   | Type   | Required | Description                  | Example                          |
| ---------- | ------ | -------- | ---------------------------- | -------------------------------- |
| Access Key | String | Yes      | AWS access key for Textract. | `AKIAIOSFODNN37`                 |
| Secret Key | String | Yes      | AWS secret key for Textract. | `wJalrXUtnFEgfMIK7MDENGbPxRfiCY` |

Types are e.g. String, Boolean, Dropdown

## Operations

### Analyze Documents (Name of the first operation of th connector, repeat for each operation)

#### Input parameters

Input Table: One subsection per operation (e.g. “Create task”, “Send SMS”). Every operation input as separate table

| Property | Type   | Required | Description | Example |
| -------- | ------ | -------- | ----------- | ------- |
| input 1  | String | Yes      | ...         | ...     |

#### Output

Output: reference (or if not possible shape of output as code block) + if needed feel expression to get the most relevant data

## Troubleshooting

<ErrorHandling />

## Further Resources

- [Amazon Textract Documentation](https://docs.aws.amazon.com/textract/latest/dg/what-is.html)
