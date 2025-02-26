---
id: idp-configuration
title: Configure IDP
description: "Set up and configure intelligent document processing (IDP) in Camunda 8 SaaS and Self-Managed."
---

Configure your setup with the components and credentials required by IDP.

## Prerequisites

The following prerequisites are required to use IDP in Camunda 8:

### Web Modeler

You must be able to access and use [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md).

- IDP currently only supports Web Modeler. Desktop Modeler is not supported.
- To use IDP with Camunda 8 Self-Managed and Camunda 8 Run you must [install](/self-managed/modeler/web-modeler/installation.md) and [configure](/self-managed/modeler/web-modeler/configuration/configuration.md) Web Modeler.

### Connectors

- Create an [Amazon Bedrock](https://aws.amazon.com/bedrock/) account to allow IDP to integrate with the [Amazon Bedrock](/components/connectors/out-of-the-box-connectors/amazon-bedrock.md) connector.

- Deploy the [Amazon S3](/components/connectors/out-of-the-box-connectors/amazon-s3.md), [Amazon Textract](/components/connectors/out-of-the-box-connectors/amazon-textract.md), [Amazon Comprehend](/components/connectors/out-of-the-box-connectors/amazon-comprehend.md), and [Amazon Bedrock](/components/connectors/out-of-the-box-connectors/amazon-bedrock.md) connectors used by IDP to extract document content and converse with LLM models.

- Add your Amazon AWS IAM account `access key` and `secret key` as a [connector secret](/components/console/manage-clusters/manage-secrets.md) to any cluster used with IDP.

- Create an Amazon AWS S3 bucket named `idp-extraction-connector` to be used by IDP for temporary document storage during analysis and test extraction.

:::info
To learn more about the technical architecture and how IDP works, see [technical architecture](idp-reference.md#technical-architecture).
:::

## Configure IDP for Camunda 8 Run

The following example steps typically required for configuring IDP with Camunda 8 Run:

1.

## Configure IDP for Camunda 8 SaaS
