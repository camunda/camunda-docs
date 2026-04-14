---
id: install-zeebe-exporters
title: "Install Zeebe exporters"
description: "Add dynamic exporters to Zeebe brokers in Camunda 8 Self-Managed deployment."
---

Camunda 8 Self-Managed Helm chart supports the addition of Zeebe exporters by using `initContainer`.

The following is an example to install the community-supported Zeebe [Hazelcast](https://github.com/camunda-community-hub/zeebe-hazelcast-exporter) exporter.

```yaml
extraInitContainers:
  - name: init-exporters-hazelcast
    image: busybox:1.35
    command: ["/bin/sh", "-c"]
    args:
      [
        "wget --no-check-certificate https://repo1.maven.org/maven2/io/zeebe/hazelcast/zeebe-hazelcast-exporter/0.8.0-alpha1/zeebe-hazelcast-exporter-0.8.0-alpha1-jar-with-dependencies.jar -O /exporters/zeebe-hazelcast-exporter.jar; ls -al /exporters",
      ]
    volumeMounts:
      - name: exporters
        mountPath: /exporters/
env:
  - name: ZEEBE_BROKER_EXPORTERS_HAZELCAST_JARPATH
    value: /exporters/zeebe-hazelcast-exporter.jar
  - name: ZEEBE_BROKER_EXPORTERS_HAZELCAST_CLASSNAME
    value: io.zeebe.hazelcast.exporter.HazelcastExporter
  - name: ZEEBE_HAZELCAST_REMOTE_ADDRESS
    value: "{{ .Release.Name }}-hazelcast"
```

This example is downloading the exporters' JAR from a URL and adding the JAR to the `exporters` directory,
which will be scanned for JARs and added to the Zeebe Broker classpath. Then, with `environment variables`,
you can configure the exporter parameters.

:::note

During startup, the Zeebe pods will copy the exporters located in `/exporters/` to `/usr/local/zeebe/exporters/`. If the pods have a read-only root file system, a writable volume must be mounted to `/usr/local/zeebe/exporters/`.

:::
