---
id: running-custom-connectors
title: "Running custom connectors"
description: "Run custom connectors in your Helm Kubernetes cluster."
---

You can deploy your custom **Connector** in your Helm Kubernetes cluster along with Connectors Bundle.

The default runtime loads connectors from classpath via SPI. For the custom connectors, there is a dedicated folder
inside a **Connectors** Docker image `/opt/custom`; any JAR placed here is included in the classpath.

This page explains how to put your custom connector into the `/opt/custom`.

## Prerequisites

Start with [creating and building](/components/connectors/custom-built-connectors/connector-sdk.md) a 'fat' JAR (JAR with dependencies) of your custom **Connector**. For the purpose of
this guide, let's consider the custom **Connector** name `custom-connector-0.0.1-with-dependencies.jar`.

Then, place the JAR somewhere accessible by Helm during installation. For the purpose of this guide,
let's consider the path to the **Connector** is `https://my.host:80/dist/custom-connector-0.0.1-with-dependencies.jar`.

## Modify connectors config

Modify the values of the [Camunda Helm charts](https://artifacthub.io/packages/helm/camunda/camunda-platform#parameters):

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

After modification, you can run [Helm install](/self-managed/installation-methods/helm/install.md#install-camunda-helm-chart) as usual.
These changes copy a custom connector JAR before the connector runtime starts.

The `appropriate/curl` is not the only image option for the `initContainers`. There are other `curl`-based alternatives you can use; for example, `curlimages/curl`. Check `args` configuration with your vendor.

## Troubleshooting

If your custom connector won't start, consider the following troubleshooting steps:

- Make sure your connector is present in the `/opt/custom` folder in the pod.
- Make sure the original connector and the one in `/opt/custom` are the same. Usually, file size check is sufficient, but in some cases you may want to have a checksum comparison.
