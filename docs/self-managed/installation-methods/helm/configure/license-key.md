---
id: license-key
sidebar_label: License key
title: Configure license key
description: Configure an enterprise license key for Camunda components using Helm.
---

Use this page to configure an enterprise license key for Camunda 8 components. You can either enter the key directly in your `values.yaml` file or reference an existing Kubernetes secret.

## Helm configuration

Camunda 8 components consume enterprise license information through the following Helm configuration:

```yaml
global:
  license:
    ## @param global.license.key if set, it will be exposed as "CAMUNDA_LICENSE_KEY" in all components, consumable as ENV_VAR.
    key:
    ## @param global.license.existingSecret you can provide an existing secret name for Camunda license secret.
    existingSecret:
    ## @param global.license.existingSecretKey you can provide the key within the existing secret object for Camunda license key.
    existingSecretKey:
```

## Provide the key directly

Enter your license key directly in `global.license.key`.

```yaml
global:
  license:
    key: >-
      --------------- BEGIN CAMUNDA LICENSE KEY ---------------
      [...]
      ---------------  END CAMUNDA LICENSE KEY  ---------------
```

## Provide the key with a secret

You can also store the license key in a Kubernetes secret and reference it from `values.yaml`.

1. Create the secret:

   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
   name: camunda-license
   stringData:
   key: >-
     --------------- BEGIN CAMUNDA LICENSE KEY ---------------
     [...]
     ---------------  END CAMUNDA LICENSE KEY  ---------------
   ```

2. Reference the secret in `values.yaml`:

```yaml
global:
  license:
    existingSecret: "camunda-license"
    existingSecretKey: "key"
```

:::note
Camunda 8 components without a valid license may display **Non-Production License** in the navigation bar and log warnings. These warnings do not impact startup or functionality, except that Web Modeler is limited to five users.
:::
