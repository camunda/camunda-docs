---
id: credential-templates
title: Create a credential template
description: "Define a credential type for your custom connector, so users can create and select a credential for it in Camunda Hub and Modeler."
keywords: [credential, credential template, configuration, custom connector]
---

<!--
TODO(@chillleader): this page needs full content from the Connectors team, per the
PDP-3396 epic (https://github.com/camunda/product-hub/issues/3396) transition-to-implement
notes: "Guides about using and creating custom credentials: to be documented by Pavel as
epic DRI and other Connectors team members."

Scope: how a connector/element template author declares a credential type (a
configuration template whose kind is CREDENTIAL) so it appears as a selectable
credential type in Camunda Hub's "Choose a credential" step and in the Modeler
credential picker — as opposed to /components/modeler/element-templates/template-properties.md,
which documents the generic `type: "Configuration"` property mechanism itself.

Suggested outline below is scaffolding only — replace with authoritative content.
-->

Define a credential type so users of your connector can create and select a credential for it, instead of configuring authentication fields directly on the connector task. See [Credentials](/components/hub/organization/credentials/index.md) for the end-user concept this page builds on.

## About credential templates

<!-- What a credential template is: a configuration template (see template-properties.md for the `Configuration` property type) whose `kind` is `CREDENTIAL`. How it differs from a regular element template property. -->

## Define a credential template

<!-- Where the credential template lives (embedded in the element template's `configurationTemplates`, per current 8.10 scope), its required fields (id, version, kind, properties), and a minimal worked example in JSON. -->

## Add a credential field to your element template

<!-- How to declare the `Configuration`-type property on a connector's element template that references this credential template, including the `binding` to the connector's input (for example `awsCredential`, `authenticationConfiguration`), and how to set a minimum required credential template version. -->

## Secret fields

<!-- How to mark a field as holding a secret reference, and what that changes in the Hub and Modeler forms. -->

## Versioning a credential template

<!-- How to add fields to a credential template without breaking existing credentials, and when a breaking change requires a new template ID. -->

## Additional resources

- [Credentials](/components/hub/organization/credentials/index.md)
- [Element template properties](/components/modeler/element-templates/template-properties.md)
- [Connector templates](/components/connectors/custom-built-connectors/connector-templates.md)
