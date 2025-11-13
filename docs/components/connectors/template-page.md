---
id: template-page
title: Template Page
hide_table_of_contents: true
custom_edit_url: null
search: false
---

import InboundConnectorBasics from '../../../components/react-components/connector-inbound-basics.md'
import OutboundConnectorBasics from '../../../components/react-components/connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/connector-error-handling.md'

Overview & when to use this connector

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

## Related Resources

- [Amazon Textract Documentation](https://docs.aws.amazon.com/textract/latest/dg/what-is.html)
