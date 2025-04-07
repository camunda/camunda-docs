---
id: idp
title: Intelligent document processing (IDP)
description: "Use intelligent document processing (IDP) to integrate automated document processing into your end-to-end processes."
keywords:
  [
    IDP,
    idp,
    "intelligent document processing",
    "document automation",
    "document extraction",
    extraction,
  ]
---

import IdpGrid from './idp/react-components/\_idp-card';
import { gettingStartedCards, configCards } from './idp/react-components/\_idp-card-data';
import IdpOverviewImg from './img/idp-overview-diagram.png';
import IdpSecretsImg from './idp/img/idp-connector-secrets.png';

Use intelligent document processing (IDP) to integrate automated document processing into your end-to-end processes.

## About IDP

IDP uses artificial intelligence (AI) and machine learning (ML) to identify, extract, and organize data from your structured and unstructured documents into a structured format you can use in your processes.

For example, use IDP to extract and use data from invoices and other document types in your document processing workflow.

<img src={IdpOverviewImg} class="fade-in-bottom-image" alt="An overview of intelligent document processing" style={{border: 'none', padding: '0', marginTop: '0', backgroundColor: 'transparent'}} />

## Configure IDP

[Configure IDP](idp/idp-configuration.md) for your Camunda 8 setup with access to the required components and credentials.

<IdpGrid idp={configCards} />

## Get started with IDP

Once initial [configuration](idp/idp-configuration.md#configure-idp) is complete, get started with IDP.

<IdpGrid idp={gettingStartedCards} />

<!-- 1. Create and publish your IDP projects in your IDP application folder:

   - Create a [document extraction](idp/idp-document-extraction.md) project to identify and extract data from a single type of document (for example, an invoice).

   - Create a [document automation](idp/idp-document-automation.md) project to automatically extract data from larger, more complex documents (for example, a multi-page PDF document made up of many types of documents and data). This project type is based on and requires one or more linked document extraction project(s). -->

## IDP concepts

Learn about key [IDP concepts](idp/idp-key-concepts.md) and terms, such as the difference between structured and unstructured documents, document classification, and how IDP uses LLM Foundation models.

- [Structured and unstructured documents](idp/idp-key-concepts.md#documents)
- [Document classification](idp/idp-key-concepts.md#classification)
- [Extraction model/Large Language Models (LLM)](idp/idp-key-concepts.md#llms)
- [Extraction fields](idp/idp-key-concepts.md#fields)

## IDP reference

Technical [IDP reference](idp/idp-reference.md) information, including technical architecture and document storage, supported documents and types, and extraction models.

- [Technical architecture and document storage](idp/idp-reference.md#architecture)
- [Document file formats](idp/idp-reference.md#file-formats)
- [Document language support](idp/idp-reference.md#languages)
- [Document file formats](idp/idp-reference.md#file-formats)
- [Extraction field data types](idp/idp-reference.md#data-types)
- [Extraction models](idp/idp-reference.md#extraction-models)
- [Validation status](idp/idp-reference.md#status)
