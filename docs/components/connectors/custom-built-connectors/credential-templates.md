---
id: credential-templates
title: Create a credential template
description: "Define a credential type for your custom connector, so users can create and select a credential for it in Camunda Hub and Modeler."
keywords: [credential, credential template, configuration, custom connector]
---

<!--
DRAFT: @chillleader please verify against current 8.10 behavior before this merges, per the
PDP-3396 epic (https://github.com/camunda/product-hub/issues/3396) transition-to-implement
notes assigning custom-credential guides to the Connectors team. Content below is grounded in
camunda/connections-design (design/CONFIGURATION_TEMPLATE.md, CONFIGURATION_ELEMENT_TEMPLATE.md,
CONFIGURATION_VERSIONING.md, CONFIGURATION_FIELD_REFERENCES.md) and the shipped REST connector
(camunda/connectors: RestAuthenticationConfiguration.java, http-json-connector.json,
docs/credentials-in-element-templates.md). Check it still matches what ships.
-->

Define a credential type for your custom connector, so users can create and select a credential for it in Camunda Hub or Modeler, instead of configuring authentication fields directly on the connector task. See [Credentials](/components/hub/organization/credentials/index.md) for the concept this page builds on, and [Configuration input type](/components/modeler/element-templates/template-properties.md#configuration-input-type) for the generic `Configuration` property type it uses.

## About credential templates

A **credential template** is a [configuration template](/components/modeler/element-templates/template-metadata.md#embedding-configurations-configurationtemplates) whose `kind` is `CREDENTIAL`. It defines the fields a credential of that type has, and how they render in the credential editor in Camunda Hub and Modeler.

A credential template is not an element template property. It's a separate, self-contained schema, embedded in your connector's element template under the top-level `configurationTemplates` key. Your connector's element template then declares a `Configuration`-type property that locks to it, which renders as the credential picker in the properties panel.

## Define a credential template

A credential template has the following top-level fields:

| Field         | Required | Description                                                                                                      |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `id`          | Yes      | Uniquely identifies the credential template. Referenced by a `Configuration` property's `configurationTemplate`. |
| `name`        | Yes      | Display name shown in the credential editor, and the default label for the picker.                               |
| `version`     | Yes      | An integer. Bump it when the credential's shape changes (see [Versioning](#versioning-a-credential-template)).   |
| `kind`        | Yes      | The kind of configuration. Set this to `CREDENTIAL`.                                                             |
| `description` | No       | Short description shown in the credential editor.                                                                |
| `properties`  | Yes      | The fields that make up the credential's stored value (see below).                                               |

Each property follows the same shape as an element template property, with three differences: it can only use the `property` binding, it cannot use `type: "Configuration"` (a credential cannot embed another credential), and it cannot be marked `optional`. A field is left blank instead, and blank fields are omitted from the stored value.

A property's `binding.name` is the key it contributes to the credential's stored value. Use a dotted name, such as `authentication.accessKey`, to nest fields into a sub-object matching the shape your connector expects to receive.

Here is a complete example, an AWS credential with two authentication methods and a region:

```json
{
  "id": "io.camunda:aws-credential:1",
  "name": "AWS Credential",
  "version": 1,
  "kind": "CREDENTIAL",
  "description": "AWS access credentials for S3, Bedrock, and other AWS services",
  "properties": [
    {
      "id": "authType",
      "label": "Authentication type",
      "type": "Dropdown",
      "choices": [
        {
          "name": "Default credentials chain",
          "value": "defaultCredentialsChain"
        },
        { "name": "Access key / Secret key", "value": "credentials" }
      ],
      "binding": { "type": "property", "name": "authentication.type" }
    },
    {
      "id": "accessKey",
      "label": "Access key",
      "type": "String",
      "secret": true,
      "condition": { "property": "authType", "equals": "credentials" },
      "binding": { "type": "property", "name": "authentication.accessKey" }
    },
    {
      "id": "secretKey",
      "label": "Secret key",
      "type": "String",
      "secret": true,
      "condition": { "property": "authType", "equals": "credentials" },
      "binding": { "type": "property", "name": "authentication.secretKey" }
    },
    {
      "id": "region",
      "label": "Region",
      "type": "String",
      "constraints": { "notEmpty": true },
      "binding": { "type": "property", "name": "region" }
    }
  ]
}
```

A user who selects **Access key / Secret key**, fills in both keys, and sets a region produces this stored value:

```json
{
  "authentication": {
    "type": "credentials",
    "accessKey": "camunda.secrets.AWS_ACCESS_KEY",
    "secretKey": "camunda.secrets.AWS_SECRET_KEY"
  },
  "region": "eu-west-1"
}
```

## Embed the credential template in your element template

Add the credential template to your connector's element template under the top-level `configurationTemplates` key:

```json
{
  "$schema": "https://unpkg.com/@camunda/zeebe-element-templates-json-schema/resources/schema.json",
  "name": "My Connector",
  "id": "io.camunda:my-connector:1",
  ...,
  "configurationTemplates": [
    {
      "id": "io.camunda:aws-credential:1",
      "name": "AWS Credential",
      "version": 1,
      "kind": "CREDENTIAL",
      "properties": [ ... ]
    }
  ],
  "properties": [ ... ]
}
```

If more than one connector uses the same credential type, embed the identical `configurationTemplates` entry (same `id` and `version`) in each. The first copy Modeler loads becomes the canonical definition; later copies are only accepted if they match it exactly. If your connector needs to support in-place upgrades of a bound credential to a newer template version, embed both versions. Modeler needs the source version to read the existing value, and the target version to render the upgraded form.

## Add a credential field to your element template

Declare a `Configuration`-type property that locks to your credential template, and bind it to your connector's dedicated configuration input:

```json
{
  "id": "awsCredential",
  "label": "AWS Credential",
  "type": "Configuration",
  "group": "authentication",
  "description": "Choose a reusable AWS credential. When set, it is bound as a whole to the connector's 'authentication' input.",
  "configurationTemplate": "io.camunda:aws-credential:1",
  "configurationTemplateVersion": 1,
  "binding": { "type": "zeebe:input", "name": "authentication" }
}
```

- `configurationTemplate` is the credential template's `id`. Modeler only offers credentials created from that template.
- `configurationTemplateVersion` is optional, and is a **floor**, not a fixed version: the minimum credential template version a selected credential must satisfy. A credential at or above this version is always compatible. Omit it if any version of the template is acceptable.
- `binding` uses `zeebe:input` for an outbound connector, or `zeebe:property` for an inbound connector. Point `name` at a dedicated configuration input on your connector (for example `authentication` or `configuration`), separate from any inline fields, so a bound credential and an inline fallback can coexist.

Your connector implementation reads this input as one object, and takes whatever fields it needs from it, the same fields your credential template defines.

### Keep an inline fallback

If your connector already has inline authentication fields, keep them. Hide them once a credential is selected, using an `isEmpty` condition on the chooser property:

```json
{
  "id": "accessKey",
  "type": "String",
  "condition": { "property": "awsCredential", "isEmpty": true }
}
```

Your connector should read one effective value: prefer the bound credential, and fall back to the inline field when no credential is selected. Only mark the `Configuration` property `constraints: { "notEmpty": true }` once you are ready to require a credential and remove the inline fields in a new element template version. Existing diagrams stay on their earlier version and are unaffected.

## Secret fields

Mark a credential template field as holding a secret reference with `secret: true`:

```json
{
  "id": "accessKey",
  "label": "Access key",
  "type": "String",
  "secret": true,
  "binding": { "type": "property", "name": "authentication.accessKey" }
}
```

This is a rendering hint for the credential editor in Hub and Modeler. It doesn't restrict what the field can hold, but it tells the editor to treat entered values as secret references rather than literals. A user enters an existing secret's key, and the editor stores it as `camunda.secrets.<KEY>`. The engine resolves this reference when the job worker or connector task activates; your connector never sees the marker itself, only the resolved value.

Your connector cannot create the secret itself from a credential field. The secret must already exist on the cluster. Don't design a credential template that requires a secret your users have no way to create ahead of time.

## Versioning a credential template

A credential template's `version` must only ever grow more permissive: add optional fields freely, but never remove a field, change its type, or change what an existing value means. If you need a breaking change, publish a new `id` instead (for example `io.camunda:aws-credential:2`) rather than reusing the old one.

This works because of floor semantics: a `Configuration` property's `configurationTemplateVersion` is the minimum version a credential must satisfy, not the version it must match. Bumping your credential template's version doesn't invalidate credentials created against an earlier version. They still satisfy any element template that declares a floor at or below their version. Administrators upgrade a shared credential to a newer version at their own pace, independent of when an element template starts requiring it.

:::note
Because an in-place credential edit takes effect immediately for every process that references it, testing a credential against its target cluster and connected system, before saving any change, is the critical safety step for whoever manages it, not the version number itself.
:::

## Additional resources

- [Credentials](/components/hub/organization/credentials/index.md)
- [Configuration input type](/components/modeler/element-templates/template-properties.md#configuration-input-type)
- [Embedding configurations: `configurationTemplates`](/components/modeler/element-templates/template-metadata.md#embedding-configurations-configurationtemplates)
- [Connector templates](/components/connectors/custom-built-connectors/connector-templates.md)
- [Connector SDK](/components/connectors/custom-built-connectors/connector-sdk.md)
