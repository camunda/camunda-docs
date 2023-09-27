---
id: system-configuration-platform-8
title: "Camunda 8 system configuration"
description: "Connection to Camunda 8."
---

| YAML Path               | Default Value | Description                                                                                                                  |
| ----------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| zeebe.enabled           | false         | Toggles whether Optimize should attempt to import data from the connected Zeebe instance.                                    |
| zeebe.name              | zeebe-record  | The name suffix of the exported Zeebe records. This must match the record-prefix configured in the exporter of the instance. |
| zeebe.partitionCount    | 1             | The number of partitions configured for the Zeebe record source.                                                             |
| zeebe.maxImportPageSize | 10000         | The max page size for importing Zeebe data.                                                                                  |
