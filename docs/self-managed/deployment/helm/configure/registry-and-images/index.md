---
id: index
sidebar_label: Registry and images
title: Configure registry and images
description: Configure registry and image settings for the Camunda Helm chart.
---

import DocCardList from '@theme/DocCardList';

This section explains how to adjust registry and image sources for production setups, including working in air-gapped environments.

## Global and component image values

The `global.image` values apply to all components. The `image` values of a component apply to that component only.

In the following table, replace `<component>` with the values key of a component. See [image values of each component](#image-values-of-each-component).

| Value                           | Default                  | Description                                                                                                                                                            |
| ------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `global.image.registry`         | `""`                     | Registry for the images of all components.                                                                                                                             |
| `<component>.image.registry`    | `""`                     | Registry for the image of one component. This value replaces `global.image.registry` for this component.                                                               |
| `<component>.image.repository`  | Depends on the component | Repository of the image of one component, without the registry.                                                                                                        |
| `<component>.image.tag`         | Depends on the component | Tag of the image of one component.                                                                                                                                     |
| `<component>.image.digest`      | `""`                     | Digest of the image of one component, for example `sha256:<digest>`. If you set a digest, the chart ignores `<component>.image.tag`.                                   |
| `global.image.pullSecrets`      | `[]`                     | List of Kubernetes Secrets that the pods of all components use to pull images.                                                                                         |
| `<component>.image.pullSecrets` | `[]`                     | List of Kubernetes Secrets that the pod of one component uses to pull images. This value replaces `global.image.pullSecrets` for this component.                       |
| `global.image.pullPolicy`       | `Always`                 | Image pull policy of the container of each component. Valid values are `Always`, `IfNotPresent`, and `Never`. You can't set a different pull policy for one component. |

A component value replaces the global value for that component. If a component value is empty, the chart uses the global value. The chart doesn't merge the two `pullSecrets` lists.

## Image values of each component

Each component has its own `image` values. Use the values key in the following table in place of `<component>`.

| Component             | Values key      | Default repository          |
| --------------------- | --------------- | --------------------------- |
| Orchestration Cluster | `orchestration` | `camunda/camunda`           |
| Connectors            | `connectors`    | `camunda/connectors-bundle` |
| Management Identity   | `identity`      | `camunda/identity`          |
| Optimize              | `optimize`      | `camunda/optimize`          |

### Camunda Hub image values

Camunda Hub runs two images, so its image values use a different layout. The REST API image and the WebSockets image share the registry, tag, and pull secrets. Each image has its own repository and digest.

| Value                                    | Description                                                                                                                     |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `camundaHub.image.registry`              | Registry for both Hub images. This value replaces `global.image.registry` for both images.                                      |
| `camundaHub.image.tag`                   | Tag of both Hub images.                                                                                                         |
| `camundaHub.image.pullSecrets`           | List of Kubernetes Secrets that both Hub pods use to pull images. This value replaces `global.image.pullSecrets` for both pods. |
| `camundaHub.restapi.image.repository`    | Repository of the REST API image. The default is `camunda/hub`.                                                                 |
| `camundaHub.restapi.image.digest`        | Digest of the REST API image. If you set a digest, the chart ignores `camundaHub.image.tag` for this image.                     |
| `camundaHub.websockets.image.repository` | Repository of the WebSockets image. The default is `camunda/hub-websockets`.                                                    |
| `camundaHub.websockets.image.digest`     | Digest of the WebSockets image. If you set a digest, the chart ignores `camundaHub.image.tag` for this image.                   |

## Pull images from a private registry

To pull images from a private registry, store your registry credentials in a Kubernetes Secret and add the Secret to your Helm values.

1. Create a `docker-registry` Secret in the namespace where you install the chart. Pods can only use pull secrets from their own namespace.

   ```shell
   kubectl create secret docker-registry registry-credentials \
     --docker-server=example.jfrog.io \
     --docker-username=<username> \
     --docker-password=<password> \
     --namespace <namespace>
   ```

1. Set your registry and the Secret in `global.image`:

   ```yaml
   global:
     image:
       registry: example.jfrog.io
       pullSecrets:
         - name: registry-credentials
   ```

1. (Optional) Set the `image` values of a component to use a different registry or Secret for that component:

   ```yaml
   connectors:
     image:
       registry: other.example.com
       pullSecrets:
         - name: connectors-registry-credentials
   ```

<DocCardList />
