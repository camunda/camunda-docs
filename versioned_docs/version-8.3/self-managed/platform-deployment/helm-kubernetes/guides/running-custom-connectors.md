---
id: running-custom-connectors
title: "Running Custom Connectors"
description: "Run custom Connectors in your Helm K8S cluster"
---

You can deploy your custom **Connector** in your Helm K8S cluster along with Connectors Bundle.

## Overview

The default runtime loads Connectors from classpath via SPI. For the custom Connectors, there is a dedicated folder
inside a **Connectors** Docker image `/opt/custom`. Any jar that is placed there will be included into the classpath.

This page explains how to put your custom Connector into the `/opt/custom`.

## Prerequisites

Start with [creating and building](../../../components/connectors/custom-built-connectors/connector-sdk.md) a 'fat' jar (jar with dependencies) of your custom **Connector**. For the purpose of
this guide, let's consider this guide, let's consider the custom **Connector** name as `custom-connector-0.0.1-with-dependencies.jar`.

Then, you need to place the 'fat' jar somewhere accessible by Helm during installation. For the purpose of this guide,
let's consider the path to the **Connector** is `https://my.host:80/dist/custom-connector-0.0.1-with-dependencies.jar`.

## Modify Connectors config

Modify the `values.yaml` file in the [Camunda Helm Charts repository](https://github.com/camunda/camunda-platform-helm/blob/main/charts/camunda-platform/values.yaml).

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

After modification, you can run `helm install ... ` as usual.
These changes will copy a custom Connector jar before the Connector runtime starts.

The `appropriate/curl` is not the only image option for the `initContainers`. There are other `curl`-based alternatives
that you can use, for example `curlimages/curl`. Please check `args` configuration with your vendor.

## Troubleshooting

If your custom Connector won't start, consider the following troubleshooting steps:

- Make sure your Connector is present in the `/opt/custom` folder in the pod.
- Make sure that the original Connector and the one in the `/opt/custom` are the same. Usually, file size check is sufficient but in some cases you may want to have a checksum comparison.
