---
id: license-key
sidebar_label: License key
title: Configure license key
description: Configure an enterprise license key for Camunda components using Helm.
---

Use this page to configure an enterprise license key for Camunda 8 components. You can either enter the key directly in your `values.yaml` file or reference an existing Kubernetes secret.

## Configuration

### Helm values

Camunda 8 components consume enterprise license information through the following Helm configuration:

```yaml
global:
  ## License configuration.
  ## @extra global.license
  license:
    ## @extra global.license.secret configuration to provide the license secret.
    secret:
      ## @param global.license.secret.inlineSecret can be used to provide the license as a plain-text value for non-production usage.
      inlineSecret: ""
      ## @param global.license.secret.existingSecret can be used to reference an existing Kubernetes Secret containing the license.
      existingSecret: ""
      ## @param global.license.secret.existingSecretKey defines the key within the existing secret object.
      existingSecretKey: ""
```

### Provide the key directly

Enter your license key directly in `global.license.key`.

```yaml
global:
  license:
    secret:
      inlineSecret: >-
        --------------- BEGIN CAMUNDA LICENSE KEY ---------------
        [...]
        ---------------  END CAMUNDA LICENSE KEY  ---------------
```

### Provide the key with a secret

You can also store the license key in a Kubernetes secret and reference it from `values.yaml`.
For more details on working with secrets, see [Secret management](/self-managed/deployment/helm/configure/secret-management.md).

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
       secret:
         existingSecret: "camunda-license"
         existingSecretKey: "key"
   ```

:::note
Camunda 8 components without a valid license may display **Non-Production License** in the navigation bar and log warnings. These warnings do not impact startup or functionality, except that Web Modeler is limited to five users.
:::
