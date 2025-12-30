---
id: running-custom-connectors
sidebar_label: Custom connectors
title: Run custom connectors in Helm charts
description: "You can deploy a custom connector in your Helm Kubernetes cluster along with the connectors bundle. The default runtime loads connectors from the classpath..."
---

You can deploy a custom connector in your Helm Kubernetes cluster along with the connectors bundle.

The default runtime loads connectors from the classpath using the Java Service Provider Interface (SPI). For the custom connectors, there is a dedicated folder
in the Connectors Docker image `/opt/custom`. Any JAR placed in this folder is included in the runtime classpath.

This page explains how to place your custom connector JAR in `/opt/custom`.

## Prerequisites

- A custom connector built as a **fat JAR** (JAR with dependencies).  
  For details on creating and building custom connectors, see [Connector SDK](/components/connectors/custom-built-connectors/connector-sdk.md).

  Example JAR name used in this guide:  
  `custom-connector-0.0.1-with-dependencies.jar`

- A hosting location accessible by Helm during installation.  
  Example path used in this guide:  
  `https://my.host:80/dist/custom-connector-0.0.1-with-dependencies.jar`

## Configure the Helm chart

Update the values of the [Camunda Helm charts](https://artifacthub.io/packages/helm/camunda/camunda-platform#parameters) to download the JAR into `/opt/custom` before the connectors runtime starts:

```yaml
connectors:
  initContainers:
    - name: init-script-downloader
      image: appropriate/curl
      args:
        - "-o"
        - "/opt/custom/custom-connector-0.0.1-with-dependencies.jar"
        - "https://my.host:80/dist/custom-connector-0.0.1-with-dependencies.jar"
      volumeMounts:
        - name: init-script
          mountPath: /opt/custom

  extraVolumes:
    - name: init-script
      emptyDir: {}

  extraVolumeMounts:
    - mountPath: /opt/custom/custom-connector-0.0.1-with-dependencies.jar
      name: init-script
      subPath: custom-connector-0.0.1-with-dependencies.jar
```

After updating the values, run [Helm install](/self-managed/deployment/helm/install/quick-install.md#install-camunda-helm-chart) as usual.

:::note
The `appropriate/curl` image is not the only image option for the `initContainers`. You can use other `curl`-based images, such as `curlimages/curl`. Adjust the `args` to match the image you choose.
:::

## Troubleshooting

If your custom connector does not start:

- Verify that your connector JAR is present in the `/opt/custom` folder in the pod.
- Confirm that the original connector JAR matches the one in `/opt/custom`. A file size check is often sufficient, but you can also compare checksums if needed.
